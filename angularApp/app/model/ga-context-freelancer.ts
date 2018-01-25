import { EntityBase } from './entity-base';
import { GAContext } from './ga-context';
import { ExternalResource } from './external-resource';

/// <code-import> Place custom imports between <code-import> tags

/// </code-import>

export class GAContextFreelancer extends EntityBase {

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
    freelancerId: string;
    gAContextId: string;
    ranking: number;
    status: string;
    freelancer: ExternalResource;
    gAContext: GAContext;
}

