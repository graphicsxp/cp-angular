import { EntityBase } from './entity-base';
import { MaterialClassification } from './material-classification';
import { DocumentIO } from './document-io';

/// <code-import> Place custom imports between <code-import> tags

/// </code-import>

export class DocumentIOMatClassif extends EntityBase {

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
    documentIOId: string;
    materialClassificationId: string;
    priority: number;
    documentIO: DocumentIO;
    materialClassification: MaterialClassification;
}

