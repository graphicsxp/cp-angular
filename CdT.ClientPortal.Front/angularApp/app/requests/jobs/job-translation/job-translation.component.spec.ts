import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobTranslationComponent } from './job-translation.component';

describe('JobTranslationComponent', () => {
  let component: JobTranslationComponent;
  let fixture: ComponentFixture<JobTranslationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
