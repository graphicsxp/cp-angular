import { TaskPropertySet } from './task-property-set';
import { StickyNote } from './sticky-note';
import { TranslatorTaskProgress } from './translator-task-progress';
import { TranslatorFriendlyName } from './translator-friendly-name';
import { LtsGroup } from './lts-group';
import { Justification } from './justification';
import { Assignee } from './assignee';
import { DeliveryMode } from './delivery-mode';
import { WorldServerInput } from './world-server-input';
import { OrderFormData } from './order-form-data';
import { JobSpecificTaskPropertySet } from './job-specific-task-property-set';
import { PredefWorkflowTaskPropertySet } from './predef-workflow-task-property-set';

/// <code-import> Place custom imports between <code-import> tags

/// </code-import>

export class PostProcessingTaskPropertySet extends TaskPropertySet {

    /// <code> Place custom code between <code> tags
    
    /// </code>

    // Generated code. Do not place code below this line.
    deliveryModeId: string;
    timeSpent: number;
    shouldTryAutomaticMerging: boolean;
    retryAutomaticMerging: boolean;
    deliveryMode: DeliveryMode;
}

