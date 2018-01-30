import { EntityBase } from './entity-base';
import { MessageBody } from './message-body';
import { TopicMessageUser } from './topic-message-user';
import { Topic } from './topic';

/// <code-import> Place custom imports between <code-import> tags

/// </code-import>

export class TopicMessage extends EntityBase {

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
    messageId: string;
    topicId: string;
    notifyCC: boolean;
    notifyRefTeam: boolean;
    notifyLanguageTeam: boolean;
    notifyTWA: boolean;
    message: MessageBody;
    topic: Topic;
    usersRead: TopicMessageUser[];
}

