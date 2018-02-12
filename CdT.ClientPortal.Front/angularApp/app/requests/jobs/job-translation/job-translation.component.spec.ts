import { SharedModule } from './../../../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { EntityManager, EntityQuery, config, NamingConvention, NavigationProperty, EntityState } from 'breeze-client';

import { JobTranslationComponent } from './job-translation.component';
import { SourceMaterialService } from '../../services/source-material.service';
import { EntityManagerService } from '../../../entity-manager.service';
import { CustomValidatorService } from '../../../shared/services/custom-validator.service';
import { JobService } from '../../services/job.service';
import { GlobalService } from '../../../shared/services/global.service';
import { MomentModule } from 'angular2-moment';
import { SourceMaterial, Confidentiality, Request, SourceMaterialLanguage, Language, DocumentFormat, PhysicalFile, MaterialClassification, ScopingInfo } from '../../../model/breeze/entity-model';
import { Metadata } from '../../../model/breeze/metadata';

describe('JobTranslationComponent', () => {
  let component: JobTranslationComponent;
  let fixture: ComponentFixture<JobTranslationComponent>;
  let em: EntityManager;
  const data: any = require('../../../../../mocks/request.1.json');

  let jobTranslationEL: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, FormsModule, SharedModule, MomentModule],
      declarations: [JobTranslationComponent],
      providers: [SourceMaterialService, EntityManagerService, CustomValidatorService, GlobalService, JobService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobTranslationComponent);
    component = fixture.componentInstance;

    jobTranslationEL = fixture.debugElement.query(By.css('.job')); // find hero element

    // read request data from json file(entities exported from current clientportal)
    em = new EntityManager();
    em.metadataStore.namingConvention = NamingConvention.camelCase.setAsDefault();
    em.metadataStore.importMetadata(JSON.stringify(Metadata.value));
    em.importEntities(data);

    const request = EntityQuery.from('Requests')
      .take(1)
      .using(em)
      .executeLocally()[0] as Request;

    // fille input values
    component.sourceMaterial = request.sourceMaterials[0];
    component.priority = request.sourceMaterials[0].jobs[0].priority;
    component.service = request.sourceMaterials[0].jobs[0].service;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
