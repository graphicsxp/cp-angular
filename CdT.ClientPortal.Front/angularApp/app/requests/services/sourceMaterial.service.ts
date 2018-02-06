import { SourceMaterial } from './../../model/breeze/source-material';
import { Material } from './../../model/breeze/material';
import { Injectable } from "@angular/core";
import { BaseRepositoryService } from "../../shared/services/base-repository.service";
import { EntityManagerService } from "../../entity-manager.service";

@Injectable()
export class SourceMaterialService extends BaseRepositoryService<SourceMaterial> {

    constructor(protected _entityManagerService: EntityManagerService) {
        super(_entityManagerService, SourceMaterial);
    }

    public create(material:Material): SourceMaterial {
        return  super.createEntity({material: material});
    }
}