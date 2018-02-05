import { EntityBase } from './entity-base';
import { Assessment } from './assessment';

/// <code-import> Place custom imports between <code-import> tags

/// </code-import>

export class AssessmentEvalComment extends EntityBase {

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
    assessmentId: string;
    assCommitteeAssessmentId: string;
    segment: string;
    original: string;
    unrevisedTranslation: string;
    correctedTranslation: string;
    comments: string;
    evalCommentType: string;
    viewOrder: number;
    assessment: Assessment;
    assCommitteeAssessment: Assessment;
}

