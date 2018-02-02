import { EntityBase } from './entity-base';
import { TramarkAssessment } from './tramark-assessment';
import { Language } from './language';

/// <code-import> Place custom imports between <code-import> tags

/// </code-import>

export class TramarkAssessmentErrorSummary extends EntityBase {

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
    sourceLanguageId: string;
    com: number;
    om: number;
    pt: number;
    cap: number;
    nice: number;
    discl: number;
    sens: number;
    gr: number;
    cnt1: number;
    cnt2: number;
    firstMaximumError: number;
    secondMaximumError: number;
    tramarkAssessment: TramarkAssessment;
    sourceLanguage: Language;
}

