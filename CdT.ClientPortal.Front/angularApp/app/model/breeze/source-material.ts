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
    targetFormats: Array<DocumentFormatTarget>;
    isScreenDeleted: boolean;

    constructor(private _entityManagerService: EntityManagerService) {
        super();
        this.selectedLanguages = new Array<Language>();
        this.targetFormats = Array<DocumentFormatTarget>();
    }

    static sourceMaterialPostInitializer(sourceMaterial: SourceMaterial) {
        if (sourceMaterial.id === DataType.Guid.defaultValue) {
            sourceMaterial.useSourceAsPreformatted = false;
        }
    }

    public setTargetFormats() {
        this.targetFormats = _.chain(this._entityManagerService.getLookup(LookupNames.documentFormatTargets))
            .filter((f) => { return f.sourceId === (this.material as PhysicalFile).documentFormat.id; })
            .map('target').value();
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

