import { EntityBase } from './entity-base';
import { BusinessRule } from './business-rule';

/// <code-import> Place custom imports between <code-import> tags

/// </code-import>

export class BusinessRuleSet extends EntityBase {

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
    code: string;
    appliesTo: string;
    businessRules: BusinessRule[];
}

