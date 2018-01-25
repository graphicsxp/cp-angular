import { EntityBase } from './entity-base';
import { ClientCountry } from './client-country';
import { Contact } from './contact';
import { Department } from './department';

/// <code-import> Place custom imports between <code-import> tags

/// </code-import>

export class Client extends EntityBase {

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
    abbreviation: string;
    shouldCrossCheck: boolean;
    city: string;
    clientPortalId: number;
    clientSinceDate: Date;
    clientUntilDate: Date;
    defaultTMGroup: string;
    defaultTDGroup: string;
    name: string;
    website: string;
    clientCoordinatorUserName: string;
    clientCountries: ClientCountry[];
    contacts: Contact[];
    departments: Department[];
}

