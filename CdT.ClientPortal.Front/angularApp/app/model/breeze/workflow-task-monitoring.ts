import { EntityBase } from './entity-base';

/// <code-import> Place custom imports between <code-import> tags

/// </code-import>

export class WorkflowTaskMonitoring extends EntityBase {

    /// <code> Place custom code between <code> tags
    
    /// </code>

    // Generated code. Do not place code below this line.
    id: string;
    workflowActivity: string;
    taskType: string;
    taskDueDate: Date;
    closestDeadline: Date;
    clientAbbreviation: string;
    requestIdentifier: string;
    sourceLanguage: string;
    targetLanguage: string;
    service: string;
    assignee: string;
    markedBy: string;
    takenOn: Date;
    status: string;
    createdOn: Date;
    completedOn: Date;
    purpose: string;
    requestId: string;
    requestContacts: string;
    isFirstAssessmentDone: boolean;
    workflowInstanceId: string;
    workflowStepDefinitionId: string;
    originatesFromId: string;
    taskDefinitionCode: string;
    taskDefaultLabel: string;
    activityDefinitionCode: string;
    predefinedWSDId: string;
    workflowTaskId: string;
    predefinedTPSId: string;
}

