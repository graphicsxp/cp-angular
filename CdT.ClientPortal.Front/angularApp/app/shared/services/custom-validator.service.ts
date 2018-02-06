import { Injectable } from '@angular/core';
import { DataType, Validator } from 'breeze-client';

@Injectable()
export class CustomValidatorService {

    constructor() {
        Validator.registerFactory(this.nonDefaultGuidValidator, 'nonDefaultGuidValidator');
    }

    // Validators for validating the guid with default value
    public nonDefaultGuidValidator(): Validator {
        const name = 'nonGuidIdValidator';
        const context = {
            messageTemplate: 'the %displayName% is required.'
        };

        const validator = new Validator(name, _valFunction, context);

        function _valFunction(value) {
            return value ? value !== DataType.Guid.defaultValue : false;
        }

        return validator;
    }
}
