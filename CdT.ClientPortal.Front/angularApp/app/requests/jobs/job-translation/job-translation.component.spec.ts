import { SharedModule } from './../../../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobTranslationComponent } from './job-translation.component';
import { MomentModule } from 'angular2-moment';

describe('JobTranslationComponent', () => {
  let component: JobTranslationComponent;
  let fixture: ComponentFixture<JobTranslationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, FormsModule, SharedModule, MomentModule],
      declarations: [ JobTranslationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobTranslationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
