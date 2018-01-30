import { EntityBase } from './entity-base';
import { ApplicationNewsFile } from './application-news-file';

/// <code-import> Place custom imports between <code-import> tags

/// </code-import>

export class ApplicationNews extends EntityBase {

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
    newsText: string;
    application: string;
    applicationNewsFiles: ApplicationNewsFile[];
}

