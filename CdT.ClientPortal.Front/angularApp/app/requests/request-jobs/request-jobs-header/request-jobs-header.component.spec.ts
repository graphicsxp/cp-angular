import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestJobsHeaderComponent } from './request-jobs-header.component';

describe('RequestJobsHeaderComponent', () => {
  let component: RequestJobsHeaderComponent;
  let fixture: ComponentFixture<RequestJobsHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestJobsHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestJobsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
