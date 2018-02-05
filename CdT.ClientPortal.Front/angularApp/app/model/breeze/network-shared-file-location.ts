import { EntityBase } from './entity-base';
import { DocumentIO } from './document-io';

/// <code-import> Place custom imports between <code-import> tags

/// </code-import>

export class NetworkSharedFileLocation extends EntityBase {

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
    documentIOId: string;
    locationPatternNoSDL: string;
    locationPatternSDL: string;
    documentIO: DocumentIO;
}

