/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';
import { _executeValidators, _executeAsyncValidators, _mergeObjects, _mergeErrors, isEmpty, isDefined, hasValue, isString, isNumber, isBoolean, isArray, getType, isType, toJavaScriptType, toObservable, xor } from './validator.functions';
import { forEachCopy } from './utility.functions';
import { jsonSchemaFormatTests } from './format-regex.constants';
/**
 * 'JsonValidators' class
 *
 * Provides an extended set of validators to be used by form controls,
 * compatible with standard JSON Schema validation options.
 * http://json-schema.org/latest/json-schema-validation.html
 *
 * Note: This library is designed as a drop-in replacement for the Angular
 * Validators library, and except for one small breaking change to the 'pattern'
 * validator (described below) it can even be imported as a substitute, like so:
 *
 *   import { JsonValidators as Validators } from 'json-validators';
 *
 * and it should work with existing code as a complete replacement.
 *
 * The one exception is the 'pattern' validator, which has been changed to
 * matche partial values by default (the standard 'pattern' validator wrapped
 * all patterns in '^' and '$', forcing them to always match an entire value).
 * However, the old behavior can be restored by simply adding '^' and '$'
 * around your patterns, or by passing an optional second parameter of TRUE.
 * This change is to make the 'pattern' validator match the behavior of a
 * JSON Schema pattern, which allows partial matches, rather than the behavior
 * of an HTML input control pattern, which does not.
 *
 * This library replaces Angular's validators and combination functions
 * with the following validators and transformation functions:
 *
 * Validators:
 *   For all formControls:     required (*), type, enum, const
 *   For text formControls:    minLength (*), maxLength (*), pattern (*), format
 *   For numeric formControls: maximum, exclusiveMaximum,
 *                             minimum, exclusiveMinimum, multipleOf
 *   For formGroup objects:    minProperties, maxProperties, dependencies
 *   For formArray arrays:     minItems, maxItems, uniqueItems, contains
 *   Not used by JSON Schema:  min (*), max (*), requiredTrue (*), email (*)
 * (Validators originally included with Angular are maked with (*).)
 *
 * NOTE / TODO: The dependencies validator is not complete.
 * NOTE / TODO: The contains validator is not complete.
 *
 * Validators not used by JSON Schema (but included for compatibility)
 * and their JSON Schema equivalents:
 *
 *   Angular validator | JSON Schema equivalent
 *   ------------------|-----------------------
 *     min(number)     |   minimum(number)
 *     max(number)     |   maximum(number)
 *     requiredTrue()  |   const(true)
 *     email()         |   format('email')
 *
 * Validator transformation functions:
 *   composeAnyOf, composeOneOf, composeAllOf, composeNot
 * (Angular's original combination funciton, 'compose', is also included for
 * backward compatibility, though it is functionally equivalent to composeAllOf,
 * asside from its more generic error message.)
 *
 * All validators have also been extended to accept an optional second argument
 * which, if passed a TRUE value, causes the validator to perform the opposite
 * of its original finction. (This is used internally to enable 'not' and
 * 'composeOneOf' to function and return useful error messages.)
 *
 * The 'required' validator has also been overloaded so that if called with
 * a boolean parameter (or no parameters) it returns the original validator
 * function (rather than executing it). However, if it is called with an
 * AbstractControl parameter (as was previously required), it behaves
 * exactly as before.
 *
 * This enables all validators (including 'required') to be constructed in
 * exactly the same way, so they can be automatically applied using the
 * equivalent key names and values taken directly from a JSON Schema.
 *
 * This source code is partially derived from Angular,
 * which is Copyright (c) 2014-2017 Google, Inc.
 * Use of this source code is therefore governed by the same MIT-style license
 * that can be found in the LICENSE file at https://angular.io/license
 *
 * Original Angular Validators:
 * https://github.com/angular/angular/blob/master/packages/forms/src/validators.ts
 */
var /**
 * 'JsonValidators' class
 *
 * Provides an extended set of validators to be used by form controls,
 * compatible with standard JSON Schema validation options.
 * http://json-schema.org/latest/json-schema-validation.html
 *
 * Note: This library is designed as a drop-in replacement for the Angular
 * Validators library, and except for one small breaking change to the 'pattern'
 * validator (described below) it can even be imported as a substitute, like so:
 *
 *   import { JsonValidators as Validators } from 'json-validators';
 *
 * and it should work with existing code as a complete replacement.
 *
 * The one exception is the 'pattern' validator, which has been changed to
 * matche partial values by default (the standard 'pattern' validator wrapped
 * all patterns in '^' and '$', forcing them to always match an entire value).
 * However, the old behavior can be restored by simply adding '^' and '$'
 * around your patterns, or by passing an optional second parameter of TRUE.
 * This change is to make the 'pattern' validator match the behavior of a
 * JSON Schema pattern, which allows partial matches, rather than the behavior
 * of an HTML input control pattern, which does not.
 *
 * This library replaces Angular's validators and combination functions
 * with the following validators and transformation functions:
 *
 * Validators:
 *   For all formControls:     required (*), type, enum, const
 *   For text formControls:    minLength (*), maxLength (*), pattern (*), format
 *   For numeric formControls: maximum, exclusiveMaximum,
 *                             minimum, exclusiveMinimum, multipleOf
 *   For formGroup objects:    minProperties, maxProperties, dependencies
 *   For formArray arrays:     minItems, maxItems, uniqueItems, contains
 *   Not used by JSON Schema:  min (*), max (*), requiredTrue (*), email (*)
 * (Validators originally included with Angular are maked with (*).)
 *
 * NOTE / TODO: The dependencies validator is not complete.
 * NOTE / TODO: The contains validator is not complete.
 *
 * Validators not used by JSON Schema (but included for compatibility)
 * and their JSON Schema equivalents:
 *
 *   Angular validator | JSON Schema equivalent
 *   ------------------|-----------------------
 *     min(number)     |   minimum(number)
 *     max(number)     |   maximum(number)
 *     requiredTrue()  |   const(true)
 *     email()         |   format('email')
 *
 * Validator transformation functions:
 *   composeAnyOf, composeOneOf, composeAllOf, composeNot
 * (Angular's original combination funciton, 'compose', is also included for
 * backward compatibility, though it is functionally equivalent to composeAllOf,
 * asside from its more generic error message.)
 *
 * All validators have also been extended to accept an optional second argument
 * which, if passed a TRUE value, causes the validator to perform the opposite
 * of its original finction. (This is used internally to enable 'not' and
 * 'composeOneOf' to function and return useful error messages.)
 *
 * The 'required' validator has also been overloaded so that if called with
 * a boolean parameter (or no parameters) it returns the original validator
 * function (rather than executing it). However, if it is called with an
 * AbstractControl parameter (as was previously required), it behaves
 * exactly as before.
 *
 * This enables all validators (including 'required') to be constructed in
 * exactly the same way, so they can be automatically applied using the
 * equivalent key names and values taken directly from a JSON Schema.
 *
 * This source code is partially derived from Angular,
 * which is Copyright (c) 2014-2017 Google, Inc.
 * Use of this source code is therefore governed by the same MIT-style license
 * that can be found in the LICENSE file at https://angular.io/license
 *
 * Original Angular Validators:
 * https://github.com/angular/angular/blob/master/packages/forms/src/validators.ts
 */
JsonValidators = /** @class */ (function () {
    function JsonValidators() {
    }
    /**
     * @param {?=} input
     * @return {?}
     */
    JsonValidators.required = /**
     * @param {?=} input
     * @return {?}
     */
    function (input) {
        if (input === undefined) {
            input = true;
        }
        switch (input) {
            case true:
                // Return required function (do not execute it yet)
                return function (control, invert) {
                    if (invert === void 0) { invert = false; }
                    if (invert) {
                        return null;
                    } // if not required, always return valid
                    return hasValue(control.value) ? null : { 'required': true };
                };
            case false:
                // Do nothing (if field is not required, it is always valid)
                return JsonValidators.nullValidator;
            default:
                // Execute required function
                return hasValue((/** @type {?} */ (input)).value) ? null : { 'required': true };
        }
    };
    ;
    /**
     * 'type' validator
     *
     * Requires a control to only accept values of a specified type,
     * or one of an array of types.
     *
     * Note: SchemaPrimitiveType = 'string'|'number'|'integer'|'boolean'|'null'
     *
     * // {SchemaPrimitiveType|SchemaPrimitiveType[]} type - type(s) to accept
     * // {IValidatorFn}
     */
    /**
     * 'type' validator
     *
     * Requires a control to only accept values of a specified type,
     * or one of an array of types.
     *
     * Note: SchemaPrimitiveType = 'string'|'number'|'integer'|'boolean'|'null'
     *
     * // {SchemaPrimitiveType|SchemaPrimitiveType[]} type - type(s) to accept
     * // {IValidatorFn}
     * @param {?} requiredType
     * @return {?}
     */
    JsonValidators.type = /**
     * 'type' validator
     *
     * Requires a control to only accept values of a specified type,
     * or one of an array of types.
     *
     * Note: SchemaPrimitiveType = 'string'|'number'|'integer'|'boolean'|'null'
     *
     * // {SchemaPrimitiveType|SchemaPrimitiveType[]} type - type(s) to accept
     * // {IValidatorFn}
     * @param {?} requiredType
     * @return {?}
     */
    function (requiredType) {
        if (!hasValue(requiredType)) {
            return JsonValidators.nullValidator;
        }
        return function (control, invert) {
            if (invert === void 0) { invert = false; }
            if (isEmpty(control.value)) {
                return null;
            }
            /** @type {?} */
            var currentValue = control.value;
            /** @type {?} */
            var isValid = isArray(requiredType) ?
                (/** @type {?} */ (requiredType)).some(function (type) { return isType(currentValue, type); }) :
                isType(currentValue, /** @type {?} */ (requiredType));
            return xor(isValid, invert) ?
                null : { 'type': { requiredType: requiredType, currentValue: currentValue } };
        };
    };
    /**
     * 'enum' validator
     *
     * Requires a control to have a value from an enumerated list of values.
     *
     * Converts types as needed to allow string inputs to still correctly
     * match number, boolean, and null enum values.
     *
     * // {any[]} allowedValues - array of acceptable values
     * // {IValidatorFn}
     */
    /**
     * 'enum' validator
     *
     * Requires a control to have a value from an enumerated list of values.
     *
     * Converts types as needed to allow string inputs to still correctly
     * match number, boolean, and null enum values.
     *
     * // {any[]} allowedValues - array of acceptable values
     * // {IValidatorFn}
     * @param {?} allowedValues
     * @return {?}
     */
    JsonValidators.enum = /**
     * 'enum' validator
     *
     * Requires a control to have a value from an enumerated list of values.
     *
     * Converts types as needed to allow string inputs to still correctly
     * match number, boolean, and null enum values.
     *
     * // {any[]} allowedValues - array of acceptable values
     * // {IValidatorFn}
     * @param {?} allowedValues
     * @return {?}
     */
    function (allowedValues) {
        if (!isArray(allowedValues)) {
            return JsonValidators.nullValidator;
        }
        return function (control, invert) {
            if (invert === void 0) { invert = false; }
            if (isEmpty(control.value)) {
                return null;
            }
            /** @type {?} */
            var currentValue = control.value;
            /** @type {?} */
            var isEqual = function (enumValue, inputValue) {
                return enumValue === inputValue ||
                    (isNumber(enumValue) && +inputValue === +enumValue) ||
                    (isBoolean(enumValue, 'strict') &&
                        toJavaScriptType(inputValue, 'boolean') === enumValue) ||
                    (enumValue === null && !hasValue(inputValue)) ||
                    _.isEqual(enumValue, inputValue);
            };
            /** @type {?} */
            var isValid = isArray(currentValue) ?
                currentValue.every(function (inputValue) { return allowedValues.some(function (enumValue) {
                    return isEqual(enumValue, inputValue);
                }); }) :
                allowedValues.some(function (enumValue) { return isEqual(enumValue, currentValue); });
            return xor(isValid, invert) ?
                null : { 'enum': { allowedValues: allowedValues, currentValue: currentValue } };
        };
    };
    /**
     * 'const' validator
     *
     * Requires a control to have a specific value.
     *
     * Converts types as needed to allow string inputs to still correctly
     * match number, boolean, and null values.
     *
     * TODO: modify to work with objects
     *
     * // {any[]} requiredValue - required value
     * // {IValidatorFn}
     */
    /**
     * 'const' validator
     *
     * Requires a control to have a specific value.
     *
     * Converts types as needed to allow string inputs to still correctly
     * match number, boolean, and null values.
     *
     * TODO: modify to work with objects
     *
     * // {any[]} requiredValue - required value
     * // {IValidatorFn}
     * @param {?} requiredValue
     * @return {?}
     */
    JsonValidators.const = /**
     * 'const' validator
     *
     * Requires a control to have a specific value.
     *
     * Converts types as needed to allow string inputs to still correctly
     * match number, boolean, and null values.
     *
     * TODO: modify to work with objects
     *
     * // {any[]} requiredValue - required value
     * // {IValidatorFn}
     * @param {?} requiredValue
     * @return {?}
     */
    function (requiredValue) {
        if (!hasValue(requiredValue)) {
            return JsonValidators.nullValidator;
        }
        return function (control, invert) {
            if (invert === void 0) { invert = false; }
            if (isEmpty(control.value)) {
                return null;
            }
            /** @type {?} */
            var currentValue = control.value;
            /** @type {?} */
            var isEqual = function (constValue, inputValue) {
                return constValue === inputValue ||
                    isNumber(constValue) && +inputValue === +constValue ||
                    isBoolean(constValue, 'strict') &&
                        toJavaScriptType(inputValue, 'boolean') === constValue ||
                    constValue === null && !hasValue(inputValue);
            };
            /** @type {?} */
            var isValid = isEqual(requiredValue, currentValue);
            return xor(isValid, invert) ?
                null : { 'const': { requiredValue: requiredValue, currentValue: currentValue } };
        };
    };
    /**
     * 'minLength' validator
     *
     * Requires a control's text value to be greater than a specified length.
     *
     * // {number} minimumLength - minimum allowed string length
     * // {boolean = false} invert - instead return error object only if valid
     * // {IValidatorFn}
     */
    /**
     * 'minLength' validator
     *
     * Requires a control's text value to be greater than a specified length.
     *
     * // {number} minimumLength - minimum allowed string length
     * // {boolean = false} invert - instead return error object only if valid
     * // {IValidatorFn}
     * @param {?} minimumLength
     * @return {?}
     */
    JsonValidators.minLength = /**
     * 'minLength' validator
     *
     * Requires a control's text value to be greater than a specified length.
     *
     * // {number} minimumLength - minimum allowed string length
     * // {boolean = false} invert - instead return error object only if valid
     * // {IValidatorFn}
     * @param {?} minimumLength
     * @return {?}
     */
    function (minimumLength) {
        if (!hasValue(minimumLength)) {
            return JsonValidators.nullValidator;
        }
        return function (control, invert) {
            if (invert === void 0) { invert = false; }
            if (isEmpty(control.value)) {
                return null;
            }
            /** @type {?} */
            var currentLength = isString(control.value) ? control.value.length : 0;
            /** @type {?} */
            var isValid = currentLength >= minimumLength;
            return xor(isValid, invert) ?
                null : { 'minLength': { minimumLength: minimumLength, currentLength: currentLength } };
        };
    };
    ;
    /**
     * 'maxLength' validator
     *
     * Requires a control's text value to be less than a specified length.
     *
     * // {number} maximumLength - maximum allowed string length
     * // {boolean = false} invert - instead return error object only if valid
     * // {IValidatorFn}
     */
    /**
     * 'maxLength' validator
     *
     * Requires a control's text value to be less than a specified length.
     *
     * // {number} maximumLength - maximum allowed string length
     * // {boolean = false} invert - instead return error object only if valid
     * // {IValidatorFn}
     * @param {?} maximumLength
     * @return {?}
     */
    JsonValidators.maxLength = /**
     * 'maxLength' validator
     *
     * Requires a control's text value to be less than a specified length.
     *
     * // {number} maximumLength - maximum allowed string length
     * // {boolean = false} invert - instead return error object only if valid
     * // {IValidatorFn}
     * @param {?} maximumLength
     * @return {?}
     */
    function (maximumLength) {
        if (!hasValue(maximumLength)) {
            return JsonValidators.nullValidator;
        }
        return function (control, invert) {
            if (invert === void 0) { invert = false; }
            /** @type {?} */
            var currentLength = isString(control.value) ? control.value.length : 0;
            /** @type {?} */
            var isValid = currentLength <= maximumLength;
            return xor(isValid, invert) ?
                null : { 'maxLength': { maximumLength: maximumLength, currentLength: currentLength } };
        };
    };
    ;
    /**
     * 'pattern' validator
     *
     * Note: NOT the same as Angular's default pattern validator.
     *
     * Requires a control's value to match a specified regular expression pattern.
     *
     * This validator changes the behavior of default pattern validator
     * by replacing RegExp(`^${pattern}$`) with RegExp(`${pattern}`),
     * which allows for partial matches.
     *
     * To return to the default funcitonality, and match the entire string,
     * pass TRUE as the optional second parameter.
     *
     * // {string} pattern - regular expression pattern
     * // {boolean = false} wholeString - match whole value string?
     * // {IValidatorFn}
     */
    /**
     * 'pattern' validator
     *
     * Note: NOT the same as Angular's default pattern validator.
     *
     * Requires a control's value to match a specified regular expression pattern.
     *
     * This validator changes the behavior of default pattern validator
     * by replacing RegExp(`^${pattern}$`) with RegExp(`${pattern}`),
     * which allows for partial matches.
     *
     * To return to the default funcitonality, and match the entire string,
     * pass TRUE as the optional second parameter.
     *
     * // {string} pattern - regular expression pattern
     * // {boolean = false} wholeString - match whole value string?
     * // {IValidatorFn}
     * @param {?} pattern
     * @param {?=} wholeString
     * @return {?}
     */
    JsonValidators.pattern = /**
     * 'pattern' validator
     *
     * Note: NOT the same as Angular's default pattern validator.
     *
     * Requires a control's value to match a specified regular expression pattern.
     *
     * This validator changes the behavior of default pattern validator
     * by replacing RegExp(`^${pattern}$`) with RegExp(`${pattern}`),
     * which allows for partial matches.
     *
     * To return to the default funcitonality, and match the entire string,
     * pass TRUE as the optional second parameter.
     *
     * // {string} pattern - regular expression pattern
     * // {boolean = false} wholeString - match whole value string?
     * // {IValidatorFn}
     * @param {?} pattern
     * @param {?=} wholeString
     * @return {?}
     */
    function (pattern, wholeString) {
        if (wholeString === void 0) { wholeString = false; }
        if (!hasValue(pattern)) {
            return JsonValidators.nullValidator;
        }
        return function (control, invert) {
            if (invert === void 0) { invert = false; }
            if (isEmpty(control.value)) {
                return null;
            }
            /** @type {?} */
            var regex;
            /** @type {?} */
            var requiredPattern;
            if (typeof pattern === 'string') {
                requiredPattern = (wholeString) ? "^" + pattern + "$" : pattern;
                regex = new RegExp(requiredPattern);
            }
            else {
                requiredPattern = pattern.toString();
                regex = pattern;
            }
            /** @type {?} */
            var currentValue = control.value;
            /** @type {?} */
            var isValid = isString(currentValue) ? regex.test(currentValue) : false;
            return xor(isValid, invert) ?
                null : { 'pattern': { requiredPattern: requiredPattern, currentValue: currentValue } };
        };
    };
    /**
     * 'format' validator
     *
     * Requires a control to have a value of a certain format.
     *
     * This validator currently checks the following formsts:
     *   date, time, date-time, email, hostname, ipv4, ipv6,
     *   uri, uri-reference, uri-template, url, uuid, color,
     *   json-pointer, relative-json-pointer, regex
     *
     * Fast format regular expressions copied from AJV:
     * https://github.com/epoberezkin/ajv/blob/master/lib/compile/formats.js
     *
     * // {JsonSchemaFormatNames} requiredFormat - format to check
     * // {IValidatorFn}
     */
    /**
     * 'format' validator
     *
     * Requires a control to have a value of a certain format.
     *
     * This validator currently checks the following formsts:
     *   date, time, date-time, email, hostname, ipv4, ipv6,
     *   uri, uri-reference, uri-template, url, uuid, color,
     *   json-pointer, relative-json-pointer, regex
     *
     * Fast format regular expressions copied from AJV:
     * https://github.com/epoberezkin/ajv/blob/master/lib/compile/formats.js
     *
     * // {JsonSchemaFormatNames} requiredFormat - format to check
     * // {IValidatorFn}
     * @param {?} requiredFormat
     * @return {?}
     */
    JsonValidators.format = /**
     * 'format' validator
     *
     * Requires a control to have a value of a certain format.
     *
     * This validator currently checks the following formsts:
     *   date, time, date-time, email, hostname, ipv4, ipv6,
     *   uri, uri-reference, uri-template, url, uuid, color,
     *   json-pointer, relative-json-pointer, regex
     *
     * Fast format regular expressions copied from AJV:
     * https://github.com/epoberezkin/ajv/blob/master/lib/compile/formats.js
     *
     * // {JsonSchemaFormatNames} requiredFormat - format to check
     * // {IValidatorFn}
     * @param {?} requiredFormat
     * @return {?}
     */
    function (requiredFormat) {
        if (!hasValue(requiredFormat)) {
            return JsonValidators.nullValidator;
        }
        return function (control, invert) {
            if (invert === void 0) { invert = false; }
            if (isEmpty(control.value)) {
                return null;
            }
            /** @type {?} */
            var isValid;
            /** @type {?} */
            var currentValue = control.value;
            if (isString(currentValue)) {
                /** @type {?} */
                var formatTest = jsonSchemaFormatTests[requiredFormat];
                if (typeof formatTest === 'object') {
                    isValid = (/** @type {?} */ (formatTest)).test(/** @type {?} */ (currentValue));
                }
                else if (typeof formatTest === 'function') {
                    isValid = (/** @type {?} */ (formatTest))(/** @type {?} */ (currentValue));
                }
                else {
                    console.error("format validator error: \"" + requiredFormat + "\" is not a recognized format.");
                    isValid = true;
                }
            }
            else {
                // Allow JavaScript Date objects
                isValid = ['date', 'time', 'date-time'].includes(requiredFormat) &&
                    Object.prototype.toString.call(currentValue) === '[object Date]';
            }
            return xor(isValid, invert) ?
                null : { 'format': { requiredFormat: requiredFormat, currentValue: currentValue } };
        };
    };
    /**
     * 'minimum' validator
     *
     * Requires a control's numeric value to be greater than or equal to
     * a minimum amount.
     *
     * Any non-numeric value is also valid (according to the HTML forms spec,
     * a non-numeric value doesn't have a minimum).
     * https://www.w3.org/TR/html5/forms.html#attr-input-max
     *
     * // {number} minimum - minimum allowed value
     * // {IValidatorFn}
     */
    /**
     * 'minimum' validator
     *
     * Requires a control's numeric value to be greater than or equal to
     * a minimum amount.
     *
     * Any non-numeric value is also valid (according to the HTML forms spec,
     * a non-numeric value doesn't have a minimum).
     * https://www.w3.org/TR/html5/forms.html#attr-input-max
     *
     * // {number} minimum - minimum allowed value
     * // {IValidatorFn}
     * @param {?} minimumValue
     * @return {?}
     */
    JsonValidators.minimum = /**
     * 'minimum' validator
     *
     * Requires a control's numeric value to be greater than or equal to
     * a minimum amount.
     *
     * Any non-numeric value is also valid (according to the HTML forms spec,
     * a non-numeric value doesn't have a minimum).
     * https://www.w3.org/TR/html5/forms.html#attr-input-max
     *
     * // {number} minimum - minimum allowed value
     * // {IValidatorFn}
     * @param {?} minimumValue
     * @return {?}
     */
    function (minimumValue) {
        if (!hasValue(minimumValue)) {
            return JsonValidators.nullValidator;
        }
        return function (control, invert) {
            if (invert === void 0) { invert = false; }
            if (isEmpty(control.value)) {
                return null;
            }
            /** @type {?} */
            var currentValue = control.value;
            /** @type {?} */
            var isValid = !isNumber(currentValue) || currentValue >= minimumValue;
            return xor(isValid, invert) ?
                null : { 'minimum': { minimumValue: minimumValue, currentValue: currentValue } };
        };
    };
    /**
     * 'exclusiveMinimum' validator
     *
     * Requires a control's numeric value to be less than a maximum amount.
     *
     * Any non-numeric value is also valid (according to the HTML forms spec,
     * a non-numeric value doesn't have a maximum).
     * https://www.w3.org/TR/html5/forms.html#attr-input-max
     *
     * // {number} exclusiveMinimumValue - maximum allowed value
     * // {IValidatorFn}
     */
    /**
     * 'exclusiveMinimum' validator
     *
     * Requires a control's numeric value to be less than a maximum amount.
     *
     * Any non-numeric value is also valid (according to the HTML forms spec,
     * a non-numeric value doesn't have a maximum).
     * https://www.w3.org/TR/html5/forms.html#attr-input-max
     *
     * // {number} exclusiveMinimumValue - maximum allowed value
     * // {IValidatorFn}
     * @param {?} exclusiveMinimumValue
     * @return {?}
     */
    JsonValidators.exclusiveMinimum = /**
     * 'exclusiveMinimum' validator
     *
     * Requires a control's numeric value to be less than a maximum amount.
     *
     * Any non-numeric value is also valid (according to the HTML forms spec,
     * a non-numeric value doesn't have a maximum).
     * https://www.w3.org/TR/html5/forms.html#attr-input-max
     *
     * // {number} exclusiveMinimumValue - maximum allowed value
     * // {IValidatorFn}
     * @param {?} exclusiveMinimumValue
     * @return {?}
     */
    function (exclusiveMinimumValue) {
        if (!hasValue(exclusiveMinimumValue)) {
            return JsonValidators.nullValidator;
        }
        return function (control, invert) {
            if (invert === void 0) { invert = false; }
            if (isEmpty(control.value)) {
                return null;
            }
            /** @type {?} */
            var currentValue = control.value;
            /** @type {?} */
            var isValid = !isNumber(currentValue) || +currentValue < exclusiveMinimumValue;
            return xor(isValid, invert) ?
                null : { 'exclusiveMinimum': { exclusiveMinimumValue: exclusiveMinimumValue, currentValue: currentValue } };
        };
    };
    /**
     * 'maximum' validator
     *
     * Requires a control's numeric value to be less than or equal to
     * a maximum amount.
     *
     * Any non-numeric value is also valid (according to the HTML forms spec,
     * a non-numeric value doesn't have a maximum).
     * https://www.w3.org/TR/html5/forms.html#attr-input-max
     *
     * // {number} maximumValue - maximum allowed value
     * // {IValidatorFn}
     */
    /**
     * 'maximum' validator
     *
     * Requires a control's numeric value to be less than or equal to
     * a maximum amount.
     *
     * Any non-numeric value is also valid (according to the HTML forms spec,
     * a non-numeric value doesn't have a maximum).
     * https://www.w3.org/TR/html5/forms.html#attr-input-max
     *
     * // {number} maximumValue - maximum allowed value
     * // {IValidatorFn}
     * @param {?} maximumValue
     * @return {?}
     */
    JsonValidators.maximum = /**
     * 'maximum' validator
     *
     * Requires a control's numeric value to be less than or equal to
     * a maximum amount.
     *
     * Any non-numeric value is also valid (according to the HTML forms spec,
     * a non-numeric value doesn't have a maximum).
     * https://www.w3.org/TR/html5/forms.html#attr-input-max
     *
     * // {number} maximumValue - maximum allowed value
     * // {IValidatorFn}
     * @param {?} maximumValue
     * @return {?}
     */
    function (maximumValue) {
        if (!hasValue(maximumValue)) {
            return JsonValidators.nullValidator;
        }
        return function (control, invert) {
            if (invert === void 0) { invert = false; }
            if (isEmpty(control.value)) {
                return null;
            }
            /** @type {?} */
            var currentValue = control.value;
            /** @type {?} */
            var isValid = !isNumber(currentValue) || +currentValue <= maximumValue;
            return xor(isValid, invert) ?
                null : { 'maximum': { maximumValue: maximumValue, currentValue: currentValue } };
        };
    };
    /**
     * 'exclusiveMaximum' validator
     *
     * Requires a control's numeric value to be less than a maximum amount.
     *
     * Any non-numeric value is also valid (according to the HTML forms spec,
     * a non-numeric value doesn't have a maximum).
     * https://www.w3.org/TR/html5/forms.html#attr-input-max
     *
     * // {number} exclusiveMaximumValue - maximum allowed value
     * // {IValidatorFn}
     */
    /**
     * 'exclusiveMaximum' validator
     *
     * Requires a control's numeric value to be less than a maximum amount.
     *
     * Any non-numeric value is also valid (according to the HTML forms spec,
     * a non-numeric value doesn't have a maximum).
     * https://www.w3.org/TR/html5/forms.html#attr-input-max
     *
     * // {number} exclusiveMaximumValue - maximum allowed value
     * // {IValidatorFn}
     * @param {?} exclusiveMaximumValue
     * @return {?}
     */
    JsonValidators.exclusiveMaximum = /**
     * 'exclusiveMaximum' validator
     *
     * Requires a control's numeric value to be less than a maximum amount.
     *
     * Any non-numeric value is also valid (according to the HTML forms spec,
     * a non-numeric value doesn't have a maximum).
     * https://www.w3.org/TR/html5/forms.html#attr-input-max
     *
     * // {number} exclusiveMaximumValue - maximum allowed value
     * // {IValidatorFn}
     * @param {?} exclusiveMaximumValue
     * @return {?}
     */
    function (exclusiveMaximumValue) {
        if (!hasValue(exclusiveMaximumValue)) {
            return JsonValidators.nullValidator;
        }
        return function (control, invert) {
            if (invert === void 0) { invert = false; }
            if (isEmpty(control.value)) {
                return null;
            }
            /** @type {?} */
            var currentValue = control.value;
            /** @type {?} */
            var isValid = !isNumber(currentValue) || +currentValue < exclusiveMaximumValue;
            return xor(isValid, invert) ?
                null : { 'exclusiveMaximum': { exclusiveMaximumValue: exclusiveMaximumValue, currentValue: currentValue } };
        };
    };
    /**
     * 'multipleOf' validator
     *
     * Requires a control to have a numeric value that is a multiple
     * of a specified number.
     *
     * // {number} multipleOfValue - number value must be a multiple of
     * // {IValidatorFn}
     */
    /**
     * 'multipleOf' validator
     *
     * Requires a control to have a numeric value that is a multiple
     * of a specified number.
     *
     * // {number} multipleOfValue - number value must be a multiple of
     * // {IValidatorFn}
     * @param {?} multipleOfValue
     * @return {?}
     */
    JsonValidators.multipleOf = /**
     * 'multipleOf' validator
     *
     * Requires a control to have a numeric value that is a multiple
     * of a specified number.
     *
     * // {number} multipleOfValue - number value must be a multiple of
     * // {IValidatorFn}
     * @param {?} multipleOfValue
     * @return {?}
     */
    function (multipleOfValue) {
        if (!hasValue(multipleOfValue)) {
            return JsonValidators.nullValidator;
        }
        return function (control, invert) {
            if (invert === void 0) { invert = false; }
            if (isEmpty(control.value)) {
                return null;
            }
            /** @type {?} */
            var currentValue = control.value;
            /** @type {?} */
            var isValid = isNumber(currentValue) &&
                currentValue % multipleOfValue === 0;
            return xor(isValid, invert) ?
                null : { 'multipleOf': { multipleOfValue: multipleOfValue, currentValue: currentValue } };
        };
    };
    /**
     * 'minProperties' validator
     *
     * Requires a form group to have a minimum number of properties (i.e. have
     * values entered in a minimum number of controls within the group).
     *
     * // {number} minimumProperties - minimum number of properties allowed
     * // {IValidatorFn}
     */
    /**
     * 'minProperties' validator
     *
     * Requires a form group to have a minimum number of properties (i.e. have
     * values entered in a minimum number of controls within the group).
     *
     * // {number} minimumProperties - minimum number of properties allowed
     * // {IValidatorFn}
     * @param {?} minimumProperties
     * @return {?}
     */
    JsonValidators.minProperties = /**
     * 'minProperties' validator
     *
     * Requires a form group to have a minimum number of properties (i.e. have
     * values entered in a minimum number of controls within the group).
     *
     * // {number} minimumProperties - minimum number of properties allowed
     * // {IValidatorFn}
     * @param {?} minimumProperties
     * @return {?}
     */
    function (minimumProperties) {
        if (!hasValue(minimumProperties)) {
            return JsonValidators.nullValidator;
        }
        return function (control, invert) {
            if (invert === void 0) { invert = false; }
            if (isEmpty(control.value)) {
                return null;
            }
            /** @type {?} */
            var currentProperties = Object.keys(control.value).length || 0;
            /** @type {?} */
            var isValid = currentProperties >= minimumProperties;
            return xor(isValid, invert) ?
                null : { 'minProperties': { minimumProperties: minimumProperties, currentProperties: currentProperties } };
        };
    };
    /**
     * 'maxProperties' validator
     *
     * Requires a form group to have a maximum number of properties (i.e. have
     * values entered in a maximum number of controls within the group).
     *
     * Note: Has no effect if the form group does not contain more than the
     * maximum number of controls.
     *
     * // {number} maximumProperties - maximum number of properties allowed
     * // {IValidatorFn}
     */
    /**
     * 'maxProperties' validator
     *
     * Requires a form group to have a maximum number of properties (i.e. have
     * values entered in a maximum number of controls within the group).
     *
     * Note: Has no effect if the form group does not contain more than the
     * maximum number of controls.
     *
     * // {number} maximumProperties - maximum number of properties allowed
     * // {IValidatorFn}
     * @param {?} maximumProperties
     * @return {?}
     */
    JsonValidators.maxProperties = /**
     * 'maxProperties' validator
     *
     * Requires a form group to have a maximum number of properties (i.e. have
     * values entered in a maximum number of controls within the group).
     *
     * Note: Has no effect if the form group does not contain more than the
     * maximum number of controls.
     *
     * // {number} maximumProperties - maximum number of properties allowed
     * // {IValidatorFn}
     * @param {?} maximumProperties
     * @return {?}
     */
    function (maximumProperties) {
        if (!hasValue(maximumProperties)) {
            return JsonValidators.nullValidator;
        }
        return function (control, invert) {
            if (invert === void 0) { invert = false; }
            /** @type {?} */
            var currentProperties = Object.keys(control.value).length || 0;
            /** @type {?} */
            var isValid = currentProperties <= maximumProperties;
            return xor(isValid, invert) ?
                null : { 'maxProperties': { maximumProperties: maximumProperties, currentProperties: currentProperties } };
        };
    };
    /**
     * 'dependencies' validator
     *
     * Requires the controls in a form group to meet additional validation
     * criteria, depending on the values of other controls in the group.
     *
     * Examples:
     * https://spacetelescope.github.io/understanding-json-schema/reference/object.html#dependencies
     *
     * // {any} dependencies - required dependencies
     * // {IValidatorFn}
     */
    /**
     * 'dependencies' validator
     *
     * Requires the controls in a form group to meet additional validation
     * criteria, depending on the values of other controls in the group.
     *
     * Examples:
     * https://spacetelescope.github.io/understanding-json-schema/reference/object.html#dependencies
     *
     * // {any} dependencies - required dependencies
     * // {IValidatorFn}
     * @param {?} dependencies
     * @return {?}
     */
    JsonValidators.dependencies = /**
     * 'dependencies' validator
     *
     * Requires the controls in a form group to meet additional validation
     * criteria, depending on the values of other controls in the group.
     *
     * Examples:
     * https://spacetelescope.github.io/understanding-json-schema/reference/object.html#dependencies
     *
     * // {any} dependencies - required dependencies
     * // {IValidatorFn}
     * @param {?} dependencies
     * @return {?}
     */
    function (dependencies) {
        if (getType(dependencies) !== 'object' || isEmpty(dependencies)) {
            return JsonValidators.nullValidator;
        }
        return function (control, invert) {
            if (invert === void 0) { invert = false; }
            if (isEmpty(control.value)) {
                return null;
            }
            /** @type {?} */
            var allErrors = _mergeObjects(forEachCopy(dependencies, function (value, requiringField) {
                if (!hasValue(control.value[requiringField])) {
                    return null;
                }
                /** @type {?} */
                var requiringFieldErrors = {};
                /** @type {?} */
                var requiredFields;
                /** @type {?} */
                var properties = {};
                if (getType(dependencies[requiringField]) === 'array') {
                    requiredFields = dependencies[requiringField];
                }
                else if (getType(dependencies[requiringField]) === 'object') {
                    requiredFields = dependencies[requiringField]['required'] || [];
                    properties = dependencies[requiringField]['properties'] || {};
                }
                try {
                    // Validate property dependencies
                    for (var requiredFields_1 = tslib_1.__values(requiredFields), requiredFields_1_1 = requiredFields_1.next(); !requiredFields_1_1.done; requiredFields_1_1 = requiredFields_1.next()) {
                        var requiredField = requiredFields_1_1.value;
                        if (xor(!hasValue(control.value[requiredField]), invert)) {
                            requiringFieldErrors[requiredField] = { 'required': true };
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (requiredFields_1_1 && !requiredFields_1_1.done && (_a = requiredFields_1.return)) _a.call(requiredFields_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                // Validate schema dependencies
                requiringFieldErrors = _mergeObjects(requiringFieldErrors, forEachCopy(properties, function (requirements, requiredField) {
                    /** @type {?} */
                    var requiredFieldErrors = _mergeObjects(forEachCopy(requirements, function (requirement, parameter) {
                        /** @type {?} */
                        var validator = null;
                        if (requirement === 'maximum' || requirement === 'minimum') {
                            /** @type {?} */
                            var exclusive = !!requirements['exclusiveM' + requirement.slice(1)];
                            validator = JsonValidators[requirement](parameter, exclusive);
                        }
                        else if (typeof JsonValidators[requirement] === 'function') {
                            validator = JsonValidators[requirement](parameter);
                        }
                        return !isDefined(validator) ?
                            null : validator(control.value[requiredField]);
                    }));
                    return isEmpty(requiredFieldErrors) ?
                        null : (_a = {}, _a[requiredField] = requiredFieldErrors, _a);
                    var _a;
                }));
                return isEmpty(requiringFieldErrors) ?
                    null : (_b = {}, _b[requiringField] = requiringFieldErrors, _b);
                var e_1, _a, _b;
            }));
            return isEmpty(allErrors) ? null : allErrors;
        };
    };
    /**
     * 'minItems' validator
     *
     * Requires a form array to have a minimum number of values.
     *
     * // {number} minimumItems - minimum number of items allowed
     * // {IValidatorFn}
     */
    /**
     * 'minItems' validator
     *
     * Requires a form array to have a minimum number of values.
     *
     * // {number} minimumItems - minimum number of items allowed
     * // {IValidatorFn}
     * @param {?} minimumItems
     * @return {?}
     */
    JsonValidators.minItems = /**
     * 'minItems' validator
     *
     * Requires a form array to have a minimum number of values.
     *
     * // {number} minimumItems - minimum number of items allowed
     * // {IValidatorFn}
     * @param {?} minimumItems
     * @return {?}
     */
    function (minimumItems) {
        if (!hasValue(minimumItems)) {
            return JsonValidators.nullValidator;
        }
        return function (control, invert) {
            if (invert === void 0) { invert = false; }
            if (isEmpty(control.value)) {
                return null;
            }
            /** @type {?} */
            var currentItems = isArray(control.value) ? control.value.length : 0;
            /** @type {?} */
            var isValid = currentItems >= minimumItems;
            return xor(isValid, invert) ?
                null : { 'minItems': { minimumItems: minimumItems, currentItems: currentItems } };
        };
    };
    /**
     * 'maxItems' validator
     *
     * Requires a form array to have a maximum number of values.
     *
     * // {number} maximumItems - maximum number of items allowed
     * // {IValidatorFn}
     */
    /**
     * 'maxItems' validator
     *
     * Requires a form array to have a maximum number of values.
     *
     * // {number} maximumItems - maximum number of items allowed
     * // {IValidatorFn}
     * @param {?} maximumItems
     * @return {?}
     */
    JsonValidators.maxItems = /**
     * 'maxItems' validator
     *
     * Requires a form array to have a maximum number of values.
     *
     * // {number} maximumItems - maximum number of items allowed
     * // {IValidatorFn}
     * @param {?} maximumItems
     * @return {?}
     */
    function (maximumItems) {
        if (!hasValue(maximumItems)) {
            return JsonValidators.nullValidator;
        }
        return function (control, invert) {
            if (invert === void 0) { invert = false; }
            /** @type {?} */
            var currentItems = isArray(control.value) ? control.value.length : 0;
            /** @type {?} */
            var isValid = currentItems <= maximumItems;
            return xor(isValid, invert) ?
                null : { 'maxItems': { maximumItems: maximumItems, currentItems: currentItems } };
        };
    };
    /**
     * 'uniqueItems' validator
     *
     * Requires values in a form array to be unique.
     *
     * // {boolean = true} unique? - true to validate, false to disable
     * // {IValidatorFn}
     */
    /**
     * 'uniqueItems' validator
     *
     * Requires values in a form array to be unique.
     *
     * // {boolean = true} unique? - true to validate, false to disable
     * // {IValidatorFn}
     * @param {?=} unique
     * @return {?}
     */
    JsonValidators.uniqueItems = /**
     * 'uniqueItems' validator
     *
     * Requires values in a form array to be unique.
     *
     * // {boolean = true} unique? - true to validate, false to disable
     * // {IValidatorFn}
     * @param {?=} unique
     * @return {?}
     */
    function (unique) {
        if (unique === void 0) { unique = true; }
        if (!unique) {
            return JsonValidators.nullValidator;
        }
        return function (control, invert) {
            if (invert === void 0) { invert = false; }
            if (isEmpty(control.value)) {
                return null;
            }
            /** @type {?} */
            var sorted = control.value.slice().sort();
            /** @type {?} */
            var duplicateItems = [];
            for (var i = 1; i < sorted.length; i++) {
                if (sorted[i - 1] === sorted[i] && duplicateItems.includes(sorted[i])) {
                    duplicateItems.push(sorted[i]);
                }
            }
            /** @type {?} */
            var isValid = !duplicateItems.length;
            return xor(isValid, invert) ?
                null : { 'uniqueItems': { duplicateItems: duplicateItems } };
        };
    };
    /**
     * 'contains' validator
     *
     * TODO: Complete this validator
     *
     * Requires values in a form array to be unique.
     *
     * // {boolean = true} unique? - true to validate, false to disable
     * // {IValidatorFn}
     */
    /**
     * 'contains' validator
     *
     * TODO: Complete this validator
     *
     * Requires values in a form array to be unique.
     *
     * // {boolean = true} unique? - true to validate, false to disable
     * // {IValidatorFn}
     * @param {?=} requiredItem
     * @return {?}
     */
    JsonValidators.contains = /**
     * 'contains' validator
     *
     * TODO: Complete this validator
     *
     * Requires values in a form array to be unique.
     *
     * // {boolean = true} unique? - true to validate, false to disable
     * // {IValidatorFn}
     * @param {?=} requiredItem
     * @return {?}
     */
    function (requiredItem) {
        if (requiredItem === void 0) { requiredItem = true; }
        if (!requiredItem) {
            return JsonValidators.nullValidator;
        }
        return function (control, invert) {
            if (invert === void 0) { invert = false; }
            if (isEmpty(control.value) || !isArray(control.value)) {
                return null;
            }
            /** @type {?} */
            var currentItems = control.value;
            /** @type {?} */
            var isValid = true;
            return xor(isValid, invert) ?
                null : { 'contains': { requiredItem: requiredItem, currentItems: currentItems } };
        };
    };
    /**
     * No-op validator. Included for backward compatibility.
     */
    /**
     * No-op validator. Included for backward compatibility.
     * @param {?} control
     * @return {?}
     */
    JsonValidators.nullValidator = /**
     * No-op validator. Included for backward compatibility.
     * @param {?} control
     * @return {?}
     */
    function (control) {
        return null;
    };
    /**
     * Validator transformation functions:
     * composeAnyOf, composeOneOf, composeAllOf, composeNot,
     * compose, composeAsync
     *
     * TODO: Add composeAnyOfAsync, composeOneOfAsync,
     *           composeAllOfAsync, composeNotAsync
     */
    /**
     * 'composeAnyOf' validator combination function
     *
     * Accepts an array of validators and returns a single validator that
     * evaluates to valid if any one or more of the submitted validators are
     * valid. If every validator is invalid, it returns combined errors from
     * all validators.
     *
     * // {IValidatorFn[]} validators - array of validators to combine
     * // {IValidatorFn} - single combined validator function
     */
    /**
     * 'composeAnyOf' validator combination function
     *
     * Accepts an array of validators and returns a single validator that
     * evaluates to valid if any one or more of the submitted validators are
     * valid. If every validator is invalid, it returns combined errors from
     * all validators.
     *
     * // {IValidatorFn[]} validators - array of validators to combine
     * // {IValidatorFn} - single combined validator function
     * @param {?} validators
     * @return {?}
     */
    JsonValidators.composeAnyOf = /**
     * 'composeAnyOf' validator combination function
     *
     * Accepts an array of validators and returns a single validator that
     * evaluates to valid if any one or more of the submitted validators are
     * valid. If every validator is invalid, it returns combined errors from
     * all validators.
     *
     * // {IValidatorFn[]} validators - array of validators to combine
     * // {IValidatorFn} - single combined validator function
     * @param {?} validators
     * @return {?}
     */
    function (validators) {
        if (!validators) {
            return null;
        }
        /** @type {?} */
        var presentValidators = validators.filter(isDefined);
        if (presentValidators.length === 0) {
            return null;
        }
        return function (control, invert) {
            if (invert === void 0) { invert = false; }
            /** @type {?} */
            var arrayOfErrors = _executeValidators(control, presentValidators, invert).filter(isDefined);
            /** @type {?} */
            var isValid = validators.length > arrayOfErrors.length;
            return xor(isValid, invert) ?
                null : _mergeObjects.apply(void 0, tslib_1.__spread(arrayOfErrors, [{ 'anyOf': !invert }]));
        };
    };
    /**
     * 'composeOneOf' validator combination function
     *
     * Accepts an array of validators and returns a single validator that
     * evaluates to valid only if exactly one of the submitted validators
     * is valid. Otherwise returns combined information from all validators,
     * both valid and invalid.
     *
     * // {IValidatorFn[]} validators - array of validators to combine
     * // {IValidatorFn} - single combined validator function
     */
    /**
     * 'composeOneOf' validator combination function
     *
     * Accepts an array of validators and returns a single validator that
     * evaluates to valid only if exactly one of the submitted validators
     * is valid. Otherwise returns combined information from all validators,
     * both valid and invalid.
     *
     * // {IValidatorFn[]} validators - array of validators to combine
     * // {IValidatorFn} - single combined validator function
     * @param {?} validators
     * @return {?}
     */
    JsonValidators.composeOneOf = /**
     * 'composeOneOf' validator combination function
     *
     * Accepts an array of validators and returns a single validator that
     * evaluates to valid only if exactly one of the submitted validators
     * is valid. Otherwise returns combined information from all validators,
     * both valid and invalid.
     *
     * // {IValidatorFn[]} validators - array of validators to combine
     * // {IValidatorFn} - single combined validator function
     * @param {?} validators
     * @return {?}
     */
    function (validators) {
        if (!validators) {
            return null;
        }
        /** @type {?} */
        var presentValidators = validators.filter(isDefined);
        if (presentValidators.length === 0) {
            return null;
        }
        return function (control, invert) {
            if (invert === void 0) { invert = false; }
            /** @type {?} */
            var arrayOfErrors = _executeValidators(control, presentValidators);
            /** @type {?} */
            var validControls = validators.length - arrayOfErrors.filter(isDefined).length;
            /** @type {?} */
            var isValid = validControls === 1;
            if (xor(isValid, invert)) {
                return null;
            }
            /** @type {?} */
            var arrayOfValids = _executeValidators(control, presentValidators, invert);
            return _mergeObjects.apply(void 0, tslib_1.__spread(arrayOfErrors, arrayOfValids, [{ 'oneOf': !invert }]));
        };
    };
    /**
     * 'composeAllOf' validator combination function
     *
     * Accepts an array of validators and returns a single validator that
     * evaluates to valid only if all the submitted validators are individually
     * valid. Otherwise it returns combined errors from all invalid validators.
     *
     * // {IValidatorFn[]} validators - array of validators to combine
     * // {IValidatorFn} - single combined validator function
     */
    /**
     * 'composeAllOf' validator combination function
     *
     * Accepts an array of validators and returns a single validator that
     * evaluates to valid only if all the submitted validators are individually
     * valid. Otherwise it returns combined errors from all invalid validators.
     *
     * // {IValidatorFn[]} validators - array of validators to combine
     * // {IValidatorFn} - single combined validator function
     * @param {?} validators
     * @return {?}
     */
    JsonValidators.composeAllOf = /**
     * 'composeAllOf' validator combination function
     *
     * Accepts an array of validators and returns a single validator that
     * evaluates to valid only if all the submitted validators are individually
     * valid. Otherwise it returns combined errors from all invalid validators.
     *
     * // {IValidatorFn[]} validators - array of validators to combine
     * // {IValidatorFn} - single combined validator function
     * @param {?} validators
     * @return {?}
     */
    function (validators) {
        if (!validators) {
            return null;
        }
        /** @type {?} */
        var presentValidators = validators.filter(isDefined);
        if (presentValidators.length === 0) {
            return null;
        }
        return function (control, invert) {
            if (invert === void 0) { invert = false; }
            /** @type {?} */
            var combinedErrors = _mergeErrors(_executeValidators(control, presentValidators, invert));
            /** @type {?} */
            var isValid = combinedErrors === null;
            return (xor(isValid, invert)) ?
                null : _mergeObjects(combinedErrors, { 'allOf': !invert });
        };
    };
    /**
     * 'composeNot' validator inversion function
     *
     * Accepts a single validator function and inverts its result.
     * Returns valid if the submitted validator is invalid, and
     * returns invalid if the submitted validator is valid.
     * (Note: this function can itself be inverted
     *   - e.g. composeNot(composeNot(validator)) -
     *   but this can be confusing and is therefore not recommended.)
     *
     * // {IValidatorFn[]} validators - validator(s) to invert
     * // {IValidatorFn} - new validator function that returns opposite result
     */
    /**
     * 'composeNot' validator inversion function
     *
     * Accepts a single validator function and inverts its result.
     * Returns valid if the submitted validator is invalid, and
     * returns invalid if the submitted validator is valid.
     * (Note: this function can itself be inverted
     *   - e.g. composeNot(composeNot(validator)) -
     *   but this can be confusing and is therefore not recommended.)
     *
     * // {IValidatorFn[]} validators - validator(s) to invert
     * // {IValidatorFn} - new validator function that returns opposite result
     * @param {?} validator
     * @return {?}
     */
    JsonValidators.composeNot = /**
     * 'composeNot' validator inversion function
     *
     * Accepts a single validator function and inverts its result.
     * Returns valid if the submitted validator is invalid, and
     * returns invalid if the submitted validator is valid.
     * (Note: this function can itself be inverted
     *   - e.g. composeNot(composeNot(validator)) -
     *   but this can be confusing and is therefore not recommended.)
     *
     * // {IValidatorFn[]} validators - validator(s) to invert
     * // {IValidatorFn} - new validator function that returns opposite result
     * @param {?} validator
     * @return {?}
     */
    function (validator) {
        if (!validator) {
            return null;
        }
        return function (control, invert) {
            if (invert === void 0) { invert = false; }
            if (isEmpty(control.value)) {
                return null;
            }
            /** @type {?} */
            var error = validator(control, !invert);
            /** @type {?} */
            var isValid = error === null;
            return (xor(isValid, invert)) ?
                null : _mergeObjects(error, { 'not': !invert });
        };
    };
    /**
     * 'compose' validator combination function
     *
     * // {IValidatorFn[]} validators - array of validators to combine
     * // {IValidatorFn} - single combined validator function
     */
    /**
     * 'compose' validator combination function
     *
     * // {IValidatorFn[]} validators - array of validators to combine
     * // {IValidatorFn} - single combined validator function
     * @param {?} validators
     * @return {?}
     */
    JsonValidators.compose = /**
     * 'compose' validator combination function
     *
     * // {IValidatorFn[]} validators - array of validators to combine
     * // {IValidatorFn} - single combined validator function
     * @param {?} validators
     * @return {?}
     */
    function (validators) {
        if (!validators) {
            return null;
        }
        /** @type {?} */
        var presentValidators = validators.filter(isDefined);
        if (presentValidators.length === 0) {
            return null;
        }
        return function (control, invert) {
            if (invert === void 0) { invert = false; }
            return _mergeErrors(_executeValidators(control, presentValidators, invert));
        };
    };
    ;
    /**
     * 'composeAsync' async validator combination function
     *
     * // {AsyncIValidatorFn[]} async validators - array of async validators
     * // {AsyncIValidatorFn} - single combined async validator function
     */
    /**
     * 'composeAsync' async validator combination function
     *
     * // {AsyncIValidatorFn[]} async validators - array of async validators
     * // {AsyncIValidatorFn} - single combined async validator function
     * @param {?} validators
     * @return {?}
     */
    JsonValidators.composeAsync = /**
     * 'composeAsync' async validator combination function
     *
     * // {AsyncIValidatorFn[]} async validators - array of async validators
     * // {AsyncIValidatorFn} - single combined async validator function
     * @param {?} validators
     * @return {?}
     */
    function (validators) {
        if (!validators) {
            return null;
        }
        /** @type {?} */
        var presentValidators = validators.filter(isDefined);
        if (presentValidators.length === 0) {
            return null;
        }
        return function (control) {
            /** @type {?} */
            var observables = _executeAsyncValidators(control, presentValidators).map(toObservable);
            return map.call(forkJoin(observables), _mergeErrors);
        };
    };
    // Additional angular validators (not used by Angualr JSON Schema Form)
    // From https://github.com/angular/angular/blob/master/packages/forms/src/validators.ts
    /**
     * Validator that requires controls to have a value greater than a number.
     */
    /**
     * Validator that requires controls to have a value greater than a number.
     * @param {?} min
     * @return {?}
     */
    JsonValidators.min = /**
     * Validator that requires controls to have a value greater than a number.
     * @param {?} min
     * @return {?}
     */
    function (min) {
        if (!hasValue(min)) {
            return JsonValidators.nullValidator;
        }
        return function (control) {
            // don't validate empty values to allow optional controls
            if (isEmpty(control.value) || isEmpty(min)) {
                return null;
            }
            /** @type {?} */
            var value = parseFloat(control.value);
            /** @type {?} */
            var actual = control.value;
            // Controls with NaN values after parsing should be treated as not having a
            // minimum, per the HTML forms spec: https://www.w3.org/TR/html5/forms.html#attr-input-min
            return isNaN(value) || value >= min ? null : { 'min': { min: min, actual: actual } };
        };
    };
    /**
     * Validator that requires controls to have a value less than a number.
     */
    /**
     * Validator that requires controls to have a value less than a number.
     * @param {?} max
     * @return {?}
     */
    JsonValidators.max = /**
     * Validator that requires controls to have a value less than a number.
     * @param {?} max
     * @return {?}
     */
    function (max) {
        if (!hasValue(max)) {
            return JsonValidators.nullValidator;
        }
        return function (control) {
            // don't validate empty values to allow optional controls
            if (isEmpty(control.value) || isEmpty(max)) {
                return null;
            }
            /** @type {?} */
            var value = parseFloat(control.value);
            /** @type {?} */
            var actual = control.value;
            // Controls with NaN values after parsing should be treated as not having a
            // maximum, per the HTML forms spec: https://www.w3.org/TR/html5/forms.html#attr-input-max
            return isNaN(value) || value <= max ? null : { 'max': { max: max, actual: actual } };
        };
    };
    /**
     * Validator that requires control value to be true.
     */
    /**
     * Validator that requires control value to be true.
     * @param {?} control
     * @return {?}
     */
    JsonValidators.requiredTrue = /**
     * Validator that requires control value to be true.
     * @param {?} control
     * @return {?}
     */
    function (control) {
        if (!control) {
            return JsonValidators.nullValidator;
        }
        return control.value === true ? null : { 'required': true };
    };
    /**
     * Validator that performs email validation.
     */
    /**
     * Validator that performs email validation.
     * @param {?} control
     * @return {?}
     */
    JsonValidators.email = /**
     * Validator that performs email validation.
     * @param {?} control
     * @return {?}
     */
    function (control) {
        if (!control) {
            return JsonValidators.nullValidator;
        }
        /** @type {?} */
        var EMAIL_REGEXP = /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/;
        return EMAIL_REGEXP.test(control.value) ? null : { 'email': true };
    };
    return JsonValidators;
}());
/**
 * 'JsonValidators' class
 *
 * Provides an extended set of validators to be used by form controls,
 * compatible with standard JSON Schema validation options.
 * http://json-schema.org/latest/json-schema-validation.html
 *
 * Note: This library is designed as a drop-in replacement for the Angular
 * Validators library, and except for one small breaking change to the 'pattern'
 * validator (described below) it can even be imported as a substitute, like so:
 *
 *   import { JsonValidators as Validators } from 'json-validators';
 *
 * and it should work with existing code as a complete replacement.
 *
 * The one exception is the 'pattern' validator, which has been changed to
 * matche partial values by default (the standard 'pattern' validator wrapped
 * all patterns in '^' and '$', forcing them to always match an entire value).
 * However, the old behavior can be restored by simply adding '^' and '$'
 * around your patterns, or by passing an optional second parameter of TRUE.
 * This change is to make the 'pattern' validator match the behavior of a
 * JSON Schema pattern, which allows partial matches, rather than the behavior
 * of an HTML input control pattern, which does not.
 *
 * This library replaces Angular's validators and combination functions
 * with the following validators and transformation functions:
 *
 * Validators:
 *   For all formControls:     required (*), type, enum, const
 *   For text formControls:    minLength (*), maxLength (*), pattern (*), format
 *   For numeric formControls: maximum, exclusiveMaximum,
 *                             minimum, exclusiveMinimum, multipleOf
 *   For formGroup objects:    minProperties, maxProperties, dependencies
 *   For formArray arrays:     minItems, maxItems, uniqueItems, contains
 *   Not used by JSON Schema:  min (*), max (*), requiredTrue (*), email (*)
 * (Validators originally included with Angular are maked with (*).)
 *
 * NOTE / TODO: The dependencies validator is not complete.
 * NOTE / TODO: The contains validator is not complete.
 *
 * Validators not used by JSON Schema (but included for compatibility)
 * and their JSON Schema equivalents:
 *
 *   Angular validator | JSON Schema equivalent
 *   ------------------|-----------------------
 *     min(number)     |   minimum(number)
 *     max(number)     |   maximum(number)
 *     requiredTrue()  |   const(true)
 *     email()         |   format('email')
 *
 * Validator transformation functions:
 *   composeAnyOf, composeOneOf, composeAllOf, composeNot
 * (Angular's original combination funciton, 'compose', is also included for
 * backward compatibility, though it is functionally equivalent to composeAllOf,
 * asside from its more generic error message.)
 *
 * All validators have also been extended to accept an optional second argument
 * which, if passed a TRUE value, causes the validator to perform the opposite
 * of its original finction. (This is used internally to enable 'not' and
 * 'composeOneOf' to function and return useful error messages.)
 *
 * The 'required' validator has also been overloaded so that if called with
 * a boolean parameter (or no parameters) it returns the original validator
 * function (rather than executing it). However, if it is called with an
 * AbstractControl parameter (as was previously required), it behaves
 * exactly as before.
 *
 * This enables all validators (including 'required') to be constructed in
 * exactly the same way, so they can be automatically applied using the
 * equivalent key names and values taken directly from a JSON Schema.
 *
 * This source code is partially derived from Angular,
 * which is Copyright (c) 2014-2017 Google, Inc.
 * Use of this source code is therefore governed by the same MIT-style license
 * that can be found in the LICENSE file at https://angular.io/license
 *
 * Original Angular Validators:
 * https://github.com/angular/angular/blob/master/packages/forms/src/validators.ts
 */
export { JsonValidators };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbi52YWxpZGF0b3JzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmc2LWpzb24tc2NoZW1hLWZvcm0vIiwic291cmNlcyI6WyJsaWIvc2hhcmVkL2pzb24udmFsaWRhdG9ycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLE9BQU8sRUFBYyxRQUFRLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDNUMsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXJDLE9BQU8sS0FBSyxDQUFDLE1BQU0sUUFBUSxDQUFDO0FBRTVCLE9BQU8sRUFDTCxrQkFBa0IsRUFBRSx1QkFBdUIsRUFBRSxhQUFhLEVBQUUsWUFBWSxFQUN4RSxPQUFPLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQ3BFLE9BQU8sRUFBRSxNQUFNLEVBQUUsZ0JBQWdCLEVBQUUsWUFBWSxFQUFFLEdBQUcsRUFFckQsTUFBTSx1QkFBdUIsQ0FBQztBQUMvQixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDbEQsT0FBTyxFQUFFLHFCQUFxQixFQUF5QixNQUFNLDBCQUEwQixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWlGeEY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7OztJQXNDUyx1QkFBUTs7OztJQUFmLFVBQWdCLEtBQStCO1FBQzdDLEVBQUUsQ0FBQyxDQUFDLEtBQUssS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztTQUFFO1FBQzFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDZCxL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Ozs7Ozs7Ozs7Ozs7Ozs7OztBQS92QkQsMEJBK3ZCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFic3RyYWN0Q29udHJvbCwgVmFsaWRhdGlvbkVycm9ycywgVmFsaWRhdG9yRm4gfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBmb3JrSm9pbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG5cbmltcG9ydCB7XG4gIF9leGVjdXRlVmFsaWRhdG9ycywgX2V4ZWN1dGVBc3luY1ZhbGlkYXRvcnMsIF9tZXJnZU9iamVjdHMsIF9tZXJnZUVycm9ycyxcbiAgaXNFbXB0eSwgaXNEZWZpbmVkLCBoYXNWYWx1ZSwgaXNTdHJpbmcsIGlzTnVtYmVyLCBpc0Jvb2xlYW4sIGlzQXJyYXksXG4gIGdldFR5cGUsIGlzVHlwZSwgdG9KYXZhU2NyaXB0VHlwZSwgdG9PYnNlcnZhYmxlLCB4b3IsIFNjaGVtYVByaW1pdGl2ZVR5cGUsXG4gIFBsYWluT2JqZWN0LCBJVmFsaWRhdG9yRm4sIEFzeW5jSVZhbGlkYXRvckZuXG59IGZyb20gJy4vdmFsaWRhdG9yLmZ1bmN0aW9ucyc7XG5pbXBvcnQgeyBmb3JFYWNoQ29weSB9IGZyb20gJy4vdXRpbGl0eS5mdW5jdGlvbnMnO1xuaW1wb3J0IHsganNvblNjaGVtYUZvcm1hdFRlc3RzLCBKc29uU2NoZW1hRm9ybWF0TmFtZXMgfSBmcm9tICcuL2Zvcm1hdC1yZWdleC5jb25zdGFudHMnO1xuXG4vKipcbiAqICdKc29uVmFsaWRhdG9ycycgY2xhc3NcbiAqXG4gKiBQcm92aWRlcyBhbiBleHRlbmRlZCBzZXQgb2YgdmFsaWRhdG9ycyB0byBiZSB1c2VkIGJ5IGZvcm0gY29udHJvbHMsXG4gKiBjb21wYXRpYmxlIHdpdGggc3RhbmRhcmQgSlNPTiBTY2hlbWEgdmFsaWRhdGlvbiBvcHRpb25zLlxuICogaHR0cDovL2pzb24tc2NoZW1hLm9yZy9sYXRlc3QvanNvbi1zY2hlbWEtdmFsaWRhdGlvbi5odG1sXG4gKlxuICogTm90ZTogVGhpcyBsaWJyYXJ5IGlzIGRlc2lnbmVkIGFzIGEgZHJvcC1pbiByZXBsYWNlbWVudCBmb3IgdGhlIEFuZ3VsYXJcbiAqIFZhbGlkYXRvcnMgbGlicmFyeSwgYW5kIGV4Y2VwdCBmb3Igb25lIHNtYWxsIGJyZWFraW5nIGNoYW5nZSB0byB0aGUgJ3BhdHRlcm4nXG4gKiB2YWxpZGF0b3IgKGRlc2NyaWJlZCBiZWxvdykgaXQgY2FuIGV2ZW4gYmUgaW1wb3J0ZWQgYXMgYSBzdWJzdGl0dXRlLCBsaWtlIHNvOlxuICpcbiAqICAgaW1wb3J0IHsgSnNvblZhbGlkYXRvcnMgYXMgVmFsaWRhdG9ycyB9IGZyb20gJ2pzb24tdmFsaWRhdG9ycyc7XG4gKlxuICogYW5kIGl0IHNob3VsZCB3b3JrIHdpdGggZXhpc3RpbmcgY29kZSBhcyBhIGNvbXBsZXRlIHJlcGxhY2VtZW50LlxuICpcbiAqIFRoZSBvbmUgZXhjZXB0aW9uIGlzIHRoZSAncGF0dGVybicgdmFsaWRhdG9yLCB3aGljaCBoYXMgYmVlbiBjaGFuZ2VkIHRvXG4gKiBtYXRjaGUgcGFydGlhbCB2YWx1ZXMgYnkgZGVmYXVsdCAodGhlIHN0YW5kYXJkICdwYXR0ZXJuJyB2YWxpZGF0b3Igd3JhcHBlZFxuICogYWxsIHBhdHRlcm5zIGluICdeJyBhbmQgJyQnLCBmb3JjaW5nIHRoZW0gdG8gYWx3YXlzIG1hdGNoIGFuIGVudGlyZSB2YWx1ZSkuXG4gKiBIb3dldmVyLCB0aGUgb2xkIGJlaGF2aW9yIGNhbiBiZSByZXN0b3JlZCBieSBzaW1wbHkgYWRkaW5nICdeJyBhbmQgJyQnXG4gKiBhcm91bmQgeW91ciBwYXR0ZXJucywgb3IgYnkgcGFzc2luZyBhbiBvcHRpb25hbCBzZWNvbmQgcGFyYW1ldGVyIG9mIFRSVUUuXG4gKiBUaGlzIGNoYW5nZSBpcyB0byBtYWtlIHRoZSAncGF0dGVybicgdmFsaWRhdG9yIG1hdGNoIHRoZSBiZWhhdmlvciBvZiBhXG4gKiBKU09OIFNjaGVtYSBwYXR0ZXJuLCB3aGljaCBhbGxvd3MgcGFydGlhbCBtYXRjaGVzLCByYXRoZXIgdGhhbiB0aGUgYmVoYXZpb3JcbiAqIG9mIGFuIEhUTUwgaW5wdXQgY29udHJvbCBwYXR0ZXJuLCB3aGljaCBkb2VzIG5vdC5cbiAqXG4gKiBUaGlzIGxpYnJhcnkgcmVwbGFjZXMgQW5ndWxhcidzIHZhbGlkYXRvcnMgYW5kIGNvbWJpbmF0aW9uIGZ1bmN0aW9uc1xuICogd2l0aCB0aGUgZm9sbG93aW5nIHZhbGlkYXRvcnMgYW5kIHRyYW5zZm9ybWF0aW9uIGZ1bmN0aW9uczpcbiAqXG4gKiBWYWxpZGF0b3JzOlxuICogICBGb3IgYWxsIGZvcm1Db250cm9sczogICAgIHJlcXVpcmVkICgqKSwgdHlwZSwgZW51bSwgY29uc3RcbiAqICAgRm9yIHRleHQgZm9ybUNvbnRyb2xzOiAgICBtaW5MZW5ndGggKCopLCBtYXhMZW5ndGggKCopLCBwYXR0ZXJuICgqKSwgZm9ybWF0XG4gKiAgIEZvciBudW1lcmljIGZvcm1Db250cm9sczogbWF4aW11bSwgZXhjbHVzaXZlTWF4aW11bSxcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtaW5pbXVtLCBleGNsdXNpdmVNaW5pbXVtLCBtdWx0aXBsZU9mXG4gKiAgIEZvciBmb3JtR3JvdXAgb2JqZWN0czogICAgbWluUHJvcGVydGllcywgbWF4UHJvcGVydGllcywgZGVwZW5kZW5jaWVzXG4gKiAgIEZvciBmb3JtQXJyYXkgYXJyYXlzOiAgICAgbWluSXRlbXMsIG1heEl0ZW1zLCB1bmlxdWVJdGVtcywgY29udGFpbnNcbiAqICAgTm90IHVzZWQgYnkgSlNPTiBTY2hlbWE6ICBtaW4gKCopLCBtYXggKCopLCByZXF1aXJlZFRydWUgKCopLCBlbWFpbCAoKilcbiAqIChWYWxpZGF0b3JzIG9yaWdpbmFsbHkgaW5jbHVkZWQgd2l0aCBBbmd1bGFyIGFyZSBtYWtlZCB3aXRoICgqKS4pXG4gKlxuICogTk9URSAvIFRPRE86IFRoZSBkZXBlbmRlbmNpZXMgdmFsaWRhdG9yIGlzIG5vdCBjb21wbGV0ZS5cbiAqIE5PVEUgLyBUT0RPOiBUaGUgY29udGFpbnMgdmFsaWRhdG9yIGlzIG5vdCBjb21wbGV0ZS5cbiAqXG4gKiBWYWxpZGF0b3JzIG5vdCB1c2VkIGJ5IEpTT04gU2NoZW1hIChidXQgaW5jbHVkZWQgZm9yIGNvbXBhdGliaWxpdHkpXG4gKiBhbmQgdGhlaXIgSlNPTiBTY2hlbWEgZXF1aXZhbGVudHM6XG4gKlxuICogICBBbmd1bGFyIHZhbGlkYXRvciB8IEpTT04gU2NoZW1hIGVxdWl2YWxlbnRcbiAqICAgLS0tLS0tLS0tLS0tLS0tLS0tfC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgICAgbWluKG51bWJlcikgICAgIHwgICBtaW5pbXVtKG51bWJlcilcbiAqICAgICBtYXgobnVtYmVyKSAgICAgfCAgIG1heGltdW0obnVtYmVyKVxuICogICAgIHJlcXVpcmVkVHJ1ZSgpICB8ICAgY29uc3QodHJ1ZSlcbiAqICAgICBlbWFpbCgpICAgICAgICAgfCAgIGZvcm1hdCgnZW1haWwnKVxuICpcbiAqIFZhbGlkYXRvciB0cmFuc2Zvcm1hdGlvbiBmdW5jdGlvbnM6XG4gKiAgIGNvbXBvc2VBbnlPZiwgY29tcG9zZU9uZU9mLCBjb21wb3NlQWxsT2YsIGNvbXBvc2VOb3RcbiAqIChBbmd1bGFyJ3Mgb3JpZ2luYWwgY29tYmluYXRpb24gZnVuY2l0b24sICdjb21wb3NlJywgaXMgYWxzbyBpbmNsdWRlZCBmb3JcbiAqIGJhY2t3YXJkIGNvbXBhdGliaWxpdHksIHRob3VnaCBpdCBpcyBmdW5jdGlvbmFsbHkgZXF1aXZhbGVudCB0byBjb21wb3NlQWxsT2YsXG4gKiBhc3NpZGUgZnJvbSBpdHMgbW9yZSBnZW5lcmljIGVycm9yIG1lc3NhZ2UuKVxuICpcbiAqIEFsbCB2YWxpZGF0b3JzIGhhdmUgYWxzbyBiZWVuIGV4dGVuZGVkIHRvIGFjY2VwdCBhbiBvcHRpb25hbCBzZWNvbmQgYXJndW1lbnRcbiAqIHdoaWNoLCBpZiBwYXNzZWQgYSBUUlVFIHZhbHVlLCBjYXVzZXMgdGhlIHZhbGlkYXRvciB0byBwZXJmb3JtIHRoZSBvcHBvc2l0ZVxuICogb2YgaXRzIG9yaWdpbmFsIGZpbmN0aW9uLiAoVGhpcyBpcyB1c2VkIGludGVybmFsbHkgdG8gZW5hYmxlICdub3QnIGFuZFxuICogJ2NvbXBvc2VPbmVPZicgdG8gZnVuY3Rpb24gYW5kIHJldHVybiB1c2VmdWwgZXJyb3IgbWVzc2FnZXMuKVxuICpcbiAqIFRoZSAncmVxdWlyZWQnIHZhbGlkYXRvciBoYXMgYWxzbyBiZWVuIG92ZXJsb2FkZWQgc28gdGhhdCBpZiBjYWxsZWQgd2l0aFxuICogYSBib29sZWFuIHBhcmFtZXRlciAob3Igbm8gcGFyYW1ldGVycykgaXQgcmV0dXJucyB0aGUgb3JpZ2luYWwgdmFsaWRhdG9yXG4gKiBmdW5jdGlvbiAocmF0aGVyIHRoYW4gZXhlY3V0aW5nIGl0KS4gSG93ZXZlciwgaWYgaXQgaXMgY2FsbGVkIHdpdGggYW5cbiAqIEFic3RyYWN0Q29udHJvbCBwYXJhbWV0ZXIgKGFzIHdhcyBwcmV2aW91c2x5IHJlcXVpcmVkKSwgaXQgYmVoYXZlc1xuICogZXhhY3RseSBhcyBiZWZvcmUuXG4gKlxuICogVGhpcyBlbmFibGVzIGFsbCB2YWxpZGF0b3JzIChpbmNsdWRpbmcgJ3JlcXVpcmVkJykgdG8gYmUgY29uc3RydWN0ZWQgaW5cbiAqIGV4YWN0bHkgdGhlIHNhbWUgd2F5LCBzbyB0aGV5IGNhbiBiZSBhdXRvbWF0aWNhbGx5IGFwcGxpZWQgdXNpbmcgdGhlXG4gKiBlcXVpdmFsZW50IGtleSBuYW1lcyBhbmQgdmFsdWVzIHRha2VuIGRpcmVjdGx5IGZyb20gYSBKU09OIFNjaGVtYS5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIHBhcnRpYWxseSBkZXJpdmVkIGZyb20gQW5ndWxhcixcbiAqIHdoaWNoIGlzIENvcHlyaWdodCAoYykgMjAxNC0yMDE3IEdvb2dsZSwgSW5jLlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgdGhlcmVmb3JlIGdvdmVybmVkIGJ5IHRoZSBzYW1lIE1JVC1zdHlsZSBsaWNlbnNlXG4gKiB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKlxuICogT3JpZ2luYWwgQW5ndWxhciBWYWxpZGF0b3JzOlxuICogaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci9ibG9iL21hc3Rlci9wYWNrYWdlcy9mb3Jtcy9zcmMvdmFsaWRhdG9ycy50c1xuICovXG5leHBvcnQgY2xhc3MgSnNvblZhbGlkYXRvcnMge1xuXG4gIC8qKlxuICAgKiBWYWxpZGF0b3IgZnVuY3Rpb25zOlxuICAgKlxuICAgKiBGb3IgYWxsIGZvcm1Db250cm9sczogICAgIHJlcXVpcmVkLCB0eXBlLCBlbnVtLCBjb25zdFxuICAgKiBGb3IgdGV4dCBmb3JtQ29udHJvbHM6ICAgIG1pbkxlbmd0aCwgbWF4TGVuZ3RoLCBwYXR0ZXJuLCBmb3JtYXRcbiAgICogRm9yIG51bWVyaWMgZm9ybUNvbnRyb2xzOiBtYXhpbXVtLCBleGNsdXNpdmVNYXhpbXVtLFxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgIG1pbmltdW0sIGV4Y2x1c2l2ZU1pbmltdW0sIG11bHRpcGxlT2ZcbiAgICogRm9yIGZvcm1Hcm91cCBvYmplY3RzOiAgICBtaW5Qcm9wZXJ0aWVzLCBtYXhQcm9wZXJ0aWVzLCBkZXBlbmRlbmNpZXNcbiAgICogRm9yIGZvcm1BcnJheSBhcnJheXM6ICAgICBtaW5JdGVtcywgbWF4SXRlbXMsIHVuaXF1ZUl0ZW1zLCBjb250YWluc1xuICAgKlxuICAgKiBUT0RPOiBmaW5pc2ggZGVwZW5kZW5jaWVzIHZhbGlkYXRvclxuICAgKi9cblxuICAvKipcbiAgICogJ3JlcXVpcmVkJyB2YWxpZGF0b3JcbiAgICpcbiAgICogVGhpcyB2YWxpZGF0b3IgaXMgb3ZlcmxvYWRlZCwgY29tcGFyZWQgdG8gdGhlIGRlZmF1bHQgcmVxdWlyZWQgdmFsaWRhdG9yLlxuICAgKiBJZiBjYWxsZWQgd2l0aCBubyBwYXJhbWV0ZXJzLCBvciBUUlVFLCB0aGlzIHZhbGlkYXRvciByZXR1cm5zIHRoZVxuICAgKiAncmVxdWlyZWQnIHZhbGlkYXRvciBmdW5jdGlvbiAocmF0aGVyIHRoYW4gZXhlY3V0aW5nIGl0KS4gVGhpcyBtYXRjaGVzXG4gICAqIHRoZSBiZWhhdmlvciBvZiBhbGwgb3RoZXIgdmFsaWRhdG9ycyBpbiB0aGlzIGxpYnJhcnkuXG4gICAqXG4gICAqIElmIHRoaXMgdmFsaWRhdG9yIGlzIGNhbGxlZCB3aXRoIGFuIEFic3RyYWN0Q29udHJvbCBwYXJhbWV0ZXJcbiAgICogKGFzIHdhcyBwcmV2aW91c2x5IHJlcXVpcmVkKSBpdCBiZWhhdmVzIHRoZSBzYW1lIGFzIEFuZ3VsYXIncyBkZWZhdWx0XG4gICAqIHJlcXVpcmVkIHZhbGlkYXRvciwgYW5kIHJldHVybnMgYW4gZXJyb3IgaWYgdGhlIGNvbnRyb2wgaXMgZW1wdHkuXG4gICAqXG4gICAqIE9sZCBiZWhhdmlvcjogKGlmIGlucHV0IHR5cGUgPSBBYnN0cmFjdENvbnRyb2wpXG4gICAqIC8vIHtBYnN0cmFjdENvbnRyb2x9IGNvbnRyb2wgLSByZXF1aXJlZCBjb250cm9sXG4gICAqIC8vIHt7W2tleTogc3RyaW5nXTogYm9vbGVhbn19IC0gcmV0dXJucyBlcnJvciBtZXNzYWdlIGlmIG5vIGlucHV0XG4gICAqXG4gICAqIE5ldyBiZWhhdmlvcjogKGlmIG5vIGlucHV0LCBvciBpbnB1dCB0eXBlID0gYm9vbGVhbilcbiAgICogLy8ge2Jvb2xlYW4gPSB0cnVlfSByZXF1aXJlZD8gLSB0cnVlIHRvIHZhbGlkYXRlLCBmYWxzZSB0byBkaXNhYmxlXG4gICAqIC8vIHtJVmFsaWRhdG9yRm59IC0gcmV0dXJucyB0aGUgJ3JlcXVpcmVkJyB2YWxpZGF0b3IgZnVuY3Rpb24gaXRzZWxmXG4gICAqL1xuICBzdGF0aWMgcmVxdWlyZWQoaW5wdXQ6IEFic3RyYWN0Q29udHJvbCk6IFZhbGlkYXRpb25FcnJvcnN8bnVsbDtcbiAgc3RhdGljIHJlcXVpcmVkKGlucHV0PzogYm9vbGVhbik6IElWYWxpZGF0b3JGbjtcblxuICBzdGF0aWMgcmVxdWlyZWQoaW5wdXQ/OiBBYnN0cmFjdENvbnRyb2x8Ym9vbGVhbik6IFZhbGlkYXRpb25FcnJvcnN8bnVsbHxJVmFsaWRhdG9yRm4ge1xuICAgIGlmIChpbnB1dCA9PT0gdW5kZWZpbmVkKSB7IGlucHV0ID0gdHJ1ZTsgfVxuICAgIHN3aXRjaCAoaW5wdXQpIHtcbiAgICAgIGNhc2UgdHJ1ZTogLy8gUmV0dXJuIHJlcXVpcmVkIGZ1bmN0aW9uIChkbyBub3QgZXhlY3V0ZSBpdCB5ZXQpXG4gICAgICAgIHJldHVybiAoY29udHJvbDogQWJzdHJhY3RDb250cm9sLCBpbnZlcnQgPSBmYWxzZSk6IFZhbGlkYXRpb25FcnJvcnN8bnVsbCA9PiB7XG4gICAgICAgICAgaWYgKGludmVydCkgeyByZXR1cm4gbnVsbDsgfSAvLyBpZiBub3QgcmVxdWlyZWQsIGFsd2F5cyByZXR1cm4gdmFsaWRcbiAgICAgICAgICByZXR1cm4gaGFzVmFsdWUoY29udHJvbC52YWx1ZSkgPyBudWxsIDogeyAncmVxdWlyZWQnOiB0cnVlIH07XG4gICAgICAgIH07XG4gICAgICBjYXNlIGZhbHNlOiAvLyBEbyBub3RoaW5nIChpZiBmaWVsZCBpcyBub3QgcmVxdWlyZWQsIGl0IGlzIGFsd2F5cyB2YWxpZClcbiAgICAgICAgcmV0dXJuIEpzb25WYWxpZGF0b3JzLm51bGxWYWxpZGF0b3I7XG4gICAgICBkZWZhdWx0OiAvLyBFeGVjdXRlIHJlcXVpcmVkIGZ1bmN0aW9uXG4gICAgICAgIHJldHVybiBoYXNWYWx1ZSgoPEFic3RyYWN0Q29udHJvbD5pbnB1dCkudmFsdWUpID8gbnVsbCA6IHsgJ3JlcXVpcmVkJzogdHJ1ZSB9O1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogJ3R5cGUnIHZhbGlkYXRvclxuICAgKlxuICAgKiBSZXF1aXJlcyBhIGNvbnRyb2wgdG8gb25seSBhY2NlcHQgdmFsdWVzIG9mIGEgc3BlY2lmaWVkIHR5cGUsXG4gICAqIG9yIG9uZSBvZiBhbiBhcnJheSBvZiB0eXBlcy5cbiAgICpcbiAgICogTm90ZTogU2NoZW1hUHJpbWl0aXZlVHlwZSA9ICdzdHJpbmcnfCdudW1iZXInfCdpbnRlZ2VyJ3wnYm9vbGVhbid8J251bGwnXG4gICAqXG4gICAqIC8vIHtTY2hlbWFQcmltaXRpdmVUeXBlfFNjaGVtYVByaW1pdGl2ZVR5cGVbXX0gdHlwZSAtIHR5cGUocykgdG8gYWNjZXB0XG4gICAqIC8vIHtJVmFsaWRhdG9yRm59XG4gICAqL1xuICBzdGF0aWMgdHlwZShyZXF1aXJlZFR5cGU6IFNjaGVtYVByaW1pdGl2ZVR5cGV8U2NoZW1hUHJpbWl0aXZlVHlwZVtdKTogSVZhbGlkYXRvckZuIHtcbiAgICBpZiAoIWhhc1ZhbHVlKHJlcXVpcmVkVHlwZSkpIHsgcmV0dXJuIEpzb25WYWxpZGF0b3JzLm51bGxWYWxpZGF0b3I7IH1cbiAgICByZXR1cm4gKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCwgaW52ZXJ0ID0gZmFsc2UpOiBWYWxpZGF0aW9uRXJyb3JzfG51bGwgPT4ge1xuICAgICAgaWYgKGlzRW1wdHkoY29udHJvbC52YWx1ZSkpIHsgcmV0dXJuIG51bGw7IH1cbiAgICAgIGNvbnN0IGN1cnJlbnRWYWx1ZTogYW55ID0gY29udHJvbC52YWx1ZTtcbiAgICAgIGNvbnN0IGlzVmFsaWQgPSBpc0FycmF5KHJlcXVpcmVkVHlwZSkgP1xuICAgICAgICAoPFNjaGVtYVByaW1pdGl2ZVR5cGVbXT5yZXF1aXJlZFR5cGUpLnNvbWUodHlwZSA9PiBpc1R5cGUoY3VycmVudFZhbHVlLCB0eXBlKSkgOlxuICAgICAgICBpc1R5cGUoY3VycmVudFZhbHVlLCA8U2NoZW1hUHJpbWl0aXZlVHlwZT5yZXF1aXJlZFR5cGUpO1xuICAgICAgcmV0dXJuIHhvcihpc1ZhbGlkLCBpbnZlcnQpID9cbiAgICAgICAgbnVsbCA6IHsgJ3R5cGUnOiB7IHJlcXVpcmVkVHlwZSwgY3VycmVudFZhbHVlIH0gfTtcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqICdlbnVtJyB2YWxpZGF0b3JcbiAgICpcbiAgICogUmVxdWlyZXMgYSBjb250cm9sIHRvIGhhdmUgYSB2YWx1ZSBmcm9tIGFuIGVudW1lcmF0ZWQgbGlzdCBvZiB2YWx1ZXMuXG4gICAqXG4gICAqIENvbnZlcnRzIHR5cGVzIGFzIG5lZWRlZCB0byBhbGxvdyBzdHJpbmcgaW5wdXRzIHRvIHN0aWxsIGNvcnJlY3RseVxuICAgKiBtYXRjaCBudW1iZXIsIGJvb2xlYW4sIGFuZCBudWxsIGVudW0gdmFsdWVzLlxuICAgKlxuICAgKiAvLyB7YW55W119IGFsbG93ZWRWYWx1ZXMgLSBhcnJheSBvZiBhY2NlcHRhYmxlIHZhbHVlc1xuICAgKiAvLyB7SVZhbGlkYXRvckZufVxuICAgKi9cbiAgc3RhdGljIGVudW0oYWxsb3dlZFZhbHVlczogYW55W10pOiBJVmFsaWRhdG9yRm4ge1xuICAgIGlmICghaXNBcnJheShhbGxvd2VkVmFsdWVzKSkgeyByZXR1cm4gSnNvblZhbGlkYXRvcnMubnVsbFZhbGlkYXRvcjsgfVxuICAgIHJldHVybiAoY29udHJvbDogQWJzdHJhY3RDb250cm9sLCBpbnZlcnQgPSBmYWxzZSk6IFZhbGlkYXRpb25FcnJvcnN8bnVsbCA9PiB7XG4gICAgICBpZiAoaXNFbXB0eShjb250cm9sLnZhbHVlKSkgeyByZXR1cm4gbnVsbDsgfVxuICAgICAgY29uc3QgY3VycmVudFZhbHVlOiBhbnkgPSBjb250cm9sLnZhbHVlO1xuICAgICAgY29uc3QgaXNFcXVhbCA9IChlbnVtVmFsdWUsIGlucHV0VmFsdWUpID0+XG4gICAgICAgIGVudW1WYWx1ZSA9PT0gaW5wdXRWYWx1ZSB8fFxuICAgICAgICAoaXNOdW1iZXIoZW51bVZhbHVlKSAmJiAraW5wdXRWYWx1ZSA9PT0gK2VudW1WYWx1ZSkgfHxcbiAgICAgICAgKGlzQm9vbGVhbihlbnVtVmFsdWUsICdzdHJpY3QnKSAmJlxuICAgICAgICAgIHRvSmF2YVNjcmlwdFR5cGUoaW5wdXRWYWx1ZSwgJ2Jvb2xlYW4nKSA9PT0gZW51bVZhbHVlKSB8fFxuICAgICAgICAoZW51bVZhbHVlID09PSBudWxsICYmICFoYXNWYWx1ZShpbnB1dFZhbHVlKSkgfHxcbiAgICAgICAgXy5pc0VxdWFsKGVudW1WYWx1ZSwgaW5wdXRWYWx1ZSk7XG4gICAgICBjb25zdCBpc1ZhbGlkID0gaXNBcnJheShjdXJyZW50VmFsdWUpID9cbiAgICAgICAgY3VycmVudFZhbHVlLmV2ZXJ5KGlucHV0VmFsdWUgPT4gYWxsb3dlZFZhbHVlcy5zb21lKGVudW1WYWx1ZSA9PlxuICAgICAgICAgIGlzRXF1YWwoZW51bVZhbHVlLCBpbnB1dFZhbHVlKVxuICAgICAgICApKSA6XG4gICAgICAgIGFsbG93ZWRWYWx1ZXMuc29tZShlbnVtVmFsdWUgPT4gaXNFcXVhbChlbnVtVmFsdWUsIGN1cnJlbnRWYWx1ZSkpO1xuICAgICAgcmV0dXJuIHhvcihpc1ZhbGlkLCBpbnZlcnQpID9cbiAgICAgICAgbnVsbCA6IHsgJ2VudW0nOiB7IGFsbG93ZWRWYWx1ZXMsIGN1cnJlbnRWYWx1ZSB9IH07XG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiAnY29uc3QnIHZhbGlkYXRvclxuICAgKlxuICAgKiBSZXF1aXJlcyBhIGNvbnRyb2wgdG8gaGF2ZSBhIHNwZWNpZmljIHZhbHVlLlxuICAgKlxuICAgKiBDb252ZXJ0cyB0eXBlcyBhcyBuZWVkZWQgdG8gYWxsb3cgc3RyaW5nIGlucHV0cyB0byBzdGlsbCBjb3JyZWN0bHlcbiAgICogbWF0Y2ggbnVtYmVyLCBib29sZWFuLCBhbmQgbnVsbCB2YWx1ZXMuXG4gICAqXG4gICAqIFRPRE86IG1vZGlmeSB0byB3b3JrIHdpdGggb2JqZWN0c1xuICAgKlxuICAgKiAvLyB7YW55W119IHJlcXVpcmVkVmFsdWUgLSByZXF1aXJlZCB2YWx1ZVxuICAgKiAvLyB7SVZhbGlkYXRvckZufVxuICAgKi9cbiAgc3RhdGljIGNvbnN0KHJlcXVpcmVkVmFsdWU6IGFueSk6IElWYWxpZGF0b3JGbiB7XG4gICAgaWYgKCFoYXNWYWx1ZShyZXF1aXJlZFZhbHVlKSkgeyByZXR1cm4gSnNvblZhbGlkYXRvcnMubnVsbFZhbGlkYXRvcjsgfVxuICAgIHJldHVybiAoY29udHJvbDogQWJzdHJhY3RDb250cm9sLCBpbnZlcnQgPSBmYWxzZSk6IFZhbGlkYXRpb25FcnJvcnN8bnVsbCA9PiB7XG4gICAgICBpZiAoaXNFbXB0eShjb250cm9sLnZhbHVlKSkgeyByZXR1cm4gbnVsbDsgfVxuICAgICAgY29uc3QgY3VycmVudFZhbHVlOiBhbnkgPSBjb250cm9sLnZhbHVlO1xuICAgICAgY29uc3QgaXNFcXVhbCA9IChjb25zdFZhbHVlLCBpbnB1dFZhbHVlKSA9PlxuICAgICAgICBjb25zdFZhbHVlID09PSBpbnB1dFZhbHVlIHx8XG4gICAgICAgIGlzTnVtYmVyKGNvbnN0VmFsdWUpICYmICtpbnB1dFZhbHVlID09PSArY29uc3RWYWx1ZSB8fFxuICAgICAgICBpc0Jvb2xlYW4oY29uc3RWYWx1ZSwgJ3N0cmljdCcpICYmXG4gICAgICAgICAgdG9KYXZhU2NyaXB0VHlwZShpbnB1dFZhbHVlLCAnYm9vbGVhbicpID09PSBjb25zdFZhbHVlIHx8XG4gICAgICAgIGNvbnN0VmFsdWUgPT09IG51bGwgJiYgIWhhc1ZhbHVlKGlucHV0VmFsdWUpO1xuICAgICAgY29uc3QgaXNWYWxpZCA9IGlzRXF1YWwocmVxdWlyZWRWYWx1ZSwgY3VycmVudFZhbHVlKTtcbiAgICAgIHJldHVybiB4b3IoaXNWYWxpZCwgaW52ZXJ0KSA/XG4gICAgICAgIG51bGwgOiB7ICdjb25zdCc6IHsgcmVxdWlyZWRWYWx1ZSwgY3VycmVudFZhbHVlIH0gfTtcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqICdtaW5MZW5ndGgnIHZhbGlkYXRvclxuICAgKlxuICAgKiBSZXF1aXJlcyBhIGNvbnRyb2wncyB0ZXh0IHZhbHVlIHRvIGJlIGdyZWF0ZXIgdGhhbiBhIHNwZWNpZmllZCBsZW5ndGguXG4gICAqXG4gICAqIC8vIHtudW1iZXJ9IG1pbmltdW1MZW5ndGggLSBtaW5pbXVtIGFsbG93ZWQgc3RyaW5nIGxlbmd0aFxuICAgKiAvLyB7Ym9vbGVhbiA9IGZhbHNlfSBpbnZlcnQgLSBpbnN0ZWFkIHJldHVybiBlcnJvciBvYmplY3Qgb25seSBpZiB2YWxpZFxuICAgKiAvLyB7SVZhbGlkYXRvckZufVxuICAgKi9cbiAgc3RhdGljIG1pbkxlbmd0aChtaW5pbXVtTGVuZ3RoOiBudW1iZXIpOiBJVmFsaWRhdG9yRm4ge1xuICAgIGlmICghaGFzVmFsdWUobWluaW11bUxlbmd0aCkpIHsgcmV0dXJuIEpzb25WYWxpZGF0b3JzLm51bGxWYWxpZGF0b3I7IH1cbiAgICByZXR1cm4gKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCwgaW52ZXJ0ID0gZmFsc2UpOiBWYWxpZGF0aW9uRXJyb3JzfG51bGwgPT4ge1xuICAgICAgaWYgKGlzRW1wdHkoY29udHJvbC52YWx1ZSkpIHsgcmV0dXJuIG51bGw7IH1cbiAgICAgIGxldCBjdXJyZW50TGVuZ3RoID0gaXNTdHJpbmcoY29udHJvbC52YWx1ZSkgPyBjb250cm9sLnZhbHVlLmxlbmd0aCA6IDA7XG4gICAgICBsZXQgaXNWYWxpZCA9IGN1cnJlbnRMZW5ndGggPj0gbWluaW11bUxlbmd0aDtcbiAgICAgIHJldHVybiB4b3IoaXNWYWxpZCwgaW52ZXJ0KSA/XG4gICAgICAgIG51bGwgOiB7ICdtaW5MZW5ndGgnOiB7IG1pbmltdW1MZW5ndGgsIGN1cnJlbnRMZW5ndGggfSB9O1xuICAgIH07XG4gIH07XG5cbiAgLyoqXG4gICAqICdtYXhMZW5ndGgnIHZhbGlkYXRvclxuICAgKlxuICAgKiBSZXF1aXJlcyBhIGNvbnRyb2wncyB0ZXh0IHZhbHVlIHRvIGJlIGxlc3MgdGhhbiBhIHNwZWNpZmllZCBsZW5ndGguXG4gICAqXG4gICAqIC8vIHtudW1iZXJ9IG1heGltdW1MZW5ndGggLSBtYXhpbXVtIGFsbG93ZWQgc3RyaW5nIGxlbmd0aFxuICAgKiAvLyB7Ym9vbGVhbiA9IGZhbHNlfSBpbnZlcnQgLSBpbnN0ZWFkIHJldHVybiBlcnJvciBvYmplY3Qgb25seSBpZiB2YWxpZFxuICAgKiAvLyB7SVZhbGlkYXRvckZufVxuICAgKi9cbiAgc3RhdGljIG1heExlbmd0aChtYXhpbXVtTGVuZ3RoOiBudW1iZXIpOiBJVmFsaWRhdG9yRm4ge1xuICAgIGlmICghaGFzVmFsdWUobWF4aW11bUxlbmd0aCkpIHsgcmV0dXJuIEpzb25WYWxpZGF0b3JzLm51bGxWYWxpZGF0b3I7IH1cbiAgICByZXR1cm4gKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCwgaW52ZXJ0ID0gZmFsc2UpOiBWYWxpZGF0aW9uRXJyb3JzfG51bGwgPT4ge1xuICAgICAgbGV0IGN1cnJlbnRMZW5ndGggPSBpc1N0cmluZyhjb250cm9sLnZhbHVlKSA/IGNvbnRyb2wudmFsdWUubGVuZ3RoIDogMDtcbiAgICAgIGxldCBpc1ZhbGlkID0gY3VycmVudExlbmd0aCA8PSBtYXhpbXVtTGVuZ3RoO1xuICAgICAgcmV0dXJuIHhvcihpc1ZhbGlkLCBpbnZlcnQpID9cbiAgICAgICAgbnVsbCA6IHsgJ21heExlbmd0aCc6IHsgbWF4aW11bUxlbmd0aCwgY3VycmVudExlbmd0aCB9IH07XG4gICAgfTtcbiAgfTtcblxuICAvKipcbiAgICogJ3BhdHRlcm4nIHZhbGlkYXRvclxuICAgKlxuICAgKiBOb3RlOiBOT1QgdGhlIHNhbWUgYXMgQW5ndWxhcidzIGRlZmF1bHQgcGF0dGVybiB2YWxpZGF0b3IuXG4gICAqXG4gICAqIFJlcXVpcmVzIGEgY29udHJvbCdzIHZhbHVlIHRvIG1hdGNoIGEgc3BlY2lmaWVkIHJlZ3VsYXIgZXhwcmVzc2lvbiBwYXR0ZXJuLlxuICAgKlxuICAgKiBUaGlzIHZhbGlkYXRvciBjaGFuZ2VzIHRoZSBiZWhhdmlvciBvZiBkZWZhdWx0IHBhdHRlcm4gdmFsaWRhdG9yXG4gICAqIGJ5IHJlcGxhY2luZyBSZWdFeHAoYF4ke3BhdHRlcm59JGApIHdpdGggUmVnRXhwKGAke3BhdHRlcm59YCksXG4gICAqIHdoaWNoIGFsbG93cyBmb3IgcGFydGlhbCBtYXRjaGVzLlxuICAgKlxuICAgKiBUbyByZXR1cm4gdG8gdGhlIGRlZmF1bHQgZnVuY2l0b25hbGl0eSwgYW5kIG1hdGNoIHRoZSBlbnRpcmUgc3RyaW5nLFxuICAgKiBwYXNzIFRSVUUgYXMgdGhlIG9wdGlvbmFsIHNlY29uZCBwYXJhbWV0ZXIuXG4gICAqXG4gICAqIC8vIHtzdHJpbmd9IHBhdHRlcm4gLSByZWd1bGFyIGV4cHJlc3Npb24gcGF0dGVyblxuICAgKiAvLyB7Ym9vbGVhbiA9IGZhbHNlfSB3aG9sZVN0cmluZyAtIG1hdGNoIHdob2xlIHZhbHVlIHN0cmluZz9cbiAgICogLy8ge0lWYWxpZGF0b3JGbn1cbiAgICovXG4gIHN0YXRpYyBwYXR0ZXJuKHBhdHRlcm46IHN0cmluZ3xSZWdFeHAsIHdob2xlU3RyaW5nID0gZmFsc2UpOiBJVmFsaWRhdG9yRm4ge1xuICAgIGlmICghaGFzVmFsdWUocGF0dGVybikpIHsgcmV0dXJuIEpzb25WYWxpZGF0b3JzLm51bGxWYWxpZGF0b3I7IH1cbiAgICByZXR1cm4gKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCwgaW52ZXJ0ID0gZmFsc2UpOiBWYWxpZGF0aW9uRXJyb3JzfG51bGwgPT4ge1xuICAgICAgaWYgKGlzRW1wdHkoY29udHJvbC52YWx1ZSkpIHsgcmV0dXJuIG51bGw7IH1cbiAgICAgIGxldCByZWdleDogUmVnRXhwO1xuICAgICAgbGV0IHJlcXVpcmVkUGF0dGVybjogc3RyaW5nO1xuICAgICAgaWYgKHR5cGVvZiBwYXR0ZXJuID09PSAnc3RyaW5nJykge1xuICAgICAgICByZXF1aXJlZFBhdHRlcm4gPSAod2hvbGVTdHJpbmcpID8gYF4ke3BhdHRlcm59JGAgOiBwYXR0ZXJuO1xuICAgICAgICByZWdleCA9IG5ldyBSZWdFeHAocmVxdWlyZWRQYXR0ZXJuKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlcXVpcmVkUGF0dGVybiA9IHBhdHRlcm4udG9TdHJpbmcoKTtcbiAgICAgICAgcmVnZXggPSBwYXR0ZXJuO1xuICAgICAgfVxuICAgICAgbGV0IGN1cnJlbnRWYWx1ZTogc3RyaW5nID0gY29udHJvbC52YWx1ZTtcbiAgICAgIGxldCBpc1ZhbGlkID0gaXNTdHJpbmcoY3VycmVudFZhbHVlKSA/IHJlZ2V4LnRlc3QoY3VycmVudFZhbHVlKSA6IGZhbHNlO1xuICAgICAgcmV0dXJuIHhvcihpc1ZhbGlkLCBpbnZlcnQpID9cbiAgICAgICAgbnVsbCA6IHsgJ3BhdHRlcm4nOiB7IHJlcXVpcmVkUGF0dGVybiwgY3VycmVudFZhbHVlIH0gfTtcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqICdmb3JtYXQnIHZhbGlkYXRvclxuICAgKlxuICAgKiBSZXF1aXJlcyBhIGNvbnRyb2wgdG8gaGF2ZSBhIHZhbHVlIG9mIGEgY2VydGFpbiBmb3JtYXQuXG4gICAqXG4gICAqIFRoaXMgdmFsaWRhdG9yIGN1cnJlbnRseSBjaGVja3MgdGhlIGZvbGxvd2luZyBmb3Jtc3RzOlxuICAgKiAgIGRhdGUsIHRpbWUsIGRhdGUtdGltZSwgZW1haWwsIGhvc3RuYW1lLCBpcHY0LCBpcHY2LFxuICAgKiAgIHVyaSwgdXJpLXJlZmVyZW5jZSwgdXJpLXRlbXBsYXRlLCB1cmwsIHV1aWQsIGNvbG9yLFxuICAgKiAgIGpzb24tcG9pbnRlciwgcmVsYXRpdmUtanNvbi1wb2ludGVyLCByZWdleFxuICAgKlxuICAgKiBGYXN0IGZvcm1hdCByZWd1bGFyIGV4cHJlc3Npb25zIGNvcGllZCBmcm9tIEFKVjpcbiAgICogaHR0cHM6Ly9naXRodWIuY29tL2Vwb2JlcmV6a2luL2Fqdi9ibG9iL21hc3Rlci9saWIvY29tcGlsZS9mb3JtYXRzLmpzXG4gICAqXG4gICAqIC8vIHtKc29uU2NoZW1hRm9ybWF0TmFtZXN9IHJlcXVpcmVkRm9ybWF0IC0gZm9ybWF0IHRvIGNoZWNrXG4gICAqIC8vIHtJVmFsaWRhdG9yRm59XG4gICAqL1xuICBzdGF0aWMgZm9ybWF0KHJlcXVpcmVkRm9ybWF0OiBKc29uU2NoZW1hRm9ybWF0TmFtZXMpOiBJVmFsaWRhdG9yRm4ge1xuICAgIGlmICghaGFzVmFsdWUocmVxdWlyZWRGb3JtYXQpKSB7IHJldHVybiBKc29uVmFsaWRhdG9ycy5udWxsVmFsaWRhdG9yOyB9XG4gICAgcmV0dXJuIChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wsIGludmVydCA9IGZhbHNlKTogVmFsaWRhdGlvbkVycm9yc3xudWxsID0+IHtcbiAgICAgIGlmIChpc0VtcHR5KGNvbnRyb2wudmFsdWUpKSB7IHJldHVybiBudWxsOyB9XG4gICAgICBsZXQgaXNWYWxpZDogYm9vbGVhbjtcbiAgICAgIGxldCBjdXJyZW50VmFsdWU6IHN0cmluZ3xEYXRlID0gY29udHJvbC52YWx1ZTtcbiAgICAgIGlmIChpc1N0cmluZyhjdXJyZW50VmFsdWUpKSB7XG4gICAgICAgIGNvbnN0IGZvcm1hdFRlc3Q6IEZ1bmN0aW9ufFJlZ0V4cCA9IGpzb25TY2hlbWFGb3JtYXRUZXN0c1tyZXF1aXJlZEZvcm1hdF07XG4gICAgICAgIGlmICh0eXBlb2YgZm9ybWF0VGVzdCA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICBpc1ZhbGlkID0gKDxSZWdFeHA+Zm9ybWF0VGVzdCkudGVzdCg8c3RyaW5nPmN1cnJlbnRWYWx1ZSk7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGZvcm1hdFRlc3QgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICBpc1ZhbGlkID0gKDxGdW5jdGlvbj5mb3JtYXRUZXN0KSg8c3RyaW5nPmN1cnJlbnRWYWx1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihgZm9ybWF0IHZhbGlkYXRvciBlcnJvcjogXCIke3JlcXVpcmVkRm9ybWF0fVwiIGlzIG5vdCBhIHJlY29nbml6ZWQgZm9ybWF0LmApO1xuICAgICAgICAgIGlzVmFsaWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBBbGxvdyBKYXZhU2NyaXB0IERhdGUgb2JqZWN0c1xuICAgICAgICBpc1ZhbGlkID0gWydkYXRlJywgJ3RpbWUnLCAnZGF0ZS10aW1lJ10uaW5jbHVkZXMocmVxdWlyZWRGb3JtYXQpICYmXG4gICAgICAgICAgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGN1cnJlbnRWYWx1ZSkgPT09ICdbb2JqZWN0IERhdGVdJztcbiAgICAgIH1cbiAgICAgIHJldHVybiB4b3IoaXNWYWxpZCwgaW52ZXJ0KSA/XG4gICAgICAgIG51bGwgOiB7ICdmb3JtYXQnOiB7IHJlcXVpcmVkRm9ybWF0LCBjdXJyZW50VmFsdWUgfSB9O1xuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogJ21pbmltdW0nIHZhbGlkYXRvclxuICAgKlxuICAgKiBSZXF1aXJlcyBhIGNvbnRyb2wncyBudW1lcmljIHZhbHVlIHRvIGJlIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0b1xuICAgKiBhIG1pbmltdW0gYW1vdW50LlxuICAgKlxuICAgKiBBbnkgbm9uLW51bWVyaWMgdmFsdWUgaXMgYWxzbyB2YWxpZCAoYWNjb3JkaW5nIHRvIHRoZSBIVE1MIGZvcm1zIHNwZWMsXG4gICAqIGEgbm9uLW51bWVyaWMgdmFsdWUgZG9lc24ndCBoYXZlIGEgbWluaW11bSkuXG4gICAqIGh0dHBzOi8vd3d3LnczLm9yZy9UUi9odG1sNS9mb3Jtcy5odG1sI2F0dHItaW5wdXQtbWF4XG4gICAqXG4gICAqIC8vIHtudW1iZXJ9IG1pbmltdW0gLSBtaW5pbXVtIGFsbG93ZWQgdmFsdWVcbiAgICogLy8ge0lWYWxpZGF0b3JGbn1cbiAgICovXG4gIHN0YXRpYyBtaW5pbXVtKG1pbmltdW1WYWx1ZTogbnVtYmVyKTogSVZhbGlkYXRvckZuIHtcbiAgICBpZiAoIWhhc1ZhbHVlKG1pbmltdW1WYWx1ZSkpIHsgcmV0dXJuIEpzb25WYWxpZGF0b3JzLm51bGxWYWxpZGF0b3I7IH1cbiAgICByZXR1cm4gKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCwgaW52ZXJ0ID0gZmFsc2UpOiBWYWxpZGF0aW9uRXJyb3JzfG51bGwgPT4ge1xuICAgICAgaWYgKGlzRW1wdHkoY29udHJvbC52YWx1ZSkpIHsgcmV0dXJuIG51bGw7IH1cbiAgICAgIGxldCBjdXJyZW50VmFsdWUgPSBjb250cm9sLnZhbHVlO1xuICAgICAgbGV0IGlzVmFsaWQgPSAhaXNOdW1iZXIoY3VycmVudFZhbHVlKSB8fCBjdXJyZW50VmFsdWUgPj0gbWluaW11bVZhbHVlO1xuICAgICAgcmV0dXJuIHhvcihpc1ZhbGlkLCBpbnZlcnQpID9cbiAgICAgICAgbnVsbCA6IHsgJ21pbmltdW0nOiB7IG1pbmltdW1WYWx1ZSwgY3VycmVudFZhbHVlIH0gfTtcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqICdleGNsdXNpdmVNaW5pbXVtJyB2YWxpZGF0b3JcbiAgICpcbiAgICogUmVxdWlyZXMgYSBjb250cm9sJ3MgbnVtZXJpYyB2YWx1ZSB0byBiZSBsZXNzIHRoYW4gYSBtYXhpbXVtIGFtb3VudC5cbiAgICpcbiAgICogQW55IG5vbi1udW1lcmljIHZhbHVlIGlzIGFsc28gdmFsaWQgKGFjY29yZGluZyB0byB0aGUgSFRNTCBmb3JtcyBzcGVjLFxuICAgKiBhIG5vbi1udW1lcmljIHZhbHVlIGRvZXNuJ3QgaGF2ZSBhIG1heGltdW0pLlxuICAgKiBodHRwczovL3d3dy53My5vcmcvVFIvaHRtbDUvZm9ybXMuaHRtbCNhdHRyLWlucHV0LW1heFxuICAgKlxuICAgKiAvLyB7bnVtYmVyfSBleGNsdXNpdmVNaW5pbXVtVmFsdWUgLSBtYXhpbXVtIGFsbG93ZWQgdmFsdWVcbiAgICogLy8ge0lWYWxpZGF0b3JGbn1cbiAgICovXG4gIHN0YXRpYyBleGNsdXNpdmVNaW5pbXVtKGV4Y2x1c2l2ZU1pbmltdW1WYWx1ZTogbnVtYmVyKTogSVZhbGlkYXRvckZuIHtcbiAgICBpZiAoIWhhc1ZhbHVlKGV4Y2x1c2l2ZU1pbmltdW1WYWx1ZSkpIHsgcmV0dXJuIEpzb25WYWxpZGF0b3JzLm51bGxWYWxpZGF0b3I7IH1cbiAgICByZXR1cm4gKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCwgaW52ZXJ0ID0gZmFsc2UpOiBWYWxpZGF0aW9uRXJyb3JzfG51bGwgPT4ge1xuICAgICAgaWYgKGlzRW1wdHkoY29udHJvbC52YWx1ZSkpIHsgcmV0dXJuIG51bGw7IH1cbiAgICAgIGxldCBjdXJyZW50VmFsdWUgPSBjb250cm9sLnZhbHVlO1xuICAgICAgbGV0IGlzVmFsaWQgPSAhaXNOdW1iZXIoY3VycmVudFZhbHVlKSB8fCArY3VycmVudFZhbHVlIDwgZXhjbHVzaXZlTWluaW11bVZhbHVlO1xuICAgICAgcmV0dXJuIHhvcihpc1ZhbGlkLCBpbnZlcnQpID9cbiAgICAgICAgbnVsbCA6IHsgJ2V4Y2x1c2l2ZU1pbmltdW0nOiB7IGV4Y2x1c2l2ZU1pbmltdW1WYWx1ZSwgY3VycmVudFZhbHVlIH0gfTtcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqICdtYXhpbXVtJyB2YWxpZGF0b3JcbiAgICpcbiAgICogUmVxdWlyZXMgYSBjb250cm9sJ3MgbnVtZXJpYyB2YWx1ZSB0byBiZSBsZXNzIHRoYW4gb3IgZXF1YWwgdG9cbiAgICogYSBtYXhpbXVtIGFtb3VudC5cbiAgICpcbiAgICogQW55IG5vbi1udW1lcmljIHZhbHVlIGlzIGFsc28gdmFsaWQgKGFjY29yZGluZyB0byB0aGUgSFRNTCBmb3JtcyBzcGVjLFxuICAgKiBhIG5vbi1udW1lcmljIHZhbHVlIGRvZXNuJ3QgaGF2ZSBhIG1heGltdW0pLlxuICAgKiBodHRwczovL3d3dy53My5vcmcvVFIvaHRtbDUvZm9ybXMuaHRtbCNhdHRyLWlucHV0LW1heFxuICAgKlxuICAgKiAvLyB7bnVtYmVyfSBtYXhpbXVtVmFsdWUgLSBtYXhpbXVtIGFsbG93ZWQgdmFsdWVcbiAgICogLy8ge0lWYWxpZGF0b3JGbn1cbiAgICovXG4gIHN0YXRpYyBtYXhpbXVtKG1heGltdW1WYWx1ZTogbnVtYmVyKTogSVZhbGlkYXRvckZuIHtcbiAgICBpZiAoIWhhc1ZhbHVlKG1heGltdW1WYWx1ZSkpIHsgcmV0dXJuIEpzb25WYWxpZGF0b3JzLm51bGxWYWxpZGF0b3I7IH1cbiAgICByZXR1cm4gKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCwgaW52ZXJ0ID0gZmFsc2UpOiBWYWxpZGF0aW9uRXJyb3JzfG51bGwgPT4ge1xuICAgICAgaWYgKGlzRW1wdHkoY29udHJvbC52YWx1ZSkpIHsgcmV0dXJuIG51bGw7IH1cbiAgICAgIGxldCBjdXJyZW50VmFsdWUgPSBjb250cm9sLnZhbHVlO1xuICAgICAgbGV0IGlzVmFsaWQgPSAhaXNOdW1iZXIoY3VycmVudFZhbHVlKSB8fCArY3VycmVudFZhbHVlIDw9IG1heGltdW1WYWx1ZTtcbiAgICAgIHJldHVybiB4b3IoaXNWYWxpZCwgaW52ZXJ0KSA/XG4gICAgICAgIG51bGwgOiB7ICdtYXhpbXVtJzogeyBtYXhpbXVtVmFsdWUsIGN1cnJlbnRWYWx1ZSB9IH07XG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiAnZXhjbHVzaXZlTWF4aW11bScgdmFsaWRhdG9yXG4gICAqXG4gICAqIFJlcXVpcmVzIGEgY29udHJvbCdzIG51bWVyaWMgdmFsdWUgdG8gYmUgbGVzcyB0aGFuIGEgbWF4aW11bSBhbW91bnQuXG4gICAqXG4gICAqIEFueSBub24tbnVtZXJpYyB2YWx1ZSBpcyBhbHNvIHZhbGlkIChhY2NvcmRpbmcgdG8gdGhlIEhUTUwgZm9ybXMgc3BlYyxcbiAgICogYSBub24tbnVtZXJpYyB2YWx1ZSBkb2Vzbid0IGhhdmUgYSBtYXhpbXVtKS5cbiAgICogaHR0cHM6Ly93d3cudzMub3JnL1RSL2h0bWw1L2Zvcm1zLmh0bWwjYXR0ci1pbnB1dC1tYXhcbiAgICpcbiAgICogLy8ge251bWJlcn0gZXhjbHVzaXZlTWF4aW11bVZhbHVlIC0gbWF4aW11bSBhbGxvd2VkIHZhbHVlXG4gICAqIC8vIHtJVmFsaWRhdG9yRm59XG4gICAqL1xuICBzdGF0aWMgZXhjbHVzaXZlTWF4aW11bShleGNsdXNpdmVNYXhpbXVtVmFsdWU6IG51bWJlcik6IElWYWxpZGF0b3JGbiB7XG4gICAgaWYgKCFoYXNWYWx1ZShleGNsdXNpdmVNYXhpbXVtVmFsdWUpKSB7IHJldHVybiBKc29uVmFsaWRhdG9ycy5udWxsVmFsaWRhdG9yOyB9XG4gICAgcmV0dXJuIChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wsIGludmVydCA9IGZhbHNlKTogVmFsaWRhdGlvbkVycm9yc3xudWxsID0+IHtcbiAgICAgIGlmIChpc0VtcHR5KGNvbnRyb2wudmFsdWUpKSB7IHJldHVybiBudWxsOyB9XG4gICAgICBsZXQgY3VycmVudFZhbHVlID0gY29udHJvbC52YWx1ZTtcbiAgICAgIGxldCBpc1ZhbGlkID0gIWlzTnVtYmVyKGN1cnJlbnRWYWx1ZSkgfHwgK2N1cnJlbnRWYWx1ZSA8IGV4Y2x1c2l2ZU1heGltdW1WYWx1ZTtcbiAgICAgIHJldHVybiB4b3IoaXNWYWxpZCwgaW52ZXJ0KSA/XG4gICAgICAgIG51bGwgOiB7ICdleGNsdXNpdmVNYXhpbXVtJzogeyBleGNsdXNpdmVNYXhpbXVtVmFsdWUsIGN1cnJlbnRWYWx1ZSB9IH07XG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiAnbXVsdGlwbGVPZicgdmFsaWRhdG9yXG4gICAqXG4gICAqIFJlcXVpcmVzIGEgY29udHJvbCB0byBoYXZlIGEgbnVtZXJpYyB2YWx1ZSB0aGF0IGlzIGEgbXVsdGlwbGVcbiAgICogb2YgYSBzcGVjaWZpZWQgbnVtYmVyLlxuICAgKlxuICAgKiAvLyB7bnVtYmVyfSBtdWx0aXBsZU9mVmFsdWUgLSBudW1iZXIgdmFsdWUgbXVzdCBiZSBhIG11bHRpcGxlIG9mXG4gICAqIC8vIHtJVmFsaWRhdG9yRm59XG4gICAqL1xuICBzdGF0aWMgbXVsdGlwbGVPZihtdWx0aXBsZU9mVmFsdWU6IG51bWJlcik6IElWYWxpZGF0b3JGbiB7XG4gICAgaWYgKCFoYXNWYWx1ZShtdWx0aXBsZU9mVmFsdWUpKSB7IHJldHVybiBKc29uVmFsaWRhdG9ycy5udWxsVmFsaWRhdG9yOyB9XG4gICAgcmV0dXJuIChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wsIGludmVydCA9IGZhbHNlKTogVmFsaWRhdGlvbkVycm9yc3xudWxsID0+IHtcbiAgICAgIGlmIChpc0VtcHR5KGNvbnRyb2wudmFsdWUpKSB7IHJldHVybiBudWxsOyB9XG4gICAgICBsZXQgY3VycmVudFZhbHVlID0gY29udHJvbC52YWx1ZTtcbiAgICAgIGxldCBpc1ZhbGlkID0gaXNOdW1iZXIoY3VycmVudFZhbHVlKSAmJlxuICAgICAgICBjdXJyZW50VmFsdWUgJSBtdWx0aXBsZU9mVmFsdWUgPT09IDA7XG4gICAgICByZXR1cm4geG9yKGlzVmFsaWQsIGludmVydCkgP1xuICAgICAgICBudWxsIDogeyAnbXVsdGlwbGVPZic6IHsgbXVsdGlwbGVPZlZhbHVlLCBjdXJyZW50VmFsdWUgfSB9O1xuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogJ21pblByb3BlcnRpZXMnIHZhbGlkYXRvclxuICAgKlxuICAgKiBSZXF1aXJlcyBhIGZvcm0gZ3JvdXAgdG8gaGF2ZSBhIG1pbmltdW0gbnVtYmVyIG9mIHByb3BlcnRpZXMgKGkuZS4gaGF2ZVxuICAgKiB2YWx1ZXMgZW50ZXJlZCBpbiBhIG1pbmltdW0gbnVtYmVyIG9mIGNvbnRyb2xzIHdpdGhpbiB0aGUgZ3JvdXApLlxuICAgKlxuICAgKiAvLyB7bnVtYmVyfSBtaW5pbXVtUHJvcGVydGllcyAtIG1pbmltdW0gbnVtYmVyIG9mIHByb3BlcnRpZXMgYWxsb3dlZFxuICAgKiAvLyB7SVZhbGlkYXRvckZufVxuICAgKi9cbiAgc3RhdGljIG1pblByb3BlcnRpZXMobWluaW11bVByb3BlcnRpZXM6IG51bWJlcik6IElWYWxpZGF0b3JGbiB7XG4gICAgaWYgKCFoYXNWYWx1ZShtaW5pbXVtUHJvcGVydGllcykpIHsgcmV0dXJuIEpzb25WYWxpZGF0b3JzLm51bGxWYWxpZGF0b3I7IH1cbiAgICByZXR1cm4gKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCwgaW52ZXJ0ID0gZmFsc2UpOiBWYWxpZGF0aW9uRXJyb3JzfG51bGwgPT4ge1xuICAgICAgaWYgKGlzRW1wdHkoY29udHJvbC52YWx1ZSkpIHsgcmV0dXJuIG51bGw7IH1cbiAgICAgIGxldCBjdXJyZW50UHJvcGVydGllcyA9IE9iamVjdC5rZXlzKGNvbnRyb2wudmFsdWUpLmxlbmd0aCB8fCAwO1xuICAgICAgbGV0IGlzVmFsaWQgPSBjdXJyZW50UHJvcGVydGllcyA+PSBtaW5pbXVtUHJvcGVydGllcztcbiAgICAgIHJldHVybiB4b3IoaXNWYWxpZCwgaW52ZXJ0KSA/XG4gICAgICAgIG51bGwgOiB7ICdtaW5Qcm9wZXJ0aWVzJzogeyBtaW5pbXVtUHJvcGVydGllcywgY3VycmVudFByb3BlcnRpZXMgfSB9O1xuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogJ21heFByb3BlcnRpZXMnIHZhbGlkYXRvclxuICAgKlxuICAgKiBSZXF1aXJlcyBhIGZvcm0gZ3JvdXAgdG8gaGF2ZSBhIG1heGltdW0gbnVtYmVyIG9mIHByb3BlcnRpZXMgKGkuZS4gaGF2ZVxuICAgKiB2YWx1ZXMgZW50ZXJlZCBpbiBhIG1heGltdW0gbnVtYmVyIG9mIGNvbnRyb2xzIHdpdGhpbiB0aGUgZ3JvdXApLlxuICAgKlxuICAgKiBOb3RlOiBIYXMgbm8gZWZmZWN0IGlmIHRoZSBmb3JtIGdyb3VwIGRvZXMgbm90IGNvbnRhaW4gbW9yZSB0aGFuIHRoZVxuICAgKiBtYXhpbXVtIG51bWJlciBvZiBjb250cm9scy5cbiAgICpcbiAgICogLy8ge251bWJlcn0gbWF4aW11bVByb3BlcnRpZXMgLSBtYXhpbXVtIG51bWJlciBvZiBwcm9wZXJ0aWVzIGFsbG93ZWRcbiAgICogLy8ge0lWYWxpZGF0b3JGbn1cbiAgICovXG4gIHN0YXRpYyBtYXhQcm9wZXJ0aWVzKG1heGltdW1Qcm9wZXJ0aWVzOiBudW1iZXIpOiBJVmFsaWRhdG9yRm4ge1xuICAgIGlmICghaGFzVmFsdWUobWF4aW11bVByb3BlcnRpZXMpKSB7IHJldHVybiBKc29uVmFsaWRhdG9ycy5udWxsVmFsaWRhdG9yOyB9XG4gICAgcmV0dXJuIChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wsIGludmVydCA9IGZhbHNlKTogVmFsaWRhdGlvbkVycm9yc3xudWxsID0+IHtcbiAgICAgIGxldCBjdXJyZW50UHJvcGVydGllcyA9IE9iamVjdC5rZXlzKGNvbnRyb2wudmFsdWUpLmxlbmd0aCB8fCAwO1xuICAgICAgbGV0IGlzVmFsaWQgPSBjdXJyZW50UHJvcGVydGllcyA8PSBtYXhpbXVtUHJvcGVydGllcztcbiAgICAgIHJldHVybiB4b3IoaXNWYWxpZCwgaW52ZXJ0KSA/XG4gICAgICAgIG51bGwgOiB7ICdtYXhQcm9wZXJ0aWVzJzogeyBtYXhpbXVtUHJvcGVydGllcywgY3VycmVudFByb3BlcnRpZXMgfSB9O1xuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogJ2RlcGVuZGVuY2llcycgdmFsaWRhdG9yXG4gICAqXG4gICAqIFJlcXVpcmVzIHRoZSBjb250cm9scyBpbiBhIGZvcm0gZ3JvdXAgdG8gbWVldCBhZGRpdGlvbmFsIHZhbGlkYXRpb25cbiAgICogY3JpdGVyaWEsIGRlcGVuZGluZyBvbiB0aGUgdmFsdWVzIG9mIG90aGVyIGNvbnRyb2xzIGluIHRoZSBncm91cC5cbiAgICpcbiAgICogRXhhbXBsZXM6XG4gICAqIGh0dHBzOi8vc3BhY2V0ZWxlc2NvcGUuZ2l0aHViLmlvL3VuZGVyc3RhbmRpbmctanNvbi1zY2hlbWEvcmVmZXJlbmNlL29iamVjdC5odG1sI2RlcGVuZGVuY2llc1xuICAgKlxuICAgKiAvLyB7YW55fSBkZXBlbmRlbmNpZXMgLSByZXF1aXJlZCBkZXBlbmRlbmNpZXNcbiAgICogLy8ge0lWYWxpZGF0b3JGbn1cbiAgICovXG4gIHN0YXRpYyBkZXBlbmRlbmNpZXMoZGVwZW5kZW5jaWVzOiBhbnkpOiBJVmFsaWRhdG9yRm4ge1xuICAgIGlmIChnZXRUeXBlKGRlcGVuZGVuY2llcykgIT09ICdvYmplY3QnIHx8IGlzRW1wdHkoZGVwZW5kZW5jaWVzKSkge1xuICAgICAgcmV0dXJuIEpzb25WYWxpZGF0b3JzLm51bGxWYWxpZGF0b3I7XG4gICAgfVxuICAgIHJldHVybiAoY29udHJvbDogQWJzdHJhY3RDb250cm9sLCBpbnZlcnQgPSBmYWxzZSk6IFZhbGlkYXRpb25FcnJvcnN8bnVsbCA9PiB7XG4gICAgICBpZiAoaXNFbXB0eShjb250cm9sLnZhbHVlKSkgeyByZXR1cm4gbnVsbDsgfVxuICAgICAgbGV0IGFsbEVycm9ycyA9IF9tZXJnZU9iamVjdHMoXG4gICAgICAgIGZvckVhY2hDb3B5KGRlcGVuZGVuY2llcywgKHZhbHVlLCByZXF1aXJpbmdGaWVsZCkgPT4ge1xuICAgICAgICAgIGlmICghaGFzVmFsdWUoY29udHJvbC52YWx1ZVtyZXF1aXJpbmdGaWVsZF0pKSB7IHJldHVybiBudWxsOyB9XG4gICAgICAgICAgbGV0IHJlcXVpcmluZ0ZpZWxkRXJyb3JzOiBWYWxpZGF0aW9uRXJyb3JzID0geyB9O1xuICAgICAgICAgIGxldCByZXF1aXJlZEZpZWxkczogc3RyaW5nW107XG4gICAgICAgICAgbGV0IHByb3BlcnRpZXM6IFZhbGlkYXRpb25FcnJvcnMgPSB7IH07XG4gICAgICAgICAgaWYgKGdldFR5cGUoZGVwZW5kZW5jaWVzW3JlcXVpcmluZ0ZpZWxkXSkgPT09ICdhcnJheScpIHtcbiAgICAgICAgICAgIHJlcXVpcmVkRmllbGRzID0gZGVwZW5kZW5jaWVzW3JlcXVpcmluZ0ZpZWxkXTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGdldFR5cGUoZGVwZW5kZW5jaWVzW3JlcXVpcmluZ0ZpZWxkXSkgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICByZXF1aXJlZEZpZWxkcyA9IGRlcGVuZGVuY2llc1tyZXF1aXJpbmdGaWVsZF1bJ3JlcXVpcmVkJ10gfHwgW107XG4gICAgICAgICAgICBwcm9wZXJ0aWVzID0gZGVwZW5kZW5jaWVzW3JlcXVpcmluZ0ZpZWxkXVsncHJvcGVydGllcyddIHx8IHsgfTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBWYWxpZGF0ZSBwcm9wZXJ0eSBkZXBlbmRlbmNpZXNcbiAgICAgICAgICBmb3IgKGxldCByZXF1aXJlZEZpZWxkIG9mIHJlcXVpcmVkRmllbGRzKSB7XG4gICAgICAgICAgICBpZiAoeG9yKCFoYXNWYWx1ZShjb250cm9sLnZhbHVlW3JlcXVpcmVkRmllbGRdKSwgaW52ZXJ0KSkge1xuICAgICAgICAgICAgICByZXF1aXJpbmdGaWVsZEVycm9yc1tyZXF1aXJlZEZpZWxkXSA9IHsgJ3JlcXVpcmVkJzogdHJ1ZSB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIFZhbGlkYXRlIHNjaGVtYSBkZXBlbmRlbmNpZXNcbiAgICAgICAgICByZXF1aXJpbmdGaWVsZEVycm9ycyA9IF9tZXJnZU9iamVjdHMocmVxdWlyaW5nRmllbGRFcnJvcnMsXG4gICAgICAgICAgICBmb3JFYWNoQ29weShwcm9wZXJ0aWVzLCAocmVxdWlyZW1lbnRzLCByZXF1aXJlZEZpZWxkKSA9PiB7XG4gICAgICAgICAgICAgIGxldCByZXF1aXJlZEZpZWxkRXJyb3JzID0gX21lcmdlT2JqZWN0cyhcbiAgICAgICAgICAgICAgICBmb3JFYWNoQ29weShyZXF1aXJlbWVudHMsIChyZXF1aXJlbWVudCwgcGFyYW1ldGVyKSA9PiB7XG4gICAgICAgICAgICAgICAgICBsZXQgdmFsaWRhdG9yOiBJVmFsaWRhdG9yRm4gPSBudWxsO1xuICAgICAgICAgICAgICAgICAgaWYgKHJlcXVpcmVtZW50ID09PSAnbWF4aW11bScgfHwgcmVxdWlyZW1lbnQgPT09ICdtaW5pbXVtJykge1xuICAgICAgICAgICAgICAgICAgICBsZXQgZXhjbHVzaXZlID0gISFyZXF1aXJlbWVudHNbJ2V4Y2x1c2l2ZU0nICsgcmVxdWlyZW1lbnQuc2xpY2UoMSldO1xuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3IgPSBKc29uVmFsaWRhdG9yc1tyZXF1aXJlbWVudF0ocGFyYW1ldGVyLCBleGNsdXNpdmUpO1xuICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgSnNvblZhbGlkYXRvcnNbcmVxdWlyZW1lbnRdID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvciA9IEpzb25WYWxpZGF0b3JzW3JlcXVpcmVtZW50XShwYXJhbWV0ZXIpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgcmV0dXJuICFpc0RlZmluZWQodmFsaWRhdG9yKSA/XG4gICAgICAgICAgICAgICAgICAgIG51bGwgOiB2YWxpZGF0b3IoY29udHJvbC52YWx1ZVtyZXF1aXJlZEZpZWxkXSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgcmV0dXJuIGlzRW1wdHkocmVxdWlyZWRGaWVsZEVycm9ycykgP1xuICAgICAgICAgICAgICAgIG51bGwgOiB7IFtyZXF1aXJlZEZpZWxkXTogcmVxdWlyZWRGaWVsZEVycm9ycyB9O1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICApO1xuICAgICAgICAgIHJldHVybiBpc0VtcHR5KHJlcXVpcmluZ0ZpZWxkRXJyb3JzKSA/XG4gICAgICAgICAgICBudWxsIDogeyBbcmVxdWlyaW5nRmllbGRdOiByZXF1aXJpbmdGaWVsZEVycm9ycyB9O1xuICAgICAgICB9KVxuICAgICAgKTtcbiAgICAgIHJldHVybiBpc0VtcHR5KGFsbEVycm9ycykgPyBudWxsIDogYWxsRXJyb3JzO1xuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogJ21pbkl0ZW1zJyB2YWxpZGF0b3JcbiAgICpcbiAgICogUmVxdWlyZXMgYSBmb3JtIGFycmF5IHRvIGhhdmUgYSBtaW5pbXVtIG51bWJlciBvZiB2YWx1ZXMuXG4gICAqXG4gICAqIC8vIHtudW1iZXJ9IG1pbmltdW1JdGVtcyAtIG1pbmltdW0gbnVtYmVyIG9mIGl0ZW1zIGFsbG93ZWRcbiAgICogLy8ge0lWYWxpZGF0b3JGbn1cbiAgICovXG4gIHN0YXRpYyBtaW5JdGVtcyhtaW5pbXVtSXRlbXM6IG51bWJlcik6IElWYWxpZGF0b3JGbiB7XG4gICAgaWYgKCFoYXNWYWx1ZShtaW5pbXVtSXRlbXMpKSB7IHJldHVybiBKc29uVmFsaWRhdG9ycy5udWxsVmFsaWRhdG9yOyB9XG4gICAgcmV0dXJuIChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wsIGludmVydCA9IGZhbHNlKTogVmFsaWRhdGlvbkVycm9yc3xudWxsID0+IHtcbiAgICAgIGlmIChpc0VtcHR5KGNvbnRyb2wudmFsdWUpKSB7IHJldHVybiBudWxsOyB9XG4gICAgICBsZXQgY3VycmVudEl0ZW1zID0gaXNBcnJheShjb250cm9sLnZhbHVlKSA/IGNvbnRyb2wudmFsdWUubGVuZ3RoIDogMDtcbiAgICAgIGxldCBpc1ZhbGlkID0gY3VycmVudEl0ZW1zID49IG1pbmltdW1JdGVtcztcbiAgICAgIHJldHVybiB4b3IoaXNWYWxpZCwgaW52ZXJ0KSA/XG4gICAgICAgIG51bGwgOiB7ICdtaW5JdGVtcyc6IHsgbWluaW11bUl0ZW1zLCBjdXJyZW50SXRlbXMgfSB9O1xuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogJ21heEl0ZW1zJyB2YWxpZGF0b3JcbiAgICpcbiAgICogUmVxdWlyZXMgYSBmb3JtIGFycmF5IHRvIGhhdmUgYSBtYXhpbXVtIG51bWJlciBvZiB2YWx1ZXMuXG4gICAqXG4gICAqIC8vIHtudW1iZXJ9IG1heGltdW1JdGVtcyAtIG1heGltdW0gbnVtYmVyIG9mIGl0ZW1zIGFsbG93ZWRcbiAgICogLy8ge0lWYWxpZGF0b3JGbn1cbiAgICovXG4gIHN0YXRpYyBtYXhJdGVtcyhtYXhpbXVtSXRlbXM6IG51bWJlcik6IElWYWxpZGF0b3JGbiB7XG4gICAgaWYgKCFoYXNWYWx1ZShtYXhpbXVtSXRlbXMpKSB7IHJldHVybiBKc29uVmFsaWRhdG9ycy5udWxsVmFsaWRhdG9yOyB9XG4gICAgcmV0dXJuIChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wsIGludmVydCA9IGZhbHNlKTogVmFsaWRhdGlvbkVycm9yc3xudWxsID0+IHtcbiAgICAgIGxldCBjdXJyZW50SXRlbXMgPSBpc0FycmF5KGNvbnRyb2wudmFsdWUpID8gY29udHJvbC52YWx1ZS5sZW5ndGggOiAwO1xuICAgICAgbGV0IGlzVmFsaWQgPSBjdXJyZW50SXRlbXMgPD0gbWF4aW11bUl0ZW1zO1xuICAgICAgcmV0dXJuIHhvcihpc1ZhbGlkLCBpbnZlcnQpID9cbiAgICAgICAgbnVsbCA6IHsgJ21heEl0ZW1zJzogeyBtYXhpbXVtSXRlbXMsIGN1cnJlbnRJdGVtcyB9IH07XG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiAndW5pcXVlSXRlbXMnIHZhbGlkYXRvclxuICAgKlxuICAgKiBSZXF1aXJlcyB2YWx1ZXMgaW4gYSBmb3JtIGFycmF5IHRvIGJlIHVuaXF1ZS5cbiAgICpcbiAgICogLy8ge2Jvb2xlYW4gPSB0cnVlfSB1bmlxdWU/IC0gdHJ1ZSB0byB2YWxpZGF0ZSwgZmFsc2UgdG8gZGlzYWJsZVxuICAgKiAvLyB7SVZhbGlkYXRvckZufVxuICAgKi9cbiAgc3RhdGljIHVuaXF1ZUl0ZW1zKHVuaXF1ZSA9IHRydWUpOiBJVmFsaWRhdG9yRm4ge1xuICAgIGlmICghdW5pcXVlKSB7IHJldHVybiBKc29uVmFsaWRhdG9ycy5udWxsVmFsaWRhdG9yOyB9XG4gICAgcmV0dXJuIChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wsIGludmVydCA9IGZhbHNlKTogVmFsaWRhdGlvbkVycm9yc3xudWxsID0+IHtcbiAgICAgIGlmIChpc0VtcHR5KGNvbnRyb2wudmFsdWUpKSB7IHJldHVybiBudWxsOyB9XG4gICAgICBsZXQgc29ydGVkOiBhbnlbXSA9IGNvbnRyb2wudmFsdWUuc2xpY2UoKS5zb3J0KCk7XG4gICAgICBsZXQgZHVwbGljYXRlSXRlbXMgPSBbXTtcbiAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgc29ydGVkLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChzb3J0ZWRbaSAtIDFdID09PSBzb3J0ZWRbaV0gJiYgZHVwbGljYXRlSXRlbXMuaW5jbHVkZXMoc29ydGVkW2ldKSkge1xuICAgICAgICAgIGR1cGxpY2F0ZUl0ZW1zLnB1c2goc29ydGVkW2ldKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbGV0IGlzVmFsaWQgPSAhZHVwbGljYXRlSXRlbXMubGVuZ3RoO1xuICAgICAgcmV0dXJuIHhvcihpc1ZhbGlkLCBpbnZlcnQpID9cbiAgICAgICAgbnVsbCA6IHsgJ3VuaXF1ZUl0ZW1zJzogeyBkdXBsaWNhdGVJdGVtcyB9IH07XG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiAnY29udGFpbnMnIHZhbGlkYXRvclxuICAgKlxuICAgKiBUT0RPOiBDb21wbGV0ZSB0aGlzIHZhbGlkYXRvclxuICAgKlxuICAgKiBSZXF1aXJlcyB2YWx1ZXMgaW4gYSBmb3JtIGFycmF5IHRvIGJlIHVuaXF1ZS5cbiAgICpcbiAgICogLy8ge2Jvb2xlYW4gPSB0cnVlfSB1bmlxdWU/IC0gdHJ1ZSB0byB2YWxpZGF0ZSwgZmFsc2UgdG8gZGlzYWJsZVxuICAgKiAvLyB7SVZhbGlkYXRvckZufVxuICAgKi9cbiAgc3RhdGljIGNvbnRhaW5zKHJlcXVpcmVkSXRlbSA9IHRydWUpOiBJVmFsaWRhdG9yRm4ge1xuICAgIGlmICghcmVxdWlyZWRJdGVtKSB7IHJldHVybiBKc29uVmFsaWRhdG9ycy5udWxsVmFsaWRhdG9yOyB9XG4gICAgcmV0dXJuIChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wsIGludmVydCA9IGZhbHNlKTogVmFsaWRhdGlvbkVycm9yc3xudWxsID0+IHtcbiAgICAgIGlmIChpc0VtcHR5KGNvbnRyb2wudmFsdWUpIHx8ICFpc0FycmF5KGNvbnRyb2wudmFsdWUpKSB7IHJldHVybiBudWxsOyB9XG4gICAgICBjb25zdCBjdXJyZW50SXRlbXMgPSBjb250cm9sLnZhbHVlO1xuICAgICAgLy8gY29uc3QgaXNWYWxpZCA9IGN1cnJlbnRJdGVtcy5zb21lKGl0ZW0gPT5cbiAgICAgIC8vXG4gICAgICAvLyApO1xuICAgICAgY29uc3QgaXNWYWxpZCA9IHRydWU7XG4gICAgICByZXR1cm4geG9yKGlzVmFsaWQsIGludmVydCkgP1xuICAgICAgICBudWxsIDogeyAnY29udGFpbnMnOiB7IHJlcXVpcmVkSXRlbSwgY3VycmVudEl0ZW1zIH0gfTtcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIE5vLW9wIHZhbGlkYXRvci4gSW5jbHVkZWQgZm9yIGJhY2t3YXJkIGNvbXBhdGliaWxpdHkuXG4gICAqL1xuICBzdGF0aWMgbnVsbFZhbGlkYXRvcihjb250cm9sOiBBYnN0cmFjdENvbnRyb2wpOiBWYWxpZGF0aW9uRXJyb3JzfG51bGwge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIFZhbGlkYXRvciB0cmFuc2Zvcm1hdGlvbiBmdW5jdGlvbnM6XG4gICAqIGNvbXBvc2VBbnlPZiwgY29tcG9zZU9uZU9mLCBjb21wb3NlQWxsT2YsIGNvbXBvc2VOb3QsXG4gICAqIGNvbXBvc2UsIGNvbXBvc2VBc3luY1xuICAgKlxuICAgKiBUT0RPOiBBZGQgY29tcG9zZUFueU9mQXN5bmMsIGNvbXBvc2VPbmVPZkFzeW5jLFxuICAgKiAgICAgICAgICAgY29tcG9zZUFsbE9mQXN5bmMsIGNvbXBvc2VOb3RBc3luY1xuICAgKi9cblxuICAvKipcbiAgICogJ2NvbXBvc2VBbnlPZicgdmFsaWRhdG9yIGNvbWJpbmF0aW9uIGZ1bmN0aW9uXG4gICAqXG4gICAqIEFjY2VwdHMgYW4gYXJyYXkgb2YgdmFsaWRhdG9ycyBhbmQgcmV0dXJucyBhIHNpbmdsZSB2YWxpZGF0b3IgdGhhdFxuICAgKiBldmFsdWF0ZXMgdG8gdmFsaWQgaWYgYW55IG9uZSBvciBtb3JlIG9mIHRoZSBzdWJtaXR0ZWQgdmFsaWRhdG9ycyBhcmVcbiAgICogdmFsaWQuIElmIGV2ZXJ5IHZhbGlkYXRvciBpcyBpbnZhbGlkLCBpdCByZXR1cm5zIGNvbWJpbmVkIGVycm9ycyBmcm9tXG4gICAqIGFsbCB2YWxpZGF0b3JzLlxuICAgKlxuICAgKiAvLyB7SVZhbGlkYXRvckZuW119IHZhbGlkYXRvcnMgLSBhcnJheSBvZiB2YWxpZGF0b3JzIHRvIGNvbWJpbmVcbiAgICogLy8ge0lWYWxpZGF0b3JGbn0gLSBzaW5nbGUgY29tYmluZWQgdmFsaWRhdG9yIGZ1bmN0aW9uXG4gICAqL1xuICBzdGF0aWMgY29tcG9zZUFueU9mKHZhbGlkYXRvcnM6IElWYWxpZGF0b3JGbltdKTogSVZhbGlkYXRvckZuIHtcbiAgICBpZiAoIXZhbGlkYXRvcnMpIHsgcmV0dXJuIG51bGw7IH1cbiAgICBsZXQgcHJlc2VudFZhbGlkYXRvcnMgPSB2YWxpZGF0b3JzLmZpbHRlcihpc0RlZmluZWQpO1xuICAgIGlmIChwcmVzZW50VmFsaWRhdG9ycy5sZW5ndGggPT09IDApIHsgcmV0dXJuIG51bGw7IH1cbiAgICByZXR1cm4gKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCwgaW52ZXJ0ID0gZmFsc2UpOiBWYWxpZGF0aW9uRXJyb3JzfG51bGwgPT4ge1xuICAgICAgbGV0IGFycmF5T2ZFcnJvcnMgPVxuICAgICAgICBfZXhlY3V0ZVZhbGlkYXRvcnMoY29udHJvbCwgcHJlc2VudFZhbGlkYXRvcnMsIGludmVydCkuZmlsdGVyKGlzRGVmaW5lZCk7XG4gICAgICBsZXQgaXNWYWxpZCA9IHZhbGlkYXRvcnMubGVuZ3RoID4gYXJyYXlPZkVycm9ycy5sZW5ndGg7XG4gICAgICByZXR1cm4geG9yKGlzVmFsaWQsIGludmVydCkgP1xuICAgICAgICBudWxsIDogX21lcmdlT2JqZWN0cyguLi5hcnJheU9mRXJyb3JzLCB7ICdhbnlPZic6ICFpbnZlcnQgfSk7XG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiAnY29tcG9zZU9uZU9mJyB2YWxpZGF0b3IgY29tYmluYXRpb24gZnVuY3Rpb25cbiAgICpcbiAgICogQWNjZXB0cyBhbiBhcnJheSBvZiB2YWxpZGF0b3JzIGFuZCByZXR1cm5zIGEgc2luZ2xlIHZhbGlkYXRvciB0aGF0XG4gICAqIGV2YWx1YXRlcyB0byB2YWxpZCBvbmx5IGlmIGV4YWN0bHkgb25lIG9mIHRoZSBzdWJtaXR0ZWQgdmFsaWRhdG9yc1xuICAgKiBpcyB2YWxpZC4gT3RoZXJ3aXNlIHJldHVybnMgY29tYmluZWQgaW5mb3JtYXRpb24gZnJvbSBhbGwgdmFsaWRhdG9ycyxcbiAgICogYm90aCB2YWxpZCBhbmQgaW52YWxpZC5cbiAgICpcbiAgICogLy8ge0lWYWxpZGF0b3JGbltdfSB2YWxpZGF0b3JzIC0gYXJyYXkgb2YgdmFsaWRhdG9ycyB0byBjb21iaW5lXG4gICAqIC8vIHtJVmFsaWRhdG9yRm59IC0gc2luZ2xlIGNvbWJpbmVkIHZhbGlkYXRvciBmdW5jdGlvblxuICAgKi9cbiAgc3RhdGljIGNvbXBvc2VPbmVPZih2YWxpZGF0b3JzOiBJVmFsaWRhdG9yRm5bXSk6IElWYWxpZGF0b3JGbiB7XG4gICAgaWYgKCF2YWxpZGF0b3JzKSB7IHJldHVybiBudWxsOyB9XG4gICAgbGV0IHByZXNlbnRWYWxpZGF0b3JzID0gdmFsaWRhdG9ycy5maWx0ZXIoaXNEZWZpbmVkKTtcbiAgICBpZiAocHJlc2VudFZhbGlkYXRvcnMubGVuZ3RoID09PSAwKSB7IHJldHVybiBudWxsOyB9XG4gICAgcmV0dXJuIChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wsIGludmVydCA9IGZhbHNlKTogVmFsaWRhdGlvbkVycm9yc3xudWxsID0+IHtcbiAgICAgIGxldCBhcnJheU9mRXJyb3JzID1cbiAgICAgICAgX2V4ZWN1dGVWYWxpZGF0b3JzKGNvbnRyb2wsIHByZXNlbnRWYWxpZGF0b3JzKTtcbiAgICAgIGxldCB2YWxpZENvbnRyb2xzID1cbiAgICAgICAgdmFsaWRhdG9ycy5sZW5ndGggLSBhcnJheU9mRXJyb3JzLmZpbHRlcihpc0RlZmluZWQpLmxlbmd0aDtcbiAgICAgIGxldCBpc1ZhbGlkID0gdmFsaWRDb250cm9scyA9PT0gMTtcbiAgICAgIGlmICh4b3IoaXNWYWxpZCwgaW52ZXJ0KSkgeyByZXR1cm4gbnVsbDsgfVxuICAgICAgbGV0IGFycmF5T2ZWYWxpZHMgPVxuICAgICAgICBfZXhlY3V0ZVZhbGlkYXRvcnMoY29udHJvbCwgcHJlc2VudFZhbGlkYXRvcnMsIGludmVydCk7XG4gICAgICByZXR1cm4gX21lcmdlT2JqZWN0cyguLi5hcnJheU9mRXJyb3JzLCAuLi5hcnJheU9mVmFsaWRzLCB7ICdvbmVPZic6ICFpbnZlcnQgfSk7XG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiAnY29tcG9zZUFsbE9mJyB2YWxpZGF0b3IgY29tYmluYXRpb24gZnVuY3Rpb25cbiAgICpcbiAgICogQWNjZXB0cyBhbiBhcnJheSBvZiB2YWxpZGF0b3JzIGFuZCByZXR1cm5zIGEgc2luZ2xlIHZhbGlkYXRvciB0aGF0XG4gICAqIGV2YWx1YXRlcyB0byB2YWxpZCBvbmx5IGlmIGFsbCB0aGUgc3VibWl0dGVkIHZhbGlkYXRvcnMgYXJlIGluZGl2aWR1YWxseVxuICAgKiB2YWxpZC4gT3RoZXJ3aXNlIGl0IHJldHVybnMgY29tYmluZWQgZXJyb3JzIGZyb20gYWxsIGludmFsaWQgdmFsaWRhdG9ycy5cbiAgICpcbiAgICogLy8ge0lWYWxpZGF0b3JGbltdfSB2YWxpZGF0b3JzIC0gYXJyYXkgb2YgdmFsaWRhdG9ycyB0byBjb21iaW5lXG4gICAqIC8vIHtJVmFsaWRhdG9yRm59IC0gc2luZ2xlIGNvbWJpbmVkIHZhbGlkYXRvciBmdW5jdGlvblxuICAgKi9cbiAgc3RhdGljIGNvbXBvc2VBbGxPZih2YWxpZGF0b3JzOiBJVmFsaWRhdG9yRm5bXSk6IElWYWxpZGF0b3JGbiB7XG4gICAgaWYgKCF2YWxpZGF0b3JzKSB7IHJldHVybiBudWxsOyB9XG4gICAgbGV0IHByZXNlbnRWYWxpZGF0b3JzID0gdmFsaWRhdG9ycy5maWx0ZXIoaXNEZWZpbmVkKTtcbiAgICBpZiAocHJlc2VudFZhbGlkYXRvcnMubGVuZ3RoID09PSAwKSB7IHJldHVybiBudWxsOyB9XG4gICAgcmV0dXJuIChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wsIGludmVydCA9IGZhbHNlKTogVmFsaWRhdGlvbkVycm9yc3xudWxsID0+IHtcbiAgICAgIGxldCBjb21iaW5lZEVycm9ycyA9IF9tZXJnZUVycm9ycyhcbiAgICAgICAgX2V4ZWN1dGVWYWxpZGF0b3JzKGNvbnRyb2wsIHByZXNlbnRWYWxpZGF0b3JzLCBpbnZlcnQpXG4gICAgICApO1xuICAgICAgbGV0IGlzVmFsaWQgPSBjb21iaW5lZEVycm9ycyA9PT0gbnVsbDtcbiAgICAgIHJldHVybiAoeG9yKGlzVmFsaWQsIGludmVydCkpID9cbiAgICAgICAgbnVsbCA6IF9tZXJnZU9iamVjdHMoY29tYmluZWRFcnJvcnMsIHsgJ2FsbE9mJzogIWludmVydCB9KTtcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqICdjb21wb3NlTm90JyB2YWxpZGF0b3IgaW52ZXJzaW9uIGZ1bmN0aW9uXG4gICAqXG4gICAqIEFjY2VwdHMgYSBzaW5nbGUgdmFsaWRhdG9yIGZ1bmN0aW9uIGFuZCBpbnZlcnRzIGl0cyByZXN1bHQuXG4gICAqIFJldHVybnMgdmFsaWQgaWYgdGhlIHN1Ym1pdHRlZCB2YWxpZGF0b3IgaXMgaW52YWxpZCwgYW5kXG4gICAqIHJldHVybnMgaW52YWxpZCBpZiB0aGUgc3VibWl0dGVkIHZhbGlkYXRvciBpcyB2YWxpZC5cbiAgICogKE5vdGU6IHRoaXMgZnVuY3Rpb24gY2FuIGl0c2VsZiBiZSBpbnZlcnRlZFxuICAgKiAgIC0gZS5nLiBjb21wb3NlTm90KGNvbXBvc2VOb3QodmFsaWRhdG9yKSkgLVxuICAgKiAgIGJ1dCB0aGlzIGNhbiBiZSBjb25mdXNpbmcgYW5kIGlzIHRoZXJlZm9yZSBub3QgcmVjb21tZW5kZWQuKVxuICAgKlxuICAgKiAvLyB7SVZhbGlkYXRvckZuW119IHZhbGlkYXRvcnMgLSB2YWxpZGF0b3IocykgdG8gaW52ZXJ0XG4gICAqIC8vIHtJVmFsaWRhdG9yRm59IC0gbmV3IHZhbGlkYXRvciBmdW5jdGlvbiB0aGF0IHJldHVybnMgb3Bwb3NpdGUgcmVzdWx0XG4gICAqL1xuICBzdGF0aWMgY29tcG9zZU5vdCh2YWxpZGF0b3I6IElWYWxpZGF0b3JGbik6IElWYWxpZGF0b3JGbiB7XG4gICAgaWYgKCF2YWxpZGF0b3IpIHsgcmV0dXJuIG51bGw7IH1cbiAgICByZXR1cm4gKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCwgaW52ZXJ0ID0gZmFsc2UpOiBWYWxpZGF0aW9uRXJyb3JzfG51bGwgPT4ge1xuICAgICAgaWYgKGlzRW1wdHkoY29udHJvbC52YWx1ZSkpIHsgcmV0dXJuIG51bGw7IH1cbiAgICAgIGxldCBlcnJvciA9IHZhbGlkYXRvcihjb250cm9sLCAhaW52ZXJ0KTtcbiAgICAgIGxldCBpc1ZhbGlkID0gZXJyb3IgPT09IG51bGw7XG4gICAgICByZXR1cm4gKHhvcihpc1ZhbGlkLCBpbnZlcnQpKSA/XG4gICAgICAgIG51bGwgOiBfbWVyZ2VPYmplY3RzKGVycm9yLCB7ICdub3QnOiAhaW52ZXJ0IH0pO1xuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogJ2NvbXBvc2UnIHZhbGlkYXRvciBjb21iaW5hdGlvbiBmdW5jdGlvblxuICAgKlxuICAgKiAvLyB7SVZhbGlkYXRvckZuW119IHZhbGlkYXRvcnMgLSBhcnJheSBvZiB2YWxpZGF0b3JzIHRvIGNvbWJpbmVcbiAgICogLy8ge0lWYWxpZGF0b3JGbn0gLSBzaW5nbGUgY29tYmluZWQgdmFsaWRhdG9yIGZ1bmN0aW9uXG4gICAqL1xuICBzdGF0aWMgY29tcG9zZSh2YWxpZGF0b3JzOiBJVmFsaWRhdG9yRm5bXSk6IElWYWxpZGF0b3JGbiB7XG4gICAgaWYgKCF2YWxpZGF0b3JzKSB7IHJldHVybiBudWxsOyB9XG4gICAgbGV0IHByZXNlbnRWYWxpZGF0b3JzID0gdmFsaWRhdG9ycy5maWx0ZXIoaXNEZWZpbmVkKTtcbiAgICBpZiAocHJlc2VudFZhbGlkYXRvcnMubGVuZ3RoID09PSAwKSB7IHJldHVybiBudWxsOyB9XG4gICAgcmV0dXJuIChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wsIGludmVydCA9IGZhbHNlKTogVmFsaWRhdGlvbkVycm9yc3xudWxsID0+XG4gICAgICBfbWVyZ2VFcnJvcnMoX2V4ZWN1dGVWYWxpZGF0b3JzKGNvbnRyb2wsIHByZXNlbnRWYWxpZGF0b3JzLCBpbnZlcnQpKTtcbiAgfTtcblxuICAvKipcbiAgICogJ2NvbXBvc2VBc3luYycgYXN5bmMgdmFsaWRhdG9yIGNvbWJpbmF0aW9uIGZ1bmN0aW9uXG4gICAqXG4gICAqIC8vIHtBc3luY0lWYWxpZGF0b3JGbltdfSBhc3luYyB2YWxpZGF0b3JzIC0gYXJyYXkgb2YgYXN5bmMgdmFsaWRhdG9yc1xuICAgKiAvLyB7QXN5bmNJVmFsaWRhdG9yRm59IC0gc2luZ2xlIGNvbWJpbmVkIGFzeW5jIHZhbGlkYXRvciBmdW5jdGlvblxuICAgKi9cbiAgc3RhdGljIGNvbXBvc2VBc3luYyh2YWxpZGF0b3JzOiBBc3luY0lWYWxpZGF0b3JGbltdKTogQXN5bmNJVmFsaWRhdG9yRm4ge1xuICAgIGlmICghdmFsaWRhdG9ycykgeyByZXR1cm4gbnVsbDsgfVxuICAgIGxldCBwcmVzZW50VmFsaWRhdG9ycyA9IHZhbGlkYXRvcnMuZmlsdGVyKGlzRGVmaW5lZCk7XG4gICAgaWYgKHByZXNlbnRWYWxpZGF0b3JzLmxlbmd0aCA9PT0gMCkgeyByZXR1cm4gbnVsbDsgfVxuICAgIHJldHVybiAoY29udHJvbDogQWJzdHJhY3RDb250cm9sKSA9PiB7XG4gICAgICBjb25zdCBvYnNlcnZhYmxlcyA9XG4gICAgICAgIF9leGVjdXRlQXN5bmNWYWxpZGF0b3JzKGNvbnRyb2wsIHByZXNlbnRWYWxpZGF0b3JzKS5tYXAodG9PYnNlcnZhYmxlKTtcbiAgICAgIHJldHVybiBtYXAuY2FsbChmb3JrSm9pbihvYnNlcnZhYmxlcyksIF9tZXJnZUVycm9ycyk7XG4gICAgfVxuICB9XG5cbiAgLy8gQWRkaXRpb25hbCBhbmd1bGFyIHZhbGlkYXRvcnMgKG5vdCB1c2VkIGJ5IEFuZ3VhbHIgSlNPTiBTY2hlbWEgRm9ybSlcbiAgLy8gRnJvbSBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyL2Jsb2IvbWFzdGVyL3BhY2thZ2VzL2Zvcm1zL3NyYy92YWxpZGF0b3JzLnRzXG5cbiAgLyoqXG4gICAqIFZhbGlkYXRvciB0aGF0IHJlcXVpcmVzIGNvbnRyb2xzIHRvIGhhdmUgYSB2YWx1ZSBncmVhdGVyIHRoYW4gYSBudW1iZXIuXG4gICAqL1xuICBzdGF0aWMgbWluKG1pbjogbnVtYmVyKTogVmFsaWRhdG9yRm4ge1xuICAgIGlmICghaGFzVmFsdWUobWluKSkgeyByZXR1cm4gSnNvblZhbGlkYXRvcnMubnVsbFZhbGlkYXRvcjsgfVxuICAgIHJldHVybiAoY29udHJvbDogQWJzdHJhY3RDb250cm9sKTogVmFsaWRhdGlvbkVycm9yc3xudWxsID0+IHtcbiAgICAgIC8vIGRvbid0IHZhbGlkYXRlIGVtcHR5IHZhbHVlcyB0byBhbGxvdyBvcHRpb25hbCBjb250cm9sc1xuICAgICAgaWYgKGlzRW1wdHkoY29udHJvbC52YWx1ZSkgfHwgaXNFbXB0eShtaW4pKSB7IHJldHVybiBudWxsOyB9XG4gICAgICBjb25zdCB2YWx1ZSA9IHBhcnNlRmxvYXQoY29udHJvbC52YWx1ZSk7XG4gICAgICBjb25zdCBhY3R1YWwgPSBjb250cm9sLnZhbHVlO1xuICAgICAgLy8gQ29udHJvbHMgd2l0aCBOYU4gdmFsdWVzIGFmdGVyIHBhcnNpbmcgc2hvdWxkIGJlIHRyZWF0ZWQgYXMgbm90IGhhdmluZyBhXG4gICAgICAvLyBtaW5pbXVtLCBwZXIgdGhlIEhUTUwgZm9ybXMgc3BlYzogaHR0cHM6Ly93d3cudzMub3JnL1RSL2h0bWw1L2Zvcm1zLmh0bWwjYXR0ci1pbnB1dC1taW5cbiAgICAgIHJldHVybiBpc05hTih2YWx1ZSkgfHwgdmFsdWUgPj0gbWluID8gbnVsbCA6IHsgJ21pbic6IHsgbWluLCBhY3R1YWwgfSB9O1xuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogVmFsaWRhdG9yIHRoYXQgcmVxdWlyZXMgY29udHJvbHMgdG8gaGF2ZSBhIHZhbHVlIGxlc3MgdGhhbiBhIG51bWJlci5cbiAgICovXG4gIHN0YXRpYyBtYXgobWF4OiBudW1iZXIpOiBWYWxpZGF0b3JGbiB7XG4gICAgaWYgKCFoYXNWYWx1ZShtYXgpKSB7IHJldHVybiBKc29uVmFsaWRhdG9ycy5udWxsVmFsaWRhdG9yOyB9XG4gICAgcmV0dXJuIChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wpOiBWYWxpZGF0aW9uRXJyb3JzfG51bGwgPT4ge1xuICAgICAgLy8gZG9uJ3QgdmFsaWRhdGUgZW1wdHkgdmFsdWVzIHRvIGFsbG93IG9wdGlvbmFsIGNvbnRyb2xzXG4gICAgICBpZiAoaXNFbXB0eShjb250cm9sLnZhbHVlKSB8fCBpc0VtcHR5KG1heCkpIHsgcmV0dXJuIG51bGw7IH1cbiAgICAgIGNvbnN0IHZhbHVlID0gcGFyc2VGbG9hdChjb250cm9sLnZhbHVlKTtcbiAgICAgIGNvbnN0IGFjdHVhbCA9IGNvbnRyb2wudmFsdWU7XG4gICAgICAvLyBDb250cm9scyB3aXRoIE5hTiB2YWx1ZXMgYWZ0ZXIgcGFyc2luZyBzaG91bGQgYmUgdHJlYXRlZCBhcyBub3QgaGF2aW5nIGFcbiAgICAgIC8vIG1heGltdW0sIHBlciB0aGUgSFRNTCBmb3JtcyBzcGVjOiBodHRwczovL3d3dy53My5vcmcvVFIvaHRtbDUvZm9ybXMuaHRtbCNhdHRyLWlucHV0LW1heFxuICAgICAgcmV0dXJuIGlzTmFOKHZhbHVlKSB8fCB2YWx1ZSA8PSBtYXggPyBudWxsIDogeyAnbWF4JzogeyBtYXgsIGFjdHVhbCB9IH07XG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBWYWxpZGF0b3IgdGhhdCByZXF1aXJlcyBjb250cm9sIHZhbHVlIHRvIGJlIHRydWUuXG4gICAqL1xuICBzdGF0aWMgcmVxdWlyZWRUcnVlKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCk6IFZhbGlkYXRpb25FcnJvcnN8bnVsbCB7XG4gICAgaWYgKCFjb250cm9sKSB7IHJldHVybiBKc29uVmFsaWRhdG9ycy5udWxsVmFsaWRhdG9yOyB9XG4gICAgcmV0dXJuIGNvbnRyb2wudmFsdWUgPT09IHRydWUgPyBudWxsIDogeyAncmVxdWlyZWQnOiB0cnVlIH07XG4gIH1cblxuICAvKipcbiAgICogVmFsaWRhdG9yIHRoYXQgcGVyZm9ybXMgZW1haWwgdmFsaWRhdGlvbi5cbiAgICovXG4gIHN0YXRpYyBlbWFpbChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wpOiBWYWxpZGF0aW9uRXJyb3JzfG51bGwge1xuICAgIGlmICghY29udHJvbCkgeyByZXR1cm4gSnNvblZhbGlkYXRvcnMubnVsbFZhbGlkYXRvcjsgfVxuICAgIGNvbnN0IEVNQUlMX1JFR0VYUCA9XG4gICAgICAvXig/PS57MSwyNTR9JCkoPz0uezEsNjR9QClbLSEjJCUmJyorLzAtOT0/QS1aXl9gYS16e3x9fl0rKFxcLlstISMkJSYnKisvMC05PT9BLVpeX2BhLXp7fH1+XSspKkBbQS1aYS16MC05XShbQS1aYS16MC05LV17MCw2MX1bQS1aYS16MC05XSk/KFxcLltBLVphLXowLTldKFtBLVphLXowLTktXXswLDYxfVtBLVphLXowLTldKT8pKiQvO1xuICAgIHJldHVybiBFTUFJTF9SRUdFWFAudGVzdChjb250cm9sLnZhbHVlKSA/IG51bGwgOiB7ICdlbWFpbCc6IHRydWUgfTtcbiAgfVxufVxuIl19