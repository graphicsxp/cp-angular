import { EntityBase } from './entity-base';
import { WorkflowStep } from './workflow-step';

/// <code-import> Place custom imports between <code-import> tags

/// </code-import>

export class BusinessRuleLogEntry extends EntityBase {

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
    logEntry: string;
    ruleSetToExecute: string;
    workflowStepId: string;
    workflowStep: WorkflowStep;
}

