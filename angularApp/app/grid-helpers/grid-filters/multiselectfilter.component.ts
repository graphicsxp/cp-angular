import { Component, Input } from '@angular/core';
import { CompositeFilterDescriptor } from '@progress/kendo-data-query';
import { FilterService, BaseFilterCellComponent } from '@progress/kendo-angular-grid';


@Component({
  selector: 'app-multiselect-filter',
  template: `
    <kendo-multiselect [data]="data"
    [textField]="textField"
    [valueField]="valueField"
    [filterable]="true"
    (valueChange)="valueChange($event)"
    [valuePrimitive]="true"
    name="test"
  >
  </kendo-multiselect>
  `
})
export class MultiSelectFilterComponent extends BaseFilterCellComponent {

  // public get selectedValue(): any {
  //   const filter = this.filterByField(this.valueField);
  //   return filter ? filter.value : null;
  // }

  @Input() public filter: CompositeFilterDescriptor;
  @Input() public data: any[];
  @Input() public textField: string;
  @Input() public valueField: string;
  @Input() public entityField: string;

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
        this.removeFilter(this.valueField) : // remove the filter
        this.updateFilter({ // add a filter for the field with the value
          field: this.entityField,
          //  entity: this.entityField,
          operator: 'eq',
          value: value
        })
    ); // update the root filter
  }


}
