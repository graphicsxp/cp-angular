import { Contact } from './../../../model/contact';
import { Component, OnInit, Input, DoCheck, IterableDiffers, IterableDiffer, Output, EventEmitter, OnChanges } from '@angular/core';

/**
 * This component encapsulates the kendo multiselect and accepts an array of Any as datasource.
 * This is to centralized the logic related to m-2-m which implies watching the array for changes.
 * When the array changes we emit the even (2-way databinding) and it's up to the parent component 
 * to handle it. 
 */
@Component({
  selector: 'cdt-multiselect',
  template: `<kendo-multiselect
            [data]="data" 
            [textField]="textField" 
            [valueField]="valueField" 
            [(ngModel)]="model">
            </kendo-multiselect>
  `
})
export class MultiselectComponent implements OnInit, DoCheck, OnChanges {
  private _differ: IterableDiffer<any>;
  private _initialized: boolean = false;

  @Input() public data;
  @Input() public textField;
  @Input() public valueField;
  @Input() public model;

  @Output() public modelChange = new EventEmitter<any[]>();

  constructor(private _differs: IterableDiffers) { }

  ngOnInit() {
    this._differ = this._differs.find(this.model).create(null);
  }

  ngOnChanges(changes){

  }

  ngDoCheck() {
    let changes = this._differ.diff(this.model);
    if (changes && this._initialized) {
      this.modelChange.emit(this.model);
    }
    this._initialized = true;
  }
}
