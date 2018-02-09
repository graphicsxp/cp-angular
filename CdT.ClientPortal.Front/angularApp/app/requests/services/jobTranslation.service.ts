import { JobTranslation } from './../../model/breeze/job-translation';
import { JobBaseService } from './job.service';
import { EntityManagerService } from '../../entity-manager.service';


export class JobTranslationService {
    constructor(protected _entityManagerService: EntityManagerService) {
        //    super(_entityManagerService, JobTranslation);
    }
}
