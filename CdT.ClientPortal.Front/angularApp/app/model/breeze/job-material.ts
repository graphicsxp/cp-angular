import { EntityBase } from './entity-base';
import { Justification } from './justification';
import { Job } from './job';
import { Material } from './material';

/// <code-import> Place custom imports between <code-import> tags

/// </code-import>

export class JobMaterial extends EntityBase {

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
    isConfidential: boolean;
    isTodoCompleted: boolean;
    shelvedDate: Date;
    markedAsReadyDate: Date;
    crossCheckedDate: Date;
    jobId: string;
    justificationID: string;
    materialId: string;
    job: Job;
    justification: Justification;
    material: Material;
}

