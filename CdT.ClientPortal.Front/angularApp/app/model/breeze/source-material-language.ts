import { EntityBase } from './entity-base';
import { Language } from './language';
import { SourceMaterial } from './source-material';

/// <code-import> Place custom imports between <code-import> tags

/// </code-import>

export class SourceMaterialLanguage extends EntityBase {

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
    sourceMaterialId: string;
    language: Language;
    sourceMaterial: SourceMaterial;
}

