import { EntityBase } from './entity-base';
import { GAContextFreelancer } from './ga-context-freelancer';

/// <code-import> Place custom imports between <code-import> tags

/// </code-import>

export class GAContext extends EntityBase {

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
    gAContextStatus: string;
    contextFreelancers: GAContextFreelancer[];
}

