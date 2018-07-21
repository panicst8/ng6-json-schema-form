/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { ChangeDetectorRef, Component, Input } from '@angular/core';
import * as _ from 'lodash';
import { JsonSchemaFormService } from '../../json-schema-form.service';
import { addClasses, inArray } from '../../shared';
/**
 * Bootstrap 4 framework for Angular JSON Schema Form.
 *
 */
var Bootstrap4FrameworkComponent = /** @class */ (function () {
    function Bootstrap4FrameworkComponent(changeDetector, jsf) {
        this.changeDetector = changeDetector;
        this.jsf = jsf;
        this.frameworkInitialized = false;
        this.formControl = null;
        this.debugOutput = '';
        this.debug = '';
        this.parentArray = null;
        this.isOrderable = false;
    }
    Object.defineProperty(Bootstrap4FrameworkComponent.prototype, "showRemoveButton", {
        get: /**
         * @return {?}
         */
        function () {
            if (!this.options.removable || this.options.readonly ||
                this.layoutNode.type === '$ref') {
                return false;
            }
            if (this.layoutNode.recursiveReference) {
                return true;
            }
            if (!this.layoutNode.arrayItem || !this.parentArray) {
                return false;
            }
            // If array length <= minItems, don't allow removing any items
            return this.parentArray.items.length - 1 <= this.parentArray.options.minItems ? false :
                // For removable list items, allow removing any item
                this.layoutNode.arrayItemType === 'list' ? true :
                    // For removable tuple items, only allow removing last item in list
                    this.layoutIndex[this.layoutIndex.length - 1] === this.parentArray.items.length - 2;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    Bootstrap4FrameworkComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.initializeFramework();
        if (this.layoutNode.arrayItem && this.layoutNode.type !== '$ref') {
            this.parentArray = this.jsf.getParentNode(this);
            if (this.parentArray) {
                this.isOrderable = this.layoutNode.arrayItemType === 'list' &&
                    !this.options.readonly && this.parentArray.options.orderable;
            }
        }
    };
    /**
     * @return {?}
     */
    Bootstrap4FrameworkComponent.prototype.ngOnChanges = /**
     * @return {?}
     */
    function () {
        if (!this.frameworkInitialized) {
            this.initializeFramework();
        }
    };
    /**
     * @return {?}
     */
    Bootstrap4FrameworkComponent.prototype.initializeFramework = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.layoutNode) {
            this.options = _.cloneDeep(this.layoutNode.options);
            this.widgetLayoutNode = tslib_1.__assign({}, this.layoutNode, { options: _.cloneDeep(this.layoutNode.options) });
            this.widgetOptions = this.widgetLayoutNode.options;
            this.formControl = this.jsf.getFormControl(this);
            this.options.isInputWidget = inArray(this.layoutNode.type, [
                'button', 'checkbox', 'checkboxes-inline', 'checkboxes', 'color',
                'date', 'datetime-local', 'datetime', 'email', 'file', 'hidden',
                'image', 'integer', 'month', 'number', 'password', 'radio',
                'radiobuttons', 'radios-inline', 'radios', 'range', 'reset', 'search',
                'select', 'submit', 'tel', 'text', 'textarea', 'time', 'url', 'week'
            ]);
            this.options.title = this.setTitle();
            this.options.htmlClass =
                addClasses(this.options.htmlClass, 'schema-form-' + this.layoutNode.type);
            this.options.htmlClass =
                this.layoutNode.type === 'array' ?
                    addClasses(this.options.htmlClass, 'list-group') :
                    this.layoutNode.arrayItem && this.layoutNode.type !== '$ref' ?
                        addClasses(this.options.htmlClass, 'list-group-item') :
                        addClasses(this.options.htmlClass, 'form-group');
            this.widgetOptions.htmlClass = '';
            this.options.labelHtmlClass =
                addClasses(this.options.labelHtmlClass, 'control-label');
            this.widgetOptions.activeClass =
                addClasses(this.widgetOptions.activeClass, 'active');
            this.options.fieldAddonLeft =
                this.options.fieldAddonLeft || this.options.prepend;
            this.options.fieldAddonRight =
                this.options.fieldAddonRight || this.options.append;
            // Add asterisk to titles if required
            if (this.options.title && this.layoutNode.type !== 'tab' &&
                !this.options.notitle && this.options.required &&
                !this.options.title.includes('*')) {
                this.options.title += ' <strong class="text-danger">*</strong>';
            }
            // Set miscelaneous styles and settings for each control type
            switch (this.layoutNode.type) {
                // Checkbox controls
                case 'checkbox':
                case 'checkboxes':
                    this.widgetOptions.htmlClass = addClasses(this.widgetOptions.htmlClass, 'checkbox');
                    break;
                case 'checkboxes-inline':
                    this.widgetOptions.htmlClass = addClasses(this.widgetOptions.htmlClass, 'checkbox');
                    this.widgetOptions.itemLabelHtmlClass = addClasses(this.widgetOptions.itemLabelHtmlClass, 'checkbox-inline');
                    break;
                // Radio controls
                case 'radio':
                case 'radios':
                    this.widgetOptions.htmlClass = addClasses(this.widgetOptions.htmlClass, 'radio');
                    break;
                case 'radios-inline':
                    this.widgetOptions.htmlClass = addClasses(this.widgetOptions.htmlClass, 'radio');
                    this.widgetOptions.itemLabelHtmlClass = addClasses(this.widgetOptions.itemLabelHtmlClass, 'radio-inline');
                    break;
                // Button sets - checkboxbuttons and radiobuttons
                case 'checkboxbuttons':
                case 'radiobuttons':
                    this.widgetOptions.htmlClass = addClasses(this.widgetOptions.htmlClass, 'btn-group');
                    this.widgetOptions.itemLabelHtmlClass = addClasses(this.widgetOptions.itemLabelHtmlClass, 'btn');
                    this.widgetOptions.itemLabelHtmlClass = addClasses(this.widgetOptions.itemLabelHtmlClass, this.options.style || 'btn-default');
                    this.widgetOptions.fieldHtmlClass = addClasses(this.widgetOptions.fieldHtmlClass, 'sr-only');
                    break;
                // Single button controls
                case 'button':
                case 'submit':
                    this.widgetOptions.fieldHtmlClass = addClasses(this.widgetOptions.fieldHtmlClass, 'btn');
                    this.widgetOptions.fieldHtmlClass = addClasses(this.widgetOptions.fieldHtmlClass, this.options.style || 'btn-info');
                    break;
                // Containers - arrays and fieldsets
                case 'array':
                case 'fieldset':
                case 'section':
                case 'conditional':
                case 'advancedfieldset':
                case 'authfieldset':
                case 'selectfieldset':
                case 'optionfieldset':
                    this.options.messageLocation = 'top';
                    break;
                case 'tabarray':
                case 'tabs':
                    this.widgetOptions.htmlClass = addClasses(this.widgetOptions.htmlClass, 'tab-content');
                    this.widgetOptions.fieldHtmlClass = addClasses(this.widgetOptions.fieldHtmlClass, 'tab-pane');
                    this.widgetOptions.labelHtmlClass = addClasses(this.widgetOptions.labelHtmlClass, 'nav nav-tabs');
                    break;
                // 'Add' buttons - references
                case '$ref':
                    this.widgetOptions.fieldHtmlClass = addClasses(this.widgetOptions.fieldHtmlClass, 'btn pull-right');
                    this.widgetOptions.fieldHtmlClass = addClasses(this.widgetOptions.fieldHtmlClass, this.options.style || 'btn-default');
                    this.options.icon = 'glyphicon glyphicon-plus';
                    break;
                // Default - including regular inputs
                default:
                    this.widgetOptions.fieldHtmlClass = addClasses(this.widgetOptions.fieldHtmlClass, 'form-control');
            }
            if (this.formControl) {
                this.updateHelpBlock(this.formControl.status);
                this.formControl.statusChanges.subscribe(function (status) { return _this.updateHelpBlock(status); });
                if (this.options.debug) {
                    /** @type {?} */
                    var vars = [];
                    this.debugOutput = _.map(vars, function (thisVar) { return JSON.stringify(thisVar, null, 2); }).join('\n');
                }
            }
            this.frameworkInitialized = true;
        }
    };
    /**
     * @param {?} status
     * @return {?}
     */
    Bootstrap4FrameworkComponent.prototype.updateHelpBlock = /**
     * @param {?} status
     * @return {?}
     */
    function (status) {
        this.options.helpBlock = status === 'INVALID' &&
            this.options.enableErrorState && this.formControl.errors &&
            (this.formControl.dirty || this.options.feedbackOnRender) ?
            this.jsf.formatErrors(this.formControl.errors, this.options.validationMessages) :
            this.options.description || this.options.help || null;
    };
    /**
     * @return {?}
     */
    Bootstrap4FrameworkComponent.prototype.setTitle = /**
     * @return {?}
     */
    function () {
        switch (this.layoutNode.type) {
            case 'button':
            case 'checkbox':
            case 'section':
            case 'help':
            case 'msg':
            case 'submit':
            case 'message':
            case 'tabarray':
            case 'tabs':
            case '$ref':
                return null;
            case 'advancedfieldset':
                this.widgetOptions.expandable = true;
                this.widgetOptions.title = 'Advanced options';
                return null;
            case 'authfieldset':
                this.widgetOptions.expandable = true;
                this.widgetOptions.title = 'Authentication settings';
                return null;
            case 'fieldset':
                this.widgetOptions.title = this.options.title;
                return null;
            default:
                this.widgetOptions.title = null;
                return this.jsf.setItemTitle(this);
        }
    };
    /**
     * @return {?}
     */
    Bootstrap4FrameworkComponent.prototype.removeItem = /**
     * @return {?}
     */
    function () {
        this.jsf.removeItem(this);
    };
    Bootstrap4FrameworkComponent.decorators = [
        { type: Component, args: [{
                    selector: 'bootstrap-4-framework',
                    template: "\n    <div\n      [class]=\"options?.htmlClass || ''\"\n      [class.has-feedback]=\"options?.feedback && options?.isInputWidget &&\n        (formControl?.dirty || options?.feedbackOnRender)\"\n      [class.has-error]=\"options?.enableErrorState && formControl?.errors &&\n        (formControl?.dirty || options?.feedbackOnRender)\"\n      [class.has-success]=\"options?.enableSuccessState && !formControl?.errors &&\n        (formControl?.dirty || options?.feedbackOnRender)\">\n\n      <button *ngIf=\"showRemoveButton\"\n        class=\"close pull-right\"\n        type=\"button\"\n        (click)=\"removeItem()\">\n        <span aria-hidden=\"true\">&times;</span>\n        <span class=\"sr-only\">Close</span>\n      </button>\n      <div *ngIf=\"options?.messageLocation === 'top'\">\n        <p *ngIf=\"options?.helpBlock\"\n          class=\"help-block\"\n          [innerHTML]=\"options?.helpBlock\"></p>\n      </div>\n\n      <label *ngIf=\"options?.title && layoutNode?.type !== 'tab'\"\n        [attr.for]=\"'control' + layoutNode?._id\"\n        [class]=\"options?.labelHtmlClass || ''\"\n        [class.sr-only]=\"options?.notitle\"\n        [innerHTML]=\"options?.title\"></label>\n      <p *ngIf=\"layoutNode?.type === 'submit' && jsf?.formOptions?.fieldsRequired\">\n        <strong class=\"text-danger\">*</strong> = required fields\n      </p>\n      <div [class.input-group]=\"options?.fieldAddonLeft || options?.fieldAddonRight\">\n        <span *ngIf=\"options?.fieldAddonLeft\"\n          class=\"input-group-addon\"\n          [innerHTML]=\"options?.fieldAddonLeft\"></span>\n\n        <select-widget-widget\n          [layoutNode]=\"widgetLayoutNode\"\n          [dataIndex]=\"dataIndex\"\n          [layoutIndex]=\"layoutIndex\"></select-widget-widget>\n\n        <span *ngIf=\"options?.fieldAddonRight\"\n          class=\"input-group-addon\"\n          [innerHTML]=\"options?.fieldAddonRight\"></span>\n      </div>\n\n      <span *ngIf=\"options?.feedback && options?.isInputWidget &&\n          !options?.fieldAddonRight && !layoutNode.arrayItem &&\n          (formControl?.dirty || options?.feedbackOnRender)\"\n        [class.glyphicon-ok]=\"options?.enableSuccessState && !formControl?.errors\"\n        [class.glyphicon-remove]=\"options?.enableErrorState && formControl?.errors\"\n        aria-hidden=\"true\"\n        class=\"form-control-feedback glyphicon\"></span>\n      <div *ngIf=\"options?.messageLocation !== 'top'\">\n        <p *ngIf=\"options?.helpBlock\"\n          class=\"help-block\"\n          [innerHTML]=\"options?.helpBlock\"></p>\n      </div>\n    </div>\n\n    <div *ngIf=\"debug && debugOutput\">debug: <pre>{{debugOutput}}</pre></div>\n  ",
                    styles: ["\n    :host /deep/ .list-group-item .form-control-feedback { top: 40px; }\n    :host /deep/ .checkbox,\n    :host /deep/ .radio { margin-top: 0; margin-bottom: 0; }\n    :host /deep/ .checkbox-inline,\n    :host /deep/ .checkbox-inline + .checkbox-inline,\n    :host /deep/ .checkbox-inline + .radio-inline,\n    :host /deep/ .radio-inline,\n    :host /deep/ .radio-inline + .radio-inline,\n    :host /deep/ .radio-inline + .checkbox-inline { margin-left: 0; margin-right: 10px; }\n    :host /deep/ .checkbox-inline:last-child,\n    :host /deep/ .radio-inline:last-child { margin-right: 0; }\n    :host /deep/ .ng-invalid.ng-touched { border: 1px solid #f44336; }\n  "],
                },] },
    ];
    /** @nocollapse */
    Bootstrap4FrameworkComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: JsonSchemaFormService }
    ]; };
    Bootstrap4FrameworkComponent.propDecorators = {
        layoutNode: [{ type: Input }],
        layoutIndex: [{ type: Input }],
        dataIndex: [{ type: Input }]
    };
    return Bootstrap4FrameworkComponent;
}());
export { Bootstrap4FrameworkComponent };
if (false) {
    /** @type {?} */
    Bootstrap4FrameworkComponent.prototype.frameworkInitialized;
    /** @type {?} */
    Bootstrap4FrameworkComponent.prototype.widgetOptions;
    /** @type {?} */
    Bootstrap4FrameworkComponent.prototype.widgetLayoutNode;
    /** @type {?} */
    Bootstrap4FrameworkComponent.prototype.options;
    /** @type {?} */
    Bootstrap4FrameworkComponent.prototype.formControl;
    /** @type {?} */
    Bootstrap4FrameworkComponent.prototype.debugOutput;
    /** @type {?} */
    Bootstrap4FrameworkComponent.prototype.debug;
    /** @type {?} */
    Bootstrap4FrameworkComponent.prototype.parentArray;
    /** @type {?} */
    Bootstrap4FrameworkComponent.prototype.isOrderable;
    /** @type {?} */
    Bootstrap4FrameworkComponent.prototype.layoutNode;
    /** @type {?} */
    Bootstrap4FrameworkComponent.prototype.layoutIndex;
    /** @type {?} */
    Bootstrap4FrameworkComponent.prototype.dataIndex;
    /** @type {?} */
    Bootstrap4FrameworkComponent.prototype.changeDetector;
    /** @type {?} */
    Bootstrap4FrameworkComponent.prototype.jsf;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9vdHN0cmFwLTQtZnJhbWV3b3JrLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nNi1qc29uLXNjaGVtYS1mb3JtLyIsInNvdXJjZXMiOlsibGliL2ZyYW1ld29yay1saWJyYXJ5L2Jvb3RzdHJhcC00LWZyYW1ld29yay9ib290c3RyYXAtNC1mcmFtZXdvcmsuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQXFCLE1BQU0sZUFBZSxDQUFDO0FBRXZGLE9BQU8sS0FBSyxDQUFDLE1BQU0sUUFBUSxDQUFDO0FBRTVCLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3ZFLE9BQU8sRUFDTCxVQUFVLEVBQVUsT0FBTyxFQUM1QixNQUFNLGNBQWMsQ0FBQzs7Ozs7O0lBbUdwQixzQ0FDUyxnQkFDQTtRQURBLG1CQUFjLEdBQWQsY0FBYztRQUNkLFFBQUcsR0FBSCxHQUFHO29DQWZXLEtBQUs7MkJBSVQsSUFBSTsyQkFDSixFQUFFO3FCQUNSLEVBQUU7MkJBQ0ksSUFBSTsyQkFDVCxLQUFLO0tBUWQ7SUFFTCxzQkFBSSwwREFBZ0I7Ozs7UUFBcEI7WUFDRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUTtnQkFDbEQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEtBQUssTUFDM0IsQ0FBQyxDQUFDLENBQUM7Z0JBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQzthQUFFO1lBQ25CLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDO2dCQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7YUFBRTtZQUN4RCxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxJQUFJLENB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T0FBTyxDQUFDLEtBQUssQ0FBQztnQkFDOUMsTUFBTSxDQUFDLElBQUksQ0FBQztZQUNkO2dCQUNFLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztnQkFDaEMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3RDO0tBQ0Y7Ozs7SUFFRCxpREFBVTs7O0lBQVY7UUFDRSxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUMzQjs7Z0JBaFNGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsdUJBQXVCO29CQUNqQyxRQUFRLEVBQUUsOG9GQTZEVDtvQkFDRCxNQUFNLEVBQUUsQ0FBQyw2cEJBYVIsQ0FBQztpQkFDSDs7OztnQkEzRlEsaUJBQWlCO2dCQUlqQixxQkFBcUI7Ozs2QkFrRzNCLEtBQUs7OEJBQ0wsS0FBSzs0QkFDTCxLQUFLOzt1Q0F4R1I7O1NBNEZhLDRCQUE0QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdG9yUmVmLCBDb21wb25lbnQsIElucHV0LCBPbkNoYW5nZXMsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG5cbmltcG9ydCB7IEpzb25TY2hlbWFGb3JtU2VydmljZSB9IGZyb20gJy4uLy4uL2pzb24tc2NoZW1hLWZvcm0uc2VydmljZSc7XG5pbXBvcnQge1xuICBhZGRDbGFzc2VzLCBoYXNPd24sIGluQXJyYXksIGlzQXJyYXksIEpzb25Qb2ludGVyLCB0b1RpdGxlQ2FzZVxufSBmcm9tICcuLi8uLi9zaGFyZWQnO1xuXG4vKipcbiAqIEJvb3RzdHJhcCA0IGZyYW1ld29yayBmb3IgQW5ndWxhciBKU09OIFNjaGVtYSBGb3JtLlxuICpcbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYm9vdHN0cmFwLTQtZnJhbWV3b3JrJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2XG4gICAgICBbY2xhc3NdPVwib3B0aW9ucz8uaHRtbENsYXNzIHx8ICcnXCJcbiAgICAgIFtjbGFzcy5oYXMtZmVlZGJhY2tdPVwib3B0aW9ucz8uZmVlZGJhY2sgJiYgb3B0aW9ucz8uaXNJbnB1dFdpZGdldCAmJlxuICAgICAgICAoZm9ybUNvbnRyb2w/LmRpcnR5IHx8IG9wdGlvbnM/LmZlZWRiYWNrT25SZW5kZXIpXCJcbiAgICAgIFtjbGFzcy5oYXMtZXJyb3JdPVwib3B0aW9ucz8uZW5hYmxlRXJyb3JTdGF0ZSAmJiBmb3JtQ29udHJvbD8uZXJyb3JzICYmXG4gICAgICAgIChmb3JtQ29udHJvbD8uZGlydHkgfHwgb3B0aW9ucz8uZmVlZGJhY2tPblJlbmRlcilcIlxuICAgICAgW2NsYXNzLmhhcy1zdWNjZXNzXT1cIm9wdGlvbnM/LmVuYWJsZVN1Y2Nlc3NTdGF0ZSAmJiAhZm9ybUNvbnRyb2w/LmVycm9ycyAmJlxuICAgICAgICAoZm9ybUNvbnRyb2w/LmRpcnR5IHx8IG9wdGlvbnM/LmZlZWRiYWNrT25SZW5kZXIpXCI+XG5cbiAgICAgIDxidXR0b24gKm5nSWY9XCJzaG93UmVtb3ZlQnV0dG9uXCJcbiAgICAgICAgY2xhc3M9XCJjbG9zZSBwdWxsLXJpZ2h0XCJcbiAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgIChjbGljayk9XCJyZW1vdmVJdGVtKClcIj5cbiAgICAgICAgPHNwYW4gYXJpYS1oaWRkZW49XCJ0cnVlXCI+JnRpbWVzOzwvc3Bhbj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJzci1vbmx5XCI+Q2xvc2U8L3NwYW4+XG4gICAgICA8L2J1dHRvbj5cbiAgICAgIDxkaXYgKm5nSWY9XCJvcHRpb25zPy5tZXNzYWdlTG9jYXRpb24gPT09ICd0b3AnXCI+XG4gICAgICAgIDxwICpuZ0lmPVwib3B0aW9ucz8uaGVscEJsb2NrXCJcbiAgICAgICAgICBjbGFzcz1cImhlbHAtYmxvY2tcIlxuICAgICAgICAgIFtpbm5lckhUTUxdPVwib3B0aW9ucz8uaGVscEJsb2NrXCI+PC9wPlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxsYWJlbCAqbmdJZj1cIm9wdGlvbnM/LnRpdGxlICYmIGxheW91dE5vZGU/LnR5cGUgIT09ICd0YWInXCJcbiAgICAgICAgW2F0dHIuZm9yXT1cIidjb250cm9sJyArIGxheW91dE5vZGU/Ll9pZFwiXG4gICAgICAgIFtjbGFzc109XCJvcHRpb25zPy5sYWJlbEh0bWxDbGFzcyB8fCAnJ1wiXG4gICAgICAgIFtjbGFzcy5zci1vbmx5XT1cIm9wdGlvbnM/Lm5vdGl0bGVcIlxuICAgICAgICBbaW5uZXJIVE1MXT1cIm9wdGlvbnM/LnRpdGxlXCI+PC9sYWJlbD5cbiAgICAgIDxwICpuZ0lmPVwibGF5b3V0Tm9kZT8udHlwZSA9PT0gJ3N1Ym1pdCcgJiYganNmPy5mb3JtT3B0aW9ucz8uZmllbGRzUmVxdWlyZWRcIj5cbiAgICAgICAgPHN0cm9uZyBjbGFzcz1cInRleHQtZGFuZ2VyXCI+Kjwvc3Ryb25nPiA9IHJlcXVpcmVkIGZpZWxkc1xuICAgICAgPC9wPlxuICAgICAgPGRpdiBbY2xhc3MuaW5wdXQtZ3JvdXBdPVwib3B0aW9ucz8uZmllbGRBZGRvbkxlZnQgfHwgb3B0aW9ucz8uZmllbGRBZGRvblJpZ2h0XCI+XG4gICAgICAgIDxzcGFuICpuZ0lmPVwib3B0aW9ucz8uZmllbGRBZGRvbkxlZnRcIlxuICAgICAgICAgIGNsYXNzPVwiaW5wdXQtZ3JvdXAtYWRkb25cIlxuICAgICAgICAgIFtpbm5lckhUTUxdPVwib3B0aW9ucz8uZmllbGRBZGRvbkxlZnRcIj48L3NwYW4+XG5cbiAgICAgICAgPHNlbGVjdC13aWRnZXQtd2lkZ2V0XG4gICAgICAgICAgW2xheW91dE5vZGVdPVwid2lkZ2V0TGF5b3V0Tm9kZVwiXG4gICAgICAgICAgW2RhdGFJbmRleF09XCJkYXRhSW5kZXhcIlxuICAgICAgICAgIFtsYXlvdXRJbmRleF09XCJsYXlvdXRJbmRleFwiPjwvc2VsZWN0LXdpZGdldC13aWRnZXQ+XG5cbiAgICAgICAgPHNwYW4gKm5nSWY9XCJvcHRpb25zPy5maWVsZEFkZG9uUmlnaHRcIlxuICAgICAgICAgIGNsYXNzPVwiaW5wdXQtZ3JvdXAtYWRkb25cIlxuICAgICAgICAgIFtpbm5lckhUTUxdPVwib3B0aW9ucz8uZmllbGRBZGRvblJpZ2h0XCI+PC9zcGFuPlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxzcGFuICpuZ0lmPVwib3B0aW9ucz8uZmVlZGJhY2sgJiYgb3B0aW9ucz8uaXNJbnB1dFdpZGdldCAmJlxuICAgICAgICAgICFvcHRpb25zPy5maWVsZEFkZG9uUmlnaHQgJiYgIWxheW91dE5vZGUuYXJyYXlJdGVtICYmXG4gICAgICAgICAgKGZvcm1Db250cm9sPy5kaXJ0eSB8fCBvcHRpb25zPy5mZWVkYmFja09uUmVuZGVyKVwiXG4gICAgICAgIFtjbGFzcy5nbHlwaGljb24tb2tdPVwib3B0aW9ucz8uZW5hYmxlU3VjY2Vzc1N0YXRlICYmICFmb3JtQ29udHJvbD8uZXJyb3JzXCJcbiAgICAgICAgW2NsYXNzLmdseXBoaWNvbi1yZW1vdmVdPVwib3B0aW9ucz8uZW5hYmxlRXJyb3JTdGF0ZSAmJiBmb3JtQ29udHJvbD8uZXJyb3JzXCJcbiAgICAgICAgYXJpYS1oaWRkZW49XCJ0cnVlXCJcbiAgICAgICAgY2xhc3M9XCJmb3JtLWNvbnRyb2wtZmVlZGJhY2sgZ2x5cGhpY29uXCI+PC9zcGFuPlxuICAgICAgPGRpdiAqbmdJZj1cIm9wdGlvbnM/Lm1lc3NhZ2VMb2NhdGlvbiAhPT0gJ3RvcCdcIj5cbiAgICAgICAgPHAgKm5nSWY9XCJvcHRpb25zPy5oZWxwQmxvY2tcIlxuICAgICAgICAgIGNsYXNzPVwiaGVscC1ibG9ja1wiXG4gICAgICAgICAgW2lubmVySFRNTF09XCJvcHRpb25zPy5oZWxwQmxvY2tcIj48L3A+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cblxuICAgIDxkaXYgKm5nSWY9XCJkZWJ1ZyAmJiBkZWJ1Z091dHB1dFwiPmRlYnVnOiA8cHJlPnt7ZGVidWdPdXRwdXR9fTwvcHJlPjwvZGl2PlxuICBgLFxuICBzdHlsZXM6IFtgXG4gICAgOmhvc3QgL2RlZXAvIC5saXN0LWdyb3VwLWl0ZW0gLmZvcm0tY29udHJvbC1mZWVkYmFjayB7IHRvcDogNDBweDsgfVxuICAgIDpob3N0IC9kZWVwLyAuY2hlY2tib3gsXG4gICAgOmhvc3QgL2RlZXAvIC5yYWRpbyB7IG1hcmdpbi10b3A6IDA7IG1hcmdpbi1ib3R0b206IDA7IH1cbiAgICA6aG9zdCAvZGVlcC8gLmNoZWNrYm94LWlubGluZSxcbiAgICA6aG9zdCAvZGVlcC8gLmNoZWNrYm94LWlubGluZSArIC5jaGVja2JveC1pbmxpbmUsXG4gICAgOmhvc3QgL2RlZXAvIC5jaGVja2JveC1pbmxpbmUgKyAucmFkaW8taW5saW5lLFxuICAgIDpob3N0IC9kZWVwLyAucmFkaW8taW5saW5lLFxuICAgIDpob3N0IC9kZWVwLyAucmFkaW8taW5saW5lICsgLnJhZGlvLWlubGluZSxcbiAgICA6aG9zdCAvZGVlcC8gLnJhZGlvLWlubGluZSArIC5jaGVja2JveC1pbmxpbmUgeyBtYXJnaW4tbGVmdDogMDsgbWFyZ2luLXJpZ2h0OiAxMHB4OyB9XG4gICAgOmhvc3QgL2RlZXAvIC5jaGVja2JveC1pbmxpbmU6bGFzdC1jaGlsZCxcbiAgICA6aG9zdCAvZGVlcC8gLnJhZGlvLWlubGluZTpsYXN0LWNoaWxkIHsgbWFyZ2luLXJpZ2h0OiAwOyB9XG4gICAgOmhvc3QgL2RlZXAvIC5uZy1pbnZhbGlkLm5nLXRvdWNoZWQgeyBib3JkZXI6IDFweCBzb2xpZCAjZjQ0MzM2OyB9XG4gIGBdLFxufSlcbmV4cG9ydCBjbGFzcyBCb290c3RyYXA0RnJhbWV3b3JrQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xuICBmcmFtZXdvcmtJbml0aWFsaXplZCA9IGZhbHNlO1xuICB3aWRnZXRPcHRpb25zOiBhbnk7IC8vIE9wdGlvbnMgcGFzc2VkIHRvIGNoaWxkIHdpZGdldFxuICB3aWRnZXRMYXlvdXROb2RlOiBhbnk7IC8vIGxheW91dE5vZGUgcGFzc2VkIHRvIGNoaWxkIHdpZGdldFxuICBvcHRpb25zOiBhbnk7IC8vIE9wdGlvbnMgdXNlZCBpbiB0aGlzIGZyYW1ld29ya1xuICBmb3JtQ29udHJvbDogYW55ID0gbnVsbDtcbiAgZGVidWdPdXRwdXQ6IGFueSA9ICcnO1xuICBkZWJ1ZzogYW55ID0gJyc7XG4gIHBhcmVudEFycmF5OiBhbnkgPSBudWxsO1xuICBpc09yZGVyYWJsZSA9IGZhbHNlO1xuICBASW5wdXQoKSBsYXlvdXROb2RlOiBhbnk7XG4gIEBJbnB1dCgpIGxheW91dEluZGV4OiBudW1iZXJbXTtcbiAgQElucHV0KCkgZGF0YUluZGV4OiBudW1iZXJbXTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgY2hhbmdlRGV0ZWN0b3I6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIHB1YmxpYyBqc2Y6IEpzb25TY2hlbWFGb3JtU2VydmljZVxuICApIHsgfVxuXG4gIGdldCBzaG93UmVtb3ZlQnV0dG9uKCk6IGJvb2xlYW4ge1xuICAgIGlmICghdGhpcy5vcHRpb25zLnJlbW92YWJsZSB8fCB0aGlzLm9wdGlvbnMucmVhZG9ubHkgfHxcbiAgICAgIHRoaXMubGF5b3V0Tm9kZS50eXBlID09PSAnJHJlZidcbiAgICApIHsgcmV0dXJuIGZhbHNlOyB9XG4gICAgaWYgKHRoaXMubGF5b3V0Tm9kZS5yZWN1cnNpdmVSZWZlcmVuY2UpIHsgcmV0dXJuIHRydWU7IH1cbiAgICBpZiAoIXRoaXMubGF5b3V0Tm9kZS5hcnJheUl0ZW0gfHwgIXRoaXMucGFyZW50QXJyYXkpIHsgcmV0dXJuIGZhbHNlOyB9XG4gICAgLy8gSWYgYXJyYXkgbGVuZ3RoIDw9IG1pbkl0ZW1zLCBkb24ndCBhbGxvdyByZW1vdmluZyBhbnkgaXRlbXNcbiAgICByZXR1cm4gdGhpcy5wYXJlbnRBcnJheS5pdGVtcy5sZW5ndGggLSAxIDw9IHRoaXMucGFyZW50QXJyYXkub3B0aW9ucy5taW5JdGVtcyA/IGZhbHNlIDpcbiAgICAgIC8vIEZvciByZW1vdmFibGUgbGlzdCBpdGVtcywgYWxsb3cgcmVtb3ZpbmcgYW55IGl0ZW1cbiAgICAgIHRoaXMubGF5b3V0Tm9kZS5hcnJheUl0ZW1UeXBlID09PSAnbGlzdCcgPyB0cnVlIDpcbiAgICAgICAgLy8gRm9yIHJlbW92YWJsZSB0dXBsZSBpdGVtcywgb25seSBhbGxvdyByZW1vdmluZyBsYXN0IGl0ZW0gaW4gbGlzdFxuICAgICAgICB0aGlzLmxheW91dEluZGV4W3RoaXMubGF5b3V0SW5kZXgubGVuZ3RoIC0gMV0gPT09IHRoaXMucGFyZW50QXJyYXkuaXRlbXMubGVuZ3RoIC0gMjtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuaW5pdGlhbGl6ZUZyYW1ld29yaygpO1xuICAgIGlmICh0aGlzLmxheW91dE5vZGUuYXJyYXlJdGVtICYmIHRoaXMubGF5b3V0Tm9kZS50eXBlICE9PSAnJHJlZicpIHtcbiAgICAgIHRoaXMucGFyZW50QXJyYXkgPSB0aGlzLmpzZi5nZXRQYXJlbnROb2RlKHRoaXMpO1xuICAgICAgaWYgKHRoaXMucGFyZW50QXJyYXkpIHtcbiAgICAgICAgdGhpcy5pc09yZGVyYWJsZSA9IHRoaXMubGF5b3V0Tm9kZS5hcnJheUl0ZW1UeXBlID09PSAnbGlzdCcgJiZcbiAgICAgICAgICAhdGhpcy5vcHRpb25zLnJlYWRvbmx5ICYmIHRoaXMucGFyZW50QXJyYXkub3B0aW9ucy5vcmRlcmFibGU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbmdPbkNoYW5nZXMoKSB7XG4gICAgaWYgKCF0aGlzLmZyYW1ld29ya0luaXRpYWxpemVkKSB7IHRoaXMuaW5pdGlhbGl6ZUZyYW1ld29yaygpOyB9XG4gIH1cblxuICBpbml0aWFsaXplRnJhbWV3b3JrKCkge1xuICAgIGlmICh0aGlzLmxheW91dE5vZGUpIHtcbiAgICAgIHRoaXMub3B0aW9ucyA9IF8uY2xvbmVEZWVwKHRoaXMubGF5b3V0Tm9kZS5vcHRpb25zKTtcbiAgICAgIHRoaXMud2lkZ2V0TGF5b3V0Tm9kZSA9IHtcbiAgICAgICAgLi4udGhpcy5sYXlvdXROb2RlLFxuICAgICAgICBvcHRpb25zOiBfLmNsb25lRGVlcCh0aGlzLmxheW91dE5vZGUub3B0aW9ucylcbiAgICAgIH07XG4gICAgICB0aGlzLndpZGdldE9wdGlvbnMgPSB0aGlzLndpZGdldExheW91dE5vZGUub3B0aW9ucztcbiAgICAgIHRoaXMuZm9ybUNvbnRyb2wgPSB0aGlzLmpzZi5nZXRGb3JtQ29udHJvbCh0aGlzKTtcblxuICAgICAgdGhpcy5vcHRpb25zLmlzSW5wdXRXaWRnZXQgPSBpbkFycmF5KHRoaXMubGF5b3V0Tm9kZS50eXBlLCBbXG4gICAgICAgICdidXR0b24nLCAnY2hlY2tib3gnLCAnY2hlY2tib3hlcy1pbmxpbmUnLCAnY2hlY2tib3hlcycsICdjb2xvcicsXG4gICAgICAgICdkYXRlJywgJ2RhdGV0aW1lLWxvY2FsJywgJ2RhdGV0aW1lJywgJ2VtYWlsJywgJ2ZpbGUnLCAnaGlkZGVuJyxcbiAgICAgICAgJ2ltYWdlJywgJ2ludGVnZXInLCAnbW9udGgnLCAnbnVtYmVyJywgJ3Bhc3N3b3JkJywgJ3JhZGlvJyxcbiAgICAgICAgJ3JhZGlvYnV0dG9ucycsICdyYWRpb3MtaW5saW5lJywgJ3JhZGlvcycsICdyYW5nZScsICdyZXNldCcsICdzZWFyY2gnLFxuICAgICAgICAnc2VsZWN0JywgJ3N1Ym1pdCcsICd0ZWwnLCAndGV4dCcsICd0ZXh0YXJlYScsICd0aW1lJywgJ3VybCcsICd3ZWVrJ1xuICAgICAgXSk7XG5cbiAgICAgIHRoaXMub3B0aW9ucy50aXRsZSA9IHRoaXMuc2V0VGl0bGUoKTtcblxuICAgICAgdGhpcy5vcHRpb25zLmh0bWxDbGFzcyA9XG4gICAgICAgIGFkZENsYXNzZXModGhpcy5vcHRpb25zLmh0bWxDbGFzcywgJ3NjaGVtYS1mb3JtLScgKyB0aGlzLmxheW91dE5vZGUudHlwZSk7XG4gICAgICB0aGlzLm9wdGlvbnMuaHRtbENsYXNzID1cbiAgICAgICAgdGhpcy5sYXlvdXROb2RlLnR5cGUgPT09ICdhcnJheScgP1xuICAgICAgICAgIGFkZENsYXNzZXModGhpcy5vcHRpb25zLmh0bWxDbGFzcywgJ2xpc3QtZ3JvdXAnKSA6XG4gICAgICAgICAgdGhpcy5sYXlvdXROb2RlLmFycmF5SXRlbSAmJiB0aGlzLmxheW91dE5vZGUudHlwZSAhPT0gJyRyZWYnID9cbiAgICAgICAgICAgIGFkZENsYXNzZXModGhpcy5vcHRpb25zLmh0bWxDbGFzcywgJ2xpc3QtZ3JvdXAtaXRlbScpIDpcbiAgICAgICAgICAgIGFkZENsYXNzZXModGhpcy5vcHRpb25zLmh0bWxDbGFzcywgJ2Zvcm0tZ3JvdXAnKTtcbiAgICAgIHRoaXMud2lkZ2V0T3B0aW9ucy5odG1sQ2xhc3MgPSAnJztcbiAgICAgIHRoaXMub3B0aW9ucy5sYWJlbEh0bWxDbGFzcyA9XG4gICAgICAgIGFkZENsYXNzZXModGhpcy5vcHRpb25zLmxhYmVsSHRtbENsYXNzLCAnY29udHJvbC1sYWJlbCcpO1xuICAgICAgdGhpcy53aWRnZXRPcHRpb25zLmFjdGl2ZUNsYXNzID1cbiAgICAgICAgYWRkQ2xhc3Nlcyh0aGlzLndpZGdldE9wdGlvbnMuYWN0aXZlQ2xhc3MsICdhY3RpdmUnKTtcbiAgICAgIHRoaXMub3B0aW9ucy5maWVsZEFkZG9uTGVmdCA9XG4gICAgICAgIHRoaXMub3B0aW9ucy5maWVsZEFkZG9uTGVmdCB8fCB0aGlzLm9wdGlvbnMucHJlcGVuZDtcbiAgICAgIHRoaXMub3B0aW9ucy5maWVsZEFkZG9uUmlnaHQgPVxuICAgICAgICB0aGlzLm9wdGlvbnMuZmllbGRBZGRvblJpZ2h0IHx8IHRoaXMub3B0aW9ucy5hcHBlbmQ7XG5cbiAgICAgIC8vIEFkZCBhc3RlcmlzayB0byB0aXRsZXMgaWYgcmVxdWlyZWRcbiAgICAgIGlmICh0aGlzLm9wdGlvbnMudGl0bGUgJiYgdGhpcy5sYXlvdXROb2RlLnR5cGUgIT09ICd0YWInICYmXG4gICAgICAgICF0aGlzLm9wdGlvbnMubm90aXRsZSAmJiB0aGlzLm9wdGlvbnMucmVxdWlyZWQgICYmXG4gICAgICAgICF0aGlzLm9wdGlvbnMudGl0bGUuaW5jbHVkZXMoJyonKVxuICAgICAgKSB7XG4gICAgICAgIHRoaXMub3B0aW9ucy50aXRsZSArPSAnIDxzdHJvbmcgY2xhc3M9XCJ0ZXh0LWRhbmdlclwiPio8L3N0cm9uZz4nO1xuICAgICAgfVxuICAgICAgLy8gU2V0IG1pc2NlbGFuZW91cyBzdHlsZXMgYW5kIHNldHRpbmdzIGZvciBlYWNoIGNvbnRyb2wgdHlwZVxuICAgICAgc3dpdGNoICh0aGlzLmxheW91dE5vZGUudHlwZSkge1xuICAgICAgICAvLyBDaGVja2JveCBjb250cm9sc1xuICAgICAgICBjYXNlICdjaGVja2JveCc6IGNhc2UgJ2NoZWNrYm94ZXMnOlxuICAgICAgICB0aGlzLndpZGdldE9wdGlvbnMuaHRtbENsYXNzID0gYWRkQ2xhc3NlcyhcbiAgICAgICAgICB0aGlzLndpZGdldE9wdGlvbnMuaHRtbENsYXNzLCAnY2hlY2tib3gnKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2NoZWNrYm94ZXMtaW5saW5lJzpcbiAgICAgICAgICB0aGlzLndpZGdldE9wdGlvbnMuaHRtbENsYXNzID0gYWRkQ2xhc3NlcyhcbiAgICAgICAgICAgIHRoaXMud2lkZ2V0T3B0aW9ucy5odG1sQ2xhc3MsICdjaGVja2JveCcpO1xuICAgICAgICAgIHRoaXMud2lkZ2V0T3B0aW9ucy5pdGVtTGFiZWxIdG1sQ2xhc3MgPSBhZGRDbGFzc2VzKFxuICAgICAgICAgICAgdGhpcy53aWRnZXRPcHRpb25zLml0ZW1MYWJlbEh0bWxDbGFzcywgJ2NoZWNrYm94LWlubGluZScpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICAvLyBSYWRpbyBjb250cm9sc1xuICAgICAgICBjYXNlICdyYWRpbyc6IGNhc2UgJ3JhZGlvcyc6XG4gICAgICAgIHRoaXMud2lkZ2V0T3B0aW9ucy5odG1sQ2xhc3MgPSBhZGRDbGFzc2VzKFxuICAgICAgICAgIHRoaXMud2lkZ2V0T3B0aW9ucy5odG1sQ2xhc3MsICdyYWRpbycpO1xuICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAncmFkaW9zLWlubGluZSc6XG4gICAgICAgICAgdGhpcy53aWRnZXRPcHRpb25zLmh0bWxDbGFzcyA9IGFkZENsYXNzZXMoXG4gICAgICAgICAgICB0aGlzLndpZGdldE9wdGlvbnMuaHRtbENsYXNzLCAncmFkaW8nKTtcbiAgICAgICAgICB0aGlzLndpZGdldE9wdGlvbnMuaXRlbUxhYmVsSHRtbENsYXNzID0gYWRkQ2xhc3NlcyhcbiAgICAgICAgICAgIHRoaXMud2lkZ2V0T3B0aW9ucy5pdGVtTGFiZWxIdG1sQ2xhc3MsICdyYWRpby1pbmxpbmUnKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgLy8gQnV0dG9uIHNldHMgLSBjaGVja2JveGJ1dHRvbnMgYW5kIHJhZGlvYnV0dG9uc1xuICAgICAgICBjYXNlICdjaGVja2JveGJ1dHRvbnMnOiBjYXNlICdyYWRpb2J1dHRvbnMnOlxuICAgICAgICAgIHRoaXMud2lkZ2V0T3B0aW9ucy5odG1sQ2xhc3MgPSBhZGRDbGFzc2VzKFxuICAgICAgICAgICAgdGhpcy53aWRnZXRPcHRpb25zLmh0bWxDbGFzcywgJ2J0bi1ncm91cCcpO1xuICAgICAgICAgIHRoaXMud2lkZ2V0T3B0aW9ucy5pdGVtTGFiZWxIdG1sQ2xhc3MgPSBhZGRDbGFzc2VzKFxuICAgICAgICAgICAgdGhpcy53aWRnZXRPcHRpb25zLml0ZW1MYWJlbEh0bWxDbGFzcywgJ2J0bicpO1xuICAgICAgICAgIHRoaXMud2lkZ2V0T3B0aW9ucy5pdGVtTGFiZWxIdG1sQ2xhc3MgPSBhZGRDbGFzc2VzKFxuICAgICAgICAgICAgdGhpcy53aWRnZXRPcHRpb25zLml0ZW1MYWJlbEh0bWxDbGFzcywgdGhpcy5vcHRpb25zLnN0eWxlIHx8ICdidG4tZGVmYXVsdCcpO1xuICAgICAgICAgIHRoaXMud2lkZ2V0T3B0aW9ucy5maWVsZEh0bWxDbGFzcyA9IGFkZENsYXNzZXMoXG4gICAgICAgICAgICB0aGlzLndpZGdldE9wdGlvbnMuZmllbGRIdG1sQ2xhc3MsICdzci1vbmx5Jyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgICAvLyBTaW5nbGUgYnV0dG9uIGNvbnRyb2xzXG4gICAgICAgIGNhc2UgJ2J1dHRvbic6IGNhc2UgJ3N1Ym1pdCc6XG4gICAgICAgICAgdGhpcy53aWRnZXRPcHRpb25zLmZpZWxkSHRtbENsYXNzID0gYWRkQ2xhc3NlcyhcbiAgICAgICAgICAgIHRoaXMud2lkZ2V0T3B0aW9ucy5maWVsZEh0bWxDbGFzcywgJ2J0bicpO1xuICAgICAgICAgIHRoaXMud2lkZ2V0T3B0aW9ucy5maWVsZEh0bWxDbGFzcyA9IGFkZENsYXNzZXMoXG4gICAgICAgICAgICB0aGlzLndpZGdldE9wdGlvbnMuZmllbGRIdG1sQ2xhc3MsIHRoaXMub3B0aW9ucy5zdHlsZSB8fCAnYnRuLWluZm8nKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICAgIC8vIENvbnRhaW5lcnMgLSBhcnJheXMgYW5kIGZpZWxkc2V0c1xuICAgICAgICBjYXNlICdhcnJheSc6IGNhc2UgJ2ZpZWxkc2V0JzogY2FzZSAnc2VjdGlvbic6IGNhc2UgJ2NvbmRpdGlvbmFsJzpcbiAgICAgICAgY2FzZSAnYWR2YW5jZWRmaWVsZHNldCc6IGNhc2UgJ2F1dGhmaWVsZHNldCc6XG4gICAgICAgIGNhc2UgJ3NlbGVjdGZpZWxkc2V0JzogY2FzZSAnb3B0aW9uZmllbGRzZXQnOlxuICAgICAgICAgIHRoaXMub3B0aW9ucy5tZXNzYWdlTG9jYXRpb24gPSAndG9wJztcbiAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ3RhYmFycmF5JzogY2FzZSAndGFicyc6XG4gICAgICAgICAgdGhpcy53aWRnZXRPcHRpb25zLmh0bWxDbGFzcyA9IGFkZENsYXNzZXMoXG4gICAgICAgICAgICB0aGlzLndpZGdldE9wdGlvbnMuaHRtbENsYXNzLCAndGFiLWNvbnRlbnQnKTtcbiAgICAgICAgICB0aGlzLndpZGdldE9wdGlvbnMuZmllbGRIdG1sQ2xhc3MgPSBhZGRDbGFzc2VzKFxuICAgICAgICAgICAgdGhpcy53aWRnZXRPcHRpb25zLmZpZWxkSHRtbENsYXNzLCAndGFiLXBhbmUnKTtcbiAgICAgICAgICB0aGlzLndpZGdldE9wdGlvbnMubGFiZWxIdG1sQ2xhc3MgPSBhZGRDbGFzc2VzKFxuICAgICAgICAgICAgdGhpcy53aWRnZXRPcHRpb25zLmxhYmVsSHRtbENsYXNzLCAnbmF2IG5hdi10YWJzJyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgICAvLyAnQWRkJyBidXR0b25zIC0gcmVmZXJlbmNlc1xuICAgICAgICBjYXNlICckcmVmJzpcbiAgICAgICAgICB0aGlzLndpZGdldE9wdGlvbnMuZmllbGRIdG1sQ2xhc3MgPSBhZGRDbGFzc2VzKFxuICAgICAgICAgICAgdGhpcy53aWRnZXRPcHRpb25zLmZpZWxkSHRtbENsYXNzLCAnYnRuIHB1bGwtcmlnaHQnKTtcbiAgICAgICAgICB0aGlzLndpZGdldE9wdGlvbnMuZmllbGRIdG1sQ2xhc3MgPSBhZGRDbGFzc2VzKFxuICAgICAgICAgICAgdGhpcy53aWRnZXRPcHRpb25zLmZpZWxkSHRtbENsYXNzLCB0aGlzLm9wdGlvbnMuc3R5bGUgfHwgJ2J0bi1kZWZhdWx0Jyk7XG4gICAgICAgICAgdGhpcy5vcHRpb25zLmljb24gPSAnZ2x5cGhpY29uIGdseXBoaWNvbi1wbHVzJztcbiAgICAgICAgYnJlYWs7XG4gICAgICAgIC8vIERlZmF1bHQgLSBpbmNsdWRpbmcgcmVndWxhciBpbnB1dHNcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICB0aGlzLndpZGdldE9wdGlvbnMuZmllbGRIdG1sQ2xhc3MgPSBhZGRDbGFzc2VzKFxuICAgICAgICAgICAgdGhpcy53aWRnZXRPcHRpb25zLmZpZWxkSHRtbENsYXNzLCAnZm9ybS1jb250cm9sJyk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmZvcm1Db250cm9sKSB7XG4gICAgICAgIHRoaXMudXBkYXRlSGVscEJsb2NrKHRoaXMuZm9ybUNvbnRyb2wuc3RhdHVzKTtcbiAgICAgICAgdGhpcy5mb3JtQ29udHJvbC5zdGF0dXNDaGFuZ2VzLnN1YnNjcmliZShzdGF0dXMgPT4gdGhpcy51cGRhdGVIZWxwQmxvY2soc3RhdHVzKSk7XG5cbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5kZWJ1Zykge1xuICAgICAgICAgIGxldCB2YXJzOiBhbnlbXSA9IFtdO1xuICAgICAgICAgIHRoaXMuZGVidWdPdXRwdXQgPSBfLm1hcCh2YXJzLCB0aGlzVmFyID0+IEpTT04uc3RyaW5naWZ5KHRoaXNWYXIsIG51bGwsIDIpKS5qb2luKCdcXG4nKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdGhpcy5mcmFtZXdvcmtJbml0aWFsaXplZCA9IHRydWU7XG4gICAgfVxuXG4gIH1cblxuICB1cGRhdGVIZWxwQmxvY2soc3RhdHVzKSB7XG4gICAgdGhpcy5vcHRpb25zLmhlbHBCbG9jayA9IHN0YXR1cyA9PT0gJ0lOVkFMSUQnICYmXG4gICAgICB0aGlzLm9wdGlvbnMuZW5hYmxlRXJyb3JTdGF0ZSAmJiB0aGlzLmZvcm1Db250cm9sLmVycm9ycyAmJlxuICAgICAgKHRoaXMuZm9ybUNvbnRyb2wuZGlydHkgfHwgdGhpcy5vcHRpb25zLmZlZWRiYWNrT25SZW5kZXIpID9cbiAgICAgICAgdGhpcy5qc2YuZm9ybWF0RXJyb3JzKHRoaXMuZm9ybUNvbnRyb2wuZXJyb3JzLCB0aGlzLm9wdGlvbnMudmFsaWRhdGlvbk1lc3NhZ2VzKSA6XG4gICAgICAgIHRoaXMub3B0aW9ucy5kZXNjcmlwdGlvbiB8fCB0aGlzLm9wdGlvbnMuaGVscCB8fCBudWxsO1xuICB9XG5cbiAgc2V0VGl0bGUoKTogc3RyaW5nIHtcbiAgICBzd2l0Y2ggKHRoaXMubGF5b3V0Tm9kZS50eXBlKSB7XG4gICAgICBjYXNlICdidXR0b24nOiBjYXNlICdjaGVja2JveCc6IGNhc2UgJ3NlY3Rpb24nOiBjYXNlICdoZWxwJzogY2FzZSAnbXNnJzpcbiAgICAgIGNhc2UgJ3N1Ym1pdCc6IGNhc2UgJ21lc3NhZ2UnOiBjYXNlICd0YWJhcnJheSc6IGNhc2UgJ3RhYnMnOiBjYXNlICckcmVmJzpcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICBjYXNlICdhZHZhbmNlZGZpZWxkc2V0JzpcbiAgICAgICAgdGhpcy53aWRnZXRPcHRpb25zLmV4cGFuZGFibGUgPSB0cnVlO1xuICAgICAgICB0aGlzLndpZGdldE9wdGlvbnMudGl0bGUgPSAnQWR2YW5jZWQgb3B0aW9ucyc7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgY2FzZSAnYXV0aGZpZWxkc2V0JzpcbiAgICAgICAgdGhpcy53aWRnZXRPcHRpb25zLmV4cGFuZGFibGUgPSB0cnVlO1xuICAgICAgICB0aGlzLndpZGdldE9wdGlvbnMudGl0bGUgPSAnQXV0aGVudGljYXRpb24gc2V0dGluZ3MnO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIGNhc2UgJ2ZpZWxkc2V0JzpcbiAgICAgICAgdGhpcy53aWRnZXRPcHRpb25zLnRpdGxlID0gdGhpcy5vcHRpb25zLnRpdGxlO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRoaXMud2lkZ2V0T3B0aW9ucy50aXRsZSA9IG51bGw7XG4gICAgICAgIHJldHVybiB0aGlzLmpzZi5zZXRJdGVtVGl0bGUodGhpcyk7XG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlSXRlbSgpIHtcbiAgICB0aGlzLmpzZi5yZW1vdmVJdGVtKHRoaXMpO1xuICB9XG59XG4iXX0=