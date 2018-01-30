import { EntityBase } from './entity-base';
import { Client } from './client';

/// <code-import> Place custom imports between <code-import> tags

/// </code-import>

export class Recipient extends EntityBase {

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
    clientId: string;
    emailAccount: string;
    client: Client;
}

