import { EntityBase } from './entity-base';
import { JobComment } from './job-comment';
import { Request } from './request';

/// <code-import> Place custom imports between <code-import> tags

/// </code-import>

export class Comment extends EntityBase {

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
    commentFrom: string;
    commentText: string;
    commentTo: string;
    requestId: string;
    jobComments: JobComment[];
    request: Request;
}

