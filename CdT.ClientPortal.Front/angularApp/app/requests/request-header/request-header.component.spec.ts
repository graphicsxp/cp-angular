import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestHeaderComponent } from './request-header.component';

describe('RequestHeaderComponent', () => {
  let component: RequestHeaderComponent;
  let fixture: ComponentFixture<RequestHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
