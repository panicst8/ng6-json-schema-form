/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import * as _ from 'lodash';
/**
 * 'convertSchemaToDraft6' function
 *
 * Converts a JSON Schema from draft 1 through 4 format to draft 6 format
 *
 * Inspired by on geraintluff's JSON Schema 3 to 4 compatibility function:
 *   https://github.com/geraintluff/json-schema-compatibility
 * Also uses suggestions from AJV's JSON Schema 4 to 6 migration guide:
 *   https://github.com/epoberezkin/ajv/releases/tag/5.0.0
 * And additional details from the official JSON Schema documentation:
 *   http://json-schema.org
 *
 * //  { object } originalSchema - JSON schema (draft 1, 2, 3, 4, or 6)
 * //  { OptionObject = {} } options - options: parent schema changed?, schema draft number?
 * // { object } - JSON schema (draft 6)
 * @record
 */
export function OptionObject() { }
/** @type {?|undefined} */
OptionObject.prototype.changed;
/** @type {?|undefined} */
OptionObject.prototype.draft;
;
/**
 * @param {?} schema
 * @param {?=} options
 * @return {?}
 */
export function convertSchemaToDraft6(schema, options) {
    if (options === void 0) { options = {}; }
    /** @type {?} */
    var draft = options.draft || null;
    /** @type {?} */
    var changed = options.changed || false;
    if (typeof schema !== 'object') {
        return schema;
    }
    if (typeof schema.map === 'function') {
        return tslib_1.__spread(schema.map(function (subSchema) { return convertSchemaToDraft6(subSchema, { changed: changed, draft: draft }); }));
    }
    /** @type {?} */
    var newSchema = tslib_1.__assign({}, schema);
    /** @type {?} */
    var simpleTypes = ['array', 'boolean', 'integer', 'null', 'number', 'object', 'string'];
    if (typeof newSchema.$schema === 'string' &&
        /http\:\/\/json\-schema\.org\/draft\-0\d\/schema\#/.test(newSchema.$schema)) {
        draft = newSchema.$schema[30];
    }
    // Convert v1-v2 'contentEncoding' to 'media.binaryEncoding'
    // Note: This is only used in JSON hyper-schema (not regular JSON schema)
    if (newSchema.contentEncoding) {
        newSchema.media = { binaryEncoding: newSchema.contentEncoding };
        delete newSchema.contentEncoding;
        changed = true;
    }
    // Convert v1-v3 'extends' to 'allOf'
    if (typeof newSchema.extends === 'object') {
        newSchema.allOf = typeof newSchema.extends.map === 'function' ?
            newSchema.extends.map(function (subSchema) { return convertSchemaToDraft6(subSchema, { changed: changed, draft: draft }); }) :
            [convertSchemaToDraft6(newSchema.extends, { changed: changed, draft: draft })];
        delete newSchema.extends;
        changed = true;
    }
    // Convert v1-v3 'disallow' to 'not'
    if (newSchema.disallow) {
        if (typeof newSchema.disallow === 'string') {
            newSchema.not = { type: newSchema.disallow };
        }
        else if (typeof newSchema.disallow.map === 'function') {
            newSchema.not = {
                anyOf: newSchema.disallow
                    .map(function (type) { return typeof type === 'object' ? type : { type: type }; })
            };
        }
        delete newSchema.disallow;
        changed = true;
    }
    // Convert v3 string 'dependencies' properties to arrays
    if (typeof newSchema.dependencies === 'object' &&
        Object.keys(newSchema.dependencies)
            .some(function (key) { return typeof newSchema.dependencies[key] === 'string'; })) {
        newSchema.dependencies = tslib_1.__assign({}, newSchema.dependencies);
        Object.keys(newSchema.dependencies)
            .filter(function (key) { return typeof newSchema.dependencies[key] === 'string'; })
            .forEach(function (key) { return newSchema.dependencies[key] = [newSchema.dependencies[key]]; });
        changed = true;
    }
    // Convert v1 'maxDecimal' to 'multipleOf'
    if (typeof newSchema.maxDecimal === 'number') {
        newSchema.multipleOf = 1 / Math.pow(10, newSchema.maxDecimal);
        delete newSchema.divisibleBy;
        changed = true;
        if (!draft || draft === 2) {
            draft = 1;
        }
    }
    // Convert v2-v3 'divisibleBy' to 'multipleOf'
    if (typeof newSchema.divisibleBy === 'number') {
        newSchema.multipleOf = newSchema.divisibleBy;
        delete newSchema.divisibleBy;
        changed = true;
    }
    // Convert v1-v2 boolean 'minimumCanEqual' to 'exclusiveMinimum'
    if (typeof newSchema.minimum === 'number' && newSchema.minimumCanEqual === false) {
        newSchema.exclusiveMinimum = newSchema.minimum;
        delete newSchema.minimum;
        changed = true;
        if (!draft) {
            draft = 2;
        }
    }
    else if (typeof newSchema.minimumCanEqual === 'boolean') {
        delete newSchema.minimumCanEqual;
        changed = true;
        if (!draft) {
            draft = 2;
        }
    }
    // Convert v3-v4 boolean 'exclusiveMinimum' to numeric
    if (typeof newSchema.minimum === 'number' && newSchema.exclusiveMinimum === true) {
        newSchema.exclusiveMinimum = newSchema.minimum;
        delete newSchema.minimum;
        changed = true;
    }
    else if (typeof newSchema.exclusiveMinimum === 'boolean') {
        delete newSchema.exclusiveMinimum;
        changed = true;
    }
    // Convert v1-v2 boolean 'maximumCanEqual' to 'exclusiveMaximum'
    if (typeof newSchema.maximum === 'number' && newSchema.maximumCanEqual === false) {
        newSchema.exclusiveMaximum = newSchema.maximum;
        delete newSchema.maximum;
        changed = true;
        if (!draft) {
            draft = 2;
        }
    }
    else if (typeof newSchema.maximumCanEqual === 'boolean') {
        delete newSchema.maximumCanEqual;
        changed = true;
        if (!draft) {
            draft = 2;
        }
    }
    // Convert v3-v4 boolean 'exclusiveMaximum' to numeric
    if (typeof newSchema.maximum === 'number' && newSchema.exclusiveMaximum === true) {
        newSchema.exclusiveMaximum = newSchema.maximum;
        delete newSchema.maximum;
        changed = true;
    }
    else if (typeof newSchema.exclusiveMaximum === 'boolean') {
        delete newSchema.exclusiveMaximum;
        changed = true;
    }
    // Search object 'properties' for 'optional', 'required', and 'requires' items,
    // and convert them into object 'required' arrays and 'dependencies' objects
    if (typeof newSchema.properties === 'object') {
        /** @type {?} */
        var properties_1 = tslib_1.__assign({}, newSchema.properties);
        /** @type {?} */
        var requiredKeys_1 = Array.isArray(newSchema.required) ?
            new Set(newSchema.required) : new Set();
        // Convert v1-v2 boolean 'optional' properties to 'required' array
        if (draft === 1 || draft === 2 ||
            Object.keys(properties_1).some(function (key) { return properties_1[key].optional === true; })) {
            Object.keys(properties_1)
                .filter(function (key) { return properties_1[key].optional !== true; })
                .forEach(function (key) { return requiredKeys_1.add(key); });
            changed = true;
            if (!draft) {
                draft = 2;
            }
        }
        // Convert v3 boolean 'required' properties to 'required' array
        if (Object.keys(properties_1).some(function (key) { return properties_1[key].required === true; })) {
            Object.keys(properties_1)
                .filter(function (key) { return properties_1[key].required === true; })
                .forEach(function (key) { return requiredKeys_1.add(key); });
            changed = true;
        }
        if (requiredKeys_1.size) {
            newSchema.required = Array.from(requiredKeys_1);
        }
        // Convert v1-v2 array or string 'requires' properties to 'dependencies' object
        if (Object.keys(properties_1).some(function (key) { return properties_1[key].requires; })) {
            /** @type {?} */
            var dependencies_1 = typeof newSchema.dependencies === 'object' ? tslib_1.__assign({}, newSchema.dependencies) : {};
            Object.keys(properties_1)
                .filter(function (key) { return properties_1[key].requires; })
                .forEach(function (key) { return dependencies_1[key] =
                typeof properties_1[key].requires === 'string' ?
                    [properties_1[key].requires] : properties_1[key].requires; });
            newSchema.dependencies = dependencies_1;
            changed = true;
            if (!draft) {
                draft = 2;
            }
        }
        newSchema.properties = properties_1;
    }
    // Revove v1-v2 boolean 'optional' key
    if (typeof newSchema.optional === 'boolean') {
        delete newSchema.optional;
        changed = true;
        if (!draft) {
            draft = 2;
        }
    }
    // Revove v1-v2 'requires' key
    if (newSchema.requires) {
        delete newSchema.requires;
    }
    // Revove v3 boolean 'required' key
    if (typeof newSchema.required === 'boolean') {
        delete newSchema.required;
    }
    // Convert id to $id
    if (typeof newSchema.id === 'string' && !newSchema.$id) {
        if (newSchema.id.slice(-1) === '#') {
            newSchema.id = newSchema.id.slice(0, -1);
        }
        newSchema.$id = newSchema.id + '-CONVERTED-TO-DRAFT-06#';
        delete newSchema.id;
        changed = true;
    }
    // Check if v1-v3 'any' or object types will be converted
    if (newSchema.type && (typeof newSchema.type.every === 'function' ?
        !newSchema.type.every(function (type) { return simpleTypes.includes(type); }) :
        !simpleTypes.includes(newSchema.type))) {
        changed = true;
    }
    // If schema changed, update or remove $schema identifier
    if (typeof newSchema.$schema === 'string' &&
        /http\:\/\/json\-schema\.org\/draft\-0[1-4]\/schema\#/.test(newSchema.$schema)) {
        newSchema.$schema = 'http://json-schema.org/draft-06/schema#';
        changed = true;
    }
    else if (changed && typeof newSchema.$schema === 'string') {
        /** @type {?} */
        var addToDescription = 'Converted to draft 6 from ' + newSchema.$schema;
        if (typeof newSchema.description === 'string' && newSchema.description.length) {
            newSchema.description += '\n' + addToDescription;
        }
        else {
            newSchema.description = addToDescription;
        }
        delete newSchema.$schema;
    }
    // Convert v1-v3 'any' and object types
    if (newSchema.type && (typeof newSchema.type.every === 'function' ?
        !newSchema.type.every(function (type) { return simpleTypes.includes(type); }) :
        !simpleTypes.includes(newSchema.type))) {
        if (newSchema.type.length === 1) {
            newSchema.type = newSchema.type[0];
        }
        if (typeof newSchema.type === 'string') {
            // Convert string 'any' type to array of all standard types
            if (newSchema.type === 'any') {
                newSchema.type = simpleTypes;
                // Delete non-standard string type
            }
            else {
                delete newSchema.type;
            }
        }
        else if (typeof newSchema.type === 'object') {
            if (typeof newSchema.type.every === 'function') {
                // If array of strings, only allow standard types
                if (newSchema.type.every(function (type) { return typeof type === 'string'; })) {
                    newSchema.type = newSchema.type.some(function (type) { return type === 'any'; }) ?
                        newSchema.type = simpleTypes :
                        newSchema.type.filter(function (type) { return simpleTypes.includes(type); });
                    // If type is an array with objects, convert the current schema to an 'anyOf' array
                }
                else if (newSchema.type.length > 1) {
                    /** @type {?} */
                    var arrayKeys = ['additionalItems', 'items', 'maxItems', 'minItems', 'uniqueItems', 'contains'];
                    /** @type {?} */
                    var numberKeys = ['multipleOf', 'maximum', 'exclusiveMaximum', 'minimum', 'exclusiveMinimum'];
                    /** @type {?} */
                    var objectKeys = ['maxProperties', 'minProperties', 'required', 'additionalProperties',
                        'properties', 'patternProperties', 'dependencies', 'propertyNames'];
                    /** @type {?} */
                    var stringKeys = ['maxLength', 'minLength', 'pattern', 'format'];
                    /** @type {?} */
                    var filterKeys_1 = {
                        'array': tslib_1.__spread(numberKeys, objectKeys, stringKeys),
                        'integer': tslib_1.__spread(arrayKeys, objectKeys, stringKeys),
                        'number': tslib_1.__spread(arrayKeys, objectKeys, stringKeys),
                        'object': tslib_1.__spread(arrayKeys, numberKeys, stringKeys),
                        'string': tslib_1.__spread(arrayKeys, numberKeys, objectKeys),
                        'all': tslib_1.__spread(arrayKeys, numberKeys, objectKeys, stringKeys),
                    };
                    /** @type {?} */
                    var anyOf = [];
                    var _loop_1 = function (type) {
                        /** @type {?} */
                        var newType = typeof type === 'string' ? { type: type } : tslib_1.__assign({}, type);
                        Object.keys(newSchema)
                            .filter(function (key) { return !newType.hasOwnProperty(key) &&
                            !tslib_1.__spread((filterKeys_1[newType.type] || filterKeys_1.all), ['type', 'default']).includes(key); })
                            .forEach(function (key) { return newType[key] = newSchema[key]; });
                        anyOf.push(newType);
                    };
                    try {
                        for (var _a = tslib_1.__values(newSchema.type), _b = _a.next(); !_b.done; _b = _a.next()) {
                            var type = _b.value;
                            _loop_1(type);
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                    newSchema = newSchema.hasOwnProperty('default') ?
                        { anyOf: anyOf, default: newSchema.default } : { anyOf: anyOf };
                    // If type is an object, merge it with the current schema
                }
                else {
                    /** @type {?} */
                    var typeSchema = newSchema.type;
                    delete newSchema.type;
                    Object.assign(newSchema, typeSchema);
                }
            }
        }
        else {
            delete newSchema.type;
        }
    }
    // Convert sub schemas
    Object.keys(newSchema)
        .filter(function (key) { return typeof newSchema[key] === 'object'; })
        .forEach(function (key) {
        if (['definitions', 'dependencies', 'properties', 'patternProperties']
            .includes(key) && typeof newSchema[key].map !== 'function') {
            /** @type {?} */
            var newKey_1 = {};
            Object.keys(newSchema[key]).forEach(function (subKey) { return newKey_1[subKey] =
                convertSchemaToDraft6(newSchema[key][subKey], { changed: changed, draft: draft }); });
            newSchema[key] = newKey_1;
        }
        else if (['items', 'additionalItems', 'additionalProperties',
            'allOf', 'anyOf', 'oneOf', 'not'].includes(key)) {
            newSchema[key] = convertSchemaToDraft6(newSchema[key], { changed: changed, draft: draft });
        }
        else {
            newSchema[key] = _.cloneDeep(newSchema[key]);
        }
    });
    return newSchema;
    var e_1, _c;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udmVydC1zY2hlbWEtdG8tZHJhZnQ2LmZ1bmN0aW9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmc2LWpzb24tc2NoZW1hLWZvcm0vIiwic291cmNlcyI6WyJsaWIvc2hhcmVkL2NvbnZlcnQtc2NoZW1hLXRvLWRyYWZ0Ni5mdW5jdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sS0FBSyxDQUFDLE1BQU0sUUFBUSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWtCdUMsQ0FBQzs7Ozs7O0FBQ3BFLE1BQU0sZ0NBQWdDLE1BQU0sRUFBRSxPQUEwQjtJQUExQix3QkFBQSxFQUFBLFlBQTBCOztJQUN0RSxJQUFJLEtBQUssR0FBVyxPQUFPLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQzs7SUFDMUMsSUFBSSxPQUFPLEdBQVksT0FBTyxDQUFDLE9BQU8sSUFBSSxLQUFLLENBQUM7SUFFaEQsRUFBRSxDQUFDLENBQUMsT0FBTyxNQUFNLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztRQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7S0FBRTtJQUNsRCxFQUFFLENBQUMsQ0FBQyxPQUFPLE1BQU0sQ0FBQyxHQUFHLEtBQUssVUFBVSxDQUFDLENBQUMsQ0FBQztRQUNyQyxNQUFNLGtCQUFNLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBQSxTQUFTLElBQUksT0FBQSxxQkFBcUIsQ0FBQyxTQUFTLEVBQUUsRUFBRSxPQUFPLFNBQUEsRUFBRSxLQUFLLE9BQUEsRUFBRSxDQUFDLEVBQXBELENBQW9ELENBQUMsRUFBRztLQUM3Rjs7SUFDRCxJQUFJLFNBQVMsd0JBQVEsTUFBTSxFQUFHOztJQUM5QixJQUFNLFdBQVcsR0FBRyxDQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBRTFGLEVBQUUsQ0FBQyxDQUFDLE9BQU8sU0FBUyxDQUFDLE9BQU8s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LEVBQUUsT0FBTyxTQUFBLEVBQUUsS0FBSyxPQUFBLEVBQUUsQ0FBQyxDQUFDO1NBQzVFO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixTQUFTLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztTQUM5QztLQUNGLENBQUMsQ0FBQztJQUVMLE1BQU0sQ0FBQyxTQUFTLENBQUM7O0NBQ2xCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuXG4vKipcbiAqICdjb252ZXJ0U2NoZW1hVG9EcmFmdDYnIGZ1bmN0aW9uXG4gKlxuICogQ29udmVydHMgYSBKU09OIFNjaGVtYSBmcm9tIGRyYWZ0IDEgdGhyb3VnaCA0IGZvcm1hdCB0byBkcmFmdCA2IGZvcm1hdFxuICpcbiAqIEluc3BpcmVkIGJ5IG9uIGdlcmFpbnRsdWZmJ3MgSlNPTiBTY2hlbWEgMyB0byA0IGNvbXBhdGliaWxpdHkgZnVuY3Rpb246XG4gKiAgIGh0dHBzOi8vZ2l0aHViLmNvbS9nZXJhaW50bHVmZi9qc29uLXNjaGVtYS1jb21wYXRpYmlsaXR5XG4gKiBBbHNvIHVzZXMgc3VnZ2VzdGlvbnMgZnJvbSBBSlYncyBKU09OIFNjaGVtYSA0IHRvIDYgbWlncmF0aW9uIGd1aWRlOlxuICogICBodHRwczovL2dpdGh1Yi5jb20vZXBvYmVyZXpraW4vYWp2L3JlbGVhc2VzL3RhZy81LjAuMFxuICogQW5kIGFkZGl0aW9uYWwgZGV0YWlscyBmcm9tIHRoZSBvZmZpY2lhbCBKU09OIFNjaGVtYSBkb2N1bWVudGF0aW9uOlxuICogICBodHRwOi8vanNvbi1zY2hlbWEub3JnXG4gKlxuICogLy8gIHsgb2JqZWN0IH0gb3JpZ2luYWxTY2hlbWEgLSBKU09OIHNjaGVtYSAoZHJhZnQgMSwgMiwgMywgNCwgb3IgNilcbiAqIC8vICB7IE9wdGlvbk9iamVjdCA9IHt9IH0gb3B0aW9ucyAtIG9wdGlvbnM6IHBhcmVudCBzY2hlbWEgY2hhbmdlZD8sIHNjaGVtYSBkcmFmdCBudW1iZXI/XG4gKiAvLyB7IG9iamVjdCB9IC0gSlNPTiBzY2hlbWEgKGRyYWZ0IDYpXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgT3B0aW9uT2JqZWN0IHsgY2hhbmdlZD86IGJvb2xlYW4sIGRyYWZ0PzogbnVtYmVyIH07XG5leHBvcnQgZnVuY3Rpb24gY29udmVydFNjaGVtYVRvRHJhZnQ2KHNjaGVtYSwgb3B0aW9uczogT3B0aW9uT2JqZWN0ID0ge30pIHtcbiAgbGV0IGRyYWZ0OiBudW1iZXIgPSBvcHRpb25zLmRyYWZ0IHx8IG51bGw7XG4gIGxldCBjaGFuZ2VkOiBib29sZWFuID0gb3B0aW9ucy5jaGFuZ2VkIHx8IGZhbHNlO1xuXG4gIGlmICh0eXBlb2Ygc2NoZW1hICE9PSAnb2JqZWN0JykgeyByZXR1cm4gc2NoZW1hOyB9XG4gIGlmICh0eXBlb2Ygc2NoZW1hLm1hcCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBbIC4uLnNjaGVtYS5tYXAoc3ViU2NoZW1hID0+IGNvbnZlcnRTY2hlbWFUb0RyYWZ0NihzdWJTY2hlbWEsIHsgY2hhbmdlZCwgZHJhZnQgfSkpIF07XG4gIH1cbiAgbGV0IG5ld1NjaGVtYSA9IHsgLi4uc2NoZW1hIH07XG4gIGNvbnN0IHNpbXBsZVR5cGVzID0gWydhcnJheScsICdib29sZWFuJywgJ2ludGVnZXInLCAnbnVsbCcsICdudW1iZXInLCAnb2JqZWN0JywgJ3N0cmluZyddO1xuXG4gIGlmICh0eXBlb2YgbmV3U2NoZW1hLiRzY2hlbWEgPT09ICdzdHJpbmcnICYmXG4gICAgL2h0dHBcXDpcXC9cXC9qc29uXFwtc2NoZW1hXFwub3JnXFwvZHJhZnRcXC0wXFxkXFwvc2NoZW1hXFwjLy50ZXN0KG5ld1NjaGVtYS4kc2NoZW1hKVxuICApIHtcbiAgICBkcmFmdCA9IG5ld1NjaGVtYS4kc2NoZW1hWzMwXTtcbiAgfVxuXG4gIC8vIENvbnZlcnQgdjEtdjIgJ2NvbnRlbnRFbmNvZGluZycgdG8gJ21lZGlhLmJpbmFyeUVuY29kaW5nJ1xuICAvLyBOb3RlOiBUaGlzIGlzIG9ubHkgdXNlZCBpbiBKU09OIGh5cGVyLXNjaGVtYSAobm90IHJlZ3VsYXIgSlNPTiBzY2hlbWEpXG4gIGlmIChuZXdTY2hlbWEuY29udGVudEVuY29kaW5nKSB7XG4gICAgbmV3U2NoZW1hLm1lZGlhID0geyBiaW5hcnlFbmNvZGluZzogbmV3U2NoZW1hLmNvbnRlbnRFbmNvZGluZyB9O1xuICAgIGRlbGV0ZSBuZXdTY2hlbWEuY29udGVudEVuY29kaW5nO1xuICAgIGNoYW5nZWQgPSB0cnVlO1xuICB9XG5cbiAgLy8gQ29udmVydCB2MS12MyAnZXh0ZW5kcycgdG8gJ2FsbE9mJ1xuICBpZiAodHlwZW9mIG5ld1NjaGVtYS5leHRlbmRzID09PSAnb2JqZWN0Jykge1xuICAgIG5ld1NjaGVtYS5hbGxPZiA9IHR5cGVvZiBuZXdTY2hlbWEuZXh0ZW5kcy5tYXAgPT09ICdmdW5jdGlvbicgP1xuICAgICAgbmV3U2NoZW1hLmV4dGVuZHMubWFwKHN1YlNjaGVtYSA9PiBjb252ZXJ0U2NoZW1hVG9EcmFmdDYoc3ViU2NoZW1hLCB7IGNoYW5nZWQsIGRyYWZ0IH0pKSA6XG4gICAgICBbIGNvbnZlcnRTY2hlbWFUb0RyYWZ0NihuZXdTY2hlbWEuZXh0ZW5kcywgeyBjaGFuZ2VkLCBkcmFmdCB9KSBdO1xuICAgIGRlbGV0ZSBuZXdTY2hlbWEuZXh0ZW5kcztcbiAgICBjaGFuZ2VkID0gdHJ1ZTtcbiAgfVxuXG4gIC8vIENvbnZlcnQgdjEtdjMgJ2Rpc2FsbG93JyB0byAnbm90J1xuICBpZiAobmV3U2NoZW1hLmRpc2FsbG93KSB7XG4gICAgaWYgKHR5cGVvZiBuZXdTY2hlbWEuZGlzYWxsb3cgPT09ICdzdHJpbmcnKSB7XG4gICAgICBuZXdTY2hlbWEubm90ID0geyB0eXBlOiBuZXdTY2hlbWEuZGlzYWxsb3cgfTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBuZXdTY2hlbWEuZGlzYWxsb3cubWFwID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBuZXdTY2hlbWEubm90ID0ge1xuICAgICAgICBhbnlPZjogbmV3U2NoZW1hLmRpc2FsbG93XG4gICAgICAgICAgLm1hcCh0eXBlID0+IHR5cGVvZiB0eXBlID09PSAnb2JqZWN0JyA/IHR5cGUgOiB7IHR5cGUgfSlcbiAgICAgIH07XG4gICAgfVxuICAgIGRlbGV0ZSBuZXdTY2hlbWEuZGlzYWxsb3c7XG4gICAgY2hhbmdlZCA9IHRydWU7XG4gIH1cblxuICAvLyBDb252ZXJ0IHYzIHN0cmluZyAnZGVwZW5kZW5jaWVzJyBwcm9wZXJ0aWVzIHRvIGFycmF5c1xuICBpZiAodHlwZW9mIG5ld1NjaGVtYS5kZXBlbmRlbmNpZXMgPT09ICdvYmplY3QnICYmXG4gICAgT2JqZWN0LmtleXMobmV3U2NoZW1hLmRlcGVuZGVuY2llcylcbiAgICAgIC5zb21lKGtleSA9PiB0eXBlb2YgbmV3U2NoZW1hLmRlcGVuZGVuY2llc1trZXldID09PSAnc3RyaW5nJylcbiAgKSB7XG4gICAgbmV3U2NoZW1hLmRlcGVuZGVuY2llcyA9IHsgLi4ubmV3U2NoZW1hLmRlcGVuZGVuY2llcyB9O1xuICAgIE9iamVjdC5rZXlzKG5ld1NjaGVtYS5kZXBlbmRlbmNpZXMpXG4gICAgICAuZmlsdGVyKGtleSA9PiB0eXBlb2YgbmV3U2NoZW1hLmRlcGVuZGVuY2llc1trZXldID09PSAnc3RyaW5nJylcbiAgICAgIC5mb3JFYWNoKGtleSA9PiBuZXdTY2hlbWEuZGVwZW5kZW5jaWVzW2tleV0gPSBbIG5ld1NjaGVtYS5kZXBlbmRlbmNpZXNba2V5XSBdKTtcbiAgICBjaGFuZ2VkID0gdHJ1ZTtcbiAgfVxuXG4gIC8vIENvbnZlcnQgdjEgJ21heERlY2ltYWwnIHRvICdtdWx0aXBsZU9mJ1xuICBpZiAodHlwZW9mIG5ld1NjaGVtYS5tYXhEZWNpbWFsID09PSAnbnVtYmVyJykge1xuICAgIG5ld1NjaGVtYS5tdWx0aXBsZU9mID0gMSAvIE1hdGgucG93KDEwLCBuZXdTY2hlbWEubWF4RGVjaW1hbCk7XG4gICAgZGVsZXRlIG5ld1NjaGVtYS5kaXZpc2libGVCeTtcbiAgICBjaGFuZ2VkID0gdHJ1ZTtcbiAgICBpZiAoIWRyYWZ0IHx8IGRyYWZ0ID09PSAyKSB7IGRyYWZ0ID0gMTsgfVxuICB9XG5cbiAgLy8gQ29udmVydCB2Mi12MyAnZGl2aXNpYmxlQnknIHRvICdtdWx0aXBsZU9mJ1xuICBpZiAodHlwZW9mIG5ld1NjaGVtYS5kaXZpc2libGVCeSA9PT0gJ251bWJlcicpIHtcbiAgICBuZXdTY2hlbWEubXVsdGlwbGVPZiA9IG5ld1NjaGVtYS5kaXZpc2libGVCeTtcbiAgICBkZWxldGUgbmV3U2NoZW1hLmRpdmlzaWJsZUJ5O1xuICAgIGNoYW5nZWQgPSB0cnVlO1xuICB9XG5cbiAgLy8gQ29udmVydCB2MS12MiBib29sZWFuICdtaW5pbXVtQ2FuRXF1YWwnIHRvICdleGNsdXNpdmVNaW5pbXVtJ1xuICBpZiAodHlwZW9mIG5ld1NjaGVtYS5taW5pbXVtID09PSAnbnVtYmVyJyAmJiBuZXdTY2hlbWEubWluaW11bUNhbkVxdWFsID09PSBmYWxzZSkge1xuICAgIG5ld1NjaGVtYS5leGNsdXNpdmVNaW5pbXVtID0gbmV3U2NoZW1hLm1pbmltdW07XG4gICAgZGVsZXRlIG5ld1NjaGVtYS5taW5pbXVtO1xuICAgIGNoYW5nZWQgPSB0cnVlO1xuICAgIGlmICghZHJhZnQpIHsgZHJhZnQgPSAyOyB9XG4gIH0gZWxzZSBpZiAodHlwZW9mIG5ld1NjaGVtYS5taW5pbXVtQ2FuRXF1YWwgPT09ICdib29sZWFuJykge1xuICAgIGRlbGV0ZSBuZXdTY2hlbWEubWluaW11bUNhbkVxdWFsO1xuICAgIGNoYW5nZWQgPSB0cnVlO1xuICAgIGlmICghZHJhZnQpIHsgZHJhZnQgPSAyOyB9XG4gIH1cblxuICAvLyBDb252ZXJ0IHYzLXY0IGJvb2xlYW4gJ2V4Y2x1c2l2ZU1pbmltdW0nIHRvIG51bWVyaWNcbiAgaWYgKHR5cGVvZiBuZXdTY2hlbWEubWluaW11bSA9PT0gJ251bWJlcicgJiYgbmV3U2NoZW1hLmV4Y2x1c2l2ZU1pbmltdW0gPT09IHRydWUpIHtcbiAgICBuZXdTY2hlbWEuZXhjbHVzaXZlTWluaW11bSA9IG5ld1NjaGVtYS5taW5pbXVtO1xuICAgIGRlbGV0ZSBuZXdTY2hlbWEubWluaW11bTtcbiAgICBjaGFuZ2VkID0gdHJ1ZTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgbmV3U2NoZW1hLmV4Y2x1c2l2ZU1pbmltdW0gPT09ICdib29sZWFuJykge1xuICAgIGRlbGV0ZSBuZXdTY2hlbWEuZXhjbHVzaXZlTWluaW11bTtcbiAgICBjaGFuZ2VkID0gdHJ1ZTtcbiAgfVxuXG4gIC8vIENvbnZlcnQgdjEtdjIgYm9vbGVhbiAnbWF4aW11bUNhbkVxdWFsJyB0byAnZXhjbHVzaXZlTWF4aW11bSdcbiAgaWYgKHR5cGVvZiBuZXdTY2hlbWEubWF4aW11bSA9PT0gJ251bWJlcicgJiYgbmV3U2NoZW1hLm1heGltdW1DYW5FcXVhbCA9PT0gZmFsc2UpIHtcbiAgICBuZXdTY2hlbWEuZXhjbHVzaXZlTWF4aW11bSA9IG5ld1NjaGVtYS5tYXhpbXVtO1xuICAgIGRlbGV0ZSBuZXdTY2hlbWEubWF4aW11bTtcbiAgICBjaGFuZ2VkID0gdHJ1ZTtcbiAgICBpZiAoIWRyYWZ0KSB7IGRyYWZ0ID0gMjsgfVxuICB9IGVsc2UgaWYgKHR5cGVvZiBuZXdTY2hlbWEubWF4aW11bUNhbkVxdWFsID09PSAnYm9vbGVhbicpIHtcbiAgICBkZWxldGUgbmV3U2NoZW1hLm1heGltdW1DYW5FcXVhbDtcbiAgICBjaGFuZ2VkID0gdHJ1ZTtcbiAgICBpZiAoIWRyYWZ0KSB7IGRyYWZ0ID0gMjsgfVxuICB9XG5cbiAgLy8gQ29udmVydCB2My12NCBib29sZWFuICdleGNsdXNpdmVNYXhpbXVtJyB0byBudW1lcmljXG4gIGlmICh0eXBlb2YgbmV3U2NoZW1hLm1heGltdW0gPT09ICdudW1iZXInICYmIG5ld1NjaGVtYS5leGNsdXNpdmVNYXhpbXVtID09PSB0cnVlKSB7XG4gICAgbmV3U2NoZW1hLmV4Y2x1c2l2ZU1heGltdW0gPSBuZXdTY2hlbWEubWF4aW11bTtcbiAgICBkZWxldGUgbmV3U2NoZW1hLm1heGltdW07XG4gICAgY2hhbmdlZCA9IHRydWU7XG4gIH0gZWxzZSBpZiAodHlwZW9mIG5ld1NjaGVtYS5leGNsdXNpdmVNYXhpbXVtID09PSAnYm9vbGVhbicpIHtcbiAgICBkZWxldGUgbmV3U2NoZW1hLmV4Y2x1c2l2ZU1heGltdW07XG4gICAgY2hhbmdlZCA9IHRydWU7XG4gIH1cblxuICAvLyBTZWFyY2ggb2JqZWN0ICdwcm9wZXJ0aWVzJyBmb3IgJ29wdGlvbmFsJywgJ3JlcXVpcmVkJywgYW5kICdyZXF1aXJlcycgaXRlbXMsXG4gIC8vIGFuZCBjb252ZXJ0IHRoZW0gaW50byBvYmplY3QgJ3JlcXVpcmVkJyBhcnJheXMgYW5kICdkZXBlbmRlbmNpZXMnIG9iamVjdHNcbiAgaWYgKHR5cGVvZiBuZXdTY2hlbWEucHJvcGVydGllcyA9PT0gJ29iamVjdCcpIHtcbiAgICBjb25zdCBwcm9wZXJ0aWVzID0geyAuLi5uZXdTY2hlbWEucHJvcGVydGllcyB9O1xuICAgIGNvbnN0IHJlcXVpcmVkS2V5cyA9IEFycmF5LmlzQXJyYXkobmV3U2NoZW1hLnJlcXVpcmVkKSA/XG4gICAgICBuZXcgU2V0KG5ld1NjaGVtYS5yZXF1aXJlZCkgOiBuZXcgU2V0KCk7XG5cbiAgICAvLyBDb252ZXJ0IHYxLXYyIGJvb2xlYW4gJ29wdGlvbmFsJyBwcm9wZXJ0aWVzIHRvICdyZXF1aXJlZCcgYXJyYXlcbiAgICBpZiAoZHJhZnQgPT09IDEgfHwgZHJhZnQgPT09IDIgfHxcbiAgICAgIE9iamVjdC5rZXlzKHByb3BlcnRpZXMpLnNvbWUoa2V5ID0+IHByb3BlcnRpZXNba2V5XS5vcHRpb25hbCA9PT0gdHJ1ZSlcbiAgICApIHtcbiAgICAgIE9iamVjdC5rZXlzKHByb3BlcnRpZXMpXG4gICAgICAgIC5maWx0ZXIoa2V5ID0+IHByb3BlcnRpZXNba2V5XS5vcHRpb25hbCAhPT0gdHJ1ZSlcbiAgICAgICAgLmZvckVhY2goa2V5ID0+IHJlcXVpcmVkS2V5cy5hZGQoa2V5KSk7XG4gICAgICBjaGFuZ2VkID0gdHJ1ZTtcbiAgICAgIGlmICghZHJhZnQpIHsgZHJhZnQgPSAyOyB9XG4gICAgfVxuXG4gICAgLy8gQ29udmVydCB2MyBib29sZWFuICdyZXF1aXJlZCcgcHJvcGVydGllcyB0byAncmVxdWlyZWQnIGFycmF5XG4gICAgaWYgKE9iamVjdC5rZXlzKHByb3BlcnRpZXMpLnNvbWUoa2V5ID0+IHByb3BlcnRpZXNba2V5XS5yZXF1aXJlZCA9PT0gdHJ1ZSkpIHtcbiAgICAgIE9iamVjdC5rZXlzKHByb3BlcnRpZXMpXG4gICAgICAgIC5maWx0ZXIoa2V5ID0+IHByb3BlcnRpZXNba2V5XS5yZXF1aXJlZCA9PT0gdHJ1ZSlcbiAgICAgICAgLmZvckVhY2goa2V5ID0+IHJlcXVpcmVkS2V5cy5hZGQoa2V5KSk7XG4gICAgICBjaGFuZ2VkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAocmVxdWlyZWRLZXlzLnNpemUpIHsgbmV3U2NoZW1hLnJlcXVpcmVkID0gQXJyYXkuZnJvbShyZXF1aXJlZEtleXMpOyB9XG5cbiAgICAvLyBDb252ZXJ0IHYxLXYyIGFycmF5IG9yIHN0cmluZyAncmVxdWlyZXMnIHByb3BlcnRpZXMgdG8gJ2RlcGVuZGVuY2llcycgb2JqZWN0XG4gICAgaWYgKE9iamVjdC5rZXlzKHByb3BlcnRpZXMpLnNvbWUoa2V5ID0+IHByb3BlcnRpZXNba2V5XS5yZXF1aXJlcykpIHtcbiAgICAgIGNvbnN0IGRlcGVuZGVuY2llcyA9IHR5cGVvZiBuZXdTY2hlbWEuZGVwZW5kZW5jaWVzID09PSAnb2JqZWN0JyA/XG4gICAgICAgIHsgLi4ubmV3U2NoZW1hLmRlcGVuZGVuY2llcyB9IDoge307XG4gICAgICBPYmplY3Qua2V5cyhwcm9wZXJ0aWVzKVxuICAgICAgICAuZmlsdGVyKGtleSA9PiBwcm9wZXJ0aWVzW2tleV0ucmVxdWlyZXMpXG4gICAgICAgIC5mb3JFYWNoKGtleSA9PiBkZXBlbmRlbmNpZXNba2V5XSA9XG4gICAgICAgICAgdHlwZW9mIHByb3BlcnRpZXNba2V5XS5yZXF1aXJlcyA9PT0gJ3N0cmluZycgP1xuICAgICAgICAgICAgWyBwcm9wZXJ0aWVzW2tleV0ucmVxdWlyZXMgXSA6IHByb3BlcnRpZXNba2V5XS5yZXF1aXJlc1xuICAgICAgICApO1xuICAgICAgbmV3U2NoZW1hLmRlcGVuZGVuY2llcyA9IGRlcGVuZGVuY2llcztcbiAgICAgIGNoYW5nZWQgPSB0cnVlO1xuICAgICAgaWYgKCFkcmFmdCkgeyBkcmFmdCA9IDI7IH1cbiAgICB9XG5cbiAgICBuZXdTY2hlbWEucHJvcGVydGllcyA9IHByb3BlcnRpZXM7XG4gIH1cblxuICAvLyBSZXZvdmUgdjEtdjIgYm9vbGVhbiAnb3B0aW9uYWwnIGtleVxuICBpZiAodHlwZW9mIG5ld1NjaGVtYS5vcHRpb25hbCA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgZGVsZXRlIG5ld1NjaGVtYS5vcHRpb25hbDtcbiAgICBjaGFuZ2VkID0gdHJ1ZTtcbiAgICBpZiAoIWRyYWZ0KSB7IGRyYWZ0ID0gMjsgfVxuICB9XG5cbiAgLy8gUmV2b3ZlIHYxLXYyICdyZXF1aXJlcycga2V5XG4gIGlmIChuZXdTY2hlbWEucmVxdWlyZXMpIHtcbiAgICBkZWxldGUgbmV3U2NoZW1hLnJlcXVpcmVzO1xuICB9XG5cbiAgLy8gUmV2b3ZlIHYzIGJvb2xlYW4gJ3JlcXVpcmVkJyBrZXlcbiAgaWYgKHR5cGVvZiBuZXdTY2hlbWEucmVxdWlyZWQgPT09ICdib29sZWFuJykge1xuICAgIGRlbGV0ZSBuZXdTY2hlbWEucmVxdWlyZWQ7XG4gIH1cblxuICAvLyBDb252ZXJ0IGlkIHRvICRpZFxuICBpZiAodHlwZW9mIG5ld1NjaGVtYS5pZCA9PT0gJ3N0cmluZycgJiYgIW5ld1NjaGVtYS4kaWQpIHtcbiAgICBpZiAobmV3U2NoZW1hLmlkLnNsaWNlKC0xKSA9PT0gJyMnKSB7XG4gICAgICBuZXdTY2hlbWEuaWQgPSBuZXdTY2hlbWEuaWQuc2xpY2UoMCwgLTEpO1xuICAgIH1cbiAgICBuZXdTY2hlbWEuJGlkID0gbmV3U2NoZW1hLmlkICsgJy1DT05WRVJURUQtVE8tRFJBRlQtMDYjJztcbiAgICBkZWxldGUgbmV3U2NoZW1hLmlkO1xuICAgIGNoYW5nZWQgPSB0cnVlO1xuICB9XG5cbiAgLy8gQ2hlY2sgaWYgdjEtdjMgJ2FueScgb3Igb2JqZWN0IHR5cGVzIHdpbGwgYmUgY29udmVydGVkXG4gIGlmIChuZXdTY2hlbWEudHlwZSAmJiAodHlwZW9mIG5ld1NjaGVtYS50eXBlLmV2ZXJ5ID09PSAnZnVuY3Rpb24nID9cbiAgICAhbmV3U2NoZW1hLnR5cGUuZXZlcnkodHlwZSA9PiBzaW1wbGVUeXBlcy5pbmNsdWRlcyh0eXBlKSkgOlxuICAgICFzaW1wbGVUeXBlcy5pbmNsdWRlcyhuZXdTY2hlbWEudHlwZSlcbiAgKSkge1xuICAgIGNoYW5nZWQgPSB0cnVlO1xuICB9XG5cbiAgLy8gSWYgc2NoZW1hIGNoYW5nZWQsIHVwZGF0ZSBvciByZW1vdmUgJHNjaGVtYSBpZGVudGlmaWVyXG4gIGlmICh0eXBlb2YgbmV3U2NoZW1hLiRzY2hlbWEgPT09ICdzdHJpbmcnICYmXG4gICAgL2h0dHBcXDpcXC9cXC9qc29uXFwtc2NoZW1hXFwub3JnXFwvZHJhZnRcXC0wWzEtNF1cXC9zY2hlbWFcXCMvLnRlc3QobmV3U2NoZW1hLiRzY2hlbWEpXG4gICkge1xuICAgIG5ld1NjaGVtYS4kc2NoZW1hID0gJ2h0dHA6Ly9qc29uLXNjaGVtYS5vcmcvZHJhZnQtMDYvc2NoZW1hIyc7XG4gICAgY2hhbmdlZCA9IHRydWU7XG4gIH0gZWxzZSBpZiAoY2hhbmdlZCAmJiB0eXBlb2YgbmV3U2NoZW1hLiRzY2hlbWEgPT09ICdzdHJpbmcnKSB7XG4gICAgY29uc3QgYWRkVG9EZXNjcmlwdGlvbiA9ICdDb252ZXJ0ZWQgdG8gZHJhZnQgNiBmcm9tICcgKyBuZXdTY2hlbWEuJHNjaGVtYTtcbiAgICBpZiAodHlwZW9mIG5ld1NjaGVtYS5kZXNjcmlwdGlvbiA9PT0gJ3N0cmluZycgJiYgbmV3U2NoZW1hLmRlc2NyaXB0aW9uLmxlbmd0aCkge1xuICAgICAgbmV3U2NoZW1hLmRlc2NyaXB0aW9uICs9ICdcXG4nICsgYWRkVG9EZXNjcmlwdGlvbjtcbiAgICB9IGVsc2Uge1xuICAgICAgbmV3U2NoZW1hLmRlc2NyaXB0aW9uID0gYWRkVG9EZXNjcmlwdGlvblxuICAgIH1cbiAgICBkZWxldGUgbmV3U2NoZW1hLiRzY2hlbWE7XG4gIH1cblxuICAvLyBDb252ZXJ0IHYxLXYzICdhbnknIGFuZCBvYmplY3QgdHlwZXNcbiAgaWYgKG5ld1NjaGVtYS50eXBlICYmICh0eXBlb2YgbmV3U2NoZW1hLnR5cGUuZXZlcnkgPT09ICdmdW5jdGlvbicgP1xuICAgICFuZXdTY2hlbWEudHlwZS5ldmVyeSh0eXBlID0+IHNpbXBsZVR5cGVzLmluY2x1ZGVzKHR5cGUpKSA6XG4gICAgIXNpbXBsZVR5cGVzLmluY2x1ZGVzKG5ld1NjaGVtYS50eXBlKVxuICApKSB7XG4gICAgaWYgKG5ld1NjaGVtYS50eXBlLmxlbmd0aCA9PT0gMSkgeyBuZXdTY2hlbWEudHlwZSA9IG5ld1NjaGVtYS50eXBlWzBdOyB9XG4gICAgaWYgKHR5cGVvZiBuZXdTY2hlbWEudHlwZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIC8vIENvbnZlcnQgc3RyaW5nICdhbnknIHR5cGUgdG8gYXJyYXkgb2YgYWxsIHN0YW5kYXJkIHR5cGVzXG4gICAgICBpZiAobmV3U2NoZW1hLnR5cGUgPT09ICdhbnknKSB7XG4gICAgICAgIG5ld1NjaGVtYS50eXBlID0gc2ltcGxlVHlwZXM7XG4gICAgICAvLyBEZWxldGUgbm9uLXN0YW5kYXJkIHN0cmluZyB0eXBlXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkZWxldGUgbmV3U2NoZW1hLnR5cGU7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgbmV3U2NoZW1hLnR5cGUgPT09ICdvYmplY3QnKSB7XG4gICAgICBpZiAodHlwZW9mIG5ld1NjaGVtYS50eXBlLmV2ZXJ5ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIC8vIElmIGFycmF5IG9mIHN0cmluZ3MsIG9ubHkgYWxsb3cgc3RhbmRhcmQgdHlwZXNcbiAgICAgICAgaWYgKG5ld1NjaGVtYS50eXBlLmV2ZXJ5KHR5cGUgPT4gdHlwZW9mIHR5cGUgPT09ICdzdHJpbmcnKSkge1xuICAgICAgICAgIG5ld1NjaGVtYS50eXBlID0gbmV3U2NoZW1hLnR5cGUuc29tZSh0eXBlID0+IHR5cGUgPT09ICdhbnknKSA/XG4gICAgICAgICAgICBuZXdTY2hlbWEudHlwZSA9IHNpbXBsZVR5cGVzIDpcbiAgICAgICAgICAgIG5ld1NjaGVtYS50eXBlLmZpbHRlcih0eXBlID0+IHNpbXBsZVR5cGVzLmluY2x1ZGVzKHR5cGUpKTtcbiAgICAgICAgLy8gSWYgdHlwZSBpcyBhbiBhcnJheSB3aXRoIG9iamVjdHMsIGNvbnZlcnQgdGhlIGN1cnJlbnQgc2NoZW1hIHRvIGFuICdhbnlPZicgYXJyYXlcbiAgICAgICAgfSBlbHNlIGlmIChuZXdTY2hlbWEudHlwZS5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgY29uc3QgYXJyYXlLZXlzID0gWyAnYWRkaXRpb25hbEl0ZW1zJywgJ2l0ZW1zJywgJ21heEl0ZW1zJywgJ21pbkl0ZW1zJywgJ3VuaXF1ZUl0ZW1zJywgJ2NvbnRhaW5zJ107XG4gICAgICAgICAgY29uc3QgbnVtYmVyS2V5cyA9IFsgJ211bHRpcGxlT2YnLCAnbWF4aW11bScsICdleGNsdXNpdmVNYXhpbXVtJywgJ21pbmltdW0nLCAnZXhjbHVzaXZlTWluaW11bSddO1xuICAgICAgICAgIGNvbnN0IG9iamVjdEtleXMgPSBbICdtYXhQcm9wZXJ0aWVzJywgJ21pblByb3BlcnRpZXMnLCAncmVxdWlyZWQnLCAnYWRkaXRpb25hbFByb3BlcnRpZXMnLFxuICAgICAgICAgICAgJ3Byb3BlcnRpZXMnLCAncGF0dGVyblByb3BlcnRpZXMnLCAnZGVwZW5kZW5jaWVzJywgJ3Byb3BlcnR5TmFtZXMnXTtcbiAgICAgICAgICBjb25zdCBzdHJpbmdLZXlzID0gWyAnbWF4TGVuZ3RoJywgJ21pbkxlbmd0aCcsICdwYXR0ZXJuJywgJ2Zvcm1hdCddO1xuICAgICAgICAgIGNvbnN0IGZpbHRlcktleXMgPSB7XG4gICAgICAgICAgICAnYXJyYXknOiAgIFsgLi4ubnVtYmVyS2V5cywgLi4ub2JqZWN0S2V5cywgLi4uc3RyaW5nS2V5cyBdLFxuICAgICAgICAgICAgJ2ludGVnZXInOiBbICAuLi5hcnJheUtleXMsIC4uLm9iamVjdEtleXMsIC4uLnN0cmluZ0tleXMgXSxcbiAgICAgICAgICAgICdudW1iZXInOiAgWyAgLi4uYXJyYXlLZXlzLCAuLi5vYmplY3RLZXlzLCAuLi5zdHJpbmdLZXlzIF0sXG4gICAgICAgICAgICAnb2JqZWN0JzogIFsgIC4uLmFycmF5S2V5cywgLi4ubnVtYmVyS2V5cywgLi4uc3RyaW5nS2V5cyBdLFxuICAgICAgICAgICAgJ3N0cmluZyc6ICBbICAuLi5hcnJheUtleXMsIC4uLm51bWJlcktleXMsIC4uLm9iamVjdEtleXMgXSxcbiAgICAgICAgICAgICdhbGwnOiAgICAgWyAgLi4uYXJyYXlLZXlzLCAuLi5udW1iZXJLZXlzLCAuLi5vYmplY3RLZXlzLCAuLi5zdHJpbmdLZXlzIF0sXG4gICAgICAgICAgfTtcbiAgICAgICAgICBjb25zdCBhbnlPZiA9IFtdO1xuICAgICAgICAgIGZvciAoY29uc3QgdHlwZSBvZiBuZXdTY2hlbWEudHlwZSkge1xuICAgICAgICAgICAgY29uc3QgbmV3VHlwZSA9IHR5cGVvZiB0eXBlID09PSAnc3RyaW5nJyA/IHsgdHlwZSB9IDogeyAuLi50eXBlIH07XG4gICAgICAgICAgICBPYmplY3Qua2V5cyhuZXdTY2hlbWEpXG4gICAgICAgICAgICAgIC5maWx0ZXIoa2V5ID0+ICFuZXdUeXBlLmhhc093blByb3BlcnR5KGtleSkgJiZcbiAgICAgICAgICAgICAgICAhWyAuLi4oZmlsdGVyS2V5c1tuZXdUeXBlLnR5cGVdIHx8IGZpbHRlcktleXMuYWxsKSwgJ3R5cGUnLCAnZGVmYXVsdCcgXVxuICAgICAgICAgICAgICAgICAgLmluY2x1ZGVzKGtleSlcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAuZm9yRWFjaChrZXkgPT4gbmV3VHlwZVtrZXldID0gbmV3U2NoZW1hW2tleV0pO1xuICAgICAgICAgICAgYW55T2YucHVzaChuZXdUeXBlKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgbmV3U2NoZW1hID0gbmV3U2NoZW1hLmhhc093blByb3BlcnR5KCdkZWZhdWx0JykgP1xuICAgICAgICAgICAgeyBhbnlPZiwgZGVmYXVsdDogbmV3U2NoZW1hLmRlZmF1bHQgfSA6IHsgYW55T2YgfTtcbiAgICAgICAgLy8gSWYgdHlwZSBpcyBhbiBvYmplY3QsIG1lcmdlIGl0IHdpdGggdGhlIGN1cnJlbnQgc2NoZW1hXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc3QgdHlwZVNjaGVtYSA9IG5ld1NjaGVtYS50eXBlO1xuICAgICAgICAgIGRlbGV0ZSBuZXdTY2hlbWEudHlwZTtcbiAgICAgICAgICBPYmplY3QuYXNzaWduKG5ld1NjaGVtYSwgdHlwZVNjaGVtYSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZGVsZXRlIG5ld1NjaGVtYS50eXBlO1xuICAgIH1cbiAgfVxuXG4gIC8vIENvbnZlcnQgc3ViIHNjaGVtYXNcbiAgT2JqZWN0LmtleXMobmV3U2NoZW1hKVxuICAgIC5maWx0ZXIoa2V5ID0+IHR5cGVvZiBuZXdTY2hlbWFba2V5XSA9PT0gJ29iamVjdCcpXG4gICAgLmZvckVhY2goa2V5ID0+IHtcbiAgICAgIGlmIChcbiAgICAgICAgWyAnZGVmaW5pdGlvbnMnLCAnZGVwZW5kZW5jaWVzJywgJ3Byb3BlcnRpZXMnLCAncGF0dGVyblByb3BlcnRpZXMnIF1cbiAgICAgICAgICAuaW5jbHVkZXMoa2V5KSAmJiB0eXBlb2YgbmV3U2NoZW1hW2tleV0ubWFwICE9PSAnZnVuY3Rpb24nXG4gICAgICApIHtcbiAgICAgICAgY29uc3QgbmV3S2V5ID0ge307XG4gICAgICAgIE9iamVjdC5rZXlzKG5ld1NjaGVtYVtrZXldKS5mb3JFYWNoKHN1YktleSA9PiBuZXdLZXlbc3ViS2V5XSA9XG4gICAgICAgICAgY29udmVydFNjaGVtYVRvRHJhZnQ2KG5ld1NjaGVtYVtrZXldW3N1YktleV0sIHsgY2hhbmdlZCwgZHJhZnQgfSlcbiAgICAgICAgKTtcbiAgICAgICAgbmV3U2NoZW1hW2tleV0gPSBuZXdLZXk7XG4gICAgICB9IGVsc2UgaWYgKFxuICAgICAgICBbICdpdGVtcycsICdhZGRpdGlvbmFsSXRlbXMnLCAnYWRkaXRpb25hbFByb3BlcnRpZXMnLFxuICAgICAgICAgICdhbGxPZicsICdhbnlPZicsICdvbmVPZicsICdub3QnIF0uaW5jbHVkZXMoa2V5KVxuICAgICAgKSB7XG4gICAgICAgIG5ld1NjaGVtYVtrZXldID0gY29udmVydFNjaGVtYVRvRHJhZnQ2KG5ld1NjaGVtYVtrZXldLCB7IGNoYW5nZWQsIGRyYWZ0IH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbmV3U2NoZW1hW2tleV0gPSBfLmNsb25lRGVlcChuZXdTY2hlbWFba2V5XSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgcmV0dXJuIG5ld1NjaGVtYTtcbn1cbiJdfQ==