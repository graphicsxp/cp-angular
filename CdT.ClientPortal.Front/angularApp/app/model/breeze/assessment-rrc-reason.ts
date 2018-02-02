import { EntityBase } from './entity-base';
import { Assessment } from './assessment';
import { Justification } from './justification';

/// <code-import> Place custom imports between <code-import> tags

/// </code-import>

export class AssessmentRRCReason extends EntityBase {

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
    rRCReasonId: string;
    assessmentId: string;
    rRCReason: Justification;
    assessment: Assessment;
}

