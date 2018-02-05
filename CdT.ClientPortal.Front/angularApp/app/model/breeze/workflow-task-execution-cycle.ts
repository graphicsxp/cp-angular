import { EntityBase } from './entity-base';
import { WorkflowEngineExecutionCycle } from './workflow-engine-execution-cycle';
import { WorkflowInstanceExecutionCycle } from './workflow-instance-execution-cycle';

/// <code-import> Place custom imports between <code-import> tags

/// </code-import>

export class WorkflowTaskExecutionCycle extends EntityBase {

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
    taskDefinitionId: string;
    logEntry: string;
    workflowInstanceExecutionCycleId: string;
    workflowEngineExecutionCycleId: string;
    workflowTaskId: string;
    workflowInstanceExecutionCycle: WorkflowInstanceExecutionCycle;
    workflowEngineExecutionCycle: WorkflowEngineExecutionCycle;
}

