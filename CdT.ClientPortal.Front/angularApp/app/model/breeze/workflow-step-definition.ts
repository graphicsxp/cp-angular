import { EntityBase } from './entity-base';
import { ActivityDefinition } from './activity-definition';
import { TaskDefinition } from './task-definition';
import { TransitionRule } from './transition-rule';
import { WorkflowDefinition } from './workflow-definition';

/// <code-import> Place custom imports between <code-import> tags

/// </code-import>

export class WorkflowStepDefinition extends EntityBase {

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
    activityDefinitionId: string;
    closeActions: string;
    code: string;
    initActions: string;
    isEndingPoint: boolean;
    isStartingPoint: boolean;
    taskDefinitionId: string;
    workflowDefinitionId: string;
    activityDefinition: ActivityDefinition;
    taskDefinition: TaskDefinition;
    transitionRules: TransitionRule[];
    workflowDefinition: WorkflowDefinition;
}

