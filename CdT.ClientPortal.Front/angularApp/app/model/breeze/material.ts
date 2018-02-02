import { EntityBase } from './entity-base';
import { MaterialClassification } from './material-classification';

/// <code-import> Place custom imports between <code-import> tags

/// </code-import>

export class Material extends EntityBase {

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
    materialClassificationId: string;
    materialType: string;
    uploadedBy: string;
    activityLabel: string;
    uploaderType: string;
    materialClassification: MaterialClassification;
}

