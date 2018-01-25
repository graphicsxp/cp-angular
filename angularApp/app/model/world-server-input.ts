import { EntityBase } from './entity-base';
import { TermDatabaseGroup } from './term-database-group';
import { TranslationMemoryGroup } from './translation-memory-group';
import { TermDatabase } from './term-database';
import { TranslationMemory } from './translation-memory';

/// <code-import> Place custom imports between <code-import> tags

/// </code-import>

export class WorldServerInput extends EntityBase {

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
    saveTargetAs: boolean;
    sdlXliff: boolean;
    wrongCharactersReplacement: boolean;
    translationMemories: TranslationMemory[];
    translationMemoryGroups: TranslationMemoryGroup[];
    termDatabases: TermDatabase[];
    termDatabaseGroups: TermDatabaseGroup[];
}

