import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from './../../../../shared/shared.module';
import { MomentModule } from 'angular2-moment';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobTranslationEditComponent } from './job-translation-edit.component';

describe('JobTranslationEditComponent', () => {
  let component: JobTranslationEditComponent;
  let fixture: ComponentFixture<JobTranslationEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, FormsModule, SharedModule, MomentModule],
      declarations: [JobTranslationEditComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobTranslationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
