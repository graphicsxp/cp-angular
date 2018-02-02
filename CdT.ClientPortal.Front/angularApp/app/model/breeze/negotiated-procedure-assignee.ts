import { EntityBase } from './entity-base';
import { Assignee } from './assignee';
import { TranslationTaskPropertySet } from './translation-task-property-set';

/// <code-import> Place custom imports between <code-import> tags

/// </code-import>

export class NegotiatedProcedureAssignee extends EntityBase {

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
    assigneeId: string;
    translationTaskPropertySetId: string;
    assignee: Assignee;
    translationTaskPropertySet: TranslationTaskPropertySet;
}

