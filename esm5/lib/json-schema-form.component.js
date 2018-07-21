/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import * as _ from 'lodash';
import { FrameworkLibraryService } from './framework-library/framework-library.service';
import { WidgetLibraryService } from './widget-library/widget-library.service';
import { JsonSchemaFormService } from './json-schema-form.service';
import { convertSchemaToDraft6 } from './shared/convert-schema-to-draft6.function';
import { resolveSchemaReferences } from './shared/json-schema.functions';
import { hasValue, inArray, isArray, isEmpty, isObject } from './shared/validator.functions';
import { forEach, hasOwn } from './shared/utility.functions';
import { JsonPointer } from './shared/jsonpointer.functions';
/** @type {?} */
export var JSON_SCHEMA_FORM_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return JsonSchemaFormComponent; }),
    multi: true,
};
/**
 * \@module 'JsonSchemaFormComponent' - Angular JSON Schema Form
 *
 * Root module of the Angular JSON Schema Form client-side library,
 * an Angular library which generates an HTML form from a JSON schema
 * structured data model and/or a JSON Schema Form layout description.
 *
 * This library also validates input data by the user, using both validators on
 * individual controls to provide real-time feedback while the user is filling
 * out the form, and then validating the entire input against the schema when
 * the form is submitted to make sure the returned JSON data object is valid.
 *
 * This library is similar to, and mostly API compatible with:
 *
 * - JSON Schema Form's Angular Schema Form library for AngularJs
 *   http://schemaform.io
 *   http://schemaform.io/examples/bootstrap-example.html (examples)
 *
 * - Mozilla's react-jsonschema-form library for React
 *   https://github.com/mozilla-services/react-jsonschema-form
 *   https://mozilla-services.github.io/react-jsonschema-form (examples)
 *
 * - Joshfire's JSON Form library for jQuery
 *   https://github.com/joshfire/jsonform
 *   http://ulion.github.io/jsonform/playground (examples)
 *
 * This library depends on:
 *  - Angular (obviously)                  https://angular.io
 *  - lodash, JavaScript utility library   https://github.com/lodash/lodash
 *  - ajv, Another JSON Schema validator   https://github.com/epoberezkin/ajv
 *
 * In addition, the Example Playground also depends on:
 *  - brace, Browserified Ace editor       http://thlorenz.github.io/brace
 */
var JsonSchemaFormComponent = /** @class */ (function () {
    function JsonSchemaFormComponent(changeDetector, frameworkLibrary, widgetLibrary, jsf, sanitizer) {
        this.changeDetector = changeDetector;
        this.frameworkLibrary = frameworkLibrary;
        this.widgetLibrary = widgetLibrary;
        this.jsf = jsf;
        this.sanitizer = sanitizer;
        this.formValueSubscription = null;
        this.formInitialized = false;
        this.objectWrap = false;
        this.previousInputs = {
            schema: null, layout: null, data: null, options: null, framework: null,
            widgets: null, form: null, model: null, JSONSchema: null, UISchema: null,
            formData: null, loadExternalAssets: null, debug: null,
        };
        // Outputs
        this.onChanges = new EventEmitter();
        this.onSubmit = new EventEmitter();
        this.isValid = new EventEmitter();
        this.validationErrors = new EventEmitter();
        this.formSchema = new EventEmitter();
        this.formLayout = new EventEmitter();
        // Outputs for possible 2-way data binding
        // Only the one input providing the initial form data will be bound.
        // If there is no inital data, input '{}' to activate 2-way data binding.
        // There is no 2-way binding if inital data is combined inside the 'form' input.
        this.dataChange = new EventEmitter();
        this.modelChange = new EventEmitter();
        this.formDataChange = new EventEmitter();
        this.ngModelChange = new EventEmitter();
    }
    Object.defineProperty(JsonSchemaFormComponent.prototype, "value", {
        get: /**
         * @return {?}
         */
        function () {
            return this.objectWrap ? this.jsf.data['1'] : this.jsf.data;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.setFormValues(value, false);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(JsonSchemaFormComponent.prototype, "stylesheets", {
        get: /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var stylesheets = this.frameworkLibrary.getFrameworkStylesheets();
            /** @type {?} */
            var load = this.sanitizer.bypassSecurityTrustResourceUrl;
            return stylesheets.map(function (stylesheet) { return load(stylesheet); });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JsonSchemaFormComponent.prototype, "scripts", {
        get: /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var scripts = this.frameworkLibrary.getFrameworkScripts();
            /** @type {?} */
            var load = this.sanitizer.bypassSecurityTrustResourceUrl;
            return scripts.map(function (script) { return load(script); });
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    JsonSchemaFormComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.updateForm();
    };
    /**
     * @return {?}
     */
    JsonSchemaFormComponent.prototype.ngOnChanges = /**
     * @return {?}
     */
    function () {
        this.updateForm();
    };
    /**
     * @param {?} value
     * @return {?}
     */
    JsonSchemaFormComponent.prototype.writeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.setFormValues(value, false);
        if (!this.formValuesInput) {
            this.formValuesInput = 'ngModel';
        }
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    JsonSchemaFormComponent.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onChange = fn;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    JsonSchemaFormComponent.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onTouched = fn;
    };
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    JsonSchemaFormComponent.prototype.setDisabledState = /**
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        if (this.jsf.formOptions.formDisabled !== !!isDisabled) {
            this.jsf.formOptions.formDisabled = !!isDisabled;
            this.initializeForm();
        }
    };
    /**
     * @return {?}
     */
    JsonSchemaFormComponent.prototype.updateForm = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this.formInitialized || !this.formValuesInput ||
            (this.language && this.language !== this.jsf.language)) {
            this.initializeForm();
        }
        else {
            if (this.language && this.language !== this.jsf.language) {
                this.jsf.setLanguage(this.language);
            }
            /** @type {?} */
            var changedInput = Object.keys(this.previousInputs)
                .filter(function (input) { return _this.previousInputs[input] !== _this[input]; });
            /** @type {?} */
            var resetFirst = true;
            if (changedInput.length === 1 && changedInput[0] === 'form' &&
                this.formValuesInput.startsWith('form.')) {
                // If only 'form' input changed, get names of changed keys
                changedInput = Object.keys(this.previousInputs.form || {})
                    .filter(function (key) { return !_.isEqual(_this.previousInputs.form[key], _this.form[key]); })
                    .map(function (key) { return "form." + key; });
                resetFirst = false;
            }
            // If only input values have changed, update the form values
            if (changedInput.length === 1 && changedInput[0] === this.formValuesInput) {
                if (this.formValuesInput.indexOf('.') === -1) {
                    this.setFormValues(this[this.formValuesInput], resetFirst);
                }
                else {
                    var _a = tslib_1.__read(this.formValuesInput.split('.'), 2), input = _a[0], key = _a[1];
                    this.setFormValues(this[input][key], resetFirst);
                }
                // If anything else has changed, re-render the entire form
            }
            else if (changedInput.length) {
                this.initializeForm();
                if (this.onChange) {
                    this.onChange(this.jsf.formValues);
                }
                if (this.onTouched) {
                    this.onTouched(this.jsf.formValues);
                }
            }
            // Update previous inputs
            Object.keys(this.previousInputs)
                .filter(function (input) { return _this.previousInputs[input] !== _this[input]; })
                .forEach(function (input) { return _this.previousInputs[input] = _this[input]; });
        }
    };
    /**
     * @param {?} formValues
     * @param {?=} resetFirst
     * @return {?}
     */
    JsonSchemaFormComponent.prototype.setFormValues = /**
     * @param {?} formValues
     * @param {?=} resetFirst
     * @return {?}
     */
    function (formValues, resetFirst) {
        if (resetFirst === void 0) { resetFirst = true; }
        if (formValues) {
            /** @type {?} */
            var newFormValues = this.objectWrap ? formValues['1'] : formValues;
            if (!this.jsf.formGroup) {
                this.jsf.formValues = formValues;
                this.activateForm();
            }
            else if (resetFirst) {
                this.jsf.formGroup.reset();
            }
            if (this.jsf.formGroup) {
                this.jsf.formGroup.patchValue(newFormValues);
            }
            if (this.onChange) {
                this.onChange(newFormValues);
            }
            if (this.onTouched) {
                this.onTouched(newFormValues);
            }
        }
        else {
            this.jsf.formGroup.reset();
        }
    };
    /**
     * @return {?}
     */
    JsonSchemaFormComponent.prototype.submitForm = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var validData = this.jsf.validData;
        this.onSubmit.emit(this.objectWrap ? validData['1'] : validData);
    };
    /**
     * 'initializeForm' function
     *
     * - Update 'schema', 'layout', and 'formValues', from inputs.
     *
     * - Create 'schemaRefLibrary' and 'schemaRecursiveRefMap'
     *   to resolve schema $ref links, including recursive $ref links.
     *
     * - Create 'dataRecursiveRefMap' to resolve recursive links in data
     *   and corectly set output formats for recursively nested values.
     *
     * - Create 'layoutRefLibrary' and 'templateRefLibrary' to store
     *   new layout nodes and formGroup elements to use when dynamically
     *   adding form components to arrays and recursive $ref points.
     *
     * - Create 'dataMap' to map the data to the schema and template.
     *
     * - Create the master 'formGroupTemplate' then from it 'formGroup'
     *   the Angular formGroup used to control the reactive form.
     */
    /**
     * 'initializeForm' function
     *
     * - Update 'schema', 'layout', and 'formValues', from inputs.
     *
     * - Create 'schemaRefLibrary' and 'schemaRecursiveRefMap'
     *   to resolve schema $ref links, including recursive $ref links.
     *
     * - Create 'dataRecursiveRefMap' to resolve recursive links in data
     *   and corectly set output formats for recursively nested values.
     *
     * - Create 'layoutRefLibrary' and 'templateRefLibrary' to store
     *   new layout nodes and formGroup elements to use when dynamically
     *   adding form components to arrays and recursive $ref points.
     *
     * - Create 'dataMap' to map the data to the schema and template.
     *
     * - Create the master 'formGroupTemplate' then from it 'formGroup'
     *   the Angular formGroup used to control the reactive form.
     * @return {?}
     */
    JsonSchemaFormComponent.prototype.initializeForm = /**
     * 'initializeForm' function
     *
     * - Update 'schema', 'layout', and 'formValues', from inputs.
     *
     * - Create 'schemaRefLibrary' and 'schemaRecursiveRefMap'
     *   to resolve schema $ref links, including recursive $ref links.
     *
     * - Create 'dataRecursiveRefMap' to resolve recursive links in data
     *   and corectly set output formats for recursively nested values.
     *
     * - Create 'layoutRefLibrary' and 'templateRefLibrary' to store
     *   new layout nodes and formGroup elements to use when dynamically
     *   adding form components to arrays and recursive $ref points.
     *
     * - Create 'dataMap' to map the data to the schema and template.
     *
     * - Create the master 'formGroupTemplate' then from it 'formGroup'
     *   the Angular formGroup used to control the reactive form.
     * @return {?}
     */
    function () {
        if (this.schema || this.layout || this.data || this.form || this.model ||
            this.JSONSchema || this.UISchema || this.formData || this.ngModel ||
            this.jsf.data) {
            this.jsf.resetAllValues(); // Reset all form values to defaults
            this.initializeOptions(); // Update options
            this.initializeSchema(); // Update schema, schemaRefLibrary,
            // schemaRecursiveRefMap, & dataRecursiveRefMap
            this.initializeLayout(); // Update layout, layoutRefLibrary,
            this.initializeData(); // Update formValues
            this.activateForm(); // Update dataMap, templateRefLibrary,
            // formGroupTemplate, formGroup
            // Uncomment individual lines to output debugging information to console:
            // (These always work.)
            // console.log('loading form...');
            // console.log('schema', this.jsf.schema);
            // console.log('layout', this.jsf.layout);
            // console.log('options', this.options);
            // console.log('formValues', this.jsf.formValues);
            // console.log('formGroupTemplate', this.jsf.formGroupTemplate);
            // console.log('formGroup', this.jsf.formGroup);
            // console.log('formGroup.value', this.jsf.formGroup.value);
            // console.log('schemaRefLibrary', this.jsf.schemaRefLibrary);
            // console.log('layoutRefLibrary', this.jsf.layoutRefLibrary);
            // console.log('templateRefLibrary', this.jsf.templateRefLibrary);
            // console.log('dataMap', this.jsf.dataMap);
            // console.log('arrayMap', this.jsf.arrayMap);
            // console.log('schemaRecursiveRefMap', this.jsf.schemaRecursiveRefMap);
            // console.log('dataRecursiveRefMap', this.jsf.dataRecursiveRefMap);
            // Uncomment individual lines to output debugging information to browser:
            // (These only work if the 'debug' option has also been set to 'true'.)
            if (this.debug || this.jsf.formOptions.debug) {
                /** @type {?} */
                var vars = [];
                // vars.push(this.jsf.schema);
                // vars.push(this.jsf.layout);
                // vars.push(this.options);
                // vars.push(this.jsf.formValues);
                // vars.push(this.jsf.formGroup.value);
                // vars.push(this.jsf.formGroupTemplate);
                // vars.push(this.jsf.formGroup);
                // vars.push(this.jsf.schemaRefLibrary);
                // vars.push(this.jsf.layoutRefLibrary);
                // vars.push(this.jsf.templateRefLibrary);
                // vars.push(this.jsf.dataMap);
                // vars.push(this.jsf.arrayMap);
                // vars.push(this.jsf.schemaRecursiveRefMap);
                // vars.push(this.jsf.dataRecursiveRefMap);
                this.debugOutput = vars.map(function (v) { return JSON.stringify(v, null, 2); }).join('\n');
            }
            this.formInitialized = true;
        }
    };
    /**
     * 'initializeOptions' function
     *
     * Initialize 'options' (global form options) and set framework
     * Combine available inputs:
     * 1. options - recommended
     * 2. form.options - Single input style
     * @return {?}
     */
    JsonSchemaFormComponent.prototype.initializeOptions = /**
     * 'initializeOptions' function
     *
     * Initialize 'options' (global form options) and set framework
     * Combine available inputs:
     * 1. options - recommended
     * 2. form.options - Single input style
     * @return {?}
     */
    function () {
        if (this.language && this.language !== this.jsf.language) {
            this.jsf.setLanguage(this.language);
        }
        this.jsf.setOptions({ debug: !!this.debug });
        /** @type {?} */
        var loadExternalAssets = this.loadExternalAssets || false;
        /** @type {?} */
        var framework = this.framework || 'default';
        if (isObject(this.options)) {
            this.jsf.setOptions(this.options);
            loadExternalAssets = this.options.loadExternalAssets || loadExternalAssets;
            framework = this.options.framework || framework;
        }
        if (isObject(this.form) && isObject(this.form.options)) {
            this.jsf.setOptions(this.form.options);
            loadExternalAssets = this.form.options.loadExternalAssets || loadExternalAssets;
            framework = this.form.options.framework || framework;
        }
        if (isObject(this.widgets)) {
            this.jsf.setOptions({ widgets: this.widgets });
        }
        this.frameworkLibrary.setLoadExternalAssets(loadExternalAssets);
        this.frameworkLibrary.setFramework(framework);
        this.jsf.framework = this.frameworkLibrary.getFramework();
        if (isObject(this.jsf.formOptions.widgets)) {
            try {
                for (var _a = tslib_1.__values(Object.keys(this.jsf.formOptions.widgets)), _b = _a.next(); !_b.done; _b = _a.next()) {
                    var widget = _b.value;
                    this.widgetLibrary.registerWidget(widget, this.jsf.formOptions.widgets[widget]);
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
        if (isObject(this.form) && isObject(this.form.tpldata)) {
            this.jsf.setTpldata(this.form.tpldata);
        }
        var e_1, _c;
    };
    /**
     * 'initializeSchema' function
     *
     * Initialize 'schema'
     * Use first available input:
     * 1. schema - recommended / Angular Schema Form style
     * 2. form.schema - Single input / JSON Form style
     * 3. JSONSchema - React JSON Schema Form style
     * 4. form.JSONSchema - For testing single input React JSON Schema Forms
     * 5. form - For testing single schema-only inputs
     *
     * ... if no schema input found, the 'activateForm' function, below,
     *     will make two additional attempts to build a schema
     * 6. If layout input - build schema from layout
     * 7. If data input - build schema from data
     * @return {?}
     */
    JsonSchemaFormComponent.prototype.initializeSchema = /**
     * 'initializeSchema' function
     *
     * Initialize 'schema'
     * Use first available input:
     * 1. schema - recommended / Angular Schema Form style
     * 2. form.schema - Single input / JSON Form style
     * 3. JSONSchema - React JSON Schema Form style
     * 4. form.JSONSchema - For testing single input React JSON Schema Forms
     * 5. form - For testing single schema-only inputs
     *
     * ... if no schema input found, the 'activateForm' function, below,
     *     will make two additional attempts to build a schema
     * 6. If layout input - build schema from layout
     * 7. If data input - build schema from data
     * @return {?}
     */
    function () {
        // TODO: update to allow non-object schemas
        if (isObject(this.schema)) {
            this.jsf.AngularSchemaFormCompatibility = true;
            this.jsf.schema = _.cloneDeep(this.schema);
        }
        else if (hasOwn(this.form, 'schema') && isObject(this.form.schema)) {
            this.jsf.schema = _.cloneDeep(this.form.schema);
        }
        else if (isObject(this.JSONSchema)) {
            this.jsf.ReactJsonSchemaFormCompatibility = true;
            this.jsf.schema = _.cloneDeep(this.JSONSchema);
        }
        else if (hasOwn(this.form, 'JSONSchema') && isObject(this.form.JSONSchema)) {
            this.jsf.ReactJsonSchemaFormCompatibility = true;
            this.jsf.schema = _.cloneDeep(this.form.JSONSchema);
        }
        else if (hasOwn(this.form, 'properties') && isObject(this.form.properties)) {
            this.jsf.schema = _.cloneDeep(this.form);
        }
        else if (isObject(this.form)) {
            // TODO: Handle other types of form input
        }
        if (!isEmpty(this.jsf.schema)) {
            // If other types also allowed, render schema as an object
            if (inArray('object', this.jsf.schema.type)) {
                this.jsf.schema.type = 'object';
            }
            // Wrap non-object schemas in object.
            if (hasOwn(this.jsf.schema, 'type') && this.jsf.schema.type !== 'object') {
                this.jsf.schema = {
                    'type': 'object',
                    'properties': { 1: this.jsf.schema }
                };
                this.objectWrap = true;
            }
            else if (!hasOwn(this.jsf.schema, 'type')) {
                // Add type = 'object' if missing
                if (isObject(this.jsf.schema.properties) ||
                    isObject(this.jsf.schema.patternProperties) ||
                    isObject(this.jsf.schema.additionalProperties)) {
                    this.jsf.schema.type = 'object';
                    // Fix JSON schema shorthand (JSON Form style)
                }
                else {
                    this.jsf.JsonFormCompatibility = true;
                    this.jsf.schema = {
                        'type': 'object',
                        'properties': this.jsf.schema
                    };
                }
            }
            // If needed, update JSON Schema to draft 6 format, including
            // draft 3 (JSON Form style) and draft 4 (Angular Schema Form style)
            this.jsf.schema = convertSchemaToDraft6(this.jsf.schema);
            // Initialize ajv and compile schema
            this.jsf.compileAjvSchema();
            // Create schemaRefLibrary, schemaRecursiveRefMap, dataRecursiveRefMap, & arrayMap
            this.jsf.schema = resolveSchemaReferences(this.jsf.schema, this.jsf.schemaRefLibrary, this.jsf.schemaRecursiveRefMap, this.jsf.dataRecursiveRefMap, this.jsf.arrayMap);
            if (hasOwn(this.jsf.schemaRefLibrary, '')) {
                this.jsf.hasRootReference = true;
            }
            // TODO: (?) Resolve external $ref links
            // // Create schemaRefLibrary & schemaRecursiveRefMap
            // this.parser.bundle(this.schema)
            //   .then(schema => this.schema = resolveSchemaReferences(
            //     schema, this.jsf.schemaRefLibrary,
            //     this.jsf.schemaRecursiveRefMap, this.jsf.dataRecursiveRefMap
            //   ));
        }
    };
    /**
     * 'initializeData' function
     *
     * Initialize 'formValues'
     * defulat or previously submitted values used to populate form
     * Use first available input:
     * 1. data - recommended
     * 2. model - Angular Schema Form style
     * 3. form.value - JSON Form style
     * 4. form.data - Single input style
     * 5. formData - React JSON Schema Form style
     * 6. form.formData - For easier testing of React JSON Schema Forms
     * 7. (none) no data - initialize data from schema and layout defaults only
     * @return {?}
     */
    JsonSchemaFormComponent.prototype.initializeData = /**
     * 'initializeData' function
     *
     * Initialize 'formValues'
     * defulat or previously submitted values used to populate form
     * Use first available input:
     * 1. data - recommended
     * 2. model - Angular Schema Form style
     * 3. form.value - JSON Form style
     * 4. form.data - Single input style
     * 5. formData - React JSON Schema Form style
     * 6. form.formData - For easier testing of React JSON Schema Forms
     * 7. (none) no data - initialize data from schema and layout defaults only
     * @return {?}
     */
    function () {
        if (hasValue(this.data)) {
            this.jsf.formValues = _.cloneDeep(this.data);
            this.formValuesInput = 'data';
        }
        else if (hasValue(this.model)) {
            this.jsf.AngularSchemaFormCompatibility = true;
            this.jsf.formValues = _.cloneDeep(this.model);
            this.formValuesInput = 'model';
        }
        else if (hasValue(this.ngModel)) {
            this.jsf.AngularSchemaFormCompatibility = true;
            this.jsf.formValues = _.cloneDeep(this.ngModel);
            this.formValuesInput = 'ngModel';
        }
        else if (isObject(this.form) && hasValue(this.form.value)) {
            this.jsf.JsonFormCompatibility = true;
            this.jsf.formValues = _.cloneDeep(this.form.value);
            this.formValuesInput = 'form.value';
        }
        else if (isObject(this.form) && hasValue(this.form.data)) {
            this.jsf.formValues = _.cloneDeep(this.form.data);
            this.formValuesInput = 'form.data';
        }
        else if (hasValue(this.formData)) {
            this.jsf.ReactJsonSchemaFormCompatibility = true;
            this.formValuesInput = 'formData';
        }
        else if (hasOwn(this.form, 'formData') && hasValue(this.form.formData)) {
            this.jsf.ReactJsonSchemaFormCompatibility = true;
            this.jsf.formValues = _.cloneDeep(this.form.formData);
            this.formValuesInput = 'form.formData';
        }
        else {
            this.formValuesInput = null;
        }
    };
    /**
     * 'initializeLayout' function
     *
     * Initialize 'layout'
     * Use first available array input:
     * 1. layout - recommended
     * 2. form - Angular Schema Form style
     * 3. form.form - JSON Form style
     * 4. form.layout - Single input style
     * 5. (none) no layout - set default layout instead
     *    (full layout will be built later from the schema)
     *
     * Also, if alternate layout formats are available,
     * import from 'UISchema' or 'customFormItems'
     * used for React JSON Schema Form and JSON Form API compatibility
     * Use first available input:
     * 1. UISchema - React JSON Schema Form style
     * 2. form.UISchema - For testing single input React JSON Schema Forms
     * 2. form.customFormItems - JSON Form style
     * 3. (none) no input - don't import
     * @return {?}
     */
    JsonSchemaFormComponent.prototype.initializeLayout = /**
     * 'initializeLayout' function
     *
     * Initialize 'layout'
     * Use first available array input:
     * 1. layout - recommended
     * 2. form - Angular Schema Form style
     * 3. form.form - JSON Form style
     * 4. form.layout - Single input style
     * 5. (none) no layout - set default layout instead
     *    (full layout will be built later from the schema)
     *
     * Also, if alternate layout formats are available,
     * import from 'UISchema' or 'customFormItems'
     * used for React JSON Schema Form and JSON Form API compatibility
     * Use first available input:
     * 1. UISchema - React JSON Schema Form style
     * 2. form.UISchema - For testing single input React JSON Schema Forms
     * 2. form.customFormItems - JSON Form style
     * 3. (none) no input - don't import
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var fixJsonFormOptions = function (layout) {
            if (isObject(layout) || isArray(layout)) {
                forEach(layout, function (value, key) {
                    if (hasOwn(value, 'options') && isObject(value.options)) {
                        value.titleMap = value.options;
                        delete value.options;
                    }
                }, 'top-down');
            }
            return layout;
        };
        // Check for layout inputs and, if found, initialize form layout
        if (isArray(this.layout)) {
            this.jsf.layout = _.cloneDeep(this.layout);
        }
        else if (isArray(this.form)) {
            this.jsf.AngularSchemaFormCompatibility = true;
            this.jsf.layout = _.cloneDeep(this.form);
        }
        else if (this.form && isArray(this.form.form)) {
            this.jsf.JsonFormCompatibility = true;
            this.jsf.layout = fixJsonFormOptions(_.cloneDeep(this.form.form));
        }
        else if (this.form && isArray(this.form.layout)) {
            this.jsf.layout = _.cloneDeep(this.form.layout);
        }
        else {
            this.jsf.layout = ['*'];
        }
        /** @type {?} */
        var alternateLayout = null;
        if (isObject(this.UISchema)) {
            this.jsf.ReactJsonSchemaFormCompatibility = true;
            alternateLayout = _.cloneDeep(this.UISchema);
        }
        else if (hasOwn(this.form, 'UISchema')) {
            this.jsf.ReactJsonSchemaFormCompatibility = true;
            alternateLayout = _.cloneDeep(this.form.UISchema);
        }
        else if (hasOwn(this.form, 'uiSchema')) {
            this.jsf.ReactJsonSchemaFormCompatibility = true;
            alternateLayout = _.cloneDeep(this.form.uiSchema);
        }
        else if (hasOwn(this.form, 'customFormItems')) {
            this.jsf.JsonFormCompatibility = true;
            alternateLayout = fixJsonFormOptions(_.cloneDeep(this.form.customFormItems));
        }
        // if alternate layout found, copy alternate layout options into schema
        if (alternateLayout) {
            JsonPointer.forEachDeep(alternateLayout, function (value, pointer) {
                /** @type {?} */
                var schemaPointer = pointer
                    .replace(/\//g, '/properties/')
                    .replace(/\/properties\/items\/properties\//g, '/items/properties/')
                    .replace(/\/properties\/titleMap\/properties\//g, '/titleMap/properties/');
                if (hasValue(value) && hasValue(pointer)) {
                    /** @type {?} */
                    var key = JsonPointer.toKey(pointer);
                    /** @type {?} */
                    var groupPointer = (JsonPointer.parse(schemaPointer) || []).slice(0, -2);
                    /** @type {?} */
                    var itemPointer = void 0;
                    // If 'ui:order' object found, copy into object schema root
                    if (key.toLowerCase() === 'ui:order') {
                        itemPointer = tslib_1.__spread(groupPointer, ['ui:order']);
                        // Copy other alternate layout options to schema 'x-schema-form',
                        // (like Angular Schema Form options) and remove any 'ui:' prefixes
                    }
                    else {
                        if (key.slice(0, 3).toLowerCase() === 'ui:') {
                            key = key.slice(3);
                        }
                        itemPointer = tslib_1.__spread(groupPointer, ['x-schema-form', key]);
                    }
                    if (JsonPointer.has(_this.jsf.schema, groupPointer) &&
                        !JsonPointer.has(_this.jsf.schema, itemPointer)) {
                        JsonPointer.set(_this.jsf.schema, itemPointer, value);
                    }
                }
            });
        }
    };
    /**
     * 'activateForm' function
     *
     * ...continued from 'initializeSchema' function, above
     * If 'schema' has not been initialized (i.e. no schema input found)
     * 6. If layout input - build schema from layout input
     * 7. If data input - build schema from data input
     *
     * Create final layout,
     * build the FormGroup template and the Angular FormGroup,
     * subscribe to changes,
     * and activate the form.
     * @return {?}
     */
    JsonSchemaFormComponent.prototype.activateForm = /**
     * 'activateForm' function
     *
     * ...continued from 'initializeSchema' function, above
     * If 'schema' has not been initialized (i.e. no schema input found)
     * 6. If layout input - build schema from layout input
     * 7. If data input - build schema from data input
     *
     * Create final layout,
     * build the FormGroup template and the Angular FormGroup,
     * subscribe to changes,
     * and activate the form.
     * @return {?}
     */
    function () {
        var _this = this;
        // If 'schema' not initialized
        if (isEmpty(this.jsf.schema)) {
            // TODO: If full layout input (with no '*'), build schema from layout
            // if (!this.jsf.layout.includes('*')) {
            //   this.jsf.buildSchemaFromLayout();
            // } else
            // If data input, build schema from data
            if (!isEmpty(this.jsf.formValues)) {
                this.jsf.buildSchemaFromData();
            }
        }
        if (!isEmpty(this.jsf.schema)) {
            // If not already initialized, initialize ajv and compile schema
            this.jsf.compileAjvSchema();
            // Update all layout elements, add values, widgets, and validators,
            // replace any '*' with a layout built from all schema elements,
            // and update the FormGroup template with any new validators
            this.jsf.buildLayout(this.widgetLibrary);
            // Build the Angular FormGroup template from the schema
            this.jsf.buildFormGroupTemplate(this.jsf.formValues);
            // Build the real Angular FormGroup from the FormGroup template
            this.jsf.buildFormGroup();
        }
        if (this.jsf.formGroup) {
            // Reset initial form values
            if (!isEmpty(this.jsf.formValues) &&
                this.jsf.formOptions.setSchemaDefaults !== true &&
                this.jsf.formOptions.setLayoutDefaults !== true) {
                this.setFormValues(this.jsf.formValues);
            }
            // TODO: Figure out how to display calculated values without changing object data
            // See http://ulion.github.io/jsonform/playground/?example=templating-values
            // Calculate references to other fields
            // if (!isEmpty(this.jsf.formGroup.value)) {
            //   forEach(this.jsf.formGroup.value, (value, key, object, rootObject) => {
            //     if (typeof value === 'string') {
            //       object[key] = this.jsf.parseText(value, value, rootObject, key);
            //     }
            //   }, 'top-down');
            // }
            // Subscribe to form changes to output live data, validation, and errors
            this.jsf.dataChanges.subscribe(function (data) {
                _this.onChanges.emit(_this.objectWrap ? data['1'] : data);
                if (_this.formValuesInput && _this.formValuesInput.indexOf('.') === -1) {
                    _this[_this.formValuesInput + "Change"].emit(_this.objectWrap ? data['1'] : data);
                }
            });
            // Trigger change detection on statusChanges to show updated errors
            this.jsf.formGroup.statusChanges.subscribe(function () { return _this.changeDetector.markForCheck(); });
            this.jsf.isValidChanges.subscribe(function (isValid) { return _this.isValid.emit(isValid); });
            this.jsf.validationErrorChanges.subscribe(function (err) { return _this.validationErrors.emit(err); });
            // Output final schema, final layout, and initial data
            this.formSchema.emit(this.jsf.schema);
            this.formLayout.emit(this.jsf.layout);
            this.onChanges.emit(this.objectWrap ? this.jsf.data['1'] : this.jsf.data);
            /** @type {?} */
            var validateOnRender_1 = JsonPointer.get(this.jsf, '/formOptions/validateOnRender');
            if (validateOnRender_1) {
                /** @type {?} */
                var touchAll_1 = function (control) {
                    if (validateOnRender_1 === true || hasValue(control.value)) {
                        control.markAsTouched();
                    }
                    Object.keys(control.controls || {})
                        .forEach(function (key) { return touchAll_1(control.controls[key]); });
                };
                touchAll_1(this.jsf.formGroup);
                this.isValid.emit(this.jsf.isValid);
                this.validationErrors.emit(this.jsf.ajvErrors);
            }
        }
    };
    JsonSchemaFormComponent.decorators = [
        { type: Component, args: [{
                    selector: 'json-schema-form',
                    template: "\n    <div *ngFor=\"let stylesheet of stylesheets\">\n      <link rel=\"stylesheet\" [href]=\"stylesheet\">\n    </div>\n    <div *ngFor=\"let script of scripts\">\n      <script type=\"text/javascript\" [src]=\"script\"></script>\n    </div>\n    <form class=\"json-schema-form\" (ngSubmit)=\"submitForm()\">\n      <root-widget [layout]=\"jsf?.layout\"></root-widget>\n    </form>\n    <div *ngIf=\"debug || jsf?.formOptions?.debug\">\n      Debug output: <pre>{{debugOutput}}</pre>\n    </div>",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    // Adding 'JsonSchemaFormService' here, instead of in the module,
                    // creates a separate instance of the service for each component
                    providers: [JsonSchemaFormService, JSON_SCHEMA_FORM_VALUE_ACCESSOR],
                },] },
    ];
    /** @nocollapse */
    JsonSchemaFormComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: FrameworkLibraryService },
        { type: WidgetLibraryService },
        { type: JsonSchemaFormService },
        { type: DomSanitizer }
    ]; };
    JsonSchemaFormComponent.propDecorators = {
        schema: [{ type: Input }],
        layout: [{ type: Input }],
        data: [{ type: Input }],
        options: [{ type: Input }],
        framework: [{ type: Input }],
        widgets: [{ type: Input }],
        form: [{ type: Input }],
        model: [{ type: Input }],
        JSONSchema: [{ type: Input }],
        UISchema: [{ type: Input }],
        formData: [{ type: Input }],
        ngModel: [{ type: Input }],
        language: [{ type: Input }],
        loadExternalAssets: [{ type: Input }],
        debug: [{ type: Input }],
        value: [{ type: Input }],
        onChanges: [{ type: Output }],
        onSubmit: [{ type: Output }],
        isValid: [{ type: Output }],
        validationErrors: [{ type: Output }],
        formSchema: [{ type: Output }],
        formLayout: [{ type: Output }],
        dataChange: [{ type: Output }],
        modelChange: [{ type: Output }],
        formDataChange: [{ type: Output }],
        ngModelChange: [{ type: Output }]
    };
    return JsonSchemaFormComponent;
}());
export { JsonSchemaFormComponent };
if (false) {
    /** @type {?} */
    JsonSchemaFormComponent.prototype.debugOutput;
    /** @type {?} */
    JsonSchemaFormComponent.prototype.formValueSubscription;
    /** @type {?} */
    JsonSchemaFormComponent.prototype.formInitialized;
    /** @type {?} */
    JsonSchemaFormComponent.prototype.objectWrap;
    /** @type {?} */
    JsonSchemaFormComponent.prototype.formValuesInput;
    /** @type {?} */
    JsonSchemaFormComponent.prototype.previousInputs;
    /** @type {?} */
    JsonSchemaFormComponent.prototype.schema;
    /** @type {?} */
    JsonSchemaFormComponent.prototype.layout;
    /** @type {?} */
    JsonSchemaFormComponent.prototype.data;
    /** @type {?} */
    JsonSchemaFormComponent.prototype.options;
    /** @type {?} */
    JsonSchemaFormComponent.prototype.framework;
    /** @type {?} */
    JsonSchemaFormComponent.prototype.widgets;
    /** @type {?} */
    JsonSchemaFormComponent.prototype.form;
    /** @type {?} */
    JsonSchemaFormComponent.prototype.model;
    /** @type {?} */
    JsonSchemaFormComponent.prototype.JSONSchema;
    /** @type {?} */
    JsonSchemaFormComponent.prototype.UISchema;
    /** @type {?} */
    JsonSchemaFormComponent.prototype.formData;
    /** @type {?} */
    JsonSchemaFormComponent.prototype.ngModel;
    /** @type {?} */
    JsonSchemaFormComponent.prototype.language;
    /** @type {?} */
    JsonSchemaFormComponent.prototype.loadExternalAssets;
    /** @type {?} */
    JsonSchemaFormComponent.prototype.debug;
    /** @type {?} */
    JsonSchemaFormComponent.prototype.onChanges;
    /** @type {?} */
    JsonSchemaFormComponent.prototype.onSubmit;
    /** @type {?} */
    JsonSchemaFormComponent.prototype.isValid;
    /** @type {?} */
    JsonSchemaFormComponent.prototype.validationErrors;
    /** @type {?} */
    JsonSchemaFormComponent.prototype.formSchema;
    /** @type {?} */
    JsonSchemaFormComponent.prototype.formLayout;
    /** @type {?} */
    JsonSchemaFormComponent.prototype.dataChange;
    /** @type {?} */
    JsonSchemaFormComponent.prototype.modelChange;
    /** @type {?} */
    JsonSchemaFormComponent.prototype.formDataChange;
    /** @type {?} */
    JsonSchemaFormComponent.prototype.ngModelChange;
    /** @type {?} */
    JsonSchemaFormComponent.prototype.onChange;
    /** @type {?} */
    JsonSchemaFormComponent.prototype.onTouched;
    /** @type {?} */
    JsonSchemaFormComponent.prototype.changeDetector;
    /** @type {?} */
    JsonSchemaFormComponent.prototype.frameworkLibrary;
    /** @type {?} */
    JsonSchemaFormComponent.prototype.widgetLibrary;
    /** @type {?} */
    JsonSchemaFormComponent.prototype.jsf;
    /** @type {?} */
    JsonSchemaFormComponent.prototype.sanitizer;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbi1zY2hlbWEtZm9ybS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZzYtanNvbi1zY2hlbWEtZm9ybS8iLCJzb3VyY2VzIjpbImxpYi9qc29uLXNjaGVtYS1mb3JtLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFDTCx1QkFBdUIsRUFBRSxpQkFBaUIsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUNuRSxVQUFVLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFDMUIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3pFLE9BQU8sRUFBRSxZQUFZLEVBQW1CLE1BQU0sMkJBQTJCLENBQUM7QUFFMUUsT0FBTyxLQUFLLENBQUMsTUFBTSxRQUFRLENBQUM7QUFFNUIsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sK0NBQStDLENBQUM7QUFDeEYsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDL0UsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDbkUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sNENBQTRDLENBQUM7QUFDbkYsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDekUsT0FBTyxFQUNMLFFBQVEsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBWSxRQUFRLEVBQ3hELE1BQU0sOEJBQThCLENBQUM7QUFDdEMsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7O0FBRTdELFdBQWEsK0JBQStCLEdBQVE7SUFDbEQsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLGNBQU0sT0FBQSx1QkFBdUIsRUFB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dkQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUN4Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFtQkssa0RBQWdCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O1FBSXRCLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzFCLElBQUksQ0FBQyxHQUFHLENBQUMsOEJBQThCLEdBQUcsSUFBSSxDQUFDO1lBQy9DLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQzVDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNyRSxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDakQ7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDckMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxnQ0FBZ0MsR0FBRyxJQUFJLENBQUM7WUFDakQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDaEQ7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsWUFBWSxDQUFDLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzdFLElB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LGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO2FBQ2hEO1NBQ0Y7OztnQkEvcEJKLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsa0JBQWtCO29CQUM1QixRQUFRLEVBQUUsa2ZBWUQ7b0JBQ1QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07OztvQkFHL0MsU0FBUyxFQUFHLENBQUUscUJBQXFCLEVBQUUsK0JBQStCLENBQUU7aUJBQ3ZFOzs7O2dCQTlFMEIsaUJBQWlCO2dCQVFuQyx1QkFBdUI7Z0JBQ3ZCLG9CQUFvQjtnQkFDcEIscUJBQXFCO2dCQU5yQixZQUFZOzs7eUJBNkZsQixLQUFLO3lCQUNMLEtBQUs7dUJBQ0wsS0FBSzswQkFDTCxLQUFLOzRCQUNMLEtBQUs7MEJBQ0wsS0FBSzt1QkFHTCxLQUFLO3dCQUdMLEtBQUs7NkJBR0wsS0FBSzsyQkFDTCxLQUFLOzJCQUNMLEtBQUs7MEJBRUwsS0FBSzsyQkFFTCxLQUFLO3FDQUdMLEtBQUs7d0JBQ0wsS0FBSzt3QkFFTCxLQUFLOzRCQVNMLE1BQU07MkJBQ04sTUFBTTswQkFDTixNQUFNO21DQUNOLE1BQU07NkJBQ04sTUFBTTs2QkFDTixNQUFNOzZCQU1OLE1BQU07OEJBQ04sTUFBTTtpQ0FDTixNQUFNO2dDQUNOLE1BQU07O2tDQW5KVDs7U0FnRmEsdUJBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENoYW5nZURldGVjdG9yUmVmLCBDb21wb25lbnQsIEV2ZW50RW1pdHRlcixcbiAgZm9yd2FyZFJlZiwgSW5wdXQsIE91dHB1dCwgT25DaGFuZ2VzLCBPbkluaXRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBEb21TYW5pdGl6ZXIsIFNhZmVSZXNvdXJjZVVybCB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG5cbmltcG9ydCB7IEZyYW1ld29ya0xpYnJhcnlTZXJ2aWNlIH0gZnJvbSAnLi9mcmFtZXdvcmstbGlicmFyeS9mcmFtZXdvcmstbGlicmFyeS5zZXJ2aWNlJztcbmltcG9ydCB7IFdpZGdldExpYnJhcnlTZXJ2aWNlIH0gZnJvbSAnLi93aWRnZXQtbGlicmFyeS93aWRnZXQtbGlicmFyeS5zZXJ2aWNlJztcbmltcG9ydCB7IEpzb25TY2hlbWFGb3JtU2VydmljZSB9IGZyb20gJy4vanNvbi1zY2hlbWEtZm9ybS5zZXJ2aWNlJztcbmltcG9ydCB7IGNvbnZlcnRTY2hlbWFUb0RyYWZ0NiB9IGZyb20gJy4vc2hhcmVkL2NvbnZlcnQtc2NoZW1hLXRvLWRyYWZ0Ni5mdW5jdGlvbic7XG5pbXBvcnQgeyByZXNvbHZlU2NoZW1hUmVmZXJlbmNlcyB9IGZyb20gJy4vc2hhcmVkL2pzb24tc2NoZW1hLmZ1bmN0aW9ucyc7XG5pbXBvcnQge1xuICBoYXNWYWx1ZSwgaW5BcnJheSwgaXNBcnJheSwgaXNFbXB0eSwgaXNOdW1iZXIsIGlzT2JqZWN0XG59IGZyb20gJy4vc2hhcmVkL3ZhbGlkYXRvci5mdW5jdGlvbnMnO1xuaW1wb3J0IHsgZm9yRWFjaCwgaGFzT3duIH0gZnJvbSAnLi9zaGFyZWQvdXRpbGl0eS5mdW5jdGlvbnMnO1xuaW1wb3J0IHsgSnNvblBvaW50ZXIgfSBmcm9tICcuL3NoYXJlZC9qc29ucG9pbnRlci5mdW5jdGlvbnMnO1xuXG5leHBvcnQgY29uc3QgSlNPTl9TQ0hFTUFfRk9STV9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gSnNvblNjaGVtYUZvcm1Db21wb25lbnQpLFxuICBtdWx0aTogdHJ1ZSxcbn07XG5cbi8qKlxuICogQG1vZHVsZSAnSnNvblNjaGVtYUZvcm1Db21wb25lbnQnIC0gQW5ndWxhciBKU09OIFNjaGVtYSBGb3JtXG4gKlxuICogUm9vdCBtb2R1bGUgb2YgdGhlIEFuZ3VsYXIgSlNPTiBTY2hlbWEgRm9ybSBjbGllbnQtc2lkZSBsaWJyYXJ5LFxuICogYW4gQW5ndWxhciBsaWJyYXJ5IHdoaWNoIGdlbmVyYXRlcyBhbiBIVE1MIGZvcm0gZnJvbSBhIEpTT04gc2NoZW1hXG4gKiBzdHJ1Y3R1cmVkIGRhdGEgbW9kZWwgYW5kL29yIGEgSlNPTiBTY2hlbWEgRm9ybSBsYXlvdXQgZGVzY3JpcHRpb24uXG4gKlxuICogVGhpcyBsaWJyYXJ5IGFsc28gdmFsaWRhdGVzIGlucHV0IGRhdGEgYnkgdGhlIHVzZXIsIHVzaW5nIGJvdGggdmFsaWRhdG9ycyBvblxuICogaW5kaXZpZHVhbCBjb250cm9scyB0byBwcm92aWRlIHJlYWwtdGltZSBmZWVkYmFjayB3aGlsZSB0aGUgdXNlciBpcyBmaWxsaW5nXG4gKiBvdXQgdGhlIGZvcm0sIGFuZCB0aGVuIHZhbGlkYXRpbmcgdGhlIGVudGlyZSBpbnB1dCBhZ2FpbnN0IHRoZSBzY2hlbWEgd2hlblxuICogdGhlIGZvcm0gaXMgc3VibWl0dGVkIHRvIG1ha2Ugc3VyZSB0aGUgcmV0dXJuZWQgSlNPTiBkYXRhIG9iamVjdCBpcyB2YWxpZC5cbiAqXG4gKiBUaGlzIGxpYnJhcnkgaXMgc2ltaWxhciB0bywgYW5kIG1vc3RseSBBUEkgY29tcGF0aWJsZSB3aXRoOlxuICpcbiAqIC0gSlNPTiBTY2hlbWEgRm9ybSdzIEFuZ3VsYXIgU2NoZW1hIEZvcm0gbGlicmFyeSBmb3IgQW5ndWxhckpzXG4gKiAgIGh0dHA6Ly9zY2hlbWFmb3JtLmlvXG4gKiAgIGh0dHA6Ly9zY2hlbWFmb3JtLmlvL2V4YW1wbGVzL2Jvb3RzdHJhcC1leGFtcGxlLmh0bWwgKGV4YW1wbGVzKVxuICpcbiAqIC0gTW96aWxsYSdzIHJlYWN0LWpzb25zY2hlbWEtZm9ybSBsaWJyYXJ5IGZvciBSZWFjdFxuICogICBodHRwczovL2dpdGh1Yi5jb20vbW96aWxsYS1zZXJ2aWNlcy9yZWFjdC1qc29uc2NoZW1hLWZvcm1cbiAqICAgaHR0cHM6Ly9tb3ppbGxhLXNlcnZpY2VzLmdpdGh1Yi5pby9yZWFjdC1qc29uc2NoZW1hLWZvcm0gKGV4YW1wbGVzKVxuICpcbiAqIC0gSm9zaGZpcmUncyBKU09OIEZvcm0gbGlicmFyeSBmb3IgalF1ZXJ5XG4gKiAgIGh0dHBzOi8vZ2l0aHViLmNvbS9qb3NoZmlyZS9qc29uZm9ybVxuICogICBodHRwOi8vdWxpb24uZ2l0aHViLmlvL2pzb25mb3JtL3BsYXlncm91bmQgKGV4YW1wbGVzKVxuICpcbiAqIFRoaXMgbGlicmFyeSBkZXBlbmRzIG9uOlxuICogIC0gQW5ndWxhciAob2J2aW91c2x5KSAgICAgICAgICAgICAgICAgIGh0dHBzOi8vYW5ndWxhci5pb1xuICogIC0gbG9kYXNoLCBKYXZhU2NyaXB0IHV0aWxpdHkgbGlicmFyeSAgIGh0dHBzOi8vZ2l0aHViLmNvbS9sb2Rhc2gvbG9kYXNoXG4gKiAgLSBhanYsIEFub3RoZXIgSlNPTiBTY2hlbWEgdmFsaWRhdG9yICAgaHR0cHM6Ly9naXRodWIuY29tL2Vwb2JlcmV6a2luL2FqdlxuICpcbiAqIEluIGFkZGl0aW9uLCB0aGUgRXhhbXBsZSBQbGF5Z3JvdW5kIGFsc28gZGVwZW5kcyBvbjpcbiAqICAtIGJyYWNlLCBCcm93c2VyaWZpZWQgQWNlIGVkaXRvciAgICAgICBodHRwOi8vdGhsb3JlbnouZ2l0aHViLmlvL2JyYWNlXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2pzb24tc2NoZW1hLWZvcm0nLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgKm5nRm9yPVwibGV0IHN0eWxlc2hlZXQgb2Ygc3R5bGVzaGVldHNcIj5cbiAgICAgIDxsaW5rIHJlbD1cInN0eWxlc2hlZXRcIiBbaHJlZl09XCJzdHlsZXNoZWV0XCI+XG4gICAgPC9kaXY+XG4gICAgPGRpdiAqbmdGb3I9XCJsZXQgc2NyaXB0IG9mIHNjcmlwdHNcIj5cbiAgICAgIDxzY3JpcHQgdHlwZT1cInRleHQvamF2YXNjcmlwdFwiIFtzcmNdPVwic2NyaXB0XCI+PC9zY3JpcHQ+XG4gICAgPC9kaXY+XG4gICAgPGZvcm0gY2xhc3M9XCJqc29uLXNjaGVtYS1mb3JtXCIgKG5nU3VibWl0KT1cInN1Ym1pdEZvcm0oKVwiPlxuICAgICAgPHJvb3Qtd2lkZ2V0IFtsYXlvdXRdPVwianNmPy5sYXlvdXRcIj48L3Jvb3Qtd2lkZ2V0PlxuICAgIDwvZm9ybT5cbiAgICA8ZGl2ICpuZ0lmPVwiZGVidWcgfHwganNmPy5mb3JtT3B0aW9ucz8uZGVidWdcIj5cbiAgICAgIERlYnVnIG91dHB1dDogPHByZT57e2RlYnVnT3V0cHV0fX08L3ByZT5cbiAgICA8L2Rpdj5gLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgLy8gQWRkaW5nICdKc29uU2NoZW1hRm9ybVNlcnZpY2UnIGhlcmUsIGluc3RlYWQgb2YgaW4gdGhlIG1vZHVsZSxcbiAgLy8gY3JlYXRlcyBhIHNlcGFyYXRlIGluc3RhbmNlIG9mIHRoZSBzZXJ2aWNlIGZvciBlYWNoIGNvbXBvbmVudFxuICBwcm92aWRlcnM6ICBbIEpzb25TY2hlbWFGb3JtU2VydmljZSwgSlNPTl9TQ0hFTUFfRk9STV9WQUxVRV9BQ0NFU1NPUiBdLFxufSlcbmV4cG9ydCBjbGFzcyBKc29uU2NoZW1hRm9ybUNvbXBvbmVudCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBPbkNoYW5nZXMsIE9uSW5pdCB7XG4gIGRlYnVnT3V0cHV0OiBhbnk7IC8vIERlYnVnIGluZm9ybWF0aW9uLCBpZiByZXF1ZXN0ZWRcbiAgZm9ybVZhbHVlU3Vic2NyaXB0aW9uOiBhbnkgPSBudWxsO1xuICBmb3JtSW5pdGlhbGl6ZWQgPSBmYWxzZTtcbiAgb2JqZWN0V3JhcCA9IGZhbHNlOyAvLyBJcyBub24tb2JqZWN0IGlucHV0IHNjaGVtYSB3cmFwcGVkIGluIGFuIG9iamVjdD9cblxuICBmb3JtVmFsdWVzSW5wdXQ6IHN0cmluZzsgLy8gTmFtZSBvZiB0aGUgaW5wdXQgcHJvdmlkaW5nIHRoZSBmb3JtIGRhdGFcbiAgcHJldmlvdXNJbnB1dHM6IHsgLy8gUHJldmlvdXMgaW5wdXQgdmFsdWVzLCB0byBkZXRlY3Qgd2hpY2ggaW5wdXQgdHJpZ2dlcnMgb25DaGFuZ2VzXG4gICAgc2NoZW1hOiBhbnksIGxheW91dDogYW55W10sIGRhdGE6IGFueSwgb3B0aW9uczogYW55LCBmcmFtZXdvcms6IGFueXxzdHJpbmcsXG4gICAgd2lkZ2V0czogYW55LCBmb3JtOiBhbnksIG1vZGVsOiBhbnksIEpTT05TY2hlbWE6IGFueSwgVUlTY2hlbWE6IGFueSxcbiAgICBmb3JtRGF0YTogYW55LCBsb2FkRXh0ZXJuYWxBc3NldHM6IGJvb2xlYW4sIGRlYnVnOiBib29sZWFuLFxuICB9ID0ge1xuICAgIHNjaGVtYTogbnVsbCwgbGF5b3V0OiBudWxsLCBkYXRhOiBudWxsLCBvcHRpb25zOiBudWxsLCBmcmFtZXdvcms6IG51bGwsXG4gICAgd2lkZ2V0czogbnVsbCwgZm9ybTogbnVsbCwgbW9kZWw6IG51bGwsIEpTT05TY2hlbWE6IG51bGwsIFVJU2NoZW1hOiBudWxsLFxuICAgIGZvcm1EYXRhOiBudWxsLCBsb2FkRXh0ZXJuYWxBc3NldHM6IG51bGwsIGRlYnVnOiBudWxsLFxuICB9O1xuXG4gIC8vIFJlY29tbWVuZGVkIGlucHV0c1xuICBASW5wdXQoKSBzY2hlbWE6IGFueTsgLy8gVGhlIEpTT04gU2NoZW1hXG4gIEBJbnB1dCgpIGxheW91dDogYW55W107IC8vIFRoZSBmb3JtIGxheW91dFxuICBASW5wdXQoKSBkYXRhOiBhbnk7IC8vIFRoZSBmb3JtIGRhdGFcbiAgQElucHV0KCkgb3B0aW9uczogYW55OyAvLyBUaGUgZ2xvYmFsIGZvcm0gb3B0aW9uc1xuICBASW5wdXQoKSBmcmFtZXdvcms6IGFueXxzdHJpbmc7IC8vIFRoZSBmcmFtZXdvcmsgdG8gbG9hZFxuICBASW5wdXQoKSB3aWRnZXRzOiBhbnk7IC8vIEFueSBjdXN0b20gd2lkZ2V0cyB0byBsb2FkXG5cbiAgLy8gQWx0ZXJuYXRlIGNvbWJpbmVkIHNpbmdsZSBpbnB1dFxuICBASW5wdXQoKSBmb3JtOiBhbnk7IC8vIEZvciB0ZXN0aW5nLCBhbmQgSlNPTiBTY2hlbWEgRm9ybSBBUEkgY29tcGF0aWJpbGl0eVxuXG4gIC8vIEFuZ3VsYXIgU2NoZW1hIEZvcm0gQVBJIGNvbXBhdGliaWxpdHkgaW5wdXRcbiAgQElucHV0KCkgbW9kZWw6IGFueTsgLy8gQWx0ZXJuYXRlIGlucHV0IGZvciBmb3JtIGRhdGFcblxuICAvLyBSZWFjdCBKU09OIFNjaGVtYSBGb3JtIEFQSSBjb21wYXRpYmlsaXR5IGlucHV0c1xuICBASW5wdXQoKSBKU09OU2NoZW1hOiBhbnk7IC8vIEFsdGVybmF0ZSBpbnB1dCBmb3IgSlNPTiBTY2hlbWFcbiAgQElucHV0KCkgVUlTY2hlbWE6IGFueTsgLy8gVUkgc2NoZW1hIC0gYWx0ZXJuYXRlIGZvcm0gbGF5b3V0IGZvcm1hdFxuICBASW5wdXQoKSBmb3JtRGF0YTogYW55OyAvLyBBbHRlcm5hdGUgaW5wdXQgZm9yIGZvcm0gZGF0YVxuXG4gIEBJbnB1dCgpIG5nTW9kZWw6IGFueTsgLy8gQWx0ZXJuYXRlIGlucHV0IGZvciBBbmd1bGFyIGZvcm1zXG5cbiAgQElucHV0KCkgbGFuZ3VhZ2U6IHN0cmluZzsgLy8gTGFuZ3VhZ2VcblxuICAvLyBEZXZlbG9wbWVudCBpbnB1dHMsIGZvciB0ZXN0aW5nIGFuZCBkZWJ1Z2dpbmdcbiAgQElucHV0KCkgbG9hZEV4dGVybmFsQXNzZXRzOiBib29sZWFuOyAvLyBMb2FkIGV4dGVybmFsIGZyYW1ld29yayBhc3NldHM/XG4gIEBJbnB1dCgpIGRlYnVnOiBib29sZWFuOyAvLyBTaG93IGRlYnVnIGluZm9ybWF0aW9uP1xuXG4gIEBJbnB1dCgpXG4gIGdldCB2YWx1ZSgpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLm9iamVjdFdyYXAgPyB0aGlzLmpzZi5kYXRhWycxJ10gOiB0aGlzLmpzZi5kYXRhO1xuICB9O1xuICBzZXQgdmFsdWUodmFsdWU6IGFueSkge1xuICAgIHRoaXMuc2V0Rm9ybVZhbHVlcyh2YWx1ZSwgZmFsc2UpO1xuICB9XG5cbiAgLy8gT3V0cHV0c1xuICBAT3V0cHV0KCkgb25DaGFuZ2VzID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7IC8vIExpdmUgdW52YWxpZGF0ZWQgaW50ZXJuYWwgZm9ybSBkYXRhXG4gIEBPdXRwdXQoKSBvblN1Ym1pdCA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpOyAvLyBDb21wbGV0ZSB2YWxpZGF0ZWQgZm9ybSBkYXRhXG4gIEBPdXRwdXQoKSBpc1ZhbGlkID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpOyAvLyBJcyBjdXJyZW50IGRhdGEgdmFsaWQ/XG4gIEBPdXRwdXQoKSB2YWxpZGF0aW9uRXJyb3JzID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7IC8vIFZhbGlkYXRpb24gZXJyb3JzIChpZiBhbnkpXG4gIEBPdXRwdXQoKSBmb3JtU2NoZW1hID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7IC8vIEZpbmFsIHNjaGVtYSB1c2VkIHRvIGNyZWF0ZSBmb3JtXG4gIEBPdXRwdXQoKSBmb3JtTGF5b3V0ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7IC8vIEZpbmFsIGxheW91dCB1c2VkIHRvIGNyZWF0ZSBmb3JtXG5cbiAgLy8gT3V0cHV0cyBmb3IgcG9zc2libGUgMi13YXkgZGF0YSBiaW5kaW5nXG4gIC8vIE9ubHkgdGhlIG9uZSBpbnB1dCBwcm92aWRpbmcgdGhlIGluaXRpYWwgZm9ybSBkYXRhIHdpbGwgYmUgYm91bmQuXG4gIC8vIElmIHRoZXJlIGlzIG5vIGluaXRhbCBkYXRhLCBpbnB1dCAne30nIHRvIGFjdGl2YXRlIDItd2F5IGRhdGEgYmluZGluZy5cbiAgLy8gVGhlcmUgaXMgbm8gMi13YXkgYmluZGluZyBpZiBpbml0YWwgZGF0YSBpcyBjb21iaW5lZCBpbnNpZGUgdGhlICdmb3JtJyBpbnB1dC5cbiAgQE91dHB1dCgpIGRhdGFDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgQE91dHB1dCgpIG1vZGVsQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBPdXRwdXQoKSBmb3JtRGF0YUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBAT3V0cHV0KCkgbmdNb2RlbENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIG9uQ2hhbmdlOiBGdW5jdGlvbjtcbiAgb25Ub3VjaGVkOiBGdW5jdGlvbjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGNoYW5nZURldGVjdG9yOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBwcml2YXRlIGZyYW1ld29ya0xpYnJhcnk6IEZyYW1ld29ya0xpYnJhcnlTZXJ2aWNlLFxuICAgIHByaXZhdGUgd2lkZ2V0TGlicmFyeTogV2lkZ2V0TGlicmFyeVNlcnZpY2UsXG4gICAgcHVibGljIGpzZjogSnNvblNjaGVtYUZvcm1TZXJ2aWNlLFxuICAgIHByaXZhdGUgc2FuaXRpemVyOiBEb21TYW5pdGl6ZXJcbiAgKSB7IH1cblxuICBnZXQgc3R5bGVzaGVldHMoKTogU2FmZVJlc291cmNlVXJsW10ge1xuICAgIGNvbnN0IHN0eWxlc2hlZXRzID0gdGhpcy5mcmFtZXdvcmtMaWJyYXJ5LmdldEZyYW1ld29ya1N0eWxlc2hlZXRzKCk7XG4gICAgY29uc3QgbG9hZCA9IHRoaXMuc2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RSZXNvdXJjZVVybDtcbiAgICByZXR1cm4gc3R5bGVzaGVldHMubWFwKHN0eWxlc2hlZXQgPT4gbG9hZChzdHlsZXNoZWV0KSk7XG4gIH1cblxuICBnZXQgc2NyaXB0cygpOiBTYWZlUmVzb3VyY2VVcmxbXSB7XG4gICAgY29uc3Qgc2NyaXB0cyA9IHRoaXMuZnJhbWV3b3JrTGlicmFyeS5nZXRGcmFtZXdvcmtTY3JpcHRzKCk7XG4gICAgY29uc3QgbG9hZCA9IHRoaXMuc2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RSZXNvdXJjZVVybDtcbiAgICByZXR1cm4gc2NyaXB0cy5tYXAoc2NyaXB0ID0+IGxvYWQoc2NyaXB0KSk7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnVwZGF0ZUZvcm0oKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKCkge1xuICAgIHRoaXMudXBkYXRlRm9ybSgpO1xuICB9XG5cbiAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgdGhpcy5zZXRGb3JtVmFsdWVzKHZhbHVlLCBmYWxzZSk7XG4gICAgaWYgKCF0aGlzLmZvcm1WYWx1ZXNJbnB1dCkgeyB0aGlzLmZvcm1WYWx1ZXNJbnB1dCA9ICduZ01vZGVsJzsgfVxuICB9XG5cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogRnVuY3Rpb24pIHtcbiAgICB0aGlzLm9uQ2hhbmdlID0gZm47XG4gIH1cblxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogRnVuY3Rpb24pIHtcbiAgICB0aGlzLm9uVG91Y2hlZCA9IGZuO1xuICB9XG5cbiAgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKSB7XG4gICAgaWYgKHRoaXMuanNmLmZvcm1PcHRpb25zLmZvcm1EaXNhYmxlZCAhPT0gISFpc0Rpc2FibGVkKSB7XG4gICAgICB0aGlzLmpzZi5mb3JtT3B0aW9ucy5mb3JtRGlzYWJsZWQgPSAhIWlzRGlzYWJsZWQ7XG4gICAgICB0aGlzLmluaXRpYWxpemVGb3JtKCk7XG4gICAgfVxuICB9XG5cbiAgdXBkYXRlRm9ybSgpIHtcbiAgICBpZiAoIXRoaXMuZm9ybUluaXRpYWxpemVkIHx8ICF0aGlzLmZvcm1WYWx1ZXNJbnB1dCB8fFxuICAgICAgKHRoaXMubGFuZ3VhZ2UgJiYgdGhpcy5sYW5ndWFnZSAhPT0gdGhpcy5qc2YubGFuZ3VhZ2UpXG4gICAgKSB7XG4gICAgICB0aGlzLmluaXRpYWxpemVGb3JtKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0aGlzLmxhbmd1YWdlICYmIHRoaXMubGFuZ3VhZ2UgIT09IHRoaXMuanNmLmxhbmd1YWdlKSB7XG4gICAgICAgIHRoaXMuanNmLnNldExhbmd1YWdlKHRoaXMubGFuZ3VhZ2UpO1xuICAgICAgfVxuXG4gICAgICAvLyBHZXQgbmFtZXMgb2YgY2hhbmdlZCBpbnB1dHNcbiAgICAgIGxldCBjaGFuZ2VkSW5wdXQgPSBPYmplY3Qua2V5cyh0aGlzLnByZXZpb3VzSW5wdXRzKVxuICAgICAgICAuZmlsdGVyKGlucHV0ID0+IHRoaXMucHJldmlvdXNJbnB1dHNbaW5wdXRdICE9PSB0aGlzW2lucHV0XSk7XG4gICAgICBsZXQgcmVzZXRGaXJzdCA9IHRydWU7XG4gICAgICBpZiAoY2hhbmdlZElucHV0Lmxlbmd0aCA9PT0gMSAmJiBjaGFuZ2VkSW5wdXRbMF0gPT09ICdmb3JtJyAmJlxuICAgICAgICB0aGlzLmZvcm1WYWx1ZXNJbnB1dC5zdGFydHNXaXRoKCdmb3JtLicpXG4gICAgICApIHtcbiAgICAgICAgLy8gSWYgb25seSAnZm9ybScgaW5wdXQgY2hhbmdlZCwgZ2V0IG5hbWVzIG9mIGNoYW5nZWQga2V5c1xuICAgICAgICBjaGFuZ2VkSW5wdXQgPSBPYmplY3Qua2V5cyh0aGlzLnByZXZpb3VzSW5wdXRzLmZvcm0gfHwge30pXG4gICAgICAgICAgLmZpbHRlcihrZXkgPT4gIV8uaXNFcXVhbCh0aGlzLnByZXZpb3VzSW5wdXRzLmZvcm1ba2V5XSwgdGhpcy5mb3JtW2tleV0pKVxuICAgICAgICAgIC5tYXAoa2V5ID0+IGBmb3JtLiR7a2V5fWApO1xuICAgICAgICByZXNldEZpcnN0ID0gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIC8vIElmIG9ubHkgaW5wdXQgdmFsdWVzIGhhdmUgY2hhbmdlZCwgdXBkYXRlIHRoZSBmb3JtIHZhbHVlc1xuICAgICAgaWYgKGNoYW5nZWRJbnB1dC5sZW5ndGggPT09IDEgJiYgY2hhbmdlZElucHV0WzBdID09PSB0aGlzLmZvcm1WYWx1ZXNJbnB1dCkge1xuICAgICAgICBpZiAodGhpcy5mb3JtVmFsdWVzSW5wdXQuaW5kZXhPZignLicpID09PSAtMSkge1xuICAgICAgICAgIHRoaXMuc2V0Rm9ybVZhbHVlcyh0aGlzW3RoaXMuZm9ybVZhbHVlc0lucHV0XSwgcmVzZXRGaXJzdCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc3QgW2lucHV0LCBrZXldID0gdGhpcy5mb3JtVmFsdWVzSW5wdXQuc3BsaXQoJy4nKTtcbiAgICAgICAgICB0aGlzLnNldEZvcm1WYWx1ZXModGhpc1tpbnB1dF1ba2V5XSwgcmVzZXRGaXJzdCk7XG4gICAgICAgIH1cblxuICAgICAgLy8gSWYgYW55dGhpbmcgZWxzZSBoYXMgY2hhbmdlZCwgcmUtcmVuZGVyIHRoZSBlbnRpcmUgZm9ybVxuICAgICAgfSBlbHNlIGlmIChjaGFuZ2VkSW5wdXQubGVuZ3RoKSB7XG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZUZvcm0oKTtcbiAgICAgICAgaWYgKHRoaXMub25DaGFuZ2UpIHsgdGhpcy5vbkNoYW5nZSh0aGlzLmpzZi5mb3JtVmFsdWVzKTsgfVxuICAgICAgICBpZiAodGhpcy5vblRvdWNoZWQpIHsgdGhpcy5vblRvdWNoZWQodGhpcy5qc2YuZm9ybVZhbHVlcyk7IH1cbiAgICAgIH1cblxuICAgICAgLy8gVXBkYXRlIHByZXZpb3VzIGlucHV0c1xuICAgICAgT2JqZWN0LmtleXModGhpcy5wcmV2aW91c0lucHV0cylcbiAgICAgICAgLmZpbHRlcihpbnB1dCA9PiB0aGlzLnByZXZpb3VzSW5wdXRzW2lucHV0XSAhPT0gdGhpc1tpbnB1dF0pXG4gICAgICAgIC5mb3JFYWNoKGlucHV0ID0+IHRoaXMucHJldmlvdXNJbnB1dHNbaW5wdXRdID0gdGhpc1tpbnB1dF0pO1xuICAgIH1cbiAgfVxuXG4gIHNldEZvcm1WYWx1ZXMoZm9ybVZhbHVlczogYW55LCByZXNldEZpcnN0ID0gdHJ1ZSkge1xuICAgIGlmIChmb3JtVmFsdWVzKSB7XG4gICAgICBsZXQgbmV3Rm9ybVZhbHVlcyA9IHRoaXMub2JqZWN0V3JhcCA/IGZvcm1WYWx1ZXNbJzEnXSA6IGZvcm1WYWx1ZXM7XG4gICAgICBpZiAoIXRoaXMuanNmLmZvcm1Hcm91cCkge1xuICAgICAgICB0aGlzLmpzZi5mb3JtVmFsdWVzID0gZm9ybVZhbHVlcztcbiAgICAgICAgdGhpcy5hY3RpdmF0ZUZvcm0oKTtcbiAgICAgIH0gZWxzZSBpZiAocmVzZXRGaXJzdCkge1xuICAgICAgICB0aGlzLmpzZi5mb3JtR3JvdXAucmVzZXQoKTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLmpzZi5mb3JtR3JvdXApIHtcbiAgICAgICAgdGhpcy5qc2YuZm9ybUdyb3VwLnBhdGNoVmFsdWUobmV3Rm9ybVZhbHVlcyk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5vbkNoYW5nZSkgeyB0aGlzLm9uQ2hhbmdlKG5ld0Zvcm1WYWx1ZXMpOyB9XG4gICAgICBpZiAodGhpcy5vblRvdWNoZWQpIHsgdGhpcy5vblRvdWNoZWQobmV3Rm9ybVZhbHVlcyk7IH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5qc2YuZm9ybUdyb3VwLnJlc2V0KCk7XG4gICAgfVxuICB9XG5cbiAgc3VibWl0Rm9ybSgpIHtcbiAgICBjb25zdCB2YWxpZERhdGEgPSB0aGlzLmpzZi52YWxpZERhdGE7XG4gICAgdGhpcy5vblN1Ym1pdC5lbWl0KHRoaXMub2JqZWN0V3JhcCA/IHZhbGlkRGF0YVsnMSddIDogdmFsaWREYXRhKTtcbiAgfVxuXG4gIC8qKlxuICAgKiAnaW5pdGlhbGl6ZUZvcm0nIGZ1bmN0aW9uXG4gICAqXG4gICAqIC0gVXBkYXRlICdzY2hlbWEnLCAnbGF5b3V0JywgYW5kICdmb3JtVmFsdWVzJywgZnJvbSBpbnB1dHMuXG4gICAqXG4gICAqIC0gQ3JlYXRlICdzY2hlbWFSZWZMaWJyYXJ5JyBhbmQgJ3NjaGVtYVJlY3Vyc2l2ZVJlZk1hcCdcbiAgICogICB0byByZXNvbHZlIHNjaGVtYSAkcmVmIGxpbmtzLCBpbmNsdWRpbmcgcmVjdXJzaXZlICRyZWYgbGlua3MuXG4gICAqXG4gICAqIC0gQ3JlYXRlICdkYXRhUmVjdXJzaXZlUmVmTWFwJyB0byByZXNvbHZlIHJlY3Vyc2l2ZSBsaW5rcyBpbiBkYXRhXG4gICAqICAgYW5kIGNvcmVjdGx5IHNldCBvdXRwdXQgZm9ybWF0cyBmb3IgcmVjdXJzaXZlbHkgbmVzdGVkIHZhbHVlcy5cbiAgICpcbiAgICogLSBDcmVhdGUgJ2xheW91dFJlZkxpYnJhcnknIGFuZCAndGVtcGxhdGVSZWZMaWJyYXJ5JyB0byBzdG9yZVxuICAgKiAgIG5ldyBsYXlvdXQgbm9kZXMgYW5kIGZvcm1Hcm91cCBlbGVtZW50cyB0byB1c2Ugd2hlbiBkeW5hbWljYWxseVxuICAgKiAgIGFkZGluZyBmb3JtIGNvbXBvbmVudHMgdG8gYXJyYXlzIGFuZCByZWN1cnNpdmUgJHJlZiBwb2ludHMuXG4gICAqXG4gICAqIC0gQ3JlYXRlICdkYXRhTWFwJyB0byBtYXAgdGhlIGRhdGEgdG8gdGhlIHNjaGVtYSBhbmQgdGVtcGxhdGUuXG4gICAqXG4gICAqIC0gQ3JlYXRlIHRoZSBtYXN0ZXIgJ2Zvcm1Hcm91cFRlbXBsYXRlJyB0aGVuIGZyb20gaXQgJ2Zvcm1Hcm91cCdcbiAgICogICB0aGUgQW5ndWxhciBmb3JtR3JvdXAgdXNlZCB0byBjb250cm9sIHRoZSByZWFjdGl2ZSBmb3JtLlxuICAgKi9cbiAgaW5pdGlhbGl6ZUZvcm0oKSB7XG4gICAgaWYgKFxuICAgICAgdGhpcy5zY2hlbWEgfHwgdGhpcy5sYXlvdXQgfHwgdGhpcy5kYXRhIHx8IHRoaXMuZm9ybSB8fCB0aGlzLm1vZGVsIHx8XG4gICAgICB0aGlzLkpTT05TY2hlbWEgfHwgdGhpcy5VSVNjaGVtYSB8fCB0aGlzLmZvcm1EYXRhIHx8IHRoaXMubmdNb2RlbCB8fFxuICAgICAgdGhpcy5qc2YuZGF0YVxuICAgICkge1xuXG4gICAgICB0aGlzLmpzZi5yZXNldEFsbFZhbHVlcygpOyAgLy8gUmVzZXQgYWxsIGZvcm0gdmFsdWVzIHRvIGRlZmF1bHRzXG4gICAgICB0aGlzLmluaXRpYWxpemVPcHRpb25zKCk7ICAgLy8gVXBkYXRlIG9wdGlvbnNcbiAgICAgIHRoaXMuaW5pdGlhbGl6ZVNjaGVtYSgpOyAgICAvLyBVcGRhdGUgc2NoZW1hLCBzY2hlbWFSZWZMaWJyYXJ5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNjaGVtYVJlY3Vyc2l2ZVJlZk1hcCwgJiBkYXRhUmVjdXJzaXZlUmVmTWFwXG4gICAgICB0aGlzLmluaXRpYWxpemVMYXlvdXQoKTsgICAgLy8gVXBkYXRlIGxheW91dCwgbGF5b3V0UmVmTGlicmFyeSxcbiAgICAgIHRoaXMuaW5pdGlhbGl6ZURhdGEoKTsgICAgICAvLyBVcGRhdGUgZm9ybVZhbHVlc1xuICAgICAgdGhpcy5hY3RpdmF0ZUZvcm0oKTsgICAgICAgIC8vIFVwZGF0ZSBkYXRhTWFwLCB0ZW1wbGF0ZVJlZkxpYnJhcnksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZm9ybUdyb3VwVGVtcGxhdGUsIGZvcm1Hcm91cFxuXG4gICAgICAvLyBVbmNvbW1lbnQgaW5kaXZpZHVhbCBsaW5lcyB0byBvdXRwdXQgZGVidWdnaW5nIGluZm9ybWF0aW9uIHRvIGNvbnNvbGU6XG4gICAgICAvLyAoVGhlc2UgYWx3YXlzIHdvcmsuKVxuICAgICAgLy8gY29uc29sZS5sb2coJ2xvYWRpbmcgZm9ybS4uLicpO1xuICAgICAgLy8gY29uc29sZS5sb2coJ3NjaGVtYScsIHRoaXMuanNmLnNjaGVtYSk7XG4gICAgICAvLyBjb25zb2xlLmxvZygnbGF5b3V0JywgdGhpcy5qc2YubGF5b3V0KTtcbiAgICAgIC8vIGNvbnNvbGUubG9nKCdvcHRpb25zJywgdGhpcy5vcHRpb25zKTtcbiAgICAgIC8vIGNvbnNvbGUubG9nKCdmb3JtVmFsdWVzJywgdGhpcy5qc2YuZm9ybVZhbHVlcyk7XG4gICAgICAvLyBjb25zb2xlLmxvZygnZm9ybUdyb3VwVGVtcGxhdGUnLCB0aGlzLmpzZi5mb3JtR3JvdXBUZW1wbGF0ZSk7XG4gICAgICAvLyBjb25zb2xlLmxvZygnZm9ybUdyb3VwJywgdGhpcy5qc2YuZm9ybUdyb3VwKTtcbiAgICAgIC8vIGNvbnNvbGUubG9nKCdmb3JtR3JvdXAudmFsdWUnLCB0aGlzLmpzZi5mb3JtR3JvdXAudmFsdWUpO1xuICAgICAgLy8gY29uc29sZS5sb2coJ3NjaGVtYVJlZkxpYnJhcnknLCB0aGlzLmpzZi5zY2hlbWFSZWZMaWJyYXJ5KTtcbiAgICAgIC8vIGNvbnNvbGUubG9nKCdsYXlvdXRSZWZMaWJyYXJ5JywgdGhpcy5qc2YubGF5b3V0UmVmTGlicmFyeSk7XG4gICAgICAvLyBjb25zb2xlLmxvZygndGVtcGxhdGVSZWZMaWJyYXJ5JywgdGhpcy5qc2YudGVtcGxhdGVSZWZMaWJyYXJ5KTtcbiAgICAgIC8vIGNvbnNvbGUubG9nKCdkYXRhTWFwJywgdGhpcy5qc2YuZGF0YU1hcCk7XG4gICAgICAvLyBjb25zb2xlLmxvZygnYXJyYXlNYXAnLCB0aGlzLmpzZi5hcnJheU1hcCk7XG4gICAgICAvLyBjb25zb2xlLmxvZygnc2NoZW1hUmVjdXJzaXZlUmVmTWFwJywgdGhpcy5qc2Yuc2NoZW1hUmVjdXJzaXZlUmVmTWFwKTtcbiAgICAgIC8vIGNvbnNvbGUubG9nKCdkYXRhUmVjdXJzaXZlUmVmTWFwJywgdGhpcy5qc2YuZGF0YVJlY3Vyc2l2ZVJlZk1hcCk7XG5cbiAgICAgIC8vIFVuY29tbWVudCBpbmRpdmlkdWFsIGxpbmVzIHRvIG91dHB1dCBkZWJ1Z2dpbmcgaW5mb3JtYXRpb24gdG8gYnJvd3NlcjpcbiAgICAgIC8vIChUaGVzZSBvbmx5IHdvcmsgaWYgdGhlICdkZWJ1Zycgb3B0aW9uIGhhcyBhbHNvIGJlZW4gc2V0IHRvICd0cnVlJy4pXG4gICAgICBpZiAodGhpcy5kZWJ1ZyB8fCB0aGlzLmpzZi5mb3JtT3B0aW9ucy5kZWJ1Zykge1xuICAgICAgICBjb25zdCB2YXJzOiBhbnlbXSA9IFtdO1xuICAgICAgICAvLyB2YXJzLnB1c2godGhpcy5qc2Yuc2NoZW1hKTtcbiAgICAgICAgLy8gdmFycy5wdXNoKHRoaXMuanNmLmxheW91dCk7XG4gICAgICAgIC8vIHZhcnMucHVzaCh0aGlzLm9wdGlvbnMpO1xuICAgICAgICAvLyB2YXJzLnB1c2godGhpcy5qc2YuZm9ybVZhbHVlcyk7XG4gICAgICAgIC8vIHZhcnMucHVzaCh0aGlzLmpzZi5mb3JtR3JvdXAudmFsdWUpO1xuICAgICAgICAvLyB2YXJzLnB1c2godGhpcy5qc2YuZm9ybUdyb3VwVGVtcGxhdGUpO1xuICAgICAgICAvLyB2YXJzLnB1c2godGhpcy5qc2YuZm9ybUdyb3VwKTtcbiAgICAgICAgLy8gdmFycy5wdXNoKHRoaXMuanNmLnNjaGVtYVJlZkxpYnJhcnkpO1xuICAgICAgICAvLyB2YXJzLnB1c2godGhpcy5qc2YubGF5b3V0UmVmTGlicmFyeSk7XG4gICAgICAgIC8vIHZhcnMucHVzaCh0aGlzLmpzZi50ZW1wbGF0ZVJlZkxpYnJhcnkpO1xuICAgICAgICAvLyB2YXJzLnB1c2godGhpcy5qc2YuZGF0YU1hcCk7XG4gICAgICAgIC8vIHZhcnMucHVzaCh0aGlzLmpzZi5hcnJheU1hcCk7XG4gICAgICAgIC8vIHZhcnMucHVzaCh0aGlzLmpzZi5zY2hlbWFSZWN1cnNpdmVSZWZNYXApO1xuICAgICAgICAvLyB2YXJzLnB1c2godGhpcy5qc2YuZGF0YVJlY3Vyc2l2ZVJlZk1hcCk7XG4gICAgICAgIHRoaXMuZGVidWdPdXRwdXQgPSB2YXJzLm1hcCh2ID0+IEpTT04uc3RyaW5naWZ5KHYsIG51bGwsIDIpKS5qb2luKCdcXG4nKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuZm9ybUluaXRpYWxpemVkID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogJ2luaXRpYWxpemVPcHRpb25zJyBmdW5jdGlvblxuICAgKlxuICAgKiBJbml0aWFsaXplICdvcHRpb25zJyAoZ2xvYmFsIGZvcm0gb3B0aW9ucykgYW5kIHNldCBmcmFtZXdvcmtcbiAgICogQ29tYmluZSBhdmFpbGFibGUgaW5wdXRzOlxuICAgKiAxLiBvcHRpb25zIC0gcmVjb21tZW5kZWRcbiAgICogMi4gZm9ybS5vcHRpb25zIC0gU2luZ2xlIGlucHV0IHN0eWxlXG4gICAqL1xuICBwcml2YXRlIGluaXRpYWxpemVPcHRpb25zKCkge1xuICAgIGlmICh0aGlzLmxhbmd1YWdlICYmIHRoaXMubGFuZ3VhZ2UgIT09IHRoaXMuanNmLmxhbmd1YWdlKSB7XG4gICAgICB0aGlzLmpzZi5zZXRMYW5ndWFnZSh0aGlzLmxhbmd1YWdlKTtcbiAgICB9XG4gICAgdGhpcy5qc2Yuc2V0T3B0aW9ucyh7IGRlYnVnOiAhIXRoaXMuZGVidWcgfSk7XG4gICAgbGV0IGxvYWRFeHRlcm5hbEFzc2V0czogYm9vbGVhbiA9IHRoaXMubG9hZEV4dGVybmFsQXNzZXRzIHx8IGZhbHNlO1xuICAgIGxldCBmcmFtZXdvcms6IGFueSA9IHRoaXMuZnJhbWV3b3JrIHx8ICdkZWZhdWx0JztcbiAgICBpZiAoaXNPYmplY3QodGhpcy5vcHRpb25zKSkge1xuICAgICAgdGhpcy5qc2Yuc2V0T3B0aW9ucyh0aGlzLm9wdGlvbnMpO1xuICAgICAgbG9hZEV4dGVybmFsQXNzZXRzID0gdGhpcy5vcHRpb25zLmxvYWRFeHRlcm5hbEFzc2V0cyB8fCBsb2FkRXh0ZXJuYWxBc3NldHM7XG4gICAgICBmcmFtZXdvcmsgPSB0aGlzLm9wdGlvbnMuZnJhbWV3b3JrIHx8IGZyYW1ld29yaztcbiAgICB9XG4gICAgaWYgKGlzT2JqZWN0KHRoaXMuZm9ybSkgJiYgaXNPYmplY3QodGhpcy5mb3JtLm9wdGlvbnMpKSB7XG4gICAgICB0aGlzLmpzZi5zZXRPcHRpb25zKHRoaXMuZm9ybS5vcHRpb25zKTtcbiAgICAgIGxvYWRFeHRlcm5hbEFzc2V0cyA9IHRoaXMuZm9ybS5vcHRpb25zLmxvYWRFeHRlcm5hbEFzc2V0cyB8fCBsb2FkRXh0ZXJuYWxBc3NldHM7XG4gICAgICBmcmFtZXdvcmsgPSB0aGlzLmZvcm0ub3B0aW9ucy5mcmFtZXdvcmsgfHwgZnJhbWV3b3JrO1xuICAgIH1cbiAgICBpZiAoaXNPYmplY3QodGhpcy53aWRnZXRzKSkge1xuICAgICAgdGhpcy5qc2Yuc2V0T3B0aW9ucyh7IHdpZGdldHM6IHRoaXMud2lkZ2V0cyB9KTtcbiAgICB9XG4gICAgdGhpcy5mcmFtZXdvcmtMaWJyYXJ5LnNldExvYWRFeHRlcm5hbEFzc2V0cyhsb2FkRXh0ZXJuYWxBc3NldHMpO1xuICAgIHRoaXMuZnJhbWV3b3JrTGlicmFyeS5zZXRGcmFtZXdvcmsoZnJhbWV3b3JrKTtcbiAgICB0aGlzLmpzZi5mcmFtZXdvcmsgPSB0aGlzLmZyYW1ld29ya0xpYnJhcnkuZ2V0RnJhbWV3b3JrKCk7XG4gICAgaWYgKGlzT2JqZWN0KHRoaXMuanNmLmZvcm1PcHRpb25zLndpZGdldHMpKSB7XG4gICAgICBmb3IgKGxldCB3aWRnZXQgb2YgT2JqZWN0LmtleXModGhpcy5qc2YuZm9ybU9wdGlvbnMud2lkZ2V0cykpIHtcbiAgICAgICAgdGhpcy53aWRnZXRMaWJyYXJ5LnJlZ2lzdGVyV2lkZ2V0KHdpZGdldCwgdGhpcy5qc2YuZm9ybU9wdGlvbnMud2lkZ2V0c1t3aWRnZXRdKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGlzT2JqZWN0KHRoaXMuZm9ybSkgJiYgaXNPYmplY3QodGhpcy5mb3JtLnRwbGRhdGEpKSB7XG4gICAgICB0aGlzLmpzZi5zZXRUcGxkYXRhKHRoaXMuZm9ybS50cGxkYXRhKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogJ2luaXRpYWxpemVTY2hlbWEnIGZ1bmN0aW9uXG4gICAqXG4gICAqIEluaXRpYWxpemUgJ3NjaGVtYSdcbiAgICogVXNlIGZpcnN0IGF2YWlsYWJsZSBpbnB1dDpcbiAgICogMS4gc2NoZW1hIC0gcmVjb21tZW5kZWQgLyBBbmd1bGFyIFNjaGVtYSBGb3JtIHN0eWxlXG4gICAqIDIuIGZvcm0uc2NoZW1hIC0gU2luZ2xlIGlucHV0IC8gSlNPTiBGb3JtIHN0eWxlXG4gICAqIDMuIEpTT05TY2hlbWEgLSBSZWFjdCBKU09OIFNjaGVtYSBGb3JtIHN0eWxlXG4gICAqIDQuIGZvcm0uSlNPTlNjaGVtYSAtIEZvciB0ZXN0aW5nIHNpbmdsZSBpbnB1dCBSZWFjdCBKU09OIFNjaGVtYSBGb3Jtc1xuICAgKiA1LiBmb3JtIC0gRm9yIHRlc3Rpbmcgc2luZ2xlIHNjaGVtYS1vbmx5IGlucHV0c1xuICAgKlxuICAgKiAuLi4gaWYgbm8gc2NoZW1hIGlucHV0IGZvdW5kLCB0aGUgJ2FjdGl2YXRlRm9ybScgZnVuY3Rpb24sIGJlbG93LFxuICAgKiAgICAgd2lsbCBtYWtlIHR3byBhZGRpdGlvbmFsIGF0dGVtcHRzIHRvIGJ1aWxkIGEgc2NoZW1hXG4gICAqIDYuIElmIGxheW91dCBpbnB1dCAtIGJ1aWxkIHNjaGVtYSBmcm9tIGxheW91dFxuICAgKiA3LiBJZiBkYXRhIGlucHV0IC0gYnVpbGQgc2NoZW1hIGZyb20gZGF0YVxuICAgKi9cbiAgcHJpdmF0ZSBpbml0aWFsaXplU2NoZW1hKCkge1xuXG4gICAgLy8gVE9ETzogdXBkYXRlIHRvIGFsbG93IG5vbi1vYmplY3Qgc2NoZW1hc1xuXG4gICAgaWYgKGlzT2JqZWN0KHRoaXMuc2NoZW1hKSkge1xuICAgICAgdGhpcy5qc2YuQW5ndWxhclNjaGVtYUZvcm1Db21wYXRpYmlsaXR5ID0gdHJ1ZTtcbiAgICAgIHRoaXMuanNmLnNjaGVtYSA9IF8uY2xvbmVEZWVwKHRoaXMuc2NoZW1hKTtcbiAgICB9IGVsc2UgaWYgKGhhc093bih0aGlzLmZvcm0sICdzY2hlbWEnKSAmJiBpc09iamVjdCh0aGlzLmZvcm0uc2NoZW1hKSkge1xuICAgICAgdGhpcy5qc2Yuc2NoZW1hID0gXy5jbG9uZURlZXAodGhpcy5mb3JtLnNjaGVtYSk7XG4gICAgfSBlbHNlIGlmIChpc09iamVjdCh0aGlzLkpTT05TY2hlbWEpKSB7XG4gICAgICB0aGlzLmpzZi5SZWFjdEpzb25TY2hlbWFGb3JtQ29tcGF0aWJpbGl0eSA9IHRydWU7XG4gICAgICB0aGlzLmpzZi5zY2hlbWEgPSBfLmNsb25lRGVlcCh0aGlzLkpTT05TY2hlbWEpO1xuICAgIH0gZWxzZSBpZiAoaGFzT3duKHRoaXMuZm9ybSwgJ0pTT05TY2hlbWEnKSAmJiBpc09iamVjdCh0aGlzLmZvcm0uSlNPTlNjaGVtYSkpIHtcbiAgICAgIHRoaXMuanNmLlJlYWN0SnNvblNjaGVtYUZvcm1Db21wYXRpYmlsaXR5ID0gdHJ1ZTtcbiAgICAgIHRoaXMuanNmLnNjaGVtYSA9IF8uY2xvbmVEZWVwKHRoaXMuZm9ybS5KU09OU2NoZW1hKTtcbiAgICB9IGVsc2UgaWYgKGhhc093bih0aGlzLmZvcm0sICdwcm9wZXJ0aWVzJykgJiYgaXNPYmplY3QodGhpcy5mb3JtLnByb3BlcnRpZXMpKSB7XG4gICAgICB0aGlzLmpzZi5zY2hlbWEgPSBfLmNsb25lRGVlcCh0aGlzLmZvcm0pO1xuICAgIH0gZWxzZSBpZiAoaXNPYmplY3QodGhpcy5mb3JtKSkge1xuICAgICAgLy8gVE9ETzogSGFuZGxlIG90aGVyIHR5cGVzIG9mIGZvcm0gaW5wdXRcbiAgICB9XG5cbiAgICBpZiAoIWlzRW1wdHkodGhpcy5qc2Yuc2NoZW1hKSkge1xuXG4gICAgICAvLyBJZiBvdGhlciB0eXBlcyBhbHNvIGFsbG93ZWQsIHJlbmRlciBzY2hlbWEgYXMgYW4gb2JqZWN0XG4gICAgICBpZiAoaW5BcnJheSgnb2JqZWN0JywgdGhpcy5qc2Yuc2NoZW1hLnR5cGUpKSB7XG4gICAgICAgIHRoaXMuanNmLnNjaGVtYS50eXBlID0gJ29iamVjdCc7XG4gICAgICB9XG5cbiAgICAgIC8vIFdyYXAgbm9uLW9iamVjdCBzY2hlbWFzIGluIG9iamVjdC5cbiAgICAgIGlmIChoYXNPd24odGhpcy5qc2Yuc2NoZW1hLCAndHlwZScpICYmIHRoaXMuanNmLnNjaGVtYS50eXBlICE9PSAnb2JqZWN0Jykge1xuICAgICAgICB0aGlzLmpzZi5zY2hlbWEgPSB7XG4gICAgICAgICAgJ3R5cGUnOiAnb2JqZWN0JyxcbiAgICAgICAgICAncHJvcGVydGllcyc6IHsgMTogdGhpcy5qc2Yuc2NoZW1hIH1cbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5vYmplY3RXcmFwID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSBpZiAoIWhhc093bih0aGlzLmpzZi5zY2hlbWEsICd0eXBlJykpIHtcblxuICAgICAgICAvLyBBZGQgdHlwZSA9ICdvYmplY3QnIGlmIG1pc3NpbmdcbiAgICAgICAgaWYgKGlzT2JqZWN0KHRoaXMuanNmLnNjaGVtYS5wcm9wZXJ0aWVzKSB8fFxuICAgICAgICAgIGlzT2JqZWN0KHRoaXMuanNmLnNjaGVtYS5wYXR0ZXJuUHJvcGVydGllcykgfHxcbiAgICAgICAgICBpc09iamVjdCh0aGlzLmpzZi5zY2hlbWEuYWRkaXRpb25hbFByb3BlcnRpZXMpXG4gICAgICAgICkge1xuICAgICAgICAgIHRoaXMuanNmLnNjaGVtYS50eXBlID0gJ29iamVjdCc7XG5cbiAgICAgICAgLy8gRml4IEpTT04gc2NoZW1hIHNob3J0aGFuZCAoSlNPTiBGb3JtIHN0eWxlKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuanNmLkpzb25Gb3JtQ29tcGF0aWJpbGl0eSA9IHRydWU7XG4gICAgICAgICAgdGhpcy5qc2Yuc2NoZW1hID0ge1xuICAgICAgICAgICAgJ3R5cGUnOiAnb2JqZWN0JyxcbiAgICAgICAgICAgICdwcm9wZXJ0aWVzJzogdGhpcy5qc2Yuc2NoZW1hXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBJZiBuZWVkZWQsIHVwZGF0ZSBKU09OIFNjaGVtYSB0byBkcmFmdCA2IGZvcm1hdCwgaW5jbHVkaW5nXG4gICAgICAvLyBkcmFmdCAzIChKU09OIEZvcm0gc3R5bGUpIGFuZCBkcmFmdCA0IChBbmd1bGFyIFNjaGVtYSBGb3JtIHN0eWxlKVxuICAgICAgdGhpcy5qc2Yuc2NoZW1hID0gY29udmVydFNjaGVtYVRvRHJhZnQ2KHRoaXMuanNmLnNjaGVtYSk7XG5cbiAgICAgIC8vIEluaXRpYWxpemUgYWp2IGFuZCBjb21waWxlIHNjaGVtYVxuICAgICAgdGhpcy5qc2YuY29tcGlsZUFqdlNjaGVtYSgpO1xuXG4gICAgICAvLyBDcmVhdGUgc2NoZW1hUmVmTGlicmFyeSwgc2NoZW1hUmVjdXJzaXZlUmVmTWFwLCBkYXRhUmVjdXJzaXZlUmVmTWFwLCAmIGFycmF5TWFwXG4gICAgICB0aGlzLmpzZi5zY2hlbWEgPSByZXNvbHZlU2NoZW1hUmVmZXJlbmNlcyhcbiAgICAgICAgdGhpcy5qc2Yuc2NoZW1hLCB0aGlzLmpzZi5zY2hlbWFSZWZMaWJyYXJ5LCB0aGlzLmpzZi5zY2hlbWFSZWN1cnNpdmVSZWZNYXAsXG4gICAgICAgIHRoaXMuanNmLmRhdGFSZWN1cnNpdmVSZWZNYXAsIHRoaXMuanNmLmFycmF5TWFwXG4gICAgICApO1xuICAgICAgaWYgKGhhc093bih0aGlzLmpzZi5zY2hlbWFSZWZMaWJyYXJ5LCAnJykpIHtcbiAgICAgICAgdGhpcy5qc2YuaGFzUm9vdFJlZmVyZW5jZSA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIC8vIFRPRE86ICg/KSBSZXNvbHZlIGV4dGVybmFsICRyZWYgbGlua3NcbiAgICAgIC8vIC8vIENyZWF0ZSBzY2hlbWFSZWZMaWJyYXJ5ICYgc2NoZW1hUmVjdXJzaXZlUmVmTWFwXG4gICAgICAvLyB0aGlzLnBhcnNlci5idW5kbGUodGhpcy5zY2hlbWEpXG4gICAgICAvLyAgIC50aGVuKHNjaGVtYSA9PiB0aGlzLnNjaGVtYSA9IHJlc29sdmVTY2hlbWFSZWZlcmVuY2VzKFxuICAgICAgLy8gICAgIHNjaGVtYSwgdGhpcy5qc2Yuc2NoZW1hUmVmTGlicmFyeSxcbiAgICAgIC8vICAgICB0aGlzLmpzZi5zY2hlbWFSZWN1cnNpdmVSZWZNYXAsIHRoaXMuanNmLmRhdGFSZWN1cnNpdmVSZWZNYXBcbiAgICAgIC8vICAgKSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqICdpbml0aWFsaXplRGF0YScgZnVuY3Rpb25cbiAgICpcbiAgICogSW5pdGlhbGl6ZSAnZm9ybVZhbHVlcydcbiAgICogZGVmdWxhdCBvciBwcmV2aW91c2x5IHN1Ym1pdHRlZCB2YWx1ZXMgdXNlZCB0byBwb3B1bGF0ZSBmb3JtXG4gICAqIFVzZSBmaXJzdCBhdmFpbGFibGUgaW5wdXQ6XG4gICAqIDEuIGRhdGEgLSByZWNvbW1lbmRlZFxuICAgKiAyLiBtb2RlbCAtIEFuZ3VsYXIgU2NoZW1hIEZvcm0gc3R5bGVcbiAgICogMy4gZm9ybS52YWx1ZSAtIEpTT04gRm9ybSBzdHlsZVxuICAgKiA0LiBmb3JtLmRhdGEgLSBTaW5nbGUgaW5wdXQgc3R5bGVcbiAgICogNS4gZm9ybURhdGEgLSBSZWFjdCBKU09OIFNjaGVtYSBGb3JtIHN0eWxlXG4gICAqIDYuIGZvcm0uZm9ybURhdGEgLSBGb3IgZWFzaWVyIHRlc3Rpbmcgb2YgUmVhY3QgSlNPTiBTY2hlbWEgRm9ybXNcbiAgICogNy4gKG5vbmUpIG5vIGRhdGEgLSBpbml0aWFsaXplIGRhdGEgZnJvbSBzY2hlbWEgYW5kIGxheW91dCBkZWZhdWx0cyBvbmx5XG4gICAqL1xuICBwcml2YXRlIGluaXRpYWxpemVEYXRhKCkge1xuICAgIGlmIChoYXNWYWx1ZSh0aGlzLmRhdGEpKSB7XG4gICAgICB0aGlzLmpzZi5mb3JtVmFsdWVzID0gXy5jbG9uZURlZXAodGhpcy5kYXRhKTtcbiAgICAgIHRoaXMuZm9ybVZhbHVlc0lucHV0ID0gJ2RhdGEnO1xuICAgIH0gZWxzZSBpZiAoaGFzVmFsdWUodGhpcy5tb2RlbCkpIHtcbiAgICAgIHRoaXMuanNmLkFuZ3VsYXJTY2hlbWFGb3JtQ29tcGF0aWJpbGl0eSA9IHRydWU7XG4gICAgICB0aGlzLmpzZi5mb3JtVmFsdWVzID0gXy5jbG9uZURlZXAodGhpcy5tb2RlbCk7XG4gICAgICB0aGlzLmZvcm1WYWx1ZXNJbnB1dCA9ICdtb2RlbCc7XG4gICAgfSBlbHNlIGlmIChoYXNWYWx1ZSh0aGlzLm5nTW9kZWwpKSB7XG4gICAgICB0aGlzLmpzZi5Bbmd1bGFyU2NoZW1hRm9ybUNvbXBhdGliaWxpdHkgPSB0cnVlO1xuICAgICAgdGhpcy5qc2YuZm9ybVZhbHVlcyA9IF8uY2xvbmVEZWVwKHRoaXMubmdNb2RlbCk7XG4gICAgICB0aGlzLmZvcm1WYWx1ZXNJbnB1dCA9ICduZ01vZGVsJztcbiAgICB9IGVsc2UgaWYgKGlzT2JqZWN0KHRoaXMuZm9ybSkgJiYgaGFzVmFsdWUodGhpcy5mb3JtLnZhbHVlKSkge1xuICAgICAgdGhpcy5qc2YuSnNvbkZvcm1Db21wYXRpYmlsaXR5ID0gdHJ1ZTtcbiAgICAgIHRoaXMuanNmLmZvcm1WYWx1ZXMgPSBfLmNsb25lRGVlcCh0aGlzLmZvcm0udmFsdWUpO1xuICAgICAgdGhpcy5mb3JtVmFsdWVzSW5wdXQgPSAnZm9ybS52YWx1ZSc7XG4gICAgfSBlbHNlIGlmIChpc09iamVjdCh0aGlzLmZvcm0pICYmIGhhc1ZhbHVlKHRoaXMuZm9ybS5kYXRhKSkge1xuICAgICAgdGhpcy5qc2YuZm9ybVZhbHVlcyA9IF8uY2xvbmVEZWVwKHRoaXMuZm9ybS5kYXRhKTtcbiAgICAgIHRoaXMuZm9ybVZhbHVlc0lucHV0ID0gJ2Zvcm0uZGF0YSc7XG4gICAgfSBlbHNlIGlmIChoYXNWYWx1ZSh0aGlzLmZvcm1EYXRhKSkge1xuICAgICAgdGhpcy5qc2YuUmVhY3RKc29uU2NoZW1hRm9ybUNvbXBhdGliaWxpdHkgPSB0cnVlO1xuICAgICAgdGhpcy5mb3JtVmFsdWVzSW5wdXQgPSAnZm9ybURhdGEnO1xuICAgIH0gZWxzZSBpZiAoaGFzT3duKHRoaXMuZm9ybSwgJ2Zvcm1EYXRhJykgJiYgaGFzVmFsdWUodGhpcy5mb3JtLmZvcm1EYXRhKSkge1xuICAgICAgdGhpcy5qc2YuUmVhY3RKc29uU2NoZW1hRm9ybUNvbXBhdGliaWxpdHkgPSB0cnVlO1xuICAgICAgdGhpcy5qc2YuZm9ybVZhbHVlcyA9IF8uY2xvbmVEZWVwKHRoaXMuZm9ybS5mb3JtRGF0YSk7XG4gICAgICB0aGlzLmZvcm1WYWx1ZXNJbnB1dCA9ICdmb3JtLmZvcm1EYXRhJztcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5mb3JtVmFsdWVzSW5wdXQgPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiAnaW5pdGlhbGl6ZUxheW91dCcgZnVuY3Rpb25cbiAgICpcbiAgICogSW5pdGlhbGl6ZSAnbGF5b3V0J1xuICAgKiBVc2UgZmlyc3QgYXZhaWxhYmxlIGFycmF5IGlucHV0OlxuICAgKiAxLiBsYXlvdXQgLSByZWNvbW1lbmRlZFxuICAgKiAyLiBmb3JtIC0gQW5ndWxhciBTY2hlbWEgRm9ybSBzdHlsZVxuICAgKiAzLiBmb3JtLmZvcm0gLSBKU09OIEZvcm0gc3R5bGVcbiAgICogNC4gZm9ybS5sYXlvdXQgLSBTaW5nbGUgaW5wdXQgc3R5bGVcbiAgICogNS4gKG5vbmUpIG5vIGxheW91dCAtIHNldCBkZWZhdWx0IGxheW91dCBpbnN0ZWFkXG4gICAqICAgIChmdWxsIGxheW91dCB3aWxsIGJlIGJ1aWx0IGxhdGVyIGZyb20gdGhlIHNjaGVtYSlcbiAgICpcbiAgICogQWxzbywgaWYgYWx0ZXJuYXRlIGxheW91dCBmb3JtYXRzIGFyZSBhdmFpbGFibGUsXG4gICAqIGltcG9ydCBmcm9tICdVSVNjaGVtYScgb3IgJ2N1c3RvbUZvcm1JdGVtcydcbiAgICogdXNlZCBmb3IgUmVhY3QgSlNPTiBTY2hlbWEgRm9ybSBhbmQgSlNPTiBGb3JtIEFQSSBjb21wYXRpYmlsaXR5XG4gICAqIFVzZSBmaXJzdCBhdmFpbGFibGUgaW5wdXQ6XG4gICAqIDEuIFVJU2NoZW1hIC0gUmVhY3QgSlNPTiBTY2hlbWEgRm9ybSBzdHlsZVxuICAgKiAyLiBmb3JtLlVJU2NoZW1hIC0gRm9yIHRlc3Rpbmcgc2luZ2xlIGlucHV0IFJlYWN0IEpTT04gU2NoZW1hIEZvcm1zXG4gICAqIDIuIGZvcm0uY3VzdG9tRm9ybUl0ZW1zIC0gSlNPTiBGb3JtIHN0eWxlXG4gICAqIDMuIChub25lKSBubyBpbnB1dCAtIGRvbid0IGltcG9ydFxuICAgKi9cbiAgcHJpdmF0ZSBpbml0aWFsaXplTGF5b3V0KCkge1xuXG4gICAgLy8gUmVuYW1lIEpTT04gRm9ybS1zdHlsZSAnb3B0aW9ucycgbGlzdHMgdG9cbiAgICAvLyBBbmd1bGFyIFNjaGVtYSBGb3JtLXN0eWxlICd0aXRsZU1hcCcgbGlzdHMuXG4gICAgY29uc3QgZml4SnNvbkZvcm1PcHRpb25zID0gKGxheW91dDogYW55KTogYW55ID0+IHtcbiAgICAgIGlmIChpc09iamVjdChsYXlvdXQpIHx8IGlzQXJyYXkobGF5b3V0KSkge1xuICAgICAgICBmb3JFYWNoKGxheW91dCwgKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgICAgICBpZiAoaGFzT3duKHZhbHVlLCAnb3B0aW9ucycpICYmIGlzT2JqZWN0KHZhbHVlLm9wdGlvbnMpKSB7XG4gICAgICAgICAgICB2YWx1ZS50aXRsZU1hcCA9IHZhbHVlLm9wdGlvbnM7XG4gICAgICAgICAgICBkZWxldGUgdmFsdWUub3B0aW9ucztcbiAgICAgICAgICB9XG4gICAgICAgIH0sICd0b3AtZG93bicpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGxheW91dDtcbiAgICB9XG5cbiAgICAvLyBDaGVjayBmb3IgbGF5b3V0IGlucHV0cyBhbmQsIGlmIGZvdW5kLCBpbml0aWFsaXplIGZvcm0gbGF5b3V0XG4gICAgaWYgKGlzQXJyYXkodGhpcy5sYXlvdXQpKSB7XG4gICAgICB0aGlzLmpzZi5sYXlvdXQgPSBfLmNsb25lRGVlcCh0aGlzLmxheW91dCk7XG4gICAgfSBlbHNlIGlmIChpc0FycmF5KHRoaXMuZm9ybSkpIHtcbiAgICAgIHRoaXMuanNmLkFuZ3VsYXJTY2hlbWFGb3JtQ29tcGF0aWJpbGl0eSA9IHRydWU7XG4gICAgICB0aGlzLmpzZi5sYXlvdXQgPSBfLmNsb25lRGVlcCh0aGlzLmZvcm0pO1xuICAgIH0gZWxzZSBpZiAodGhpcy5mb3JtICYmIGlzQXJyYXkodGhpcy5mb3JtLmZvcm0pKSB7XG4gICAgICB0aGlzLmpzZi5Kc29uRm9ybUNvbXBhdGliaWxpdHkgPSB0cnVlO1xuICAgICAgdGhpcy5qc2YubGF5b3V0ID0gZml4SnNvbkZvcm1PcHRpb25zKF8uY2xvbmVEZWVwKHRoaXMuZm9ybS5mb3JtKSk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmZvcm0gJiYgaXNBcnJheSh0aGlzLmZvcm0ubGF5b3V0KSkge1xuICAgICAgdGhpcy5qc2YubGF5b3V0ID0gXy5jbG9uZURlZXAodGhpcy5mb3JtLmxheW91dCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuanNmLmxheW91dCA9IFsnKiddO1xuICAgIH1cblxuICAgIC8vIENoZWNrIGZvciBhbHRlcm5hdGUgbGF5b3V0IGlucHV0c1xuICAgIGxldCBhbHRlcm5hdGVMYXlvdXQ6IGFueSA9IG51bGw7XG4gICAgaWYgKGlzT2JqZWN0KHRoaXMuVUlTY2hlbWEpKSB7XG4gICAgICB0aGlzLmpzZi5SZWFjdEpzb25TY2hlbWFGb3JtQ29tcGF0aWJpbGl0eSA9IHRydWU7XG4gICAgICBhbHRlcm5hdGVMYXlvdXQgPSBfLmNsb25lRGVlcCh0aGlzLlVJU2NoZW1hKTtcbiAgICB9IGVsc2UgaWYgKGhhc093bih0aGlzLmZvcm0sICdVSVNjaGVtYScpKSB7XG4gICAgICB0aGlzLmpzZi5SZWFjdEpzb25TY2hlbWFGb3JtQ29tcGF0aWJpbGl0eSA9IHRydWU7XG4gICAgICBhbHRlcm5hdGVMYXlvdXQgPSBfLmNsb25lRGVlcCh0aGlzLmZvcm0uVUlTY2hlbWEpO1xuICAgIH0gZWxzZSBpZiAoaGFzT3duKHRoaXMuZm9ybSwgJ3VpU2NoZW1hJykpIHtcbiAgICAgIHRoaXMuanNmLlJlYWN0SnNvblNjaGVtYUZvcm1Db21wYXRpYmlsaXR5ID0gdHJ1ZTtcbiAgICAgIGFsdGVybmF0ZUxheW91dCA9IF8uY2xvbmVEZWVwKHRoaXMuZm9ybS51aVNjaGVtYSk7XG4gICAgfSBlbHNlIGlmIChoYXNPd24odGhpcy5mb3JtLCAnY3VzdG9tRm9ybUl0ZW1zJykpIHtcbiAgICAgIHRoaXMuanNmLkpzb25Gb3JtQ29tcGF0aWJpbGl0eSA9IHRydWU7XG4gICAgICBhbHRlcm5hdGVMYXlvdXQgPSBmaXhKc29uRm9ybU9wdGlvbnMoXy5jbG9uZURlZXAodGhpcy5mb3JtLmN1c3RvbUZvcm1JdGVtcykpO1xuICAgIH1cblxuICAgIC8vIGlmIGFsdGVybmF0ZSBsYXlvdXQgZm91bmQsIGNvcHkgYWx0ZXJuYXRlIGxheW91dCBvcHRpb25zIGludG8gc2NoZW1hXG4gICAgaWYgKGFsdGVybmF0ZUxheW91dCkge1xuICAgICAgSnNvblBvaW50ZXIuZm9yRWFjaERlZXAoYWx0ZXJuYXRlTGF5b3V0LCAodmFsdWUsIHBvaW50ZXIpID0+IHtcbiAgICAgICAgY29uc3Qgc2NoZW1hUG9pbnRlciA9IHBvaW50ZXJcbiAgICAgICAgICAucmVwbGFjZSgvXFwvL2csICcvcHJvcGVydGllcy8nKVxuICAgICAgICAgIC5yZXBsYWNlKC9cXC9wcm9wZXJ0aWVzXFwvaXRlbXNcXC9wcm9wZXJ0aWVzXFwvL2csICcvaXRlbXMvcHJvcGVydGllcy8nKVxuICAgICAgICAgIC5yZXBsYWNlKC9cXC9wcm9wZXJ0aWVzXFwvdGl0bGVNYXBcXC9wcm9wZXJ0aWVzXFwvL2csICcvdGl0bGVNYXAvcHJvcGVydGllcy8nKTtcbiAgICAgICAgaWYgKGhhc1ZhbHVlKHZhbHVlKSAmJiBoYXNWYWx1ZShwb2ludGVyKSkge1xuICAgICAgICAgIGxldCBrZXkgPSBKc29uUG9pbnRlci50b0tleShwb2ludGVyKTtcbiAgICAgICAgICBjb25zdCBncm91cFBvaW50ZXIgPSAoSnNvblBvaW50ZXIucGFyc2Uoc2NoZW1hUG9pbnRlcikgfHwgW10pLnNsaWNlKDAsIC0yKTtcbiAgICAgICAgICBsZXQgaXRlbVBvaW50ZXI6IHN0cmluZyB8IHN0cmluZ1tdO1xuXG4gICAgICAgICAgLy8gSWYgJ3VpOm9yZGVyJyBvYmplY3QgZm91bmQsIGNvcHkgaW50byBvYmplY3Qgc2NoZW1hIHJvb3RcbiAgICAgICAgICBpZiAoa2V5LnRvTG93ZXJDYXNlKCkgPT09ICd1aTpvcmRlcicpIHtcbiAgICAgICAgICAgIGl0ZW1Qb2ludGVyID0gWy4uLmdyb3VwUG9pbnRlciwgJ3VpOm9yZGVyJ107XG5cbiAgICAgICAgICAvLyBDb3B5IG90aGVyIGFsdGVybmF0ZSBsYXlvdXQgb3B0aW9ucyB0byBzY2hlbWEgJ3gtc2NoZW1hLWZvcm0nLFxuICAgICAgICAgIC8vIChsaWtlIEFuZ3VsYXIgU2NoZW1hIEZvcm0gb3B0aW9ucykgYW5kIHJlbW92ZSBhbnkgJ3VpOicgcHJlZml4ZXNcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKGtleS5zbGljZSgwLCAzKS50b0xvd2VyQ2FzZSgpID09PSAndWk6JykgeyBrZXkgPSBrZXkuc2xpY2UoMyk7IH1cbiAgICAgICAgICAgIGl0ZW1Qb2ludGVyID0gWy4uLmdyb3VwUG9pbnRlciwgJ3gtc2NoZW1hLWZvcm0nLCBrZXldO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoSnNvblBvaW50ZXIuaGFzKHRoaXMuanNmLnNjaGVtYSwgZ3JvdXBQb2ludGVyKSAmJlxuICAgICAgICAgICAgIUpzb25Qb2ludGVyLmhhcyh0aGlzLmpzZi5zY2hlbWEsIGl0ZW1Qb2ludGVyKVxuICAgICAgICAgICkge1xuICAgICAgICAgICAgSnNvblBvaW50ZXIuc2V0KHRoaXMuanNmLnNjaGVtYSwgaXRlbVBvaW50ZXIsIHZhbHVlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiAnYWN0aXZhdGVGb3JtJyBmdW5jdGlvblxuICAgKlxuICAgKiAuLi5jb250aW51ZWQgZnJvbSAnaW5pdGlhbGl6ZVNjaGVtYScgZnVuY3Rpb24sIGFib3ZlXG4gICAqIElmICdzY2hlbWEnIGhhcyBub3QgYmVlbiBpbml0aWFsaXplZCAoaS5lLiBubyBzY2hlbWEgaW5wdXQgZm91bmQpXG4gICAqIDYuIElmIGxheW91dCBpbnB1dCAtIGJ1aWxkIHNjaGVtYSBmcm9tIGxheW91dCBpbnB1dFxuICAgKiA3LiBJZiBkYXRhIGlucHV0IC0gYnVpbGQgc2NoZW1hIGZyb20gZGF0YSBpbnB1dFxuICAgKlxuICAgKiBDcmVhdGUgZmluYWwgbGF5b3V0LFxuICAgKiBidWlsZCB0aGUgRm9ybUdyb3VwIHRlbXBsYXRlIGFuZCB0aGUgQW5ndWxhciBGb3JtR3JvdXAsXG4gICAqIHN1YnNjcmliZSB0byBjaGFuZ2VzLFxuICAgKiBhbmQgYWN0aXZhdGUgdGhlIGZvcm0uXG4gICAqL1xuICBwcml2YXRlIGFjdGl2YXRlRm9ybSgpIHtcblxuICAgIC8vIElmICdzY2hlbWEnIG5vdCBpbml0aWFsaXplZFxuICAgIGlmIChpc0VtcHR5KHRoaXMuanNmLnNjaGVtYSkpIHtcblxuICAgICAgLy8gVE9ETzogSWYgZnVsbCBsYXlvdXQgaW5wdXQgKHdpdGggbm8gJyonKSwgYnVpbGQgc2NoZW1hIGZyb20gbGF5b3V0XG4gICAgICAvLyBpZiAoIXRoaXMuanNmLmxheW91dC5pbmNsdWRlcygnKicpKSB7XG4gICAgICAvLyAgIHRoaXMuanNmLmJ1aWxkU2NoZW1hRnJvbUxheW91dCgpO1xuICAgICAgLy8gfSBlbHNlXG5cbiAgICAgIC8vIElmIGRhdGEgaW5wdXQsIGJ1aWxkIHNjaGVtYSBmcm9tIGRhdGFcbiAgICAgIGlmICghaXNFbXB0eSh0aGlzLmpzZi5mb3JtVmFsdWVzKSkge1xuICAgICAgICB0aGlzLmpzZi5idWlsZFNjaGVtYUZyb21EYXRhKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCFpc0VtcHR5KHRoaXMuanNmLnNjaGVtYSkpIHtcblxuICAgICAgLy8gSWYgbm90IGFscmVhZHkgaW5pdGlhbGl6ZWQsIGluaXRpYWxpemUgYWp2IGFuZCBjb21waWxlIHNjaGVtYVxuICAgICAgdGhpcy5qc2YuY29tcGlsZUFqdlNjaGVtYSgpO1xuXG4gICAgICAvLyBVcGRhdGUgYWxsIGxheW91dCBlbGVtZW50cywgYWRkIHZhbHVlcywgd2lkZ2V0cywgYW5kIHZhbGlkYXRvcnMsXG4gICAgICAvLyByZXBsYWNlIGFueSAnKicgd2l0aCBhIGxheW91dCBidWlsdCBmcm9tIGFsbCBzY2hlbWEgZWxlbWVudHMsXG4gICAgICAvLyBhbmQgdXBkYXRlIHRoZSBGb3JtR3JvdXAgdGVtcGxhdGUgd2l0aCBhbnkgbmV3IHZhbGlkYXRvcnNcbiAgICAgIHRoaXMuanNmLmJ1aWxkTGF5b3V0KHRoaXMud2lkZ2V0TGlicmFyeSk7XG5cbiAgICAgIC8vIEJ1aWxkIHRoZSBBbmd1bGFyIEZvcm1Hcm91cCB0ZW1wbGF0ZSBmcm9tIHRoZSBzY2hlbWFcbiAgICAgIHRoaXMuanNmLmJ1aWxkRm9ybUdyb3VwVGVtcGxhdGUodGhpcy5qc2YuZm9ybVZhbHVlcyk7XG5cbiAgICAgIC8vIEJ1aWxkIHRoZSByZWFsIEFuZ3VsYXIgRm9ybUdyb3VwIGZyb20gdGhlIEZvcm1Hcm91cCB0ZW1wbGF0ZVxuICAgICAgdGhpcy5qc2YuYnVpbGRGb3JtR3JvdXAoKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5qc2YuZm9ybUdyb3VwKSB7XG5cbiAgICAgIC8vIFJlc2V0IGluaXRpYWwgZm9ybSB2YWx1ZXNcbiAgICAgIGlmICghaXNFbXB0eSh0aGlzLmpzZi5mb3JtVmFsdWVzKSAmJlxuICAgICAgICB0aGlzLmpzZi5mb3JtT3B0aW9ucy5zZXRTY2hlbWFEZWZhdWx0cyAhPT0gdHJ1ZSAmJlxuICAgICAgICB0aGlzLmpzZi5mb3JtT3B0aW9ucy5zZXRMYXlvdXREZWZhdWx0cyAhPT0gdHJ1ZVxuICAgICAgKSB7XG4gICAgICAgIHRoaXMuc2V0Rm9ybVZhbHVlcyh0aGlzLmpzZi5mb3JtVmFsdWVzKTtcbiAgICAgIH1cblxuICAgICAgLy8gVE9ETzogRmlndXJlIG91dCBob3cgdG8gZGlzcGxheSBjYWxjdWxhdGVkIHZhbHVlcyB3aXRob3V0IGNoYW5naW5nIG9iamVjdCBkYXRhXG4gICAgICAvLyBTZWUgaHR0cDovL3VsaW9uLmdpdGh1Yi5pby9qc29uZm9ybS9wbGF5Z3JvdW5kLz9leGFtcGxlPXRlbXBsYXRpbmctdmFsdWVzXG4gICAgICAvLyBDYWxjdWxhdGUgcmVmZXJlbmNlcyB0byBvdGhlciBmaWVsZHNcbiAgICAgIC8vIGlmICghaXNFbXB0eSh0aGlzLmpzZi5mb3JtR3JvdXAudmFsdWUpKSB7XG4gICAgICAvLyAgIGZvckVhY2godGhpcy5qc2YuZm9ybUdyb3VwLnZhbHVlLCAodmFsdWUsIGtleSwgb2JqZWN0LCByb290T2JqZWN0KSA9PiB7XG4gICAgICAvLyAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIC8vICAgICAgIG9iamVjdFtrZXldID0gdGhpcy5qc2YucGFyc2VUZXh0KHZhbHVlLCB2YWx1ZSwgcm9vdE9iamVjdCwga2V5KTtcbiAgICAgIC8vICAgICB9XG4gICAgICAvLyAgIH0sICd0b3AtZG93bicpO1xuICAgICAgLy8gfVxuXG4gICAgICAvLyBTdWJzY3JpYmUgdG8gZm9ybSBjaGFuZ2VzIHRvIG91dHB1dCBsaXZlIGRhdGEsIHZhbGlkYXRpb24sIGFuZCBlcnJvcnNcbiAgICAgIHRoaXMuanNmLmRhdGFDaGFuZ2VzLnN1YnNjcmliZShkYXRhID0+IHtcbiAgICAgICAgdGhpcy5vbkNoYW5nZXMuZW1pdCh0aGlzLm9iamVjdFdyYXAgPyBkYXRhWycxJ10gOiBkYXRhKTtcbiAgICAgICAgaWYgKHRoaXMuZm9ybVZhbHVlc0lucHV0ICYmIHRoaXMuZm9ybVZhbHVlc0lucHV0LmluZGV4T2YoJy4nKSA9PT0gLTEpIHtcbiAgICAgICAgICB0aGlzW2Ake3RoaXMuZm9ybVZhbHVlc0lucHV0fUNoYW5nZWBdLmVtaXQodGhpcy5vYmplY3RXcmFwID8gZGF0YVsnMSddIDogZGF0YSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICAvLyBUcmlnZ2VyIGNoYW5nZSBkZXRlY3Rpb24gb24gc3RhdHVzQ2hhbmdlcyB0byBzaG93IHVwZGF0ZWQgZXJyb3JzXG4gICAgICB0aGlzLmpzZi5mb3JtR3JvdXAuc3RhdHVzQ2hhbmdlcy5zdWJzY3JpYmUoKCkgPT4gdGhpcy5jaGFuZ2VEZXRlY3Rvci5tYXJrRm9yQ2hlY2soKSk7XG4gICAgICB0aGlzLmpzZi5pc1ZhbGlkQ2hhbmdlcy5zdWJzY3JpYmUoaXNWYWxpZCA9PiB0aGlzLmlzVmFsaWQuZW1pdChpc1ZhbGlkKSk7XG4gICAgICB0aGlzLmpzZi52YWxpZGF0aW9uRXJyb3JDaGFuZ2VzLnN1YnNjcmliZShlcnIgPT4gdGhpcy52YWxpZGF0aW9uRXJyb3JzLmVtaXQoZXJyKSk7XG5cbiAgICAgIC8vIE91dHB1dCBmaW5hbCBzY2hlbWEsIGZpbmFsIGxheW91dCwgYW5kIGluaXRpYWwgZGF0YVxuICAgICAgdGhpcy5mb3JtU2NoZW1hLmVtaXQodGhpcy5qc2Yuc2NoZW1hKTtcbiAgICAgIHRoaXMuZm9ybUxheW91dC5lbWl0KHRoaXMuanNmLmxheW91dCk7XG4gICAgICB0aGlzLm9uQ2hhbmdlcy5lbWl0KHRoaXMub2JqZWN0V3JhcCA/IHRoaXMuanNmLmRhdGFbJzEnXSA6IHRoaXMuanNmLmRhdGEpO1xuXG4gICAgICAvLyBJZiB2YWxpZGF0ZU9uUmVuZGVyLCBvdXRwdXQgaW5pdGlhbCB2YWxpZGF0aW9uIGFuZCBhbnkgZXJyb3JzXG4gICAgICBjb25zdCB2YWxpZGF0ZU9uUmVuZGVyID1cbiAgICAgICAgSnNvblBvaW50ZXIuZ2V0KHRoaXMuanNmLCAnL2Zvcm1PcHRpb25zL3ZhbGlkYXRlT25SZW5kZXInKTtcbiAgICAgIGlmICh2YWxpZGF0ZU9uUmVuZGVyKSB7IC8vIHZhbGlkYXRlT25SZW5kZXIgPT09ICdhdXRvJyB8fCB0cnVlXG4gICAgICAgIGNvbnN0IHRvdWNoQWxsID0gKGNvbnRyb2wpID0+IHtcbiAgICAgICAgICBpZiAodmFsaWRhdGVPblJlbmRlciA9PT0gdHJ1ZSB8fCBoYXNWYWx1ZShjb250cm9sLnZhbHVlKSkge1xuICAgICAgICAgICAgY29udHJvbC5tYXJrQXNUb3VjaGVkKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIE9iamVjdC5rZXlzKGNvbnRyb2wuY29udHJvbHMgfHwge30pXG4gICAgICAgICAgICAuZm9yRWFjaChrZXkgPT4gdG91Y2hBbGwoY29udHJvbC5jb250cm9sc1trZXldKSk7XG4gICAgICAgIH07XG4gICAgICAgIHRvdWNoQWxsKHRoaXMuanNmLmZvcm1Hcm91cCk7XG4gICAgICAgIHRoaXMuaXNWYWxpZC5lbWl0KHRoaXMuanNmLmlzVmFsaWQpO1xuICAgICAgICB0aGlzLnZhbGlkYXRpb25FcnJvcnMuZW1pdCh0aGlzLmpzZi5hanZFcnJvcnMpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19