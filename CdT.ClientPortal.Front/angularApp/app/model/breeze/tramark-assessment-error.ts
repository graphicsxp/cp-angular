import { EntityBase } from './entity-base';
import { TramarkAssessment } from './tramark-assessment';
import { Language } from './language';

/// <code-import> Place custom imports between <code-import> tags

/// </code-import>

export class TramarkAssessmentError extends EntityBase {

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
    tramarkAssessmentId: string;
    status: string;
    errorFileReference: string;
    sourceLanguageId: string;
    sentenceNumber: number;
    sourceText: string;
    targetText: string;
    textConcernedByTheError: string;
    translationErrorId: number;
    translationErrorType: string;
    errorComment: string;
    tramarkAssessment: TramarkAssessment;
    sourceLanguage: Language;
}

