import { EntityBase } from './entity-base';
import { WorkflowBranch } from './workflow-branch';
import { WorkflowStep } from './workflow-step';

/// <code-import> Place custom imports between <code-import> tags

/// </code-import>

export class WorkflowBranchDimension extends EntityBase {

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
    dimensionName: string;
    stepThatSpawnedDimensionId: string;
    dimensionBranches: WorkflowBranch[];
    stepThatSpawnedDimension: WorkflowStep;
}

