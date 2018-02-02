import { EntityBase } from './entity-base';
import { Job } from './job';
import { Recipient } from './recipient';

/// <code-import> Place custom imports between <code-import> tags

/// </code-import>

export class JobRecipient extends EntityBase {

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
    recipientId: string;
    job: Job;
    recipient: Recipient;
}

