import { EntityBase } from './entity-base';
import { WorkflowInstanceExecutionCycle } from './workflow-instance-execution-cycle';
import { WorkflowStep } from './workflow-step';
import { WorkflowStepDefinition } from './workflow-step-definition';

/// <code-import> Place custom imports between <code-import> tags

/// </code-import>

export class WorkflowStepExecutionCycle extends EntityBase {

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
    startDate: Date;
    endDate: Date;
    timeSpent: number;
    closedAfterExecution: boolean;
    workflowInstanceExecutionCycleId: string;
    workflowStepDefinitionId: string;
    workflowStepId: string;
    workflowInstanceExecutionCycle: WorkflowInstanceExecutionCycle;
    workflowStep: WorkflowStep;
    workflowStepDefinition: WorkflowStepDefinition;
}

