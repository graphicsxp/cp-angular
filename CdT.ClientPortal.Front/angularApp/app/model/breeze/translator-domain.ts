import { EntityBase } from './entity-base';
import { Domain } from './domain';
import { Translator } from './translator';

/// <code-import> Place custom imports between <code-import> tags

/// </code-import>

export class TranslatorDomain extends EntityBase {

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
    domainId: string;
    ranking: number;
    translatorId: string;
    domain: Domain;
    translator: Translator;
}

