import { Material } from './material';
import { PhysicalFileVersion } from './physical-file-version';
import { DocumentFormat } from './document-format';
import { MaterialClassification } from './material-classification';

/// <code-import> Place custom imports between <code-import> tags
import { DataType } from 'breeze-client';
import * as _ from 'lodash';
import { EntityManagerService } from '../../entity-manager.service';
import { LookupNames } from '../lookups';
import { DocumentFormatExtension } from './document-format-extension';
/// </code-import>

export class PhysicalFile extends Material {

    /// <code> Place custom code between <code> tags
    constructor(private _entityManagerService: EntityManagerService) {
        super();
    }

    static physicalFilePostInitializer(physicalFile: PhysicalFile) {
        if (physicalFile.id === DataType.Guid.defaultValue) {
            physicalFile.physicalVolume = 0;
            //TODO: find solution 
            // physicalFile.documentFormat = this.getSourceFormat(physicalFile.fileName);
            physicalFile.materialType = 'File';
        }
    }

    private getSourceFormat(filename): DocumentFormat {
        let format: DocumentFormat = null;
        let extension = filename.substring(filename.lastIndexOf('.') + 1, filename.length);
        let formatExt: DocumentFormatExtension = _.find(this._entityManagerService.getLookup(LookupNames.documentFormatExtensions), { code: extension.toUpperCase() });
        if (formatExt) { format = formatExt.documentFormat; }
        return format;
    }
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

