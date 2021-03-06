import { environment } from './../environments/environment';
import { NamingConvention, NavigationProperty, EntityState, EntityType } from 'breeze-client';
import { EntityManager, EntityQuery, config } from 'breeze-client';
import 'breeze-client-labs/breeze.getEntityGraph';
import { Injectable } from '@angular/core';
import { RegistrationHelper } from './model/breeze/registration-helper';
import * as _ from 'lodash';
import { EntityAction } from 'breeze-client';
import { IStructuralType } from 'breeze-client';
import { Validator } from 'breeze-client';
import { CustomValidatorService } from './shared/services/custom-validator.service';
import { Entity } from 'breeze-client';
/**
 * Provides a breeze EntityManager at application level.
 * Configures the metadataStore. This is meant to be done once at application startup (see APP_INITIALIZER)
 */
@Injectable()
export class EntityManagerService {
  public readonly em: EntityManager = new EntityManager(`${environment.backendUrl}${environment.breezeEndpoint}`);

  private _initialized: boolean;
  private _hasChanges: boolean;
  private _lookups: Object;

  constructor(private _customValidatorService: CustomValidatorService) {
    this.em.metadataStore.namingConvention = NamingConvention.camelCase.setAsDefault();

    // this.em.metadataStore.importMetadata('../../mocks/metadata.json');

    RegistrationHelper.register(this.em.metadataStore);
    this.em.hasChangesChanged.subscribe((args) => {
      this._hasChanges = args.hasChanges;
    });
  }

  public initialize() {
    const promise = new Promise<boolean>((resolve, reject) => {
      if (this._initialized) {
        resolve(true);
      } else {
        this._initialized = true;
        const existingChanges = localStorage.getItem('changeCache');
        if (existingChanges) {
          this.em.importEntities(existingChanges);
          localStorage.removeItem('changeCache');
        }
        this.em.fetchMetadata().then(() => {

          this._initValidation();

          const allTypes: IStructuralType[] = this.em.metadataStore.getEntityTypes();
          for (let i = 0; i < allTypes.length; i++) {
            const myType: EntityType = allTypes[i] as EntityType;

            // check navigation properties
            if (myType.foreignKeyProperties) {
              for (let j = 0; j < myType.foreignKeyProperties.length; j++) {
                const fk = myType.foreignKeyProperties[j];
                if (!fk.isNullable) {
                  // http://stackoverflow.com/questions/16733251/breezejs-overriding-displayname
                  if (fk.relatedNavigationProperty) {
                    fk.displayName = fk.relatedNavigationProperty.nameOnServer;
                    fk.validators.push(config.functionRegistry['Validator.nonDefaultGuidValidator']());
                    fk.relatedNavigationProperty.validators.push(Validator.required());
                  }
                }
              }
            }
          }
          this.em.executeQuery(EntityQuery.from('Lookups')).then(lookupsResponse => {
            this._lookups = lookupsResponse.results[0];
            resolve(true);
          }, error => {
            console.error(error)
            resolve(false);
          });
        }, error => {
          console.error(error)
          resolve(false);
        });
      }
    });
    return promise;
  }

  /**
   * Custom validators should be added here to entity types
   */
  private _initValidation() {
    // const sourceMaterialType: EntityType = <EntityType>this.em.metadataStore.getEntityType('SourceMaterial');
    // sourceMaterialType.getProperty('sourceLanguages').validators.push(config.functionRegistry['Validator.notEmptyCollectionValidator']());

    const jobType: EntityType = <EntityType>this.em.metadataStore.getEntityType('Job');
    jobType.getProperty('clientVolume').validators.push(config.functionRegistry['Validator.greaterThanValidator'](0));

  }

  public hasChanges() {
    return this._hasChanges;
  }

  /**
   * Finds differences between a client collection and a server collection, typically used
   * to handle many to many associations as they are not yet supported by breeze.
   * @method checkMany2ManyModifications
   * @entityType{string}: the type of the association entity to create
   * @parentEntity{object}: the parent entity in the association
   * @childCollection{array or object}:  can be two things:
                                         - the collection of child entities in the association
                                          - a complex object containing the collection of child entities in the association + extra property-value pairs that belong to the m-2-m association
    * @serverCollection{array}: the collection of association entities that we want to update - note that this can be a filtered array or a navigation property
    * @parentKeyName{string}: the name of the parent key in the association
    * @childKeyName{string}: the name of the child key in the association
    * @hasExtraProperties{bool}: does the childCollection contain extra properties to set on the m-2-m association ?
    *
    * Exemple:    RequestContact {Request, Contact}
    *             entityType: RequestContact
    *             parentEntity: Request
    *             childCollection: a list of Contact entities maintained on the client-side
    *             serverCollection: a list of RequestContact entities that we want to update
    *             parentKeyName: 'request'
    *             childKeyName: 'contact'
    *
    * Created following Ward Bell's advice :  http://stackoverflow.com/questions/20638851/breeze-many-to-many-issues-when-saving
    */
  public checkMany2ManyModifications(entityType: string, parentEntity, childCollection, serverCollection, parentKeyName: string, childKeyName: string, hasExtraProperties: boolean) {
    // check which children were added to the parentEntity
    childCollection.forEach((childEntity) => {
      const associationChildEntity = hasExtraProperties ? childEntity[childKeyName] : childEntity;

      const childFound = _.find(serverCollection, (association) => {
        return associationChildEntity.id === association[childKeyName].id;
      });

      let prop;

      if (!childFound) {
        const initialValues = {};
        initialValues[parentKeyName] = parentEntity;
        initialValues[childKeyName] = associationChildEntity;

        if (hasExtraProperties) {
          for (prop in childEntity) {
            if (prop !== childKeyName) {
              initialValues[prop] = childEntity[prop];
            }
          }
        }

        serverCollection.push(this.em.createEntity(entityType, initialValues));
      } else {
        const association = serverCollection.filter((el) => { return el[childKeyName].id === associationChildEntity.id; })[0];

        if (association.entityAspect.entityState.name === 'Modified' || association.entityAspect.entityState.name === 'Deleted') {
          // if we go in there, something bad happened and we should reject changes.
          association.entityAspect.rejectChanges();
        } else if (hasExtraProperties) {
          // only the extra properties might have changed if the association entity already existed.
          for (prop in childEntity) {
            if (prop !== childKeyName) {
              association[prop] = childEntity[prop];
            }
          }
        }
      }
    });

    // check which children were removed from the parentEntity
    for (let i = 0; i < serverCollection.length; i++) {
      const childFound = _.find(childCollection, (childEntity) => {
        childEntity = hasExtraProperties ? childEntity[childKeyName] : childEntity;

        return childEntity.id === serverCollection[i][childKeyName].id;
      });

      if (!childFound) {
        serverCollection[i].entityAspect.setDeleted();
        if (!serverCollection.navigationProperty) {  // if the server collection was passed as a filtered array, we need to manually remove the item
          serverCollection = _.without(serverCollection, serverCollection[i]);
        }

        i--;
      }
    }
  }


  /**
   * Delete entitities and make sure the childrenCollections, if any, are detached first
   *@method deleteEntities
   *@entity{object} the parent entities to delete
   *@childrenCollections{string} the name of the children collections to detach
   */
  public deleteEntities(entities, childrenCollections) {
    entities.forEach(entity => {
      if (childrenCollections instanceof Array) {
        childrenCollections.forEach((childCollection) => {
          while (entity[childCollection] instanceof Array && entity[childCollection].length !== 0) {
            if (entity[childCollection] instanceof Array) { // safe guard
              this.em.detachEntity(entity[childCollection][0]);
            }
          }
        });
      }
      entity.entityAspect.setDeleted();
    });
  }

  /**
   * Triggers a change notification accross the entityManager for a given entity
   * If the entity is in status Added, we call the breeze private method _notifyStateChange.
   * Otherewise just call setModified().
   * That should normally not be required, but as long as breeze doesn't support m-2-m associations
   * we'll have to do that.
   * @method triggerStatusNotification
   * @entity{Object}: the entity of which we check the status
   */
  public triggerStatusNotification(entity) {
    if (!entity) {
      return;
    }
    if (entity.entityAspect.entityState.name === 'Added') {
      this.em.hasChangesChanged.publish({ entityManager: this, hasChanges: true });
      this.em.entityChanged.publish({ entityAction: EntityAction.EntityStateChange, entity: entity });
    } else {
      entity.entityAspect.setModified();
    }
  }

  /**
  * returns a flag, which is true if the entity or one of its properties has validation errors
  * only direct properties right now
  * filter detached entities before checking errors
  */
  public hasErrors(entities, properties) {
    if (entities) {
      let filteredEntities;
      // if it's an array, filter detached entities
      if (Array.isArray(entities)) {
        filteredEntities = _.filter(entities, (entity) => {
          return entity.entityAspect.entityState !== EntityState.Detached;
        });
      } else {
        // if it's an entity, check if not detached and build a single item array with it
        if (entities.entityAspect.entityState === EntityState.Detached) {
          filteredEntities = [];
        } else {
          filteredEntities = [entities];
        }
      }
      // filter also deleted entities
      const entitiesGraph = this.em.getEntityGraph(filteredEntities, properties).filter((entity) => {
        return entity.entityAspect.entityState !== EntityState.Deleted;
      });
      const hasError = _.some(entitiesGraph, (entity) => {
        return entity.entityAspect.hasValidationErrors;
      });
      return hasError;
    } else {
      return false;
    }
  }

  public getLookup(name: string) {
    return this._lookups[name];
  }
}
