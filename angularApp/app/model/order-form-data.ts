import { EntityBase } from './entity-base';
import { Assignee } from './assignee';
import { OrderFormPdfData } from './order-form-pdf-data';
import { TaskPropertySet } from './task-property-set';

/// <code-import> Place custom imports between <code-import> tags

/// </code-import>

export class OrderFormData extends EntityBase {

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
    cancellationReason: string;
    clientAbbreviation: string;
    costOfBdc: number;
    externalProviderId: string;
    frameworkContractNumber: string;
    nameOfExternalVendor: string;
    orderFormId: number;
    orderFormPdfDataId: string;
    orderFormStatus: string;
    orderFormTaskDeadline: Date;
    requestIdentifier: string;
    signatureDate: Date;
    signedByUserId: number;
    externalProvider: Assignee;
    orderFormPdfData: OrderFormPdfData;
    taskPropertySets: TaskPropertySet[];
}

