import { EntityBase } from './entity-base';
import { DocumentFormat } from './document-format';

/// <code-import> Place custom imports between <code-import> tags

/// </code-import>

export class DocumentFormatTarget extends EntityBase {

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
    description: string;
    displayOrder: number;
    sourceId: string;
    targetId: string;
    validFrom: Date;
    validTo: Date;
    source: DocumentFormat;
    target: DocumentFormat;
}

