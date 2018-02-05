import { EntityBase } from './entity-base';
import { Comment } from './comment';
import { Job } from './job';

/// <code-import> Place custom imports between <code-import> tags

/// </code-import>

export class JobComment extends EntityBase {

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
    commentId: string;
    jobId: string;
    comment: Comment;
    job: Job;
}

