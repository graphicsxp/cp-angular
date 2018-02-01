import { Contact } from './../../../model/contact';
<<<<<<< HEAD
import { Component, OnInit, Input, DoCheck, IterableDiffers, IterableDiffer, Output, EventEmitter } from '@angular/core';
import { OnChanges, SimpleChanges } from '@angular/core';
=======
import { Component, OnInit, Input, DoCheck, IterableDiffers, IterableDiffer, Output, EventEmitter, OnChanges } from '@angular/core';
>>>>>>> 09644ff2b756c159b7d578fc08dff9c77b40537e

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
export class MultiselectComponent implements OnInit, /*OnChanges,*/ DoCheck {
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

<<<<<<< HEAD
  // ngOnChanges(changes: SimpleChanges) {
  //   console.log(changes);
  //   this.modelChange.emit(this.model);
  // }
=======
  ngOnChanges(changes){

  }
>>>>>>> 09644ff2b756c159b7d578fc08dff9c77b40537e

  ngDoCheck() {
    let changes = this._differ.diff(this.model);
    if (changes && this._initialized) {
      this.modelChange.emit(this.model);
    }
    this._initialized = true;
  }
}
