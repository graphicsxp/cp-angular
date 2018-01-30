import { EntityBase } from './entity-base';
import { Request } from './request';
import { WorkflowEvent } from './workflow-event';
import { WorkflowInstanceJob } from './workflow-instance-job';
import { PredefWorkflowTaskPropertySet } from './predef-workflow-task-property-set';
import { WorkflowSkipStep } from './workflow-skip-step';
import { WorkflowStep } from './workflow-step';
import { WorkflowDefinition } from './workflow-definition';

/// <code-import> Place custom imports between <code-import> tags

/// </code-import>

export class WorkflowInstance extends EntityBase {

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
    launchedByUserId: number;
    requestId: string;
    userComments: string;
    workflowDefinitionId: string;
    workflowStatus: string;
    predefinedWorkflowTaskPropertySets: PredefWorkflowTaskPropertySet[];
    request: Request;
    workflowDefinition: WorkflowDefinition;
    workflowEvents: WorkflowEvent[];
    workflowInstanceJobs: WorkflowInstanceJob[];
    workflowSkipSteps: WorkflowSkipStep[];
    workflowSteps: WorkflowStep[];
}

