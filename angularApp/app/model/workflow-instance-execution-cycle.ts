import { EntityBase } from './entity-base';
import { WorkflowEngineExecutionCycle } from './workflow-engine-execution-cycle';
import { WorkflowStepExecutionCycle } from './workflow-step-execution-cycle';
import { WorkflowTaskExecutionCycle } from './workflow-task-execution-cycle';

/// <code-import> Place custom imports between <code-import> tags

/// </code-import>

export class WorkflowInstanceExecutionCycle extends EntityBase {

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
    workflowEngineExecutionCycleId: string;
    workflowInstanceId: string;
    logEntry: string;
    numberOfOpenSteps: number;
    managedThreadId: number;
    workflowEngineExecutionCycle: WorkflowEngineExecutionCycle;
    workflowStepExecutionCycles: WorkflowStepExecutionCycle[];
    workflowTaskExecutionCycles: WorkflowTaskExecutionCycle[];
}

