import { EntityBase } from './entity-base';
import { AssessmentEvalComment } from './assessment-eval-comment';
import { AssessmentComment } from './assessment-comment';
import { AssessmentStatus } from './assessment-status';
import { AssessmentRRCReason } from './assessment-rrc-reason';
import { RrcMeeting } from './rrc-meeting';
import { AssessmentPDFData } from './assessment-pdf-data';
import { Job } from './job';
import { ExternalResource } from './external-resource';
import { Translator } from './translator';

/// <code-import> Place custom imports between <code-import> tags

/// </code-import>

export class Assessment extends EntityBase {

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
    assessmentDate: Date;
    assessmentPDFDataId: string;
    assessorId: string;
    commitmentDate: Date;
    secondEvaluationCompletionDate: Date;
    freelanceContractorId: string;
    initialAssessmentResult: string;
    initialAssessmentChangeComment: string;
    hasAnyWeaknesses: boolean;
    hasEvaluationComment: boolean;
    isCommitted: boolean;
    isQCCompleted: boolean;
    jobId: string;
    assessmentStatusId: string;
    aOAssessmentResult: string;
    volume: number;
    isFirstEvaluationDone: boolean;
    isAssessmentCommitteeEvaluationDone: boolean;
    isSecondEvaluationDone: boolean;
    paymentSuspension: boolean;
    readyForRRCMeeting: boolean;
    assessmentHasChanged: boolean;
    firstEvaluationOverallComment: string;
    secondEvaluationOverallComment: string;
    secondEvaluationResult: string;
    assessmentCommitteeResult: string;
    rrcMeetingId: string;
    assessmentComments: AssessmentComment[];
    assessmentPDFData: AssessmentPDFData;
    assessor: Translator;
    freelanceContractor: ExternalResource;
    job: Job;
    assessmentStatus: AssessmentStatus;
    rRCReasons: AssessmentRRCReason[];
    evaluationComments: AssessmentEvalComment[];
    assessmentCommitteeEvaluationComments: AssessmentEvalComment[];
    rrcMeeting: RrcMeeting;
}

