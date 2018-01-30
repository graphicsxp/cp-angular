import { EntityBase } from './entity-base';
import { AddressBook } from './address-book';
import { Client } from './client';
import { Department } from './department';

/// <code-import> Place custom imports between <code-import> tags

/// </code-import>

export class Contact extends EntityBase {

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
    addressBookId: string;
    clientId: string;
    departmentId: string;
    email: string;
    firstName: string;
    isActive: boolean;
    isFromClientPortal: boolean;
    lastName: string;
    phoneCountryCode: string;
    phoneNumber: string;
    userName: string;
    addressBook: AddressBook;
    client: Client;
    department: Department;
}

