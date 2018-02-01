import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SourceMaterialsListItemComponent } from './source-materials-list-item.component';

describe('SourceMaterialsListItemComponent', () => {
  let component: SourceMaterialsListItemComponent;
  let fixture: ComponentFixture<SourceMaterialsListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SourceMaterialsListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SourceMaterialsListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
