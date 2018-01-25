import { NamingConvention } from 'breeze-client';
import { EntityManager, EntityQuery } from 'breeze-client';
import { Injectable } from '@angular/core';
import { RegistrationHelper } from './model/registration-helper';

@Injectable()
export class EntityManagerService {
    protected _em: EntityManager = new EntityManager('https://localhost/webapi/breeze/eai/');

    private _initialized: boolean;

    constructor() {
        this._em.metadataStore.namingConvention = NamingConvention.camelCase.setAsDefault();
        RegistrationHelper.register(this._em.metadataStore);
     }

     getEntityManager() : EntityManager{
         return this._em;
     }

    initialize() {
        let promise = new Promise<boolean>((resolve, reject) => {
          if (this._initialized) {
            resolve(true);
          } else {
            this._initialized = true;
            let existingChanges = localStorage['changeCache'];
            if (existingChanges) {
              this._em.importEntities(existingChanges);
              localStorage.removeItem('changeCache');
            }
            // this._em.fetchMetadata().then(_ => {
            //   resolve(true);
            // }, error => console.error(error));
            this._em.executeQuery(EntityQuery.from('Lookups')).then(lookupsResponse => {
              resolve(true);
            }, error => console.error(error));
          }
        });
        return promise;
      }
    
}