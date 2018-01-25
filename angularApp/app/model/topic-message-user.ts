import { EntityBase } from './entity-base';
import { TopicMessage } from './topic-message';

/// <code-import> Place custom imports between <code-import> tags

/// </code-import>

export class TopicMessageUser extends EntityBase {

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
    username: string;
    topicMessageId: string;
    topicMessage: TopicMessage;
}

