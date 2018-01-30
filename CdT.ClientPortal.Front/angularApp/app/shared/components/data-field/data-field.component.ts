import { Component, Input } from '@angular/core';
import * as _ from 'lodash';

export abstract class DataFieldComponent {

  @Input() public propName: string;
  @Input() public propLabel: string;
  @Input() public entity;
  @Input() public disabled: boolean;

  public get dataProp() {
    return this.entity && this.propName ? this.entity[this.propName] : '';
  }
  public set dataProp(value: any) {
    if (this.entity && this.propName && this.entity.entityAspect) {
      this.entity.entityAspect.clearValidationErrors();
      this.entity[this.propName] = value;
    }
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
