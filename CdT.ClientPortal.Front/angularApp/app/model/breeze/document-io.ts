import { EntityBase } from './entity-base';
import { NetworkSharedFileLocation } from './network-shared-file-location';
import { DocumentIOMatClassif } from './document-io-mat-classif';
import { IOSetDocumentIO } from './io-set-document-io';

/// <code-import> Place custom imports between <code-import> tags

/// </code-import>

export class DocumentIO extends EntityBase {

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
    canBeMultiple: boolean;
    code: string;
    isOptional: boolean;
    isTodoInput: boolean;
    name: string;
    documentIOMatClassifs: DocumentIOMatClassif[];
    iOSetDocumentIOs: IOSetDocumentIO[];
    networkSharedFileLocations: NetworkSharedFileLocation[];
}

