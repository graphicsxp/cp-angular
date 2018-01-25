import { EntityBase } from './entity-base';
import { ApplicationNews } from './application-news';
import { Material } from './material';

/// <code-import> Place custom imports between <code-import> tags

/// </code-import>

export class ApplicationNewsFile extends EntityBase {

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
    applicationNewsId: string;
    description: string;
    material: Material;
    applicationNews: ApplicationNews;
}

