import { SourceMaterial } from './../../model/breeze/source-material';
import { Material } from './../../model/breeze/material';
import { Injectable } from "@angular/core";
import { BaseRepositoryService } from "../../shared/services/base-repository.service";
import { EntityManagerService } from "../../entity-manager.service";
import { RequestTemplate } from '../../model/breeze/request-template';
import { LookupNames } from '../../model/lookups';
import * as _ from 'lodash';

@Injectable()
export class SourceMaterialService extends BaseRepositoryService {

    constructor(protected _entityManagerService: EntityManagerService) {
        super(_entityManagerService);
        this.entityName = 'SourceMaterial';
    }

    public create(material: Material, template: RequestTemplate): SourceMaterial {
        let sourceMaterial: SourceMaterial = super.createEntity({ material: material }) as SourceMaterial;

        if (template) {
            //TODO create global parameter for pricingPolicy
            //if ($scope.vm.pricingPolicy2018Avalaible) {
            // new confidentiality feature, override other parameters
            sourceMaterial.confidentiality = template.confidentiality;
            sourceMaterial.isExternalized = sourceMaterial.confidentiality.isExternalized;
            sourceMaterial.isConfidential = sourceMaterial.confidentiality.isConfidential;
            //}else
            sourceMaterial.isConfidential = template.confidential;
            sourceMaterial.isExternalized = template.externalisable;
            //}

            sourceMaterial.isPrivate = template.private;

            //check if template's outputFormat is compatible with the uploaded file extension(take the first one)
            if (template.documentFormat) {
                var target = _.chain(this._entityManagerService.getLookup(LookupNames.documentFormatTargets)).find({ target: { code: template.documentFormat.code } }).get('target').value();
                if (target) {
                    sourceMaterial.deliverableDocumentFormat = target;
                }
            }

            //add the selectedSourceLanguages to the sourceMaterial
            _.map(template.sourceLanguages, 'language').forEach(function (lg) { sourceMaterial.selectedSourceLanguages.push(lg); });
            
        }

        return sourceMaterial;
    }
}