import { EntityBase } from './entity-base';
import { WorkflowInstanceExecutionCycle } from './workflow-instance-execution-cycle';
import { WorkflowTaskExecutionCycle } from './workflow-task-execution-cycle';

/// <code-import> Place custom imports between <code-import> tags

/// </code-import>

export class WorkflowEngineExecutionCycle extends EntityBase {

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
    executionType: string;
    workflowEngineId: number;
    workflowInstanceExecutionCycles: WorkflowInstanceExecutionCycle[];
    workflowTaskExecutionCycles: WorkflowTaskExecutionCycle[];
}

