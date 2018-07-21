/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { hasValue, inArray, isArray, isDefined, isObject, isEmpty, isMap, isSet, isString } from './validator.functions';
/**
 * 'addClasses' function
 *
 * Merges two space-delimited lists of CSS classes and removes duplicates.
 *
 * // {string | string[] | Set<string>} oldClasses
 * // {string | string[] | Set<string>} newClasses
 * // {string | string[] | Set<string>} - Combined classes
 * @param {?} oldClasses
 * @param {?} newClasses
 * @return {?}
 */
export function addClasses(oldClasses, newClasses) {
    /** @type {?} */
    var badType = function (i) { return !isSet(i) && !isArray(i) && !isString(i); };
    if (badType(newClasses)) {
        return oldClasses;
    }
    if (badType(oldClasses)) {
        oldClasses = '';
    }
    /** @type {?} */
    var toSet = function (i) { return isSet(i) ? i : isArray(i) ? new Set(i) : new Set(i.split(' ')); };
    /** @type {?} */
    var combinedSet = toSet(oldClasses);
    /** @type {?} */
    var newSet = toSet(newClasses);
    newSet.forEach(function (c) { return combinedSet.add(c); });
    if (isSet(oldClasses)) {
        return combinedSet;
    }
    if (isArray(oldClasses)) {
        return Array.from(combinedSet);
    }
    return Array.from(combinedSet).join(' ');
}
/**
 * 'copy' function
 *
 * Makes a shallow copy of a JavaScript object, array, Map, or Set.
 * If passed a JavaScript primitive value (string, number, boolean, or null),
 * it returns the value.
 *
 * // {Object|Array|string|number|boolean|null} object - The object to copy
 * // {boolean = false} errors - Show errors?
 * // {Object|Array|string|number|boolean|null} - The copied object
 * @param {?} object
 * @param {?=} errors
 * @return {?}
 */
export function copy(object, errors) {
    if (errors === void 0) { errors = false; }
    if (typeof object !== 'object' || object === null) {
        return object;
    }
    if (isMap(object)) {
        return new Map(object);
    }
    if (isSet(object)) {
        return new Set(object);
    }
    if (isArray(object)) {
        return tslib_1.__spread(object);
    }
    if (isObject(object)) {
        return tslib_1.__assign({}, object);
    }
    if (errors) {
        console.error('copy error: Object to copy must be a JavaScript object or value.');
    }
    return object;
}
/**
 * 'forEach' function
 *
 * Iterates over all items in the first level of an object or array
 * and calls an iterator funciton on each item.
 *
 * The iterator function is called with four values:
 * 1. The current item's value
 * 2. The current item's key
 * 3. The parent object, which contains the current item
 * 4. The root object
 *
 * Setting the optional third parameter to 'top-down' or 'bottom-up' will cause
 * it to also recursively iterate over items in sub-objects or sub-arrays in the
 * specified direction.
 *
 * // {Object|Array} object - The object or array to iterate over
 * // {function} fn - the iterator funciton to call on each item
 * // {boolean = false} errors - Show errors?
 * // {void}
 * @param {?} object
 * @param {?} fn
 * @param {?=} recurse
 * @param {?=} rootObject
 * @param {?=} errors
 * @return {?}
 */
export function forEach(object, fn, recurse, rootObject, errors) {
    if (recurse === void 0) { recurse = false; }
    if (rootObject === void 0) { rootObject = object; }
    if (errors === void 0) { errors = false; }
    if (isEmpty(object)) {
        return;
    }
    if ((isObject(object) || isArray(object)) && typeof fn === 'function') {
        try {
            for (var _a = tslib_1.__values(Object.keys(object)), _b = _a.next(); !_b.done; _b = _a.next()) {
                var key = _b.value;
                /** @type {?} */
                var value = object[key];
                if (recurse === 'bottom-up' && (isObject(value) || isArray(value))) {
                    forEach(value, fn, recurse, rootObject);
                }
                fn(value, key, object, rootObject);
                if (recurse === 'top-down' && (isObject(value) || isArray(value))) {
                    forEach(value, fn, recurse, rootObject);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_1) throw e_1.error; }
        }
    }
    if (errors) {
        if (typeof fn !== 'function') {
            console.error('forEach error: Iterator must be a function.');
            console.error('function', fn);
        }
        if (!isObject(object) && !isArray(object)) {
            console.error('forEach error: Input object must be an object or array.');
            console.error('object', object);
        }
    }
    var e_1, _c;
}
/**
 * 'forEachCopy' function
 *
 * Iterates over all items in the first level of an object or array
 * and calls an iterator function on each item. Returns a new object or array
 * with the same keys or indexes as the original, and values set to the results
 * of the iterator function.
 *
 * Does NOT recursively iterate over items in sub-objects or sub-arrays.
 *
 * // {Object | Array} object - The object or array to iterate over
 * // {function} fn - The iterator funciton to call on each item
 * // {boolean = false} errors - Show errors?
 * // {Object | Array} - The resulting object or array
 * @param {?} object
 * @param {?} fn
 * @param {?=} errors
 * @return {?}
 */
export function forEachCopy(object, fn, errors) {
    if (errors === void 0) { errors = false; }
    if (!hasValue(object)) {
        return;
    }
    if ((isObject(object) || isArray(object)) && typeof object !== 'function') {
        /** @type {?} */
        var newObject = isArray(object) ? [] : {};
        try {
            for (var _a = tslib_1.__values(Object.keys(object)), _b = _a.next(); !_b.done; _b = _a.next()) {
                var key = _b.value;
                newObject[key] = fn(object[key], key, object);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return newObject;
    }
    if (errors) {
        if (typeof fn !== 'function') {
            console.error('forEachCopy error: Iterator must be a function.');
            console.error('function', fn);
        }
        if (!isObject(object) && !isArray(object)) {
            console.error('forEachCopy error: Input object must be an object or array.');
            console.error('object', object);
        }
    }
    var e_2, _c;
}
/**
 * 'hasOwn' utility function
 *
 * Checks whether an object or array has a particular property.
 *
 * // {any} object - the object to check
 * // {string} property - the property to look for
 * // {boolean} - true if object has property, false if not
 * @param {?} object
 * @param {?} property
 * @return {?}
 */
export function hasOwn(object, property) {
    if (!object || !['number', 'string', 'symbol'].includes(typeof property) ||
        (!isObject(object) && !isArray(object) && !isMap(object) && !isSet(object))) {
        return false;
    }
    if (isMap(object) || isSet(object)) {
        return object.has(property);
    }
    if (typeof property === 'number') {
        if (isArray(object)) {
            return object[/** @type {?} */ (property)];
        }
        property = property + '';
    }
    return object.hasOwnProperty(property);
}
/**
 * 'mergeFilteredObject' utility function
 *
 * Shallowly merges two objects, setting key and values from source object
 * in target object, excluding specified keys.
 *
 * Optionally, it can also use functions to transform the key names and/or
 * the values of the merging object.
 *
 * // {PlainObject} targetObject - Target object to add keys and values to
 * // {PlainObject} sourceObject - Source object to copy keys and values from
 * // {string[]} excludeKeys - Array of keys to exclude
 * // {(string: string) => string = (k) => k} keyFn - Function to apply to keys
 * // {(any: any) => any = (v) => v} valueFn - Function to apply to values
 * // {PlainObject} - Returns targetObject
 * @param {?} targetObject
 * @param {?} sourceObject
 * @param {?=} excludeKeys
 * @param {?=} keyFn
 * @param {?=} valFn
 * @return {?}
 */
export function mergeFilteredObject(targetObject, sourceObject, excludeKeys, keyFn, valFn) {
    if (excludeKeys === void 0) { excludeKeys = /** @type {?} */ ([]); }
    if (keyFn === void 0) { keyFn = function (key) { return key; }; }
    if (valFn === void 0) { valFn = function (val) { return val; }; }
    if (!isObject(sourceObject)) {
        return targetObject;
    }
    if (!isObject(targetObject)) {
        targetObject = {};
    }
    try {
        for (var _a = tslib_1.__values(Object.keys(sourceObject)), _b = _a.next(); !_b.done; _b = _a.next()) {
            var key = _b.value;
            if (!inArray(key, excludeKeys) && isDefined(sourceObject[key])) {
                targetObject[keyFn(key)] = valFn(sourceObject[key]);
            }
        }
    }
    catch (e_3_1) { e_3 = { error: e_3_1 }; }
    finally {
        try {
            if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
        }
        finally { if (e_3) throw e_3.error; }
    }
    return targetObject;
    var e_3, _c;
}
/**
 * 'uniqueItems' function
 *
 * Accepts any number of string value inputs,
 * and returns an array of all input vaues, excluding duplicates.
 *
 * // {...string} ...items -
 * // {string[]} -
 * @param {...?} items
 * @return {?}
 */
export function uniqueItems() {
    var items = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        items[_i] = arguments[_i];
    }
    /** @type {?} */
    var returnItems = [];
    try {
        for (var items_1 = tslib_1.__values(items), items_1_1 = items_1.next(); !items_1_1.done; items_1_1 = items_1.next()) {
            var item = items_1_1.value;
            if (!returnItems.includes(item)) {
                returnItems.push(item);
            }
        }
    }
    catch (e_4_1) { e_4 = { error: e_4_1 }; }
    finally {
        try {
            if (items_1_1 && !items_1_1.done && (_a = items_1.return)) _a.call(items_1);
        }
        finally { if (e_4) throw e_4.error; }
    }
    return returnItems;
    var e_4, _a;
}
/**
 * 'commonItems' function
 *
 * Accepts any number of strings or arrays of string values,
 * and returns a single array containing only values present in all inputs.
 *
 * // {...string|string[]} ...arrays -
 * // {string[]} -
 * @param {...?} arrays
 * @return {?}
 */
export function commonItems() {
    var arrays = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        arrays[_i] = arguments[_i];
    }
    /** @type {?} */
    var returnItems = null;
    var _loop_1 = function (array) {
        if (isString(array)) {
            array = [array];
        }
        returnItems = returnItems === null ? tslib_1.__spread(array) :
            returnItems.filter(function (item) { return array.includes(item); });
        if (!returnItems.length) {
            return { value: [] };
        }
    };
    try {
        for (var arrays_1 = tslib_1.__values(arrays), arrays_1_1 = arrays_1.next(); !arrays_1_1.done; arrays_1_1 = arrays_1.next()) {
            var array = arrays_1_1.value;
            var state_1 = _loop_1(array);
            if (typeof state_1 === "object")
                return state_1.value;
        }
    }
    catch (e_5_1) { e_5 = { error: e_5_1 }; }
    finally {
        try {
            if (arrays_1_1 && !arrays_1_1.done && (_a = arrays_1.return)) _a.call(arrays_1);
        }
        finally { if (e_5) throw e_5.error; }
    }
    return returnItems;
    var e_5, _a;
}
/**
 * 'fixTitle' function
 *
 *
 * // {string} input -
 * // {string} -
 * @param {?} name
 * @return {?}
 */
export function fixTitle(name) {
    return name && toTitleCase(name.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/_/g, ' '));
}
/**
 * 'toTitleCase' function
 *
 * Intelligently converts an input string to Title Case.
 *
 * Accepts an optional second parameter with a list of additional
 * words and abbreviations to force into a particular case.
 *
 * This function is built on prior work by John Gruber and David Gouch:
 * http://daringfireball.net/2008/08/title_case_update
 * https://github.com/gouch/to-title-case
 *
 * // {string} input -
 * // {string|string[]} forceWords? -
 * // {string} -
 * @param {?} input
 * @param {?=} forceWords
 * @return {?}
 */
export function toTitleCase(input, forceWords) {
    if (!isString(input)) {
        return input;
    }
    /** @type {?} */
    var forceArray = ['a', 'an', 'and', 'as', 'at', 'but', 'by', 'en',
        'for', 'if', 'in', 'nor', 'of', 'on', 'or', 'per', 'the', 'to', 'v', 'v.',
        'vs', 'vs.', 'via'];
    if (isString(forceWords)) {
        forceWords = (/** @type {?} */ (forceWords)).split('|');
    }
    if (isArray(forceWords)) {
        forceArray = forceArray.concat(forceWords);
    }
    /** @type {?} */
    var forceArrayLower = forceArray.map(function (w) { return w.toLowerCase(); });
    /** @type {?} */
    var noInitialCase = input === input.toUpperCase() || input === input.toLowerCase();
    /** @type {?} */
    var prevLastChar = '';
    input = input.trim();
    return input.replace(/[A-Za-z0-9\u00C0-\u00FF]+[^\s-]*/g, function (word, idx) {
        if (!noInitialCase && word.slice(1).search(/[A-Z]|\../) !== -1) {
            return word;
        }
        else {
            /** @type {?} */
            var newWord = void 0;
            /** @type {?} */
            var forceWord = forceArray[forceArrayLower.indexOf(word.toLowerCase())];
            if (!forceWord) {
                if (noInitialCase) {
                    if (word.slice(1).search(/\../) !== -1) {
                        newWord = word.toLowerCase();
                    }
                    else {
                        newWord = word[0].toUpperCase() + word.slice(1).toLowerCase();
                    }
                }
                else {
                    newWord = word[0].toUpperCase() + word.slice(1);
                }
            }
            else if (forceWord === forceWord.toLowerCase() && (idx === 0 || idx + word.length === input.length ||
                prevLastChar === ':' || input[idx - 1].search(/[^\s-]/) !== -1 ||
                (input[idx - 1] !== '-' && input[idx + word.length] === '-'))) {
                newWord = forceWord[0].toUpperCase() + forceWord.slice(1);
            }
            else {
                newWord = forceWord;
            }
            prevLastChar = word.slice(-1);
            return newWord;
        }
    });
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbGl0eS5mdW5jdGlvbnMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZzYtanNvbi1zY2hlbWEtZm9ybS8iLCJzb3VyY2VzIjpbImxpYi9zaGFyZWQvdXRpbGl0eS5mdW5jdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQ0wsUUFBUSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFDdEUsUUFBUSxFQUNULE1BQU0sdUJBQXVCLENBQUM7Ozs7Ozs7Ozs7Ozs7QUFrQi9CLE1BQU0scUJBQ0osVUFBMkMsRUFDM0MsVUFBMkM7O0lBRTNDLElBQU0sT0FBTyxHQUFHLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQXhDLENBQXdDLENBQUM7SUFDOUQsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUM7S0FBRTtJQUMvQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQztLQUFFOztJQUM3QyxJQUFNLEtBQUssR0FBRyxVQUFBLENBQUMsSUFBSSxPQUFBLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQTlELENBQThELENBQUM7O0lBQ2xGLElBQU0sV0FB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QyxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUVoRSxDQUFDLENBQUMsQ0FBQztnQkFDRCxPQUFPLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDM0Q7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixPQUFPLEdBQUcsU0FBUyxDQUFDO2FBQ3JCO1lBQ0QsWUFBWSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM5QixNQUFNLENBQUMsT0FBTyxDQUFDO1NBQ2hCO0tBQ0YsQ0FBQyxDQUFDO0NBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBoYXNWYWx1ZSwgaW5BcnJheSwgaXNBcnJheSwgaXNEZWZpbmVkLCBpc09iamVjdCwgaXNFbXB0eSwgaXNNYXAsIGlzU2V0LFxuICBpc1N0cmluZywgUGxhaW5PYmplY3Rcbn0gZnJvbSAnLi92YWxpZGF0b3IuZnVuY3Rpb25zJztcblxuLyoqXG4gKiBVdGlsaXR5IGZ1bmN0aW9uIGxpYnJhcnk6XG4gKlxuICogYWRkQ2xhc3NlcywgY29weSwgZm9yRWFjaCwgZm9yRWFjaENvcHksIGhhc093biwgbWVyZ2VGaWx0ZXJlZE9iamVjdCxcbiAqIHVuaXF1ZUl0ZW1zLCBjb21tb25JdGVtcywgZml4VGl0bGUsIHRvVGl0bGVDYXNlXG4qL1xuXG4vKipcbiAqICdhZGRDbGFzc2VzJyBmdW5jdGlvblxuICpcbiAqIE1lcmdlcyB0d28gc3BhY2UtZGVsaW1pdGVkIGxpc3RzIG9mIENTUyBjbGFzc2VzIGFuZCByZW1vdmVzIGR1cGxpY2F0ZXMuXG4gKlxuICogLy8ge3N0cmluZyB8IHN0cmluZ1tdIHwgU2V0PHN0cmluZz59IG9sZENsYXNzZXNcbiAqIC8vIHtzdHJpbmcgfCBzdHJpbmdbXSB8IFNldDxzdHJpbmc+fSBuZXdDbGFzc2VzXG4gKiAvLyB7c3RyaW5nIHwgc3RyaW5nW10gfCBTZXQ8c3RyaW5nPn0gLSBDb21iaW5lZCBjbGFzc2VzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhZGRDbGFzc2VzKFxuICBvbGRDbGFzc2VzOiBzdHJpbmcgfCBzdHJpbmdbXSB8IFNldDxzdHJpbmc+LFxuICBuZXdDbGFzc2VzOiBzdHJpbmcgfCBzdHJpbmdbXSB8IFNldDxzdHJpbmc+XG4pOiBzdHJpbmcgfCBzdHJpbmdbXSB8IFNldDxzdHJpbmc+IHtcbiAgY29uc3QgYmFkVHlwZSA9IGkgPT4gIWlzU2V0KGkpICYmICFpc0FycmF5KGkpICYmICFpc1N0cmluZyhpKTtcbiAgaWYgKGJhZFR5cGUobmV3Q2xhc3NlcykpIHsgcmV0dXJuIG9sZENsYXNzZXM7IH1cbiAgaWYgKGJhZFR5cGUob2xkQ2xhc3NlcykpIHsgb2xkQ2xhc3NlcyA9ICcnOyB9XG4gIGNvbnN0IHRvU2V0ID0gaSA9PiBpc1NldChpKSA/IGkgOiBpc0FycmF5KGkpID8gbmV3IFNldChpKSA6IG5ldyBTZXQoaS5zcGxpdCgnICcpKTtcbiAgY29uc3QgY29tYmluZWRTZXQ6IFNldDxhbnk+ID0gdG9TZXQob2xkQ2xhc3Nlcyk7XG4gIGNvbnN0IG5ld1NldDogU2V0PGFueT4gPSB0b1NldChuZXdDbGFzc2VzKTtcbiAgbmV3U2V0LmZvckVhY2goYyA9PiBjb21iaW5lZFNldC5hZGQoYykpO1xuICBpZiAoaXNTZXQob2xkQ2xhc3NlcykpIHsgcmV0dXJuIGNvbWJpbmVkU2V0OyB9XG4gIGlmIChpc0FycmF5KG9sZENsYXNzZXMpKSB7IHJldHVybiBBcnJheS5mcm9tKGNvbWJpbmVkU2V0KTsgfVxuICByZXR1cm4gQXJyYXkuZnJvbShjb21iaW5lZFNldCkuam9pbignICcpO1xufVxuXG4vKipcbiAqICdjb3B5JyBmdW5jdGlvblxuICpcbiAqIE1ha2VzIGEgc2hhbGxvdyBjb3B5IG9mIGEgSmF2YVNjcmlwdCBvYmplY3QsIGFycmF5LCBNYXAsIG9yIFNldC5cbiAqIElmIHBhc3NlZCBhIEphdmFTY3JpcHQgcHJpbWl0aXZlIHZhbHVlIChzdHJpbmcsIG51bWJlciwgYm9vbGVhbiwgb3IgbnVsbCksXG4gKiBpdCByZXR1cm5zIHRoZSB2YWx1ZS5cbiAqXG4gKiAvLyB7T2JqZWN0fEFycmF5fHN0cmluZ3xudW1iZXJ8Ym9vbGVhbnxudWxsfSBvYmplY3QgLSBUaGUgb2JqZWN0IHRvIGNvcHlcbiAqIC8vIHtib29sZWFuID0gZmFsc2V9IGVycm9ycyAtIFNob3cgZXJyb3JzP1xuICogLy8ge09iamVjdHxBcnJheXxzdHJpbmd8bnVtYmVyfGJvb2xlYW58bnVsbH0gLSBUaGUgY29waWVkIG9iamVjdFxuICovXG5leHBvcnQgZnVuY3Rpb24gY29weShvYmplY3Q6IGFueSwgZXJyb3JzID0gZmFsc2UpOiBhbnkge1xuICBpZiAodHlwZW9mIG9iamVjdCAhPT0gJ29iamVjdCcgfHwgb2JqZWN0ID09PSBudWxsKSB7IHJldHVybiBvYmplY3Q7IH1cbiAgaWYgKGlzTWFwKG9iamVjdCkpICAgIHsgcmV0dXJuIG5ldyBNYXAob2JqZWN0KTsgfVxuICBpZiAoaXNTZXQob2JqZWN0KSkgICAgeyByZXR1cm4gbmV3IFNldChvYmplY3QpOyB9XG4gIGlmIChpc0FycmF5KG9iamVjdCkpICB7IHJldHVybiBbIC4uLm9iamVjdCBdOyAgIH1cbiAgaWYgKGlzT2JqZWN0KG9iamVjdCkpIHsgcmV0dXJuIHsgLi4ub2JqZWN0IH07ICAgfVxuICBpZiAoZXJyb3JzKSB7XG4gICAgY29uc29sZS5lcnJvcignY29weSBlcnJvcjogT2JqZWN0IHRvIGNvcHkgbXVzdCBiZSBhIEphdmFTY3JpcHQgb2JqZWN0IG9yIHZhbHVlLicpO1xuICB9XG4gIHJldHVybiBvYmplY3Q7XG59XG5cbi8qKlxuICogJ2ZvckVhY2gnIGZ1bmN0aW9uXG4gKlxuICogSXRlcmF0ZXMgb3ZlciBhbGwgaXRlbXMgaW4gdGhlIGZpcnN0IGxldmVsIG9mIGFuIG9iamVjdCBvciBhcnJheVxuICogYW5kIGNhbGxzIGFuIGl0ZXJhdG9yIGZ1bmNpdG9uIG9uIGVhY2ggaXRlbS5cbiAqXG4gKiBUaGUgaXRlcmF0b3IgZnVuY3Rpb24gaXMgY2FsbGVkIHdpdGggZm91ciB2YWx1ZXM6XG4gKiAxLiBUaGUgY3VycmVudCBpdGVtJ3MgdmFsdWVcbiAqIDIuIFRoZSBjdXJyZW50IGl0ZW0ncyBrZXlcbiAqIDMuIFRoZSBwYXJlbnQgb2JqZWN0LCB3aGljaCBjb250YWlucyB0aGUgY3VycmVudCBpdGVtXG4gKiA0LiBUaGUgcm9vdCBvYmplY3RcbiAqXG4gKiBTZXR0aW5nIHRoZSBvcHRpb25hbCB0aGlyZCBwYXJhbWV0ZXIgdG8gJ3RvcC1kb3duJyBvciAnYm90dG9tLXVwJyB3aWxsIGNhdXNlXG4gKiBpdCB0byBhbHNvIHJlY3Vyc2l2ZWx5IGl0ZXJhdGUgb3ZlciBpdGVtcyBpbiBzdWItb2JqZWN0cyBvciBzdWItYXJyYXlzIGluIHRoZVxuICogc3BlY2lmaWVkIGRpcmVjdGlvbi5cbiAqXG4gKiAvLyB7T2JqZWN0fEFycmF5fSBvYmplY3QgLSBUaGUgb2JqZWN0IG9yIGFycmF5IHRvIGl0ZXJhdGUgb3ZlclxuICogLy8ge2Z1bmN0aW9ufSBmbiAtIHRoZSBpdGVyYXRvciBmdW5jaXRvbiB0byBjYWxsIG9uIGVhY2ggaXRlbVxuICogLy8ge2Jvb2xlYW4gPSBmYWxzZX0gZXJyb3JzIC0gU2hvdyBlcnJvcnM/XG4gKiAvLyB7dm9pZH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZvckVhY2goXG4gIG9iamVjdDogYW55LCBmbjogKHY6IGFueSwgaz86IHN0cmluZyB8IG51bWJlciwgYz86IGFueSwgcmM/OiBhbnkpID0+IGFueSxcbiAgcmVjdXJzZTogYm9vbGVhbiB8IHN0cmluZyA9IGZhbHNlLCByb290T2JqZWN0OiBhbnkgPSBvYmplY3QsIGVycm9ycyA9IGZhbHNlXG4pOiB2b2lkIHtcbiAgaWYgKGlzRW1wdHkob2JqZWN0KSkgeyByZXR1cm47IH1cbiAgaWYgKChpc09iamVjdChvYmplY3QpIHx8IGlzQXJyYXkob2JqZWN0KSkgJiYgdHlwZW9mIGZuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMob2JqZWN0KSkge1xuICAgICAgY29uc3QgdmFsdWUgPSBvYmplY3Rba2V5XTtcbiAgICAgIGlmIChyZWN1cnNlID09PSAnYm90dG9tLXVwJyAmJiAoaXNPYmplY3QodmFsdWUpIHx8IGlzQXJyYXkodmFsdWUpKSkge1xuICAgICAgICBmb3JFYWNoKHZhbHVlLCBmbiwgcmVjdXJzZSwgcm9vdE9iamVjdCk7XG4gICAgICB9XG4gICAgICBmbih2YWx1ZSwga2V5LCBvYmplY3QsIHJvb3RPYmplY3QpO1xuICAgICAgaWYgKHJlY3Vyc2UgPT09ICd0b3AtZG93bicgJiYgKGlzT2JqZWN0KHZhbHVlKSB8fCBpc0FycmF5KHZhbHVlKSkpIHtcbiAgICAgICAgZm9yRWFjaCh2YWx1ZSwgZm4sIHJlY3Vyc2UsIHJvb3RPYmplY3QpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBpZiAoZXJyb3JzKSB7XG4gICAgaWYgKHR5cGVvZiBmbiAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY29uc29sZS5lcnJvcignZm9yRWFjaCBlcnJvcjogSXRlcmF0b3IgbXVzdCBiZSBhIGZ1bmN0aW9uLicpO1xuICAgICAgY29uc29sZS5lcnJvcignZnVuY3Rpb24nLCBmbik7XG4gICAgfVxuICAgIGlmICghaXNPYmplY3Qob2JqZWN0KSAmJiAhaXNBcnJheShvYmplY3QpKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdmb3JFYWNoIGVycm9yOiBJbnB1dCBvYmplY3QgbXVzdCBiZSBhbiBvYmplY3Qgb3IgYXJyYXkuJyk7XG4gICAgICBjb25zb2xlLmVycm9yKCdvYmplY3QnLCBvYmplY3QpO1xuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqICdmb3JFYWNoQ29weScgZnVuY3Rpb25cbiAqXG4gKiBJdGVyYXRlcyBvdmVyIGFsbCBpdGVtcyBpbiB0aGUgZmlyc3QgbGV2ZWwgb2YgYW4gb2JqZWN0IG9yIGFycmF5XG4gKiBhbmQgY2FsbHMgYW4gaXRlcmF0b3IgZnVuY3Rpb24gb24gZWFjaCBpdGVtLiBSZXR1cm5zIGEgbmV3IG9iamVjdCBvciBhcnJheVxuICogd2l0aCB0aGUgc2FtZSBrZXlzIG9yIGluZGV4ZXMgYXMgdGhlIG9yaWdpbmFsLCBhbmQgdmFsdWVzIHNldCB0byB0aGUgcmVzdWx0c1xuICogb2YgdGhlIGl0ZXJhdG9yIGZ1bmN0aW9uLlxuICpcbiAqIERvZXMgTk9UIHJlY3Vyc2l2ZWx5IGl0ZXJhdGUgb3ZlciBpdGVtcyBpbiBzdWItb2JqZWN0cyBvciBzdWItYXJyYXlzLlxuICpcbiAqIC8vIHtPYmplY3QgfCBBcnJheX0gb2JqZWN0IC0gVGhlIG9iamVjdCBvciBhcnJheSB0byBpdGVyYXRlIG92ZXJcbiAqIC8vIHtmdW5jdGlvbn0gZm4gLSBUaGUgaXRlcmF0b3IgZnVuY2l0b24gdG8gY2FsbCBvbiBlYWNoIGl0ZW1cbiAqIC8vIHtib29sZWFuID0gZmFsc2V9IGVycm9ycyAtIFNob3cgZXJyb3JzP1xuICogLy8ge09iamVjdCB8IEFycmF5fSAtIFRoZSByZXN1bHRpbmcgb2JqZWN0IG9yIGFycmF5XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmb3JFYWNoQ29weShcbiAgb2JqZWN0OiBhbnksIGZuOiAodjogYW55LCBrPzogc3RyaW5nIHwgbnVtYmVyLCBvPzogYW55LCBwPzogc3RyaW5nKSA9PiBhbnksXG4gIGVycm9ycyA9IGZhbHNlXG4pOiBhbnkge1xuICBpZiAoIWhhc1ZhbHVlKG9iamVjdCkpIHsgcmV0dXJuOyB9XG4gIGlmICgoaXNPYmplY3Qob2JqZWN0KSB8fCBpc0FycmF5KG9iamVjdCkpICYmIHR5cGVvZiBvYmplY3QgIT09ICdmdW5jdGlvbicpIHtcbiAgICBjb25zdCBuZXdPYmplY3Q6IGFueSA9IGlzQXJyYXkob2JqZWN0KSA/IFtdIDoge307XG4gICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMob2JqZWN0KSkge1xuICAgICAgbmV3T2JqZWN0W2tleV0gPSBmbihvYmplY3Rba2V5XSwga2V5LCBvYmplY3QpO1xuICAgIH1cbiAgICByZXR1cm4gbmV3T2JqZWN0O1xuICB9XG4gIGlmIChlcnJvcnMpIHtcbiAgICBpZiAodHlwZW9mIGZuICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdmb3JFYWNoQ29weSBlcnJvcjogSXRlcmF0b3IgbXVzdCBiZSBhIGZ1bmN0aW9uLicpO1xuICAgICAgY29uc29sZS5lcnJvcignZnVuY3Rpb24nLCBmbik7XG4gICAgfVxuICAgIGlmICghaXNPYmplY3Qob2JqZWN0KSAmJiAhaXNBcnJheShvYmplY3QpKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdmb3JFYWNoQ29weSBlcnJvcjogSW5wdXQgb2JqZWN0IG11c3QgYmUgYW4gb2JqZWN0IG9yIGFycmF5LicpO1xuICAgICAgY29uc29sZS5lcnJvcignb2JqZWN0Jywgb2JqZWN0KTtcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiAnaGFzT3duJyB1dGlsaXR5IGZ1bmN0aW9uXG4gKlxuICogQ2hlY2tzIHdoZXRoZXIgYW4gb2JqZWN0IG9yIGFycmF5IGhhcyBhIHBhcnRpY3VsYXIgcHJvcGVydHkuXG4gKlxuICogLy8ge2FueX0gb2JqZWN0IC0gdGhlIG9iamVjdCB0byBjaGVja1xuICogLy8ge3N0cmluZ30gcHJvcGVydHkgLSB0aGUgcHJvcGVydHkgdG8gbG9vayBmb3JcbiAqIC8vIHtib29sZWFufSAtIHRydWUgaWYgb2JqZWN0IGhhcyBwcm9wZXJ0eSwgZmFsc2UgaWYgbm90XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBoYXNPd24ob2JqZWN0OiBhbnksIHByb3BlcnR5OiBzdHJpbmcpOiBib29sZWFuIHtcbiAgaWYgKCFvYmplY3QgfHwgIVsnbnVtYmVyJywgJ3N0cmluZycsICdzeW1ib2wnXS5pbmNsdWRlcyh0eXBlb2YgcHJvcGVydHkpIHx8XG4gICAgKCFpc09iamVjdChvYmplY3QpICYmICFpc0FycmF5KG9iamVjdCkgJiYgIWlzTWFwKG9iamVjdCkgJiYgIWlzU2V0KG9iamVjdCkpXG4gICkgeyByZXR1cm4gZmFsc2U7IH1cbiAgaWYgKGlzTWFwKG9iamVjdCkgfHwgaXNTZXQob2JqZWN0KSkgeyByZXR1cm4gb2JqZWN0Lmhhcyhwcm9wZXJ0eSk7IH1cbiAgaWYgKHR5cGVvZiBwcm9wZXJ0eSA9PT0gJ251bWJlcicpIHtcbiAgICBpZiAoaXNBcnJheShvYmplY3QpKSB7IHJldHVybiBvYmplY3RbPG51bWJlcj5wcm9wZXJ0eV07IH1cbiAgICBwcm9wZXJ0eSA9IHByb3BlcnR5ICsgJyc7XG4gIH1cbiAgcmV0dXJuIG9iamVjdC5oYXNPd25Qcm9wZXJ0eShwcm9wZXJ0eSk7XG59XG5cbi8qKlxuICogJ21lcmdlRmlsdGVyZWRPYmplY3QnIHV0aWxpdHkgZnVuY3Rpb25cbiAqXG4gKiBTaGFsbG93bHkgbWVyZ2VzIHR3byBvYmplY3RzLCBzZXR0aW5nIGtleSBhbmQgdmFsdWVzIGZyb20gc291cmNlIG9iamVjdFxuICogaW4gdGFyZ2V0IG9iamVjdCwgZXhjbHVkaW5nIHNwZWNpZmllZCBrZXlzLlxuICpcbiAqIE9wdGlvbmFsbHksIGl0IGNhbiBhbHNvIHVzZSBmdW5jdGlvbnMgdG8gdHJhbnNmb3JtIHRoZSBrZXkgbmFtZXMgYW5kL29yXG4gKiB0aGUgdmFsdWVzIG9mIHRoZSBtZXJnaW5nIG9iamVjdC5cbiAqXG4gKiAvLyB7UGxhaW5PYmplY3R9IHRhcmdldE9iamVjdCAtIFRhcmdldCBvYmplY3QgdG8gYWRkIGtleXMgYW5kIHZhbHVlcyB0b1xuICogLy8ge1BsYWluT2JqZWN0fSBzb3VyY2VPYmplY3QgLSBTb3VyY2Ugb2JqZWN0IHRvIGNvcHkga2V5cyBhbmQgdmFsdWVzIGZyb21cbiAqIC8vIHtzdHJpbmdbXX0gZXhjbHVkZUtleXMgLSBBcnJheSBvZiBrZXlzIHRvIGV4Y2x1ZGVcbiAqIC8vIHsoc3RyaW5nOiBzdHJpbmcpID0+IHN0cmluZyA9IChrKSA9PiBrfSBrZXlGbiAtIEZ1bmN0aW9uIHRvIGFwcGx5IHRvIGtleXNcbiAqIC8vIHsoYW55OiBhbnkpID0+IGFueSA9ICh2KSA9PiB2fSB2YWx1ZUZuIC0gRnVuY3Rpb24gdG8gYXBwbHkgdG8gdmFsdWVzXG4gKiAvLyB7UGxhaW5PYmplY3R9IC0gUmV0dXJucyB0YXJnZXRPYmplY3RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1lcmdlRmlsdGVyZWRPYmplY3QoXG4gIHRhcmdldE9iamVjdDogUGxhaW5PYmplY3QsXG4gIHNvdXJjZU9iamVjdDogUGxhaW5PYmplY3QsXG4gIGV4Y2x1ZGVLZXlzID0gPHN0cmluZ1tdPltdLFxuICBrZXlGbiA9IChrZXk6IHN0cmluZyk6IHN0cmluZyA9PiBrZXksXG4gIHZhbEZuID0gKHZhbDogYW55KTogYW55ID0+IHZhbFxuKTogUGxhaW5PYmplY3Qge1xuICBpZiAoIWlzT2JqZWN0KHNvdXJjZU9iamVjdCkpIHsgcmV0dXJuIHRhcmdldE9iamVjdDsgfVxuICBpZiAoIWlzT2JqZWN0KHRhcmdldE9iamVjdCkpIHsgdGFyZ2V0T2JqZWN0ID0ge307IH1cbiAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMoc291cmNlT2JqZWN0KSkge1xuICAgIGlmICghaW5BcnJheShrZXksIGV4Y2x1ZGVLZXlzKSAmJiBpc0RlZmluZWQoc291cmNlT2JqZWN0W2tleV0pKSB7XG4gICAgICB0YXJnZXRPYmplY3Rba2V5Rm4oa2V5KV0gPSB2YWxGbihzb3VyY2VPYmplY3Rba2V5XSk7XG4gICAgfVxuICB9XG4gIHJldHVybiB0YXJnZXRPYmplY3Q7XG59XG5cbi8qKlxuICogJ3VuaXF1ZUl0ZW1zJyBmdW5jdGlvblxuICpcbiAqIEFjY2VwdHMgYW55IG51bWJlciBvZiBzdHJpbmcgdmFsdWUgaW5wdXRzLFxuICogYW5kIHJldHVybnMgYW4gYXJyYXkgb2YgYWxsIGlucHV0IHZhdWVzLCBleGNsdWRpbmcgZHVwbGljYXRlcy5cbiAqXG4gKiAvLyB7Li4uc3RyaW5nfSAuLi5pdGVtcyAtXG4gKiAvLyB7c3RyaW5nW119IC1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHVuaXF1ZUl0ZW1zKC4uLml0ZW1zKTogc3RyaW5nW10ge1xuICBjb25zdCByZXR1cm5JdGVtcyA9IFtdO1xuICBmb3IgKGNvbnN0IGl0ZW0gb2YgaXRlbXMpIHtcbiAgICBpZiAoIXJldHVybkl0ZW1zLmluY2x1ZGVzKGl0ZW0pKSB7IHJldHVybkl0ZW1zLnB1c2goaXRlbSk7IH1cbiAgfVxuICByZXR1cm4gcmV0dXJuSXRlbXM7XG59XG5cbi8qKlxuICogJ2NvbW1vbkl0ZW1zJyBmdW5jdGlvblxuICpcbiAqIEFjY2VwdHMgYW55IG51bWJlciBvZiBzdHJpbmdzIG9yIGFycmF5cyBvZiBzdHJpbmcgdmFsdWVzLFxuICogYW5kIHJldHVybnMgYSBzaW5nbGUgYXJyYXkgY29udGFpbmluZyBvbmx5IHZhbHVlcyBwcmVzZW50IGluIGFsbCBpbnB1dHMuXG4gKlxuICogLy8gey4uLnN0cmluZ3xzdHJpbmdbXX0gLi4uYXJyYXlzIC1cbiAqIC8vIHtzdHJpbmdbXX0gLVxuICovXG5leHBvcnQgZnVuY3Rpb24gY29tbW9uSXRlbXMoLi4uYXJyYXlzKTogc3RyaW5nW10ge1xuICBsZXQgcmV0dXJuSXRlbXMgPSBudWxsO1xuICBmb3IgKGxldCBhcnJheSBvZiBhcnJheXMpIHtcbiAgICBpZiAoaXNTdHJpbmcoYXJyYXkpKSB7IGFycmF5ID0gW2FycmF5XTsgfVxuICAgIHJldHVybkl0ZW1zID0gcmV0dXJuSXRlbXMgPT09IG51bGwgPyBbIC4uLmFycmF5IF0gOlxuICAgICAgcmV0dXJuSXRlbXMuZmlsdGVyKGl0ZW0gPT4gYXJyYXkuaW5jbHVkZXMoaXRlbSkpO1xuICAgIGlmICghcmV0dXJuSXRlbXMubGVuZ3RoKSB7IHJldHVybiBbXTsgfVxuICB9XG4gIHJldHVybiByZXR1cm5JdGVtcztcbn1cblxuLyoqXG4gKiAnZml4VGl0bGUnIGZ1bmN0aW9uXG4gKlxuICpcbiAqIC8vIHtzdHJpbmd9IGlucHV0IC1cbiAqIC8vIHtzdHJpbmd9IC1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZpeFRpdGxlKG5hbWU6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiBuYW1lICYmIHRvVGl0bGVDYXNlKG5hbWUucmVwbGFjZSgvKFthLXpdKShbQS1aXSkvZywgJyQxICQyJykucmVwbGFjZSgvXy9nLCAnICcpKTtcbn1cblxuLyoqXG4gKiAndG9UaXRsZUNhc2UnIGZ1bmN0aW9uXG4gKlxuICogSW50ZWxsaWdlbnRseSBjb252ZXJ0cyBhbiBpbnB1dCBzdHJpbmcgdG8gVGl0bGUgQ2FzZS5cbiAqXG4gKiBBY2NlcHRzIGFuIG9wdGlvbmFsIHNlY29uZCBwYXJhbWV0ZXIgd2l0aCBhIGxpc3Qgb2YgYWRkaXRpb25hbFxuICogd29yZHMgYW5kIGFiYnJldmlhdGlvbnMgdG8gZm9yY2UgaW50byBhIHBhcnRpY3VsYXIgY2FzZS5cbiAqXG4gKiBUaGlzIGZ1bmN0aW9uIGlzIGJ1aWx0IG9uIHByaW9yIHdvcmsgYnkgSm9obiBHcnViZXIgYW5kIERhdmlkIEdvdWNoOlxuICogaHR0cDovL2RhcmluZ2ZpcmViYWxsLm5ldC8yMDA4LzA4L3RpdGxlX2Nhc2VfdXBkYXRlXG4gKiBodHRwczovL2dpdGh1Yi5jb20vZ291Y2gvdG8tdGl0bGUtY2FzZVxuICpcbiAqIC8vIHtzdHJpbmd9IGlucHV0IC1cbiAqIC8vIHtzdHJpbmd8c3RyaW5nW119IGZvcmNlV29yZHM/IC1cbiAqIC8vIHtzdHJpbmd9IC1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRvVGl0bGVDYXNlKGlucHV0OiBzdHJpbmcsIGZvcmNlV29yZHM/OiBzdHJpbmd8c3RyaW5nW10pOiBzdHJpbmcge1xuICBpZiAoIWlzU3RyaW5nKGlucHV0KSkgeyByZXR1cm4gaW5wdXQ7IH1cbiAgbGV0IGZvcmNlQXJyYXk6IHN0cmluZ1tdID0gWydhJywgJ2FuJywgJ2FuZCcsICdhcycsICdhdCcsICdidXQnLCAnYnknLCAnZW4nLFxuICAgJ2ZvcicsICdpZicsICdpbicsICdub3InLCAnb2YnLCAnb24nLCAnb3InLCAncGVyJywgJ3RoZScsICd0bycsICd2JywgJ3YuJyxcbiAgICd2cycsICd2cy4nLCAndmlhJ107XG4gIGlmIChpc1N0cmluZyhmb3JjZVdvcmRzKSkgeyBmb3JjZVdvcmRzID0gKDxzdHJpbmc+Zm9yY2VXb3Jkcykuc3BsaXQoJ3wnKTsgfVxuICBpZiAoaXNBcnJheShmb3JjZVdvcmRzKSkgeyBmb3JjZUFycmF5ID0gZm9yY2VBcnJheS5jb25jYXQoZm9yY2VXb3Jkcyk7IH1cbiAgY29uc3QgZm9yY2VBcnJheUxvd2VyOiBzdHJpbmdbXSA9IGZvcmNlQXJyYXkubWFwKHcgPT4gdy50b0xvd2VyQ2FzZSgpKTtcbiAgY29uc3Qgbm9Jbml0aWFsQ2FzZTogYm9vbGVhbiA9XG4gICAgaW5wdXQgPT09IGlucHV0LnRvVXBwZXJDYXNlKCkgfHwgaW5wdXQgPT09IGlucHV0LnRvTG93ZXJDYXNlKCk7XG4gIGxldCBwcmV2TGFzdENoYXIgPSAnJztcbiAgaW5wdXQgPSBpbnB1dC50cmltKCk7XG4gIHJldHVybiBpbnB1dC5yZXBsYWNlKC9bQS1aYS16MC05XFx1MDBDMC1cXHUwMEZGXStbXlxccy1dKi9nLCAod29yZCwgaWR4KSA9PiB7XG4gICAgaWYgKCFub0luaXRpYWxDYXNlICYmIHdvcmQuc2xpY2UoMSkuc2VhcmNoKC9bQS1aXXxcXC4uLykgIT09IC0xKSB7XG4gICAgICByZXR1cm4gd29yZDtcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IG5ld1dvcmQ6IHN0cmluZztcbiAgICAgIGNvbnN0IGZvcmNlV29yZDogc3RyaW5nID1cbiAgICAgICAgZm9yY2VBcnJheVtmb3JjZUFycmF5TG93ZXIuaW5kZXhPZih3b3JkLnRvTG93ZXJDYXNlKCkpXTtcbiAgICAgIGlmICghZm9yY2VXb3JkKSB7XG4gICAgICAgIGlmIChub0luaXRpYWxDYXNlKSB7XG4gICAgICAgICAgaWYgKHdvcmQuc2xpY2UoMSkuc2VhcmNoKC9cXC4uLykgIT09IC0xKSB7XG4gICAgICAgICAgICBuZXdXb3JkID0gd29yZC50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBuZXdXb3JkID0gd29yZFswXS50b1VwcGVyQ2FzZSgpICsgd29yZC5zbGljZSgxKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBuZXdXb3JkID0gd29yZFswXS50b1VwcGVyQ2FzZSgpICsgd29yZC5zbGljZSgxKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgZm9yY2VXb3JkID09PSBmb3JjZVdvcmQudG9Mb3dlckNhc2UoKSAmJiAoXG4gICAgICAgICAgaWR4ID09PSAwIHx8IGlkeCArIHdvcmQubGVuZ3RoID09PSBpbnB1dC5sZW5ndGggfHxcbiAgICAgICAgICBwcmV2TGFzdENoYXIgPT09ICc6JyB8fCBpbnB1dFtpZHggLSAxXS5zZWFyY2goL1teXFxzLV0vKSAhPT0gLTEgfHxcbiAgICAgICAgICAoaW5wdXRbaWR4IC0gMV0gIT09ICctJyAmJiBpbnB1dFtpZHggKyB3b3JkLmxlbmd0aF0gPT09ICctJylcbiAgICAgICAgKVxuICAgICAgKSB7XG4gICAgICAgIG5ld1dvcmQgPSBmb3JjZVdvcmRbMF0udG9VcHBlckNhc2UoKSArIGZvcmNlV29yZC5zbGljZSgxKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG5ld1dvcmQgPSBmb3JjZVdvcmQ7XG4gICAgICB9XG4gICAgICBwcmV2TGFzdENoYXIgPSB3b3JkLnNsaWNlKC0xKTtcbiAgICAgIHJldHVybiBuZXdXb3JkO1xuICAgIH1cbiAgfSk7XG59XG4iXX0=