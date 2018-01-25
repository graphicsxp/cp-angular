import { EntityBase } from './entity-base';
import { Job } from './job';
import { JobGroup } from './job-group';

/// <code-import> Place custom imports between <code-import> tags

/// </code-import>

export class JobJobGroup extends EntityBase {

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
    jobGroupId: string;
    jobId: string;
    job: Job;
    jobGroup: JobGroup;
}

