import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataFieldSelectComponent } from './data-field-select.component';

describe('DataFieldSelectComponent', () => {
  let component: DataFieldSelectComponent;
  let fixture: ComponentFixture<DataFieldSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataFieldSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataFieldSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
