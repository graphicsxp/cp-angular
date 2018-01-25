import { EntityBase } from './entity-base';
import { ReferenceLanguage } from './reference-language';
import { ReferenceSet } from './reference-set';
import { Material } from './material';

/// <code-import> Place custom imports between <code-import> tags

/// </code-import>

export class Reference extends EntityBase {

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
    materialId: string;
    referenceSetId: string;
    material: Material;
    referenceLanguages: ReferenceLanguage[];
    referenceSet: ReferenceSet;
}

