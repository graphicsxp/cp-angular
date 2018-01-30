import { EntityBase } from './entity-base';
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

/// <code-import> Place custom imports between <code-import> tags

/// </code-import>

export class TaskPropertySet extends EntityBase {

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
    description: string;
    assignedToId: string;
    userDefinedAssignee2Id: string;
    comments: string;
    contextData: string;
    deadline: Date;
    bufferedDeadline: Date;
    deadlineUpdateJustificationId: string;
    docsUsingWS: number;
    ltsGroupId: string;
    orderFormDataId: string;
    stickyNoteId: string;
    reallocationJustificationId: string;
    retryAt: Date;
    shouldSkipActivity: boolean;
    takenBy: string;
    translatorFriendlyNameId: string;
    translatorTaskProgressId: string;
    userDefinedAssigneeId: string;
    volume: number;
    worldServerInputId: string;
    isSelfServiceTask: boolean;
    selfServiceDeadline: Date;
    lessLoadedRemarks: string;
    useFlosys: boolean;
    assignedTo: Assignee;
    userDefinedAssignee2: Assignee;
    deadlineUpdateJustification: Justification;
    jobSpecificTaskPropertySets: JobSpecificTaskPropertySet[];
    ltsGroup: LtsGroup;
    orderFormData: OrderFormData;
    stickyNote: StickyNote;
    predefWorkflowTaskPropertySets: PredefWorkflowTaskPropertySet[];
    reallocationJustification: Justification;
    translatorFriendlyName: TranslatorFriendlyName;
    translatorTaskProgress: TranslatorTaskProgress;
    userDefinedAssignee: Assignee;
    worldServerInput: WorldServerInput;
}

