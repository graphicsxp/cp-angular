import { EntityBase } from './entity-base';
import { TransitionRule } from './transition-rule';
import { WorkflowInstance } from './workflow-instance';
import { WorkflowStepDefinition } from './workflow-step-definition';

/// <code-import> Place custom imports between <code-import> tags

/// </code-import>

export class WorkflowSkipStep extends EntityBase {

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
    transitionRuleId: string;
    workflowInstanceId: string;
    workflowStepDefinitionId: string;
    transitionRule: TransitionRule;
    workflowInstance: WorkflowInstance;
    workflowStepDefinition: WorkflowStepDefinition;
}

