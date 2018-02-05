import { EntityBase } from './entity-base';
import { WorkflowStepDefinition } from './workflow-step-definition';

/// <code-import> Place custom imports between <code-import> tags

/// </code-import>

export class TransitionRule extends EntityBase {

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
    branchingDimensionName: string;
    branchingInfo: string;
    branchingType: string;
    code: string;
    expression: string;
    nextStepActions: string;
    parsingOrder: number;
    prevStepActions: string;
    workflowStepDefinitionFromId: string;
    workflowStepDefinitionToId: string;
    workflowStepDefinitionFrom: WorkflowStepDefinition;
    workflowStepDefinitionTo: WorkflowStepDefinition;
}

