import { Component, Input } from '@angular/core';
import { CompositeFilterDescriptor } from '@progress/kendo-data-query';
import { FilterService, BaseFilterCellComponent } from '@progress/kendo-angular-grid';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
    selector: 'cdt-dropdown-filter',
    template: `
    <kendo-dropdownlist
      [data]="data"
      (valueChange)="onChange($event)"
      [defaultItem]="defaultItem"
      [value]="selectedValue"
      [valuePrimitive]="true"
      [textField]="textField"
      [valueField]="valueField"
      [valueField]="entityField">
    </kendo-dropdownlist>
  `
})
export class DropDownListFilterComponent extends BaseFilterCellComponent {

    public get selectedValue(): any {
        const filter = this.filterByField(this.entityField);
        return filter ? filter.value : null;
    }

    @Input() public filter: CompositeFilterDescriptor;
    @Input() public data: any[];
    @Input() public textField: string;
    @Input() public valueField: string;
    @Input() public entityField: string;

    public get defaultItem(): any {
        return {
            [this.textField]: 'Select item...',
            [this.valueField]: null
        };
    }

    constructor(filterService: FilterService) {
        super(filterService);
    }

    public onChange(value: any): void {
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
    }
}
