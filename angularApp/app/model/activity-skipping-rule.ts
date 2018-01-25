import { EntityBase } from './entity-base';
import { ActivitySkippingRuleSet } from './activity-skipping-rule-set';
import { DocumentFormat } from './document-format';
import { Service } from './service';

/// <code-import> Place custom imports between <code-import> tags

/// </code-import>

export class ActivitySkippingRule extends EntityBase {

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
    activityExecutionType: string;
    activitySkippingRuleSetId: string;
    serviceId: string;
    sourceDocumentFormatId: string;
    targetDocumentFormatId: string;
    activitySkippingRuleSet: ActivitySkippingRuleSet;
    service: Service;
    sourceDocumentFormat: DocumentFormat;
    targetDocumentFormat: DocumentFormat;
}

