import { LookupNames } from './../../model/lookups';
import { Language } from './../../model/breeze/language';
import { Priority } from './../../model/breeze/priority';
import { JobModification } from './../../model/breeze/job-modification';
import { JobTranslation } from './../../model/breeze/job-translation';
import { Injectable, Type } from '@angular/core';
import { GlobalService } from './../../shared/services/global.service';
import { EntityManagerService } from './../../entity-manager.service';
import { Job } from './../../model/breeze/job';
import { BaseRepositoryService } from '../../shared/services/base-repository.service';
import { Service } from '../../model/breeze/service';
import { SourceMaterial } from '../../model/breeze/entity-model';
import * as _ from 'lodash';
import { MomentModule } from 'angular2-moment';

@Injectable()
export class JobService extends BaseRepositoryService<Job> {

    constructor(protected _entityManagerService: EntityManagerService) {
        super(_entityManagerService, Job);
    }

    public create(service: Service, priority: Priority, sourceMaterial: SourceMaterial, sourceLanguage: Language, targetLanguage: Language): Job {

        const job: Job = super.createEntityByType(this._getType(service.code), {
            sourceMaterial: sourceMaterial,
            sourceLanguage: sourceLanguage,
            targetLanguage: targetLanguage,
            service: service,
            priority: priority
        });

        //job.clientVolume = 0;
        //job.deadline = moment().add(1, 'days').toDate();

        job.jobStatus = _.find(this.getLookup(LookupNames.jobStatuses), js => { return js.code === 'NEW'; });

        return job;
    }

    private _getType(serviceCode: string): string {
        if (serviceCode === 'TR') {
            return JobTranslation.name;
        } else if (serviceCode === 'MO') {
            return JobModification.name;
        }

        return Job.name;
    }
}
