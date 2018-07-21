/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
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
    const badType = i => !isSet(i) && !isArray(i) && !isString(i);
    if (badType(newClasses)) {
        return oldClasses;
    }
    if (badType(oldClasses)) {
        oldClasses = '';
    }
    /** @type {?} */
    const toSet = i => isSet(i) ? i : isArray(i) ? new Set(i) : new Set(i.split(' '));
    /** @type {?} */
    const combinedSet = toSet(oldClasses);
    /** @type {?} */
    const newSet = toSet(newClasses);
    newSet.forEach(c => combinedSet.add(c));
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
export function copy(object, errors = false) {
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
        return [...object];
    }
    if (isObject(object)) {
        return Object.assign({}, object);
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
export function forEach(object, fn, recurse = false, rootObject = object, errors = false) {
    if (isEmpty(object)) {
        return;
    }
    if ((isObject(object) || isArray(object)) && typeof fn === 'function') {
        for (const key of Object.keys(object)) {
            /** @type {?} */
            const value = object[key];
            if (recurse === 'bottom-up' && (isObject(value) || isArray(value))) {
                forEach(value, fn, recurse, rootObject);
            }
            fn(value, key, object, rootObject);
            if (recurse === 'top-down' && (isObject(value) || isArray(value))) {
                forEach(value, fn, recurse, rootObject);
            }
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
export function forEachCopy(object, fn, errors = false) {
    if (!hasValue(object)) {
        return;
    }
    if ((isObject(object) || isArray(object)) && typeof object !== 'function') {
        /** @type {?} */
        const newObject = isArray(object) ? [] : {};
        for (const key of Object.keys(object)) {
            newObject[key] = fn(object[key], key, object);
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
export function mergeFilteredObject(targetObject, sourceObject, excludeKeys = /** @type {?} */ ([]), keyFn = (key) => key, valFn = (val) => val) {
    if (!isObject(sourceObject)) {
        return targetObject;
    }
    if (!isObject(targetObject)) {
        targetObject = {};
    }
    for (const key of Object.keys(sourceObject)) {
        if (!inArray(key, excludeKeys) && isDefined(sourceObject[key])) {
            targetObject[keyFn(key)] = valFn(sourceObject[key]);
        }
    }
    return targetObject;
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
export function uniqueItems(...items) {
    /** @type {?} */
    const returnItems = [];
    for (const item of items) {
        if (!returnItems.includes(item)) {
            returnItems.push(item);
        }
    }
    return returnItems;
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
export function commonItems(...arrays) {
    /** @type {?} */
    let returnItems = null;
    for (let array of arrays) {
        if (isString(array)) {
            array = [array];
        }
        returnItems = returnItems === null ? [...array] :
            returnItems.filter(item => array.includes(item));
        if (!returnItems.length) {
            return [];
        }
    }
    return returnItems;
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
    let forceArray = ['a', 'an', 'and', 'as', 'at', 'but', 'by', 'en',
        'for', 'if', 'in', 'nor', 'of', 'on', 'or', 'per', 'the', 'to', 'v', 'v.',
        'vs', 'vs.', 'via'];
    if (isString(forceWords)) {
        forceWords = (/** @type {?} */ (forceWords)).split('|');
    }
    if (isArray(forceWords)) {
        forceArray = forceArray.concat(forceWords);
    }
    /** @type {?} */
    const forceArrayLower = forceArray.map(w => w.toLowerCase());
    /** @type {?} */
    const noInitialCase = input === input.toUpperCase() || input === input.toLowerCase();
    /** @type {?} */
    let prevLastChar = '';
    input = input.trim();
    return input.replace(/[A-Za-z0-9\u00C0-\u00FF]+[^\s-]*/g, (word, idx) => {
        if (!noInitialCase && word.slice(1).search(/[A-Z]|\../) !== -1) {
            return word;
        }
        else {
            /** @type {?} */
            let newWord;
            /** @type {?} */
            const forceWord = forceArray[forceArrayLower.indexOf(word.toLowerCase())];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbGl0eS5mdW5jdGlvbnMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZzYtanNvbi1zY2hlbWEtZm9ybS8iLCJzb3VyY2VzIjpbImxpYi9zaGFyZWQvdXRpbGl0eS5mdW5jdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxRQUFRLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUN0RSxRQUFRLEVBQ1QsTUFBTSx1QkFBdUIsQ0FBQzs7Ozs7Ozs7Ozs7OztBQWtCL0IsTUFBTSxxQkFDSixVQUEyQyxFQUMzQyxVQUEyQzs7SUFFM0MsTUFBTSxPQUFPLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM5RCxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQztLQUFFO0lBQy9DLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO0tBQUU7O0lBQzdDLE1BQU0sS0FBSyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzs7SUFDbEYsTUFBTSxXQUFXLEdBQWEsS0FBSyxDQUFDLFVBQVUsQ0FB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YXksIGlzRGVmaW5lZCwgaXNPYmplY3QsIGlzRW1wdHksIGlzTWFwLCBpc1NldCxcbiAgaXNTdHJpbmcsIFBsYWluT2JqZWN0XG59IGZyb20gJy4vdmFsaWRhdG9yLmZ1bmN0aW9ucyc7XG5cbi8qKlxuICogVXRpbGl0eSBmdW5jdGlvbiBsaWJyYXJ5OlxuICpcbiAqIGFkZENsYXNzZXMsIGNvcHksIGZvckVhY2gsIGZvckVhY2hDb3B5LCBoYXNPd24sIG1lcmdlRmlsdGVyZWRPYmplY3QsXG4gKiB1bmlxdWVJdGVtcywgY29tbW9uSXRlbXMsIGZpeFRpdGxlLCB0b1RpdGxlQ2FzZVxuKi9cblxuLyoqXG4gKiAnYWRkQ2xhc3NlcycgZnVuY3Rpb25cbiAqXG4gKiBNZXJnZXMgdHdvIHNwYWNlLWRlbGltaXRlZCBsaXN0cyBvZiBDU1MgY2xhc3NlcyBhbmQgcmVtb3ZlcyBkdXBsaWNhdGVzLlxuICpcbiAqIC8vIHtzdHJpbmcgfCBzdHJpbmdbXSB8IFNldDxzdHJpbmc+fSBvbGRDbGFzc2VzXG4gKiAvLyB7c3RyaW5nIHwgc3RyaW5nW10gfCBTZXQ8c3RyaW5nPn0gbmV3Q2xhc3Nlc1xuICogLy8ge3N0cmluZyB8IHN0cmluZ1tdIHwgU2V0PHN0cmluZz59IC0gQ29tYmluZWQgY2xhc3Nlc1xuICovXG5leHBvcnQgZnVuY3Rpb24gYWRkQ2xhc3NlcyhcbiAgb2xkQ2xhc3Nlczogc3RyaW5nIHwgc3RyaW5nW10gfCBTZXQ8c3RyaW5nPixcbiAgbmV3Q2xhc3Nlczogc3RyaW5nIHwgc3RyaW5nW10gfCBTZXQ8c3RyaW5nPlxuKTogc3RyaW5nIHwgc3RyaW5nW10gfCBTZXQ8c3RyaW5nPiB7XG4gIGNvbnN0IGJhZFR5cGUgPSBpID0+ICFpc1NldChpKSAmJiAhaXNBcnJheShpKSAmJiAhaXNTdHJpbmcoaSk7XG4gIGlmIChiYWRUeXBlKG5ld0NsYXNzZXMpKSB7IHJldHVybiBvbGRDbGFzc2VzOyB9XG4gIGlmIChiYWRUeXBlKG9sZENsYXNzZXMpKSB7IG9sZENsYXNzZXMgPSAnJzsgfVxuICBjb25zdCB0b1NldCA9IGkgPT4gaXNTZXQoaSkgPyBpIDogaXNBcnJheShpKSA/IG5ldyBTZXQoaSkgOiBuZXcgU2V0KGkuc3BsaXQoJyAnKSk7XG4gIGNvbnN0IGNvbWJpbmVkU2V0OiBTZXQ8YW55PiA9IHRvU2V0KG9sZENsYXNzZXMpO1xuICBjb25zdCBuZXdTZXQ6IFNldDxhbnk+ID0gdG9TZXQobmV3Q2xhc3Nlcyk7XG4gIG5ld1NldC5mb3JFYWNoKGMgPT4gY29tYmluZWRTZXQuYWRkKGMpKTtcbiAgaWYgKGlzU2V0KG9sZENsYXNzZXMpKSB7IHJldHVybiBjb21iaW5lZFNldDsgfVxuICBpZiAoaXNBcnJheShvbGRDbGFzc2VzKSkgeyByZXR1cm4gQXJyYXkuZnJvbShjb21iaW5lZFNldCk7IH1cbiAgcmV0dXJuIEFycmF5LmZyb20oY29tYmluZWRTZXQpLmpvaW4oJyAnKTtcbn1cblxuLyoqXG4gKiAnY29weScgZnVuY3Rpb25cbiAqXG4gKiBNYWtlcyBhIHNoYWxsb3cgY29weSBvZiBhIEphdmFTY3JpcHQgb2JqZWN0LCBhcnJheSwgTWFwLCBvciBTZXQuXG4gKiBJZiBwYXNzZWQgYSBKYXZhU2NyaXB0IHByaW1pdGl2ZSB2YWx1ZSAoc3RyaW5nLCBudW1iZXIsIGJvb2xlYW4sIG9yIG51bGwpLFxuICogaXQgcmV0dXJucyB0aGUgdmFsdWUuXG4gKlxuICogLy8ge09iamVjdHxBcnJheXxzdHJpbmd8bnVtYmVyfGJvb2xlYW58bnVsbH0gb2JqZWN0IC0gVGhlIG9iamVjdCB0byBjb3B5XG4gKiAvLyB7Ym9vbGVhbiA9IGZhbHNlfSBlcnJvcnMgLSBTaG93IGVycm9ycz9cbiAqIC8vIHtPYmplY3R8QXJyYXl8c3RyaW5nfG51bWJlcnxib29sZWFufG51bGx9IC0gVGhlIGNvcGllZCBvYmplY3RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvcHkob2JqZWN0OiBhbnksIGVycm9ycyA9IGZhbHNlKTogYW55IHtcbiAgaWYgKHR5cGVvZiBvYmplY3QgIT09ICdvYmplY3QnIHx8IG9iamVjdCA9PT0gbnVsbCkgeyByZXR1cm4gb2JqZWN0OyB9XG4gIGlmIChpc01hcChvYmplY3QpKSAgICB7IHJldHVybiBuZXcgTWFwKG9iamVjdCk7IH1cbiAgaWYgKGlzU2V0KG9iamVjdCkpICAgIHsgcmV0dXJuIG5ldyBTZXQob2JqZWN0KTsgfVxuICBpZiAoaXNBcnJheShvYmplY3QpKSAgeyByZXR1cm4gWyAuLi5vYmplY3QgXTsgICB9XG4gIGlmIChpc09iamVjdChvYmplY3QpKSB7IHJldHVybiB7IC4uLm9iamVjdCB9OyAgIH1cbiAgaWYgKGVycm9ycykge1xuICAgIGNvbnNvbGUuZXJyb3IoJ2NvcHkgZXJyb3I6IE9iamVjdCB0byBjb3B5IG11c3QgYmUgYSBKYXZhU2NyaXB0IG9iamVjdCBvciB2YWx1ZS4nKTtcbiAgfVxuICByZXR1cm4gb2JqZWN0O1xufVxuXG4vKipcbiAqICdmb3JFYWNoJyBmdW5jdGlvblxuICpcbiAqIEl0ZXJhdGVzIG92ZXIgYWxsIGl0ZW1zIGluIHRoZSBmaXJzdCBsZXZlbCBvZiBhbiBvYmplY3Qgb3IgYXJyYXlcbiAqIGFuZCBjYWxscyBhbiBpdGVyYXRvciBmdW5jaXRvbiBvbiBlYWNoIGl0ZW0uXG4gKlxuICogVGhlIGl0ZXJhdG9yIGZ1bmN0aW9uIGlzIGNhbGxlZCB3aXRoIGZvdXIgdmFsdWVzOlxuICogMS4gVGhlIGN1cnJlbnQgaXRlbSdzIHZhbHVlXG4gKiAyLiBUaGUgY3VycmVudCBpdGVtJ3Mga2V5XG4gKiAzLiBUaGUgcGFyZW50IG9iamVjdCwgd2hpY2ggY29udGFpbnMgdGhlIGN1cnJlbnQgaXRlbVxuICogNC4gVGhlIHJvb3Qgb2JqZWN0XG4gKlxuICogU2V0dGluZyB0aGUgb3B0aW9uYWwgdGhpcmQgcGFyYW1ldGVyIHRvICd0b3AtZG93bicgb3IgJ2JvdHRvbS11cCcgd2lsbCBjYXVzZVxuICogaXQgdG8gYWxzbyByZWN1cnNpdmVseSBpdGVyYXRlIG92ZXIgaXRlbXMgaW4gc3ViLW9iamVjdHMgb3Igc3ViLWFycmF5cyBpbiB0aGVcbiAqIHNwZWNpZmllZCBkaXJlY3Rpb24uXG4gKlxuICogLy8ge09iamVjdHxBcnJheX0gb2JqZWN0IC0gVGhlIG9iamVjdCBvciBhcnJheSB0byBpdGVyYXRlIG92ZXJcbiAqIC8vIHtmdW5jdGlvbn0gZm4gLSB0aGUgaXRlcmF0b3IgZnVuY2l0b24gdG8gY2FsbCBvbiBlYWNoIGl0ZW1cbiAqIC8vIHtib29sZWFuID0gZmFsc2V9IGVycm9ycyAtIFNob3cgZXJyb3JzP1xuICogLy8ge3ZvaWR9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmb3JFYWNoKFxuICBvYmplY3Q6IGFueSwgZm46ICh2OiBhbnksIGs/OiBzdHJpbmcgfCBudW1iZXIsIGM/OiBhbnksIHJjPzogYW55KSA9PiBhbnksXG4gIHJlY3Vyc2U6IGJvb2xlYW4gfCBzdHJpbmcgPSBmYWxzZSwgcm9vdE9iamVjdDogYW55ID0gb2JqZWN0LCBlcnJvcnMgPSBmYWxzZVxuKTogdm9pZCB7XG4gIGlmIChpc0VtcHR5KG9iamVjdCkpIHsgcmV0dXJuOyB9XG4gIGlmICgoaXNPYmplY3Qob2JqZWN0KSB8fCBpc0FycmF5KG9iamVjdCkpICYmIHR5cGVvZiBmbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKG9iamVjdCkpIHtcbiAgICAgIGNvbnN0IHZhbHVlID0gb2JqZWN0W2tleV07XG4gICAgICBpZiAocmVjdXJzZSA9PT0gJ2JvdHRvbS11cCcgJiYgKGlzT2JqZWN0KHZhbHVlKSB8fCBpc0FycmF5KHZhbHVlKSkpIHtcbiAgICAgICAgZm9yRWFjaCh2YWx1ZSwgZm4sIHJlY3Vyc2UsIHJvb3RPYmplY3QpO1xuICAgICAgfVxuICAgICAgZm4odmFsdWUsIGtleSwgb2JqZWN0LCByb290T2JqZWN0KTtcbiAgICAgIGlmIChyZWN1cnNlID09PSAndG9wLWRvd24nICYmIChpc09iamVjdCh2YWx1ZSkgfHwgaXNBcnJheSh2YWx1ZSkpKSB7XG4gICAgICAgIGZvckVhY2godmFsdWUsIGZuLCByZWN1cnNlLCByb290T2JqZWN0KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgaWYgKGVycm9ycykge1xuICAgIGlmICh0eXBlb2YgZm4gIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ2ZvckVhY2ggZXJyb3I6IEl0ZXJhdG9yIG11c3QgYmUgYSBmdW5jdGlvbi4nKTtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ2Z1bmN0aW9uJywgZm4pO1xuICAgIH1cbiAgICBpZiAoIWlzT2JqZWN0KG9iamVjdCkgJiYgIWlzQXJyYXkob2JqZWN0KSkge1xuICAgICAgY29uc29sZS5lcnJvcignZm9yRWFjaCBlcnJvcjogSW5wdXQgb2JqZWN0IG11c3QgYmUgYW4gb2JqZWN0IG9yIGFycmF5LicpO1xuICAgICAgY29uc29sZS5lcnJvcignb2JqZWN0Jywgb2JqZWN0KTtcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiAnZm9yRWFjaENvcHknIGZ1bmN0aW9uXG4gKlxuICogSXRlcmF0ZXMgb3ZlciBhbGwgaXRlbXMgaW4gdGhlIGZpcnN0IGxldmVsIG9mIGFuIG9iamVjdCBvciBhcnJheVxuICogYW5kIGNhbGxzIGFuIGl0ZXJhdG9yIGZ1bmN0aW9uIG9uIGVhY2ggaXRlbS4gUmV0dXJucyBhIG5ldyBvYmplY3Qgb3IgYXJyYXlcbiAqIHdpdGggdGhlIHNhbWUga2V5cyBvciBpbmRleGVzIGFzIHRoZSBvcmlnaW5hbCwgYW5kIHZhbHVlcyBzZXQgdG8gdGhlIHJlc3VsdHNcbiAqIG9mIHRoZSBpdGVyYXRvciBmdW5jdGlvbi5cbiAqXG4gKiBEb2VzIE5PVCByZWN1cnNpdmVseSBpdGVyYXRlIG92ZXIgaXRlbXMgaW4gc3ViLW9iamVjdHMgb3Igc3ViLWFycmF5cy5cbiAqXG4gKiAvLyB7T2JqZWN0IHwgQXJyYXl9IG9iamVjdCAtIFRoZSBvYmplY3Qgb3IgYXJyYXkgdG8gaXRlcmF0ZSBvdmVyXG4gKiAvLyB7ZnVuY3Rpb259IGZuIC0gVGhlIGl0ZXJhdG9yIGZ1bmNpdG9uIHRvIGNhbGwgb24gZWFjaCBpdGVtXG4gKiAvLyB7Ym9vbGVhbiA9IGZhbHNlfSBlcnJvcnMgLSBTaG93IGVycm9ycz9cbiAqIC8vIHtPYmplY3QgfCBBcnJheX0gLSBUaGUgcmVzdWx0aW5nIG9iamVjdCBvciBhcnJheVxuICovXG5leHBvcnQgZnVuY3Rpb24gZm9yRWFjaENvcHkoXG4gIG9iamVjdDogYW55LCBmbjogKHY6IGFueSwgaz86IHN0cmluZyB8IG51bWJlciwgbz86IGFueSwgcD86IHN0cmluZykgPT4gYW55LFxuICBlcnJvcnMgPSBmYWxzZVxuKTogYW55IHtcbiAgaWYgKCFoYXNWYWx1ZShvYmplY3QpKSB7IHJldHVybjsgfVxuICBpZiAoKGlzT2JqZWN0KG9iamVjdCkgfHwgaXNBcnJheShvYmplY3QpKSAmJiB0eXBlb2Ygb2JqZWN0ICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgY29uc3QgbmV3T2JqZWN0OiBhbnkgPSBpc0FycmF5KG9iamVjdCkgPyBbXSA6IHt9O1xuICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKG9iamVjdCkpIHtcbiAgICAgIG5ld09iamVjdFtrZXldID0gZm4ob2JqZWN0W2tleV0sIGtleSwgb2JqZWN0KTtcbiAgICB9XG4gICAgcmV0dXJuIG5ld09iamVjdDtcbiAgfVxuICBpZiAoZXJyb3JzKSB7XG4gICAgaWYgKHR5cGVvZiBmbiAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY29uc29sZS5lcnJvcignZm9yRWFjaENvcHkgZXJyb3I6IEl0ZXJhdG9yIG11c3QgYmUgYSBmdW5jdGlvbi4nKTtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ2Z1bmN0aW9uJywgZm4pO1xuICAgIH1cbiAgICBpZiAoIWlzT2JqZWN0KG9iamVjdCkgJiYgIWlzQXJyYXkob2JqZWN0KSkge1xuICAgICAgY29uc29sZS5lcnJvcignZm9yRWFjaENvcHkgZXJyb3I6IElucHV0IG9iamVjdCBtdXN0IGJlIGFuIG9iamVjdCBvciBhcnJheS4nKTtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ29iamVjdCcsIG9iamVjdCk7XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogJ2hhc093bicgdXRpbGl0eSBmdW5jdGlvblxuICpcbiAqIENoZWNrcyB3aGV0aGVyIGFuIG9iamVjdCBvciBhcnJheSBoYXMgYSBwYXJ0aWN1bGFyIHByb3BlcnR5LlxuICpcbiAqIC8vIHthbnl9IG9iamVjdCAtIHRoZSBvYmplY3QgdG8gY2hlY2tcbiAqIC8vIHtzdHJpbmd9IHByb3BlcnR5IC0gdGhlIHByb3BlcnR5IHRvIGxvb2sgZm9yXG4gKiAvLyB7Ym9vbGVhbn0gLSB0cnVlIGlmIG9iamVjdCBoYXMgcHJvcGVydHksIGZhbHNlIGlmIG5vdFxuICovXG5leHBvcnQgZnVuY3Rpb24gaGFzT3duKG9iamVjdDogYW55LCBwcm9wZXJ0eTogc3RyaW5nKTogYm9vbGVhbiB7XG4gIGlmICghb2JqZWN0IHx8ICFbJ251bWJlcicsICdzdHJpbmcnLCAnc3ltYm9sJ10uaW5jbHVkZXModHlwZW9mIHByb3BlcnR5KSB8fFxuICAgICghaXNPYmplY3Qob2JqZWN0KSAmJiAhaXNBcnJheShvYmplY3QpICYmICFpc01hcChvYmplY3QpICYmICFpc1NldChvYmplY3QpKVxuICApIHsgcmV0dXJuIGZhbHNlOyB9XG4gIGlmIChpc01hcChvYmplY3QpIHx8IGlzU2V0KG9iamVjdCkpIHsgcmV0dXJuIG9iamVjdC5oYXMocHJvcGVydHkpOyB9XG4gIGlmICh0eXBlb2YgcHJvcGVydHkgPT09ICdudW1iZXInKSB7XG4gICAgaWYgKGlzQXJyYXkob2JqZWN0KSkgeyByZXR1cm4gb2JqZWN0WzxudW1iZXI+cHJvcGVydHldOyB9XG4gICAgcHJvcGVydHkgPSBwcm9wZXJ0eSArICcnO1xuICB9XG4gIHJldHVybiBvYmplY3QuaGFzT3duUHJvcGVydHkocHJvcGVydHkpO1xufVxuXG4vKipcbiAqICdtZXJnZUZpbHRlcmVkT2JqZWN0JyB1dGlsaXR5IGZ1bmN0aW9uXG4gKlxuICogU2hhbGxvd2x5IG1lcmdlcyB0d28gb2JqZWN0cywgc2V0dGluZyBrZXkgYW5kIHZhbHVlcyBmcm9tIHNvdXJjZSBvYmplY3RcbiAqIGluIHRhcmdldCBvYmplY3QsIGV4Y2x1ZGluZyBzcGVjaWZpZWQga2V5cy5cbiAqXG4gKiBPcHRpb25hbGx5LCBpdCBjYW4gYWxzbyB1c2UgZnVuY3Rpb25zIHRvIHRyYW5zZm9ybSB0aGUga2V5IG5hbWVzIGFuZC9vclxuICogdGhlIHZhbHVlcyBvZiB0aGUgbWVyZ2luZyBvYmplY3QuXG4gKlxuICogLy8ge1BsYWluT2JqZWN0fSB0YXJnZXRPYmplY3QgLSBUYXJnZXQgb2JqZWN0IHRvIGFkZCBrZXlzIGFuZCB2YWx1ZXMgdG9cbiAqIC8vIHtQbGFpbk9iamVjdH0gc291cmNlT2JqZWN0IC0gU291cmNlIG9iamVjdCB0byBjb3B5IGtleXMgYW5kIHZhbHVlcyBmcm9tXG4gKiAvLyB7c3RyaW5nW119IGV4Y2x1ZGVLZXlzIC0gQXJyYXkgb2Yga2V5cyB0byBleGNsdWRlXG4gKiAvLyB7KHN0cmluZzogc3RyaW5nKSA9PiBzdHJpbmcgPSAoaykgPT4ga30ga2V5Rm4gLSBGdW5jdGlvbiB0byBhcHBseSB0byBrZXlzXG4gKiAvLyB7KGFueTogYW55KSA9PiBhbnkgPSAodikgPT4gdn0gdmFsdWVGbiAtIEZ1bmN0aW9uIHRvIGFwcGx5IHRvIHZhbHVlc1xuICogLy8ge1BsYWluT2JqZWN0fSAtIFJldHVybnMgdGFyZ2V0T2JqZWN0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtZXJnZUZpbHRlcmVkT2JqZWN0KFxuICB0YXJnZXRPYmplY3Q6IFBsYWluT2JqZWN0LFxuICBzb3VyY2VPYmplY3Q6IFBsYWluT2JqZWN0LFxuICBleGNsdWRlS2V5cyA9IDxzdHJpbmdbXT5bXSxcbiAga2V5Rm4gPSAoa2V5OiBzdHJpbmcpOiBzdHJpbmcgPT4ga2V5LFxuICB2YWxGbiA9ICh2YWw6IGFueSk6IGFueSA9PiB2YWxcbik6IFBsYWluT2JqZWN0IHtcbiAgaWYgKCFpc09iamVjdChzb3VyY2VPYmplY3QpKSB7IHJldHVybiB0YXJnZXRPYmplY3Q7IH1cbiAgaWYgKCFpc09iamVjdCh0YXJnZXRPYmplY3QpKSB7IHRhcmdldE9iamVjdCA9IHt9OyB9XG4gIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKHNvdXJjZU9iamVjdCkpIHtcbiAgICBpZiAoIWluQXJyYXkoa2V5LCBleGNsdWRlS2V5cykgJiYgaXNEZWZpbmVkKHNvdXJjZU9iamVjdFtrZXldKSkge1xuICAgICAgdGFyZ2V0T2JqZWN0W2tleUZuKGtleSldID0gdmFsRm4oc291cmNlT2JqZWN0W2tleV0pO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdGFyZ2V0T2JqZWN0O1xufVxuXG4vKipcbiAqICd1bmlxdWVJdGVtcycgZnVuY3Rpb25cbiAqXG4gKiBBY2NlcHRzIGFueSBudW1iZXIgb2Ygc3RyaW5nIHZhbHVlIGlucHV0cyxcbiAqIGFuZCByZXR1cm5zIGFuIGFycmF5IG9mIGFsbCBpbnB1dCB2YXVlcywgZXhjbHVkaW5nIGR1cGxpY2F0ZXMuXG4gKlxuICogLy8gey4uLnN0cmluZ30gLi4uaXRlbXMgLVxuICogLy8ge3N0cmluZ1tdfSAtXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB1bmlxdWVJdGVtcyguLi5pdGVtcyk6IHN0cmluZ1tdIHtcbiAgY29uc3QgcmV0dXJuSXRlbXMgPSBbXTtcbiAgZm9yIChjb25zdCBpdGVtIG9mIGl0ZW1zKSB7XG4gICAgaWYgKCFyZXR1cm5JdGVtcy5pbmNsdWRlcyhpdGVtKSkgeyByZXR1cm5JdGVtcy5wdXNoKGl0ZW0pOyB9XG4gIH1cbiAgcmV0dXJuIHJldHVybkl0ZW1zO1xufVxuXG4vKipcbiAqICdjb21tb25JdGVtcycgZnVuY3Rpb25cbiAqXG4gKiBBY2NlcHRzIGFueSBudW1iZXIgb2Ygc3RyaW5ncyBvciBhcnJheXMgb2Ygc3RyaW5nIHZhbHVlcyxcbiAqIGFuZCByZXR1cm5zIGEgc2luZ2xlIGFycmF5IGNvbnRhaW5pbmcgb25seSB2YWx1ZXMgcHJlc2VudCBpbiBhbGwgaW5wdXRzLlxuICpcbiAqIC8vIHsuLi5zdHJpbmd8c3RyaW5nW119IC4uLmFycmF5cyAtXG4gKiAvLyB7c3RyaW5nW119IC1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvbW1vbkl0ZW1zKC4uLmFycmF5cyk6IHN0cmluZ1tdIHtcbiAgbGV0IHJldHVybkl0ZW1zID0gbnVsbDtcbiAgZm9yIChsZXQgYXJyYXkgb2YgYXJyYXlzKSB7XG4gICAgaWYgKGlzU3RyaW5nKGFycmF5KSkgeyBhcnJheSA9IFthcnJheV07IH1cbiAgICByZXR1cm5JdGVtcyA9IHJldHVybkl0ZW1zID09PSBudWxsID8gWyAuLi5hcnJheSBdIDpcbiAgICAgIHJldHVybkl0ZW1zLmZpbHRlcihpdGVtID0+IGFycmF5LmluY2x1ZGVzKGl0ZW0pKTtcbiAgICBpZiAoIXJldHVybkl0ZW1zLmxlbmd0aCkgeyByZXR1cm4gW107IH1cbiAgfVxuICByZXR1cm4gcmV0dXJuSXRlbXM7XG59XG5cbi8qKlxuICogJ2ZpeFRpdGxlJyBmdW5jdGlvblxuICpcbiAqXG4gKiAvLyB7c3RyaW5nfSBpbnB1dCAtXG4gKiAvLyB7c3RyaW5nfSAtXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmaXhUaXRsZShuYW1lOiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gbmFtZSAmJiB0b1RpdGxlQ2FzZShuYW1lLnJlcGxhY2UoLyhbYS16XSkoW0EtWl0pL2csICckMSAkMicpLnJlcGxhY2UoL18vZywgJyAnKSk7XG59XG5cbi8qKlxuICogJ3RvVGl0bGVDYXNlJyBmdW5jdGlvblxuICpcbiAqIEludGVsbGlnZW50bHkgY29udmVydHMgYW4gaW5wdXQgc3RyaW5nIHRvIFRpdGxlIENhc2UuXG4gKlxuICogQWNjZXB0cyBhbiBvcHRpb25hbCBzZWNvbmQgcGFyYW1ldGVyIHdpdGggYSBsaXN0IG9mIGFkZGl0aW9uYWxcbiAqIHdvcmRzIGFuZCBhYmJyZXZpYXRpb25zIHRvIGZvcmNlIGludG8gYSBwYXJ0aWN1bGFyIGNhc2UuXG4gKlxuICogVGhpcyBmdW5jdGlvbiBpcyBidWlsdCBvbiBwcmlvciB3b3JrIGJ5IEpvaG4gR3J1YmVyIGFuZCBEYXZpZCBHb3VjaDpcbiAqIGh0dHA6Ly9kYXJpbmdmaXJlYmFsbC5uZXQvMjAwOC8wOC90aXRsZV9jYXNlX3VwZGF0ZVxuICogaHR0cHM6Ly9naXRodWIuY29tL2dvdWNoL3RvLXRpdGxlLWNhc2VcbiAqXG4gKiAvLyB7c3RyaW5nfSBpbnB1dCAtXG4gKiAvLyB7c3RyaW5nfHN0cmluZ1tdfSBmb3JjZVdvcmRzPyAtXG4gKiAvLyB7c3RyaW5nfSAtXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0b1RpdGxlQ2FzZShpbnB1dDogc3RyaW5nLCBmb3JjZVdvcmRzPzogc3RyaW5nfHN0cmluZ1tdKTogc3RyaW5nIHtcbiAgaWYgKCFpc1N0cmluZyhpbnB1dCkpIHsgcmV0dXJuIGlucHV0OyB9XG4gIGxldCBmb3JjZUFycmF5OiBzdHJpbmdbXSA9IFsnYScsICdhbicsICdhbmQnLCAnYXMnLCAnYXQnLCAnYnV0JywgJ2J5JywgJ2VuJyxcbiAgICdmb3InLCAnaWYnLCAnaW4nLCAnbm9yJywgJ29mJywgJ29uJywgJ29yJywgJ3BlcicsICd0aGUnLCAndG8nLCAndicsICd2LicsXG4gICAndnMnLCAndnMuJywgJ3ZpYSddO1xuICBpZiAoaXNTdHJpbmcoZm9yY2VXb3JkcykpIHsgZm9yY2VXb3JkcyA9ICg8c3RyaW5nPmZvcmNlV29yZHMpLnNwbGl0KCd8Jyk7IH1cbiAgaWYgKGlzQXJyYXkoZm9yY2VXb3JkcykpIHsgZm9yY2VBcnJheSA9IGZvcmNlQXJyYXkuY29uY2F0KGZvcmNlV29yZHMpOyB9XG4gIGNvbnN0IGZvcmNlQXJyYXlMb3dlcjogc3RyaW5nW10gPSBmb3JjZUFycmF5Lm1hcCh3ID0+IHcudG9Mb3dlckNhc2UoKSk7XG4gIGNvbnN0IG5vSW5pdGlhbENhc2U6IGJvb2xlYW4gPVxuICAgIGlucHV0ID09PSBpbnB1dC50b1VwcGVyQ2FzZSgpIHx8IGlucHV0ID09PSBpbnB1dC50b0xvd2VyQ2FzZSgpO1xuICBsZXQgcHJldkxhc3RDaGFyID0gJyc7XG4gIGlucHV0ID0gaW5wdXQudHJpbSgpO1xuICByZXR1cm4gaW5wdXQucmVwbGFjZSgvW0EtWmEtejAtOVxcdTAwQzAtXFx1MDBGRl0rW15cXHMtXSovZywgKHdvcmQsIGlkeCkgPT4ge1xuICAgIGlmICghbm9Jbml0aWFsQ2FzZSAmJiB3b3JkLnNsaWNlKDEpLnNlYXJjaCgvW0EtWl18XFwuLi8pICE9PSAtMSkge1xuICAgICAgcmV0dXJuIHdvcmQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBuZXdXb3JkOiBzdHJpbmc7XG4gICAgICBjb25zdCBmb3JjZVdvcmQ6IHN0cmluZyA9XG4gICAgICAgIGZvcmNlQXJyYXlbZm9yY2VBcnJheUxvd2VyLmluZGV4T2Yod29yZC50b0xvd2VyQ2FzZSgpKV07XG4gICAgICBpZiAoIWZvcmNlV29yZCkge1xuICAgICAgICBpZiAobm9Jbml0aWFsQ2FzZSkge1xuICAgICAgICAgIGlmICh3b3JkLnNsaWNlKDEpLnNlYXJjaCgvXFwuLi8pICE9PSAtMSkge1xuICAgICAgICAgICAgbmV3V29yZCA9IHdvcmQudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbmV3V29yZCA9IHdvcmRbMF0udG9VcHBlckNhc2UoKSArIHdvcmQuc2xpY2UoMSkudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbmV3V29yZCA9IHdvcmRbMF0udG9VcHBlckNhc2UoKSArIHdvcmQuc2xpY2UoMSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgIGZvcmNlV29yZCA9PT0gZm9yY2VXb3JkLnRvTG93ZXJDYXNlKCkgJiYgKFxuICAgICAgICAgIGlkeCA9PT0gMCB8fCBpZHggKyB3b3JkLmxlbmd0aCA9PT0gaW5wdXQubGVuZ3RoIHx8XG4gICAgICAgICAgcHJldkxhc3RDaGFyID09PSAnOicgfHwgaW5wdXRbaWR4IC0gMV0uc2VhcmNoKC9bXlxccy1dLykgIT09IC0xIHx8XG4gICAgICAgICAgKGlucHV0W2lkeCAtIDFdICE9PSAnLScgJiYgaW5wdXRbaWR4ICsgd29yZC5sZW5ndGhdID09PSAnLScpXG4gICAgICAgIClcbiAgICAgICkge1xuICAgICAgICBuZXdXb3JkID0gZm9yY2VXb3JkWzBdLnRvVXBwZXJDYXNlKCkgKyBmb3JjZVdvcmQuc2xpY2UoMSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBuZXdXb3JkID0gZm9yY2VXb3JkO1xuICAgICAgfVxuICAgICAgcHJldkxhc3RDaGFyID0gd29yZC5zbGljZSgtMSk7XG4gICAgICByZXR1cm4gbmV3V29yZDtcbiAgICB9XG4gIH0pO1xufVxuIl19