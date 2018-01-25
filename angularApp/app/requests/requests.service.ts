import { EntityManagerService } from './../entity-manager.service';
import { Status, Request } from './../model/entity-model';
import { Injectable } from '@angular/core';
import { EntityQuery} from 'breeze-client';
import { HttpClient } from '@angular/common/http';
import { Client } from '../model/client';
import { BaseRepositoryService } from '../base-repository.service';

@Injectable()
export class RequestService extends BaseRepositoryService {

  //private _entityManagerService: EntityManagerService

  constructor( protected _entityManagerService: EntityManagerService) {
    super(_entityManagerService);
  }

  public query(state: any): void {
    this.fetch('Requests', state)
      .subscribe(x => super.next(x));
  }

  getStatuses(): Status[] {
    return this._entityManagerService.getEntityManager().executeQueryLocally(EntityQuery.from("Statuss")) as Status[];
  }

  getClients(): Client[] {
    return this._entityManagerService.getEntityManager().executeQueryLocally(EntityQuery.from("Clients")) as Client[];
  }
}
