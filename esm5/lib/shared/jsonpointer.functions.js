/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { isDefined, isEmpty, isObject, isArray, isMap, isNumber, isString } from './validator.functions';
import { hasOwn, copy } from './utility.functions';
/** @typedef {?} */
var Pointer;
export { Pointer };
var JsonPointer = /** @class */ (function () {
    function JsonPointer() {
    }
    /**
     * 'get' function
     *
     * Uses a JSON Pointer to retrieve a value from an object.
     *
     * //  { object } object - Object to get value from
     * //  { Pointer } pointer - JSON Pointer (string or array)
     * //  { number = 0 } startSlice - Zero-based index of first Pointer key to use
     * //  { number } endSlice - Zero-based index of last Pointer key to use
     * //  { boolean = false } getBoolean - Return only true or false?
     * //  { boolean = false } errors - Show error if not found?
     * // { object } - Located value (or true or false if getBoolean = true)
     */
    /**
     * 'get' function
     *
     * Uses a JSON Pointer to retrieve a value from an object.
     *
     * //  { object } object - Object to get value from
     * //  { Pointer } pointer - JSON Pointer (string or array)
     * //  { number = 0 } startSlice - Zero-based index of first Pointer key to use
     * //  { number } endSlice - Zero-based index of last Pointer key to use
     * //  { boolean = false } getBoolean - Return only true or false?
     * //  { boolean = false } errors - Show error if not found?
     * // { object } - Located value (or true or false if getBoolean = true)
     * @param {?} object
     * @param {?} pointer
     * @param {?=} startSlice
     * @param {?=} endSlice
     * @param {?=} getBoolean
     * @param {?=} errors
     * @return {?}
     */
    JsonPointer.get = /**
     * 'get' function
     *
     * Uses a JSON Pointer to retrieve a value from an object.
     *
     * //  { object } object - Object to get value from
     * //  { Pointer } pointer - JSON Pointer (string or array)
     * //  { number = 0 } startSlice - Zero-based index of first Pointer key to use
     * //  { number } endSlice - Zero-based index of last Pointer key to use
     * //  { boolean = false } getBoolean - Return only true or false?
     * //  { boolean = false } errors - Show error if not found?
     * // { object } - Located value (or true or false if getBoolean = true)
     * @param {?} object
     * @param {?} pointer
     * @param {?=} startSlice
     * @param {?=} endSlice
     * @param {?=} getBoolean
     * @param {?=} errors
     * @return {?}
     */
    function (object, pointer, startSlice, endSlice, getBoolean, errors) {
        if (startSlice === void 0) { startSlice = 0; }
        if (endSlice === void 0) { endSlice = null; }
        if (getBoolean === void 0) { getBoolean = false; }
        if (errors === void 0) { errors = false; }
        if (object === null) {
            return getBoolean ? false : undefined;
        }
        /** @type {?} */
        var keyArray = this.parse(pointer, errors);
        if (typeof object === 'object' && keyArray !== null) {
            /** @type {?} */
            var subObject = object;
            if (startSlice >= keyArray.length || endSlice <= -keyArray.length) {
                return object;
            }
            if (startSlice <= -keyArray.length) {
                startSlice = 0;
            }
            if (!isDefined(endSlice) || endSlice >= keyArray.length) {
                endSlice = keyArray.length;
            }
            keyArray = keyArray.slice(startSlice, endSlice);
            try {
                for (var keyArray_1 = tslib_1.__values(keyArray), keyArray_1_1 = keyArray_1.next(); !keyArray_1_1.done; keyArray_1_1 = keyArray_1.next()) {
                    var key = keyArray_1_1.value;
                    if (key === '-' && isArray(subObject) && subObject.length) {
                        key = subObject.length - 1;
                    }
                    if (isMap(subObject) && subObject.has(key)) {
                        subObject = subObject.get(key);
                    }
                    else if (typeof subObject === 'object' && subObject !== null &&
                        hasOwn(subObject, key)) {
                        subObject = subObject[key];
                    }
                    else {
                        if (errors) {
                            console.error("get error: \"" + key + "\" key not found in object.");
                            console.error(pointer);
                            console.error(object);
                        }
                        return getBoolean ? false : undefined;
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (keyArray_1_1 && !keyArray_1_1.done && (_a = keyArray_1.return)) _a.call(keyArray_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return getBoolean ? true : subObject;
        }
        if (errors && keyArray === null) {
            console.error("get error: Invalid JSON Pointer: " + pointer);
        }
        if (errors && typeof object !== 'object') {
            console.error('get error: Invalid object:');
            console.error(object);
        }
        return getBoolean ? false : undefined;
        var e_1, _a;
    };
    /**
     * 'getCopy' function
     *
     * Uses a JSON Pointer to deeply clone a value from an object.
     *
     * //  { object } object - Object to get value from
     * //  { Pointer } pointer - JSON Pointer (string or array)
     * //  { number = 0 } startSlice - Zero-based index of first Pointer key to use
     * //  { number } endSlice - Zero-based index of last Pointer key to use
     * //  { boolean = false } getBoolean - Return only true or false?
     * //  { boolean = false } errors - Show error if not found?
     * // { object } - Located value (or true or false if getBoolean = true)
     */
    /**
     * 'getCopy' function
     *
     * Uses a JSON Pointer to deeply clone a value from an object.
     *
     * //  { object } object - Object to get value from
     * //  { Pointer } pointer - JSON Pointer (string or array)
     * //  { number = 0 } startSlice - Zero-based index of first Pointer key to use
     * //  { number } endSlice - Zero-based index of last Pointer key to use
     * //  { boolean = false } getBoolean - Return only true or false?
     * //  { boolean = false } errors - Show error if not found?
     * // { object } - Located value (or true or false if getBoolean = true)
     * @param {?} object
     * @param {?} pointer
     * @param {?=} startSlice
     * @param {?=} endSlice
     * @param {?=} getBoolean
     * @param {?=} errors
     * @return {?}
     */
    JsonPointer.getCopy = /**
     * 'getCopy' function
     *
     * Uses a JSON Pointer to deeply clone a value from an object.
     *
     * //  { object } object - Object to get value from
     * //  { Pointer } pointer - JSON Pointer (string or array)
     * //  { number = 0 } startSlice - Zero-based index of first Pointer key to use
     * //  { number } endSlice - Zero-based index of last Pointer key to use
     * //  { boolean = false } getBoolean - Return only true or false?
     * //  { boolean = false } errors - Show error if not found?
     * // { object } - Located value (or true or false if getBoolean = true)
     * @param {?} object
     * @param {?} pointer
     * @param {?=} startSlice
     * @param {?=} endSlice
     * @param {?=} getBoolean
     * @param {?=} errors
     * @return {?}
     */
    function (object, pointer, startSlice, endSlice, getBoolean, errors) {
        if (startSlice === void 0) { startSlice = 0; }
        if (endSlice === void 0) { endSlice = null; }
        if (getBoolean === void 0) { getBoolean = false; }
        if (errors === void 0) { errors = false; }
        /** @type {?} */
        var objectToCopy = this.get(object, pointer, startSlice, endSlice, getBoolean, errors);
        return this.forEachDeepCopy(objectToCopy);
    };
    /**
     * 'getFirst' function
     *
     * Takes an array of JSON Pointers and objects,
     * checks each object for a value specified by the pointer,
     * and returns the first value found.
     *
     * //  { [object, pointer][] } items - Array of objects and pointers to check
     * //  { any = null } defaultValue - Value to return if nothing found
     * //  { boolean = false } getCopy - Return a copy instead?
     * //  - First value found
     */
    /**
     * 'getFirst' function
     *
     * Takes an array of JSON Pointers and objects,
     * checks each object for a value specified by the pointer,
     * and returns the first value found.
     *
     * //  { [object, pointer][] } items - Array of objects and pointers to check
     * //  { any = null } defaultValue - Value to return if nothing found
     * //  { boolean = false } getCopy - Return a copy instead?
     * //  - First value found
     * @param {?} items
     * @param {?=} defaultValue
     * @param {?=} getCopy
     * @return {?}
     */
    JsonPointer.getFirst = /**
     * 'getFirst' function
     *
     * Takes an array of JSON Pointers and objects,
     * checks each object for a value specified by the pointer,
     * and returns the first value found.
     *
     * //  { [object, pointer][] } items - Array of objects and pointers to check
     * //  { any = null } defaultValue - Value to return if nothing found
     * //  { boolean = false } getCopy - Return a copy instead?
     * //  - First value found
     * @param {?} items
     * @param {?=} defaultValue
     * @param {?=} getCopy
     * @return {?}
     */
    function (items, defaultValue, getCopy) {
        if (defaultValue === void 0) { defaultValue = null; }
        if (getCopy === void 0) { getCopy = false; }
        if (isEmpty(items)) {
            return;
        }
        if (isArray(items)) {
            try {
                for (var items_1 = tslib_1.__values(items), items_1_1 = items_1.next(); !items_1_1.done; items_1_1 = items_1.next()) {
                    var item = items_1_1.value;
                    if (isEmpty(item)) {
                        continue;
                    }
                    if (isArray(item) && item.length >= 2) {
                        if (isEmpty(item[0]) || isEmpty(item[1])) {
                            continue;
                        }
                        /** @type {?} */
                        var value = getCopy ?
                            this.getCopy(item[0], item[1]) :
                            this.get(item[0], item[1]);
                        if (value) {
                            return value;
                        }
                        continue;
                    }
                    console.error('getFirst error: Input not in correct format.\n' +
                        'Should be: [ [ object1, pointer1 ], [ object 2, pointer2 ], etc... ]');
                    return;
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (items_1_1 && !items_1_1.done && (_a = items_1.return)) _a.call(items_1);
                }
                finally { if (e_2) throw e_2.error; }
            }
            return defaultValue;
        }
        if (isMap(items)) {
            try {
                for (var items_2 = tslib_1.__values(items), items_2_1 = items_2.next(); !items_2_1.done; items_2_1 = items_2.next()) {
                    var _b = tslib_1.__read(items_2_1.value, 2), object = _b[0], pointer = _b[1];
                    if (object === null || !this.isJsonPointer(pointer)) {
                        continue;
                    }
                    /** @type {?} */
                    var value = getCopy ?
                        this.getCopy(object, pointer) :
                        this.get(object, pointer);
                    if (value) {
                        return value;
                    }
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (items_2_1 && !items_2_1.done && (_c = items_2.return)) _c.call(items_2);
                }
                finally { if (e_3) throw e_3.error; }
            }
            return defaultValue;
        }
        console.error('getFirst error: Input not in correct format.\n' +
            'Should be: [ [ object1, pointer1 ], [ object 2, pointer2 ], etc... ]');
        return defaultValue;
        var e_2, _a, e_3, _c;
    };
    /**
     * 'getFirstCopy' function
     *
     * Similar to getFirst, but always returns a copy.
     *
     * //  { [object, pointer][] } items - Array of objects and pointers to check
     * //  { any = null } defaultValue - Value to return if nothing found
     * //  - Copy of first value found
     */
    /**
     * 'getFirstCopy' function
     *
     * Similar to getFirst, but always returns a copy.
     *
     * //  { [object, pointer][] } items - Array of objects and pointers to check
     * //  { any = null } defaultValue - Value to return if nothing found
     * //  - Copy of first value found
     * @param {?} items
     * @param {?=} defaultValue
     * @return {?}
     */
    JsonPointer.getFirstCopy = /**
     * 'getFirstCopy' function
     *
     * Similar to getFirst, but always returns a copy.
     *
     * //  { [object, pointer][] } items - Array of objects and pointers to check
     * //  { any = null } defaultValue - Value to return if nothing found
     * //  - Copy of first value found
     * @param {?} items
     * @param {?=} defaultValue
     * @return {?}
     */
    function (items, defaultValue) {
        if (defaultValue === void 0) { defaultValue = null; }
        /** @type {?} */
        var firstCopy = this.getFirst(items, defaultValue, true);
        return firstCopy;
    };
    /**
     * 'set' function
     *
     * Uses a JSON Pointer to set a value on an object.
     * Also creates any missing sub objects or arrays to contain that value.
     *
     * If the optional fourth parameter is TRUE and the inner-most container
     * is an array, the function will insert the value as a new item at the
     * specified location in the array, rather than overwriting the existing
     * value (if any) at that location.
     *
     * So set([1, 2, 3], '/1', 4) => [1, 4, 3]
     * and
     * So set([1, 2, 3], '/1', 4, true) => [1, 4, 2, 3]
     *
     * //  { object } object - The object to set value in
     * //  { Pointer } pointer - The JSON Pointer (string or array)
     * //   value - The new value to set
     * //  { boolean } insert - insert value?
     * // { object } - The original object, modified with the set value
     */
    /**
     * 'set' function
     *
     * Uses a JSON Pointer to set a value on an object.
     * Also creates any missing sub objects or arrays to contain that value.
     *
     * If the optional fourth parameter is TRUE and the inner-most container
     * is an array, the function will insert the value as a new item at the
     * specified location in the array, rather than overwriting the existing
     * value (if any) at that location.
     *
     * So set([1, 2, 3], '/1', 4) => [1, 4, 3]
     * and
     * So set([1, 2, 3], '/1', 4, true) => [1, 4, 2, 3]
     *
     * //  { object } object - The object to set value in
     * //  { Pointer } pointer - The JSON Pointer (string or array)
     * //   value - The new value to set
     * //  { boolean } insert - insert value?
     * // { object } - The original object, modified with the set value
     * @param {?} object
     * @param {?} pointer
     * @param {?} value
     * @param {?=} insert
     * @return {?}
     */
    JsonPointer.set = /**
     * 'set' function
     *
     * Uses a JSON Pointer to set a value on an object.
     * Also creates any missing sub objects or arrays to contain that value.
     *
     * If the optional fourth parameter is TRUE and the inner-most container
     * is an array, the function will insert the value as a new item at the
     * specified location in the array, rather than overwriting the existing
     * value (if any) at that location.
     *
     * So set([1, 2, 3], '/1', 4) => [1, 4, 3]
     * and
     * So set([1, 2, 3], '/1', 4, true) => [1, 4, 2, 3]
     *
     * //  { object } object - The object to set value in
     * //  { Pointer } pointer - The JSON Pointer (string or array)
     * //   value - The new value to set
     * //  { boolean } insert - insert value?
     * // { object } - The original object, modified with the set value
     * @param {?} object
     * @param {?} pointer
     * @param {?} value
     * @param {?=} insert
     * @return {?}
     */
    function (object, pointer, value, insert) {
        if (insert === void 0) { insert = false; }
        /** @type {?} */
        var keyArray = this.parse(pointer);
        if (keyArray !== null && keyArray.length) {
            /** @type {?} */
            var subObject = object;
            for (var i = 0; i < keyArray.length - 1; ++i) {
                /** @type {?} */
                var key = keyArray[i];
                if (key === '-' && isArray(subObject)) {
                    key = subObject.length;
                }
                if (isMap(subObject) && subObject.has(key)) {
                    subObject = subObject.get(key);
                }
                else {
                    if (!hasOwn(subObject, key)) {
                        subObject[key] = (keyArray[i + 1].match(/^(\d+|-)$/)) ? [] : {};
                    }
                    subObject = subObject[key];
                }
            }
            /** @type {?} */
            var lastKey = keyArray[keyArray.length - 1];
            if (isArray(subObject) && lastKey === '-') {
                subObject.push(value);
            }
            else if (insert && isArray(subObject) && !isNaN(+lastKey)) {
                subObject.splice(lastKey, 0, value);
            }
            else if (isMap(subObject)) {
                subObject.set(lastKey, value);
            }
            else {
                subObject[lastKey] = value;
            }
            return object;
        }
        console.error("set error: Invalid JSON Pointer: " + pointer);
        return object;
    };
    /**
     * 'setCopy' function
     *
     * Copies an object and uses a JSON Pointer to set a value on the copy.
     * Also creates any missing sub objects or arrays to contain that value.
     *
     * If the optional fourth parameter is TRUE and the inner-most container
     * is an array, the function will insert the value as a new item at the
     * specified location in the array, rather than overwriting the existing value.
     *
     * //  { object } object - The object to copy and set value in
     * //  { Pointer } pointer - The JSON Pointer (string or array)
     * //   value - The value to set
     * //  { boolean } insert - insert value?
     * // { object } - The new object with the set value
     */
    /**
     * 'setCopy' function
     *
     * Copies an object and uses a JSON Pointer to set a value on the copy.
     * Also creates any missing sub objects or arrays to contain that value.
     *
     * If the optional fourth parameter is TRUE and the inner-most container
     * is an array, the function will insert the value as a new item at the
     * specified location in the array, rather than overwriting the existing value.
     *
     * //  { object } object - The object to copy and set value in
     * //  { Pointer } pointer - The JSON Pointer (string or array)
     * //   value - The value to set
     * //  { boolean } insert - insert value?
     * // { object } - The new object with the set value
     * @param {?} object
     * @param {?} pointer
     * @param {?} value
     * @param {?=} insert
     * @return {?}
     */
    JsonPointer.setCopy = /**
     * 'setCopy' function
     *
     * Copies an object and uses a JSON Pointer to set a value on the copy.
     * Also creates any missing sub objects or arrays to contain that value.
     *
     * If the optional fourth parameter is TRUE and the inner-most container
     * is an array, the function will insert the value as a new item at the
     * specified location in the array, rather than overwriting the existing value.
     *
     * //  { object } object - The object to copy and set value in
     * //  { Pointer } pointer - The JSON Pointer (string or array)
     * //   value - The value to set
     * //  { boolean } insert - insert value?
     * // { object } - The new object with the set value
     * @param {?} object
     * @param {?} pointer
     * @param {?} value
     * @param {?=} insert
     * @return {?}
     */
    function (object, pointer, value, insert) {
        if (insert === void 0) { insert = false; }
        /** @type {?} */
        var keyArray = this.parse(pointer);
        if (keyArray !== null) {
            /** @type {?} */
            var newObject = copy(object);
            /** @type {?} */
            var subObject = newObject;
            for (var i = 0; i < keyArray.length - 1; ++i) {
                /** @type {?} */
                var key = keyArray[i];
                if (key === '-' && isArray(subObject)) {
                    key = subObject.length;
                }
                if (isMap(subObject) && subObject.has(key)) {
                    subObject.set(key, copy(subObject.get(key)));
                    subObject = subObject.get(key);
                }
                else {
                    if (!hasOwn(subObject, key)) {
                        subObject[key] = (keyArray[i + 1].match(/^(\d+|-)$/)) ? [] : {};
                    }
                    subObject[key] = copy(subObject[key]);
                    subObject = subObject[key];
                }
            }
            /** @type {?} */
            var lastKey = keyArray[keyArray.length - 1];
            if (isArray(subObject) && lastKey === '-') {
                subObject.push(value);
            }
            else if (insert && isArray(subObject) && !isNaN(+lastKey)) {
                subObject.splice(lastKey, 0, value);
            }
            else if (isMap(subObject)) {
                subObject.set(lastKey, value);
            }
            else {
                subObject[lastKey] = value;
            }
            return newObject;
        }
        console.error("setCopy error: Invalid JSON Pointer: " + pointer);
        return object;
    };
    /**
     * 'insert' function
     *
     * Calls 'set' with insert = TRUE
     *
     * //  { object } object - object to insert value in
     * //  { Pointer } pointer - JSON Pointer (string or array)
     * //   value - value to insert
     * // { object }
     */
    /**
     * 'insert' function
     *
     * Calls 'set' with insert = TRUE
     *
     * //  { object } object - object to insert value in
     * //  { Pointer } pointer - JSON Pointer (string or array)
     * //   value - value to insert
     * // { object }
     * @param {?} object
     * @param {?} pointer
     * @param {?} value
     * @return {?}
     */
    JsonPointer.insert = /**
     * 'insert' function
     *
     * Calls 'set' with insert = TRUE
     *
     * //  { object } object - object to insert value in
     * //  { Pointer } pointer - JSON Pointer (string or array)
     * //   value - value to insert
     * // { object }
     * @param {?} object
     * @param {?} pointer
     * @param {?} value
     * @return {?}
     */
    function (object, pointer, value) {
        /** @type {?} */
        var updatedObject = this.set(object, pointer, value, true);
        return updatedObject;
    };
    /**
     * 'insertCopy' function
     *
     * Calls 'setCopy' with insert = TRUE
     *
     * //  { object } object - object to insert value in
     * //  { Pointer } pointer - JSON Pointer (string or array)
     * //   value - value to insert
     * // { object }
     */
    /**
     * 'insertCopy' function
     *
     * Calls 'setCopy' with insert = TRUE
     *
     * //  { object } object - object to insert value in
     * //  { Pointer } pointer - JSON Pointer (string or array)
     * //   value - value to insert
     * // { object }
     * @param {?} object
     * @param {?} pointer
     * @param {?} value
     * @return {?}
     */
    JsonPointer.insertCopy = /**
     * 'insertCopy' function
     *
     * Calls 'setCopy' with insert = TRUE
     *
     * //  { object } object - object to insert value in
     * //  { Pointer } pointer - JSON Pointer (string or array)
     * //   value - value to insert
     * // { object }
     * @param {?} object
     * @param {?} pointer
     * @param {?} value
     * @return {?}
     */
    function (object, pointer, value) {
        /** @type {?} */
        var updatedObject = this.setCopy(object, pointer, value, true);
        return updatedObject;
    };
    /**
     * 'remove' function
     *
     * Uses a JSON Pointer to remove a key and its attribute from an object
     *
     * //  { object } object - object to delete attribute from
     * //  { Pointer } pointer - JSON Pointer (string or array)
     * // { object }
     */
    /**
     * 'remove' function
     *
     * Uses a JSON Pointer to remove a key and its attribute from an object
     *
     * //  { object } object - object to delete attribute from
     * //  { Pointer } pointer - JSON Pointer (string or array)
     * // { object }
     * @param {?} object
     * @param {?} pointer
     * @return {?}
     */
    JsonPointer.remove = /**
     * 'remove' function
     *
     * Uses a JSON Pointer to remove a key and its attribute from an object
     *
     * //  { object } object - object to delete attribute from
     * //  { Pointer } pointer - JSON Pointer (string or array)
     * // { object }
     * @param {?} object
     * @param {?} pointer
     * @return {?}
     */
    function (object, pointer) {
        /** @type {?} */
        var keyArray = this.parse(pointer);
        if (keyArray !== null && keyArray.length) {
            /** @type {?} */
            var lastKey = keyArray.pop();
            /** @type {?} */
            var parentObject = this.get(object, keyArray);
            if (isArray(parentObject)) {
                if (lastKey === '-') {
                    lastKey = parentObject.length - 1;
                }
                parentObject.splice(lastKey, 1);
            }
            else if (isObject(parentObject)) {
                delete parentObject[lastKey];
            }
            return object;
        }
        console.error("remove error: Invalid JSON Pointer: " + pointer);
        return object;
    };
    /**
     * 'has' function
     *
     * Tests if an object has a value at the location specified by a JSON Pointer
     *
     * //  { object } object - object to chek for value
     * //  { Pointer } pointer - JSON Pointer (string or array)
     * // { boolean }
     */
    /**
     * 'has' function
     *
     * Tests if an object has a value at the location specified by a JSON Pointer
     *
     * //  { object } object - object to chek for value
     * //  { Pointer } pointer - JSON Pointer (string or array)
     * // { boolean }
     * @param {?} object
     * @param {?} pointer
     * @return {?}
     */
    JsonPointer.has = /**
     * 'has' function
     *
     * Tests if an object has a value at the location specified by a JSON Pointer
     *
     * //  { object } object - object to chek for value
     * //  { Pointer } pointer - JSON Pointer (string or array)
     * // { boolean }
     * @param {?} object
     * @param {?} pointer
     * @return {?}
     */
    function (object, pointer) {
        /** @type {?} */
        var hasValue = this.get(object, pointer, 0, null, true);
        return hasValue;
    };
    /**
     * 'dict' function
     *
     * Returns a (pointer -> value) dictionary for an object
     *
     * //  { object } object - The object to create a dictionary from
     * // { object } - The resulting dictionary object
     */
    /**
     * 'dict' function
     *
     * Returns a (pointer -> value) dictionary for an object
     *
     * //  { object } object - The object to create a dictionary from
     * // { object } - The resulting dictionary object
     * @param {?} object
     * @return {?}
     */
    JsonPointer.dict = /**
     * 'dict' function
     *
     * Returns a (pointer -> value) dictionary for an object
     *
     * //  { object } object - The object to create a dictionary from
     * // { object } - The resulting dictionary object
     * @param {?} object
     * @return {?}
     */
    function (object) {
        /** @type {?} */
        var results = {};
        this.forEachDeep(object, function (value, pointer) {
            if (typeof value !== 'object') {
                results[pointer] = value;
            }
        });
        return results;
    };
    /**
     * 'forEachDeep' function
     *
     * Iterates over own enumerable properties of an object or items in an array
     * and invokes an iteratee function for each key/value or index/value pair.
     * By default, iterates over items within objects and arrays after calling
     * the iteratee function on the containing object or array itself.
     *
     * The iteratee is invoked with three arguments: (value, pointer, rootObject),
     * where pointer is a JSON pointer indicating the location of the current
     * value within the root object, and rootObject is the root object initially
     * submitted to th function.
     *
     * If a third optional parameter 'bottomUp' is set to TRUE, the iterator
     * function will be called on sub-objects and arrays after being
     * called on their contents, rather than before, which is the default.
     *
     * This function can also optionally be called directly on a sub-object by
     * including optional 4th and 5th parameterss to specify the initial
     * root object and pointer.
     *
     * //  { object } object - the initial object or array
     * //  { (v: any, p?: string, o?: any) => any } function - iteratee function
     * //  { boolean = false } bottomUp - optional, set to TRUE to reverse direction
     * //  { object = object } rootObject - optional, root object or array
     * //  { string = '' } pointer - optional, JSON Pointer to object within rootObject
     * // { object } - The modified object
     */
    /**
     * 'forEachDeep' function
     *
     * Iterates over own enumerable properties of an object or items in an array
     * and invokes an iteratee function for each key/value or index/value pair.
     * By default, iterates over items within objects and arrays after calling
     * the iteratee function on the containing object or array itself.
     *
     * The iteratee is invoked with three arguments: (value, pointer, rootObject),
     * where pointer is a JSON pointer indicating the location of the current
     * value within the root object, and rootObject is the root object initially
     * submitted to th function.
     *
     * If a third optional parameter 'bottomUp' is set to TRUE, the iterator
     * function will be called on sub-objects and arrays after being
     * called on their contents, rather than before, which is the default.
     *
     * This function can also optionally be called directly on a sub-object by
     * including optional 4th and 5th parameterss to specify the initial
     * root object and pointer.
     *
     * //  { object } object - the initial object or array
     * //  { (v: any, p?: string, o?: any) => any } function - iteratee function
     * //  { boolean = false } bottomUp - optional, set to TRUE to reverse direction
     * //  { object = object } rootObject - optional, root object or array
     * //  { string = '' } pointer - optional, JSON Pointer to object within rootObject
     * // { object } - The modified object
     * @param {?} object
     * @param {?=} fn
     * @param {?=} bottomUp
     * @param {?=} pointer
     * @param {?=} rootObject
     * @return {?}
     */
    JsonPointer.forEachDeep = /**
     * 'forEachDeep' function
     *
     * Iterates over own enumerable properties of an object or items in an array
     * and invokes an iteratee function for each key/value or index/value pair.
     * By default, iterates over items within objects and arrays after calling
     * the iteratee function on the containing object or array itself.
     *
     * The iteratee is invoked with three arguments: (value, pointer, rootObject),
     * where pointer is a JSON pointer indicating the location of the current
     * value within the root object, and rootObject is the root object initially
     * submitted to th function.
     *
     * If a third optional parameter 'bottomUp' is set to TRUE, the iterator
     * function will be called on sub-objects and arrays after being
     * called on their contents, rather than before, which is the default.
     *
     * This function can also optionally be called directly on a sub-object by
     * including optional 4th and 5th parameterss to specify the initial
     * root object and pointer.
     *
     * //  { object } object - the initial object or array
     * //  { (v: any, p?: string, o?: any) => any } function - iteratee function
     * //  { boolean = false } bottomUp - optional, set to TRUE to reverse direction
     * //  { object = object } rootObject - optional, root object or array
     * //  { string = '' } pointer - optional, JSON Pointer to object within rootObject
     * // { object } - The modified object
     * @param {?} object
     * @param {?=} fn
     * @param {?=} bottomUp
     * @param {?=} pointer
     * @param {?=} rootObject
     * @return {?}
     */
    function (object, fn, bottomUp, pointer, rootObject) {
        if (fn === void 0) { fn = function (v) { return v; }; }
        if (bottomUp === void 0) { bottomUp = false; }
        if (pointer === void 0) { pointer = ''; }
        if (rootObject === void 0) { rootObject = object; }
        if (typeof fn !== 'function') {
            console.error("forEachDeep error: Iterator is not a function:", fn);
            return;
        }
        if (!bottomUp) {
            fn(object, pointer, rootObject);
        }
        if (isObject(object) || isArray(object)) {
            try {
                for (var _a = tslib_1.__values(Object.keys(object)), _b = _a.next(); !_b.done; _b = _a.next()) {
                    var key = _b.value;
                    /** @type {?} */
                    var newPointer = pointer + '/' + this.escape(key);
                    this.forEachDeep(object[key], fn, bottomUp, newPointer, rootObject);
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                }
                finally { if (e_4) throw e_4.error; }
            }
        }
        if (bottomUp) {
            fn(object, pointer, rootObject);
        }
        var e_4, _c;
    };
    /**
     * 'forEachDeepCopy' function
     *
     * Similar to forEachDeep, but returns a copy of the original object, with
     * the same keys and indexes, but with values replaced with the result of
     * the iteratee function.
     *
     * //  { object } object - the initial object or array
     * //  { (v: any, k?: string, o?: any, p?: any) => any } function - iteratee function
     * //  { boolean = false } bottomUp - optional, set to TRUE to reverse direction
     * //  { object = object } rootObject - optional, root object or array
     * //  { string = '' } pointer - optional, JSON Pointer to object within rootObject
     * // { object } - The copied object
     */
    /**
     * 'forEachDeepCopy' function
     *
     * Similar to forEachDeep, but returns a copy of the original object, with
     * the same keys and indexes, but with values replaced with the result of
     * the iteratee function.
     *
     * //  { object } object - the initial object or array
     * //  { (v: any, k?: string, o?: any, p?: any) => any } function - iteratee function
     * //  { boolean = false } bottomUp - optional, set to TRUE to reverse direction
     * //  { object = object } rootObject - optional, root object or array
     * //  { string = '' } pointer - optional, JSON Pointer to object within rootObject
     * // { object } - The copied object
     * @param {?} object
     * @param {?=} fn
     * @param {?=} bottomUp
     * @param {?=} pointer
     * @param {?=} rootObject
     * @return {?}
     */
    JsonPointer.forEachDeepCopy = /**
     * 'forEachDeepCopy' function
     *
     * Similar to forEachDeep, but returns a copy of the original object, with
     * the same keys and indexes, but with values replaced with the result of
     * the iteratee function.
     *
     * //  { object } object - the initial object or array
     * //  { (v: any, k?: string, o?: any, p?: any) => any } function - iteratee function
     * //  { boolean = false } bottomUp - optional, set to TRUE to reverse direction
     * //  { object = object } rootObject - optional, root object or array
     * //  { string = '' } pointer - optional, JSON Pointer to object within rootObject
     * // { object } - The copied object
     * @param {?} object
     * @param {?=} fn
     * @param {?=} bottomUp
     * @param {?=} pointer
     * @param {?=} rootObject
     * @return {?}
     */
    function (object, fn, bottomUp, pointer, rootObject) {
        if (fn === void 0) { fn = function (v) { return v; }; }
        if (bottomUp === void 0) { bottomUp = false; }
        if (pointer === void 0) { pointer = ''; }
        if (rootObject === void 0) { rootObject = object; }
        if (typeof fn !== 'function') {
            console.error("forEachDeepCopy error: Iterator is not a function:", fn);
            return null;
        }
        if (isObject(object) || isArray(object)) {
            /** @type {?} */
            var newObject = isArray(object) ? tslib_1.__spread(object) : tslib_1.__assign({}, object);
            if (!bottomUp) {
                newObject = fn(newObject, pointer, rootObject);
            }
            try {
                for (var _a = tslib_1.__values(Object.keys(newObject)), _b = _a.next(); !_b.done; _b = _a.next()) {
                    var key = _b.value;
                    /** @type {?} */
                    var newPointer = pointer + '/' + this.escape(key);
                    newObject[key] = this.forEachDeepCopy(newObject[key], fn, bottomUp, newPointer, rootObject);
                }
            }
            catch (e_5_1) { e_5 = { error: e_5_1 }; }
            finally {
                try {
                    if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                }
                finally { if (e_5) throw e_5.error; }
            }
            if (bottomUp) {
                newObject = fn(newObject, pointer, rootObject);
            }
            return newObject;
        }
        else {
            return fn(object, pointer, rootObject);
        }
        var e_5, _c;
    };
    /**
     * 'escape' function
     *
     * Escapes a string reference key
     *
     * //  { string } key - string key to escape
     * // { string } - escaped key
     */
    /**
     * 'escape' function
     *
     * Escapes a string reference key
     *
     * //  { string } key - string key to escape
     * // { string } - escaped key
     * @param {?} key
     * @return {?}
     */
    JsonPointer.escape = /**
     * 'escape' function
     *
     * Escapes a string reference key
     *
     * //  { string } key - string key to escape
     * // { string } - escaped key
     * @param {?} key
     * @return {?}
     */
    function (key) {
        /** @type {?} */
        var escaped = key.toString().replace(/~/g, '~0').replace(/\//g, '~1');
        return escaped;
    };
    /**
     * 'unescape' function
     *
     * Unescapes a string reference key
     *
     * //  { string } key - string key to unescape
     * // { string } - unescaped key
     */
    /**
     * 'unescape' function
     *
     * Unescapes a string reference key
     *
     * //  { string } key - string key to unescape
     * // { string } - unescaped key
     * @param {?} key
     * @return {?}
     */
    JsonPointer.unescape = /**
     * 'unescape' function
     *
     * Unescapes a string reference key
     *
     * //  { string } key - string key to unescape
     * // { string } - unescaped key
     * @param {?} key
     * @return {?}
     */
    function (key) {
        /** @type {?} */
        var unescaped = key.toString().replace(/~1/g, '/').replace(/~0/g, '~');
        return unescaped;
    };
    /**
     * 'parse' function
     *
     * Converts a string JSON Pointer into a array of keys
     * (if input is already an an array of keys, it is returned unchanged)
     *
     * //  { Pointer } pointer - JSON Pointer (string or array)
     * //  { boolean = false } errors - Show error if invalid pointer?
     * // { string[] } - JSON Pointer array of keys
     */
    /**
     * 'parse' function
     *
     * Converts a string JSON Pointer into a array of keys
     * (if input is already an an array of keys, it is returned unchanged)
     *
     * //  { Pointer } pointer - JSON Pointer (string or array)
     * //  { boolean = false } errors - Show error if invalid pointer?
     * // { string[] } - JSON Pointer array of keys
     * @param {?} pointer
     * @param {?=} errors
     * @return {?}
     */
    JsonPointer.parse = /**
     * 'parse' function
     *
     * Converts a string JSON Pointer into a array of keys
     * (if input is already an an array of keys, it is returned unchanged)
     *
     * //  { Pointer } pointer - JSON Pointer (string or array)
     * //  { boolean = false } errors - Show error if invalid pointer?
     * // { string[] } - JSON Pointer array of keys
     * @param {?} pointer
     * @param {?=} errors
     * @return {?}
     */
    function (pointer, errors) {
        if (errors === void 0) { errors = false; }
        if (!this.isJsonPointer(pointer)) {
            if (errors) {
                console.error("parse error: Invalid JSON Pointer: " + pointer);
            }
            return null;
        }
        if (isArray(pointer)) {
            return /** @type {?} */ (pointer);
        }
        if (typeof pointer === 'string') {
            if ((/** @type {?} */ (pointer))[0] === '#') {
                pointer = pointer.slice(1);
            }
            if (/** @type {?} */ (pointer) === '' || /** @type {?} */ (pointer) === '/') {
                return [];
            }
            return (/** @type {?} */ (pointer)).slice(1).split('/').map(this.unescape);
        }
    };
    /**
     * 'compile' function
     *
     * Converts an array of keys into a JSON Pointer string
     * (if input is already a string, it is normalized and returned)
     *
     * The optional second parameter is a default which will replace any empty keys.
     *
     * //  { Pointer } pointer - JSON Pointer (string or array)
     * //  { string | number = '' } defaultValue - Default value
     * //  { boolean = false } errors - Show error if invalid pointer?
     * // { string } - JSON Pointer string
     */
    /**
     * 'compile' function
     *
     * Converts an array of keys into a JSON Pointer string
     * (if input is already a string, it is normalized and returned)
     *
     * The optional second parameter is a default which will replace any empty keys.
     *
     * //  { Pointer } pointer - JSON Pointer (string or array)
     * //  { string | number = '' } defaultValue - Default value
     * //  { boolean = false } errors - Show error if invalid pointer?
     * // { string } - JSON Pointer string
     * @param {?} pointer
     * @param {?=} defaultValue
     * @param {?=} errors
     * @return {?}
     */
    JsonPointer.compile = /**
     * 'compile' function
     *
     * Converts an array of keys into a JSON Pointer string
     * (if input is already a string, it is normalized and returned)
     *
     * The optional second parameter is a default which will replace any empty keys.
     *
     * //  { Pointer } pointer - JSON Pointer (string or array)
     * //  { string | number = '' } defaultValue - Default value
     * //  { boolean = false } errors - Show error if invalid pointer?
     * // { string } - JSON Pointer string
     * @param {?} pointer
     * @param {?=} defaultValue
     * @param {?=} errors
     * @return {?}
     */
    function (pointer, defaultValue, errors) {
        var _this = this;
        if (defaultValue === void 0) { defaultValue = ''; }
        if (errors === void 0) { errors = false; }
        if (pointer === '#') {
            return '';
        }
        if (!this.isJsonPointer(pointer)) {
            if (errors) {
                console.error("compile error: Invalid JSON Pointer: " + pointer);
            }
            return null;
        }
        if (isArray(pointer)) {
            if ((/** @type {?} */ (pointer)).length === 0) {
                return '';
            }
            return '/' + (/** @type {?} */ (pointer)).map(function (key) { return key === '' ? defaultValue : _this.escape(key); }).join('/');
        }
        if (typeof pointer === 'string') {
            if (pointer[0] === '#') {
                pointer = pointer.slice(1);
            }
            return pointer;
        }
    };
    /**
     * 'toKey' function
     *
     * Extracts name of the final key from a JSON Pointer.
     *
     * //  { Pointer } pointer - JSON Pointer (string or array)
     * //  { boolean = false } errors - Show error if invalid pointer?
     * // { string } - the extracted key
     */
    /**
     * 'toKey' function
     *
     * Extracts name of the final key from a JSON Pointer.
     *
     * //  { Pointer } pointer - JSON Pointer (string or array)
     * //  { boolean = false } errors - Show error if invalid pointer?
     * // { string } - the extracted key
     * @param {?} pointer
     * @param {?=} errors
     * @return {?}
     */
    JsonPointer.toKey = /**
     * 'toKey' function
     *
     * Extracts name of the final key from a JSON Pointer.
     *
     * //  { Pointer } pointer - JSON Pointer (string or array)
     * //  { boolean = false } errors - Show error if invalid pointer?
     * // { string } - the extracted key
     * @param {?} pointer
     * @param {?=} errors
     * @return {?}
     */
    function (pointer, errors) {
        if (errors === void 0) { errors = false; }
        /** @type {?} */
        var keyArray = this.parse(pointer, errors);
        if (keyArray === null) {
            return null;
        }
        if (!keyArray.length) {
            return '';
        }
        return keyArray[keyArray.length - 1];
    };
    /**
     * 'isJsonPointer' function
     *
     * Checks a string or array value to determine if it is a valid JSON Pointer.
     * Returns true if a string is empty, or starts with '/' or '#/'.
     * Returns true if an array contains only string values.
     *
     * //   value - value to check
     * // { boolean } - true if value is a valid JSON Pointer, otherwise false
     */
    /**
     * 'isJsonPointer' function
     *
     * Checks a string or array value to determine if it is a valid JSON Pointer.
     * Returns true if a string is empty, or starts with '/' or '#/'.
     * Returns true if an array contains only string values.
     *
     * //   value - value to check
     * // { boolean } - true if value is a valid JSON Pointer, otherwise false
     * @param {?} value
     * @return {?}
     */
    JsonPointer.isJsonPointer = /**
     * 'isJsonPointer' function
     *
     * Checks a string or array value to determine if it is a valid JSON Pointer.
     * Returns true if a string is empty, or starts with '/' or '#/'.
     * Returns true if an array contains only string values.
     *
     * //   value - value to check
     * // { boolean } - true if value is a valid JSON Pointer, otherwise false
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (isArray(value)) {
            return value.every(function (key) { return typeof key === 'string'; });
        }
        else if (isString(value)) {
            if (value === '' || value === '#') {
                return true;
            }
            if (value[0] === '/' || value.slice(0, 2) === '#/') {
                return !/(~[^01]|~$)/g.test(value);
            }
        }
        return false;
    };
    /**
     * 'isSubPointer' function
     *
     * Checks whether one JSON Pointer is a subset of another.
     *
     * //  { Pointer } shortPointer - potential subset JSON Pointer
     * //  { Pointer } longPointer - potential superset JSON Pointer
     * //  { boolean = false } trueIfMatching - return true if pointers match?
     * //  { boolean = false } errors - Show error if invalid pointer?
     * // { boolean } - true if shortPointer is a subset of longPointer, false if not
     */
    /**
     * 'isSubPointer' function
     *
     * Checks whether one JSON Pointer is a subset of another.
     *
     * //  { Pointer } shortPointer - potential subset JSON Pointer
     * //  { Pointer } longPointer - potential superset JSON Pointer
     * //  { boolean = false } trueIfMatching - return true if pointers match?
     * //  { boolean = false } errors - Show error if invalid pointer?
     * // { boolean } - true if shortPointer is a subset of longPointer, false if not
     * @param {?} shortPointer
     * @param {?} longPointer
     * @param {?=} trueIfMatching
     * @param {?=} errors
     * @return {?}
     */
    JsonPointer.isSubPointer = /**
     * 'isSubPointer' function
     *
     * Checks whether one JSON Pointer is a subset of another.
     *
     * //  { Pointer } shortPointer - potential subset JSON Pointer
     * //  { Pointer } longPointer - potential superset JSON Pointer
     * //  { boolean = false } trueIfMatching - return true if pointers match?
     * //  { boolean = false } errors - Show error if invalid pointer?
     * // { boolean } - true if shortPointer is a subset of longPointer, false if not
     * @param {?} shortPointer
     * @param {?} longPointer
     * @param {?=} trueIfMatching
     * @param {?=} errors
     * @return {?}
     */
    function (shortPointer, longPointer, trueIfMatching, errors) {
        if (trueIfMatching === void 0) { trueIfMatching = false; }
        if (errors === void 0) { errors = false; }
        if (!this.isJsonPointer(shortPointer) || !this.isJsonPointer(longPointer)) {
            if (errors) {
                /** @type {?} */
                var invalid = '';
                if (!this.isJsonPointer(shortPointer)) {
                    invalid += " 1: " + shortPointer;
                }
                if (!this.isJsonPointer(longPointer)) {
                    invalid += " 2: " + longPointer;
                }
                console.error("isSubPointer error: Invalid JSON Pointer " + invalid);
            }
            return;
        }
        shortPointer = this.compile(shortPointer, '', errors);
        longPointer = this.compile(longPointer, '', errors);
        return shortPointer === longPointer ? trueIfMatching :
            shortPointer + "/" === longPointer.slice(0, shortPointer.length + 1);
    };
    /**
     * 'toIndexedPointer' function
     *
     * Merges an array of numeric indexes and a generic pointer to create an
     * indexed pointer for a specific item.
     *
     * For example, merging the generic pointer '/foo/-/bar/-/baz' and
     * the array [4, 2] would result in the indexed pointer '/foo/4/bar/2/baz'
     *
     *
     * //  { Pointer } genericPointer - The generic pointer
     * //  { number[] } indexArray - The array of numeric indexes
     * //  { Map<string, number> } arrayMap - An optional array map
     * // { string } - The merged pointer with indexes
     */
    /**
     * 'toIndexedPointer' function
     *
     * Merges an array of numeric indexes and a generic pointer to create an
     * indexed pointer for a specific item.
     *
     * For example, merging the generic pointer '/foo/-/bar/-/baz' and
     * the array [4, 2] would result in the indexed pointer '/foo/4/bar/2/baz'
     *
     *
     * //  { Pointer } genericPointer - The generic pointer
     * //  { number[] } indexArray - The array of numeric indexes
     * //  { Map<string, number> } arrayMap - An optional array map
     * // { string } - The merged pointer with indexes
     * @param {?} genericPointer
     * @param {?} indexArray
     * @param {?=} arrayMap
     * @return {?}
     */
    JsonPointer.toIndexedPointer = /**
     * 'toIndexedPointer' function
     *
     * Merges an array of numeric indexes and a generic pointer to create an
     * indexed pointer for a specific item.
     *
     * For example, merging the generic pointer '/foo/-/bar/-/baz' and
     * the array [4, 2] would result in the indexed pointer '/foo/4/bar/2/baz'
     *
     *
     * //  { Pointer } genericPointer - The generic pointer
     * //  { number[] } indexArray - The array of numeric indexes
     * //  { Map<string, number> } arrayMap - An optional array map
     * // { string } - The merged pointer with indexes
     * @param {?} genericPointer
     * @param {?} indexArray
     * @param {?=} arrayMap
     * @return {?}
     */
    function (genericPointer, indexArray, arrayMap) {
        if (arrayMap === void 0) { arrayMap = null; }
        if (this.isJsonPointer(genericPointer) && isArray(indexArray)) {
            /** @type {?} */
            var indexedPointer_1 = this.compile(genericPointer);
            if (isMap(arrayMap)) {
                /** @type {?} */
                var arrayIndex_1 = 0;
                return indexedPointer_1.replace(/\/\-(?=\/|$)/g, function (key, stringIndex) {
                    return arrayMap.has((/** @type {?} */ (indexedPointer_1)).slice(0, stringIndex)) ?
                        '/' + indexArray[arrayIndex_1++] : key;
                });
            }
            else {
                try {
                    for (var indexArray_1 = tslib_1.__values(indexArray), indexArray_1_1 = indexArray_1.next(); !indexArray_1_1.done; indexArray_1_1 = indexArray_1.next()) {
                        var pointerIndex = indexArray_1_1.value;
                        indexedPointer_1 = indexedPointer_1.replace('/-', '/' + pointerIndex);
                    }
                }
                catch (e_6_1) { e_6 = { error: e_6_1 }; }
                finally {
                    try {
                        if (indexArray_1_1 && !indexArray_1_1.done && (_a = indexArray_1.return)) _a.call(indexArray_1);
                    }
                    finally { if (e_6) throw e_6.error; }
                }
                return indexedPointer_1;
            }
        }
        if (!this.isJsonPointer(genericPointer)) {
            console.error("toIndexedPointer error: Invalid JSON Pointer: " + genericPointer);
        }
        if (!isArray(indexArray)) {
            console.error("toIndexedPointer error: Invalid indexArray: " + indexArray);
        }
        var e_6, _a;
    };
    ;
    /**
     * 'toGenericPointer' function
     *
     * Compares an indexed pointer to an array map and removes list array
     * indexes (but leaves tuple arrray indexes and all object keys, including
     * numeric keys) to create a generic pointer.
     *
     * For example, using the indexed pointer '/foo/1/bar/2/baz/3' and
     * the arrayMap [['/foo', 0], ['/foo/-/bar', 3], ['/foo/-/bar/-/baz', 0]]
     * would result in the generic pointer '/foo/-/bar/2/baz/-'
     * Using the indexed pointer '/foo/1/bar/4/baz/3' and the same arrayMap
     * would result in the generic pointer '/foo/-/bar/-/baz/-'
     * (the bar array has 3 tuple items, so index 2 is retained, but 4 is removed)
     *
     * The structure of the arrayMap is: [['path to array', number of tuple items]...]
     *
     *
     * //  { Pointer } indexedPointer - The indexed pointer (array or string)
     * //  { Map<string, number> } arrayMap - The optional array map (for preserving tuple indexes)
     * // { string } - The generic pointer with indexes removed
     */
    /**
     * 'toGenericPointer' function
     *
     * Compares an indexed pointer to an array map and removes list array
     * indexes (but leaves tuple arrray indexes and all object keys, including
     * numeric keys) to create a generic pointer.
     *
     * For example, using the indexed pointer '/foo/1/bar/2/baz/3' and
     * the arrayMap [['/foo', 0], ['/foo/-/bar', 3], ['/foo/-/bar/-/baz', 0]]
     * would result in the generic pointer '/foo/-/bar/2/baz/-'
     * Using the indexed pointer '/foo/1/bar/4/baz/3' and the same arrayMap
     * would result in the generic pointer '/foo/-/bar/-/baz/-'
     * (the bar array has 3 tuple items, so index 2 is retained, but 4 is removed)
     *
     * The structure of the arrayMap is: [['path to array', number of tuple items]...]
     *
     *
     * //  { Pointer } indexedPointer - The indexed pointer (array or string)
     * //  { Map<string, number> } arrayMap - The optional array map (for preserving tuple indexes)
     * // { string } - The generic pointer with indexes removed
     * @param {?} indexedPointer
     * @param {?=} arrayMap
     * @return {?}
     */
    JsonPointer.toGenericPointer = /**
     * 'toGenericPointer' function
     *
     * Compares an indexed pointer to an array map and removes list array
     * indexes (but leaves tuple arrray indexes and all object keys, including
     * numeric keys) to create a generic pointer.
     *
     * For example, using the indexed pointer '/foo/1/bar/2/baz/3' and
     * the arrayMap [['/foo', 0], ['/foo/-/bar', 3], ['/foo/-/bar/-/baz', 0]]
     * would result in the generic pointer '/foo/-/bar/2/baz/-'
     * Using the indexed pointer '/foo/1/bar/4/baz/3' and the same arrayMap
     * would result in the generic pointer '/foo/-/bar/-/baz/-'
     * (the bar array has 3 tuple items, so index 2 is retained, but 4 is removed)
     *
     * The structure of the arrayMap is: [['path to array', number of tuple items]...]
     *
     *
     * //  { Pointer } indexedPointer - The indexed pointer (array or string)
     * //  { Map<string, number> } arrayMap - The optional array map (for preserving tuple indexes)
     * // { string } - The generic pointer with indexes removed
     * @param {?} indexedPointer
     * @param {?=} arrayMap
     * @return {?}
     */
    function (indexedPointer, arrayMap) {
        if (arrayMap === void 0) { arrayMap = new Map(); }
        if (this.isJsonPointer(indexedPointer) && isMap(arrayMap)) {
            /** @type {?} */
            var pointerArray = this.parse(indexedPointer);
            for (var i = 1; i < pointerArray.length; i++) {
                /** @type {?} */
                var subPointer = this.compile(pointerArray.slice(0, i));
                if (arrayMap.has(subPointer) &&
                    arrayMap.get(subPointer) <= +pointerArray[i]) {
                    pointerArray[i] = '-';
                }
            }
            return this.compile(pointerArray);
        }
        if (!this.isJsonPointer(indexedPointer)) {
            console.error("toGenericPointer error: invalid JSON Pointer: " + indexedPointer);
        }
        if (!isMap(arrayMap)) {
            console.error("toGenericPointer error: invalid arrayMap: " + arrayMap);
        }
    };
    /**
     * 'toControlPointer' function
     *
     * Accepts a JSON Pointer for a data object and returns a JSON Pointer for the
     * matching control in an Angular FormGroup.
     *
     * //  { Pointer } dataPointer - JSON Pointer (string or array) to a data object
     * //  { FormGroup } formGroup - Angular FormGroup to get value from
     * //  { boolean = false } controlMustExist - Only return if control exists?
     * // { Pointer } - JSON Pointer (string) to the formGroup object
     */
    /**
     * 'toControlPointer' function
     *
     * Accepts a JSON Pointer for a data object and returns a JSON Pointer for the
     * matching control in an Angular FormGroup.
     *
     * //  { Pointer } dataPointer - JSON Pointer (string or array) to a data object
     * //  { FormGroup } formGroup - Angular FormGroup to get value from
     * //  { boolean = false } controlMustExist - Only return if control exists?
     * // { Pointer } - JSON Pointer (string) to the formGroup object
     * @param {?} dataPointer
     * @param {?} formGroup
     * @param {?=} controlMustExist
     * @return {?}
     */
    JsonPointer.toControlPointer = /**
     * 'toControlPointer' function
     *
     * Accepts a JSON Pointer for a data object and returns a JSON Pointer for the
     * matching control in an Angular FormGroup.
     *
     * //  { Pointer } dataPointer - JSON Pointer (string or array) to a data object
     * //  { FormGroup } formGroup - Angular FormGroup to get value from
     * //  { boolean = false } controlMustExist - Only return if control exists?
     * // { Pointer } - JSON Pointer (string) to the formGroup object
     * @param {?} dataPointer
     * @param {?} formGroup
     * @param {?=} controlMustExist
     * @return {?}
     */
    function (dataPointer, formGroup, controlMustExist) {
        if (controlMustExist === void 0) { controlMustExist = false; }
        /** @type {?} */
        var dataPointerArray = this.parse(dataPointer);
        /** @type {?} */
        var controlPointerArray = [];
        /** @type {?} */
        var subGroup = formGroup;
        if (dataPointerArray !== null) {
            try {
                for (var dataPointerArray_1 = tslib_1.__values(dataPointerArray), dataPointerArray_1_1 = dataPointerArray_1.next(); !dataPointerArray_1_1.done; dataPointerArray_1_1 = dataPointerArray_1.next()) {
                    var key = dataPointerArray_1_1.value;
                    if (hasOwn(subGroup, 'controls')) {
                        controlPointerArray.push('controls');
                        subGroup = subGroup.controls;
                    }
                    if (isArray(subGroup) && (key === '-')) {
                        controlPointerArray.push((subGroup.length - 1).toString());
                        subGroup = subGroup[subGroup.length - 1];
                    }
                    else if (hasOwn(subGroup, key)) {
                        controlPointerArray.push(key);
                        subGroup = subGroup[key];
                    }
                    else if (controlMustExist) {
                        console.error("toControlPointer error: Unable to find \"" + key + "\" item in FormGroup.");
                        console.error(dataPointer);
                        console.error(formGroup);
                        return;
                    }
                    else {
                        controlPointerArray.push(key);
                        subGroup = { controls: {} };
                    }
                }
            }
            catch (e_7_1) { e_7 = { error: e_7_1 }; }
            finally {
                try {
                    if (dataPointerArray_1_1 && !dataPointerArray_1_1.done && (_a = dataPointerArray_1.return)) _a.call(dataPointerArray_1);
                }
                finally { if (e_7) throw e_7.error; }
            }
            return this.compile(controlPointerArray);
        }
        console.error("toControlPointer error: Invalid JSON Pointer: " + dataPointer);
        var e_7, _a;
    };
    /**
     * 'toSchemaPointer' function
     *
     * Accepts a JSON Pointer to a value inside a data object and a JSON schema
     * for that object.
     *
     * Returns a Pointer to the sub-schema for the value inside the object's schema.
     *
     * //  { Pointer } dataPointer - JSON Pointer (string or array) to an object
     * //   schema - JSON schema for the object
     * // { Pointer } - JSON Pointer (string) to the object's schema
     */
    /**
     * 'toSchemaPointer' function
     *
     * Accepts a JSON Pointer to a value inside a data object and a JSON schema
     * for that object.
     *
     * Returns a Pointer to the sub-schema for the value inside the object's schema.
     *
     * //  { Pointer } dataPointer - JSON Pointer (string or array) to an object
     * //   schema - JSON schema for the object
     * // { Pointer } - JSON Pointer (string) to the object's schema
     * @param {?} dataPointer
     * @param {?} schema
     * @return {?}
     */
    JsonPointer.toSchemaPointer = /**
     * 'toSchemaPointer' function
     *
     * Accepts a JSON Pointer to a value inside a data object and a JSON schema
     * for that object.
     *
     * Returns a Pointer to the sub-schema for the value inside the object's schema.
     *
     * //  { Pointer } dataPointer - JSON Pointer (string or array) to an object
     * //   schema - JSON schema for the object
     * // { Pointer } - JSON Pointer (string) to the object's schema
     * @param {?} dataPointer
     * @param {?} schema
     * @return {?}
     */
    function (dataPointer, schema) {
        if (this.isJsonPointer(dataPointer) && typeof schema === 'object') {
            /** @type {?} */
            var pointerArray = this.parse(dataPointer);
            if (!pointerArray.length) {
                return '';
            }
            /** @type {?} */
            var firstKey = pointerArray.shift();
            if (schema.type === 'object' || schema.properties || schema.additionalProperties) {
                if ((schema.properties || {})[firstKey]) {
                    return "/properties/" + this.escape(firstKey) +
                        this.toSchemaPointer(pointerArray, schema.properties[firstKey]);
                }
                else if (schema.additionalProperties) {
                    return '/additionalProperties' +
                        this.toSchemaPointer(pointerArray, schema.additionalProperties);
                }
            }
            if ((schema.type === 'array' || schema.items) &&
                (isNumber(firstKey) || firstKey === '-' || firstKey === '')) {
                /** @type {?} */
                var arrayItem = firstKey === '-' || firstKey === '' ? 0 : +firstKey;
                if (isArray(schema.items)) {
                    if (arrayItem < schema.items.length) {
                        return '/items/' + arrayItem +
                            this.toSchemaPointer(pointerArray, schema.items[arrayItem]);
                    }
                    else if (schema.additionalItems) {
                        return '/additionalItems' +
                            this.toSchemaPointer(pointerArray, schema.additionalItems);
                    }
                }
                else if (isObject(schema.items)) {
                    return '/items' + this.toSchemaPointer(pointerArray, schema.items);
                }
                else if (isObject(schema.additionalItems)) {
                    return '/additionalItems' +
                        this.toSchemaPointer(pointerArray, schema.additionalItems);
                }
            }
            console.error("toSchemaPointer error: Data pointer " + dataPointer + " " +
                ("not compatible with schema " + schema));
            return null;
        }
        if (!this.isJsonPointer(dataPointer)) {
            console.error("toSchemaPointer error: Invalid JSON Pointer: " + dataPointer);
        }
        if (typeof schema !== 'object') {
            console.error("toSchemaPointer error: Invalid JSON Schema: " + schema);
        }
        return null;
    };
    /**
     * 'toDataPointer' function
     *
     * Accepts a JSON Pointer to a sub-schema inside a JSON schema and the schema.
     *
     * If possible, returns a generic Pointer to the corresponding value inside
     * the data object described by the JSON schema.
     *
     * Returns null if the sub-schema is in an ambiguous location (such as
     * definitions or additionalProperties) where the corresponding value
     * location cannot be determined.
     *
     * //  { Pointer } schemaPointer - JSON Pointer (string or array) to a JSON schema
     * //   schema - the JSON schema
     * //  { boolean = false } errors - Show errors?
     * // { Pointer } - JSON Pointer (string) to the value in the data object
     */
    /**
     * 'toDataPointer' function
     *
     * Accepts a JSON Pointer to a sub-schema inside a JSON schema and the schema.
     *
     * If possible, returns a generic Pointer to the corresponding value inside
     * the data object described by the JSON schema.
     *
     * Returns null if the sub-schema is in an ambiguous location (such as
     * definitions or additionalProperties) where the corresponding value
     * location cannot be determined.
     *
     * //  { Pointer } schemaPointer - JSON Pointer (string or array) to a JSON schema
     * //   schema - the JSON schema
     * //  { boolean = false } errors - Show errors?
     * // { Pointer } - JSON Pointer (string) to the value in the data object
     * @param {?} schemaPointer
     * @param {?} schema
     * @param {?=} errors
     * @return {?}
     */
    JsonPointer.toDataPointer = /**
     * 'toDataPointer' function
     *
     * Accepts a JSON Pointer to a sub-schema inside a JSON schema and the schema.
     *
     * If possible, returns a generic Pointer to the corresponding value inside
     * the data object described by the JSON schema.
     *
     * Returns null if the sub-schema is in an ambiguous location (such as
     * definitions or additionalProperties) where the corresponding value
     * location cannot be determined.
     *
     * //  { Pointer } schemaPointer - JSON Pointer (string or array) to a JSON schema
     * //   schema - the JSON schema
     * //  { boolean = false } errors - Show errors?
     * // { Pointer } - JSON Pointer (string) to the value in the data object
     * @param {?} schemaPointer
     * @param {?} schema
     * @param {?=} errors
     * @return {?}
     */
    function (schemaPointer, schema, errors) {
        if (errors === void 0) { errors = false; }
        if (this.isJsonPointer(schemaPointer) && typeof schema === 'object' &&
            this.has(schema, schemaPointer)) {
            /** @type {?} */
            var pointerArray = this.parse(schemaPointer);
            if (!pointerArray.length) {
                return '';
            }
            /** @type {?} */
            var dataPointer = '';
            /** @type {?} */
            var firstKey = pointerArray.shift();
            if (firstKey === 'properties' ||
                (firstKey === 'items' && isArray(schema.items))) {
                /** @type {?} */
                var secondKey = pointerArray.shift();
                /** @type {?} */
                var pointerSuffix = this.toDataPointer(pointerArray, schema[firstKey][secondKey]);
                return pointerSuffix === null ? null : '/' + secondKey + pointerSuffix;
            }
            else if (firstKey === 'additionalItems' ||
                (firstKey === 'items' && isObject(schema.items))) {
                /** @type {?} */
                var pointerSuffix = this.toDataPointer(pointerArray, schema[firstKey]);
                return pointerSuffix === null ? null : '/-' + pointerSuffix;
            }
            else if (['allOf', 'anyOf', 'oneOf'].includes(firstKey)) {
                /** @type {?} */
                var secondKey = pointerArray.shift();
                return this.toDataPointer(pointerArray, schema[firstKey][secondKey]);
            }
            else if (firstKey === 'not') {
                return this.toDataPointer(pointerArray, schema[firstKey]);
            }
            else if (['contains', 'definitions', 'dependencies', 'additionalItems',
                'additionalProperties', 'patternProperties', 'propertyNames'].includes(firstKey)) {
                if (errors) {
                    console.error("toDataPointer error: Ambiguous location");
                }
            }
            return '';
        }
        if (errors) {
            if (!this.isJsonPointer(schemaPointer)) {
                console.error("toDataPointer error: Invalid JSON Pointer: " + schemaPointer);
            }
            if (typeof schema !== 'object') {
                console.error("toDataPointer error: Invalid JSON Schema: " + schema);
            }
            if (typeof schema !== 'object') {
                console.error("toDataPointer error: Pointer " + schemaPointer + " invalid for Schema: " + schema);
            }
        }
        return null;
    };
    /**
     * 'parseObjectPath' function
     *
     * Parses a JavaScript object path into an array of keys, which
     * can then be passed to compile() to convert into a string JSON Pointer.
     *
     * Based on mike-marcacci's excellent objectpath parse function:
     * https://github.com/mike-marcacci/objectpath
     *
     * //  { Pointer } path - The object path to parse
     * // { string[] } - The resulting array of keys
     */
    /**
     * 'parseObjectPath' function
     *
     * Parses a JavaScript object path into an array of keys, which
     * can then be passed to compile() to convert into a string JSON Pointer.
     *
     * Based on mike-marcacci's excellent objectpath parse function:
     * https://github.com/mike-marcacci/objectpath
     *
     * //  { Pointer } path - The object path to parse
     * // { string[] } - The resulting array of keys
     * @param {?} path
     * @return {?}
     */
    JsonPointer.parseObjectPath = /**
     * 'parseObjectPath' function
     *
     * Parses a JavaScript object path into an array of keys, which
     * can then be passed to compile() to convert into a string JSON Pointer.
     *
     * Based on mike-marcacci's excellent objectpath parse function:
     * https://github.com/mike-marcacci/objectpath
     *
     * //  { Pointer } path - The object path to parse
     * // { string[] } - The resulting array of keys
     * @param {?} path
     * @return {?}
     */
    function (path) {
        if (isArray(path)) {
            return /** @type {?} */ (path);
        }
        if (this.isJsonPointer(path)) {
            return this.parse(path);
        }
        if (typeof path === 'string') {
            /** @type {?} */
            var index = 0;
            /** @type {?} */
            var parts = [];
            while (index < path.length) {
                /** @type {?} */
                var nextDot = path.indexOf('.', index);
                /** @type {?} */
                var nextOB = path.indexOf('[', index); // next open bracket
                if (nextDot === -1 && nextOB === -1) {
                    // last item
                    parts.push(path.slice(index));
                    index = path.length;
                }
                else if (nextDot !== -1 && (nextDot < nextOB || nextOB === -1)) {
                    // dot notation
                    parts.push(path.slice(index, nextDot));
                    index = nextDot + 1;
                }
                else {
                    // bracket notation
                    if (nextOB > index) {
                        parts.push(path.slice(index, nextOB));
                        index = nextOB;
                    }
                    /** @type {?} */
                    var quote = path.charAt(nextOB + 1);
                    if (quote === '"' || quote === "'") {
                        /** @type {?} */
                        var nextCB = path.indexOf(quote + ']', nextOB); // next close bracket
                        while (nextCB !== -1 && path.charAt(nextCB - 1) === '\\') {
                            nextCB = path.indexOf(quote + ']', nextCB + 2);
                        }
                        if (nextCB === -1) {
                            nextCB = path.length;
                        }
                        parts.push(path.slice(index + 2, nextCB)
                            .replace(new RegExp('\\' + quote, 'g'), quote));
                        index = nextCB + 2;
                    }
                    else {
                        /** @type {?} */
                        var nextCB = path.indexOf(']', nextOB); // next close bracket
                        if (nextCB === -1) {
                            nextCB = path.length;
                        }
                        parts.push(path.slice(index + 1, nextCB));
                        index = nextCB + 1;
                    }
                    if (path.charAt(index) === '.') {
                        index++;
                    }
                }
            }
            return parts;
        }
        console.error('parseObjectPath error: Input object path must be a string.');
    };
    JsonPointer.decorators = [
        { type: Injectable },
    ];
    return JsonPointer;
}());
export { JsonPointer };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbnBvaW50ZXIuZnVuY3Rpb25zLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmc2LWpzb24tc2NoZW1hLWZvcm0vIiwic291cmNlcyI6WyJsaWIvc2hhcmVkL2pzb25wb2ludGVyLmZ1bmN0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUNMLFNBQVMsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFDakUsTUFBTSx1QkFBdUIsQ0FBQztBQUMvQixPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLHFCQUFxQixDQUFDOzs7Ozs7O0lBcUJqRDs7Ozs7Ozs7Ozs7O09BWUc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUNJLGVBQUc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBQVYsVUFDRSxNQUFNLEVBQUUsT0FBTyxFQUFFLFVBQWMsRUFBRSxRQUF1QixFQUN4RCxVQUFrQixFQUFFLE1BQWM7UUFEakIsMkJBQUEsRUFBQSxjQUFjO1FBQUUseUJBQUEsRUFBQSxlQUF1QjtRQUN4RCwyQkFBQSxFQUFBLGtCQUFrQjtRQUFFLHVCQUFBLEVBQUEsY0FBYztRQUVsQyxFQUFFLENBQUMsQ0FBQyxNQUFNLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztZQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO1NBQUU7O1FBQy9ELElBQUksUUFBUSxHQUFVLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ2xELEVBQUUsQ0FBQyxDQUFDLE9BQU8sTUFBTSxLQUFLLFFBQVEsSUFBSSxRQUFRLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQzs7WUFDcEQsSUFBSSxTQUFTLEdBQUcsTUFBTSxDQUFDO1lBQ3ZC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YSxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge1xuICBpc0RlZmluZWQsIGlzRW1wdHksIGlzT2JqZWN0LCBpc0FycmF5LCBpc01hcCwgaXNOdW1iZXIsIGlzU3RyaW5nXG59IGZyb20gJy4vdmFsaWRhdG9yLmZ1bmN0aW9ucyc7XG5pbXBvcnQgeyBoYXNPd24sIGNvcHkgfSBmcm9tICcuL3V0aWxpdHkuZnVuY3Rpb25zJztcblxuLyoqXG4gKiAnSnNvblBvaW50ZXInIGNsYXNzXG4gKlxuICogU29tZSB1dGlsaXRpZXMgZm9yIHVzaW5nIEpTT04gUG9pbnRlcnMgd2l0aCBKU09OIG9iamVjdHNcbiAqIGh0dHBzOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmM2OTAxXG4gKlxuICogZ2V0LCBnZXRDb3B5LCBnZXRGaXJzdCwgc2V0LCBzZXRDb3B5LCBpbnNlcnQsIGluc2VydENvcHksIHJlbW92ZSwgaGFzLCBkaWN0LFxuICogZm9yRWFjaERlZXAsIGZvckVhY2hEZWVwQ29weSwgZXNjYXBlLCB1bmVzY2FwZSwgcGFyc2UsIGNvbXBpbGUsIHRvS2V5LFxuICogaXNKc29uUG9pbnRlciwgaXNTdWJQb2ludGVyLCB0b0luZGV4ZWRQb2ludGVyLCB0b0dlbmVyaWNQb2ludGVyLFxuICogdG9Db250cm9sUG9pbnRlciwgdG9TY2hlbWFQb2ludGVyLCB0b0RhdGFQb2ludGVyLCBwYXJzZU9iamVjdFBhdGhcbiAqXG4gKiBTb21lIGZ1bmN0aW9ucyBiYXNlZCBvbiBtYW51ZWxzdG9mZXIncyBqc29uLXBvaW50ZXIgdXRpbGl0aWVzXG4gKiBodHRwczovL2dpdGh1Yi5jb20vbWFudWVsc3RvZmVyL2pzb24tcG9pbnRlclxuICovXG5leHBvcnQgdHlwZSBQb2ludGVyID0gc3RyaW5nIHwgc3RyaW5nW107XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBKc29uUG9pbnRlciB7XG5cbiAgLyoqXG4gICAqICdnZXQnIGZ1bmN0aW9uXG4gICAqXG4gICAqIFVzZXMgYSBKU09OIFBvaW50ZXIgdG8gcmV0cmlldmUgYSB2YWx1ZSBmcm9tIGFuIG9iamVjdC5cbiAgICpcbiAgICogLy8gIHsgb2JqZWN0IH0gb2JqZWN0IC0gT2JqZWN0IHRvIGdldCB2YWx1ZSBmcm9tXG4gICAqIC8vICB7IFBvaW50ZXIgfSBwb2ludGVyIC0gSlNPTiBQb2ludGVyIChzdHJpbmcgb3IgYXJyYXkpXG4gICAqIC8vICB7IG51bWJlciA9IDAgfSBzdGFydFNsaWNlIC0gWmVyby1iYXNlZCBpbmRleCBvZiBmaXJzdCBQb2ludGVyIGtleSB0byB1c2VcbiAgICogLy8gIHsgbnVtYmVyIH0gZW5kU2xpY2UgLSBaZXJvLWJhc2VkIGluZGV4IG9mIGxhc3QgUG9pbnRlciBrZXkgdG8gdXNlXG4gICAqIC8vICB7IGJvb2xlYW4gPSBmYWxzZSB9IGdldEJvb2xlYW4gLSBSZXR1cm4gb25seSB0cnVlIG9yIGZhbHNlP1xuICAgKiAvLyAgeyBib29sZWFuID0gZmFsc2UgfSBlcnJvcnMgLSBTaG93IGVycm9yIGlmIG5vdCBmb3VuZD9cbiAgICogLy8geyBvYmplY3QgfSAtIExvY2F0ZWQgdmFsdWUgKG9yIHRydWUgb3IgZmFsc2UgaWYgZ2V0Qm9vbGVhbiA9IHRydWUpXG4gICAqL1xuICBzdGF0aWMgZ2V0KFxuICAgIG9iamVjdCwgcG9pbnRlciwgc3RhcnRTbGljZSA9IDAsIGVuZFNsaWNlOiBudW1iZXIgPSBudWxsLFxuICAgIGdldEJvb2xlYW4gPSBmYWxzZSwgZXJyb3JzID0gZmFsc2VcbiAgKSB7XG4gICAgaWYgKG9iamVjdCA9PT0gbnVsbCkgeyByZXR1cm4gZ2V0Qm9vbGVhbiA/IGZhbHNlIDogdW5kZWZpbmVkOyB9XG4gICAgbGV0IGtleUFycmF5OiBhbnlbXSA9IHRoaXMucGFyc2UocG9pbnRlciwgZXJyb3JzKTtcbiAgICBpZiAodHlwZW9mIG9iamVjdCA9PT0gJ29iamVjdCcgJiYga2V5QXJyYXkgIT09IG51bGwpIHtcbiAgICAgIGxldCBzdWJPYmplY3QgPSBvYmplY3Q7XG4gICAgICBpZiAoc3RhcnRTbGljZSA+PSBrZXlBcnJheS5sZW5ndGggfHwgZW5kU2xpY2UgPD0gLWtleUFycmF5Lmxlbmd0aCkgeyByZXR1cm4gb2JqZWN0OyB9XG4gICAgICBpZiAoc3RhcnRTbGljZSA8PSAta2V5QXJyYXkubGVuZ3RoKSB7IHN0YXJ0U2xpY2UgPSAwOyB9XG4gICAgICBpZiAoIWlzRGVmaW5lZChlbmRTbGljZSkgfHwgZW5kU2xpY2UgPj0ga2V5QXJyYXkubGVuZ3RoKSB7IGVuZFNsaWNlID0ga2V5QXJyYXkubGVuZ3RoOyB9XG4gICAgICBrZXlBcnJheSA9IGtleUFycmF5LnNsaWNlKHN0YXJ0U2xpY2UsIGVuZFNsaWNlKTtcbiAgICAgIGZvciAobGV0IGtleSBvZiBrZXlBcnJheSkge1xuICAgICAgICBpZiAoa2V5ID09PSAnLScgJiYgaXNBcnJheShzdWJPYmplY3QpICYmIHN1Yk9iamVjdC5sZW5ndGgpIHtcbiAgICAgICAgICBrZXkgPSBzdWJPYmplY3QubGVuZ3RoIC0gMTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNNYXAoc3ViT2JqZWN0KSAmJiBzdWJPYmplY3QuaGFzKGtleSkpIHtcbiAgICAgICAgICBzdWJPYmplY3QgPSBzdWJPYmplY3QuZ2V0KGtleSk7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHN1Yk9iamVjdCA9PT0gJ29iamVjdCcgJiYgc3ViT2JqZWN0ICE9PSBudWxsICYmXG4gICAgICAgICAgaGFzT3duKHN1Yk9iamVjdCwga2V5KVxuICAgICAgICApIHtcbiAgICAgICAgICBzdWJPYmplY3QgPSBzdWJPYmplY3Rba2V5XTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoZXJyb3JzKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGBnZXQgZXJyb3I6IFwiJHtrZXl9XCIga2V5IG5vdCBmb3VuZCBpbiBvYmplY3QuYCk7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKHBvaW50ZXIpO1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihvYmplY3QpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gZ2V0Qm9vbGVhbiA/IGZhbHNlIDogdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gZ2V0Qm9vbGVhbiA/IHRydWUgOiBzdWJPYmplY3Q7XG4gICAgfVxuICAgIGlmIChlcnJvcnMgJiYga2V5QXJyYXkgPT09IG51bGwpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoYGdldCBlcnJvcjogSW52YWxpZCBKU09OIFBvaW50ZXI6ICR7cG9pbnRlcn1gKTtcbiAgICB9XG4gICAgaWYgKGVycm9ycyAmJiB0eXBlb2Ygb2JqZWN0ICE9PSAnb2JqZWN0Jykge1xuICAgICAgY29uc29sZS5lcnJvcignZ2V0IGVycm9yOiBJbnZhbGlkIG9iamVjdDonKTtcbiAgICAgIGNvbnNvbGUuZXJyb3Iob2JqZWN0KTtcbiAgICB9XG4gICAgcmV0dXJuIGdldEJvb2xlYW4gPyBmYWxzZSA6IHVuZGVmaW5lZDtcbiAgfVxuXG4gIC8qKlxuICAgKiAnZ2V0Q29weScgZnVuY3Rpb25cbiAgICpcbiAgICogVXNlcyBhIEpTT04gUG9pbnRlciB0byBkZWVwbHkgY2xvbmUgYSB2YWx1ZSBmcm9tIGFuIG9iamVjdC5cbiAgICpcbiAgICogLy8gIHsgb2JqZWN0IH0gb2JqZWN0IC0gT2JqZWN0IHRvIGdldCB2YWx1ZSBmcm9tXG4gICAqIC8vICB7IFBvaW50ZXIgfSBwb2ludGVyIC0gSlNPTiBQb2ludGVyIChzdHJpbmcgb3IgYXJyYXkpXG4gICAqIC8vICB7IG51bWJlciA9IDAgfSBzdGFydFNsaWNlIC0gWmVyby1iYXNlZCBpbmRleCBvZiBmaXJzdCBQb2ludGVyIGtleSB0byB1c2VcbiAgICogLy8gIHsgbnVtYmVyIH0gZW5kU2xpY2UgLSBaZXJvLWJhc2VkIGluZGV4IG9mIGxhc3QgUG9pbnRlciBrZXkgdG8gdXNlXG4gICAqIC8vICB7IGJvb2xlYW4gPSBmYWxzZSB9IGdldEJvb2xlYW4gLSBSZXR1cm4gb25seSB0cnVlIG9yIGZhbHNlP1xuICAgKiAvLyAgeyBib29sZWFuID0gZmFsc2UgfSBlcnJvcnMgLSBTaG93IGVycm9yIGlmIG5vdCBmb3VuZD9cbiAgICogLy8geyBvYmplY3QgfSAtIExvY2F0ZWQgdmFsdWUgKG9yIHRydWUgb3IgZmFsc2UgaWYgZ2V0Qm9vbGVhbiA9IHRydWUpXG4gICAqL1xuICBzdGF0aWMgZ2V0Q29weShcbiAgICBvYmplY3QsIHBvaW50ZXIsIHN0YXJ0U2xpY2UgPSAwLCBlbmRTbGljZTogbnVtYmVyID0gbnVsbCxcbiAgICBnZXRCb29sZWFuID0gZmFsc2UsIGVycm9ycyA9IGZhbHNlXG4gICkge1xuICAgIGNvbnN0IG9iamVjdFRvQ29weSA9XG4gICAgICB0aGlzLmdldChvYmplY3QsIHBvaW50ZXIsIHN0YXJ0U2xpY2UsIGVuZFNsaWNlLCBnZXRCb29sZWFuLCBlcnJvcnMpO1xuICAgIHJldHVybiB0aGlzLmZvckVhY2hEZWVwQ29weShvYmplY3RUb0NvcHkpO1xuICB9XG5cbiAgLyoqXG4gICAqICdnZXRGaXJzdCcgZnVuY3Rpb25cbiAgICpcbiAgICogVGFrZXMgYW4gYXJyYXkgb2YgSlNPTiBQb2ludGVycyBhbmQgb2JqZWN0cyxcbiAgICogY2hlY2tzIGVhY2ggb2JqZWN0IGZvciBhIHZhbHVlIHNwZWNpZmllZCBieSB0aGUgcG9pbnRlcixcbiAgICogYW5kIHJldHVybnMgdGhlIGZpcnN0IHZhbHVlIGZvdW5kLlxuICAgKlxuICAgKiAvLyAgeyBbb2JqZWN0LCBwb2ludGVyXVtdIH0gaXRlbXMgLSBBcnJheSBvZiBvYmplY3RzIGFuZCBwb2ludGVycyB0byBjaGVja1xuICAgKiAvLyAgeyBhbnkgPSBudWxsIH0gZGVmYXVsdFZhbHVlIC0gVmFsdWUgdG8gcmV0dXJuIGlmIG5vdGhpbmcgZm91bmRcbiAgICogLy8gIHsgYm9vbGVhbiA9IGZhbHNlIH0gZ2V0Q29weSAtIFJldHVybiBhIGNvcHkgaW5zdGVhZD9cbiAgICogLy8gIC0gRmlyc3QgdmFsdWUgZm91bmRcbiAgICovXG4gIHN0YXRpYyBnZXRGaXJzdChpdGVtcywgZGVmYXVsdFZhbHVlOiBhbnkgPSBudWxsLCBnZXRDb3B5ID0gZmFsc2UpIHtcbiAgICBpZiAoaXNFbXB0eShpdGVtcykpIHsgcmV0dXJuOyB9XG4gICAgaWYgKGlzQXJyYXkoaXRlbXMpKSB7XG4gICAgICBmb3IgKGxldCBpdGVtIG9mIGl0ZW1zKSB7XG4gICAgICAgIGlmIChpc0VtcHR5KGl0ZW0pKSB7IGNvbnRpbnVlOyB9XG4gICAgICAgIGlmIChpc0FycmF5KGl0ZW0pICYmIGl0ZW0ubGVuZ3RoID49IDIpIHtcbiAgICAgICAgICBpZiAoaXNFbXB0eShpdGVtWzBdKSB8fCBpc0VtcHR5KGl0ZW1bMV0pKSB7IGNvbnRpbnVlOyB9XG4gICAgICAgICAgY29uc3QgdmFsdWUgPSBnZXRDb3B5ID9cbiAgICAgICAgICAgIHRoaXMuZ2V0Q29weShpdGVtWzBdLCBpdGVtWzFdKSA6XG4gICAgICAgICAgICB0aGlzLmdldChpdGVtWzBdLCBpdGVtWzFdKTtcbiAgICAgICAgICBpZiAodmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5lcnJvcignZ2V0Rmlyc3QgZXJyb3I6IElucHV0IG5vdCBpbiBjb3JyZWN0IGZvcm1hdC5cXG4nICtcbiAgICAgICAgICAnU2hvdWxkIGJlOiBbIFsgb2JqZWN0MSwgcG9pbnRlcjEgXSwgWyBvYmplY3QgMiwgcG9pbnRlcjIgXSwgZXRjLi4uIF0nKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGRlZmF1bHRWYWx1ZTtcbiAgICB9XG4gICAgaWYgKGlzTWFwKGl0ZW1zKSkge1xuICAgICAgZm9yIChsZXQgW29iamVjdCwgcG9pbnRlcl0gb2YgaXRlbXMpIHtcbiAgICAgICAgaWYgKG9iamVjdCA9PT0gbnVsbCB8fCAhdGhpcy5pc0pzb25Qb2ludGVyKHBvaW50ZXIpKSB7IGNvbnRpbnVlOyB9XG4gICAgICAgIGNvbnN0IHZhbHVlID0gZ2V0Q29weSA/XG4gICAgICAgICAgdGhpcy5nZXRDb3B5KG9iamVjdCwgcG9pbnRlcikgOlxuICAgICAgICAgIHRoaXMuZ2V0KG9iamVjdCwgcG9pbnRlcik7XG4gICAgICAgIGlmICh2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBkZWZhdWx0VmFsdWU7XG4gICAgfVxuICAgIGNvbnNvbGUuZXJyb3IoJ2dldEZpcnN0IGVycm9yOiBJbnB1dCBub3QgaW4gY29ycmVjdCBmb3JtYXQuXFxuJyArXG4gICAgICAnU2hvdWxkIGJlOiBbIFsgb2JqZWN0MSwgcG9pbnRlcjEgXSwgWyBvYmplY3QgMiwgcG9pbnRlcjIgXSwgZXRjLi4uIF0nKTtcbiAgICByZXR1cm4gZGVmYXVsdFZhbHVlO1xuICB9XG5cbiAgLyoqXG4gICAqICdnZXRGaXJzdENvcHknIGZ1bmN0aW9uXG4gICAqXG4gICAqIFNpbWlsYXIgdG8gZ2V0Rmlyc3QsIGJ1dCBhbHdheXMgcmV0dXJucyBhIGNvcHkuXG4gICAqXG4gICAqIC8vICB7IFtvYmplY3QsIHBvaW50ZXJdW10gfSBpdGVtcyAtIEFycmF5IG9mIG9iamVjdHMgYW5kIHBvaW50ZXJzIHRvIGNoZWNrXG4gICAqIC8vICB7IGFueSA9IG51bGwgfSBkZWZhdWx0VmFsdWUgLSBWYWx1ZSB0byByZXR1cm4gaWYgbm90aGluZyBmb3VuZFxuICAgKiAvLyAgLSBDb3B5IG9mIGZpcnN0IHZhbHVlIGZvdW5kXG4gICAqL1xuICBzdGF0aWMgZ2V0Rmlyc3RDb3B5KGl0ZW1zLCBkZWZhdWx0VmFsdWU6IGFueSA9IG51bGwpIHtcbiAgICBjb25zdCBmaXJzdENvcHkgPSB0aGlzLmdldEZpcnN0KGl0ZW1zLCBkZWZhdWx0VmFsdWUsIHRydWUpO1xuICAgIHJldHVybiBmaXJzdENvcHk7XG4gIH1cblxuICAvKipcbiAgICogJ3NldCcgZnVuY3Rpb25cbiAgICpcbiAgICogVXNlcyBhIEpTT04gUG9pbnRlciB0byBzZXQgYSB2YWx1ZSBvbiBhbiBvYmplY3QuXG4gICAqIEFsc28gY3JlYXRlcyBhbnkgbWlzc2luZyBzdWIgb2JqZWN0cyBvciBhcnJheXMgdG8gY29udGFpbiB0aGF0IHZhbHVlLlxuICAgKlxuICAgKiBJZiB0aGUgb3B0aW9uYWwgZm91cnRoIHBhcmFtZXRlciBpcyBUUlVFIGFuZCB0aGUgaW5uZXItbW9zdCBjb250YWluZXJcbiAgICogaXMgYW4gYXJyYXksIHRoZSBmdW5jdGlvbiB3aWxsIGluc2VydCB0aGUgdmFsdWUgYXMgYSBuZXcgaXRlbSBhdCB0aGVcbiAgICogc3BlY2lmaWVkIGxvY2F0aW9uIGluIHRoZSBhcnJheSwgcmF0aGVyIHRoYW4gb3ZlcndyaXRpbmcgdGhlIGV4aXN0aW5nXG4gICAqIHZhbHVlIChpZiBhbnkpIGF0IHRoYXQgbG9jYXRpb24uXG4gICAqXG4gICAqIFNvIHNldChbMSwgMiwgM10sICcvMScsIDQpID0+IFsxLCA0LCAzXVxuICAgKiBhbmRcbiAgICogU28gc2V0KFsxLCAyLCAzXSwgJy8xJywgNCwgdHJ1ZSkgPT4gWzEsIDQsIDIsIDNdXG4gICAqXG4gICAqIC8vICB7IG9iamVjdCB9IG9iamVjdCAtIFRoZSBvYmplY3QgdG8gc2V0IHZhbHVlIGluXG4gICAqIC8vICB7IFBvaW50ZXIgfSBwb2ludGVyIC0gVGhlIEpTT04gUG9pbnRlciAoc3RyaW5nIG9yIGFycmF5KVxuICAgKiAvLyAgIHZhbHVlIC0gVGhlIG5ldyB2YWx1ZSB0byBzZXRcbiAgICogLy8gIHsgYm9vbGVhbiB9IGluc2VydCAtIGluc2VydCB2YWx1ZT9cbiAgICogLy8geyBvYmplY3QgfSAtIFRoZSBvcmlnaW5hbCBvYmplY3QsIG1vZGlmaWVkIHdpdGggdGhlIHNldCB2YWx1ZVxuICAgKi9cbiAgc3RhdGljIHNldChvYmplY3QsIHBvaW50ZXIsIHZhbHVlLCBpbnNlcnQgPSBmYWxzZSkge1xuICAgIGNvbnN0IGtleUFycmF5ID0gdGhpcy5wYXJzZShwb2ludGVyKTtcbiAgICBpZiAoa2V5QXJyYXkgIT09IG51bGwgJiYga2V5QXJyYXkubGVuZ3RoKSB7XG4gICAgICBsZXQgc3ViT2JqZWN0ID0gb2JqZWN0O1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBrZXlBcnJheS5sZW5ndGggLSAxOyArK2kpIHtcbiAgICAgICAgbGV0IGtleSA9IGtleUFycmF5W2ldO1xuICAgICAgICBpZiAoa2V5ID09PSAnLScgJiYgaXNBcnJheShzdWJPYmplY3QpKSB7XG4gICAgICAgICAga2V5ID0gc3ViT2JqZWN0Lmxlbmd0aDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNNYXAoc3ViT2JqZWN0KSAmJiBzdWJPYmplY3QuaGFzKGtleSkpIHtcbiAgICAgICAgICBzdWJPYmplY3QgPSBzdWJPYmplY3QuZ2V0KGtleSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKCFoYXNPd24oc3ViT2JqZWN0LCBrZXkpKSB7XG4gICAgICAgICAgICBzdWJPYmplY3Rba2V5XSA9IChrZXlBcnJheVtpICsgMV0ubWF0Y2goL14oXFxkK3wtKSQvKSkgPyBbXSA6IHt9O1xuICAgICAgICAgIH1cbiAgICAgICAgICBzdWJPYmplY3QgPSBzdWJPYmplY3Rba2V5XTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbGV0IGxhc3RLZXkgPSBrZXlBcnJheVtrZXlBcnJheS5sZW5ndGggLSAxXTtcbiAgICAgIGlmIChpc0FycmF5KHN1Yk9iamVjdCkgJiYgbGFzdEtleSA9PT0gJy0nKSB7XG4gICAgICAgIHN1Yk9iamVjdC5wdXNoKHZhbHVlKTtcbiAgICAgIH0gZWxzZSBpZiAoaW5zZXJ0ICYmIGlzQXJyYXkoc3ViT2JqZWN0KSAmJiAhaXNOYU4oK2xhc3RLZXkpKSB7XG4gICAgICAgIHN1Yk9iamVjdC5zcGxpY2UobGFzdEtleSwgMCwgdmFsdWUpO1xuICAgICAgfSBlbHNlIGlmIChpc01hcChzdWJPYmplY3QpKSB7XG4gICAgICAgIHN1Yk9iamVjdC5zZXQobGFzdEtleSwgdmFsdWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3ViT2JqZWN0W2xhc3RLZXldID0gdmFsdWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gb2JqZWN0O1xuICAgIH1cbiAgICBjb25zb2xlLmVycm9yKGBzZXQgZXJyb3I6IEludmFsaWQgSlNPTiBQb2ludGVyOiAke3BvaW50ZXJ9YCk7XG4gICAgcmV0dXJuIG9iamVjdDtcbiAgfVxuXG4gIC8qKlxuICAgKiAnc2V0Q29weScgZnVuY3Rpb25cbiAgICpcbiAgICogQ29waWVzIGFuIG9iamVjdCBhbmQgdXNlcyBhIEpTT04gUG9pbnRlciB0byBzZXQgYSB2YWx1ZSBvbiB0aGUgY29weS5cbiAgICogQWxzbyBjcmVhdGVzIGFueSBtaXNzaW5nIHN1YiBvYmplY3RzIG9yIGFycmF5cyB0byBjb250YWluIHRoYXQgdmFsdWUuXG4gICAqXG4gICAqIElmIHRoZSBvcHRpb25hbCBmb3VydGggcGFyYW1ldGVyIGlzIFRSVUUgYW5kIHRoZSBpbm5lci1tb3N0IGNvbnRhaW5lclxuICAgKiBpcyBhbiBhcnJheSwgdGhlIGZ1bmN0aW9uIHdpbGwgaW5zZXJ0IHRoZSB2YWx1ZSBhcyBhIG5ldyBpdGVtIGF0IHRoZVxuICAgKiBzcGVjaWZpZWQgbG9jYXRpb24gaW4gdGhlIGFycmF5LCByYXRoZXIgdGhhbiBvdmVyd3JpdGluZyB0aGUgZXhpc3RpbmcgdmFsdWUuXG4gICAqXG4gICAqIC8vICB7IG9iamVjdCB9IG9iamVjdCAtIFRoZSBvYmplY3QgdG8gY29weSBhbmQgc2V0IHZhbHVlIGluXG4gICAqIC8vICB7IFBvaW50ZXIgfSBwb2ludGVyIC0gVGhlIEpTT04gUG9pbnRlciAoc3RyaW5nIG9yIGFycmF5KVxuICAgKiAvLyAgIHZhbHVlIC0gVGhlIHZhbHVlIHRvIHNldFxuICAgKiAvLyAgeyBib29sZWFuIH0gaW5zZXJ0IC0gaW5zZXJ0IHZhbHVlP1xuICAgKiAvLyB7IG9iamVjdCB9IC0gVGhlIG5ldyBvYmplY3Qgd2l0aCB0aGUgc2V0IHZhbHVlXG4gICAqL1xuICBzdGF0aWMgc2V0Q29weShvYmplY3QsIHBvaW50ZXIsIHZhbHVlLCBpbnNlcnQgPSBmYWxzZSkge1xuICAgIGNvbnN0IGtleUFycmF5ID0gdGhpcy5wYXJzZShwb2ludGVyKTtcbiAgICBpZiAoa2V5QXJyYXkgIT09IG51bGwpIHtcbiAgICAgIGxldCBuZXdPYmplY3QgPSBjb3B5KG9iamVjdCk7XG4gICAgICBsZXQgc3ViT2JqZWN0ID0gbmV3T2JqZWN0O1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBrZXlBcnJheS5sZW5ndGggLSAxOyArK2kpIHtcbiAgICAgICAgbGV0IGtleSA9IGtleUFycmF5W2ldO1xuICAgICAgICBpZiAoa2V5ID09PSAnLScgJiYgaXNBcnJheShzdWJPYmplY3QpKSB7XG4gICAgICAgICAga2V5ID0gc3ViT2JqZWN0Lmxlbmd0aDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNNYXAoc3ViT2JqZWN0KSAmJiBzdWJPYmplY3QuaGFzKGtleSkpIHtcbiAgICAgICAgICBzdWJPYmplY3Quc2V0KGtleSwgY29weShzdWJPYmplY3QuZ2V0KGtleSkpKTtcbiAgICAgICAgICBzdWJPYmplY3QgPSBzdWJPYmplY3QuZ2V0KGtleSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKCFoYXNPd24oc3ViT2JqZWN0LCBrZXkpKSB7XG4gICAgICAgICAgICBzdWJPYmplY3Rba2V5XSA9IChrZXlBcnJheVtpICsgMV0ubWF0Y2goL14oXFxkK3wtKSQvKSkgPyBbXSA6IHt9O1xuICAgICAgICAgIH1cbiAgICAgICAgICBzdWJPYmplY3Rba2V5XSA9IGNvcHkoc3ViT2JqZWN0W2tleV0pO1xuICAgICAgICAgIHN1Yk9iamVjdCA9IHN1Yk9iamVjdFtrZXldO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBsZXQgbGFzdEtleSA9IGtleUFycmF5W2tleUFycmF5Lmxlbmd0aCAtIDFdO1xuICAgICAgaWYgKGlzQXJyYXkoc3ViT2JqZWN0KSAmJiBsYXN0S2V5ID09PSAnLScpIHtcbiAgICAgICAgc3ViT2JqZWN0LnB1c2godmFsdWUpO1xuICAgICAgfSBlbHNlIGlmIChpbnNlcnQgJiYgaXNBcnJheShzdWJPYmplY3QpICYmICFpc05hTigrbGFzdEtleSkpIHtcbiAgICAgICAgc3ViT2JqZWN0LnNwbGljZShsYXN0S2V5LCAwLCB2YWx1ZSk7XG4gICAgICB9IGVsc2UgaWYgKGlzTWFwKHN1Yk9iamVjdCkpIHtcbiAgICAgICAgc3ViT2JqZWN0LnNldChsYXN0S2V5LCB2YWx1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzdWJPYmplY3RbbGFzdEtleV0gPSB2YWx1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBuZXdPYmplY3Q7XG4gICAgfVxuICAgIGNvbnNvbGUuZXJyb3IoYHNldENvcHkgZXJyb3I6IEludmFsaWQgSlNPTiBQb2ludGVyOiAke3BvaW50ZXJ9YCk7XG4gICAgcmV0dXJuIG9iamVjdDtcbiAgfVxuXG4gIC8qKlxuICAgKiAnaW5zZXJ0JyBmdW5jdGlvblxuICAgKlxuICAgKiBDYWxscyAnc2V0JyB3aXRoIGluc2VydCA9IFRSVUVcbiAgICpcbiAgICogLy8gIHsgb2JqZWN0IH0gb2JqZWN0IC0gb2JqZWN0IHRvIGluc2VydCB2YWx1ZSBpblxuICAgKiAvLyAgeyBQb2ludGVyIH0gcG9pbnRlciAtIEpTT04gUG9pbnRlciAoc3RyaW5nIG9yIGFycmF5KVxuICAgKiAvLyAgIHZhbHVlIC0gdmFsdWUgdG8gaW5zZXJ0XG4gICAqIC8vIHsgb2JqZWN0IH1cbiAgICovXG4gIHN0YXRpYyBpbnNlcnQob2JqZWN0LCBwb2ludGVyLCB2YWx1ZSkge1xuICAgIGNvbnN0IHVwZGF0ZWRPYmplY3QgPSB0aGlzLnNldChvYmplY3QsIHBvaW50ZXIsIHZhbHVlLCB0cnVlKTtcbiAgICByZXR1cm4gdXBkYXRlZE9iamVjdDtcbiAgfVxuXG4gIC8qKlxuICAgKiAnaW5zZXJ0Q29weScgZnVuY3Rpb25cbiAgICpcbiAgICogQ2FsbHMgJ3NldENvcHknIHdpdGggaW5zZXJ0ID0gVFJVRVxuICAgKlxuICAgKiAvLyAgeyBvYmplY3QgfSBvYmplY3QgLSBvYmplY3QgdG8gaW5zZXJ0IHZhbHVlIGluXG4gICAqIC8vICB7IFBvaW50ZXIgfSBwb2ludGVyIC0gSlNPTiBQb2ludGVyIChzdHJpbmcgb3IgYXJyYXkpXG4gICAqIC8vICAgdmFsdWUgLSB2YWx1ZSB0byBpbnNlcnRcbiAgICogLy8geyBvYmplY3QgfVxuICAgKi9cbiAgc3RhdGljIGluc2VydENvcHkob2JqZWN0LCBwb2ludGVyLCB2YWx1ZSkge1xuICAgIGNvbnN0IHVwZGF0ZWRPYmplY3QgPSB0aGlzLnNldENvcHkob2JqZWN0LCBwb2ludGVyLCB2YWx1ZSwgdHJ1ZSk7XG4gICAgcmV0dXJuIHVwZGF0ZWRPYmplY3Q7XG4gIH1cblxuICAvKipcbiAgICogJ3JlbW92ZScgZnVuY3Rpb25cbiAgICpcbiAgICogVXNlcyBhIEpTT04gUG9pbnRlciB0byByZW1vdmUgYSBrZXkgYW5kIGl0cyBhdHRyaWJ1dGUgZnJvbSBhbiBvYmplY3RcbiAgICpcbiAgICogLy8gIHsgb2JqZWN0IH0gb2JqZWN0IC0gb2JqZWN0IHRvIGRlbGV0ZSBhdHRyaWJ1dGUgZnJvbVxuICAgKiAvLyAgeyBQb2ludGVyIH0gcG9pbnRlciAtIEpTT04gUG9pbnRlciAoc3RyaW5nIG9yIGFycmF5KVxuICAgKiAvLyB7IG9iamVjdCB9XG4gICAqL1xuICBzdGF0aWMgcmVtb3ZlKG9iamVjdCwgcG9pbnRlcikge1xuICAgIGxldCBrZXlBcnJheSA9IHRoaXMucGFyc2UocG9pbnRlcik7XG4gICAgaWYgKGtleUFycmF5ICE9PSBudWxsICYmIGtleUFycmF5Lmxlbmd0aCkge1xuICAgICAgbGV0IGxhc3RLZXkgPSBrZXlBcnJheS5wb3AoKTtcbiAgICAgIGxldCBwYXJlbnRPYmplY3QgPSB0aGlzLmdldChvYmplY3QsIGtleUFycmF5KTtcbiAgICAgIGlmIChpc0FycmF5KHBhcmVudE9iamVjdCkpIHtcbiAgICAgICAgaWYgKGxhc3RLZXkgPT09ICctJykgeyBsYXN0S2V5ID0gcGFyZW50T2JqZWN0Lmxlbmd0aCAtIDE7IH1cbiAgICAgICAgcGFyZW50T2JqZWN0LnNwbGljZShsYXN0S2V5LCAxKTtcbiAgICAgIH0gZWxzZSBpZiAoaXNPYmplY3QocGFyZW50T2JqZWN0KSkge1xuICAgICAgICBkZWxldGUgcGFyZW50T2JqZWN0W2xhc3RLZXldO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICB9XG4gICAgY29uc29sZS5lcnJvcihgcmVtb3ZlIGVycm9yOiBJbnZhbGlkIEpTT04gUG9pbnRlcjogJHtwb2ludGVyfWApO1xuICAgIHJldHVybiBvYmplY3Q7XG4gIH1cblxuICAvKipcbiAgICogJ2hhcycgZnVuY3Rpb25cbiAgICpcbiAgICogVGVzdHMgaWYgYW4gb2JqZWN0IGhhcyBhIHZhbHVlIGF0IHRoZSBsb2NhdGlvbiBzcGVjaWZpZWQgYnkgYSBKU09OIFBvaW50ZXJcbiAgICpcbiAgICogLy8gIHsgb2JqZWN0IH0gb2JqZWN0IC0gb2JqZWN0IHRvIGNoZWsgZm9yIHZhbHVlXG4gICAqIC8vICB7IFBvaW50ZXIgfSBwb2ludGVyIC0gSlNPTiBQb2ludGVyIChzdHJpbmcgb3IgYXJyYXkpXG4gICAqIC8vIHsgYm9vbGVhbiB9XG4gICAqL1xuICBzdGF0aWMgaGFzKG9iamVjdCwgcG9pbnRlcikge1xuICAgIGNvbnN0IGhhc1ZhbHVlID0gdGhpcy5nZXQob2JqZWN0LCBwb2ludGVyLCAwLCBudWxsLCB0cnVlKTtcbiAgICByZXR1cm4gaGFzVmFsdWU7XG4gIH1cblxuICAvKipcbiAgICogJ2RpY3QnIGZ1bmN0aW9uXG4gICAqXG4gICAqIFJldHVybnMgYSAocG9pbnRlciAtPiB2YWx1ZSkgZGljdGlvbmFyeSBmb3IgYW4gb2JqZWN0XG4gICAqXG4gICAqIC8vICB7IG9iamVjdCB9IG9iamVjdCAtIFRoZSBvYmplY3QgdG8gY3JlYXRlIGEgZGljdGlvbmFyeSBmcm9tXG4gICAqIC8vIHsgb2JqZWN0IH0gLSBUaGUgcmVzdWx0aW5nIGRpY3Rpb25hcnkgb2JqZWN0XG4gICAqL1xuICBzdGF0aWMgZGljdChvYmplY3QpIHtcbiAgICBsZXQgcmVzdWx0czogYW55ID0ge307XG4gICAgdGhpcy5mb3JFYWNoRGVlcChvYmplY3QsICh2YWx1ZSwgcG9pbnRlcikgPT4ge1xuICAgICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ29iamVjdCcpIHsgcmVzdWx0c1twb2ludGVyXSA9IHZhbHVlOyB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHJlc3VsdHM7XG4gIH1cblxuICAvKipcbiAgICogJ2ZvckVhY2hEZWVwJyBmdW5jdGlvblxuICAgKlxuICAgKiBJdGVyYXRlcyBvdmVyIG93biBlbnVtZXJhYmxlIHByb3BlcnRpZXMgb2YgYW4gb2JqZWN0IG9yIGl0ZW1zIGluIGFuIGFycmF5XG4gICAqIGFuZCBpbnZva2VzIGFuIGl0ZXJhdGVlIGZ1bmN0aW9uIGZvciBlYWNoIGtleS92YWx1ZSBvciBpbmRleC92YWx1ZSBwYWlyLlxuICAgKiBCeSBkZWZhdWx0LCBpdGVyYXRlcyBvdmVyIGl0ZW1zIHdpdGhpbiBvYmplY3RzIGFuZCBhcnJheXMgYWZ0ZXIgY2FsbGluZ1xuICAgKiB0aGUgaXRlcmF0ZWUgZnVuY3Rpb24gb24gdGhlIGNvbnRhaW5pbmcgb2JqZWN0IG9yIGFycmF5IGl0c2VsZi5cbiAgICpcbiAgICogVGhlIGl0ZXJhdGVlIGlzIGludm9rZWQgd2l0aCB0aHJlZSBhcmd1bWVudHM6ICh2YWx1ZSwgcG9pbnRlciwgcm9vdE9iamVjdCksXG4gICAqIHdoZXJlIHBvaW50ZXIgaXMgYSBKU09OIHBvaW50ZXIgaW5kaWNhdGluZyB0aGUgbG9jYXRpb24gb2YgdGhlIGN1cnJlbnRcbiAgICogdmFsdWUgd2l0aGluIHRoZSByb290IG9iamVjdCwgYW5kIHJvb3RPYmplY3QgaXMgdGhlIHJvb3Qgb2JqZWN0IGluaXRpYWxseVxuICAgKiBzdWJtaXR0ZWQgdG8gdGggZnVuY3Rpb24uXG4gICAqXG4gICAqIElmIGEgdGhpcmQgb3B0aW9uYWwgcGFyYW1ldGVyICdib3R0b21VcCcgaXMgc2V0IHRvIFRSVUUsIHRoZSBpdGVyYXRvclxuICAgKiBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZCBvbiBzdWItb2JqZWN0cyBhbmQgYXJyYXlzIGFmdGVyIGJlaW5nXG4gICAqIGNhbGxlZCBvbiB0aGVpciBjb250ZW50cywgcmF0aGVyIHRoYW4gYmVmb3JlLCB3aGljaCBpcyB0aGUgZGVmYXVsdC5cbiAgICpcbiAgICogVGhpcyBmdW5jdGlvbiBjYW4gYWxzbyBvcHRpb25hbGx5IGJlIGNhbGxlZCBkaXJlY3RseSBvbiBhIHN1Yi1vYmplY3QgYnlcbiAgICogaW5jbHVkaW5nIG9wdGlvbmFsIDR0aCBhbmQgNXRoIHBhcmFtZXRlcnNzIHRvIHNwZWNpZnkgdGhlIGluaXRpYWxcbiAgICogcm9vdCBvYmplY3QgYW5kIHBvaW50ZXIuXG4gICAqXG4gICAqIC8vICB7IG9iamVjdCB9IG9iamVjdCAtIHRoZSBpbml0aWFsIG9iamVjdCBvciBhcnJheVxuICAgKiAvLyAgeyAodjogYW55LCBwPzogc3RyaW5nLCBvPzogYW55KSA9PiBhbnkgfSBmdW5jdGlvbiAtIGl0ZXJhdGVlIGZ1bmN0aW9uXG4gICAqIC8vICB7IGJvb2xlYW4gPSBmYWxzZSB9IGJvdHRvbVVwIC0gb3B0aW9uYWwsIHNldCB0byBUUlVFIHRvIHJldmVyc2UgZGlyZWN0aW9uXG4gICAqIC8vICB7IG9iamVjdCA9IG9iamVjdCB9IHJvb3RPYmplY3QgLSBvcHRpb25hbCwgcm9vdCBvYmplY3Qgb3IgYXJyYXlcbiAgICogLy8gIHsgc3RyaW5nID0gJycgfSBwb2ludGVyIC0gb3B0aW9uYWwsIEpTT04gUG9pbnRlciB0byBvYmplY3Qgd2l0aGluIHJvb3RPYmplY3RcbiAgICogLy8geyBvYmplY3QgfSAtIFRoZSBtb2RpZmllZCBvYmplY3RcbiAgICovXG4gIHN0YXRpYyBmb3JFYWNoRGVlcChcbiAgICBvYmplY3QsIGZuOiAodjogYW55LCBwPzogc3RyaW5nLCBvPzogYW55KSA9PiBhbnkgPSAodikgPT4gdixcbiAgICBib3R0b21VcCA9IGZhbHNlLCBwb2ludGVyID0gJycsIHJvb3RPYmplY3QgPSBvYmplY3RcbiAgKSB7XG4gICAgaWYgKHR5cGVvZiBmbiAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY29uc29sZS5lcnJvcihgZm9yRWFjaERlZXAgZXJyb3I6IEl0ZXJhdG9yIGlzIG5vdCBhIGZ1bmN0aW9uOmAsIGZuKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKCFib3R0b21VcCkgeyBmbihvYmplY3QsIHBvaW50ZXIsIHJvb3RPYmplY3QpOyB9XG4gICAgaWYgKGlzT2JqZWN0KG9iamVjdCkgfHwgaXNBcnJheShvYmplY3QpKSB7XG4gICAgICBmb3IgKGxldCBrZXkgb2YgT2JqZWN0LmtleXMob2JqZWN0KSkge1xuICAgICAgICBjb25zdCBuZXdQb2ludGVyID0gcG9pbnRlciArICcvJyArIHRoaXMuZXNjYXBlKGtleSk7XG4gICAgICAgIHRoaXMuZm9yRWFjaERlZXAob2JqZWN0W2tleV0sIGZuLCBib3R0b21VcCwgbmV3UG9pbnRlciwgcm9vdE9iamVjdCk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChib3R0b21VcCkgeyBmbihvYmplY3QsIHBvaW50ZXIsIHJvb3RPYmplY3QpOyB9XG4gIH1cblxuICAvKipcbiAgICogJ2ZvckVhY2hEZWVwQ29weScgZnVuY3Rpb25cbiAgICpcbiAgICogU2ltaWxhciB0byBmb3JFYWNoRGVlcCwgYnV0IHJldHVybnMgYSBjb3B5IG9mIHRoZSBvcmlnaW5hbCBvYmplY3QsIHdpdGhcbiAgICogdGhlIHNhbWUga2V5cyBhbmQgaW5kZXhlcywgYnV0IHdpdGggdmFsdWVzIHJlcGxhY2VkIHdpdGggdGhlIHJlc3VsdCBvZlxuICAgKiB0aGUgaXRlcmF0ZWUgZnVuY3Rpb24uXG4gICAqXG4gICAqIC8vICB7IG9iamVjdCB9IG9iamVjdCAtIHRoZSBpbml0aWFsIG9iamVjdCBvciBhcnJheVxuICAgKiAvLyAgeyAodjogYW55LCBrPzogc3RyaW5nLCBvPzogYW55LCBwPzogYW55KSA9PiBhbnkgfSBmdW5jdGlvbiAtIGl0ZXJhdGVlIGZ1bmN0aW9uXG4gICAqIC8vICB7IGJvb2xlYW4gPSBmYWxzZSB9IGJvdHRvbVVwIC0gb3B0aW9uYWwsIHNldCB0byBUUlVFIHRvIHJldmVyc2UgZGlyZWN0aW9uXG4gICAqIC8vICB7IG9iamVjdCA9IG9iamVjdCB9IHJvb3RPYmplY3QgLSBvcHRpb25hbCwgcm9vdCBvYmplY3Qgb3IgYXJyYXlcbiAgICogLy8gIHsgc3RyaW5nID0gJycgfSBwb2ludGVyIC0gb3B0aW9uYWwsIEpTT04gUG9pbnRlciB0byBvYmplY3Qgd2l0aGluIHJvb3RPYmplY3RcbiAgICogLy8geyBvYmplY3QgfSAtIFRoZSBjb3BpZWQgb2JqZWN0XG4gICAqL1xuICBzdGF0aWMgZm9yRWFjaERlZXBDb3B5KFxuICAgIG9iamVjdCwgZm46ICh2OiBhbnksIHA/OiBzdHJpbmcsIG8/OiBhbnkpID0+IGFueSA9ICh2KSA9PiB2LFxuICAgIGJvdHRvbVVwID0gZmFsc2UsIHBvaW50ZXIgPSAnJywgcm9vdE9iamVjdCA9IG9iamVjdFxuICApIHtcbiAgICBpZiAodHlwZW9mIGZuICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGBmb3JFYWNoRGVlcENvcHkgZXJyb3I6IEl0ZXJhdG9yIGlzIG5vdCBhIGZ1bmN0aW9uOmAsIGZuKTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBpZiAoaXNPYmplY3Qob2JqZWN0KSB8fCBpc0FycmF5KG9iamVjdCkpIHtcbiAgICAgIGxldCBuZXdPYmplY3QgPSBpc0FycmF5KG9iamVjdCkgPyBbIC4uLm9iamVjdCBdIDogeyAuLi5vYmplY3QgfTtcbiAgICAgIGlmICghYm90dG9tVXApIHsgbmV3T2JqZWN0ID0gZm4obmV3T2JqZWN0LCBwb2ludGVyLCByb290T2JqZWN0KTsgfVxuICAgICAgZm9yIChsZXQga2V5IG9mIE9iamVjdC5rZXlzKG5ld09iamVjdCkpIHtcbiAgICAgICAgY29uc3QgbmV3UG9pbnRlciA9IHBvaW50ZXIgKyAnLycgKyB0aGlzLmVzY2FwZShrZXkpO1xuICAgICAgICBuZXdPYmplY3Rba2V5XSA9IHRoaXMuZm9yRWFjaERlZXBDb3B5KFxuICAgICAgICAgIG5ld09iamVjdFtrZXldLCBmbiwgYm90dG9tVXAsIG5ld1BvaW50ZXIsIHJvb3RPYmplY3RcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGlmIChib3R0b21VcCkgeyBuZXdPYmplY3QgPSBmbihuZXdPYmplY3QsIHBvaW50ZXIsIHJvb3RPYmplY3QpOyB9XG4gICAgICByZXR1cm4gbmV3T2JqZWN0O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZm4ob2JqZWN0LCBwb2ludGVyLCByb290T2JqZWN0KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogJ2VzY2FwZScgZnVuY3Rpb25cbiAgICpcbiAgICogRXNjYXBlcyBhIHN0cmluZyByZWZlcmVuY2Uga2V5XG4gICAqXG4gICAqIC8vICB7IHN0cmluZyB9IGtleSAtIHN0cmluZyBrZXkgdG8gZXNjYXBlXG4gICAqIC8vIHsgc3RyaW5nIH0gLSBlc2NhcGVkIGtleVxuICAgKi9cbiAgc3RhdGljIGVzY2FwZShrZXkpIHtcbiAgICBjb25zdCBlc2NhcGVkID0ga2V5LnRvU3RyaW5nKCkucmVwbGFjZSgvfi9nLCAnfjAnKS5yZXBsYWNlKC9cXC8vZywgJ34xJyk7XG4gICAgcmV0dXJuIGVzY2FwZWQ7XG4gIH1cblxuICAvKipcbiAgICogJ3VuZXNjYXBlJyBmdW5jdGlvblxuICAgKlxuICAgKiBVbmVzY2FwZXMgYSBzdHJpbmcgcmVmZXJlbmNlIGtleVxuICAgKlxuICAgKiAvLyAgeyBzdHJpbmcgfSBrZXkgLSBzdHJpbmcga2V5IHRvIHVuZXNjYXBlXG4gICAqIC8vIHsgc3RyaW5nIH0gLSB1bmVzY2FwZWQga2V5XG4gICAqL1xuICBzdGF0aWMgdW5lc2NhcGUoa2V5KSB7XG4gICAgY29uc3QgdW5lc2NhcGVkID0ga2V5LnRvU3RyaW5nKCkucmVwbGFjZSgvfjEvZywgJy8nKS5yZXBsYWNlKC9+MC9nLCAnficpO1xuICAgIHJldHVybiB1bmVzY2FwZWQ7XG4gIH1cblxuICAvKipcbiAgICogJ3BhcnNlJyBmdW5jdGlvblxuICAgKlxuICAgKiBDb252ZXJ0cyBhIHN0cmluZyBKU09OIFBvaW50ZXIgaW50byBhIGFycmF5IG9mIGtleXNcbiAgICogKGlmIGlucHV0IGlzIGFscmVhZHkgYW4gYW4gYXJyYXkgb2Yga2V5cywgaXQgaXMgcmV0dXJuZWQgdW5jaGFuZ2VkKVxuICAgKlxuICAgKiAvLyAgeyBQb2ludGVyIH0gcG9pbnRlciAtIEpTT04gUG9pbnRlciAoc3RyaW5nIG9yIGFycmF5KVxuICAgKiAvLyAgeyBib29sZWFuID0gZmFsc2UgfSBlcnJvcnMgLSBTaG93IGVycm9yIGlmIGludmFsaWQgcG9pbnRlcj9cbiAgICogLy8geyBzdHJpbmdbXSB9IC0gSlNPTiBQb2ludGVyIGFycmF5IG9mIGtleXNcbiAgICovXG4gIHN0YXRpYyBwYXJzZShwb2ludGVyLCBlcnJvcnMgPSBmYWxzZSkge1xuICAgIGlmICghdGhpcy5pc0pzb25Qb2ludGVyKHBvaW50ZXIpKSB7XG4gICAgICBpZiAoZXJyb3JzKSB7IGNvbnNvbGUuZXJyb3IoYHBhcnNlIGVycm9yOiBJbnZhbGlkIEpTT04gUG9pbnRlcjogJHtwb2ludGVyfWApOyB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgaWYgKGlzQXJyYXkocG9pbnRlcikpIHsgcmV0dXJuIDxzdHJpbmdbXT5wb2ludGVyOyB9XG4gICAgaWYgKHR5cGVvZiBwb2ludGVyID09PSAnc3RyaW5nJykge1xuICAgICAgaWYgKCg8c3RyaW5nPnBvaW50ZXIpWzBdID09PSAnIycpIHsgcG9pbnRlciA9IHBvaW50ZXIuc2xpY2UoMSk7IH1cbiAgICAgIGlmICg8c3RyaW5nPnBvaW50ZXIgPT09ICcnIHx8IDxzdHJpbmc+cG9pbnRlciA9PT0gJy8nKSB7IHJldHVybiBbXTsgfVxuICAgICAgcmV0dXJuICg8c3RyaW5nPnBvaW50ZXIpLnNsaWNlKDEpLnNwbGl0KCcvJykubWFwKHRoaXMudW5lc2NhcGUpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiAnY29tcGlsZScgZnVuY3Rpb25cbiAgICpcbiAgICogQ29udmVydHMgYW4gYXJyYXkgb2Yga2V5cyBpbnRvIGEgSlNPTiBQb2ludGVyIHN0cmluZ1xuICAgKiAoaWYgaW5wdXQgaXMgYWxyZWFkeSBhIHN0cmluZywgaXQgaXMgbm9ybWFsaXplZCBhbmQgcmV0dXJuZWQpXG4gICAqXG4gICAqIFRoZSBvcHRpb25hbCBzZWNvbmQgcGFyYW1ldGVyIGlzIGEgZGVmYXVsdCB3aGljaCB3aWxsIHJlcGxhY2UgYW55IGVtcHR5IGtleXMuXG4gICAqXG4gICAqIC8vICB7IFBvaW50ZXIgfSBwb2ludGVyIC0gSlNPTiBQb2ludGVyIChzdHJpbmcgb3IgYXJyYXkpXG4gICAqIC8vICB7IHN0cmluZyB8IG51bWJlciA9ICcnIH0gZGVmYXVsdFZhbHVlIC0gRGVmYXVsdCB2YWx1ZVxuICAgKiAvLyAgeyBib29sZWFuID0gZmFsc2UgfSBlcnJvcnMgLSBTaG93IGVycm9yIGlmIGludmFsaWQgcG9pbnRlcj9cbiAgICogLy8geyBzdHJpbmcgfSAtIEpTT04gUG9pbnRlciBzdHJpbmdcbiAgICovXG4gIHN0YXRpYyBjb21waWxlKHBvaW50ZXIsIGRlZmF1bHRWYWx1ZSA9ICcnLCBlcnJvcnMgPSBmYWxzZSkge1xuICAgIGlmIChwb2ludGVyID09PSAnIycpIHsgcmV0dXJuICcnOyB9XG4gICAgaWYgKCF0aGlzLmlzSnNvblBvaW50ZXIocG9pbnRlcikpIHtcbiAgICAgIGlmIChlcnJvcnMpIHsgY29uc29sZS5lcnJvcihgY29tcGlsZSBlcnJvcjogSW52YWxpZCBKU09OIFBvaW50ZXI6ICR7cG9pbnRlcn1gKTsgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGlmIChpc0FycmF5KHBvaW50ZXIpKSB7XG4gICAgICBpZiAoKDxzdHJpbmdbXT5wb2ludGVyKS5sZW5ndGggPT09IDApIHsgcmV0dXJuICcnOyB9XG4gICAgICByZXR1cm4gJy8nICsgKDxzdHJpbmdbXT5wb2ludGVyKS5tYXAoXG4gICAgICAgIGtleSA9PiBrZXkgPT09ICcnID8gZGVmYXVsdFZhbHVlIDogdGhpcy5lc2NhcGUoa2V5KVxuICAgICAgKS5qb2luKCcvJyk7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgcG9pbnRlciA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGlmIChwb2ludGVyWzBdID09PSAnIycpIHsgcG9pbnRlciA9IHBvaW50ZXIuc2xpY2UoMSk7IH1cbiAgICAgIHJldHVybiBwb2ludGVyO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiAndG9LZXknIGZ1bmN0aW9uXG4gICAqXG4gICAqIEV4dHJhY3RzIG5hbWUgb2YgdGhlIGZpbmFsIGtleSBmcm9tIGEgSlNPTiBQb2ludGVyLlxuICAgKlxuICAgKiAvLyAgeyBQb2ludGVyIH0gcG9pbnRlciAtIEpTT04gUG9pbnRlciAoc3RyaW5nIG9yIGFycmF5KVxuICAgKiAvLyAgeyBib29sZWFuID0gZmFsc2UgfSBlcnJvcnMgLSBTaG93IGVycm9yIGlmIGludmFsaWQgcG9pbnRlcj9cbiAgICogLy8geyBzdHJpbmcgfSAtIHRoZSBleHRyYWN0ZWQga2V5XG4gICAqL1xuICBzdGF0aWMgdG9LZXkocG9pbnRlciwgZXJyb3JzID0gZmFsc2UpIHtcbiAgICBsZXQga2V5QXJyYXkgPSB0aGlzLnBhcnNlKHBvaW50ZXIsIGVycm9ycyk7XG4gICAgaWYgKGtleUFycmF5ID09PSBudWxsKSB7IHJldHVybiBudWxsOyB9XG4gICAgaWYgKCFrZXlBcnJheS5sZW5ndGgpIHsgcmV0dXJuICcnOyB9XG4gICAgcmV0dXJuIGtleUFycmF5W2tleUFycmF5Lmxlbmd0aCAtIDFdO1xuICB9XG5cbiAgLyoqXG4gICAqICdpc0pzb25Qb2ludGVyJyBmdW5jdGlvblxuICAgKlxuICAgKiBDaGVja3MgYSBzdHJpbmcgb3IgYXJyYXkgdmFsdWUgdG8gZGV0ZXJtaW5lIGlmIGl0IGlzIGEgdmFsaWQgSlNPTiBQb2ludGVyLlxuICAgKiBSZXR1cm5zIHRydWUgaWYgYSBzdHJpbmcgaXMgZW1wdHksIG9yIHN0YXJ0cyB3aXRoICcvJyBvciAnIy8nLlxuICAgKiBSZXR1cm5zIHRydWUgaWYgYW4gYXJyYXkgY29udGFpbnMgb25seSBzdHJpbmcgdmFsdWVzLlxuICAgKlxuICAgKiAvLyAgIHZhbHVlIC0gdmFsdWUgdG8gY2hlY2tcbiAgICogLy8geyBib29sZWFuIH0gLSB0cnVlIGlmIHZhbHVlIGlzIGEgdmFsaWQgSlNPTiBQb2ludGVyLCBvdGhlcndpc2UgZmFsc2VcbiAgICovXG4gIHN0YXRpYyBpc0pzb25Qb2ludGVyKHZhbHVlKSB7XG4gICAgaWYgKGlzQXJyYXkodmFsdWUpKSB7XG4gICAgICByZXR1cm4gdmFsdWUuZXZlcnkoa2V5ID0+IHR5cGVvZiBrZXkgPT09ICdzdHJpbmcnKTtcbiAgICB9IGVsc2UgaWYgKGlzU3RyaW5nKHZhbHVlKSkge1xuICAgICAgaWYgKHZhbHVlID09PSAnJyB8fCB2YWx1ZSA9PT0gJyMnKSB7IHJldHVybiB0cnVlOyB9XG4gICAgICBpZiAodmFsdWVbMF0gPT09ICcvJyB8fCB2YWx1ZS5zbGljZSgwLCAyKSA9PT0gJyMvJykge1xuICAgICAgICByZXR1cm4gIS8oflteMDFdfH4kKS9nLnRlc3QodmFsdWUpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogJ2lzU3ViUG9pbnRlcicgZnVuY3Rpb25cbiAgICpcbiAgICogQ2hlY2tzIHdoZXRoZXIgb25lIEpTT04gUG9pbnRlciBpcyBhIHN1YnNldCBvZiBhbm90aGVyLlxuICAgKlxuICAgKiAvLyAgeyBQb2ludGVyIH0gc2hvcnRQb2ludGVyIC0gcG90ZW50aWFsIHN1YnNldCBKU09OIFBvaW50ZXJcbiAgICogLy8gIHsgUG9pbnRlciB9IGxvbmdQb2ludGVyIC0gcG90ZW50aWFsIHN1cGVyc2V0IEpTT04gUG9pbnRlclxuICAgKiAvLyAgeyBib29sZWFuID0gZmFsc2UgfSB0cnVlSWZNYXRjaGluZyAtIHJldHVybiB0cnVlIGlmIHBvaW50ZXJzIG1hdGNoP1xuICAgKiAvLyAgeyBib29sZWFuID0gZmFsc2UgfSBlcnJvcnMgLSBTaG93IGVycm9yIGlmIGludmFsaWQgcG9pbnRlcj9cbiAgICogLy8geyBib29sZWFuIH0gLSB0cnVlIGlmIHNob3J0UG9pbnRlciBpcyBhIHN1YnNldCBvZiBsb25nUG9pbnRlciwgZmFsc2UgaWYgbm90XG4gICAqL1xuICBzdGF0aWMgaXNTdWJQb2ludGVyKFxuICAgIHNob3J0UG9pbnRlciwgbG9uZ1BvaW50ZXIsIHRydWVJZk1hdGNoaW5nID0gZmFsc2UsIGVycm9ycyA9IGZhbHNlXG4gICkge1xuICAgIGlmICghdGhpcy5pc0pzb25Qb2ludGVyKHNob3J0UG9pbnRlcikgfHwgIXRoaXMuaXNKc29uUG9pbnRlcihsb25nUG9pbnRlcikpIHtcbiAgICAgIGlmIChlcnJvcnMpIHtcbiAgICAgICAgbGV0IGludmFsaWQgPSAnJ1xuICAgICAgICBpZiAoIXRoaXMuaXNKc29uUG9pbnRlcihzaG9ydFBvaW50ZXIpKSB7IGludmFsaWQgKz0gYCAxOiAke3Nob3J0UG9pbnRlcn1gOyB9XG4gICAgICAgIGlmICghdGhpcy5pc0pzb25Qb2ludGVyKGxvbmdQb2ludGVyKSkgeyBpbnZhbGlkICs9IGAgMjogJHtsb25nUG9pbnRlcn1gOyB9XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoYGlzU3ViUG9pbnRlciBlcnJvcjogSW52YWxpZCBKU09OIFBvaW50ZXIgJHtpbnZhbGlkfWApO1xuICAgICAgfVxuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBzaG9ydFBvaW50ZXIgPSB0aGlzLmNvbXBpbGUoc2hvcnRQb2ludGVyLCAnJywgZXJyb3JzKTtcbiAgICBsb25nUG9pbnRlciA9IHRoaXMuY29tcGlsZShsb25nUG9pbnRlciwgJycsIGVycm9ycyk7XG4gICAgcmV0dXJuIHNob3J0UG9pbnRlciA9PT0gbG9uZ1BvaW50ZXIgPyB0cnVlSWZNYXRjaGluZyA6XG4gICAgICBgJHtzaG9ydFBvaW50ZXJ9L2AgPT09IGxvbmdQb2ludGVyLnNsaWNlKDAsIHNob3J0UG9pbnRlci5sZW5ndGggKyAxKTtcbiAgfVxuXG4gIC8qKlxuICAgKiAndG9JbmRleGVkUG9pbnRlcicgZnVuY3Rpb25cbiAgICpcbiAgICogTWVyZ2VzIGFuIGFycmF5IG9mIG51bWVyaWMgaW5kZXhlcyBhbmQgYSBnZW5lcmljIHBvaW50ZXIgdG8gY3JlYXRlIGFuXG4gICAqIGluZGV4ZWQgcG9pbnRlciBmb3IgYSBzcGVjaWZpYyBpdGVtLlxuICAgKlxuICAgKiBGb3IgZXhhbXBsZSwgbWVyZ2luZyB0aGUgZ2VuZXJpYyBwb2ludGVyICcvZm9vLy0vYmFyLy0vYmF6JyBhbmRcbiAgICogdGhlIGFycmF5IFs0LCAyXSB3b3VsZCByZXN1bHQgaW4gdGhlIGluZGV4ZWQgcG9pbnRlciAnL2Zvby80L2Jhci8yL2JheidcbiAgICpcbiAgICogXG4gICAqIC8vICB7IFBvaW50ZXIgfSBnZW5lcmljUG9pbnRlciAtIFRoZSBnZW5lcmljIHBvaW50ZXJcbiAgICogLy8gIHsgbnVtYmVyW10gfSBpbmRleEFycmF5IC0gVGhlIGFycmF5IG9mIG51bWVyaWMgaW5kZXhlc1xuICAgKiAvLyAgeyBNYXA8c3RyaW5nLCBudW1iZXI+IH0gYXJyYXlNYXAgLSBBbiBvcHRpb25hbCBhcnJheSBtYXBcbiAgICogLy8geyBzdHJpbmcgfSAtIFRoZSBtZXJnZWQgcG9pbnRlciB3aXRoIGluZGV4ZXNcbiAgICovXG4gIHN0YXRpYyB0b0luZGV4ZWRQb2ludGVyKFxuICAgIGdlbmVyaWNQb2ludGVyLCBpbmRleEFycmF5LCBhcnJheU1hcDogTWFwPHN0cmluZywgbnVtYmVyPiA9IG51bGxcbiAgKSB7XG4gICAgaWYgKHRoaXMuaXNKc29uUG9pbnRlcihnZW5lcmljUG9pbnRlcikgJiYgaXNBcnJheShpbmRleEFycmF5KSkge1xuICAgICAgbGV0IGluZGV4ZWRQb2ludGVyID0gdGhpcy5jb21waWxlKGdlbmVyaWNQb2ludGVyKTtcbiAgICAgIGlmIChpc01hcChhcnJheU1hcCkpIHtcbiAgICAgICAgbGV0IGFycmF5SW5kZXggPSAwO1xuICAgICAgICByZXR1cm4gaW5kZXhlZFBvaW50ZXIucmVwbGFjZSgvXFwvXFwtKD89XFwvfCQpL2csIChrZXksIHN0cmluZ0luZGV4KSA9PlxuICAgICAgICAgIGFycmF5TWFwLmhhcygoPHN0cmluZz5pbmRleGVkUG9pbnRlcikuc2xpY2UoMCwgc3RyaW5nSW5kZXgpKSA/XG4gICAgICAgICAgICAnLycgKyBpbmRleEFycmF5W2FycmF5SW5kZXgrK10gOiBrZXlcbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZvciAobGV0IHBvaW50ZXJJbmRleCBvZiBpbmRleEFycmF5KSB7XG4gICAgICAgICAgaW5kZXhlZFBvaW50ZXIgPSBpbmRleGVkUG9pbnRlci5yZXBsYWNlKCcvLScsICcvJyArIHBvaW50ZXJJbmRleCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGluZGV4ZWRQb2ludGVyO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoIXRoaXMuaXNKc29uUG9pbnRlcihnZW5lcmljUG9pbnRlcikpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoYHRvSW5kZXhlZFBvaW50ZXIgZXJyb3I6IEludmFsaWQgSlNPTiBQb2ludGVyOiAke2dlbmVyaWNQb2ludGVyfWApO1xuICAgIH1cbiAgICBpZiAoIWlzQXJyYXkoaW5kZXhBcnJheSkpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoYHRvSW5kZXhlZFBvaW50ZXIgZXJyb3I6IEludmFsaWQgaW5kZXhBcnJheTogJHtpbmRleEFycmF5fWApO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogJ3RvR2VuZXJpY1BvaW50ZXInIGZ1bmN0aW9uXG4gICAqXG4gICAqIENvbXBhcmVzIGFuIGluZGV4ZWQgcG9pbnRlciB0byBhbiBhcnJheSBtYXAgYW5kIHJlbW92ZXMgbGlzdCBhcnJheVxuICAgKiBpbmRleGVzIChidXQgbGVhdmVzIHR1cGxlIGFycnJheSBpbmRleGVzIGFuZCBhbGwgb2JqZWN0IGtleXMsIGluY2x1ZGluZ1xuICAgKiBudW1lcmljIGtleXMpIHRvIGNyZWF0ZSBhIGdlbmVyaWMgcG9pbnRlci5cbiAgICpcbiAgICogRm9yIGV4YW1wbGUsIHVzaW5nIHRoZSBpbmRleGVkIHBvaW50ZXIgJy9mb28vMS9iYXIvMi9iYXovMycgYW5kXG4gICAqIHRoZSBhcnJheU1hcCBbWycvZm9vJywgMF0sIFsnL2Zvby8tL2JhcicsIDNdLCBbJy9mb28vLS9iYXIvLS9iYXonLCAwXV1cbiAgICogd291bGQgcmVzdWx0IGluIHRoZSBnZW5lcmljIHBvaW50ZXIgJy9mb28vLS9iYXIvMi9iYXovLSdcbiAgICogVXNpbmcgdGhlIGluZGV4ZWQgcG9pbnRlciAnL2Zvby8xL2Jhci80L2Jhei8zJyBhbmQgdGhlIHNhbWUgYXJyYXlNYXBcbiAgICogd291bGQgcmVzdWx0IGluIHRoZSBnZW5lcmljIHBvaW50ZXIgJy9mb28vLS9iYXIvLS9iYXovLSdcbiAgICogKHRoZSBiYXIgYXJyYXkgaGFzIDMgdHVwbGUgaXRlbXMsIHNvIGluZGV4IDIgaXMgcmV0YWluZWQsIGJ1dCA0IGlzIHJlbW92ZWQpXG4gICAqXG4gICAqIFRoZSBzdHJ1Y3R1cmUgb2YgdGhlIGFycmF5TWFwIGlzOiBbWydwYXRoIHRvIGFycmF5JywgbnVtYmVyIG9mIHR1cGxlIGl0ZW1zXS4uLl1cbiAgICpcbiAgICogXG4gICAqIC8vICB7IFBvaW50ZXIgfSBpbmRleGVkUG9pbnRlciAtIFRoZSBpbmRleGVkIHBvaW50ZXIgKGFycmF5IG9yIHN0cmluZylcbiAgICogLy8gIHsgTWFwPHN0cmluZywgbnVtYmVyPiB9IGFycmF5TWFwIC0gVGhlIG9wdGlvbmFsIGFycmF5IG1hcCAoZm9yIHByZXNlcnZpbmcgdHVwbGUgaW5kZXhlcylcbiAgICogLy8geyBzdHJpbmcgfSAtIFRoZSBnZW5lcmljIHBvaW50ZXIgd2l0aCBpbmRleGVzIHJlbW92ZWRcbiAgICovXG4gIHN0YXRpYyB0b0dlbmVyaWNQb2ludGVyKGluZGV4ZWRQb2ludGVyLCBhcnJheU1hcCA9IG5ldyBNYXA8c3RyaW5nLCBudW1iZXI+KCkpIHtcbiAgICBpZiAodGhpcy5pc0pzb25Qb2ludGVyKGluZGV4ZWRQb2ludGVyKSAmJiBpc01hcChhcnJheU1hcCkpIHtcbiAgICAgIGxldCBwb2ludGVyQXJyYXkgPSB0aGlzLnBhcnNlKGluZGV4ZWRQb2ludGVyKTtcbiAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgcG9pbnRlckFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHN1YlBvaW50ZXIgPSB0aGlzLmNvbXBpbGUocG9pbnRlckFycmF5LnNsaWNlKDAsIGkpKTtcbiAgICAgICAgaWYgKGFycmF5TWFwLmhhcyhzdWJQb2ludGVyKSAmJlxuICAgICAgICAgIGFycmF5TWFwLmdldChzdWJQb2ludGVyKSA8PSArcG9pbnRlckFycmF5W2ldXG4gICAgICAgICkge1xuICAgICAgICAgIHBvaW50ZXJBcnJheVtpXSA9ICctJztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMuY29tcGlsZShwb2ludGVyQXJyYXkpO1xuICAgIH1cbiAgICBpZiAoIXRoaXMuaXNKc29uUG9pbnRlcihpbmRleGVkUG9pbnRlcikpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoYHRvR2VuZXJpY1BvaW50ZXIgZXJyb3I6IGludmFsaWQgSlNPTiBQb2ludGVyOiAke2luZGV4ZWRQb2ludGVyfWApO1xuICAgIH1cbiAgICBpZiAoIWlzTWFwKGFycmF5TWFwKSkge1xuICAgICAgY29uc29sZS5lcnJvcihgdG9HZW5lcmljUG9pbnRlciBlcnJvcjogaW52YWxpZCBhcnJheU1hcDogJHthcnJheU1hcH1gKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogJ3RvQ29udHJvbFBvaW50ZXInIGZ1bmN0aW9uXG4gICAqXG4gICAqIEFjY2VwdHMgYSBKU09OIFBvaW50ZXIgZm9yIGEgZGF0YSBvYmplY3QgYW5kIHJldHVybnMgYSBKU09OIFBvaW50ZXIgZm9yIHRoZVxuICAgKiBtYXRjaGluZyBjb250cm9sIGluIGFuIEFuZ3VsYXIgRm9ybUdyb3VwLlxuICAgKlxuICAgKiAvLyAgeyBQb2ludGVyIH0gZGF0YVBvaW50ZXIgLSBKU09OIFBvaW50ZXIgKHN0cmluZyBvciBhcnJheSkgdG8gYSBkYXRhIG9iamVjdFxuICAgKiAvLyAgeyBGb3JtR3JvdXAgfSBmb3JtR3JvdXAgLSBBbmd1bGFyIEZvcm1Hcm91cCB0byBnZXQgdmFsdWUgZnJvbVxuICAgKiAvLyAgeyBib29sZWFuID0gZmFsc2UgfSBjb250cm9sTXVzdEV4aXN0IC0gT25seSByZXR1cm4gaWYgY29udHJvbCBleGlzdHM/XG4gICAqIC8vIHsgUG9pbnRlciB9IC0gSlNPTiBQb2ludGVyIChzdHJpbmcpIHRvIHRoZSBmb3JtR3JvdXAgb2JqZWN0XG4gICAqL1xuICBzdGF0aWMgdG9Db250cm9sUG9pbnRlcihkYXRhUG9pbnRlciwgZm9ybUdyb3VwLCBjb250cm9sTXVzdEV4aXN0ID0gZmFsc2UpIHtcbiAgICBjb25zdCBkYXRhUG9pbnRlckFycmF5ID0gdGhpcy5wYXJzZShkYXRhUG9pbnRlcik7XG4gICAgbGV0IGNvbnRyb2xQb2ludGVyQXJyYXk6IHN0cmluZ1tdID0gW107XG4gICAgbGV0IHN1Ykdyb3VwID0gZm9ybUdyb3VwO1xuICAgIGlmIChkYXRhUG9pbnRlckFycmF5ICE9PSBudWxsKSB7XG4gICAgICBmb3IgKGxldCBrZXkgb2YgZGF0YVBvaW50ZXJBcnJheSkge1xuICAgICAgICBpZiAoaGFzT3duKHN1Ykdyb3VwLCAnY29udHJvbHMnKSkge1xuICAgICAgICAgIGNvbnRyb2xQb2ludGVyQXJyYXkucHVzaCgnY29udHJvbHMnKTtcbiAgICAgICAgICBzdWJHcm91cCA9IHN1Ykdyb3VwLmNvbnRyb2xzO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc0FycmF5KHN1Ykdyb3VwKSAmJiAoa2V5ID09PSAnLScpKSB7XG4gICAgICAgICAgY29udHJvbFBvaW50ZXJBcnJheS5wdXNoKChzdWJHcm91cC5sZW5ndGggLSAxKS50b1N0cmluZygpKTtcbiAgICAgICAgICBzdWJHcm91cCA9IHN1Ykdyb3VwW3N1Ykdyb3VwLmxlbmd0aCAtIDFdO1xuICAgICAgICB9IGVsc2UgaWYgKGhhc093bihzdWJHcm91cCwga2V5KSkge1xuICAgICAgICAgIGNvbnRyb2xQb2ludGVyQXJyYXkucHVzaChrZXkpO1xuICAgICAgICAgIHN1Ykdyb3VwID0gc3ViR3JvdXBba2V5XTtcbiAgICAgICAgfSBlbHNlIGlmIChjb250cm9sTXVzdEV4aXN0KSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihgdG9Db250cm9sUG9pbnRlciBlcnJvcjogVW5hYmxlIHRvIGZpbmQgXCIke2tleX1cIiBpdGVtIGluIEZvcm1Hcm91cC5gKTtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKGRhdGFQb2ludGVyKTtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKGZvcm1Hcm91cCk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnRyb2xQb2ludGVyQXJyYXkucHVzaChrZXkpO1xuICAgICAgICAgIHN1Ykdyb3VwID0geyBjb250cm9sczoge30gfTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMuY29tcGlsZShjb250cm9sUG9pbnRlckFycmF5KTtcbiAgICB9XG4gICAgY29uc29sZS5lcnJvcihgdG9Db250cm9sUG9pbnRlciBlcnJvcjogSW52YWxpZCBKU09OIFBvaW50ZXI6ICR7ZGF0YVBvaW50ZXJ9YCk7XG4gIH1cblxuICAvKipcbiAgICogJ3RvU2NoZW1hUG9pbnRlcicgZnVuY3Rpb25cbiAgICpcbiAgICogQWNjZXB0cyBhIEpTT04gUG9pbnRlciB0byBhIHZhbHVlIGluc2lkZSBhIGRhdGEgb2JqZWN0IGFuZCBhIEpTT04gc2NoZW1hXG4gICAqIGZvciB0aGF0IG9iamVjdC5cbiAgICpcbiAgICogUmV0dXJucyBhIFBvaW50ZXIgdG8gdGhlIHN1Yi1zY2hlbWEgZm9yIHRoZSB2YWx1ZSBpbnNpZGUgdGhlIG9iamVjdCdzIHNjaGVtYS5cbiAgICpcbiAgICogLy8gIHsgUG9pbnRlciB9IGRhdGFQb2ludGVyIC0gSlNPTiBQb2ludGVyIChzdHJpbmcgb3IgYXJyYXkpIHRvIGFuIG9iamVjdFxuICAgKiAvLyAgIHNjaGVtYSAtIEpTT04gc2NoZW1hIGZvciB0aGUgb2JqZWN0XG4gICAqIC8vIHsgUG9pbnRlciB9IC0gSlNPTiBQb2ludGVyIChzdHJpbmcpIHRvIHRoZSBvYmplY3QncyBzY2hlbWFcbiAgICovXG4gIHN0YXRpYyB0b1NjaGVtYVBvaW50ZXIoZGF0YVBvaW50ZXIsIHNjaGVtYSkge1xuICAgIGlmICh0aGlzLmlzSnNvblBvaW50ZXIoZGF0YVBvaW50ZXIpICYmIHR5cGVvZiBzY2hlbWEgPT09ICdvYmplY3QnKSB7XG4gICAgICBjb25zdCBwb2ludGVyQXJyYXkgPSB0aGlzLnBhcnNlKGRhdGFQb2ludGVyKTtcbiAgICAgIGlmICghcG9pbnRlckFycmF5Lmxlbmd0aCkgeyByZXR1cm4gJyc7IH1cbiAgICAgIGNvbnN0IGZpcnN0S2V5ID0gcG9pbnRlckFycmF5LnNoaWZ0KCk7XG4gICAgICBpZiAoc2NoZW1hLnR5cGUgPT09ICdvYmplY3QnIHx8IHNjaGVtYS5wcm9wZXJ0aWVzIHx8IHNjaGVtYS5hZGRpdGlvbmFsUHJvcGVydGllcykge1xuICAgICAgICBpZiAoKHNjaGVtYS5wcm9wZXJ0aWVzIHx8IHt9KVtmaXJzdEtleV0pIHtcbiAgICAgICAgICByZXR1cm4gYC9wcm9wZXJ0aWVzLyR7dGhpcy5lc2NhcGUoZmlyc3RLZXkpfWAgK1xuICAgICAgICAgICAgdGhpcy50b1NjaGVtYVBvaW50ZXIocG9pbnRlckFycmF5LCBzY2hlbWEucHJvcGVydGllc1tmaXJzdEtleV0pO1xuICAgICAgICB9IGVsc2UgIGlmIChzY2hlbWEuYWRkaXRpb25hbFByb3BlcnRpZXMpIHtcbiAgICAgICAgICByZXR1cm4gJy9hZGRpdGlvbmFsUHJvcGVydGllcycgK1xuICAgICAgICAgICAgdGhpcy50b1NjaGVtYVBvaW50ZXIocG9pbnRlckFycmF5LCBzY2hlbWEuYWRkaXRpb25hbFByb3BlcnRpZXMpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoKHNjaGVtYS50eXBlID09PSAnYXJyYXknIHx8IHNjaGVtYS5pdGVtcykgJiZcbiAgICAgICAgKGlzTnVtYmVyKGZpcnN0S2V5KSB8fCBmaXJzdEtleSA9PT0gJy0nIHx8IGZpcnN0S2V5ID09PSAnJylcbiAgICAgICkge1xuICAgICAgICBjb25zdCBhcnJheUl0ZW0gPSBmaXJzdEtleSA9PT0gJy0nIHx8IGZpcnN0S2V5ID09PSAnJyA/IDAgOiArZmlyc3RLZXk7XG4gICAgICAgIGlmIChpc0FycmF5KHNjaGVtYS5pdGVtcykpIHtcbiAgICAgICAgICBpZiAoYXJyYXlJdGVtIDwgc2NoZW1hLml0ZW1zLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuICcvaXRlbXMvJyArIGFycmF5SXRlbSArXG4gICAgICAgICAgICAgIHRoaXMudG9TY2hlbWFQb2ludGVyKHBvaW50ZXJBcnJheSwgc2NoZW1hLml0ZW1zW2FycmF5SXRlbV0pO1xuICAgICAgICAgIH0gZWxzZSBpZiAoc2NoZW1hLmFkZGl0aW9uYWxJdGVtcykge1xuICAgICAgICAgICAgcmV0dXJuICcvYWRkaXRpb25hbEl0ZW1zJyArXG4gICAgICAgICAgICAgIHRoaXMudG9TY2hlbWFQb2ludGVyKHBvaW50ZXJBcnJheSwgc2NoZW1hLmFkZGl0aW9uYWxJdGVtcyk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGlzT2JqZWN0KHNjaGVtYS5pdGVtcykpIHtcbiAgICAgICAgICByZXR1cm4gJy9pdGVtcycgKyB0aGlzLnRvU2NoZW1hUG9pbnRlcihwb2ludGVyQXJyYXksIHNjaGVtYS5pdGVtcyk7XG4gICAgICAgIH0gZWxzZSBpZiAoaXNPYmplY3Qoc2NoZW1hLmFkZGl0aW9uYWxJdGVtcykpIHtcbiAgICAgICAgICByZXR1cm4gJy9hZGRpdGlvbmFsSXRlbXMnICtcbiAgICAgICAgICAgIHRoaXMudG9TY2hlbWFQb2ludGVyKHBvaW50ZXJBcnJheSwgc2NoZW1hLmFkZGl0aW9uYWxJdGVtcyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGNvbnNvbGUuZXJyb3IoYHRvU2NoZW1hUG9pbnRlciBlcnJvcjogRGF0YSBwb2ludGVyICR7ZGF0YVBvaW50ZXJ9IGAgK1xuICAgICAgICBgbm90IGNvbXBhdGlibGUgd2l0aCBzY2hlbWEgJHtzY2hlbWF9YCk7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgaWYgKCF0aGlzLmlzSnNvblBvaW50ZXIoZGF0YVBvaW50ZXIpKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGB0b1NjaGVtYVBvaW50ZXIgZXJyb3I6IEludmFsaWQgSlNPTiBQb2ludGVyOiAke2RhdGFQb2ludGVyfWApO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIHNjaGVtYSAhPT0gJ29iamVjdCcpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoYHRvU2NoZW1hUG9pbnRlciBlcnJvcjogSW52YWxpZCBKU09OIFNjaGVtYTogJHtzY2hlbWF9YCk7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqICd0b0RhdGFQb2ludGVyJyBmdW5jdGlvblxuICAgKlxuICAgKiBBY2NlcHRzIGEgSlNPTiBQb2ludGVyIHRvIGEgc3ViLXNjaGVtYSBpbnNpZGUgYSBKU09OIHNjaGVtYSBhbmQgdGhlIHNjaGVtYS5cbiAgICpcbiAgICogSWYgcG9zc2libGUsIHJldHVybnMgYSBnZW5lcmljIFBvaW50ZXIgdG8gdGhlIGNvcnJlc3BvbmRpbmcgdmFsdWUgaW5zaWRlXG4gICAqIHRoZSBkYXRhIG9iamVjdCBkZXNjcmliZWQgYnkgdGhlIEpTT04gc2NoZW1hLlxuICAgKlxuICAgKiBSZXR1cm5zIG51bGwgaWYgdGhlIHN1Yi1zY2hlbWEgaXMgaW4gYW4gYW1iaWd1b3VzIGxvY2F0aW9uIChzdWNoIGFzXG4gICAqIGRlZmluaXRpb25zIG9yIGFkZGl0aW9uYWxQcm9wZXJ0aWVzKSB3aGVyZSB0aGUgY29ycmVzcG9uZGluZyB2YWx1ZVxuICAgKiBsb2NhdGlvbiBjYW5ub3QgYmUgZGV0ZXJtaW5lZC5cbiAgICpcbiAgICogLy8gIHsgUG9pbnRlciB9IHNjaGVtYVBvaW50ZXIgLSBKU09OIFBvaW50ZXIgKHN0cmluZyBvciBhcnJheSkgdG8gYSBKU09OIHNjaGVtYVxuICAgKiAvLyAgIHNjaGVtYSAtIHRoZSBKU09OIHNjaGVtYVxuICAgKiAvLyAgeyBib29sZWFuID0gZmFsc2UgfSBlcnJvcnMgLSBTaG93IGVycm9ycz9cbiAgICogLy8geyBQb2ludGVyIH0gLSBKU09OIFBvaW50ZXIgKHN0cmluZykgdG8gdGhlIHZhbHVlIGluIHRoZSBkYXRhIG9iamVjdFxuICAgKi9cbiAgc3RhdGljIHRvRGF0YVBvaW50ZXIoc2NoZW1hUG9pbnRlciwgc2NoZW1hLCBlcnJvcnMgPSBmYWxzZSkge1xuICAgIGlmICh0aGlzLmlzSnNvblBvaW50ZXIoc2NoZW1hUG9pbnRlcikgJiYgdHlwZW9mIHNjaGVtYSA9PT0gJ29iamVjdCcgJiZcbiAgICAgIHRoaXMuaGFzKHNjaGVtYSwgc2NoZW1hUG9pbnRlcilcbiAgICApIHtcbiAgICAgIGNvbnN0IHBvaW50ZXJBcnJheSA9IHRoaXMucGFyc2Uoc2NoZW1hUG9pbnRlcik7XG4gICAgICBpZiAoIXBvaW50ZXJBcnJheS5sZW5ndGgpIHsgcmV0dXJuICcnOyB9XG4gICAgICBsZXQgZGF0YVBvaW50ZXIgPSAnJztcbiAgICAgIGNvbnN0IGZpcnN0S2V5ID0gcG9pbnRlckFycmF5LnNoaWZ0KCk7XG4gICAgICBpZiAoZmlyc3RLZXkgPT09ICdwcm9wZXJ0aWVzJyB8fFxuICAgICAgICAoZmlyc3RLZXkgPT09ICdpdGVtcycgJiYgaXNBcnJheShzY2hlbWEuaXRlbXMpKVxuICAgICAgKSB7XG4gICAgICAgIGNvbnN0IHNlY29uZEtleSA9IHBvaW50ZXJBcnJheS5zaGlmdCgpO1xuICAgICAgICBjb25zdCBwb2ludGVyU3VmZml4ID0gdGhpcy50b0RhdGFQb2ludGVyKHBvaW50ZXJBcnJheSwgc2NoZW1hW2ZpcnN0S2V5XVtzZWNvbmRLZXldKTtcbiAgICAgICAgcmV0dXJuIHBvaW50ZXJTdWZmaXggPT09IG51bGwgPyBudWxsIDogJy8nICsgc2Vjb25kS2V5ICsgcG9pbnRlclN1ZmZpeDtcbiAgICAgIH0gZWxzZSBpZiAoZmlyc3RLZXkgPT09ICdhZGRpdGlvbmFsSXRlbXMnIHx8XG4gICAgICAgIChmaXJzdEtleSA9PT0gJ2l0ZW1zJyAmJiBpc09iamVjdChzY2hlbWEuaXRlbXMpKVxuICAgICAgKSB7XG4gICAgICAgIGNvbnN0IHBvaW50ZXJTdWZmaXggPSB0aGlzLnRvRGF0YVBvaW50ZXIocG9pbnRlckFycmF5LCBzY2hlbWFbZmlyc3RLZXldKTtcbiAgICAgICAgcmV0dXJuIHBvaW50ZXJTdWZmaXggPT09IG51bGwgPyBudWxsIDogJy8tJyArIHBvaW50ZXJTdWZmaXg7XG4gICAgICB9IGVsc2UgaWYgKFsnYWxsT2YnLCAnYW55T2YnLCAnb25lT2YnXS5pbmNsdWRlcyhmaXJzdEtleSkpIHtcbiAgICAgICAgY29uc3Qgc2Vjb25kS2V5ID0gcG9pbnRlckFycmF5LnNoaWZ0KCk7XG4gICAgICAgIHJldHVybiB0aGlzLnRvRGF0YVBvaW50ZXIocG9pbnRlckFycmF5LCBzY2hlbWFbZmlyc3RLZXldW3NlY29uZEtleV0pO1xuICAgICAgfSBlbHNlIGlmIChmaXJzdEtleSA9PT0gJ25vdCcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudG9EYXRhUG9pbnRlcihwb2ludGVyQXJyYXksIHNjaGVtYVtmaXJzdEtleV0pO1xuICAgICAgfSBlbHNlIGlmIChbJ2NvbnRhaW5zJywgJ2RlZmluaXRpb25zJywgJ2RlcGVuZGVuY2llcycsICdhZGRpdGlvbmFsSXRlbXMnLFxuICAgICAgICAnYWRkaXRpb25hbFByb3BlcnRpZXMnLCAncGF0dGVyblByb3BlcnRpZXMnLCAncHJvcGVydHlOYW1lcyddLmluY2x1ZGVzKGZpcnN0S2V5KVxuICAgICAgKSB7XG4gICAgICAgIGlmIChlcnJvcnMpIHsgY29uc29sZS5lcnJvcihgdG9EYXRhUG9pbnRlciBlcnJvcjogQW1iaWd1b3VzIGxvY2F0aW9uYCk7IH1cbiAgICAgIH1cbiAgICAgIHJldHVybiAnJztcbiAgICB9XG4gICAgaWYgKGVycm9ycykge1xuICAgICAgaWYgKCF0aGlzLmlzSnNvblBvaW50ZXIoc2NoZW1hUG9pbnRlcikpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihgdG9EYXRhUG9pbnRlciBlcnJvcjogSW52YWxpZCBKU09OIFBvaW50ZXI6ICR7c2NoZW1hUG9pbnRlcn1gKTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2Ygc2NoZW1hICE9PSAnb2JqZWN0Jykge1xuICAgICAgICBjb25zb2xlLmVycm9yKGB0b0RhdGFQb2ludGVyIGVycm9yOiBJbnZhbGlkIEpTT04gU2NoZW1hOiAke3NjaGVtYX1gKTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2Ygc2NoZW1hICE9PSAnb2JqZWN0Jykge1xuICAgICAgICBjb25zb2xlLmVycm9yKGB0b0RhdGFQb2ludGVyIGVycm9yOiBQb2ludGVyICR7c2NoZW1hUG9pbnRlcn0gaW52YWxpZCBmb3IgU2NoZW1hOiAke3NjaGVtYX1gKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICAvKipcbiAgICogJ3BhcnNlT2JqZWN0UGF0aCcgZnVuY3Rpb25cbiAgICpcbiAgICogUGFyc2VzIGEgSmF2YVNjcmlwdCBvYmplY3QgcGF0aCBpbnRvIGFuIGFycmF5IG9mIGtleXMsIHdoaWNoXG4gICAqIGNhbiB0aGVuIGJlIHBhc3NlZCB0byBjb21waWxlKCkgdG8gY29udmVydCBpbnRvIGEgc3RyaW5nIEpTT04gUG9pbnRlci5cbiAgICpcbiAgICogQmFzZWQgb24gbWlrZS1tYXJjYWNjaSdzIGV4Y2VsbGVudCBvYmplY3RwYXRoIHBhcnNlIGZ1bmN0aW9uOlxuICAgKiBodHRwczovL2dpdGh1Yi5jb20vbWlrZS1tYXJjYWNjaS9vYmplY3RwYXRoXG4gICAqXG4gICAqIC8vICB7IFBvaW50ZXIgfSBwYXRoIC0gVGhlIG9iamVjdCBwYXRoIHRvIHBhcnNlXG4gICAqIC8vIHsgc3RyaW5nW10gfSAtIFRoZSByZXN1bHRpbmcgYXJyYXkgb2Yga2V5c1xuICAgKi9cbiAgc3RhdGljIHBhcnNlT2JqZWN0UGF0aChwYXRoKSB7XG4gICAgaWYgKGlzQXJyYXkocGF0aCkpIHsgcmV0dXJuIDxzdHJpbmdbXT5wYXRoOyB9XG4gICAgaWYgKHRoaXMuaXNKc29uUG9pbnRlcihwYXRoKSkgeyByZXR1cm4gdGhpcy5wYXJzZShwYXRoKTsgfVxuICAgIGlmICh0eXBlb2YgcGF0aCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGxldCBpbmRleCA9IDA7XG4gICAgICBsZXQgcGFydHM6IHN0cmluZ1tdID0gW107XG4gICAgICB3aGlsZSAoaW5kZXggPCBwYXRoLmxlbmd0aCkge1xuICAgICAgICBjb25zdCBuZXh0RG90ID0gcGF0aC5pbmRleE9mKCcuJywgaW5kZXgpO1xuICAgICAgICBjb25zdCBuZXh0T0IgPSBwYXRoLmluZGV4T2YoJ1snLCBpbmRleCk7IC8vIG5leHQgb3BlbiBicmFja2V0XG4gICAgICAgIGlmIChuZXh0RG90ID09PSAtMSAmJiBuZXh0T0IgPT09IC0xKSB7IC8vIGxhc3QgaXRlbVxuICAgICAgICAgIHBhcnRzLnB1c2gocGF0aC5zbGljZShpbmRleCkpO1xuICAgICAgICAgIGluZGV4ID0gcGF0aC5sZW5ndGg7XG4gICAgICAgIH0gZWxzZSBpZiAobmV4dERvdCAhPT0gLTEgJiYgKG5leHREb3QgPCBuZXh0T0IgfHwgbmV4dE9CID09PSAtMSkpIHsgLy8gZG90IG5vdGF0aW9uXG4gICAgICAgICAgcGFydHMucHVzaChwYXRoLnNsaWNlKGluZGV4LCBuZXh0RG90KSk7XG4gICAgICAgICAgaW5kZXggPSBuZXh0RG90ICsgMTtcbiAgICAgICAgfSBlbHNlIHsgLy8gYnJhY2tldCBub3RhdGlvblxuICAgICAgICAgIGlmIChuZXh0T0IgPiBpbmRleCkge1xuICAgICAgICAgICAgcGFydHMucHVzaChwYXRoLnNsaWNlKGluZGV4LCBuZXh0T0IpKTtcbiAgICAgICAgICAgIGluZGV4ID0gbmV4dE9CO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zdCBxdW90ZSA9IHBhdGguY2hhckF0KG5leHRPQiArIDEpO1xuICAgICAgICAgIGlmIChxdW90ZSA9PT0gJ1wiJyB8fCBxdW90ZSA9PT0gXCInXCIpIHsgLy8gZW5jbG9zaW5nIHF1b3Rlc1xuICAgICAgICAgICAgbGV0IG5leHRDQiA9IHBhdGguaW5kZXhPZihxdW90ZSArICddJywgbmV4dE9CKTsgLy8gbmV4dCBjbG9zZSBicmFja2V0XG4gICAgICAgICAgICB3aGlsZSAobmV4dENCICE9PSAtMSAmJiBwYXRoLmNoYXJBdChuZXh0Q0IgLSAxKSA9PT0gJ1xcXFwnKSB7XG4gICAgICAgICAgICAgIG5leHRDQiA9IHBhdGguaW5kZXhPZihxdW90ZSArICddJywgbmV4dENCICsgMik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobmV4dENCID09PSAtMSkgeyBuZXh0Q0IgPSBwYXRoLmxlbmd0aDsgfVxuICAgICAgICAgICAgcGFydHMucHVzaChwYXRoLnNsaWNlKGluZGV4ICsgMiwgbmV4dENCKVxuICAgICAgICAgICAgICAucmVwbGFjZShuZXcgUmVnRXhwKCdcXFxcJyArIHF1b3RlLCAnZycpLCBxdW90ZSkpO1xuICAgICAgICAgICAgaW5kZXggPSBuZXh0Q0IgKyAyO1xuICAgICAgICAgIH0gZWxzZSB7IC8vIG5vIGVuY2xvc2luZyBxdW90ZXNcbiAgICAgICAgICAgIGxldCBuZXh0Q0IgPSBwYXRoLmluZGV4T2YoJ10nLCBuZXh0T0IpOyAvLyBuZXh0IGNsb3NlIGJyYWNrZXRcbiAgICAgICAgICAgIGlmIChuZXh0Q0IgPT09IC0xKSB7IG5leHRDQiA9IHBhdGgubGVuZ3RoOyB9XG4gICAgICAgICAgICBwYXJ0cy5wdXNoKHBhdGguc2xpY2UoaW5kZXggKyAxLCBuZXh0Q0IpKTtcbiAgICAgICAgICAgIGluZGV4ID0gbmV4dENCICsgMTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHBhdGguY2hhckF0KGluZGV4KSA9PT0gJy4nKSB7IGluZGV4Kys7IH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHBhcnRzO1xuICAgIH1cbiAgICBjb25zb2xlLmVycm9yKCdwYXJzZU9iamVjdFBhdGggZXJyb3I6IElucHV0IG9iamVjdCBwYXRoIG11c3QgYmUgYSBzdHJpbmcuJyk7XG4gIH1cbn1cbiJdfQ==