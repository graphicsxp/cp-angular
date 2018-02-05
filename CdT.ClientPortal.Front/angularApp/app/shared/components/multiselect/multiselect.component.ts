import { Contact } from './../../../model/breeze/contact';
import { Component, OnInit, Input, DoCheck, IterableDiffers, IterableDiffer, Output, EventEmitter } from '@angular/core';
import { OnChanges, SimpleChanges } from '@angular/core';

/**
 * This component encapsulates the kendo multiselect and accepts an array of Any as datasource.
 * This is to centralized the logic related to m-2-m which implies watching the array for changes.
 * When the array changes we emit the even (2-way databinding) and it's up to the parent component 
 * to handle it. 
 */
@Component({
  selector: 'cdt-multiselect',
  template: `<p-multiSelect [options]="data" [(ngModel)]="model" [optionLabel]="textField" [dataKey]="valueField"></p-multiSelect>`
})
export class MultiSelectComponent implements OnInit, /*OnChanges,*/ DoCheck {
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

  // ngOnChanges(changes: SimpleChanges) {
  //   console.log(changes);
  //   this.modelChange.emit(this.model);
  // }

  ngDoCheck() {
    let changes = this._differ.diff(this.model);
    if (changes && this._initialized) {
      this.modelChange.emit(this.model);
    }
    this._initialized = true;
  }
}
