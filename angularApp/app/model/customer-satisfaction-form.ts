import { EntityBase } from './entity-base';
import { Client } from './client';
import { Job } from './job';

/// <code-import> Place custom imports between <code-import> tags

/// </code-import>

export class CustomerSatisfactionForm extends EntityBase {

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
    expirationDate: Date;
    jobId: string;
    isSentToFlosys: boolean;
    isFlowCreated: boolean;
    status: string;
    customerSatisfactionValue: string;
    nameAndDetails: string;
    inaccuracy: boolean;
    mistranslation: boolean;
    terminology: boolean;
    omission: boolean;
    presentationFormatting: boolean;
    referenceNotConsidered: boolean;
    style: boolean;
    spelling: boolean;
    grammar: boolean;
    punctuation: boolean;
    timeOfReceipt: boolean;
    other: boolean;
    examples: string;
    comments: string;
    assignedToUsername: string;
    clientId: string;
    job: Job;
    client: Client;
}

