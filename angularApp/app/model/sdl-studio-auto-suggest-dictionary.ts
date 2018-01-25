import { EntityBase } from './entity-base';
import { Language } from './language';
import { PhysicalFile } from './physical-file';

/// <code-import> Place custom imports between <code-import> tags

/// </code-import>

export class SdlStudioAutoSuggestDictionary extends EntityBase {

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
    name: string;
    sourceLanguageId: string;
    targetLanguageId: string;
    fileId: string;
    sourceLanguage: Language;
    targetLanguage: Language;
    file: PhysicalFile;
}

