import { EntityBase } from './entity-base';
import { CommentIO } from './comment-io';
import { IOSetDocumentIO } from './io-set-document-io';

/// <code-import> Place custom imports between <code-import> tags

/// </code-import>

export class IOSet extends EntityBase {

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
    code: string;
    commentIOs: CommentIO[];
    iOSetDocumentIOs: IOSetDocumentIO[];
}

