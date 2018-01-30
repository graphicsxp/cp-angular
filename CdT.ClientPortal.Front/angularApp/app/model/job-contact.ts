import { EntityBase } from './entity-base';
import { Contact } from './contact';
import { Job } from './job';

/// <code-import> Place custom imports between <code-import> tags

/// </code-import>

export class JobContact extends EntityBase {

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
    contactId: string;
    jobId: string;
    contact: Contact;
    job: Job;
}

