/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as Ajv from 'ajv';
import * as _ from 'lodash';
import { hasValue, isArray, isDefined, isEmpty, isObject } from './shared/validator.functions';
import { fixTitle, forEach, hasOwn, toTitleCase } from './shared/utility.functions';
import { JsonPointer } from './shared/jsonpointer.functions';
import { buildSchemaFromData, buildSchemaFromLayout, removeRecursiveReferences } from './shared/json-schema.functions';
import { buildFormGroup, buildFormGroupTemplate, formatFormData, getControl } from './shared/form-group.functions';
import { buildLayout, getLayoutNode } from './shared/layout.functions';
import { enValidationMessages } from './locale/en-validation-messages';
import { frValidationMessages } from './locale/fr-validation-messages';
/**
 * @record
 */
export function TitleMapItem() { }
/** @type {?|undefined} */
TitleMapItem.prototype.name;
/** @type {?|undefined} */
TitleMapItem.prototype.value;
/** @type {?|undefined} */
TitleMapItem.prototype.checked;
/** @type {?|undefined} */
TitleMapItem.prototype.group;
/** @type {?|undefined} */
TitleMapItem.prototype.items;
;
/**
 * @record
 */
export function ErrorMessages() { }
;
export class JsonSchemaFormService {
    constructor() {
        this.JsonFormCompatibility = false;
        this.ReactJsonSchemaFormCompatibility = false;
        this.AngularSchemaFormCompatibility = false;
        this.tpldata = {};
        this.ajvOptions = { allErrors: true, jsonPointers: true, unknownFormats: 'ignore' };
        this.ajv = new Ajv(this.ajvOptions);
        this.validateFormData = null;
        this.formValues = {};
        this.data = {};
        this.schema = {};
        this.layout = [];
        this.formGroupTemplate = {};
        this.formGroup = null;
        this.framework = null;
        this.validData = null;
        this.isValid = null;
        this.ajvErrors = null;
        this.validationErrors = null;
        this.dataErrors = new Map();
        this.formValueSubscription = null;
        this.dataChanges = new Subject();
        this.isValidChanges = new Subject();
        this.validationErrorChanges = new Subject();
        this.arrayMap = new Map();
        this.dataMap = new Map();
        this.dataRecursiveRefMap = new Map();
        this.schemaRecursiveRefMap = new Map();
        this.schemaRefLibrary = {};
        this.layoutRefLibrary = { '': null };
        this.templateRefLibrary = {};
        this.hasRootReference = false;
        this.language = 'en-US';
        // Default global form options
        this.defaultFormOptions = {
            addSubmit: 'auto',
            // Add a submit button if layout does not have one?
            // for addSubmit: true = always, false = never,
            // 'auto' = only if layout is undefined (form is built from schema alone)
            debug: false,
            // Show debugging output?
            disableInvalidSubmit: true,
            // Disable submit if form invalid?
            formDisabled: false,
            // Set entire form as disabled? (not editable, and disables outputs)
            formReadonly: false,
            // Set entire form as read only? (not editable, but outputs still enabled)
            fieldsRequired: false,
            // (set automatically) Are there any required fields in the form?
            framework: 'no-framework',
            // The framework to load
            loadExternalAssets: false,
            // Load external css and JavaScript for framework?
            pristine: { errors: true, success: true },
            supressPropertyTitles: false,
            setSchemaDefaults: 'auto',
            // Set fefault values from schema?
            // true = always set (unless overridden by layout default or formValues)
            // false = never set
            // 'auto' = set in addable components, and everywhere if formValues not set
            setLayoutDefaults: 'auto',
            // Set fefault values from layout?
            // true = always set (unless overridden by formValues)
            // false = never set
            // 'auto' = set in addable components, and everywhere if formValues not set
            validateOnRender: 'auto',
            // Validate fields immediately, before they are touched?
            // true = validate all fields immediately
            // false = only validate fields after they are touched by user
            // 'auto' = validate fields with values immediately, empty fields after they are touched
            widgets: {},
            // Any custom widgets to load
            defautWidgetOptions: {
                // Default options for form control widgets
                listItems: 1,
                // Number of list items to initially add to arrays with no default value
                addable: true,
                // Allow adding items to an array or $ref point?
                orderable: true,
                // Allow reordering items within an array?
                removable: true,
                // Allow removing items from an array or $ref point?
                enableErrorState: true,
                // Apply 'has-error' class when field fails validation?
                // disableErrorState: false, // Don't apply 'has-error' class when field fails validation?
                enableSuccessState: true,
                // Apply 'has-success' class when field validates?
                // disableSuccessState: false, // Don't apply 'has-success' class when field validates?
                feedback: false,
                // Show inline feedback icons?
                feedbackOnRender: false,
                // Show errorMessage on Render?
                notitle: false,
                // Hide title?
                disabled: false,
                // Set control as disabled? (not editable, and excluded from output)
                readonly: false,
                // Set control as read only? (not editable, but included in output)
                returnEmptyFields: true,
                // return values for fields that contain no data?
                validationMessages: {} // set by setLanguage()
            },
        };
        this.setLanguage(this.language);
    }
    /**
     * @param {?=} language
     * @return {?}
     */
    setLanguage(language = 'en-US') {
        this.language = language;
        /** @type {?} */
        const validationMessages = language.slice(0, 2) === 'fr' ?
            frValidationMessages : enValidationMessages;
        this.defaultFormOptions.defautWidgetOptions.validationMessages =
            _.cloneDeep(validationMessages);
    }
    /**
     * @return {?}
     */
    getData() { return this.data; }
    /**
     * @return {?}
     */
    getSchema() { return this.schema; }
    /**
     * @return {?}
     */
    getLayout() { return this.layout; }
    /**
     * @return {?}
     */
    resetAllValues() {
        this.JsonFormCompatibility = false;
        this.ReactJsonSchemaFormCompatibility = false;
        this.AngularSchemaFormCompatibility = false;
        this.tpldata = {};
        this.validateFormData = null;
        this.formValues = {};
        this.schema = {};
        this.layout = [];
        this.formGroupTemplate = {};
        this.formGroup = null;
        this.framework = null;
        this.data = {};
        this.validData = null;
        this.isValid = null;
        this.validationErrors = null;
        this.arrayMap = new Map();
        this.dataMap = new Map();
        this.dataRecursiveRefMap = new Map();
        this.schemaRecursiveRefMap = new Map();
        this.layoutRefLibrary = {};
        this.schemaRefLibrary = {};
        this.templateRefLibrary = {};
        this.formOptions = _.cloneDeep(this.defaultFormOptions);
    }
    /**
     * 'buildRemoteError' function
     *
     * Example errors:
     * {
     *   last_name: [ {
     *     message: 'Last name must by start with capital letter.',
     *     code: 'capital_letter'
     *   } ],
     *   email: [ {
     *     message: 'Email must be from example.com domain.',
     *     code: 'special_domain'
     *   }, {
     *     message: 'Email must contain an \@ symbol.',
     *     code: 'at_symbol'
     *   } ]
     * }
     * //{ErrorMessages} errors
     * @param {?} errors
     * @return {?}
     */
    buildRemoteError(errors) {
        forEach(errors, (value, key) => {
            if (key in this.formGroup.controls) {
                for (const error of value) {
                    /** @type {?} */
                    const err = {};
                    err[error['code']] = error['message'];
                    this.formGroup.get(key).setErrors(err, { emitEvent: true });
                }
            }
        });
    }
    /**
     * @param {?} newValue
     * @param {?=} updateSubscriptions
     * @return {?}
     */
    validateData(newValue, updateSubscriptions = true) {
        // Format raw form data to correct data types
        this.data = formatFormData(newValue, this.dataMap, this.dataRecursiveRefMap, this.arrayMap, this.formOptions.returnEmptyFields);
        this.isValid = this.validateFormData(this.data);
        this.validData = this.isValid ? this.data : null;
        /** @type {?} */
        const compileErrors = errors => {
            /** @type {?} */
            const compiledErrors = {};
            (errors || []).forEach(error => {
                if (!compiledErrors[error.dataPath]) {
                    compiledErrors[error.dataPath] = [];
                }
                compiledErrors[error.dataPath].push(error.message);
            });
            return compiledErrors;
        };
        this.ajvErrors = this.validateFormData.errors;
        this.validationErrors = compileErrors(this.validateFormData.errors);
        if (updateSubscriptions) {
            this.dataChanges.next(this.data);
            this.isValidChanges.next(this.isValid);
            this.validationErrorChanges.next(this.ajvErrors);
        }
    }
    /**
     * @param {?=} formValues
     * @param {?=} setValues
     * @return {?}
     */
    buildFormGroupTemplate(formValues = null, setValues = true) {
        this.formGroupTemplate = buildFormGroupTemplate(this, formValues, setValues);
    }
    /**
     * @return {?}
     */
    buildFormGroup() {
        this.formGroup = /** @type {?} */ (buildFormGroup(this.formGroupTemplate));
        if (this.formGroup) {
            this.compileAjvSchema();
            this.validateData(this.formGroup.value);
            // Set up observables to emit data and validation info when form data changes
            if (this.formValueSubscription) {
                this.formValueSubscription.unsubscribe();
            }
            this.formValueSubscription = this.formGroup.valueChanges
                .subscribe(formValue => this.validateData(formValue));
        }
    }
    /**
     * @param {?} widgetLibrary
     * @return {?}
     */
    buildLayout(widgetLibrary) {
        this.layout = buildLayout(this, widgetLibrary);
    }
    /**
     * @param {?} newOptions
     * @return {?}
     */
    setOptions(newOptions) {
        if (isObject(newOptions)) {
            /** @type {?} */
            const addOptions = _.cloneDeep(newOptions);
            // Backward compatibility for 'defaultOptions' (renamed 'defautWidgetOptions')
            if (isObject(addOptions.defaultOptions)) {
                Object.assign(this.formOptions.defautWidgetOptions, addOptions.defaultOptions);
                delete addOptions.defaultOptions;
            }
            if (isObject(addOptions.defautWidgetOptions)) {
                Object.assign(this.formOptions.defautWidgetOptions, addOptions.defautWidgetOptions);
                delete addOptions.defautWidgetOptions;
            }
            Object.assign(this.formOptions, addOptions);
            /** @type {?} */
            const globalDefaults = this.formOptions.defautWidgetOptions;
            ['ErrorState', 'SuccessState']
                .filter(suffix => hasOwn(globalDefaults, 'disable' + suffix))
                .forEach(suffix => {
                globalDefaults['enable' + suffix] = !globalDefaults['disable' + suffix];
                delete globalDefaults['disable' + suffix];
            });
        }
    }
    /**
     * @return {?}
     */
    compileAjvSchema() {
        if (!this.validateFormData) {
            // if 'ui:order' exists in properties, move it to root before compiling with ajv
            if (Array.isArray(this.schema.properties['ui:order'])) {
                this.schema['ui:order'] = this.schema.properties['ui:order'];
                delete this.schema.properties['ui:order'];
            }
            this.ajv.removeSchema(this.schema);
            this.validateFormData = this.ajv.compile(this.schema);
        }
    }
    /**
     * @param {?=} data
     * @param {?=} requireAllFields
     * @return {?}
     */
    buildSchemaFromData(data, requireAllFields = false) {
        if (data) {
            return buildSchemaFromData(data, requireAllFields);
        }
        this.schema = buildSchemaFromData(this.formValues, requireAllFields);
    }
    /**
     * @param {?=} layout
     * @return {?}
     */
    buildSchemaFromLayout(layout) {
        if (layout) {
            return buildSchemaFromLayout(layout);
        }
        this.schema = buildSchemaFromLayout(this.layout);
    }
    /**
     * @param {?=} newTpldata
     * @return {?}
     */
    setTpldata(newTpldata = {}) {
        this.tpldata = newTpldata;
    }
    /**
     * @param {?=} text
     * @param {?=} value
     * @param {?=} values
     * @param {?=} key
     * @return {?}
     */
    parseText(text = '', value = {}, values = {}, key = null) {
        if (!text || !/{{.+?}}/.test(text)) {
            return text;
        }
        return text.replace(/{{(.+?)}}/g, (...a) => this.parseExpression(a[1], value, values, key, this.tpldata));
    }
    /**
     * @param {?=} expression
     * @param {?=} value
     * @param {?=} values
     * @param {?=} key
     * @param {?=} tpldata
     * @return {?}
     */
    parseExpression(expression = '', value = {}, values = {}, key = null, tpldata = null) {
        if (typeof expression !== 'string') {
            return '';
        }
        /** @type {?} */
        const index = typeof key === 'number' ? (key + 1) + '' : (key || '');
        expression = expression.trim();
        if ((expression[0] === "'" || expression[0] === '"') &&
            expression[0] === expression[expression.length - 1] &&
            expression.slice(1, expression.length - 1).indexOf(expression[0]) === -1) {
            return expression.slice(1, expression.length - 1);
        }
        if (expression === 'idx' || expression === '$index') {
            return index;
        }
        if (expression === 'value' && !hasOwn(values, 'value')) {
            return value;
        }
        if (['"', "'", ' ', '||', '&&', '+'].every(delim => expression.indexOf(delim) === -1)) {
            /** @type {?} */
            const pointer = JsonPointer.parseObjectPath(expression);
            return pointer[0] === 'value' && JsonPointer.has(value, pointer.slice(1)) ?
                JsonPointer.get(value, pointer.slice(1)) :
                pointer[0] === 'values' && JsonPointer.has(values, pointer.slice(1)) ?
                    JsonPointer.get(values, pointer.slice(1)) :
                    pointer[0] === 'tpldata' && JsonPointer.has(tpldata, pointer.slice(1)) ?
                        JsonPointer.get(tpldata, pointer.slice(1)) :
                        JsonPointer.has(values, pointer) ? JsonPointer.get(values, pointer) : '';
        }
        if (expression.indexOf('[idx]') > -1) {
            expression = expression.replace(/\[idx\]/g, /** @type {?} */ (index));
        }
        if (expression.indexOf('[$index]') > -1) {
            expression = expression.replace(/\[$index\]/g, /** @type {?} */ (index));
        }
        // TODO: Improve expression evaluation by parsing quoted strings first
        // let expressionArray = expression.match(/([^"']+|"[^"]+"|'[^']+')/g);
        if (expression.indexOf('||') > -1) {
            return expression.split('||').reduce((all, term) => all || this.parseExpression(term, value, values, key, tpldata), '');
        }
        if (expression.indexOf('&&') > -1) {
            return expression.split('&&').reduce((all, term) => all && this.parseExpression(term, value, values, key, tpldata), ' ').trim();
        }
        if (expression.indexOf('+') > -1) {
            return expression.split('+')
                .map(term => this.parseExpression(term, value, values, key, tpldata))
                .join('');
        }
        return '';
    }
    /**
     * @param {?=} parentCtx
     * @param {?=} childNode
     * @param {?=} index
     * @return {?}
     */
    setArrayItemTitle(parentCtx = {}, childNode = null, index = null) {
        /** @type {?} */
        const parentNode = parentCtx.layoutNode;
        /** @type {?} */
        const parentValues = this.getFormControlValue(parentCtx);
        /** @type {?} */
        const isArrayItem = (parentNode.type || '').slice(-5) === 'array' && isArray(parentValues);
        /** @type {?} */
        const text = JsonPointer.getFirst(isArrayItem && childNode.type !== '$ref' ? [
            [childNode, '/options/legend'],
            [childNode, '/options/title'],
            [parentNode, '/options/title'],
            [parentNode, '/options/legend'],
        ] : [
            [childNode, '/options/title'],
            [childNode, '/options/legend'],
            [parentNode, '/options/title'],
            [parentNode, '/options/legend']
        ]);
        if (!text) {
            return text;
        }
        /** @type {?} */
        const childValue = isArray(parentValues) && index < parentValues.length ?
            parentValues[index] : parentValues;
        return this.parseText(text, childValue, parentValues, index);
    }
    /**
     * @param {?} ctx
     * @return {?}
     */
    setItemTitle(ctx) {
        return !ctx.options.title && /^(\d+|-)$/.test(ctx.layoutNode.name) ?
            null :
            this.parseText(ctx.options.title || toTitleCase(ctx.layoutNode.name), this.getFormControlValue(this), (this.getFormControlGroup(this) || /** @type {?} */ ({})).value, ctx.dataIndex[ctx.dataIndex.length - 1]);
    }
    /**
     * @param {?} layoutNode
     * @param {?} dataIndex
     * @return {?}
     */
    evaluateCondition(layoutNode, dataIndex) {
        /** @type {?} */
        const arrayIndex = dataIndex && dataIndex[dataIndex.length - 1];
        /** @type {?} */
        let result = true;
        if (hasValue((layoutNode.options || {}).condition)) {
            if (typeof layoutNode.options.condition === 'string') {
                /** @type {?} */
                let pointer = layoutNode.options.condition;
                if (hasValue(arrayIndex)) {
                    pointer = pointer.replace('[arrayIndex]', `[${arrayIndex}]`);
                }
                pointer = JsonPointer.parseObjectPath(pointer);
                result = !!JsonPointer.get(this.data, pointer);
                if (!result && pointer[0] === 'model') {
                    result = !!JsonPointer.get({ model: this.data }, pointer);
                }
            }
            else if (typeof layoutNode.options.condition === 'function') {
                result = layoutNode.options.condition(this.data);
            }
            else if (typeof layoutNode.options.condition.functionBody === 'string') {
                try {
                    /** @type {?} */
                    const dynFn = new Function('model', 'arrayIndices', layoutNode.options.condition.functionBody);
                    result = dynFn(this.data, dataIndex);
                }
                catch (e) {
                    result = true;
                    console.error("condition functionBody errored out on evaluation: " + layoutNode.options.condition.functionBody);
                }
            }
        }
        return result;
    }
    /**
     * @param {?} ctx
     * @param {?=} bind
     * @return {?}
     */
    initializeControl(ctx, bind = true) {
        if (!isObject(ctx)) {
            return false;
        }
        if (isEmpty(ctx.options)) {
            ctx.options = !isEmpty((ctx.layoutNode || {}).options) ?
                ctx.layoutNode.options : _.cloneDeep(this.formOptions);
        }
        ctx.formControl = this.getFormControl(ctx);
        ctx.boundControl = bind && !!ctx.formControl;
        if (ctx.formControl) {
            ctx.controlName = this.getFormControlName(ctx);
            ctx.controlValue = ctx.formControl.value;
            ctx.controlDisabled = ctx.formControl.disabled;
            ctx.options.errorMessage = ctx.formControl.status === 'VALID' ? null :
                this.formatErrors(ctx.formControl.errors, ctx.options.validationMessages);
            ctx.options.showErrors = this.formOptions.validateOnRender === true ||
                (this.formOptions.validateOnRender === 'auto' && hasValue(ctx.controlValue));
            ctx.formControl.statusChanges.subscribe(status => ctx.options.errorMessage = status === 'VALID' ? null :
                this.formatErrors(ctx.formControl.errors, ctx.options.validationMessages));
            ctx.formControl.valueChanges.subscribe(value => {
                if (!_.isEqual(ctx.controlValue, value)) {
                    ctx.controlValue = value;
                }
            });
        }
        else {
            ctx.controlName = ctx.layoutNode.name;
            ctx.controlValue = ctx.layoutNode.value || null;
            /** @type {?} */
            const dataPointer = this.getDataPointer(ctx);
            if (bind && dataPointer) {
                console.error(`warning: control "${dataPointer}" is not bound to the Angular FormGroup.`);
            }
        }
        return ctx.boundControl;
    }
    /**
     * @param {?} errors
     * @param {?=} validationMessages
     * @return {?}
     */
    formatErrors(errors, validationMessages = {}) {
        if (isEmpty(errors)) {
            return null;
        }
        if (!isObject(validationMessages)) {
            validationMessages = {};
        }
        /** @type {?} */
        const addSpaces = string => string[0].toUpperCase() + (string.slice(1) || '')
            .replace(/([a-z])([A-Z])/g, '$1 $2').replace(/_/g, ' ');
        /** @type {?} */
        const formatError = (error) => typeof error === 'object' ?
            Object.keys(error).map(key => error[key] === true ? addSpaces(key) :
                error[key] === false ? 'Not ' + addSpaces(key) :
                    addSpaces(key) + ': ' + formatError(error[key])).join(', ') :
            addSpaces(error.toString());
        /** @type {?} */
        const messages = [];
        return Object.keys(errors)
            .filter(errorKey => errorKey !== 'required' || Object.keys(errors).length === 1)
            .map(errorKey => 
        // If validationMessages is a string, return it
        typeof validationMessages === 'string' ? validationMessages :
            // If custom error message is a function, return function result
            typeof validationMessages[errorKey] === 'function' ?
                validationMessages[errorKey](errors[errorKey]) :
                // If custom error message is a string, replace placeholders and return
                typeof validationMessages[errorKey] === 'string' ?
                    // Does error message have any {{property}} placeholders?
                    !/{{.+?}}/.test(validationMessages[errorKey]) ?
                        validationMessages[errorKey] :
                        // Replace {{property}} placeholders with values
                        Object.keys(errors[errorKey])
                            .reduce((errorMessage, errorProperty) => errorMessage.replace(new RegExp('{{' + errorProperty + '}}', 'g'), errors[errorKey][errorProperty]), validationMessages[errorKey]) :
                    // If no custom error message, return formatted error data instead
                    addSpaces(errorKey) + ' Error: ' + formatError(errors[errorKey])).join('<br>');
    }
    /**
     * @param {?} ctx
     * @param {?} value
     * @return {?}
     */
    updateValue(ctx, value) {
        // Set value of current control
        ctx.controlValue = value;
        if (ctx.boundControl) {
            ctx.formControl.setValue(value);
            ctx.formControl.markAsDirty();
        }
        ctx.layoutNode.value = value;
        // Set values of any related controls in copyValueTo array
        if (isArray(ctx.options.copyValueTo)) {
            for (const item of ctx.options.copyValueTo) {
                /** @type {?} */
                const targetControl = getControl(this.formGroup, item);
                if (isObject(targetControl) && typeof targetControl.setValue === 'function') {
                    targetControl.setValue(value);
                    targetControl.markAsDirty();
                }
            }
        }
    }
    /**
     * @param {?} ctx
     * @param {?} checkboxList
     * @return {?}
     */
    updateArrayCheckboxList(ctx, checkboxList) {
        /** @type {?} */
        const formArray = /** @type {?} */ (this.getFormControl(ctx));
        // Remove all existing items
        while (formArray.value.length) {
            formArray.removeAt(0);
        }
        /** @type {?} */
        const refPointer = removeRecursiveReferences(ctx.layoutNode.dataPointer + '/-', this.dataRecursiveRefMap, this.arrayMap);
        for (const checkboxItem of checkboxList) {
            if (checkboxItem.checked) {
                /** @type {?} */
                const newFormControl = buildFormGroup(this.templateRefLibrary[refPointer]);
                newFormControl.setValue(checkboxItem.value);
                formArray.push(newFormControl);
            }
        }
        formArray.markAsDirty();
    }
    /**
     * @param {?} ctx
     * @return {?}
     */
    getFormControl(ctx) {
        if (!ctx.layoutNode || !isDefined(ctx.layoutNode.dataPointer) ||
            ctx.layoutNode.type === '$ref') {
            return null;
        }
        return getControl(this.formGroup, this.getDataPointer(ctx));
    }
    /**
     * @param {?} ctx
     * @return {?}
     */
    getFormControlValue(ctx) {
        if (!ctx.layoutNode || !isDefined(ctx.layoutNode.dataPointer) ||
            ctx.layoutNode.type === '$ref') {
            return null;
        }
        /** @type {?} */
        const control = getControl(this.formGroup, this.getDataPointer(ctx));
        return control ? control.value : null;
    }
    /**
     * @param {?} ctx
     * @return {?}
     */
    getFormControlGroup(ctx) {
        if (!ctx.layoutNode || !isDefined(ctx.layoutNode.dataPointer)) {
            return null;
        }
        return getControl(this.formGroup, this.getDataPointer(ctx), true);
    }
    /**
     * @param {?} ctx
     * @return {?}
     */
    getFormControlName(ctx) {
        if (!ctx.layoutNode || !isDefined(ctx.layoutNode.dataPointer) || !hasValue(ctx.dataIndex)) {
            return null;
        }
        return JsonPointer.toKey(this.getDataPointer(ctx));
    }
    /**
     * @param {?} ctx
     * @return {?}
     */
    getLayoutArray(ctx) {
        return JsonPointer.get(this.layout, this.getLayoutPointer(ctx), 0, -1);
    }
    /**
     * @param {?} ctx
     * @return {?}
     */
    getParentNode(ctx) {
        return JsonPointer.get(this.layout, this.getLayoutPointer(ctx), 0, -2);
    }
    /**
     * @param {?} ctx
     * @return {?}
     */
    getDataPointer(ctx) {
        if (!ctx.layoutNode || !isDefined(ctx.layoutNode.dataPointer) || !hasValue(ctx.dataIndex)) {
            return null;
        }
        return JsonPointer.toIndexedPointer(ctx.layoutNode.dataPointer, ctx.dataIndex, this.arrayMap);
    }
    /**
     * @param {?} ctx
     * @return {?}
     */
    getLayoutPointer(ctx) {
        if (!hasValue(ctx.layoutIndex)) {
            return null;
        }
        return '/' + ctx.layoutIndex.join('/items/');
    }
    /**
     * @param {?} ctx
     * @return {?}
     */
    isControlBound(ctx) {
        if (!ctx.layoutNode || !isDefined(ctx.layoutNode.dataPointer) || !hasValue(ctx.dataIndex)) {
            return false;
        }
        /** @type {?} */
        const controlGroup = this.getFormControlGroup(ctx);
        /** @type {?} */
        const name = this.getFormControlName(ctx);
        return controlGroup ? hasOwn(controlGroup.controls, name) : false;
    }
    /**
     * @param {?} ctx
     * @param {?=} name
     * @return {?}
     */
    addItem(ctx, name) {
        if (!ctx.layoutNode || !isDefined(ctx.layoutNode.$ref) ||
            !hasValue(ctx.dataIndex) || !hasValue(ctx.layoutIndex)) {
            return false;
        }
        /** @type {?} */
        const newFormGroup = buildFormGroup(this.templateRefLibrary[ctx.layoutNode.$ref]);
        // Add the new form control to the parent formArray or formGroup
        if (ctx.layoutNode.arrayItem) {
            // Add new array item to formArray
            (/** @type {?} */ (this.getFormControlGroup(ctx))).push(newFormGroup);
        }
        else {
            // Add new $ref item to formGroup
            (/** @type {?} */ (this.getFormControlGroup(ctx)))
                .addControl(name || this.getFormControlName(ctx), newFormGroup);
        }
        /** @type {?} */
        const newLayoutNode = getLayoutNode(ctx.layoutNode, this);
        newLayoutNode.arrayItem = ctx.layoutNode.arrayItem;
        if (ctx.layoutNode.arrayItemType) {
            newLayoutNode.arrayItemType = ctx.layoutNode.arrayItemType;
        }
        else {
            delete newLayoutNode.arrayItemType;
        }
        if (name) {
            newLayoutNode.name = name;
            newLayoutNode.dataPointer += '/' + JsonPointer.escape(name);
            newLayoutNode.options.title = fixTitle(name);
        }
        // Add the new layoutNode to the form layout
        JsonPointer.insert(this.layout, this.getLayoutPointer(ctx), newLayoutNode);
        return true;
    }
    /**
     * @param {?} ctx
     * @param {?} oldIndex
     * @param {?} newIndex
     * @return {?}
     */
    moveArrayItem(ctx, oldIndex, newIndex) {
        if (!ctx.layoutNode || !isDefined(ctx.layoutNode.dataPointer) ||
            !hasValue(ctx.dataIndex) || !hasValue(ctx.layoutIndex) ||
            !isDefined(oldIndex) || !isDefined(newIndex) || oldIndex === newIndex) {
            return false;
        }
        /** @type {?} */
        const formArray = /** @type {?} */ (this.getFormControlGroup(ctx));
        /** @type {?} */
        const arrayItem = formArray.at(oldIndex);
        formArray.removeAt(oldIndex);
        formArray.insert(newIndex, arrayItem);
        formArray.updateValueAndValidity();
        /** @type {?} */
        const layoutArray = this.getLayoutArray(ctx);
        layoutArray.splice(newIndex, 0, layoutArray.splice(oldIndex, 1)[0]);
        return true;
    }
    /**
     * @param {?} ctx
     * @return {?}
     */
    removeItem(ctx) {
        if (!ctx.layoutNode || !isDefined(ctx.layoutNode.dataPointer) ||
            !hasValue(ctx.dataIndex) || !hasValue(ctx.layoutIndex)) {
            return false;
        }
        // Remove the Angular form control from the parent formArray or formGroup
        if (ctx.layoutNode.arrayItem) {
            // Remove array item from formArray
            (/** @type {?} */ (this.getFormControlGroup(ctx)))
                .removeAt(ctx.dataIndex[ctx.dataIndex.length - 1]);
        }
        else {
            // Remove $ref item from formGroup
            (/** @type {?} */ (this.getFormControlGroup(ctx)))
                .removeControl(this.getFormControlName(ctx));
        }
        // Remove layoutNode from layout
        JsonPointer.remove(this.layout, this.getLayoutPointer(ctx));
        return true;
    }
}
JsonSchemaFormService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
JsonSchemaFormService.ctorParameters = () => [];
if (false) {
    /** @type {?} */
    JsonSchemaFormService.prototype.JsonFormCompatibility;
    /** @type {?} */
    JsonSchemaFormService.prototype.ReactJsonSchemaFormCompatibility;
    /** @type {?} */
    JsonSchemaFormService.prototype.AngularSchemaFormCompatibility;
    /** @type {?} */
    JsonSchemaFormService.prototype.tpldata;
    /** @type {?} */
    JsonSchemaFormService.prototype.ajvOptions;
    /** @type {?} */
    JsonSchemaFormService.prototype.ajv;
    /** @type {?} */
    JsonSchemaFormService.prototype.validateFormData;
    /** @type {?} */
    JsonSchemaFormService.prototype.formValues;
    /** @type {?} */
    JsonSchemaFormService.prototype.data;
    /** @type {?} */
    JsonSchemaFormService.prototype.schema;
    /** @type {?} */
    JsonSchemaFormService.prototype.layout;
    /** @type {?} */
    JsonSchemaFormService.prototype.formGroupTemplate;
    /** @type {?} */
    JsonSchemaFormService.prototype.formGroup;
    /** @type {?} */
    JsonSchemaFormService.prototype.framework;
    /** @type {?} */
    JsonSchemaFormService.prototype.formOptions;
    /** @type {?} */
    JsonSchemaFormService.prototype.validData;
    /** @type {?} */
    JsonSchemaFormService.prototype.isValid;
    /** @type {?} */
    JsonSchemaFormService.prototype.ajvErrors;
    /** @type {?} */
    JsonSchemaFormService.prototype.validationErrors;
    /** @type {?} */
    JsonSchemaFormService.prototype.dataErrors;
    /** @type {?} */
    JsonSchemaFormService.prototype.formValueSubscription;
    /** @type {?} */
    JsonSchemaFormService.prototype.dataChanges;
    /** @type {?} */
    JsonSchemaFormService.prototype.isValidChanges;
    /** @type {?} */
    JsonSchemaFormService.prototype.validationErrorChanges;
    /** @type {?} */
    JsonSchemaFormService.prototype.arrayMap;
    /** @type {?} */
    JsonSchemaFormService.prototype.dataMap;
    /** @type {?} */
    JsonSchemaFormService.prototype.dataRecursiveRefMap;
    /** @type {?} */
    JsonSchemaFormService.prototype.schemaRecursiveRefMap;
    /** @type {?} */
    JsonSchemaFormService.prototype.schemaRefLibrary;
    /** @type {?} */
    JsonSchemaFormService.prototype.layoutRefLibrary;
    /** @type {?} */
    JsonSchemaFormService.prototype.templateRefLibrary;
    /** @type {?} */
    JsonSchemaFormService.prototype.hasRootReference;
    /** @type {?} */
    JsonSchemaFormService.prototype.language;
    /** @type {?} */
    JsonSchemaFormService.prototype.defaultFormOptions;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbi1zY2hlbWEtZm9ybS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmc2LWpzb24tc2NoZW1hLWZvcm0vIiwic291cmNlcyI6WyJsaWIvanNvbi1zY2hlbWEtZm9ybS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRzNDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFL0IsT0FBTyxLQUFLLEdBQUcsTUFBTSxLQUFLLENBQUM7QUFDM0IsT0FBTyxLQUFLLENBQUMsTUFBTSxRQUFRLENBQUM7QUFFNUIsT0FBTyxFQUNMLFFBQVEsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQ2hELE1BQU0sOEJBQThCLENBQUM7QUFDdEMsT0FBTyxFQUNMLFFBQVEsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFDdkMsTUFBTSw0QkFBNEIsQ0FBQztBQUNwQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDN0QsT0FBTyxFQUNMLG1CQUFtQixFQUFFLHFCQUFxQixFQUFFLHlCQUF5QixFQUV0RSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3hDLE9BQU8sRUFDTCxjQUFjLEVBQUUsc0JBQXNCLEVBQUUsY0FBYyxFQUFFLFVBQVUsRUFDbkUsTUFBTSwrQkFBK0IsQ0FBQztBQUN2QyxPQUFPLEVBQUUsV0FBVyxFQUFFLGFBQWEsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGlDQUFpQyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7QUFJdEUsQ0FBQzs7Ozs7QUFHRCxDQUFDO0FBSUYsTUFBTTtJQXNGSjtxQ0FyRndCLEtBQUs7Z0RBQ00sS0FBSzs4Q0FDUCxLQUFLO3VC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O1NBQ3REO1FBQUMsSUFBSSxDQUFDLENBQUM7O1lBQ04sbUJBQVksSUFBSSxDQUFDLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxFQUFDO2lCQUN2QyxhQUFhLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDaEQ7O1FBR0QsV0FBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQzVELE1BQU0sQ0FBQyxJQUFJLENBQUM7S0FDYjs7O1lBL25CRixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWJzdHJhY3RDb250cm9sLCBGb3JtQXJyYXksIEZvcm1Hcm91cCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IGZpbHRlciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0ICogYXMgQWp2IGZyb20gJ2Fqdic7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG5cbmltcG9ydCB7XG4gIGhhc1ZhbHVlLCBpc0FycmF5LCBpc0RlZmluZWQsIGlzRW1wdHksIGlzT2JqZWN0LCBpc1N0cmluZ1xufSBmcm9tICcuL3NoYXJlZC92YWxpZGF0b3IuZnVuY3Rpb25zJztcbmltcG9ydCB7XG4gIGZpeFRpdGxlLCBmb3JFYWNoLCBoYXNPd24sIHRvVGl0bGVDYXNlXG59IGZyb20gJy4vc2hhcmVkL3V0aWxpdHkuZnVuY3Rpb25zJztcbmltcG9ydCB7IEpzb25Qb2ludGVyIH0gZnJvbSAnLi9zaGFyZWQvanNvbnBvaW50ZXIuZnVuY3Rpb25zJztcbmltcG9ydCB7XG4gIGJ1aWxkU2NoZW1hRnJvbURhdGEsIGJ1aWxkU2NoZW1hRnJvbUxheW91dCwgcmVtb3ZlUmVjdXJzaXZlUmVmZXJlbmNlcyxcbiAgcmVzb2x2ZVNjaGVtYVJlZmVyZW5jZXNcbn0gZnJvbSAnLi9zaGFyZWQvanNvbi1zY2hlbWEuZnVuY3Rpb25zJztcbmltcG9ydCB7XG4gIGJ1aWxkRm9ybUdyb3VwLCBidWlsZEZvcm1Hcm91cFRlbXBsYXRlLCBmb3JtYXRGb3JtRGF0YSwgZ2V0Q29udHJvbFxufSBmcm9tICcuL3NoYXJlZC9mb3JtLWdyb3VwLmZ1bmN0aW9ucyc7XG5pbXBvcnQgeyBidWlsZExheW91dCwgZ2V0TGF5b3V0Tm9kZSB9IGZyb20gJy4vc2hhcmVkL2xheW91dC5mdW5jdGlvbnMnO1xuaW1wb3J0IHsgZW5WYWxpZGF0aW9uTWVzc2FnZXMgfSBmcm9tICcuL2xvY2FsZS9lbi12YWxpZGF0aW9uLW1lc3NhZ2VzJztcbmltcG9ydCB7IGZyVmFsaWRhdGlvbk1lc3NhZ2VzIH0gZnJvbSAnLi9sb2NhbGUvZnItdmFsaWRhdGlvbi1tZXNzYWdlcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgVGl0bGVNYXBJdGVtIHtcbiAgbmFtZT86IHN0cmluZywgdmFsdWU/OiBhbnksIGNoZWNrZWQ/OiBib29sZWFuLCBncm91cD86IHN0cmluZywgaXRlbXM/OiBUaXRsZU1hcEl0ZW1bXVxufTtcbmV4cG9ydCBpbnRlcmZhY2UgRXJyb3JNZXNzYWdlcyB7XG4gIFtjb250cm9sX25hbWU6IHN0cmluZ106IHsgbWVzc2FnZTogc3RyaW5nfEZ1bmN0aW9ufE9iamVjdCwgY29kZTogc3RyaW5nIH1bXVxufTtcblxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgSnNvblNjaGVtYUZvcm1TZXJ2aWNlIHtcbiAgSnNvbkZvcm1Db21wYXRpYmlsaXR5ID0gZmFsc2U7XG4gIFJlYWN0SnNvblNjaGVtYUZvcm1Db21wYXRpYmlsaXR5ID0gZmFsc2U7XG4gIEFuZ3VsYXJTY2hlbWFGb3JtQ29tcGF0aWJpbGl0eSA9IGZhbHNlO1xuICB0cGxkYXRhOiBhbnkgPSB7fTtcblxuICBhanZPcHRpb25zOiBhbnkgPSB7IGFsbEVycm9yczogdHJ1ZSwganNvblBvaW50ZXJzOiB0cnVlLCB1bmtub3duRm9ybWF0czogJ2lnbm9yZScgfTtcbiAgYWp2OiBhbnkgPSBuZXcgQWp2KHRoaXMuYWp2T3B0aW9ucyk7IC8vIEFKVjogQW5vdGhlciBKU09OIFNjaGVtYSBWYWxpZGF0b3JcbiAgdmFsaWRhdGVGb3JtRGF0YTogYW55ID0gbnVsbDsgLy8gQ29tcGlsZWQgQUpWIGZ1bmN0aW9uIHRvIHZhbGlkYXRlIGFjdGl2ZSBmb3JtJ3Mgc2NoZW1hXG5cbiAgZm9ybVZhbHVlczogYW55ID0ge307IC8vIEludGVybmFsIGZvcm0gZGF0YSAobWF5IG5vdCBoYXZlIGNvcnJlY3QgdHlwZXMpXG4gIGRhdGE6IGFueSA9IHt9OyAvLyBPdXRwdXQgZm9ybSBkYXRhIChmb3JtVmFsdWVzLCBmb3JtYXR0ZWQgd2l0aCBjb3JyZWN0IGRhdGEgdHlwZXMpXG4gIHNjaGVtYTogYW55ID0ge307IC8vIEludGVybmFsIEpTT04gU2NoZW1hXG4gIGxheW91dDogYW55W10gPSBbXTsgLy8gSW50ZXJuYWwgZm9ybSBsYXlvdXRcbiAgZm9ybUdyb3VwVGVtcGxhdGU6IGFueSA9IHt9OyAvLyBUZW1wbGF0ZSB1c2VkIHRvIGNyZWF0ZSBmb3JtR3JvdXBcbiAgZm9ybUdyb3VwOiBhbnkgPSBudWxsOyAvLyBBbmd1bGFyIGZvcm1Hcm91cCwgd2hpY2ggcG93ZXJzIHRoZSByZWFjdGl2ZSBmb3JtXG4gIGZyYW1ld29yazogYW55ID0gbnVsbDsgLy8gQWN0aXZlIGZyYW1ld29yayBjb21wb25lbnRcbiAgZm9ybU9wdGlvbnM6IGFueTsgLy8gQWN0aXZlIG9wdGlvbnMsIHVzZWQgdG8gY29uZmlndXJlIHRoZSBmb3JtXG5cbiAgdmFsaWREYXRhOiBhbnkgPSBudWxsOyAvLyBWYWxpZCBmb3JtIGRhdGEgKG9yIG51bGwpICg9PT0gaXNWYWxpZCA/IGRhdGEgOiBudWxsKVxuICBpc1ZhbGlkOiBib29sZWFuID0gbnVsbDsgLy8gSXMgY3VycmVudCBmb3JtIGRhdGEgdmFsaWQ/XG4gIGFqdkVycm9yczogYW55ID0gbnVsbDsgLy8gQWp2IGVycm9ycyBmb3IgY3VycmVudCBkYXRhXG4gIHZhbGlkYXRpb25FcnJvcnM6IGFueSA9IG51bGw7IC8vIEFueSB2YWxpZGF0aW9uIGVycm9ycyBmb3IgY3VycmVudCBkYXRhXG4gIGRhdGFFcnJvcnM6IGFueSA9IG5ldyBNYXAoKTsgLy9cbiAgZm9ybVZhbHVlU3Vic2NyaXB0aW9uOiBhbnkgPSBudWxsOyAvLyBTdWJzY3JpcHRpb24gdG8gZm9ybUdyb3VwLnZhbHVlQ2hhbmdlcyBvYnNlcnZhYmxlIChmb3IgdW4tIGFuZCByZS1zdWJzY3JpYmluZylcbiAgZGF0YUNoYW5nZXM6IFN1YmplY3Q8YW55PiA9IG5ldyBTdWJqZWN0KCk7IC8vIEZvcm0gZGF0YSBvYnNlcnZhYmxlXG4gIGlzVmFsaWRDaGFuZ2VzOiBTdWJqZWN0PGFueT4gPSBuZXcgU3ViamVjdCgpOyAvLyBpc1ZhbGlkIG9ic2VydmFibGVcbiAgdmFsaWRhdGlvbkVycm9yQ2hhbmdlczogU3ViamVjdDxhbnk+ID0gbmV3IFN1YmplY3QoKTsgLy8gdmFsaWRhdGlvbkVycm9ycyBvYnNlcnZhYmxlXG5cbiAgYXJyYXlNYXA6IE1hcDxzdHJpbmcsIG51bWJlcj4gPSBuZXcgTWFwKCk7IC8vIE1hcHMgYXJyYXlzIGluIGRhdGEgb2JqZWN0IGFuZCBudW1iZXIgb2YgdHVwbGUgdmFsdWVzXG4gIGRhdGFNYXA6IE1hcDxzdHJpbmcsIGFueT4gPSBuZXcgTWFwKCk7IC8vIE1hcHMgcGF0aHMgaW4gZm9ybSBkYXRhIHRvIHNjaGVtYSBhbmQgZm9ybUdyb3VwIHBhdGhzXG4gIGRhdGFSZWN1cnNpdmVSZWZNYXA6IE1hcDxzdHJpbmcsIHN0cmluZz4gPSBuZXcgTWFwKCk7IC8vIE1hcHMgcmVjdXJzaXZlIHJlZmVyZW5jZSBwb2ludHMgaW4gZm9ybSBkYXRhXG4gIHNjaGVtYVJlY3Vyc2l2ZVJlZk1hcDogTWFwPHN0cmluZywgc3RyaW5nPiA9IG5ldyBNYXAoKTsgLy8gTWFwcyByZWN1cnNpdmUgcmVmZXJlbmNlIHBvaW50cyBpbiBzY2hlbWFcbiAgc2NoZW1hUmVmTGlicmFyeTogYW55ID0ge307IC8vIExpYnJhcnkgb2Ygc2NoZW1hcyBmb3IgcmVzb2x2aW5nIHNjaGVtYSAkcmVmc1xuICBsYXlvdXRSZWZMaWJyYXJ5OiBhbnkgPSB7ICcnOiBudWxsIH07IC8vIExpYnJhcnkgb2YgbGF5b3V0IG5vZGVzIGZvciBhZGRpbmcgdG8gZm9ybVxuICB0ZW1wbGF0ZVJlZkxpYnJhcnk6IGFueSA9IHt9OyAvLyBMaWJyYXJ5IG9mIGZvcm1Hcm91cCB0ZW1wbGF0ZXMgZm9yIGFkZGluZyB0byBmb3JtXG4gIGhhc1Jvb3RSZWZlcmVuY2UgPSBmYWxzZTsgLy8gRG9lcyB0aGUgZm9ybSBpbmNsdWRlIGEgcmVjdXJzaXZlIHJlZmVyZW5jZSB0byBpdHNlbGY/XG5cbiAgbGFuZ3VhZ2UgPSAnZW4tVVMnOyAvLyBEb2VzIHRoZSBmb3JtIGluY2x1ZGUgYSByZWN1cnNpdmUgcmVmZXJlbmNlIHRvIGl0c2VsZj9cblxuICAvLyBEZWZhdWx0IGdsb2JhbCBmb3JtIG9wdGlvbnNcbiAgZGVmYXVsdEZvcm1PcHRpb25zOiBhbnkgPSB7XG4gICAgYWRkU3VibWl0OiAnYXV0bycsIC8vIEFkZCBhIHN1Ym1pdCBidXR0b24gaWYgbGF5b3V0IGRvZXMgbm90IGhhdmUgb25lP1xuICAgICAgLy8gZm9yIGFkZFN1Ym1pdDogdHJ1ZSA9IGFsd2F5cywgZmFsc2UgPSBuZXZlcixcbiAgICAgIC8vICdhdXRvJyA9IG9ubHkgaWYgbGF5b3V0IGlzIHVuZGVmaW5lZCAoZm9ybSBpcyBidWlsdCBmcm9tIHNjaGVtYSBhbG9uZSlcbiAgICBkZWJ1ZzogZmFsc2UsIC8vIFNob3cgZGVidWdnaW5nIG91dHB1dD9cbiAgICBkaXNhYmxlSW52YWxpZFN1Ym1pdDogdHJ1ZSwgLy8gRGlzYWJsZSBzdWJtaXQgaWYgZm9ybSBpbnZhbGlkP1xuICAgIGZvcm1EaXNhYmxlZDogZmFsc2UsIC8vIFNldCBlbnRpcmUgZm9ybSBhcyBkaXNhYmxlZD8gKG5vdCBlZGl0YWJsZSwgYW5kIGRpc2FibGVzIG91dHB1dHMpXG4gICAgZm9ybVJlYWRvbmx5OiBmYWxzZSwgLy8gU2V0IGVudGlyZSBmb3JtIGFzIHJlYWQgb25seT8gKG5vdCBlZGl0YWJsZSwgYnV0IG91dHB1dHMgc3RpbGwgZW5hYmxlZClcbiAgICBmaWVsZHNSZXF1aXJlZDogZmFsc2UsIC8vIChzZXQgYXV0b21hdGljYWxseSkgQXJlIHRoZXJlIGFueSByZXF1aXJlZCBmaWVsZHMgaW4gdGhlIGZvcm0/XG4gICAgZnJhbWV3b3JrOiAnbm8tZnJhbWV3b3JrJywgLy8gVGhlIGZyYW1ld29yayB0byBsb2FkXG4gICAgbG9hZEV4dGVybmFsQXNzZXRzOiBmYWxzZSwgLy8gTG9hZCBleHRlcm5hbCBjc3MgYW5kIEphdmFTY3JpcHQgZm9yIGZyYW1ld29yaz9cbiAgICBwcmlzdGluZTogeyBlcnJvcnM6IHRydWUsIHN1Y2Nlc3M6IHRydWUgfSxcbiAgICBzdXByZXNzUHJvcGVydHlUaXRsZXM6IGZhbHNlLFxuICAgIHNldFNjaGVtYURlZmF1bHRzOiAnYXV0bycsIC8vIFNldCBmZWZhdWx0IHZhbHVlcyBmcm9tIHNjaGVtYT9cbiAgICAgIC8vIHRydWUgPSBhbHdheXMgc2V0ICh1bmxlc3Mgb3ZlcnJpZGRlbiBieSBsYXlvdXQgZGVmYXVsdCBvciBmb3JtVmFsdWVzKVxuICAgICAgLy8gZmFsc2UgPSBuZXZlciBzZXRcbiAgICAgIC8vICdhdXRvJyA9IHNldCBpbiBhZGRhYmxlIGNvbXBvbmVudHMsIGFuZCBldmVyeXdoZXJlIGlmIGZvcm1WYWx1ZXMgbm90IHNldFxuICAgIHNldExheW91dERlZmF1bHRzOiAnYXV0bycsIC8vIFNldCBmZWZhdWx0IHZhbHVlcyBmcm9tIGxheW91dD9cbiAgICAgIC8vIHRydWUgPSBhbHdheXMgc2V0ICh1bmxlc3Mgb3ZlcnJpZGRlbiBieSBmb3JtVmFsdWVzKVxuICAgICAgLy8gZmFsc2UgPSBuZXZlciBzZXRcbiAgICAgIC8vICdhdXRvJyA9IHNldCBpbiBhZGRhYmxlIGNvbXBvbmVudHMsIGFuZCBldmVyeXdoZXJlIGlmIGZvcm1WYWx1ZXMgbm90IHNldFxuICAgIHZhbGlkYXRlT25SZW5kZXI6ICdhdXRvJywgLy8gVmFsaWRhdGUgZmllbGRzIGltbWVkaWF0ZWx5LCBiZWZvcmUgdGhleSBhcmUgdG91Y2hlZD9cbiAgICAgIC8vIHRydWUgPSB2YWxpZGF0ZSBhbGwgZmllbGRzIGltbWVkaWF0ZWx5XG4gICAgICAvLyBmYWxzZSA9IG9ubHkgdmFsaWRhdGUgZmllbGRzIGFmdGVyIHRoZXkgYXJlIHRvdWNoZWQgYnkgdXNlclxuICAgICAgLy8gJ2F1dG8nID0gdmFsaWRhdGUgZmllbGRzIHdpdGggdmFsdWVzIGltbWVkaWF0ZWx5LCBlbXB0eSBmaWVsZHMgYWZ0ZXIgdGhleSBhcmUgdG91Y2hlZFxuICAgIHdpZGdldHM6IHt9LCAvLyBBbnkgY3VzdG9tIHdpZGdldHMgdG8gbG9hZFxuICAgIGRlZmF1dFdpZGdldE9wdGlvbnM6IHsgLy8gRGVmYXVsdCBvcHRpb25zIGZvciBmb3JtIGNvbnRyb2wgd2lkZ2V0c1xuICAgICAgbGlzdEl0ZW1zOiAxLCAvLyBOdW1iZXIgb2YgbGlzdCBpdGVtcyB0byBpbml0aWFsbHkgYWRkIHRvIGFycmF5cyB3aXRoIG5vIGRlZmF1bHQgdmFsdWVcbiAgICAgIGFkZGFibGU6IHRydWUsIC8vIEFsbG93IGFkZGluZyBpdGVtcyB0byBhbiBhcnJheSBvciAkcmVmIHBvaW50P1xuICAgICAgb3JkZXJhYmxlOiB0cnVlLCAvLyBBbGxvdyByZW9yZGVyaW5nIGl0ZW1zIHdpdGhpbiBhbiBhcnJheT9cbiAgICAgIHJlbW92YWJsZTogdHJ1ZSwgLy8gQWxsb3cgcmVtb3ZpbmcgaXRlbXMgZnJvbSBhbiBhcnJheSBvciAkcmVmIHBvaW50P1xuICAgICAgZW5hYmxlRXJyb3JTdGF0ZTogdHJ1ZSwgLy8gQXBwbHkgJ2hhcy1lcnJvcicgY2xhc3Mgd2hlbiBmaWVsZCBmYWlscyB2YWxpZGF0aW9uP1xuICAgICAgLy8gZGlzYWJsZUVycm9yU3RhdGU6IGZhbHNlLCAvLyBEb24ndCBhcHBseSAnaGFzLWVycm9yJyBjbGFzcyB3aGVuIGZpZWxkIGZhaWxzIHZhbGlkYXRpb24/XG4gICAgICBlbmFibGVTdWNjZXNzU3RhdGU6IHRydWUsIC8vIEFwcGx5ICdoYXMtc3VjY2VzcycgY2xhc3Mgd2hlbiBmaWVsZCB2YWxpZGF0ZXM/XG4gICAgICAvLyBkaXNhYmxlU3VjY2Vzc1N0YXRlOiBmYWxzZSwgLy8gRG9uJ3QgYXBwbHkgJ2hhcy1zdWNjZXNzJyBjbGFzcyB3aGVuIGZpZWxkIHZhbGlkYXRlcz9cbiAgICAgIGZlZWRiYWNrOiBmYWxzZSwgLy8gU2hvdyBpbmxpbmUgZmVlZGJhY2sgaWNvbnM/XG4gICAgICBmZWVkYmFja09uUmVuZGVyOiBmYWxzZSwgLy8gU2hvdyBlcnJvck1lc3NhZ2Ugb24gUmVuZGVyP1xuICAgICAgbm90aXRsZTogZmFsc2UsIC8vIEhpZGUgdGl0bGU/XG4gICAgICBkaXNhYmxlZDogZmFsc2UsIC8vIFNldCBjb250cm9sIGFzIGRpc2FibGVkPyAobm90IGVkaXRhYmxlLCBhbmQgZXhjbHVkZWQgZnJvbSBvdXRwdXQpXG4gICAgICByZWFkb25seTogZmFsc2UsIC8vIFNldCBjb250cm9sIGFzIHJlYWQgb25seT8gKG5vdCBlZGl0YWJsZSwgYnV0IGluY2x1ZGVkIGluIG91dHB1dClcbiAgICAgIHJldHVybkVtcHR5RmllbGRzOiB0cnVlLCAvLyByZXR1cm4gdmFsdWVzIGZvciBmaWVsZHMgdGhhdCBjb250YWluIG5vIGRhdGE/XG4gICAgICB2YWxpZGF0aW9uTWVzc2FnZXM6IHt9IC8vIHNldCBieSBzZXRMYW5ndWFnZSgpXG4gICAgfSxcbiAgfTtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnNldExhbmd1YWdlKHRoaXMubGFuZ3VhZ2UpO1xuICB9XG5cbiAgc2V0TGFuZ3VhZ2UobGFuZ3VhZ2U6IHN0cmluZyA9ICdlbi1VUycpIHtcbiAgICB0aGlzLmxhbmd1YWdlID0gbGFuZ3VhZ2U7XG4gICAgY29uc3QgdmFsaWRhdGlvbk1lc3NhZ2VzID0gbGFuZ3VhZ2Uuc2xpY2UoMCwgMikgPT09ICdmcicgP1xuICAgICAgZnJWYWxpZGF0aW9uTWVzc2FnZXMgOiBlblZhbGlkYXRpb25NZXNzYWdlcztcbiAgICB0aGlzLmRlZmF1bHRGb3JtT3B0aW9ucy5kZWZhdXRXaWRnZXRPcHRpb25zLnZhbGlkYXRpb25NZXNzYWdlcyA9XG4gICAgICBfLmNsb25lRGVlcCh2YWxpZGF0aW9uTWVzc2FnZXMpO1xuICB9XG5cbiAgZ2V0RGF0YSgpIHsgcmV0dXJuIHRoaXMuZGF0YTsgfVxuXG4gIGdldFNjaGVtYSgpIHsgcmV0dXJuIHRoaXMuc2NoZW1hOyB9XG5cbiAgZ2V0TGF5b3V0KCkgeyByZXR1cm4gdGhpcy5sYXlvdXQ7IH1cblxuICByZXNldEFsbFZhbHVlcygpIHtcbiAgICB0aGlzLkpzb25Gb3JtQ29tcGF0aWJpbGl0eSA9IGZhbHNlO1xuICAgIHRoaXMuUmVhY3RKc29uU2NoZW1hRm9ybUNvbXBhdGliaWxpdHkgPSBmYWxzZTtcbiAgICB0aGlzLkFuZ3VsYXJTY2hlbWFGb3JtQ29tcGF0aWJpbGl0eSA9IGZhbHNlO1xuICAgIHRoaXMudHBsZGF0YSA9IHt9O1xuICAgIHRoaXMudmFsaWRhdGVGb3JtRGF0YSA9IG51bGw7XG4gICAgdGhpcy5mb3JtVmFsdWVzID0ge307XG4gICAgdGhpcy5zY2hlbWEgPSB7fTtcbiAgICB0aGlzLmxheW91dCA9IFtdO1xuICAgIHRoaXMuZm9ybUdyb3VwVGVtcGxhdGUgPSB7fTtcbiAgICB0aGlzLmZvcm1Hcm91cCA9IG51bGw7XG4gICAgdGhpcy5mcmFtZXdvcmsgPSBudWxsO1xuICAgIHRoaXMuZGF0YSA9IHt9O1xuICAgIHRoaXMudmFsaWREYXRhID0gbnVsbDtcbiAgICB0aGlzLmlzVmFsaWQgPSBudWxsO1xuICAgIHRoaXMudmFsaWRhdGlvbkVycm9ycyA9IG51bGw7XG4gICAgdGhpcy5hcnJheU1hcCA9IG5ldyBNYXAoKTtcbiAgICB0aGlzLmRhdGFNYXAgPSBuZXcgTWFwKCk7XG4gICAgdGhpcy5kYXRhUmVjdXJzaXZlUmVmTWFwID0gbmV3IE1hcCgpO1xuICAgIHRoaXMuc2NoZW1hUmVjdXJzaXZlUmVmTWFwID0gbmV3IE1hcCgpO1xuICAgIHRoaXMubGF5b3V0UmVmTGlicmFyeSA9IHt9O1xuICAgIHRoaXMuc2NoZW1hUmVmTGlicmFyeSA9IHt9O1xuICAgIHRoaXMudGVtcGxhdGVSZWZMaWJyYXJ5ID0ge307XG4gICAgdGhpcy5mb3JtT3B0aW9ucyA9IF8uY2xvbmVEZWVwKHRoaXMuZGVmYXVsdEZvcm1PcHRpb25zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiAnYnVpbGRSZW1vdGVFcnJvcicgZnVuY3Rpb25cbiAgICpcbiAgICogRXhhbXBsZSBlcnJvcnM6XG4gICAqIHtcbiAgICogICBsYXN0X25hbWU6IFsge1xuICAgKiAgICAgbWVzc2FnZTogJ0xhc3QgbmFtZSBtdXN0IGJ5IHN0YXJ0IHdpdGggY2FwaXRhbCBsZXR0ZXIuJyxcbiAgICogICAgIGNvZGU6ICdjYXBpdGFsX2xldHRlcidcbiAgICogICB9IF0sXG4gICAqICAgZW1haWw6IFsge1xuICAgKiAgICAgbWVzc2FnZTogJ0VtYWlsIG11c3QgYmUgZnJvbSBleGFtcGxlLmNvbSBkb21haW4uJyxcbiAgICogICAgIGNvZGU6ICdzcGVjaWFsX2RvbWFpbidcbiAgICogICB9LCB7XG4gICAqICAgICBtZXNzYWdlOiAnRW1haWwgbXVzdCBjb250YWluIGFuIEAgc3ltYm9sLicsXG4gICAqICAgICBjb2RlOiAnYXRfc3ltYm9sJ1xuICAgKiAgIH0gXVxuICAgKiB9XG4gICAqIC8ve0Vycm9yTWVzc2FnZXN9IGVycm9yc1xuICAgKi9cbiAgYnVpbGRSZW1vdGVFcnJvcihlcnJvcnM6IEVycm9yTWVzc2FnZXMpIHtcbiAgICBmb3JFYWNoKGVycm9ycywgKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgIGlmIChrZXkgaW4gdGhpcy5mb3JtR3JvdXAuY29udHJvbHMpIHtcbiAgICAgICAgZm9yIChjb25zdCBlcnJvciBvZiB2YWx1ZSkge1xuICAgICAgICAgIGNvbnN0IGVyciA9IHt9O1xuICAgICAgICAgIGVycltlcnJvclsnY29kZSddXSA9IGVycm9yWydtZXNzYWdlJ107XG4gICAgICAgICAgdGhpcy5mb3JtR3JvdXAuZ2V0KGtleSkuc2V0RXJyb3JzKGVyciwgeyBlbWl0RXZlbnQ6IHRydWUgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHZhbGlkYXRlRGF0YShuZXdWYWx1ZTogYW55LCB1cGRhdGVTdWJzY3JpcHRpb25zID0gdHJ1ZSk6IHZvaWQge1xuXG4gICAgLy8gRm9ybWF0IHJhdyBmb3JtIGRhdGEgdG8gY29ycmVjdCBkYXRhIHR5cGVzXG4gICAgdGhpcy5kYXRhID0gZm9ybWF0Rm9ybURhdGEoXG4gICAgICBuZXdWYWx1ZSwgdGhpcy5kYXRhTWFwLCB0aGlzLmRhdGFSZWN1cnNpdmVSZWZNYXAsXG4gICAgICB0aGlzLmFycmF5TWFwLCB0aGlzLmZvcm1PcHRpb25zLnJldHVybkVtcHR5RmllbGRzXG4gICAgKTtcbiAgICB0aGlzLmlzVmFsaWQgPSB0aGlzLnZhbGlkYXRlRm9ybURhdGEodGhpcy5kYXRhKTtcbiAgICB0aGlzLnZhbGlkRGF0YSA9IHRoaXMuaXNWYWxpZCA/IHRoaXMuZGF0YSA6IG51bGw7XG4gICAgY29uc3QgY29tcGlsZUVycm9ycyA9IGVycm9ycyA9PiB7XG4gICAgICBjb25zdCBjb21waWxlZEVycm9ycyA9IHt9O1xuICAgICAgKGVycm9ycyB8fCBbXSkuZm9yRWFjaChlcnJvciA9PiB7XG4gICAgICAgIGlmICghY29tcGlsZWRFcnJvcnNbZXJyb3IuZGF0YVBhdGhdKSB7IGNvbXBpbGVkRXJyb3JzW2Vycm9yLmRhdGFQYXRoXSA9IFtdOyB9XG4gICAgICAgIGNvbXBpbGVkRXJyb3JzW2Vycm9yLmRhdGFQYXRoXS5wdXNoKGVycm9yLm1lc3NhZ2UpO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gY29tcGlsZWRFcnJvcnM7XG4gICAgfTtcbiAgICB0aGlzLmFqdkVycm9ycyA9IHRoaXMudmFsaWRhdGVGb3JtRGF0YS5lcnJvcnM7XG4gICAgdGhpcy52YWxpZGF0aW9uRXJyb3JzID0gY29tcGlsZUVycm9ycyh0aGlzLnZhbGlkYXRlRm9ybURhdGEuZXJyb3JzKTtcbiAgICBpZiAodXBkYXRlU3Vic2NyaXB0aW9ucykge1xuICAgICAgdGhpcy5kYXRhQ2hhbmdlcy5uZXh0KHRoaXMuZGF0YSk7XG4gICAgICB0aGlzLmlzVmFsaWRDaGFuZ2VzLm5leHQodGhpcy5pc1ZhbGlkKTtcbiAgICAgIHRoaXMudmFsaWRhdGlvbkVycm9yQ2hhbmdlcy5uZXh0KHRoaXMuYWp2RXJyb3JzKTtcbiAgICB9XG4gIH1cblxuICBidWlsZEZvcm1Hcm91cFRlbXBsYXRlKGZvcm1WYWx1ZXM6IGFueSA9IG51bGwsIHNldFZhbHVlcyA9IHRydWUpIHtcbiAgICB0aGlzLmZvcm1Hcm91cFRlbXBsYXRlID0gYnVpbGRGb3JtR3JvdXBUZW1wbGF0ZSh0aGlzLCBmb3JtVmFsdWVzLCBzZXRWYWx1ZXMpO1xuICB9XG5cbiAgYnVpbGRGb3JtR3JvdXAoKSB7XG4gICAgdGhpcy5mb3JtR3JvdXAgPSA8Rm9ybUdyb3VwPmJ1aWxkRm9ybUdyb3VwKHRoaXMuZm9ybUdyb3VwVGVtcGxhdGUpO1xuICAgIGlmICh0aGlzLmZvcm1Hcm91cCkge1xuICAgICAgdGhpcy5jb21waWxlQWp2U2NoZW1hKCk7XG4gICAgICB0aGlzLnZhbGlkYXRlRGF0YSh0aGlzLmZvcm1Hcm91cC52YWx1ZSk7XG5cbiAgICAgIC8vIFNldCB1cCBvYnNlcnZhYmxlcyB0byBlbWl0IGRhdGEgYW5kIHZhbGlkYXRpb24gaW5mbyB3aGVuIGZvcm0gZGF0YSBjaGFuZ2VzXG4gICAgICBpZiAodGhpcy5mb3JtVmFsdWVTdWJzY3JpcHRpb24pIHsgdGhpcy5mb3JtVmFsdWVTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTsgfVxuICAgICAgdGhpcy5mb3JtVmFsdWVTdWJzY3JpcHRpb24gPSB0aGlzLmZvcm1Hcm91cC52YWx1ZUNoYW5nZXNcbiAgICAgICAgLnN1YnNjcmliZShmb3JtVmFsdWUgPT4gdGhpcy52YWxpZGF0ZURhdGEoZm9ybVZhbHVlKSk7XG4gICAgfVxuICB9XG5cbiAgYnVpbGRMYXlvdXQod2lkZ2V0TGlicmFyeTogYW55KSB7XG4gICAgdGhpcy5sYXlvdXQgPSBidWlsZExheW91dCh0aGlzLCB3aWRnZXRMaWJyYXJ5KTtcbiAgfVxuXG4gIHNldE9wdGlvbnMobmV3T3B0aW9uczogYW55KSB7XG4gICAgaWYgKGlzT2JqZWN0KG5ld09wdGlvbnMpKSB7XG4gICAgICBjb25zdCBhZGRPcHRpb25zID0gXy5jbG9uZURlZXAobmV3T3B0aW9ucyk7XG4gICAgICAvLyBCYWNrd2FyZCBjb21wYXRpYmlsaXR5IGZvciAnZGVmYXVsdE9wdGlvbnMnIChyZW5hbWVkICdkZWZhdXRXaWRnZXRPcHRpb25zJylcbiAgICAgIGlmIChpc09iamVjdChhZGRPcHRpb25zLmRlZmF1bHRPcHRpb25zKSkge1xuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMuZm9ybU9wdGlvbnMuZGVmYXV0V2lkZ2V0T3B0aW9ucywgYWRkT3B0aW9ucy5kZWZhdWx0T3B0aW9ucyk7XG4gICAgICAgIGRlbGV0ZSBhZGRPcHRpb25zLmRlZmF1bHRPcHRpb25zO1xuICAgICAgfVxuICAgICAgaWYgKGlzT2JqZWN0KGFkZE9wdGlvbnMuZGVmYXV0V2lkZ2V0T3B0aW9ucykpIHtcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLmZvcm1PcHRpb25zLmRlZmF1dFdpZGdldE9wdGlvbnMsIGFkZE9wdGlvbnMuZGVmYXV0V2lkZ2V0T3B0aW9ucyk7XG4gICAgICAgIGRlbGV0ZSBhZGRPcHRpb25zLmRlZmF1dFdpZGdldE9wdGlvbnM7XG4gICAgICB9XG4gICAgICBPYmplY3QuYXNzaWduKHRoaXMuZm9ybU9wdGlvbnMsIGFkZE9wdGlvbnMpO1xuXG4gICAgICAvLyBjb252ZXJ0IGRpc2FibGVFcnJvclN0YXRlIC8gZGlzYWJsZVN1Y2Nlc3NTdGF0ZSB0byBlbmFibGUuLi5cbiAgICAgIGNvbnN0IGdsb2JhbERlZmF1bHRzID0gdGhpcy5mb3JtT3B0aW9ucy5kZWZhdXRXaWRnZXRPcHRpb25zO1xuICAgICAgWydFcnJvclN0YXRlJywgJ1N1Y2Nlc3NTdGF0ZSddXG4gICAgICAgIC5maWx0ZXIoc3VmZml4ID0+IGhhc093bihnbG9iYWxEZWZhdWx0cywgJ2Rpc2FibGUnICsgc3VmZml4KSlcbiAgICAgICAgLmZvckVhY2goc3VmZml4ID0+IHtcbiAgICAgICAgICBnbG9iYWxEZWZhdWx0c1snZW5hYmxlJyArIHN1ZmZpeF0gPSAhZ2xvYmFsRGVmYXVsdHNbJ2Rpc2FibGUnICsgc3VmZml4XTtcbiAgICAgICAgICBkZWxldGUgZ2xvYmFsRGVmYXVsdHNbJ2Rpc2FibGUnICsgc3VmZml4XTtcbiAgICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgY29tcGlsZUFqdlNjaGVtYSgpIHtcbiAgICBpZiAoIXRoaXMudmFsaWRhdGVGb3JtRGF0YSkge1xuXG4gICAgICAvLyBpZiAndWk6b3JkZXInIGV4aXN0cyBpbiBwcm9wZXJ0aWVzLCBtb3ZlIGl0IHRvIHJvb3QgYmVmb3JlIGNvbXBpbGluZyB3aXRoIGFqdlxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkodGhpcy5zY2hlbWEucHJvcGVydGllc1sndWk6b3JkZXInXSkpIHtcbiAgICAgICAgdGhpcy5zY2hlbWFbJ3VpOm9yZGVyJ10gPSB0aGlzLnNjaGVtYS5wcm9wZXJ0aWVzWyd1aTpvcmRlciddO1xuICAgICAgICBkZWxldGUgdGhpcy5zY2hlbWEucHJvcGVydGllc1sndWk6b3JkZXInXTtcbiAgICAgIH1cbiAgICAgIHRoaXMuYWp2LnJlbW92ZVNjaGVtYSh0aGlzLnNjaGVtYSk7XG4gICAgICB0aGlzLnZhbGlkYXRlRm9ybURhdGEgPSB0aGlzLmFqdi5jb21waWxlKHRoaXMuc2NoZW1hKTtcbiAgICB9XG4gIH1cblxuICBidWlsZFNjaGVtYUZyb21EYXRhKGRhdGE/OiBhbnksIHJlcXVpcmVBbGxGaWVsZHMgPSBmYWxzZSk6IGFueSB7XG4gICAgaWYgKGRhdGEpIHsgcmV0dXJuIGJ1aWxkU2NoZW1hRnJvbURhdGEoZGF0YSwgcmVxdWlyZUFsbEZpZWxkcyk7IH1cbiAgICB0aGlzLnNjaGVtYSA9IGJ1aWxkU2NoZW1hRnJvbURhdGEodGhpcy5mb3JtVmFsdWVzLCByZXF1aXJlQWxsRmllbGRzKTtcbiAgfVxuXG4gIGJ1aWxkU2NoZW1hRnJvbUxheW91dChsYXlvdXQ/OiBhbnkpOiBhbnkge1xuICAgIGlmIChsYXlvdXQpIHsgcmV0dXJuIGJ1aWxkU2NoZW1hRnJvbUxheW91dChsYXlvdXQpOyB9XG4gICAgdGhpcy5zY2hlbWEgPSBidWlsZFNjaGVtYUZyb21MYXlvdXQodGhpcy5sYXlvdXQpO1xuICB9XG5cblxuICBzZXRUcGxkYXRhKG5ld1RwbGRhdGE6IGFueSA9IHt9KTogdm9pZCB7XG4gICAgdGhpcy50cGxkYXRhID0gbmV3VHBsZGF0YTtcbiAgfVxuXG4gIHBhcnNlVGV4dChcbiAgICB0ZXh0ID0gJycsIHZhbHVlOiBhbnkgPSB7fSwgdmFsdWVzOiBhbnkgPSB7fSwga2V5OiBudW1iZXJ8c3RyaW5nID0gbnVsbFxuICApOiBzdHJpbmcge1xuICAgIGlmICghdGV4dCB8fCAhL3t7Lis/fX0vLnRlc3QodGV4dCkpIHsgcmV0dXJuIHRleHQ7IH1cbiAgICByZXR1cm4gdGV4dC5yZXBsYWNlKC97eyguKz8pfX0vZywgKC4uLmEpID0+XG4gICAgICB0aGlzLnBhcnNlRXhwcmVzc2lvbihhWzFdLCB2YWx1ZSwgdmFsdWVzLCBrZXksIHRoaXMudHBsZGF0YSlcbiAgICApO1xuICB9XG5cbiAgcGFyc2VFeHByZXNzaW9uKFxuICAgIGV4cHJlc3Npb24gPSAnJywgdmFsdWU6IGFueSA9IHt9LCB2YWx1ZXM6IGFueSA9IHt9LFxuICAgIGtleTogbnVtYmVyfHN0cmluZyA9IG51bGwsIHRwbGRhdGE6IGFueSA9IG51bGxcbiAgKSB7XG4gICAgaWYgKHR5cGVvZiBleHByZXNzaW9uICE9PSAnc3RyaW5nJykgeyByZXR1cm4gJyc7IH1cbiAgICBjb25zdCBpbmRleCA9IHR5cGVvZiBrZXkgPT09ICdudW1iZXInID8gKGtleSArIDEpICsgJycgOiAoa2V5IHx8ICcnKTtcbiAgICBleHByZXNzaW9uID0gZXhwcmVzc2lvbi50cmltKCk7XG4gICAgaWYgKChleHByZXNzaW9uWzBdID09PSBcIidcIiB8fCBleHByZXNzaW9uWzBdID09PSAnXCInKSAmJlxuICAgICAgZXhwcmVzc2lvblswXSA9PT0gZXhwcmVzc2lvbltleHByZXNzaW9uLmxlbmd0aCAtIDFdICYmXG4gICAgICBleHByZXNzaW9uLnNsaWNlKDEsIGV4cHJlc3Npb24ubGVuZ3RoIC0gMSkuaW5kZXhPZihleHByZXNzaW9uWzBdKSA9PT0gLTFcbiAgICApIHtcbiAgICAgIHJldHVybiBleHByZXNzaW9uLnNsaWNlKDEsIGV4cHJlc3Npb24ubGVuZ3RoIC0gMSk7XG4gICAgfVxuICAgIGlmIChleHByZXNzaW9uID09PSAnaWR4JyB8fCBleHByZXNzaW9uID09PSAnJGluZGV4JykgeyByZXR1cm4gaW5kZXg7IH1cbiAgICBpZiAoZXhwcmVzc2lvbiA9PT0gJ3ZhbHVlJyAmJiAhaGFzT3duKHZhbHVlcywgJ3ZhbHVlJykpIHsgcmV0dXJuIHZhbHVlOyB9XG4gICAgaWYgKFsnXCInLCBcIidcIiwgJyAnLCAnfHwnLCAnJiYnLCAnKyddLmV2ZXJ5KGRlbGltID0+IGV4cHJlc3Npb24uaW5kZXhPZihkZWxpbSkgPT09IC0xKSkge1xuICAgICAgY29uc3QgcG9pbnRlciA9IEpzb25Qb2ludGVyLnBhcnNlT2JqZWN0UGF0aChleHByZXNzaW9uKTtcbiAgICAgIHJldHVybiBwb2ludGVyWzBdID09PSAndmFsdWUnICYmIEpzb25Qb2ludGVyLmhhcyh2YWx1ZSwgcG9pbnRlci5zbGljZSgxKSkgP1xuICAgICAgICAgIEpzb25Qb2ludGVyLmdldCh2YWx1ZSwgcG9pbnRlci5zbGljZSgxKSkgOlxuICAgICAgICBwb2ludGVyWzBdID09PSAndmFsdWVzJyAmJiBKc29uUG9pbnRlci5oYXModmFsdWVzLCBwb2ludGVyLnNsaWNlKDEpKSA/XG4gICAgICAgICAgSnNvblBvaW50ZXIuZ2V0KHZhbHVlcywgcG9pbnRlci5zbGljZSgxKSkgOlxuICAgICAgICBwb2ludGVyWzBdID09PSAndHBsZGF0YScgJiYgSnNvblBvaW50ZXIuaGFzKHRwbGRhdGEsIHBvaW50ZXIuc2xpY2UoMSkpID9cbiAgICAgICAgICBKc29uUG9pbnRlci5nZXQodHBsZGF0YSwgcG9pbnRlci5zbGljZSgxKSkgOlxuICAgICAgICBKc29uUG9pbnRlci5oYXModmFsdWVzLCBwb2ludGVyKSA/IEpzb25Qb2ludGVyLmdldCh2YWx1ZXMsIHBvaW50ZXIpIDogJyc7XG4gICAgfVxuICAgIGlmIChleHByZXNzaW9uLmluZGV4T2YoJ1tpZHhdJykgPiAtMSkge1xuICAgICAgZXhwcmVzc2lvbiA9IGV4cHJlc3Npb24ucmVwbGFjZSgvXFxbaWR4XFxdL2csIDxzdHJpbmc+aW5kZXgpO1xuICAgIH1cbiAgICBpZiAoZXhwcmVzc2lvbi5pbmRleE9mKCdbJGluZGV4XScpID4gLTEpIHtcbiAgICAgIGV4cHJlc3Npb24gPSBleHByZXNzaW9uLnJlcGxhY2UoL1xcWyRpbmRleFxcXS9nLCA8c3RyaW5nPmluZGV4KTtcbiAgICB9XG4gICAgLy8gVE9ETzogSW1wcm92ZSBleHByZXNzaW9uIGV2YWx1YXRpb24gYnkgcGFyc2luZyBxdW90ZWQgc3RyaW5ncyBmaXJzdFxuICAgIC8vIGxldCBleHByZXNzaW9uQXJyYXkgPSBleHByZXNzaW9uLm1hdGNoKC8oW15cIiddK3xcIlteXCJdK1wifCdbXiddKycpL2cpO1xuICAgIGlmIChleHByZXNzaW9uLmluZGV4T2YoJ3x8JykgPiAtMSkge1xuICAgICAgcmV0dXJuIGV4cHJlc3Npb24uc3BsaXQoJ3x8JykucmVkdWNlKChhbGwsIHRlcm0pID0+XG4gICAgICAgIGFsbCB8fCB0aGlzLnBhcnNlRXhwcmVzc2lvbih0ZXJtLCB2YWx1ZSwgdmFsdWVzLCBrZXksIHRwbGRhdGEpLCAnJ1xuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKGV4cHJlc3Npb24uaW5kZXhPZignJiYnKSA+IC0xKSB7XG4gICAgICByZXR1cm4gZXhwcmVzc2lvbi5zcGxpdCgnJiYnKS5yZWR1Y2UoKGFsbCwgdGVybSkgPT5cbiAgICAgICAgYWxsICYmIHRoaXMucGFyc2VFeHByZXNzaW9uKHRlcm0sIHZhbHVlLCB2YWx1ZXMsIGtleSwgdHBsZGF0YSksICcgJ1xuICAgICAgKS50cmltKCk7XG4gICAgfVxuICAgIGlmIChleHByZXNzaW9uLmluZGV4T2YoJysnKSA+IC0xKSB7XG4gICAgICByZXR1cm4gZXhwcmVzc2lvbi5zcGxpdCgnKycpXG4gICAgICAgIC5tYXAodGVybSA9PiB0aGlzLnBhcnNlRXhwcmVzc2lvbih0ZXJtLCB2YWx1ZSwgdmFsdWVzLCBrZXksIHRwbGRhdGEpKVxuICAgICAgICAuam9pbignJyk7XG4gICAgfVxuICAgIHJldHVybiAnJztcbiAgfVxuXG4gIHNldEFycmF5SXRlbVRpdGxlKFxuICAgIHBhcmVudEN0eDogYW55ID0ge30sIGNoaWxkTm9kZTogYW55ID0gbnVsbCwgaW5kZXg6IG51bWJlciA9IG51bGxcbiAgKTogc3RyaW5nIHtcbiAgICBjb25zdCBwYXJlbnROb2RlID0gcGFyZW50Q3R4LmxheW91dE5vZGU7XG4gICAgY29uc3QgcGFyZW50VmFsdWVzOiBhbnkgPSB0aGlzLmdldEZvcm1Db250cm9sVmFsdWUocGFyZW50Q3R4KTtcbiAgICBjb25zdCBpc0FycmF5SXRlbSA9XG4gICAgICAocGFyZW50Tm9kZS50eXBlIHx8ICcnKS5zbGljZSgtNSkgPT09ICdhcnJheScgJiYgaXNBcnJheShwYXJlbnRWYWx1ZXMpO1xuICAgIGNvbnN0IHRleHQgPSBKc29uUG9pbnRlci5nZXRGaXJzdChcbiAgICAgIGlzQXJyYXlJdGVtICYmIGNoaWxkTm9kZS50eXBlICE9PSAnJHJlZicgPyBbXG4gICAgICAgIFtjaGlsZE5vZGUsICcvb3B0aW9ucy9sZWdlbmQnXSxcbiAgICAgICAgW2NoaWxkTm9kZSwgJy9vcHRpb25zL3RpdGxlJ10sXG4gICAgICAgIFtwYXJlbnROb2RlLCAnL29wdGlvbnMvdGl0bGUnXSxcbiAgICAgICAgW3BhcmVudE5vZGUsICcvb3B0aW9ucy9sZWdlbmQnXSxcbiAgICAgIF0gOiBbXG4gICAgICAgIFtjaGlsZE5vZGUsICcvb3B0aW9ucy90aXRsZSddLFxuICAgICAgICBbY2hpbGROb2RlLCAnL29wdGlvbnMvbGVnZW5kJ10sXG4gICAgICAgIFtwYXJlbnROb2RlLCAnL29wdGlvbnMvdGl0bGUnXSxcbiAgICAgICAgW3BhcmVudE5vZGUsICcvb3B0aW9ucy9sZWdlbmQnXVxuICAgICAgXVxuICAgICk7XG4gICAgaWYgKCF0ZXh0KSB7IHJldHVybiB0ZXh0OyB9XG4gICAgY29uc3QgY2hpbGRWYWx1ZSA9IGlzQXJyYXkocGFyZW50VmFsdWVzKSAmJiBpbmRleCA8IHBhcmVudFZhbHVlcy5sZW5ndGggP1xuICAgICAgcGFyZW50VmFsdWVzW2luZGV4XSA6IHBhcmVudFZhbHVlcztcbiAgICByZXR1cm4gdGhpcy5wYXJzZVRleHQodGV4dCwgY2hpbGRWYWx1ZSwgcGFyZW50VmFsdWVzLCBpbmRleCk7XG4gIH1cblxuICBzZXRJdGVtVGl0bGUoY3R4OiBhbnkpIHtcbiAgICByZXR1cm4gIWN0eC5vcHRpb25zLnRpdGxlICYmIC9eKFxcZCt8LSkkLy50ZXN0KGN0eC5sYXlvdXROb2RlLm5hbWUpID9cbiAgICAgIG51bGwgOlxuICAgICAgdGhpcy5wYXJzZVRleHQoXG4gICAgICAgIGN0eC5vcHRpb25zLnRpdGxlIHx8IHRvVGl0bGVDYXNlKGN0eC5sYXlvdXROb2RlLm5hbWUpLFxuICAgICAgICB0aGlzLmdldEZvcm1Db250cm9sVmFsdWUodGhpcyksXG4gICAgICAgICh0aGlzLmdldEZvcm1Db250cm9sR3JvdXAodGhpcykgfHwgPGFueT57fSkudmFsdWUsXG4gICAgICAgIGN0eC5kYXRhSW5kZXhbY3R4LmRhdGFJbmRleC5sZW5ndGggLSAxXVxuICAgICAgKTtcbiAgfVxuXG4gIGV2YWx1YXRlQ29uZGl0aW9uKGxheW91dE5vZGU6IGFueSwgZGF0YUluZGV4OiBudW1iZXJbXSk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGFycmF5SW5kZXggPSBkYXRhSW5kZXggJiYgZGF0YUluZGV4W2RhdGFJbmRleC5sZW5ndGggLSAxXTtcbiAgICBsZXQgcmVzdWx0ID0gdHJ1ZTtcbiAgICBpZiAoaGFzVmFsdWUoKGxheW91dE5vZGUub3B0aW9ucyB8fCB7fSkuY29uZGl0aW9uKSkge1xuICAgICAgaWYgKHR5cGVvZiBsYXlvdXROb2RlLm9wdGlvbnMuY29uZGl0aW9uID09PSAnc3RyaW5nJykge1xuICAgICAgICBsZXQgcG9pbnRlciA9IGxheW91dE5vZGUub3B0aW9ucy5jb25kaXRpb25cbiAgICAgICAgaWYgKGhhc1ZhbHVlKGFycmF5SW5kZXgpKSB7XG4gICAgICAgICAgcG9pbnRlciA9IHBvaW50ZXIucmVwbGFjZSgnW2FycmF5SW5kZXhdJywgYFske2FycmF5SW5kZXh9XWApO1xuICAgICAgICB9XG4gICAgICAgIHBvaW50ZXIgPSBKc29uUG9pbnRlci5wYXJzZU9iamVjdFBhdGgocG9pbnRlcik7XG4gICAgICAgIHJlc3VsdCA9ICEhSnNvblBvaW50ZXIuZ2V0KHRoaXMuZGF0YSwgcG9pbnRlcik7XG4gICAgICAgIGlmICghcmVzdWx0ICYmIHBvaW50ZXJbMF0gPT09ICdtb2RlbCcpIHtcbiAgICAgICAgICByZXN1bHQgPSAhIUpzb25Qb2ludGVyLmdldCh7IG1vZGVsOiB0aGlzLmRhdGEgfSwgcG9pbnRlcik7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGxheW91dE5vZGUub3B0aW9ucy5jb25kaXRpb24gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcmVzdWx0ID0gbGF5b3V0Tm9kZS5vcHRpb25zLmNvbmRpdGlvbih0aGlzLmRhdGEpO1xuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgbGF5b3V0Tm9kZS5vcHRpb25zLmNvbmRpdGlvbi5mdW5jdGlvbkJvZHkgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgY29uc3QgZHluRm4gPSBuZXcgRnVuY3Rpb24oXG4gICAgICAgICAgICAnbW9kZWwnLCAnYXJyYXlJbmRpY2VzJywgbGF5b3V0Tm9kZS5vcHRpb25zLmNvbmRpdGlvbi5mdW5jdGlvbkJvZHlcbiAgICAgICAgICApO1xuICAgICAgICAgIHJlc3VsdCA9IGR5bkZuKHRoaXMuZGF0YSwgZGF0YUluZGV4KTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIHJlc3VsdCA9IHRydWU7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihcImNvbmRpdGlvbiBmdW5jdGlvbkJvZHkgZXJyb3JlZCBvdXQgb24gZXZhbHVhdGlvbjogXCIgKyBsYXlvdXROb2RlLm9wdGlvbnMuY29uZGl0aW9uLmZ1bmN0aW9uQm9keSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIGluaXRpYWxpemVDb250cm9sKGN0eDogYW55LCBiaW5kID0gdHJ1ZSk6IGJvb2xlYW4ge1xuICAgIGlmICghaXNPYmplY3QoY3R4KSkgeyByZXR1cm4gZmFsc2U7IH1cbiAgICBpZiAoaXNFbXB0eShjdHgub3B0aW9ucykpIHtcbiAgICAgIGN0eC5vcHRpb25zID0gIWlzRW1wdHkoKGN0eC5sYXlvdXROb2RlIHx8IHt9KS5vcHRpb25zKSA/XG4gICAgICAgIGN0eC5sYXlvdXROb2RlLm9wdGlvbnMgOiBfLmNsb25lRGVlcCh0aGlzLmZvcm1PcHRpb25zKTtcbiAgICB9XG4gICAgY3R4LmZvcm1Db250cm9sID0gdGhpcy5nZXRGb3JtQ29udHJvbChjdHgpO1xuICAgIGN0eC5ib3VuZENvbnRyb2wgPSBiaW5kICYmICEhY3R4LmZvcm1Db250cm9sO1xuICAgIGlmIChjdHguZm9ybUNvbnRyb2wpIHtcbiAgICAgIGN0eC5jb250cm9sTmFtZSA9IHRoaXMuZ2V0Rm9ybUNvbnRyb2xOYW1lKGN0eCk7XG4gICAgICBjdHguY29udHJvbFZhbHVlID0gY3R4LmZvcm1Db250cm9sLnZhbHVlO1xuICAgICAgY3R4LmNvbnRyb2xEaXNhYmxlZCA9IGN0eC5mb3JtQ29udHJvbC5kaXNhYmxlZDtcbiAgICAgIGN0eC5vcHRpb25zLmVycm9yTWVzc2FnZSA9IGN0eC5mb3JtQ29udHJvbC5zdGF0dXMgPT09ICdWQUxJRCcgPyBudWxsIDpcbiAgICAgICAgdGhpcy5mb3JtYXRFcnJvcnMoY3R4LmZvcm1Db250cm9sLmVycm9ycywgY3R4Lm9wdGlvbnMudmFsaWRhdGlvbk1lc3NhZ2VzKTtcbiAgICAgIGN0eC5vcHRpb25zLnNob3dFcnJvcnMgPSB0aGlzLmZvcm1PcHRpb25zLnZhbGlkYXRlT25SZW5kZXIgPT09IHRydWUgfHxcbiAgICAgICAgKHRoaXMuZm9ybU9wdGlvbnMudmFsaWRhdGVPblJlbmRlciA9PT0gJ2F1dG8nICYmIGhhc1ZhbHVlKGN0eC5jb250cm9sVmFsdWUpKTtcbiAgICAgIGN0eC5mb3JtQ29udHJvbC5zdGF0dXNDaGFuZ2VzLnN1YnNjcmliZShzdGF0dXMgPT5cbiAgICAgICAgY3R4Lm9wdGlvbnMuZXJyb3JNZXNzYWdlID0gc3RhdHVzID09PSAnVkFMSUQnID8gbnVsbCA6XG4gICAgICAgICAgdGhpcy5mb3JtYXRFcnJvcnMoY3R4LmZvcm1Db250cm9sLmVycm9ycywgY3R4Lm9wdGlvbnMudmFsaWRhdGlvbk1lc3NhZ2VzKVxuICAgICAgKTtcbiAgICAgIGN0eC5mb3JtQ29udHJvbC52YWx1ZUNoYW5nZXMuc3Vic2NyaWJlKHZhbHVlID0+IHtcbiAgICAgICAgaWYgKCFfLmlzRXF1YWwoY3R4LmNvbnRyb2xWYWx1ZSwgdmFsdWUpKSB7IGN0eC5jb250cm9sVmFsdWUgPSB2YWx1ZSB9XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgY3R4LmNvbnRyb2xOYW1lID0gY3R4LmxheW91dE5vZGUubmFtZTtcbiAgICAgIGN0eC5jb250cm9sVmFsdWUgPSBjdHgubGF5b3V0Tm9kZS52YWx1ZSB8fCBudWxsO1xuICAgICAgY29uc3QgZGF0YVBvaW50ZXIgPSB0aGlzLmdldERhdGFQb2ludGVyKGN0eCk7XG4gICAgICBpZiAoYmluZCAmJiBkYXRhUG9pbnRlcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKGB3YXJuaW5nOiBjb250cm9sIFwiJHtkYXRhUG9pbnRlcn1cIiBpcyBub3QgYm91bmQgdG8gdGhlIEFuZ3VsYXIgRm9ybUdyb3VwLmApO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gY3R4LmJvdW5kQ29udHJvbDtcbiAgfVxuXG4gIGZvcm1hdEVycm9ycyhlcnJvcnM6IGFueSwgdmFsaWRhdGlvbk1lc3NhZ2VzOiBhbnkgPSB7fSk6IHN0cmluZyB7XG4gICAgaWYgKGlzRW1wdHkoZXJyb3JzKSkgeyByZXR1cm4gbnVsbDsgfVxuICAgIGlmICghaXNPYmplY3QodmFsaWRhdGlvbk1lc3NhZ2VzKSkgeyB2YWxpZGF0aW9uTWVzc2FnZXMgPSB7fTsgfVxuICAgIGNvbnN0IGFkZFNwYWNlcyA9IHN0cmluZyA9PiBzdHJpbmdbMF0udG9VcHBlckNhc2UoKSArIChzdHJpbmcuc2xpY2UoMSkgfHwgJycpXG4gICAgICAucmVwbGFjZSgvKFthLXpdKShbQS1aXSkvZywgJyQxICQyJykucmVwbGFjZSgvXy9nLCAnICcpO1xuICAgIGNvbnN0IGZvcm1hdEVycm9yID0gKGVycm9yKSA9PiB0eXBlb2YgZXJyb3IgPT09ICdvYmplY3QnID9cbiAgICAgIE9iamVjdC5rZXlzKGVycm9yKS5tYXAoa2V5ID0+XG4gICAgICAgIGVycm9yW2tleV0gPT09IHRydWUgPyBhZGRTcGFjZXMoa2V5KSA6XG4gICAgICAgIGVycm9yW2tleV0gPT09IGZhbHNlID8gJ05vdCAnICsgYWRkU3BhY2VzKGtleSkgOlxuICAgICAgICBhZGRTcGFjZXMoa2V5KSArICc6ICcgKyBmb3JtYXRFcnJvcihlcnJvcltrZXldKVxuICAgICAgKS5qb2luKCcsICcpIDpcbiAgICAgIGFkZFNwYWNlcyhlcnJvci50b1N0cmluZygpKTtcbiAgICBjb25zdCBtZXNzYWdlcyA9IFtdO1xuICAgIHJldHVybiBPYmplY3Qua2V5cyhlcnJvcnMpXG4gICAgICAvLyBIaWRlICdyZXF1aXJlZCcgZXJyb3IsIHVubGVzcyBpdCBpcyB0aGUgb25seSBvbmVcbiAgICAgIC5maWx0ZXIoZXJyb3JLZXkgPT4gZXJyb3JLZXkgIT09ICdyZXF1aXJlZCcgfHwgT2JqZWN0LmtleXMoZXJyb3JzKS5sZW5ndGggPT09IDEpXG4gICAgICAubWFwKGVycm9yS2V5ID0+XG4gICAgICAgIC8vIElmIHZhbGlkYXRpb25NZXNzYWdlcyBpcyBhIHN0cmluZywgcmV0dXJuIGl0XG4gICAgICAgIHR5cGVvZiB2YWxpZGF0aW9uTWVzc2FnZXMgPT09ICdzdHJpbmcnID8gdmFsaWRhdGlvbk1lc3NhZ2VzIDpcbiAgICAgICAgLy8gSWYgY3VzdG9tIGVycm9yIG1lc3NhZ2UgaXMgYSBmdW5jdGlvbiwgcmV0dXJuIGZ1bmN0aW9uIHJlc3VsdFxuICAgICAgICB0eXBlb2YgdmFsaWRhdGlvbk1lc3NhZ2VzW2Vycm9yS2V5XSA9PT0gJ2Z1bmN0aW9uJyA/XG4gICAgICAgICAgdmFsaWRhdGlvbk1lc3NhZ2VzW2Vycm9yS2V5XShlcnJvcnNbZXJyb3JLZXldKSA6XG4gICAgICAgIC8vIElmIGN1c3RvbSBlcnJvciBtZXNzYWdlIGlzIGEgc3RyaW5nLCByZXBsYWNlIHBsYWNlaG9sZGVycyBhbmQgcmV0dXJuXG4gICAgICAgIHR5cGVvZiB2YWxpZGF0aW9uTWVzc2FnZXNbZXJyb3JLZXldID09PSAnc3RyaW5nJyA/XG4gICAgICAgICAgLy8gRG9lcyBlcnJvciBtZXNzYWdlIGhhdmUgYW55IHt7cHJvcGVydHl9fSBwbGFjZWhvbGRlcnM/XG4gICAgICAgICAgIS97ey4rP319Ly50ZXN0KHZhbGlkYXRpb25NZXNzYWdlc1tlcnJvcktleV0pID9cbiAgICAgICAgICAgIHZhbGlkYXRpb25NZXNzYWdlc1tlcnJvcktleV0gOlxuICAgICAgICAgICAgLy8gUmVwbGFjZSB7e3Byb3BlcnR5fX0gcGxhY2Vob2xkZXJzIHdpdGggdmFsdWVzXG4gICAgICAgICAgICBPYmplY3Qua2V5cyhlcnJvcnNbZXJyb3JLZXldKVxuICAgICAgICAgICAgICAucmVkdWNlKChlcnJvck1lc3NhZ2UsIGVycm9yUHJvcGVydHkpID0+IGVycm9yTWVzc2FnZS5yZXBsYWNlKFxuICAgICAgICAgICAgICAgIG5ldyBSZWdFeHAoJ3t7JyArIGVycm9yUHJvcGVydHkgKyAnfX0nLCAnZycpLFxuICAgICAgICAgICAgICAgIGVycm9yc1tlcnJvcktleV1bZXJyb3JQcm9wZXJ0eV1cbiAgICAgICAgICAgICAgKSwgdmFsaWRhdGlvbk1lc3NhZ2VzW2Vycm9yS2V5XSkgOlxuICAgICAgICAgIC8vIElmIG5vIGN1c3RvbSBlcnJvciBtZXNzYWdlLCByZXR1cm4gZm9ybWF0dGVkIGVycm9yIGRhdGEgaW5zdGVhZFxuICAgICAgICAgIGFkZFNwYWNlcyhlcnJvcktleSkgKyAnIEVycm9yOiAnICsgZm9ybWF0RXJyb3IoZXJyb3JzW2Vycm9yS2V5XSlcbiAgICAgICkuam9pbignPGJyPicpO1xuICB9XG5cbiAgdXBkYXRlVmFsdWUoY3R4OiBhbnksIHZhbHVlOiBhbnkpOiB2b2lkIHtcblxuICAgIC8vIFNldCB2YWx1ZSBvZiBjdXJyZW50IGNvbnRyb2xcbiAgICBjdHguY29udHJvbFZhbHVlID0gdmFsdWU7XG4gICAgaWYgKGN0eC5ib3VuZENvbnRyb2wpIHtcbiAgICAgIGN0eC5mb3JtQ29udHJvbC5zZXRWYWx1ZSh2YWx1ZSk7XG4gICAgICBjdHguZm9ybUNvbnRyb2wubWFya0FzRGlydHkoKTtcbiAgICB9XG4gICAgY3R4LmxheW91dE5vZGUudmFsdWUgPSB2YWx1ZTtcblxuICAgIC8vIFNldCB2YWx1ZXMgb2YgYW55IHJlbGF0ZWQgY29udHJvbHMgaW4gY29weVZhbHVlVG8gYXJyYXlcbiAgICBpZiAoaXNBcnJheShjdHgub3B0aW9ucy5jb3B5VmFsdWVUbykpIHtcbiAgICAgIGZvciAoY29uc3QgaXRlbSBvZiBjdHgub3B0aW9ucy5jb3B5VmFsdWVUbykge1xuICAgICAgICBjb25zdCB0YXJnZXRDb250cm9sID0gZ2V0Q29udHJvbCh0aGlzLmZvcm1Hcm91cCwgaXRlbSk7XG4gICAgICAgIGlmIChpc09iamVjdCh0YXJnZXRDb250cm9sKSAmJiB0eXBlb2YgdGFyZ2V0Q29udHJvbC5zZXRWYWx1ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIHRhcmdldENvbnRyb2wuc2V0VmFsdWUodmFsdWUpO1xuICAgICAgICAgIHRhcmdldENvbnRyb2wubWFya0FzRGlydHkoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZUFycmF5Q2hlY2tib3hMaXN0KGN0eDogYW55LCBjaGVja2JveExpc3Q6IFRpdGxlTWFwSXRlbVtdKTogdm9pZCB7XG4gICAgY29uc3QgZm9ybUFycmF5ID0gPEZvcm1BcnJheT50aGlzLmdldEZvcm1Db250cm9sKGN0eCk7XG5cbiAgICAvLyBSZW1vdmUgYWxsIGV4aXN0aW5nIGl0ZW1zXG4gICAgd2hpbGUgKGZvcm1BcnJheS52YWx1ZS5sZW5ndGgpIHsgZm9ybUFycmF5LnJlbW92ZUF0KDApOyB9XG5cbiAgICAvLyBSZS1hZGQgYW4gaXRlbSBmb3IgZWFjaCBjaGVja2VkIGJveFxuICAgIGNvbnN0IHJlZlBvaW50ZXIgPSByZW1vdmVSZWN1cnNpdmVSZWZlcmVuY2VzKFxuICAgICAgY3R4LmxheW91dE5vZGUuZGF0YVBvaW50ZXIgKyAnLy0nLCB0aGlzLmRhdGFSZWN1cnNpdmVSZWZNYXAsIHRoaXMuYXJyYXlNYXBcbiAgICApO1xuICAgIGZvciAoY29uc3QgY2hlY2tib3hJdGVtIG9mIGNoZWNrYm94TGlzdCkge1xuICAgICAgaWYgKGNoZWNrYm94SXRlbS5jaGVja2VkKSB7XG4gICAgICAgIGNvbnN0IG5ld0Zvcm1Db250cm9sID0gYnVpbGRGb3JtR3JvdXAodGhpcy50ZW1wbGF0ZVJlZkxpYnJhcnlbcmVmUG9pbnRlcl0pO1xuICAgICAgICBuZXdGb3JtQ29udHJvbC5zZXRWYWx1ZShjaGVja2JveEl0ZW0udmFsdWUpO1xuICAgICAgICBmb3JtQXJyYXkucHVzaChuZXdGb3JtQ29udHJvbCk7XG4gICAgICB9XG4gICAgfVxuICAgIGZvcm1BcnJheS5tYXJrQXNEaXJ0eSgpO1xuICB9XG5cbiAgZ2V0Rm9ybUNvbnRyb2woY3R4OiBhbnkpOiBBYnN0cmFjdENvbnRyb2wge1xuICAgIGlmIChcbiAgICAgICFjdHgubGF5b3V0Tm9kZSB8fCAhaXNEZWZpbmVkKGN0eC5sYXlvdXROb2RlLmRhdGFQb2ludGVyKSB8fFxuICAgICAgY3R4LmxheW91dE5vZGUudHlwZSA9PT0gJyRyZWYnXG4gICAgKSB7IHJldHVybiBudWxsOyB9XG4gICAgcmV0dXJuIGdldENvbnRyb2wodGhpcy5mb3JtR3JvdXAsIHRoaXMuZ2V0RGF0YVBvaW50ZXIoY3R4KSk7XG4gIH1cblxuICBnZXRGb3JtQ29udHJvbFZhbHVlKGN0eDogYW55KTogQWJzdHJhY3RDb250cm9sIHtcbiAgICBpZiAoXG4gICAgICAhY3R4LmxheW91dE5vZGUgfHwgIWlzRGVmaW5lZChjdHgubGF5b3V0Tm9kZS5kYXRhUG9pbnRlcikgfHxcbiAgICAgIGN0eC5sYXlvdXROb2RlLnR5cGUgPT09ICckcmVmJ1xuICAgICkgeyByZXR1cm4gbnVsbDsgfVxuICAgIGNvbnN0IGNvbnRyb2wgPSBnZXRDb250cm9sKHRoaXMuZm9ybUdyb3VwLCB0aGlzLmdldERhdGFQb2ludGVyKGN0eCkpO1xuICAgIHJldHVybiBjb250cm9sID8gY29udHJvbC52YWx1ZSA6IG51bGw7XG4gIH1cblxuICBnZXRGb3JtQ29udHJvbEdyb3VwKGN0eDogYW55KTogRm9ybUFycmF5IHwgRm9ybUdyb3VwIHtcbiAgICBpZiAoIWN0eC5sYXlvdXROb2RlIHx8ICFpc0RlZmluZWQoY3R4LmxheW91dE5vZGUuZGF0YVBvaW50ZXIpKSB7IHJldHVybiBudWxsOyB9XG4gICAgcmV0dXJuIGdldENvbnRyb2wodGhpcy5mb3JtR3JvdXAsIHRoaXMuZ2V0RGF0YVBvaW50ZXIoY3R4KSwgdHJ1ZSk7XG4gIH1cblxuICBnZXRGb3JtQ29udHJvbE5hbWUoY3R4OiBhbnkpOiBzdHJpbmcge1xuICAgIGlmIChcbiAgICAgICFjdHgubGF5b3V0Tm9kZSB8fCAhaXNEZWZpbmVkKGN0eC5sYXlvdXROb2RlLmRhdGFQb2ludGVyKSB8fCAhaGFzVmFsdWUoY3R4LmRhdGFJbmRleClcbiAgICApIHsgcmV0dXJuIG51bGw7IH1cbiAgICByZXR1cm4gSnNvblBvaW50ZXIudG9LZXkodGhpcy5nZXREYXRhUG9pbnRlcihjdHgpKTtcbiAgfVxuXG4gIGdldExheW91dEFycmF5KGN0eDogYW55KTogYW55W10ge1xuICAgIHJldHVybiBKc29uUG9pbnRlci5nZXQodGhpcy5sYXlvdXQsIHRoaXMuZ2V0TGF5b3V0UG9pbnRlcihjdHgpLCAwLCAtMSk7XG4gIH1cblxuICBnZXRQYXJlbnROb2RlKGN0eDogYW55KTogYW55IHtcbiAgICByZXR1cm4gSnNvblBvaW50ZXIuZ2V0KHRoaXMubGF5b3V0LCB0aGlzLmdldExheW91dFBvaW50ZXIoY3R4KSwgMCwgLTIpO1xuICB9XG5cbiAgZ2V0RGF0YVBvaW50ZXIoY3R4OiBhbnkpOiBzdHJpbmcge1xuICAgIGlmIChcbiAgICAgICFjdHgubGF5b3V0Tm9kZSB8fCAhaXNEZWZpbmVkKGN0eC5sYXlvdXROb2RlLmRhdGFQb2ludGVyKSB8fCAhaGFzVmFsdWUoY3R4LmRhdGFJbmRleClcbiAgICApIHsgcmV0dXJuIG51bGw7IH1cbiAgICByZXR1cm4gSnNvblBvaW50ZXIudG9JbmRleGVkUG9pbnRlcihcbiAgICAgIGN0eC5sYXlvdXROb2RlLmRhdGFQb2ludGVyLCBjdHguZGF0YUluZGV4LCB0aGlzLmFycmF5TWFwXG4gICAgKTtcbiAgfVxuXG4gIGdldExheW91dFBvaW50ZXIoY3R4OiBhbnkpOiBzdHJpbmcge1xuICAgIGlmICghaGFzVmFsdWUoY3R4LmxheW91dEluZGV4KSkgeyByZXR1cm4gbnVsbDsgfVxuICAgIHJldHVybiAnLycgKyBjdHgubGF5b3V0SW5kZXguam9pbignL2l0ZW1zLycpO1xuICB9XG5cbiAgaXNDb250cm9sQm91bmQoY3R4OiBhbnkpOiBib29sZWFuIHtcbiAgICBpZiAoXG4gICAgICAhY3R4LmxheW91dE5vZGUgfHwgIWlzRGVmaW5lZChjdHgubGF5b3V0Tm9kZS5kYXRhUG9pbnRlcikgfHwgIWhhc1ZhbHVlKGN0eC5kYXRhSW5kZXgpXG4gICAgKSB7IHJldHVybiBmYWxzZTsgfVxuICAgIGNvbnN0IGNvbnRyb2xHcm91cCA9IHRoaXMuZ2V0Rm9ybUNvbnRyb2xHcm91cChjdHgpO1xuICAgIGNvbnN0IG5hbWUgPSB0aGlzLmdldEZvcm1Db250cm9sTmFtZShjdHgpO1xuICAgIHJldHVybiBjb250cm9sR3JvdXAgPyBoYXNPd24oY29udHJvbEdyb3VwLmNvbnRyb2xzLCBuYW1lKSA6IGZhbHNlO1xuICB9XG5cbiAgYWRkSXRlbShjdHg6IGFueSwgbmFtZT86IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIGlmIChcbiAgICAgICFjdHgubGF5b3V0Tm9kZSB8fCAhaXNEZWZpbmVkKGN0eC5sYXlvdXROb2RlLiRyZWYpIHx8XG4gICAgICAhaGFzVmFsdWUoY3R4LmRhdGFJbmRleCkgfHwgIWhhc1ZhbHVlKGN0eC5sYXlvdXRJbmRleClcbiAgICApIHsgcmV0dXJuIGZhbHNlOyB9XG5cbiAgICAvLyBDcmVhdGUgYSBuZXcgQW5ndWxhciBmb3JtIGNvbnRyb2wgZnJvbSBhIHRlbXBsYXRlIGluIHRlbXBsYXRlUmVmTGlicmFyeVxuICAgIGNvbnN0IG5ld0Zvcm1Hcm91cCA9IGJ1aWxkRm9ybUdyb3VwKHRoaXMudGVtcGxhdGVSZWZMaWJyYXJ5W2N0eC5sYXlvdXROb2RlLiRyZWZdKTtcblxuICAgIC8vIEFkZCB0aGUgbmV3IGZvcm0gY29udHJvbCB0byB0aGUgcGFyZW50IGZvcm1BcnJheSBvciBmb3JtR3JvdXBcbiAgICBpZiAoY3R4LmxheW91dE5vZGUuYXJyYXlJdGVtKSB7IC8vIEFkZCBuZXcgYXJyYXkgaXRlbSB0byBmb3JtQXJyYXlcbiAgICAgICg8Rm9ybUFycmF5PnRoaXMuZ2V0Rm9ybUNvbnRyb2xHcm91cChjdHgpKS5wdXNoKG5ld0Zvcm1Hcm91cCk7XG4gICAgfSBlbHNlIHsgLy8gQWRkIG5ldyAkcmVmIGl0ZW0gdG8gZm9ybUdyb3VwXG4gICAgICAoPEZvcm1Hcm91cD50aGlzLmdldEZvcm1Db250cm9sR3JvdXAoY3R4KSlcbiAgICAgICAgLmFkZENvbnRyb2wobmFtZSB8fCB0aGlzLmdldEZvcm1Db250cm9sTmFtZShjdHgpLCBuZXdGb3JtR3JvdXApO1xuICAgIH1cblxuICAgIC8vIENvcHkgYSBuZXcgbGF5b3V0Tm9kZSBmcm9tIGxheW91dFJlZkxpYnJhcnlcbiAgICBjb25zdCBuZXdMYXlvdXROb2RlID0gZ2V0TGF5b3V0Tm9kZShjdHgubGF5b3V0Tm9kZSwgdGhpcyk7XG4gICAgbmV3TGF5b3V0Tm9kZS5hcnJheUl0ZW0gPSBjdHgubGF5b3V0Tm9kZS5hcnJheUl0ZW07XG4gICAgaWYgKGN0eC5sYXlvdXROb2RlLmFycmF5SXRlbVR5cGUpIHtcbiAgICAgIG5ld0xheW91dE5vZGUuYXJyYXlJdGVtVHlwZSA9IGN0eC5sYXlvdXROb2RlLmFycmF5SXRlbVR5cGU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlbGV0ZSBuZXdMYXlvdXROb2RlLmFycmF5SXRlbVR5cGU7XG4gICAgfVxuICAgIGlmIChuYW1lKSB7XG4gICAgICBuZXdMYXlvdXROb2RlLm5hbWUgPSBuYW1lO1xuICAgICAgbmV3TGF5b3V0Tm9kZS5kYXRhUG9pbnRlciArPSAnLycgKyBKc29uUG9pbnRlci5lc2NhcGUobmFtZSk7XG4gICAgICBuZXdMYXlvdXROb2RlLm9wdGlvbnMudGl0bGUgPSBmaXhUaXRsZShuYW1lKTtcbiAgICB9XG5cbiAgICAvLyBBZGQgdGhlIG5ldyBsYXlvdXROb2RlIHRvIHRoZSBmb3JtIGxheW91dFxuICAgIEpzb25Qb2ludGVyLmluc2VydCh0aGlzLmxheW91dCwgdGhpcy5nZXRMYXlvdXRQb2ludGVyKGN0eCksIG5ld0xheW91dE5vZGUpO1xuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBtb3ZlQXJyYXlJdGVtKGN0eDogYW55LCBvbGRJbmRleDogbnVtYmVyLCBuZXdJbmRleDogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgaWYgKFxuICAgICAgIWN0eC5sYXlvdXROb2RlIHx8ICFpc0RlZmluZWQoY3R4LmxheW91dE5vZGUuZGF0YVBvaW50ZXIpIHx8XG4gICAgICAhaGFzVmFsdWUoY3R4LmRhdGFJbmRleCkgfHwgIWhhc1ZhbHVlKGN0eC5sYXlvdXRJbmRleCkgfHxcbiAgICAgICFpc0RlZmluZWQob2xkSW5kZXgpIHx8ICFpc0RlZmluZWQobmV3SW5kZXgpIHx8IG9sZEluZGV4ID09PSBuZXdJbmRleFxuICAgICkgeyByZXR1cm4gZmFsc2U7IH1cblxuICAgIC8vIE1vdmUgaXRlbSBpbiB0aGUgZm9ybUFycmF5XG4gICAgY29uc3QgZm9ybUFycmF5ID0gPEZvcm1BcnJheT50aGlzLmdldEZvcm1Db250cm9sR3JvdXAoY3R4KTtcbiAgICBjb25zdCBhcnJheUl0ZW0gPSBmb3JtQXJyYXkuYXQob2xkSW5kZXgpO1xuICAgIGZvcm1BcnJheS5yZW1vdmVBdChvbGRJbmRleCk7XG4gICAgZm9ybUFycmF5Lmluc2VydChuZXdJbmRleCwgYXJyYXlJdGVtKTtcbiAgICBmb3JtQXJyYXkudXBkYXRlVmFsdWVBbmRWYWxpZGl0eSgpO1xuXG4gICAgLy8gTW92ZSBsYXlvdXQgaXRlbVxuICAgIGNvbnN0IGxheW91dEFycmF5ID0gdGhpcy5nZXRMYXlvdXRBcnJheShjdHgpO1xuICAgIGxheW91dEFycmF5LnNwbGljZShuZXdJbmRleCwgMCwgbGF5b3V0QXJyYXkuc3BsaWNlKG9sZEluZGV4LCAxKVswXSk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICByZW1vdmVJdGVtKGN0eDogYW55KTogYm9vbGVhbiB7XG4gICAgaWYgKFxuICAgICAgIWN0eC5sYXlvdXROb2RlIHx8ICFpc0RlZmluZWQoY3R4LmxheW91dE5vZGUuZGF0YVBvaW50ZXIpIHx8XG4gICAgICAhaGFzVmFsdWUoY3R4LmRhdGFJbmRleCkgfHwgIWhhc1ZhbHVlKGN0eC5sYXlvdXRJbmRleClcbiAgICApIHsgcmV0dXJuIGZhbHNlOyB9XG5cbiAgICAvLyBSZW1vdmUgdGhlIEFuZ3VsYXIgZm9ybSBjb250cm9sIGZyb20gdGhlIHBhcmVudCBmb3JtQXJyYXkgb3IgZm9ybUdyb3VwXG4gICAgaWYgKGN0eC5sYXlvdXROb2RlLmFycmF5SXRlbSkgeyAvLyBSZW1vdmUgYXJyYXkgaXRlbSBmcm9tIGZvcm1BcnJheVxuICAgICAgKDxGb3JtQXJyYXk+dGhpcy5nZXRGb3JtQ29udHJvbEdyb3VwKGN0eCkpXG4gICAgICAgIC5yZW1vdmVBdChjdHguZGF0YUluZGV4W2N0eC5kYXRhSW5kZXgubGVuZ3RoIC0gMV0pO1xuICAgIH0gZWxzZSB7IC8vIFJlbW92ZSAkcmVmIGl0ZW0gZnJvbSBmb3JtR3JvdXBcbiAgICAgICg8Rm9ybUdyb3VwPnRoaXMuZ2V0Rm9ybUNvbnRyb2xHcm91cChjdHgpKVxuICAgICAgICAucmVtb3ZlQ29udHJvbCh0aGlzLmdldEZvcm1Db250cm9sTmFtZShjdHgpKTtcbiAgICB9XG5cbiAgICAvLyBSZW1vdmUgbGF5b3V0Tm9kZSBmcm9tIGxheW91dFxuICAgIEpzb25Qb2ludGVyLnJlbW92ZSh0aGlzLmxheW91dCwgdGhpcy5nZXRMYXlvdXRQb2ludGVyKGN0eCkpO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG59XG4iXX0=