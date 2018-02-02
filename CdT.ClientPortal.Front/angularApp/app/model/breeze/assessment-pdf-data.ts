import { EntityBase } from './entity-base';
import { Assessment } from './assessment';

/// <code-import> Place custom imports between <code-import> tags

/// </code-import>

export class AssessmentPDFData extends EntityBase {

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
    contractorNumber: string;
    accurRendition: boolean;
    adeqAttention: boolean;
    assessor: string;
    backgrResearch: boolean;
    basicStyle: boolean;
    dateQualityPB: Date;
    dateSentForAssessment: Date;
    dateSentTranslation: Date;
    docRef: boolean;
    doesTranslationAppear: boolean;
    grammaticalMistake: boolean;
    inaccuracy: boolean;
    lackAdeqKnow: boolean;
    levelSourceText: string;
    lingQualityProblem: boolean;
    omission: boolean;
    plus: boolean;
    punctuation: boolean;
    qualifToTrans: boolean;
    qualityPatchy: boolean;
    quantity: string;
    refDocRespected: boolean;
    requiredBy: Date;
    specificTerminology: boolean;
    spellingMistake: boolean;
    spentOnAssessment: string;
    spot: boolean;
    techQuality1: boolean;
    techQuality2: boolean;
    techQuality3: boolean;
    techQualityHour: string;
    terminlogConsist: boolean;
    thorough: boolean;
    transComplete: boolean;
    transReadWell: boolean;
    typeAssessmentCarrie: string;
    assessments: Assessment[];
}

