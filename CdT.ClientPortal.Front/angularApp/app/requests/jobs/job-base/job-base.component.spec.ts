import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobBaseComponent } from './job-base.component';

describe('JobBaseComponent', () => {
  let component: JobBaseComponent;
  let fixture: ComponentFixture<JobBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobBaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
