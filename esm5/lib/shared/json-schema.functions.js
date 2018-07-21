/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import * as _ from 'lodash';
import { getType, hasValue, inArray, isArray, isNumber, isObject, isString } from './validator.functions';
import { forEach, hasOwn, mergeFilteredObject } from './utility.functions';
import { mergeSchemas } from './merge-schemas.function';
import { JsonPointer } from './jsonpointer.functions';
/**
 * 'buildSchemaFromLayout' function
 *
 * TODO: Build a JSON Schema from a JSON Form layout
 *
 * //   layout - The JSON Form layout
 * //  - The new JSON Schema
 * @param {?} layout
 * @return {?}
 */
export function buildSchemaFromLayout(layout) {
    return;
    // let newSchema: any = { };
    // const walkLayout = (layoutItems: any[], callback: Function): any[] => {
    //   let returnArray: any[] = [];
    //   for (let layoutItem of layoutItems) {
    //     const returnItem: any = callback(layoutItem);
    //     if (returnItem) { returnArray = returnArray.concat(callback(layoutItem)); }
    //     if (layoutItem.items) {
    //       returnArray = returnArray.concat(walkLayout(layoutItem.items, callback));
    //     }
    //   }
    //   return returnArray;
    // };
    // walkLayout(layout, layoutItem => {
    //   let itemKey: string;
    //   if (typeof layoutItem === 'string') {
    //     itemKey = layoutItem;
    //   } else if (layoutItem.key) {
    //     itemKey = layoutItem.key;
    //   }
    //   if (!itemKey) { return; }
    //   //
    // });
}
/**
 * 'buildSchemaFromData' function
 *
 * Build a JSON Schema from a data object
 *
 * //   data - The data object
 * //  { boolean = false } requireAllFields - Require all fields?
 * //  { boolean = true } isRoot - is root
 * //  - The new JSON Schema
 * @param {?} data
 * @param {?=} requireAllFields
 * @param {?=} isRoot
 * @return {?}
 */
export function buildSchemaFromData(data, requireAllFields, isRoot) {
    if (requireAllFields === void 0) { requireAllFields = false; }
    if (isRoot === void 0) { isRoot = true; }
    /** @type {?} */
    var newSchema = {};
    /** @type {?} */
    var getFieldType = function (value) {
        /** @type {?} */
        var fieldType = getType(value, 'strict');
        return { integer: 'number', null: 'string' }[fieldType] || fieldType;
    };
    /** @type {?} */
    var buildSubSchema = function (value) {
        return buildSchemaFromData(value, requireAllFields, false);
    };
    if (isRoot) {
        newSchema.$schema = 'http://json-schema.org/draft-06/schema#';
    }
    newSchema.type = getFieldType(data);
    if (newSchema.type === 'object') {
        newSchema.properties = {};
        if (requireAllFields) {
            newSchema.required = [];
        }
        try {
            for (var _a = tslib_1.__values(Object.keys(data)), _b = _a.next(); !_b.done; _b = _a.next()) {
                var key = _b.value;
                newSchema.properties[key] = buildSubSchema(data[key]);
                if (requireAllFields) {
                    newSchema.required.push(key);
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
    else if (newSchema.type === 'array') {
        newSchema.items = data.map(buildSubSchema);
        // If all items are the same type, use an object for items instead of an array
        if ((new Set(data.map(getFieldType))).size === 1) {
            newSchema.items = newSchema.items.reduce(function (a, b) { return (tslib_1.__assign({}, a, b)); }, {});
        }
        if (requireAllFields) {
            newSchema.minItems = 1;
        }
    }
    return newSchema;
    var e_1, _c;
}
/**
 * 'getFromSchema' function
 *
 * Uses a JSON Pointer for a value within a data object to retrieve
 * the schema for that value within schema for the data object.
 *
 * The optional third parameter can also be set to return something else:
 * 'schema' (default): the schema for the value indicated by the data pointer
 * 'parentSchema': the schema for the value's parent object or array
 * 'schemaPointer': a pointer to the value's schema within the object's schema
 * 'parentSchemaPointer': a pointer to the schema for the value's parent object or array
 *
 * //   schema - The schema to get the sub-schema from
 * //  { Pointer } dataPointer - JSON Pointer (string or array)
 * //  { string = 'schema' } returnType - what to return?
 * //  - The located sub-schema
 * @param {?} schema
 * @param {?} dataPointer
 * @param {?=} returnType
 * @return {?}
 */
export function getFromSchema(schema, dataPointer, returnType) {
    if (returnType === void 0) { returnType = 'schema'; }
    /** @type {?} */
    var dataPointerArray = JsonPointer.parse(dataPointer);
    if (dataPointerArray === null) {
        console.error("getFromSchema error: Invalid JSON Pointer: " + dataPointer);
        return null;
    }
    /** @type {?} */
    var subSchema = schema;
    /** @type {?} */
    var schemaPointer = [];
    /** @type {?} */
    var length = dataPointerArray.length;
    if (returnType.slice(0, 6) === 'parent') {
        dataPointerArray.length--;
    }
    for (var i = 0; i < length; ++i) {
        /** @type {?} */
        var parentSchema = subSchema;
        /** @type {?} */
        var key = dataPointerArray[i];
        /** @type {?} */
        var subSchemaFound = false;
        if (typeof subSchema !== 'object') {
            console.error("getFromSchema error: Unable to find \"" + key + "\" key in schema.");
            console.error(schema);
            console.error(dataPointer);
            return null;
        }
        if (subSchema.type === 'array' && (!isNaN(key) || key === '-')) {
            if (hasOwn(subSchema, 'items')) {
                if (isObject(subSchema.items)) {
                    subSchemaFound = true;
                    subSchema = subSchema.items;
                    schemaPointer.push('items');
                }
                else if (isArray(subSchema.items)) {
                    if (!isNaN(key) && subSchema.items.length >= +key) {
                        subSchemaFound = true;
                        subSchema = subSchema.items[+key];
                        schemaPointer.push('items', key);
                    }
                }
            }
            if (!subSchemaFound && isObject(subSchema.additionalItems)) {
                subSchemaFound = true;
                subSchema = subSchema.additionalItems;
                schemaPointer.push('additionalItems');
            }
            else if (subSchema.additionalItems !== false) {
                subSchemaFound = true;
                subSchema = {};
                schemaPointer.push('additionalItems');
            }
        }
        else if (subSchema.type === 'object') {
            if (isObject(subSchema.properties) && hasOwn(subSchema.properties, key)) {
                subSchemaFound = true;
                subSchema = subSchema.properties[key];
                schemaPointer.push('properties', key);
            }
            else if (isObject(subSchema.additionalProperties)) {
                subSchemaFound = true;
                subSchema = subSchema.additionalProperties;
                schemaPointer.push('additionalProperties');
            }
            else if (subSchema.additionalProperties !== false) {
                subSchemaFound = true;
                subSchema = {};
                schemaPointer.push('additionalProperties');
            }
        }
        if (!subSchemaFound) {
            console.error("getFromSchema error: Unable to find \"" + key + "\" item in schema.");
            console.error(schema);
            console.error(dataPointer);
            return;
        }
    }
    return returnType.slice(-7) === 'Pointer' ? schemaPointer : subSchema;
}
/**
 * 'removeRecursiveReferences' function
 *
 * Checks a JSON Pointer against a map of recursive references and returns
 * a JSON Pointer to the shallowest equivalent location in the same object.
 *
 * Using this functions enables an object to be constructed with unlimited
 * recursion, while maintaing a fixed set of metadata, such as field data types.
 * The object can grow as large as it wants, and deeply recursed nodes can
 * just refer to the metadata for their shallow equivalents, instead of having
 * to add additional redundant metadata for each recursively added node.
 *
 * Example:
 *
 * pointer:         '/stuff/and/more/and/more/and/more/and/more/stuff'
 * recursiveRefMap: [['/stuff/and/more/and/more', '/stuff/and/more/']]
 * returned:        '/stuff/and/more/stuff'
 *
 * //  { Pointer } pointer -
 * //  { Map<string, string> } recursiveRefMap -
 * //  { Map<string, number> = new Map() } arrayMap - optional
 * // { string } -
 * @param {?} pointer
 * @param {?} recursiveRefMap
 * @param {?=} arrayMap
 * @return {?}
 */
export function removeRecursiveReferences(pointer, recursiveRefMap, arrayMap) {
    if (arrayMap === void 0) { arrayMap = new Map(); }
    if (!pointer) {
        return '';
    }
    /** @type {?} */
    var genericPointer = JsonPointer.toGenericPointer(JsonPointer.compile(pointer), arrayMap);
    if (genericPointer.indexOf('/') === -1) {
        return genericPointer;
    }
    /** @type {?} */
    var possibleReferences = true;
    while (possibleReferences) {
        possibleReferences = false;
        recursiveRefMap.forEach(function (toPointer, fromPointer) {
            if (JsonPointer.isSubPointer(toPointer, fromPointer)) {
                while (JsonPointer.isSubPointer(fromPointer, genericPointer, true)) {
                    genericPointer = JsonPointer.toGenericPointer(toPointer + genericPointer.slice(fromPointer.length), arrayMap);
                    possibleReferences = true;
                }
            }
        });
    }
    return genericPointer;
}
/**
 * 'getInputType' function
 *
 * //   schema
 * //  { any = null } layoutNode
 * // { string }
 * @param {?} schema
 * @param {?=} layoutNode
 * @return {?}
 */
export function getInputType(schema, layoutNode) {
    if (layoutNode === void 0) { layoutNode = null; }
    /** @type {?} */
    var controlType = JsonPointer.getFirst([
        [schema, '/x-schema-form/type'],
        [schema, '/x-schema-form/widget/component'],
        [schema, '/x-schema-form/widget'],
        [schema, '/widget/component'],
        [schema, '/widget']
    ]);
    if (isString(controlType)) {
        return checkInlineType(controlType, schema, layoutNode);
    }
    /** @type {?} */
    var schemaType = schema.type;
    if (schemaType) {
        if (isArray(schemaType)) {
            // If multiple types listed, use most inclusive type
            schemaType =
                inArray('object', schemaType) && hasOwn(schema, 'properties') ? 'object' :
                    inArray('array', schemaType) && hasOwn(schema, 'items') ? 'array' :
                        inArray('array', schemaType) && hasOwn(schema, 'additionalItems') ? 'array' :
                            inArray('string', schemaType) ? 'string' :
                                inArray('number', schemaType) ? 'number' :
                                    inArray('integer', schemaType) ? 'integer' :
                                        inArray('boolean', schemaType) ? 'boolean' : 'unknown';
        }
        if (schemaType === 'boolean') {
            return 'checkbox';
        }
        if (schemaType === 'object') {
            if (hasOwn(schema, 'properties') || hasOwn(schema, 'additionalProperties')) {
                return 'section';
            }
            // TODO: Figure out how to handle additionalProperties
            if (hasOwn(schema, '$ref')) {
                return '$ref';
            }
        }
        if (schemaType === 'array') {
            /** @type {?} */
            var itemsObject = JsonPointer.getFirst([
                [schema, '/items'],
                [schema, '/additionalItems']
            ]) || {};
            return hasOwn(itemsObject, 'enum') && schema.maxItems !== 1 ?
                checkInlineType('checkboxes', schema, layoutNode) : 'array';
        }
        if (schemaType === 'null') {
            return 'none';
        }
        if (JsonPointer.has(layoutNode, '/options/titleMap') ||
            hasOwn(schema, 'enum') || getTitleMapFromOneOf(schema, null, true)) {
            return 'select';
        }
        if (schemaType === 'number' || schemaType === 'integer') {
            return (schemaType === 'integer' || hasOwn(schema, 'multipleOf')) &&
                hasOwn(schema, 'maximum') && hasOwn(schema, 'minimum') ? 'range' : schemaType;
        }
        if (schemaType === 'string') {
            return {
                'color': 'color',
                'date': 'date',
                'date-time': 'datetime-local',
                'email': 'email',
                'uri': 'url',
            }[schema.format] || 'text';
        }
    }
    if (hasOwn(schema, '$ref')) {
        return '$ref';
    }
    if (isArray(schema.oneOf) || isArray(schema.anyOf)) {
        return 'one-of';
    }
    console.error("getInputType error: Unable to determine input type for " + schemaType);
    console.error('schema', schema);
    if (layoutNode) {
        console.error('layoutNode', layoutNode);
    }
    return 'none';
}
/**
 * 'checkInlineType' function
 *
 * Checks layout and schema nodes for 'inline: true', and converts
 * 'radios' or 'checkboxes' to 'radios-inline' or 'checkboxes-inline'
 *
 * //  { string } controlType -
 * //   schema -
 * //  { any = null } layoutNode -
 * // { string }
 * @param {?} controlType
 * @param {?} schema
 * @param {?=} layoutNode
 * @return {?}
 */
export function checkInlineType(controlType, schema, layoutNode) {
    if (layoutNode === void 0) { layoutNode = null; }
    if (!isString(controlType) || (controlType.slice(0, 8) !== 'checkbox' && controlType.slice(0, 5) !== 'radio')) {
        return controlType;
    }
    if (JsonPointer.getFirst([
        [layoutNode, '/inline'],
        [layoutNode, '/options/inline'],
        [schema, '/inline'],
        [schema, '/x-schema-form/inline'],
        [schema, '/x-schema-form/options/inline'],
        [schema, '/x-schema-form/widget/inline'],
        [schema, '/x-schema-form/widget/component/inline'],
        [schema, '/x-schema-form/widget/component/options/inline'],
        [schema, '/widget/inline'],
        [schema, '/widget/component/inline'],
        [schema, '/widget/component/options/inline'],
    ]) === true) {
        return controlType.slice(0, 5) === 'radio' ?
            'radios-inline' : 'checkboxes-inline';
    }
    else {
        return controlType;
    }
}
/**
 * 'isInputRequired' function
 *
 * Checks a JSON Schema to see if an item is required
 *
 * //   schema - the schema to check
 * //  { string } schemaPointer - the pointer to the item to check
 * // { boolean } - true if the item is required, false if not
 * @param {?} schema
 * @param {?} schemaPointer
 * @return {?}
 */
export function isInputRequired(schema, schemaPointer) {
    if (!isObject(schema)) {
        console.error('isInputRequired error: Input schema must be an object.');
        return false;
    }
    /** @type {?} */
    var listPointerArray = JsonPointer.parse(schemaPointer);
    if (isArray(listPointerArray)) {
        if (!listPointerArray.length) {
            return schema.required === true;
        }
        /** @type {?} */
        var keyName = listPointerArray.pop();
        /** @type {?} */
        var nextToLastKey = listPointerArray[listPointerArray.length - 1];
        if (['properties', 'additionalProperties', 'patternProperties', 'items', 'additionalItems']
            .includes(nextToLastKey)) {
            listPointerArray.pop();
        }
        /** @type {?} */
        var parentSchema = JsonPointer.get(schema, listPointerArray) || {};
        if (isArray(parentSchema.required)) {
            return parentSchema.required.includes(keyName);
        }
        if (parentSchema.type === 'array') {
            return hasOwn(parentSchema, 'minItems') &&
                isNumber(keyName) &&
                +parentSchema.minItems > +keyName;
        }
    }
    return false;
}
;
/**
 * 'updateInputOptions' function
 *
 * //   layoutNode
 * //   schema
 * //   jsf
 * // { void }
 * @param {?} layoutNode
 * @param {?} schema
 * @param {?} jsf
 * @return {?}
 */
export function updateInputOptions(layoutNode, schema, jsf) {
    if (!isObject(layoutNode) || !isObject(layoutNode.options)) {
        return;
    }
    /** @type {?} */
    var newOptions = {};
    /** @type {?} */
    var fixUiKeys = function (key) { return key.slice(0, 3).toLowerCase() === 'ui:' ? key.slice(3) : key; };
    mergeFilteredObject(newOptions, jsf.formOptions.defautWidgetOptions, [], fixUiKeys);
    [[JsonPointer.get(schema, '/ui:widget/options'), []],
        [JsonPointer.get(schema, '/ui:widget'), []],
        [schema, [
                'additionalProperties', 'additionalItems', 'properties', 'items',
                'required', 'type', 'x-schema-form', '$ref'
            ]],
        [JsonPointer.get(schema, '/x-schema-form/options'), []],
        [JsonPointer.get(schema, '/x-schema-form'), ['items', 'options']],
        [layoutNode, [
                '_id', '$ref', 'arrayItem', 'arrayItemType', 'dataPointer', 'dataType',
                'items', 'key', 'name', 'options', 'recursiveReference', 'type', 'widget'
            ]],
        [layoutNode.options, []],
    ].forEach(function (_a) {
        var _b = tslib_1.__read(_a, 2), object = _b[0], excludeKeys = _b[1];
        return mergeFilteredObject(newOptions, object, excludeKeys, fixUiKeys);
    });
    if (!hasOwn(newOptions, 'titleMap')) {
        /** @type {?} */
        var newTitleMap = null;
        newTitleMap = getTitleMapFromOneOf(schema, newOptions.flatList);
        if (newTitleMap) {
            newOptions.titleMap = newTitleMap;
        }
        if (!hasOwn(newOptions, 'titleMap') && !hasOwn(newOptions, 'enum') && hasOwn(schema, 'items')) {
            if (JsonPointer.has(schema, '/items/titleMap')) {
                newOptions.titleMap = schema.items.titleMap;
            }
            else if (JsonPointer.has(schema, '/items/enum')) {
                newOptions.enum = schema.items.enum;
                if (!hasOwn(newOptions, 'enumNames') && JsonPointer.has(schema, '/items/enumNames')) {
                    newOptions.enumNames = schema.items.enumNames;
                }
            }
            else if (JsonPointer.has(schema, '/items/oneOf')) {
                newTitleMap = getTitleMapFromOneOf(schema.items, newOptions.flatList);
                if (newTitleMap) {
                    newOptions.titleMap = newTitleMap;
                }
            }
        }
    }
    // If schema type is integer, enforce by setting multipleOf = 1
    if (schema.type === 'integer' && !hasValue(newOptions.multipleOf)) {
        newOptions.multipleOf = 1;
    }
    // Copy any typeahead word lists to options.typeahead.source
    if (JsonPointer.has(newOptions, '/autocomplete/source')) {
        newOptions.typeahead = newOptions.autocomplete;
    }
    else if (JsonPointer.has(newOptions, '/tagsinput/source')) {
        newOptions.typeahead = newOptions.tagsinput;
    }
    else if (JsonPointer.has(newOptions, '/tagsinput/typeahead/source')) {
        newOptions.typeahead = newOptions.tagsinput.typeahead;
    }
    layoutNode.options = newOptions;
}
/**
 * 'getTitleMapFromOneOf' function
 *
 * //  { schema } schema
 * //  { boolean = null } flatList
 * //  { boolean = false } validateOnly
 * // { validators }
 * @param {?=} schema
 * @param {?=} flatList
 * @param {?=} validateOnly
 * @return {?}
 */
export function getTitleMapFromOneOf(schema, flatList, validateOnly) {
    if (schema === void 0) { schema = {}; }
    if (flatList === void 0) { flatList = null; }
    if (validateOnly === void 0) { validateOnly = false; }
    /** @type {?} */
    var titleMap = null;
    /** @type {?} */
    var oneOf = schema.oneOf || schema.anyOf || null;
    if (isArray(oneOf) && oneOf.every(function (item) { return item.title; })) {
        if (oneOf.every(function (item) { return isArray(item.enum) && item.enum.length === 1; })) {
            if (validateOnly) {
                return true;
            }
            titleMap = oneOf.map(function (item) { return ({ name: item.title, value: item.enum[0] }); });
        }
        else if (oneOf.every(function (item) { return item.const; })) {
            if (validateOnly) {
                return true;
            }
            titleMap = oneOf.map(function (item) { return ({ name: item.title, value: item.const }); });
        }
        // if flatList !== false and some items have colons, make grouped map
        if (flatList !== false && (titleMap || [])
            .filter(function (title) { return ((title || {}).name || '').indexOf(': '); }).length > 1) {
            /** @type {?} */
            var newTitleMap_1 = titleMap.map(function (title) {
                var _a = tslib_1.__read(title.name.split(/: (.+)/), 2), group = _a[0], name = _a[1];
                return group && name ? tslib_1.__assign({}, title, { group: group, name: name }) : title;
            });
            // If flatList === true or at least one group has multiple items, use grouped map
            if (flatList === true || newTitleMap_1.some(function (title, index) { return index &&
                hasOwn(title, 'group') && title.group === newTitleMap_1[index - 1].group; })) {
                titleMap = newTitleMap_1;
            }
        }
    }
    return validateOnly ? false : titleMap;
}
/**
 * 'getControlValidators' function
 *
 * //  schema
 * // { validators }
 * @param {?} schema
 * @return {?}
 */
export function getControlValidators(schema) {
    if (!isObject(schema)) {
        return null;
    }
    /** @type {?} */
    var validators = {};
    if (hasOwn(schema, 'type')) {
        switch (schema.type) {
            case 'string':
                forEach(['pattern', 'format', 'minLength', 'maxLength'], function (prop) {
                    if (hasOwn(schema, prop)) {
                        validators[prop] = [schema[prop]];
                    }
                });
                break;
            case 'number':
            case 'integer':
                forEach(['Minimum', 'Maximum'], function (ucLimit) {
                    /** @type {?} */
                    var eLimit = 'exclusive' + ucLimit;
                    /** @type {?} */
                    var limit = ucLimit.toLowerCase();
                    if (hasOwn(schema, limit)) {
                        /** @type {?} */
                        var exclusive = hasOwn(schema, eLimit) && schema[eLimit] === true;
                        validators[limit] = [schema[limit], exclusive];
                    }
                });
                forEach(['multipleOf', 'type'], function (prop) {
                    if (hasOwn(schema, prop)) {
                        validators[prop] = [schema[prop]];
                    }
                });
                break;
            case 'object':
                forEach(['minProperties', 'maxProperties', 'dependencies'], function (prop) {
                    if (hasOwn(schema, prop)) {
                        validators[prop] = [schema[prop]];
                    }
                });
                break;
            case 'array':
                forEach(['minItems', 'maxItems', 'uniqueItems'], function (prop) {
                    if (hasOwn(schema, prop)) {
                        validators[prop] = [schema[prop]];
                    }
                });
                break;
        }
    }
    if (hasOwn(schema, 'enum')) {
        validators.enum = [schema.enum];
    }
    return validators;
}
/**
 * 'resolveSchemaReferences' function
 *
 * Find all $ref links in schema and save links and referenced schemas in
 * schemaRefLibrary, schemaRecursiveRefMap, and dataRecursiveRefMap
 *
 * //  schema
 * //  schemaRefLibrary
 * // { Map<string, string> } schemaRecursiveRefMap
 * // { Map<string, string> } dataRecursiveRefMap
 * // { Map<string, number> } arrayMap
 * //
 * @param {?} schema
 * @param {?} schemaRefLibrary
 * @param {?} schemaRecursiveRefMap
 * @param {?} dataRecursiveRefMap
 * @param {?} arrayMap
 * @return {?}
 */
export function resolveSchemaReferences(schema, schemaRefLibrary, schemaRecursiveRefMap, dataRecursiveRefMap, arrayMap) {
    if (!isObject(schema)) {
        console.error('resolveSchemaReferences error: schema must be an object.');
        return;
    }
    /** @type {?} */
    var refLinks = new Set();
    /** @type {?} */
    var refMapSet = new Set();
    /** @type {?} */
    var refMap = new Map();
    /** @type {?} */
    var recursiveRefMap = new Map();
    /** @type {?} */
    var refLibrary = {};
    // Search schema for all $ref links, and build full refLibrary
    JsonPointer.forEachDeep(schema, function (subSchema, subSchemaPointer) {
        if (hasOwn(subSchema, '$ref') && isString(subSchema['$ref'])) {
            /** @type {?} */
            var refPointer = JsonPointer.compile(subSchema['$ref']);
            refLinks.add(refPointer);
            refMapSet.add(subSchemaPointer + '~~' + refPointer);
            refMap.set(subSchemaPointer, refPointer);
        }
    });
    refLinks.forEach(function (ref) { return refLibrary[ref] = getSubSchema(schema, ref); });
    /** @type {?} */
    var checkRefLinks = true;
    while (checkRefLinks) {
        checkRefLinks = false;
        Array.from(refMap).forEach(function (_a) {
            var _b = tslib_1.__read(_a, 2), fromRef1 = _b[0], toRef1 = _b[1];
            return Array.from(refMap)
                .filter(function (_a) {
                var _b = tslib_1.__read(_a, 2), fromRef2 = _b[0], toRef2 = _b[1];
                return JsonPointer.isSubPointer(toRef1, fromRef2, true) &&
                    !JsonPointer.isSubPointer(toRef2, toRef1, true) &&
                    !refMapSet.has(fromRef1 + fromRef2.slice(toRef1.length) + '~~' + toRef2);
            })
                .forEach(function (_a) {
                var _b = tslib_1.__read(_a, 2), fromRef2 = _b[0], toRef2 = _b[1];
                refMapSet.add(fromRef1 + fromRef2.slice(toRef1.length) + '~~' + toRef2);
                checkRefLinks = true;
            });
        });
    }
    // Build full recursiveRefMap
    // First pass - save all internally recursive refs from refMapSet
    Array.from(refMapSet)
        .map(function (refLink) { return refLink.split('~~'); })
        .filter(function (_a) {
        var _b = tslib_1.__read(_a, 2), fromRef = _b[0], toRef = _b[1];
        return JsonPointer.isSubPointer(toRef, fromRef);
    })
        .forEach(function (_a) {
        var _b = tslib_1.__read(_a, 2), fromRef = _b[0], toRef = _b[1];
        return recursiveRefMap.set(fromRef, toRef);
    });
    // Second pass - create recursive versions of any other refs that link to recursive refs
    Array.from(refMap)
        .filter(function (_a) {
        var _b = tslib_1.__read(_a, 2), fromRef1 = _b[0], toRef1 = _b[1];
        return Array.from(recursiveRefMap.keys())
            .every(function (fromRef2) { return !JsonPointer.isSubPointer(fromRef1, fromRef2, true); });
    })
        .forEach(function (_a) {
        var _b = tslib_1.__read(_a, 2), fromRef1 = _b[0], toRef1 = _b[1];
        return Array.from(recursiveRefMap)
            .filter(function (_a) {
            var _b = tslib_1.__read(_a, 2), fromRef2 = _b[0], toRef2 = _b[1];
            return !recursiveRefMap.has(fromRef1 + fromRef2.slice(toRef1.length)) &&
                JsonPointer.isSubPointer(toRef1, fromRef2, true) &&
                !JsonPointer.isSubPointer(toRef1, fromRef1, true);
        })
            .forEach(function (_a) {
            var _b = tslib_1.__read(_a, 2), fromRef2 = _b[0], toRef2 = _b[1];
            return recursiveRefMap.set(fromRef1 + fromRef2.slice(toRef1.length), fromRef1 + toRef2.slice(toRef1.length));
        });
    });
    /** @type {?} */
    var compiledSchema = tslib_1.__assign({}, schema);
    delete compiledSchema.definitions;
    compiledSchema =
        getSubSchema(compiledSchema, '', refLibrary, recursiveRefMap);
    // Make sure all remaining schema $refs are recursive, and build final
    // schemaRefLibrary, schemaRecursiveRefMap, dataRecursiveRefMap, & arrayMap
    JsonPointer.forEachDeep(compiledSchema, function (subSchema, subSchemaPointer) {
        if (isString(subSchema['$ref'])) {
            /** @type {?} */
            var refPointer = JsonPointer.compile(subSchema['$ref']);
            if (!JsonPointer.isSubPointer(refPointer, subSchemaPointer, true)) {
                refPointer = removeRecursiveReferences(subSchemaPointer, recursiveRefMap);
                JsonPointer.set(compiledSchema, subSchemaPointer, { $ref: "#" + refPointer });
            }
            if (!hasOwn(schemaRefLibrary, 'refPointer')) {
                schemaRefLibrary[refPointer] = !refPointer.length ? compiledSchema :
                    getSubSchema(compiledSchema, refPointer, schemaRefLibrary, recursiveRefMap);
            }
            if (!schemaRecursiveRefMap.has(subSchemaPointer)) {
                schemaRecursiveRefMap.set(subSchemaPointer, refPointer);
            }
            /** @type {?} */
            var fromDataRef = JsonPointer.toDataPointer(subSchemaPointer, compiledSchema);
            if (!dataRecursiveRefMap.has(fromDataRef)) {
                /** @type {?} */
                var toDataRef = JsonPointer.toDataPointer(refPointer, compiledSchema);
                dataRecursiveRefMap.set(fromDataRef, toDataRef);
            }
        }
        if (subSchema.type === 'array' &&
            (hasOwn(subSchema, 'items') || hasOwn(subSchema, 'additionalItems'))) {
            /** @type {?} */
            var dataPointer = JsonPointer.toDataPointer(subSchemaPointer, compiledSchema);
            if (!arrayMap.has(dataPointer)) {
                /** @type {?} */
                var tupleItems = isArray(subSchema.items) ? subSchema.items.length : 0;
                arrayMap.set(dataPointer, tupleItems);
            }
        }
    }, true);
    return compiledSchema;
}
/**
 * 'getSubSchema' function
 *
 * //   schema
 * //  { Pointer } pointer
 * //  { object } schemaRefLibrary
 * //  { Map<string, string> } schemaRecursiveRefMap
 * //  { string[] = [] } usedPointers
 * //
 * @param {?} schema
 * @param {?} pointer
 * @param {?=} schemaRefLibrary
 * @param {?=} schemaRecursiveRefMap
 * @param {?=} usedPointers
 * @return {?}
 */
export function getSubSchema(schema, pointer, schemaRefLibrary, schemaRecursiveRefMap, usedPointers) {
    if (schemaRefLibrary === void 0) { schemaRefLibrary = null; }
    if (schemaRecursiveRefMap === void 0) { schemaRecursiveRefMap = null; }
    if (usedPointers === void 0) { usedPointers = []; }
    if (!schemaRefLibrary || !schemaRecursiveRefMap) {
        return JsonPointer.getCopy(schema, pointer);
    }
    if (typeof pointer !== 'string') {
        pointer = JsonPointer.compile(pointer);
    }
    usedPointers = tslib_1.__spread(usedPointers, [pointer]);
    /** @type {?} */
    var newSchema = null;
    if (pointer === '') {
        newSchema = _.cloneDeep(schema);
    }
    else {
        /** @type {?} */
        var shortPointer = removeRecursiveReferences(pointer, schemaRecursiveRefMap);
        if (shortPointer !== pointer) {
            usedPointers = tslib_1.__spread(usedPointers, [shortPointer]);
        }
        newSchema = JsonPointer.getFirstCopy([
            [schemaRefLibrary, [shortPointer]],
            [schema, pointer],
            [schema, shortPointer]
        ]);
    }
    return JsonPointer.forEachDeepCopy(newSchema, function (subSchema, subPointer) {
        if (isObject(subSchema)) {
            // Replace non-recursive $ref links with referenced schemas
            if (isString(subSchema.$ref)) {
                /** @type {?} */
                var refPointer_1 = JsonPointer.compile(subSchema.$ref);
                if (refPointer_1.length && usedPointers.every(function (ptr) {
                    return !JsonPointer.isSubPointer(refPointer_1, ptr, true);
                })) {
                    /** @type {?} */
                    var refSchema = getSubSchema(schema, refPointer_1, schemaRefLibrary, schemaRecursiveRefMap, usedPointers);
                    if (Object.keys(subSchema).length === 1) {
                        return refSchema;
                    }
                    else {
                        /** @type {?} */
                        var extraKeys = tslib_1.__assign({}, subSchema);
                        delete extraKeys.$ref;
                        return mergeSchemas(refSchema, extraKeys);
                    }
                }
            }
            // TODO: Convert schemas with 'type' arrays to 'oneOf'
            // Combine allOf subSchemas
            if (isArray(subSchema.allOf)) {
                return combineAllOf(subSchema);
            }
            // Fix incorrectly placed array object required lists
            if (subSchema.type === 'array' && isArray(subSchema.required)) {
                return fixRequiredArrayProperties(subSchema);
            }
        }
        return subSchema;
    }, true, /** @type {?} */ (pointer));
}
/**
 * 'combineAllOf' function
 *
 * Attempt to convert an allOf schema object into
 * a non-allOf schema object with equivalent rules.
 *
 * //   schema - allOf schema object
 * //  - converted schema object
 * @param {?} schema
 * @return {?}
 */
export function combineAllOf(schema) {
    if (!isObject(schema) || !isArray(schema.allOf)) {
        return schema;
    }
    /** @type {?} */
    var mergedSchema = mergeSchemas.apply(void 0, tslib_1.__spread(schema.allOf));
    if (Object.keys(schema).length > 1) {
        /** @type {?} */
        var extraKeys = tslib_1.__assign({}, schema);
        delete extraKeys.allOf;
        mergedSchema = mergeSchemas(mergedSchema, extraKeys);
    }
    return mergedSchema;
}
/**
 * 'fixRequiredArrayProperties' function
 *
 * Fixes an incorrectly placed required list inside an array schema, by moving
 * it into items.properties or additionalItems.properties, where it belongs.
 *
 * //   schema - allOf schema object
 * //  - converted schema object
 * @param {?} schema
 * @return {?}
 */
export function fixRequiredArrayProperties(schema) {
    if (schema.type === 'array' && isArray(schema.required)) {
        /** @type {?} */
        var itemsObject_1 = hasOwn(schema.items, 'properties') ? 'items' :
            hasOwn(schema.additionalItems, 'properties') ? 'additionalItems' : null;
        if (itemsObject_1 && !hasOwn(schema[itemsObject_1], 'required') && (hasOwn(schema[itemsObject_1], 'additionalProperties') ||
            schema.required.every(function (key) { return hasOwn(schema[itemsObject_1].properties, key); }))) {
            schema = _.cloneDeep(schema);
            schema[itemsObject_1].required = schema.required;
            delete schema.required;
        }
    }
    return schema;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbi1zY2hlbWEuZnVuY3Rpb25zLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmc2LWpzb24tc2NoZW1hLWZvcm0vIiwic291cmNlcyI6WyJsaWIvc2hhcmVkL2pzb24tc2NoZW1hLmZ1bmN0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sS0FBSyxDQUFDLE1BQU0sUUFBUSxDQUFDO0FBRTVCLE9BQU8sRUFDTCxPQUFPLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQXVCLFFBQVEsRUFBRSxRQUFRLEVBQzVFLFFBQVEsRUFDVCxNQUFNLHVCQUF1QixDQUFDO0FBQy9CLE9BQU8sRUFDTCxPQUFPLEVBQUUsTUFBTSxFQUFFLG1CQUFtQixFQUNyQyxNQUFNLHFCQUFxQixDQUFDO0FBQzdCLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsV0FBVyxFQUFXLE1BQU0seUJBQXlCLENBQUM7Ozs7Ozs7Ozs7O0FBMkMvRCxNQUFNLGdDQUFnQyxNQUFNO0lBQzFDLE1BQU0sQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0F1QlI7Ozs7Ozs7Ozs7Ozs7OztBQVlELE1BQU0sOEJBQ0osSUFBSSxFQUFFLGdCQUF3QixFQUFFLE1BQWE7SUFBdkMsaUNBQUEsRUFBQSx3QkFBd0I7SUFBRSx1QkFBQSxFQUFBLGFBQWE7O0lBRTdDLElBQUksU0FBUyxHQUFRLEVBQUUsQ0FBQzs7SUFDeEIsSUFBTSxZQUFZLEdBQUcsVUFBQyxLQUFVOztRQUM5QixJQUFNLFNBQVMsR0FBRyxPQUFPLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQzNDLE1BQU0sQ0FBQyxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLFNBQVMsQ0FBQztLQUN0RSxDQUFDOztJQUNGLElBQU0sY0FBYyxHQUFHLFVBQUMsS0FBSztRQUMzQixP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SyxPQUFPLElBQUksT0FBTyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7O1FBQ3hELElBQUksYUFBVyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUM5RCxNQUFNLENBQUMsTUFBTSxDQUFDLGVBQWUsRUFBRSxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUMxRSxFQUFFLENBQUMsQ0FBQyxhQUFXLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLGFBQVcsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxJQUFJLENBQzdELE1BQU0sQ0FBQyxNQUFNLENBQUMsYUFBVyxDQUFDLEVBQUUsc0JBQXNCLENBQUM7WUFDbkQsTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxNQUFNLENBQUMsTUFBTSxDQUFDLGFBQVcsQ0FBQyxDQUFDLFVBQVUsRUFBRSxHQUFHLENBQUMsRUFBM0MsQ0FBMkMsQ0FBQyxDQUMxRSxDQUFDLENBQUMsQ0FBQztZQUNGLE1BQU0sR0FBRyxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzdCLE1BQU0sQ0FBQyxhQUFXLENBQUMsQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQztZQUMvQyxPQUFPLE1BQU0sQ0FBQyxRQUFRLENBQUM7U0FDeEI7S0FDRjtJQUNELE1BQU0sQ0FBQyxNQUFNLENBQUM7Q0FDZiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcblxuaW1wb3J0IHtcbiAgZ2V0VHlwZSwgaGFzVmFsdWUsIGluQXJyYXksIGlzQXJyYXksIGlzRW1wdHksIGlzRnVuY3Rpb24sIGlzTnVtYmVyLCBpc09iamVjdCxcbiAgaXNTdHJpbmdcbn0gZnJvbSAnLi92YWxpZGF0b3IuZnVuY3Rpb25zJztcbmltcG9ydCB7XG4gIGZvckVhY2gsIGhhc093biwgbWVyZ2VGaWx0ZXJlZE9iamVjdCwgdW5pcXVlSXRlbXMsIGNvbW1vbkl0ZW1zXG59IGZyb20gJy4vdXRpbGl0eS5mdW5jdGlvbnMnO1xuaW1wb3J0IHsgbWVyZ2VTY2hlbWFzIH0gZnJvbSAnLi9tZXJnZS1zY2hlbWFzLmZ1bmN0aW9uJztcbmltcG9ydCB7IEpzb25Qb2ludGVyLCBQb2ludGVyIH0gZnJvbSAnLi9qc29ucG9pbnRlci5mdW5jdGlvbnMnO1xuaW1wb3J0IHsgSnNvblZhbGlkYXRvcnMgfSBmcm9tICcuL2pzb24udmFsaWRhdG9ycyc7XG5cbi8qKlxuICogSlNPTiBTY2hlbWEgZnVuY3Rpb24gbGlicmFyeTpcbiAqXG4gKiBidWlsZFNjaGVtYUZyb21MYXlvdXQ6ICAgVE9ETzogV3JpdGUgdGhpcyBmdW5jdGlvblxuICpcbiAqIGJ1aWxkU2NoZW1hRnJvbURhdGE6XG4gKlxuICogZ2V0RnJvbVNjaGVtYTpcbiAqXG4gKiByZW1vdmVSZWN1cnNpdmVSZWZlcmVuY2VzOlxuICpcbiAqIGdldElucHV0VHlwZTpcbiAqXG4gKiBjaGVja0lubGluZVR5cGU6XG4gKlxuICogaXNJbnB1dFJlcXVpcmVkOlxuICpcbiAqIHVwZGF0ZUlucHV0T3B0aW9uczpcbiAqXG4gKiBnZXRUaXRsZU1hcEZyb21PbmVPZjpcbiAqXG4gKiBnZXRDb250cm9sVmFsaWRhdG9yczpcbiAqXG4gKiByZXNvbHZlU2NoZW1hUmVmZXJlbmNlczpcbiAqXG4gKiBnZXRTdWJTY2hlbWE6XG4gKlxuICogY29tYmluZUFsbE9mOlxuICpcbiAqIGZpeFJlcXVpcmVkQXJyYXlQcm9wZXJ0aWVzOlxuICovXG5cbi8qKlxuICogJ2J1aWxkU2NoZW1hRnJvbUxheW91dCcgZnVuY3Rpb25cbiAqXG4gKiBUT0RPOiBCdWlsZCBhIEpTT04gU2NoZW1hIGZyb20gYSBKU09OIEZvcm0gbGF5b3V0XG4gKlxuICogLy8gICBsYXlvdXQgLSBUaGUgSlNPTiBGb3JtIGxheW91dFxuICogLy8gIC0gVGhlIG5ldyBKU09OIFNjaGVtYVxuICovXG5leHBvcnQgZnVuY3Rpb24gYnVpbGRTY2hlbWFGcm9tTGF5b3V0KGxheW91dCkge1xuICByZXR1cm47XG4gIC8vIGxldCBuZXdTY2hlbWE6IGFueSA9IHsgfTtcbiAgLy8gY29uc3Qgd2Fsa0xheW91dCA9IChsYXlvdXRJdGVtczogYW55W10sIGNhbGxiYWNrOiBGdW5jdGlvbik6IGFueVtdID0+IHtcbiAgLy8gICBsZXQgcmV0dXJuQXJyYXk6IGFueVtdID0gW107XG4gIC8vICAgZm9yIChsZXQgbGF5b3V0SXRlbSBvZiBsYXlvdXRJdGVtcykge1xuICAvLyAgICAgY29uc3QgcmV0dXJuSXRlbTogYW55ID0gY2FsbGJhY2sobGF5b3V0SXRlbSk7XG4gIC8vICAgICBpZiAocmV0dXJuSXRlbSkgeyByZXR1cm5BcnJheSA9IHJldHVybkFycmF5LmNvbmNhdChjYWxsYmFjayhsYXlvdXRJdGVtKSk7IH1cbiAgLy8gICAgIGlmIChsYXlvdXRJdGVtLml0ZW1zKSB7XG4gIC8vICAgICAgIHJldHVybkFycmF5ID0gcmV0dXJuQXJyYXkuY29uY2F0KHdhbGtMYXlvdXQobGF5b3V0SXRlbS5pdGVtcywgY2FsbGJhY2spKTtcbiAgLy8gICAgIH1cbiAgLy8gICB9XG4gIC8vICAgcmV0dXJuIHJldHVybkFycmF5O1xuICAvLyB9O1xuICAvLyB3YWxrTGF5b3V0KGxheW91dCwgbGF5b3V0SXRlbSA9PiB7XG4gIC8vICAgbGV0IGl0ZW1LZXk6IHN0cmluZztcbiAgLy8gICBpZiAodHlwZW9mIGxheW91dEl0ZW0gPT09ICdzdHJpbmcnKSB7XG4gIC8vICAgICBpdGVtS2V5ID0gbGF5b3V0SXRlbTtcbiAgLy8gICB9IGVsc2UgaWYgKGxheW91dEl0ZW0ua2V5KSB7XG4gIC8vICAgICBpdGVtS2V5ID0gbGF5b3V0SXRlbS5rZXk7XG4gIC8vICAgfVxuICAvLyAgIGlmICghaXRlbUtleSkgeyByZXR1cm47IH1cbiAgLy8gICAvL1xuICAvLyB9KTtcbn1cblxuLyoqXG4gKiAnYnVpbGRTY2hlbWFGcm9tRGF0YScgZnVuY3Rpb25cbiAqXG4gKiBCdWlsZCBhIEpTT04gU2NoZW1hIGZyb20gYSBkYXRhIG9iamVjdFxuICpcbiAqIC8vICAgZGF0YSAtIFRoZSBkYXRhIG9iamVjdFxuICogLy8gIHsgYm9vbGVhbiA9IGZhbHNlIH0gcmVxdWlyZUFsbEZpZWxkcyAtIFJlcXVpcmUgYWxsIGZpZWxkcz9cbiAqIC8vICB7IGJvb2xlYW4gPSB0cnVlIH0gaXNSb290IC0gaXMgcm9vdFxuICogLy8gIC0gVGhlIG5ldyBKU09OIFNjaGVtYVxuICovXG5leHBvcnQgZnVuY3Rpb24gYnVpbGRTY2hlbWFGcm9tRGF0YShcbiAgZGF0YSwgcmVxdWlyZUFsbEZpZWxkcyA9IGZhbHNlLCBpc1Jvb3QgPSB0cnVlXG4pIHtcbiAgbGV0IG5ld1NjaGVtYTogYW55ID0ge307XG4gIGNvbnN0IGdldEZpZWxkVHlwZSA9ICh2YWx1ZTogYW55KTogc3RyaW5nID0+IHtcbiAgICBjb25zdCBmaWVsZFR5cGUgPSBnZXRUeXBlKHZhbHVlLCAnc3RyaWN0Jyk7XG4gICAgcmV0dXJuIHsgaW50ZWdlcjogJ251bWJlcicsIG51bGw6ICdzdHJpbmcnIH1bZmllbGRUeXBlXSB8fCBmaWVsZFR5cGU7XG4gIH07XG4gIGNvbnN0IGJ1aWxkU3ViU2NoZW1hID0gKHZhbHVlKSA9PlxuICAgIGJ1aWxkU2NoZW1hRnJvbURhdGEodmFsdWUsIHJlcXVpcmVBbGxGaWVsZHMsIGZhbHNlKTtcbiAgaWYgKGlzUm9vdCkgeyBuZXdTY2hlbWEuJHNjaGVtYSA9ICdodHRwOi8vanNvbi1zY2hlbWEub3JnL2RyYWZ0LTA2L3NjaGVtYSMnOyB9XG4gIG5ld1NjaGVtYS50eXBlID0gZ2V0RmllbGRUeXBlKGRhdGEpO1xuICBpZiAobmV3U2NoZW1hLnR5cGUgPT09ICdvYmplY3QnKSB7XG4gICAgbmV3U2NoZW1hLnByb3BlcnRpZXMgPSB7fTtcbiAgICBpZiAocmVxdWlyZUFsbEZpZWxkcykgeyBuZXdTY2hlbWEucmVxdWlyZWQgPSBbXTsgfVxuICAgIGZvciAobGV0IGtleSBvZiBPYmplY3Qua2V5cyhkYXRhKSkge1xuICAgICAgbmV3U2NoZW1hLnByb3BlcnRpZXNba2V5XSA9IGJ1aWxkU3ViU2NoZW1hKGRhdGFba2V5XSk7XG4gICAgICBpZiAocmVxdWlyZUFsbEZpZWxkcykgeyBuZXdTY2hlbWEucmVxdWlyZWQucHVzaChrZXkpOyB9XG4gICAgfVxuICB9IGVsc2UgaWYgKG5ld1NjaGVtYS50eXBlID09PSAnYXJyYXknKSB7XG4gICAgbmV3U2NoZW1hLml0ZW1zID0gZGF0YS5tYXAoYnVpbGRTdWJTY2hlbWEpO1xuICAgIC8vIElmIGFsbCBpdGVtcyBhcmUgdGhlIHNhbWUgdHlwZSwgdXNlIGFuIG9iamVjdCBmb3IgaXRlbXMgaW5zdGVhZCBvZiBhbiBhcnJheVxuICAgIGlmICgobmV3IFNldChkYXRhLm1hcChnZXRGaWVsZFR5cGUpKSkuc2l6ZSA9PT0gMSkge1xuICAgICAgbmV3U2NoZW1hLml0ZW1zID0gbmV3U2NoZW1hLml0ZW1zLnJlZHVjZSgoYSwgYikgPT4gKHsgLi4uYSwgLi4uYiB9KSwge30pO1xuICAgIH1cbiAgICBpZiAocmVxdWlyZUFsbEZpZWxkcykgeyBuZXdTY2hlbWEubWluSXRlbXMgPSAxOyB9XG4gIH1cbiAgcmV0dXJuIG5ld1NjaGVtYTtcbn1cblxuLyoqXG4gKiAnZ2V0RnJvbVNjaGVtYScgZnVuY3Rpb25cbiAqXG4gKiBVc2VzIGEgSlNPTiBQb2ludGVyIGZvciBhIHZhbHVlIHdpdGhpbiBhIGRhdGEgb2JqZWN0IHRvIHJldHJpZXZlXG4gKiB0aGUgc2NoZW1hIGZvciB0aGF0IHZhbHVlIHdpdGhpbiBzY2hlbWEgZm9yIHRoZSBkYXRhIG9iamVjdC5cbiAqXG4gKiBUaGUgb3B0aW9uYWwgdGhpcmQgcGFyYW1ldGVyIGNhbiBhbHNvIGJlIHNldCB0byByZXR1cm4gc29tZXRoaW5nIGVsc2U6XG4gKiAnc2NoZW1hJyAoZGVmYXVsdCk6IHRoZSBzY2hlbWEgZm9yIHRoZSB2YWx1ZSBpbmRpY2F0ZWQgYnkgdGhlIGRhdGEgcG9pbnRlclxuICogJ3BhcmVudFNjaGVtYSc6IHRoZSBzY2hlbWEgZm9yIHRoZSB2YWx1ZSdzIHBhcmVudCBvYmplY3Qgb3IgYXJyYXlcbiAqICdzY2hlbWFQb2ludGVyJzogYSBwb2ludGVyIHRvIHRoZSB2YWx1ZSdzIHNjaGVtYSB3aXRoaW4gdGhlIG9iamVjdCdzIHNjaGVtYVxuICogJ3BhcmVudFNjaGVtYVBvaW50ZXInOiBhIHBvaW50ZXIgdG8gdGhlIHNjaGVtYSBmb3IgdGhlIHZhbHVlJ3MgcGFyZW50IG9iamVjdCBvciBhcnJheVxuICpcbiAqIC8vICAgc2NoZW1hIC0gVGhlIHNjaGVtYSB0byBnZXQgdGhlIHN1Yi1zY2hlbWEgZnJvbVxuICogLy8gIHsgUG9pbnRlciB9IGRhdGFQb2ludGVyIC0gSlNPTiBQb2ludGVyIChzdHJpbmcgb3IgYXJyYXkpXG4gKiAvLyAgeyBzdHJpbmcgPSAnc2NoZW1hJyB9IHJldHVyblR5cGUgLSB3aGF0IHRvIHJldHVybj9cbiAqIC8vICAtIFRoZSBsb2NhdGVkIHN1Yi1zY2hlbWFcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEZyb21TY2hlbWEoc2NoZW1hLCBkYXRhUG9pbnRlciwgcmV0dXJuVHlwZSA9ICdzY2hlbWEnKSB7XG4gIGNvbnN0IGRhdGFQb2ludGVyQXJyYXk6IGFueVtdID0gSnNvblBvaW50ZXIucGFyc2UoZGF0YVBvaW50ZXIpO1xuICBpZiAoZGF0YVBvaW50ZXJBcnJheSA9PT0gbnVsbCkge1xuICAgIGNvbnNvbGUuZXJyb3IoYGdldEZyb21TY2hlbWEgZXJyb3I6IEludmFsaWQgSlNPTiBQb2ludGVyOiAke2RhdGFQb2ludGVyfWApO1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIGxldCBzdWJTY2hlbWEgPSBzY2hlbWE7XG4gIGNvbnN0IHNjaGVtYVBvaW50ZXIgPSBbXTtcbiAgY29uc3QgbGVuZ3RoID0gZGF0YVBvaW50ZXJBcnJheS5sZW5ndGg7XG4gIGlmIChyZXR1cm5UeXBlLnNsaWNlKDAsIDYpID09PSAncGFyZW50JykgeyBkYXRhUG9pbnRlckFycmF5Lmxlbmd0aC0tOyB9XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyArK2kpIHtcbiAgICBjb25zdCBwYXJlbnRTY2hlbWEgPSBzdWJTY2hlbWE7XG4gICAgY29uc3Qga2V5ID0gZGF0YVBvaW50ZXJBcnJheVtpXTtcbiAgICBsZXQgc3ViU2NoZW1hRm91bmQgPSBmYWxzZTtcbiAgICBpZiAodHlwZW9mIHN1YlNjaGVtYSAhPT0gJ29iamVjdCcpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoYGdldEZyb21TY2hlbWEgZXJyb3I6IFVuYWJsZSB0byBmaW5kIFwiJHtrZXl9XCIga2V5IGluIHNjaGVtYS5gKTtcbiAgICAgIGNvbnNvbGUuZXJyb3Ioc2NoZW1hKTtcbiAgICAgIGNvbnNvbGUuZXJyb3IoZGF0YVBvaW50ZXIpO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGlmIChzdWJTY2hlbWEudHlwZSA9PT0gJ2FycmF5JyAmJiAoIWlzTmFOKGtleSkgfHwga2V5ID09PSAnLScpKSB7XG4gICAgICBpZiAoaGFzT3duKHN1YlNjaGVtYSwgJ2l0ZW1zJykpIHtcbiAgICAgICAgaWYgKGlzT2JqZWN0KHN1YlNjaGVtYS5pdGVtcykpIHtcbiAgICAgICAgICBzdWJTY2hlbWFGb3VuZCA9IHRydWU7XG4gICAgICAgICAgc3ViU2NoZW1hID0gc3ViU2NoZW1hLml0ZW1zO1xuICAgICAgICAgIHNjaGVtYVBvaW50ZXIucHVzaCgnaXRlbXMnKTtcbiAgICAgICAgfSBlbHNlIGlmIChpc0FycmF5KHN1YlNjaGVtYS5pdGVtcykpIHtcbiAgICAgICAgICBpZiAoIWlzTmFOKGtleSkgJiYgc3ViU2NoZW1hLml0ZW1zLmxlbmd0aCA+PSAra2V5KSB7XG4gICAgICAgICAgICBzdWJTY2hlbWFGb3VuZCA9IHRydWU7XG4gICAgICAgICAgICBzdWJTY2hlbWEgPSBzdWJTY2hlbWEuaXRlbXNbK2tleV07XG4gICAgICAgICAgICBzY2hlbWFQb2ludGVyLnB1c2goJ2l0ZW1zJywga2V5KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmICghc3ViU2NoZW1hRm91bmQgJiYgaXNPYmplY3Qoc3ViU2NoZW1hLmFkZGl0aW9uYWxJdGVtcykpIHtcbiAgICAgICAgc3ViU2NoZW1hRm91bmQgPSB0cnVlO1xuICAgICAgICBzdWJTY2hlbWEgPSBzdWJTY2hlbWEuYWRkaXRpb25hbEl0ZW1zO1xuICAgICAgICBzY2hlbWFQb2ludGVyLnB1c2goJ2FkZGl0aW9uYWxJdGVtcycpO1xuICAgICAgfSBlbHNlIGlmIChzdWJTY2hlbWEuYWRkaXRpb25hbEl0ZW1zICE9PSBmYWxzZSkge1xuICAgICAgICBzdWJTY2hlbWFGb3VuZCA9IHRydWU7XG4gICAgICAgIHN1YlNjaGVtYSA9IHsgfTtcbiAgICAgICAgc2NoZW1hUG9pbnRlci5wdXNoKCdhZGRpdGlvbmFsSXRlbXMnKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHN1YlNjaGVtYS50eXBlID09PSAnb2JqZWN0Jykge1xuICAgICAgaWYgKGlzT2JqZWN0KHN1YlNjaGVtYS5wcm9wZXJ0aWVzKSAmJiBoYXNPd24oc3ViU2NoZW1hLnByb3BlcnRpZXMsIGtleSkpIHtcbiAgICAgICAgc3ViU2NoZW1hRm91bmQgPSB0cnVlXG4gICAgICAgIHN1YlNjaGVtYSA9IHN1YlNjaGVtYS5wcm9wZXJ0aWVzW2tleV07XG4gICAgICAgIHNjaGVtYVBvaW50ZXIucHVzaCgncHJvcGVydGllcycsIGtleSk7XG4gICAgICB9IGVsc2UgaWYgKGlzT2JqZWN0KHN1YlNjaGVtYS5hZGRpdGlvbmFsUHJvcGVydGllcykpIHtcbiAgICAgICAgc3ViU2NoZW1hRm91bmQgPSB0cnVlXG4gICAgICAgIHN1YlNjaGVtYSA9IHN1YlNjaGVtYS5hZGRpdGlvbmFsUHJvcGVydGllcztcbiAgICAgICAgc2NoZW1hUG9pbnRlci5wdXNoKCdhZGRpdGlvbmFsUHJvcGVydGllcycpO1xuICAgICAgfSBlbHNlIGlmIChzdWJTY2hlbWEuYWRkaXRpb25hbFByb3BlcnRpZXMgIT09IGZhbHNlKSB7XG4gICAgICAgIHN1YlNjaGVtYUZvdW5kID0gdHJ1ZVxuICAgICAgICBzdWJTY2hlbWEgPSB7IH07XG4gICAgICAgIHNjaGVtYVBvaW50ZXIucHVzaCgnYWRkaXRpb25hbFByb3BlcnRpZXMnKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKCFzdWJTY2hlbWFGb3VuZCkge1xuICAgICAgY29uc29sZS5lcnJvcihgZ2V0RnJvbVNjaGVtYSBlcnJvcjogVW5hYmxlIHRvIGZpbmQgXCIke2tleX1cIiBpdGVtIGluIHNjaGVtYS5gKTtcbiAgICAgIGNvbnNvbGUuZXJyb3Ioc2NoZW1hKTtcbiAgICAgIGNvbnNvbGUuZXJyb3IoZGF0YVBvaW50ZXIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmV0dXJuVHlwZS5zbGljZSgtNykgPT09ICdQb2ludGVyJyA/IHNjaGVtYVBvaW50ZXIgOiBzdWJTY2hlbWE7XG59XG5cbi8qKlxuICogJ3JlbW92ZVJlY3Vyc2l2ZVJlZmVyZW5jZXMnIGZ1bmN0aW9uXG4gKlxuICogQ2hlY2tzIGEgSlNPTiBQb2ludGVyIGFnYWluc3QgYSBtYXAgb2YgcmVjdXJzaXZlIHJlZmVyZW5jZXMgYW5kIHJldHVybnNcbiAqIGEgSlNPTiBQb2ludGVyIHRvIHRoZSBzaGFsbG93ZXN0IGVxdWl2YWxlbnQgbG9jYXRpb24gaW4gdGhlIHNhbWUgb2JqZWN0LlxuICpcbiAqIFVzaW5nIHRoaXMgZnVuY3Rpb25zIGVuYWJsZXMgYW4gb2JqZWN0IHRvIGJlIGNvbnN0cnVjdGVkIHdpdGggdW5saW1pdGVkXG4gKiByZWN1cnNpb24sIHdoaWxlIG1haW50YWluZyBhIGZpeGVkIHNldCBvZiBtZXRhZGF0YSwgc3VjaCBhcyBmaWVsZCBkYXRhIHR5cGVzLlxuICogVGhlIG9iamVjdCBjYW4gZ3JvdyBhcyBsYXJnZSBhcyBpdCB3YW50cywgYW5kIGRlZXBseSByZWN1cnNlZCBub2RlcyBjYW5cbiAqIGp1c3QgcmVmZXIgdG8gdGhlIG1ldGFkYXRhIGZvciB0aGVpciBzaGFsbG93IGVxdWl2YWxlbnRzLCBpbnN0ZWFkIG9mIGhhdmluZ1xuICogdG8gYWRkIGFkZGl0aW9uYWwgcmVkdW5kYW50IG1ldGFkYXRhIGZvciBlYWNoIHJlY3Vyc2l2ZWx5IGFkZGVkIG5vZGUuXG4gKlxuICogRXhhbXBsZTpcbiAqXG4gKiBwb2ludGVyOiAgICAgICAgICcvc3R1ZmYvYW5kL21vcmUvYW5kL21vcmUvYW5kL21vcmUvYW5kL21vcmUvc3R1ZmYnXG4gKiByZWN1cnNpdmVSZWZNYXA6IFtbJy9zdHVmZi9hbmQvbW9yZS9hbmQvbW9yZScsICcvc3R1ZmYvYW5kL21vcmUvJ11dXG4gKiByZXR1cm5lZDogICAgICAgICcvc3R1ZmYvYW5kL21vcmUvc3R1ZmYnXG4gKlxuICogLy8gIHsgUG9pbnRlciB9IHBvaW50ZXIgLVxuICogLy8gIHsgTWFwPHN0cmluZywgc3RyaW5nPiB9IHJlY3Vyc2l2ZVJlZk1hcCAtXG4gKiAvLyAgeyBNYXA8c3RyaW5nLCBudW1iZXI+ID0gbmV3IE1hcCgpIH0gYXJyYXlNYXAgLSBvcHRpb25hbFxuICogLy8geyBzdHJpbmcgfSAtXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVSZWN1cnNpdmVSZWZlcmVuY2VzKFxuICBwb2ludGVyLCByZWN1cnNpdmVSZWZNYXAsIGFycmF5TWFwID0gbmV3IE1hcCgpXG4pIHtcbiAgaWYgKCFwb2ludGVyKSB7IHJldHVybiAnJzsgfVxuICBsZXQgZ2VuZXJpY1BvaW50ZXIgPVxuICAgIEpzb25Qb2ludGVyLnRvR2VuZXJpY1BvaW50ZXIoSnNvblBvaW50ZXIuY29tcGlsZShwb2ludGVyKSwgYXJyYXlNYXApO1xuICBpZiAoZ2VuZXJpY1BvaW50ZXIuaW5kZXhPZignLycpID09PSAtMSkgeyByZXR1cm4gZ2VuZXJpY1BvaW50ZXI7IH1cbiAgbGV0IHBvc3NpYmxlUmVmZXJlbmNlcyA9IHRydWU7XG4gIHdoaWxlIChwb3NzaWJsZVJlZmVyZW5jZXMpIHtcbiAgICBwb3NzaWJsZVJlZmVyZW5jZXMgPSBmYWxzZTtcbiAgICByZWN1cnNpdmVSZWZNYXAuZm9yRWFjaCgodG9Qb2ludGVyLCBmcm9tUG9pbnRlcikgPT4ge1xuICAgICAgaWYgKEpzb25Qb2ludGVyLmlzU3ViUG9pbnRlcih0b1BvaW50ZXIsIGZyb21Qb2ludGVyKSkge1xuICAgICAgICB3aGlsZSAoSnNvblBvaW50ZXIuaXNTdWJQb2ludGVyKGZyb21Qb2ludGVyLCBnZW5lcmljUG9pbnRlciwgdHJ1ZSkpIHtcbiAgICAgICAgICBnZW5lcmljUG9pbnRlciA9IEpzb25Qb2ludGVyLnRvR2VuZXJpY1BvaW50ZXIoXG4gICAgICAgICAgICB0b1BvaW50ZXIgKyBnZW5lcmljUG9pbnRlci5zbGljZShmcm9tUG9pbnRlci5sZW5ndGgpLCBhcnJheU1hcFxuICAgICAgICAgICk7XG4gICAgICAgICAgcG9zc2libGVSZWZlcmVuY2VzID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG4gIHJldHVybiBnZW5lcmljUG9pbnRlcjtcbn1cblxuLyoqXG4gKiAnZ2V0SW5wdXRUeXBlJyBmdW5jdGlvblxuICpcbiAqIC8vICAgc2NoZW1hXG4gKiAvLyAgeyBhbnkgPSBudWxsIH0gbGF5b3V0Tm9kZVxuICogLy8geyBzdHJpbmcgfVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0SW5wdXRUeXBlKHNjaGVtYSwgbGF5b3V0Tm9kZTogYW55ID0gbnVsbCkge1xuICAvLyB4LXNjaGVtYS1mb3JtID0gQW5ndWxhciBTY2hlbWEgRm9ybSBjb21wYXRpYmlsaXR5XG4gIC8vIHdpZGdldCAmIGNvbXBvbmVudCA9IFJlYWN0IEpzb25zY2hlbWEgRm9ybSBjb21wYXRpYmlsaXR5XG4gIGxldCBjb250cm9sVHlwZSA9IEpzb25Qb2ludGVyLmdldEZpcnN0KFtcbiAgICBbc2NoZW1hLCAnL3gtc2NoZW1hLWZvcm0vdHlwZSddLFxuICAgIFtzY2hlbWEsICcveC1zY2hlbWEtZm9ybS93aWRnZXQvY29tcG9uZW50J10sXG4gICAgW3NjaGVtYSwgJy94LXNjaGVtYS1mb3JtL3dpZGdldCddLFxuICAgIFtzY2hlbWEsICcvd2lkZ2V0L2NvbXBvbmVudCddLFxuICAgIFtzY2hlbWEsICcvd2lkZ2V0J11cbiAgXSk7XG4gIGlmIChpc1N0cmluZyhjb250cm9sVHlwZSkpIHsgcmV0dXJuIGNoZWNrSW5saW5lVHlwZShjb250cm9sVHlwZSwgc2NoZW1hLCBsYXlvdXROb2RlKTsgfVxuICBsZXQgc2NoZW1hVHlwZSA9IHNjaGVtYS50eXBlO1xuICBpZiAoc2NoZW1hVHlwZSkge1xuICAgIGlmIChpc0FycmF5KHNjaGVtYVR5cGUpKSB7IC8vIElmIG11bHRpcGxlIHR5cGVzIGxpc3RlZCwgdXNlIG1vc3QgaW5jbHVzaXZlIHR5cGVcbiAgICAgIHNjaGVtYVR5cGUgPVxuICAgICAgICBpbkFycmF5KCdvYmplY3QnLCBzY2hlbWFUeXBlKSAmJiBoYXNPd24oc2NoZW1hLCAncHJvcGVydGllcycpID8gJ29iamVjdCcgOlxuICAgICAgICBpbkFycmF5KCdhcnJheScsIHNjaGVtYVR5cGUpICYmIGhhc093bihzY2hlbWEsICdpdGVtcycpID8gJ2FycmF5JyA6XG4gICAgICAgIGluQXJyYXkoJ2FycmF5Jywgc2NoZW1hVHlwZSkgJiYgaGFzT3duKHNjaGVtYSwgJ2FkZGl0aW9uYWxJdGVtcycpID8gJ2FycmF5JyA6XG4gICAgICAgIGluQXJyYXkoJ3N0cmluZycsIHNjaGVtYVR5cGUpID8gJ3N0cmluZycgOlxuICAgICAgICBpbkFycmF5KCdudW1iZXInLCBzY2hlbWFUeXBlKSA/ICdudW1iZXInIDpcbiAgICAgICAgaW5BcnJheSgnaW50ZWdlcicsIHNjaGVtYVR5cGUpID8gJ2ludGVnZXInIDpcbiAgICAgICAgaW5BcnJheSgnYm9vbGVhbicsIHNjaGVtYVR5cGUpID8gJ2Jvb2xlYW4nIDogJ3Vua25vd24nO1xuICAgIH1cbiAgICBpZiAoc2NoZW1hVHlwZSA9PT0gJ2Jvb2xlYW4nKSB7IHJldHVybiAnY2hlY2tib3gnOyB9XG4gICAgaWYgKHNjaGVtYVR5cGUgPT09ICdvYmplY3QnKSB7XG4gICAgICBpZiAoaGFzT3duKHNjaGVtYSwgJ3Byb3BlcnRpZXMnKSB8fCBoYXNPd24oc2NoZW1hLCAnYWRkaXRpb25hbFByb3BlcnRpZXMnKSkge1xuICAgICAgICByZXR1cm4gJ3NlY3Rpb24nO1xuICAgICAgfVxuICAgICAgLy8gVE9ETzogRmlndXJlIG91dCBob3cgdG8gaGFuZGxlIGFkZGl0aW9uYWxQcm9wZXJ0aWVzXG4gICAgICBpZiAoaGFzT3duKHNjaGVtYSwgJyRyZWYnKSkgeyByZXR1cm4gJyRyZWYnOyB9XG4gICAgfVxuICAgIGlmIChzY2hlbWFUeXBlID09PSAnYXJyYXknKSB7XG4gICAgICBsZXQgaXRlbXNPYmplY3QgPSBKc29uUG9pbnRlci5nZXRGaXJzdChbXG4gICAgICAgIFtzY2hlbWEsICcvaXRlbXMnXSxcbiAgICAgICAgW3NjaGVtYSwgJy9hZGRpdGlvbmFsSXRlbXMnXVxuICAgICAgXSkgfHwge307XG4gICAgICByZXR1cm4gaGFzT3duKGl0ZW1zT2JqZWN0LCAnZW51bScpICYmIHNjaGVtYS5tYXhJdGVtcyAhPT0gMSA/XG4gICAgICAgIGNoZWNrSW5saW5lVHlwZSgnY2hlY2tib3hlcycsIHNjaGVtYSwgbGF5b3V0Tm9kZSkgOiAnYXJyYXknO1xuICAgIH1cbiAgICBpZiAoc2NoZW1hVHlwZSA9PT0gJ251bGwnKSB7IHJldHVybiAnbm9uZSc7IH1cbiAgICBpZiAoSnNvblBvaW50ZXIuaGFzKGxheW91dE5vZGUsICcvb3B0aW9ucy90aXRsZU1hcCcpIHx8XG4gICAgICBoYXNPd24oc2NoZW1hLCAnZW51bScpIHx8IGdldFRpdGxlTWFwRnJvbU9uZU9mKHNjaGVtYSwgbnVsbCwgdHJ1ZSlcbiAgICApIHsgcmV0dXJuICdzZWxlY3QnOyB9XG4gICAgaWYgKHNjaGVtYVR5cGUgPT09ICdudW1iZXInIHx8IHNjaGVtYVR5cGUgPT09ICdpbnRlZ2VyJykge1xuICAgICAgcmV0dXJuIChzY2hlbWFUeXBlID09PSAnaW50ZWdlcicgfHwgaGFzT3duKHNjaGVtYSwgJ211bHRpcGxlT2YnKSkgJiZcbiAgICAgICAgaGFzT3duKHNjaGVtYSwgJ21heGltdW0nKSAmJiBoYXNPd24oc2NoZW1hLCAnbWluaW11bScpID8gJ3JhbmdlJyA6IHNjaGVtYVR5cGU7XG4gICAgfVxuICAgIGlmIChzY2hlbWFUeXBlID09PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgJ2NvbG9yJzogJ2NvbG9yJyxcbiAgICAgICAgJ2RhdGUnOiAnZGF0ZScsXG4gICAgICAgICdkYXRlLXRpbWUnOiAnZGF0ZXRpbWUtbG9jYWwnLFxuICAgICAgICAnZW1haWwnOiAnZW1haWwnLFxuICAgICAgICAndXJpJzogJ3VybCcsXG4gICAgICB9W3NjaGVtYS5mb3JtYXRdIHx8ICd0ZXh0JztcbiAgICB9XG4gIH1cbiAgaWYgKGhhc093bihzY2hlbWEsICckcmVmJykpIHsgcmV0dXJuICckcmVmJzsgfVxuICBpZiAoaXNBcnJheShzY2hlbWEub25lT2YpIHx8IGlzQXJyYXkoc2NoZW1hLmFueU9mKSkgeyByZXR1cm4gJ29uZS1vZic7IH1cbiAgY29uc29sZS5lcnJvcihgZ2V0SW5wdXRUeXBlIGVycm9yOiBVbmFibGUgdG8gZGV0ZXJtaW5lIGlucHV0IHR5cGUgZm9yICR7c2NoZW1hVHlwZX1gKTtcbiAgY29uc29sZS5lcnJvcignc2NoZW1hJywgc2NoZW1hKTtcbiAgaWYgKGxheW91dE5vZGUpIHsgY29uc29sZS5lcnJvcignbGF5b3V0Tm9kZScsIGxheW91dE5vZGUpOyB9XG4gIHJldHVybiAnbm9uZSc7XG59XG5cbi8qKlxuICogJ2NoZWNrSW5saW5lVHlwZScgZnVuY3Rpb25cbiAqXG4gKiBDaGVja3MgbGF5b3V0IGFuZCBzY2hlbWEgbm9kZXMgZm9yICdpbmxpbmU6IHRydWUnLCBhbmQgY29udmVydHNcbiAqICdyYWRpb3MnIG9yICdjaGVja2JveGVzJyB0byAncmFkaW9zLWlubGluZScgb3IgJ2NoZWNrYm94ZXMtaW5saW5lJ1xuICpcbiAqIC8vICB7IHN0cmluZyB9IGNvbnRyb2xUeXBlIC1cbiAqIC8vICAgc2NoZW1hIC1cbiAqIC8vICB7IGFueSA9IG51bGwgfSBsYXlvdXROb2RlIC1cbiAqIC8vIHsgc3RyaW5nIH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNoZWNrSW5saW5lVHlwZShjb250cm9sVHlwZSwgc2NoZW1hLCBsYXlvdXROb2RlOiBhbnkgPSBudWxsKSB7XG4gIGlmICghaXNTdHJpbmcoY29udHJvbFR5cGUpIHx8IChcbiAgICBjb250cm9sVHlwZS5zbGljZSgwLCA4KSAhPT0gJ2NoZWNrYm94JyAmJiBjb250cm9sVHlwZS5zbGljZSgwLCA1KSAhPT0gJ3JhZGlvJ1xuICApKSB7XG4gICAgcmV0dXJuIGNvbnRyb2xUeXBlO1xuICB9XG4gIGlmIChcbiAgICBKc29uUG9pbnRlci5nZXRGaXJzdChbXG4gICAgICBbbGF5b3V0Tm9kZSwgJy9pbmxpbmUnXSxcbiAgICAgIFtsYXlvdXROb2RlLCAnL29wdGlvbnMvaW5saW5lJ10sXG4gICAgICBbc2NoZW1hLCAnL2lubGluZSddLFxuICAgICAgW3NjaGVtYSwgJy94LXNjaGVtYS1mb3JtL2lubGluZSddLFxuICAgICAgW3NjaGVtYSwgJy94LXNjaGVtYS1mb3JtL29wdGlvbnMvaW5saW5lJ10sXG4gICAgICBbc2NoZW1hLCAnL3gtc2NoZW1hLWZvcm0vd2lkZ2V0L2lubGluZSddLFxuICAgICAgW3NjaGVtYSwgJy94LXNjaGVtYS1mb3JtL3dpZGdldC9jb21wb25lbnQvaW5saW5lJ10sXG4gICAgICBbc2NoZW1hLCAnL3gtc2NoZW1hLWZvcm0vd2lkZ2V0L2NvbXBvbmVudC9vcHRpb25zL2lubGluZSddLFxuICAgICAgW3NjaGVtYSwgJy93aWRnZXQvaW5saW5lJ10sXG4gICAgICBbc2NoZW1hLCAnL3dpZGdldC9jb21wb25lbnQvaW5saW5lJ10sXG4gICAgICBbc2NoZW1hLCAnL3dpZGdldC9jb21wb25lbnQvb3B0aW9ucy9pbmxpbmUnXSxcbiAgICBdKSA9PT0gdHJ1ZVxuICApIHtcbiAgICByZXR1cm4gY29udHJvbFR5cGUuc2xpY2UoMCwgNSkgPT09ICdyYWRpbycgP1xuICAgICAgJ3JhZGlvcy1pbmxpbmUnIDogJ2NoZWNrYm94ZXMtaW5saW5lJztcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gY29udHJvbFR5cGU7XG4gIH1cbn1cblxuLyoqXG4gKiAnaXNJbnB1dFJlcXVpcmVkJyBmdW5jdGlvblxuICpcbiAqIENoZWNrcyBhIEpTT04gU2NoZW1hIHRvIHNlZSBpZiBhbiBpdGVtIGlzIHJlcXVpcmVkXG4gKlxuICogLy8gICBzY2hlbWEgLSB0aGUgc2NoZW1hIHRvIGNoZWNrXG4gKiAvLyAgeyBzdHJpbmcgfSBzY2hlbWFQb2ludGVyIC0gdGhlIHBvaW50ZXIgdG8gdGhlIGl0ZW0gdG8gY2hlY2tcbiAqIC8vIHsgYm9vbGVhbiB9IC0gdHJ1ZSBpZiB0aGUgaXRlbSBpcyByZXF1aXJlZCwgZmFsc2UgaWYgbm90XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0lucHV0UmVxdWlyZWQoc2NoZW1hLCBzY2hlbWFQb2ludGVyKSB7XG4gIGlmICghaXNPYmplY3Qoc2NoZW1hKSkge1xuICAgIGNvbnNvbGUuZXJyb3IoJ2lzSW5wdXRSZXF1aXJlZCBlcnJvcjogSW5wdXQgc2NoZW1hIG11c3QgYmUgYW4gb2JqZWN0LicpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBjb25zdCBsaXN0UG9pbnRlckFycmF5ID0gSnNvblBvaW50ZXIucGFyc2Uoc2NoZW1hUG9pbnRlcik7XG4gIGlmIChpc0FycmF5KGxpc3RQb2ludGVyQXJyYXkpKSB7XG4gICAgaWYgKCFsaXN0UG9pbnRlckFycmF5Lmxlbmd0aCkgeyByZXR1cm4gc2NoZW1hLnJlcXVpcmVkID09PSB0cnVlOyB9XG4gICAgY29uc3Qga2V5TmFtZSA9IGxpc3RQb2ludGVyQXJyYXkucG9wKCk7XG4gICAgY29uc3QgbmV4dFRvTGFzdEtleSA9IGxpc3RQb2ludGVyQXJyYXlbbGlzdFBvaW50ZXJBcnJheS5sZW5ndGggLSAxXTtcbiAgICBpZiAoWydwcm9wZXJ0aWVzJywgJ2FkZGl0aW9uYWxQcm9wZXJ0aWVzJywgJ3BhdHRlcm5Qcm9wZXJ0aWVzJywgJ2l0ZW1zJywgJ2FkZGl0aW9uYWxJdGVtcyddXG4gICAgICAuaW5jbHVkZXMobmV4dFRvTGFzdEtleSlcbiAgICApIHtcbiAgICAgIGxpc3RQb2ludGVyQXJyYXkucG9wKCk7XG4gICAgfVxuICAgIGNvbnN0IHBhcmVudFNjaGVtYSA9IEpzb25Qb2ludGVyLmdldChzY2hlbWEsIGxpc3RQb2ludGVyQXJyYXkpIHx8IHt9O1xuICAgIGlmIChpc0FycmF5KHBhcmVudFNjaGVtYS5yZXF1aXJlZCkpIHtcbiAgICAgIHJldHVybiBwYXJlbnRTY2hlbWEucmVxdWlyZWQuaW5jbHVkZXMoa2V5TmFtZSk7XG4gICAgfVxuICAgIGlmIChwYXJlbnRTY2hlbWEudHlwZSA9PT0gJ2FycmF5Jykge1xuICAgICAgcmV0dXJuIGhhc093bihwYXJlbnRTY2hlbWEsICdtaW5JdGVtcycpICYmXG4gICAgICAgIGlzTnVtYmVyKGtleU5hbWUpICYmXG4gICAgICAgICtwYXJlbnRTY2hlbWEubWluSXRlbXMgPiAra2V5TmFtZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufTtcblxuLyoqXG4gKiAndXBkYXRlSW5wdXRPcHRpb25zJyBmdW5jdGlvblxuICpcbiAqIC8vICAgbGF5b3V0Tm9kZVxuICogLy8gICBzY2hlbWFcbiAqIC8vICAganNmXG4gKiAvLyB7IHZvaWQgfVxuICovXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlSW5wdXRPcHRpb25zKGxheW91dE5vZGUsIHNjaGVtYSwganNmKSB7XG4gIGlmICghaXNPYmplY3QobGF5b3V0Tm9kZSkgfHwgIWlzT2JqZWN0KGxheW91dE5vZGUub3B0aW9ucykpIHsgcmV0dXJuOyB9XG5cbiAgLy8gU2V0IGFsbCBvcHRpb24gdmFsdWVzIGluIGxheW91dE5vZGUub3B0aW9uc1xuICBsZXQgbmV3T3B0aW9uczogYW55ID0geyB9O1xuICBjb25zdCBmaXhVaUtleXMgPSBrZXkgPT4ga2V5LnNsaWNlKDAsIDMpLnRvTG93ZXJDYXNlKCkgPT09ICd1aTonID8ga2V5LnNsaWNlKDMpIDoga2V5O1xuICBtZXJnZUZpbHRlcmVkT2JqZWN0KG5ld09wdGlvbnMsIGpzZi5mb3JtT3B0aW9ucy5kZWZhdXRXaWRnZXRPcHRpb25zLCBbXSwgZml4VWlLZXlzKTtcbiAgWyBbIEpzb25Qb2ludGVyLmdldChzY2hlbWEsICcvdWk6d2lkZ2V0L29wdGlvbnMnKSwgW10gXSxcbiAgICBbIEpzb25Qb2ludGVyLmdldChzY2hlbWEsICcvdWk6d2lkZ2V0JyksIFtdIF0sXG4gICAgWyBzY2hlbWEsIFtcbiAgICAgICdhZGRpdGlvbmFsUHJvcGVydGllcycsICdhZGRpdGlvbmFsSXRlbXMnLCAncHJvcGVydGllcycsICdpdGVtcycsXG4gICAgICAncmVxdWlyZWQnLCAndHlwZScsICd4LXNjaGVtYS1mb3JtJywgJyRyZWYnXG4gICAgXSBdLFxuICAgIFsgSnNvblBvaW50ZXIuZ2V0KHNjaGVtYSwgJy94LXNjaGVtYS1mb3JtL29wdGlvbnMnKSwgW10gXSxcbiAgICBbIEpzb25Qb2ludGVyLmdldChzY2hlbWEsICcveC1zY2hlbWEtZm9ybScpLCBbJ2l0ZW1zJywgJ29wdGlvbnMnXSBdLFxuICAgIFsgbGF5b3V0Tm9kZSwgW1xuICAgICAgJ19pZCcsICckcmVmJywgJ2FycmF5SXRlbScsICdhcnJheUl0ZW1UeXBlJywgJ2RhdGFQb2ludGVyJywgJ2RhdGFUeXBlJyxcbiAgICAgICdpdGVtcycsICdrZXknLCAnbmFtZScsICdvcHRpb25zJywgJ3JlY3Vyc2l2ZVJlZmVyZW5jZScsICd0eXBlJywgJ3dpZGdldCdcbiAgICBdIF0sXG4gICAgWyBsYXlvdXROb2RlLm9wdGlvbnMsIFtdIF0sXG4gIF0uZm9yRWFjaCgoWyBvYmplY3QsIGV4Y2x1ZGVLZXlzIF0pID0+XG4gICAgbWVyZ2VGaWx0ZXJlZE9iamVjdChuZXdPcHRpb25zLCBvYmplY3QsIGV4Y2x1ZGVLZXlzLCBmaXhVaUtleXMpXG4gICk7XG4gIGlmICghaGFzT3duKG5ld09wdGlvbnMsICd0aXRsZU1hcCcpKSB7XG4gICAgbGV0IG5ld1RpdGxlTWFwOiBhbnkgPSBudWxsO1xuICAgIG5ld1RpdGxlTWFwID0gZ2V0VGl0bGVNYXBGcm9tT25lT2Yoc2NoZW1hLCBuZXdPcHRpb25zLmZsYXRMaXN0KTtcbiAgICBpZiAobmV3VGl0bGVNYXApIHsgbmV3T3B0aW9ucy50aXRsZU1hcCA9IG5ld1RpdGxlTWFwOyB9XG4gICAgaWYgKCFoYXNPd24obmV3T3B0aW9ucywgJ3RpdGxlTWFwJykgJiYgIWhhc093bihuZXdPcHRpb25zLCAnZW51bScpICYmIGhhc093bihzY2hlbWEsICdpdGVtcycpKSB7XG4gICAgICBpZiAoSnNvblBvaW50ZXIuaGFzKHNjaGVtYSwgJy9pdGVtcy90aXRsZU1hcCcpKSB7XG4gICAgICAgIG5ld09wdGlvbnMudGl0bGVNYXAgPSBzY2hlbWEuaXRlbXMudGl0bGVNYXA7XG4gICAgICB9IGVsc2UgaWYgKEpzb25Qb2ludGVyLmhhcyhzY2hlbWEsICcvaXRlbXMvZW51bScpKSB7XG4gICAgICAgIG5ld09wdGlvbnMuZW51bSA9IHNjaGVtYS5pdGVtcy5lbnVtO1xuICAgICAgICBpZiAoIWhhc093bihuZXdPcHRpb25zLCAnZW51bU5hbWVzJykgJiYgSnNvblBvaW50ZXIuaGFzKHNjaGVtYSwgJy9pdGVtcy9lbnVtTmFtZXMnKSkge1xuICAgICAgICAgIG5ld09wdGlvbnMuZW51bU5hbWVzID0gc2NoZW1hLml0ZW1zLmVudW1OYW1lcztcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChKc29uUG9pbnRlci5oYXMoc2NoZW1hLCAnL2l0ZW1zL29uZU9mJykpIHtcbiAgICAgICAgbmV3VGl0bGVNYXAgPSBnZXRUaXRsZU1hcEZyb21PbmVPZihzY2hlbWEuaXRlbXMsIG5ld09wdGlvbnMuZmxhdExpc3QpO1xuICAgICAgICBpZiAobmV3VGl0bGVNYXApIHsgbmV3T3B0aW9ucy50aXRsZU1hcCA9IG5ld1RpdGxlTWFwOyB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gSWYgc2NoZW1hIHR5cGUgaXMgaW50ZWdlciwgZW5mb3JjZSBieSBzZXR0aW5nIG11bHRpcGxlT2YgPSAxXG4gIGlmIChzY2hlbWEudHlwZSA9PT0gJ2ludGVnZXInICYmICFoYXNWYWx1ZShuZXdPcHRpb25zLm11bHRpcGxlT2YpKSB7XG4gICAgbmV3T3B0aW9ucy5tdWx0aXBsZU9mID0gMTtcbiAgfVxuXG4gIC8vIENvcHkgYW55IHR5cGVhaGVhZCB3b3JkIGxpc3RzIHRvIG9wdGlvbnMudHlwZWFoZWFkLnNvdXJjZVxuICBpZiAoSnNvblBvaW50ZXIuaGFzKG5ld09wdGlvbnMsICcvYXV0b2NvbXBsZXRlL3NvdXJjZScpKSB7XG4gICAgbmV3T3B0aW9ucy50eXBlYWhlYWQgPSBuZXdPcHRpb25zLmF1dG9jb21wbGV0ZTtcbiAgfSBlbHNlIGlmIChKc29uUG9pbnRlci5oYXMobmV3T3B0aW9ucywgJy90YWdzaW5wdXQvc291cmNlJykpIHtcbiAgICBuZXdPcHRpb25zLnR5cGVhaGVhZCA9IG5ld09wdGlvbnMudGFnc2lucHV0O1xuICB9IGVsc2UgaWYgKEpzb25Qb2ludGVyLmhhcyhuZXdPcHRpb25zLCAnL3RhZ3NpbnB1dC90eXBlYWhlYWQvc291cmNlJykpIHtcbiAgICBuZXdPcHRpb25zLnR5cGVhaGVhZCA9IG5ld09wdGlvbnMudGFnc2lucHV0LnR5cGVhaGVhZDtcbiAgfVxuXG4gIGxheW91dE5vZGUub3B0aW9ucyA9IG5ld09wdGlvbnM7XG59XG5cbi8qKlxuICogJ2dldFRpdGxlTWFwRnJvbU9uZU9mJyBmdW5jdGlvblxuICpcbiAqIC8vICB7IHNjaGVtYSB9IHNjaGVtYVxuICogLy8gIHsgYm9vbGVhbiA9IG51bGwgfSBmbGF0TGlzdFxuICogLy8gIHsgYm9vbGVhbiA9IGZhbHNlIH0gdmFsaWRhdGVPbmx5XG4gKiAvLyB7IHZhbGlkYXRvcnMgfVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0VGl0bGVNYXBGcm9tT25lT2YoXG4gIHNjaGVtYTogYW55ID0ge30sIGZsYXRMaXN0OiBib29sZWFuID0gbnVsbCwgdmFsaWRhdGVPbmx5ID0gZmFsc2Vcbikge1xuICBsZXQgdGl0bGVNYXAgPSBudWxsO1xuICBjb25zdCBvbmVPZiA9IHNjaGVtYS5vbmVPZiB8fCBzY2hlbWEuYW55T2YgfHwgbnVsbDtcbiAgaWYgKGlzQXJyYXkob25lT2YpICYmIG9uZU9mLmV2ZXJ5KGl0ZW0gPT4gaXRlbS50aXRsZSkpIHtcbiAgICBpZiAob25lT2YuZXZlcnkoaXRlbSA9PiBpc0FycmF5KGl0ZW0uZW51bSkgJiYgaXRlbS5lbnVtLmxlbmd0aCA9PT0gMSkpIHtcbiAgICAgIGlmICh2YWxpZGF0ZU9ubHkpIHsgcmV0dXJuIHRydWU7IH1cbiAgICAgIHRpdGxlTWFwID0gb25lT2YubWFwKGl0ZW0gPT4gKHsgbmFtZTogaXRlbS50aXRsZSwgdmFsdWU6IGl0ZW0uZW51bVswXSB9KSk7XG4gICAgfSBlbHNlIGlmIChvbmVPZi5ldmVyeShpdGVtID0+IGl0ZW0uY29uc3QpKSB7XG4gICAgICBpZiAodmFsaWRhdGVPbmx5KSB7IHJldHVybiB0cnVlOyB9XG4gICAgICB0aXRsZU1hcCA9IG9uZU9mLm1hcChpdGVtID0+ICh7IG5hbWU6IGl0ZW0udGl0bGUsIHZhbHVlOiBpdGVtLmNvbnN0IH0pKTtcbiAgICB9XG5cbiAgICAvLyBpZiBmbGF0TGlzdCAhPT0gZmFsc2UgYW5kIHNvbWUgaXRlbXMgaGF2ZSBjb2xvbnMsIG1ha2UgZ3JvdXBlZCBtYXBcbiAgICBpZiAoZmxhdExpc3QgIT09IGZhbHNlICYmICh0aXRsZU1hcCB8fCBbXSlcbiAgICAgIC5maWx0ZXIodGl0bGUgPT4gKCh0aXRsZSB8fCB7fSkubmFtZSB8fCAnJykuaW5kZXhPZignOiAnKSkubGVuZ3RoID4gMVxuICAgICkge1xuXG4gICAgICAvLyBTcGxpdCBuYW1lIG9uIGZpcnN0IGNvbG9uIHRvIGNyZWF0ZSBncm91cGVkIG1hcCAobmFtZSAtPiBncm91cDogbmFtZSlcbiAgICAgIGNvbnN0IG5ld1RpdGxlTWFwID0gdGl0bGVNYXAubWFwKHRpdGxlID0+IHtcbiAgICAgICAgbGV0IFtncm91cCwgbmFtZV0gPSB0aXRsZS5uYW1lLnNwbGl0KC86ICguKykvKTtcbiAgICAgICAgcmV0dXJuIGdyb3VwICYmIG5hbWUgPyB7IC4uLnRpdGxlLCBncm91cCwgbmFtZSB9IDogdGl0bGU7XG4gICAgICB9KTtcblxuICAgICAgLy8gSWYgZmxhdExpc3QgPT09IHRydWUgb3IgYXQgbGVhc3Qgb25lIGdyb3VwIGhhcyBtdWx0aXBsZSBpdGVtcywgdXNlIGdyb3VwZWQgbWFwXG4gICAgICBpZiAoZmxhdExpc3QgPT09IHRydWUgfHwgbmV3VGl0bGVNYXAuc29tZSgodGl0bGUsIGluZGV4KSA9PiBpbmRleCAmJlxuICAgICAgICBoYXNPd24odGl0bGUsICdncm91cCcpICYmIHRpdGxlLmdyb3VwID09PSBuZXdUaXRsZU1hcFtpbmRleCAtIDFdLmdyb3VwXG4gICAgICApKSB7XG4gICAgICAgIHRpdGxlTWFwID0gbmV3VGl0bGVNYXA7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiB2YWxpZGF0ZU9ubHkgPyBmYWxzZSA6IHRpdGxlTWFwO1xufVxuXG4vKipcbiAqICdnZXRDb250cm9sVmFsaWRhdG9ycycgZnVuY3Rpb25cbiAqXG4gKiAvLyAgc2NoZW1hXG4gKiAvLyB7IHZhbGlkYXRvcnMgfVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q29udHJvbFZhbGlkYXRvcnMoc2NoZW1hKSB7XG4gIGlmICghaXNPYmplY3Qoc2NoZW1hKSkgeyByZXR1cm4gbnVsbDsgfVxuICBsZXQgdmFsaWRhdG9yczogYW55ID0geyB9O1xuICBpZiAoaGFzT3duKHNjaGVtYSwgJ3R5cGUnKSkge1xuICAgIHN3aXRjaCAoc2NoZW1hLnR5cGUpIHtcbiAgICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICAgIGZvckVhY2goWydwYXR0ZXJuJywgJ2Zvcm1hdCcsICdtaW5MZW5ndGgnLCAnbWF4TGVuZ3RoJ10sIChwcm9wKSA9PiB7XG4gICAgICAgICAgaWYgKGhhc093bihzY2hlbWEsIHByb3ApKSB7IHZhbGlkYXRvcnNbcHJvcF0gPSBbc2NoZW1hW3Byb3BdXTsgfVxuICAgICAgICB9KTtcbiAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnbnVtYmVyJzogY2FzZSAnaW50ZWdlcic6XG4gICAgICAgIGZvckVhY2goWydNaW5pbXVtJywgJ01heGltdW0nXSwgKHVjTGltaXQpID0+IHtcbiAgICAgICAgICBsZXQgZUxpbWl0ID0gJ2V4Y2x1c2l2ZScgKyB1Y0xpbWl0O1xuICAgICAgICAgIGxldCBsaW1pdCA9IHVjTGltaXQudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICBpZiAoaGFzT3duKHNjaGVtYSwgbGltaXQpKSB7XG4gICAgICAgICAgICBsZXQgZXhjbHVzaXZlID0gaGFzT3duKHNjaGVtYSwgZUxpbWl0KSAmJiBzY2hlbWFbZUxpbWl0XSA9PT0gdHJ1ZTtcbiAgICAgICAgICAgIHZhbGlkYXRvcnNbbGltaXRdID0gW3NjaGVtYVtsaW1pdF0sIGV4Y2x1c2l2ZV07XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgZm9yRWFjaChbJ211bHRpcGxlT2YnLCAndHlwZSddLCAocHJvcCkgPT4ge1xuICAgICAgICAgIGlmIChoYXNPd24oc2NoZW1hLCBwcm9wKSkgeyB2YWxpZGF0b3JzW3Byb3BdID0gW3NjaGVtYVtwcm9wXV07IH1cbiAgICAgICAgfSk7XG4gICAgICBicmVhaztcbiAgICAgIGNhc2UgJ29iamVjdCc6XG4gICAgICAgIGZvckVhY2goWydtaW5Qcm9wZXJ0aWVzJywgJ21heFByb3BlcnRpZXMnLCAnZGVwZW5kZW5jaWVzJ10sIChwcm9wKSA9PiB7XG4gICAgICAgICAgaWYgKGhhc093bihzY2hlbWEsIHByb3ApKSB7IHZhbGlkYXRvcnNbcHJvcF0gPSBbc2NoZW1hW3Byb3BdXTsgfVxuICAgICAgICB9KTtcbiAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnYXJyYXknOlxuICAgICAgICBmb3JFYWNoKFsnbWluSXRlbXMnLCAnbWF4SXRlbXMnLCAndW5pcXVlSXRlbXMnXSwgKHByb3ApID0+IHtcbiAgICAgICAgICBpZiAoaGFzT3duKHNjaGVtYSwgcHJvcCkpIHsgdmFsaWRhdG9yc1twcm9wXSA9IFtzY2hlbWFbcHJvcF1dOyB9XG4gICAgICAgIH0pO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIGlmIChoYXNPd24oc2NoZW1hLCAnZW51bScpKSB7IHZhbGlkYXRvcnMuZW51bSA9IFtzY2hlbWEuZW51bV07IH1cbiAgcmV0dXJuIHZhbGlkYXRvcnM7XG59XG5cbi8qKlxuICogJ3Jlc29sdmVTY2hlbWFSZWZlcmVuY2VzJyBmdW5jdGlvblxuICpcbiAqIEZpbmQgYWxsICRyZWYgbGlua3MgaW4gc2NoZW1hIGFuZCBzYXZlIGxpbmtzIGFuZCByZWZlcmVuY2VkIHNjaGVtYXMgaW5cbiAqIHNjaGVtYVJlZkxpYnJhcnksIHNjaGVtYVJlY3Vyc2l2ZVJlZk1hcCwgYW5kIGRhdGFSZWN1cnNpdmVSZWZNYXBcbiAqXG4gKiAvLyAgc2NoZW1hXG4gKiAvLyAgc2NoZW1hUmVmTGlicmFyeVxuICogLy8geyBNYXA8c3RyaW5nLCBzdHJpbmc+IH0gc2NoZW1hUmVjdXJzaXZlUmVmTWFwXG4gKiAvLyB7IE1hcDxzdHJpbmcsIHN0cmluZz4gfSBkYXRhUmVjdXJzaXZlUmVmTWFwXG4gKiAvLyB7IE1hcDxzdHJpbmcsIG51bWJlcj4gfSBhcnJheU1hcFxuICogLy8gXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZXNvbHZlU2NoZW1hUmVmZXJlbmNlcyhcbiAgc2NoZW1hLCBzY2hlbWFSZWZMaWJyYXJ5LCBzY2hlbWFSZWN1cnNpdmVSZWZNYXAsIGRhdGFSZWN1cnNpdmVSZWZNYXAsIGFycmF5TWFwXG4pIHtcbiAgaWYgKCFpc09iamVjdChzY2hlbWEpKSB7XG4gICAgY29uc29sZS5lcnJvcigncmVzb2x2ZVNjaGVtYVJlZmVyZW5jZXMgZXJyb3I6IHNjaGVtYSBtdXN0IGJlIGFuIG9iamVjdC4nKTtcbiAgICByZXR1cm47XG4gIH1cbiAgY29uc3QgcmVmTGlua3MgPSBuZXcgU2V0PHN0cmluZz4oKTtcbiAgY29uc3QgcmVmTWFwU2V0ID0gbmV3IFNldDxzdHJpbmc+KCk7XG4gIGNvbnN0IHJlZk1hcCA9IG5ldyBNYXA8c3RyaW5nLCBzdHJpbmc+KCk7XG4gIGNvbnN0IHJlY3Vyc2l2ZVJlZk1hcCA9IG5ldyBNYXA8c3RyaW5nLCBzdHJpbmc+KCk7XG4gIGNvbnN0IHJlZkxpYnJhcnk6IGFueSA9IHt9O1xuXG4gIC8vIFNlYXJjaCBzY2hlbWEgZm9yIGFsbCAkcmVmIGxpbmtzLCBhbmQgYnVpbGQgZnVsbCByZWZMaWJyYXJ5XG4gIEpzb25Qb2ludGVyLmZvckVhY2hEZWVwKHNjaGVtYSwgKHN1YlNjaGVtYSwgc3ViU2NoZW1hUG9pbnRlcikgPT4ge1xuICAgIGlmIChoYXNPd24oc3ViU2NoZW1hLCAnJHJlZicpICYmIGlzU3RyaW5nKHN1YlNjaGVtYVsnJHJlZiddKSkge1xuICAgICAgY29uc3QgcmVmUG9pbnRlciA9IEpzb25Qb2ludGVyLmNvbXBpbGUoc3ViU2NoZW1hWyckcmVmJ10pO1xuICAgICAgcmVmTGlua3MuYWRkKHJlZlBvaW50ZXIpO1xuICAgICAgcmVmTWFwU2V0LmFkZChzdWJTY2hlbWFQb2ludGVyICsgJ35+JyArIHJlZlBvaW50ZXIpO1xuICAgICAgcmVmTWFwLnNldChzdWJTY2hlbWFQb2ludGVyLCByZWZQb2ludGVyKTtcbiAgICB9XG4gIH0pO1xuICByZWZMaW5rcy5mb3JFYWNoKHJlZiA9PiByZWZMaWJyYXJ5W3JlZl0gPSBnZXRTdWJTY2hlbWEoc2NoZW1hLCByZWYpKTtcblxuICAvLyBGb2xsb3cgYWxsIHJlZiBsaW5rcyBhbmQgc2F2ZSBpbiByZWZNYXBTZXQsXG4gIC8vIHRvIGZpbmQgYW55IG11bHRpLWxpbmsgcmVjdXJzaXZlIHJlZmVybmNlc1xuICBsZXQgY2hlY2tSZWZMaW5rcyA9IHRydWU7XG4gIHdoaWxlIChjaGVja1JlZkxpbmtzKSB7XG4gICAgY2hlY2tSZWZMaW5rcyA9IGZhbHNlO1xuICAgIEFycmF5LmZyb20ocmVmTWFwKS5mb3JFYWNoKChbZnJvbVJlZjEsIHRvUmVmMV0pID0+IEFycmF5LmZyb20ocmVmTWFwKVxuICAgICAgLmZpbHRlcigoW2Zyb21SZWYyLCB0b1JlZjJdKSA9PlxuICAgICAgICBKc29uUG9pbnRlci5pc1N1YlBvaW50ZXIodG9SZWYxLCBmcm9tUmVmMiwgdHJ1ZSkgJiZcbiAgICAgICAgIUpzb25Qb2ludGVyLmlzU3ViUG9pbnRlcih0b1JlZjIsIHRvUmVmMSwgdHJ1ZSkgJiZcbiAgICAgICAgIXJlZk1hcFNldC5oYXMoZnJvbVJlZjEgKyBmcm9tUmVmMi5zbGljZSh0b1JlZjEubGVuZ3RoKSArICd+ficgKyB0b1JlZjIpXG4gICAgICApXG4gICAgICAuZm9yRWFjaCgoW2Zyb21SZWYyLCB0b1JlZjJdKSA9PiB7XG4gICAgICAgIHJlZk1hcFNldC5hZGQoZnJvbVJlZjEgKyBmcm9tUmVmMi5zbGljZSh0b1JlZjEubGVuZ3RoKSArICd+ficgKyB0b1JlZjIpO1xuICAgICAgICBjaGVja1JlZkxpbmtzID0gdHJ1ZTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIC8vIEJ1aWxkIGZ1bGwgcmVjdXJzaXZlUmVmTWFwXG4gIC8vIEZpcnN0IHBhc3MgLSBzYXZlIGFsbCBpbnRlcm5hbGx5IHJlY3Vyc2l2ZSByZWZzIGZyb20gcmVmTWFwU2V0XG4gIEFycmF5LmZyb20ocmVmTWFwU2V0KVxuICAgIC5tYXAocmVmTGluayA9PiByZWZMaW5rLnNwbGl0KCd+ficpKVxuICAgIC5maWx0ZXIoKFtmcm9tUmVmLCB0b1JlZl0pID0+IEpzb25Qb2ludGVyLmlzU3ViUG9pbnRlcih0b1JlZiwgZnJvbVJlZikpXG4gICAgLmZvckVhY2goKFtmcm9tUmVmLCB0b1JlZl0pID0+IHJlY3Vyc2l2ZVJlZk1hcC5zZXQoZnJvbVJlZiwgdG9SZWYpKTtcbiAgLy8gU2Vjb25kIHBhc3MgLSBjcmVhdGUgcmVjdXJzaXZlIHZlcnNpb25zIG9mIGFueSBvdGhlciByZWZzIHRoYXQgbGluayB0byByZWN1cnNpdmUgcmVmc1xuICBBcnJheS5mcm9tKHJlZk1hcClcbiAgICAuZmlsdGVyKChbZnJvbVJlZjEsIHRvUmVmMV0pID0+IEFycmF5LmZyb20ocmVjdXJzaXZlUmVmTWFwLmtleXMoKSlcbiAgICAgIC5ldmVyeShmcm9tUmVmMiA9PiAhSnNvblBvaW50ZXIuaXNTdWJQb2ludGVyKGZyb21SZWYxLCBmcm9tUmVmMiwgdHJ1ZSkpXG4gICAgKVxuICAgIC5mb3JFYWNoKChbZnJvbVJlZjEsIHRvUmVmMV0pID0+IEFycmF5LmZyb20ocmVjdXJzaXZlUmVmTWFwKVxuICAgICAgLmZpbHRlcigoW2Zyb21SZWYyLCB0b1JlZjJdKSA9PlxuICAgICAgICAhcmVjdXJzaXZlUmVmTWFwLmhhcyhmcm9tUmVmMSArIGZyb21SZWYyLnNsaWNlKHRvUmVmMS5sZW5ndGgpKSAmJlxuICAgICAgICBKc29uUG9pbnRlci5pc1N1YlBvaW50ZXIodG9SZWYxLCBmcm9tUmVmMiwgdHJ1ZSkgJiZcbiAgICAgICAgIUpzb25Qb2ludGVyLmlzU3ViUG9pbnRlcih0b1JlZjEsIGZyb21SZWYxLCB0cnVlKVxuICAgICAgKVxuICAgICAgLmZvckVhY2goKFtmcm9tUmVmMiwgdG9SZWYyXSkgPT4gcmVjdXJzaXZlUmVmTWFwLnNldChcbiAgICAgICAgZnJvbVJlZjEgKyBmcm9tUmVmMi5zbGljZSh0b1JlZjEubGVuZ3RoKSxcbiAgICAgICAgZnJvbVJlZjEgKyB0b1JlZjIuc2xpY2UodG9SZWYxLmxlbmd0aClcbiAgICAgICkpXG4gICAgKTtcblxuICAvLyBDcmVhdGUgY29tcGlsZWQgc2NoZW1hIGJ5IHJlcGxhY2luZyBhbGwgbm9uLXJlY3Vyc2l2ZSAkcmVmIGxpbmtzIHdpdGhcbiAgLy8gdGhpZWlyIGxpbmtlZCBzY2hlbWFzIGFuZCwgd2hlcmUgcG9zc2libGUsIGNvbWJpbmluZyBzY2hlbWFzIGluIGFsbE9mIGFycmF5cy5cbiAgbGV0IGNvbXBpbGVkU2NoZW1hID0geyAuLi5zY2hlbWEgfTtcbiAgZGVsZXRlIGNvbXBpbGVkU2NoZW1hLmRlZmluaXRpb25zO1xuICBjb21waWxlZFNjaGVtYSA9XG4gICAgZ2V0U3ViU2NoZW1hKGNvbXBpbGVkU2NoZW1hLCAnJywgcmVmTGlicmFyeSwgcmVjdXJzaXZlUmVmTWFwKTtcblxuICAvLyBNYWtlIHN1cmUgYWxsIHJlbWFpbmluZyBzY2hlbWEgJHJlZnMgYXJlIHJlY3Vyc2l2ZSwgYW5kIGJ1aWxkIGZpbmFsXG4gIC8vIHNjaGVtYVJlZkxpYnJhcnksIHNjaGVtYVJlY3Vyc2l2ZVJlZk1hcCwgZGF0YVJlY3Vyc2l2ZVJlZk1hcCwgJiBhcnJheU1hcFxuICBKc29uUG9pbnRlci5mb3JFYWNoRGVlcChjb21waWxlZFNjaGVtYSwgKHN1YlNjaGVtYSwgc3ViU2NoZW1hUG9pbnRlcikgPT4ge1xuICAgIGlmIChpc1N0cmluZyhzdWJTY2hlbWFbJyRyZWYnXSkpIHtcbiAgICAgIGxldCByZWZQb2ludGVyID0gSnNvblBvaW50ZXIuY29tcGlsZShzdWJTY2hlbWFbJyRyZWYnXSk7XG4gICAgICBpZiAoIUpzb25Qb2ludGVyLmlzU3ViUG9pbnRlcihyZWZQb2ludGVyLCBzdWJTY2hlbWFQb2ludGVyLCB0cnVlKSkge1xuICAgICAgICByZWZQb2ludGVyID0gcmVtb3ZlUmVjdXJzaXZlUmVmZXJlbmNlcyhzdWJTY2hlbWFQb2ludGVyLCByZWN1cnNpdmVSZWZNYXApO1xuICAgICAgICBKc29uUG9pbnRlci5zZXQoY29tcGlsZWRTY2hlbWEsIHN1YlNjaGVtYVBvaW50ZXIsIHsgJHJlZjogYCMke3JlZlBvaW50ZXJ9YCB9KTtcbiAgICAgIH1cbiAgICAgIGlmICghaGFzT3duKHNjaGVtYVJlZkxpYnJhcnksICdyZWZQb2ludGVyJykpIHtcbiAgICAgICAgc2NoZW1hUmVmTGlicmFyeVtyZWZQb2ludGVyXSA9ICFyZWZQb2ludGVyLmxlbmd0aCA/IGNvbXBpbGVkU2NoZW1hIDpcbiAgICAgICAgICBnZXRTdWJTY2hlbWEoY29tcGlsZWRTY2hlbWEsIHJlZlBvaW50ZXIsIHNjaGVtYVJlZkxpYnJhcnksIHJlY3Vyc2l2ZVJlZk1hcCk7XG4gICAgICB9XG4gICAgICBpZiAoIXNjaGVtYVJlY3Vyc2l2ZVJlZk1hcC5oYXMoc3ViU2NoZW1hUG9pbnRlcikpIHtcbiAgICAgICAgc2NoZW1hUmVjdXJzaXZlUmVmTWFwLnNldChzdWJTY2hlbWFQb2ludGVyLCByZWZQb2ludGVyKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGZyb21EYXRhUmVmID0gSnNvblBvaW50ZXIudG9EYXRhUG9pbnRlcihzdWJTY2hlbWFQb2ludGVyLCBjb21waWxlZFNjaGVtYSk7XG4gICAgICBpZiAoIWRhdGFSZWN1cnNpdmVSZWZNYXAuaGFzKGZyb21EYXRhUmVmKSkge1xuICAgICAgICBjb25zdCB0b0RhdGFSZWYgPSBKc29uUG9pbnRlci50b0RhdGFQb2ludGVyKHJlZlBvaW50ZXIsIGNvbXBpbGVkU2NoZW1hKTtcbiAgICAgICAgZGF0YVJlY3Vyc2l2ZVJlZk1hcC5zZXQoZnJvbURhdGFSZWYsIHRvRGF0YVJlZik7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChzdWJTY2hlbWEudHlwZSA9PT0gJ2FycmF5JyAmJlxuICAgICAgKGhhc093bihzdWJTY2hlbWEsICdpdGVtcycpIHx8IGhhc093bihzdWJTY2hlbWEsICdhZGRpdGlvbmFsSXRlbXMnKSlcbiAgICApIHtcbiAgICAgIGNvbnN0IGRhdGFQb2ludGVyID0gSnNvblBvaW50ZXIudG9EYXRhUG9pbnRlcihzdWJTY2hlbWFQb2ludGVyLCBjb21waWxlZFNjaGVtYSk7XG4gICAgICBpZiAoIWFycmF5TWFwLmhhcyhkYXRhUG9pbnRlcikpIHtcbiAgICAgICAgY29uc3QgdHVwbGVJdGVtcyA9IGlzQXJyYXkoc3ViU2NoZW1hLml0ZW1zKSA/IHN1YlNjaGVtYS5pdGVtcy5sZW5ndGggOiAwO1xuICAgICAgICBhcnJheU1hcC5zZXQoZGF0YVBvaW50ZXIsIHR1cGxlSXRlbXMpO1xuICAgICAgfVxuICAgIH1cbiAgfSwgdHJ1ZSk7XG4gIHJldHVybiBjb21waWxlZFNjaGVtYTtcbn1cblxuLyoqXG4gKiAnZ2V0U3ViU2NoZW1hJyBmdW5jdGlvblxuICpcbiAqIC8vICAgc2NoZW1hXG4gKiAvLyAgeyBQb2ludGVyIH0gcG9pbnRlclxuICogLy8gIHsgb2JqZWN0IH0gc2NoZW1hUmVmTGlicmFyeVxuICogLy8gIHsgTWFwPHN0cmluZywgc3RyaW5nPiB9IHNjaGVtYVJlY3Vyc2l2ZVJlZk1hcFxuICogLy8gIHsgc3RyaW5nW10gPSBbXSB9IHVzZWRQb2ludGVyc1xuICogLy8gXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRTdWJTY2hlbWEoXG4gIHNjaGVtYSwgcG9pbnRlciwgc2NoZW1hUmVmTGlicmFyeSA9IG51bGwsXG4gIHNjaGVtYVJlY3Vyc2l2ZVJlZk1hcDogTWFwPHN0cmluZywgc3RyaW5nPiA9IG51bGwsIHVzZWRQb2ludGVyczogc3RyaW5nW10gPSBbXVxuKSB7XG4gIGlmICghc2NoZW1hUmVmTGlicmFyeSB8fCAhc2NoZW1hUmVjdXJzaXZlUmVmTWFwKSB7XG4gICAgcmV0dXJuIEpzb25Qb2ludGVyLmdldENvcHkoc2NoZW1hLCBwb2ludGVyKTtcbiAgfVxuICBpZiAodHlwZW9mIHBvaW50ZXIgIT09ICdzdHJpbmcnKSB7IHBvaW50ZXIgPSBKc29uUG9pbnRlci5jb21waWxlKHBvaW50ZXIpOyB9XG4gIHVzZWRQb2ludGVycyA9IFsgLi4udXNlZFBvaW50ZXJzLCBwb2ludGVyIF07XG4gIGxldCBuZXdTY2hlbWE6IGFueSA9IG51bGw7XG4gIGlmIChwb2ludGVyID09PSAnJykge1xuICAgIG5ld1NjaGVtYSA9IF8uY2xvbmVEZWVwKHNjaGVtYSk7XG4gIH0gZWxzZSB7XG4gICAgY29uc3Qgc2hvcnRQb2ludGVyID0gcmVtb3ZlUmVjdXJzaXZlUmVmZXJlbmNlcyhwb2ludGVyLCBzY2hlbWFSZWN1cnNpdmVSZWZNYXApO1xuICAgIGlmIChzaG9ydFBvaW50ZXIgIT09IHBvaW50ZXIpIHsgdXNlZFBvaW50ZXJzID0gWyAuLi51c2VkUG9pbnRlcnMsIHNob3J0UG9pbnRlciBdOyB9XG4gICAgbmV3U2NoZW1hID0gSnNvblBvaW50ZXIuZ2V0Rmlyc3RDb3B5KFtcbiAgICAgIFtzY2hlbWFSZWZMaWJyYXJ5LCBbc2hvcnRQb2ludGVyXV0sXG4gICAgICBbc2NoZW1hLCBwb2ludGVyXSxcbiAgICAgIFtzY2hlbWEsIHNob3J0UG9pbnRlcl1cbiAgICBdKTtcbiAgfVxuICByZXR1cm4gSnNvblBvaW50ZXIuZm9yRWFjaERlZXBDb3B5KG5ld1NjaGVtYSwgKHN1YlNjaGVtYSwgc3ViUG9pbnRlcikgPT4ge1xuICAgIGlmIChpc09iamVjdChzdWJTY2hlbWEpKSB7XG5cbiAgICAgIC8vIFJlcGxhY2Ugbm9uLXJlY3Vyc2l2ZSAkcmVmIGxpbmtzIHdpdGggcmVmZXJlbmNlZCBzY2hlbWFzXG4gICAgICBpZiAoaXNTdHJpbmcoc3ViU2NoZW1hLiRyZWYpKSB7XG4gICAgICAgIGNvbnN0IHJlZlBvaW50ZXIgPSBKc29uUG9pbnRlci5jb21waWxlKHN1YlNjaGVtYS4kcmVmKTtcbiAgICAgICAgaWYgKHJlZlBvaW50ZXIubGVuZ3RoICYmIHVzZWRQb2ludGVycy5ldmVyeShwdHIgPT5cbiAgICAgICAgICAhSnNvblBvaW50ZXIuaXNTdWJQb2ludGVyKHJlZlBvaW50ZXIsIHB0ciwgdHJ1ZSlcbiAgICAgICAgKSkge1xuICAgICAgICAgIGNvbnN0IHJlZlNjaGVtYSA9IGdldFN1YlNjaGVtYShcbiAgICAgICAgICAgIHNjaGVtYSwgcmVmUG9pbnRlciwgc2NoZW1hUmVmTGlicmFyeSwgc2NoZW1hUmVjdXJzaXZlUmVmTWFwLCB1c2VkUG9pbnRlcnNcbiAgICAgICAgICApO1xuICAgICAgICAgIGlmIChPYmplY3Qua2V5cyhzdWJTY2hlbWEpLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgcmV0dXJuIHJlZlNjaGVtYTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgZXh0cmFLZXlzID0geyAuLi5zdWJTY2hlbWEgfTtcbiAgICAgICAgICAgIGRlbGV0ZSBleHRyYUtleXMuJHJlZjtcbiAgICAgICAgICAgIHJldHVybiBtZXJnZVNjaGVtYXMocmVmU2NoZW1hLCBleHRyYUtleXMpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBUT0RPOiBDb252ZXJ0IHNjaGVtYXMgd2l0aCAndHlwZScgYXJyYXlzIHRvICdvbmVPZidcblxuICAgICAgLy8gQ29tYmluZSBhbGxPZiBzdWJTY2hlbWFzXG4gICAgICBpZiAoaXNBcnJheShzdWJTY2hlbWEuYWxsT2YpKSB7IHJldHVybiBjb21iaW5lQWxsT2Yoc3ViU2NoZW1hKTsgfVxuXG4gICAgICAvLyBGaXggaW5jb3JyZWN0bHkgcGxhY2VkIGFycmF5IG9iamVjdCByZXF1aXJlZCBsaXN0c1xuICAgICAgaWYgKHN1YlNjaGVtYS50eXBlID09PSAnYXJyYXknICYmIGlzQXJyYXkoc3ViU2NoZW1hLnJlcXVpcmVkKSkge1xuICAgICAgICByZXR1cm4gZml4UmVxdWlyZWRBcnJheVByb3BlcnRpZXMoc3ViU2NoZW1hKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHN1YlNjaGVtYTtcbiAgfSwgdHJ1ZSwgPHN0cmluZz5wb2ludGVyKTtcbn1cblxuLyoqXG4gKiAnY29tYmluZUFsbE9mJyBmdW5jdGlvblxuICpcbiAqIEF0dGVtcHQgdG8gY29udmVydCBhbiBhbGxPZiBzY2hlbWEgb2JqZWN0IGludG9cbiAqIGEgbm9uLWFsbE9mIHNjaGVtYSBvYmplY3Qgd2l0aCBlcXVpdmFsZW50IHJ1bGVzLlxuICpcbiAqIC8vICAgc2NoZW1hIC0gYWxsT2Ygc2NoZW1hIG9iamVjdFxuICogLy8gIC0gY29udmVydGVkIHNjaGVtYSBvYmplY3RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvbWJpbmVBbGxPZihzY2hlbWEpIHtcbiAgaWYgKCFpc09iamVjdChzY2hlbWEpIHx8ICFpc0FycmF5KHNjaGVtYS5hbGxPZikpIHsgcmV0dXJuIHNjaGVtYTsgfVxuICBsZXQgbWVyZ2VkU2NoZW1hID0gbWVyZ2VTY2hlbWFzKC4uLnNjaGVtYS5hbGxPZik7XG4gIGlmIChPYmplY3Qua2V5cyhzY2hlbWEpLmxlbmd0aCA+IDEpIHtcbiAgICBjb25zdCBleHRyYUtleXMgPSB7IC4uLnNjaGVtYSB9O1xuICAgIGRlbGV0ZSBleHRyYUtleXMuYWxsT2Y7XG4gICAgbWVyZ2VkU2NoZW1hID0gbWVyZ2VTY2hlbWFzKG1lcmdlZFNjaGVtYSwgZXh0cmFLZXlzKTtcbiAgfVxuICByZXR1cm4gbWVyZ2VkU2NoZW1hO1xufVxuXG4vKipcbiAqICdmaXhSZXF1aXJlZEFycmF5UHJvcGVydGllcycgZnVuY3Rpb25cbiAqXG4gKiBGaXhlcyBhbiBpbmNvcnJlY3RseSBwbGFjZWQgcmVxdWlyZWQgbGlzdCBpbnNpZGUgYW4gYXJyYXkgc2NoZW1hLCBieSBtb3ZpbmdcbiAqIGl0IGludG8gaXRlbXMucHJvcGVydGllcyBvciBhZGRpdGlvbmFsSXRlbXMucHJvcGVydGllcywgd2hlcmUgaXQgYmVsb25ncy5cbiAqXG4gKiAvLyAgIHNjaGVtYSAtIGFsbE9mIHNjaGVtYSBvYmplY3RcbiAqIC8vICAtIGNvbnZlcnRlZCBzY2hlbWEgb2JqZWN0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmaXhSZXF1aXJlZEFycmF5UHJvcGVydGllcyhzY2hlbWEpIHtcbiAgaWYgKHNjaGVtYS50eXBlID09PSAnYXJyYXknICYmIGlzQXJyYXkoc2NoZW1hLnJlcXVpcmVkKSkge1xuICAgIGxldCBpdGVtc09iamVjdCA9IGhhc093bihzY2hlbWEuaXRlbXMsICdwcm9wZXJ0aWVzJykgPyAnaXRlbXMnIDpcbiAgICAgIGhhc093bihzY2hlbWEuYWRkaXRpb25hbEl0ZW1zLCAncHJvcGVydGllcycpID8gJ2FkZGl0aW9uYWxJdGVtcycgOiBudWxsO1xuICAgIGlmIChpdGVtc09iamVjdCAmJiAhaGFzT3duKHNjaGVtYVtpdGVtc09iamVjdF0sICdyZXF1aXJlZCcpICYmIChcbiAgICAgIGhhc093bihzY2hlbWFbaXRlbXNPYmplY3RdLCAnYWRkaXRpb25hbFByb3BlcnRpZXMnKSB8fFxuICAgICAgc2NoZW1hLnJlcXVpcmVkLmV2ZXJ5KGtleSA9PiBoYXNPd24oc2NoZW1hW2l0ZW1zT2JqZWN0XS5wcm9wZXJ0aWVzLCBrZXkpKVxuICAgICkpIHtcbiAgICAgIHNjaGVtYSA9IF8uY2xvbmVEZWVwKHNjaGVtYSk7XG4gICAgICBzY2hlbWFbaXRlbXNPYmplY3RdLnJlcXVpcmVkID0gc2NoZW1hLnJlcXVpcmVkO1xuICAgICAgZGVsZXRlIHNjaGVtYS5yZXF1aXJlZDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHNjaGVtYTtcbn1cbiJdfQ==