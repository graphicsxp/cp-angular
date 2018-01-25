import { EntityBase } from './entity-base';
import { Service } from './service';
import { Translator } from './translator';

/// <code-import> Place custom imports between <code-import> tags

/// </code-import>

export class TranslatorService extends EntityBase {

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
    serviceId: string;
    translatorId: string;
    service: Service;
    translator: Translator;
}

