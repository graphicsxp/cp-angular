import { EntityBase } from './entity-base';
import { BusinessRuleSet } from './business-rule-set';

/// <code-import> Place custom imports between <code-import> tags

/// </code-import>

export class BusinessRule extends EntityBase {

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
    businessRuleSetId: string;
    expression: string;
    isActive: boolean;
    priority: number;
    returnValue: string;
    businessRuleSet: BusinessRuleSet;
}

