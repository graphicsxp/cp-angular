import { JobBaseService } from './job.service';
import { JobTranslation } from './../../model/breeze/job-translation';
import { Language } from './../../model/breeze/language';
import { Priority } from './../../model/breeze/priority';
import { PhysicalFile } from './../../model/breeze/physical-file';
import { GlobalService } from './../../shared/services/global.service';
import { SourceMaterial } from './../../model/breeze/source-material';
import { Material } from './../../model/breeze/material';
import { Injectable } from '@angular/core';
import { BaseRepositoryService } from '../../shared/services/base-repository.service';
import { EntityManagerService } from '../../entity-manager.service';
import { RequestTemplate } from '../../model/breeze/request-template';
import { LookupNames } from '../../model/lookups';
import * as _ from 'lodash';
import { DocumentFormat } from '../../model/breeze/document-format';
import { Job } from '../../model/breeze/job';

@Injectable()
export class SourceMaterialService extends BaseRepositoryService<SourceMaterial> {

    constructor(protected _entityManagerService: EntityManagerService, private _jobBaseService: JobBaseService, public globalService: GlobalService) {
        super(_entityManagerService, SourceMaterial);
    }

    public create(material: Material, template: RequestTemplate): SourceMaterial {
        const sourceMaterial = super.createEntity({ material: material });

        sourceMaterial.confidentiality = _.find(this._entityManagerService.getLookup(LookupNames.confidentialities), { code: 'NO' });
        sourceMaterial.isConfidential = sourceMaterial.confidentiality.isConfidential;
        sourceMaterial.isExternalized = sourceMaterial.confidentiality.isExternalized;
        sourceMaterial.isPrivate = false;
        sourceMaterial.useSourceAsPreformatted = false;

        if (template) {
            if (this.globalService.pricingPolicy2018Avalaible) {
                // new confidentiality feature, override other parameters
                sourceMaterial.confidentiality = template.confidentiality;
                sourceMaterial.isExternalized = sourceMaterial.confidentiality.isExternalized;
                sourceMaterial.isConfidential = sourceMaterial.confidentiality.isConfidential;
            } else {
                sourceMaterial.isConfidential = template.confidential;
                sourceMaterial.isExternalized = template.externalisable;
            }

            sourceMaterial.isPrivate = template.private;

            // set the document format
            if (template.service && template.service.code === 'ST') {
                // sourceMaterial.targetFormats = _.filter(this._entityManagerService.getLookup(LookupNames.documentFormats), (df) => { return _.includes(DocumentFormat.validSubtitlingFormatCodes, df.code); });
            } else if (sourceMaterial) {
                // this.setTargetFormats(sourceMaterial);
            }

            // check if template's outputFormat is compatible with the uploaded file extension(take the first one)
            if (template.documentFormat) {
                const target = _.chain(this._entityManagerService.getLookup(LookupNames.documentFormatTargets))
                    .find({ target: { code: template.documentFormat.code } })
                    .get('target').value();
                if (target) {
                    sourceMaterial.deliverableDocumentFormat = target;
                }
            }

            // add the selectedSourceLanguages to the sourceMaterial
            _.map(template.sourceLanguages, 'language').forEach(function (lg) { sourceMaterial.selectedLanguages.push(lg); });

        }

        return sourceMaterial;
    }

    /**
     * Returns a list of DocumentFormat that matches the possible target formats for the given SourceMaterial
     * @param sourceMaterial the sourceMaterial to get a list of targetFormats from
     */
    public getTargetFormats(sourceMaterial: SourceMaterial): Array<DocumentFormat> {
        return _.chain(this._entityManagerService.getLookup(LookupNames.documentFormatTargets))
            .filter((f) => { return f.sourceId === (sourceMaterial.material as PhysicalFile).documentFormat.id; })
            .map('target').value();
    }

    /**
     * Delete jobs that don't match any sourceLanguage on the sourceMaterial. This will happen when a sourceLanguage is deleted from
     * the SourceMaterial and jobs were already assigned to this sourceLanguage
     * @param sourceMaterial the sourceMaterial to delete jobs from
     */
    public deleteJobs(sourceMaterial: SourceMaterial): void {
        sourceMaterial.jobs.forEach(job => {
            if (_.find(sourceMaterial.selectedLanguages, lang => { return lang.code === job.sourceLanguage.code })) {
                job.isMarkedForDeletion = true;
            }
        });
        this._entityManagerService.deleteEntities(_.filter(sourceMaterial.jobs, job => { return job.isScreenDeleted; }), ['jobMaterials']);
    }

    /**
      *  add a new job to the sourceMaterial
      *  @param sourceMaterial the source material to which the job should be added
      *  @param priorityCode of the priority
      *  @param targetLanguage the target language to set on the job
      *  @param serviceCode for which type of service are we adding the job ? In case of Modification there is some bespoke logic to apply.
      *  @param ignoreExistingTargetLanguage if a job with the same target language already exists and this flag is set to true, then we create
      *  a new job nevertheless. We just set its targetLanguage to null. If the flag is false, the job won't be created.
      */
    public addJob<T>(sourceMaterial: SourceMaterial, priorityCode: string, targetLanguage: Language, serviceCode: string, ignoreExistingTargetLanguage: boolean): Array<Job> {
        // if the sourceMaterial has multiple sourceLanguages, there could be more than 1 job to add
        let jobs = new Array<Job>();
        let isUniqueJob;
        let job;

        if (sourceMaterial.sourceLanguages.length === 1) {
            // if there is already a job with this target language then null it. This will force the user to set another one.
            // isUniqueJob = _isUniqueJob(sourceMaterial, sourceMaterial.sourceLanguages[0].language, targetLanguage, serviceCode);

            if (!isUniqueJob && ignoreExistingTargetLanguage) {
                targetLanguage = null;
                isUniqueJob = true;
            }

            if (isUniqueJob) {
                // job = dataService.job._create(serviceCode, priorityCode, sourceMaterial, sourceMaterial.sourceLanguages[0].language, targetLanguage);
                jobs.push(job);
                //  if (serviceCode === 'MO') { _addOldOriginalToJob(sourceMaterial, job); }
            }
        }

        // is multi language so I'll create pairs for each SL-TL
        if (sourceMaterial.sourceLanguages.length > 1) {
            for (let i = 0; i < sourceMaterial.sourceLanguages.length; i++) {
                // if there is already a job with this target language then null it. This will force the user to set another one.
                // isUniqueJob = _isUniqueJob(sourceMaterial, sourceMaterial.sourceLanguages[i].language, targetLanguage, serviceCode);

                if (!isUniqueJob && ignoreExistingTargetLanguage) {
                    targetLanguage = null;
                    isUniqueJob = true;
                }

                if (isUniqueJob) {
                    // job = dataService.job._create(serviceCode, priorityCode, sourceMaterial, sourceMaterial.sourceLanguages[i].language, targetLanguage);
                    jobs.push(job);
                    //    if (serviceCode === 'MO') { _addOldOriginalToJob(sourceMaterial, job); }
                }
            }
        }

        return jobs;
    }
}
