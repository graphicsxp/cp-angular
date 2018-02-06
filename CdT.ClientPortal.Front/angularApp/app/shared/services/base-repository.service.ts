import { Entity } from 'breeze-client';
import { LookupNames } from './../../model/lookups';
import { Purpose, Client, Status, Request, DeliveryMode, RequestTemplate } from './../../model/breeze/entity-model';

import { EntityManagerService } from './../../entity-manager.service';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { EntityManager, EntityQuery, Predicate, FilterQueryOp } from 'breeze-client';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { groupBy } from '@progress/kendo-data-query';
import { RequestType } from '../../model/breeze/request-type';

/**
 * The BaseRepositoryService implements basic CRUD operations. It should remain as generic as possible.
 */
export abstract class BaseRepositoryService<T extends Entity> extends BehaviorSubject<GridDataResult> {

  protected entityName: String = '';
 
  constructor(protected _entityManagerService: EntityManagerService, ctor: { new (): T }) {
    super(null);
    this.entityName = ctor.name;
  }

  protected createEntity(config?: {}): T {
    config = config || {};
    return this._entityManagerService.em.createEntity(<string>this.entityName, config) as T;
  }

  public getById(entityName, resource, id, children, forceRefresh = false): Observable<T> {
    let promise = new Promise<any>((resolve, reject) => {
      var entity = this._entityManagerService.em.getEntityByKey(entityName, id);

      // if (entity && entity.isReadyForEdit && !forceRefresh) {
      if (entity && !forceRefresh) {
        return new Promise((resolve, reject) => {
          resolve(entity);
        });
      } else {
        var query = EntityQuery.from(resource).where('id', FilterQueryOp.Equals, id);

        if (children) {
          query = query.expand(children);
        }

        return this._entityManagerService.em.executeQuery(query).then(data => {
          resolve(data.results[0]);
        }, error => {
          reject(error);
        });
      }
    });

    return Observable.fromPromise(promise).map(entity => (<T>entity));
  }

  protected fetch(tableName: string, state: any, expand: string): Observable<GridDataResult> {
    let promise = new Promise<any>((resolve, reject) => {
      let query = EntityQuery.from(tableName);
      let orderBy = '';
      //query = query.orderBy('lastName desc, firstName');

      if (state.filter) {
        let p: Predicate[] = new Array();

        state.filter.filters.forEach((filter) => {
          if (filter.value instanceof Array) {
            let multiselectPredicates: any[] = [];

            filter.value.forEach((value) => {
              multiselectPredicates.push(new Predicate(filter.field, filter.operator, value));
            });

            p.push(Predicate.or(multiselectPredicates));
          } else {
            p.push(Predicate.and(new Predicate(filter.field, filter.operator, filter.value)));
          }
        });

        query = query.where(Predicate.and(p));
      }

      if (state.sort) {
        state.sort.forEach(element => {
          query = query.orderBy(element.field + ' ' + (element.dir || 'desc'));
        });
      }

      if (expand) {
        query = query.expand(expand);
      }

      query = query.skip(state.skip).take(state.take).inlineCount();

      this._entityManagerService.em.executeQuery(query).then(queryResult => {
        if (state && state.group) {
          state.group.map(group => group.aggregates = state.aggregates);
        }
        var gridData = groupBy(queryResult.results, state.group);

        resolve({ data: gridData, totalRecords: queryResult.inlineCount })
      },
        error => reject(error));
    });

    return Observable.fromPromise(promise).map(response => (<GridDataResult>{
      data: response['data'],
      total: response['totalRecords']
    }));
  }

  public save() {
    let promise = new Promise((resolve, reject) => {
      this._entityManagerService.em.saveChanges().then(() => resolve(),
        error => reject(error));
    });
    return promise;
  }

  getLookup(name: string): any[] {
    return this._entityManagerService.getLookup(name);
  }
}
