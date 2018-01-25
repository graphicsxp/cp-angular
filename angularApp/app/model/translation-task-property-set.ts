import { TaskPropertySet } from './task-property-set';
import { StickyNote } from './sticky-note';
import { GAContext } from './ga-context';
import { TranslatorTaskProgress } from './translator-task-progress';
import { TranslatorFriendlyName } from './translator-friendly-name';
import { LtsGroup } from './lts-group';
import { Justification } from './justification';
import { Assignee } from './assignee';
import { NegotiatedProcedureAssignee } from './negotiated-procedure-assignee';
import { SpecificContract } from './specific-contract';
import { WorldServerInput } from './world-server-input';
import { OrderFormData } from './order-form-data';
import { JobSpecificTaskPropertySet } from './job-specific-task-property-set';
import { PredefWorkflowTaskPropertySet } from './predef-workflow-task-property-set';

/// <code-import> Place custom imports between <code-import> tags

/// </code-import>

export class TranslationTaskPropertySet extends TaskPropertySet {

    /// <code> Place custom code between <code> tags
    
    /// </code>

    // Generated code. Do not place code below this line.
    canProceedWithMainActivity: boolean;
    counterProposedDeadline: Date;
    isAssignedToExternal: boolean;
    isAssignedToFirstInFL: boolean;
    isAssignedToLessLoaded: boolean;
    isGroupAssigned: boolean;
    isNegotiatedProcedure: boolean;
    negotiatedProcJustif: string;
    negotiationDeadline: Date;
    notFirstInListJustif: string;
    orderFormToBeInitiatedBy: number;
    previewDeadline: Date;
    shouldCrossCheck: boolean;
    shouldCrossCheckFlosysValue: boolean;
    crossCheckStatus: string;
    crossCheckSelfServiceJustificationId: string;
    crossCheckDeadline: Date;
    shouldGenerateNegotiationDeadline: boolean;
    shouldGeneratePreviewDeadline: boolean;
    specificContractId: string;
    specificContractValidationDeadline: Date;
    tasksCompletedByFreelancer: number;
    timeSpent: number;
    timeSpentForCrossCheck: number;
    useValidatedTM: boolean;
    winningOfferJustificationId: string;
    editTargetFiles: boolean;
    numberOfCascades: number;
    cascadeTimeGap: number;
    externalResourcesIdsForCascade: string;
    toBeCancelled: boolean;
    deadlineMailSent: boolean;
    qualityControlDeadline: Date;
    isBookable: boolean;
    anyCrossCheckCompleted: boolean;
    prebookedBy: number;
    isPrebooked: boolean;
    isPrebookingBranchSpawned: boolean;
    gAContextId: string;
    negotiatedProcedureAssignees: NegotiatedProcedureAssignee[];
    specificContract: SpecificContract;
    winningOfferJustification: Justification;
    gAContext: GAContext;
}

