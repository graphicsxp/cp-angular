import { TaskPropertySet } from './task-property-set';
import { StickyNote } from './sticky-note';
import { TranslatorTaskProgress } from './translator-task-progress';
import { TranslatorFriendlyName } from './translator-friendly-name';
import { LtsGroup } from './lts-group';
import { Justification } from './justification';
import { Assignee } from './assignee';
import { WorldServerInput } from './world-server-input';
import { OrderFormData } from './order-form-data';
import { JobSpecificTaskPropertySet } from './job-specific-task-property-set';
import { PredefWorkflowTaskPropertySet } from './predef-workflow-task-property-set';
import { Translator } from './translator';

/// <code-import> Place custom imports between <code-import> tags

/// </code-import>

export class PreProcessingTaskPropertySet extends TaskPropertySet {

    /// <code> Place custom code between <code> tags
    
    /// </code>

    // Generated code. Do not place code below this line.
    isComplexProcessing: boolean;
    isFrameworkListAvailable: boolean;
    isInternalCompetenceAvailable: boolean;
    lessLoadedTranslatorId: string;
    lessLoadedTranslatorWorkload: number;
    orderFormToBeInitiatedBy: number;
    referencesStatus: string;
    timeSpent: number;
    worldServerFlowsInfo: string;
    worldServerFlowStatus: string;
    isFirstFlow: boolean;
    notFirstFlowReason: string;
    isPreassignedToExt: boolean;
    stopWorkflow: boolean;
    lessLoadedTranslator: Translator;
}

