import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestJobsComponent } from './request-jobs.component';

describe('RequestJobsComponent', () => {
  let component: RequestJobsComponent;
  let fixture: ComponentFixture<RequestJobsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestJobsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
