import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultiSelectFilterComponent } from './grid-filters/multiselectfilter.component';
import { DropDownListFilterComponent } from './grid-filters/dropdownlistfilter.component';
import { DropDownListModule } from '@progress/kendo-angular-dropdowns/dist/es/dropdownlist.module';
import { PDFModule, ExcelModule } from '@progress/kendo-angular-grid';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { GridModule } from '@progress/kendo-angular-grid';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    GridModule,
    DropDownListModule,
    DropDownsModule,
    PDFModule,
    ExcelModule
  ],
  declarations: [
    DropDownListFilterComponent,
    MultiSelectFilterComponent
  ],
  exports: [
    DropDownListFilterComponent,
    MultiSelectFilterComponent,
    GridModule,
    DropDownListModule,
    DropDownsModule,
    PDFModule,
    ExcelModule
  ]
})
export class GridHelpersModule { }
