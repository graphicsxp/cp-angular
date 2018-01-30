import { EntityBase } from './entity-base';
import { Assignee } from './assignee';
import { Request } from './request';
import { TranslationTaskPropertySet } from './translation-task-property-set';

/// <code-import> Place custom imports between <code-import> tags

/// </code-import>

export class SpecificContract extends EntityBase {

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
    actingAs: string;
    addressCityOfExt: string;
    addressCountryOfExt: string;
    addressPOBoxOfExt: string;
    addressStreet2OfExt: string;
    addressStreet3OfExt: string;
    addressStreetOfExt: string;
    addressZipOfExt: string;
    cdtNameEN: string;
    cdtNameFR: string;
    cdtShortName: string;
    contactPerson: string;
    externalProviderId: string;
    freelanceWebsite: string;
    headOfLts: string;
    headOfTrans: string;
    ltsDept: string;
    nameOfDocuments: string;
    nameOfExternalProvider: string;
    nameOfLegalRepresentative: string;
    offerResult: string;
    offerSubmissionDate: Date;
    priceOfferExclVat: number;
    requestId: string;
    sCConditions: string;
    sCFooter: string;
    serviceTaskDeadline: Date;
    serviceType: string;
    sourceLanguage: string;
    specificContractId: string;
    specificContractStatus: string;
    targetLanguage: string;
    telephoneNumber: string;
    templateVersion: string;
    transDept: string;
    unit: string;
    unitVolume: string;
    userComment: string;
    validationDate: Date;
    vatNumber: string;
    vatRate: number;
    externalProvider: Assignee;
    request: Request;
    translationTaskPropertySets: TranslationTaskPropertySet[];
}

