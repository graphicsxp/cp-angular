import { environment } from './../environments/environment';
import { NamingConvention } from 'breeze-client';
import { EntityManager, EntityQuery } from 'breeze-client';
import { Injectable } from '@angular/core';
import { RegistrationHelper } from './model/registration-helper';

/**
 * Provides a breeze EntityManager at application level. 
 * Configures the metadataStore. This is meant to be done once at application startup (see APP_INITIALIZER)
 */
@Injectable()
export class EntityManagerService {
    public readonly em: EntityManager = new EntityManager(environment.webapiUrl);

    private _initialized: boolean;

    constructor() {
        this.em.metadataStore.namingConvention = NamingConvention.camelCase.setAsDefault();
        RegistrationHelper.register(this.em.metadataStore);
     }

    initialize() {
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
    
}