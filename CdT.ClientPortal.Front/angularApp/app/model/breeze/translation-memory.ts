import { EntityBase } from './entity-base';
import { WorldServerInput } from './world-server-input';

/// <code-import> Place custom imports between <code-import> tags

/// </code-import>

export class TranslationMemory extends EntityBase {

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
    name: string;
    penalty: number;
    worldServerInputId: string;
    worldServerInput: WorldServerInput;
}

