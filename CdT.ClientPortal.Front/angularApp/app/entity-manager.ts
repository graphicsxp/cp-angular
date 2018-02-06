// import { environment } from './../environments/environment';
// import { NamingConvention, NavigationProperty, EntityState } from 'breeze-client';
// import { EntityManager, EntityQuery, config } from 'breeze-client';
// import { Injectable, Inject } from '@angular/core';
// import { RegistrationHelper } from './model/registration-helper';
// import * as _ from 'lodash';
// import { EntityAction } from 'breeze-client';
// import { IStructuralType } from 'breeze-client';
// import { EntityType } from 'breeze-client';
// import { Validator } from 'breeze-client';
// import { CustomValidatorService } from './shared/services/custom-validator.service';
// import { EntityStateSymbol } from 'breeze-client';
// import { MergeStrategySymbol } from 'breeze-client';
// import { Entity } from 'breeze-client';
// import { ExecuteQuerySuccessCallback } from 'breeze-client';
// import { QueryResult } from 'breeze-client';
// import { ExecuteQueryErrorCallback } from 'breeze-client';
// import { SaveOptions } from 'breeze-client';
// import { SaveChangesSuccessCallback } from 'breeze-client';
// import { SaveResult } from 'breeze-client';
// import { SaveChangesErrorCallback } from 'breeze-client';
// /**
//  * Provides a breeze EntityManager at application level. 
//  * Configures the metadataStore. This is meant to be done once at application startup (see APP_INITIALIZER)
//  */


// export abstract class EntityManagerAbstract {
//   abstract createEntity(typeName: string, config?: {}, entityState?: EntityStateSymbol, mergeStrategy?: MergeStrategySymbol): Entity;
//   abstract getEntityByKey(typeName: string, keyValue: any): Entity;
//   abstract executeQuery(query: EntityQuery, callback?: ExecuteQuerySuccessCallback, errorCallback?: ExecuteQueryErrorCallback): Promise<QueryResult>;
//   abstract executeQueryLocally(query: EntityQuery): Entity[];
//   abstract saveChanges(entities?: Entity[], saveOptions?: SaveOptions, callback?: SaveChangesSuccessCallback, errorCallback?: SaveChangesErrorCallback): Promise<SaveResult>;
// }

// @Injectable()
// export class EntityManagerEcdt extends EntityManagerAbstract {
//   private readonly em: EntityManager = new EntityManager('http://localhost/CdT.ClientPortal.WebApi/breeze/eai/');
  
//   /**
//    *
//    */
//   constructor() {
//     super(); 
//   }
//   createEntity(typeName: string, config?: {}, entityState?: EntityStateSymbol, mergeStrategy?: MergeStrategySymbol): Entity {
//     return this.em.createEntity(typeName, config, entityState, mergeStrategy);
//   }
//   getEntityByKey(typeName: string, keyValue: any): Entity {
//     return this.em.getEntityByKey(typeName, keyValue);
//   }
//   executeQuery(query: EntityQuery, callback?: ExecuteQuerySuccessCallback, errorCallback?: ExecuteQueryErrorCallback): Promise<QueryResult> {
//     return this.em.executeQuery(query, callback, errorCallback);
//   }
//   executeQueryLocally(query: EntityQuery): Entity[] {
//     return this.em.executeQueryLocally(query);
//   }
//   saveChanges(entities?: Entity[], saveOptions?: SaveOptions, callback?: SaveChangesSuccessCallback, errorCallback?: SaveChangesErrorCallback): Promise<SaveResult> {
//     return this.em.saveChanges(entities, saveOptions, callback, errorCallback);
//   }
  
// }

// export class MockEntityManager extends EntityManager {
//   /**
//    *
//    */
//   private me = this;
//   constructor() {
//     super("http://localhost:3002");
//   }

//   executeQuery(query: EntityQuery, callback?: ExecuteQuerySuccessCallback, errorCallback?: ExecuteQueryErrorCallback): Promise<QueryResult> {
//     var res = super.executeQueryLocally(query);

//     let queryResult: QueryResult;

//     return new Promise((resolve, reject) => {
//       queryResult.results = res;
//       resolve(queryResult);
//     });
//   }
// }

// export interface ITest {
//   executeQuery(query: string, callback?: ExecuteQuerySuccessCallback, errorCallback?: ExecuteQueryErrorCallback): Promise<QueryResult>;
//   executeQuery(query: EntityQuery, callback?: ExecuteQuerySuccessCallback, errorCallback?: ExecuteQueryErrorCallback): Promise<QueryResult>;
// } 