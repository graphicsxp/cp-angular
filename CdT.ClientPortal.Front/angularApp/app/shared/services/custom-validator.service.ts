import { Injectable } from '@angular/core';
import { DataType, Validator } from 'breeze-client';

@Injectable()
export class CustomValidatorService {

    constructor() {
        Validator.registerFactory(this.nonDefaultGuidValidator, 'nonDefaultGuidValidator');
        // Validator.register(this.greaterThanValidator, 'greaterThanValidator');
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

    /**
     * Validating a property value is greater than the minium required
     * @param entity the entity to validate
     */
    public greaterThanValidator(options): Validator {
        const name = 'greaterThanValidator';
        const ctx = {
            val: options.value,
            messageTemplate: '"%displayName%" must be a greater than of %val%'
        };

        const validator = new Validator(name, _valFunction, ctx);

        function _valFunction(value, context) {
            if (value === null) {
                return true;
            }
            if (typeof (value) !== 'number') {
                return false;
            }
            if (context.min !== null && value <= context.val) {
                return false;
            }

            return true;
        }

        return validator;
    }
}
