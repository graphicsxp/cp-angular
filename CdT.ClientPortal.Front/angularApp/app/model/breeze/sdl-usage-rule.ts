import { EntityBase } from './entity-base';
import { DocumentFormat } from './document-format';
import { Service } from './service';

/// <code-import> Place custom imports between <code-import> tags

/// </code-import>

export class SDLUsageRule extends EntityBase {

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
    serviceId: string;
    shouldUseSDL: boolean;
    sourceDocumentFormatId: string;
    targetDocumentFormatId: string;
    workingDocumentFormatId: string;
    service: Service;
    sourceDocumentFormat: DocumentFormat;
    targetDocumentFormat: DocumentFormat;
    workingDocumentFormat: DocumentFormat;
}

