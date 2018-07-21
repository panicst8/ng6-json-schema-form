/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import * as _ from 'lodash';
import { hasValue, inArray, isArray, isEmpty, isDate, isObject, isDefined, isPrimitive, toJavaScriptType, toSchemaType } from './validator.functions';
import { forEach, hasOwn } from './utility.functions';
import { JsonPointer } from './jsonpointer.functions';
import { JsonValidators } from './json.validators';
import { getControlValidators, removeRecursiveReferences } from './json-schema.functions';
/**
 * 'buildFormGroupTemplate' function
 *
 * Builds a template for an Angular FormGroup from a JSON Schema.
 *
 * TODO: add support for pattern properties
 * https://spacetelescope.github.io/understanding-json-schema/reference/object.html
 *
 * //  {any} jsf -
 * //  {any = null} nodeValue -
 * //  {boolean = true} mapArrays -
 * //  {string = ''} schemaPointer -
 * //  {string = ''} dataPointer -
 * //  {any = ''} templatePointer -
 * // {any} -
 * @param {?} jsf
 * @param {?=} nodeValue
 * @param {?=} setValues
 * @param {?=} schemaPointer
 * @param {?=} dataPointer
 * @param {?=} templatePointer
 * @return {?}
 */
export function buildFormGroupTemplate(jsf, nodeValue, setValues, schemaPointer, dataPointer, templatePointer) {
    if (nodeValue === void 0) { nodeValue = null; }
    if (setValues === void 0) { setValues = true; }
    if (schemaPointer === void 0) { schemaPointer = ''; }
    if (dataPointer === void 0) { dataPointer = ''; }
    if (templatePointer === void 0) { templatePointer = ''; }
    /** @type {?} */
    var schema = JsonPointer.get(jsf.schema, schemaPointer);
    if (setValues) {
        if (!isDefined(nodeValue) && (jsf.formOptions.setSchemaDefaults === true ||
            (jsf.formOptions.setSchemaDefaults === 'auto' && isEmpty(jsf.formValues)))) {
            nodeValue = JsonPointer.get(jsf.schema, schemaPointer + '/default');
        }
    }
    else {
        nodeValue = null;
    }
    /** @type {?} */
    var schemaType = JsonPointer.get(schema, '/type');
    /** @type {?} */
    var controlType = (hasOwn(schema, 'properties') || hasOwn(schema, 'additionalProperties')) &&
        schemaType === 'object' ? 'FormGroup' :
        (hasOwn(schema, 'items') || hasOwn(schema, 'additionalItems')) &&
            schemaType === 'array' ? 'FormArray' :
            !schemaType && hasOwn(schema, '$ref') ? '$ref' : 'FormControl';
    /** @type {?} */
    var shortDataPointer = removeRecursiveReferences(dataPointer, jsf.dataRecursiveRefMap, jsf.arrayMap);
    if (!jsf.dataMap.has(shortDataPointer)) {
        jsf.dataMap.set(shortDataPointer, new Map());
    }
    /** @type {?} */
    var nodeOptions = jsf.dataMap.get(shortDataPointer);
    if (!nodeOptions.has('schemaType')) {
        nodeOptions.set('schemaPointer', schemaPointer);
        nodeOptions.set('schemaType', schema.type);
        if (schema.format) {
            nodeOptions.set('schemaFormat', schema.format);
            if (!schema.type) {
                nodeOptions.set('schemaType', 'string');
            }
        }
        if (controlType) {
            nodeOptions.set('templatePointer', templatePointer);
            nodeOptions.set('templateType', controlType);
        }
    }
    /** @type {?} */
    var controls;
    /** @type {?} */
    var validators = getControlValidators(schema);
    switch (controlType) {
        case 'FormGroup':
            controls = {};
            if (hasOwn(schema, 'ui:order') || hasOwn(schema, 'properties')) {
                /** @type {?} */
                var propertyKeys_1 = schema['ui:order'] || Object.keys(schema.properties);
                if (propertyKeys_1.includes('*') && !hasOwn(schema.properties, '*')) {
                    /** @type {?} */
                    var unnamedKeys = Object.keys(schema.properties)
                        .filter(function (key) { return !propertyKeys_1.includes(key); });
                    for (var i = propertyKeys_1.length - 1; i >= 0; i--) {
                        if (propertyKeys_1[i] === '*') {
                            propertyKeys_1.splice.apply(propertyKeys_1, tslib_1.__spread([i, 1], unnamedKeys));
                        }
                    }
                }
                propertyKeys_1
                    .filter(function (key) { return hasOwn(schema.properties, key) ||
                    hasOwn(schema, 'additionalProperties'); })
                    .forEach(function (key) { return controls[key] = buildFormGroupTemplate(jsf, JsonPointer.get(nodeValue, [/** @type {?} */ (key)]), setValues, schemaPointer + (hasOwn(schema.properties, key) ?
                    '/properties/' + key : '/additionalProperties'), dataPointer + '/' + key, templatePointer + '/controls/' + key); });
                jsf.formOptions.fieldsRequired = setRequiredFields(schema, controls);
            }
            return { controlType: controlType, controls: controls, validators: validators };
        case 'FormArray':
            controls = [];
            /** @type {?} */
            var minItems = Math.max(schema.minItems || 0, nodeOptions.get('minItems') || 0);
            /** @type {?} */
            var maxItems = Math.min(schema.maxItems || 1000, nodeOptions.get('maxItems') || 1000);
            /** @type {?} */
            var additionalItemsPointer = null;
            if (isArray(schema.items)) {
                /** @type {?} */
                var tupleItems = nodeOptions.get('tupleItems') ||
                    (isArray(schema.items) ? Math.min(schema.items.length, maxItems) : 0);
                for (var i = 0; i < tupleItems; i++) {
                    if (i < minItems) {
                        controls.push(buildFormGroupTemplate(jsf, isArray(nodeValue) ? nodeValue[i] : nodeValue, setValues, schemaPointer + '/items/' + i, dataPointer + '/' + i, templatePointer + '/controls/' + i));
                    }
                    else {
                        /** @type {?} */
                        var schemaRefPointer = removeRecursiveReferences(schemaPointer + '/items/' + i, jsf.schemaRecursiveRefMap);
                        /** @type {?} */
                        var itemRefPointer = removeRecursiveReferences(shortDataPointer + '/' + i, jsf.dataRecursiveRefMap, jsf.arrayMap);
                        /** @type {?} */
                        var itemRecursive = itemRefPointer !== shortDataPointer + '/' + i;
                        if (!hasOwn(jsf.templateRefLibrary, itemRefPointer)) {
                            jsf.templateRefLibrary[itemRefPointer] = null;
                            jsf.templateRefLibrary[itemRefPointer] = buildFormGroupTemplate(jsf, null, setValues, schemaRefPointer, itemRefPointer, templatePointer + '/controls/' + i);
                        }
                        controls.push(isArray(nodeValue) ?
                            buildFormGroupTemplate(jsf, nodeValue[i], setValues, schemaPointer + '/items/' + i, dataPointer + '/' + i, templatePointer + '/controls/' + i) :
                            itemRecursive ?
                                null : _.cloneDeep(jsf.templateRefLibrary[itemRefPointer]));
                    }
                }
                // If 'additionalItems' is an object = additional list items (after tuple items)
                if (schema.items.length < maxItems && isObject(schema.additionalItems)) {
                    additionalItemsPointer = schemaPointer + '/additionalItems';
                }
                // If 'items' is an object = list items only (no tuple items)
            }
            else {
                additionalItemsPointer = schemaPointer + '/items';
            }
            if (additionalItemsPointer) {
                /** @type {?} */
                var schemaRefPointer = removeRecursiveReferences(additionalItemsPointer, jsf.schemaRecursiveRefMap);
                /** @type {?} */
                var itemRefPointer = removeRecursiveReferences(shortDataPointer + '/-', jsf.dataRecursiveRefMap, jsf.arrayMap);
                /** @type {?} */
                var itemRecursive = itemRefPointer !== shortDataPointer + '/-';
                if (!hasOwn(jsf.templateRefLibrary, itemRefPointer)) {
                    jsf.templateRefLibrary[itemRefPointer] = null;
                    jsf.templateRefLibrary[itemRefPointer] = buildFormGroupTemplate(jsf, null, setValues, schemaRefPointer, itemRefPointer, templatePointer + '/controls/-');
                }
                /** @type {?} */
                var itemOptions = nodeOptions;
                if (!itemRecursive || hasOwn(validators, 'required')) {
                    /** @type {?} */
                    var arrayLength = Math.min(Math.max(itemRecursive ? 0 :
                        (itemOptions.get('tupleItems') + itemOptions.get('listItems')) || 0, isArray(nodeValue) ? nodeValue.length : 0), maxItems);
                    for (var i = controls.length; i < arrayLength; i++) {
                        controls.push(isArray(nodeValue) ?
                            buildFormGroupTemplate(jsf, nodeValue[i], setValues, schemaRefPointer, dataPointer + '/-', templatePointer + '/controls/-') :
                            itemRecursive ?
                                null : _.cloneDeep(jsf.templateRefLibrary[itemRefPointer]));
                    }
                }
            }
            return { controlType: controlType, controls: controls, validators: validators };
        case '$ref':
            /** @type {?} */
            var schemaRef = JsonPointer.compile(schema.$ref);
            /** @type {?} */
            var dataRef = JsonPointer.toDataPointer(schemaRef, schema);
            /** @type {?} */
            var refPointer = removeRecursiveReferences(dataRef, jsf.dataRecursiveRefMap, jsf.arrayMap);
            if (refPointer && !hasOwn(jsf.templateRefLibrary, refPointer)) {
                // Set to null first to prevent recursive reference from causing endless loop
                jsf.templateRefLibrary[refPointer] = null;
                /** @type {?} */
                var newTemplate = buildFormGroupTemplate(jsf, setValues, setValues, schemaRef);
                if (newTemplate) {
                    jsf.templateRefLibrary[refPointer] = newTemplate;
                }
                else {
                    delete jsf.templateRefLibrary[refPointer];
                }
            }
            return null;
        case 'FormControl':
            /** @type {?} */
            var value = {
                value: setValues && isPrimitive(nodeValue) ? nodeValue : null,
                disabled: nodeOptions.get('disabled') || false
            };
            return { controlType: controlType, value: value, validators: validators };
        default:
            return null;
    }
}
/**
 * 'buildFormGroup' function
 *
 * // {any} template -
 * // {AbstractControl}
 * @param {?} template
 * @return {?}
 */
export function buildFormGroup(template) {
    /** @type {?} */
    var validatorFns = [];
    /** @type {?} */
    var validatorFn = null;
    if (hasOwn(template, 'validators')) {
        forEach(template.validators, function (parameters, validator) {
            if (typeof JsonValidators[validator] === 'function') {
                validatorFns.push(JsonValidators[validator].apply(null, parameters));
            }
        });
        if (validatorFns.length &&
            inArray(template.controlType, ['FormGroup', 'FormArray'])) {
            validatorFn = validatorFns.length > 1 ?
                JsonValidators.compose(validatorFns) : validatorFns[0];
        }
    }
    if (hasOwn(template, 'controlType')) {
        switch (template.controlType) {
            case 'FormGroup':
                /** @type {?} */
                var groupControls_1 = {};
                forEach(template.controls, function (controls, key) {
                    /** @type {?} */
                    var newControl = buildFormGroup(controls);
                    if (newControl) {
                        groupControls_1[key] = newControl;
                    }
                });
                return new FormGroup(groupControls_1, validatorFn);
            case 'FormArray':
                return new FormArray(_.filter(_.map(template.controls, function (controls) { return buildFormGroup(controls); })), validatorFn);
            case 'FormControl':
                return new FormControl(template.value, validatorFns);
        }
    }
    return null;
}
/**
 * 'mergeValues' function
 *
 * //  {any[]} ...valuesToMerge - Multiple values to merge
 * // {any} - Merged values
 * @param {...?} valuesToMerge
 * @return {?}
 */
export function mergeValues() {
    var valuesToMerge = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        valuesToMerge[_i] = arguments[_i];
    }
    /** @type {?} */
    var mergedValues = null;
    try {
        for (var valuesToMerge_1 = tslib_1.__values(valuesToMerge), valuesToMerge_1_1 = valuesToMerge_1.next(); !valuesToMerge_1_1.done; valuesToMerge_1_1 = valuesToMerge_1.next()) {
            var currentValue = valuesToMerge_1_1.value;
            if (!isEmpty(currentValue)) {
                if (typeof currentValue === 'object' &&
                    (isEmpty(mergedValues) || typeof mergedValues !== 'object')) {
                    if (isArray(currentValue)) {
                        mergedValues = tslib_1.__spread(currentValue);
                    }
                    else if (isObject(currentValue)) {
                        mergedValues = tslib_1.__assign({}, currentValue);
                    }
                }
                else if (typeof currentValue !== 'object') {
                    mergedValues = currentValue;
                }
                else if (isObject(mergedValues) && isObject(currentValue)) {
                    Object.assign(mergedValues, currentValue);
                }
                else if (isObject(mergedValues) && isArray(currentValue)) {
                    /** @type {?} */
                    var newValues = [];
                    try {
                        for (var currentValue_1 = tslib_1.__values(currentValue), currentValue_1_1 = currentValue_1.next(); !currentValue_1_1.done; currentValue_1_1 = currentValue_1.next()) {
                            var value = currentValue_1_1.value;
                            newValues.push(mergeValues(mergedValues, value));
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (currentValue_1_1 && !currentValue_1_1.done && (_a = currentValue_1.return)) _a.call(currentValue_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                    mergedValues = newValues;
                }
                else if (isArray(mergedValues) && isObject(currentValue)) {
                    /** @type {?} */
                    var newValues = [];
                    try {
                        for (var mergedValues_1 = tslib_1.__values(mergedValues), mergedValues_1_1 = mergedValues_1.next(); !mergedValues_1_1.done; mergedValues_1_1 = mergedValues_1.next()) {
                            var value = mergedValues_1_1.value;
                            newValues.push(mergeValues(value, currentValue));
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (mergedValues_1_1 && !mergedValues_1_1.done && (_b = mergedValues_1.return)) _b.call(mergedValues_1);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                    mergedValues = newValues;
                }
                else if (isArray(mergedValues) && isArray(currentValue)) {
                    /** @type {?} */
                    var newValues = [];
                    for (var i = 0; i < Math.max(mergedValues.length, currentValue.length); i++) {
                        if (i < mergedValues.length && i < currentValue.length) {
                            newValues.push(mergeValues(mergedValues[i], currentValue[i]));
                        }
                        else if (i < mergedValues.length) {
                            newValues.push(mergedValues[i]);
                        }
                        else if (i < currentValue.length) {
                            newValues.push(currentValue[i]);
                        }
                    }
                    mergedValues = newValues;
                }
            }
        }
    }
    catch (e_3_1) { e_3 = { error: e_3_1 }; }
    finally {
        try {
            if (valuesToMerge_1_1 && !valuesToMerge_1_1.done && (_c = valuesToMerge_1.return)) _c.call(valuesToMerge_1);
        }
        finally { if (e_3) throw e_3.error; }
    }
    return mergedValues;
    var e_3, _c, e_1, _a, e_2, _b;
}
/**
 * 'setRequiredFields' function
 *
 * // {schema} schema - JSON Schema
 * // {object} formControlTemplate - Form Control Template object
 * // {boolean} - true if any fields have been set to required, false if not
 * @param {?} schema
 * @param {?} formControlTemplate
 * @return {?}
 */
export function setRequiredFields(schema, formControlTemplate) {
    /** @type {?} */
    var fieldsRequired = false;
    if (hasOwn(schema, 'required') && !isEmpty(schema.required)) {
        fieldsRequired = true;
        /** @type {?} */
        var requiredArray = isArray(schema.required) ? schema.required : [schema.required];
        requiredArray = forEach(requiredArray, function (key) { return JsonPointer.set(formControlTemplate, '/' + key + '/validators/required', []); });
    }
    return fieldsRequired;
    // TODO: Add support for patternProperties
    // https://spacetelescope.github.io/understanding-json-schema/reference/object.html#pattern-properties
}
/**
 * 'formatFormData' function
 *
 * // {any} formData - Angular FormGroup data object
 * // {Map<string, any>} dataMap -
 * // {Map<string, string>} recursiveRefMap -
 * // {Map<string, number>} arrayMap -
 * // {boolean = false} fixErrors - if TRUE, tries to fix data
 * // {any} - formatted data object
 * @param {?} formData
 * @param {?} dataMap
 * @param {?} recursiveRefMap
 * @param {?} arrayMap
 * @param {?=} returnEmptyFields
 * @param {?=} fixErrors
 * @return {?}
 */
export function formatFormData(formData, dataMap, recursiveRefMap, arrayMap, returnEmptyFields, fixErrors) {
    if (returnEmptyFields === void 0) { returnEmptyFields = false; }
    if (fixErrors === void 0) { fixErrors = false; }
    if (formData === null || typeof formData !== 'object') {
        return formData;
    }
    /** @type {?} */
    var formattedData = isArray(formData) ? [] : {};
    JsonPointer.forEachDeep(formData, function (value, dataPointer) {
        // If returnEmptyFields === true,
        // add empty arrays and objects to all allowed keys
        if (returnEmptyFields && isArray(value)) {
            JsonPointer.set(formattedData, dataPointer, []);
        }
        else if (returnEmptyFields && isObject(value) && !isDate(value)) {
            JsonPointer.set(formattedData, dataPointer, {});
        }
        else {
            /** @type {?} */
            var genericPointer_1 = JsonPointer.has(dataMap, [dataPointer, 'schemaType']) ? dataPointer :
                removeRecursiveReferences(dataPointer, recursiveRefMap, arrayMap);
            if (JsonPointer.has(dataMap, [genericPointer_1, 'schemaType'])) {
                /** @type {?} */
                var schemaType = dataMap.get(genericPointer_1).get('schemaType');
                if (schemaType === 'null') {
                    JsonPointer.set(formattedData, dataPointer, null);
                }
                else if ((hasValue(value) || returnEmptyFields) &&
                    inArray(schemaType, ['string', 'integer', 'number', 'boolean'])) {
                    /** @type {?} */
                    var newValue = (fixErrors || (value === null && returnEmptyFields)) ?
                        toSchemaType(value, schemaType) : toJavaScriptType(value, schemaType);
                    if (isDefined(newValue) || returnEmptyFields) {
                        JsonPointer.set(formattedData, dataPointer, newValue);
                    }
                    // If returnEmptyFields === false,
                    // only add empty arrays and objects to required keys
                }
                else if (schemaType === 'object' && !returnEmptyFields) {
                    (dataMap.get(genericPointer_1).get('required') || []).forEach(function (key) {
                        /** @type {?} */
                        var keySchemaType = dataMap.get(genericPointer_1 + "/" + key).get('schemaType');
                        if (keySchemaType === 'array') {
                            JsonPointer.set(formattedData, dataPointer + "/" + key, []);
                        }
                        else if (keySchemaType === 'object') {
                            JsonPointer.set(formattedData, dataPointer + "/" + key, {});
                        }
                    });
                }
                // Finish incomplete 'date-time' entries
                if (dataMap.get(genericPointer_1).get('schemaFormat') === 'date-time') {
                    // "2000-03-14T01:59:26.535" -> "2000-03-14T01:59:26.535Z" (add "Z")
                    if (/^\d\d\d\d-[0-1]\d-[0-3]\d[t\s][0-2]\d:[0-5]\d:[0-5]\d(?:\.\d+)?$/i.test(value)) {
                        JsonPointer.set(formattedData, dataPointer, value + "Z");
                        // "2000-03-14T01:59" -> "2000-03-14T01:59:00Z" (add ":00Z")
                    }
                    else if (/^\d\d\d\d-[0-1]\d-[0-3]\d[t\s][0-2]\d:[0-5]\d$/i.test(value)) {
                        JsonPointer.set(formattedData, dataPointer, value + ":00Z");
                        // "2000-03-14" -> "2000-03-14T00:00:00Z" (add "T00:00:00Z")
                    }
                    else if (fixErrors && /^\d\d\d\d-[0-1]\d-[0-3]\d$/i.test(value)) {
                        JsonPointer.set(formattedData, dataPointer, value + ":00:00:00Z");
                    }
                }
            }
            else if (typeof value !== 'object' || isDate(value) ||
                (value === null && returnEmptyFields)) {
                console.error('formatFormData error: ' +
                    ("Schema type not found for form value at " + genericPointer_1));
                console.error('dataMap', dataMap);
                console.error('recursiveRefMap', recursiveRefMap);
                console.error('genericPointer', genericPointer_1);
            }
        }
    });
    return formattedData;
}
/**
 * 'getControl' function
 *
 * Uses a JSON Pointer for a data object to retrieve a control from
 * an Angular formGroup or formGroup template. (Note: though a formGroup
 * template is much simpler, its basic structure is idential to a formGroup).
 *
 * If the optional third parameter 'returnGroup' is set to TRUE, the group
 * containing the control is returned, rather than the control itself.
 *
 * // {FormGroup} formGroup - Angular FormGroup to get value from
 * // {Pointer} dataPointer - JSON Pointer (string or array)
 * // {boolean = false} returnGroup - If true, return group containing control
 * // {group} - Located value (or null, if no control found)
 * @param {?} formGroup
 * @param {?} dataPointer
 * @param {?=} returnGroup
 * @return {?}
 */
export function getControl(formGroup, dataPointer, returnGroup) {
    if (returnGroup === void 0) { returnGroup = false; }
    if (!isObject(formGroup) || !JsonPointer.isJsonPointer(dataPointer)) {
        if (!JsonPointer.isJsonPointer(dataPointer)) {
            // If dataPointer input is not a valid JSON pointer, check to
            // see if it is instead a valid object path, using dot notaion
            if (typeof dataPointer === 'string') {
                /** @type {?} */
                var formControl = formGroup.get(dataPointer);
                if (formControl) {
                    return formControl;
                }
            }
            console.error("getControl error: Invalid JSON Pointer: " + dataPointer);
        }
        if (!isObject(formGroup)) {
            console.error("getControl error: Invalid formGroup: " + formGroup);
        }
        return null;
    }
    /** @type {?} */
    var dataPointerArray = JsonPointer.parse(dataPointer);
    if (returnGroup) {
        dataPointerArray = dataPointerArray.slice(0, -1);
    }
    // If formGroup input is a real formGroup (not a formGroup template)
    // try using formGroup.get() to return the control
    if (typeof formGroup.get === 'function' &&
        dataPointerArray.every(function (key) { return key.indexOf('.') === -1; })) {
        /** @type {?} */
        var formControl = formGroup.get(dataPointerArray.join('.'));
        if (formControl) {
            return formControl;
        }
    }
    /** @type {?} */
    var subGroup = formGroup;
    try {
        for (var dataPointerArray_1 = tslib_1.__values(dataPointerArray), dataPointerArray_1_1 = dataPointerArray_1.next(); !dataPointerArray_1_1.done; dataPointerArray_1_1 = dataPointerArray_1.next()) {
            var key = dataPointerArray_1_1.value;
            if (hasOwn(subGroup, 'controls')) {
                subGroup = subGroup.controls;
            }
            if (isArray(subGroup) && (key === '-')) {
                subGroup = subGroup[subGroup.length - 1];
            }
            else if (hasOwn(subGroup, key)) {
                subGroup = subGroup[key];
            }
            else {
                console.error("getControl error: Unable to find \"" + key + "\" item in FormGroup.");
                console.error(dataPointer);
                console.error(formGroup);
                return;
            }
        }
    }
    catch (e_4_1) { e_4 = { error: e_4_1 }; }
    finally {
        try {
            if (dataPointerArray_1_1 && !dataPointerArray_1_1.done && (_a = dataPointerArray_1.return)) _a.call(dataPointerArray_1);
        }
        finally { if (e_4) throw e_4.error; }
    }
    return subGroup;
    var e_4, _a;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1ncm91cC5mdW5jdGlvbnMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZzYtanNvbi1zY2hlbWEtZm9ybS8iLCJzb3VyY2VzIjpbImxpYi9zaGFyZWQvZm9ybS1ncm91cC5mdW5jdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQ1ksU0FBUyxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQ25ELE1BQU0sZ0JBQWdCLENBQUM7QUFFeEIsT0FBTyxLQUFLLENBQUMsTUFBTSxRQUFRLENBQUM7QUFFNUIsT0FBTyxFQUNMLFFBQVEsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQzdFLGdCQUFnQixFQUFFLFlBQVksRUFDL0IsTUFBTSx1QkFBdUIsQ0FBQztBQUMvQixPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3RELE9BQU8sRUFBVyxXQUFXLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUMvRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDbkQsT0FBTyxFQUNTLG9CQUFvQixFQUFnQix5QkFBeUIsRUFDNUUsTUFBTSx5QkFBeUIsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBc0NqQyxNQUFNLGlDQUNKLEdBQVEsRUFBRSxTQUFxQixFQUFFLFNBQWdCLEVBQ2pELGFBQWtCLEVBQUUsV0FBZ0IsRUFBRSxlQUFvQjtJQURoRCwwQkFBQSxFQUFBLGdCQUFxQjtJQUFFLDBCQUFBLEVBQUEsZ0JBQWdCO0lBQ2pELDhCQUFBLEVBQUEsa0JBQWtCO0lBQUUsNEJBQUEsRUFBQSxnQkFBZ0I7SUFBRSxnQ0FBQSxFQUFBLG9CQUFvQjs7SUFFMUQsSUFBTSxNQUFNLEdBQUcsV0FBVyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLGFBQWEsQ0FBQyxDQUFDO0lBQzFE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O2dCQUN6QixNQUFNLENBQUM7YUFDUjtTQUNGOzs7Ozs7Ozs7SUFDRCxNQUFNLENBQUMsUUFBUSxDQUFDOztDQUNqQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEFic3RyYWN0Q29udHJvbCwgRm9ybUFycmF5LCBGb3JtQ29udHJvbCwgRm9ybUdyb3VwLCBWYWxpZGF0b3JGblxufSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcblxuaW1wb3J0IHtcbiAgaGFzVmFsdWUsIGluQXJyYXksIGlzQXJyYXksIGlzRW1wdHksIGlzRGF0ZSwgaXNPYmplY3QsIGlzRGVmaW5lZCwgaXNQcmltaXRpdmUsXG4gIHRvSmF2YVNjcmlwdFR5cGUsIHRvU2NoZW1hVHlwZSwgU2NoZW1hUHJpbWl0aXZlVHlwZVxufSBmcm9tICcuL3ZhbGlkYXRvci5mdW5jdGlvbnMnO1xuaW1wb3J0IHsgZm9yRWFjaCwgaGFzT3duIH0gZnJvbSAnLi91dGlsaXR5LmZ1bmN0aW9ucyc7XG5pbXBvcnQgeyBQb2ludGVyLCBKc29uUG9pbnRlciB9IGZyb20gJy4vanNvbnBvaW50ZXIuZnVuY3Rpb25zJztcbmltcG9ydCB7IEpzb25WYWxpZGF0b3JzIH0gZnJvbSAnLi9qc29uLnZhbGlkYXRvcnMnO1xuaW1wb3J0IHtcbiAgY29tYmluZUFsbE9mLCBnZXRDb250cm9sVmFsaWRhdG9ycywgZ2V0U3ViU2NoZW1hLCByZW1vdmVSZWN1cnNpdmVSZWZlcmVuY2VzXG59IGZyb20gJy4vanNvbi1zY2hlbWEuZnVuY3Rpb25zJztcblxuLyoqXG4gKiBGb3JtR3JvdXAgZnVuY3Rpb24gbGlicmFyeTpcbiAqXG4gKiBidWlsZEZvcm1Hcm91cFRlbXBsYXRlOiAgQnVpbGRzIGEgRm9ybUdyb3VwVGVtcGxhdGUgZnJvbSBzY2hlbWFcbiAqXG4gKiBidWlsZEZvcm1Hcm91cDogICAgICAgICAgQnVpbGRzIGFuIEFuZ3VsYXIgRm9ybUdyb3VwIGZyb20gYSBGb3JtR3JvdXBUZW1wbGF0ZVxuICpcbiAqIG1lcmdlVmFsdWVzOlxuICpcbiAqIHNldFJlcXVpcmVkRmllbGRzOlxuICpcbiAqIGZvcm1hdEZvcm1EYXRhOlxuICpcbiAqIGdldENvbnRyb2w6XG4gKlxuICogLS0tLSBUT0RPOiAtLS0tXG4gKiBUT0RPOiBhZGQgYnVpbGRGb3JtR3JvdXBUZW1wbGF0ZUZyb21MYXlvdXQgZnVuY3Rpb25cbiAqIGJ1aWxkRm9ybUdyb3VwVGVtcGxhdGVGcm9tTGF5b3V0OiBCdWlsZHMgYSBGb3JtR3JvdXBUZW1wbGF0ZSBmcm9tIGEgZm9ybSBsYXlvdXRcbiAqL1xuXG4vKipcbiAqICdidWlsZEZvcm1Hcm91cFRlbXBsYXRlJyBmdW5jdGlvblxuICpcbiAqIEJ1aWxkcyBhIHRlbXBsYXRlIGZvciBhbiBBbmd1bGFyIEZvcm1Hcm91cCBmcm9tIGEgSlNPTiBTY2hlbWEuXG4gKlxuICogVE9ETzogYWRkIHN1cHBvcnQgZm9yIHBhdHRlcm4gcHJvcGVydGllc1xuICogaHR0cHM6Ly9zcGFjZXRlbGVzY29wZS5naXRodWIuaW8vdW5kZXJzdGFuZGluZy1qc29uLXNjaGVtYS9yZWZlcmVuY2Uvb2JqZWN0Lmh0bWxcbiAqXG4gKiAvLyAge2FueX0ganNmIC1cbiAqIC8vICB7YW55ID0gbnVsbH0gbm9kZVZhbHVlIC1cbiAqIC8vICB7Ym9vbGVhbiA9IHRydWV9IG1hcEFycmF5cyAtXG4gKiAvLyAge3N0cmluZyA9ICcnfSBzY2hlbWFQb2ludGVyIC1cbiAqIC8vICB7c3RyaW5nID0gJyd9IGRhdGFQb2ludGVyIC1cbiAqIC8vICB7YW55ID0gJyd9IHRlbXBsYXRlUG9pbnRlciAtXG4gKiAvLyB7YW55fSAtXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBidWlsZEZvcm1Hcm91cFRlbXBsYXRlKFxuICBqc2Y6IGFueSwgbm9kZVZhbHVlOiBhbnkgPSBudWxsLCBzZXRWYWx1ZXMgPSB0cnVlLFxuICBzY2hlbWFQb2ludGVyID0gJycsIGRhdGFQb2ludGVyID0gJycsIHRlbXBsYXRlUG9pbnRlciA9ICcnXG4pIHtcbiAgY29uc3Qgc2NoZW1hID0gSnNvblBvaW50ZXIuZ2V0KGpzZi5zY2hlbWEsIHNjaGVtYVBvaW50ZXIpO1xuICBpZiAoc2V0VmFsdWVzKSB7XG4gICAgaWYgKCFpc0RlZmluZWQobm9kZVZhbHVlKSAmJiAoXG4gICAgICBqc2YuZm9ybU9wdGlvbnMuc2V0U2NoZW1hRGVmYXVsdHMgPT09IHRydWUgfHxcbiAgICAgIChqc2YuZm9ybU9wdGlvbnMuc2V0U2NoZW1hRGVmYXVsdHMgPT09ICdhdXRvJyAmJiBpc0VtcHR5KGpzZi5mb3JtVmFsdWVzKSlcbiAgICApKSB7XG4gICAgICBub2RlVmFsdWUgPSBKc29uUG9pbnRlci5nZXQoanNmLnNjaGVtYSwgc2NoZW1hUG9pbnRlciArICcvZGVmYXVsdCcpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBub2RlVmFsdWUgPSBudWxsO1xuICB9XG4gIC8vIFRPRE86IElmIG5vZGVWYWx1ZSBzdGlsbCBub3Qgc2V0LCBjaGVjayBsYXlvdXQgZm9yIGRlZmF1bHQgdmFsdWVcbiAgY29uc3Qgc2NoZW1hVHlwZTogc3RyaW5nIHwgc3RyaW5nW10gPSBKc29uUG9pbnRlci5nZXQoc2NoZW1hLCAnL3R5cGUnKTtcbiAgbGV0IGNvbnRyb2xUeXBlID1cbiAgICAoaGFzT3duKHNjaGVtYSwgJ3Byb3BlcnRpZXMnKSB8fCBoYXNPd24oc2NoZW1hLCAnYWRkaXRpb25hbFByb3BlcnRpZXMnKSkgJiZcbiAgICAgIHNjaGVtYVR5cGUgPT09ICdvYmplY3QnID8gJ0Zvcm1Hcm91cCcgOlxuICAgIChoYXNPd24oc2NoZW1hLCAnaXRlbXMnKSB8fCBoYXNPd24oc2NoZW1hLCAnYWRkaXRpb25hbEl0ZW1zJykpICYmXG4gICAgICBzY2hlbWFUeXBlID09PSAnYXJyYXknID8gJ0Zvcm1BcnJheScgOlxuICAgICFzY2hlbWFUeXBlICYmIGhhc093bihzY2hlbWEsICckcmVmJykgPyAnJHJlZicgOiAnRm9ybUNvbnRyb2wnO1xuICBjb25zdCBzaG9ydERhdGFQb2ludGVyID1cbiAgICByZW1vdmVSZWN1cnNpdmVSZWZlcmVuY2VzKGRhdGFQb2ludGVyLCBqc2YuZGF0YVJlY3Vyc2l2ZVJlZk1hcCwganNmLmFycmF5TWFwKTtcbiAgaWYgKCFqc2YuZGF0YU1hcC5oYXMoc2hvcnREYXRhUG9pbnRlcikpIHtcbiAgICBqc2YuZGF0YU1hcC5zZXQoc2hvcnREYXRhUG9pbnRlciwgbmV3IE1hcCgpKTtcbiAgfVxuICBjb25zdCBub2RlT3B0aW9ucyA9IGpzZi5kYXRhTWFwLmdldChzaG9ydERhdGFQb2ludGVyKTtcbiAgaWYgKCFub2RlT3B0aW9ucy5oYXMoJ3NjaGVtYVR5cGUnKSkge1xuICAgIG5vZGVPcHRpb25zLnNldCgnc2NoZW1hUG9pbnRlcicsIHNjaGVtYVBvaW50ZXIpO1xuICAgIG5vZGVPcHRpb25zLnNldCgnc2NoZW1hVHlwZScsIHNjaGVtYS50eXBlKTtcbiAgICBpZiAoc2NoZW1hLmZvcm1hdCkge1xuICAgICAgbm9kZU9wdGlvbnMuc2V0KCdzY2hlbWFGb3JtYXQnLCBzY2hlbWEuZm9ybWF0KTtcbiAgICAgIGlmICghc2NoZW1hLnR5cGUpIHsgbm9kZU9wdGlvbnMuc2V0KCdzY2hlbWFUeXBlJywgJ3N0cmluZycpOyB9XG4gICAgfVxuICAgIGlmIChjb250cm9sVHlwZSkge1xuICAgICAgbm9kZU9wdGlvbnMuc2V0KCd0ZW1wbGF0ZVBvaW50ZXInLCB0ZW1wbGF0ZVBvaW50ZXIpO1xuICAgICAgbm9kZU9wdGlvbnMuc2V0KCd0ZW1wbGF0ZVR5cGUnLCBjb250cm9sVHlwZSk7XG4gICAgfVxuICB9XG4gIGxldCBjb250cm9sczogYW55O1xuICBsZXQgdmFsaWRhdG9ycyA9IGdldENvbnRyb2xWYWxpZGF0b3JzKHNjaGVtYSk7XG4gIHN3aXRjaCAoY29udHJvbFR5cGUpIHtcblxuICAgIGNhc2UgJ0Zvcm1Hcm91cCc6XG4gICAgICBjb250cm9scyA9IHt9O1xuICAgICAgaWYgKGhhc093bihzY2hlbWEsICd1aTpvcmRlcicpIHx8IGhhc093bihzY2hlbWEsICdwcm9wZXJ0aWVzJykpIHtcbiAgICAgICAgbGV0IHByb3BlcnR5S2V5cyA9IHNjaGVtYVsndWk6b3JkZXInXSB8fCBPYmplY3Qua2V5cyhzY2hlbWEucHJvcGVydGllcyk7XG4gICAgICAgIGlmIChwcm9wZXJ0eUtleXMuaW5jbHVkZXMoJyonKSAmJiAhaGFzT3duKHNjaGVtYS5wcm9wZXJ0aWVzLCAnKicpKSB7XG4gICAgICAgICAgY29uc3QgdW5uYW1lZEtleXMgPSBPYmplY3Qua2V5cyhzY2hlbWEucHJvcGVydGllcylcbiAgICAgICAgICAgIC5maWx0ZXIoa2V5ID0+ICFwcm9wZXJ0eUtleXMuaW5jbHVkZXMoa2V5KSk7XG4gICAgICAgICAgZm9yIChsZXQgaSA9IHByb3BlcnR5S2V5cy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgaWYgKHByb3BlcnR5S2V5c1tpXSA9PT0gJyonKSB7XG4gICAgICAgICAgICAgIHByb3BlcnR5S2V5cy5zcGxpY2UoaSwgMSwgLi4udW5uYW1lZEtleXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBwcm9wZXJ0eUtleXNcbiAgICAgICAgICAuZmlsdGVyKGtleSA9PiBoYXNPd24oc2NoZW1hLnByb3BlcnRpZXMsIGtleSkgfHxcbiAgICAgICAgICAgIGhhc093bihzY2hlbWEsICdhZGRpdGlvbmFsUHJvcGVydGllcycpXG4gICAgICAgICAgKVxuICAgICAgICAgIC5mb3JFYWNoKGtleSA9PiBjb250cm9sc1trZXldID0gYnVpbGRGb3JtR3JvdXBUZW1wbGF0ZShcbiAgICAgICAgICAgIGpzZiwgSnNvblBvaW50ZXIuZ2V0KG5vZGVWYWx1ZSwgWzxzdHJpbmc+a2V5XSksIHNldFZhbHVlcyxcbiAgICAgICAgICAgIHNjaGVtYVBvaW50ZXIgKyAoaGFzT3duKHNjaGVtYS5wcm9wZXJ0aWVzLCBrZXkpID9cbiAgICAgICAgICAgICAgJy9wcm9wZXJ0aWVzLycgKyBrZXkgOiAnL2FkZGl0aW9uYWxQcm9wZXJ0aWVzJ1xuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIGRhdGFQb2ludGVyICsgJy8nICsga2V5LFxuICAgICAgICAgICAgdGVtcGxhdGVQb2ludGVyICsgJy9jb250cm9scy8nICsga2V5XG4gICAgICAgICAgKSk7XG4gICAgICAgIGpzZi5mb3JtT3B0aW9ucy5maWVsZHNSZXF1aXJlZCA9IHNldFJlcXVpcmVkRmllbGRzKHNjaGVtYSwgY29udHJvbHMpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHsgY29udHJvbFR5cGUsIGNvbnRyb2xzLCB2YWxpZGF0b3JzIH07XG5cbiAgICBjYXNlICdGb3JtQXJyYXknOlxuICAgICAgY29udHJvbHMgPSBbXTtcbiAgICAgIGNvbnN0IG1pbkl0ZW1zID1cbiAgICAgICAgTWF0aC5tYXgoc2NoZW1hLm1pbkl0ZW1zIHx8IDAsIG5vZGVPcHRpb25zLmdldCgnbWluSXRlbXMnKSB8fCAwKTtcbiAgICAgIGNvbnN0IG1heEl0ZW1zID1cbiAgICAgICAgTWF0aC5taW4oc2NoZW1hLm1heEl0ZW1zIHx8IDEwMDAsIG5vZGVPcHRpb25zLmdldCgnbWF4SXRlbXMnKSB8fCAxMDAwKTtcbiAgICAgIGxldCBhZGRpdGlvbmFsSXRlbXNQb2ludGVyOiBzdHJpbmcgPSBudWxsO1xuICAgICAgaWYgKGlzQXJyYXkoc2NoZW1hLml0ZW1zKSkgeyAvLyAnaXRlbXMnIGlzIGFuIGFycmF5ID0gdHVwbGUgaXRlbXNcbiAgICAgICAgY29uc3QgdHVwbGVJdGVtcyA9IG5vZGVPcHRpb25zLmdldCgndHVwbGVJdGVtcycpIHx8XG4gICAgICAgICAgKGlzQXJyYXkoc2NoZW1hLml0ZW1zKSA/IE1hdGgubWluKHNjaGVtYS5pdGVtcy5sZW5ndGgsIG1heEl0ZW1zKSA6IDApO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHR1cGxlSXRlbXM7IGkrKykge1xuICAgICAgICAgIGlmIChpIDwgbWluSXRlbXMpIHtcbiAgICAgICAgICAgIGNvbnRyb2xzLnB1c2goYnVpbGRGb3JtR3JvdXBUZW1wbGF0ZShcbiAgICAgICAgICAgICAganNmLCBpc0FycmF5KG5vZGVWYWx1ZSkgPyBub2RlVmFsdWVbaV0gOiBub2RlVmFsdWUsIHNldFZhbHVlcyxcbiAgICAgICAgICAgICAgc2NoZW1hUG9pbnRlciArICcvaXRlbXMvJyArIGksXG4gICAgICAgICAgICAgIGRhdGFQb2ludGVyICsgJy8nICsgaSxcbiAgICAgICAgICAgICAgdGVtcGxhdGVQb2ludGVyICsgJy9jb250cm9scy8nICsgaVxuICAgICAgICAgICAgKSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IHNjaGVtYVJlZlBvaW50ZXIgPSByZW1vdmVSZWN1cnNpdmVSZWZlcmVuY2VzKFxuICAgICAgICAgICAgICBzY2hlbWFQb2ludGVyICsgJy9pdGVtcy8nICsgaSwganNmLnNjaGVtYVJlY3Vyc2l2ZVJlZk1hcFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGNvbnN0IGl0ZW1SZWZQb2ludGVyID0gcmVtb3ZlUmVjdXJzaXZlUmVmZXJlbmNlcyhcbiAgICAgICAgICAgICAgc2hvcnREYXRhUG9pbnRlciArICcvJyArIGksIGpzZi5kYXRhUmVjdXJzaXZlUmVmTWFwLCBqc2YuYXJyYXlNYXBcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBjb25zdCBpdGVtUmVjdXJzaXZlID0gaXRlbVJlZlBvaW50ZXIgIT09IHNob3J0RGF0YVBvaW50ZXIgKyAnLycgKyBpO1xuICAgICAgICAgICAgaWYgKCFoYXNPd24oanNmLnRlbXBsYXRlUmVmTGlicmFyeSwgaXRlbVJlZlBvaW50ZXIpKSB7XG4gICAgICAgICAgICAgIGpzZi50ZW1wbGF0ZVJlZkxpYnJhcnlbaXRlbVJlZlBvaW50ZXJdID0gbnVsbDtcbiAgICAgICAgICAgICAganNmLnRlbXBsYXRlUmVmTGlicmFyeVtpdGVtUmVmUG9pbnRlcl0gPSBidWlsZEZvcm1Hcm91cFRlbXBsYXRlKFxuICAgICAgICAgICAgICAgIGpzZiwgbnVsbCwgc2V0VmFsdWVzLFxuICAgICAgICAgICAgICAgIHNjaGVtYVJlZlBvaW50ZXIsXG4gICAgICAgICAgICAgICAgaXRlbVJlZlBvaW50ZXIsXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVQb2ludGVyICsgJy9jb250cm9scy8nICsgaVxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29udHJvbHMucHVzaChcbiAgICAgICAgICAgICAgaXNBcnJheShub2RlVmFsdWUpID9cbiAgICAgICAgICAgICAgICBidWlsZEZvcm1Hcm91cFRlbXBsYXRlKFxuICAgICAgICAgICAgICAgICAganNmLCBub2RlVmFsdWVbaV0sIHNldFZhbHVlcyxcbiAgICAgICAgICAgICAgICAgIHNjaGVtYVBvaW50ZXIgKyAnL2l0ZW1zLycgKyBpLFxuICAgICAgICAgICAgICAgICAgZGF0YVBvaW50ZXIgKyAnLycgKyBpLFxuICAgICAgICAgICAgICAgICAgdGVtcGxhdGVQb2ludGVyICsgJy9jb250cm9scy8nICsgaVxuICAgICAgICAgICAgICAgICkgOlxuICAgICAgICAgICAgICBpdGVtUmVjdXJzaXZlID9cbiAgICAgICAgICAgICAgICBudWxsIDogXy5jbG9uZURlZXAoanNmLnRlbXBsYXRlUmVmTGlicmFyeVtpdGVtUmVmUG9pbnRlcl0pXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIElmICdhZGRpdGlvbmFsSXRlbXMnIGlzIGFuIG9iamVjdCA9IGFkZGl0aW9uYWwgbGlzdCBpdGVtcyAoYWZ0ZXIgdHVwbGUgaXRlbXMpXG4gICAgICAgIGlmIChzY2hlbWEuaXRlbXMubGVuZ3RoIDwgbWF4SXRlbXMgJiYgaXNPYmplY3Qoc2NoZW1hLmFkZGl0aW9uYWxJdGVtcykpIHtcbiAgICAgICAgICBhZGRpdGlvbmFsSXRlbXNQb2ludGVyID0gc2NoZW1hUG9pbnRlciArICcvYWRkaXRpb25hbEl0ZW1zJztcbiAgICAgICAgfVxuXG4gICAgICAvLyBJZiAnaXRlbXMnIGlzIGFuIG9iamVjdCA9IGxpc3QgaXRlbXMgb25seSAobm8gdHVwbGUgaXRlbXMpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhZGRpdGlvbmFsSXRlbXNQb2ludGVyID0gc2NoZW1hUG9pbnRlciArICcvaXRlbXMnO1xuICAgICAgfVxuXG4gICAgICBpZiAoYWRkaXRpb25hbEl0ZW1zUG9pbnRlcikge1xuICAgICAgICBjb25zdCBzY2hlbWFSZWZQb2ludGVyID0gcmVtb3ZlUmVjdXJzaXZlUmVmZXJlbmNlcyhcbiAgICAgICAgICBhZGRpdGlvbmFsSXRlbXNQb2ludGVyLCBqc2Yuc2NoZW1hUmVjdXJzaXZlUmVmTWFwXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IGl0ZW1SZWZQb2ludGVyID0gcmVtb3ZlUmVjdXJzaXZlUmVmZXJlbmNlcyhcbiAgICAgICAgICBzaG9ydERhdGFQb2ludGVyICsgJy8tJywganNmLmRhdGFSZWN1cnNpdmVSZWZNYXAsIGpzZi5hcnJheU1hcFxuICAgICAgICApO1xuICAgICAgICBjb25zdCBpdGVtUmVjdXJzaXZlID0gaXRlbVJlZlBvaW50ZXIgIT09IHNob3J0RGF0YVBvaW50ZXIgKyAnLy0nO1xuICAgICAgICBpZiAoIWhhc093bihqc2YudGVtcGxhdGVSZWZMaWJyYXJ5LCBpdGVtUmVmUG9pbnRlcikpIHtcbiAgICAgICAgICBqc2YudGVtcGxhdGVSZWZMaWJyYXJ5W2l0ZW1SZWZQb2ludGVyXSA9IG51bGw7XG4gICAgICAgICAganNmLnRlbXBsYXRlUmVmTGlicmFyeVtpdGVtUmVmUG9pbnRlcl0gPSBidWlsZEZvcm1Hcm91cFRlbXBsYXRlKFxuICAgICAgICAgICAganNmLCBudWxsLCBzZXRWYWx1ZXMsXG4gICAgICAgICAgICBzY2hlbWFSZWZQb2ludGVyLFxuICAgICAgICAgICAgaXRlbVJlZlBvaW50ZXIsXG4gICAgICAgICAgICB0ZW1wbGF0ZVBvaW50ZXIgKyAnL2NvbnRyb2xzLy0nXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBjb25zdCBpdGVtT3B0aW9ucyA9IGpzZi5kYXRhTWFwLmdldChpdGVtUmVmUG9pbnRlcikgfHwgbmV3IE1hcCgpO1xuICAgICAgICBjb25zdCBpdGVtT3B0aW9ucyA9IG5vZGVPcHRpb25zO1xuICAgICAgICBpZiAoIWl0ZW1SZWN1cnNpdmUgfHwgaGFzT3duKHZhbGlkYXRvcnMsICdyZXF1aXJlZCcpKSB7XG4gICAgICAgICAgY29uc3QgYXJyYXlMZW5ndGggPSBNYXRoLm1pbihNYXRoLm1heChcbiAgICAgICAgICAgIGl0ZW1SZWN1cnNpdmUgPyAwIDpcbiAgICAgICAgICAgICAgKGl0ZW1PcHRpb25zLmdldCgndHVwbGVJdGVtcycpICsgaXRlbU9wdGlvbnMuZ2V0KCdsaXN0SXRlbXMnKSkgfHwgMCxcbiAgICAgICAgICAgIGlzQXJyYXkobm9kZVZhbHVlKSA/IG5vZGVWYWx1ZS5sZW5ndGggOiAwXG4gICAgICAgICAgKSwgbWF4SXRlbXMpO1xuICAgICAgICAgIGZvciAobGV0IGkgPSBjb250cm9scy5sZW5ndGg7IGkgPCBhcnJheUxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb250cm9scy5wdXNoKFxuICAgICAgICAgICAgICBpc0FycmF5KG5vZGVWYWx1ZSkgP1xuICAgICAgICAgICAgICAgIGJ1aWxkRm9ybUdyb3VwVGVtcGxhdGUoXG4gICAgICAgICAgICAgICAgICBqc2YsIG5vZGVWYWx1ZVtpXSwgc2V0VmFsdWVzLFxuICAgICAgICAgICAgICAgICAgc2NoZW1hUmVmUG9pbnRlcixcbiAgICAgICAgICAgICAgICAgIGRhdGFQb2ludGVyICsgJy8tJyxcbiAgICAgICAgICAgICAgICAgIHRlbXBsYXRlUG9pbnRlciArICcvY29udHJvbHMvLSdcbiAgICAgICAgICAgICAgICApIDpcbiAgICAgICAgICAgICAgICBpdGVtUmVjdXJzaXZlID9cbiAgICAgICAgICAgICAgICAgIG51bGwgOiBfLmNsb25lRGVlcChqc2YudGVtcGxhdGVSZWZMaWJyYXJ5W2l0ZW1SZWZQb2ludGVyXSlcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4geyBjb250cm9sVHlwZSwgY29udHJvbHMsIHZhbGlkYXRvcnMgfTtcblxuICAgIGNhc2UgJyRyZWYnOlxuICAgICAgY29uc3Qgc2NoZW1hUmVmID0gSnNvblBvaW50ZXIuY29tcGlsZShzY2hlbWEuJHJlZik7XG4gICAgICBjb25zdCBkYXRhUmVmID0gSnNvblBvaW50ZXIudG9EYXRhUG9pbnRlcihzY2hlbWFSZWYsIHNjaGVtYSk7XG4gICAgICBjb25zdCByZWZQb2ludGVyID0gcmVtb3ZlUmVjdXJzaXZlUmVmZXJlbmNlcyhcbiAgICAgICAgZGF0YVJlZiwganNmLmRhdGFSZWN1cnNpdmVSZWZNYXAsIGpzZi5hcnJheU1hcFxuICAgICAgKTtcbiAgICAgIGlmIChyZWZQb2ludGVyICYmICFoYXNPd24oanNmLnRlbXBsYXRlUmVmTGlicmFyeSwgcmVmUG9pbnRlcikpIHtcbiAgICAgICAgLy8gU2V0IHRvIG51bGwgZmlyc3QgdG8gcHJldmVudCByZWN1cnNpdmUgcmVmZXJlbmNlIGZyb20gY2F1c2luZyBlbmRsZXNzIGxvb3BcbiAgICAgICAganNmLnRlbXBsYXRlUmVmTGlicmFyeVtyZWZQb2ludGVyXSA9IG51bGw7XG4gICAgICAgIGNvbnN0IG5ld1RlbXBsYXRlID0gYnVpbGRGb3JtR3JvdXBUZW1wbGF0ZShqc2YsIHNldFZhbHVlcywgc2V0VmFsdWVzLCBzY2hlbWFSZWYpO1xuICAgICAgICBpZiAobmV3VGVtcGxhdGUpIHtcbiAgICAgICAgICBqc2YudGVtcGxhdGVSZWZMaWJyYXJ5W3JlZlBvaW50ZXJdID0gbmV3VGVtcGxhdGU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZGVsZXRlIGpzZi50ZW1wbGF0ZVJlZkxpYnJhcnlbcmVmUG9pbnRlcl07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuXG4gICAgY2FzZSAnRm9ybUNvbnRyb2wnOlxuICAgICAgY29uc3QgdmFsdWUgPSB7XG4gICAgICAgIHZhbHVlOiBzZXRWYWx1ZXMgJiYgaXNQcmltaXRpdmUobm9kZVZhbHVlKSA/IG5vZGVWYWx1ZSA6IG51bGwsXG4gICAgICAgIGRpc2FibGVkOiBub2RlT3B0aW9ucy5nZXQoJ2Rpc2FibGVkJykgfHwgZmFsc2VcbiAgICAgIH07XG4gICAgICByZXR1cm4geyBjb250cm9sVHlwZSwgdmFsdWUsIHZhbGlkYXRvcnMgfTtcblxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gbnVsbDtcbiAgfVxufVxuXG4vKipcbiAqICdidWlsZEZvcm1Hcm91cCcgZnVuY3Rpb25cbiAqXG4gKiAvLyB7YW55fSB0ZW1wbGF0ZSAtXG4gKiAvLyB7QWJzdHJhY3RDb250cm9sfVxuKi9cbmV4cG9ydCBmdW5jdGlvbiBidWlsZEZvcm1Hcm91cCh0ZW1wbGF0ZTogYW55KTogQWJzdHJhY3RDb250cm9sIHtcbiAgbGV0IHZhbGlkYXRvckZuczogVmFsaWRhdG9yRm5bXSA9IFtdO1xuICBsZXQgdmFsaWRhdG9yRm46IFZhbGlkYXRvckZuID0gbnVsbDtcbiAgaWYgKGhhc093bih0ZW1wbGF0ZSwgJ3ZhbGlkYXRvcnMnKSkge1xuICAgIGZvckVhY2godGVtcGxhdGUudmFsaWRhdG9ycywgKHBhcmFtZXRlcnMsIHZhbGlkYXRvcikgPT4ge1xuICAgICAgaWYgKHR5cGVvZiBKc29uVmFsaWRhdG9yc1t2YWxpZGF0b3JdID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHZhbGlkYXRvckZucy5wdXNoKEpzb25WYWxpZGF0b3JzW3ZhbGlkYXRvcl0uYXBwbHkobnVsbCwgcGFyYW1ldGVycykpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGlmICh2YWxpZGF0b3JGbnMubGVuZ3RoICYmXG4gICAgICBpbkFycmF5KHRlbXBsYXRlLmNvbnRyb2xUeXBlLCBbJ0Zvcm1Hcm91cCcsICdGb3JtQXJyYXknXSlcbiAgICApIHtcbiAgICAgIHZhbGlkYXRvckZuID0gdmFsaWRhdG9yRm5zLmxlbmd0aCA+IDEgP1xuICAgICAgICBKc29uVmFsaWRhdG9ycy5jb21wb3NlKHZhbGlkYXRvckZucykgOiB2YWxpZGF0b3JGbnNbMF07XG4gICAgfVxuICB9XG4gIGlmIChoYXNPd24odGVtcGxhdGUsICdjb250cm9sVHlwZScpKSB7XG4gICAgc3dpdGNoICh0ZW1wbGF0ZS5jb250cm9sVHlwZSkge1xuICAgICAgY2FzZSAnRm9ybUdyb3VwJzpcbiAgICAgICAgbGV0IGdyb3VwQ29udHJvbHM6IHsgW2tleTogc3RyaW5nXTogQWJzdHJhY3RDb250cm9sIH0gPSB7fTtcbiAgICAgICAgZm9yRWFjaCh0ZW1wbGF0ZS5jb250cm9scywgKGNvbnRyb2xzLCBrZXkpID0+IHtcbiAgICAgICAgICBsZXQgbmV3Q29udHJvbDogQWJzdHJhY3RDb250cm9sID0gYnVpbGRGb3JtR3JvdXAoY29udHJvbHMpO1xuICAgICAgICAgIGlmIChuZXdDb250cm9sKSB7IGdyb3VwQ29udHJvbHNba2V5XSA9IG5ld0NvbnRyb2w7IH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBuZXcgRm9ybUdyb3VwKGdyb3VwQ29udHJvbHMsIHZhbGlkYXRvckZuKTtcbiAgICAgIGNhc2UgJ0Zvcm1BcnJheSc6XG4gICAgICAgIHJldHVybiBuZXcgRm9ybUFycmF5KF8uZmlsdGVyKF8ubWFwKHRlbXBsYXRlLmNvbnRyb2xzLFxuICAgICAgICAgIGNvbnRyb2xzID0+IGJ1aWxkRm9ybUdyb3VwKGNvbnRyb2xzKVxuICAgICAgICApKSwgdmFsaWRhdG9yRm4pO1xuICAgICAgY2FzZSAnRm9ybUNvbnRyb2wnOlxuICAgICAgICByZXR1cm4gbmV3IEZvcm1Db250cm9sKHRlbXBsYXRlLnZhbHVlLCB2YWxpZGF0b3JGbnMpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cblxuLyoqXG4gKiAnbWVyZ2VWYWx1ZXMnIGZ1bmN0aW9uXG4gKlxuICogLy8gIHthbnlbXX0gLi4udmFsdWVzVG9NZXJnZSAtIE11bHRpcGxlIHZhbHVlcyB0byBtZXJnZVxuICogLy8ge2FueX0gLSBNZXJnZWQgdmFsdWVzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtZXJnZVZhbHVlcyguLi52YWx1ZXNUb01lcmdlKSB7XG4gIGxldCBtZXJnZWRWYWx1ZXM6IGFueSA9IG51bGw7XG4gIGZvciAobGV0IGN1cnJlbnRWYWx1ZSBvZiB2YWx1ZXNUb01lcmdlKSB7XG4gICAgaWYgKCFpc0VtcHR5KGN1cnJlbnRWYWx1ZSkpIHtcbiAgICAgIGlmICh0eXBlb2YgY3VycmVudFZhbHVlID09PSAnb2JqZWN0JyAmJlxuICAgICAgICAoaXNFbXB0eShtZXJnZWRWYWx1ZXMpIHx8IHR5cGVvZiBtZXJnZWRWYWx1ZXMgIT09ICdvYmplY3QnKVxuICAgICAgKSB7XG4gICAgICAgIGlmIChpc0FycmF5KGN1cnJlbnRWYWx1ZSkpIHtcbiAgICAgICAgICBtZXJnZWRWYWx1ZXMgPSBbIC4uLmN1cnJlbnRWYWx1ZSBdO1xuICAgICAgICB9IGVsc2UgaWYgKGlzT2JqZWN0KGN1cnJlbnRWYWx1ZSkpIHtcbiAgICAgICAgICBtZXJnZWRWYWx1ZXMgPSB7IC4uLmN1cnJlbnRWYWx1ZSB9O1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBjdXJyZW50VmFsdWUgIT09ICdvYmplY3QnKSB7XG4gICAgICAgIG1lcmdlZFZhbHVlcyA9IGN1cnJlbnRWYWx1ZTtcbiAgICAgIH0gZWxzZSBpZiAoaXNPYmplY3QobWVyZ2VkVmFsdWVzKSAmJiBpc09iamVjdChjdXJyZW50VmFsdWUpKSB7XG4gICAgICAgIE9iamVjdC5hc3NpZ24obWVyZ2VkVmFsdWVzLCBjdXJyZW50VmFsdWUpO1xuICAgICAgfSBlbHNlIGlmIChpc09iamVjdChtZXJnZWRWYWx1ZXMpICYmIGlzQXJyYXkoY3VycmVudFZhbHVlKSkge1xuICAgICAgICBsZXQgbmV3VmFsdWVzID0gW107XG4gICAgICAgIGZvciAobGV0IHZhbHVlIG9mIGN1cnJlbnRWYWx1ZSkge1xuICAgICAgICAgIG5ld1ZhbHVlcy5wdXNoKG1lcmdlVmFsdWVzKG1lcmdlZFZhbHVlcywgdmFsdWUpKTtcbiAgICAgICAgfVxuICAgICAgICBtZXJnZWRWYWx1ZXMgPSBuZXdWYWx1ZXM7XG4gICAgICB9IGVsc2UgaWYgKGlzQXJyYXkobWVyZ2VkVmFsdWVzKSAmJiBpc09iamVjdChjdXJyZW50VmFsdWUpKSB7XG4gICAgICAgIGxldCBuZXdWYWx1ZXMgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgdmFsdWUgb2YgbWVyZ2VkVmFsdWVzKSB7XG4gICAgICAgICAgbmV3VmFsdWVzLnB1c2gobWVyZ2VWYWx1ZXModmFsdWUsIGN1cnJlbnRWYWx1ZSkpO1xuICAgICAgICB9XG4gICAgICAgIG1lcmdlZFZhbHVlcyA9IG5ld1ZhbHVlcztcbiAgICAgIH0gZWxzZSBpZiAoaXNBcnJheShtZXJnZWRWYWx1ZXMpICYmIGlzQXJyYXkoY3VycmVudFZhbHVlKSkge1xuICAgICAgICBsZXQgbmV3VmFsdWVzID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgTWF0aC5tYXgobWVyZ2VkVmFsdWVzLmxlbmd0aCwgY3VycmVudFZhbHVlLmxlbmd0aCk7IGkrKykge1xuICAgICAgICAgIGlmIChpIDwgbWVyZ2VkVmFsdWVzLmxlbmd0aCAmJiBpIDwgY3VycmVudFZhbHVlLmxlbmd0aCkge1xuICAgICAgICAgICAgbmV3VmFsdWVzLnB1c2gobWVyZ2VWYWx1ZXMobWVyZ2VkVmFsdWVzW2ldLCBjdXJyZW50VmFsdWVbaV0pKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGkgPCBtZXJnZWRWYWx1ZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICBuZXdWYWx1ZXMucHVzaChtZXJnZWRWYWx1ZXNbaV0pO1xuICAgICAgICAgIH0gZWxzZSBpZiAoaSA8IGN1cnJlbnRWYWx1ZS5sZW5ndGgpIHtcbiAgICAgICAgICAgIG5ld1ZhbHVlcy5wdXNoKGN1cnJlbnRWYWx1ZVtpXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIG1lcmdlZFZhbHVlcyA9IG5ld1ZhbHVlcztcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIG1lcmdlZFZhbHVlcztcbn1cblxuLyoqXG4gKiAnc2V0UmVxdWlyZWRGaWVsZHMnIGZ1bmN0aW9uXG4gKlxuICogLy8ge3NjaGVtYX0gc2NoZW1hIC0gSlNPTiBTY2hlbWFcbiAqIC8vIHtvYmplY3R9IGZvcm1Db250cm9sVGVtcGxhdGUgLSBGb3JtIENvbnRyb2wgVGVtcGxhdGUgb2JqZWN0XG4gKiAvLyB7Ym9vbGVhbn0gLSB0cnVlIGlmIGFueSBmaWVsZHMgaGF2ZSBiZWVuIHNldCB0byByZXF1aXJlZCwgZmFsc2UgaWYgbm90XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXRSZXF1aXJlZEZpZWxkcyhzY2hlbWE6IGFueSwgZm9ybUNvbnRyb2xUZW1wbGF0ZTogYW55KTogYm9vbGVhbiB7XG4gIGxldCBmaWVsZHNSZXF1aXJlZCA9IGZhbHNlO1xuICBpZiAoaGFzT3duKHNjaGVtYSwgJ3JlcXVpcmVkJykgJiYgIWlzRW1wdHkoc2NoZW1hLnJlcXVpcmVkKSkge1xuICAgIGZpZWxkc1JlcXVpcmVkID0gdHJ1ZTtcbiAgICBsZXQgcmVxdWlyZWRBcnJheSA9IGlzQXJyYXkoc2NoZW1hLnJlcXVpcmVkKSA/IHNjaGVtYS5yZXF1aXJlZCA6IFtzY2hlbWEucmVxdWlyZWRdO1xuICAgIHJlcXVpcmVkQXJyYXkgPSBmb3JFYWNoKHJlcXVpcmVkQXJyYXksXG4gICAgICBrZXkgPT4gSnNvblBvaW50ZXIuc2V0KGZvcm1Db250cm9sVGVtcGxhdGUsICcvJyArIGtleSArICcvdmFsaWRhdG9ycy9yZXF1aXJlZCcsIFtdKVxuICAgICk7XG4gIH1cbiAgcmV0dXJuIGZpZWxkc1JlcXVpcmVkO1xuXG4gIC8vIFRPRE86IEFkZCBzdXBwb3J0IGZvciBwYXR0ZXJuUHJvcGVydGllc1xuICAvLyBodHRwczovL3NwYWNldGVsZXNjb3BlLmdpdGh1Yi5pby91bmRlcnN0YW5kaW5nLWpzb24tc2NoZW1hL3JlZmVyZW5jZS9vYmplY3QuaHRtbCNwYXR0ZXJuLXByb3BlcnRpZXNcbn1cblxuLyoqXG4gKiAnZm9ybWF0Rm9ybURhdGEnIGZ1bmN0aW9uXG4gKlxuICogLy8ge2FueX0gZm9ybURhdGEgLSBBbmd1bGFyIEZvcm1Hcm91cCBkYXRhIG9iamVjdFxuICogLy8ge01hcDxzdHJpbmcsIGFueT59IGRhdGFNYXAgLVxuICogLy8ge01hcDxzdHJpbmcsIHN0cmluZz59IHJlY3Vyc2l2ZVJlZk1hcCAtXG4gKiAvLyB7TWFwPHN0cmluZywgbnVtYmVyPn0gYXJyYXlNYXAgLVxuICogLy8ge2Jvb2xlYW4gPSBmYWxzZX0gZml4RXJyb3JzIC0gaWYgVFJVRSwgdHJpZXMgdG8gZml4IGRhdGFcbiAqIC8vIHthbnl9IC0gZm9ybWF0dGVkIGRhdGEgb2JqZWN0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXRGb3JtRGF0YShcbiAgZm9ybURhdGE6IGFueSwgZGF0YU1hcDogTWFwPHN0cmluZywgYW55PixcbiAgcmVjdXJzaXZlUmVmTWFwOiBNYXA8c3RyaW5nLCBzdHJpbmc+LCBhcnJheU1hcDogTWFwPHN0cmluZywgbnVtYmVyPixcbiAgcmV0dXJuRW1wdHlGaWVsZHMgPSBmYWxzZSwgZml4RXJyb3JzID0gZmFsc2Vcbik6IGFueSB7XG4gIGlmIChmb3JtRGF0YSA9PT0gbnVsbCB8fCB0eXBlb2YgZm9ybURhdGEgIT09ICdvYmplY3QnKSB7IHJldHVybiBmb3JtRGF0YSB9XG4gIGxldCBmb3JtYXR0ZWREYXRhID0gaXNBcnJheShmb3JtRGF0YSkgPyBbXSA6IHt9O1xuICBKc29uUG9pbnRlci5mb3JFYWNoRGVlcChmb3JtRGF0YSwgKHZhbHVlLCBkYXRhUG9pbnRlcikgPT4ge1xuXG4gICAgLy8gSWYgcmV0dXJuRW1wdHlGaWVsZHMgPT09IHRydWUsXG4gICAgLy8gYWRkIGVtcHR5IGFycmF5cyBhbmQgb2JqZWN0cyB0byBhbGwgYWxsb3dlZCBrZXlzXG4gICAgaWYgKHJldHVybkVtcHR5RmllbGRzICYmIGlzQXJyYXkodmFsdWUpKSB7XG4gICAgICBKc29uUG9pbnRlci5zZXQoZm9ybWF0dGVkRGF0YSwgZGF0YVBvaW50ZXIsIFtdKTtcbiAgICB9IGVsc2UgaWYgKHJldHVybkVtcHR5RmllbGRzICYmIGlzT2JqZWN0KHZhbHVlKSAmJiAhaXNEYXRlKHZhbHVlKSkge1xuICAgICAgSnNvblBvaW50ZXIuc2V0KGZvcm1hdHRlZERhdGEsIGRhdGFQb2ludGVyLCB7fSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBnZW5lcmljUG9pbnRlciA9XG4gICAgICAgIEpzb25Qb2ludGVyLmhhcyhkYXRhTWFwLCBbZGF0YVBvaW50ZXIsICdzY2hlbWFUeXBlJ10pID8gZGF0YVBvaW50ZXIgOlxuICAgICAgICAgIHJlbW92ZVJlY3Vyc2l2ZVJlZmVyZW5jZXMoZGF0YVBvaW50ZXIsIHJlY3Vyc2l2ZVJlZk1hcCwgYXJyYXlNYXApO1xuICAgICAgaWYgKEpzb25Qb2ludGVyLmhhcyhkYXRhTWFwLCBbZ2VuZXJpY1BvaW50ZXIsICdzY2hlbWFUeXBlJ10pKSB7XG4gICAgICAgIGNvbnN0IHNjaGVtYVR5cGU6IFNjaGVtYVByaW1pdGl2ZVR5cGUgfCBTY2hlbWFQcmltaXRpdmVUeXBlW10gPVxuICAgICAgICAgIGRhdGFNYXAuZ2V0KGdlbmVyaWNQb2ludGVyKS5nZXQoJ3NjaGVtYVR5cGUnKTtcbiAgICAgICAgaWYgKHNjaGVtYVR5cGUgPT09ICdudWxsJykge1xuICAgICAgICAgIEpzb25Qb2ludGVyLnNldChmb3JtYXR0ZWREYXRhLCBkYXRhUG9pbnRlciwgbnVsbCk7XG4gICAgICAgIH0gZWxzZSBpZiAoKGhhc1ZhbHVlKHZhbHVlKSB8fCByZXR1cm5FbXB0eUZpZWxkcykgJiZcbiAgICAgICAgICBpbkFycmF5KHNjaGVtYVR5cGUsIFsnc3RyaW5nJywgJ2ludGVnZXInLCAnbnVtYmVyJywgJ2Jvb2xlYW4nXSlcbiAgICAgICAgKSB7XG4gICAgICAgICAgY29uc3QgbmV3VmFsdWUgPSAoZml4RXJyb3JzIHx8ICh2YWx1ZSA9PT0gbnVsbCAmJiByZXR1cm5FbXB0eUZpZWxkcykpID9cbiAgICAgICAgICAgIHRvU2NoZW1hVHlwZSh2YWx1ZSwgc2NoZW1hVHlwZSkgOiB0b0phdmFTY3JpcHRUeXBlKHZhbHVlLCBzY2hlbWFUeXBlKTtcbiAgICAgICAgICBpZiAoaXNEZWZpbmVkKG5ld1ZhbHVlKSB8fCByZXR1cm5FbXB0eUZpZWxkcykge1xuICAgICAgICAgICAgSnNvblBvaW50ZXIuc2V0KGZvcm1hdHRlZERhdGEsIGRhdGFQb2ludGVyLCBuZXdWYWx1ZSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgIC8vIElmIHJldHVybkVtcHR5RmllbGRzID09PSBmYWxzZSxcbiAgICAgICAgLy8gb25seSBhZGQgZW1wdHkgYXJyYXlzIGFuZCBvYmplY3RzIHRvIHJlcXVpcmVkIGtleXNcbiAgICAgICAgfSBlbHNlIGlmIChzY2hlbWFUeXBlID09PSAnb2JqZWN0JyAmJiAhcmV0dXJuRW1wdHlGaWVsZHMpIHtcbiAgICAgICAgICAoZGF0YU1hcC5nZXQoZ2VuZXJpY1BvaW50ZXIpLmdldCgncmVxdWlyZWQnKSB8fCBbXSkuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICAgICAgY29uc3Qga2V5U2NoZW1hVHlwZSA9XG4gICAgICAgICAgICAgIGRhdGFNYXAuZ2V0KGAke2dlbmVyaWNQb2ludGVyfS8ke2tleX1gKS5nZXQoJ3NjaGVtYVR5cGUnKTtcbiAgICAgICAgICAgIGlmIChrZXlTY2hlbWFUeXBlID09PSAnYXJyYXknKSB7XG4gICAgICAgICAgICAgIEpzb25Qb2ludGVyLnNldChmb3JtYXR0ZWREYXRhLCBgJHtkYXRhUG9pbnRlcn0vJHtrZXl9YCwgW10pO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChrZXlTY2hlbWFUeXBlID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICBKc29uUG9pbnRlci5zZXQoZm9ybWF0dGVkRGF0YSwgYCR7ZGF0YVBvaW50ZXJ9LyR7a2V5fWAsIHt9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEZpbmlzaCBpbmNvbXBsZXRlICdkYXRlLXRpbWUnIGVudHJpZXNcbiAgICAgICAgaWYgKGRhdGFNYXAuZ2V0KGdlbmVyaWNQb2ludGVyKS5nZXQoJ3NjaGVtYUZvcm1hdCcpID09PSAnZGF0ZS10aW1lJykge1xuICAgICAgICAgIC8vIFwiMjAwMC0wMy0xNFQwMTo1OToyNi41MzVcIiAtPiBcIjIwMDAtMDMtMTRUMDE6NTk6MjYuNTM1WlwiIChhZGQgXCJaXCIpXG4gICAgICAgICAgaWYgKC9eXFxkXFxkXFxkXFxkLVswLTFdXFxkLVswLTNdXFxkW3RcXHNdWzAtMl1cXGQ6WzAtNV1cXGQ6WzAtNV1cXGQoPzpcXC5cXGQrKT8kL2kudGVzdCh2YWx1ZSkpIHtcbiAgICAgICAgICAgIEpzb25Qb2ludGVyLnNldChmb3JtYXR0ZWREYXRhLCBkYXRhUG9pbnRlciwgYCR7dmFsdWV9WmApO1xuICAgICAgICAgIC8vIFwiMjAwMC0wMy0xNFQwMTo1OVwiIC0+IFwiMjAwMC0wMy0xNFQwMTo1OTowMFpcIiAoYWRkIFwiOjAwWlwiKVxuICAgICAgICAgIH0gZWxzZSBpZiAoL15cXGRcXGRcXGRcXGQtWzAtMV1cXGQtWzAtM11cXGRbdFxcc11bMC0yXVxcZDpbMC01XVxcZCQvaS50ZXN0KHZhbHVlKSkge1xuICAgICAgICAgICAgSnNvblBvaW50ZXIuc2V0KGZvcm1hdHRlZERhdGEsIGRhdGFQb2ludGVyLCBgJHt2YWx1ZX06MDBaYCk7XG4gICAgICAgICAgLy8gXCIyMDAwLTAzLTE0XCIgLT4gXCIyMDAwLTAzLTE0VDAwOjAwOjAwWlwiIChhZGQgXCJUMDA6MDA6MDBaXCIpXG4gICAgICAgICAgfSBlbHNlIGlmIChmaXhFcnJvcnMgJiYgL15cXGRcXGRcXGRcXGQtWzAtMV1cXGQtWzAtM11cXGQkL2kudGVzdCh2YWx1ZSkpIHtcbiAgICAgICAgICAgIEpzb25Qb2ludGVyLnNldChmb3JtYXR0ZWREYXRhLCBkYXRhUG9pbnRlciwgYCR7dmFsdWV9OjAwOjAwOjAwWmApO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgIT09ICdvYmplY3QnIHx8IGlzRGF0ZSh2YWx1ZSkgfHxcbiAgICAgICAgKHZhbHVlID09PSBudWxsICYmIHJldHVybkVtcHR5RmllbGRzKVxuICAgICAgKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ2Zvcm1hdEZvcm1EYXRhIGVycm9yOiAnICtcbiAgICAgICAgICBgU2NoZW1hIHR5cGUgbm90IGZvdW5kIGZvciBmb3JtIHZhbHVlIGF0ICR7Z2VuZXJpY1BvaW50ZXJ9YCk7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ2RhdGFNYXAnLCBkYXRhTWFwKTtcbiAgICAgICAgY29uc29sZS5lcnJvcigncmVjdXJzaXZlUmVmTWFwJywgcmVjdXJzaXZlUmVmTWFwKTtcbiAgICAgICAgY29uc29sZS5lcnJvcignZ2VuZXJpY1BvaW50ZXInLCBnZW5lcmljUG9pbnRlcik7XG4gICAgICB9XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIGZvcm1hdHRlZERhdGE7XG59XG5cbi8qKlxuICogJ2dldENvbnRyb2wnIGZ1bmN0aW9uXG4gKlxuICogVXNlcyBhIEpTT04gUG9pbnRlciBmb3IgYSBkYXRhIG9iamVjdCB0byByZXRyaWV2ZSBhIGNvbnRyb2wgZnJvbVxuICogYW4gQW5ndWxhciBmb3JtR3JvdXAgb3IgZm9ybUdyb3VwIHRlbXBsYXRlLiAoTm90ZTogdGhvdWdoIGEgZm9ybUdyb3VwXG4gKiB0ZW1wbGF0ZSBpcyBtdWNoIHNpbXBsZXIsIGl0cyBiYXNpYyBzdHJ1Y3R1cmUgaXMgaWRlbnRpYWwgdG8gYSBmb3JtR3JvdXApLlxuICpcbiAqIElmIHRoZSBvcHRpb25hbCB0aGlyZCBwYXJhbWV0ZXIgJ3JldHVybkdyb3VwJyBpcyBzZXQgdG8gVFJVRSwgdGhlIGdyb3VwXG4gKiBjb250YWluaW5nIHRoZSBjb250cm9sIGlzIHJldHVybmVkLCByYXRoZXIgdGhhbiB0aGUgY29udHJvbCBpdHNlbGYuXG4gKlxuICogLy8ge0Zvcm1Hcm91cH0gZm9ybUdyb3VwIC0gQW5ndWxhciBGb3JtR3JvdXAgdG8gZ2V0IHZhbHVlIGZyb21cbiAqIC8vIHtQb2ludGVyfSBkYXRhUG9pbnRlciAtIEpTT04gUG9pbnRlciAoc3RyaW5nIG9yIGFycmF5KVxuICogLy8ge2Jvb2xlYW4gPSBmYWxzZX0gcmV0dXJuR3JvdXAgLSBJZiB0cnVlLCByZXR1cm4gZ3JvdXAgY29udGFpbmluZyBjb250cm9sXG4gKiAvLyB7Z3JvdXB9IC0gTG9jYXRlZCB2YWx1ZSAob3IgbnVsbCwgaWYgbm8gY29udHJvbCBmb3VuZClcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldENvbnRyb2woXG4gIGZvcm1Hcm91cDogYW55LCBkYXRhUG9pbnRlcjogUG9pbnRlciwgcmV0dXJuR3JvdXAgPSBmYWxzZVxuKTogYW55IHtcbiAgaWYgKCFpc09iamVjdChmb3JtR3JvdXApIHx8ICFKc29uUG9pbnRlci5pc0pzb25Qb2ludGVyKGRhdGFQb2ludGVyKSkge1xuICAgIGlmICghSnNvblBvaW50ZXIuaXNKc29uUG9pbnRlcihkYXRhUG9pbnRlcikpIHtcbiAgICAgIC8vIElmIGRhdGFQb2ludGVyIGlucHV0IGlzIG5vdCBhIHZhbGlkIEpTT04gcG9pbnRlciwgY2hlY2sgdG9cbiAgICAgIC8vIHNlZSBpZiBpdCBpcyBpbnN0ZWFkIGEgdmFsaWQgb2JqZWN0IHBhdGgsIHVzaW5nIGRvdCBub3RhaW9uXG4gICAgICBpZiAodHlwZW9mIGRhdGFQb2ludGVyID09PSAnc3RyaW5nJykge1xuICAgICAgICBjb25zdCBmb3JtQ29udHJvbCA9IGZvcm1Hcm91cC5nZXQoZGF0YVBvaW50ZXIpO1xuICAgICAgICBpZiAoZm9ybUNvbnRyb2wpIHsgcmV0dXJuIGZvcm1Db250cm9sOyB9XG4gICAgICB9XG4gICAgICBjb25zb2xlLmVycm9yKGBnZXRDb250cm9sIGVycm9yOiBJbnZhbGlkIEpTT04gUG9pbnRlcjogJHtkYXRhUG9pbnRlcn1gKTtcbiAgICB9XG4gICAgaWYgKCFpc09iamVjdChmb3JtR3JvdXApKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGBnZXRDb250cm9sIGVycm9yOiBJbnZhbGlkIGZvcm1Hcm91cDogJHtmb3JtR3JvdXB9YCk7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG4gIGxldCBkYXRhUG9pbnRlckFycmF5ID0gSnNvblBvaW50ZXIucGFyc2UoZGF0YVBvaW50ZXIpO1xuICBpZiAocmV0dXJuR3JvdXApIHsgZGF0YVBvaW50ZXJBcnJheSA9IGRhdGFQb2ludGVyQXJyYXkuc2xpY2UoMCwgLTEpOyB9XG5cbiAgLy8gSWYgZm9ybUdyb3VwIGlucHV0IGlzIGEgcmVhbCBmb3JtR3JvdXAgKG5vdCBhIGZvcm1Hcm91cCB0ZW1wbGF0ZSlcbiAgLy8gdHJ5IHVzaW5nIGZvcm1Hcm91cC5nZXQoKSB0byByZXR1cm4gdGhlIGNvbnRyb2xcbiAgaWYgKHR5cGVvZiBmb3JtR3JvdXAuZ2V0ID09PSAnZnVuY3Rpb24nICYmXG4gICAgZGF0YVBvaW50ZXJBcnJheS5ldmVyeShrZXkgPT4ga2V5LmluZGV4T2YoJy4nKSA9PT0gLTEpXG4gICkge1xuICAgIGNvbnN0IGZvcm1Db250cm9sID0gZm9ybUdyb3VwLmdldChkYXRhUG9pbnRlckFycmF5LmpvaW4oJy4nKSk7XG4gICAgaWYgKGZvcm1Db250cm9sKSB7IHJldHVybiBmb3JtQ29udHJvbDsgfVxuICB9XG5cbiAgLy8gSWYgZm9ybUdyb3VwIGlucHV0IGlzIGEgZm9ybUdyb3VwIHRlbXBsYXRlLFxuICAvLyBvciBmb3JtR3JvdXAuZ2V0KCkgZmFpbGVkIHRvIHJldHVybiB0aGUgY29udHJvbCxcbiAgLy8gc2VhcmNoIHRoZSBmb3JtR3JvdXAgb2JqZWN0IGZvciBkYXRhUG9pbnRlcidzIGNvbnRyb2xcbiAgbGV0IHN1Ykdyb3VwID0gZm9ybUdyb3VwO1xuICBmb3IgKGxldCBrZXkgb2YgZGF0YVBvaW50ZXJBcnJheSkge1xuICAgIGlmIChoYXNPd24oc3ViR3JvdXAsICdjb250cm9scycpKSB7IHN1Ykdyb3VwID0gc3ViR3JvdXAuY29udHJvbHM7IH1cbiAgICBpZiAoaXNBcnJheShzdWJHcm91cCkgJiYgKGtleSA9PT0gJy0nKSkge1xuICAgICAgc3ViR3JvdXAgPSBzdWJHcm91cFtzdWJHcm91cC5sZW5ndGggLSAxXTtcbiAgICB9IGVsc2UgaWYgKGhhc093bihzdWJHcm91cCwga2V5KSkge1xuICAgICAgc3ViR3JvdXAgPSBzdWJHcm91cFtrZXldO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmVycm9yKGBnZXRDb250cm9sIGVycm9yOiBVbmFibGUgdG8gZmluZCBcIiR7a2V5fVwiIGl0ZW0gaW4gRm9ybUdyb3VwLmApO1xuICAgICAgY29uc29sZS5lcnJvcihkYXRhUG9pbnRlcik7XG4gICAgICBjb25zb2xlLmVycm9yKGZvcm1Hcm91cCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICB9XG4gIHJldHVybiBzdWJHcm91cDtcbn1cbiJdfQ==