import { Component, OnInit, Input } from '@angular/core';
import { DataFieldComponent } from '../data-field.component';

@Component({
  selector: 'app-data-field-select',
  templateUrl: './data-field-select.component.html',
  styleUrls: ['./data-field-select.component.scss']
})
export class DataFieldSelectComponent extends DataFieldComponent {

  @Input() public dataSource;

  constructor() {
    super();
  }
}
