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

/// </code-import>

export class SourceMaterial extends EntityBase {

    /// <code> Place custom code between <code> tags
    
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

