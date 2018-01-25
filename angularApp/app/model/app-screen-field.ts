import { EntityBase } from './entity-base';
import { AppScreenFieldStatus } from './app-screen-field-status';

/// <code-import> Place custom imports between <code-import> tags

/// </code-import>

export class AppScreenField extends EntityBase {

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
    defaultLabel: string;
    validFrom: Date;
    validTo: Date;
    description: string;
    displayOrder: number;
    isUsedInEcdt: boolean;
    abbreviation: string;
    appScreenFieldStatuses: AppScreenFieldStatus[];
}

