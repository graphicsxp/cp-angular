import { GridDataResult } from '@progress/kendo-angular-grid';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { EntityManager, EntityQuery, Predicate, FilterQueryOp } from 'breeze-client';
import { RegistrationHelper } from './model/registration-helper';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient } from '@angular/common/http';
import { EntityManagerService } from './entity-manager.service';


export abstract class BaseRepositoryService extends BehaviorSubject<GridDataResult> {


  constructor(protected _entityManagerService: EntityManagerService) {
    super(null);
  }


  public getById(entityName, resource, id, children, forceRefresh = false): Observable<any> {
    let promise = new Promise<any>((resolve, reject) => {
      var entity = this._entityManagerService.getEntityManager().getEntityByKey(entityName, id);

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

        return this._entityManagerService.getEntityManager().executeQuery(query).then(data => {
          resolve(data.results[0]);
        }, error => {
          reject(error);
        });
      }
    });

    return Observable.fromPromise(promise).map(entity => (<any>entity));
  }

  protected fetch(tableName: string, state: any): Observable<GridDataResult> {
    let promise = new Promise<any>((resolve, reject) => {
      let query = EntityQuery.from('Requests');
      let orderBy = '';
      //query = query.orderBy('lastName desc, firstName');

      if (state.filter) {
        var p: Predicate[] = new Array();

        state.filter.filters.forEach((filter) => {
          if (filter.value instanceof Array) {
            var multiselectPredicates: any[] = [];
            filter.value.forEach((value) => {
              multiselectPredicates.push(new Predicate(filter.field, filter.operator, value.code));
            });
            p.push(Predicate.or(multiselectPredicates));
          } else {
            p.push(Predicate.and(new Predicate(filter.field, filter.operator, filter.value)));
          }
        });

        query = query.where(Predicate.and(p));
      }

      query = query.expand('status, department, client, sourceMaterials.jobs.priority, sourceMaterials.jobs.service.unit,  sourceMaterials.jobs.jobStatus,  purpose, referenceSet.references, requestContacts.contact');
      //query = query.expand('Status, Department, Client, SourceMaterials.Jobs.Priority, SourceMaterials.Jobs.Service.Unit, SourceMaterials.Jobs.JobStatus,  Purpose, ReferenceSet.References, RequestContacts.Contact');

      query = query.skip(state.skip).take(state.take).inlineCount();

      this._entityManagerService.getEntityManager().executeQuery(query).then(queryResult => {
        resolve({ requests: queryResult.results, totalRecords: queryResult.inlineCount })
      },
        error => reject(error));
    });
    return Observable.fromPromise(promise).map(response => (<GridDataResult>{
      data: response['requests'],
      total: response['totalRecords']
    }));
  }
}
