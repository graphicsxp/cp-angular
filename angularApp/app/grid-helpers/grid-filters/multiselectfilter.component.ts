import { Component, Input, Output, EventEmitter/*, forwardRef, HostBinding*/ } from '@angular/core';
import { CompositeFilterDescriptor } from '@progress/kendo-data-query';
import { FilterService, BaseFilterCellComponent } from '@progress/kendo-angular-grid';
//import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';


@Component({
  selector: 'app-multiselect-filter',
  // providers: [{
  //   provide: NG_VALUE_ACCESSOR,
  //   useExisting: forwardRef(() => MultiSelectFilterComponent),
  //   multi: true
  // }],
  template: `
    <kendo-multiselect [data]="data"
    [textField]="textField"
    [valueField]="valueField"
    [filterable]="true"
    (valueChange)="valueChange($event)"
    [valuePrimitive]="true"
    [(ngModel)]="selectedValues">
  </kendo-multiselect>
  `
})
export class MultiSelectFilterComponent  extends BaseFilterCellComponent /*implements ControlValueAccessor*/ {

  // public get selectedValue(): any {
  //   const filter = this.filterByField(this.valueField);
  //   return filter ? filter.value : null;
  // }

  @Input() public filter: CompositeFilterDescriptor;
  @Input() public data: any[];
  @Input() public textField: string;
  @Input() public valueField: string;
  @Input() public entityField: string;
  @Input() public selectedValues: string[];
  @Output() selectedValuesChange = new EventEmitter();

  // public get defaultItem(): any {
  //     return {
  //         [this.textField]: 'Select item...',
  //         [this.valueField]: null
  //     };
  // }

  constructor(filterService: FilterService) {
    super(filterService);
  }

  public valueChange(value: any): void {
    this.applyFilter(
      value === null ? // value of the default item
        this.removeFilter(this.entityField) : // remove the filter
        this.updateFilter({ // add a filter for the field with the value
          field: this.entityField,
          //  entity: this.entityField,
          operator: 'eq',
          value: value
        })
    ); // update the root filter
    this.selectedValuesChange.emit(this.selectedValues);
  }

  // // Placeholders for the callbacks which are later providesd
  // // by the Control Value Accessor
  // private onTouchedCallback: () => void = () => {
  // };
  // private onChangeCallback: (_: any) => void = () => {
  // };

  // // From ControlValueAccessor interface
  // registerOnChange(fn: any) {
  //   this.onChangeCallback = fn;
  // }

  // // From ControlValueAccessor interface
  // registerOnTouched(fn: any) {
  //   this.onTouchedCallback = fn;
  // }

  // // Function to call when the rating changes.
  // onChange = (value: any[]) => {
  //   console.log('onchange:' + value);
  // };

  // // Allows Angular to update the model (rating).
  // // Update the model and changes needed for the view here.
  // writeValue(value: any[]): void {
  //   console.log('writeValue:' + value);
  //   this.selectedValues = value;
  //   this.onChange(this.selectedValues)
  // }
}
