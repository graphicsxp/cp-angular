import { EntityBase } from './entity-base';
import { DecisionTreeQueryNode } from './decision-tree-query-node';

/// <code-import> Place custom imports between <code-import> tags

/// </code-import>

export class DecisionTree extends EntityBase {

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
    rootQueryNodeId: string;
    code: string;
    appliesTo: string;
    rootQueryNode: DecisionTreeQueryNode;
}

