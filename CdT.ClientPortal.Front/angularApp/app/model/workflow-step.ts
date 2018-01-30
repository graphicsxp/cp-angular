import { EntityBase } from './entity-base';
import { WorkflowBranchContext } from './workflow-branch-context';
import { WorkflowTask } from './workflow-task';
import { WorkflowInstance } from './workflow-instance';
import { WorkflowStepDefinition } from './workflow-step-definition';

/// <code-import> Place custom imports between <code-import> tags

/// </code-import>

export class WorkflowStep extends EntityBase {

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
    isClosed: boolean;
    workflowInstanceId: string;
    workflowStepDefinitionId: string;
    errorCounter: number;
    workflowStepStatus: string;
    workflowBranchContexts: WorkflowBranchContext[];
    workflowInstance: WorkflowInstance;
    workflowStepDefinition: WorkflowStepDefinition;
    workflowTasks: WorkflowTask[];
}

