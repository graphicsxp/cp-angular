import { DocumentFormatExtension } from './../../model/breeze/document-format-extension';
import { DocumentFormat } from './../../model/breeze/document-format';
import { PhysicalFile } from './../../model/breeze/physical-file';
import { BaseRepositoryService } from "./base-repository.service";
import { Injectable } from "@angular/core";
import { EntityManagerService } from "../../entity-manager.service";
import { MaterialClassification } from '../../model/breeze/material-classification';
import { UploadedFile } from '../../model/uploadedFile';
import { LookupNames } from '../../model/lookups';
import * as _ from 'lodash';

@Injectable()
export class PhysicalFileService extends BaseRepositoryService<PhysicalFile> {
    constructor(protected _entityManagerService: EntityManagerService) {
        super(_entityManagerService,PhysicalFile);
    }

    public create(file: UploadedFile, classification: MaterialClassification): PhysicalFile {
        if (file) {
            return super.createEntity({
                physicalPath: file.path,
                fileName: file.name,
                fileSize: file.size,
                materialClassification: classification,
                documentFormat : this.getSourceFormat(file.name)
            });
        } else {
            return super.createEntity();
        }
    }

     private getSourceFormat(filename): DocumentFormat {
        let format: DocumentFormat = null;
        let extension = filename.substring(filename.lastIndexOf('.') + 1, filename.length);
        let formatExt: DocumentFormatExtension = _.find(this._entityManagerService.getLookup(LookupNames.documentFormatExtensions), { code: extension.toUpperCase() });
        if (formatExt) { format = formatExt.documentFormat; }
        return format;
    }
}