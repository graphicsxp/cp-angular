import { Material } from './material';
import { PhysicalFileVersion } from './physical-file-version';
import { DocumentFormat } from './document-format';
import { MaterialClassification } from './material-classification';

/// <code-import> Place custom imports between <code-import> tags

/// </code-import>

export class PhysicalFile extends Material {

    /// <code> Place custom code between <code> tags
    
    /// </code>

    // Generated code. Do not place code below this line.
    documentFormatId: string;
    externalStorageFileId: string;
    fileName: string;
    fileSize: number;
    physicalPath: string;
    physicalVolume: number;
    isEmbedded: boolean;
    documentFormat: DocumentFormat;
    physicalFileVersions: PhysicalFileVersion[];
}

