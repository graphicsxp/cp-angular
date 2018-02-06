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
        let sourceMaterial = super.createEntity({ material: material });

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

            //set the document format
            if (template.service && template.service.code === 'ST') {
                //sourceMaterial.targetFormats = _.filter(this._entityManagerService.getLookup(LookupNames.documentFormats), (df) => { return _.includes(DocumentFormat.validSubtitlingFormatCodes, df.code); });
            } else if (sourceMaterial) {
                //this.setTargetFormats(sourceMaterial);
            }

            //check if template's outputFormat is compatible with the uploaded file extension(take the first one)
            if (template.documentFormat) {
                var target = _.chain(this._entityManagerService.getLookup(LookupNames.documentFormatTargets)).find({ target: { code: template.documentFormat.code } }).get('target').value();
                if (target) {
                    sourceMaterial.deliverableDocumentFormat = target;
                }
            }

            //add the selectedSourceLanguages to the sourceMaterial
            _.map(template.sourceLanguages, 'language').forEach(function (lg) { sourceMaterial.selectedLanguages.push(lg); });

        }

        return sourceMaterial;
    }

    /**
     * Returns a list of DocumentFormat that matches the possible target formats for the given SourceMaterial
     * @param sourceMaterial 
     */
    public getTargetFormats(sourceMaterial: SourceMaterial) : Array<DocumentFormat> {
        return _.chain(this._entityManagerService.getLookup(LookupNames.documentFormatTargets))
            .filter((f) => { return f.sourceId === (sourceMaterial.material as PhysicalFile).documentFormat.id; })
            .map('target').value();
    }
}