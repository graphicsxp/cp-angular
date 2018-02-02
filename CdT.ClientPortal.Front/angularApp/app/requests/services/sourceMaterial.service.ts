import { SourceMaterial } from './../../model/source-material';
import { Material } from './../../model/material';
import { Injectable } from "@angular/core";
import { BaseRepositoryService } from "../../shared/services/base-repository.service";
import { EntityManagerService } from "../../entity-manager.service";

@Injectable()
export class SourceMaterialService extends BaseRepositoryService {

    constructor(protected _entityManagerService: EntityManagerService) {
        super(_entityManagerService);
        this.entityName = 'SourceMaterial';
    }

    public create(material:Material): SourceMaterial {
        return  super.create({material: material}) as SourceMaterial;
    }
}