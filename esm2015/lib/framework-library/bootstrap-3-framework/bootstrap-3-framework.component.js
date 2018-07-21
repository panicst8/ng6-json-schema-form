/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { ChangeDetectorRef, Component, Input } from '@angular/core';
import * as _ from 'lodash';
import { JsonSchemaFormService } from '../../json-schema-form.service';
import { addClasses, inArray } from '../../shared';
/**
 * Bootstrap 3 framework for Angular JSON Schema Form.
 *
 */
export class Bootstrap3FrameworkComponent {
    /**
     * @param {?} changeDetector
     * @param {?} jsf
     */
    constructor(changeDetector, jsf) {
        this.changeDetector = changeDetector;
        this.jsf = jsf;
        this.frameworkInitialized = false;
        this.formControl = null;
        this.debugOutput = '';
        this.debug = '';
        this.parentArray = null;
        this.isOrderable = false;
    }
    /**
     * @return {?}
     */
    get showRemoveButton() {
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
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.initializeFramework();
        if (this.layoutNode.arrayItem && this.layoutNode.type !== '$ref') {
            this.parentArray = this.jsf.getParentNode(this);
            if (this.parentArray) {
                this.isOrderable = this.layoutNode.arrayItemType === 'list' &&
                    !this.options.readonly && this.parentArray.options.orderable;
            }
        }
    }
    /**
     * @return {?}
     */
    ngOnChanges() {
        if (!this.frameworkInitialized) {
            this.initializeFramework();
        }
    }
    /**
     * @return {?}
     */
    initializeFramework() {
        if (this.layoutNode) {
            this.options = _.cloneDeep(this.layoutNode.options);
            this.widgetLayoutNode = Object.assign({}, this.layoutNode, { options: _.cloneDeep(this.layoutNode.options) });
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
            if (this.layoutNode.type !== 'flex') {
                this.options.htmlClass =
                    this.layoutNode.type === 'array' ?
                        addClasses(this.options.htmlClass, 'list-group') :
                        this.layoutNode.arrayItem && this.layoutNode.type !== '$ref' ?
                            addClasses(this.options.htmlClass, 'list-group-item') :
                            addClasses(this.options.htmlClass, 'form-group');
            }
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
                this.formControl.statusChanges.subscribe(status => this.updateHelpBlock(status));
                if (this.options.debug) {
                    /** @type {?} */
                    let vars = [];
                    this.debugOutput = _.map(vars, thisVar => JSON.stringify(thisVar, null, 2)).join('\n');
                }
            }
            this.frameworkInitialized = true;
        }
    }
    /**
     * @param {?} status
     * @return {?}
     */
    updateHelpBlock(status) {
        this.options.helpBlock = status === 'INVALID' &&
            this.options.enableErrorState && this.formControl.errors &&
            (this.formControl.dirty || this.options.feedbackOnRender) ?
            this.jsf.formatErrors(this.formControl.errors, this.options.validationMessages) :
            this.options.description || this.options.help || null;
    }
    /**
     * @return {?}
     */
    setTitle() {
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
    }
    /**
     * @return {?}
     */
    removeItem() {
        this.jsf.removeItem(this);
    }
}
Bootstrap3FrameworkComponent.decorators = [
    { type: Component, args: [{
                selector: 'bootstrap-3-framework',
                template: `
    <div
      [class]="options?.htmlClass || ''"
      [class.has-feedback]="options?.feedback && options?.isInputWidget &&
        (formControl?.dirty || options?.feedbackOnRender)"
      [class.has-error]="options?.enableErrorState && formControl?.errors &&
        (formControl?.dirty || options?.feedbackOnRender)"
      [class.has-success]="options?.enableSuccessState && !formControl?.errors &&
        (formControl?.dirty || options?.feedbackOnRender)">

      <button *ngIf="showRemoveButton"
        class="close pull-right"
        type="button"
        (click)="removeItem()">
        <span aria-hidden="true">&times;</span>
        <span class="sr-only">Close</span>
      </button>
      <div *ngIf="options?.messageLocation === 'top'">
          <p *ngIf="options?.helpBlock"
          class="help-block"
          [innerHTML]="options?.helpBlock"></p>
      </div>

      <label *ngIf="options?.title && layoutNode?.type !== 'tab'"
        [attr.for]="'control' + layoutNode?._id"
        [class]="options?.labelHtmlClass || ''"
        [class.sr-only]="options?.notitle"
        [innerHTML]="options?.title"></label>
      <p *ngIf="layoutNode?.type === 'submit' && jsf?.formOptions?.fieldsRequired">
        <strong class="text-danger">*</strong> = required fields
      </p>
      <div [class.input-group]="options?.fieldAddonLeft || options?.fieldAddonRight">
        <span *ngIf="options?.fieldAddonLeft"
          class="input-group-addon"
          [innerHTML]="options?.fieldAddonLeft"></span>

        <select-widget-widget
          [layoutNode]="widgetLayoutNode"
          [dataIndex]="dataIndex"
          [layoutIndex]="layoutIndex"></select-widget-widget>

        <span *ngIf="options?.fieldAddonRight"
          class="input-group-addon"
          [innerHTML]="options?.fieldAddonRight"></span>
      </div>

      <span *ngIf="options?.feedback && options?.isInputWidget &&
          !options?.fieldAddonRight && !layoutNode.arrayItem &&
          (formControl?.dirty || options?.feedbackOnRender)"
        [class.glyphicon-ok]="options?.enableSuccessState && !formControl?.errors"
        [class.glyphicon-remove]="options?.enableErrorState && formControl?.errors"
        aria-hidden="true"
        class="form-control-feedback glyphicon"></span>
      <div *ngIf="options?.messageLocation !== 'top'">
        <p *ngIf="options?.helpBlock"
          class="help-block"
          [innerHTML]="options?.helpBlock"></p>
      </div>
    </div>

    <div *ngIf="debug && debugOutput">debug: <pre>{{debugOutput}}</pre></div>
  `,
                styles: [`
    :host /deep/ .list-group-item .form-control-feedback { top: 40; }
    :host /deep/ .checkbox,
    :host /deep/ .radio { margin-top: 0; margin-bottom: 0; }
    :host /deep/ .checkbox-inline,
    :host /deep/ .checkbox-inline + .checkbox-inline,
    :host /deep/ .checkbox-inline + .radio-inline,
    :host /deep/ .radio-inline,
    :host /deep/ .radio-inline + .radio-inline,
    :host /deep/ .radio-inline + .checkbox-inline { margin-left: 0; margin-right: 10px; }
    :host /deep/ .checkbox-inline:last-child,
    :host /deep/ .radio-inline:last-child { margin-right: 0; }
    :host /deep/ .ng-invalid.ng-touched { border: 1px solid #f44336; }
  `],
            },] },
];
/** @nocollapse */
Bootstrap3FrameworkComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: JsonSchemaFormService }
];
Bootstrap3FrameworkComponent.propDecorators = {
    layoutNode: [{ type: Input }],
    layoutIndex: [{ type: Input }],
    dataIndex: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    Bootstrap3FrameworkComponent.prototype.frameworkInitialized;
    /** @type {?} */
    Bootstrap3FrameworkComponent.prototype.widgetOptions;
    /** @type {?} */
    Bootstrap3FrameworkComponent.prototype.widgetLayoutNode;
    /** @type {?} */
    Bootstrap3FrameworkComponent.prototype.options;
    /** @type {?} */
    Bootstrap3FrameworkComponent.prototype.formControl;
    /** @type {?} */
    Bootstrap3FrameworkComponent.prototype.debugOutput;
    /** @type {?} */
    Bootstrap3FrameworkComponent.prototype.debug;
    /** @type {?} */
    Bootstrap3FrameworkComponent.prototype.parentArray;
    /** @type {?} */
    Bootstrap3FrameworkComponent.prototype.isOrderable;
    /** @type {?} */
    Bootstrap3FrameworkComponent.prototype.layoutNode;
    /** @type {?} */
    Bootstrap3FrameworkComponent.prototype.layoutIndex;
    /** @type {?} */
    Bootstrap3FrameworkComponent.prototype.dataIndex;
    /** @type {?} */
    Bootstrap3FrameworkComponent.prototype.changeDetector;
    /** @type {?} */
    Bootstrap3FrameworkComponent.prototype.jsf;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9vdHN0cmFwLTMtZnJhbWV3b3JrLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nNi1qc29uLXNjaGVtYS1mb3JtLyIsInNvdXJjZXMiOlsibGliL2ZyYW1ld29yay1saWJyYXJ5L2Jvb3RzdHJhcC0zLWZyYW1ld29yay9ib290c3RyYXAtMy1mcmFtZXdvcmsuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBcUIsTUFBTSxlQUFlLENBQUM7QUFFdkYsT0FBTyxLQUFLLENBQUMsTUFBTSxRQUFRLENBQUM7QUFFNUIsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDdkUsT0FBTyxFQUNMLFVBQVUsRUFBVSxPQUFPLEVBQzVCLE1BQU0sY0FBYyxDQUFDOzs7OztBQXFGdEIsTUFBTTs7Ozs7SUFjSixZQUNTLGdCQUNBO1FBREEsbUJBQWMsR0FBZCxjQUFjO1FBQ2QsUUFBRyxHQUFILEdBQUc7b0NBZlcsS0FBSzsyQkFJVCxJQUFJOzJCQUNKLEVBQUU7cUJBQ1IsRUFBRTsyQkFDSSxJQUFJOzJCQUNULEtBQUs7S0FRZDs7OztJQUVMLElBQUksZ0JBQWdCO1FBQ2xCLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRO1lBQ2xELElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxLQUFLLE1BQzNCLENBQUMsQ0FBQyxDQUFDO1lBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztTQUFFO1FBQ25CLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDO1lBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztTQUFFO1FBQ3hELEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLElBQUks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QyxLQUFLLENBQUM7Z0JBQzlDLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDZDtnQkFDRSxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7Z0JBQ2hDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUN0QztLQUNGOzs7O0lBRUQsVUFBVTtRQUNSLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQzNCOzs7WUFsU0YsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSx1QkFBdUI7Z0JBQ2pDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTZEVDtnQkFDRCxNQUFNLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7OztHQWFSLENBQUM7YUFDSDs7OztZQTNGUSxpQkFBaUI7WUFJakIscUJBQXFCOzs7eUJBa0czQixLQUFLOzBCQUNMLEtBQUs7d0JBQ0wsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdG9yUmVmLCBDb21wb25lbnQsIElucHV0LCBPbkNoYW5nZXMsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG5cbmltcG9ydCB7IEpzb25TY2hlbWFGb3JtU2VydmljZSB9IGZyb20gJy4uLy4uL2pzb24tc2NoZW1hLWZvcm0uc2VydmljZSc7XG5pbXBvcnQge1xuICBhZGRDbGFzc2VzLCBoYXNPd24sIGluQXJyYXksIGlzQXJyYXksIEpzb25Qb2ludGVyLCB0b1RpdGxlQ2FzZVxufSBmcm9tICcuLi8uLi9zaGFyZWQnO1xuXG4vKipcbiAqIEJvb3RzdHJhcCAzIGZyYW1ld29yayBmb3IgQW5ndWxhciBKU09OIFNjaGVtYSBGb3JtLlxuICpcbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYm9vdHN0cmFwLTMtZnJhbWV3b3JrJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2XG4gICAgICBbY2xhc3NdPVwib3B0aW9ucz8uaHRtbENsYXNzIHx8ICcnXCJcbiAgICAgIFtjbGFzcy5oYXMtZmVlZGJhY2tdPVwib3B0aW9ucz8uZmVlZGJhY2sgJiYgb3B0aW9ucz8uaXNJbnB1dFdpZGdldCAmJlxuICAgICAgICAoZm9ybUNvbnRyb2w/LmRpcnR5IHx8IG9wdGlvbnM/LmZlZWRiYWNrT25SZW5kZXIpXCJcbiAgICAgIFtjbGFzcy5oYXMtZXJyb3JdPVwib3B0aW9ucz8uZW5hYmxlRXJyb3JTdGF0ZSAmJiBmb3JtQ29udHJvbD8uZXJyb3JzICYmXG4gICAgICAgIChmb3JtQ29udHJvbD8uZGlydHkgfHwgb3B0aW9ucz8uZmVlZGJhY2tPblJlbmRlcilcIlxuICAgICAgW2NsYXNzLmhhcy1zdWNjZXNzXT1cIm9wdGlvbnM/LmVuYWJsZVN1Y2Nlc3NTdGF0ZSAmJiAhZm9ybUNvbnRyb2w/LmVycm9ycyAmJlxuICAgICAgICAoZm9ybUNvbnRyb2w/LmRpcnR5IHx8IG9wdGlvbnM/LmZlZWRiYWNrT25SZW5kZXIpXCI+XG5cbiAgICAgIDxidXR0b24gKm5nSWY9XCJzaG93UmVtb3ZlQnV0dG9uXCJcbiAgICAgICAgY2xhc3M9XCJjbG9zZSBwdWxsLXJpZ2h0XCJcbiAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgIChjbGljayk9XCJyZW1vdmVJdGVtKClcIj5cbiAgICAgICAgPHNwYW4gYXJpYS1oaWRkZW49XCJ0cnVlXCI+JnRpbWVzOzwvc3Bhbj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJzci1vbmx5XCI+Q2xvc2U8L3NwYW4+XG4gICAgICA8L2J1dHRvbj5cbiAgICAgIDxkaXYgKm5nSWY9XCJvcHRpb25zPy5tZXNzYWdlTG9jYXRpb24gPT09ICd0b3AnXCI+XG4gICAgICAgICAgPHAgKm5nSWY9XCJvcHRpb25zPy5oZWxwQmxvY2tcIlxuICAgICAgICAgIGNsYXNzPVwiaGVscC1ibG9ja1wiXG4gICAgICAgICAgW2lubmVySFRNTF09XCJvcHRpb25zPy5oZWxwQmxvY2tcIj48L3A+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPGxhYmVsICpuZ0lmPVwib3B0aW9ucz8udGl0bGUgJiYgbGF5b3V0Tm9kZT8udHlwZSAhPT0gJ3RhYidcIlxuICAgICAgICBbYXR0ci5mb3JdPVwiJ2NvbnRyb2wnICsgbGF5b3V0Tm9kZT8uX2lkXCJcbiAgICAgICAgW2NsYXNzXT1cIm9wdGlvbnM/LmxhYmVsSHRtbENsYXNzIHx8ICcnXCJcbiAgICAgICAgW2NsYXNzLnNyLW9ubHldPVwib3B0aW9ucz8ubm90aXRsZVwiXG4gICAgICAgIFtpbm5lckhUTUxdPVwib3B0aW9ucz8udGl0bGVcIj48L2xhYmVsPlxuICAgICAgPHAgKm5nSWY9XCJsYXlvdXROb2RlPy50eXBlID09PSAnc3VibWl0JyAmJiBqc2Y/LmZvcm1PcHRpb25zPy5maWVsZHNSZXF1aXJlZFwiPlxuICAgICAgICA8c3Ryb25nIGNsYXNzPVwidGV4dC1kYW5nZXJcIj4qPC9zdHJvbmc+ID0gcmVxdWlyZWQgZmllbGRzXG4gICAgICA8L3A+XG4gICAgICA8ZGl2IFtjbGFzcy5pbnB1dC1ncm91cF09XCJvcHRpb25zPy5maWVsZEFkZG9uTGVmdCB8fCBvcHRpb25zPy5maWVsZEFkZG9uUmlnaHRcIj5cbiAgICAgICAgPHNwYW4gKm5nSWY9XCJvcHRpb25zPy5maWVsZEFkZG9uTGVmdFwiXG4gICAgICAgICAgY2xhc3M9XCJpbnB1dC1ncm91cC1hZGRvblwiXG4gICAgICAgICAgW2lubmVySFRNTF09XCJvcHRpb25zPy5maWVsZEFkZG9uTGVmdFwiPjwvc3Bhbj5cblxuICAgICAgICA8c2VsZWN0LXdpZGdldC13aWRnZXRcbiAgICAgICAgICBbbGF5b3V0Tm9kZV09XCJ3aWRnZXRMYXlvdXROb2RlXCJcbiAgICAgICAgICBbZGF0YUluZGV4XT1cImRhdGFJbmRleFwiXG4gICAgICAgICAgW2xheW91dEluZGV4XT1cImxheW91dEluZGV4XCI+PC9zZWxlY3Qtd2lkZ2V0LXdpZGdldD5cblxuICAgICAgICA8c3BhbiAqbmdJZj1cIm9wdGlvbnM/LmZpZWxkQWRkb25SaWdodFwiXG4gICAgICAgICAgY2xhc3M9XCJpbnB1dC1ncm91cC1hZGRvblwiXG4gICAgICAgICAgW2lubmVySFRNTF09XCJvcHRpb25zPy5maWVsZEFkZG9uUmlnaHRcIj48L3NwYW4+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPHNwYW4gKm5nSWY9XCJvcHRpb25zPy5mZWVkYmFjayAmJiBvcHRpb25zPy5pc0lucHV0V2lkZ2V0ICYmXG4gICAgICAgICAgIW9wdGlvbnM/LmZpZWxkQWRkb25SaWdodCAmJiAhbGF5b3V0Tm9kZS5hcnJheUl0ZW0gJiZcbiAgICAgICAgICAoZm9ybUNvbnRyb2w/LmRpcnR5IHx8IG9wdGlvbnM/LmZlZWRiYWNrT25SZW5kZXIpXCJcbiAgICAgICAgW2NsYXNzLmdseXBoaWNvbi1va109XCJvcHRpb25zPy5lbmFibGVTdWNjZXNzU3RhdGUgJiYgIWZvcm1Db250cm9sPy5lcnJvcnNcIlxuICAgICAgICBbY2xhc3MuZ2x5cGhpY29uLXJlbW92ZV09XCJvcHRpb25zPy5lbmFibGVFcnJvclN0YXRlICYmIGZvcm1Db250cm9sPy5lcnJvcnNcIlxuICAgICAgICBhcmlhLWhpZGRlbj1cInRydWVcIlxuICAgICAgICBjbGFzcz1cImZvcm0tY29udHJvbC1mZWVkYmFjayBnbHlwaGljb25cIj48L3NwYW4+XG4gICAgICA8ZGl2ICpuZ0lmPVwib3B0aW9ucz8ubWVzc2FnZUxvY2F0aW9uICE9PSAndG9wJ1wiPlxuICAgICAgICA8cCAqbmdJZj1cIm9wdGlvbnM/LmhlbHBCbG9ja1wiXG4gICAgICAgICAgY2xhc3M9XCJoZWxwLWJsb2NrXCJcbiAgICAgICAgICBbaW5uZXJIVE1MXT1cIm9wdGlvbnM/LmhlbHBCbG9ja1wiPjwvcD5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuXG4gICAgPGRpdiAqbmdJZj1cImRlYnVnICYmIGRlYnVnT3V0cHV0XCI+ZGVidWc6IDxwcmU+e3tkZWJ1Z091dHB1dH19PC9wcmU+PC9kaXY+XG4gIGAsXG4gIHN0eWxlczogW2BcbiAgICA6aG9zdCAvZGVlcC8gLmxpc3QtZ3JvdXAtaXRlbSAuZm9ybS1jb250cm9sLWZlZWRiYWNrIHsgdG9wOiA0MDsgfVxuICAgIDpob3N0IC9kZWVwLyAuY2hlY2tib3gsXG4gICAgOmhvc3QgL2RlZXAvIC5yYWRpbyB7IG1hcmdpbi10b3A6IDA7IG1hcmdpbi1ib3R0b206IDA7IH1cbiAgICA6aG9zdCAvZGVlcC8gLmNoZWNrYm94LWlubGluZSxcbiAgICA6aG9zdCAvZGVlcC8gLmNoZWNrYm94LWlubGluZSArIC5jaGVja2JveC1pbmxpbmUsXG4gICAgOmhvc3QgL2RlZXAvIC5jaGVja2JveC1pbmxpbmUgKyAucmFkaW8taW5saW5lLFxuICAgIDpob3N0IC9kZWVwLyAucmFkaW8taW5saW5lLFxuICAgIDpob3N0IC9kZWVwLyAucmFkaW8taW5saW5lICsgLnJhZGlvLWlubGluZSxcbiAgICA6aG9zdCAvZGVlcC8gLnJhZGlvLWlubGluZSArIC5jaGVja2JveC1pbmxpbmUgeyBtYXJnaW4tbGVmdDogMDsgbWFyZ2luLXJpZ2h0OiAxMHB4OyB9XG4gICAgOmhvc3QgL2RlZXAvIC5jaGVja2JveC1pbmxpbmU6bGFzdC1jaGlsZCxcbiAgICA6aG9zdCAvZGVlcC8gLnJhZGlvLWlubGluZTpsYXN0LWNoaWxkIHsgbWFyZ2luLXJpZ2h0OiAwOyB9XG4gICAgOmhvc3QgL2RlZXAvIC5uZy1pbnZhbGlkLm5nLXRvdWNoZWQgeyBib3JkZXI6IDFweCBzb2xpZCAjZjQ0MzM2OyB9XG4gIGBdLFxufSlcbmV4cG9ydCBjbGFzcyBCb290c3RyYXAzRnJhbWV3b3JrQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xuICBmcmFtZXdvcmtJbml0aWFsaXplZCA9IGZhbHNlO1xuICB3aWRnZXRPcHRpb25zOiBhbnk7IC8vIE9wdGlvbnMgcGFzc2VkIHRvIGNoaWxkIHdpZGdldFxuICB3aWRnZXRMYXlvdXROb2RlOiBhbnk7IC8vIGxheW91dE5vZGUgcGFzc2VkIHRvIGNoaWxkIHdpZGdldFxuICBvcHRpb25zOiBhbnk7IC8vIE9wdGlvbnMgdXNlZCBpbiB0aGlzIGZyYW1ld29ya1xuICBmb3JtQ29udHJvbDogYW55ID0gbnVsbDtcbiAgZGVidWdPdXRwdXQ6IGFueSA9ICcnO1xuICBkZWJ1ZzogYW55ID0gJyc7XG4gIHBhcmVudEFycmF5OiBhbnkgPSBudWxsO1xuICBpc09yZGVyYWJsZSA9IGZhbHNlO1xuICBASW5wdXQoKSBsYXlvdXROb2RlOiBhbnk7XG4gIEBJbnB1dCgpIGxheW91dEluZGV4OiBudW1iZXJbXTtcbiAgQElucHV0KCkgZGF0YUluZGV4OiBudW1iZXJbXTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgY2hhbmdlRGV0ZWN0b3I6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIHB1YmxpYyBqc2Y6IEpzb25TY2hlbWFGb3JtU2VydmljZVxuICApIHsgfVxuXG4gIGdldCBzaG93UmVtb3ZlQnV0dG9uKCk6IGJvb2xlYW4ge1xuICAgIGlmICghdGhpcy5vcHRpb25zLnJlbW92YWJsZSB8fCB0aGlzLm9wdGlvbnMucmVhZG9ubHkgfHxcbiAgICAgIHRoaXMubGF5b3V0Tm9kZS50eXBlID09PSAnJHJlZidcbiAgICApIHsgcmV0dXJuIGZhbHNlOyB9XG4gICAgaWYgKHRoaXMubGF5b3V0Tm9kZS5yZWN1cnNpdmVSZWZlcmVuY2UpIHsgcmV0dXJuIHRydWU7IH1cbiAgICBpZiAoIXRoaXMubGF5b3V0Tm9kZS5hcnJheUl0ZW0gfHwgIXRoaXMucGFyZW50QXJyYXkpIHsgcmV0dXJuIGZhbHNlOyB9XG4gICAgLy8gSWYgYXJyYXkgbGVuZ3RoIDw9IG1pbkl0ZW1zLCBkb24ndCBhbGxvdyByZW1vdmluZyBhbnkgaXRlbXNcbiAgICByZXR1cm4gdGhpcy5wYXJlbnRBcnJheS5pdGVtcy5sZW5ndGggLSAxIDw9IHRoaXMucGFyZW50QXJyYXkub3B0aW9ucy5taW5JdGVtcyA/IGZhbHNlIDpcbiAgICAgIC8vIEZvciByZW1vdmFibGUgbGlzdCBpdGVtcywgYWxsb3cgcmVtb3ZpbmcgYW55IGl0ZW1cbiAgICAgIHRoaXMubGF5b3V0Tm9kZS5hcnJheUl0ZW1UeXBlID09PSAnbGlzdCcgPyB0cnVlIDpcbiAgICAgIC8vIEZvciByZW1vdmFibGUgdHVwbGUgaXRlbXMsIG9ubHkgYWxsb3cgcmVtb3ZpbmcgbGFzdCBpdGVtIGluIGxpc3RcbiAgICAgIHRoaXMubGF5b3V0SW5kZXhbdGhpcy5sYXlvdXRJbmRleC5sZW5ndGggLSAxXSA9PT0gdGhpcy5wYXJlbnRBcnJheS5pdGVtcy5sZW5ndGggLSAyO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5pbml0aWFsaXplRnJhbWV3b3JrKCk7XG4gICAgaWYgKHRoaXMubGF5b3V0Tm9kZS5hcnJheUl0ZW0gJiYgdGhpcy5sYXlvdXROb2RlLnR5cGUgIT09ICckcmVmJykge1xuICAgICAgdGhpcy5wYXJlbnRBcnJheSA9IHRoaXMuanNmLmdldFBhcmVudE5vZGUodGhpcyk7XG4gICAgICBpZiAodGhpcy5wYXJlbnRBcnJheSkge1xuICAgICAgICB0aGlzLmlzT3JkZXJhYmxlID0gdGhpcy5sYXlvdXROb2RlLmFycmF5SXRlbVR5cGUgPT09ICdsaXN0JyAmJlxuICAgICAgICAgICF0aGlzLm9wdGlvbnMucmVhZG9ubHkgJiYgdGhpcy5wYXJlbnRBcnJheS5vcHRpb25zLm9yZGVyYWJsZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBuZ09uQ2hhbmdlcygpIHtcbiAgICBpZiAoIXRoaXMuZnJhbWV3b3JrSW5pdGlhbGl6ZWQpIHsgdGhpcy5pbml0aWFsaXplRnJhbWV3b3JrKCk7IH1cbiAgfVxuXG4gIGluaXRpYWxpemVGcmFtZXdvcmsoKSB7XG4gICAgaWYgKHRoaXMubGF5b3V0Tm9kZSkge1xuICAgICAgdGhpcy5vcHRpb25zID0gXy5jbG9uZURlZXAodGhpcy5sYXlvdXROb2RlLm9wdGlvbnMpO1xuICAgICAgdGhpcy53aWRnZXRMYXlvdXROb2RlID0ge1xuICAgICAgICAuLi50aGlzLmxheW91dE5vZGUsXG4gICAgICAgIG9wdGlvbnM6IF8uY2xvbmVEZWVwKHRoaXMubGF5b3V0Tm9kZS5vcHRpb25zKVxuICAgICAgfTtcbiAgICAgIHRoaXMud2lkZ2V0T3B0aW9ucyA9IHRoaXMud2lkZ2V0TGF5b3V0Tm9kZS5vcHRpb25zO1xuICAgICAgdGhpcy5mb3JtQ29udHJvbCA9IHRoaXMuanNmLmdldEZvcm1Db250cm9sKHRoaXMpO1xuXG4gICAgICB0aGlzLm9wdGlvbnMuaXNJbnB1dFdpZGdldCA9IGluQXJyYXkodGhpcy5sYXlvdXROb2RlLnR5cGUsIFtcbiAgICAgICAgJ2J1dHRvbicsICdjaGVja2JveCcsICdjaGVja2JveGVzLWlubGluZScsICdjaGVja2JveGVzJywgJ2NvbG9yJyxcbiAgICAgICAgJ2RhdGUnLCAnZGF0ZXRpbWUtbG9jYWwnLCAnZGF0ZXRpbWUnLCAnZW1haWwnLCAnZmlsZScsICdoaWRkZW4nLFxuICAgICAgICAnaW1hZ2UnLCAnaW50ZWdlcicsICdtb250aCcsICdudW1iZXInLCAncGFzc3dvcmQnLCAncmFkaW8nLFxuICAgICAgICAncmFkaW9idXR0b25zJywgJ3JhZGlvcy1pbmxpbmUnLCAncmFkaW9zJywgJ3JhbmdlJywgJ3Jlc2V0JywgJ3NlYXJjaCcsXG4gICAgICAgICdzZWxlY3QnLCAnc3VibWl0JywgJ3RlbCcsICd0ZXh0JywgJ3RleHRhcmVhJywgJ3RpbWUnLCAndXJsJywgJ3dlZWsnXG4gICAgICBdKTtcblxuICAgICAgdGhpcy5vcHRpb25zLnRpdGxlID0gdGhpcy5zZXRUaXRsZSgpO1xuXG4gICAgICB0aGlzLm9wdGlvbnMuaHRtbENsYXNzID1cbiAgICAgICAgYWRkQ2xhc3Nlcyh0aGlzLm9wdGlvbnMuaHRtbENsYXNzLCAnc2NoZW1hLWZvcm0tJyArIHRoaXMubGF5b3V0Tm9kZS50eXBlKTtcbiAgICAgIGlmICh0aGlzLmxheW91dE5vZGUudHlwZSAhPT0gJ2ZsZXgnKSAge1xuICAgICAgICAgIHRoaXMub3B0aW9ucy5odG1sQ2xhc3MgPVxuICAgICAgICAgICAgdGhpcy5sYXlvdXROb2RlLnR5cGUgPT09ICdhcnJheScgP1xuICAgICAgICAgICAgICBhZGRDbGFzc2VzKHRoaXMub3B0aW9ucy5odG1sQ2xhc3MsICdsaXN0LWdyb3VwJykgOlxuICAgICAgICAgICAgdGhpcy5sYXlvdXROb2RlLmFycmF5SXRlbSAmJiB0aGlzLmxheW91dE5vZGUudHlwZSAhPT0gJyRyZWYnID9cbiAgICAgICAgICAgICAgYWRkQ2xhc3Nlcyh0aGlzLm9wdGlvbnMuaHRtbENsYXNzLCAnbGlzdC1ncm91cC1pdGVtJykgOlxuICAgICAgICAgICAgICBhZGRDbGFzc2VzKHRoaXMub3B0aW9ucy5odG1sQ2xhc3MsICdmb3JtLWdyb3VwJyk7XG4gICAgICB9XG4gICAgICB0aGlzLndpZGdldE9wdGlvbnMuaHRtbENsYXNzID0gJyc7XG4gICAgICB0aGlzLm9wdGlvbnMubGFiZWxIdG1sQ2xhc3MgPVxuICAgICAgICBhZGRDbGFzc2VzKHRoaXMub3B0aW9ucy5sYWJlbEh0bWxDbGFzcywgJ2NvbnRyb2wtbGFiZWwnKTtcbiAgICAgIHRoaXMud2lkZ2V0T3B0aW9ucy5hY3RpdmVDbGFzcyA9XG4gICAgICAgIGFkZENsYXNzZXModGhpcy53aWRnZXRPcHRpb25zLmFjdGl2ZUNsYXNzLCAnYWN0aXZlJyk7XG4gICAgICB0aGlzLm9wdGlvbnMuZmllbGRBZGRvbkxlZnQgPVxuICAgICAgICB0aGlzLm9wdGlvbnMuZmllbGRBZGRvbkxlZnQgfHwgdGhpcy5vcHRpb25zLnByZXBlbmQ7XG4gICAgICB0aGlzLm9wdGlvbnMuZmllbGRBZGRvblJpZ2h0ID1cbiAgICAgICAgdGhpcy5vcHRpb25zLmZpZWxkQWRkb25SaWdodCB8fCB0aGlzLm9wdGlvbnMuYXBwZW5kO1xuXG4gICAgICAvLyBBZGQgYXN0ZXJpc2sgdG8gdGl0bGVzIGlmIHJlcXVpcmVkXG4gICAgICBpZiAodGhpcy5vcHRpb25zLnRpdGxlICYmIHRoaXMubGF5b3V0Tm9kZS50eXBlICE9PSAndGFiJyAmJlxuICAgICAgICAhdGhpcy5vcHRpb25zLm5vdGl0bGUgJiYgdGhpcy5vcHRpb25zLnJlcXVpcmVkICAmJlxuICAgICAgICAhdGhpcy5vcHRpb25zLnRpdGxlLmluY2x1ZGVzKCcqJylcbiAgICAgICkge1xuICAgICAgICB0aGlzLm9wdGlvbnMudGl0bGUgKz0gJyA8c3Ryb25nIGNsYXNzPVwidGV4dC1kYW5nZXJcIj4qPC9zdHJvbmc+JztcbiAgICAgIH1cbiAgICAgIC8vIFNldCBtaXNjZWxhbmVvdXMgc3R5bGVzIGFuZCBzZXR0aW5ncyBmb3IgZWFjaCBjb250cm9sIHR5cGVcbiAgICAgIHN3aXRjaCAodGhpcy5sYXlvdXROb2RlLnR5cGUpIHtcbiAgICAgICAgLy8gQ2hlY2tib3ggY29udHJvbHNcbiAgICAgICAgY2FzZSAnY2hlY2tib3gnOiBjYXNlICdjaGVja2JveGVzJzpcbiAgICAgICAgICB0aGlzLndpZGdldE9wdGlvbnMuaHRtbENsYXNzID0gYWRkQ2xhc3NlcyhcbiAgICAgICAgICAgIHRoaXMud2lkZ2V0T3B0aW9ucy5odG1sQ2xhc3MsICdjaGVja2JveCcpO1xuICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnY2hlY2tib3hlcy1pbmxpbmUnOlxuICAgICAgICAgIHRoaXMud2lkZ2V0T3B0aW9ucy5odG1sQ2xhc3MgPSBhZGRDbGFzc2VzKFxuICAgICAgICAgICAgdGhpcy53aWRnZXRPcHRpb25zLmh0bWxDbGFzcywgJ2NoZWNrYm94Jyk7XG4gICAgICAgICAgdGhpcy53aWRnZXRPcHRpb25zLml0ZW1MYWJlbEh0bWxDbGFzcyA9IGFkZENsYXNzZXMoXG4gICAgICAgICAgICB0aGlzLndpZGdldE9wdGlvbnMuaXRlbUxhYmVsSHRtbENsYXNzLCAnY2hlY2tib3gtaW5saW5lJyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgICAvLyBSYWRpbyBjb250cm9sc1xuICAgICAgICBjYXNlICdyYWRpbyc6IGNhc2UgJ3JhZGlvcyc6XG4gICAgICAgICAgdGhpcy53aWRnZXRPcHRpb25zLmh0bWxDbGFzcyA9IGFkZENsYXNzZXMoXG4gICAgICAgICAgICB0aGlzLndpZGdldE9wdGlvbnMuaHRtbENsYXNzLCAncmFkaW8nKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ3JhZGlvcy1pbmxpbmUnOlxuICAgICAgICAgIHRoaXMud2lkZ2V0T3B0aW9ucy5odG1sQ2xhc3MgPSBhZGRDbGFzc2VzKFxuICAgICAgICAgICAgdGhpcy53aWRnZXRPcHRpb25zLmh0bWxDbGFzcywgJ3JhZGlvJyk7XG4gICAgICAgICAgdGhpcy53aWRnZXRPcHRpb25zLml0ZW1MYWJlbEh0bWxDbGFzcyA9IGFkZENsYXNzZXMoXG4gICAgICAgICAgICB0aGlzLndpZGdldE9wdGlvbnMuaXRlbUxhYmVsSHRtbENsYXNzLCAncmFkaW8taW5saW5lJyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgICAvLyBCdXR0b24gc2V0cyAtIGNoZWNrYm94YnV0dG9ucyBhbmQgcmFkaW9idXR0b25zXG4gICAgICAgIGNhc2UgJ2NoZWNrYm94YnV0dG9ucyc6IGNhc2UgJ3JhZGlvYnV0dG9ucyc6XG4gICAgICAgICAgdGhpcy53aWRnZXRPcHRpb25zLmh0bWxDbGFzcyA9IGFkZENsYXNzZXMoXG4gICAgICAgICAgICB0aGlzLndpZGdldE9wdGlvbnMuaHRtbENsYXNzLCAnYnRuLWdyb3VwJyk7XG4gICAgICAgICAgdGhpcy53aWRnZXRPcHRpb25zLml0ZW1MYWJlbEh0bWxDbGFzcyA9IGFkZENsYXNzZXMoXG4gICAgICAgICAgICB0aGlzLndpZGdldE9wdGlvbnMuaXRlbUxhYmVsSHRtbENsYXNzLCAnYnRuJyk7XG4gICAgICAgICAgdGhpcy53aWRnZXRPcHRpb25zLml0ZW1MYWJlbEh0bWxDbGFzcyA9IGFkZENsYXNzZXMoXG4gICAgICAgICAgICB0aGlzLndpZGdldE9wdGlvbnMuaXRlbUxhYmVsSHRtbENsYXNzLCB0aGlzLm9wdGlvbnMuc3R5bGUgfHwgJ2J0bi1kZWZhdWx0Jyk7XG4gICAgICAgICAgdGhpcy53aWRnZXRPcHRpb25zLmZpZWxkSHRtbENsYXNzID0gYWRkQ2xhc3NlcyhcbiAgICAgICAgICAgIHRoaXMud2lkZ2V0T3B0aW9ucy5maWVsZEh0bWxDbGFzcywgJ3NyLW9ubHknKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICAgIC8vIFNpbmdsZSBidXR0b24gY29udHJvbHNcbiAgICAgICAgY2FzZSAnYnV0dG9uJzogY2FzZSAnc3VibWl0JzpcbiAgICAgICAgICB0aGlzLndpZGdldE9wdGlvbnMuZmllbGRIdG1sQ2xhc3MgPSBhZGRDbGFzc2VzKFxuICAgICAgICAgICAgdGhpcy53aWRnZXRPcHRpb25zLmZpZWxkSHRtbENsYXNzLCAnYnRuJyk7XG4gICAgICAgICAgdGhpcy53aWRnZXRPcHRpb25zLmZpZWxkSHRtbENsYXNzID0gYWRkQ2xhc3NlcyhcbiAgICAgICAgICAgIHRoaXMud2lkZ2V0T3B0aW9ucy5maWVsZEh0bWxDbGFzcywgdGhpcy5vcHRpb25zLnN0eWxlIHx8ICdidG4taW5mbycpO1xuICAgICAgICBicmVhaztcbiAgICAgICAgLy8gQ29udGFpbmVycyAtIGFycmF5cyBhbmQgZmllbGRzZXRzXG4gICAgICAgIGNhc2UgJ2FycmF5JzogY2FzZSAnZmllbGRzZXQnOiBjYXNlICdzZWN0aW9uJzogY2FzZSAnY29uZGl0aW9uYWwnOlxuICAgICAgICBjYXNlICdhZHZhbmNlZGZpZWxkc2V0JzogY2FzZSAnYXV0aGZpZWxkc2V0JzpcbiAgICAgICAgY2FzZSAnc2VsZWN0ZmllbGRzZXQnOiBjYXNlICdvcHRpb25maWVsZHNldCc6XG4gICAgICAgICAgdGhpcy5vcHRpb25zLm1lc3NhZ2VMb2NhdGlvbiA9ICd0b3AnO1xuICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAndGFiYXJyYXknOiBjYXNlICd0YWJzJzpcbiAgICAgICAgICB0aGlzLndpZGdldE9wdGlvbnMuaHRtbENsYXNzID0gYWRkQ2xhc3NlcyhcbiAgICAgICAgICAgIHRoaXMud2lkZ2V0T3B0aW9ucy5odG1sQ2xhc3MsICd0YWItY29udGVudCcpO1xuICAgICAgICAgIHRoaXMud2lkZ2V0T3B0aW9ucy5maWVsZEh0bWxDbGFzcyA9IGFkZENsYXNzZXMoXG4gICAgICAgICAgICB0aGlzLndpZGdldE9wdGlvbnMuZmllbGRIdG1sQ2xhc3MsICd0YWItcGFuZScpO1xuICAgICAgICAgIHRoaXMud2lkZ2V0T3B0aW9ucy5sYWJlbEh0bWxDbGFzcyA9IGFkZENsYXNzZXMoXG4gICAgICAgICAgICB0aGlzLndpZGdldE9wdGlvbnMubGFiZWxIdG1sQ2xhc3MsICduYXYgbmF2LXRhYnMnKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICAgIC8vICdBZGQnIGJ1dHRvbnMgLSByZWZlcmVuY2VzXG4gICAgICAgIGNhc2UgJyRyZWYnOlxuICAgICAgICAgIHRoaXMud2lkZ2V0T3B0aW9ucy5maWVsZEh0bWxDbGFzcyA9IGFkZENsYXNzZXMoXG4gICAgICAgICAgICB0aGlzLndpZGdldE9wdGlvbnMuZmllbGRIdG1sQ2xhc3MsICdidG4gcHVsbC1yaWdodCcpO1xuICAgICAgICAgIHRoaXMud2lkZ2V0T3B0aW9ucy5maWVsZEh0bWxDbGFzcyA9IGFkZENsYXNzZXMoXG4gICAgICAgICAgICB0aGlzLndpZGdldE9wdGlvbnMuZmllbGRIdG1sQ2xhc3MsIHRoaXMub3B0aW9ucy5zdHlsZSB8fCAnYnRuLWRlZmF1bHQnKTtcbiAgICAgICAgICB0aGlzLm9wdGlvbnMuaWNvbiA9ICdnbHlwaGljb24gZ2x5cGhpY29uLXBsdXMnO1xuICAgICAgICBicmVhaztcbiAgICAgICAgLy8gRGVmYXVsdCAtIGluY2x1ZGluZyByZWd1bGFyIGlucHV0c1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHRoaXMud2lkZ2V0T3B0aW9ucy5maWVsZEh0bWxDbGFzcyA9IGFkZENsYXNzZXMoXG4gICAgICAgICAgICB0aGlzLndpZGdldE9wdGlvbnMuZmllbGRIdG1sQ2xhc3MsICdmb3JtLWNvbnRyb2wnKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuZm9ybUNvbnRyb2wpIHtcbiAgICAgICAgdGhpcy51cGRhdGVIZWxwQmxvY2sodGhpcy5mb3JtQ29udHJvbC5zdGF0dXMpO1xuICAgICAgICB0aGlzLmZvcm1Db250cm9sLnN0YXR1c0NoYW5nZXMuc3Vic2NyaWJlKHN0YXR1cyA9PiB0aGlzLnVwZGF0ZUhlbHBCbG9jayhzdGF0dXMpKTtcblxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLmRlYnVnKSB7XG4gICAgICAgICAgbGV0IHZhcnM6IGFueVtdID0gW107XG4gICAgICAgICAgdGhpcy5kZWJ1Z091dHB1dCA9IF8ubWFwKHZhcnMsIHRoaXNWYXIgPT4gSlNPTi5zdHJpbmdpZnkodGhpc1ZhciwgbnVsbCwgMikpLmpvaW4oJ1xcbicpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB0aGlzLmZyYW1ld29ya0luaXRpYWxpemVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgfVxuXG4gIHVwZGF0ZUhlbHBCbG9jayhzdGF0dXMpIHtcbiAgICB0aGlzLm9wdGlvbnMuaGVscEJsb2NrID0gc3RhdHVzID09PSAnSU5WQUxJRCcgJiZcbiAgICAgIHRoaXMub3B0aW9ucy5lbmFibGVFcnJvclN0YXRlICYmIHRoaXMuZm9ybUNvbnRyb2wuZXJyb3JzICYmXG4gICAgICAodGhpcy5mb3JtQ29udHJvbC5kaXJ0eSB8fCB0aGlzLm9wdGlvbnMuZmVlZGJhY2tPblJlbmRlcikgP1xuICAgICAgICB0aGlzLmpzZi5mb3JtYXRFcnJvcnModGhpcy5mb3JtQ29udHJvbC5lcnJvcnMsIHRoaXMub3B0aW9ucy52YWxpZGF0aW9uTWVzc2FnZXMpIDpcbiAgICAgICAgdGhpcy5vcHRpb25zLmRlc2NyaXB0aW9uIHx8IHRoaXMub3B0aW9ucy5oZWxwIHx8IG51bGw7XG4gIH1cblxuICBzZXRUaXRsZSgpOiBzdHJpbmcge1xuICAgIHN3aXRjaCAodGhpcy5sYXlvdXROb2RlLnR5cGUpIHtcbiAgICAgIGNhc2UgJ2J1dHRvbic6IGNhc2UgJ2NoZWNrYm94JzogY2FzZSAnc2VjdGlvbic6IGNhc2UgJ2hlbHAnOiBjYXNlICdtc2cnOlxuICAgICAgY2FzZSAnc3VibWl0JzogY2FzZSAnbWVzc2FnZSc6IGNhc2UgJ3RhYmFycmF5JzogY2FzZSAndGFicyc6IGNhc2UgJyRyZWYnOlxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIGNhc2UgJ2FkdmFuY2VkZmllbGRzZXQnOlxuICAgICAgICB0aGlzLndpZGdldE9wdGlvbnMuZXhwYW5kYWJsZSA9IHRydWU7XG4gICAgICAgIHRoaXMud2lkZ2V0T3B0aW9ucy50aXRsZSA9ICdBZHZhbmNlZCBvcHRpb25zJztcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICBjYXNlICdhdXRoZmllbGRzZXQnOlxuICAgICAgICB0aGlzLndpZGdldE9wdGlvbnMuZXhwYW5kYWJsZSA9IHRydWU7XG4gICAgICAgIHRoaXMud2lkZ2V0T3B0aW9ucy50aXRsZSA9ICdBdXRoZW50aWNhdGlvbiBzZXR0aW5ncyc7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgY2FzZSAnZmllbGRzZXQnOlxuICAgICAgICB0aGlzLndpZGdldE9wdGlvbnMudGl0bGUgPSB0aGlzLm9wdGlvbnMudGl0bGU7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhpcy53aWRnZXRPcHRpb25zLnRpdGxlID0gbnVsbDtcbiAgICAgICAgcmV0dXJuIHRoaXMuanNmLnNldEl0ZW1UaXRsZSh0aGlzKTtcbiAgICB9XG4gIH1cblxuICByZW1vdmVJdGVtKCkge1xuICAgIHRoaXMuanNmLnJlbW92ZUl0ZW0odGhpcyk7XG4gIH1cbn1cbiJdfQ==