import { EntityBase } from './entity-base';
import { WorldServerTask } from './world-server-task';
import { Language } from './language';
import { Material } from './material';
import { SourceMaterial } from './source-material';

/// <code-import> Place custom imports between <code-import> tags

/// </code-import>

export class PreformattedFile extends EntityBase {

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
    sourceLanguageId: string;
    sourceMaterialId: string;
    worldServerFilter: string;
    worldServerFilterGroup: string;
    observations: string;
    preformattedDocType: string;
    worldServerFilterId: string;
    previousDocNo: string;
    docNo: string;
    material: Material;
    sourceLanguage: Language;
    sourceMaterial: SourceMaterial;
    worldServerTasks: WorldServerTask[];
}

