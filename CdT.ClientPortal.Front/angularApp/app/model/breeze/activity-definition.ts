import { EntityBase } from './entity-base';
import { ActivitySkippingRuleSet } from './activity-skipping-rule-set';
import { DocumentIO } from './document-io';
import { WorkflowStepDefinition } from './workflow-step-definition';

/// <code-import> Place custom imports between <code-import> tags

/// </code-import>

export class ActivityDefinition extends EntityBase {

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
    activitySkippingRuleSetId: string;
    code: string;
    entryWorkflowStepDefinitionId: string;
    mainInputDocumentIOId: string;
    sortKey: number;
    activitySkippingRuleSet: ActivitySkippingRuleSet;
    entryWorkflowStepDefinition: WorkflowStepDefinition;
    mainInputDocumentIO: DocumentIO;
}

