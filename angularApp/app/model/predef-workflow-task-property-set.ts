import { EntityBase } from './entity-base';
import { TaskPropertySet } from './task-property-set';
import { WorkflowTask } from './workflow-task';
import { JobGroup } from './job-group';
import { WorkflowInstance } from './workflow-instance';
import { WorkflowStepDefinition } from './workflow-step-definition';

/// <code-import> Place custom imports between <code-import> tags

/// </code-import>

export class PredefWorkflowTaskPropertySet extends EntityBase {

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
    isDuplicate: boolean;
    isFinalized: boolean;
    jobGroupId: string;
    taskPropertySetId: string;
    taskStatus: string;
    workflowInstanceId: string;
    workflowStepDefinitionId: string;
    derivedWorkflowTasks: WorkflowTask[];
    jobGroup: JobGroup;
    taskPropertySet: TaskPropertySet;
    workflowInstance: WorkflowInstance;
    workflowStepDefinition: WorkflowStepDefinition;
}

