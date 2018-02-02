import { EntityBase } from './entity-base';
import { TramarkAssessmentError } from './tramark-assessment-error';
import { TramarkAssessmentErrorSummary } from './tramark-assessment-error-summary';
import { Job } from './job';
import { Language } from './language';

/// <code-import> Place custom imports between <code-import> tags

/// </code-import>

export class TramarkAssessment extends EntityBase {

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
    contractorInternalNumber: number;
    contractorOfficialName: string;
    contractReference: string;
    orderFormNumber: string;
    packageReference: string;
    targetLanguageId: string;
    dispatchDate: Date;
    signatureDate: Date;
    signedBy: string;
    jobId: string;
    targetLanguage: Language;
    job: Job;
    tramarkAssessmentErrorSummaries: TramarkAssessmentErrorSummary[];
    tramarkAssessmentErrors: TramarkAssessmentError[];
}

