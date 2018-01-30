import { EntityBase } from './entity-base';
import { ActivitySkippingRule } from './activity-skipping-rule';

/// <code-import> Place custom imports between <code-import> tags

/// </code-import>

export class ActivitySkippingRuleSet extends EntityBase {

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
    code: string;
    activitySkippingRules: ActivitySkippingRule[];
}

