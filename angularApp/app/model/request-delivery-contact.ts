import { EntityBase } from './entity-base';
import { Contact } from './contact';
import { Request } from './request';

/// <code-import> Place custom imports between <code-import> tags

/// </code-import>

export class RequestDeliveryContact extends EntityBase {

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
    contactId: string;
    requestId: string;
    contact: Contact;
    request: Request;
}

