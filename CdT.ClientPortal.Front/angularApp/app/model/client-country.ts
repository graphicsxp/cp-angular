import { EntityBase } from './entity-base';
import { Client } from './client';
import { Country } from './country';

/// <code-import> Place custom imports between <code-import> tags

/// </code-import>

export class ClientCountry extends EntityBase {

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
    countryId: string;
    validFrom: Date;
    validTo: Date;
    client: Client;
    country: Country;
}

