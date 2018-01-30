import { Component, Input } from '@angular/core';
import { CompositeFilterDescriptor } from '@progress/kendo-data-query';
import { FilterService, BaseFilterCellComponent } from '@progress/kendo-angular-grid';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-multiselect-filter',
  template: `
    <kendo-multiselect [data]="data"
    [textField]="textField"
    [valueField]="valueField"
    [value]="selectedValue"
    [filterable]="true"
    (valueChange)="valueChange($event)"
    [valuePrimitive]="true">
  </kendo-multiselect>
  `
})
export class MultiSelectFilterComponent extends BaseFilterCellComponent /*implements OnInit*/ {

  public get selectedValue(): any {
    const filter = this.filterByField(this.entityField);
    return filter ? filter.value : null;
  }

  @Input() public filter: CompositeFilterDescriptor;
  @Input() public data: any[];
  @Input() public textField: string;
  @Input() public valueField: string;
  @Input() public entityField: string;

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
    );
  }
}
