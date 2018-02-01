import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SourceMaterialsListComponent } from './source-materials-list.component';

describe('SourceMaterialsListComponent', () => {
  let component: SourceMaterialsListComponent;
  let fixture: ComponentFixture<SourceMaterialsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SourceMaterialsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SourceMaterialsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
