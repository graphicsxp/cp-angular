import { Injectable } from '@angular/core';
import { DataType, Validator } from 'breeze-client';

@Injectable()
export class CustomValidatorService {

    constructor() {
        Validator.registerFactory(this.nonDefaultGuidValidator, 'nonDefaultGuidValidator');
         Validator.registerFactory((options) => this.greaterThanValidator(options), 'greaterThanValidator');
//         Validator.register(new Validator('greaterThanValidator', (options) => this.greaterThanValidator(options)));
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
     * Validating a property value is greater than the minium required.
     * The message template shows the required template (*) because for now this is what users want to see in the job screen
     * If the template was to changed, you should create another validator.
     * @param entity the entity to validate
     */
    public greaterThanValidator(currentValue): Validator {
        const name = 'greaterThanValidator';
        const ctx = {
            value: currentValue,
            messageTemplate: '<span class="control-mandatory help-inline invalid"><i class="fa fa-asterisk"></i></span>'
        };

        const validator = new Validator(name, _valFunction, ctx);

        function _valFunction(value, context) {
            if (value === null) {
                return true;
            }
            if (typeof (value) !== 'number') {
                return false;
            }
            if (context.min !== null && value <= context.value) {
                return false;
            }

            return true;
        }

        return validator;
    }
}
