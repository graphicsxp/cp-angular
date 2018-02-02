import { EntityBase } from './entity-base';
import { Reference } from './reference';
import { Language } from './language';

/// <code-import> Place custom imports between <code-import> tags

/// </code-import>

export class ReferenceLanguage extends EntityBase {

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
    languageId: string;
    referenceId: string;
    language: Language;
    reference: Reference;
}

