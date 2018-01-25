import { EntityBase } from './entity-base';
import { ReferenceSet } from './reference-set';

/// <code-import> Place custom imports between <code-import> tags

/// </code-import>

export class FeedbackToFreelancer extends EntityBase {

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
    attachRevisedVersion: boolean;
    referenceSetId: string;
    revisorFeedback: string;
    holgFeedback: string;
    freelanceFeedback: string;
    opened: boolean;
    requestIdentifier: string;
    year: string;
    client: string;
    sourceLanguages: string;
    targetLanguages: string;
    contractNumber: string;
    feedbackWriter: string;
    status: string;
    subStatus: string;
    publishedOn: Date;
    referenceSet: ReferenceSet;
}

