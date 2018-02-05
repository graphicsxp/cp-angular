import { EntityBase } from './entity-base';
import { TopicCategory } from './topic-category';
import { TopicMessage } from './topic-message';
import { TopicSourceMaterial } from './topic-source-material';
import { Request } from './request';

/// <code-import> Place custom imports between <code-import> tags

/// </code-import>

export class Topic extends EntityBase {

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
    requestId: string;
    categoryId: string;
    taskDeadline: Date;
    isTopicClosed: boolean;
    workflowTaskId: string;
    topicSourceMaterials: TopicSourceMaterial[];
    request: Request;
    messages: TopicMessage[];
    category: TopicCategory;
}

