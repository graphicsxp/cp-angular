import { EntityBase } from './entity-base';
import { OrderFormPdfDataJobRow } from './order-form-pdf-data-job-row';
import { OrderFormData } from './order-form-data';

/// <code-import> Place custom imports between <code-import> tags

/// </code-import>

export class OrderFormPdfData extends EntityBase {

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
    cdtContact: string;
    cdtName: string;
    clientAbbreviation: string;
    commitmentNumber: string;
    aBACId: string;
    contractNumber: string;
    dateOfOrderFormCreation: string;
    dateOfSignature: string;
    externalProviderCity: string;
    externalProviderCountry: string;
    externalProviderName: string;
    externalProviderStreet: string;
    externalProviderZip: string;
    flosysEmail: string;
    frameworkListNumber: string;
    grandTotal: string;
    nameOfAuthorizingOfficer: string;
    nameOfExternalVendor: string;
    orderFormNumber: string;
    templateVersion: string;
    weight084: string;
    weight100: string;
    weight8589: string;
    weightRepetitions: string;
    orderFormDatas: OrderFormData[];
    orderFormPdfDataJobRows: OrderFormPdfDataJobRow[];
}

