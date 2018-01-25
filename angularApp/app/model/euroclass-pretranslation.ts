import { EntityBase } from './entity-base';
import { JobEuroclass } from './job-euroclass';

/// <code-import> Place custom imports between <code-import> tags

/// </code-import>

export class EuroclassPretranslation extends EntityBase {

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
    jobId: string;
    pretranslationText: string;
    pretranslationPercentage: number;
    job: JobEuroclass;
}

