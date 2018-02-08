import { PhysicalFile } from './../../model/breeze/physical-file';
import { GlobalService } from './../../shared/services/global.service';
import { SourceMaterial } from './../../model/breeze/source-material';
import { Material } from './../../model/breeze/material';
import { Injectable } from "@angular/core";
import { BaseRepositoryService } from "../../shared/services/base-repository.service";
import { EntityManagerService } from "../../entity-manager.service";
import { RequestTemplate } from '../../model/breeze/request-template';
import { LookupNames } from '../../model/lookups';
import * as _ from 'lodash';
import { DocumentFormat } from '../../model/breeze/document-format';

@Injectable()
export class SourceMaterialService extends BaseRepositoryService<SourceMaterial> {

    constructor(protected _entityManagerService: EntityManagerService, public globalService: GlobalService) {
        super(_entityManagerService, SourceMaterial);
        console.log(this.globalService);
    }

    public create(material: Material, template: RequestTemplate): SourceMaterial {
        const sourceMaterial = super.createEntity<SourceMaterial>(SourceMaterial, { material: material });

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
}
