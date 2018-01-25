import { EntityBase } from './entity-base';
import { WorkflowTaskContextualInfo } from './workflow-task-contextual-info';
import { TaskPropertySet } from './task-property-set';
import { PredefWorkflowTaskPropertySet } from './predef-workflow-task-property-set';
import { JobGroup } from './job-group';
import { TaskDefinition } from './task-definition';
import { WorkflowStep } from './workflow-step';

/// <code-import> Place custom imports between <code-import> tags

/// </code-import>

export class WorkflowTask extends EntityBase {

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
    completionDate: Date;
    isClosed: boolean;
    jobGroupId: string;
    originatesFromId: string;
    result: string;
    taskDefinitionId: string;
    taskPropertySetId: string;
    workflowStepid: string;
    workflowTaskContextualInfoId: string;
    workflowTaskStatus: string;
    jobGroup: JobGroup;
    originatesFrom: PredefWorkflowTaskPropertySet;
    taskDefinition: TaskDefinition;
    taskPropertySet: TaskPropertySet;
    workflowStep: WorkflowStep;
    workflowTaskContextualInfo: WorkflowTaskContextualInfo;
}

