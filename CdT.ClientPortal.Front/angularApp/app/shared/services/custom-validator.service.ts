import { Injectable } from "@angular/core";
import { DataType, Validator } from "breeze-client";

@Injectable()
export class CustomValidatorService {

    constructor() {
        Validator.registerFactory(this.nonDefaultGuidValidator, 'nonDefaultGuidValidator');
    }

    // Validators for validating the guid with default value
    public nonDefaultGuidValidator(): Validator {
        let name = 'nonGuidIdValidator';
        let context = {
            messageTemplate: 'the %displayName% is required.'
        };

        let validator = new Validator(name, _valFunction, context);

        function _valFunction(value) {
            return value ? value !== DataType.Guid.defaultValue : false;
        }

        return validator;
    }
}