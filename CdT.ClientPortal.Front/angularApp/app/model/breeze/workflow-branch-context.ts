import { EntityBase } from './entity-base';
import { WorkflowBranchDimension } from './workflow-branch-dimension';
import { WorkflowBranchContextWorkflowBranch } from './workflow-branch-context-workflow-branch';
import { WorkflowStep } from './workflow-step';

/// <code-import> Place custom imports between <code-import> tags

/// </code-import>

export class WorkflowBranchContext extends EntityBase {

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
    dimensionId: string;
    workflowStepId: string;
    dimension: WorkflowBranchDimension;
    workflowBranchContextWorkflowBranches: WorkflowBranchContextWorkflowBranch[];
    workflowStep: WorkflowStep;
}

