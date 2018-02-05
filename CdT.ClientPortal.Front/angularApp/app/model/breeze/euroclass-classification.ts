import { EntityBase } from './entity-base';
import { Language } from './language';

/// <code-import> Place custom imports between <code-import> tags

/// </code-import>

export class EuroclassClassification extends EntityBase {

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
    code: string;
    defaultLabel: string;
    validFrom: Date;
    validTo: Date;
    description: string;
    displayOrder: number;
    isUsedInEcdt: boolean;
    abbreviation: string;
    parentClassificationId: string;
    classificationDescription: string;
    targetLanguageId: string;
    classificationType: string;
    parentClassification: EuroclassClassification;
    targetLanguage: Language;
}

