import { EntityBase } from './entity-base';
import { JobJobGroup } from './job-job-group';

/// <code-import> Place custom imports between <code-import> tags

/// </code-import>

export class JobGroup extends EntityBase {

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
    jobJobGroup: JobJobGroup[];
}

