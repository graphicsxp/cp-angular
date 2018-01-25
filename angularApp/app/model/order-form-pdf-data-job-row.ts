import { EntityBase } from './entity-base';
import { OrderFormPdfData } from './order-form-pdf-data';

/// <code-import> Place custom imports between <code-import> tags

/// </code-import>

export class OrderFormPdfDataJobRow extends EntityBase {

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
    deliveryDeadline: string;
    finalRate: string;
    nameOfService: string;
    orderFormPdfDataId: string;
    ratePerUnit: string;
    sourceDocumentName: string;
    sourceLanguage: string;
    targetLanguage: string;
    totalPaymentDue: string;
    unit: string;
    variationOfRate: string;
    volume: string;
    characters084: string;
    characters100: string;
    characters8599: string;
    charactersBilled084: string;
    charactersBilled100: string;
    charactersBilled8599: string;
    charactersBilledRepetitions: string;
    charactersBilledTotal: string;
    charactersRepetitions: string;
    charactersTotal: string;
    pagesBilled084: string;
    pagesBilled100: string;
    pagesBilled8599: string;
    pagesBilledRepetitions: string;
    pagesBilledTotal: string;
    orderFormPdfData: OrderFormPdfData;
}

