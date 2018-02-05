import { EntityBase } from './entity-base';
import { Topic } from './topic';
import { SourceMaterial } from './source-material';

/// <code-import> Place custom imports between <code-import> tags

/// </code-import>

export class TopicSourceMaterial extends EntityBase {

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
    sourceMaterialId: string;
    topicId: string;
    sourceMaterial: SourceMaterial;
    topic: Topic;
}

