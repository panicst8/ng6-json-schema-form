/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as _ from 'lodash';
import { inArray, isArray, isEmpty, isNumber, isObject, isDefined, isString } from './validator.functions';
import { copy, fixTitle, forEach, hasOwn } from './utility.functions';
import { JsonPointer } from './jsonpointer.functions';
import { getFromSchema, getInputType, checkInlineType, isInputRequired, removeRecursiveReferences, updateInputOptions } from './json-schema.functions';
/**
 * 'buildLayout' function
 *
 * //   jsf
 * //   widgetLibrary
 * //
 * @param {?} jsf
 * @param {?} widgetLibrary
 * @return {?}
 */
export function buildLayout(jsf, widgetLibrary) {
    /** @type {?} */
    let hasSubmitButton = !JsonPointer.get(jsf, '/formOptions/addSubmit');
    /** @type {?} */
    const formLayout = mapLayout(jsf.layout, (layoutItem, index, layoutPointer) => {
        /** @type {?} */
        let currentIndex = index;
        /** @type {?} */
        let newNode = {
            _id: _.uniqueId(),
            options: {},
        };
        if (isObject(layoutItem)) {
            Object.assign(newNode, layoutItem);
            Object.keys(newNode)
                .filter(option => !inArray(option, [
                '_id', '$ref', 'arrayItem', 'arrayItemType', 'dataPointer', 'dataType',
                'items', 'key', 'name', 'options', 'recursiveReference', 'type', 'widget'
            ]))
                .forEach(option => {
                newNode.options[option] = newNode[option];
                delete newNode[option];
            });
            if (!hasOwn(newNode, 'type') && isString(newNode.widget)) {
                newNode.type = newNode.widget;
                delete newNode.widget;
            }
            if (!hasOwn(newNode.options, 'title')) {
                if (hasOwn(newNode.options, 'legend')) {
                    newNode.options.title = newNode.options.legend;
                    delete newNode.options.legend;
                }
            }
            if (!hasOwn(newNode.options, 'validationMessages')) {
                if (hasOwn(newNode.options, 'errorMessages')) {
                    newNode.options.validationMessages = newNode.options.errorMessages;
                    delete newNode.options.errorMessages;
                    // Convert Angular Schema Form (AngularJS) 'validationMessage' to
                    // Angular JSON Schema Form 'validationMessages'
                    // TV4 codes from https://github.com/geraintluff/tv4/blob/master/source/api.js
                }
                else if (hasOwn(newNode.options, 'validationMessage')) {
                    if (typeof newNode.options.validationMessage === 'string') {
                        newNode.options.validationMessages = newNode.options.validationMessage;
                    }
                    else {
                        newNode.options.validationMessages = {};
                        Object.keys(newNode.options.validationMessage).forEach(key => {
                            /** @type {?} */
                            const code = key + '';
                            /** @type {?} */
                            const newKey = code === '0' ? 'type' :
                                code === '1' ? 'enum' :
                                    code === '100' ? 'multipleOf' :
                                        code === '101' ? 'minimum' :
                                            code === '102' ? 'exclusiveMinimum' :
                                                code === '103' ? 'maximum' :
                                                    code === '104' ? 'exclusiveMaximum' :
                                                        code === '200' ? 'minLength' :
                                                            code === '201' ? 'maxLength' :
                                                                code === '202' ? 'pattern' :
                                                                    code === '300' ? 'minProperties' :
                                                                        code === '301' ? 'maxProperties' :
                                                                            code === '302' ? 'required' :
                                                                                code === '304' ? 'dependencies' :
                                                                                    code === '400' ? 'minItems' :
                                                                                        code === '401' ? 'maxItems' :
                                                                                            code === '402' ? 'uniqueItems' :
                                                                                                code === '500' ? 'format' : code + '';
                            newNode.options.validationMessages[newKey] = newNode.options.validationMessage[key];
                        });
                    }
                    delete newNode.options.validationMessage;
                }
            }
        }
        else if (JsonPointer.isJsonPointer(layoutItem)) {
            newNode.dataPointer = layoutItem;
        }
        else if (isString(layoutItem)) {
            newNode.key = layoutItem;
        }
        else {
            console.error('buildLayout error: Form layout element not recognized:');
            console.error(layoutItem);
            return null;
        }
        /** @type {?} */
        let nodeSchema = null;
        // If newNode does not have a dataPointer, try to find an equivalent
        if (!hasOwn(newNode, 'dataPointer')) {
            // If newNode has a key, change it to a dataPointer
            if (hasOwn(newNode, 'key')) {
                newNode.dataPointer = newNode.key === '*' ? newNode.key :
                    JsonPointer.compile(JsonPointer.parseObjectPath(newNode.key), '-');
                delete newNode.key;
                // If newNode is an array, search for dataPointer in child nodes
            }
            else if (hasOwn(newNode, 'type') && newNode.type.slice(-5) === 'array') {
                /** @type {?} */
                const findDataPointer = (items) => {
                    if (items === null || typeof items !== 'object') {
                        return;
                    }
                    if (hasOwn(items, 'dataPointer')) {
                        return items.dataPointer;
                    }
                    if (isArray(items.items)) {
                        for (let item of items.items) {
                            if (hasOwn(item, 'dataPointer') && item.dataPointer.indexOf('/-') !== -1) {
                                return item.dataPointer;
                            }
                            if (hasOwn(item, 'items')) {
                                /** @type {?} */
                                const searchItem = findDataPointer(item);
                                if (searchItem) {
                                    return searchItem;
                                }
                            }
                        }
                    }
                };
                /** @type {?} */
                const childDataPointer = findDataPointer(newNode);
                if (childDataPointer) {
                    newNode.dataPointer =
                        childDataPointer.slice(0, childDataPointer.lastIndexOf('/-'));
                }
            }
        }
        if (hasOwn(newNode, 'dataPointer')) {
            if (newNode.dataPointer === '*') {
                return buildLayoutFromSchema(jsf, widgetLibrary, jsf.formValues);
            }
            /** @type {?} */
            const nodeValue = JsonPointer.get(jsf.formValues, newNode.dataPointer.replace(/\/-/g, '/1'));
            // TODO: Create function getFormValues(jsf, dataPointer, forRefLibrary)
            // check formOptions.setSchemaDefaults and formOptions.setLayoutDefaults
            // then set apropriate values from initialVaues, schema, or layout
            newNode.dataPointer =
                JsonPointer.toGenericPointer(newNode.dataPointer, jsf.arrayMap);
            /** @type {?} */
            const LastKey = JsonPointer.toKey(newNode.dataPointer);
            if (!newNode.name && isString(LastKey) && LastKey !== '-') {
                newNode.name = LastKey;
            }
            /** @type {?} */
            const shortDataPointer = removeRecursiveReferences(newNode.dataPointer, jsf.dataRecursiveRefMap, jsf.arrayMap);
            /** @type {?} */
            const recursive = !shortDataPointer.length ||
                shortDataPointer !== newNode.dataPointer;
            /** @type {?} */
            let schemaPointer;
            if (!jsf.dataMap.has(shortDataPointer)) {
                jsf.dataMap.set(shortDataPointer, new Map());
            }
            /** @type {?} */
            const nodeDataMap = jsf.dataMap.get(shortDataPointer);
            if (nodeDataMap.has('schemaPointer')) {
                schemaPointer = nodeDataMap.get('schemaPointer');
            }
            else {
                schemaPointer = JsonPointer.toSchemaPointer(shortDataPointer, jsf.schema);
                nodeDataMap.set('schemaPointer', schemaPointer);
            }
            nodeDataMap.set('disabled', !!newNode.options.disabled);
            nodeSchema = JsonPointer.get(jsf.schema, schemaPointer);
            if (nodeSchema) {
                if (!hasOwn(newNode, 'type')) {
                    newNode.type = getInputType(nodeSchema, newNode);
                }
                else if (!widgetLibrary.hasWidget(newNode.type)) {
                    /** @type {?} */
                    const oldWidgetType = newNode.type;
                    newNode.type = getInputType(nodeSchema, newNode);
                    console.error(`error: widget type "${oldWidgetType}" ` +
                        `not found in library. Replacing with "${newNode.type}".`);
                }
                else {
                    newNode.type = checkInlineType(newNode.type, nodeSchema, newNode);
                }
                if (nodeSchema.type === 'object' && isArray(nodeSchema.required)) {
                    nodeDataMap.set('required', nodeSchema.required);
                }
                newNode.dataType =
                    nodeSchema.type || (hasOwn(nodeSchema, '$ref') ? '$ref' : null);
                updateInputOptions(newNode, nodeSchema, jsf);
                // Present checkboxes as single control, rather than array
                if (newNode.type === 'checkboxes' && hasOwn(nodeSchema, 'items')) {
                    updateInputOptions(newNode, nodeSchema.items, jsf);
                }
                else if (newNode.dataType === 'array') {
                    newNode.options.maxItems = Math.min(nodeSchema.maxItems || 1000, newNode.options.maxItems || 1000);
                    newNode.options.minItems = Math.max(nodeSchema.minItems || 0, newNode.options.minItems || 0);
                    newNode.options.listItems = Math.max(newNode.options.listItems || 0, isArray(nodeValue) ? nodeValue.length : 0);
                    newNode.options.tupleItems =
                        isArray(nodeSchema.items) ? nodeSchema.items.length : 0;
                    if (newNode.options.maxItems < newNode.options.tupleItems) {
                        newNode.options.tupleItems = newNode.options.maxItems;
                        newNode.options.listItems = 0;
                    }
                    else if (newNode.options.maxItems <
                        newNode.options.tupleItems + newNode.options.listItems) {
                        newNode.options.listItems =
                            newNode.options.maxItems - newNode.options.tupleItems;
                    }
                    else if (newNode.options.minItems >
                        newNode.options.tupleItems + newNode.options.listItems) {
                        newNode.options.listItems =
                            newNode.options.minItems - newNode.options.tupleItems;
                    }
                    if (!nodeDataMap.has('maxItems')) {
                        nodeDataMap.set('maxItems', newNode.options.maxItems);
                        nodeDataMap.set('minItems', newNode.options.minItems);
                        nodeDataMap.set('tupleItems', newNode.options.tupleItems);
                        nodeDataMap.set('listItems', newNode.options.listItems);
                    }
                    if (!jsf.arrayMap.has(shortDataPointer)) {
                        jsf.arrayMap.set(shortDataPointer, newNode.options.tupleItems);
                    }
                }
                if (isInputRequired(jsf.schema, schemaPointer)) {
                    newNode.options.required = true;
                    jsf.fieldsRequired = true;
                }
            }
            else {
                // TODO: create item in FormGroup model from layout key (?)
                updateInputOptions(newNode, {}, jsf);
            }
            if (!newNode.options.title && !/^\d+$/.test(newNode.name)) {
                newNode.options.title = fixTitle(newNode.name);
            }
            if (hasOwn(newNode.options, 'copyValueTo')) {
                if (typeof newNode.options.copyValueTo === 'string') {
                    newNode.options.copyValueTo = [newNode.options.copyValueTo];
                }
                if (isArray(newNode.options.copyValueTo)) {
                    newNode.options.copyValueTo = newNode.options.copyValueTo.map(item => JsonPointer.compile(JsonPointer.parseObjectPath(item), '-'));
                }
            }
            newNode.widget = widgetLibrary.getWidget(newNode.type);
            nodeDataMap.set('inputType', newNode.type);
            nodeDataMap.set('widget', newNode.widget);
            if (newNode.dataType === 'array' &&
                (hasOwn(newNode, 'items') || hasOwn(newNode, 'additionalItems'))) {
                /** @type {?} */
                let itemRefPointer = removeRecursiveReferences(newNode.dataPointer + '/-', jsf.dataRecursiveRefMap, jsf.arrayMap);
                if (!jsf.dataMap.has(itemRefPointer)) {
                    jsf.dataMap.set(itemRefPointer, new Map());
                }
                jsf.dataMap.get(itemRefPointer).set('inputType', 'section');
                // Fix insufficiently nested array item groups
                if (newNode.items.length > 1) {
                    /** @type {?} */
                    let arrayItemGroup = [];
                    /** @type {?} */
                    let arrayItemGroupTemplate = [];
                    /** @type {?} */
                    let newIndex = 0;
                    for (let i = newNode.items.length - 1; i >= 0; i--) {
                        /** @type {?} */
                        let subItem = newNode.items[i];
                        if (hasOwn(subItem, 'dataPointer') &&
                            subItem.dataPointer.slice(0, itemRefPointer.length) === itemRefPointer) {
                            /** @type {?} */
                            let arrayItem = newNode.items.splice(i, 1)[0];
                            arrayItem.dataPointer = newNode.dataPointer + '/-' +
                                arrayItem.dataPointer.slice(itemRefPointer.length);
                            arrayItemGroup.unshift(arrayItem);
                            newIndex++;
                        }
                        else {
                            subItem.arrayItem = true;
                            // TODO: Check schema to get arrayItemType and removable
                            subItem.arrayItemType = 'list';
                            subItem.removable = newNode.options.removable !== false;
                        }
                    }
                    if (arrayItemGroup.length) {
                        newNode.items.push({
                            _id: _.uniqueId(),
                            arrayItem: true,
                            arrayItemType: newNode.options.tupleItems > newNode.items.length ?
                                'tuple' : 'list',
                            items: arrayItemGroup,
                            options: { removable: newNode.options.removable !== false, },
                            dataPointer: newNode.dataPointer + '/-',
                            type: 'section',
                            widget: widgetLibrary.getWidget('section'),
                        });
                    }
                }
                else {
                    // TODO: Fix to hndle multiple items
                    newNode.items[0].arrayItem = true;
                    if (!newNode.items[0].dataPointer) {
                        newNode.items[0].dataPointer =
                            JsonPointer.toGenericPointer(itemRefPointer, jsf.arrayMap);
                    }
                    if (!JsonPointer.has(newNode, '/items/0/options/removable')) {
                        newNode.items[0].options.removable = true;
                    }
                    if (newNode.options.orderable === false) {
                        newNode.items[0].options.orderable = false;
                    }
                    newNode.items[0].arrayItemType =
                        newNode.options.tupleItems ? 'tuple' : 'list';
                }
                if (isArray(newNode.items)) {
                    /** @type {?} */
                    const arrayListItems = newNode.items.filter(item => item.type !== '$ref').length -
                        newNode.options.tupleItems;
                    if (arrayListItems > newNode.options.listItems) {
                        newNode.options.listItems = arrayListItems;
                        nodeDataMap.set('listItems', arrayListItems);
                    }
                }
                if (!hasOwn(jsf.layoutRefLibrary, itemRefPointer)) {
                    jsf.layoutRefLibrary[itemRefPointer] =
                        _.cloneDeep(newNode.items[newNode.items.length - 1]);
                    if (recursive) {
                        jsf.layoutRefLibrary[itemRefPointer].recursiveReference = true;
                    }
                    forEach(jsf.layoutRefLibrary[itemRefPointer], (item, key) => {
                        if (hasOwn(item, '_id')) {
                            item._id = null;
                        }
                        if (recursive) {
                            if (hasOwn(item, 'dataPointer')) {
                                item.dataPointer = item.dataPointer.slice(itemRefPointer.length);
                            }
                        }
                    }, 'top-down');
                }
                // Add any additional default items
                if (!newNode.recursiveReference || newNode.options.required) {
                    /** @type {?} */
                    const arrayLength = Math.min(Math.max(newNode.options.tupleItems + newNode.options.listItems, isArray(nodeValue) ? nodeValue.length : 0), newNode.options.maxItems);
                    for (let i = newNode.items.length; i < arrayLength; i++) {
                        newNode.items.push(getLayoutNode({
                            $ref: itemRefPointer,
                            dataPointer: newNode.dataPointer,
                            recursiveReference: newNode.recursiveReference,
                        }, jsf, widgetLibrary));
                    }
                }
                // If needed, add button to add items to array
                if (newNode.options.addable !== false &&
                    newNode.options.minItems < newNode.options.maxItems &&
                    (newNode.items[newNode.items.length - 1] || {}).type !== '$ref') {
                    /** @type {?} */
                    let buttonText = 'Add';
                    if (newNode.options.title) {
                        if (/^add\b/i.test(newNode.options.title)) {
                            buttonText = newNode.options.title;
                        }
                        else {
                            buttonText += ' ' + newNode.options.title;
                        }
                    }
                    else if (newNode.name && !/^\d+$/.test(newNode.name)) {
                        if (/^add\b/i.test(newNode.name)) {
                            buttonText += ' ' + fixTitle(newNode.name);
                        }
                        else {
                            buttonText = fixTitle(newNode.name);
                        }
                        // If newNode doesn't have a title, look for title of parent array item
                    }
                    else {
                        /** @type {?} */
                        const parentSchema = getFromSchema(jsf.schema, newNode.dataPointer, 'parentSchema');
                        if (hasOwn(parentSchema, 'title')) {
                            buttonText += ' to ' + parentSchema.title;
                        }
                        else {
                            /** @type {?} */
                            const pointerArray = JsonPointer.parse(newNode.dataPointer);
                            buttonText += ' to ' + fixTitle(pointerArray[pointerArray.length - 2]);
                        }
                    }
                    newNode.items.push({
                        _id: _.uniqueId(),
                        arrayItem: true,
                        arrayItemType: 'list',
                        dataPointer: newNode.dataPointer + '/-',
                        options: {
                            listItems: newNode.options.listItems,
                            maxItems: newNode.options.maxItems,
                            minItems: newNode.options.minItems,
                            removable: false,
                            title: buttonText,
                            tupleItems: newNode.options.tupleItems,
                        },
                        recursiveReference: recursive,
                        type: '$ref',
                        widget: widgetLibrary.getWidget('$ref'),
                        $ref: itemRefPointer,
                    });
                    if (isString(JsonPointer.get(newNode, '/style/add'))) {
                        newNode.items[newNode.items.length - 1].options.fieldStyle =
                            newNode.style.add;
                        delete newNode.style.add;
                        if (isEmpty(newNode.style)) {
                            delete newNode.style;
                        }
                    }
                }
            }
            else {
                newNode.arrayItem = false;
            }
        }
        else if (hasOwn(newNode, 'type') || hasOwn(newNode, 'items')) {
            /** @type {?} */
            const parentType = JsonPointer.get(jsf.layout, layoutPointer, 0, -2).type;
            if (!hasOwn(newNode, 'type')) {
                newNode.type =
                    inArray(parentType, ['tabs', 'tabarray']) ? 'tab' : 'array';
            }
            newNode.arrayItem = parentType === 'array';
            newNode.widget = widgetLibrary.getWidget(newNode.type);
            updateInputOptions(newNode, {}, jsf);
        }
        if (newNode.type === 'submit') {
            hasSubmitButton = true;
        }
        return newNode;
    });
    if (jsf.hasRootReference) {
        /** @type {?} */
        const fullLayout = _.cloneDeep(formLayout);
        if (fullLayout[fullLayout.length - 1].type === 'submit') {
            fullLayout.pop();
        }
        jsf.layoutRefLibrary[''] = {
            _id: null,
            dataPointer: '',
            dataType: 'object',
            items: fullLayout,
            name: '',
            options: _.cloneDeep(jsf.formOptions.defautWidgetOptions),
            recursiveReference: true,
            required: false,
            type: 'section',
            widget: widgetLibrary.getWidget('section'),
        };
    }
    if (!hasSubmitButton) {
        formLayout.push({
            _id: _.uniqueId(),
            options: { title: 'Submit' },
            type: 'submit',
            widget: widgetLibrary.getWidget('submit'),
        });
    }
    return formLayout;
}
/**
 * 'buildLayoutFromSchema' function
 *
 * //   jsf -
 * //   widgetLibrary -
 * //   nodeValue -
 * //  { string = '' } schemaPointer -
 * //  { string = '' } dataPointer -
 * //  { boolean = false } arrayItem -
 * //  { string = null } arrayItemType -
 * //  { boolean = null } removable -
 * //  { boolean = false } forRefLibrary -
 * //  { string = '' } dataPointerPrefix -
 * //
 * @param {?} jsf
 * @param {?} widgetLibrary
 * @param {?=} nodeValue
 * @param {?=} schemaPointer
 * @param {?=} dataPointer
 * @param {?=} arrayItem
 * @param {?=} arrayItemType
 * @param {?=} removable
 * @param {?=} forRefLibrary
 * @param {?=} dataPointerPrefix
 * @return {?}
 */
export function buildLayoutFromSchema(jsf, widgetLibrary, nodeValue = null, schemaPointer = '', dataPointer = '', arrayItem = false, arrayItemType = null, removable = null, forRefLibrary = false, dataPointerPrefix = '') {
    /** @type {?} */
    const schema = JsonPointer.get(jsf.schema, schemaPointer);
    if (!hasOwn(schema, 'type') && !hasOwn(schema, '$ref') &&
        !hasOwn(schema, 'x-schema-form')) {
        return null;
    }
    /** @type {?} */
    const newNodeType = getInputType(schema);
    if (!isDefined(nodeValue) && (jsf.formOptions.setSchemaDefaults === true ||
        (jsf.formOptions.setSchemaDefaults === 'auto' && isEmpty(jsf.formValues)))) {
        nodeValue = JsonPointer.get(jsf.schema, schemaPointer + '/default');
    }
    /** @type {?} */
    let newNode = {
        _id: forRefLibrary ? null : _.uniqueId(),
        arrayItem: arrayItem,
        dataPointer: JsonPointer.toGenericPointer(dataPointer, jsf.arrayMap),
        dataType: schema.type || (hasOwn(schema, '$ref') ? '$ref' : null),
        options: {},
        required: isInputRequired(jsf.schema, schemaPointer),
        type: newNodeType,
        widget: widgetLibrary.getWidget(newNodeType),
    };
    /** @type {?} */
    const lastDataKey = JsonPointer.toKey(newNode.dataPointer);
    if (lastDataKey !== '-') {
        newNode.name = lastDataKey;
    }
    if (newNode.arrayItem) {
        newNode.arrayItemType = arrayItemType;
        newNode.options.removable = removable !== false;
    }
    /** @type {?} */
    const shortDataPointer = removeRecursiveReferences(dataPointerPrefix + dataPointer, jsf.dataRecursiveRefMap, jsf.arrayMap);
    /** @type {?} */
    const recursive = !shortDataPointer.length ||
        shortDataPointer !== dataPointerPrefix + dataPointer;
    if (!jsf.dataMap.has(shortDataPointer)) {
        jsf.dataMap.set(shortDataPointer, new Map());
    }
    /** @type {?} */
    const nodeDataMap = jsf.dataMap.get(shortDataPointer);
    if (!nodeDataMap.has('inputType')) {
        nodeDataMap.set('schemaPointer', schemaPointer);
        nodeDataMap.set('inputType', newNode.type);
        nodeDataMap.set('widget', newNode.widget);
        nodeDataMap.set('disabled', !!newNode.options.disabled);
    }
    updateInputOptions(newNode, schema, jsf);
    if (!newNode.options.title && newNode.name && !/^\d+$/.test(newNode.name)) {
        newNode.options.title = fixTitle(newNode.name);
    }
    if (newNode.dataType === 'object') {
        if (isArray(schema.required) && !nodeDataMap.has('required')) {
            nodeDataMap.set('required', schema.required);
        }
        if (isObject(schema.properties)) {
            /** @type {?} */
            const newSection = [];
            /** @type {?} */
            const propertyKeys = schema['ui:order'] || Object.keys(schema.properties);
            if (propertyKeys.includes('*') && !hasOwn(schema.properties, '*')) {
                /** @type {?} */
                const unnamedKeys = Object.keys(schema.properties)
                    .filter(key => !propertyKeys.includes(key));
                for (let i = propertyKeys.length - 1; i >= 0; i--) {
                    if (propertyKeys[i] === '*') {
                        propertyKeys.splice(i, 1, ...unnamedKeys);
                    }
                }
            }
            propertyKeys
                .filter(key => hasOwn(schema.properties, key) ||
                hasOwn(schema, 'additionalProperties'))
                .forEach(key => {
                /** @type {?} */
                const keySchemaPointer = hasOwn(schema.properties, key) ?
                    '/properties/' + key : '/additionalProperties';
                /** @type {?} */
                const innerItem = buildLayoutFromSchema(jsf, widgetLibrary, isObject(nodeValue) ? nodeValue[key] : null, schemaPointer + keySchemaPointer, dataPointer + '/' + key, false, null, null, forRefLibrary, dataPointerPrefix);
                if (innerItem) {
                    if (isInputRequired(schema, '/' + key)) {
                        innerItem.options.required = true;
                        jsf.fieldsRequired = true;
                    }
                    newSection.push(innerItem);
                }
            });
            if (dataPointer === '' && !forRefLibrary) {
                newNode = newSection;
            }
            else {
                newNode.items = newSection;
            }
        }
        // TODO: Add patternProperties and additionalProperties inputs?
        // ... possibly provide a way to enter both key names and values?
        // if (isObject(schema.patternProperties)) { }
        // if (isObject(schema.additionalProperties)) { }
    }
    else if (newNode.dataType === 'array') {
        newNode.items = [];
        /** @type {?} */
        let templateArray = [];
        newNode.options.maxItems = Math.min(schema.maxItems || 1000, newNode.options.maxItems || 1000);
        newNode.options.minItems = Math.max(schema.minItems || 0, newNode.options.minItems || 0);
        if (!newNode.options.minItems && isInputRequired(jsf.schema, schemaPointer)) {
            newNode.options.minItems = 1;
        }
        if (!hasOwn(newNode.options, 'listItems')) {
            newNode.options.listItems = 1;
        }
        newNode.options.tupleItems = isArray(schema.items) ? schema.items.length : 0;
        if (newNode.options.maxItems <= newNode.options.tupleItems) {
            newNode.options.tupleItems = newNode.options.maxItems;
            newNode.options.listItems = 0;
        }
        else if (newNode.options.maxItems <
            newNode.options.tupleItems + newNode.options.listItems) {
            newNode.options.listItems = newNode.options.maxItems - newNode.options.tupleItems;
        }
        else if (newNode.options.minItems >
            newNode.options.tupleItems + newNode.options.listItems) {
            newNode.options.listItems = newNode.options.minItems - newNode.options.tupleItems;
        }
        if (!nodeDataMap.has('maxItems')) {
            nodeDataMap.set('maxItems', newNode.options.maxItems);
            nodeDataMap.set('minItems', newNode.options.minItems);
            nodeDataMap.set('tupleItems', newNode.options.tupleItems);
            nodeDataMap.set('listItems', newNode.options.listItems);
        }
        if (!jsf.arrayMap.has(shortDataPointer)) {
            jsf.arrayMap.set(shortDataPointer, newNode.options.tupleItems);
        }
        removable = newNode.options.removable !== false;
        /** @type {?} */
        let additionalItemsSchemaPointer = null;
        // If 'items' is an array = tuple items
        if (isArray(schema.items)) {
            newNode.items = [];
            for (let i = 0; i < newNode.options.tupleItems; i++) {
                /** @type {?} */
                let newItem;
                /** @type {?} */
                const itemRefPointer = removeRecursiveReferences(shortDataPointer + '/' + i, jsf.dataRecursiveRefMap, jsf.arrayMap);
                /** @type {?} */
                const itemRecursive = !itemRefPointer.length ||
                    itemRefPointer !== shortDataPointer + '/' + i;
                // If removable, add tuple item layout to layoutRefLibrary
                if (removable && i >= newNode.options.minItems) {
                    if (!hasOwn(jsf.layoutRefLibrary, itemRefPointer)) {
                        // Set to null first to prevent recursive reference from causing endless loop
                        jsf.layoutRefLibrary[itemRefPointer] = null;
                        jsf.layoutRefLibrary[itemRefPointer] = buildLayoutFromSchema(jsf, widgetLibrary, isArray(nodeValue) ? nodeValue[i] : null, schemaPointer + '/items/' + i, itemRecursive ? '' : dataPointer + '/' + i, true, 'tuple', true, true, itemRecursive ? dataPointer + '/' + i : '');
                        if (itemRecursive) {
                            jsf.layoutRefLibrary[itemRefPointer].recursiveReference = true;
                        }
                    }
                    newItem = getLayoutNode({
                        $ref: itemRefPointer,
                        dataPointer: dataPointer + '/' + i,
                        recursiveReference: itemRecursive,
                    }, jsf, widgetLibrary, isArray(nodeValue) ? nodeValue[i] : null);
                }
                else {
                    newItem = buildLayoutFromSchema(jsf, widgetLibrary, isArray(nodeValue) ? nodeValue[i] : null, schemaPointer + '/items/' + i, dataPointer + '/' + i, true, 'tuple', false, forRefLibrary, dataPointerPrefix);
                }
                if (newItem) {
                    newNode.items.push(newItem);
                }
            }
            // If 'additionalItems' is an object = additional list items, after tuple items
            if (isObject(schema.additionalItems)) {
                additionalItemsSchemaPointer = schemaPointer + '/additionalItems';
            }
            // If 'items' is an object = list items only (no tuple items)
        }
        else if (isObject(schema.items)) {
            additionalItemsSchemaPointer = schemaPointer + '/items';
        }
        if (additionalItemsSchemaPointer) {
            /** @type {?} */
            const itemRefPointer = removeRecursiveReferences(shortDataPointer + '/-', jsf.dataRecursiveRefMap, jsf.arrayMap);
            /** @type {?} */
            const itemRecursive = !itemRefPointer.length ||
                itemRefPointer !== shortDataPointer + '/-';
            /** @type {?} */
            const itemSchemaPointer = removeRecursiveReferences(additionalItemsSchemaPointer, jsf.schemaRecursiveRefMap, jsf.arrayMap);
            // Add list item layout to layoutRefLibrary
            if (itemRefPointer.length && !hasOwn(jsf.layoutRefLibrary, itemRefPointer)) {
                // Set to null first to prevent recursive reference from causing endless loop
                jsf.layoutRefLibrary[itemRefPointer] = null;
                jsf.layoutRefLibrary[itemRefPointer] = buildLayoutFromSchema(jsf, widgetLibrary, null, itemSchemaPointer, itemRecursive ? '' : dataPointer + '/-', true, 'list', removable, true, itemRecursive ? dataPointer + '/-' : '');
                if (itemRecursive) {
                    jsf.layoutRefLibrary[itemRefPointer].recursiveReference = true;
                }
            }
            // Add any additional default items
            if (!itemRecursive || newNode.options.required) {
                /** @type {?} */
                const arrayLength = Math.min(Math.max(itemRecursive ? 0 :
                    newNode.options.tupleItems + newNode.options.listItems, isArray(nodeValue) ? nodeValue.length : 0), newNode.options.maxItems);
                if (newNode.items.length < arrayLength) {
                    for (let i = newNode.items.length; i < arrayLength; i++) {
                        newNode.items.push(getLayoutNode({
                            $ref: itemRefPointer,
                            dataPointer: dataPointer + '/-',
                            recursiveReference: itemRecursive,
                        }, jsf, widgetLibrary, isArray(nodeValue) ? nodeValue[i] : null));
                    }
                }
            }
            // If needed, add button to add items to array
            if (newNode.options.addable !== false &&
                newNode.options.minItems < newNode.options.maxItems &&
                (newNode.items[newNode.items.length - 1] || {}).type !== '$ref') {
                /** @type {?} */
                let buttonText = ((jsf.layoutRefLibrary[itemRefPointer] || {}).options || {}).title;
                /** @type {?} */
                const prefix = buttonText ? 'Add ' : 'Add to ';
                if (!buttonText) {
                    buttonText = schema.title || fixTitle(JsonPointer.toKey(dataPointer));
                }
                if (!/^add\b/i.test(buttonText)) {
                    buttonText = prefix + buttonText;
                }
                newNode.items.push({
                    _id: _.uniqueId(),
                    arrayItem: true,
                    arrayItemType: 'list',
                    dataPointer: newNode.dataPointer + '/-',
                    options: {
                        listItems: newNode.options.listItems,
                        maxItems: newNode.options.maxItems,
                        minItems: newNode.options.minItems,
                        removable: false,
                        title: buttonText,
                        tupleItems: newNode.options.tupleItems,
                    },
                    recursiveReference: itemRecursive,
                    type: '$ref',
                    widget: widgetLibrary.getWidget('$ref'),
                    $ref: itemRefPointer,
                });
            }
        }
    }
    else if (newNode.dataType === '$ref') {
        /** @type {?} */
        const schemaRef = JsonPointer.compile(schema.$ref);
        /** @type {?} */
        const dataRef = JsonPointer.toDataPointer(schemaRef, jsf.schema);
        /** @type {?} */
        let buttonText = '';
        // Get newNode title
        if (newNode.options.add) {
            buttonText = newNode.options.add;
        }
        else if (newNode.name && !/^\d+$/.test(newNode.name)) {
            buttonText =
                (/^add\b/i.test(newNode.name) ? '' : 'Add ') + fixTitle(newNode.name);
            // If newNode doesn't have a title, look for title of parent array item
        }
        else {
            /** @type {?} */
            const parentSchema = JsonPointer.get(jsf.schema, schemaPointer, 0, -1);
            if (hasOwn(parentSchema, 'title')) {
                buttonText = 'Add to ' + parentSchema.title;
            }
            else {
                /** @type {?} */
                const pointerArray = JsonPointer.parse(newNode.dataPointer);
                buttonText = 'Add to ' + fixTitle(pointerArray[pointerArray.length - 2]);
            }
        }
        Object.assign(newNode, {
            recursiveReference: true,
            widget: widgetLibrary.getWidget('$ref'),
            $ref: dataRef,
        });
        Object.assign(newNode.options, {
            removable: false,
            title: buttonText,
        });
        if (isNumber(JsonPointer.get(jsf.schema, schemaPointer, 0, -1).maxItems)) {
            newNode.options.maxItems =
                JsonPointer.get(jsf.schema, schemaPointer, 0, -1).maxItems;
        }
        // Add layout template to layoutRefLibrary
        if (dataRef.length) {
            if (!hasOwn(jsf.layoutRefLibrary, dataRef)) {
                // Set to null first to prevent recursive reference from causing endless loop
                jsf.layoutRefLibrary[dataRef] = null;
                /** @type {?} */
                const newLayout = buildLayoutFromSchema(jsf, widgetLibrary, null, schemaRef, '', newNode.arrayItem, newNode.arrayItemType, true, true, dataPointer);
                if (newLayout) {
                    newLayout.recursiveReference = true;
                    jsf.layoutRefLibrary[dataRef] = newLayout;
                }
                else {
                    delete jsf.layoutRefLibrary[dataRef];
                }
            }
            else if (!jsf.layoutRefLibrary[dataRef].recursiveReference) {
                jsf.layoutRefLibrary[dataRef].recursiveReference = true;
            }
        }
    }
    return newNode;
}
/**
 * 'mapLayout' function
 *
 * Creates a new layout by running each element in an existing layout through
 * an iteratee. Recursively maps within array elements 'items' and 'tabs'.
 * The iteratee is invoked with four arguments: (value, index, layout, path)
 *
 * The returned layout may be longer (or shorter) then the source layout.
 *
 * If an item from the source layout returns multiple items (as '*' usually will),
 * this function will keep all returned items in-line with the surrounding items.
 *
 * If an item from the source layout causes an error and returns null, it is
 * skipped without error, and the function will still return all non-null items.
 *
 * //   layout - the layout to map
 * //  { (v: any, i?: number, l?: any, p?: string) => any }
 *   function - the funciton to invoke on each element
 * //  { string|string[] = '' } layoutPointer - the layoutPointer to layout, inside rootLayout
 * //  { any[] = layout } rootLayout - the root layout, which conatins layout
 * //
 * @param {?} layout
 * @param {?} fn
 * @param {?=} layoutPointer
 * @param {?=} rootLayout
 * @return {?}
 */
export function mapLayout(layout, fn, layoutPointer = '', rootLayout = layout) {
    /** @type {?} */
    let indexPad = 0;
    /** @type {?} */
    let newLayout = [];
    forEach(layout, (item, index) => {
        /** @type {?} */
        let realIndex = +index + indexPad;
        /** @type {?} */
        let newLayoutPointer = layoutPointer + '/' + realIndex;
        /** @type {?} */
        let newNode = copy(item);
        /** @type {?} */
        let itemsArray = [];
        if (isObject(item)) {
            if (hasOwn(item, 'tabs')) {
                item.items = item.tabs;
                delete item.tabs;
            }
            if (hasOwn(item, 'items')) {
                itemsArray = isArray(item.items) ? item.items : [item.items];
            }
        }
        if (itemsArray.length) {
            newNode.items = mapLayout(itemsArray, fn, newLayoutPointer + '/items', rootLayout);
        }
        newNode = fn(newNode, realIndex, newLayoutPointer, rootLayout);
        if (!isDefined(newNode)) {
            indexPad--;
        }
        else {
            if (isArray(newNode)) {
                indexPad += newNode.length - 1;
            }
            newLayout = newLayout.concat(newNode);
        }
    });
    return newLayout;
}
;
/**
 * 'getLayoutNode' function
 * Copy a new layoutNode from layoutRefLibrary
 *
 * //   refNode -
 * //   layoutRefLibrary -
 * //  { any = null } widgetLibrary -
 * //  { any = null } nodeValue -
 * //  copied layoutNode
 * @param {?} refNode
 * @param {?} jsf
 * @param {?=} widgetLibrary
 * @param {?=} nodeValue
 * @return {?}
 */
export function getLayoutNode(refNode, jsf, widgetLibrary = null, nodeValue = null) {
    // If recursive reference and building initial layout, return Add button
    if (refNode.recursiveReference && widgetLibrary) {
        /** @type {?} */
        const newLayoutNode = _.cloneDeep(refNode);
        if (!newLayoutNode.options) {
            newLayoutNode.options = {};
        }
        Object.assign(newLayoutNode, {
            recursiveReference: true,
            widget: widgetLibrary.getWidget('$ref'),
        });
        Object.assign(newLayoutNode.options, {
            removable: false,
            title: 'Add ' + newLayoutNode.$ref,
        });
        return newLayoutNode;
        // Otherwise, return referenced layout
    }
    else {
        /** @type {?} */
        let newLayoutNode = jsf.layoutRefLibrary[refNode.$ref];
        // If value defined, build new node from schema (to set array lengths)
        if (isDefined(nodeValue)) {
            newLayoutNode = buildLayoutFromSchema(jsf, widgetLibrary, nodeValue, JsonPointer.toSchemaPointer(refNode.$ref, jsf.schema), refNode.$ref, newLayoutNode.arrayItem, newLayoutNode.arrayItemType, newLayoutNode.options.removable, false);
        }
        else {
            // If value not defined, copy node from layoutRefLibrary
            newLayoutNode = _.cloneDeep(newLayoutNode);
            JsonPointer.forEachDeep(newLayoutNode, (subNode, pointer) => {
                // Reset all _id's in newLayoutNode to unique values
                if (hasOwn(subNode, '_id')) {
                    subNode._id = _.uniqueId();
                }
                // If adding a recursive item, prefix current dataPointer
                // to all dataPointers in new layoutNode
                if (refNode.recursiveReference && hasOwn(subNode, 'dataPointer')) {
                    subNode.dataPointer = refNode.dataPointer + subNode.dataPointer;
                }
            });
        }
        return newLayoutNode;
    }
}
/**
 * 'buildTitleMap' function
 *
 * //   titleMap -
 * //   enumList -
 * //  { boolean = true } fieldRequired -
 * //  { boolean = true } flatList -
 * // { TitleMapItem[] }
 * @param {?} titleMap
 * @param {?} enumList
 * @param {?=} fieldRequired
 * @param {?=} flatList
 * @return {?}
 */
export function buildTitleMap(titleMap, enumList, fieldRequired = true, flatList = true) {
    /** @type {?} */
    let newTitleMap = [];
    /** @type {?} */
    let hasEmptyValue = false;
    if (titleMap) {
        if (isArray(titleMap)) {
            if (enumList) {
                for (let i of Object.keys(titleMap)) {
                    if (isObject(titleMap[i])) {
                        /** @type {?} */
                        const value = titleMap[i].value;
                        if (enumList.includes(value)) {
                            /** @type {?} */
                            const name = titleMap[i].name;
                            newTitleMap.push({ name, value });
                            if (value === undefined || value === null) {
                                hasEmptyValue = true;
                            }
                        }
                    }
                    else if (isString(titleMap[i])) {
                        // React Jsonschema Form style
                        if (i < enumList.length) {
                            /** @type {?} */
                            const name = titleMap[i];
                            /** @type {?} */
                            const value = enumList[i];
                            newTitleMap.push({ name, value });
                            if (value === undefined || value === null) {
                                hasEmptyValue = true;
                            }
                        }
                    }
                }
            }
            else {
                // If array titleMap and no enum list, just return the titleMap - Angular Schema Form style
                newTitleMap = titleMap;
                if (!fieldRequired) {
                    hasEmptyValue = !!newTitleMap
                        .filter(i => i.value === undefined || i.value === null)
                        .length;
                }
            }
        }
        else if (enumList) {
            // Alternate JSON Form style, with enum list
            for (let i of Object.keys(enumList)) {
                /** @type {?} */
                let value = enumList[i];
                if (hasOwn(titleMap, value)) {
                    /** @type {?} */
                    let name = titleMap[value];
                    newTitleMap.push({ name, value });
                    if (value === undefined || value === null) {
                        hasEmptyValue = true;
                    }
                }
            }
        }
        else {
            // Alternate JSON Form style, without enum list
            for (let value of Object.keys(titleMap)) {
                /** @type {?} */
                let name = titleMap[value];
                newTitleMap.push({ name, value });
                if (value === undefined || value === null) {
                    hasEmptyValue = true;
                }
            }
        }
    }
    else if (enumList) {
        // Build map from enum list alone
        for (let i of Object.keys(enumList)) {
            /** @type {?} */
            let name = enumList[i];
            /** @type {?} */
            let value = enumList[i];
            newTitleMap.push({ name, value });
            if (value === undefined || value === null) {
                hasEmptyValue = true;
            }
        }
    }
    else {
        // If no titleMap and no enum list, return default map of boolean values
        newTitleMap = [{ name: 'True', value: true }, { name: 'False', value: false }];
    }
    // Does titleMap have groups?
    if (newTitleMap.some(title => hasOwn(title, 'group'))) {
        hasEmptyValue = false;
        // If flatList = true, flatten items & update name to group: name
        if (flatList) {
            newTitleMap = newTitleMap.reduce((groupTitleMap, title) => {
                if (hasOwn(title, 'group')) {
                    if (isArray(title.items)) {
                        groupTitleMap = [
                            ...groupTitleMap,
                            ...title.items.map(item => (Object.assign({}, item, { name: `${title.group}: ${item.name}` })))
                        ];
                        if (title.items.some(item => item.value === undefined || item.value === null)) {
                            hasEmptyValue = true;
                        }
                    }
                    if (hasOwn(title, 'name') && hasOwn(title, 'value')) {
                        title.name = `${title.group}: ${title.name}`;
                        delete title.group;
                        groupTitleMap.push(title);
                        if (title.value === undefined || title.value === null) {
                            hasEmptyValue = true;
                        }
                    }
                }
                else {
                    groupTitleMap.push(title);
                    if (title.value === undefined || title.value === null) {
                        hasEmptyValue = true;
                    }
                }
                return groupTitleMap;
            }, []);
            // If flatList = false, combine items from matching groups
        }
        else {
            newTitleMap = newTitleMap.reduce((groupTitleMap, title) => {
                if (hasOwn(title, 'group')) {
                    if (title.group !== (groupTitleMap[groupTitleMap.length - 1] || {}).group) {
                        groupTitleMap.push({ group: title.group, items: title.items || [] });
                    }
                    if (hasOwn(title, 'name') && hasOwn(title, 'value')) {
                        groupTitleMap[groupTitleMap.length - 1].items
                            .push({ name: title.name, value: title.value });
                        if (title.value === undefined || title.value === null) {
                            hasEmptyValue = true;
                        }
                    }
                }
                else {
                    groupTitleMap.push(title);
                    if (title.value === undefined || title.value === null) {
                        hasEmptyValue = true;
                    }
                }
                return groupTitleMap;
            }, []);
        }
    }
    if (!fieldRequired && !hasEmptyValue) {
        newTitleMap.unshift({ name: '<em>None</em>', value: null });
    }
    return newTitleMap;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5b3V0LmZ1bmN0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nNi1qc29uLXNjaGVtYS1mb3JtLyIsInNvdXJjZXMiOlsibGliL3NoYXJlZC9sYXlvdXQuZnVuY3Rpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFFQSxPQUFPLEtBQUssQ0FBQyxNQUFNLFFBQVEsQ0FBQztBQUc1QixPQUFPLEVBQ0wsT0FBTyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUNuRSxNQUFNLHVCQUF1QixDQUFDO0FBQy9CLE9BQU8sRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN0RSxPQUFPLEVBQVcsV0FBVyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDL0QsT0FBTyxFQUNMLGFBQWEsRUFBRSxZQUFZLEVBQWdCLGVBQWUsRUFBRSxlQUFlLEVBQzNFLHlCQUF5QixFQUFFLGtCQUFrQixFQUM5QyxNQUFNLHlCQUF5QixDQUFDOzs7Ozs7Ozs7OztBQXdCakMsTUFBTSxzQkFBc0IsR0FBRyxFQUFFLGFBQWE7O0lBQzVDLElBQUksZUFBZSxHQUFHLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsd0JBQXdCLENBQUMsQ0FBQzs7SUFDdEUsTUFBTSxVQUFVLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxVQUFVLEVBQUUsS0FBSyxFQUFFLGFBQWEsRUFBRSxFQUFFOztRQUM1RSxJQUFJLFlBQVksR0FBRyxLQUFLLENBQUM7O1FBQ3pCLElBQUksT0FBTyxHQUFRO1lBQ2pCLEdBQUcsRUFBRSxDQUFDLENBQUMsUUFBUSxFQUFFO1lBQ2pCLE9BQU8sRUFBRSxFQUFFO1NBQ1osQ0FBQztRQUNGLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDekIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLENBQUM7WUFDbkMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7aUJBQ2pCLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRTtnQkFDakMsS0FBSyxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsZUFBZSxFQUFFLGFBQWEsRUFBRSxVQUFVO2dCQUN0RSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxFQUFFLFFBQVE7YUFDMUUsQ0FBQyxDQUFDO2lCQUNGLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRTtnQkFDaEIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQzFDLE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQ3hCLENBQUMsQ0FBQztZQUNMLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsSUFBSSxRQUFRLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDekQsT0FBTyxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDO2dCQUM5QixPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUM7YUFDdkI7WUFDRCxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdEMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN0QyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQztvQkFDL0MsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQztpQkFDL0I7YUFDRjtZQUNELEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ25ELEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDN0MsT0FBTyxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQztvQkFDbkUsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQzs7OztpQkFLdEM7Z0JBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN4RCxFQUFFLENBQUMsQ0FBQyxPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsaUJBQWlCLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQzt3QkFDMUQsT0FBTyxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDO3FCQUN4RTtvQkFBQyxJQUFJLENBQUMsQ0FBQzt3QkFDTixPQUFPLENBQUMsT0FBTyxDQUFDLGtCQUFrQixHQUFHLEVBQUUsQ0FBQzt3QkFDeEMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFOzs0QkFDM0QsTUFBTSxJQUFJLEdBQUcsR0FBRyxHQUFHLEVBQUUsQ0FBQzs7NEJBQ3RCLE1BQU0sTUFBTSxHQUNWLElBQUksS0FBTSxHQUFHLENBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dDQUN6QixJQUFJLEtBQU0sR0FBRyxDQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztvQ0FDekIsSUFBSSxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUM7d0NBQy9CLElBQUksS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDOzRDQUM1QixJQUFJLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO2dEQUNyQyxJQUFJLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQztvREFDNUIsSUFBSSxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUMsa0JBQWtCLENBQUMsQ0FBQzt3REFDckMsSUFBSSxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUM7NERBQzlCLElBQUksS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dFQUM5QixJQUFJLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQztvRUFDNUIsSUFBSSxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUM7d0VBQ2xDLElBQUksS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDOzRFQUNsQyxJQUFJLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQztnRkFDN0IsSUFBSSxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUM7b0ZBQ2pDLElBQUksS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDO3dGQUM3QixJQUFJLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQzs0RkFDN0IsSUFBSSxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUM7Z0dBQ2hDLElBQUksS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQzs0QkFDeEMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxDQUFDO3lCQUNyRixDQUFDLENBQUM7cUJBQ0o7b0JBQ0QsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDO2lCQUMxQzthQUNGO1NBQ0Y7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDakQsT0FBTyxDQUFDLFdBQVcsR0FBRyxVQUFVLENBQUM7U0FDbEM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNoQyxPQUFPLENBQUMsR0FBRyxHQUFHLFVBQVUsQ0FBQztTQUMxQjtRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sT0FBTyxDQUFDLEtBQUssQ0FBQyx3REFBd0QsQ0FBQyxDQUFDO1lBQ3hFLE9BQU8sQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDMUIsTUFBTSxDQUFDLElBQUksQ0FBQztTQUNiOztRQUNELElBQUksVUFBVSxHQUFRLElBQUksQ0FBQzs7UUFHM0IsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7WUFHcEMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzNCLE9BQU8sQ0FBQyxXQUFXLEdBQUcsT0FBTyxDQUFDLEdBQUcsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDdkQsV0FBVyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztnQkFDckUsT0FBTyxPQUFPLENBQUMsR0FBRyxDQUFDOzthQUdwQjtZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssT0FBTyxDQUFDLENBQUMsQ0FBQzs7Z0JBQ3pFLE1BQU0sZUFBZSxHQUFHLENBQUMsS0FBSyxFQUFFLEVBQUU7b0JBQ2hDLEVBQUUsQ0FBQyxDQUFDLEtBQUssS0FBSyxJQUFJLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQzt3QkFBQyxNQUFNLENBQUM7cUJBQUU7b0JBQzVELEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDO3FCQUFFO29CQUMvRCxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDekIsR0FBRyxDQUFDLENBQUMsSUFBSSxJQUFJLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7NEJBQzdCLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsYUFBYSxDQUFDLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dDQUN6RSxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQzs2QkFDekI7NEJBQ0QsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7O2dDQUMxQixNQUFNLFVBQVUsR0FBRyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7Z0NBQ3pDLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7b0NBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQztpQ0FBRTs2QkFDdkM7eUJBQ0Y7cUJBQ0Y7aUJBQ0YsQ0FBQzs7Z0JBQ0YsTUFBTSxnQkFBZ0IsR0FBRyxlQUFlLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ2xELEVBQUUsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztvQkFDckIsT0FBTyxDQUFDLFdBQVc7d0JBQ2pCLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7aUJBQ2pFO2FBQ0Y7U0FDRjtRQUVELEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ25DLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDaEMsTUFBTSxDQUFDLHFCQUFxQixDQUFDLEdBQUcsRUFBRSxhQUFhLEVBQUUsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQ2xFOztZQUNELE1BQU0sU0FBUyxHQUNiLFdBQVcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQzs7OztZQU03RSxPQUFPLENBQUMsV0FBVztnQkFDakIsV0FBVyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDOztZQUNsRSxNQUFNLE9BQU8sR0FBRyxXQUFXLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUN2RCxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUksUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLE9BQU8sS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUMxRCxPQUFPLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQzthQUN4Qjs7WUFDRCxNQUFNLGdCQUFnQixHQUFHLHlCQUF5QixDQUNoRCxPQUFPLENBQUMsV0FBVyxFQUFFLEdBQUcsQ0FBQyxtQkFBbUIsRUFBRSxHQUFHLENBQUMsUUFBUSxDQUMzRCxDQUFDOztZQUNGLE1BQU0sU0FBUyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsTUFBTTtnQkFDeEMsZ0JBQWdCLEtBQUssT0FBTyxDQUFDLFdBQVcsQ0FBQzs7WUFDM0MsSUFBSSxhQUFhLENBQVM7WUFDMUIsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdkMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEVBQUUsSUFBSSxHQUFHLEVBQUUsQ0FBQyxDQUFDO2FBQzlDOztZQUNELE1BQU0sV0FBVyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFDdEQsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3JDLGFBQWEsR0FBRyxXQUFXLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDO2FBQ2xEO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sYUFBYSxHQUFHLFdBQVcsQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLEVBQUUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUMxRSxXQUFXLENBQUMsR0FBRyxDQUFDLGVBQWUsRUFBRSxhQUFhLENBQUMsQ0FBQzthQUNqRDtZQUNELFdBQVcsQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3hELFVBQVUsR0FBRyxXQUFXLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsYUFBYSxDQUFDLENBQUM7WUFDeEQsRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztnQkFDZixFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUM3QixPQUFPLENBQUMsSUFBSSxHQUFHLFlBQVksQ0FBQyxVQUFVLEVBQUUsT0FBTyxDQUFDLENBQUM7aUJBQ2xEO2dCQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzs7b0JBQ2xELE1BQU0sYUFBYSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUM7b0JBQ25DLE9BQU8sQ0FBQyxJQUFJLEdBQUcsWUFBWSxDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUMsQ0FBQztvQkFDakQsT0FBTyxDQUFDLEtBQUssQ0FBQyx1QkFBdUIsYUFBYSxJQUFJO3dCQUNwRCx5Q0FBeUMsT0FBTyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUM7aUJBQzlEO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUNOLE9BQU8sQ0FBQyxJQUFJLEdBQUcsZUFBZSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsVUFBVSxFQUFFLE9BQU8sQ0FBQyxDQUFDO2lCQUNuRTtnQkFDRCxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsSUFBSSxLQUFLLFFBQVEsSUFBSSxPQUFPLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDakUsV0FBVyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2lCQUNsRDtnQkFDRCxPQUFPLENBQUMsUUFBUTtvQkFDZCxVQUFVLENBQUMsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDbEUsa0JBQWtCLENBQUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxHQUFHLENBQUMsQ0FBQzs7Z0JBRzdDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEtBQUssWUFBWSxJQUFJLE1BQU0sQ0FBQyxVQUFVLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNqRSxrQkFBa0IsQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQztpQkFDcEQ7Z0JBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEtBQUssT0FBTyxDQUFDLENBQUMsQ0FBQztvQkFDeEMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FDakMsVUFBVSxDQUFDLFFBQVEsSUFBSSxJQUFJLEVBQUUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxRQUFRLElBQUksSUFBSSxDQUM5RCxDQUFDO29CQUNGLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQ2pDLFVBQVUsQ0FBQyxRQUFRLElBQUksQ0FBQyxFQUFFLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUSxJQUFJLENBQUMsQ0FDeEQsQ0FBQztvQkFDRixPQUFPLENBQUMsT0FBTyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUNsQyxPQUFPLENBQUMsT0FBTyxDQUFDLFNBQVMsSUFBSSxDQUFDLEVBQUUsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQzFFLENBQUM7b0JBQ0YsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFVO3dCQUN4QixPQUFPLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUMxRCxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7d0JBQzFELE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDO3dCQUN0RCxPQUFPLENBQUMsT0FBTyxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7cUJBQy9CO29CQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVE7d0JBQ2pDLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsU0FDL0MsQ0FBQyxDQUFDLENBQUM7d0JBQ0QsT0FBTyxDQUFDLE9BQU8sQ0FBQyxTQUFTOzRCQUN2QixPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQztxQkFDekQ7b0JBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUTt3QkFDakMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFVLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxTQUMvQyxDQUFDLENBQUMsQ0FBQzt3QkFDRCxPQUFPLENBQUMsT0FBTyxDQUFDLFNBQVM7NEJBQ3ZCLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDO3FCQUN6RDtvQkFDRCxFQUFFLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNqQyxXQUFXLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO3dCQUN0RCxXQUFXLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO3dCQUN0RCxXQUFXLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO3dCQUMxRCxXQUFXLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO3FCQUN6RDtvQkFDRCxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUN4QyxHQUFHLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFBO3FCQUMvRDtpQkFDRjtnQkFDRCxFQUFFLENBQUMsQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQy9DLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztvQkFDaEMsR0FBRyxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7aUJBQzNCO2FBQ0Y7WUFBQyxJQUFJLENBQUMsQ0FBQzs7Z0JBRU4sa0JBQWtCLENBQUMsT0FBTyxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQzthQUN0QztZQUVELEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzFELE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDaEQ7WUFFRCxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzNDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztvQkFDcEQsT0FBTyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO2lCQUM3RDtnQkFDRCxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3pDLE9BQU8sQ0FBQyxPQUFPLENBQUMsV0FBVyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUNuRSxXQUFXLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQzVELENBQUM7aUJBQ0g7YUFDRjtZQUVELE9BQU8sQ0FBQyxNQUFNLEdBQUcsYUFBYSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdkQsV0FBVyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzNDLFdBQVcsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUUxQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxLQUFLLE9BQU87Z0JBQzlCLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxFQUFFLGlCQUFpQixDQUFDLENBQ2pFLENBQUMsQ0FBQyxDQUFDOztnQkFDRCxJQUFJLGNBQWMsR0FBRyx5QkFBeUIsQ0FDNUMsT0FBTyxDQUFDLFdBQVcsR0FBRyxJQUFJLEVBQUUsR0FBRyxDQUFDLG1CQUFtQixFQUFFLEdBQUcsQ0FBQyxRQUFRLENBQ2xFLENBQUM7Z0JBQ0YsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3JDLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRSxJQUFJLEdBQUcsRUFBRSxDQUFDLENBQUM7aUJBQzVDO2dCQUNELEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsU0FBUyxDQUFDLENBQUM7O2dCQUc1RCxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDOztvQkFDN0IsSUFBSSxjQUFjLEdBQUcsRUFBRSxDQUFDOztvQkFDeEIsSUFBSSxzQkFBc0IsR0FBRyxFQUFFLENBQUM7O29CQUNoQyxJQUFJLFFBQVEsR0FBRyxDQUFDLENBQUM7b0JBQ2pCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7O3dCQUNuRCxJQUFJLE9BQU8sR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUMvQixFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLGFBQWEsQ0FBQzs0QkFDaEMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLGNBQWMsQ0FBQyxNQUFNLENBQUMsS0FBSyxjQUMxRCxDQUFDLENBQUMsQ0FBQzs7NEJBQ0QsSUFBSSxTQUFTLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUM5QyxTQUFTLENBQUMsV0FBVyxHQUFHLE9BQU8sQ0FBQyxXQUFXLEdBQUcsSUFBSTtnQ0FDaEQsU0FBUyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDOzRCQUNyRCxjQUFjLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDOzRCQUNsQyxRQUFRLEVBQUUsQ0FBQzt5QkFDWjt3QkFBQyxJQUFJLENBQUMsQ0FBQzs0QkFDTixPQUFPLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQzs7NEJBRXpCLE9BQU8sQ0FBQyxhQUFhLEdBQUcsTUFBTSxDQUFDOzRCQUMvQixPQUFPLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsU0FBUyxLQUFLLEtBQUssQ0FBQzt5QkFDekQ7cUJBQ0Y7b0JBQ0QsRUFBRSxDQUFDLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7d0JBQzFCLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDOzRCQUNqQixHQUFHLEVBQUUsQ0FBQyxDQUFDLFFBQVEsRUFBRTs0QkFDakIsU0FBUyxFQUFFLElBQUk7NEJBQ2YsYUFBYSxFQUFFLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7Z0NBQ2hFLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTTs0QkFDbEIsS0FBSyxFQUFFLGNBQWM7NEJBQ3JCLE9BQU8sRUFBRSxFQUFFLFNBQVMsRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLFNBQVMsS0FBSyxLQUFLLEdBQUc7NEJBQzVELFdBQVcsRUFBRSxPQUFPLENBQUMsV0FBVyxHQUFHLElBQUk7NEJBQ3ZDLElBQUksRUFBRSxTQUFTOzRCQUNmLE1BQU0sRUFBRSxhQUFhLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQzt5QkFDM0MsQ0FBQyxDQUFDO3FCQUNKO2lCQUNGO2dCQUFDLElBQUksQ0FBQyxDQUFDOztvQkFFTixPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7b0JBQ2xDLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO3dCQUNsQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVc7NEJBQzFCLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxjQUFjLEVBQUUsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO3FCQUM5RDtvQkFDRCxFQUFFLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLDRCQUE0QixDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUM1RCxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO3FCQUMzQztvQkFDRCxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFNBQVMsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDO3dCQUN4QyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO3FCQUM1QztvQkFDRCxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWE7d0JBQzVCLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztpQkFDakQ7Z0JBRUQsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7O29CQUMzQixNQUFNLGNBQWMsR0FDbEIsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLE1BQU0sQ0FBQyxDQUFDLE1BQU07d0JBQ3ZELE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDO29CQUMvQixFQUFFLENBQUMsQ0FBQyxjQUFjLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO3dCQUMvQyxPQUFPLENBQUMsT0FBTyxDQUFDLFNBQVMsR0FBRyxjQUFjLENBQUM7d0JBQzNDLFdBQVcsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLGNBQWMsQ0FBQyxDQUFDO3FCQUM5QztpQkFDRjtnQkFFRCxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEVBQUUsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNsRCxHQUFHLENBQUMsZ0JBQWdCLENBQUMsY0FBYyxDQUFDO3dCQUNsQyxDQUFDLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDdkQsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQzt3QkFDZCxHQUFHLENBQUMsZ0JBQWdCLENBQUMsY0FBYyxDQUFDLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDO3FCQUNoRTtvQkFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxFQUFFO3dCQUMxRCxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFBQyxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQzt5QkFBRTt3QkFDN0MsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQzs0QkFDZCxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQ0FDaEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7NkJBQ2xFO3lCQUNGO3FCQUNGLEVBQUUsVUFBVSxDQUFDLENBQUM7aUJBQ2hCOztnQkFHRCxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7O29CQUM1RCxNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQ25DLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUN0RCxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FDMUMsRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUM3QixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsV0FBVyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7d0JBQ3hELE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQzs0QkFDL0IsSUFBSSxFQUFFLGNBQWM7NEJBQ3BCLFdBQVcsRUFBRSxPQUFPLENBQUMsV0FBVzs0QkFDaEMsa0JBQWtCLEVBQUUsT0FBTyxDQUFDLGtCQUFrQjt5QkFDL0MsRUFBRSxHQUFHLEVBQUUsYUFBYSxDQUFDLENBQUMsQ0FBQztxQkFDekI7aUJBQ0Y7O2dCQUdELEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxLQUFLLEtBQUs7b0JBQ25DLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUTtvQkFDbkQsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUksS0FBSyxNQUMzRCxDQUFDLENBQUMsQ0FBQzs7b0JBQ0QsSUFBSSxVQUFVLEdBQUcsS0FBSyxDQUFDO29CQUN2QixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7d0JBQzFCLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQzFDLFVBQVUsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQzt5QkFDcEM7d0JBQUMsSUFBSSxDQUFDLENBQUM7NEJBQ04sVUFBVSxJQUFJLEdBQUcsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQzt5QkFDM0M7cUJBQ0Y7b0JBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ3ZELEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDakMsVUFBVSxJQUFJLEdBQUcsR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO3lCQUM1Qzt3QkFBQyxJQUFJLENBQUMsQ0FBQzs0QkFDTixVQUFVLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQzt5QkFDckM7O3FCQUdGO29CQUFDLElBQUksQ0FBQyxDQUFDOzt3QkFDTixNQUFNLFlBQVksR0FDaEIsYUFBYSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLFdBQVcsRUFBRSxjQUFjLENBQUMsQ0FBQzt3QkFDakUsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQ2xDLFVBQVUsSUFBSSxNQUFNLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQzt5QkFDM0M7d0JBQUMsSUFBSSxDQUFDLENBQUM7OzRCQUNOLE1BQU0sWUFBWSxHQUFHLFdBQVcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDOzRCQUM1RCxVQUFVLElBQUksTUFBTSxHQUFHLFFBQVEsQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO3lCQUN4RTtxQkFDRjtvQkFDRCxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQzt3QkFDakIsR0FBRyxFQUFFLENBQUMsQ0FBQyxRQUFRLEVBQUU7d0JBQ2pCLFNBQVMsRUFBRSxJQUFJO3dCQUNmLGFBQWEsRUFBRSxNQUFNO3dCQUNyQixXQUFXLEVBQUUsT0FBTyxDQUFDLFdBQVcsR0FBRyxJQUFJO3dCQUN2QyxPQUFPLEVBQUU7NEJBQ1AsU0FBUyxFQUFFLE9BQU8sQ0FBQyxPQUFPLENBQUMsU0FBUzs0QkFDcEMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUTs0QkFDbEMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUTs0QkFDbEMsU0FBUyxFQUFFLEtBQUs7NEJBQ2hCLEtBQUssRUFBRSxVQUFVOzRCQUNqQixVQUFVLEVBQUUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFVO3lCQUN2Qzt3QkFDRCxrQkFBa0IsRUFBRSxTQUFTO3dCQUM3QixJQUFJLEVBQUUsTUFBTTt3QkFDWixNQUFNLEVBQUUsYUFBYSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUM7d0JBQ3ZDLElBQUksRUFBRSxjQUFjO3FCQUNyQixDQUFDLENBQUM7b0JBQ0gsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNyRCxPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFVOzRCQUN4RCxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQzt3QkFDcEIsT0FBTyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQzt3QkFDekIsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQUMsT0FBTyxPQUFPLENBQUMsS0FBSyxDQUFDO3lCQUFFO3FCQUN0RDtpQkFDRjthQUNGO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sT0FBTyxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7YUFDM0I7U0FDRjtRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDOztZQUMvRCxNQUFNLFVBQVUsR0FDZCxXQUFXLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsYUFBYSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUN6RCxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM3QixPQUFPLENBQUMsSUFBSTtvQkFDVixPQUFPLENBQUMsVUFBVSxFQUFFLENBQUMsTUFBTSxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO2FBQy9EO1lBQ0QsT0FBTyxDQUFDLFNBQVMsR0FBRyxVQUFVLEtBQUssT0FBTyxDQUFDO1lBQzNDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsYUFBYSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdkQsa0JBQWtCLENBQUMsT0FBTyxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztTQUN0QztRQUNELEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztZQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7U0FBRTtRQUMxRCxNQUFNLENBQUMsT0FBTyxDQUFDO0tBQ2hCLENBQUMsQ0FBQztJQUNILEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7O1FBQ3pCLE1BQU0sVUFBVSxHQUFHLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDM0MsRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFBQyxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUM7U0FBRTtRQUM5RSxHQUFHLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxDQUFDLEdBQUc7WUFDekIsR0FBRyxFQUFFLElBQUk7WUFDVCxXQUFXLEVBQUUsRUFBRTtZQUNmLFFBQVEsRUFBRSxRQUFRO1lBQ2xCLEtBQUssRUFBRSxVQUFVO1lBQ2pCLElBQUksRUFBRSxFQUFFO1lBQ1IsT0FBTyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxtQkFBbUIsQ0FBQztZQUN6RCxrQkFBa0IsRUFBRSxJQUFJO1lBQ3hCLFFBQVEsRUFBRSxLQUFLO1lBQ2YsSUFBSSxFQUFFLFNBQVM7WUFDZixNQUFNLEVBQUUsYUFBYSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUM7U0FDM0MsQ0FBQztLQUNIO0lBQ0QsRUFBRSxDQUFDLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO1FBQ3JCLFVBQVUsQ0FBQyxJQUFJLENBQUM7WUFDZCxHQUFHLEVBQUUsQ0FBQyxDQUFDLFFBQVEsRUFBRTtZQUNqQixPQUFPLEVBQUUsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFO1lBQzVCLElBQUksRUFBRSxRQUFRO1lBQ2QsTUFBTSxFQUFFLGFBQWEsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDO1NBQzFDLENBQUMsQ0FBQztLQUNKO0lBQ0QsTUFBTSxDQUFDLFVBQVUsQ0FBQztDQUNuQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBaUJELE1BQU0sZ0NBQ0osR0FBRyxFQUFFLGFBQWEsRUFBRSxTQUFTLEdBQUcsSUFBSSxFQUFFLGFBQWEsR0FBRyxFQUFFLEVBQ3hELFdBQVcsR0FBRyxFQUFFLEVBQUUsU0FBUyxHQUFHLEtBQUssRUFBRSxnQkFBd0IsSUFBSSxFQUNqRSxZQUFxQixJQUFJLEVBQUUsYUFBYSxHQUFHLEtBQUssRUFBRSxpQkFBaUIsR0FBRyxFQUFFOztJQUV4RSxNQUFNLE1BQU0sR0FBRyxXQUFXLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsYUFBYSxDQUFDLENBQUM7SUFDMUQsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUM7UUFDcEQsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLGVBQWUsQ0FDakMsQ0FBQyxDQUFDLENBQUM7UUFBQyxNQUFNLENBQUMsSUFBSSxDQUFDO0tBQUU7O0lBQ2xCLE1BQU0sV0FBVyxHQUFXLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNqRCxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUMzQixHQUFHLENBQUMsV0FBVyxDQUFDLGlCQUFpQixLQUFLLElBQUk7UUFDMUMsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLGlCQUFpQixLQUFLLE1BQU0sSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQzFFLENBQUMsQ0FBQyxDQUFDO1FBQ0YsU0FBUyxHQUFHLFdBQVcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxhQUFhLEdBQUcsVUFBVSxDQUFDLENBQUM7S0FDckU7O0lBQ0QsSUFBSSxPQUFPLEdBQVE7UUFDakIsR0FBRyxFQUFFLGFBQWEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFO1FBQ3hDLFNBQVMsRUFBRSxTQUFTO1FBQ3BCLFdBQVcsRUFBRSxXQUFXLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLEdBQUcsQ0FBQyxRQUFRLENBQUM7UUFDcEUsUUFBUSxFQUFFLE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUNqRSxPQUFPLEVBQUUsRUFBRTtRQUNYLFFBQVEsRUFBRSxlQUFlLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxhQUFhLENBQUM7UUFDcEQsSUFBSSxFQUFFLFdBQVc7UUFDakIsTUFBTSxFQUFFLGFBQWEsQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDO0tBQzdDLENBQUM7O0lBQ0YsTUFBTSxXQUFXLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDM0QsRUFBRSxDQUFDLENBQUMsV0FBVyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFBQyxPQUFPLENBQUMsSUFBSSxHQUFHLFdBQVcsQ0FBQztLQUFFO0lBQ3hELEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1FBQ3RCLE9BQU8sQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO1FBQ3RDLE9BQU8sQ0FBQyxPQUFPLENBQUMsU0FBUyxHQUFHLFNBQVMsS0FBSyxLQUFLLENBQUM7S0FDakQ7O0lBQ0QsTUFBTSxnQkFBZ0IsR0FBRyx5QkFBeUIsQ0FDaEQsaUJBQWlCLEdBQUcsV0FBVyxFQUFFLEdBQUcsQ0FBQyxtQkFBbUIsRUFBRSxHQUFHLENBQUMsUUFBUSxDQUN2RSxDQUFDOztJQUNGLE1BQU0sU0FBUyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsTUFBTTtRQUN4QyxnQkFBZ0IsS0FBSyxpQkFBaUIsR0FBRyxXQUFXLENBQUM7SUFDdkQsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN2QyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLEdBQUcsRUFBRSxDQUFDLENBQUM7S0FDOUM7O0lBQ0QsTUFBTSxXQUFXLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUN0RCxFQUFFLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xDLFdBQVcsQ0FBQyxHQUFHLENBQUMsZUFBZSxFQUFFLGFBQWEsQ0FBQyxDQUFDO1FBQ2hELFdBQVcsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMzQyxXQUFXLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDMUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7S0FDekQ7SUFDRCxrQkFBa0IsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ3pDLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLElBQUksT0FBTyxDQUFDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMxRSxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ2hEO0lBRUQsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQ2xDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM3RCxXQUFXLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDOUM7UUFDRCxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7WUFDaEMsTUFBTSxVQUFVLEdBQVUsRUFBRSxDQUFDOztZQUM3QixNQUFNLFlBQVksR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDMUUsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7Z0JBQ2xFLE1BQU0sV0FBVyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQztxQkFDL0MsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQzlDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLFlBQVksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztvQkFDbEQsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7d0JBQzVCLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLFdBQVcsQ0FBQyxDQUFDO3FCQUMzQztpQkFDRjthQUNGO1lBQ0QsWUFBWTtpQkFDVCxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxHQUFHLENBQUM7Z0JBQzNDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsc0JBQXNCLENBQUMsQ0FDdkM7aUJBQ0EsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFOztnQkFDYixNQUFNLGdCQUFnQixHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7b0JBQ3ZELGNBQWMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLHVCQUF1QixDQUFDOztnQkFDakQsTUFBTSxTQUFTLEdBQUcscUJBQXFCLENBQ3JDLEdBQUcsRUFBRSxhQUFhLEVBQUUsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFDL0QsYUFBYSxHQUFHLGdCQUFnQixFQUNoQyxXQUFXLEdBQUcsR0FBRyxHQUFHLEdBQUcsRUFDdkIsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLGlCQUFpQixDQUNwRCxDQUFDO2dCQUNGLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7b0JBQ2QsRUFBRSxDQUFDLENBQUMsZUFBZSxDQUFDLE1BQU0sRUFBRSxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUN2QyxTQUFTLENBQUMsT0FBTyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7d0JBQ2xDLEdBQUcsQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO3FCQUMzQjtvQkFDRCxVQUFVLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2lCQUM1QjthQUNGLENBQUMsQ0FBQztZQUNMLEVBQUUsQ0FBQyxDQUFDLFdBQVcsS0FBSyxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO2dCQUN6QyxPQUFPLEdBQUcsVUFBVSxDQUFDO2FBQ3RCO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sT0FBTyxDQUFDLEtBQUssR0FBRyxVQUFVLENBQUM7YUFDNUI7U0FDRjs7Ozs7S0FNRjtJQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxLQUFLLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDeEMsT0FBTyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7O1FBQ25CLElBQUksYUFBYSxHQUFVLEVBQUUsQ0FBQztRQUM5QixPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUNqQyxNQUFNLENBQUMsUUFBUSxJQUFJLElBQUksRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQzFELENBQUM7UUFDRixPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUNqQyxNQUFNLENBQUMsUUFBUSxJQUFJLENBQUMsRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsSUFBSSxDQUFDLENBQ3BELENBQUM7UUFDRixFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUSxJQUFJLGVBQWUsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM1RSxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUM7U0FDOUI7UUFDRCxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztTQUFFO1FBQzdFLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDN0UsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxRQUFRLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQzNELE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDO1lBQ3RELE9BQU8sQ0FBQyxPQUFPLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztTQUMvQjtRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVE7WUFDakMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFVLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxTQUMvQyxDQUFDLENBQUMsQ0FBQztZQUNELE9BQU8sQ0FBQyxPQUFPLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDO1NBQ25GO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUTtZQUNqQyxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQVUsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLFNBQy9DLENBQUMsQ0FBQyxDQUFDO1lBQ0QsT0FBTyxDQUFDLE9BQU8sQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUM7U0FDbkY7UUFDRCxFQUFFLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2pDLFdBQVcsQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDdEQsV0FBVyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUN0RCxXQUFXLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQzFELFdBQVcsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDekQ7UUFDRCxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hDLEdBQUcsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFFLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUE7U0FDL0Q7UUFDRCxTQUFTLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxTQUFTLEtBQUssS0FBSyxDQUFDOztRQUNoRCxJQUFJLDRCQUE0QixHQUFXLElBQUksQ0FBQzs7UUFHaEQsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDMUIsT0FBTyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7WUFDbkIsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDOztnQkFDcEQsSUFBSSxPQUFPLENBQU07O2dCQUNqQixNQUFNLGNBQWMsR0FBRyx5QkFBeUIsQ0FDOUMsZ0JBQWdCLEdBQUcsR0FBRyxHQUFHLENBQUMsRUFBRSxHQUFHLENBQUMsbUJBQW1CLEVBQUUsR0FBRyxDQUFDLFFBQVEsQ0FDbEUsQ0FBQzs7Z0JBQ0YsTUFBTSxhQUFhLEdBQUcsQ0FBQyxjQUFjLENBQUMsTUFBTTtvQkFDMUMsY0FBYyxLQUFLLGdCQUFnQixHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUM7O2dCQUdoRCxFQUFFLENBQUMsQ0FBQyxTQUFTLElBQUksQ0FBQyxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztvQkFDL0MsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFFLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7d0JBRWxELEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxjQUFjLENBQUMsR0FBRyxJQUFJLENBQUM7d0JBQzVDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxjQUFjLENBQUMsR0FBRyxxQkFBcUIsQ0FDMUQsR0FBRyxFQUFFLGFBQWEsRUFBRSxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUM1RCxhQUFhLEdBQUcsU0FBUyxHQUFHLENBQUMsRUFDN0IsYUFBYSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFdBQVcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxFQUMxQyxJQUFJLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsYUFBYSxDQUFDLENBQUMsQ0FBQyxXQUFXLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUN0RSxDQUFDO3dCQUNGLEVBQUUsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7NEJBQ2xCLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxjQUFjLENBQUMsQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUM7eUJBQ2hFO3FCQUNGO29CQUNELE9BQU8sR0FBRyxhQUFhLENBQUM7d0JBQ3RCLElBQUksRUFBRSxjQUFjO3dCQUNwQixXQUFXLEVBQUUsV0FBVyxHQUFHLEdBQUcsR0FBRyxDQUFDO3dCQUNsQyxrQkFBa0IsRUFBRSxhQUFhO3FCQUNsQyxFQUFFLEdBQUcsRUFBRSxhQUFhLEVBQUUsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUNsRTtnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFDTixPQUFPLEdBQUcscUJBQXFCLENBQzdCLEdBQUcsRUFBRSxhQUFhLEVBQUUsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFDNUQsYUFBYSxHQUFHLFNBQVMsR0FBRyxDQUFDLEVBQzdCLFdBQVcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxFQUNyQixJQUFJLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxhQUFhLEVBQUUsaUJBQWlCLENBQ3ZELENBQUM7aUJBQ0g7Z0JBQ0QsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztvQkFBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztpQkFBRTthQUM5Qzs7WUFHRCxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDckMsNEJBQTRCLEdBQUcsYUFBYSxHQUFHLGtCQUFrQixDQUFDO2FBQ25FOztTQUdGO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2xDLDRCQUE0QixHQUFHLGFBQWEsR0FBRyxRQUFRLENBQUM7U0FDekQ7UUFFRCxFQUFFLENBQUMsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDLENBQUM7O1lBQ2pDLE1BQU0sY0FBYyxHQUFHLHlCQUF5QixDQUM5QyxnQkFBZ0IsR0FBRyxJQUFJLEVBQUUsR0FBRyxDQUFDLG1CQUFtQixFQUFFLEdBQUcsQ0FBQyxRQUFRLENBQy9ELENBQUM7O1lBQ0YsTUFBTSxhQUFhLEdBQUcsQ0FBQyxjQUFjLENBQUMsTUFBTTtnQkFDMUMsY0FBYyxLQUFLLGdCQUFnQixHQUFHLElBQUksQ0FBQzs7WUFDN0MsTUFBTSxpQkFBaUIsR0FBRyx5QkFBeUIsQ0FDakQsNEJBQTRCLEVBQUUsR0FBRyxDQUFDLHFCQUFxQixFQUFFLEdBQUcsQ0FBQyxRQUFRLENBQ3RFLENBQUM7O1lBRUYsRUFBRSxDQUFDLENBQUMsY0FBYyxDQUFDLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEVBQUUsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDOztnQkFFM0UsR0FBRyxDQUFDLGdCQUFnQixDQUFDLGNBQWMsQ0FBQyxHQUFHLElBQUksQ0FBQztnQkFDNUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLGNBQWMsQ0FBQyxHQUFHLHFCQUFxQixDQUMxRCxHQUFHLEVBQUUsYUFBYSxFQUFFLElBQUksRUFDeEIsaUJBQWlCLEVBQ2pCLGFBQWEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxXQUFXLEdBQUcsSUFBSSxFQUN2QyxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsYUFBYSxDQUFDLENBQUMsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQ3ZFLENBQUM7Z0JBQ0YsRUFBRSxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztvQkFDbEIsR0FBRyxDQUFDLGdCQUFnQixDQUFDLGNBQWMsQ0FBQyxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQztpQkFDaEU7YUFDRjs7WUFHRCxFQUFFLENBQUMsQ0FBQyxDQUFDLGFBQWEsSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7O2dCQUMvQyxNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQ25DLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ2pCLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUN4RCxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FDMUMsRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUM3QixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDO29CQUN2QyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsV0FBVyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7d0JBQ3hELE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQzs0QkFDL0IsSUFBSSxFQUFFLGNBQWM7NEJBQ3BCLFdBQVcsRUFBRSxXQUFXLEdBQUcsSUFBSTs0QkFDL0Isa0JBQWtCLEVBQUUsYUFBYTt5QkFDbEMsRUFBRSxHQUFHLEVBQUUsYUFBYSxFQUFFLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO3FCQUNuRTtpQkFDRjthQUNGOztZQUdELEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxLQUFLLEtBQUs7Z0JBQ25DLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUTtnQkFDbkQsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUksS0FBSyxNQUMzRCxDQUFDLENBQUMsQ0FBQzs7Z0JBQ0QsSUFBSSxVQUFVLEdBQ1osQ0FBQyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDOztnQkFDckUsTUFBTSxNQUFNLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztnQkFDL0MsRUFBRSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO29CQUNoQixVQUFVLEdBQUcsTUFBTSxDQUFDLEtBQUssSUFBSSxRQUFRLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO2lCQUN2RTtnQkFDRCxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUFDLFVBQVUsR0FBRyxNQUFNLEdBQUcsVUFBVSxDQUFDO2lCQUFFO2dCQUN0RSxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztvQkFDakIsR0FBRyxFQUFFLENBQUMsQ0FBQyxRQUFRLEVBQUU7b0JBQ2pCLFNBQVMsRUFBRSxJQUFJO29CQUNmLGFBQWEsRUFBRSxNQUFNO29CQUNyQixXQUFXLEVBQUUsT0FBTyxDQUFDLFdBQVcsR0FBRyxJQUFJO29CQUN2QyxPQUFPLEVBQUU7d0JBQ1AsU0FBUyxFQUFFLE9BQU8sQ0FBQyxPQUFPLENBQUMsU0FBUzt3QkFDcEMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUTt3QkFDbEMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUTt3QkFDbEMsU0FBUyxFQUFFLEtBQUs7d0JBQ2hCLEtBQUssRUFBRSxVQUFVO3dCQUNqQixVQUFVLEVBQUUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFVO3FCQUN2QztvQkFDRCxrQkFBa0IsRUFBRSxhQUFhO29CQUNqQyxJQUFJLEVBQUUsTUFBTTtvQkFDWixNQUFNLEVBQUUsYUFBYSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUM7b0JBQ3ZDLElBQUksRUFBRSxjQUFjO2lCQUNyQixDQUFDLENBQUM7YUFDSjtTQUNGO0tBRUY7SUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDOztRQUN2QyxNQUFNLFNBQVMsR0FBRyxXQUFXLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQzs7UUFDbkQsTUFBTSxPQUFPLEdBQUcsV0FBVyxDQUFDLGFBQWEsQ0FBQyxTQUFTLEVBQUUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDOztRQUNqRSxJQUFJLFVBQVUsR0FBRyxFQUFFLENBQUM7O1FBR3BCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUN4QixVQUFVLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUM7U0FDbEM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN2RCxVQUFVO2dCQUNSLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQzs7U0FHekU7UUFBQyxJQUFJLENBQUMsQ0FBQzs7WUFDTixNQUFNLFlBQVksR0FDaEIsV0FBVyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLGFBQWEsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNwRCxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbEMsVUFBVSxHQUFHLFNBQVMsR0FBRyxZQUFZLENBQUMsS0FBSyxDQUFDO2FBQzdDO1lBQUMsSUFBSSxDQUFDLENBQUM7O2dCQUNOLE1BQU0sWUFBWSxHQUFHLFdBQVcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUM1RCxVQUFVLEdBQUcsU0FBUyxHQUFHLFFBQVEsQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQzFFO1NBQ0Y7UUFDRCxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRTtZQUNyQixrQkFBa0IsRUFBRSxJQUFJO1lBQ3hCLE1BQU0sRUFBRSxhQUFhLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQztZQUN2QyxJQUFJLEVBQUUsT0FBTztTQUNkLENBQUMsQ0FBQztRQUNILE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRTtZQUM3QixTQUFTLEVBQUUsS0FBSztZQUNoQixLQUFLLEVBQUUsVUFBVTtTQUNsQixDQUFDLENBQUM7UUFDSCxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLGFBQWEsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDekUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxRQUFRO2dCQUN0QixXQUFXLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsYUFBYSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQztTQUM5RDs7UUFHRCxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNuQixFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDOztnQkFFM0MsR0FBRyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxHQUFHLElBQUksQ0FBQzs7Z0JBQ3JDLE1BQU0sU0FBUyxHQUFHLHFCQUFxQixDQUNyQyxHQUFHLEVBQUUsYUFBYSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUN2QyxPQUFPLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxhQUFhLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxXQUFXLENBQ2xFLENBQUM7Z0JBQ0YsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztvQkFDZCxTQUFTLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDO29CQUNwQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLEdBQUcsU0FBUyxDQUFDO2lCQUMzQztnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFDTixPQUFPLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztpQkFDdEM7YUFDRjtZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUM7Z0JBQzdELEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUM7YUFDekQ7U0FDRjtLQUNGO0lBQ0QsTUFBTSxDQUFDLE9BQU8sQ0FBQztDQUNoQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXdCRCxNQUFNLG9CQUFvQixNQUFNLEVBQUUsRUFBRSxFQUFFLGFBQWEsR0FBRyxFQUFFLEVBQUUsVUFBVSxHQUFHLE1BQU07O0lBQzNFLElBQUksUUFBUSxHQUFHLENBQUMsQ0FBQzs7SUFDakIsSUFBSSxTQUFTLEdBQVUsRUFBRSxDQUFDO0lBQzFCLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUU7O1FBQzlCLElBQUksU0FBUyxHQUFHLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQzs7UUFDbEMsSUFBSSxnQkFBZ0IsR0FBRyxhQUFhLEdBQUcsR0FBRyxHQUFHLFNBQVMsQ0FBQzs7UUFDdkQsSUFBSSxPQUFPLEdBQVEsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDOztRQUM5QixJQUFJLFVBQVUsR0FBVSxFQUFFLENBQUM7UUFDM0IsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNuQixFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDekIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO2dCQUN2QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7YUFDbEI7WUFDRCxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDMUIsVUFBVSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQzlEO1NBQ0Y7UUFDRCxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUN0QixPQUFPLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQyxVQUFVLEVBQUUsRUFBRSxFQUFFLGdCQUFnQixHQUFHLFFBQVEsRUFBRSxVQUFVLENBQUMsQ0FBQztTQUNwRjtRQUNELE9BQU8sR0FBRyxFQUFFLENBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxnQkFBZ0IsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUMvRCxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDeEIsUUFBUSxFQUFFLENBQUM7U0FDWjtRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFBQyxRQUFRLElBQUksT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7YUFBRTtZQUN6RCxTQUFTLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUN2QztLQUNGLENBQUMsQ0FBQztJQUNILE1BQU0sQ0FBQyxTQUFTLENBQUM7Q0FDbEI7QUFBQSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7O0FBWUYsTUFBTSx3QkFDSixPQUFPLEVBQUUsR0FBRyxFQUFFLGdCQUFxQixJQUFJLEVBQUUsWUFBaUIsSUFBSTs7SUFJOUQsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLGtCQUFrQixJQUFJLGFBQWEsQ0FBQyxDQUFDLENBQUM7O1FBQ2hELE1BQU0sYUFBYSxHQUFHLENBQUMsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDM0MsRUFBRSxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUFDLGFBQWEsQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO1NBQUU7UUFDM0QsTUFBTSxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUU7WUFDM0Isa0JBQWtCLEVBQUUsSUFBSTtZQUN4QixNQUFNLEVBQUUsYUFBYSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUM7U0FDeEMsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsT0FBTyxFQUFFO1lBQ25DLFNBQVMsRUFBRSxLQUFLO1lBQ2hCLEtBQUssRUFBRSxNQUFNLEdBQUcsYUFBYSxDQUFDLElBQUk7U0FDbkMsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxDQUFDLGFBQWEsQ0FBQzs7S0FHeEI7SUFBQyxJQUFJLENBQUMsQ0FBQzs7UUFDSixJQUFJLGFBQWEsR0FBRyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDOztRQUV2RCxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pCLGFBQWEsR0FBRyxxQkFBcUIsQ0FDbkMsR0FBRyxFQUFFLGFBQWEsRUFBRSxTQUFTLEVBQzdCLFdBQVcsQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQ3JELE9BQU8sQ0FBQyxJQUFJLEVBQUUsYUFBYSxDQUFDLFNBQVMsRUFDckMsYUFBYSxDQUFDLGFBQWEsRUFBRSxhQUFhLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQ3BFLENBQUM7U0FDSDtRQUFDLElBQUksQ0FBQyxDQUFDOztZQUVOLGFBQWEsR0FBRyxDQUFDLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQzNDLFdBQVcsQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxFQUFFOztnQkFHMUQsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQUMsT0FBTyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7aUJBQUU7OztnQkFJM0QsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLGtCQUFrQixJQUFJLE1BQU0sQ0FBQyxPQUFPLEVBQUUsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNqRSxPQUFPLENBQUMsV0FBVyxHQUFHLE9BQU8sQ0FBQyxXQUFXLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQztpQkFDakU7YUFDRixDQUFDLENBQUM7U0FDSjtRQUNELE1BQU0sQ0FBQyxhQUFhLENBQUM7S0FDdEI7Q0FDRjs7Ozs7Ozs7Ozs7Ozs7O0FBV0QsTUFBTSx3QkFDSixRQUFRLEVBQUUsUUFBUSxFQUFFLGFBQWEsR0FBRyxJQUFJLEVBQUUsUUFBUSxHQUFHLElBQUk7O0lBRXpELElBQUksV0FBVyxHQUFtQixFQUFFLENBQUM7O0lBQ3JDLElBQUksYUFBYSxHQUFHLEtBQUssQ0FBQztJQUMxQixFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQ2IsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0QixFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUNiLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNwQyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOzt3QkFDMUIsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQzt3QkFDaEMsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7OzRCQUM3QixNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDOzRCQUM5QixXQUFXLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7NEJBQ2xDLEVBQUUsQ0FBQyxDQUFDLEtBQUssS0FBSyxTQUFTLElBQUksS0FBSyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7Z0NBQUMsYUFBYSxHQUFHLElBQUksQ0FBQzs2QkFBRTt5QkFDckU7cUJBQ0Y7b0JBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7O3dCQUNqQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7OzRCQUN4QixNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7OzRCQUN6QixNQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQzFCLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQzs0QkFDbEMsRUFBRSxDQUFDLENBQUMsS0FBSyxLQUFLLFNBQVMsSUFBSSxLQUFLLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztnQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDOzZCQUFFO3lCQUNyRTtxQkFDRjtpQkFDRjthQUNGO1lBQUMsSUFBSSxDQUFDLENBQUM7O2dCQUNOLFdBQVcsR0FBRyxRQUFRLENBQUM7Z0JBQ3ZCLEVBQUUsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztvQkFDbkIsYUFBYSxHQUFHLENBQUMsQ0FBQyxXQUFXO3lCQUMxQixNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxLQUFLLFNBQVMsSUFBSSxDQUFDLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQzt5QkFDdEQsTUFBTSxDQUFDO2lCQUNYO2FBQ0Y7U0FDRjtRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDOztZQUNwQixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7Z0JBQ3BDLElBQUksS0FBSyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDeEIsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7O29CQUM1QixJQUFJLElBQUksR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQzNCLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztvQkFDbEMsRUFBRSxDQUFDLENBQUMsS0FBSyxLQUFLLFNBQVMsSUFBSSxLQUFLLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQzt3QkFBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO3FCQUFFO2lCQUNyRTthQUNGO1NBQ0Y7UUFBQyxJQUFJLENBQUMsQ0FBQzs7WUFDTixHQUFHLENBQUMsQ0FBQyxJQUFJLEtBQUssSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7Z0JBQ3hDLElBQUksSUFBSSxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDM0IsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO2dCQUNsQyxFQUFFLENBQUMsQ0FBQyxLQUFLLEtBQUssU0FBUyxJQUFJLEtBQUssS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO29CQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7aUJBQUU7YUFDckU7U0FDRjtLQUNGO0lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7O1FBQ3BCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDOztZQUNwQyxJQUFJLElBQUksR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7O1lBQ3ZCLElBQUksS0FBSyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4QixXQUFXLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBQyxDQUFDLENBQUM7WUFDakMsRUFBRSxDQUFDLENBQUMsS0FBSyxLQUFLLFNBQVMsSUFBSSxLQUFLLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO2FBQUU7U0FDckU7S0FDRjtJQUFDLElBQUksQ0FBQyxDQUFDOztRQUNOLFdBQVcsR0FBRyxDQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBRSxDQUFDO0tBQ2xGOztJQUdELEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3RELGFBQWEsR0FBRyxLQUFLLENBQUM7O1FBR3RCLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDYixXQUFXLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLGFBQWEsRUFBRSxLQUFLLEVBQUUsRUFBRTtnQkFDeEQsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzNCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUN6QixhQUFhLEdBQUc7NEJBQ2QsR0FBRyxhQUFhOzRCQUNoQixHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQ3hCLG1CQUFNLElBQUksRUFBSyxFQUFFLElBQUksRUFBRSxHQUFHLEtBQUssQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDLElBQUksRUFBRSxFQUFFLEVBQUcsQ0FDM0Q7eUJBQ0YsQ0FBQzt3QkFDRixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLEtBQUssU0FBUyxJQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUM5RSxhQUFhLEdBQUcsSUFBSSxDQUFDO3lCQUN0QjtxQkFDRjtvQkFDRCxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxJQUFJLE1BQU0sQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNwRCxLQUFLLENBQUMsSUFBSSxHQUFHLEdBQUcsS0FBSyxDQUFDLEtBQUssS0FBSyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7d0JBQzdDLE9BQU8sS0FBSyxDQUFDLEtBQUssQ0FBQzt3QkFDbkIsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzt3QkFDMUIsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssS0FBSyxTQUFTLElBQUksS0FBSyxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDOzRCQUN0RCxhQUFhLEdBQUcsSUFBSSxDQUFDO3lCQUN0QjtxQkFDRjtpQkFDRjtnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFDTixhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUMxQixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxLQUFLLFNBQVMsSUFBSSxLQUFLLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7d0JBQ3RELGFBQWEsR0FBRyxJQUFJLENBQUM7cUJBQ3RCO2lCQUNGO2dCQUNELE1BQU0sQ0FBQyxhQUFhLENBQUM7YUFDdEIsRUFBRSxFQUFFLENBQUMsQ0FBQzs7U0FHUjtRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sV0FBVyxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxhQUFhLEVBQUUsS0FBSyxFQUFFLEVBQUU7Z0JBQ3hELEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUMzQixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxLQUFLLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQzt3QkFDMUUsYUFBYSxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsS0FBSyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7cUJBQ3RFO29CQUNELEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLElBQUksTUFBTSxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ3BELGFBQWEsQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUs7NkJBQzFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQzt3QkFDbEQsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssS0FBSyxTQUFTLElBQUksS0FBSyxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDOzRCQUN0RCxhQUFhLEdBQUcsSUFBSSxDQUFDO3lCQUN0QjtxQkFDRjtpQkFDRjtnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFDTixhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUMxQixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxLQUFLLFNBQVMsSUFBSSxLQUFLLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7d0JBQ3RELGFBQWEsR0FBRyxJQUFJLENBQUM7cUJBQ3RCO2lCQUNGO2dCQUNELE1BQU0sQ0FBQyxhQUFhLENBQUM7YUFDdEIsRUFBRSxFQUFFLENBQUMsQ0FBQztTQUNSO0tBQ0Y7SUFDRCxFQUFFLENBQUMsQ0FBQyxDQUFDLGFBQWEsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7UUFDckMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxFQUFFLElBQUksRUFBRSxlQUFlLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7S0FDN0Q7SUFDRCxNQUFNLENBQUMsV0FBVyxDQUFDO0NBQ3BCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcblxuaW1wb3J0IHsgVGl0bGVNYXBJdGVtIH0gZnJvbSAnLi4vanNvbi1zY2hlbWEtZm9ybS5zZXJ2aWNlJztcbmltcG9ydCB7XG4gIGluQXJyYXksIGlzQXJyYXksIGlzRW1wdHksIGlzTnVtYmVyLCBpc09iamVjdCwgaXNEZWZpbmVkLCBpc1N0cmluZ1xufSBmcm9tICcuL3ZhbGlkYXRvci5mdW5jdGlvbnMnO1xuaW1wb3J0IHsgY29weSwgZml4VGl0bGUsIGZvckVhY2gsIGhhc093biB9IGZyb20gJy4vdXRpbGl0eS5mdW5jdGlvbnMnO1xuaW1wb3J0IHsgUG9pbnRlciwgSnNvblBvaW50ZXIgfSBmcm9tICcuL2pzb25wb2ludGVyLmZ1bmN0aW9ucyc7XG5pbXBvcnQge1xuICBnZXRGcm9tU2NoZW1hLCBnZXRJbnB1dFR5cGUsIGdldFN1YlNjaGVtYSwgY2hlY2tJbmxpbmVUeXBlLCBpc0lucHV0UmVxdWlyZWQsXG4gIHJlbW92ZVJlY3Vyc2l2ZVJlZmVyZW5jZXMsIHVwZGF0ZUlucHV0T3B0aW9uc1xufSBmcm9tICcuL2pzb24tc2NoZW1hLmZ1bmN0aW9ucyc7XG5pbXBvcnQgeyBidWlsZEZvcm1Hcm91cFRlbXBsYXRlLCBnZXRDb250cm9sIH0gZnJvbSAnLi9mb3JtLWdyb3VwLmZ1bmN0aW9ucyc7XG5cbi8qKlxuICogTGF5b3V0IGZ1bmN0aW9uIGxpYnJhcnk6XG4gKlxuICogYnVpbGRMYXlvdXQ6ICAgICAgICAgICAgQnVpbGRzIGEgY29tcGxldGUgbGF5b3V0IGZyb20gYW4gaW5wdXQgbGF5b3V0IGFuZCBzY2hlbWFcbiAqXG4gKiBidWlsZExheW91dEZyb21TY2hlbWE6ICBCdWlsZHMgYSBjb21wbGV0ZSBsYXlvdXQgZW50aXJlbHkgZnJvbSBhbiBpbnB1dCBzY2hlbWFcbiAqXG4gKiBtYXBMYXlvdXQ6XG4gKlxuICogZ2V0TGF5b3V0Tm9kZTpcbiAqXG4gKiBidWlsZFRpdGxlTWFwOlxuICovXG5cbi8qKlxuICogJ2J1aWxkTGF5b3V0JyBmdW5jdGlvblxuICpcbiAqIC8vICAganNmXG4gKiAvLyAgIHdpZGdldExpYnJhcnlcbiAqIC8vIFxuICovXG5leHBvcnQgZnVuY3Rpb24gYnVpbGRMYXlvdXQoanNmLCB3aWRnZXRMaWJyYXJ5KSB7XG4gIGxldCBoYXNTdWJtaXRCdXR0b24gPSAhSnNvblBvaW50ZXIuZ2V0KGpzZiwgJy9mb3JtT3B0aW9ucy9hZGRTdWJtaXQnKTtcbiAgY29uc3QgZm9ybUxheW91dCA9IG1hcExheW91dChqc2YubGF5b3V0LCAobGF5b3V0SXRlbSwgaW5kZXgsIGxheW91dFBvaW50ZXIpID0+IHtcbiAgICBsZXQgY3VycmVudEluZGV4ID0gaW5kZXg7XG4gICAgbGV0IG5ld05vZGU6IGFueSA9IHtcbiAgICAgIF9pZDogXy51bmlxdWVJZCgpLFxuICAgICAgb3B0aW9uczoge30sXG4gICAgfTtcbiAgICBpZiAoaXNPYmplY3QobGF5b3V0SXRlbSkpIHtcbiAgICAgIE9iamVjdC5hc3NpZ24obmV3Tm9kZSwgbGF5b3V0SXRlbSk7XG4gICAgICBPYmplY3Qua2V5cyhuZXdOb2RlKVxuICAgICAgICAuZmlsdGVyKG9wdGlvbiA9PiAhaW5BcnJheShvcHRpb24sIFtcbiAgICAgICAgICAnX2lkJywgJyRyZWYnLCAnYXJyYXlJdGVtJywgJ2FycmF5SXRlbVR5cGUnLCAnZGF0YVBvaW50ZXInLCAnZGF0YVR5cGUnLFxuICAgICAgICAgICdpdGVtcycsICdrZXknLCAnbmFtZScsICdvcHRpb25zJywgJ3JlY3Vyc2l2ZVJlZmVyZW5jZScsICd0eXBlJywgJ3dpZGdldCdcbiAgICAgICAgXSkpXG4gICAgICAgIC5mb3JFYWNoKG9wdGlvbiA9PiB7XG4gICAgICAgICAgbmV3Tm9kZS5vcHRpb25zW29wdGlvbl0gPSBuZXdOb2RlW29wdGlvbl07XG4gICAgICAgICAgZGVsZXRlIG5ld05vZGVbb3B0aW9uXTtcbiAgICAgICAgfSk7XG4gICAgICBpZiAoIWhhc093bihuZXdOb2RlLCAndHlwZScpICYmIGlzU3RyaW5nKG5ld05vZGUud2lkZ2V0KSkge1xuICAgICAgICBuZXdOb2RlLnR5cGUgPSBuZXdOb2RlLndpZGdldDtcbiAgICAgICAgZGVsZXRlIG5ld05vZGUud2lkZ2V0O1xuICAgICAgfVxuICAgICAgaWYgKCFoYXNPd24obmV3Tm9kZS5vcHRpb25zLCAndGl0bGUnKSkge1xuICAgICAgICBpZiAoaGFzT3duKG5ld05vZGUub3B0aW9ucywgJ2xlZ2VuZCcpKSB7XG4gICAgICAgICAgbmV3Tm9kZS5vcHRpb25zLnRpdGxlID0gbmV3Tm9kZS5vcHRpb25zLmxlZ2VuZDtcbiAgICAgICAgICBkZWxldGUgbmV3Tm9kZS5vcHRpb25zLmxlZ2VuZDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKCFoYXNPd24obmV3Tm9kZS5vcHRpb25zLCAndmFsaWRhdGlvbk1lc3NhZ2VzJykpIHtcbiAgICAgICAgaWYgKGhhc093bihuZXdOb2RlLm9wdGlvbnMsICdlcnJvck1lc3NhZ2VzJykpIHtcbiAgICAgICAgICBuZXdOb2RlLm9wdGlvbnMudmFsaWRhdGlvbk1lc3NhZ2VzID0gbmV3Tm9kZS5vcHRpb25zLmVycm9yTWVzc2FnZXM7XG4gICAgICAgICAgZGVsZXRlIG5ld05vZGUub3B0aW9ucy5lcnJvck1lc3NhZ2VzO1xuXG4gICAgICAgIC8vIENvbnZlcnQgQW5ndWxhciBTY2hlbWEgRm9ybSAoQW5ndWxhckpTKSAndmFsaWRhdGlvbk1lc3NhZ2UnIHRvXG4gICAgICAgIC8vIEFuZ3VsYXIgSlNPTiBTY2hlbWEgRm9ybSAndmFsaWRhdGlvbk1lc3NhZ2VzJ1xuICAgICAgICAvLyBUVjQgY29kZXMgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vZ2VyYWludGx1ZmYvdHY0L2Jsb2IvbWFzdGVyL3NvdXJjZS9hcGkuanNcbiAgICAgICAgfSBlbHNlIGlmIChoYXNPd24obmV3Tm9kZS5vcHRpb25zLCAndmFsaWRhdGlvbk1lc3NhZ2UnKSkge1xuICAgICAgICAgIGlmICh0eXBlb2YgbmV3Tm9kZS5vcHRpb25zLnZhbGlkYXRpb25NZXNzYWdlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgbmV3Tm9kZS5vcHRpb25zLnZhbGlkYXRpb25NZXNzYWdlcyA9IG5ld05vZGUub3B0aW9ucy52YWxpZGF0aW9uTWVzc2FnZTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbmV3Tm9kZS5vcHRpb25zLnZhbGlkYXRpb25NZXNzYWdlcyA9IHt9O1xuICAgICAgICAgICAgT2JqZWN0LmtleXMobmV3Tm9kZS5vcHRpb25zLnZhbGlkYXRpb25NZXNzYWdlKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IGNvZGUgPSBrZXkgKyAnJztcbiAgICAgICAgICAgICAgY29uc3QgbmV3S2V5ID1cbiAgICAgICAgICAgICAgICBjb2RlID09PSAgJzAnICA/ICd0eXBlJyA6XG4gICAgICAgICAgICAgICAgY29kZSA9PT0gICcxJyAgPyAnZW51bScgOlxuICAgICAgICAgICAgICAgIGNvZGUgPT09ICcxMDAnID8gJ211bHRpcGxlT2YnIDpcbiAgICAgICAgICAgICAgICBjb2RlID09PSAnMTAxJyA/ICdtaW5pbXVtJyA6XG4gICAgICAgICAgICAgICAgY29kZSA9PT0gJzEwMicgPyAnZXhjbHVzaXZlTWluaW11bScgOlxuICAgICAgICAgICAgICAgIGNvZGUgPT09ICcxMDMnID8gJ21heGltdW0nIDpcbiAgICAgICAgICAgICAgICBjb2RlID09PSAnMTA0JyA/ICdleGNsdXNpdmVNYXhpbXVtJyA6XG4gICAgICAgICAgICAgICAgY29kZSA9PT0gJzIwMCcgPyAnbWluTGVuZ3RoJyA6XG4gICAgICAgICAgICAgICAgY29kZSA9PT0gJzIwMScgPyAnbWF4TGVuZ3RoJyA6XG4gICAgICAgICAgICAgICAgY29kZSA9PT0gJzIwMicgPyAncGF0dGVybicgOlxuICAgICAgICAgICAgICAgIGNvZGUgPT09ICczMDAnID8gJ21pblByb3BlcnRpZXMnIDpcbiAgICAgICAgICAgICAgICBjb2RlID09PSAnMzAxJyA/ICdtYXhQcm9wZXJ0aWVzJyA6XG4gICAgICAgICAgICAgICAgY29kZSA9PT0gJzMwMicgPyAncmVxdWlyZWQnIDpcbiAgICAgICAgICAgICAgICBjb2RlID09PSAnMzA0JyA/ICdkZXBlbmRlbmNpZXMnIDpcbiAgICAgICAgICAgICAgICBjb2RlID09PSAnNDAwJyA/ICdtaW5JdGVtcycgOlxuICAgICAgICAgICAgICAgIGNvZGUgPT09ICc0MDEnID8gJ21heEl0ZW1zJyA6XG4gICAgICAgICAgICAgICAgY29kZSA9PT0gJzQwMicgPyAndW5pcXVlSXRlbXMnIDpcbiAgICAgICAgICAgICAgICBjb2RlID09PSAnNTAwJyA/ICdmb3JtYXQnIDogY29kZSArICcnO1xuICAgICAgICAgICAgICBuZXdOb2RlLm9wdGlvbnMudmFsaWRhdGlvbk1lc3NhZ2VzW25ld0tleV0gPSBuZXdOb2RlLm9wdGlvbnMudmFsaWRhdGlvbk1lc3NhZ2Vba2V5XTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICBkZWxldGUgbmV3Tm9kZS5vcHRpb25zLnZhbGlkYXRpb25NZXNzYWdlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChKc29uUG9pbnRlci5pc0pzb25Qb2ludGVyKGxheW91dEl0ZW0pKSB7XG4gICAgICBuZXdOb2RlLmRhdGFQb2ludGVyID0gbGF5b3V0SXRlbTtcbiAgICB9IGVsc2UgaWYgKGlzU3RyaW5nKGxheW91dEl0ZW0pKSB7XG4gICAgICBuZXdOb2RlLmtleSA9IGxheW91dEl0ZW07XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ2J1aWxkTGF5b3V0IGVycm9yOiBGb3JtIGxheW91dCBlbGVtZW50IG5vdCByZWNvZ25pemVkOicpO1xuICAgICAgY29uc29sZS5lcnJvcihsYXlvdXRJdGVtKTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBsZXQgbm9kZVNjaGVtYTogYW55ID0gbnVsbDtcblxuICAgIC8vIElmIG5ld05vZGUgZG9lcyBub3QgaGF2ZSBhIGRhdGFQb2ludGVyLCB0cnkgdG8gZmluZCBhbiBlcXVpdmFsZW50XG4gICAgaWYgKCFoYXNPd24obmV3Tm9kZSwgJ2RhdGFQb2ludGVyJykpIHtcblxuICAgICAgLy8gSWYgbmV3Tm9kZSBoYXMgYSBrZXksIGNoYW5nZSBpdCB0byBhIGRhdGFQb2ludGVyXG4gICAgICBpZiAoaGFzT3duKG5ld05vZGUsICdrZXknKSkge1xuICAgICAgICBuZXdOb2RlLmRhdGFQb2ludGVyID0gbmV3Tm9kZS5rZXkgPT09ICcqJyA/IG5ld05vZGUua2V5IDpcbiAgICAgICAgICBKc29uUG9pbnRlci5jb21waWxlKEpzb25Qb2ludGVyLnBhcnNlT2JqZWN0UGF0aChuZXdOb2RlLmtleSksICctJyk7XG4gICAgICAgIGRlbGV0ZSBuZXdOb2RlLmtleTtcblxuICAgICAgLy8gSWYgbmV3Tm9kZSBpcyBhbiBhcnJheSwgc2VhcmNoIGZvciBkYXRhUG9pbnRlciBpbiBjaGlsZCBub2Rlc1xuICAgICAgfSBlbHNlIGlmIChoYXNPd24obmV3Tm9kZSwgJ3R5cGUnKSAmJiBuZXdOb2RlLnR5cGUuc2xpY2UoLTUpID09PSAnYXJyYXknKSB7XG4gICAgICAgIGNvbnN0IGZpbmREYXRhUG9pbnRlciA9IChpdGVtcykgPT4ge1xuICAgICAgICAgIGlmIChpdGVtcyA9PT0gbnVsbCB8fCB0eXBlb2YgaXRlbXMgIT09ICdvYmplY3QnKSB7IHJldHVybjsgfVxuICAgICAgICAgIGlmIChoYXNPd24oaXRlbXMsICdkYXRhUG9pbnRlcicpKSB7IHJldHVybiBpdGVtcy5kYXRhUG9pbnRlcjsgfVxuICAgICAgICAgIGlmIChpc0FycmF5KGl0ZW1zLml0ZW1zKSkge1xuICAgICAgICAgICAgZm9yIChsZXQgaXRlbSBvZiBpdGVtcy5pdGVtcykge1xuICAgICAgICAgICAgICBpZiAoaGFzT3duKGl0ZW0sICdkYXRhUG9pbnRlcicpICYmIGl0ZW0uZGF0YVBvaW50ZXIuaW5kZXhPZignLy0nKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaXRlbS5kYXRhUG9pbnRlcjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpZiAoaGFzT3duKGl0ZW0sICdpdGVtcycpKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2VhcmNoSXRlbSA9IGZpbmREYXRhUG9pbnRlcihpdGVtKTtcbiAgICAgICAgICAgICAgICBpZiAoc2VhcmNoSXRlbSkgeyByZXR1cm4gc2VhcmNoSXRlbTsgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBjb25zdCBjaGlsZERhdGFQb2ludGVyID0gZmluZERhdGFQb2ludGVyKG5ld05vZGUpO1xuICAgICAgICBpZiAoY2hpbGREYXRhUG9pbnRlcikge1xuICAgICAgICAgIG5ld05vZGUuZGF0YVBvaW50ZXIgPVxuICAgICAgICAgICAgY2hpbGREYXRhUG9pbnRlci5zbGljZSgwLCBjaGlsZERhdGFQb2ludGVyLmxhc3RJbmRleE9mKCcvLScpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChoYXNPd24obmV3Tm9kZSwgJ2RhdGFQb2ludGVyJykpIHtcbiAgICAgIGlmIChuZXdOb2RlLmRhdGFQb2ludGVyID09PSAnKicpIHtcbiAgICAgICAgcmV0dXJuIGJ1aWxkTGF5b3V0RnJvbVNjaGVtYShqc2YsIHdpZGdldExpYnJhcnksIGpzZi5mb3JtVmFsdWVzKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IG5vZGVWYWx1ZSA9XG4gICAgICAgIEpzb25Qb2ludGVyLmdldChqc2YuZm9ybVZhbHVlcywgbmV3Tm9kZS5kYXRhUG9pbnRlci5yZXBsYWNlKC9cXC8tL2csICcvMScpKTtcblxuICAgICAgLy8gVE9ETzogQ3JlYXRlIGZ1bmN0aW9uIGdldEZvcm1WYWx1ZXMoanNmLCBkYXRhUG9pbnRlciwgZm9yUmVmTGlicmFyeSlcbiAgICAgIC8vIGNoZWNrIGZvcm1PcHRpb25zLnNldFNjaGVtYURlZmF1bHRzIGFuZCBmb3JtT3B0aW9ucy5zZXRMYXlvdXREZWZhdWx0c1xuICAgICAgLy8gdGhlbiBzZXQgYXByb3ByaWF0ZSB2YWx1ZXMgZnJvbSBpbml0aWFsVmF1ZXMsIHNjaGVtYSwgb3IgbGF5b3V0XG5cbiAgICAgIG5ld05vZGUuZGF0YVBvaW50ZXIgPVxuICAgICAgICBKc29uUG9pbnRlci50b0dlbmVyaWNQb2ludGVyKG5ld05vZGUuZGF0YVBvaW50ZXIsIGpzZi5hcnJheU1hcCk7XG4gICAgICBjb25zdCBMYXN0S2V5ID0gSnNvblBvaW50ZXIudG9LZXkobmV3Tm9kZS5kYXRhUG9pbnRlcik7XG4gICAgICBpZiAoIW5ld05vZGUubmFtZSAmJiBpc1N0cmluZyhMYXN0S2V5KSAmJiBMYXN0S2V5ICE9PSAnLScpIHtcbiAgICAgICAgbmV3Tm9kZS5uYW1lID0gTGFzdEtleTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHNob3J0RGF0YVBvaW50ZXIgPSByZW1vdmVSZWN1cnNpdmVSZWZlcmVuY2VzKFxuICAgICAgICBuZXdOb2RlLmRhdGFQb2ludGVyLCBqc2YuZGF0YVJlY3Vyc2l2ZVJlZk1hcCwganNmLmFycmF5TWFwXG4gICAgICApO1xuICAgICAgY29uc3QgcmVjdXJzaXZlID0gIXNob3J0RGF0YVBvaW50ZXIubGVuZ3RoIHx8XG4gICAgICAgIHNob3J0RGF0YVBvaW50ZXIgIT09IG5ld05vZGUuZGF0YVBvaW50ZXI7XG4gICAgICBsZXQgc2NoZW1hUG9pbnRlcjogc3RyaW5nO1xuICAgICAgaWYgKCFqc2YuZGF0YU1hcC5oYXMoc2hvcnREYXRhUG9pbnRlcikpIHtcbiAgICAgICAganNmLmRhdGFNYXAuc2V0KHNob3J0RGF0YVBvaW50ZXIsIG5ldyBNYXAoKSk7XG4gICAgICB9XG4gICAgICBjb25zdCBub2RlRGF0YU1hcCA9IGpzZi5kYXRhTWFwLmdldChzaG9ydERhdGFQb2ludGVyKTtcbiAgICAgIGlmIChub2RlRGF0YU1hcC5oYXMoJ3NjaGVtYVBvaW50ZXInKSkge1xuICAgICAgICBzY2hlbWFQb2ludGVyID0gbm9kZURhdGFNYXAuZ2V0KCdzY2hlbWFQb2ludGVyJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzY2hlbWFQb2ludGVyID0gSnNvblBvaW50ZXIudG9TY2hlbWFQb2ludGVyKHNob3J0RGF0YVBvaW50ZXIsIGpzZi5zY2hlbWEpO1xuICAgICAgICBub2RlRGF0YU1hcC5zZXQoJ3NjaGVtYVBvaW50ZXInLCBzY2hlbWFQb2ludGVyKTtcbiAgICAgIH1cbiAgICAgIG5vZGVEYXRhTWFwLnNldCgnZGlzYWJsZWQnLCAhIW5ld05vZGUub3B0aW9ucy5kaXNhYmxlZCk7XG4gICAgICBub2RlU2NoZW1hID0gSnNvblBvaW50ZXIuZ2V0KGpzZi5zY2hlbWEsIHNjaGVtYVBvaW50ZXIpO1xuICAgICAgaWYgKG5vZGVTY2hlbWEpIHtcbiAgICAgICAgaWYgKCFoYXNPd24obmV3Tm9kZSwgJ3R5cGUnKSkge1xuICAgICAgICAgIG5ld05vZGUudHlwZSA9IGdldElucHV0VHlwZShub2RlU2NoZW1hLCBuZXdOb2RlKTtcbiAgICAgICAgfSBlbHNlIGlmICghd2lkZ2V0TGlicmFyeS5oYXNXaWRnZXQobmV3Tm9kZS50eXBlKSkge1xuICAgICAgICAgIGNvbnN0IG9sZFdpZGdldFR5cGUgPSBuZXdOb2RlLnR5cGU7XG4gICAgICAgICAgbmV3Tm9kZS50eXBlID0gZ2V0SW5wdXRUeXBlKG5vZGVTY2hlbWEsIG5ld05vZGUpO1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYGVycm9yOiB3aWRnZXQgdHlwZSBcIiR7b2xkV2lkZ2V0VHlwZX1cIiBgICtcbiAgICAgICAgICAgIGBub3QgZm91bmQgaW4gbGlicmFyeS4gUmVwbGFjaW5nIHdpdGggXCIke25ld05vZGUudHlwZX1cIi5gKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBuZXdOb2RlLnR5cGUgPSBjaGVja0lubGluZVR5cGUobmV3Tm9kZS50eXBlLCBub2RlU2NoZW1hLCBuZXdOb2RlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobm9kZVNjaGVtYS50eXBlID09PSAnb2JqZWN0JyAmJiBpc0FycmF5KG5vZGVTY2hlbWEucmVxdWlyZWQpKSB7XG4gICAgICAgICAgbm9kZURhdGFNYXAuc2V0KCdyZXF1aXJlZCcsIG5vZGVTY2hlbWEucmVxdWlyZWQpO1xuICAgICAgICB9XG4gICAgICAgIG5ld05vZGUuZGF0YVR5cGUgPVxuICAgICAgICAgIG5vZGVTY2hlbWEudHlwZSB8fCAoaGFzT3duKG5vZGVTY2hlbWEsICckcmVmJykgPyAnJHJlZicgOiBudWxsKTtcbiAgICAgICAgdXBkYXRlSW5wdXRPcHRpb25zKG5ld05vZGUsIG5vZGVTY2hlbWEsIGpzZik7XG5cbiAgICAgICAgLy8gUHJlc2VudCBjaGVja2JveGVzIGFzIHNpbmdsZSBjb250cm9sLCByYXRoZXIgdGhhbiBhcnJheVxuICAgICAgICBpZiAobmV3Tm9kZS50eXBlID09PSAnY2hlY2tib3hlcycgJiYgaGFzT3duKG5vZGVTY2hlbWEsICdpdGVtcycpKSB7XG4gICAgICAgICAgdXBkYXRlSW5wdXRPcHRpb25zKG5ld05vZGUsIG5vZGVTY2hlbWEuaXRlbXMsIGpzZik7XG4gICAgICAgIH0gZWxzZSBpZiAobmV3Tm9kZS5kYXRhVHlwZSA9PT0gJ2FycmF5Jykge1xuICAgICAgICAgIG5ld05vZGUub3B0aW9ucy5tYXhJdGVtcyA9IE1hdGgubWluKFxuICAgICAgICAgICAgbm9kZVNjaGVtYS5tYXhJdGVtcyB8fCAxMDAwLCBuZXdOb2RlLm9wdGlvbnMubWF4SXRlbXMgfHwgMTAwMFxuICAgICAgICAgICk7XG4gICAgICAgICAgbmV3Tm9kZS5vcHRpb25zLm1pbkl0ZW1zID0gTWF0aC5tYXgoXG4gICAgICAgICAgICBub2RlU2NoZW1hLm1pbkl0ZW1zIHx8IDAsIG5ld05vZGUub3B0aW9ucy5taW5JdGVtcyB8fCAwXG4gICAgICAgICAgKTtcbiAgICAgICAgICBuZXdOb2RlLm9wdGlvbnMubGlzdEl0ZW1zID0gTWF0aC5tYXgoXG4gICAgICAgICAgICBuZXdOb2RlLm9wdGlvbnMubGlzdEl0ZW1zIHx8IDAsIGlzQXJyYXkobm9kZVZhbHVlKSA/IG5vZGVWYWx1ZS5sZW5ndGggOiAwXG4gICAgICAgICAgKTtcbiAgICAgICAgICBuZXdOb2RlLm9wdGlvbnMudHVwbGVJdGVtcyA9XG4gICAgICAgICAgICBpc0FycmF5KG5vZGVTY2hlbWEuaXRlbXMpID8gbm9kZVNjaGVtYS5pdGVtcy5sZW5ndGggOiAwO1xuICAgICAgICAgIGlmIChuZXdOb2RlLm9wdGlvbnMubWF4SXRlbXMgPCBuZXdOb2RlLm9wdGlvbnMudHVwbGVJdGVtcykge1xuICAgICAgICAgICAgbmV3Tm9kZS5vcHRpb25zLnR1cGxlSXRlbXMgPSBuZXdOb2RlLm9wdGlvbnMubWF4SXRlbXM7XG4gICAgICAgICAgICBuZXdOb2RlLm9wdGlvbnMubGlzdEl0ZW1zID0gMDtcbiAgICAgICAgICB9IGVsc2UgaWYgKG5ld05vZGUub3B0aW9ucy5tYXhJdGVtcyA8XG4gICAgICAgICAgICBuZXdOb2RlLm9wdGlvbnMudHVwbGVJdGVtcyArIG5ld05vZGUub3B0aW9ucy5saXN0SXRlbXNcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIG5ld05vZGUub3B0aW9ucy5saXN0SXRlbXMgPVxuICAgICAgICAgICAgICBuZXdOb2RlLm9wdGlvbnMubWF4SXRlbXMgLSBuZXdOb2RlLm9wdGlvbnMudHVwbGVJdGVtcztcbiAgICAgICAgICB9IGVsc2UgaWYgKG5ld05vZGUub3B0aW9ucy5taW5JdGVtcyA+XG4gICAgICAgICAgICBuZXdOb2RlLm9wdGlvbnMudHVwbGVJdGVtcyArIG5ld05vZGUub3B0aW9ucy5saXN0SXRlbXNcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIG5ld05vZGUub3B0aW9ucy5saXN0SXRlbXMgPVxuICAgICAgICAgICAgICBuZXdOb2RlLm9wdGlvbnMubWluSXRlbXMgLSBuZXdOb2RlLm9wdGlvbnMudHVwbGVJdGVtcztcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCFub2RlRGF0YU1hcC5oYXMoJ21heEl0ZW1zJykpIHtcbiAgICAgICAgICAgIG5vZGVEYXRhTWFwLnNldCgnbWF4SXRlbXMnLCBuZXdOb2RlLm9wdGlvbnMubWF4SXRlbXMpO1xuICAgICAgICAgICAgbm9kZURhdGFNYXAuc2V0KCdtaW5JdGVtcycsIG5ld05vZGUub3B0aW9ucy5taW5JdGVtcyk7XG4gICAgICAgICAgICBub2RlRGF0YU1hcC5zZXQoJ3R1cGxlSXRlbXMnLCBuZXdOb2RlLm9wdGlvbnMudHVwbGVJdGVtcyk7XG4gICAgICAgICAgICBub2RlRGF0YU1hcC5zZXQoJ2xpc3RJdGVtcycsIG5ld05vZGUub3B0aW9ucy5saXN0SXRlbXMpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoIWpzZi5hcnJheU1hcC5oYXMoc2hvcnREYXRhUG9pbnRlcikpIHtcbiAgICAgICAgICAgIGpzZi5hcnJheU1hcC5zZXQoc2hvcnREYXRhUG9pbnRlciwgbmV3Tm9kZS5vcHRpb25zLnR1cGxlSXRlbXMpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChpc0lucHV0UmVxdWlyZWQoanNmLnNjaGVtYSwgc2NoZW1hUG9pbnRlcikpIHtcbiAgICAgICAgICBuZXdOb2RlLm9wdGlvbnMucmVxdWlyZWQgPSB0cnVlO1xuICAgICAgICAgIGpzZi5maWVsZHNSZXF1aXJlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIFRPRE86IGNyZWF0ZSBpdGVtIGluIEZvcm1Hcm91cCBtb2RlbCBmcm9tIGxheW91dCBrZXkgKD8pXG4gICAgICAgIHVwZGF0ZUlucHV0T3B0aW9ucyhuZXdOb2RlLCB7fSwganNmKTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFuZXdOb2RlLm9wdGlvbnMudGl0bGUgJiYgIS9eXFxkKyQvLnRlc3QobmV3Tm9kZS5uYW1lKSkge1xuICAgICAgICBuZXdOb2RlLm9wdGlvbnMudGl0bGUgPSBmaXhUaXRsZShuZXdOb2RlLm5hbWUpO1xuICAgICAgfVxuXG4gICAgICBpZiAoaGFzT3duKG5ld05vZGUub3B0aW9ucywgJ2NvcHlWYWx1ZVRvJykpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBuZXdOb2RlLm9wdGlvbnMuY29weVZhbHVlVG8gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgbmV3Tm9kZS5vcHRpb25zLmNvcHlWYWx1ZVRvID0gW25ld05vZGUub3B0aW9ucy5jb3B5VmFsdWVUb107XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzQXJyYXkobmV3Tm9kZS5vcHRpb25zLmNvcHlWYWx1ZVRvKSkge1xuICAgICAgICAgIG5ld05vZGUub3B0aW9ucy5jb3B5VmFsdWVUbyA9IG5ld05vZGUub3B0aW9ucy5jb3B5VmFsdWVUby5tYXAoaXRlbSA9PlxuICAgICAgICAgICAgSnNvblBvaW50ZXIuY29tcGlsZShKc29uUG9pbnRlci5wYXJzZU9iamVjdFBhdGgoaXRlbSksICctJylcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIG5ld05vZGUud2lkZ2V0ID0gd2lkZ2V0TGlicmFyeS5nZXRXaWRnZXQobmV3Tm9kZS50eXBlKTtcbiAgICAgIG5vZGVEYXRhTWFwLnNldCgnaW5wdXRUeXBlJywgbmV3Tm9kZS50eXBlKTtcbiAgICAgIG5vZGVEYXRhTWFwLnNldCgnd2lkZ2V0JywgbmV3Tm9kZS53aWRnZXQpO1xuXG4gICAgICBpZiAobmV3Tm9kZS5kYXRhVHlwZSA9PT0gJ2FycmF5JyAmJlxuICAgICAgICAoaGFzT3duKG5ld05vZGUsICdpdGVtcycpIHx8IGhhc093bihuZXdOb2RlLCAnYWRkaXRpb25hbEl0ZW1zJykpXG4gICAgICApIHtcbiAgICAgICAgbGV0IGl0ZW1SZWZQb2ludGVyID0gcmVtb3ZlUmVjdXJzaXZlUmVmZXJlbmNlcyhcbiAgICAgICAgICBuZXdOb2RlLmRhdGFQb2ludGVyICsgJy8tJywganNmLmRhdGFSZWN1cnNpdmVSZWZNYXAsIGpzZi5hcnJheU1hcFxuICAgICAgICApO1xuICAgICAgICBpZiAoIWpzZi5kYXRhTWFwLmhhcyhpdGVtUmVmUG9pbnRlcikpIHtcbiAgICAgICAgICBqc2YuZGF0YU1hcC5zZXQoaXRlbVJlZlBvaW50ZXIsIG5ldyBNYXAoKSk7XG4gICAgICAgIH1cbiAgICAgICAganNmLmRhdGFNYXAuZ2V0KGl0ZW1SZWZQb2ludGVyKS5zZXQoJ2lucHV0VHlwZScsICdzZWN0aW9uJyk7XG5cbiAgICAgICAgLy8gRml4IGluc3VmZmljaWVudGx5IG5lc3RlZCBhcnJheSBpdGVtIGdyb3Vwc1xuICAgICAgICBpZiAobmV3Tm9kZS5pdGVtcy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgbGV0IGFycmF5SXRlbUdyb3VwID0gW107XG4gICAgICAgICAgbGV0IGFycmF5SXRlbUdyb3VwVGVtcGxhdGUgPSBbXTtcbiAgICAgICAgICBsZXQgbmV3SW5kZXggPSAwO1xuICAgICAgICAgIGZvciAobGV0IGkgPSBuZXdOb2RlLml0ZW1zLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICBsZXQgc3ViSXRlbSA9IG5ld05vZGUuaXRlbXNbaV07XG4gICAgICAgICAgICBpZiAoaGFzT3duKHN1Ykl0ZW0sICdkYXRhUG9pbnRlcicpICYmXG4gICAgICAgICAgICAgIHN1Ykl0ZW0uZGF0YVBvaW50ZXIuc2xpY2UoMCwgaXRlbVJlZlBvaW50ZXIubGVuZ3RoKSA9PT0gaXRlbVJlZlBvaW50ZXJcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICBsZXQgYXJyYXlJdGVtID0gbmV3Tm9kZS5pdGVtcy5zcGxpY2UoaSwgMSlbMF07XG4gICAgICAgICAgICAgIGFycmF5SXRlbS5kYXRhUG9pbnRlciA9IG5ld05vZGUuZGF0YVBvaW50ZXIgKyAnLy0nICtcbiAgICAgICAgICAgICAgICBhcnJheUl0ZW0uZGF0YVBvaW50ZXIuc2xpY2UoaXRlbVJlZlBvaW50ZXIubGVuZ3RoKTtcbiAgICAgICAgICAgICAgYXJyYXlJdGVtR3JvdXAudW5zaGlmdChhcnJheUl0ZW0pO1xuICAgICAgICAgICAgICBuZXdJbmRleCsrO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgc3ViSXRlbS5hcnJheUl0ZW0gPSB0cnVlO1xuICAgICAgICAgICAgICAvLyBUT0RPOiBDaGVjayBzY2hlbWEgdG8gZ2V0IGFycmF5SXRlbVR5cGUgYW5kIHJlbW92YWJsZVxuICAgICAgICAgICAgICBzdWJJdGVtLmFycmF5SXRlbVR5cGUgPSAnbGlzdCc7XG4gICAgICAgICAgICAgIHN1Ykl0ZW0ucmVtb3ZhYmxlID0gbmV3Tm9kZS5vcHRpb25zLnJlbW92YWJsZSAhPT0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChhcnJheUl0ZW1Hcm91cC5sZW5ndGgpIHtcbiAgICAgICAgICAgIG5ld05vZGUuaXRlbXMucHVzaCh7XG4gICAgICAgICAgICAgIF9pZDogXy51bmlxdWVJZCgpLFxuICAgICAgICAgICAgICBhcnJheUl0ZW06IHRydWUsXG4gICAgICAgICAgICAgIGFycmF5SXRlbVR5cGU6IG5ld05vZGUub3B0aW9ucy50dXBsZUl0ZW1zID4gbmV3Tm9kZS5pdGVtcy5sZW5ndGggP1xuICAgICAgICAgICAgICAgICd0dXBsZScgOiAnbGlzdCcsXG4gICAgICAgICAgICAgIGl0ZW1zOiBhcnJheUl0ZW1Hcm91cCxcbiAgICAgICAgICAgICAgb3B0aW9uczogeyByZW1vdmFibGU6IG5ld05vZGUub3B0aW9ucy5yZW1vdmFibGUgIT09IGZhbHNlLCB9LFxuICAgICAgICAgICAgICBkYXRhUG9pbnRlcjogbmV3Tm9kZS5kYXRhUG9pbnRlciArICcvLScsXG4gICAgICAgICAgICAgIHR5cGU6ICdzZWN0aW9uJyxcbiAgICAgICAgICAgICAgd2lkZ2V0OiB3aWRnZXRMaWJyYXJ5LmdldFdpZGdldCgnc2VjdGlvbicpLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIFRPRE86IEZpeCB0byBobmRsZSBtdWx0aXBsZSBpdGVtc1xuICAgICAgICAgIG5ld05vZGUuaXRlbXNbMF0uYXJyYXlJdGVtID0gdHJ1ZTtcbiAgICAgICAgICBpZiAoIW5ld05vZGUuaXRlbXNbMF0uZGF0YVBvaW50ZXIpIHtcbiAgICAgICAgICAgIG5ld05vZGUuaXRlbXNbMF0uZGF0YVBvaW50ZXIgPVxuICAgICAgICAgICAgICBKc29uUG9pbnRlci50b0dlbmVyaWNQb2ludGVyKGl0ZW1SZWZQb2ludGVyLCBqc2YuYXJyYXlNYXApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoIUpzb25Qb2ludGVyLmhhcyhuZXdOb2RlLCAnL2l0ZW1zLzAvb3B0aW9ucy9yZW1vdmFibGUnKSkge1xuICAgICAgICAgICAgbmV3Tm9kZS5pdGVtc1swXS5vcHRpb25zLnJlbW92YWJsZSA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChuZXdOb2RlLm9wdGlvbnMub3JkZXJhYmxlID09PSBmYWxzZSkge1xuICAgICAgICAgICAgbmV3Tm9kZS5pdGVtc1swXS5vcHRpb25zLm9yZGVyYWJsZSA9IGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgICBuZXdOb2RlLml0ZW1zWzBdLmFycmF5SXRlbVR5cGUgPVxuICAgICAgICAgICAgbmV3Tm9kZS5vcHRpb25zLnR1cGxlSXRlbXMgPyAndHVwbGUnIDogJ2xpc3QnO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzQXJyYXkobmV3Tm9kZS5pdGVtcykpIHtcbiAgICAgICAgICBjb25zdCBhcnJheUxpc3RJdGVtcyA9XG4gICAgICAgICAgICBuZXdOb2RlLml0ZW1zLmZpbHRlcihpdGVtID0+IGl0ZW0udHlwZSAhPT0gJyRyZWYnKS5sZW5ndGggLVxuICAgICAgICAgICAgICBuZXdOb2RlLm9wdGlvbnMudHVwbGVJdGVtcztcbiAgICAgICAgICBpZiAoYXJyYXlMaXN0SXRlbXMgPiBuZXdOb2RlLm9wdGlvbnMubGlzdEl0ZW1zKSB7XG4gICAgICAgICAgICBuZXdOb2RlLm9wdGlvbnMubGlzdEl0ZW1zID0gYXJyYXlMaXN0SXRlbXM7XG4gICAgICAgICAgICBub2RlRGF0YU1hcC5zZXQoJ2xpc3RJdGVtcycsIGFycmF5TGlzdEl0ZW1zKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWhhc093bihqc2YubGF5b3V0UmVmTGlicmFyeSwgaXRlbVJlZlBvaW50ZXIpKSB7XG4gICAgICAgICAganNmLmxheW91dFJlZkxpYnJhcnlbaXRlbVJlZlBvaW50ZXJdID1cbiAgICAgICAgICAgIF8uY2xvbmVEZWVwKG5ld05vZGUuaXRlbXNbbmV3Tm9kZS5pdGVtcy5sZW5ndGggLSAxXSk7XG4gICAgICAgICAgaWYgKHJlY3Vyc2l2ZSkge1xuICAgICAgICAgICAganNmLmxheW91dFJlZkxpYnJhcnlbaXRlbVJlZlBvaW50ZXJdLnJlY3Vyc2l2ZVJlZmVyZW5jZSA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIGZvckVhY2goanNmLmxheW91dFJlZkxpYnJhcnlbaXRlbVJlZlBvaW50ZXJdLCAoaXRlbSwga2V5KSA9PiB7XG4gICAgICAgICAgICBpZiAoaGFzT3duKGl0ZW0sICdfaWQnKSkgeyBpdGVtLl9pZCA9IG51bGw7IH1cbiAgICAgICAgICAgIGlmIChyZWN1cnNpdmUpIHtcbiAgICAgICAgICAgICAgaWYgKGhhc093bihpdGVtLCAnZGF0YVBvaW50ZXInKSkge1xuICAgICAgICAgICAgICAgIGl0ZW0uZGF0YVBvaW50ZXIgPSBpdGVtLmRhdGFQb2ludGVyLnNsaWNlKGl0ZW1SZWZQb2ludGVyLmxlbmd0aCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LCAndG9wLWRvd24nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEFkZCBhbnkgYWRkaXRpb25hbCBkZWZhdWx0IGl0ZW1zXG4gICAgICAgIGlmICghbmV3Tm9kZS5yZWN1cnNpdmVSZWZlcmVuY2UgfHwgbmV3Tm9kZS5vcHRpb25zLnJlcXVpcmVkKSB7XG4gICAgICAgICAgY29uc3QgYXJyYXlMZW5ndGggPSBNYXRoLm1pbihNYXRoLm1heChcbiAgICAgICAgICAgIG5ld05vZGUub3B0aW9ucy50dXBsZUl0ZW1zICsgbmV3Tm9kZS5vcHRpb25zLmxpc3RJdGVtcyxcbiAgICAgICAgICAgIGlzQXJyYXkobm9kZVZhbHVlKSA/IG5vZGVWYWx1ZS5sZW5ndGggOiAwXG4gICAgICAgICAgKSwgbmV3Tm9kZS5vcHRpb25zLm1heEl0ZW1zKTtcbiAgICAgICAgICBmb3IgKGxldCBpID0gbmV3Tm9kZS5pdGVtcy5sZW5ndGg7IGkgPCBhcnJheUxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBuZXdOb2RlLml0ZW1zLnB1c2goZ2V0TGF5b3V0Tm9kZSh7XG4gICAgICAgICAgICAgICRyZWY6IGl0ZW1SZWZQb2ludGVyLFxuICAgICAgICAgICAgICBkYXRhUG9pbnRlcjogbmV3Tm9kZS5kYXRhUG9pbnRlcixcbiAgICAgICAgICAgICAgcmVjdXJzaXZlUmVmZXJlbmNlOiBuZXdOb2RlLnJlY3Vyc2l2ZVJlZmVyZW5jZSxcbiAgICAgICAgICAgIH0sIGpzZiwgd2lkZ2V0TGlicmFyeSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIElmIG5lZWRlZCwgYWRkIGJ1dHRvbiB0byBhZGQgaXRlbXMgdG8gYXJyYXlcbiAgICAgICAgaWYgKG5ld05vZGUub3B0aW9ucy5hZGRhYmxlICE9PSBmYWxzZSAmJlxuICAgICAgICAgIG5ld05vZGUub3B0aW9ucy5taW5JdGVtcyA8IG5ld05vZGUub3B0aW9ucy5tYXhJdGVtcyAmJlxuICAgICAgICAgIChuZXdOb2RlLml0ZW1zW25ld05vZGUuaXRlbXMubGVuZ3RoIC0gMV0gfHwge30pLnR5cGUgIT09ICckcmVmJ1xuICAgICAgICApIHtcbiAgICAgICAgICBsZXQgYnV0dG9uVGV4dCA9ICdBZGQnO1xuICAgICAgICAgIGlmIChuZXdOb2RlLm9wdGlvbnMudGl0bGUpIHtcbiAgICAgICAgICAgIGlmICgvXmFkZFxcYi9pLnRlc3QobmV3Tm9kZS5vcHRpb25zLnRpdGxlKSkge1xuICAgICAgICAgICAgICBidXR0b25UZXh0ID0gbmV3Tm9kZS5vcHRpb25zLnRpdGxlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgYnV0dG9uVGV4dCArPSAnICcgKyBuZXdOb2RlLm9wdGlvbnMudGl0bGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIGlmIChuZXdOb2RlLm5hbWUgJiYgIS9eXFxkKyQvLnRlc3QobmV3Tm9kZS5uYW1lKSkge1xuICAgICAgICAgICAgaWYgKC9eYWRkXFxiL2kudGVzdChuZXdOb2RlLm5hbWUpKSB7XG4gICAgICAgICAgICAgIGJ1dHRvblRleHQgKz0gJyAnICsgZml4VGl0bGUobmV3Tm9kZS5uYW1lKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGJ1dHRvblRleHQgPSBmaXhUaXRsZShuZXdOb2RlLm5hbWUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gSWYgbmV3Tm9kZSBkb2Vzbid0IGhhdmUgYSB0aXRsZSwgbG9vayBmb3IgdGl0bGUgb2YgcGFyZW50IGFycmF5IGl0ZW1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgcGFyZW50U2NoZW1hID1cbiAgICAgICAgICAgICAgZ2V0RnJvbVNjaGVtYShqc2Yuc2NoZW1hLCBuZXdOb2RlLmRhdGFQb2ludGVyLCAncGFyZW50U2NoZW1hJyk7XG4gICAgICAgICAgICBpZiAoaGFzT3duKHBhcmVudFNjaGVtYSwgJ3RpdGxlJykpIHtcbiAgICAgICAgICAgICAgYnV0dG9uVGV4dCArPSAnIHRvICcgKyBwYXJlbnRTY2hlbWEudGl0bGU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBjb25zdCBwb2ludGVyQXJyYXkgPSBKc29uUG9pbnRlci5wYXJzZShuZXdOb2RlLmRhdGFQb2ludGVyKTtcbiAgICAgICAgICAgICAgYnV0dG9uVGV4dCArPSAnIHRvICcgKyBmaXhUaXRsZShwb2ludGVyQXJyYXlbcG9pbnRlckFycmF5Lmxlbmd0aCAtIDJdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgbmV3Tm9kZS5pdGVtcy5wdXNoKHtcbiAgICAgICAgICAgIF9pZDogXy51bmlxdWVJZCgpLFxuICAgICAgICAgICAgYXJyYXlJdGVtOiB0cnVlLFxuICAgICAgICAgICAgYXJyYXlJdGVtVHlwZTogJ2xpc3QnLFxuICAgICAgICAgICAgZGF0YVBvaW50ZXI6IG5ld05vZGUuZGF0YVBvaW50ZXIgKyAnLy0nLFxuICAgICAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgICBsaXN0SXRlbXM6IG5ld05vZGUub3B0aW9ucy5saXN0SXRlbXMsXG4gICAgICAgICAgICAgIG1heEl0ZW1zOiBuZXdOb2RlLm9wdGlvbnMubWF4SXRlbXMsXG4gICAgICAgICAgICAgIG1pbkl0ZW1zOiBuZXdOb2RlLm9wdGlvbnMubWluSXRlbXMsXG4gICAgICAgICAgICAgIHJlbW92YWJsZTogZmFsc2UsXG4gICAgICAgICAgICAgIHRpdGxlOiBidXR0b25UZXh0LFxuICAgICAgICAgICAgICB0dXBsZUl0ZW1zOiBuZXdOb2RlLm9wdGlvbnMudHVwbGVJdGVtcyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICByZWN1cnNpdmVSZWZlcmVuY2U6IHJlY3Vyc2l2ZSxcbiAgICAgICAgICAgIHR5cGU6ICckcmVmJyxcbiAgICAgICAgICAgIHdpZGdldDogd2lkZ2V0TGlicmFyeS5nZXRXaWRnZXQoJyRyZWYnKSxcbiAgICAgICAgICAgICRyZWY6IGl0ZW1SZWZQb2ludGVyLFxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGlmIChpc1N0cmluZyhKc29uUG9pbnRlci5nZXQobmV3Tm9kZSwgJy9zdHlsZS9hZGQnKSkpIHtcbiAgICAgICAgICAgIG5ld05vZGUuaXRlbXNbbmV3Tm9kZS5pdGVtcy5sZW5ndGggLSAxXS5vcHRpb25zLmZpZWxkU3R5bGUgPVxuICAgICAgICAgICAgICBuZXdOb2RlLnN0eWxlLmFkZDtcbiAgICAgICAgICAgIGRlbGV0ZSBuZXdOb2RlLnN0eWxlLmFkZDtcbiAgICAgICAgICAgIGlmIChpc0VtcHR5KG5ld05vZGUuc3R5bGUpKSB7IGRlbGV0ZSBuZXdOb2RlLnN0eWxlOyB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBuZXdOb2RlLmFycmF5SXRlbSA9IGZhbHNlO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoaGFzT3duKG5ld05vZGUsICd0eXBlJykgfHwgaGFzT3duKG5ld05vZGUsICdpdGVtcycpKSB7XG4gICAgICBjb25zdCBwYXJlbnRUeXBlOiBzdHJpbmcgPVxuICAgICAgICBKc29uUG9pbnRlci5nZXQoanNmLmxheW91dCwgbGF5b3V0UG9pbnRlciwgMCwgLTIpLnR5cGU7XG4gICAgICBpZiAoIWhhc093bihuZXdOb2RlLCAndHlwZScpKSB7XG4gICAgICAgIG5ld05vZGUudHlwZSA9XG4gICAgICAgICAgaW5BcnJheShwYXJlbnRUeXBlLCBbJ3RhYnMnLCAndGFiYXJyYXknXSkgPyAndGFiJyA6ICdhcnJheSc7XG4gICAgICB9XG4gICAgICBuZXdOb2RlLmFycmF5SXRlbSA9IHBhcmVudFR5cGUgPT09ICdhcnJheSc7XG4gICAgICBuZXdOb2RlLndpZGdldCA9IHdpZGdldExpYnJhcnkuZ2V0V2lkZ2V0KG5ld05vZGUudHlwZSk7XG4gICAgICB1cGRhdGVJbnB1dE9wdGlvbnMobmV3Tm9kZSwge30sIGpzZik7XG4gICAgfVxuICAgIGlmIChuZXdOb2RlLnR5cGUgPT09ICdzdWJtaXQnKSB7IGhhc1N1Ym1pdEJ1dHRvbiA9IHRydWU7IH1cbiAgICByZXR1cm4gbmV3Tm9kZTtcbiAgfSk7XG4gIGlmIChqc2YuaGFzUm9vdFJlZmVyZW5jZSkge1xuICAgIGNvbnN0IGZ1bGxMYXlvdXQgPSBfLmNsb25lRGVlcChmb3JtTGF5b3V0KTtcbiAgICBpZiAoZnVsbExheW91dFtmdWxsTGF5b3V0Lmxlbmd0aCAtIDFdLnR5cGUgPT09ICdzdWJtaXQnKSB7IGZ1bGxMYXlvdXQucG9wKCk7IH1cbiAgICBqc2YubGF5b3V0UmVmTGlicmFyeVsnJ10gPSB7XG4gICAgICBfaWQ6IG51bGwsXG4gICAgICBkYXRhUG9pbnRlcjogJycsXG4gICAgICBkYXRhVHlwZTogJ29iamVjdCcsXG4gICAgICBpdGVtczogZnVsbExheW91dCxcbiAgICAgIG5hbWU6ICcnLFxuICAgICAgb3B0aW9uczogXy5jbG9uZURlZXAoanNmLmZvcm1PcHRpb25zLmRlZmF1dFdpZGdldE9wdGlvbnMpLFxuICAgICAgcmVjdXJzaXZlUmVmZXJlbmNlOiB0cnVlLFxuICAgICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgICAgdHlwZTogJ3NlY3Rpb24nLFxuICAgICAgd2lkZ2V0OiB3aWRnZXRMaWJyYXJ5LmdldFdpZGdldCgnc2VjdGlvbicpLFxuICAgIH07XG4gIH1cbiAgaWYgKCFoYXNTdWJtaXRCdXR0b24pIHtcbiAgICBmb3JtTGF5b3V0LnB1c2goe1xuICAgICAgX2lkOiBfLnVuaXF1ZUlkKCksXG4gICAgICBvcHRpb25zOiB7IHRpdGxlOiAnU3VibWl0JyB9LFxuICAgICAgdHlwZTogJ3N1Ym1pdCcsXG4gICAgICB3aWRnZXQ6IHdpZGdldExpYnJhcnkuZ2V0V2lkZ2V0KCdzdWJtaXQnKSxcbiAgICB9KTtcbiAgfVxuICByZXR1cm4gZm9ybUxheW91dDtcbn1cblxuLyoqXG4gKiAnYnVpbGRMYXlvdXRGcm9tU2NoZW1hJyBmdW5jdGlvblxuICpcbiAqIC8vICAganNmIC1cbiAqIC8vICAgd2lkZ2V0TGlicmFyeSAtXG4gKiAvLyAgIG5vZGVWYWx1ZSAtXG4gKiAvLyAgeyBzdHJpbmcgPSAnJyB9IHNjaGVtYVBvaW50ZXIgLVxuICogLy8gIHsgc3RyaW5nID0gJycgfSBkYXRhUG9pbnRlciAtXG4gKiAvLyAgeyBib29sZWFuID0gZmFsc2UgfSBhcnJheUl0ZW0gLVxuICogLy8gIHsgc3RyaW5nID0gbnVsbCB9IGFycmF5SXRlbVR5cGUgLVxuICogLy8gIHsgYm9vbGVhbiA9IG51bGwgfSByZW1vdmFibGUgLVxuICogLy8gIHsgYm9vbGVhbiA9IGZhbHNlIH0gZm9yUmVmTGlicmFyeSAtXG4gKiAvLyAgeyBzdHJpbmcgPSAnJyB9IGRhdGFQb2ludGVyUHJlZml4IC1cbiAqIC8vIFxuICovXG5leHBvcnQgZnVuY3Rpb24gYnVpbGRMYXlvdXRGcm9tU2NoZW1hKFxuICBqc2YsIHdpZGdldExpYnJhcnksIG5vZGVWYWx1ZSA9IG51bGwsIHNjaGVtYVBvaW50ZXIgPSAnJyxcbiAgZGF0YVBvaW50ZXIgPSAnJywgYXJyYXlJdGVtID0gZmFsc2UsIGFycmF5SXRlbVR5cGU6IHN0cmluZyA9IG51bGwsXG4gIHJlbW92YWJsZTogYm9vbGVhbiA9IG51bGwsIGZvclJlZkxpYnJhcnkgPSBmYWxzZSwgZGF0YVBvaW50ZXJQcmVmaXggPSAnJ1xuKSB7XG4gIGNvbnN0IHNjaGVtYSA9IEpzb25Qb2ludGVyLmdldChqc2Yuc2NoZW1hLCBzY2hlbWFQb2ludGVyKTtcbiAgaWYgKCFoYXNPd24oc2NoZW1hLCAndHlwZScpICYmICFoYXNPd24oc2NoZW1hLCAnJHJlZicpICYmXG4gICAgIWhhc093bihzY2hlbWEsICd4LXNjaGVtYS1mb3JtJylcbiAgKSB7IHJldHVybiBudWxsOyB9XG4gIGNvbnN0IG5ld05vZGVUeXBlOiBzdHJpbmcgPSBnZXRJbnB1dFR5cGUoc2NoZW1hKTtcbiAgaWYgKCFpc0RlZmluZWQobm9kZVZhbHVlKSAmJiAoXG4gICAganNmLmZvcm1PcHRpb25zLnNldFNjaGVtYURlZmF1bHRzID09PSB0cnVlIHx8XG4gICAgKGpzZi5mb3JtT3B0aW9ucy5zZXRTY2hlbWFEZWZhdWx0cyA9PT0gJ2F1dG8nICYmIGlzRW1wdHkoanNmLmZvcm1WYWx1ZXMpKVxuICApKSB7XG4gICAgbm9kZVZhbHVlID0gSnNvblBvaW50ZXIuZ2V0KGpzZi5zY2hlbWEsIHNjaGVtYVBvaW50ZXIgKyAnL2RlZmF1bHQnKTtcbiAgfVxuICBsZXQgbmV3Tm9kZTogYW55ID0ge1xuICAgIF9pZDogZm9yUmVmTGlicmFyeSA/IG51bGwgOiBfLnVuaXF1ZUlkKCksXG4gICAgYXJyYXlJdGVtOiBhcnJheUl0ZW0sXG4gICAgZGF0YVBvaW50ZXI6IEpzb25Qb2ludGVyLnRvR2VuZXJpY1BvaW50ZXIoZGF0YVBvaW50ZXIsIGpzZi5hcnJheU1hcCksXG4gICAgZGF0YVR5cGU6IHNjaGVtYS50eXBlIHx8IChoYXNPd24oc2NoZW1hLCAnJHJlZicpID8gJyRyZWYnIDogbnVsbCksXG4gICAgb3B0aW9uczoge30sXG4gICAgcmVxdWlyZWQ6IGlzSW5wdXRSZXF1aXJlZChqc2Yuc2NoZW1hLCBzY2hlbWFQb2ludGVyKSxcbiAgICB0eXBlOiBuZXdOb2RlVHlwZSxcbiAgICB3aWRnZXQ6IHdpZGdldExpYnJhcnkuZ2V0V2lkZ2V0KG5ld05vZGVUeXBlKSxcbiAgfTtcbiAgY29uc3QgbGFzdERhdGFLZXkgPSBKc29uUG9pbnRlci50b0tleShuZXdOb2RlLmRhdGFQb2ludGVyKTtcbiAgaWYgKGxhc3REYXRhS2V5ICE9PSAnLScpIHsgbmV3Tm9kZS5uYW1lID0gbGFzdERhdGFLZXk7IH1cbiAgaWYgKG5ld05vZGUuYXJyYXlJdGVtKSB7XG4gICAgbmV3Tm9kZS5hcnJheUl0ZW1UeXBlID0gYXJyYXlJdGVtVHlwZTtcbiAgICBuZXdOb2RlLm9wdGlvbnMucmVtb3ZhYmxlID0gcmVtb3ZhYmxlICE9PSBmYWxzZTtcbiAgfVxuICBjb25zdCBzaG9ydERhdGFQb2ludGVyID0gcmVtb3ZlUmVjdXJzaXZlUmVmZXJlbmNlcyhcbiAgICBkYXRhUG9pbnRlclByZWZpeCArIGRhdGFQb2ludGVyLCBqc2YuZGF0YVJlY3Vyc2l2ZVJlZk1hcCwganNmLmFycmF5TWFwXG4gICk7XG4gIGNvbnN0IHJlY3Vyc2l2ZSA9ICFzaG9ydERhdGFQb2ludGVyLmxlbmd0aCB8fFxuICAgIHNob3J0RGF0YVBvaW50ZXIgIT09IGRhdGFQb2ludGVyUHJlZml4ICsgZGF0YVBvaW50ZXI7XG4gIGlmICghanNmLmRhdGFNYXAuaGFzKHNob3J0RGF0YVBvaW50ZXIpKSB7XG4gICAganNmLmRhdGFNYXAuc2V0KHNob3J0RGF0YVBvaW50ZXIsIG5ldyBNYXAoKSk7XG4gIH1cbiAgY29uc3Qgbm9kZURhdGFNYXAgPSBqc2YuZGF0YU1hcC5nZXQoc2hvcnREYXRhUG9pbnRlcik7XG4gIGlmICghbm9kZURhdGFNYXAuaGFzKCdpbnB1dFR5cGUnKSkge1xuICAgIG5vZGVEYXRhTWFwLnNldCgnc2NoZW1hUG9pbnRlcicsIHNjaGVtYVBvaW50ZXIpO1xuICAgIG5vZGVEYXRhTWFwLnNldCgnaW5wdXRUeXBlJywgbmV3Tm9kZS50eXBlKTtcbiAgICBub2RlRGF0YU1hcC5zZXQoJ3dpZGdldCcsIG5ld05vZGUud2lkZ2V0KTtcbiAgICBub2RlRGF0YU1hcC5zZXQoJ2Rpc2FibGVkJywgISFuZXdOb2RlLm9wdGlvbnMuZGlzYWJsZWQpO1xuICB9XG4gIHVwZGF0ZUlucHV0T3B0aW9ucyhuZXdOb2RlLCBzY2hlbWEsIGpzZik7XG4gIGlmICghbmV3Tm9kZS5vcHRpb25zLnRpdGxlICYmIG5ld05vZGUubmFtZSAmJiAhL15cXGQrJC8udGVzdChuZXdOb2RlLm5hbWUpKSB7XG4gICAgbmV3Tm9kZS5vcHRpb25zLnRpdGxlID0gZml4VGl0bGUobmV3Tm9kZS5uYW1lKTtcbiAgfVxuXG4gIGlmIChuZXdOb2RlLmRhdGFUeXBlID09PSAnb2JqZWN0Jykge1xuICAgIGlmIChpc0FycmF5KHNjaGVtYS5yZXF1aXJlZCkgJiYgIW5vZGVEYXRhTWFwLmhhcygncmVxdWlyZWQnKSkge1xuICAgICAgbm9kZURhdGFNYXAuc2V0KCdyZXF1aXJlZCcsIHNjaGVtYS5yZXF1aXJlZCk7XG4gICAgfVxuICAgIGlmIChpc09iamVjdChzY2hlbWEucHJvcGVydGllcykpIHtcbiAgICAgIGNvbnN0IG5ld1NlY3Rpb246IGFueVtdID0gW107XG4gICAgICBjb25zdCBwcm9wZXJ0eUtleXMgPSBzY2hlbWFbJ3VpOm9yZGVyJ10gfHwgT2JqZWN0LmtleXMoc2NoZW1hLnByb3BlcnRpZXMpO1xuICAgICAgaWYgKHByb3BlcnR5S2V5cy5pbmNsdWRlcygnKicpICYmICFoYXNPd24oc2NoZW1hLnByb3BlcnRpZXMsICcqJykpIHtcbiAgICAgICAgY29uc3QgdW5uYW1lZEtleXMgPSBPYmplY3Qua2V5cyhzY2hlbWEucHJvcGVydGllcylcbiAgICAgICAgICAuZmlsdGVyKGtleSA9PiAhcHJvcGVydHlLZXlzLmluY2x1ZGVzKGtleSkpO1xuICAgICAgICBmb3IgKGxldCBpID0gcHJvcGVydHlLZXlzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgaWYgKHByb3BlcnR5S2V5c1tpXSA9PT0gJyonKSB7XG4gICAgICAgICAgICBwcm9wZXJ0eUtleXMuc3BsaWNlKGksIDEsIC4uLnVubmFtZWRLZXlzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHByb3BlcnR5S2V5c1xuICAgICAgICAuZmlsdGVyKGtleSA9PiBoYXNPd24oc2NoZW1hLnByb3BlcnRpZXMsIGtleSkgfHxcbiAgICAgICAgICBoYXNPd24oc2NoZW1hLCAnYWRkaXRpb25hbFByb3BlcnRpZXMnKVxuICAgICAgICApXG4gICAgICAgIC5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgICAgY29uc3Qga2V5U2NoZW1hUG9pbnRlciA9IGhhc093bihzY2hlbWEucHJvcGVydGllcywga2V5KSA/XG4gICAgICAgICAgICAnL3Byb3BlcnRpZXMvJyArIGtleSA6ICcvYWRkaXRpb25hbFByb3BlcnRpZXMnO1xuICAgICAgICAgIGNvbnN0IGlubmVySXRlbSA9IGJ1aWxkTGF5b3V0RnJvbVNjaGVtYShcbiAgICAgICAgICAgIGpzZiwgd2lkZ2V0TGlicmFyeSwgaXNPYmplY3Qobm9kZVZhbHVlKSA/IG5vZGVWYWx1ZVtrZXldIDogbnVsbCxcbiAgICAgICAgICAgIHNjaGVtYVBvaW50ZXIgKyBrZXlTY2hlbWFQb2ludGVyLFxuICAgICAgICAgICAgZGF0YVBvaW50ZXIgKyAnLycgKyBrZXksXG4gICAgICAgICAgICBmYWxzZSwgbnVsbCwgbnVsbCwgZm9yUmVmTGlicmFyeSwgZGF0YVBvaW50ZXJQcmVmaXhcbiAgICAgICAgICApO1xuICAgICAgICAgIGlmIChpbm5lckl0ZW0pIHtcbiAgICAgICAgICAgIGlmIChpc0lucHV0UmVxdWlyZWQoc2NoZW1hLCAnLycgKyBrZXkpKSB7XG4gICAgICAgICAgICAgIGlubmVySXRlbS5vcHRpb25zLnJlcXVpcmVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAganNmLmZpZWxkc1JlcXVpcmVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG5ld1NlY3Rpb24ucHVzaChpbm5lckl0ZW0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICBpZiAoZGF0YVBvaW50ZXIgPT09ICcnICYmICFmb3JSZWZMaWJyYXJ5KSB7XG4gICAgICAgIG5ld05vZGUgPSBuZXdTZWN0aW9uO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbmV3Tm9kZS5pdGVtcyA9IG5ld1NlY3Rpb247XG4gICAgICB9XG4gICAgfVxuICAgIC8vIFRPRE86IEFkZCBwYXR0ZXJuUHJvcGVydGllcyBhbmQgYWRkaXRpb25hbFByb3BlcnRpZXMgaW5wdXRzP1xuICAgIC8vIC4uLiBwb3NzaWJseSBwcm92aWRlIGEgd2F5IHRvIGVudGVyIGJvdGgga2V5IG5hbWVzIGFuZCB2YWx1ZXM/XG4gICAgLy8gaWYgKGlzT2JqZWN0KHNjaGVtYS5wYXR0ZXJuUHJvcGVydGllcykpIHsgfVxuICAgIC8vIGlmIChpc09iamVjdChzY2hlbWEuYWRkaXRpb25hbFByb3BlcnRpZXMpKSB7IH1cblxuICB9IGVsc2UgaWYgKG5ld05vZGUuZGF0YVR5cGUgPT09ICdhcnJheScpIHtcbiAgICBuZXdOb2RlLml0ZW1zID0gW107XG4gICAgbGV0IHRlbXBsYXRlQXJyYXk6IGFueVtdID0gW107XG4gICAgbmV3Tm9kZS5vcHRpb25zLm1heEl0ZW1zID0gTWF0aC5taW4oXG4gICAgICBzY2hlbWEubWF4SXRlbXMgfHwgMTAwMCwgbmV3Tm9kZS5vcHRpb25zLm1heEl0ZW1zIHx8IDEwMDBcbiAgICApO1xuICAgIG5ld05vZGUub3B0aW9ucy5taW5JdGVtcyA9IE1hdGgubWF4KFxuICAgICAgc2NoZW1hLm1pbkl0ZW1zIHx8IDAsIG5ld05vZGUub3B0aW9ucy5taW5JdGVtcyB8fCAwXG4gICAgKTtcbiAgICBpZiAoIW5ld05vZGUub3B0aW9ucy5taW5JdGVtcyAmJiBpc0lucHV0UmVxdWlyZWQoanNmLnNjaGVtYSwgc2NoZW1hUG9pbnRlcikpIHtcbiAgICAgIG5ld05vZGUub3B0aW9ucy5taW5JdGVtcyA9IDE7XG4gICAgfVxuICAgIGlmICghaGFzT3duKG5ld05vZGUub3B0aW9ucywgJ2xpc3RJdGVtcycpKSB7IG5ld05vZGUub3B0aW9ucy5saXN0SXRlbXMgPSAxOyB9XG4gICAgbmV3Tm9kZS5vcHRpb25zLnR1cGxlSXRlbXMgPSBpc0FycmF5KHNjaGVtYS5pdGVtcykgPyBzY2hlbWEuaXRlbXMubGVuZ3RoIDogMDtcbiAgICBpZiAobmV3Tm9kZS5vcHRpb25zLm1heEl0ZW1zIDw9IG5ld05vZGUub3B0aW9ucy50dXBsZUl0ZW1zKSB7XG4gICAgICBuZXdOb2RlLm9wdGlvbnMudHVwbGVJdGVtcyA9IG5ld05vZGUub3B0aW9ucy5tYXhJdGVtcztcbiAgICAgIG5ld05vZGUub3B0aW9ucy5saXN0SXRlbXMgPSAwO1xuICAgIH0gZWxzZSBpZiAobmV3Tm9kZS5vcHRpb25zLm1heEl0ZW1zIDxcbiAgICAgIG5ld05vZGUub3B0aW9ucy50dXBsZUl0ZW1zICsgbmV3Tm9kZS5vcHRpb25zLmxpc3RJdGVtc1xuICAgICkge1xuICAgICAgbmV3Tm9kZS5vcHRpb25zLmxpc3RJdGVtcyA9IG5ld05vZGUub3B0aW9ucy5tYXhJdGVtcyAtIG5ld05vZGUub3B0aW9ucy50dXBsZUl0ZW1zO1xuICAgIH0gZWxzZSBpZiAobmV3Tm9kZS5vcHRpb25zLm1pbkl0ZW1zID5cbiAgICAgIG5ld05vZGUub3B0aW9ucy50dXBsZUl0ZW1zICsgbmV3Tm9kZS5vcHRpb25zLmxpc3RJdGVtc1xuICAgICkge1xuICAgICAgbmV3Tm9kZS5vcHRpb25zLmxpc3RJdGVtcyA9IG5ld05vZGUub3B0aW9ucy5taW5JdGVtcyAtIG5ld05vZGUub3B0aW9ucy50dXBsZUl0ZW1zO1xuICAgIH1cbiAgICBpZiAoIW5vZGVEYXRhTWFwLmhhcygnbWF4SXRlbXMnKSkge1xuICAgICAgbm9kZURhdGFNYXAuc2V0KCdtYXhJdGVtcycsIG5ld05vZGUub3B0aW9ucy5tYXhJdGVtcyk7XG4gICAgICBub2RlRGF0YU1hcC5zZXQoJ21pbkl0ZW1zJywgbmV3Tm9kZS5vcHRpb25zLm1pbkl0ZW1zKTtcbiAgICAgIG5vZGVEYXRhTWFwLnNldCgndHVwbGVJdGVtcycsIG5ld05vZGUub3B0aW9ucy50dXBsZUl0ZW1zKTtcbiAgICAgIG5vZGVEYXRhTWFwLnNldCgnbGlzdEl0ZW1zJywgbmV3Tm9kZS5vcHRpb25zLmxpc3RJdGVtcyk7XG4gICAgfVxuICAgIGlmICghanNmLmFycmF5TWFwLmhhcyhzaG9ydERhdGFQb2ludGVyKSkge1xuICAgICAganNmLmFycmF5TWFwLnNldChzaG9ydERhdGFQb2ludGVyLCBuZXdOb2RlLm9wdGlvbnMudHVwbGVJdGVtcylcbiAgICB9XG4gICAgcmVtb3ZhYmxlID0gbmV3Tm9kZS5vcHRpb25zLnJlbW92YWJsZSAhPT0gZmFsc2U7XG4gICAgbGV0IGFkZGl0aW9uYWxJdGVtc1NjaGVtYVBvaW50ZXI6IHN0cmluZyA9IG51bGw7XG5cbiAgICAvLyBJZiAnaXRlbXMnIGlzIGFuIGFycmF5ID0gdHVwbGUgaXRlbXNcbiAgICBpZiAoaXNBcnJheShzY2hlbWEuaXRlbXMpKSB7XG4gICAgICBuZXdOb2RlLml0ZW1zID0gW107XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5ld05vZGUub3B0aW9ucy50dXBsZUl0ZW1zOyBpKyspIHtcbiAgICAgICAgbGV0IG5ld0l0ZW06IGFueTtcbiAgICAgICAgY29uc3QgaXRlbVJlZlBvaW50ZXIgPSByZW1vdmVSZWN1cnNpdmVSZWZlcmVuY2VzKFxuICAgICAgICAgIHNob3J0RGF0YVBvaW50ZXIgKyAnLycgKyBpLCBqc2YuZGF0YVJlY3Vyc2l2ZVJlZk1hcCwganNmLmFycmF5TWFwXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IGl0ZW1SZWN1cnNpdmUgPSAhaXRlbVJlZlBvaW50ZXIubGVuZ3RoIHx8XG4gICAgICAgICAgaXRlbVJlZlBvaW50ZXIgIT09IHNob3J0RGF0YVBvaW50ZXIgKyAnLycgKyBpO1xuXG4gICAgICAgIC8vIElmIHJlbW92YWJsZSwgYWRkIHR1cGxlIGl0ZW0gbGF5b3V0IHRvIGxheW91dFJlZkxpYnJhcnlcbiAgICAgICAgaWYgKHJlbW92YWJsZSAmJiBpID49IG5ld05vZGUub3B0aW9ucy5taW5JdGVtcykge1xuICAgICAgICAgIGlmICghaGFzT3duKGpzZi5sYXlvdXRSZWZMaWJyYXJ5LCBpdGVtUmVmUG9pbnRlcikpIHtcbiAgICAgICAgICAgIC8vIFNldCB0byBudWxsIGZpcnN0IHRvIHByZXZlbnQgcmVjdXJzaXZlIHJlZmVyZW5jZSBmcm9tIGNhdXNpbmcgZW5kbGVzcyBsb29wXG4gICAgICAgICAgICBqc2YubGF5b3V0UmVmTGlicmFyeVtpdGVtUmVmUG9pbnRlcl0gPSBudWxsO1xuICAgICAgICAgICAganNmLmxheW91dFJlZkxpYnJhcnlbaXRlbVJlZlBvaW50ZXJdID0gYnVpbGRMYXlvdXRGcm9tU2NoZW1hKFxuICAgICAgICAgICAgICBqc2YsIHdpZGdldExpYnJhcnksIGlzQXJyYXkobm9kZVZhbHVlKSA/IG5vZGVWYWx1ZVtpXSA6IG51bGwsXG4gICAgICAgICAgICAgIHNjaGVtYVBvaW50ZXIgKyAnL2l0ZW1zLycgKyBpLFxuICAgICAgICAgICAgICBpdGVtUmVjdXJzaXZlID8gJycgOiBkYXRhUG9pbnRlciArICcvJyArIGksXG4gICAgICAgICAgICAgIHRydWUsICd0dXBsZScsIHRydWUsIHRydWUsIGl0ZW1SZWN1cnNpdmUgPyBkYXRhUG9pbnRlciArICcvJyArIGkgOiAnJ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGlmIChpdGVtUmVjdXJzaXZlKSB7XG4gICAgICAgICAgICAgIGpzZi5sYXlvdXRSZWZMaWJyYXJ5W2l0ZW1SZWZQb2ludGVyXS5yZWN1cnNpdmVSZWZlcmVuY2UgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBuZXdJdGVtID0gZ2V0TGF5b3V0Tm9kZSh7XG4gICAgICAgICAgICAkcmVmOiBpdGVtUmVmUG9pbnRlcixcbiAgICAgICAgICAgIGRhdGFQb2ludGVyOiBkYXRhUG9pbnRlciArICcvJyArIGksXG4gICAgICAgICAgICByZWN1cnNpdmVSZWZlcmVuY2U6IGl0ZW1SZWN1cnNpdmUsXG4gICAgICAgICAgfSwganNmLCB3aWRnZXRMaWJyYXJ5LCBpc0FycmF5KG5vZGVWYWx1ZSkgPyBub2RlVmFsdWVbaV0gOiBudWxsKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBuZXdJdGVtID0gYnVpbGRMYXlvdXRGcm9tU2NoZW1hKFxuICAgICAgICAgICAganNmLCB3aWRnZXRMaWJyYXJ5LCBpc0FycmF5KG5vZGVWYWx1ZSkgPyBub2RlVmFsdWVbaV0gOiBudWxsLFxuICAgICAgICAgICAgc2NoZW1hUG9pbnRlciArICcvaXRlbXMvJyArIGksXG4gICAgICAgICAgICBkYXRhUG9pbnRlciArICcvJyArIGksXG4gICAgICAgICAgICB0cnVlLCAndHVwbGUnLCBmYWxzZSwgZm9yUmVmTGlicmFyeSwgZGF0YVBvaW50ZXJQcmVmaXhcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChuZXdJdGVtKSB7IG5ld05vZGUuaXRlbXMucHVzaChuZXdJdGVtKTsgfVxuICAgICAgfVxuXG4gICAgICAvLyBJZiAnYWRkaXRpb25hbEl0ZW1zJyBpcyBhbiBvYmplY3QgPSBhZGRpdGlvbmFsIGxpc3QgaXRlbXMsIGFmdGVyIHR1cGxlIGl0ZW1zXG4gICAgICBpZiAoaXNPYmplY3Qoc2NoZW1hLmFkZGl0aW9uYWxJdGVtcykpIHtcbiAgICAgICAgYWRkaXRpb25hbEl0ZW1zU2NoZW1hUG9pbnRlciA9IHNjaGVtYVBvaW50ZXIgKyAnL2FkZGl0aW9uYWxJdGVtcyc7XG4gICAgICB9XG5cbiAgICAvLyBJZiAnaXRlbXMnIGlzIGFuIG9iamVjdCA9IGxpc3QgaXRlbXMgb25seSAobm8gdHVwbGUgaXRlbXMpXG4gICAgfSBlbHNlIGlmIChpc09iamVjdChzY2hlbWEuaXRlbXMpKSB7XG4gICAgICBhZGRpdGlvbmFsSXRlbXNTY2hlbWFQb2ludGVyID0gc2NoZW1hUG9pbnRlciArICcvaXRlbXMnO1xuICAgIH1cblxuICAgIGlmIChhZGRpdGlvbmFsSXRlbXNTY2hlbWFQb2ludGVyKSB7XG4gICAgICBjb25zdCBpdGVtUmVmUG9pbnRlciA9IHJlbW92ZVJlY3Vyc2l2ZVJlZmVyZW5jZXMoXG4gICAgICAgIHNob3J0RGF0YVBvaW50ZXIgKyAnLy0nLCBqc2YuZGF0YVJlY3Vyc2l2ZVJlZk1hcCwganNmLmFycmF5TWFwXG4gICAgICApO1xuICAgICAgY29uc3QgaXRlbVJlY3Vyc2l2ZSA9ICFpdGVtUmVmUG9pbnRlci5sZW5ndGggfHxcbiAgICAgICAgaXRlbVJlZlBvaW50ZXIgIT09IHNob3J0RGF0YVBvaW50ZXIgKyAnLy0nO1xuICAgICAgY29uc3QgaXRlbVNjaGVtYVBvaW50ZXIgPSByZW1vdmVSZWN1cnNpdmVSZWZlcmVuY2VzKFxuICAgICAgICBhZGRpdGlvbmFsSXRlbXNTY2hlbWFQb2ludGVyLCBqc2Yuc2NoZW1hUmVjdXJzaXZlUmVmTWFwLCBqc2YuYXJyYXlNYXBcbiAgICAgICk7XG4gICAgICAvLyBBZGQgbGlzdCBpdGVtIGxheW91dCB0byBsYXlvdXRSZWZMaWJyYXJ5XG4gICAgICBpZiAoaXRlbVJlZlBvaW50ZXIubGVuZ3RoICYmICFoYXNPd24oanNmLmxheW91dFJlZkxpYnJhcnksIGl0ZW1SZWZQb2ludGVyKSkge1xuICAgICAgICAvLyBTZXQgdG8gbnVsbCBmaXJzdCB0byBwcmV2ZW50IHJlY3Vyc2l2ZSByZWZlcmVuY2UgZnJvbSBjYXVzaW5nIGVuZGxlc3MgbG9vcFxuICAgICAgICBqc2YubGF5b3V0UmVmTGlicmFyeVtpdGVtUmVmUG9pbnRlcl0gPSBudWxsO1xuICAgICAgICBqc2YubGF5b3V0UmVmTGlicmFyeVtpdGVtUmVmUG9pbnRlcl0gPSBidWlsZExheW91dEZyb21TY2hlbWEoXG4gICAgICAgICAganNmLCB3aWRnZXRMaWJyYXJ5LCBudWxsLFxuICAgICAgICAgIGl0ZW1TY2hlbWFQb2ludGVyLFxuICAgICAgICAgIGl0ZW1SZWN1cnNpdmUgPyAnJyA6IGRhdGFQb2ludGVyICsgJy8tJyxcbiAgICAgICAgICB0cnVlLCAnbGlzdCcsIHJlbW92YWJsZSwgdHJ1ZSwgaXRlbVJlY3Vyc2l2ZSA/IGRhdGFQb2ludGVyICsgJy8tJyA6ICcnXG4gICAgICAgICk7XG4gICAgICAgIGlmIChpdGVtUmVjdXJzaXZlKSB7XG4gICAgICAgICAganNmLmxheW91dFJlZkxpYnJhcnlbaXRlbVJlZlBvaW50ZXJdLnJlY3Vyc2l2ZVJlZmVyZW5jZSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gQWRkIGFueSBhZGRpdGlvbmFsIGRlZmF1bHQgaXRlbXNcbiAgICAgIGlmICghaXRlbVJlY3Vyc2l2ZSB8fCBuZXdOb2RlLm9wdGlvbnMucmVxdWlyZWQpIHtcbiAgICAgICAgY29uc3QgYXJyYXlMZW5ndGggPSBNYXRoLm1pbihNYXRoLm1heChcbiAgICAgICAgICBpdGVtUmVjdXJzaXZlID8gMCA6XG4gICAgICAgICAgICBuZXdOb2RlLm9wdGlvbnMudHVwbGVJdGVtcyArIG5ld05vZGUub3B0aW9ucy5saXN0SXRlbXMsXG4gICAgICAgICAgaXNBcnJheShub2RlVmFsdWUpID8gbm9kZVZhbHVlLmxlbmd0aCA6IDBcbiAgICAgICAgKSwgbmV3Tm9kZS5vcHRpb25zLm1heEl0ZW1zKTtcbiAgICAgICAgaWYgKG5ld05vZGUuaXRlbXMubGVuZ3RoIDwgYXJyYXlMZW5ndGgpIHtcbiAgICAgICAgICBmb3IgKGxldCBpID0gbmV3Tm9kZS5pdGVtcy5sZW5ndGg7IGkgPCBhcnJheUxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBuZXdOb2RlLml0ZW1zLnB1c2goZ2V0TGF5b3V0Tm9kZSh7XG4gICAgICAgICAgICAgICRyZWY6IGl0ZW1SZWZQb2ludGVyLFxuICAgICAgICAgICAgICBkYXRhUG9pbnRlcjogZGF0YVBvaW50ZXIgKyAnLy0nLFxuICAgICAgICAgICAgICByZWN1cnNpdmVSZWZlcmVuY2U6IGl0ZW1SZWN1cnNpdmUsXG4gICAgICAgICAgICB9LCBqc2YsIHdpZGdldExpYnJhcnksIGlzQXJyYXkobm9kZVZhbHVlKSA/IG5vZGVWYWx1ZVtpXSA6IG51bGwpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gSWYgbmVlZGVkLCBhZGQgYnV0dG9uIHRvIGFkZCBpdGVtcyB0byBhcnJheVxuICAgICAgaWYgKG5ld05vZGUub3B0aW9ucy5hZGRhYmxlICE9PSBmYWxzZSAmJlxuICAgICAgICBuZXdOb2RlLm9wdGlvbnMubWluSXRlbXMgPCBuZXdOb2RlLm9wdGlvbnMubWF4SXRlbXMgJiZcbiAgICAgICAgKG5ld05vZGUuaXRlbXNbbmV3Tm9kZS5pdGVtcy5sZW5ndGggLSAxXSB8fCB7fSkudHlwZSAhPT0gJyRyZWYnXG4gICAgICApIHtcbiAgICAgICAgbGV0IGJ1dHRvblRleHQgPVxuICAgICAgICAgICgoanNmLmxheW91dFJlZkxpYnJhcnlbaXRlbVJlZlBvaW50ZXJdIHx8IHt9KS5vcHRpb25zIHx8IHt9KS50aXRsZTtcbiAgICAgICAgY29uc3QgcHJlZml4ID0gYnV0dG9uVGV4dCA/ICdBZGQgJyA6ICdBZGQgdG8gJztcbiAgICAgICAgaWYgKCFidXR0b25UZXh0KSB7XG4gICAgICAgICAgYnV0dG9uVGV4dCA9IHNjaGVtYS50aXRsZSB8fCBmaXhUaXRsZShKc29uUG9pbnRlci50b0tleShkYXRhUG9pbnRlcikpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghL15hZGRcXGIvaS50ZXN0KGJ1dHRvblRleHQpKSB7IGJ1dHRvblRleHQgPSBwcmVmaXggKyBidXR0b25UZXh0OyB9XG4gICAgICAgIG5ld05vZGUuaXRlbXMucHVzaCh7XG4gICAgICAgICAgX2lkOiBfLnVuaXF1ZUlkKCksXG4gICAgICAgICAgYXJyYXlJdGVtOiB0cnVlLFxuICAgICAgICAgIGFycmF5SXRlbVR5cGU6ICdsaXN0JyxcbiAgICAgICAgICBkYXRhUG9pbnRlcjogbmV3Tm9kZS5kYXRhUG9pbnRlciArICcvLScsXG4gICAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgbGlzdEl0ZW1zOiBuZXdOb2RlLm9wdGlvbnMubGlzdEl0ZW1zLFxuICAgICAgICAgICAgbWF4SXRlbXM6IG5ld05vZGUub3B0aW9ucy5tYXhJdGVtcyxcbiAgICAgICAgICAgIG1pbkl0ZW1zOiBuZXdOb2RlLm9wdGlvbnMubWluSXRlbXMsXG4gICAgICAgICAgICByZW1vdmFibGU6IGZhbHNlLFxuICAgICAgICAgICAgdGl0bGU6IGJ1dHRvblRleHQsXG4gICAgICAgICAgICB0dXBsZUl0ZW1zOiBuZXdOb2RlLm9wdGlvbnMudHVwbGVJdGVtcyxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHJlY3Vyc2l2ZVJlZmVyZW5jZTogaXRlbVJlY3Vyc2l2ZSxcbiAgICAgICAgICB0eXBlOiAnJHJlZicsXG4gICAgICAgICAgd2lkZ2V0OiB3aWRnZXRMaWJyYXJ5LmdldFdpZGdldCgnJHJlZicpLFxuICAgICAgICAgICRyZWY6IGl0ZW1SZWZQb2ludGVyLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgfSBlbHNlIGlmIChuZXdOb2RlLmRhdGFUeXBlID09PSAnJHJlZicpIHtcbiAgICBjb25zdCBzY2hlbWFSZWYgPSBKc29uUG9pbnRlci5jb21waWxlKHNjaGVtYS4kcmVmKTtcbiAgICBjb25zdCBkYXRhUmVmID0gSnNvblBvaW50ZXIudG9EYXRhUG9pbnRlcihzY2hlbWFSZWYsIGpzZi5zY2hlbWEpO1xuICAgIGxldCBidXR0b25UZXh0ID0gJyc7XG5cbiAgICAvLyBHZXQgbmV3Tm9kZSB0aXRsZVxuICAgIGlmIChuZXdOb2RlLm9wdGlvbnMuYWRkKSB7XG4gICAgICBidXR0b25UZXh0ID0gbmV3Tm9kZS5vcHRpb25zLmFkZDtcbiAgICB9IGVsc2UgaWYgKG5ld05vZGUubmFtZSAmJiAhL15cXGQrJC8udGVzdChuZXdOb2RlLm5hbWUpKSB7XG4gICAgICBidXR0b25UZXh0ID1cbiAgICAgICAgKC9eYWRkXFxiL2kudGVzdChuZXdOb2RlLm5hbWUpID8gJycgOiAnQWRkICcpICsgZml4VGl0bGUobmV3Tm9kZS5uYW1lKTtcblxuICAgIC8vIElmIG5ld05vZGUgZG9lc24ndCBoYXZlIGEgdGl0bGUsIGxvb2sgZm9yIHRpdGxlIG9mIHBhcmVudCBhcnJheSBpdGVtXG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHBhcmVudFNjaGVtYSA9XG4gICAgICAgIEpzb25Qb2ludGVyLmdldChqc2Yuc2NoZW1hLCBzY2hlbWFQb2ludGVyLCAwLCAtMSk7XG4gICAgICBpZiAoaGFzT3duKHBhcmVudFNjaGVtYSwgJ3RpdGxlJykpIHtcbiAgICAgICAgYnV0dG9uVGV4dCA9ICdBZGQgdG8gJyArIHBhcmVudFNjaGVtYS50aXRsZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHBvaW50ZXJBcnJheSA9IEpzb25Qb2ludGVyLnBhcnNlKG5ld05vZGUuZGF0YVBvaW50ZXIpO1xuICAgICAgICBidXR0b25UZXh0ID0gJ0FkZCB0byAnICsgZml4VGl0bGUocG9pbnRlckFycmF5W3BvaW50ZXJBcnJheS5sZW5ndGggLSAyXSk7XG4gICAgICB9XG4gICAgfVxuICAgIE9iamVjdC5hc3NpZ24obmV3Tm9kZSwge1xuICAgICAgcmVjdXJzaXZlUmVmZXJlbmNlOiB0cnVlLFxuICAgICAgd2lkZ2V0OiB3aWRnZXRMaWJyYXJ5LmdldFdpZGdldCgnJHJlZicpLFxuICAgICAgJHJlZjogZGF0YVJlZixcbiAgICB9KTtcbiAgICBPYmplY3QuYXNzaWduKG5ld05vZGUub3B0aW9ucywge1xuICAgICAgcmVtb3ZhYmxlOiBmYWxzZSxcbiAgICAgIHRpdGxlOiBidXR0b25UZXh0LFxuICAgIH0pO1xuICAgIGlmIChpc051bWJlcihKc29uUG9pbnRlci5nZXQoanNmLnNjaGVtYSwgc2NoZW1hUG9pbnRlciwgMCwgLTEpLm1heEl0ZW1zKSkge1xuICAgICAgbmV3Tm9kZS5vcHRpb25zLm1heEl0ZW1zID1cbiAgICAgICAgSnNvblBvaW50ZXIuZ2V0KGpzZi5zY2hlbWEsIHNjaGVtYVBvaW50ZXIsIDAsIC0xKS5tYXhJdGVtcztcbiAgICB9XG5cbiAgICAvLyBBZGQgbGF5b3V0IHRlbXBsYXRlIHRvIGxheW91dFJlZkxpYnJhcnlcbiAgICBpZiAoZGF0YVJlZi5sZW5ndGgpIHtcbiAgICAgIGlmICghaGFzT3duKGpzZi5sYXlvdXRSZWZMaWJyYXJ5LCBkYXRhUmVmKSkge1xuICAgICAgICAvLyBTZXQgdG8gbnVsbCBmaXJzdCB0byBwcmV2ZW50IHJlY3Vyc2l2ZSByZWZlcmVuY2UgZnJvbSBjYXVzaW5nIGVuZGxlc3MgbG9vcFxuICAgICAgICBqc2YubGF5b3V0UmVmTGlicmFyeVtkYXRhUmVmXSA9IG51bGw7XG4gICAgICAgIGNvbnN0IG5ld0xheW91dCA9IGJ1aWxkTGF5b3V0RnJvbVNjaGVtYShcbiAgICAgICAgICBqc2YsIHdpZGdldExpYnJhcnksIG51bGwsIHNjaGVtYVJlZiwgJycsXG4gICAgICAgICAgbmV3Tm9kZS5hcnJheUl0ZW0sIG5ld05vZGUuYXJyYXlJdGVtVHlwZSwgdHJ1ZSwgdHJ1ZSwgZGF0YVBvaW50ZXJcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKG5ld0xheW91dCkge1xuICAgICAgICAgIG5ld0xheW91dC5yZWN1cnNpdmVSZWZlcmVuY2UgPSB0cnVlO1xuICAgICAgICAgIGpzZi5sYXlvdXRSZWZMaWJyYXJ5W2RhdGFSZWZdID0gbmV3TGF5b3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGRlbGV0ZSBqc2YubGF5b3V0UmVmTGlicmFyeVtkYXRhUmVmXTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICghanNmLmxheW91dFJlZkxpYnJhcnlbZGF0YVJlZl0ucmVjdXJzaXZlUmVmZXJlbmNlKSB7XG4gICAgICAgIGpzZi5sYXlvdXRSZWZMaWJyYXJ5W2RhdGFSZWZdLnJlY3Vyc2l2ZVJlZmVyZW5jZSA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBuZXdOb2RlO1xufVxuXG4vKipcbiAqICdtYXBMYXlvdXQnIGZ1bmN0aW9uXG4gKlxuICogQ3JlYXRlcyBhIG5ldyBsYXlvdXQgYnkgcnVubmluZyBlYWNoIGVsZW1lbnQgaW4gYW4gZXhpc3RpbmcgbGF5b3V0IHRocm91Z2hcbiAqIGFuIGl0ZXJhdGVlLiBSZWN1cnNpdmVseSBtYXBzIHdpdGhpbiBhcnJheSBlbGVtZW50cyAnaXRlbXMnIGFuZCAndGFicycuXG4gKiBUaGUgaXRlcmF0ZWUgaXMgaW52b2tlZCB3aXRoIGZvdXIgYXJndW1lbnRzOiAodmFsdWUsIGluZGV4LCBsYXlvdXQsIHBhdGgpXG4gKlxuICogVGhlIHJldHVybmVkIGxheW91dCBtYXkgYmUgbG9uZ2VyIChvciBzaG9ydGVyKSB0aGVuIHRoZSBzb3VyY2UgbGF5b3V0LlxuICpcbiAqIElmIGFuIGl0ZW0gZnJvbSB0aGUgc291cmNlIGxheW91dCByZXR1cm5zIG11bHRpcGxlIGl0ZW1zIChhcyAnKicgdXN1YWxseSB3aWxsKSxcbiAqIHRoaXMgZnVuY3Rpb24gd2lsbCBrZWVwIGFsbCByZXR1cm5lZCBpdGVtcyBpbi1saW5lIHdpdGggdGhlIHN1cnJvdW5kaW5nIGl0ZW1zLlxuICpcbiAqIElmIGFuIGl0ZW0gZnJvbSB0aGUgc291cmNlIGxheW91dCBjYXVzZXMgYW4gZXJyb3IgYW5kIHJldHVybnMgbnVsbCwgaXQgaXNcbiAqIHNraXBwZWQgd2l0aG91dCBlcnJvciwgYW5kIHRoZSBmdW5jdGlvbiB3aWxsIHN0aWxsIHJldHVybiBhbGwgbm9uLW51bGwgaXRlbXMuXG4gKlxuICogLy8gICBsYXlvdXQgLSB0aGUgbGF5b3V0IHRvIG1hcFxuICogLy8gIHsgKHY6IGFueSwgaT86IG51bWJlciwgbD86IGFueSwgcD86IHN0cmluZykgPT4gYW55IH1cbiAqICAgZnVuY3Rpb24gLSB0aGUgZnVuY2l0b24gdG8gaW52b2tlIG9uIGVhY2ggZWxlbWVudFxuICogLy8gIHsgc3RyaW5nfHN0cmluZ1tdID0gJycgfSBsYXlvdXRQb2ludGVyIC0gdGhlIGxheW91dFBvaW50ZXIgdG8gbGF5b3V0LCBpbnNpZGUgcm9vdExheW91dFxuICogLy8gIHsgYW55W10gPSBsYXlvdXQgfSByb290TGF5b3V0IC0gdGhlIHJvb3QgbGF5b3V0LCB3aGljaCBjb25hdGlucyBsYXlvdXRcbiAqIC8vIFxuICovXG5leHBvcnQgZnVuY3Rpb24gbWFwTGF5b3V0KGxheW91dCwgZm4sIGxheW91dFBvaW50ZXIgPSAnJywgcm9vdExheW91dCA9IGxheW91dCkge1xuICBsZXQgaW5kZXhQYWQgPSAwO1xuICBsZXQgbmV3TGF5b3V0OiBhbnlbXSA9IFtdO1xuICBmb3JFYWNoKGxheW91dCwgKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgbGV0IHJlYWxJbmRleCA9ICtpbmRleCArIGluZGV4UGFkO1xuICAgIGxldCBuZXdMYXlvdXRQb2ludGVyID0gbGF5b3V0UG9pbnRlciArICcvJyArIHJlYWxJbmRleDtcbiAgICBsZXQgbmV3Tm9kZTogYW55ID0gY29weShpdGVtKTtcbiAgICBsZXQgaXRlbXNBcnJheTogYW55W10gPSBbXTtcbiAgICBpZiAoaXNPYmplY3QoaXRlbSkpIHtcbiAgICAgIGlmIChoYXNPd24oaXRlbSwgJ3RhYnMnKSkge1xuICAgICAgICBpdGVtLml0ZW1zID0gaXRlbS50YWJzO1xuICAgICAgICBkZWxldGUgaXRlbS50YWJzO1xuICAgICAgfVxuICAgICAgaWYgKGhhc093bihpdGVtLCAnaXRlbXMnKSkge1xuICAgICAgICBpdGVtc0FycmF5ID0gaXNBcnJheShpdGVtLml0ZW1zKSA/IGl0ZW0uaXRlbXMgOiBbaXRlbS5pdGVtc107XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChpdGVtc0FycmF5Lmxlbmd0aCkge1xuICAgICAgbmV3Tm9kZS5pdGVtcyA9IG1hcExheW91dChpdGVtc0FycmF5LCBmbiwgbmV3TGF5b3V0UG9pbnRlciArICcvaXRlbXMnLCByb290TGF5b3V0KTtcbiAgICB9XG4gICAgbmV3Tm9kZSA9IGZuKG5ld05vZGUsIHJlYWxJbmRleCwgbmV3TGF5b3V0UG9pbnRlciwgcm9vdExheW91dCk7XG4gICAgaWYgKCFpc0RlZmluZWQobmV3Tm9kZSkpIHtcbiAgICAgIGluZGV4UGFkLS07XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChpc0FycmF5KG5ld05vZGUpKSB7IGluZGV4UGFkICs9IG5ld05vZGUubGVuZ3RoIC0gMTsgfVxuICAgICAgbmV3TGF5b3V0ID0gbmV3TGF5b3V0LmNvbmNhdChuZXdOb2RlKTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gbmV3TGF5b3V0O1xufTtcblxuLyoqXG4gKiAnZ2V0TGF5b3V0Tm9kZScgZnVuY3Rpb25cbiAqIENvcHkgYSBuZXcgbGF5b3V0Tm9kZSBmcm9tIGxheW91dFJlZkxpYnJhcnlcbiAqXG4gKiAvLyAgIHJlZk5vZGUgLVxuICogLy8gICBsYXlvdXRSZWZMaWJyYXJ5IC1cbiAqIC8vICB7IGFueSA9IG51bGwgfSB3aWRnZXRMaWJyYXJ5IC1cbiAqIC8vICB7IGFueSA9IG51bGwgfSBub2RlVmFsdWUgLVxuICogLy8gIGNvcGllZCBsYXlvdXROb2RlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRMYXlvdXROb2RlKFxuICByZWZOb2RlLCBqc2YsIHdpZGdldExpYnJhcnk6IGFueSA9IG51bGwsIG5vZGVWYWx1ZTogYW55ID0gbnVsbFxuKSB7XG5cbiAgLy8gSWYgcmVjdXJzaXZlIHJlZmVyZW5jZSBhbmQgYnVpbGRpbmcgaW5pdGlhbCBsYXlvdXQsIHJldHVybiBBZGQgYnV0dG9uXG4gIGlmIChyZWZOb2RlLnJlY3Vyc2l2ZVJlZmVyZW5jZSAmJiB3aWRnZXRMaWJyYXJ5KSB7XG4gICAgY29uc3QgbmV3TGF5b3V0Tm9kZSA9IF8uY2xvbmVEZWVwKHJlZk5vZGUpO1xuICAgIGlmICghbmV3TGF5b3V0Tm9kZS5vcHRpb25zKSB7IG5ld0xheW91dE5vZGUub3B0aW9ucyA9IHt9OyB9XG4gICAgT2JqZWN0LmFzc2lnbihuZXdMYXlvdXROb2RlLCB7XG4gICAgICByZWN1cnNpdmVSZWZlcmVuY2U6IHRydWUsXG4gICAgICB3aWRnZXQ6IHdpZGdldExpYnJhcnkuZ2V0V2lkZ2V0KCckcmVmJyksXG4gICAgfSk7XG4gICAgT2JqZWN0LmFzc2lnbihuZXdMYXlvdXROb2RlLm9wdGlvbnMsIHtcbiAgICAgIHJlbW92YWJsZTogZmFsc2UsXG4gICAgICB0aXRsZTogJ0FkZCAnICsgbmV3TGF5b3V0Tm9kZS4kcmVmLFxuICAgIH0pO1xuICAgIHJldHVybiBuZXdMYXlvdXROb2RlO1xuXG4gIC8vIE90aGVyd2lzZSwgcmV0dXJuIHJlZmVyZW5jZWQgbGF5b3V0XG59IGVsc2Uge1xuICAgIGxldCBuZXdMYXlvdXROb2RlID0ganNmLmxheW91dFJlZkxpYnJhcnlbcmVmTm9kZS4kcmVmXTtcbiAgICAvLyBJZiB2YWx1ZSBkZWZpbmVkLCBidWlsZCBuZXcgbm9kZSBmcm9tIHNjaGVtYSAodG8gc2V0IGFycmF5IGxlbmd0aHMpXG4gICAgaWYgKGlzRGVmaW5lZChub2RlVmFsdWUpKSB7XG4gICAgICBuZXdMYXlvdXROb2RlID0gYnVpbGRMYXlvdXRGcm9tU2NoZW1hKFxuICAgICAgICBqc2YsIHdpZGdldExpYnJhcnksIG5vZGVWYWx1ZSxcbiAgICAgICAgSnNvblBvaW50ZXIudG9TY2hlbWFQb2ludGVyKHJlZk5vZGUuJHJlZiwganNmLnNjaGVtYSksXG4gICAgICAgIHJlZk5vZGUuJHJlZiwgbmV3TGF5b3V0Tm9kZS5hcnJheUl0ZW0sXG4gICAgICAgIG5ld0xheW91dE5vZGUuYXJyYXlJdGVtVHlwZSwgbmV3TGF5b3V0Tm9kZS5vcHRpb25zLnJlbW92YWJsZSwgZmFsc2VcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIElmIHZhbHVlIG5vdCBkZWZpbmVkLCBjb3B5IG5vZGUgZnJvbSBsYXlvdXRSZWZMaWJyYXJ5XG4gICAgICBuZXdMYXlvdXROb2RlID0gXy5jbG9uZURlZXAobmV3TGF5b3V0Tm9kZSk7XG4gICAgICBKc29uUG9pbnRlci5mb3JFYWNoRGVlcChuZXdMYXlvdXROb2RlLCAoc3ViTm9kZSwgcG9pbnRlcikgPT4ge1xuXG4gICAgICAgIC8vIFJlc2V0IGFsbCBfaWQncyBpbiBuZXdMYXlvdXROb2RlIHRvIHVuaXF1ZSB2YWx1ZXNcbiAgICAgICAgaWYgKGhhc093bihzdWJOb2RlLCAnX2lkJykpIHsgc3ViTm9kZS5faWQgPSBfLnVuaXF1ZUlkKCk7IH1cblxuICAgICAgICAvLyBJZiBhZGRpbmcgYSByZWN1cnNpdmUgaXRlbSwgcHJlZml4IGN1cnJlbnQgZGF0YVBvaW50ZXJcbiAgICAgICAgLy8gdG8gYWxsIGRhdGFQb2ludGVycyBpbiBuZXcgbGF5b3V0Tm9kZVxuICAgICAgICBpZiAocmVmTm9kZS5yZWN1cnNpdmVSZWZlcmVuY2UgJiYgaGFzT3duKHN1Yk5vZGUsICdkYXRhUG9pbnRlcicpKSB7XG4gICAgICAgICAgc3ViTm9kZS5kYXRhUG9pbnRlciA9IHJlZk5vZGUuZGF0YVBvaW50ZXIgKyBzdWJOb2RlLmRhdGFQb2ludGVyO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIG5ld0xheW91dE5vZGU7XG4gIH1cbn1cblxuLyoqXG4gKiAnYnVpbGRUaXRsZU1hcCcgZnVuY3Rpb25cbiAqXG4gKiAvLyAgIHRpdGxlTWFwIC1cbiAqIC8vICAgZW51bUxpc3QgLVxuICogLy8gIHsgYm9vbGVhbiA9IHRydWUgfSBmaWVsZFJlcXVpcmVkIC1cbiAqIC8vICB7IGJvb2xlYW4gPSB0cnVlIH0gZmxhdExpc3QgLVxuICogLy8geyBUaXRsZU1hcEl0ZW1bXSB9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBidWlsZFRpdGxlTWFwKFxuICB0aXRsZU1hcCwgZW51bUxpc3QsIGZpZWxkUmVxdWlyZWQgPSB0cnVlLCBmbGF0TGlzdCA9IHRydWVcbikge1xuICBsZXQgbmV3VGl0bGVNYXA6IFRpdGxlTWFwSXRlbVtdID0gW107XG4gIGxldCBoYXNFbXB0eVZhbHVlID0gZmFsc2U7XG4gIGlmICh0aXRsZU1hcCkge1xuICAgIGlmIChpc0FycmF5KHRpdGxlTWFwKSkge1xuICAgICAgaWYgKGVudW1MaXN0KSB7XG4gICAgICAgIGZvciAobGV0IGkgb2YgT2JqZWN0LmtleXModGl0bGVNYXApKSB7XG4gICAgICAgICAgaWYgKGlzT2JqZWN0KHRpdGxlTWFwW2ldKSkgeyAvLyBKU09OIEZvcm0gc3R5bGVcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gdGl0bGVNYXBbaV0udmFsdWU7XG4gICAgICAgICAgICBpZiAoZW51bUxpc3QuaW5jbHVkZXModmFsdWUpKSB7XG4gICAgICAgICAgICAgIGNvbnN0IG5hbWUgPSB0aXRsZU1hcFtpXS5uYW1lO1xuICAgICAgICAgICAgICBuZXdUaXRsZU1hcC5wdXNoKHsgbmFtZSwgdmFsdWUgfSk7XG4gICAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlID09PSBudWxsKSB7IGhhc0VtcHR5VmFsdWUgPSB0cnVlOyB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIGlmIChpc1N0cmluZyh0aXRsZU1hcFtpXSkpIHsgLy8gUmVhY3QgSnNvbnNjaGVtYSBGb3JtIHN0eWxlXG4gICAgICAgICAgICBpZiAoaSA8IGVudW1MaXN0Lmxlbmd0aCkge1xuICAgICAgICAgICAgICBjb25zdCBuYW1lID0gdGl0bGVNYXBbaV07XG4gICAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gZW51bUxpc3RbaV07XG4gICAgICAgICAgICAgIG5ld1RpdGxlTWFwLnB1c2goeyBuYW1lLCB2YWx1ZSB9KTtcbiAgICAgICAgICAgICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsdWUgPT09IG51bGwpIHsgaGFzRW1wdHlWYWx1ZSA9IHRydWU7IH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7IC8vIElmIGFycmF5IHRpdGxlTWFwIGFuZCBubyBlbnVtIGxpc3QsIGp1c3QgcmV0dXJuIHRoZSB0aXRsZU1hcCAtIEFuZ3VsYXIgU2NoZW1hIEZvcm0gc3R5bGVcbiAgICAgICAgbmV3VGl0bGVNYXAgPSB0aXRsZU1hcDtcbiAgICAgICAgaWYgKCFmaWVsZFJlcXVpcmVkKSB7XG4gICAgICAgICAgaGFzRW1wdHlWYWx1ZSA9ICEhbmV3VGl0bGVNYXBcbiAgICAgICAgICAgIC5maWx0ZXIoaSA9PiBpLnZhbHVlID09PSB1bmRlZmluZWQgfHwgaS52YWx1ZSA9PT0gbnVsbClcbiAgICAgICAgICAgIC5sZW5ndGg7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGVudW1MaXN0KSB7IC8vIEFsdGVybmF0ZSBKU09OIEZvcm0gc3R5bGUsIHdpdGggZW51bSBsaXN0XG4gICAgICBmb3IgKGxldCBpIG9mIE9iamVjdC5rZXlzKGVudW1MaXN0KSkge1xuICAgICAgICBsZXQgdmFsdWUgPSBlbnVtTGlzdFtpXTtcbiAgICAgICAgaWYgKGhhc093bih0aXRsZU1hcCwgdmFsdWUpKSB7XG4gICAgICAgICAgbGV0IG5hbWUgPSB0aXRsZU1hcFt2YWx1ZV07XG4gICAgICAgICAgbmV3VGl0bGVNYXAucHVzaCh7IG5hbWUsIHZhbHVlIH0pO1xuICAgICAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlID09PSBudWxsKSB7IGhhc0VtcHR5VmFsdWUgPSB0cnVlOyB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2UgeyAvLyBBbHRlcm5hdGUgSlNPTiBGb3JtIHN0eWxlLCB3aXRob3V0IGVudW0gbGlzdFxuICAgICAgZm9yIChsZXQgdmFsdWUgb2YgT2JqZWN0LmtleXModGl0bGVNYXApKSB7XG4gICAgICAgIGxldCBuYW1lID0gdGl0bGVNYXBbdmFsdWVdO1xuICAgICAgICBuZXdUaXRsZU1hcC5wdXNoKHsgbmFtZSwgdmFsdWUgfSk7XG4gICAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlID09PSBudWxsKSB7IGhhc0VtcHR5VmFsdWUgPSB0cnVlOyB9XG4gICAgICB9XG4gICAgfVxuICB9IGVsc2UgaWYgKGVudW1MaXN0KSB7IC8vIEJ1aWxkIG1hcCBmcm9tIGVudW0gbGlzdCBhbG9uZVxuICAgIGZvciAobGV0IGkgb2YgT2JqZWN0LmtleXMoZW51bUxpc3QpKSB7XG4gICAgICBsZXQgbmFtZSA9IGVudW1MaXN0W2ldO1xuICAgICAgbGV0IHZhbHVlID0gZW51bUxpc3RbaV07XG4gICAgICBuZXdUaXRsZU1hcC5wdXNoKHsgbmFtZSwgdmFsdWV9KTtcbiAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlID09PSBudWxsKSB7IGhhc0VtcHR5VmFsdWUgPSB0cnVlOyB9XG4gICAgfVxuICB9IGVsc2UgeyAvLyBJZiBubyB0aXRsZU1hcCBhbmQgbm8gZW51bSBsaXN0LCByZXR1cm4gZGVmYXVsdCBtYXAgb2YgYm9vbGVhbiB2YWx1ZXNcbiAgICBuZXdUaXRsZU1hcCA9IFsgeyBuYW1lOiAnVHJ1ZScsIHZhbHVlOiB0cnVlIH0sIHsgbmFtZTogJ0ZhbHNlJywgdmFsdWU6IGZhbHNlIH0gXTtcbiAgfVxuXG4gIC8vIERvZXMgdGl0bGVNYXAgaGF2ZSBncm91cHM/XG4gIGlmIChuZXdUaXRsZU1hcC5zb21lKHRpdGxlID0+IGhhc093bih0aXRsZSwgJ2dyb3VwJykpKSB7XG4gICAgaGFzRW1wdHlWYWx1ZSA9IGZhbHNlO1xuXG4gICAgLy8gSWYgZmxhdExpc3QgPSB0cnVlLCBmbGF0dGVuIGl0ZW1zICYgdXBkYXRlIG5hbWUgdG8gZ3JvdXA6IG5hbWVcbiAgICBpZiAoZmxhdExpc3QpIHtcbiAgICAgIG5ld1RpdGxlTWFwID0gbmV3VGl0bGVNYXAucmVkdWNlKChncm91cFRpdGxlTWFwLCB0aXRsZSkgPT4ge1xuICAgICAgICBpZiAoaGFzT3duKHRpdGxlLCAnZ3JvdXAnKSkge1xuICAgICAgICAgIGlmIChpc0FycmF5KHRpdGxlLml0ZW1zKSkge1xuICAgICAgICAgICAgZ3JvdXBUaXRsZU1hcCA9IFtcbiAgICAgICAgICAgICAgLi4uZ3JvdXBUaXRsZU1hcCxcbiAgICAgICAgICAgICAgLi4udGl0bGUuaXRlbXMubWFwKGl0ZW0gPT5cbiAgICAgICAgICAgICAgICAoeyAuLi5pdGVtLCAuLi57IG5hbWU6IGAke3RpdGxlLmdyb3VwfTogJHtpdGVtLm5hbWV9YCB9IH0pXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIF07XG4gICAgICAgICAgICBpZiAodGl0bGUuaXRlbXMuc29tZShpdGVtID0+IGl0ZW0udmFsdWUgPT09IHVuZGVmaW5lZCB8fCBpdGVtLnZhbHVlID09PSBudWxsKSkge1xuICAgICAgICAgICAgICBoYXNFbXB0eVZhbHVlID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGhhc093bih0aXRsZSwgJ25hbWUnKSAmJiBoYXNPd24odGl0bGUsICd2YWx1ZScpKSB7XG4gICAgICAgICAgICB0aXRsZS5uYW1lID0gYCR7dGl0bGUuZ3JvdXB9OiAke3RpdGxlLm5hbWV9YDtcbiAgICAgICAgICAgIGRlbGV0ZSB0aXRsZS5ncm91cDtcbiAgICAgICAgICAgIGdyb3VwVGl0bGVNYXAucHVzaCh0aXRsZSk7XG4gICAgICAgICAgICBpZiAodGl0bGUudmFsdWUgPT09IHVuZGVmaW5lZCB8fCB0aXRsZS52YWx1ZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICBoYXNFbXB0eVZhbHVlID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZ3JvdXBUaXRsZU1hcC5wdXNoKHRpdGxlKTtcbiAgICAgICAgICBpZiAodGl0bGUudmFsdWUgPT09IHVuZGVmaW5lZCB8fCB0aXRsZS52YWx1ZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgaGFzRW1wdHlWYWx1ZSA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBncm91cFRpdGxlTWFwO1xuICAgICAgfSwgW10pO1xuXG4gICAgLy8gSWYgZmxhdExpc3QgPSBmYWxzZSwgY29tYmluZSBpdGVtcyBmcm9tIG1hdGNoaW5nIGdyb3Vwc1xuICAgIH0gZWxzZSB7XG4gICAgICBuZXdUaXRsZU1hcCA9IG5ld1RpdGxlTWFwLnJlZHVjZSgoZ3JvdXBUaXRsZU1hcCwgdGl0bGUpID0+IHtcbiAgICAgICAgaWYgKGhhc093bih0aXRsZSwgJ2dyb3VwJykpIHtcbiAgICAgICAgICBpZiAodGl0bGUuZ3JvdXAgIT09IChncm91cFRpdGxlTWFwW2dyb3VwVGl0bGVNYXAubGVuZ3RoIC0gMV0gfHwge30pLmdyb3VwKSB7XG4gICAgICAgICAgICBncm91cFRpdGxlTWFwLnB1c2goeyBncm91cDogdGl0bGUuZ3JvdXAsIGl0ZW1zOiB0aXRsZS5pdGVtcyB8fCBbXSB9KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGhhc093bih0aXRsZSwgJ25hbWUnKSAmJiBoYXNPd24odGl0bGUsICd2YWx1ZScpKSB7XG4gICAgICAgICAgICBncm91cFRpdGxlTWFwW2dyb3VwVGl0bGVNYXAubGVuZ3RoIC0gMV0uaXRlbXNcbiAgICAgICAgICAgICAgLnB1c2goeyBuYW1lOiB0aXRsZS5uYW1lLCB2YWx1ZTogdGl0bGUudmFsdWUgfSk7XG4gICAgICAgICAgICBpZiAodGl0bGUudmFsdWUgPT09IHVuZGVmaW5lZCB8fCB0aXRsZS52YWx1ZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICBoYXNFbXB0eVZhbHVlID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZ3JvdXBUaXRsZU1hcC5wdXNoKHRpdGxlKTtcbiAgICAgICAgICBpZiAodGl0bGUudmFsdWUgPT09IHVuZGVmaW5lZCB8fCB0aXRsZS52YWx1ZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgaGFzRW1wdHlWYWx1ZSA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBncm91cFRpdGxlTWFwO1xuICAgICAgfSwgW10pO1xuICAgIH1cbiAgfVxuICBpZiAoIWZpZWxkUmVxdWlyZWQgJiYgIWhhc0VtcHR5VmFsdWUpIHtcbiAgICBuZXdUaXRsZU1hcC51bnNoaWZ0KHsgbmFtZTogJzxlbT5Ob25lPC9lbT4nLCB2YWx1ZTogbnVsbCB9KTtcbiAgfVxuICByZXR1cm4gbmV3VGl0bGVNYXA7XG59XG4iXX0=