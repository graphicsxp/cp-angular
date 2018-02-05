import { EntityBase } from './entity-base';
import { WorkflowBranch } from './workflow-branch';
import { WorkflowBranchContext } from './workflow-branch-context';

/// <code-import> Place custom imports between <code-import> tags

/// </code-import>

export class WorkflowBranchContextWorkflowBranch extends EntityBase {

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
    workflowBranchContextId: string;
    workflowBranchId: string;
    workflowBranch: WorkflowBranch;
    workflowBranchContext: WorkflowBranchContext;
}

