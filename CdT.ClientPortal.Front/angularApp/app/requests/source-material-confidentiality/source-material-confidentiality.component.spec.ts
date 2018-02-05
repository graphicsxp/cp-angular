import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SourceMaterialConfidentialityComponent } from './source-material-confidentiality.component';

describe('SourceMaterialConfidentialityComponent', () => {
  let component: SourceMaterialConfidentialityComponent;
  let fixture: ComponentFixture<SourceMaterialConfidentialityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SourceMaterialConfidentialityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SourceMaterialConfidentialityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
