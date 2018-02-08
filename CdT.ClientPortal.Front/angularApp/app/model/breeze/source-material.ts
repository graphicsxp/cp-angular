import { EntityBase } from './entity-base';
import { Confidentiality } from './confidentiality';
import { PreformattedFile } from './preformatted-file';
import { DocumentFormat } from './document-format';
import { Domain } from './domain';
import { Job } from './job';
import { Material } from './material';
import { SourceMaterialLanguage } from './source-material-language';
import { Request } from './request';

/// <code-import> Place custom imports between <code-import> tags
import { Language } from './language';
import { DocumentFormatTarget } from './document-format-target';
import * as _ from 'lodash';
import { EntityManagerService } from '../../entity-manager.service';
import { LookupNames } from '../lookups';
import { DataType } from 'breeze-client';
import { PhysicalFile } from './physical-file';
import { EntityState } from 'breeze-client';
/// </code-import>

export class SourceMaterial extends EntityBase {

    /// <code> Place custom code between <code> tags
    selectedLanguages: Array<Language>;
    selectedTargetLanguages: Array<Language>;
    isMarkedForDeletion: boolean;

    static sourceMaterialPostInitializer(sourceMaterial: SourceMaterial) {

        sourceMaterial.selectedTargetLanguages = new Array<Language>();

        if (sourceMaterial.id === DataType.Guid.defaultValue) {
            sourceMaterial.selectedLanguages = new Array<Language>();
            sourceMaterial.useSourceAsPreformatted = false;
        } else {
            // populate target languages for each source material
            sourceMaterial.jobs.forEach(function (job) {
                sourceMaterial.selectedTargetLanguages.push(job.targetLanguage);
            });
        }
    }

    constructor() {
        super();
    }

    public setSelectedSourceLanguages() {
        this.selectedLanguages = [];

        this.sourceLanguages.forEach((sl) => {
            if (sl.entityAspect.entityState !== EntityState.Deleted) {
                this.selectedLanguages.push(sl.language);
            }
        });
    }

    /// </code>

    // Generated code. Do not place code below this line.
    id: string;
    version: number;
    createdBy: string;
    updatedBy: string;
    creationDate: Date;
    updateDate: Date;
    isDeleted: boolean;
    deliverableDocumentFormatId: string;
    dMSVolumeChangeJustification: string;
    domainId: string;
    isConfidential: boolean;
    isExternalized: boolean;
    confidentialityId: string;
    isPrivate: boolean;
    materialId: string;
    mergedOutputId: string;
    requestId: string;
    uploadedBy: string;
    useSourceAsPreformatted: boolean;
    useWorldServer: boolean;
    useWorldServerJustification: string;
    clientReferenceId: string;
    deliverableDocumentFormat: DocumentFormat;
    domain: Domain;
    confidentiality: Confidentiality;
    jobs: Job[];
    material: Material;
    mergedOutput: Material;
    preformattedFiles: PreformattedFile[];
    request: Request;
    sourceLanguages: SourceMaterialLanguage[];
}

