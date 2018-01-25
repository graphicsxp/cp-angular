import { EntityBase } from './entity-base';
import { Priority } from './priority';

/// <code-import> Place custom imports between <code-import> tags

/// </code-import>

export class ReceiptDate extends EntityBase {

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
    endHours: number;
    endMinutes: number;
    priorityId: string;
    startHours: number;
    startMinutes: number;
    weekday: number;
    priority: Priority;
}

