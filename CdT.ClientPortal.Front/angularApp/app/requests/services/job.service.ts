import { JobTranslation } from './../../model/breeze/job-translation';
import { Injectable } from '@angular/core';
import { GlobalService } from './../../shared/services/global.service';
import { EntityManagerService } from './../../entity-manager.service';
import { Job } from './../../model/breeze/job';
import { BaseRepositoryService } from '../../shared/services/base-repository.service';


@Injectable()
export class JobBaseService extends BaseRepositoryService<Job> {

    constructor(protected _entityManagerService: EntityManagerService, ctor: { new(): Job }) {
        super(_entityManagerService, ctor);
    }

    protected _create(priorityCode, sourceMaterial, sourceLanguage, targetLanguage): Job {


        return super.createEntity({
            sourceMaterial: sourceMaterial,
            const: sourceLanguage,
            targetLanguage: targetLanguage,
            //service: ,
            //prority: dataService.getPriorityByType(priorityCode)
        });
    }
}
