/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Observable, from } from 'rxjs';
/** @typedef {?} */
var SchemaPrimitiveType;
export { SchemaPrimitiveType };
/** @typedef {?} */
var SchemaType;
export { SchemaType };
/** @typedef {?} */
var JavaScriptPrimitiveType;
export { JavaScriptPrimitiveType };
/** @typedef {?} */
var JavaScriptType;
export { JavaScriptType };
/** @typedef {?} */
var PrimitiveValue;
export { PrimitiveValue };
/**
 * @record
 */
export function PlainObject() { }
/** @typedef {?} */
var IValidatorFn;
export { IValidatorFn };
/** @typedef {?} */
var AsyncIValidatorFn;
export { AsyncIValidatorFn };
/**
 * '_executeValidators' utility function
 *
 * Validates a control against an array of validators, and returns
 * an array of the same length containing a combination of error messages
 * (from invalid validators) and null values (from valid validators)
 *
 * //  { AbstractControl } control - control to validate
 * //  { IValidatorFn[] } validators - array of validators
 * //  { boolean } invert - invert?
 * // { PlainObject[] } - array of nulls and error message
 * @param {?} control
 * @param {?} validators
 * @param {?=} invert
 * @return {?}
 */
export function _executeValidators(control, validators, invert = false) {
    return validators.map(validator => validator(control, invert));
}
/**
 * '_executeAsyncValidators' utility function
 *
 * Validates a control against an array of async validators, and returns
 * an array of observabe results of the same length containing a combination of
 * error messages (from invalid validators) and null values (from valid ones)
 *
 * //  { AbstractControl } control - control to validate
 * //  { AsyncIValidatorFn[] } validators - array of async validators
 * //  { boolean } invert - invert?
 * //  - array of observable nulls and error message
 * @param {?} control
 * @param {?} validators
 * @param {?=} invert
 * @return {?}
 */
export function _executeAsyncValidators(control, validators, invert = false) {
    return validators.map(validator => validator(control, invert));
}
/**
 * '_mergeObjects' utility function
 *
 * Recursively Merges one or more objects into a single object with combined keys.
 * Automatically detects and ignores null and undefined inputs.
 * Also detects duplicated boolean 'not' keys and XORs their values.
 *
 * //  { PlainObject[] } objects - one or more objects to merge
 * // { PlainObject } - merged object
 * @param {...?} objects
 * @return {?}
 */
export function _mergeObjects(...objects) {
    /** @type {?} */
    const mergedObject = {};
    for (const currentObject of objects) {
        if (isObject(currentObject)) {
            for (const key of Object.keys(currentObject)) {
                /** @type {?} */
                const currentValue = currentObject[key];
                /** @type {?} */
                const mergedValue = mergedObject[key];
                mergedObject[key] = !isDefined(mergedValue) ? currentValue :
                    key === 'not' && isBoolean(mergedValue, 'strict') &&
                        isBoolean(currentValue, 'strict') ? xor(mergedValue, currentValue) :
                        getType(mergedValue) === 'object' && getType(currentValue) === 'object' ?
                            _mergeObjects(mergedValue, currentValue) :
                            currentValue;
            }
        }
    }
    return mergedObject;
}
/**
 * '_mergeErrors' utility function
 *
 * Merges an array of objects.
 * Used for combining the validator errors returned from 'executeValidators'
 *
 * //  { PlainObject[] } arrayOfErrors - array of objects
 * // { PlainObject } - merged object, or null if no usable input objectcs
 * @param {?} arrayOfErrors
 * @return {?}
 */
export function _mergeErrors(arrayOfErrors) {
    /** @type {?} */
    const mergedErrors = _mergeObjects(...arrayOfErrors);
    return isEmpty(mergedErrors) ? null : mergedErrors;
}
/**
 * 'isDefined' utility function
 *
 * Checks if a variable contains a value of any type.
 * Returns true even for otherwise 'falsey' values of 0, '', and false.
 *
 * //   value - the value to check
 * // { boolean } - false if undefined or null, otherwise true
 * @param {?} value
 * @return {?}
 */
export function isDefined(value) {
    return value !== undefined && value !== null;
}
/**
 * 'hasValue' utility function
 *
 * Checks if a variable contains a value.
 * Returs false for null, undefined, or a zero-length strng, '',
 * otherwise returns true.
 * (Stricter than 'isDefined' because it also returns false for '',
 * though it stil returns true for otherwise 'falsey' values 0 and false.)
 *
 * //   value - the value to check
 * // { boolean } - false if undefined, null, or '', otherwise true
 * @param {?} value
 * @return {?}
 */
export function hasValue(value) {
    return value !== undefined && value !== null && value !== '';
}
/**
 * 'isEmpty' utility function
 *
 * Similar to !hasValue, but also returns true for empty arrays and objects.
 *
 * //   value - the value to check
 * // { boolean } - false if undefined, null, or '', otherwise true
 * @param {?} value
 * @return {?}
 */
export function isEmpty(value) {
    if (isArray(value)) {
        return !value.length;
    }
    if (isObject(value)) {
        return !Object.keys(value).length;
    }
    return value === undefined || value === null || value === '';
}
/**
 * 'isString' utility function
 *
 * Checks if a value is a string.
 *
 * //   value - the value to check
 * // { boolean } - true if string, false if not
 * @param {?} value
 * @return {?}
 */
export function isString(value) {
    return typeof value === 'string';
}
/**
 * 'isNumber' utility function
 *
 * Checks if a value is a regular number, numeric string, or JavaScript Date.
 *
 * //   value - the value to check
 * //  { any = false } strict - if truthy, also checks JavaScript tyoe
 * // { boolean } - true if number, false if not
 * @param {?} value
 * @param {?=} strict
 * @return {?}
 */
export function isNumber(value, strict = false) {
    if (strict && typeof value !== 'number') {
        return false;
    }
    return !isNaN(value) && value !== value / 0;
}
/**
 * 'isInteger' utility function
 *
 * Checks if a value is an integer.
 *
 * //   value - the value to check
 * //  { any = false } strict - if truthy, also checks JavaScript tyoe
 * // {boolean } - true if number, false if not
 * @param {?} value
 * @param {?=} strict
 * @return {?}
 */
export function isInteger(value, strict = false) {
    if (strict && typeof value !== 'number') {
        return false;
    }
    return !isNaN(value) && value !== value / 0 && value % 1 === 0;
}
/**
 * 'isBoolean' utility function
 *
 * Checks if a value is a boolean.
 *
 * //   value - the value to check
 * //  { any = null } option - if 'strict', also checks JavaScript type
 *                              if TRUE or FALSE, checks only for that value
 * // { boolean } - true if boolean, false if not
 * @param {?} value
 * @param {?=} option
 * @return {?}
 */
export function isBoolean(value, option = null) {
    if (option === 'strict') {
        return value === true || value === false;
    }
    if (option === true) {
        return value === true || value === 1 || value === 'true' || value === '1';
    }
    if (option === false) {
        return value === false || value === 0 || value === 'false' || value === '0';
    }
    return value === true || value === 1 || value === 'true' || value === '1' ||
        value === false || value === 0 || value === 'false' || value === '0';
}
/**
 * @param {?} item
 * @return {?}
 */
export function isFunction(item) {
    return typeof item === 'function';
}
/**
 * @param {?} item
 * @return {?}
 */
export function isObject(item) {
    return item !== null && typeof item === 'object' &&
        Object.prototype.toString.call(item) === '[object Object]';
}
/**
 * @param {?} item
 * @return {?}
 */
export function isArray(item) {
    return Array.isArray(item) ||
        Object.prototype.toString.call(item) === '[object Array]';
}
/**
 * @param {?} item
 * @return {?}
 */
export function isDate(item) {
    return typeof item === 'object' &&
        Object.prototype.toString.call(item) === '[object Date]';
}
/**
 * @param {?} item
 * @return {?}
 */
export function isMap(item) {
    return typeof item === 'object' &&
        Object.prototype.toString.call(item) === '[object Map]';
}
/**
 * @param {?} item
 * @return {?}
 */
export function isSet(item) {
    return typeof item === 'object' &&
        Object.prototype.toString.call(item) === '[object Set]';
}
/**
 * @param {?} item
 * @return {?}
 */
export function isSymbol(item) {
    return typeof item === 'symbol';
}
/**
 * 'getType' function
 *
 * Detects the JSON Schema Type of a value.
 * By default, detects numbers and integers even if formatted as strings.
 * (So all integers are also numbers, and any number may also be a string.)
 * However, it only detects true boolean values (to detect boolean values
 * in non-boolean formats, use isBoolean() instead).
 *
 * If passed a second optional parameter of 'strict', it will only detect
 * numbers and integers if they are formatted as JavaScript numbers.
 *
 * Examples:
 * getType('10.5') = 'number'
 * getType(10.5) = 'number'
 * getType('10') = 'integer'
 * getType(10) = 'integer'
 * getType('true') = 'string'
 * getType(true) = 'boolean'
 * getType(null) = 'null'
 * getType({ }) = 'object'
 * getType([]) = 'array'
 *
 * getType('10.5', 'strict') = 'string'
 * getType(10.5, 'strict') = 'number'
 * getType('10', 'strict') = 'string'
 * getType(10, 'strict') = 'integer'
 * getType('true', 'strict') = 'string'
 * getType(true, 'strict') = 'boolean'
 *
 * //   value - value to check
 * //  { any = false } strict - if truthy, also checks JavaScript tyoe
 * // { SchemaType }
 * @param {?} value
 * @param {?=} strict
 * @return {?}
 */
export function getType(value, strict = false) {
    if (!isDefined(value)) {
        return 'null';
    }
    if (isArray(value)) {
        return 'array';
    }
    if (isObject(value)) {
        return 'object';
    }
    if (isBoolean(value, 'strict')) {
        return 'boolean';
    }
    if (isInteger(value, strict)) {
        return 'integer';
    }
    if (isNumber(value, strict)) {
        return 'number';
    }
    if (isString(value) || (!strict && isDate(value))) {
        return 'string';
    }
    return null;
}
/**
 * 'isType' function
 *
 * Checks wether an input (probably string) value contains data of
 * a specified JSON Schema type
 *
 * //  { PrimitiveValue } value - value to check
 * //  { SchemaPrimitiveType } type - type to check
 * // { boolean }
 * @param {?} value
 * @param {?} type
 * @return {?}
 */
export function isType(value, type) {
    switch (type) {
        case 'string':
            return isString(value) || isDate(value);
        case 'number':
            return isNumber(value);
        case 'integer':
            return isInteger(value);
        case 'boolean':
            return isBoolean(value);
        case 'null':
            return !hasValue(value);
        default:
            console.error(`isType error: "${type}" is not a recognized type.`);
            return null;
    }
}
/**
 * 'isPrimitive' function
 *
 * Checks wether an input value is a JavaScript primitive type:
 * string, number, boolean, or null.
 *
 * //   value - value to check
 * // { boolean }
 * @param {?} value
 * @return {?}
 */
export function isPrimitive(value) {
    return (isString(value) || isNumber(value) ||
        isBoolean(value, 'strict') || value === null);
}
/**
 * 'toJavaScriptType' function
 *
 * Converts an input (probably string) value to a JavaScript primitive type -
 * 'string', 'number', 'boolean', or 'null' - before storing in a JSON object.
 *
 * Does not coerce values (other than null), and only converts the types
 * of values that would otherwise be valid.
 *
 * If the optional third parameter 'strictIntegers' is TRUE, and the
 * JSON Schema type 'integer' is specified, it also verifies the input value
 * is an integer and, if it is, returns it as a JaveScript number.
 * If 'strictIntegers' is FALSE (or not set) the type 'integer' is treated
 * exactly the same as 'number', and allows decimals.
 *
 * Valid Examples:
 * toJavaScriptType('10',   'number' ) = 10   // '10'   is a number
 * toJavaScriptType('10',   'integer') = 10   // '10'   is also an integer
 * toJavaScriptType( 10,    'integer') = 10   //  10    is still an integer
 * toJavaScriptType( 10,    'string' ) = '10' //  10    can be made into a string
 * toJavaScriptType('10.5', 'number' ) = 10.5 // '10.5' is a number
 *
 * Invalid Examples:
 * toJavaScriptType('10.5', 'integer') = null // '10.5' is not an integer
 * toJavaScriptType( 10.5,  'integer') = null //  10.5  is still not an integer
 *
 * //  { PrimitiveValue } value - value to convert
 * //  { SchemaPrimitiveType | SchemaPrimitiveType[] } types - types to convert to
 * //  { boolean = false } strictIntegers - if FALSE, treat integers as numbers
 * // { PrimitiveValue }
 * @param {?} value
 * @param {?} types
 * @param {?=} strictIntegers
 * @return {?}
 */
export function toJavaScriptType(value, types, strictIntegers = true) {
    if (!isDefined(value)) {
        return null;
    }
    if (isString(types)) {
        types = [types];
    }
    if (strictIntegers && inArray('integer', types)) {
        if (isInteger(value, 'strict')) {
            return value;
        }
        if (isInteger(value)) {
            return parseInt(value, 10);
        }
    }
    if (inArray('number', types) || (!strictIntegers && inArray('integer', types))) {
        if (isNumber(value, 'strict')) {
            return value;
        }
        if (isNumber(value)) {
            return parseFloat(value);
        }
    }
    if (inArray('string', types)) {
        if (isString(value)) {
            return value;
        }
        // If value is a date, and types includes 'string',
        // convert the date to a string
        if (isDate(value)) {
            return value.toISOString().slice(0, 10);
        }
        if (isNumber(value)) {
            return value.toString();
        }
    }
    // If value is a date, and types includes 'integer' or 'number',
    // but not 'string', convert the date to a number
    if (isDate(value) && (inArray('integer', types) || inArray('number', types))) {
        return value.getTime();
    }
    if (inArray('boolean', types)) {
        if (isBoolean(value, true)) {
            return true;
        }
        if (isBoolean(value, false)) {
            return false;
        }
    }
    return null;
}
/**
 * 'toSchemaType' function
 *
 * Converts an input (probably string) value to the "best" JavaScript
 * equivalent available from an allowed list of JSON Schema types, which may
 * contain 'string', 'number', 'integer', 'boolean', and/or 'null'.
 * If necssary, it does progressively agressive type coersion.
 * It will not return null unless null is in the list of allowed types.
 *
 * Number conversion examples:
 * toSchemaType('10', ['number','integer','string']) = 10 // integer
 * toSchemaType('10', ['number','string']) = 10 // number
 * toSchemaType('10', ['string']) = '10' // string
 * toSchemaType('10.5', ['number','integer','string']) = 10.5 // number
 * toSchemaType('10.5', ['integer','string']) = '10.5' // string
 * toSchemaType('10.5', ['integer']) = 10 // integer
 * toSchemaType(10.5, ['null','boolean','string']) = '10.5' // string
 * toSchemaType(10.5, ['null','boolean']) = true // boolean
 *
 * String conversion examples:
 * toSchemaType('1.5x', ['boolean','number','integer','string']) = '1.5x' // string
 * toSchemaType('1.5x', ['boolean','number','integer']) = '1.5' // number
 * toSchemaType('1.5x', ['boolean','integer']) = '1' // integer
 * toSchemaType('1.5x', ['boolean']) = true // boolean
 * toSchemaType('xyz', ['number','integer','boolean','null']) = true // boolean
 * toSchemaType('xyz', ['number','integer','null']) = null // null
 * toSchemaType('xyz', ['number','integer']) = 0 // number
 *
 * Boolean conversion examples:
 * toSchemaType('1', ['integer','number','string','boolean']) = 1 // integer
 * toSchemaType('1', ['number','string','boolean']) = 1 // number
 * toSchemaType('1', ['string','boolean']) = '1' // string
 * toSchemaType('1', ['boolean']) = true // boolean
 * toSchemaType('true', ['number','string','boolean']) = 'true' // string
 * toSchemaType('true', ['boolean']) = true // boolean
 * toSchemaType('true', ['number']) = 0 // number
 * toSchemaType(true, ['number','string','boolean']) = true // boolean
 * toSchemaType(true, ['number','string']) = 'true' // string
 * toSchemaType(true, ['number']) = 1 // number
 *
 * //  { PrimitiveValue } value - value to convert
 * //  { SchemaPrimitiveType | SchemaPrimitiveType[] } types - allowed types to convert to
 * // { PrimitiveValue }
 * @param {?} value
 * @param {?} types
 * @return {?}
 */
export function toSchemaType(value, types) {
    if (!isArray(/** @type {?} */ (types))) {
        types = /** @type {?} */ ([types]);
    }
    if ((/** @type {?} */ (types)).includes('null') && !hasValue(value)) {
        return null;
    }
    if ((/** @type {?} */ (types)).includes('boolean') && !isBoolean(value, 'strict')) {
        return value;
    }
    if ((/** @type {?} */ (types)).includes('integer')) {
        /** @type {?} */
        const testValue = toJavaScriptType(value, 'integer');
        if (testValue !== null) {
            return +testValue;
        }
    }
    if ((/** @type {?} */ (types)).includes('number')) {
        /** @type {?} */
        const testValue = toJavaScriptType(value, 'number');
        if (testValue !== null) {
            return +testValue;
        }
    }
    if ((isString(value) || isNumber(value, 'strict')) &&
        (/** @type {?} */ (types)).includes('string')) {
        // Convert number to string
        return toJavaScriptType(value, 'string');
    }
    if ((/** @type {?} */ (types)).includes('boolean') && isBoolean(value)) {
        return toJavaScriptType(value, 'boolean');
    }
    if ((/** @type {?} */ (types)).includes('string')) {
        // Convert null & boolean to string
        if (value === null) {
            return '';
        }
        /** @type {?} */
        const testValue = toJavaScriptType(value, 'string');
        if (testValue !== null) {
            return testValue;
        }
    }
    if (((/** @type {?} */ (types)).includes('number') ||
        (/** @type {?} */ (types)).includes('integer'))) {
        if (value === true) {
            return 1;
        } // Convert boolean & null to number
        if (value === false || value === null || value === '') {
            return 0;
        }
    }
    if ((/** @type {?} */ (types)).includes('number')) {
        /** @type {?} */
        const testValue = parseFloat(/** @type {?} */ (value));
        if (!!testValue) {
            return testValue;
        }
    }
    if ((/** @type {?} */ (types)).includes('integer')) {
        /** @type {?} */
        const testValue = parseInt(/** @type {?} */ (value), 10);
        if (!!testValue) {
            return testValue;
        }
    }
    if ((/** @type {?} */ (types)).includes('boolean')) {
        // Convert anything to boolean
        return !!value;
    }
    if (((/** @type {?} */ (types)).includes('number') ||
        (/** @type {?} */ (types)).includes('integer')) && !(/** @type {?} */ (types)).includes('null')) {
        return 0; // If null not allowed, return 0 for non-convertable values
    }
}
/**
 * 'isPromise' function
 *
 * //   object
 * // { boolean }
 * @param {?} object
 * @return {?}
 */
export function isPromise(object) {
    return !!object && typeof object.then === 'function';
}
/**
 * 'isObservable' function
 *
 * //   object
 * // { boolean }
 * @param {?} object
 * @return {?}
 */
export function isObservable(object) {
    return !!object && typeof object.subscribe === 'function';
}
/**
 * '_toPromise' function
 *
 * //  { object } object
 * // { Promise<any> }
 * @param {?} object
 * @return {?}
 */
export function _toPromise(object) {
    return isPromise(object) ? object : object.toPromise();
}
/**
 * 'toObservable' function
 *
 * //  { object } object
 * // { Observable<any> }
 * @param {?} object
 * @return {?}
 */
export function toObservable(object) {
    /** @type {?} */
    const observable = isPromise(object) ? from(object) : object;
    if (isObservable(observable)) {
        return observable;
    }
    console.error('toObservable error: Expected validator to return Promise or Observable.');
    return new Observable();
}
/**
 * 'inArray' function
 *
 * Searches an array for an item, or one of a list of items, and returns true
 * as soon as a match is found, or false if no match.
 *
 * If the optional third parameter allIn is set to TRUE, and the item to find
 * is an array, then the function returns true only if all elements from item
 * are found in the array list, and false if any element is not found. If the
 * item to find is not an array, setting allIn to TRUE has no effect.
 *
 * //  { any|any[] } item - the item to search for
 * //   array - the array to search
 * //  { boolean = false } allIn - if TRUE, all items must be in array
 * // { boolean } - true if item(s) in array, false otherwise
 * @param {?} item
 * @param {?} array
 * @param {?=} allIn
 * @return {?}
 */
export function inArray(item, array, allIn = false) {
    if (!isDefined(item) || !isArray(array)) {
        return false;
    }
    return isArray(item) ?
        item[allIn ? 'every' : 'some'](subItem => array.includes(subItem)) :
        array.includes(item);
}
/**
 * 'xor' utility function - exclusive or
 *
 * Returns true if exactly one of two values is truthy.
 *
 * //   value1 - first value to check
 * //   value2 - second value to check
 * // { boolean } - true if exactly one input value is truthy, false if not
 * @param {?} value1
 * @param {?} value2
 * @return {?}
 */
export function xor(value1, value2) {
    return (!!value1 && !value2) || (!value1 && !!value2);
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdG9yLmZ1bmN0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nNi1qc29uLXNjaGVtYS1mb3JtLyIsInNvdXJjZXMiOlsibGliL3NoYXJlZC92YWxpZGF0b3IuZnVuY3Rpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxNQUFNLE1BQU0sQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBNER4QyxNQUFNLDZCQUE2QixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sR0FBRyxLQUFLO0lBQ3BFLE1BQU0sQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO0NBQ2hFOzs7Ozs7Ozs7Ozs7Ozs7OztBQWNELE1BQU0sa0NBQWtDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxHQUFHLEtBQUs7SUFDekUsTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7Q0FDaEU7Ozs7Ozs7Ozs7Ozs7QUFZRCxNQUFNLHdCQUF3QixHQUFHLE9BQU87O0lBQ3RDLE1BQU0sWUFBWSxHQUFnQixFQUFHLENBQUM7SUFDdEMsR0FBRyxDQUFDLENBQUMsTUFBTSxhQUFhLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQztRQUNwQyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzVCLEdBQUcsQ0FBQyxDQUFDLE1BQU0sR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDOztnQkFDN0MsTUFBTSxZQUFZLEdBQUcsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDOztnQkFDeEMsTUFBTSxXQUFXLEdBQUcsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUN0QyxZQUFZLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDO29CQUMxRCxHQUFHLEtBQUssS0FBSyxJQUFJLFNBQVMsQ0FBQyxXQUFXLEVBQUUsUUFBUSxDQUFDO3dCQUMvQyxTQUFTLENBQUMsWUFBWSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLFlBQVksQ0FBQyxDQUFDLENBQUM7d0JBQ3RFLE9BQU8sQ0FBQyxXQUFXLENBQUMsS0FBSyxRQUFRLElBQUksT0FBTyxDQUFDLFlBQVksQ0FBQyxLQUFLLFFBQVEsQ0FBQyxDQUFDOzRCQUN2RSxhQUFhLENBQUMsV0FBVyxFQUFFLFlBQVksQ0FBQyxDQUFDLENBQUM7NEJBQzFDLFlBQVksQ0FBQzthQUNsQjtTQUNGO0tBQ0Y7SUFDRCxNQUFNLENBQUMsWUFBWSxDQUFDO0NBQ3JCOzs7Ozs7Ozs7Ozs7QUFXRCxNQUFNLHVCQUF1QixhQUFhOztJQUN4QyxNQUFNLFlBQVksR0FBRyxhQUFhLENBQUMsR0FBRyxhQUFhLENBQUMsQ0FBQztJQUNyRCxNQUFNLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQztDQUNwRDs7Ozs7Ozs7Ozs7O0FBV0QsTUFBTSxvQkFBb0IsS0FBSztJQUM3QixNQUFNLENBQUMsS0FBSyxLQUFLLFNBQVMsSUFBSSxLQUFLLEtBQUssSUFBSSxDQUFDO0NBQzlDOzs7Ozs7Ozs7Ozs7Ozs7QUFjRCxNQUFNLG1CQUFtQixLQUFLO0lBQzVCLE1BQU0sQ0FBQyxLQUFLLEtBQUssU0FBUyxJQUFJLEtBQUssS0FBSyxJQUFJLElBQUksS0FBSyxLQUFLLEVBQUUsQ0FBQztDQUM5RDs7Ozs7Ozs7Ozs7QUFVRCxNQUFNLGtCQUFrQixLQUFLO0lBQzNCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFBQyxNQUFNLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO0tBQUU7SUFDN0MsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDO0tBQUU7SUFDM0QsTUFBTSxDQUFDLEtBQUssS0FBSyxTQUFTLElBQUksS0FBSyxLQUFLLElBQUksSUFBSSxLQUFLLEtBQUssRUFBRSxDQUFDO0NBQzlEOzs7Ozs7Ozs7OztBQVVELE1BQU0sbUJBQW1CLEtBQUs7SUFDNUIsTUFBTSxDQUFDLE9BQU8sS0FBSyxLQUFLLFFBQVEsQ0FBQztDQUNsQzs7Ozs7Ozs7Ozs7OztBQVdELE1BQU0sbUJBQW1CLEtBQUssRUFBRSxTQUFjLEtBQUs7SUFDakQsRUFBRSxDQUFDLENBQUMsTUFBTSxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFBQyxNQUFNLENBQUMsS0FBSyxDQUFDO0tBQUU7SUFDMUQsTUFBTSxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssS0FBSyxLQUFLLEdBQUcsQ0FBQyxDQUFDO0NBQzdDOzs7Ozs7Ozs7Ozs7O0FBV0QsTUFBTSxvQkFBb0IsS0FBSyxFQUFFLFNBQWMsS0FBSztJQUNsRCxFQUFFLENBQUMsQ0FBQyxNQUFNLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztRQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7S0FBRTtJQUMxRCxNQUFNLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUssS0FBSyxLQUFLLEtBQUssR0FBRyxDQUFDLElBQUksS0FBSyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7Q0FDakU7Ozs7Ozs7Ozs7Ozs7O0FBWUQsTUFBTSxvQkFBb0IsS0FBSyxFQUFFLFNB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Q0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQy9FLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztTQUFFO1FBQ2hELEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQUU7S0FDbkQ7SUFDRCxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM3QixFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztTQUFFOzs7UUFHdEMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztTQUFFO1FBQy9ELEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQUU7S0FDbEQ7OztJQUdELEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLElBQUksT0FBTyxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM3RSxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDO0tBQ3hCO0lBQ0QsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDOUIsRUFBRSxDQUFDLENBQUMsU0FBUyxD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QUU7S0FDOUM7SUFDRCxFQUFFLENBQUMsQ0FBQyxDQUNGLG1CQUF3QixLQUFLLEVBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDO1FBQ2pELG1CQUF3QixLQUFLLEVBQUMsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQ3BELENBQUMsQ0FBQyxDQUFDO1FBQ0QsRUFBRSxDQUFDLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7WUFBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1NBQUU7UUFDakMsRUFBRSxDQUFDLENBQUMsS0FBSyxLQUFLLEtBQUssSUFBSSxLQUFLLEtBQUssSUFBSSxJQUFJLEtBQUssS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztTQUFFO0tBQ3JFO0lBQ0QsRUFBRSxDQUFDLENBQUMsbUJBQXdCLEtBQUssRUFBQyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7O1FBQ3RELE1BQU0sU0FBUyxHQUFHLFVBQVUsbUJBQVMsS0FBSyxFQUFDLENBQUM7UUFDNUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFBQyxNQUFNLENBQUMsU0FBUyxDQUFDO1NBQUU7S0FDdkM7SUFDRCxFQUFFLENBQUMsQ0FBQyxtQkFBd0IsS0FBSyxFQUFDLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7UUFDdkQsTUFBTSxTQUFTLEdBQUcsUUFBUSxtQkFBUyxLQUFLLEdBQUUsRUFBRSxDQUFDLENBQUM7UUFDOUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFBQyxNQUFNLENBQUMsU0FBUyxDQUFDO1NBQUU7S0FDdkM7SUFDRCxFQUFFLENBQUMsQ0FBQyxtQkFBd0IsS0FBSyxFQUFDLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7UUFDdkQsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7S0FDaEI7SUFDRCxFQUFFLENBQUMsQ0FBQyxDQUNBLG1CQUF3QixLQUFLLEVBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDO1FBQ2pELG1CQUF3QixLQUFLLEVBQUMsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQ25ELElBQUksQ0FBQyxtQkFBd0IsS0FBSyxFQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FDdEQsQ0FBQyxDQUFDLENBQUM7UUFDRCxNQUFNLENBQUMsQ0FBQyxDQUFDO0tBQ1Y7Q0FDRjs7Ozs7Ozs7O0FBUUQsTUFBTSxvQkFBb0IsTUFBTTtJQUM5QixNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sSUFBSSxPQUFPLE1BQU0sQ0FBQyxJQUFJLEtBQUssVUFBVSxDQUFDO0NBQ3REOzs7Ozs7Ozs7QUFRRCxNQUFNLHVCQUF1QixNQUFNO0lBQ2pDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxJQUFJLE9BQU8sTUFBTSxDQUFDLFNBQVMsS0FBSyxVQUFVLENBQUM7Q0FDM0Q7Ozs7Ozs7OztBQVFELE1BQU0scUJBQXFCLE1BQU07SUFDL0IsTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLENBQUM7Q0FDeEQ7Ozs7Ozs7OztBQVFELE1BQU0sdUJBQXVCLE1BQU07O0lBQ2pDLE1BQU0sVUFBVSxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7SUFDN0QsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUM7S0FBRTtJQUNwRCxPQUFPLENBQUMsS0FBSyxDQUFDLHlFQUF5RSxDQUFDLENBQUM7SUFDekYsTUFBTSxDQUFDLElBQUksVUFBVSxFQUFFLENBQUM7Q0FDekI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWtCRCxNQUFNLGtCQUFrQixJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssR0FBRyxLQUFLO0lBQ2hELEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7S0FBRTtJQUMxRCxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDcEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3BFLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7Q0FDeEI7Ozs7Ozs7Ozs7Ozs7QUFXRCxNQUFNLGNBQWMsTUFBTSxFQUFFLE1BQU07SUFDaEMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0NBQ3ZEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWJzdHJhY3RDb250cm9sLCBWYWxpZGF0aW9uRXJyb3JzIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgZnJvbSB9IGZyb20gJ3J4anMnO1xuXG4vKipcbiAqIFZhbGlkYXRvciB1dGlsaXR5IGZ1bmN0aW9uIGxpYnJhcnk6XG4gKlxuICogVmFsaWRhdG9yIGFuZCBlcnJvciB1dGlsaXRpZXM6XG4gKiAgIF9leGVjdXRlVmFsaWRhdG9ycywgX2V4ZWN1dGVBc3luY1ZhbGlkYXRvcnMsIF9tZXJnZU9iamVjdHMsIF9tZXJnZUVycm9yc1xuICpcbiAqIEluZGl2aWR1YWwgdmFsdWUgY2hlY2tpbmc6XG4gKiAgIGlzRGVmaW5lZCwgaGFzVmFsdWUsIGlzRW1wdHlcbiAqXG4gKiBJbmRpdmlkdWFsIHR5cGUgY2hlY2tpbmc6XG4gKiAgIGlzU3RyaW5nLCBpc051bWJlciwgaXNJbnRlZ2VyLCBpc0Jvb2xlYW4sIGlzRnVuY3Rpb24sIGlzT2JqZWN0LCBpc0FycmF5LFxuICogICBpc01hcCwgaXNTZXQsIGlzUHJvbWlzZSwgaXNPYnNlcnZhYmxlXG4gKlxuICogTXVsdGlwbGUgdHlwZSBjaGVja2luZyBhbmQgZml4aW5nOlxuICogICBnZXRUeXBlLCBpc1R5cGUsIGlzUHJpbWl0aXZlLCB0b0phdmFTY3JpcHRUeXBlLCB0b1NjaGVtYVR5cGUsXG4gKiAgIF90b1Byb21pc2UsIHRvT2JzZXJ2YWJsZVxuICpcbiAqIFV0aWxpdHkgZnVuY3Rpb25zOlxuICogICBpbkFycmF5LCB4b3JcbiAqXG4gKiBUeXBlc2NyaXB0IHR5cGVzIGFuZCBpbnRlcmZhY2VzOlxuICogICBTY2hlbWFQcmltaXRpdmVUeXBlLCBTY2hlbWFUeXBlLCBKYXZhU2NyaXB0UHJpbWl0aXZlVHlwZSwgSmF2YVNjcmlwdFR5cGUsXG4gKiAgIFByaW1pdGl2ZVZhbHVlLCBQbGFpbk9iamVjdCwgSVZhbGlkYXRvckZuLCBBc3luY0lWYWxpZGF0b3JGblxuICpcbiAqIE5vdGU6ICdJVmFsaWRhdG9yRm4nIGlzIHNob3J0IGZvciAnaW52ZXJ0YWJsZSB2YWxpZGF0b3IgZnVuY3Rpb24nLFxuICogICB3aGljaCBpcyBhIHZhbGlkYXRvciBmdW5jdGlvbnMgdGhhdCBhY2NlcHRzIGFuIG9wdGlvbmFsIHNlY29uZFxuICogICBhcmd1bWVudCB3aGljaCwgaWYgc2V0IHRvIFRSVUUsIGNhdXNlcyB0aGUgdmFsaWRhdG9yIHRvIHBlcmZvcm1cbiAqICAgdGhlIG9wcG9zaXRlIG9mIGl0cyBvcmlnaW5hbCBmdW5jdGlvbi5cbiAqL1xuXG5leHBvcnQgdHlwZSBTY2hlbWFQcmltaXRpdmVUeXBlID1cbiAgJ3N0cmluZycgfCAnbnVtYmVyJyB8ICdpbnRlZ2VyJyB8ICdib29sZWFuJyB8ICdudWxsJztcbmV4cG9ydCB0eXBlIFNjaGVtYVR5cGUgPVxuICAnc3RyaW5nJyB8ICdudW1iZXInIHwgJ2ludGVnZXInIHwgJ2Jvb2xlYW4nIHwgJ251bGwnIHwgJ29iamVjdCcgfCAnYXJyYXknO1xuZXhwb3J0IHR5cGUgSmF2YVNjcmlwdFByaW1pdGl2ZVR5cGUgPVxuICAnc3RyaW5nJyB8ICdudW1iZXInIHwgJ2Jvb2xlYW4nIHwgJ251bGwnIHwgJ3VuZGVmaW5lZCc7XG5leHBvcnQgdHlwZSBKYXZhU2NyaXB0VHlwZSA9XG4gICdzdHJpbmcnIHwgJ251bWJlcicgfCAnYm9vbGVhbicgfCAnbnVsbCcgfCAndW5kZWZpbmVkJyB8ICdvYmplY3QnIHwgJ2FycmF5JyB8XG4gICdtYXAnIHwgJ3NldCcgfCAnYXJndW1lbnRzJyB8ICdkYXRlJyB8ICdlcnJvcicgfCAnZnVuY3Rpb24nIHwgJ2pzb24nIHxcbiAgJ21hdGgnIHwgJ3JlZ2V4cCc7IC8vIE5vdGU6IHRoaXMgbGlzdCBpcyBpbmNvbXBsZXRlXG5leHBvcnQgdHlwZSBQcmltaXRpdmVWYWx1ZSA9IHN0cmluZyB8IG51bWJlciB8IGJvb2xlYW4gfCBudWxsIHwgdW5kZWZpbmVkO1xuZXhwb3J0IGludGVyZmFjZSBQbGFpbk9iamVjdCB7IFtrOiBzdHJpbmddOiBhbnk7IH1cblxuZXhwb3J0IHR5cGUgSVZhbGlkYXRvckZuID0gKGM6IEFic3RyYWN0Q29udHJvbCwgaT86IGJvb2xlYW4pID0+IFBsYWluT2JqZWN0O1xuZXhwb3J0IHR5cGUgQXN5bmNJVmFsaWRhdG9yRm4gPSAoYzogQWJzdHJhY3RDb250cm9sLCBpPzogYm9vbGVhbikgPT4gYW55O1xuXG4vKipcbiAqICdfZXhlY3V0ZVZhbGlkYXRvcnMnIHV0aWxpdHkgZnVuY3Rpb25cbiAqXG4gKiBWYWxpZGF0ZXMgYSBjb250cm9sIGFnYWluc3QgYW4gYXJyYXkgb2YgdmFsaWRhdG9ycywgYW5kIHJldHVybnNcbiAqIGFuIGFycmF5IG9mIHRoZSBzYW1lIGxlbmd0aCBjb250YWluaW5nIGEgY29tYmluYXRpb24gb2YgZXJyb3IgbWVzc2FnZXNcbiAqIChmcm9tIGludmFsaWQgdmFsaWRhdG9ycykgYW5kIG51bGwgdmFsdWVzIChmcm9tIHZhbGlkIHZhbGlkYXRvcnMpXG4gKlxuICogLy8gIHsgQWJzdHJhY3RDb250cm9sIH0gY29udHJvbCAtIGNvbnRyb2wgdG8gdmFsaWRhdGVcbiAqIC8vICB7IElWYWxpZGF0b3JGbltdIH0gdmFsaWRhdG9ycyAtIGFycmF5IG9mIHZhbGlkYXRvcnNcbiAqIC8vICB7IGJvb2xlYW4gfSBpbnZlcnQgLSBpbnZlcnQ/XG4gKiAvLyB7IFBsYWluT2JqZWN0W10gfSAtIGFycmF5IG9mIG51bGxzIGFuZCBlcnJvciBtZXNzYWdlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBfZXhlY3V0ZVZhbGlkYXRvcnMoY29udHJvbCwgdmFsaWRhdG9ycywgaW52ZXJ0ID0gZmFsc2UpIHtcbiAgcmV0dXJuIHZhbGlkYXRvcnMubWFwKHZhbGlkYXRvciA9PiB2YWxpZGF0b3IoY29udHJvbCwgaW52ZXJ0KSk7XG59XG5cbi8qKlxuICogJ19leGVjdXRlQXN5bmNWYWxpZGF0b3JzJyB1dGlsaXR5IGZ1bmN0aW9uXG4gKlxuICogVmFsaWRhdGVzIGEgY29udHJvbCBhZ2FpbnN0IGFuIGFycmF5IG9mIGFzeW5jIHZhbGlkYXRvcnMsIGFuZCByZXR1cm5zXG4gKiBhbiBhcnJheSBvZiBvYnNlcnZhYmUgcmVzdWx0cyBvZiB0aGUgc2FtZSBsZW5ndGggY29udGFpbmluZyBhIGNvbWJpbmF0aW9uIG9mXG4gKiBlcnJvciBtZXNzYWdlcyAoZnJvbSBpbnZhbGlkIHZhbGlkYXRvcnMpIGFuZCBudWxsIHZhbHVlcyAoZnJvbSB2YWxpZCBvbmVzKVxuICpcbiAqIC8vICB7IEFic3RyYWN0Q29udHJvbCB9IGNvbnRyb2wgLSBjb250cm9sIHRvIHZhbGlkYXRlXG4gKiAvLyAgeyBBc3luY0lWYWxpZGF0b3JGbltdIH0gdmFsaWRhdG9ycyAtIGFycmF5IG9mIGFzeW5jIHZhbGlkYXRvcnNcbiAqIC8vICB7IGJvb2xlYW4gfSBpbnZlcnQgLSBpbnZlcnQ/XG4gKiAvLyAgLSBhcnJheSBvZiBvYnNlcnZhYmxlIG51bGxzIGFuZCBlcnJvciBtZXNzYWdlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBfZXhlY3V0ZUFzeW5jVmFsaWRhdG9ycyhjb250cm9sLCB2YWxpZGF0b3JzLCBpbnZlcnQgPSBmYWxzZSkge1xuICByZXR1cm4gdmFsaWRhdG9ycy5tYXAodmFsaWRhdG9yID0+IHZhbGlkYXRvcihjb250cm9sLCBpbnZlcnQpKTtcbn1cblxuLyoqXG4gKiAnX21lcmdlT2JqZWN0cycgdXRpbGl0eSBmdW5jdGlvblxuICpcbiAqIFJlY3Vyc2l2ZWx5IE1lcmdlcyBvbmUgb3IgbW9yZSBvYmplY3RzIGludG8gYSBzaW5nbGUgb2JqZWN0IHdpdGggY29tYmluZWQga2V5cy5cbiAqIEF1dG9tYXRpY2FsbHkgZGV0ZWN0cyBhbmQgaWdub3JlcyBudWxsIGFuZCB1bmRlZmluZWQgaW5wdXRzLlxuICogQWxzbyBkZXRlY3RzIGR1cGxpY2F0ZWQgYm9vbGVhbiAnbm90JyBrZXlzIGFuZCBYT1JzIHRoZWlyIHZhbHVlcy5cbiAqXG4gKiAvLyAgeyBQbGFpbk9iamVjdFtdIH0gb2JqZWN0cyAtIG9uZSBvciBtb3JlIG9iamVjdHMgdG8gbWVyZ2VcbiAqIC8vIHsgUGxhaW5PYmplY3QgfSAtIG1lcmdlZCBvYmplY3RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIF9tZXJnZU9iamVjdHMoLi4ub2JqZWN0cykge1xuICBjb25zdCBtZXJnZWRPYmplY3Q6IFBsYWluT2JqZWN0ID0geyB9O1xuICBmb3IgKGNvbnN0IGN1cnJlbnRPYmplY3Qgb2Ygb2JqZWN0cykge1xuICAgIGlmIChpc09iamVjdChjdXJyZW50T2JqZWN0KSkge1xuICAgICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMoY3VycmVudE9iamVjdCkpIHtcbiAgICAgICAgY29uc3QgY3VycmVudFZhbHVlID0gY3VycmVudE9iamVjdFtrZXldO1xuICAgICAgICBjb25zdCBtZXJnZWRWYWx1ZSA9IG1lcmdlZE9iamVjdFtrZXldO1xuICAgICAgICBtZXJnZWRPYmplY3Rba2V5XSA9ICFpc0RlZmluZWQobWVyZ2VkVmFsdWUpID8gY3VycmVudFZhbHVlIDpcbiAgICAgICAgICBrZXkgPT09ICdub3QnICYmIGlzQm9vbGVhbihtZXJnZWRWYWx1ZSwgJ3N0cmljdCcpICYmXG4gICAgICAgICAgICBpc0Jvb2xlYW4oY3VycmVudFZhbHVlLCAnc3RyaWN0JykgPyB4b3IobWVyZ2VkVmFsdWUsIGN1cnJlbnRWYWx1ZSkgOlxuICAgICAgICAgIGdldFR5cGUobWVyZ2VkVmFsdWUpID09PSAnb2JqZWN0JyAmJiBnZXRUeXBlKGN1cnJlbnRWYWx1ZSkgPT09ICdvYmplY3QnID9cbiAgICAgICAgICAgIF9tZXJnZU9iamVjdHMobWVyZ2VkVmFsdWUsIGN1cnJlbnRWYWx1ZSkgOlxuICAgICAgICAgICAgY3VycmVudFZhbHVlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gbWVyZ2VkT2JqZWN0O1xufVxuXG4vKipcbiAqICdfbWVyZ2VFcnJvcnMnIHV0aWxpdHkgZnVuY3Rpb25cbiAqXG4gKiBNZXJnZXMgYW4gYXJyYXkgb2Ygb2JqZWN0cy5cbiAqIFVzZWQgZm9yIGNvbWJpbmluZyB0aGUgdmFsaWRhdG9yIGVycm9ycyByZXR1cm5lZCBmcm9tICdleGVjdXRlVmFsaWRhdG9ycydcbiAqXG4gKiAvLyAgeyBQbGFpbk9iamVjdFtdIH0gYXJyYXlPZkVycm9ycyAtIGFycmF5IG9mIG9iamVjdHNcbiAqIC8vIHsgUGxhaW5PYmplY3QgfSAtIG1lcmdlZCBvYmplY3QsIG9yIG51bGwgaWYgbm8gdXNhYmxlIGlucHV0IG9iamVjdGNzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBfbWVyZ2VFcnJvcnMoYXJyYXlPZkVycm9ycykge1xuICBjb25zdCBtZXJnZWRFcnJvcnMgPSBfbWVyZ2VPYmplY3RzKC4uLmFycmF5T2ZFcnJvcnMpO1xuICByZXR1cm4gaXNFbXB0eShtZXJnZWRFcnJvcnMpID8gbnVsbCA6IG1lcmdlZEVycm9ycztcbn1cblxuLyoqXG4gKiAnaXNEZWZpbmVkJyB1dGlsaXR5IGZ1bmN0aW9uXG4gKlxuICogQ2hlY2tzIGlmIGEgdmFyaWFibGUgY29udGFpbnMgYSB2YWx1ZSBvZiBhbnkgdHlwZS5cbiAqIFJldHVybnMgdHJ1ZSBldmVuIGZvciBvdGhlcndpc2UgJ2ZhbHNleScgdmFsdWVzIG9mIDAsICcnLCBhbmQgZmFsc2UuXG4gKlxuICogLy8gICB2YWx1ZSAtIHRoZSB2YWx1ZSB0byBjaGVja1xuICogLy8geyBib29sZWFuIH0gLSBmYWxzZSBpZiB1bmRlZmluZWQgb3IgbnVsbCwgb3RoZXJ3aXNlIHRydWVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzRGVmaW5lZCh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbDtcbn1cblxuLyoqXG4gKiAnaGFzVmFsdWUnIHV0aWxpdHkgZnVuY3Rpb25cbiAqXG4gKiBDaGVja3MgaWYgYSB2YXJpYWJsZSBjb250YWlucyBhIHZhbHVlLlxuICogUmV0dXJzIGZhbHNlIGZvciBudWxsLCB1bmRlZmluZWQsIG9yIGEgemVyby1sZW5ndGggc3RybmcsICcnLFxuICogb3RoZXJ3aXNlIHJldHVybnMgdHJ1ZS5cbiAqIChTdHJpY3RlciB0aGFuICdpc0RlZmluZWQnIGJlY2F1c2UgaXQgYWxzbyByZXR1cm5zIGZhbHNlIGZvciAnJyxcbiAqIHRob3VnaCBpdCBzdGlsIHJldHVybnMgdHJ1ZSBmb3Igb3RoZXJ3aXNlICdmYWxzZXknIHZhbHVlcyAwIGFuZCBmYWxzZS4pXG4gKlxuICogLy8gICB2YWx1ZSAtIHRoZSB2YWx1ZSB0byBjaGVja1xuICogLy8geyBib29sZWFuIH0gLSBmYWxzZSBpZiB1bmRlZmluZWQsIG51bGwsIG9yICcnLCBvdGhlcndpc2UgdHJ1ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gaGFzVmFsdWUodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwgJiYgdmFsdWUgIT09ICcnO1xufVxuXG4vKipcbiAqICdpc0VtcHR5JyB1dGlsaXR5IGZ1bmN0aW9uXG4gKlxuICogU2ltaWxhciB0byAhaGFzVmFsdWUsIGJ1dCBhbHNvIHJldHVybnMgdHJ1ZSBmb3IgZW1wdHkgYXJyYXlzIGFuZCBvYmplY3RzLlxuICpcbiAqIC8vICAgdmFsdWUgLSB0aGUgdmFsdWUgdG8gY2hlY2tcbiAqIC8vIHsgYm9vbGVhbiB9IC0gZmFsc2UgaWYgdW5kZWZpbmVkLCBudWxsLCBvciAnJywgb3RoZXJ3aXNlIHRydWVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzRW1wdHkodmFsdWUpIHtcbiAgaWYgKGlzQXJyYXkodmFsdWUpKSB7IHJldHVybiAhdmFsdWUubGVuZ3RoOyB9XG4gIGlmIChpc09iamVjdCh2YWx1ZSkpIHsgcmV0dXJuICFPYmplY3Qua2V5cyh2YWx1ZSkubGVuZ3RoOyB9XG4gIHJldHVybiB2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSAnJztcbn1cblxuLyoqXG4gKiAnaXNTdHJpbmcnIHV0aWxpdHkgZnVuY3Rpb25cbiAqXG4gKiBDaGVja3MgaWYgYSB2YWx1ZSBpcyBhIHN0cmluZy5cbiAqXG4gKiAvLyAgIHZhbHVlIC0gdGhlIHZhbHVlIHRvIGNoZWNrXG4gKiAvLyB7IGJvb2xlYW4gfSAtIHRydWUgaWYgc3RyaW5nLCBmYWxzZSBpZiBub3RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzU3RyaW5nKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnO1xufVxuXG4vKipcbiAqICdpc051bWJlcicgdXRpbGl0eSBmdW5jdGlvblxuICpcbiAqIENoZWNrcyBpZiBhIHZhbHVlIGlzIGEgcmVndWxhciBudW1iZXIsIG51bWVyaWMgc3RyaW5nLCBvciBKYXZhU2NyaXB0IERhdGUuXG4gKlxuICogLy8gICB2YWx1ZSAtIHRoZSB2YWx1ZSB0byBjaGVja1xuICogLy8gIHsgYW55ID0gZmFsc2UgfSBzdHJpY3QgLSBpZiB0cnV0aHksIGFsc28gY2hlY2tzIEphdmFTY3JpcHQgdHlvZVxuICogLy8geyBib29sZWFuIH0gLSB0cnVlIGlmIG51bWJlciwgZmFsc2UgaWYgbm90XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc051bWJlcih2YWx1ZSwgc3RyaWN0OiBhbnkgPSBmYWxzZSkge1xuICBpZiAoc3RyaWN0ICYmIHR5cGVvZiB2YWx1ZSAhPT0gJ251bWJlcicpIHsgcmV0dXJuIGZhbHNlOyB9XG4gIHJldHVybiAhaXNOYU4odmFsdWUpICYmIHZhbHVlICE9PSB2YWx1ZSAvIDA7XG59XG5cbi8qKlxuICogJ2lzSW50ZWdlcicgdXRpbGl0eSBmdW5jdGlvblxuICpcbiAqIENoZWNrcyBpZiBhIHZhbHVlIGlzIGFuIGludGVnZXIuXG4gKlxuICogLy8gICB2YWx1ZSAtIHRoZSB2YWx1ZSB0byBjaGVja1xuICogLy8gIHsgYW55ID0gZmFsc2UgfSBzdHJpY3QgLSBpZiB0cnV0aHksIGFsc28gY2hlY2tzIEphdmFTY3JpcHQgdHlvZVxuICogLy8ge2Jvb2xlYW4gfSAtIHRydWUgaWYgbnVtYmVyLCBmYWxzZSBpZiBub3RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzSW50ZWdlcih2YWx1ZSwgc3RyaWN0OiBhbnkgPSBmYWxzZSkge1xuICBpZiAoc3RyaWN0ICYmIHR5cGVvZiB2YWx1ZSAhPT0gJ251bWJlcicpIHsgcmV0dXJuIGZhbHNlOyB9XG4gIHJldHVybiAhaXNOYU4odmFsdWUpICYmICB2YWx1ZSAhPT0gdmFsdWUgLyAwICYmIHZhbHVlICUgMSA9PT0gMDtcbn1cblxuLyoqXG4gKiAnaXNCb29sZWFuJyB1dGlsaXR5IGZ1bmN0aW9uXG4gKlxuICogQ2hlY2tzIGlmIGEgdmFsdWUgaXMgYSBib29sZWFuLlxuICpcbiAqIC8vICAgdmFsdWUgLSB0aGUgdmFsdWUgdG8gY2hlY2tcbiAqIC8vICB7IGFueSA9IG51bGwgfSBvcHRpb24gLSBpZiAnc3RyaWN0JywgYWxzbyBjaGVja3MgSmF2YVNjcmlwdCB0eXBlXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIFRSVUUgb3IgRkFMU0UsIGNoZWNrcyBvbmx5IGZvciB0aGF0IHZhbHVlXG4gKiAvLyB7IGJvb2xlYW4gfSAtIHRydWUgaWYgYm9vbGVhbiwgZmFsc2UgaWYgbm90XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0Jvb2xlYW4odmFsdWUsIG9wdGlvbjogYW55ID0gbnVsbCkge1xuICBpZiAob3B0aW9uID09PSAnc3RyaWN0JykgeyByZXR1cm4gdmFsdWUgPT09IHRydWUgfHwgdmFsdWUgPT09IGZhbHNlOyB9XG4gIGlmIChvcHRpb24gPT09IHRydWUpIHtcbiAgICByZXR1cm4gdmFsdWUgPT09IHRydWUgfHwgdmFsdWUgPT09IDEgfHwgdmFsdWUgPT09ICd0cnVlJyB8fCB2YWx1ZSA9PT0gJzEnO1xuICB9XG4gIGlmIChvcHRpb24gPT09IGZhbHNlKSB7XG4gICAgcmV0dXJuIHZhbHVlID09PSBmYWxzZSB8fCB2YWx1ZSA9PT0gMCB8fCB2YWx1ZSA9PT0gJ2ZhbHNlJyB8fCB2YWx1ZSA9PT0gJzAnO1xuICB9XG4gIHJldHVybiB2YWx1ZSA9PT0gdHJ1ZSB8fCB2YWx1ZSA9PT0gMSB8fCB2YWx1ZSA9PT0gJ3RydWUnIHx8IHZhbHVlID09PSAnMScgfHxcbiAgICB2YWx1ZSA9PT0gZmFsc2UgfHwgdmFsdWUgPT09IDAgfHwgdmFsdWUgPT09ICdmYWxzZScgfHwgdmFsdWUgPT09ICcwJztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzRnVuY3Rpb24oaXRlbTogYW55KTogYm9vbGVhbiB7XG4gIHJldHVybiB0eXBlb2YgaXRlbSA9PT0gJ2Z1bmN0aW9uJztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzT2JqZWN0KGl0ZW06IGFueSk6IGJvb2xlYW4ge1xuICByZXR1cm4gaXRlbSAhPT0gbnVsbCAmJiB0eXBlb2YgaXRlbSA9PT0gJ29iamVjdCcgJiZcbiAgICBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoaXRlbSkgPT09ICdbb2JqZWN0IE9iamVjdF0nO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNBcnJheShpdGVtOiBhbnkpOiBib29sZWFuIHtcbiAgcmV0dXJuIEFycmF5LmlzQXJyYXkoaXRlbSkgfHxcbiAgICBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoaXRlbSkgPT09ICdbb2JqZWN0IEFycmF5XSc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0RhdGUoaXRlbTogYW55KTogYm9vbGVhbiB7XG4gIHJldHVybiB0eXBlb2YgaXRlbSA9PT0gJ29iamVjdCcgJiZcbiAgICBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoaXRlbSkgPT09ICdbb2JqZWN0IERhdGVdJztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzTWFwKGl0ZW06IGFueSk6IGJvb2xlYW4ge1xuICByZXR1cm4gdHlwZW9mIGl0ZW0gPT09ICdvYmplY3QnICYmXG4gICAgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGl0ZW0pID09PSAnW29iamVjdCBNYXBdJztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzU2V0KGl0ZW06IGFueSk6IGJvb2xlYW4ge1xuICByZXR1cm4gdHlwZW9mIGl0ZW0gPT09ICdvYmplY3QnICYmXG4gICAgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGl0ZW0pID09PSAnW29iamVjdCBTZXRdJztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzU3ltYm9sKGl0ZW06IGFueSk6IGJvb2xlYW4ge1xuICByZXR1cm4gdHlwZW9mIGl0ZW0gPT09ICdzeW1ib2wnO1xufVxuXG4vKipcbiAqICdnZXRUeXBlJyBmdW5jdGlvblxuICpcbiAqIERldGVjdHMgdGhlIEpTT04gU2NoZW1hIFR5cGUgb2YgYSB2YWx1ZS5cbiAqIEJ5IGRlZmF1bHQsIGRldGVjdHMgbnVtYmVycyBhbmQgaW50ZWdlcnMgZXZlbiBpZiBmb3JtYXR0ZWQgYXMgc3RyaW5ncy5cbiAqIChTbyBhbGwgaW50ZWdlcnMgYXJlIGFsc28gbnVtYmVycywgYW5kIGFueSBudW1iZXIgbWF5IGFsc28gYmUgYSBzdHJpbmcuKVxuICogSG93ZXZlciwgaXQgb25seSBkZXRlY3RzIHRydWUgYm9vbGVhbiB2YWx1ZXMgKHRvIGRldGVjdCBib29sZWFuIHZhbHVlc1xuICogaW4gbm9uLWJvb2xlYW4gZm9ybWF0cywgdXNlIGlzQm9vbGVhbigpIGluc3RlYWQpLlxuICpcbiAqIElmIHBhc3NlZCBhIHNlY29uZCBvcHRpb25hbCBwYXJhbWV0ZXIgb2YgJ3N0cmljdCcsIGl0IHdpbGwgb25seSBkZXRlY3RcbiAqIG51bWJlcnMgYW5kIGludGVnZXJzIGlmIHRoZXkgYXJlIGZvcm1hdHRlZCBhcyBKYXZhU2NyaXB0IG51bWJlcnMuXG4gKlxuICogRXhhbXBsZXM6XG4gKiBnZXRUeXBlKCcxMC41JykgPSAnbnVtYmVyJ1xuICogZ2V0VHlwZSgxMC41KSA9ICdudW1iZXInXG4gKiBnZXRUeXBlKCcxMCcpID0gJ2ludGVnZXInXG4gKiBnZXRUeXBlKDEwKSA9ICdpbnRlZ2VyJ1xuICogZ2V0VHlwZSgndHJ1ZScpID0gJ3N0cmluZydcbiAqIGdldFR5cGUodHJ1ZSkgPSAnYm9vbGVhbidcbiAqIGdldFR5cGUobnVsbCkgPSAnbnVsbCdcbiAqIGdldFR5cGUoeyB9KSA9ICdvYmplY3QnXG4gKiBnZXRUeXBlKFtdKSA9ICdhcnJheSdcbiAqXG4gKiBnZXRUeXBlKCcxMC41JywgJ3N0cmljdCcpID0gJ3N0cmluZydcbiAqIGdldFR5cGUoMTAuNSwgJ3N0cmljdCcpID0gJ251bWJlcidcbiAqIGdldFR5cGUoJzEwJywgJ3N0cmljdCcpID0gJ3N0cmluZydcbiAqIGdldFR5cGUoMTAsICdzdHJpY3QnKSA9ICdpbnRlZ2VyJ1xuICogZ2V0VHlwZSgndHJ1ZScsICdzdHJpY3QnKSA9ICdzdHJpbmcnXG4gKiBnZXRUeXBlKHRydWUsICdzdHJpY3QnKSA9ICdib29sZWFuJ1xuICpcbiAqIC8vICAgdmFsdWUgLSB2YWx1ZSB0byBjaGVja1xuICogLy8gIHsgYW55ID0gZmFsc2UgfSBzdHJpY3QgLSBpZiB0cnV0aHksIGFsc28gY2hlY2tzIEphdmFTY3JpcHQgdHlvZVxuICogLy8geyBTY2hlbWFUeXBlIH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFR5cGUodmFsdWUsIHN0cmljdDogYW55ID0gZmFsc2UpIHtcbiAgaWYgKCFpc0RlZmluZWQodmFsdWUpKSB7IHJldHVybiAnbnVsbCc7IH1cbiAgaWYgKGlzQXJyYXkodmFsdWUpKSB7IHJldHVybiAnYXJyYXknOyB9XG4gIGlmIChpc09iamVjdCh2YWx1ZSkpIHsgcmV0dXJuICdvYmplY3QnOyB9XG4gIGlmIChpc0Jvb2xlYW4odmFsdWUsICdzdHJpY3QnKSkgeyByZXR1cm4gJ2Jvb2xlYW4nOyB9XG4gIGlmIChpc0ludGVnZXIodmFsdWUsIHN0cmljdCkpIHsgcmV0dXJuICdpbnRlZ2VyJzsgfVxuICBpZiAoaXNOdW1iZXIodmFsdWUsIHN0cmljdCkpIHsgcmV0dXJuICdudW1iZXInOyB9XG4gIGlmIChpc1N0cmluZyh2YWx1ZSkgfHwgKCFzdHJpY3QgJiYgaXNEYXRlKHZhbHVlKSkpIHsgcmV0dXJuICdzdHJpbmcnOyB9XG4gIHJldHVybiBudWxsO1xufVxuXG4vKipcbiAqICdpc1R5cGUnIGZ1bmN0aW9uXG4gKlxuICogQ2hlY2tzIHdldGhlciBhbiBpbnB1dCAocHJvYmFibHkgc3RyaW5nKSB2YWx1ZSBjb250YWlucyBkYXRhIG9mXG4gKiBhIHNwZWNpZmllZCBKU09OIFNjaGVtYSB0eXBlXG4gKlxuICogLy8gIHsgUHJpbWl0aXZlVmFsdWUgfSB2YWx1ZSAtIHZhbHVlIHRvIGNoZWNrXG4gKiAvLyAgeyBTY2hlbWFQcmltaXRpdmVUeXBlIH0gdHlwZSAtIHR5cGUgdG8gY2hlY2tcbiAqIC8vIHsgYm9vbGVhbiB9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1R5cGUodmFsdWUsIHR5cGUpIHtcbiAgc3dpdGNoICh0eXBlKSB7XG4gICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgIHJldHVybiBpc1N0cmluZyh2YWx1ZSkgfHwgaXNEYXRlKHZhbHVlKTtcbiAgICBjYXNlICdudW1iZXInOlxuICAgICAgcmV0dXJuIGlzTnVtYmVyKHZhbHVlKTtcbiAgICBjYXNlICdpbnRlZ2VyJzpcbiAgICAgIHJldHVybiBpc0ludGVnZXIodmFsdWUpO1xuICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgcmV0dXJuIGlzQm9vbGVhbih2YWx1ZSk7XG4gICAgY2FzZSAnbnVsbCc6XG4gICAgICByZXR1cm4gIWhhc1ZhbHVlKHZhbHVlKTtcbiAgICBkZWZhdWx0OlxuICAgICAgY29uc29sZS5lcnJvcihgaXNUeXBlIGVycm9yOiBcIiR7dHlwZX1cIiBpcyBub3QgYSByZWNvZ25pemVkIHR5cGUuYCk7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgfVxufVxuXG4vKipcbiAqICdpc1ByaW1pdGl2ZScgZnVuY3Rpb25cbiAqXG4gKiBDaGVja3Mgd2V0aGVyIGFuIGlucHV0IHZhbHVlIGlzIGEgSmF2YVNjcmlwdCBwcmltaXRpdmUgdHlwZTpcbiAqIHN0cmluZywgbnVtYmVyLCBib29sZWFuLCBvciBudWxsLlxuICpcbiAqIC8vICAgdmFsdWUgLSB2YWx1ZSB0byBjaGVja1xuICogLy8geyBib29sZWFuIH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzUHJpbWl0aXZlKHZhbHVlKSB7XG4gIHJldHVybiAoaXNTdHJpbmcodmFsdWUpIHx8IGlzTnVtYmVyKHZhbHVlKSB8fFxuICAgIGlzQm9vbGVhbih2YWx1ZSwgJ3N0cmljdCcpIHx8IHZhbHVlID09PSBudWxsKTtcbn1cblxuLyoqXG4gKiAndG9KYXZhU2NyaXB0VHlwZScgZnVuY3Rpb25cbiAqXG4gKiBDb252ZXJ0cyBhbiBpbnB1dCAocHJvYmFibHkgc3RyaW5nKSB2YWx1ZSB0byBhIEphdmFTY3JpcHQgcHJpbWl0aXZlIHR5cGUgLVxuICogJ3N0cmluZycsICdudW1iZXInLCAnYm9vbGVhbicsIG9yICdudWxsJyAtIGJlZm9yZSBzdG9yaW5nIGluIGEgSlNPTiBvYmplY3QuXG4gKlxuICogRG9lcyBub3QgY29lcmNlIHZhbHVlcyAob3RoZXIgdGhhbiBudWxsKSwgYW5kIG9ubHkgY29udmVydHMgdGhlIHR5cGVzXG4gKiBvZiB2YWx1ZXMgdGhhdCB3b3VsZCBvdGhlcndpc2UgYmUgdmFsaWQuXG4gKlxuICogSWYgdGhlIG9wdGlvbmFsIHRoaXJkIHBhcmFtZXRlciAnc3RyaWN0SW50ZWdlcnMnIGlzIFRSVUUsIGFuZCB0aGVcbiAqIEpTT04gU2NoZW1hIHR5cGUgJ2ludGVnZXInIGlzIHNwZWNpZmllZCwgaXQgYWxzbyB2ZXJpZmllcyB0aGUgaW5wdXQgdmFsdWVcbiAqIGlzIGFuIGludGVnZXIgYW5kLCBpZiBpdCBpcywgcmV0dXJucyBpdCBhcyBhIEphdmVTY3JpcHQgbnVtYmVyLlxuICogSWYgJ3N0cmljdEludGVnZXJzJyBpcyBGQUxTRSAob3Igbm90IHNldCkgdGhlIHR5cGUgJ2ludGVnZXInIGlzIHRyZWF0ZWRcbiAqIGV4YWN0bHkgdGhlIHNhbWUgYXMgJ251bWJlcicsIGFuZCBhbGxvd3MgZGVjaW1hbHMuXG4gKlxuICogVmFsaWQgRXhhbXBsZXM6XG4gKiB0b0phdmFTY3JpcHRUeXBlKCcxMCcsICAgJ251bWJlcicgKSA9IDEwICAgLy8gJzEwJyAgIGlzIGEgbnVtYmVyXG4gKiB0b0phdmFTY3JpcHRUeXBlKCcxMCcsICAgJ2ludGVnZXInKSA9IDEwICAgLy8gJzEwJyAgIGlzIGFsc28gYW4gaW50ZWdlclxuICogdG9KYXZhU2NyaXB0VHlwZSggMTAsICAgICdpbnRlZ2VyJykgPSAxMCAgIC8vICAxMCAgICBpcyBzdGlsbCBhbiBpbnRlZ2VyXG4gKiB0b0phdmFTY3JpcHRUeXBlKCAxMCwgICAgJ3N0cmluZycgKSA9ICcxMCcgLy8gIDEwICAgIGNhbiBiZSBtYWRlIGludG8gYSBzdHJpbmdcbiAqIHRvSmF2YVNjcmlwdFR5cGUoJzEwLjUnLCAnbnVtYmVyJyApID0gMTAuNSAvLyAnMTAuNScgaXMgYSBudW1iZXJcbiAqXG4gKiBJbnZhbGlkIEV4YW1wbGVzOlxuICogdG9KYXZhU2NyaXB0VHlwZSgnMTAuNScsICdpbnRlZ2VyJykgPSBudWxsIC8vICcxMC41JyBpcyBub3QgYW4gaW50ZWdlclxuICogdG9KYXZhU2NyaXB0VHlwZSggMTAuNSwgICdpbnRlZ2VyJykgPSBudWxsIC8vICAxMC41ICBpcyBzdGlsbCBub3QgYW4gaW50ZWdlclxuICpcbiAqIC8vICB7IFByaW1pdGl2ZVZhbHVlIH0gdmFsdWUgLSB2YWx1ZSB0byBjb252ZXJ0XG4gKiAvLyAgeyBTY2hlbWFQcmltaXRpdmVUeXBlIHwgU2NoZW1hUHJpbWl0aXZlVHlwZVtdIH0gdHlwZXMgLSB0eXBlcyB0byBjb252ZXJ0IHRvXG4gKiAvLyAgeyBib29sZWFuID0gZmFsc2UgfSBzdHJpY3RJbnRlZ2VycyAtIGlmIEZBTFNFLCB0cmVhdCBpbnRlZ2VycyBhcyBudW1iZXJzXG4gKiAvLyB7IFByaW1pdGl2ZVZhbHVlIH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRvSmF2YVNjcmlwdFR5cGUodmFsdWUsIHR5cGVzLCBzdHJpY3RJbnRlZ2VycyA9IHRydWUpICB7XG4gIGlmICghaXNEZWZpbmVkKHZhbHVlKSkgeyByZXR1cm4gbnVsbDsgfVxuICBpZiAoaXNTdHJpbmcodHlwZXMpKSB7IHR5cGVzID0gW3R5cGVzXTsgfVxuICBpZiAoc3RyaWN0SW50ZWdlcnMgJiYgaW5BcnJheSgnaW50ZWdlcicsIHR5cGVzKSkge1xuICAgIGlmIChpc0ludGVnZXIodmFsdWUsICdzdHJpY3QnKSkgeyByZXR1cm4gdmFsdWU7IH1cbiAgICBpZiAoaXNJbnRlZ2VyKHZhbHVlKSkgeyByZXR1cm4gcGFyc2VJbnQodmFsdWUsIDEwKTsgfVxuICB9XG4gIGlmIChpbkFycmF5KCdudW1iZXInLCB0eXBlcykgfHwgKCFzdHJpY3RJbnRlZ2VycyAmJiBpbkFycmF5KCdpbnRlZ2VyJywgdHlwZXMpKSkge1xuICAgIGlmIChpc051bWJlcih2YWx1ZSwgJ3N0cmljdCcpKSB7IHJldHVybiB2YWx1ZTsgfVxuICAgIGlmIChpc051bWJlcih2YWx1ZSkpIHsgcmV0dXJuIHBhcnNlRmxvYXQodmFsdWUpOyB9XG4gIH1cbiAgaWYgKGluQXJyYXkoJ3N0cmluZycsIHR5cGVzKSkge1xuICAgIGlmIChpc1N0cmluZyh2YWx1ZSkpIHsgcmV0dXJuIHZhbHVlOyB9XG4gICAgLy8gSWYgdmFsdWUgaXMgYSBkYXRlLCBhbmQgdHlwZXMgaW5jbHVkZXMgJ3N0cmluZycsXG4gICAgLy8gY29udmVydCB0aGUgZGF0ZSB0byBhIHN0cmluZ1xuICAgIGlmIChpc0RhdGUodmFsdWUpKSB7IHJldHVybiB2YWx1ZS50b0lTT1N0cmluZygpLnNsaWNlKDAsIDEwKTsgfVxuICAgIGlmIChpc051bWJlcih2YWx1ZSkpIHsgcmV0dXJuIHZhbHVlLnRvU3RyaW5nKCk7IH1cbiAgfVxuICAvLyBJZiB2YWx1ZSBpcyBhIGRhdGUsIGFuZCB0eXBlcyBpbmNsdWRlcyAnaW50ZWdlcicgb3IgJ251bWJlcicsXG4gIC8vIGJ1dCBub3QgJ3N0cmluZycsIGNvbnZlcnQgdGhlIGRhdGUgdG8gYSBudW1iZXJcbiAgaWYgKGlzRGF0ZSh2YWx1ZSkgJiYgKGluQXJyYXkoJ2ludGVnZXInLCB0eXBlcykgfHwgaW5BcnJheSgnbnVtYmVyJywgdHlwZXMpKSkge1xuICAgIHJldHVybiB2YWx1ZS5nZXRUaW1lKCk7XG4gIH1cbiAgaWYgKGluQXJyYXkoJ2Jvb2xlYW4nLCB0eXBlcykpIHtcbiAgICBpZiAoaXNCb29sZWFuKHZhbHVlLCB0cnVlKSkgeyByZXR1cm4gdHJ1ZTsgfVxuICAgIGlmIChpc0Jvb2xlYW4odmFsdWUsIGZhbHNlKSkgeyByZXR1cm4gZmFsc2U7IH1cbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cblxuLyoqXG4gKiAndG9TY2hlbWFUeXBlJyBmdW5jdGlvblxuICpcbiAqIENvbnZlcnRzIGFuIGlucHV0IChwcm9iYWJseSBzdHJpbmcpIHZhbHVlIHRvIHRoZSBcImJlc3RcIiBKYXZhU2NyaXB0XG4gKiBlcXVpdmFsZW50IGF2YWlsYWJsZSBmcm9tIGFuIGFsbG93ZWQgbGlzdCBvZiBKU09OIFNjaGVtYSB0eXBlcywgd2hpY2ggbWF5XG4gKiBjb250YWluICdzdHJpbmcnLCAnbnVtYmVyJywgJ2ludGVnZXInLCAnYm9vbGVhbicsIGFuZC9vciAnbnVsbCcuXG4gKiBJZiBuZWNzc2FyeSwgaXQgZG9lcyBwcm9ncmVzc2l2ZWx5IGFncmVzc2l2ZSB0eXBlIGNvZXJzaW9uLlxuICogSXQgd2lsbCBub3QgcmV0dXJuIG51bGwgdW5sZXNzIG51bGwgaXMgaW4gdGhlIGxpc3Qgb2YgYWxsb3dlZCB0eXBlcy5cbiAqXG4gKiBOdW1iZXIgY29udmVyc2lvbiBleGFtcGxlczpcbiAqIHRvU2NoZW1hVHlwZSgnMTAnLCBbJ251bWJlcicsJ2ludGVnZXInLCdzdHJpbmcnXSkgPSAxMCAvLyBpbnRlZ2VyXG4gKiB0b1NjaGVtYVR5cGUoJzEwJywgWydudW1iZXInLCdzdHJpbmcnXSkgPSAxMCAvLyBudW1iZXJcbiAqIHRvU2NoZW1hVHlwZSgnMTAnLCBbJ3N0cmluZyddKSA9ICcxMCcgLy8gc3RyaW5nXG4gKiB0b1NjaGVtYVR5cGUoJzEwLjUnLCBbJ251bWJlcicsJ2ludGVnZXInLCdzdHJpbmcnXSkgPSAxMC41IC8vIG51bWJlclxuICogdG9TY2hlbWFUeXBlKCcxMC41JywgWydpbnRlZ2VyJywnc3RyaW5nJ10pID0gJzEwLjUnIC8vIHN0cmluZ1xuICogdG9TY2hlbWFUeXBlKCcxMC41JywgWydpbnRlZ2VyJ10pID0gMTAgLy8gaW50ZWdlclxuICogdG9TY2hlbWFUeXBlKDEwLjUsIFsnbnVsbCcsJ2Jvb2xlYW4nLCdzdHJpbmcnXSkgPSAnMTAuNScgLy8gc3RyaW5nXG4gKiB0b1NjaGVtYVR5cGUoMTAuNSwgWydudWxsJywnYm9vbGVhbiddKSA9IHRydWUgLy8gYm9vbGVhblxuICpcbiAqIFN0cmluZyBjb252ZXJzaW9uIGV4YW1wbGVzOlxuICogdG9TY2hlbWFUeXBlKCcxLjV4JywgWydib29sZWFuJywnbnVtYmVyJywnaW50ZWdlcicsJ3N0cmluZyddKSA9ICcxLjV4JyAvLyBzdHJpbmdcbiAqIHRvU2NoZW1hVHlwZSgnMS41eCcsIFsnYm9vbGVhbicsJ251bWJlcicsJ2ludGVnZXInXSkgPSAnMS41JyAvLyBudW1iZXJcbiAqIHRvU2NoZW1hVHlwZSgnMS41eCcsIFsnYm9vbGVhbicsJ2ludGVnZXInXSkgPSAnMScgLy8gaW50ZWdlclxuICogdG9TY2hlbWFUeXBlKCcxLjV4JywgWydib29sZWFuJ10pID0gdHJ1ZSAvLyBib29sZWFuXG4gKiB0b1NjaGVtYVR5cGUoJ3h5eicsIFsnbnVtYmVyJywnaW50ZWdlcicsJ2Jvb2xlYW4nLCdudWxsJ10pID0gdHJ1ZSAvLyBib29sZWFuXG4gKiB0b1NjaGVtYVR5cGUoJ3h5eicsIFsnbnVtYmVyJywnaW50ZWdlcicsJ251bGwnXSkgPSBudWxsIC8vIG51bGxcbiAqIHRvU2NoZW1hVHlwZSgneHl6JywgWydudW1iZXInLCdpbnRlZ2VyJ10pID0gMCAvLyBudW1iZXJcbiAqXG4gKiBCb29sZWFuIGNvbnZlcnNpb24gZXhhbXBsZXM6XG4gKiB0b1NjaGVtYVR5cGUoJzEnLCBbJ2ludGVnZXInLCdudW1iZXInLCdzdHJpbmcnLCdib29sZWFuJ10pID0gMSAvLyBpbnRlZ2VyXG4gKiB0b1NjaGVtYVR5cGUoJzEnLCBbJ251bWJlcicsJ3N0cmluZycsJ2Jvb2xlYW4nXSkgPSAxIC8vIG51bWJlclxuICogdG9TY2hlbWFUeXBlKCcxJywgWydzdHJpbmcnLCdib29sZWFuJ10pID0gJzEnIC8vIHN0cmluZ1xuICogdG9TY2hlbWFUeXBlKCcxJywgWydib29sZWFuJ10pID0gdHJ1ZSAvLyBib29sZWFuXG4gKiB0b1NjaGVtYVR5cGUoJ3RydWUnLCBbJ251bWJlcicsJ3N0cmluZycsJ2Jvb2xlYW4nXSkgPSAndHJ1ZScgLy8gc3RyaW5nXG4gKiB0b1NjaGVtYVR5cGUoJ3RydWUnLCBbJ2Jvb2xlYW4nXSkgPSB0cnVlIC8vIGJvb2xlYW5cbiAqIHRvU2NoZW1hVHlwZSgndHJ1ZScsIFsnbnVtYmVyJ10pID0gMCAvLyBudW1iZXJcbiAqIHRvU2NoZW1hVHlwZSh0cnVlLCBbJ251bWJlcicsJ3N0cmluZycsJ2Jvb2xlYW4nXSkgPSB0cnVlIC8vIGJvb2xlYW5cbiAqIHRvU2NoZW1hVHlwZSh0cnVlLCBbJ251bWJlcicsJ3N0cmluZyddKSA9ICd0cnVlJyAvLyBzdHJpbmdcbiAqIHRvU2NoZW1hVHlwZSh0cnVlLCBbJ251bWJlciddKSA9IDEgLy8gbnVtYmVyXG4gKlxuICogLy8gIHsgUHJpbWl0aXZlVmFsdWUgfSB2YWx1ZSAtIHZhbHVlIHRvIGNvbnZlcnRcbiAqIC8vICB7IFNjaGVtYVByaW1pdGl2ZVR5cGUgfCBTY2hlbWFQcmltaXRpdmVUeXBlW10gfSB0eXBlcyAtIGFsbG93ZWQgdHlwZXMgdG8gY29udmVydCB0b1xuICogLy8geyBQcmltaXRpdmVWYWx1ZSB9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0b1NjaGVtYVR5cGUodmFsdWUsIHR5cGVzKSB7XG4gIGlmICghaXNBcnJheSg8U2NoZW1hUHJpbWl0aXZlVHlwZT50eXBlcykpIHtcbiAgICB0eXBlcyA9IDxTY2hlbWFQcmltaXRpdmVUeXBlW10+W3R5cGVzXTtcbiAgfVxuICBpZiAoKDxTY2hlbWFQcmltaXRpdmVUeXBlW10+dHlwZXMpLmluY2x1ZGVzKCdudWxsJykgJiYgIWhhc1ZhbHVlKHZhbHVlKSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIGlmICgoPFNjaGVtYVByaW1pdGl2ZVR5cGVbXT50eXBlcykuaW5jbHVkZXMoJ2Jvb2xlYW4nKSAmJiAhaXNCb29sZWFuKHZhbHVlLCAnc3RyaWN0JykpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbiAgaWYgKCg8U2NoZW1hUHJpbWl0aXZlVHlwZVtdPnR5cGVzKS5pbmNsdWRlcygnaW50ZWdlcicpKSB7XG4gICAgY29uc3QgdGVzdFZhbHVlID0gdG9KYXZhU2NyaXB0VHlwZSh2YWx1ZSwgJ2ludGVnZXInKTtcbiAgICBpZiAodGVzdFZhbHVlICE9PSBudWxsKSB7IHJldHVybiArdGVzdFZhbHVlOyB9XG4gIH1cbiAgaWYgKCg8U2NoZW1hUHJpbWl0aXZlVHlwZVtdPnR5cGVzKS5pbmNsdWRlcygnbnVtYmVyJykpIHtcbiAgICBjb25zdCB0ZXN0VmFsdWUgPSB0b0phdmFTY3JpcHRUeXBlKHZhbHVlLCAnbnVtYmVyJyk7XG4gICAgaWYgKHRlc3RWYWx1ZSAhPT0gbnVsbCkgeyByZXR1cm4gK3Rlc3RWYWx1ZTsgfVxuICB9XG4gIGlmIChcbiAgICAoaXNTdHJpbmcodmFsdWUpIHx8IGlzTnVtYmVyKHZhbHVlLCAnc3RyaWN0JykpICYmXG4gICAgKDxTY2hlbWFQcmltaXRpdmVUeXBlW10+dHlwZXMpLmluY2x1ZGVzKCdzdHJpbmcnKVxuICApIHsgLy8gQ29udmVydCBudW1iZXIgdG8gc3RyaW5nXG4gICAgcmV0dXJuIHRvSmF2YVNjcmlwdFR5cGUodmFsdWUsICdzdHJpbmcnKTtcbiAgfVxuICBpZiAoKDxTY2hlbWFQcmltaXRpdmVUeXBlW10+dHlwZXMpLmluY2x1ZGVzKCdib29sZWFuJykgJiYgaXNCb29sZWFuKHZhbHVlKSkge1xuICAgIHJldHVybiB0b0phdmFTY3JpcHRUeXBlKHZhbHVlLCAnYm9vbGVhbicpO1xuICB9XG4gIGlmICgoPFNjaGVtYVByaW1pdGl2ZVR5cGVbXT50eXBlcykuaW5jbHVkZXMoJ3N0cmluZycpKSB7IC8vIENvbnZlcnQgbnVsbCAmIGJvb2xlYW4gdG8gc3RyaW5nXG4gICAgaWYgKHZhbHVlID09PSBudWxsKSB7IHJldHVybiAnJzsgfVxuICAgIGNvbnN0IHRlc3RWYWx1ZSA9IHRvSmF2YVNjcmlwdFR5cGUodmFsdWUsICdzdHJpbmcnKTtcbiAgICBpZiAodGVzdFZhbHVlICE9PSBudWxsKSB7IHJldHVybiB0ZXN0VmFsdWU7IH1cbiAgfVxuICBpZiAoKFxuICAgICg8U2NoZW1hUHJpbWl0aXZlVHlwZVtdPnR5cGVzKS5pbmNsdWRlcygnbnVtYmVyJykgfHxcbiAgICAoPFNjaGVtYVByaW1pdGl2ZVR5cGVbXT50eXBlcykuaW5jbHVkZXMoJ2ludGVnZXInKSlcbiAgKSB7XG4gICAgaWYgKHZhbHVlID09PSB0cnVlKSB7IHJldHVybiAxOyB9IC8vIENvbnZlcnQgYm9vbGVhbiAmIG51bGwgdG8gbnVtYmVyXG4gICAgaWYgKHZhbHVlID09PSBmYWxzZSB8fCB2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gJycpIHsgcmV0dXJuIDA7IH1cbiAgfVxuICBpZiAoKDxTY2hlbWFQcmltaXRpdmVUeXBlW10+dHlwZXMpLmluY2x1ZGVzKCdudW1iZXInKSkgeyAvLyBDb252ZXJ0IG1peGVkIHN0cmluZyB0byBudW1iZXJcbiAgICBjb25zdCB0ZXN0VmFsdWUgPSBwYXJzZUZsb2F0KDxzdHJpbmc+dmFsdWUpO1xuICAgIGlmICghIXRlc3RWYWx1ZSkgeyByZXR1cm4gdGVzdFZhbHVlOyB9XG4gIH1cbiAgaWYgKCg8U2NoZW1hUHJpbWl0aXZlVHlwZVtdPnR5cGVzKS5pbmNsdWRlcygnaW50ZWdlcicpKSB7IC8vIENvbnZlcnQgc3RyaW5nIG9yIG51bWJlciB0byBpbnRlZ2VyXG4gICAgY29uc3QgdGVzdFZhbHVlID0gcGFyc2VJbnQoPHN0cmluZz52YWx1ZSwgMTApO1xuICAgIGlmICghIXRlc3RWYWx1ZSkgeyByZXR1cm4gdGVzdFZhbHVlOyB9XG4gIH1cbiAgaWYgKCg8U2NoZW1hUHJpbWl0aXZlVHlwZVtdPnR5cGVzKS5pbmNsdWRlcygnYm9vbGVhbicpKSB7IC8vIENvbnZlcnQgYW55dGhpbmcgdG8gYm9vbGVhblxuICAgIHJldHVybiAhIXZhbHVlO1xuICB9XG4gIGlmICgoXG4gICAgICAoPFNjaGVtYVByaW1pdGl2ZVR5cGVbXT50eXBlcykuaW5jbHVkZXMoJ251bWJlcicpIHx8XG4gICAgICAoPFNjaGVtYVByaW1pdGl2ZVR5cGVbXT50eXBlcykuaW5jbHVkZXMoJ2ludGVnZXInKVxuICAgICkgJiYgISg8U2NoZW1hUHJpbWl0aXZlVHlwZVtdPnR5cGVzKS5pbmNsdWRlcygnbnVsbCcpXG4gICkge1xuICAgIHJldHVybiAwOyAvLyBJZiBudWxsIG5vdCBhbGxvd2VkLCByZXR1cm4gMCBmb3Igbm9uLWNvbnZlcnRhYmxlIHZhbHVlc1xuICB9XG59XG5cbi8qKlxuICogJ2lzUHJvbWlzZScgZnVuY3Rpb25cbiAqXG4gKiAvLyAgIG9iamVjdFxuICogLy8geyBib29sZWFuIH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzUHJvbWlzZShvYmplY3QpOiBvYmplY3QgaXMgUHJvbWlzZTxhbnk+IHtcbiAgcmV0dXJuICEhb2JqZWN0ICYmIHR5cGVvZiBvYmplY3QudGhlbiA9PT0gJ2Z1bmN0aW9uJztcbn1cblxuLyoqXG4gKiAnaXNPYnNlcnZhYmxlJyBmdW5jdGlvblxuICpcbiAqIC8vICAgb2JqZWN0XG4gKiAvLyB7IGJvb2xlYW4gfVxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNPYnNlcnZhYmxlKG9iamVjdCk6IG9iamVjdCBpcyBPYnNlcnZhYmxlPGFueT4ge1xuICByZXR1cm4gISFvYmplY3QgJiYgdHlwZW9mIG9iamVjdC5zdWJzY3JpYmUgPT09ICdmdW5jdGlvbic7XG59XG5cbi8qKlxuICogJ190b1Byb21pc2UnIGZ1bmN0aW9uXG4gKlxuICogLy8gIHsgb2JqZWN0IH0gb2JqZWN0XG4gKiAvLyB7IFByb21pc2U8YW55PiB9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBfdG9Qcm9taXNlKG9iamVjdCk6IFByb21pc2U8YW55PiB7XG4gIHJldHVybiBpc1Byb21pc2Uob2JqZWN0KSA/IG9iamVjdCA6IG9iamVjdC50b1Byb21pc2UoKTtcbn1cblxuLyoqXG4gKiAndG9PYnNlcnZhYmxlJyBmdW5jdGlvblxuICpcbiAqIC8vICB7IG9iamVjdCB9IG9iamVjdFxuICogLy8geyBPYnNlcnZhYmxlPGFueT4gfVxuICovXG5leHBvcnQgZnVuY3Rpb24gdG9PYnNlcnZhYmxlKG9iamVjdCk6IE9ic2VydmFibGU8YW55PiB7XG4gIGNvbnN0IG9ic2VydmFibGUgPSBpc1Byb21pc2Uob2JqZWN0KSA/IGZyb20ob2JqZWN0KSA6IG9iamVjdDtcbiAgaWYgKGlzT2JzZXJ2YWJsZShvYnNlcnZhYmxlKSkgeyByZXR1cm4gb2JzZXJ2YWJsZTsgfVxuICBjb25zb2xlLmVycm9yKCd0b09ic2VydmFibGUgZXJyb3I6IEV4cGVjdGVkIHZhbGlkYXRvciB0byByZXR1cm4gUHJvbWlzZSBvciBPYnNlcnZhYmxlLicpO1xuICByZXR1cm4gbmV3IE9ic2VydmFibGUoKTtcbn1cblxuLyoqXG4gKiAnaW5BcnJheScgZnVuY3Rpb25cbiAqXG4gKiBTZWFyY2hlcyBhbiBhcnJheSBmb3IgYW4gaXRlbSwgb3Igb25lIG9mIGEgbGlzdCBvZiBpdGVtcywgYW5kIHJldHVybnMgdHJ1ZVxuICogYXMgc29vbiBhcyBhIG1hdGNoIGlzIGZvdW5kLCBvciBmYWxzZSBpZiBubyBtYXRjaC5cbiAqXG4gKiBJZiB0aGUgb3B0aW9uYWwgdGhpcmQgcGFyYW1ldGVyIGFsbEluIGlzIHNldCB0byBUUlVFLCBhbmQgdGhlIGl0ZW0gdG8gZmluZFxuICogaXMgYW4gYXJyYXksIHRoZW4gdGhlIGZ1bmN0aW9uIHJldHVybnMgdHJ1ZSBvbmx5IGlmIGFsbCBlbGVtZW50cyBmcm9tIGl0ZW1cbiAqIGFyZSBmb3VuZCBpbiB0aGUgYXJyYXkgbGlzdCwgYW5kIGZhbHNlIGlmIGFueSBlbGVtZW50IGlzIG5vdCBmb3VuZC4gSWYgdGhlXG4gKiBpdGVtIHRvIGZpbmQgaXMgbm90IGFuIGFycmF5LCBzZXR0aW5nIGFsbEluIHRvIFRSVUUgaGFzIG5vIGVmZmVjdC5cbiAqXG4gKiAvLyAgeyBhbnl8YW55W10gfSBpdGVtIC0gdGhlIGl0ZW0gdG8gc2VhcmNoIGZvclxuICogLy8gICBhcnJheSAtIHRoZSBhcnJheSB0byBzZWFyY2hcbiAqIC8vICB7IGJvb2xlYW4gPSBmYWxzZSB9IGFsbEluIC0gaWYgVFJVRSwgYWxsIGl0ZW1zIG11c3QgYmUgaW4gYXJyYXlcbiAqIC8vIHsgYm9vbGVhbiB9IC0gdHJ1ZSBpZiBpdGVtKHMpIGluIGFycmF5LCBmYWxzZSBvdGhlcndpc2VcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGluQXJyYXkoaXRlbSwgYXJyYXksIGFsbEluID0gZmFsc2UpIHtcbiAgaWYgKCFpc0RlZmluZWQoaXRlbSkgfHwgIWlzQXJyYXkoYXJyYXkpKSB7IHJldHVybiBmYWxzZTsgfVxuICByZXR1cm4gaXNBcnJheShpdGVtKSA/XG4gICAgaXRlbVthbGxJbiA/ICdldmVyeScgOiAnc29tZSddKHN1Ykl0ZW0gPT4gYXJyYXkuaW5jbHVkZXMoc3ViSXRlbSkpIDpcbiAgICBhcnJheS5pbmNsdWRlcyhpdGVtKTtcbn1cblxuLyoqXG4gKiAneG9yJyB1dGlsaXR5IGZ1bmN0aW9uIC0gZXhjbHVzaXZlIG9yXG4gKlxuICogUmV0dXJucyB0cnVlIGlmIGV4YWN0bHkgb25lIG9mIHR3byB2YWx1ZXMgaXMgdHJ1dGh5LlxuICpcbiAqIC8vICAgdmFsdWUxIC0gZmlyc3QgdmFsdWUgdG8gY2hlY2tcbiAqIC8vICAgdmFsdWUyIC0gc2Vjb25kIHZhbHVlIHRvIGNoZWNrXG4gKiAvLyB7IGJvb2xlYW4gfSAtIHRydWUgaWYgZXhhY3RseSBvbmUgaW5wdXQgdmFsdWUgaXMgdHJ1dGh5LCBmYWxzZSBpZiBub3RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHhvcih2YWx1ZTEsIHZhbHVlMikge1xuICByZXR1cm4gKCEhdmFsdWUxICYmICF2YWx1ZTIpIHx8ICghdmFsdWUxICYmICEhdmFsdWUyKTtcbn1cbiJdfQ==