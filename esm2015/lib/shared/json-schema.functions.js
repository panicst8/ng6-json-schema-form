/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
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
export function buildSchemaFromData(data, requireAllFields = false, isRoot = true) {
    /** @type {?} */
    let newSchema = {};
    /** @type {?} */
    const getFieldType = (value) => {
        /** @type {?} */
        const fieldType = getType(value, 'strict');
        return { integer: 'number', null: 'string' }[fieldType] || fieldType;
    };
    /** @type {?} */
    const buildSubSchema = (value) => buildSchemaFromData(value, requireAllFields, false);
    if (isRoot) {
        newSchema.$schema = 'http://json-schema.org/draft-06/schema#';
    }
    newSchema.type = getFieldType(data);
    if (newSchema.type === 'object') {
        newSchema.properties = {};
        if (requireAllFields) {
            newSchema.required = [];
        }
        for (let key of Object.keys(data)) {
            newSchema.properties[key] = buildSubSchema(data[key]);
            if (requireAllFields) {
                newSchema.required.push(key);
            }
        }
    }
    else if (newSchema.type === 'array') {
        newSchema.items = data.map(buildSubSchema);
        // If all items are the same type, use an object for items instead of an array
        if ((new Set(data.map(getFieldType))).size === 1) {
            newSchema.items = newSchema.items.reduce((a, b) => (Object.assign({}, a, b)), {});
        }
        if (requireAllFields) {
            newSchema.minItems = 1;
        }
    }
    return newSchema;
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
export function getFromSchema(schema, dataPointer, returnType = 'schema') {
    /** @type {?} */
    const dataPointerArray = JsonPointer.parse(dataPointer);
    if (dataPointerArray === null) {
        console.error(`getFromSchema error: Invalid JSON Pointer: ${dataPointer}`);
        return null;
    }
    /** @type {?} */
    let subSchema = schema;
    /** @type {?} */
    const schemaPointer = [];
    /** @type {?} */
    const length = dataPointerArray.length;
    if (returnType.slice(0, 6) === 'parent') {
        dataPointerArray.length--;
    }
    for (let i = 0; i < length; ++i) {
        /** @type {?} */
        const parentSchema = subSchema;
        /** @type {?} */
        const key = dataPointerArray[i];
        /** @type {?} */
        let subSchemaFound = false;
        if (typeof subSchema !== 'object') {
            console.error(`getFromSchema error: Unable to find "${key}" key in schema.`);
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
            console.error(`getFromSchema error: Unable to find "${key}" item in schema.`);
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
export function removeRecursiveReferences(pointer, recursiveRefMap, arrayMap = new Map()) {
    if (!pointer) {
        return '';
    }
    /** @type {?} */
    let genericPointer = JsonPointer.toGenericPointer(JsonPointer.compile(pointer), arrayMap);
    if (genericPointer.indexOf('/') === -1) {
        return genericPointer;
    }
    /** @type {?} */
    let possibleReferences = true;
    while (possibleReferences) {
        possibleReferences = false;
        recursiveRefMap.forEach((toPointer, fromPointer) => {
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
export function getInputType(schema, layoutNode = null) {
    /** @type {?} */
    let controlType = JsonPointer.getFirst([
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
    let schemaType = schema.type;
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
            let itemsObject = JsonPointer.getFirst([
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
    console.error(`getInputType error: Unable to determine input type for ${schemaType}`);
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
export function checkInlineType(controlType, schema, layoutNode = null) {
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
    const listPointerArray = JsonPointer.parse(schemaPointer);
    if (isArray(listPointerArray)) {
        if (!listPointerArray.length) {
            return schema.required === true;
        }
        /** @type {?} */
        const keyName = listPointerArray.pop();
        /** @type {?} */
        const nextToLastKey = listPointerArray[listPointerArray.length - 1];
        if (['properties', 'additionalProperties', 'patternProperties', 'items', 'additionalItems']
            .includes(nextToLastKey)) {
            listPointerArray.pop();
        }
        /** @type {?} */
        const parentSchema = JsonPointer.get(schema, listPointerArray) || {};
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
    let newOptions = {};
    /** @type {?} */
    const fixUiKeys = key => key.slice(0, 3).toLowerCase() === 'ui:' ? key.slice(3) : key;
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
    ].forEach(([object, excludeKeys]) => mergeFilteredObject(newOptions, object, excludeKeys, fixUiKeys));
    if (!hasOwn(newOptions, 'titleMap')) {
        /** @type {?} */
        let newTitleMap = null;
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
export function getTitleMapFromOneOf(schema = {}, flatList = null, validateOnly = false) {
    /** @type {?} */
    let titleMap = null;
    /** @type {?} */
    const oneOf = schema.oneOf || schema.anyOf || null;
    if (isArray(oneOf) && oneOf.every(item => item.title)) {
        if (oneOf.every(item => isArray(item.enum) && item.enum.length === 1)) {
            if (validateOnly) {
                return true;
            }
            titleMap = oneOf.map(item => ({ name: item.title, value: item.enum[0] }));
        }
        else if (oneOf.every(item => item.const)) {
            if (validateOnly) {
                return true;
            }
            titleMap = oneOf.map(item => ({ name: item.title, value: item.const }));
        }
        // if flatList !== false and some items have colons, make grouped map
        if (flatList !== false && (titleMap || [])
            .filter(title => ((title || {}).name || '').indexOf(': ')).length > 1) {
            /** @type {?} */
            const newTitleMap = titleMap.map(title => {
                let [group, name] = title.name.split(/: (.+)/);
                return group && name ? Object.assign({}, title, { group, name }) : title;
            });
            // If flatList === true or at least one group has multiple items, use grouped map
            if (flatList === true || newTitleMap.some((title, index) => index &&
                hasOwn(title, 'group') && title.group === newTitleMap[index - 1].group)) {
                titleMap = newTitleMap;
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
    let validators = {};
    if (hasOwn(schema, 'type')) {
        switch (schema.type) {
            case 'string':
                forEach(['pattern', 'format', 'minLength', 'maxLength'], (prop) => {
                    if (hasOwn(schema, prop)) {
                        validators[prop] = [schema[prop]];
                    }
                });
                break;
            case 'number':
            case 'integer':
                forEach(['Minimum', 'Maximum'], (ucLimit) => {
                    /** @type {?} */
                    let eLimit = 'exclusive' + ucLimit;
                    /** @type {?} */
                    let limit = ucLimit.toLowerCase();
                    if (hasOwn(schema, limit)) {
                        /** @type {?} */
                        let exclusive = hasOwn(schema, eLimit) && schema[eLimit] === true;
                        validators[limit] = [schema[limit], exclusive];
                    }
                });
                forEach(['multipleOf', 'type'], (prop) => {
                    if (hasOwn(schema, prop)) {
                        validators[prop] = [schema[prop]];
                    }
                });
                break;
            case 'object':
                forEach(['minProperties', 'maxProperties', 'dependencies'], (prop) => {
                    if (hasOwn(schema, prop)) {
                        validators[prop] = [schema[prop]];
                    }
                });
                break;
            case 'array':
                forEach(['minItems', 'maxItems', 'uniqueItems'], (prop) => {
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
    const refLinks = new Set();
    /** @type {?} */
    const refMapSet = new Set();
    /** @type {?} */
    const refMap = new Map();
    /** @type {?} */
    const recursiveRefMap = new Map();
    /** @type {?} */
    const refLibrary = {};
    // Search schema for all $ref links, and build full refLibrary
    JsonPointer.forEachDeep(schema, (subSchema, subSchemaPointer) => {
        if (hasOwn(subSchema, '$ref') && isString(subSchema['$ref'])) {
            /** @type {?} */
            const refPointer = JsonPointer.compile(subSchema['$ref']);
            refLinks.add(refPointer);
            refMapSet.add(subSchemaPointer + '~~' + refPointer);
            refMap.set(subSchemaPointer, refPointer);
        }
    });
    refLinks.forEach(ref => refLibrary[ref] = getSubSchema(schema, ref));
    /** @type {?} */
    let checkRefLinks = true;
    while (checkRefLinks) {
        checkRefLinks = false;
        Array.from(refMap).forEach(([fromRef1, toRef1]) => Array.from(refMap)
            .filter(([fromRef2, toRef2]) => JsonPointer.isSubPointer(toRef1, fromRef2, true) &&
            !JsonPointer.isSubPointer(toRef2, toRef1, true) &&
            !refMapSet.has(fromRef1 + fromRef2.slice(toRef1.length) + '~~' + toRef2))
            .forEach(([fromRef2, toRef2]) => {
            refMapSet.add(fromRef1 + fromRef2.slice(toRef1.length) + '~~' + toRef2);
            checkRefLinks = true;
        }));
    }
    // Build full recursiveRefMap
    // First pass - save all internally recursive refs from refMapSet
    Array.from(refMapSet)
        .map(refLink => refLink.split('~~'))
        .filter(([fromRef, toRef]) => JsonPointer.isSubPointer(toRef, fromRef))
        .forEach(([fromRef, toRef]) => recursiveRefMap.set(fromRef, toRef));
    // Second pass - create recursive versions of any other refs that link to recursive refs
    Array.from(refMap)
        .filter(([fromRef1, toRef1]) => Array.from(recursiveRefMap.keys())
        .every(fromRef2 => !JsonPointer.isSubPointer(fromRef1, fromRef2, true)))
        .forEach(([fromRef1, toRef1]) => Array.from(recursiveRefMap)
        .filter(([fromRef2, toRef2]) => !recursiveRefMap.has(fromRef1 + fromRef2.slice(toRef1.length)) &&
        JsonPointer.isSubPointer(toRef1, fromRef2, true) &&
        !JsonPointer.isSubPointer(toRef1, fromRef1, true))
        .forEach(([fromRef2, toRef2]) => recursiveRefMap.set(fromRef1 + fromRef2.slice(toRef1.length), fromRef1 + toRef2.slice(toRef1.length))));
    /** @type {?} */
    let compiledSchema = Object.assign({}, schema);
    delete compiledSchema.definitions;
    compiledSchema =
        getSubSchema(compiledSchema, '', refLibrary, recursiveRefMap);
    // Make sure all remaining schema $refs are recursive, and build final
    // schemaRefLibrary, schemaRecursiveRefMap, dataRecursiveRefMap, & arrayMap
    JsonPointer.forEachDeep(compiledSchema, (subSchema, subSchemaPointer) => {
        if (isString(subSchema['$ref'])) {
            /** @type {?} */
            let refPointer = JsonPointer.compile(subSchema['$ref']);
            if (!JsonPointer.isSubPointer(refPointer, subSchemaPointer, true)) {
                refPointer = removeRecursiveReferences(subSchemaPointer, recursiveRefMap);
                JsonPointer.set(compiledSchema, subSchemaPointer, { $ref: `#${refPointer}` });
            }
            if (!hasOwn(schemaRefLibrary, 'refPointer')) {
                schemaRefLibrary[refPointer] = !refPointer.length ? compiledSchema :
                    getSubSchema(compiledSchema, refPointer, schemaRefLibrary, recursiveRefMap);
            }
            if (!schemaRecursiveRefMap.has(subSchemaPointer)) {
                schemaRecursiveRefMap.set(subSchemaPointer, refPointer);
            }
            /** @type {?} */
            const fromDataRef = JsonPointer.toDataPointer(subSchemaPointer, compiledSchema);
            if (!dataRecursiveRefMap.has(fromDataRef)) {
                /** @type {?} */
                const toDataRef = JsonPointer.toDataPointer(refPointer, compiledSchema);
                dataRecursiveRefMap.set(fromDataRef, toDataRef);
            }
        }
        if (subSchema.type === 'array' &&
            (hasOwn(subSchema, 'items') || hasOwn(subSchema, 'additionalItems'))) {
            /** @type {?} */
            const dataPointer = JsonPointer.toDataPointer(subSchemaPointer, compiledSchema);
            if (!arrayMap.has(dataPointer)) {
                /** @type {?} */
                const tupleItems = isArray(subSchema.items) ? subSchema.items.length : 0;
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
export function getSubSchema(schema, pointer, schemaRefLibrary = null, schemaRecursiveRefMap = null, usedPointers = []) {
    if (!schemaRefLibrary || !schemaRecursiveRefMap) {
        return JsonPointer.getCopy(schema, pointer);
    }
    if (typeof pointer !== 'string') {
        pointer = JsonPointer.compile(pointer);
    }
    usedPointers = [...usedPointers, pointer];
    /** @type {?} */
    let newSchema = null;
    if (pointer === '') {
        newSchema = _.cloneDeep(schema);
    }
    else {
        /** @type {?} */
        const shortPointer = removeRecursiveReferences(pointer, schemaRecursiveRefMap);
        if (shortPointer !== pointer) {
            usedPointers = [...usedPointers, shortPointer];
        }
        newSchema = JsonPointer.getFirstCopy([
            [schemaRefLibrary, [shortPointer]],
            [schema, pointer],
            [schema, shortPointer]
        ]);
    }
    return JsonPointer.forEachDeepCopy(newSchema, (subSchema, subPointer) => {
        if (isObject(subSchema)) {
            // Replace non-recursive $ref links with referenced schemas
            if (isString(subSchema.$ref)) {
                /** @type {?} */
                const refPointer = JsonPointer.compile(subSchema.$ref);
                if (refPointer.length && usedPointers.every(ptr => !JsonPointer.isSubPointer(refPointer, ptr, true))) {
                    /** @type {?} */
                    const refSchema = getSubSchema(schema, refPointer, schemaRefLibrary, schemaRecursiveRefMap, usedPointers);
                    if (Object.keys(subSchema).length === 1) {
                        return refSchema;
                    }
                    else {
                        /** @type {?} */
                        const extraKeys = Object.assign({}, subSchema);
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
    let mergedSchema = mergeSchemas(...schema.allOf);
    if (Object.keys(schema).length > 1) {
        /** @type {?} */
        const extraKeys = Object.assign({}, schema);
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
        let itemsObject = hasOwn(schema.items, 'properties') ? 'items' :
            hasOwn(schema.additionalItems, 'properties') ? 'additionalItems' : null;
        if (itemsObject && !hasOwn(schema[itemsObject], 'required') && (hasOwn(schema[itemsObject], 'additionalProperties') ||
            schema.required.every(key => hasOwn(schema[itemsObject].properties, key)))) {
            schema = _.cloneDeep(schema);
            schema[itemsObject].required = schema.required;
            delete schema.required;
        }
    }
    return schema;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbi1zY2hlbWEuZnVuY3Rpb25zLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmc2LWpzb24tc2NoZW1hLWZvcm0vIiwic291cmNlcyI6WyJsaWIvc2hhcmVkL2pzb24tc2NoZW1hLmZ1bmN0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxLQUFLLENBQUMsTUFBTSxRQUFRLENBQUM7QUFFNUIsT0FBTyxFQUNMLE9BQU8sRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBdUIsUUFBUSxFQUFFLFFBQVEsRUFDNUUsUUFBUSxFQUNULE1BQU0sdUJBQXVCLENBQUM7QUFDL0IsT0FBTyxFQUNMLE9BQU8sRUFBRSxNQUFNLEVBQUUsbUJBQW1CLEVBQ3JDLE1BQU0scUJBQXFCLENBQUM7QUFDN0IsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxXQUFXLEVBQVcsTUFBTSx5QkFBeUIsQ0FBQzs7Ozs7Ozs7Ozs7QUEyQy9ELE1BQU0sZ0NBQWdDLE1BQU07SUFDMUMsTUFBTSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQXVCUjs7Ozs7Ozs7Ozs7Ozs7O0FBWUQsTUFBTSw4QkFDSixJQUFJLEVBQUUsZ0JBQWdCLEdBQUcsS0FBSyxFQUFFLE1BQU0sR0FBRyxJQUFJOztJQUU3QyxJQUFJLFNBQVMsR0FBUSxFQUFFLENBQUM7O0lBQ3hCLE1BQU0sWUFBWSxHQUFHLENBQUMsS0FBVSxFQUFVLEVBQUU7O1FBQzFDLE1BQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDM0MsTUFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLENBQUMsU0FBUyxDQUFDLElBQUksU0FBUyxDQUFDO0tBQ3RFLENBQUM7O0lBQ0YsTUFBTSxjQUFjLEdBQUcsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUMvQixtQkFBbUIs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Q0FBQztZQUN0RSxFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO2dCQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7YUFBRTtZQUNsQyxRQUFRLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztTQUMzRTtRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMzQyxFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO2dCQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7YUFBRTtZQUNsQyxRQUFRLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztTQUN6RTs7UUFHRCxFQUFFLENBQUMsQ0FBQyxRQUFRLEtBQUssS0FBSyxJQUFJLENBQUMsUUFBUSxJQUFJLEVBQUUsQ0FBQzthQUN2QyxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FDdEUsQ0FBQyxDQUFDLENBQUM7O1lBR0QsTUFBTSxXQUFXLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFDdkMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxD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LEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsVUFBVSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQzFFLENBQUMsQ0FBQyxDQUFDO1lBQ0YsTUFBTSxHQUFHLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDN0IsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDO1lBQy9DLE9BQU8sTUFBTSxDQUFDLFFBQVEsQ0FBQztTQUN4QjtLQUNGO0lBQ0QsTUFBTSxDQUFDLE1BQU0sQ0FBQztDQUNmIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuXG5pbXBvcnQge1xuICBnZXRUeXBlLCBoYXNWYWx1ZSwgaW5BcnJheSwgaXNBcnJheSwgaXNFbXB0eSwgaXNGdW5jdGlvbiwgaXNOdW1iZXIsIGlzT2JqZWN0LFxuICBpc1N0cmluZ1xufSBmcm9tICcuL3ZhbGlkYXRvci5mdW5jdGlvbnMnO1xuaW1wb3J0IHtcbiAgZm9yRWFjaCwgaGFzT3duLCBtZXJnZUZpbHRlcmVkT2JqZWN0LCB1bmlxdWVJdGVtcywgY29tbW9uSXRlbXNcbn0gZnJvbSAnLi91dGlsaXR5LmZ1bmN0aW9ucyc7XG5pbXBvcnQgeyBtZXJnZVNjaGVtYXMgfSBmcm9tICcuL21lcmdlLXNjaGVtYXMuZnVuY3Rpb24nO1xuaW1wb3J0IHsgSnNvblBvaW50ZXIsIFBvaW50ZXIgfSBmcm9tICcuL2pzb25wb2ludGVyLmZ1bmN0aW9ucyc7XG5pbXBvcnQgeyBKc29uVmFsaWRhdG9ycyB9IGZyb20gJy4vanNvbi52YWxpZGF0b3JzJztcblxuLyoqXG4gKiBKU09OIFNjaGVtYSBmdW5jdGlvbiBsaWJyYXJ5OlxuICpcbiAqIGJ1aWxkU2NoZW1hRnJvbUxheW91dDogICBUT0RPOiBXcml0ZSB0aGlzIGZ1bmN0aW9uXG4gKlxuICogYnVpbGRTY2hlbWFGcm9tRGF0YTpcbiAqXG4gKiBnZXRGcm9tU2NoZW1hOlxuICpcbiAqIHJlbW92ZVJlY3Vyc2l2ZVJlZmVyZW5jZXM6XG4gKlxuICogZ2V0SW5wdXRUeXBlOlxuICpcbiAqIGNoZWNrSW5saW5lVHlwZTpcbiAqXG4gKiBpc0lucHV0UmVxdWlyZWQ6XG4gKlxuICogdXBkYXRlSW5wdXRPcHRpb25zOlxuICpcbiAqIGdldFRpdGxlTWFwRnJvbU9uZU9mOlxuICpcbiAqIGdldENvbnRyb2xWYWxpZGF0b3JzOlxuICpcbiAqIHJlc29sdmVTY2hlbWFSZWZlcmVuY2VzOlxuICpcbiAqIGdldFN1YlNjaGVtYTpcbiAqXG4gKiBjb21iaW5lQWxsT2Y6XG4gKlxuICogZml4UmVxdWlyZWRBcnJheVByb3BlcnRpZXM6XG4gKi9cblxuLyoqXG4gKiAnYnVpbGRTY2hlbWFGcm9tTGF5b3V0JyBmdW5jdGlvblxuICpcbiAqIFRPRE86IEJ1aWxkIGEgSlNPTiBTY2hlbWEgZnJvbSBhIEpTT04gRm9ybSBsYXlvdXRcbiAqXG4gKiAvLyAgIGxheW91dCAtIFRoZSBKU09OIEZvcm0gbGF5b3V0XG4gKiAvLyAgLSBUaGUgbmV3IEpTT04gU2NoZW1hXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBidWlsZFNjaGVtYUZyb21MYXlvdXQobGF5b3V0KSB7XG4gIHJldHVybjtcbiAgLy8gbGV0IG5ld1NjaGVtYTogYW55ID0geyB9O1xuICAvLyBjb25zdCB3YWxrTGF5b3V0ID0gKGxheW91dEl0ZW1zOiBhbnlbXSwgY2FsbGJhY2s6IEZ1bmN0aW9uKTogYW55W10gPT4ge1xuICAvLyAgIGxldCByZXR1cm5BcnJheTogYW55W10gPSBbXTtcbiAgLy8gICBmb3IgKGxldCBsYXlvdXRJdGVtIG9mIGxheW91dEl0ZW1zKSB7XG4gIC8vICAgICBjb25zdCByZXR1cm5JdGVtOiBhbnkgPSBjYWxsYmFjayhsYXlvdXRJdGVtKTtcbiAgLy8gICAgIGlmIChyZXR1cm5JdGVtKSB7IHJldHVybkFycmF5ID0gcmV0dXJuQXJyYXkuY29uY2F0KGNhbGxiYWNrKGxheW91dEl0ZW0pKTsgfVxuICAvLyAgICAgaWYgKGxheW91dEl0ZW0uaXRlbXMpIHtcbiAgLy8gICAgICAgcmV0dXJuQXJyYXkgPSByZXR1cm5BcnJheS5jb25jYXQod2Fsa0xheW91dChsYXlvdXRJdGVtLml0ZW1zLCBjYWxsYmFjaykpO1xuICAvLyAgICAgfVxuICAvLyAgIH1cbiAgLy8gICByZXR1cm4gcmV0dXJuQXJyYXk7XG4gIC8vIH07XG4gIC8vIHdhbGtMYXlvdXQobGF5b3V0LCBsYXlvdXRJdGVtID0+IHtcbiAgLy8gICBsZXQgaXRlbUtleTogc3RyaW5nO1xuICAvLyAgIGlmICh0eXBlb2YgbGF5b3V0SXRlbSA9PT0gJ3N0cmluZycpIHtcbiAgLy8gICAgIGl0ZW1LZXkgPSBsYXlvdXRJdGVtO1xuICAvLyAgIH0gZWxzZSBpZiAobGF5b3V0SXRlbS5rZXkpIHtcbiAgLy8gICAgIGl0ZW1LZXkgPSBsYXlvdXRJdGVtLmtleTtcbiAgLy8gICB9XG4gIC8vICAgaWYgKCFpdGVtS2V5KSB7IHJldHVybjsgfVxuICAvLyAgIC8vXG4gIC8vIH0pO1xufVxuXG4vKipcbiAqICdidWlsZFNjaGVtYUZyb21EYXRhJyBmdW5jdGlvblxuICpcbiAqIEJ1aWxkIGEgSlNPTiBTY2hlbWEgZnJvbSBhIGRhdGEgb2JqZWN0XG4gKlxuICogLy8gICBkYXRhIC0gVGhlIGRhdGEgb2JqZWN0XG4gKiAvLyAgeyBib29sZWFuID0gZmFsc2UgfSByZXF1aXJlQWxsRmllbGRzIC0gUmVxdWlyZSBhbGwgZmllbGRzP1xuICogLy8gIHsgYm9vbGVhbiA9IHRydWUgfSBpc1Jvb3QgLSBpcyByb290XG4gKiAvLyAgLSBUaGUgbmV3IEpTT04gU2NoZW1hXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBidWlsZFNjaGVtYUZyb21EYXRhKFxuICBkYXRhLCByZXF1aXJlQWxsRmllbGRzID0gZmFsc2UsIGlzUm9vdCA9IHRydWVcbikge1xuICBsZXQgbmV3U2NoZW1hOiBhbnkgPSB7fTtcbiAgY29uc3QgZ2V0RmllbGRUeXBlID0gKHZhbHVlOiBhbnkpOiBzdHJpbmcgPT4ge1xuICAgIGNvbnN0IGZpZWxkVHlwZSA9IGdldFR5cGUodmFsdWUsICdzdHJpY3QnKTtcbiAgICByZXR1cm4geyBpbnRlZ2VyOiAnbnVtYmVyJywgbnVsbDogJ3N0cmluZycgfVtmaWVsZFR5cGVdIHx8IGZpZWxkVHlwZTtcbiAgfTtcbiAgY29uc3QgYnVpbGRTdWJTY2hlbWEgPSAodmFsdWUpID0+XG4gICAgYnVpbGRTY2hlbWFGcm9tRGF0YSh2YWx1ZSwgcmVxdWlyZUFsbEZpZWxkcywgZmFsc2UpO1xuICBpZiAoaXNSb290KSB7IG5ld1NjaGVtYS4kc2NoZW1hID0gJ2h0dHA6Ly9qc29uLXNjaGVtYS5vcmcvZHJhZnQtMDYvc2NoZW1hIyc7IH1cbiAgbmV3U2NoZW1hLnR5cGUgPSBnZXRGaWVsZFR5cGUoZGF0YSk7XG4gIGlmIChuZXdTY2hlbWEudHlwZSA9PT0gJ29iamVjdCcpIHtcbiAgICBuZXdTY2hlbWEucHJvcGVydGllcyA9IHt9O1xuICAgIGlmIChyZXF1aXJlQWxsRmllbGRzKSB7IG5ld1NjaGVtYS5yZXF1aXJlZCA9IFtdOyB9XG4gICAgZm9yIChsZXQga2V5IG9mIE9iamVjdC5rZXlzKGRhdGEpKSB7XG4gICAgICBuZXdTY2hlbWEucHJvcGVydGllc1trZXldID0gYnVpbGRTdWJTY2hlbWEoZGF0YVtrZXldKTtcbiAgICAgIGlmIChyZXF1aXJlQWxsRmllbGRzKSB7IG5ld1NjaGVtYS5yZXF1aXJlZC5wdXNoKGtleSk7IH1cbiAgICB9XG4gIH0gZWxzZSBpZiAobmV3U2NoZW1hLnR5cGUgPT09ICdhcnJheScpIHtcbiAgICBuZXdTY2hlbWEuaXRlbXMgPSBkYXRhLm1hcChidWlsZFN1YlNjaGVtYSk7XG4gICAgLy8gSWYgYWxsIGl0ZW1zIGFyZSB0aGUgc2FtZSB0eXBlLCB1c2UgYW4gb2JqZWN0IGZvciBpdGVtcyBpbnN0ZWFkIG9mIGFuIGFycmF5XG4gICAgaWYgKChuZXcgU2V0KGRhdGEubWFwKGdldEZpZWxkVHlwZSkpKS5zaXplID09PSAxKSB7XG4gICAgICBuZXdTY2hlbWEuaXRlbXMgPSBuZXdTY2hlbWEuaXRlbXMucmVkdWNlKChhLCBiKSA9PiAoeyAuLi5hLCAuLi5iIH0pLCB7fSk7XG4gICAgfVxuICAgIGlmIChyZXF1aXJlQWxsRmllbGRzKSB7IG5ld1NjaGVtYS5taW5JdGVtcyA9IDE7IH1cbiAgfVxuICByZXR1cm4gbmV3U2NoZW1hO1xufVxuXG4vKipcbiAqICdnZXRGcm9tU2NoZW1hJyBmdW5jdGlvblxuICpcbiAqIFVzZXMgYSBKU09OIFBvaW50ZXIgZm9yIGEgdmFsdWUgd2l0aGluIGEgZGF0YSBvYmplY3QgdG8gcmV0cmlldmVcbiAqIHRoZSBzY2hlbWEgZm9yIHRoYXQgdmFsdWUgd2l0aGluIHNjaGVtYSBmb3IgdGhlIGRhdGEgb2JqZWN0LlxuICpcbiAqIFRoZSBvcHRpb25hbCB0aGlyZCBwYXJhbWV0ZXIgY2FuIGFsc28gYmUgc2V0IHRvIHJldHVybiBzb21ldGhpbmcgZWxzZTpcbiAqICdzY2hlbWEnIChkZWZhdWx0KTogdGhlIHNjaGVtYSBmb3IgdGhlIHZhbHVlIGluZGljYXRlZCBieSB0aGUgZGF0YSBwb2ludGVyXG4gKiAncGFyZW50U2NoZW1hJzogdGhlIHNjaGVtYSBmb3IgdGhlIHZhbHVlJ3MgcGFyZW50IG9iamVjdCBvciBhcnJheVxuICogJ3NjaGVtYVBvaW50ZXInOiBhIHBvaW50ZXIgdG8gdGhlIHZhbHVlJ3Mgc2NoZW1hIHdpdGhpbiB0aGUgb2JqZWN0J3Mgc2NoZW1hXG4gKiAncGFyZW50U2NoZW1hUG9pbnRlcic6IGEgcG9pbnRlciB0byB0aGUgc2NoZW1hIGZvciB0aGUgdmFsdWUncyBwYXJlbnQgb2JqZWN0IG9yIGFycmF5XG4gKlxuICogLy8gICBzY2hlbWEgLSBUaGUgc2NoZW1hIHRvIGdldCB0aGUgc3ViLXNjaGVtYSBmcm9tXG4gKiAvLyAgeyBQb2ludGVyIH0gZGF0YVBvaW50ZXIgLSBKU09OIFBvaW50ZXIgKHN0cmluZyBvciBhcnJheSlcbiAqIC8vICB7IHN0cmluZyA9ICdzY2hlbWEnIH0gcmV0dXJuVHlwZSAtIHdoYXQgdG8gcmV0dXJuP1xuICogLy8gIC0gVGhlIGxvY2F0ZWQgc3ViLXNjaGVtYVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0RnJvbVNjaGVtYShzY2hlbWEsIGRhdGFQb2ludGVyLCByZXR1cm5UeXBlID0gJ3NjaGVtYScpIHtcbiAgY29uc3QgZGF0YVBvaW50ZXJBcnJheTogYW55W10gPSBKc29uUG9pbnRlci5wYXJzZShkYXRhUG9pbnRlcik7XG4gIGlmIChkYXRhUG9pbnRlckFycmF5ID09PSBudWxsKSB7XG4gICAgY29uc29sZS5lcnJvcihgZ2V0RnJvbVNjaGVtYSBlcnJvcjogSW52YWxpZCBKU09OIFBvaW50ZXI6ICR7ZGF0YVBvaW50ZXJ9YCk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgbGV0IHN1YlNjaGVtYSA9IHNjaGVtYTtcbiAgY29uc3Qgc2NoZW1hUG9pbnRlciA9IFtdO1xuICBjb25zdCBsZW5ndGggPSBkYXRhUG9pbnRlckFycmF5Lmxlbmd0aDtcbiAgaWYgKHJldHVyblR5cGUuc2xpY2UoMCwgNikgPT09ICdwYXJlbnQnKSB7IGRhdGFQb2ludGVyQXJyYXkubGVuZ3RoLS07IH1cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7ICsraSkge1xuICAgIGNvbnN0IHBhcmVudFNjaGVtYSA9IHN1YlNjaGVtYTtcbiAgICBjb25zdCBrZXkgPSBkYXRhUG9pbnRlckFycmF5W2ldO1xuICAgIGxldCBzdWJTY2hlbWFGb3VuZCA9IGZhbHNlO1xuICAgIGlmICh0eXBlb2Ygc3ViU2NoZW1hICE9PSAnb2JqZWN0Jykge1xuICAgICAgY29uc29sZS5lcnJvcihgZ2V0RnJvbVNjaGVtYSBlcnJvcjogVW5hYmxlIHRvIGZpbmQgXCIke2tleX1cIiBrZXkgaW4gc2NoZW1hLmApO1xuICAgICAgY29uc29sZS5lcnJvcihzY2hlbWEpO1xuICAgICAgY29uc29sZS5lcnJvcihkYXRhUG9pbnRlcik7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgaWYgKHN1YlNjaGVtYS50eXBlID09PSAnYXJyYXknICYmICghaXNOYU4oa2V5KSB8fCBrZXkgPT09ICctJykpIHtcbiAgICAgIGlmIChoYXNPd24oc3ViU2NoZW1hLCAnaXRlbXMnKSkge1xuICAgICAgICBpZiAoaXNPYmplY3Qoc3ViU2NoZW1hLml0ZW1zKSkge1xuICAgICAgICAgIHN1YlNjaGVtYUZvdW5kID0gdHJ1ZTtcbiAgICAgICAgICBzdWJTY2hlbWEgPSBzdWJTY2hlbWEuaXRlbXM7XG4gICAgICAgICAgc2NoZW1hUG9pbnRlci5wdXNoKCdpdGVtcycpO1xuICAgICAgICB9IGVsc2UgaWYgKGlzQXJyYXkoc3ViU2NoZW1hLml0ZW1zKSkge1xuICAgICAgICAgIGlmICghaXNOYU4oa2V5KSAmJiBzdWJTY2hlbWEuaXRlbXMubGVuZ3RoID49ICtrZXkpIHtcbiAgICAgICAgICAgIHN1YlNjaGVtYUZvdW5kID0gdHJ1ZTtcbiAgICAgICAgICAgIHN1YlNjaGVtYSA9IHN1YlNjaGVtYS5pdGVtc1sra2V5XTtcbiAgICAgICAgICAgIHNjaGVtYVBvaW50ZXIucHVzaCgnaXRlbXMnLCBrZXkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKCFzdWJTY2hlbWFGb3VuZCAmJiBpc09iamVjdChzdWJTY2hlbWEuYWRkaXRpb25hbEl0ZW1zKSkge1xuICAgICAgICBzdWJTY2hlbWFGb3VuZCA9IHRydWU7XG4gICAgICAgIHN1YlNjaGVtYSA9IHN1YlNjaGVtYS5hZGRpdGlvbmFsSXRlbXM7XG4gICAgICAgIHNjaGVtYVBvaW50ZXIucHVzaCgnYWRkaXRpb25hbEl0ZW1zJyk7XG4gICAgICB9IGVsc2UgaWYgKHN1YlNjaGVtYS5hZGRpdGlvbmFsSXRlbXMgIT09IGZhbHNlKSB7XG4gICAgICAgIHN1YlNjaGVtYUZvdW5kID0gdHJ1ZTtcbiAgICAgICAgc3ViU2NoZW1hID0geyB9O1xuICAgICAgICBzY2hlbWFQb2ludGVyLnB1c2goJ2FkZGl0aW9uYWxJdGVtcycpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoc3ViU2NoZW1hLnR5cGUgPT09ICdvYmplY3QnKSB7XG4gICAgICBpZiAoaXNPYmplY3Qoc3ViU2NoZW1hLnByb3BlcnRpZXMpICYmIGhhc093bihzdWJTY2hlbWEucHJvcGVydGllcywga2V5KSkge1xuICAgICAgICBzdWJTY2hlbWFGb3VuZCA9IHRydWVcbiAgICAgICAgc3ViU2NoZW1hID0gc3ViU2NoZW1hLnByb3BlcnRpZXNba2V5XTtcbiAgICAgICAgc2NoZW1hUG9pbnRlci5wdXNoKCdwcm9wZXJ0aWVzJywga2V5KTtcbiAgICAgIH0gZWxzZSBpZiAoaXNPYmplY3Qoc3ViU2NoZW1hLmFkZGl0aW9uYWxQcm9wZXJ0aWVzKSkge1xuICAgICAgICBzdWJTY2hlbWFGb3VuZCA9IHRydWVcbiAgICAgICAgc3ViU2NoZW1hID0gc3ViU2NoZW1hLmFkZGl0aW9uYWxQcm9wZXJ0aWVzO1xuICAgICAgICBzY2hlbWFQb2ludGVyLnB1c2goJ2FkZGl0aW9uYWxQcm9wZXJ0aWVzJyk7XG4gICAgICB9IGVsc2UgaWYgKHN1YlNjaGVtYS5hZGRpdGlvbmFsUHJvcGVydGllcyAhPT0gZmFsc2UpIHtcbiAgICAgICAgc3ViU2NoZW1hRm91bmQgPSB0cnVlXG4gICAgICAgIHN1YlNjaGVtYSA9IHsgfTtcbiAgICAgICAgc2NoZW1hUG9pbnRlci5wdXNoKCdhZGRpdGlvbmFsUHJvcGVydGllcycpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoIXN1YlNjaGVtYUZvdW5kKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGBnZXRGcm9tU2NoZW1hIGVycm9yOiBVbmFibGUgdG8gZmluZCBcIiR7a2V5fVwiIGl0ZW0gaW4gc2NoZW1hLmApO1xuICAgICAgY29uc29sZS5lcnJvcihzY2hlbWEpO1xuICAgICAgY29uc29sZS5lcnJvcihkYXRhUG9pbnRlcik7XG4gICAgICByZXR1cm47XG4gICAgfVxuICB9XG4gIHJldHVybiByZXR1cm5UeXBlLnNsaWNlKC03KSA9PT0gJ1BvaW50ZXInID8gc2NoZW1hUG9pbnRlciA6IHN1YlNjaGVtYTtcbn1cblxuLyoqXG4gKiAncmVtb3ZlUmVjdXJzaXZlUmVmZXJlbmNlcycgZnVuY3Rpb25cbiAqXG4gKiBDaGVja3MgYSBKU09OIFBvaW50ZXIgYWdhaW5zdCBhIG1hcCBvZiByZWN1cnNpdmUgcmVmZXJlbmNlcyBhbmQgcmV0dXJuc1xuICogYSBKU09OIFBvaW50ZXIgdG8gdGhlIHNoYWxsb3dlc3QgZXF1aXZhbGVudCBsb2NhdGlvbiBpbiB0aGUgc2FtZSBvYmplY3QuXG4gKlxuICogVXNpbmcgdGhpcyBmdW5jdGlvbnMgZW5hYmxlcyBhbiBvYmplY3QgdG8gYmUgY29uc3RydWN0ZWQgd2l0aCB1bmxpbWl0ZWRcbiAqIHJlY3Vyc2lvbiwgd2hpbGUgbWFpbnRhaW5nIGEgZml4ZWQgc2V0IG9mIG1ldGFkYXRhLCBzdWNoIGFzIGZpZWxkIGRhdGEgdHlwZXMuXG4gKiBUaGUgb2JqZWN0IGNhbiBncm93IGFzIGxhcmdlIGFzIGl0IHdhbnRzLCBhbmQgZGVlcGx5IHJlY3Vyc2VkIG5vZGVzIGNhblxuICoganVzdCByZWZlciB0byB0aGUgbWV0YWRhdGEgZm9yIHRoZWlyIHNoYWxsb3cgZXF1aXZhbGVudHMsIGluc3RlYWQgb2YgaGF2aW5nXG4gKiB0byBhZGQgYWRkaXRpb25hbCByZWR1bmRhbnQgbWV0YWRhdGEgZm9yIGVhY2ggcmVjdXJzaXZlbHkgYWRkZWQgbm9kZS5cbiAqXG4gKiBFeGFtcGxlOlxuICpcbiAqIHBvaW50ZXI6ICAgICAgICAgJy9zdHVmZi9hbmQvbW9yZS9hbmQvbW9yZS9hbmQvbW9yZS9hbmQvbW9yZS9zdHVmZidcbiAqIHJlY3Vyc2l2ZVJlZk1hcDogW1snL3N0dWZmL2FuZC9tb3JlL2FuZC9tb3JlJywgJy9zdHVmZi9hbmQvbW9yZS8nXV1cbiAqIHJldHVybmVkOiAgICAgICAgJy9zdHVmZi9hbmQvbW9yZS9zdHVmZidcbiAqXG4gKiAvLyAgeyBQb2ludGVyIH0gcG9pbnRlciAtXG4gKiAvLyAgeyBNYXA8c3RyaW5nLCBzdHJpbmc+IH0gcmVjdXJzaXZlUmVmTWFwIC1cbiAqIC8vICB7IE1hcDxzdHJpbmcsIG51bWJlcj4gPSBuZXcgTWFwKCkgfSBhcnJheU1hcCAtIG9wdGlvbmFsXG4gKiAvLyB7IHN0cmluZyB9IC1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZVJlY3Vyc2l2ZVJlZmVyZW5jZXMoXG4gIHBvaW50ZXIsIHJlY3Vyc2l2ZVJlZk1hcCwgYXJyYXlNYXAgPSBuZXcgTWFwKClcbikge1xuICBpZiAoIXBvaW50ZXIpIHsgcmV0dXJuICcnOyB9XG4gIGxldCBnZW5lcmljUG9pbnRlciA9XG4gICAgSnNvblBvaW50ZXIudG9HZW5lcmljUG9pbnRlcihKc29uUG9pbnRlci5jb21waWxlKHBvaW50ZXIpLCBhcnJheU1hcCk7XG4gIGlmIChnZW5lcmljUG9pbnRlci5pbmRleE9mKCcvJykgPT09IC0xKSB7IHJldHVybiBnZW5lcmljUG9pbnRlcjsgfVxuICBsZXQgcG9zc2libGVSZWZlcmVuY2VzID0gdHJ1ZTtcbiAgd2hpbGUgKHBvc3NpYmxlUmVmZXJlbmNlcykge1xuICAgIHBvc3NpYmxlUmVmZXJlbmNlcyA9IGZhbHNlO1xuICAgIHJlY3Vyc2l2ZVJlZk1hcC5mb3JFYWNoKCh0b1BvaW50ZXIsIGZyb21Qb2ludGVyKSA9PiB7XG4gICAgICBpZiAoSnNvblBvaW50ZXIuaXNTdWJQb2ludGVyKHRvUG9pbnRlciwgZnJvbVBvaW50ZXIpKSB7XG4gICAgICAgIHdoaWxlIChKc29uUG9pbnRlci5pc1N1YlBvaW50ZXIoZnJvbVBvaW50ZXIsIGdlbmVyaWNQb2ludGVyLCB0cnVlKSkge1xuICAgICAgICAgIGdlbmVyaWNQb2ludGVyID0gSnNvblBvaW50ZXIudG9HZW5lcmljUG9pbnRlcihcbiAgICAgICAgICAgIHRvUG9pbnRlciArIGdlbmVyaWNQb2ludGVyLnNsaWNlKGZyb21Qb2ludGVyLmxlbmd0aCksIGFycmF5TWFwXG4gICAgICAgICAgKTtcbiAgICAgICAgICBwb3NzaWJsZVJlZmVyZW5jZXMgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgcmV0dXJuIGdlbmVyaWNQb2ludGVyO1xufVxuXG4vKipcbiAqICdnZXRJbnB1dFR5cGUnIGZ1bmN0aW9uXG4gKlxuICogLy8gICBzY2hlbWFcbiAqIC8vICB7IGFueSA9IG51bGwgfSBsYXlvdXROb2RlXG4gKiAvLyB7IHN0cmluZyB9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRJbnB1dFR5cGUoc2NoZW1hLCBsYXlvdXROb2RlOiBhbnkgPSBudWxsKSB7XG4gIC8vIHgtc2NoZW1hLWZvcm0gPSBBbmd1bGFyIFNjaGVtYSBGb3JtIGNvbXBhdGliaWxpdHlcbiAgLy8gd2lkZ2V0ICYgY29tcG9uZW50ID0gUmVhY3QgSnNvbnNjaGVtYSBGb3JtIGNvbXBhdGliaWxpdHlcbiAgbGV0IGNvbnRyb2xUeXBlID0gSnNvblBvaW50ZXIuZ2V0Rmlyc3QoW1xuICAgIFtzY2hlbWEsICcveC1zY2hlbWEtZm9ybS90eXBlJ10sXG4gICAgW3NjaGVtYSwgJy94LXNjaGVtYS1mb3JtL3dpZGdldC9jb21wb25lbnQnXSxcbiAgICBbc2NoZW1hLCAnL3gtc2NoZW1hLWZvcm0vd2lkZ2V0J10sXG4gICAgW3NjaGVtYSwgJy93aWRnZXQvY29tcG9uZW50J10sXG4gICAgW3NjaGVtYSwgJy93aWRnZXQnXVxuICBdKTtcbiAgaWYgKGlzU3RyaW5nKGNvbnRyb2xUeXBlKSkgeyByZXR1cm4gY2hlY2tJbmxpbmVUeXBlKGNvbnRyb2xUeXBlLCBzY2hlbWEsIGxheW91dE5vZGUpOyB9XG4gIGxldCBzY2hlbWFUeXBlID0gc2NoZW1hLnR5cGU7XG4gIGlmIChzY2hlbWFUeXBlKSB7XG4gICAgaWYgKGlzQXJyYXkoc2NoZW1hVHlwZSkpIHsgLy8gSWYgbXVsdGlwbGUgdHlwZXMgbGlzdGVkLCB1c2UgbW9zdCBpbmNsdXNpdmUgdHlwZVxuICAgICAgc2NoZW1hVHlwZSA9XG4gICAgICAgIGluQXJyYXkoJ29iamVjdCcsIHNjaGVtYVR5cGUpICYmIGhhc093bihzY2hlbWEsICdwcm9wZXJ0aWVzJykgPyAnb2JqZWN0JyA6XG4gICAgICAgIGluQXJyYXkoJ2FycmF5Jywgc2NoZW1hVHlwZSkgJiYgaGFzT3duKHNjaGVtYSwgJ2l0ZW1zJykgPyAnYXJyYXknIDpcbiAgICAgICAgaW5BcnJheSgnYXJyYXknLCBzY2hlbWFUeXBlKSAmJiBoYXNPd24oc2NoZW1hLCAnYWRkaXRpb25hbEl0ZW1zJykgPyAnYXJyYXknIDpcbiAgICAgICAgaW5BcnJheSgnc3RyaW5nJywgc2NoZW1hVHlwZSkgPyAnc3RyaW5nJyA6XG4gICAgICAgIGluQXJyYXkoJ251bWJlcicsIHNjaGVtYVR5cGUpID8gJ251bWJlcicgOlxuICAgICAgICBpbkFycmF5KCdpbnRlZ2VyJywgc2NoZW1hVHlwZSkgPyAnaW50ZWdlcicgOlxuICAgICAgICBpbkFycmF5KCdib29sZWFuJywgc2NoZW1hVHlwZSkgPyAnYm9vbGVhbicgOiAndW5rbm93bic7XG4gICAgfVxuICAgIGlmIChzY2hlbWFUeXBlID09PSAnYm9vbGVhbicpIHsgcmV0dXJuICdjaGVja2JveCc7IH1cbiAgICBpZiAoc2NoZW1hVHlwZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGlmIChoYXNPd24oc2NoZW1hLCAncHJvcGVydGllcycpIHx8IGhhc093bihzY2hlbWEsICdhZGRpdGlvbmFsUHJvcGVydGllcycpKSB7XG4gICAgICAgIHJldHVybiAnc2VjdGlvbic7XG4gICAgICB9XG4gICAgICAvLyBUT0RPOiBGaWd1cmUgb3V0IGhvdyB0byBoYW5kbGUgYWRkaXRpb25hbFByb3BlcnRpZXNcbiAgICAgIGlmIChoYXNPd24oc2NoZW1hLCAnJHJlZicpKSB7IHJldHVybiAnJHJlZic7IH1cbiAgICB9XG4gICAgaWYgKHNjaGVtYVR5cGUgPT09ICdhcnJheScpIHtcbiAgICAgIGxldCBpdGVtc09iamVjdCA9IEpzb25Qb2ludGVyLmdldEZpcnN0KFtcbiAgICAgICAgW3NjaGVtYSwgJy9pdGVtcyddLFxuICAgICAgICBbc2NoZW1hLCAnL2FkZGl0aW9uYWxJdGVtcyddXG4gICAgICBdKSB8fCB7fTtcbiAgICAgIHJldHVybiBoYXNPd24oaXRlbXNPYmplY3QsICdlbnVtJykgJiYgc2NoZW1hLm1heEl0ZW1zICE9PSAxID9cbiAgICAgICAgY2hlY2tJbmxpbmVUeXBlKCdjaGVja2JveGVzJywgc2NoZW1hLCBsYXlvdXROb2RlKSA6ICdhcnJheSc7XG4gICAgfVxuICAgIGlmIChzY2hlbWFUeXBlID09PSAnbnVsbCcpIHsgcmV0dXJuICdub25lJzsgfVxuICAgIGlmIChKc29uUG9pbnRlci5oYXMobGF5b3V0Tm9kZSwgJy9vcHRpb25zL3RpdGxlTWFwJykgfHxcbiAgICAgIGhhc093bihzY2hlbWEsICdlbnVtJykgfHwgZ2V0VGl0bGVNYXBGcm9tT25lT2Yoc2NoZW1hLCBudWxsLCB0cnVlKVxuICAgICkgeyByZXR1cm4gJ3NlbGVjdCc7IH1cbiAgICBpZiAoc2NoZW1hVHlwZSA9PT0gJ251bWJlcicgfHwgc2NoZW1hVHlwZSA9PT0gJ2ludGVnZXInKSB7XG4gICAgICByZXR1cm4gKHNjaGVtYVR5cGUgPT09ICdpbnRlZ2VyJyB8fCBoYXNPd24oc2NoZW1hLCAnbXVsdGlwbGVPZicpKSAmJlxuICAgICAgICBoYXNPd24oc2NoZW1hLCAnbWF4aW11bScpICYmIGhhc093bihzY2hlbWEsICdtaW5pbXVtJykgPyAncmFuZ2UnIDogc2NoZW1hVHlwZTtcbiAgICB9XG4gICAgaWYgKHNjaGVtYVR5cGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAnY29sb3InOiAnY29sb3InLFxuICAgICAgICAnZGF0ZSc6ICdkYXRlJyxcbiAgICAgICAgJ2RhdGUtdGltZSc6ICdkYXRldGltZS1sb2NhbCcsXG4gICAgICAgICdlbWFpbCc6ICdlbWFpbCcsXG4gICAgICAgICd1cmknOiAndXJsJyxcbiAgICAgIH1bc2NoZW1hLmZvcm1hdF0gfHwgJ3RleHQnO1xuICAgIH1cbiAgfVxuICBpZiAoaGFzT3duKHNjaGVtYSwgJyRyZWYnKSkgeyByZXR1cm4gJyRyZWYnOyB9XG4gIGlmIChpc0FycmF5KHNjaGVtYS5vbmVPZikgfHwgaXNBcnJheShzY2hlbWEuYW55T2YpKSB7IHJldHVybiAnb25lLW9mJzsgfVxuICBjb25zb2xlLmVycm9yKGBnZXRJbnB1dFR5cGUgZXJyb3I6IFVuYWJsZSB0byBkZXRlcm1pbmUgaW5wdXQgdHlwZSBmb3IgJHtzY2hlbWFUeXBlfWApO1xuICBjb25zb2xlLmVycm9yKCdzY2hlbWEnLCBzY2hlbWEpO1xuICBpZiAobGF5b3V0Tm9kZSkgeyBjb25zb2xlLmVycm9yKCdsYXlvdXROb2RlJywgbGF5b3V0Tm9kZSk7IH1cbiAgcmV0dXJuICdub25lJztcbn1cblxuLyoqXG4gKiAnY2hlY2tJbmxpbmVUeXBlJyBmdW5jdGlvblxuICpcbiAqIENoZWNrcyBsYXlvdXQgYW5kIHNjaGVtYSBub2RlcyBmb3IgJ2lubGluZTogdHJ1ZScsIGFuZCBjb252ZXJ0c1xuICogJ3JhZGlvcycgb3IgJ2NoZWNrYm94ZXMnIHRvICdyYWRpb3MtaW5saW5lJyBvciAnY2hlY2tib3hlcy1pbmxpbmUnXG4gKlxuICogLy8gIHsgc3RyaW5nIH0gY29udHJvbFR5cGUgLVxuICogLy8gICBzY2hlbWEgLVxuICogLy8gIHsgYW55ID0gbnVsbCB9IGxheW91dE5vZGUgLVxuICogLy8geyBzdHJpbmcgfVxuICovXG5leHBvcnQgZnVuY3Rpb24gY2hlY2tJbmxpbmVUeXBlKGNvbnRyb2xUeXBlLCBzY2hlbWEsIGxheW91dE5vZGU6IGFueSA9IG51bGwpIHtcbiAgaWYgKCFpc1N0cmluZyhjb250cm9sVHlwZSkgfHwgKFxuICAgIGNvbnRyb2xUeXBlLnNsaWNlKDAsIDgpICE9PSAnY2hlY2tib3gnICYmIGNvbnRyb2xUeXBlLnNsaWNlKDAsIDUpICE9PSAncmFkaW8nXG4gICkpIHtcbiAgICByZXR1cm4gY29udHJvbFR5cGU7XG4gIH1cbiAgaWYgKFxuICAgIEpzb25Qb2ludGVyLmdldEZpcnN0KFtcbiAgICAgIFtsYXlvdXROb2RlLCAnL2lubGluZSddLFxuICAgICAgW2xheW91dE5vZGUsICcvb3B0aW9ucy9pbmxpbmUnXSxcbiAgICAgIFtzY2hlbWEsICcvaW5saW5lJ10sXG4gICAgICBbc2NoZW1hLCAnL3gtc2NoZW1hLWZvcm0vaW5saW5lJ10sXG4gICAgICBbc2NoZW1hLCAnL3gtc2NoZW1hLWZvcm0vb3B0aW9ucy9pbmxpbmUnXSxcbiAgICAgIFtzY2hlbWEsICcveC1zY2hlbWEtZm9ybS93aWRnZXQvaW5saW5lJ10sXG4gICAgICBbc2NoZW1hLCAnL3gtc2NoZW1hLWZvcm0vd2lkZ2V0L2NvbXBvbmVudC9pbmxpbmUnXSxcbiAgICAgIFtzY2hlbWEsICcveC1zY2hlbWEtZm9ybS93aWRnZXQvY29tcG9uZW50L29wdGlvbnMvaW5saW5lJ10sXG4gICAgICBbc2NoZW1hLCAnL3dpZGdldC9pbmxpbmUnXSxcbiAgICAgIFtzY2hlbWEsICcvd2lkZ2V0L2NvbXBvbmVudC9pbmxpbmUnXSxcbiAgICAgIFtzY2hlbWEsICcvd2lkZ2V0L2NvbXBvbmVudC9vcHRpb25zL2lubGluZSddLFxuICAgIF0pID09PSB0cnVlXG4gICkge1xuICAgIHJldHVybiBjb250cm9sVHlwZS5zbGljZSgwLCA1KSA9PT0gJ3JhZGlvJyA/XG4gICAgICAncmFkaW9zLWlubGluZScgOiAnY2hlY2tib3hlcy1pbmxpbmUnO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBjb250cm9sVHlwZTtcbiAgfVxufVxuXG4vKipcbiAqICdpc0lucHV0UmVxdWlyZWQnIGZ1bmN0aW9uXG4gKlxuICogQ2hlY2tzIGEgSlNPTiBTY2hlbWEgdG8gc2VlIGlmIGFuIGl0ZW0gaXMgcmVxdWlyZWRcbiAqXG4gKiAvLyAgIHNjaGVtYSAtIHRoZSBzY2hlbWEgdG8gY2hlY2tcbiAqIC8vICB7IHN0cmluZyB9IHNjaGVtYVBvaW50ZXIgLSB0aGUgcG9pbnRlciB0byB0aGUgaXRlbSB0byBjaGVja1xuICogLy8geyBib29sZWFuIH0gLSB0cnVlIGlmIHRoZSBpdGVtIGlzIHJlcXVpcmVkLCBmYWxzZSBpZiBub3RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzSW5wdXRSZXF1aXJlZChzY2hlbWEsIHNjaGVtYVBvaW50ZXIpIHtcbiAgaWYgKCFpc09iamVjdChzY2hlbWEpKSB7XG4gICAgY29uc29sZS5lcnJvcignaXNJbnB1dFJlcXVpcmVkIGVycm9yOiBJbnB1dCBzY2hlbWEgbXVzdCBiZSBhbiBvYmplY3QuJyk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGNvbnN0IGxpc3RQb2ludGVyQXJyYXkgPSBKc29uUG9pbnRlci5wYXJzZShzY2hlbWFQb2ludGVyKTtcbiAgaWYgKGlzQXJyYXkobGlzdFBvaW50ZXJBcnJheSkpIHtcbiAgICBpZiAoIWxpc3RQb2ludGVyQXJyYXkubGVuZ3RoKSB7IHJldHVybiBzY2hlbWEucmVxdWlyZWQgPT09IHRydWU7IH1cbiAgICBjb25zdCBrZXlOYW1lID0gbGlzdFBvaW50ZXJBcnJheS5wb3AoKTtcbiAgICBjb25zdCBuZXh0VG9MYXN0S2V5ID0gbGlzdFBvaW50ZXJBcnJheVtsaXN0UG9pbnRlckFycmF5Lmxlbmd0aCAtIDFdO1xuICAgIGlmIChbJ3Byb3BlcnRpZXMnLCAnYWRkaXRpb25hbFByb3BlcnRpZXMnLCAncGF0dGVyblByb3BlcnRpZXMnLCAnaXRlbXMnLCAnYWRkaXRpb25hbEl0ZW1zJ11cbiAgICAgIC5pbmNsdWRlcyhuZXh0VG9MYXN0S2V5KVxuICAgICkge1xuICAgICAgbGlzdFBvaW50ZXJBcnJheS5wb3AoKTtcbiAgICB9XG4gICAgY29uc3QgcGFyZW50U2NoZW1hID0gSnNvblBvaW50ZXIuZ2V0KHNjaGVtYSwgbGlzdFBvaW50ZXJBcnJheSkgfHwge307XG4gICAgaWYgKGlzQXJyYXkocGFyZW50U2NoZW1hLnJlcXVpcmVkKSkge1xuICAgICAgcmV0dXJuIHBhcmVudFNjaGVtYS5yZXF1aXJlZC5pbmNsdWRlcyhrZXlOYW1lKTtcbiAgICB9XG4gICAgaWYgKHBhcmVudFNjaGVtYS50eXBlID09PSAnYXJyYXknKSB7XG4gICAgICByZXR1cm4gaGFzT3duKHBhcmVudFNjaGVtYSwgJ21pbkl0ZW1zJykgJiZcbiAgICAgICAgaXNOdW1iZXIoa2V5TmFtZSkgJiZcbiAgICAgICAgK3BhcmVudFNjaGVtYS5taW5JdGVtcyA+ICtrZXlOYW1lO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2U7XG59O1xuXG4vKipcbiAqICd1cGRhdGVJbnB1dE9wdGlvbnMnIGZ1bmN0aW9uXG4gKlxuICogLy8gICBsYXlvdXROb2RlXG4gKiAvLyAgIHNjaGVtYVxuICogLy8gICBqc2ZcbiAqIC8vIHsgdm9pZCB9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVJbnB1dE9wdGlvbnMobGF5b3V0Tm9kZSwgc2NoZW1hLCBqc2YpIHtcbiAgaWYgKCFpc09iamVjdChsYXlvdXROb2RlKSB8fCAhaXNPYmplY3QobGF5b3V0Tm9kZS5vcHRpb25zKSkgeyByZXR1cm47IH1cblxuICAvLyBTZXQgYWxsIG9wdGlvbiB2YWx1ZXMgaW4gbGF5b3V0Tm9kZS5vcHRpb25zXG4gIGxldCBuZXdPcHRpb25zOiBhbnkgPSB7IH07XG4gIGNvbnN0IGZpeFVpS2V5cyA9IGtleSA9PiBrZXkuc2xpY2UoMCwgMykudG9Mb3dlckNhc2UoKSA9PT0gJ3VpOicgPyBrZXkuc2xpY2UoMykgOiBrZXk7XG4gIG1lcmdlRmlsdGVyZWRPYmplY3QobmV3T3B0aW9ucywganNmLmZvcm1PcHRpb25zLmRlZmF1dFdpZGdldE9wdGlvbnMsIFtdLCBmaXhVaUtleXMpO1xuICBbIFsgSnNvblBvaW50ZXIuZ2V0KHNjaGVtYSwgJy91aTp3aWRnZXQvb3B0aW9ucycpLCBbXSBdLFxuICAgIFsgSnNvblBvaW50ZXIuZ2V0KHNjaGVtYSwgJy91aTp3aWRnZXQnKSwgW10gXSxcbiAgICBbIHNjaGVtYSwgW1xuICAgICAgJ2FkZGl0aW9uYWxQcm9wZXJ0aWVzJywgJ2FkZGl0aW9uYWxJdGVtcycsICdwcm9wZXJ0aWVzJywgJ2l0ZW1zJyxcbiAgICAgICdyZXF1aXJlZCcsICd0eXBlJywgJ3gtc2NoZW1hLWZvcm0nLCAnJHJlZidcbiAgICBdIF0sXG4gICAgWyBKc29uUG9pbnRlci5nZXQoc2NoZW1hLCAnL3gtc2NoZW1hLWZvcm0vb3B0aW9ucycpLCBbXSBdLFxuICAgIFsgSnNvblBvaW50ZXIuZ2V0KHNjaGVtYSwgJy94LXNjaGVtYS1mb3JtJyksIFsnaXRlbXMnLCAnb3B0aW9ucyddIF0sXG4gICAgWyBsYXlvdXROb2RlLCBbXG4gICAgICAnX2lkJywgJyRyZWYnLCAnYXJyYXlJdGVtJywgJ2FycmF5SXRlbVR5cGUnLCAnZGF0YVBvaW50ZXInLCAnZGF0YVR5cGUnLFxuICAgICAgJ2l0ZW1zJywgJ2tleScsICduYW1lJywgJ29wdGlvbnMnLCAncmVjdXJzaXZlUmVmZXJlbmNlJywgJ3R5cGUnLCAnd2lkZ2V0J1xuICAgIF0gXSxcbiAgICBbIGxheW91dE5vZGUub3B0aW9ucywgW10gXSxcbiAgXS5mb3JFYWNoKChbIG9iamVjdCwgZXhjbHVkZUtleXMgXSkgPT5cbiAgICBtZXJnZUZpbHRlcmVkT2JqZWN0KG5ld09wdGlvbnMsIG9iamVjdCwgZXhjbHVkZUtleXMsIGZpeFVpS2V5cylcbiAgKTtcbiAgaWYgKCFoYXNPd24obmV3T3B0aW9ucywgJ3RpdGxlTWFwJykpIHtcbiAgICBsZXQgbmV3VGl0bGVNYXA6IGFueSA9IG51bGw7XG4gICAgbmV3VGl0bGVNYXAgPSBnZXRUaXRsZU1hcEZyb21PbmVPZihzY2hlbWEsIG5ld09wdGlvbnMuZmxhdExpc3QpO1xuICAgIGlmIChuZXdUaXRsZU1hcCkgeyBuZXdPcHRpb25zLnRpdGxlTWFwID0gbmV3VGl0bGVNYXA7IH1cbiAgICBpZiAoIWhhc093bihuZXdPcHRpb25zLCAndGl0bGVNYXAnKSAmJiAhaGFzT3duKG5ld09wdGlvbnMsICdlbnVtJykgJiYgaGFzT3duKHNjaGVtYSwgJ2l0ZW1zJykpIHtcbiAgICAgIGlmIChKc29uUG9pbnRlci5oYXMoc2NoZW1hLCAnL2l0ZW1zL3RpdGxlTWFwJykpIHtcbiAgICAgICAgbmV3T3B0aW9ucy50aXRsZU1hcCA9IHNjaGVtYS5pdGVtcy50aXRsZU1hcDtcbiAgICAgIH0gZWxzZSBpZiAoSnNvblBvaW50ZXIuaGFzKHNjaGVtYSwgJy9pdGVtcy9lbnVtJykpIHtcbiAgICAgICAgbmV3T3B0aW9ucy5lbnVtID0gc2NoZW1hLml0ZW1zLmVudW07XG4gICAgICAgIGlmICghaGFzT3duKG5ld09wdGlvbnMsICdlbnVtTmFtZXMnKSAmJiBKc29uUG9pbnRlci5oYXMoc2NoZW1hLCAnL2l0ZW1zL2VudW1OYW1lcycpKSB7XG4gICAgICAgICAgbmV3T3B0aW9ucy5lbnVtTmFtZXMgPSBzY2hlbWEuaXRlbXMuZW51bU5hbWVzO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKEpzb25Qb2ludGVyLmhhcyhzY2hlbWEsICcvaXRlbXMvb25lT2YnKSkge1xuICAgICAgICBuZXdUaXRsZU1hcCA9IGdldFRpdGxlTWFwRnJvbU9uZU9mKHNjaGVtYS5pdGVtcywgbmV3T3B0aW9ucy5mbGF0TGlzdCk7XG4gICAgICAgIGlmIChuZXdUaXRsZU1hcCkgeyBuZXdPcHRpb25zLnRpdGxlTWFwID0gbmV3VGl0bGVNYXA7IH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBJZiBzY2hlbWEgdHlwZSBpcyBpbnRlZ2VyLCBlbmZvcmNlIGJ5IHNldHRpbmcgbXVsdGlwbGVPZiA9IDFcbiAgaWYgKHNjaGVtYS50eXBlID09PSAnaW50ZWdlcicgJiYgIWhhc1ZhbHVlKG5ld09wdGlvbnMubXVsdGlwbGVPZikpIHtcbiAgICBuZXdPcHRpb25zLm11bHRpcGxlT2YgPSAxO1xuICB9XG5cbiAgLy8gQ29weSBhbnkgdHlwZWFoZWFkIHdvcmQgbGlzdHMgdG8gb3B0aW9ucy50eXBlYWhlYWQuc291cmNlXG4gIGlmIChKc29uUG9pbnRlci5oYXMobmV3T3B0aW9ucywgJy9hdXRvY29tcGxldGUvc291cmNlJykpIHtcbiAgICBuZXdPcHRpb25zLnR5cGVhaGVhZCA9IG5ld09wdGlvbnMuYXV0b2NvbXBsZXRlO1xuICB9IGVsc2UgaWYgKEpzb25Qb2ludGVyLmhhcyhuZXdPcHRpb25zLCAnL3RhZ3NpbnB1dC9zb3VyY2UnKSkge1xuICAgIG5ld09wdGlvbnMudHlwZWFoZWFkID0gbmV3T3B0aW9ucy50YWdzaW5wdXQ7XG4gIH0gZWxzZSBpZiAoSnNvblBvaW50ZXIuaGFzKG5ld09wdGlvbnMsICcvdGFnc2lucHV0L3R5cGVhaGVhZC9zb3VyY2UnKSkge1xuICAgIG5ld09wdGlvbnMudHlwZWFoZWFkID0gbmV3T3B0aW9ucy50YWdzaW5wdXQudHlwZWFoZWFkO1xuICB9XG5cbiAgbGF5b3V0Tm9kZS5vcHRpb25zID0gbmV3T3B0aW9ucztcbn1cblxuLyoqXG4gKiAnZ2V0VGl0bGVNYXBGcm9tT25lT2YnIGZ1bmN0aW9uXG4gKlxuICogLy8gIHsgc2NoZW1hIH0gc2NoZW1hXG4gKiAvLyAgeyBib29sZWFuID0gbnVsbCB9IGZsYXRMaXN0XG4gKiAvLyAgeyBib29sZWFuID0gZmFsc2UgfSB2YWxpZGF0ZU9ubHlcbiAqIC8vIHsgdmFsaWRhdG9ycyB9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRUaXRsZU1hcEZyb21PbmVPZihcbiAgc2NoZW1hOiBhbnkgPSB7fSwgZmxhdExpc3Q6IGJvb2xlYW4gPSBudWxsLCB2YWxpZGF0ZU9ubHkgPSBmYWxzZVxuKSB7XG4gIGxldCB0aXRsZU1hcCA9IG51bGw7XG4gIGNvbnN0IG9uZU9mID0gc2NoZW1hLm9uZU9mIHx8IHNjaGVtYS5hbnlPZiB8fCBudWxsO1xuICBpZiAoaXNBcnJheShvbmVPZikgJiYgb25lT2YuZXZlcnkoaXRlbSA9PiBpdGVtLnRpdGxlKSkge1xuICAgIGlmIChvbmVPZi5ldmVyeShpdGVtID0+IGlzQXJyYXkoaXRlbS5lbnVtKSAmJiBpdGVtLmVudW0ubGVuZ3RoID09PSAxKSkge1xuICAgICAgaWYgKHZhbGlkYXRlT25seSkgeyByZXR1cm4gdHJ1ZTsgfVxuICAgICAgdGl0bGVNYXAgPSBvbmVPZi5tYXAoaXRlbSA9PiAoeyBuYW1lOiBpdGVtLnRpdGxlLCB2YWx1ZTogaXRlbS5lbnVtWzBdIH0pKTtcbiAgICB9IGVsc2UgaWYgKG9uZU9mLmV2ZXJ5KGl0ZW0gPT4gaXRlbS5jb25zdCkpIHtcbiAgICAgIGlmICh2YWxpZGF0ZU9ubHkpIHsgcmV0dXJuIHRydWU7IH1cbiAgICAgIHRpdGxlTWFwID0gb25lT2YubWFwKGl0ZW0gPT4gKHsgbmFtZTogaXRlbS50aXRsZSwgdmFsdWU6IGl0ZW0uY29uc3QgfSkpO1xuICAgIH1cblxuICAgIC8vIGlmIGZsYXRMaXN0ICE9PSBmYWxzZSBhbmQgc29tZSBpdGVtcyBoYXZlIGNvbG9ucywgbWFrZSBncm91cGVkIG1hcFxuICAgIGlmIChmbGF0TGlzdCAhPT0gZmFsc2UgJiYgKHRpdGxlTWFwIHx8IFtdKVxuICAgICAgLmZpbHRlcih0aXRsZSA9PiAoKHRpdGxlIHx8IHt9KS5uYW1lIHx8ICcnKS5pbmRleE9mKCc6ICcpKS5sZW5ndGggPiAxXG4gICAgKSB7XG5cbiAgICAgIC8vIFNwbGl0IG5hbWUgb24gZmlyc3QgY29sb24gdG8gY3JlYXRlIGdyb3VwZWQgbWFwIChuYW1lIC0+IGdyb3VwOiBuYW1lKVxuICAgICAgY29uc3QgbmV3VGl0bGVNYXAgPSB0aXRsZU1hcC5tYXAodGl0bGUgPT4ge1xuICAgICAgICBsZXQgW2dyb3VwLCBuYW1lXSA9IHRpdGxlLm5hbWUuc3BsaXQoLzogKC4rKS8pO1xuICAgICAgICByZXR1cm4gZ3JvdXAgJiYgbmFtZSA/IHsgLi4udGl0bGUsIGdyb3VwLCBuYW1lIH0gOiB0aXRsZTtcbiAgICAgIH0pO1xuXG4gICAgICAvLyBJZiBmbGF0TGlzdCA9PT0gdHJ1ZSBvciBhdCBsZWFzdCBvbmUgZ3JvdXAgaGFzIG11bHRpcGxlIGl0ZW1zLCB1c2UgZ3JvdXBlZCBtYXBcbiAgICAgIGlmIChmbGF0TGlzdCA9PT0gdHJ1ZSB8fCBuZXdUaXRsZU1hcC5zb21lKCh0aXRsZSwgaW5kZXgpID0+IGluZGV4ICYmXG4gICAgICAgIGhhc093bih0aXRsZSwgJ2dyb3VwJykgJiYgdGl0bGUuZ3JvdXAgPT09IG5ld1RpdGxlTWFwW2luZGV4IC0gMV0uZ3JvdXBcbiAgICAgICkpIHtcbiAgICAgICAgdGl0bGVNYXAgPSBuZXdUaXRsZU1hcDtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHZhbGlkYXRlT25seSA/IGZhbHNlIDogdGl0bGVNYXA7XG59XG5cbi8qKlxuICogJ2dldENvbnRyb2xWYWxpZGF0b3JzJyBmdW5jdGlvblxuICpcbiAqIC8vICBzY2hlbWFcbiAqIC8vIHsgdmFsaWRhdG9ycyB9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRDb250cm9sVmFsaWRhdG9ycyhzY2hlbWEpIHtcbiAgaWYgKCFpc09iamVjdChzY2hlbWEpKSB7IHJldHVybiBudWxsOyB9XG4gIGxldCB2YWxpZGF0b3JzOiBhbnkgPSB7IH07XG4gIGlmIChoYXNPd24oc2NoZW1hLCAndHlwZScpKSB7XG4gICAgc3dpdGNoIChzY2hlbWEudHlwZSkge1xuICAgICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgICAgZm9yRWFjaChbJ3BhdHRlcm4nLCAnZm9ybWF0JywgJ21pbkxlbmd0aCcsICdtYXhMZW5ndGgnXSwgKHByb3ApID0+IHtcbiAgICAgICAgICBpZiAoaGFzT3duKHNjaGVtYSwgcHJvcCkpIHsgdmFsaWRhdG9yc1twcm9wXSA9IFtzY2hlbWFbcHJvcF1dOyB9XG4gICAgICAgIH0pO1xuICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdudW1iZXInOiBjYXNlICdpbnRlZ2VyJzpcbiAgICAgICAgZm9yRWFjaChbJ01pbmltdW0nLCAnTWF4aW11bSddLCAodWNMaW1pdCkgPT4ge1xuICAgICAgICAgIGxldCBlTGltaXQgPSAnZXhjbHVzaXZlJyArIHVjTGltaXQ7XG4gICAgICAgICAgbGV0IGxpbWl0ID0gdWNMaW1pdC50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgIGlmIChoYXNPd24oc2NoZW1hLCBsaW1pdCkpIHtcbiAgICAgICAgICAgIGxldCBleGNsdXNpdmUgPSBoYXNPd24oc2NoZW1hLCBlTGltaXQpICYmIHNjaGVtYVtlTGltaXRdID09PSB0cnVlO1xuICAgICAgICAgICAgdmFsaWRhdG9yc1tsaW1pdF0gPSBbc2NoZW1hW2xpbWl0XSwgZXhjbHVzaXZlXTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBmb3JFYWNoKFsnbXVsdGlwbGVPZicsICd0eXBlJ10sIChwcm9wKSA9PiB7XG4gICAgICAgICAgaWYgKGhhc093bihzY2hlbWEsIHByb3ApKSB7IHZhbGlkYXRvcnNbcHJvcF0gPSBbc2NoZW1hW3Byb3BdXTsgfVxuICAgICAgICB9KTtcbiAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgICAgZm9yRWFjaChbJ21pblByb3BlcnRpZXMnLCAnbWF4UHJvcGVydGllcycsICdkZXBlbmRlbmNpZXMnXSwgKHByb3ApID0+IHtcbiAgICAgICAgICBpZiAoaGFzT3duKHNjaGVtYSwgcHJvcCkpIHsgdmFsaWRhdG9yc1twcm9wXSA9IFtzY2hlbWFbcHJvcF1dOyB9XG4gICAgICAgIH0pO1xuICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdhcnJheSc6XG4gICAgICAgIGZvckVhY2goWydtaW5JdGVtcycsICdtYXhJdGVtcycsICd1bmlxdWVJdGVtcyddLCAocHJvcCkgPT4ge1xuICAgICAgICAgIGlmIChoYXNPd24oc2NoZW1hLCBwcm9wKSkgeyB2YWxpZGF0b3JzW3Byb3BdID0gW3NjaGVtYVtwcm9wXV07IH1cbiAgICAgICAgfSk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgaWYgKGhhc093bihzY2hlbWEsICdlbnVtJykpIHsgdmFsaWRhdG9ycy5lbnVtID0gW3NjaGVtYS5lbnVtXTsgfVxuICByZXR1cm4gdmFsaWRhdG9ycztcbn1cblxuLyoqXG4gKiAncmVzb2x2ZVNjaGVtYVJlZmVyZW5jZXMnIGZ1bmN0aW9uXG4gKlxuICogRmluZCBhbGwgJHJlZiBsaW5rcyBpbiBzY2hlbWEgYW5kIHNhdmUgbGlua3MgYW5kIHJlZmVyZW5jZWQgc2NoZW1hcyBpblxuICogc2NoZW1hUmVmTGlicmFyeSwgc2NoZW1hUmVjdXJzaXZlUmVmTWFwLCBhbmQgZGF0YVJlY3Vyc2l2ZVJlZk1hcFxuICpcbiAqIC8vICBzY2hlbWFcbiAqIC8vICBzY2hlbWFSZWZMaWJyYXJ5XG4gKiAvLyB7IE1hcDxzdHJpbmcsIHN0cmluZz4gfSBzY2hlbWFSZWN1cnNpdmVSZWZNYXBcbiAqIC8vIHsgTWFwPHN0cmluZywgc3RyaW5nPiB9IGRhdGFSZWN1cnNpdmVSZWZNYXBcbiAqIC8vIHsgTWFwPHN0cmluZywgbnVtYmVyPiB9IGFycmF5TWFwXG4gKiAvLyBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlc29sdmVTY2hlbWFSZWZlcmVuY2VzKFxuICBzY2hlbWEsIHNjaGVtYVJlZkxpYnJhcnksIHNjaGVtYVJlY3Vyc2l2ZVJlZk1hcCwgZGF0YVJlY3Vyc2l2ZVJlZk1hcCwgYXJyYXlNYXBcbikge1xuICBpZiAoIWlzT2JqZWN0KHNjaGVtYSkpIHtcbiAgICBjb25zb2xlLmVycm9yKCdyZXNvbHZlU2NoZW1hUmVmZXJlbmNlcyBlcnJvcjogc2NoZW1hIG11c3QgYmUgYW4gb2JqZWN0LicpO1xuICAgIHJldHVybjtcbiAgfVxuICBjb25zdCByZWZMaW5rcyA9IG5ldyBTZXQ8c3RyaW5nPigpO1xuICBjb25zdCByZWZNYXBTZXQgPSBuZXcgU2V0PHN0cmluZz4oKTtcbiAgY29uc3QgcmVmTWFwID0gbmV3IE1hcDxzdHJpbmcsIHN0cmluZz4oKTtcbiAgY29uc3QgcmVjdXJzaXZlUmVmTWFwID0gbmV3IE1hcDxzdHJpbmcsIHN0cmluZz4oKTtcbiAgY29uc3QgcmVmTGlicmFyeTogYW55ID0ge307XG5cbiAgLy8gU2VhcmNoIHNjaGVtYSBmb3IgYWxsICRyZWYgbGlua3MsIGFuZCBidWlsZCBmdWxsIHJlZkxpYnJhcnlcbiAgSnNvblBvaW50ZXIuZm9yRWFjaERlZXAoc2NoZW1hLCAoc3ViU2NoZW1hLCBzdWJTY2hlbWFQb2ludGVyKSA9PiB7XG4gICAgaWYgKGhhc093bihzdWJTY2hlbWEsICckcmVmJykgJiYgaXNTdHJpbmcoc3ViU2NoZW1hWyckcmVmJ10pKSB7XG4gICAgICBjb25zdCByZWZQb2ludGVyID0gSnNvblBvaW50ZXIuY29tcGlsZShzdWJTY2hlbWFbJyRyZWYnXSk7XG4gICAgICByZWZMaW5rcy5hZGQocmVmUG9pbnRlcik7XG4gICAgICByZWZNYXBTZXQuYWRkKHN1YlNjaGVtYVBvaW50ZXIgKyAnfn4nICsgcmVmUG9pbnRlcik7XG4gICAgICByZWZNYXAuc2V0KHN1YlNjaGVtYVBvaW50ZXIsIHJlZlBvaW50ZXIpO1xuICAgIH1cbiAgfSk7XG4gIHJlZkxpbmtzLmZvckVhY2gocmVmID0+IHJlZkxpYnJhcnlbcmVmXSA9IGdldFN1YlNjaGVtYShzY2hlbWEsIHJlZikpO1xuXG4gIC8vIEZvbGxvdyBhbGwgcmVmIGxpbmtzIGFuZCBzYXZlIGluIHJlZk1hcFNldCxcbiAgLy8gdG8gZmluZCBhbnkgbXVsdGktbGluayByZWN1cnNpdmUgcmVmZXJuY2VzXG4gIGxldCBjaGVja1JlZkxpbmtzID0gdHJ1ZTtcbiAgd2hpbGUgKGNoZWNrUmVmTGlua3MpIHtcbiAgICBjaGVja1JlZkxpbmtzID0gZmFsc2U7XG4gICAgQXJyYXkuZnJvbShyZWZNYXApLmZvckVhY2goKFtmcm9tUmVmMSwgdG9SZWYxXSkgPT4gQXJyYXkuZnJvbShyZWZNYXApXG4gICAgICAuZmlsdGVyKChbZnJvbVJlZjIsIHRvUmVmMl0pID0+XG4gICAgICAgIEpzb25Qb2ludGVyLmlzU3ViUG9pbnRlcih0b1JlZjEsIGZyb21SZWYyLCB0cnVlKSAmJlxuICAgICAgICAhSnNvblBvaW50ZXIuaXNTdWJQb2ludGVyKHRvUmVmMiwgdG9SZWYxLCB0cnVlKSAmJlxuICAgICAgICAhcmVmTWFwU2V0Lmhhcyhmcm9tUmVmMSArIGZyb21SZWYyLnNsaWNlKHRvUmVmMS5sZW5ndGgpICsgJ35+JyArIHRvUmVmMilcbiAgICAgIClcbiAgICAgIC5mb3JFYWNoKChbZnJvbVJlZjIsIHRvUmVmMl0pID0+IHtcbiAgICAgICAgcmVmTWFwU2V0LmFkZChmcm9tUmVmMSArIGZyb21SZWYyLnNsaWNlKHRvUmVmMS5sZW5ndGgpICsgJ35+JyArIHRvUmVmMik7XG4gICAgICAgIGNoZWNrUmVmTGlua3MgPSB0cnVlO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgLy8gQnVpbGQgZnVsbCByZWN1cnNpdmVSZWZNYXBcbiAgLy8gRmlyc3QgcGFzcyAtIHNhdmUgYWxsIGludGVybmFsbHkgcmVjdXJzaXZlIHJlZnMgZnJvbSByZWZNYXBTZXRcbiAgQXJyYXkuZnJvbShyZWZNYXBTZXQpXG4gICAgLm1hcChyZWZMaW5rID0+IHJlZkxpbmsuc3BsaXQoJ35+JykpXG4gICAgLmZpbHRlcigoW2Zyb21SZWYsIHRvUmVmXSkgPT4gSnNvblBvaW50ZXIuaXNTdWJQb2ludGVyKHRvUmVmLCBmcm9tUmVmKSlcbiAgICAuZm9yRWFjaCgoW2Zyb21SZWYsIHRvUmVmXSkgPT4gcmVjdXJzaXZlUmVmTWFwLnNldChmcm9tUmVmLCB0b1JlZikpO1xuICAvLyBTZWNvbmQgcGFzcyAtIGNyZWF0ZSByZWN1cnNpdmUgdmVyc2lvbnMgb2YgYW55IG90aGVyIHJlZnMgdGhhdCBsaW5rIHRvIHJlY3Vyc2l2ZSByZWZzXG4gIEFycmF5LmZyb20ocmVmTWFwKVxuICAgIC5maWx0ZXIoKFtmcm9tUmVmMSwgdG9SZWYxXSkgPT4gQXJyYXkuZnJvbShyZWN1cnNpdmVSZWZNYXAua2V5cygpKVxuICAgICAgLmV2ZXJ5KGZyb21SZWYyID0+ICFKc29uUG9pbnRlci5pc1N1YlBvaW50ZXIoZnJvbVJlZjEsIGZyb21SZWYyLCB0cnVlKSlcbiAgICApXG4gICAgLmZvckVhY2goKFtmcm9tUmVmMSwgdG9SZWYxXSkgPT4gQXJyYXkuZnJvbShyZWN1cnNpdmVSZWZNYXApXG4gICAgICAuZmlsdGVyKChbZnJvbVJlZjIsIHRvUmVmMl0pID0+XG4gICAgICAgICFyZWN1cnNpdmVSZWZNYXAuaGFzKGZyb21SZWYxICsgZnJvbVJlZjIuc2xpY2UodG9SZWYxLmxlbmd0aCkpICYmXG4gICAgICAgIEpzb25Qb2ludGVyLmlzU3ViUG9pbnRlcih0b1JlZjEsIGZyb21SZWYyLCB0cnVlKSAmJlxuICAgICAgICAhSnNvblBvaW50ZXIuaXNTdWJQb2ludGVyKHRvUmVmMSwgZnJvbVJlZjEsIHRydWUpXG4gICAgICApXG4gICAgICAuZm9yRWFjaCgoW2Zyb21SZWYyLCB0b1JlZjJdKSA9PiByZWN1cnNpdmVSZWZNYXAuc2V0KFxuICAgICAgICBmcm9tUmVmMSArIGZyb21SZWYyLnNsaWNlKHRvUmVmMS5sZW5ndGgpLFxuICAgICAgICBmcm9tUmVmMSArIHRvUmVmMi5zbGljZSh0b1JlZjEubGVuZ3RoKVxuICAgICAgKSlcbiAgICApO1xuXG4gIC8vIENyZWF0ZSBjb21waWxlZCBzY2hlbWEgYnkgcmVwbGFjaW5nIGFsbCBub24tcmVjdXJzaXZlICRyZWYgbGlua3Mgd2l0aFxuICAvLyB0aGllaXIgbGlua2VkIHNjaGVtYXMgYW5kLCB3aGVyZSBwb3NzaWJsZSwgY29tYmluaW5nIHNjaGVtYXMgaW4gYWxsT2YgYXJyYXlzLlxuICBsZXQgY29tcGlsZWRTY2hlbWEgPSB7IC4uLnNjaGVtYSB9O1xuICBkZWxldGUgY29tcGlsZWRTY2hlbWEuZGVmaW5pdGlvbnM7XG4gIGNvbXBpbGVkU2NoZW1hID1cbiAgICBnZXRTdWJTY2hlbWEoY29tcGlsZWRTY2hlbWEsICcnLCByZWZMaWJyYXJ5LCByZWN1cnNpdmVSZWZNYXApO1xuXG4gIC8vIE1ha2Ugc3VyZSBhbGwgcmVtYWluaW5nIHNjaGVtYSAkcmVmcyBhcmUgcmVjdXJzaXZlLCBhbmQgYnVpbGQgZmluYWxcbiAgLy8gc2NoZW1hUmVmTGlicmFyeSwgc2NoZW1hUmVjdXJzaXZlUmVmTWFwLCBkYXRhUmVjdXJzaXZlUmVmTWFwLCAmIGFycmF5TWFwXG4gIEpzb25Qb2ludGVyLmZvckVhY2hEZWVwKGNvbXBpbGVkU2NoZW1hLCAoc3ViU2NoZW1hLCBzdWJTY2hlbWFQb2ludGVyKSA9PiB7XG4gICAgaWYgKGlzU3RyaW5nKHN1YlNjaGVtYVsnJHJlZiddKSkge1xuICAgICAgbGV0IHJlZlBvaW50ZXIgPSBKc29uUG9pbnRlci5jb21waWxlKHN1YlNjaGVtYVsnJHJlZiddKTtcbiAgICAgIGlmICghSnNvblBvaW50ZXIuaXNTdWJQb2ludGVyKHJlZlBvaW50ZXIsIHN1YlNjaGVtYVBvaW50ZXIsIHRydWUpKSB7XG4gICAgICAgIHJlZlBvaW50ZXIgPSByZW1vdmVSZWN1cnNpdmVSZWZlcmVuY2VzKHN1YlNjaGVtYVBvaW50ZXIsIHJlY3Vyc2l2ZVJlZk1hcCk7XG4gICAgICAgIEpzb25Qb2ludGVyLnNldChjb21waWxlZFNjaGVtYSwgc3ViU2NoZW1hUG9pbnRlciwgeyAkcmVmOiBgIyR7cmVmUG9pbnRlcn1gIH0pO1xuICAgICAgfVxuICAgICAgaWYgKCFoYXNPd24oc2NoZW1hUmVmTGlicmFyeSwgJ3JlZlBvaW50ZXInKSkge1xuICAgICAgICBzY2hlbWFSZWZMaWJyYXJ5W3JlZlBvaW50ZXJdID0gIXJlZlBvaW50ZXIubGVuZ3RoID8gY29tcGlsZWRTY2hlbWEgOlxuICAgICAgICAgIGdldFN1YlNjaGVtYShjb21waWxlZFNjaGVtYSwgcmVmUG9pbnRlciwgc2NoZW1hUmVmTGlicmFyeSwgcmVjdXJzaXZlUmVmTWFwKTtcbiAgICAgIH1cbiAgICAgIGlmICghc2NoZW1hUmVjdXJzaXZlUmVmTWFwLmhhcyhzdWJTY2hlbWFQb2ludGVyKSkge1xuICAgICAgICBzY2hlbWFSZWN1cnNpdmVSZWZNYXAuc2V0KHN1YlNjaGVtYVBvaW50ZXIsIHJlZlBvaW50ZXIpO1xuICAgICAgfVxuICAgICAgY29uc3QgZnJvbURhdGFSZWYgPSBKc29uUG9pbnRlci50b0RhdGFQb2ludGVyKHN1YlNjaGVtYVBvaW50ZXIsIGNvbXBpbGVkU2NoZW1hKTtcbiAgICAgIGlmICghZGF0YVJlY3Vyc2l2ZVJlZk1hcC5oYXMoZnJvbURhdGFSZWYpKSB7XG4gICAgICAgIGNvbnN0IHRvRGF0YVJlZiA9IEpzb25Qb2ludGVyLnRvRGF0YVBvaW50ZXIocmVmUG9pbnRlciwgY29tcGlsZWRTY2hlbWEpO1xuICAgICAgICBkYXRhUmVjdXJzaXZlUmVmTWFwLnNldChmcm9tRGF0YVJlZiwgdG9EYXRhUmVmKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHN1YlNjaGVtYS50eXBlID09PSAnYXJyYXknICYmXG4gICAgICAoaGFzT3duKHN1YlNjaGVtYSwgJ2l0ZW1zJykgfHwgaGFzT3duKHN1YlNjaGVtYSwgJ2FkZGl0aW9uYWxJdGVtcycpKVxuICAgICkge1xuICAgICAgY29uc3QgZGF0YVBvaW50ZXIgPSBKc29uUG9pbnRlci50b0RhdGFQb2ludGVyKHN1YlNjaGVtYVBvaW50ZXIsIGNvbXBpbGVkU2NoZW1hKTtcbiAgICAgIGlmICghYXJyYXlNYXAuaGFzKGRhdGFQb2ludGVyKSkge1xuICAgICAgICBjb25zdCB0dXBsZUl0ZW1zID0gaXNBcnJheShzdWJTY2hlbWEuaXRlbXMpID8gc3ViU2NoZW1hLml0ZW1zLmxlbmd0aCA6IDA7XG4gICAgICAgIGFycmF5TWFwLnNldChkYXRhUG9pbnRlciwgdHVwbGVJdGVtcyk7XG4gICAgICB9XG4gICAgfVxuICB9LCB0cnVlKTtcbiAgcmV0dXJuIGNvbXBpbGVkU2NoZW1hO1xufVxuXG4vKipcbiAqICdnZXRTdWJTY2hlbWEnIGZ1bmN0aW9uXG4gKlxuICogLy8gICBzY2hlbWFcbiAqIC8vICB7IFBvaW50ZXIgfSBwb2ludGVyXG4gKiAvLyAgeyBvYmplY3QgfSBzY2hlbWFSZWZMaWJyYXJ5XG4gKiAvLyAgeyBNYXA8c3RyaW5nLCBzdHJpbmc+IH0gc2NoZW1hUmVjdXJzaXZlUmVmTWFwXG4gKiAvLyAgeyBzdHJpbmdbXSA9IFtdIH0gdXNlZFBvaW50ZXJzXG4gKiAvLyBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFN1YlNjaGVtYShcbiAgc2NoZW1hLCBwb2ludGVyLCBzY2hlbWFSZWZMaWJyYXJ5ID0gbnVsbCxcbiAgc2NoZW1hUmVjdXJzaXZlUmVmTWFwOiBNYXA8c3RyaW5nLCBzdHJpbmc+ID0gbnVsbCwgdXNlZFBvaW50ZXJzOiBzdHJpbmdbXSA9IFtdXG4pIHtcbiAgaWYgKCFzY2hlbWFSZWZMaWJyYXJ5IHx8ICFzY2hlbWFSZWN1cnNpdmVSZWZNYXApIHtcbiAgICByZXR1cm4gSnNvblBvaW50ZXIuZ2V0Q29weShzY2hlbWEsIHBvaW50ZXIpO1xuICB9XG4gIGlmICh0eXBlb2YgcG9pbnRlciAhPT0gJ3N0cmluZycpIHsgcG9pbnRlciA9IEpzb25Qb2ludGVyLmNvbXBpbGUocG9pbnRlcik7IH1cbiAgdXNlZFBvaW50ZXJzID0gWyAuLi51c2VkUG9pbnRlcnMsIHBvaW50ZXIgXTtcbiAgbGV0IG5ld1NjaGVtYTogYW55ID0gbnVsbDtcbiAgaWYgKHBvaW50ZXIgPT09ICcnKSB7XG4gICAgbmV3U2NoZW1hID0gXy5jbG9uZURlZXAoc2NoZW1hKTtcbiAgfSBlbHNlIHtcbiAgICBjb25zdCBzaG9ydFBvaW50ZXIgPSByZW1vdmVSZWN1cnNpdmVSZWZlcmVuY2VzKHBvaW50ZXIsIHNjaGVtYVJlY3Vyc2l2ZVJlZk1hcCk7XG4gICAgaWYgKHNob3J0UG9pbnRlciAhPT0gcG9pbnRlcikgeyB1c2VkUG9pbnRlcnMgPSBbIC4uLnVzZWRQb2ludGVycywgc2hvcnRQb2ludGVyIF07IH1cbiAgICBuZXdTY2hlbWEgPSBKc29uUG9pbnRlci5nZXRGaXJzdENvcHkoW1xuICAgICAgW3NjaGVtYVJlZkxpYnJhcnksIFtzaG9ydFBvaW50ZXJdXSxcbiAgICAgIFtzY2hlbWEsIHBvaW50ZXJdLFxuICAgICAgW3NjaGVtYSwgc2hvcnRQb2ludGVyXVxuICAgIF0pO1xuICB9XG4gIHJldHVybiBKc29uUG9pbnRlci5mb3JFYWNoRGVlcENvcHkobmV3U2NoZW1hLCAoc3ViU2NoZW1hLCBzdWJQb2ludGVyKSA9PiB7XG4gICAgaWYgKGlzT2JqZWN0KHN1YlNjaGVtYSkpIHtcblxuICAgICAgLy8gUmVwbGFjZSBub24tcmVjdXJzaXZlICRyZWYgbGlua3Mgd2l0aCByZWZlcmVuY2VkIHNjaGVtYXNcbiAgICAgIGlmIChpc1N0cmluZyhzdWJTY2hlbWEuJHJlZikpIHtcbiAgICAgICAgY29uc3QgcmVmUG9pbnRlciA9IEpzb25Qb2ludGVyLmNvbXBpbGUoc3ViU2NoZW1hLiRyZWYpO1xuICAgICAgICBpZiAocmVmUG9pbnRlci5sZW5ndGggJiYgdXNlZFBvaW50ZXJzLmV2ZXJ5KHB0ciA9PlxuICAgICAgICAgICFKc29uUG9pbnRlci5pc1N1YlBvaW50ZXIocmVmUG9pbnRlciwgcHRyLCB0cnVlKVxuICAgICAgICApKSB7XG4gICAgICAgICAgY29uc3QgcmVmU2NoZW1hID0gZ2V0U3ViU2NoZW1hKFxuICAgICAgICAgICAgc2NoZW1hLCByZWZQb2ludGVyLCBzY2hlbWFSZWZMaWJyYXJ5LCBzY2hlbWFSZWN1cnNpdmVSZWZNYXAsIHVzZWRQb2ludGVyc1xuICAgICAgICAgICk7XG4gICAgICAgICAgaWYgKE9iamVjdC5rZXlzKHN1YlNjaGVtYSkubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVmU2NoZW1hO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBleHRyYUtleXMgPSB7IC4uLnN1YlNjaGVtYSB9O1xuICAgICAgICAgICAgZGVsZXRlIGV4dHJhS2V5cy4kcmVmO1xuICAgICAgICAgICAgcmV0dXJuIG1lcmdlU2NoZW1hcyhyZWZTY2hlbWEsIGV4dHJhS2V5cyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFRPRE86IENvbnZlcnQgc2NoZW1hcyB3aXRoICd0eXBlJyBhcnJheXMgdG8gJ29uZU9mJ1xuXG4gICAgICAvLyBDb21iaW5lIGFsbE9mIHN1YlNjaGVtYXNcbiAgICAgIGlmIChpc0FycmF5KHN1YlNjaGVtYS5hbGxPZikpIHsgcmV0dXJuIGNvbWJpbmVBbGxPZihzdWJTY2hlbWEpOyB9XG5cbiAgICAgIC8vIEZpeCBpbmNvcnJlY3RseSBwbGFjZWQgYXJyYXkgb2JqZWN0IHJlcXVpcmVkIGxpc3RzXG4gICAgICBpZiAoc3ViU2NoZW1hLnR5cGUgPT09ICdhcnJheScgJiYgaXNBcnJheShzdWJTY2hlbWEucmVxdWlyZWQpKSB7XG4gICAgICAgIHJldHVybiBmaXhSZXF1aXJlZEFycmF5UHJvcGVydGllcyhzdWJTY2hlbWEpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gc3ViU2NoZW1hO1xuICB9LCB0cnVlLCA8c3RyaW5nPnBvaW50ZXIpO1xufVxuXG4vKipcbiAqICdjb21iaW5lQWxsT2YnIGZ1bmN0aW9uXG4gKlxuICogQXR0ZW1wdCB0byBjb252ZXJ0IGFuIGFsbE9mIHNjaGVtYSBvYmplY3QgaW50b1xuICogYSBub24tYWxsT2Ygc2NoZW1hIG9iamVjdCB3aXRoIGVxdWl2YWxlbnQgcnVsZXMuXG4gKlxuICogLy8gICBzY2hlbWEgLSBhbGxPZiBzY2hlbWEgb2JqZWN0XG4gKiAvLyAgLSBjb252ZXJ0ZWQgc2NoZW1hIG9iamVjdFxuICovXG5leHBvcnQgZnVuY3Rpb24gY29tYmluZUFsbE9mKHNjaGVtYSkge1xuICBpZiAoIWlzT2JqZWN0KHNjaGVtYSkgfHwgIWlzQXJyYXkoc2NoZW1hLmFsbE9mKSkgeyByZXR1cm4gc2NoZW1hOyB9XG4gIGxldCBtZXJnZWRTY2hlbWEgPSBtZXJnZVNjaGVtYXMoLi4uc2NoZW1hLmFsbE9mKTtcbiAgaWYgKE9iamVjdC5rZXlzKHNjaGVtYSkubGVuZ3RoID4gMSkge1xuICAgIGNvbnN0IGV4dHJhS2V5cyA9IHsgLi4uc2NoZW1hIH07XG4gICAgZGVsZXRlIGV4dHJhS2V5cy5hbGxPZjtcbiAgICBtZXJnZWRTY2hlbWEgPSBtZXJnZVNjaGVtYXMobWVyZ2VkU2NoZW1hLCBleHRyYUtleXMpO1xuICB9XG4gIHJldHVybiBtZXJnZWRTY2hlbWE7XG59XG5cbi8qKlxuICogJ2ZpeFJlcXVpcmVkQXJyYXlQcm9wZXJ0aWVzJyBmdW5jdGlvblxuICpcbiAqIEZpeGVzIGFuIGluY29ycmVjdGx5IHBsYWNlZCByZXF1aXJlZCBsaXN0IGluc2lkZSBhbiBhcnJheSBzY2hlbWEsIGJ5IG1vdmluZ1xuICogaXQgaW50byBpdGVtcy5wcm9wZXJ0aWVzIG9yIGFkZGl0aW9uYWxJdGVtcy5wcm9wZXJ0aWVzLCB3aGVyZSBpdCBiZWxvbmdzLlxuICpcbiAqIC8vICAgc2NoZW1hIC0gYWxsT2Ygc2NoZW1hIG9iamVjdFxuICogLy8gIC0gY29udmVydGVkIHNjaGVtYSBvYmplY3RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZpeFJlcXVpcmVkQXJyYXlQcm9wZXJ0aWVzKHNjaGVtYSkge1xuICBpZiAoc2NoZW1hLnR5cGUgPT09ICdhcnJheScgJiYgaXNBcnJheShzY2hlbWEucmVxdWlyZWQpKSB7XG4gICAgbGV0IGl0ZW1zT2JqZWN0ID0gaGFzT3duKHNjaGVtYS5pdGVtcywgJ3Byb3BlcnRpZXMnKSA/ICdpdGVtcycgOlxuICAgICAgaGFzT3duKHNjaGVtYS5hZGRpdGlvbmFsSXRlbXMsICdwcm9wZXJ0aWVzJykgPyAnYWRkaXRpb25hbEl0ZW1zJyA6IG51bGw7XG4gICAgaWYgKGl0ZW1zT2JqZWN0ICYmICFoYXNPd24oc2NoZW1hW2l0ZW1zT2JqZWN0XSwgJ3JlcXVpcmVkJykgJiYgKFxuICAgICAgaGFzT3duKHNjaGVtYVtpdGVtc09iamVjdF0sICdhZGRpdGlvbmFsUHJvcGVydGllcycpIHx8XG4gICAgICBzY2hlbWEucmVxdWlyZWQuZXZlcnkoa2V5ID0+IGhhc093bihzY2hlbWFbaXRlbXNPYmplY3RdLnByb3BlcnRpZXMsIGtleSkpXG4gICAgKSkge1xuICAgICAgc2NoZW1hID0gXy5jbG9uZURlZXAoc2NoZW1hKTtcbiAgICAgIHNjaGVtYVtpdGVtc09iamVjdF0ucmVxdWlyZWQgPSBzY2hlbWEucmVxdWlyZWQ7XG4gICAgICBkZWxldGUgc2NoZW1hLnJlcXVpcmVkO1xuICAgIH1cbiAgfVxuICByZXR1cm4gc2NoZW1hO1xufVxuIl19