import { EntityBase } from './entity-base';
import { AppScreenField } from './app-screen-field';
import { Status } from './status';

/// <code-import> Place custom imports between <code-import> tags

/// </code-import>

export class AppScreenFieldStatus extends EntityBase {

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
    appScreenFieldId: string;
    isFieldEditable: string;
    statusId: string;
    appScreenField: AppScreenField;
    status: Status;
}

