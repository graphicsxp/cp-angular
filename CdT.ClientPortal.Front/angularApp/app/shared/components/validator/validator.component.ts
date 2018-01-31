import { Component, OnInit, Input } from '@angular/core';
import * as _ from 'lodash';
import { Form } from '@angular/forms';

@Component({
  selector: 'cdt-validator',
  templateUrl: './validator.component.html',
  styleUrls: ['./validator.component.scss']
})
export class ValidatorComponent implements OnInit {

  @Input() public propName: string;
  @Input() public entity;

  constructor() { }

  ngOnInit() {
  }

  getValidationErrors() {
    if (!this.entity || !this.entity.entityAspect || !this.propName) { return null; }
    this.entity.entityAspect.validateProperty(this.propName);
    const errors = this.entity.entityAspect.getValidationErrors(this.propName);
    if (errors && errors.length > 0) {
      let error = '';
      if (_.some(errors, (e) => e.validator.name === 'required')) {
        error = '<span class="control-mandatory help-inline invalid"><i class="fa fa-asterisk"></i></span>';
      } else {
        errors.forEach(e => {
          if (error.trim()) { error += ', '; }
          error += e.errorMessage;
        });
      }

      return error;
    } else { return null; }
  }
}
