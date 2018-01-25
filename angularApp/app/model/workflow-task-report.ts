import { EntityBase } from './entity-base';

/// <code-import> Place custom imports between <code-import> tags

/// </code-import>

export class WorkflowTaskReport extends EntityBase {

    /// <code> Place custom code between <code> tags
    
    /// </code>

    // Generated code. Do not place code below this line.
    id: string;
    workflowActivity: string;
    taskType: string;
    taskDueDate: Date;
    clientAbbreviation: string;
    volume: number;
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
    requestId: string;
    workflowInstanceId: string;
    workflowStepDefinitionId: string;
    originatesFromId: string;
    taskDefinitionCode: string;
    taskDefaultLabel: string;
}

