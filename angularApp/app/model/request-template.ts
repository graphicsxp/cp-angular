import { EntityBase } from './entity-base';
import { Confidentiality } from './confidentiality';
import { RequestTemplateTargetLanguage } from './request-template-target-language';
import { RequestTemplateDeliveryContact } from './request-template-delivery-contact';
import { RequestTemplateSourceLanguage } from './request-template-source-language';
import { RequestTemplateContact } from './request-template-contact';
import { ReferenceSet } from './reference-set';
import { Client } from './client';
import { DeliveryMode } from './delivery-mode';
import { DocumentFormat } from './document-format';
import { Priority } from './priority';
import { Purpose } from './purpose';
import { Service } from './service';

/// <code-import> Place custom imports between <code-import> tags

/// </code-import>

export class RequestTemplate extends EntityBase {

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
    clientComment: string;
    clientId: string;
    confidential: boolean;
    deliveryModeId: string;
    description: string;
    documentFormatId: string;
    externalisable: boolean;
    phoneCountryCode: string;
    phoneNumber: string;
    priorityId: string;
    private: boolean;
    purposeId: string;
    quotationOnly: boolean;
    referenceSetId: string;
    serviceId: string;
    templateName: string;
    confidentialityId: string;
    client: Client;
    deliveryMode: DeliveryMode;
    documentFormat: DocumentFormat;
    priority: Priority;
    purpose: Purpose;
    referenceSet: ReferenceSet;
    requestContacts: RequestTemplateContact[];
    requestDeliveryContacts: RequestTemplateDeliveryContact[];
    service: Service;
    sourceLanguages: RequestTemplateSourceLanguage[];
    targetLanguages: RequestTemplateTargetLanguage[];
    confidentiality: Confidentiality;
}

