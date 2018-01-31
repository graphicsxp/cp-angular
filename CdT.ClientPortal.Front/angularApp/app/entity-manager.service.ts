import { environment } from './../environments/environment';
import { NamingConvention, NavigationProperty, EntityState } from 'breeze-client';
import { EntityManager, EntityQuery } from 'breeze-client';
// from 'breeze-client-labs';
import { Injectable } from '@angular/core';
import { RegistrationHelper } from './model/registration-helper';
import * as _ from 'lodash';
/**
 * Provides a breeze EntityManager at application level. 
 * Configures the metadataStore. This is meant to be done once at application startup (see APP_INITIALIZER)
 */
@Injectable()
export class EntityManagerService {
  public readonly em: EntityManager = new EntityManager(environment.webapiUrl);

  private _initialized: boolean;
  private _hasChanges: boolean;

  constructor() {
    this.em.metadataStore.namingConvention = NamingConvention.camelCase.setAsDefault();
    RegistrationHelper.register(this.em.metadataStore);
    this.em.hasChangesChanged.subscribe((args) => {
      this._hasChanges = args.hasChanges;
    });
  }

  public initialize() {
    let promise = new Promise<boolean>((resolve, reject) => {
      if (this._initialized) {
        resolve(true);
      } else {
        this._initialized = true;
        let existingChanges = localStorage['changeCache'];
        if (existingChanges) {
          this.em.importEntities(existingChanges);
          localStorage.removeItem('changeCache');
        }
        // this._em.fetchMetadata().then(_ => {
        //   resolve(true);
        // }, error => console.error(error));
        this.em.executeQuery(EntityQuery.from('Lookups')).then(lookupsResponse => {
          resolve(true);
        }, error => console.error(error));
      }
    });
    return promise;
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
    //check which children were added to the parentEntity            
    childCollection.forEach((childEntity) => {
      var associationChildEntity = hasExtraProperties ? childEntity[childKeyName] : childEntity;

      var childFound = _.find(serverCollection, (association) => {
        return associationChildEntity.id === association[childKeyName].id;
      });
      var prop;
      if (!childFound) {
        var initialValues = {
        };
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
        var association = serverCollection.filter((el) => { return el[childKeyName].id === associationChildEntity.id; })[0];

        if (association.entityAspect.entityState.name === 'Modified' || association.entityAspect.entityState.name === 'Deleted') {
          //if we go in there, something bad happened and we should reject changes.
          association.entityAspect.rejectChanges();
        } else if (hasExtraProperties) {
          //only the extra properties might have changed if the association entity already existed.
          for (prop in childEntity) {
            if (prop !== childKeyName) {
              association[prop] = childEntity[prop];
            }
          }
        }
      }
    });

    //check which children were removed from the parentEntity
    for (var i = 0; i < serverCollection.length; i++) {
      var childFound = _.find(childCollection, (childEntity) => {
        childEntity = hasExtraProperties ? childEntity[childKeyName] : childEntity;

        return childEntity.id === serverCollection[i][childKeyName].id;
      });

      if (!childFound) {
        serverCollection[i].entityAspect.setDeleted();
        if (!serverCollection.navigationProperty) {  //if the server collection was passed as a filtered array, we need to manually remove the item
          serverCollection = _.without(serverCollection, serverCollection[i]);
        }

        i--;
      }
    }
  }

  /**
        * returns a flag, which is true if the entity or one of its properties has validation errors
        * only direct properties right now
        * filter detached entities before checking errors
        */
  // public hasErrors(entities, properties) {
  //   if (entities) {
  //     var filteredEntities;
  //     //if it's an array, filter detached entities
  //     if (Array.isArray(entities)) {
  //       filteredEntities = _.filter(entities, function (entity) {
  //         return entity.entityAspect.entityState !== EntityState.Detached;
  //       });
  //     }
  //     else {
  //       // if it's an entity, check if not detached and build a single item array with it
  //       if (entities.entityAspect.entityState === EntityState.Detached) {
  //         filteredEntities = [];
  //       }
  //       else {
  //         filteredEntities = [entities];
  //       }
  //     }
  //     // filter also deleted entities
  //     var entitiesGraph = EntityManager.getEntityGraph(filteredEntities, properties).filter(function (entity) {
  //       return entity.entityAspect.entityState !== EntityState.Deleted;
  //     });
  //     var hasError = _.some(entitiesGraph, function (entity) {
  //       return entity.entityAspect.hasValidationErrors;
  //     });
  //     return hasError;
  //   }
  //   else {
  //     return false;
  //   }
  // }
}