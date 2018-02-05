import { EntityBase } from './entity-base';
import { PredefWorkflowTaskPropertySet } from './predef-workflow-task-property-set';
import { WorkflowInstance } from './workflow-instance';
import { WorkflowStep } from './workflow-step';

/// <code-import> Place custom imports between <code-import> tags

/// </code-import>

export class WorkflowEvent extends EntityBase {

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
    event: string;
    eventStatus: string;
    predefWorkflowTaskPropertySetId: string;
    workflowInstanceId: string;
    workflowStepId: string;
    predefWorkflowTaskPropertySet: PredefWorkflowTaskPropertySet;
    workflowInstance: WorkflowInstance;
    workflowStep: WorkflowStep;
}

