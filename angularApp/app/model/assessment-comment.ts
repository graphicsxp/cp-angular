import { EntityBase } from './entity-base';
import { Assessment } from './assessment';

/// <code-import> Place custom imports between <code-import> tags

/// </code-import>

export class AssessmentComment extends EntityBase {

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
    assessmentId: string;
    commentAddedBy: string;
    commentText: string;
    assessment: Assessment;
}

