import { EntityBase } from './entity-base';
import { NotificationRead } from './notification-read';
import { NotificationTemplate } from './notification-template';

/// <code-import> Place custom imports between <code-import> tags

/// </code-import>

export class Notification extends EntityBase {

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
    message: string;
    notificationType: string;
    isAssignedToGroup: boolean;
    username: string;
    templateId: string;
    html5Notification: boolean;
    unpersisted: boolean;
    usersRead: NotificationRead[];
    template: NotificationTemplate;
}

