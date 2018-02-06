import { PhysicalFile } from './../../model/breeze/physical-file';
import { BaseRepositoryService } from "./base-repository.service";
import { Injectable } from "@angular/core";
import { EntityManagerService } from "../../entity-manager.service";
import { MaterialClassification } from '../../model/breeze/material-classification';
import { UploadedFile } from '../../model/uploadedFile';

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
                materialClassification: classification
            });
        } else {
            return super.createEntity();
        }
    }
}