/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { JsonSchemaFormService } from '../json-schema-form.service';
var NumberComponent = /** @class */ (function () {
    function NumberComponent(jsf) {
        this.jsf = jsf;
        this.controlDisabled = false;
        this.boundControl = false;
        this.allowNegative = true;
        this.allowDecimal = true;
        this.allowExponents = false;
        this.lastValidNumber = '';
    }
    /**
     * @return {?}
     */
    NumberComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.options = this.layoutNode.options || {};
        this.jsf.initializeControl(this);
        if (this.layoutNode.dataType === 'integer') {
            this.allowDecimal = false;
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    NumberComponent.prototype.updateValue = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.jsf.updateValue(this, event.target.value);
    };
    NumberComponent.decorators = [
        { type: Component, args: [{
                    selector: 'number-widget',
                    template: "\n    <div [class]=\"options?.htmlClass || ''\">\n      <label *ngIf=\"options?.title\"\n        [attr.for]=\"'control' + layoutNode?._id\"\n        [class]=\"options?.labelHtmlClass || ''\"\n        [style.display]=\"options?.notitle ? 'none' : ''\"\n        [innerHTML]=\"options?.title\"></label>\n      <input *ngIf=\"boundControl\"\n        [formControl]=\"formControl\"\n        [attr.aria-describedby]=\"'control' + layoutNode?._id + 'Status'\"\n        [attr.max]=\"options?.maximum\"\n        [attr.min]=\"options?.minimum\"\n        [attr.placeholder]=\"options?.placeholder\"\n        [attr.required]=\"options?.required\"\n        [attr.readonly]=\"options?.readonly ? 'readonly' : null\"\n        [attr.step]=\"options?.multipleOf || options?.step || 'any'\"\n        [class]=\"options?.fieldHtmlClass || ''\"\n        [id]=\"'control' + layoutNode?._id\"\n        [name]=\"controlName\"\n        [readonly]=\"options?.readonly ? 'readonly' : null\"\n        [title]=\"lastValidNumber\"\n        [type]=\"layoutNode?.type === 'range' ? 'range' : 'number'\">\n      <input *ngIf=\"!boundControl\"\n        [attr.aria-describedby]=\"'control' + layoutNode?._id + 'Status'\"\n        [attr.max]=\"options?.maximum\"\n        [attr.min]=\"options?.minimum\"\n        [attr.placeholder]=\"options?.placeholder\"\n        [attr.required]=\"options?.required\"\n        [attr.readonly]=\"options?.readonly ? 'readonly' : null\"\n        [attr.step]=\"options?.multipleOf || options?.step || 'any'\"\n        [class]=\"options?.fieldHtmlClass || ''\"\n        [disabled]=\"controlDisabled\"\n        [id]=\"'control' + layoutNode?._id\"\n        [name]=\"controlName\"\n        [readonly]=\"options?.readonly ? 'readonly' : null\"\n        [title]=\"lastValidNumber\"\n        [type]=\"layoutNode?.type === 'range' ? 'range' : 'number'\"\n        [value]=\"controlValue\"\n        (input)=\"updateValue($event)\">\n      <span *ngIf=\"layoutNode?.type === 'range'\" [innerHTML]=\"controlValue\"></span>\n    </div>",
                },] },
    ];
    /** @nocollapse */
    NumberComponent.ctorParameters = function () { return [
        { type: JsonSchemaFormService }
    ]; };
    NumberComponent.propDecorators = {
        layoutNode: [{ type: Input }],
        layoutIndex: [{ type: Input }],
        dataIndex: [{ type: Input }]
    };
    return NumberComponent;
}());
export { NumberComponent };
if (false) {
    /** @type {?} */
    NumberComponent.prototype.formControl;
    /** @type {?} */
    NumberComponent.prototype.controlName;
    /** @type {?} */
    NumberComponent.prototype.controlValue;
    /** @type {?} */
    NumberComponent.prototype.controlDisabled;
    /** @type {?} */
    NumberComponent.prototype.boundControl;
    /** @type {?} */
    NumberComponent.prototype.options;
    /** @type {?} */
    NumberComponent.prototype.allowNegative;
    /** @type {?} */
    NumberComponent.prototype.allowDecimal;
    /** @type {?} */
    NumberComponent.prototype.allowExponents;
    /** @type {?} */
    NumberComponent.prototype.lastValidNumber;
    /** @type {?} */
    NumberComponent.prototype.layoutNode;
    /** @type {?} */
    NumberComponent.prototype.layoutIndex;
    /** @type {?} */
    NumberComponent.prototype.dataIndex;
    /** @type {?} */
    NumberComponent.prototype.jsf;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnVtYmVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nNi1qc29uLXNjaGVtYS1mb3JtLyIsInNvdXJjZXMiOlsibGliL3dpZGdldC1saWJyYXJ5L251bWJlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBR3pELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDOztJQTZEbEUseUJBQ1U7UUFBQSxRQUFHLEdBQUgsR0FBRzsrQkFaSyxLQUFLOzRCQUNSLEtBQUs7NkJBRUosSUFBSTs0QkFDTCxJQUFJOzhCQUNGLEtBQUs7K0JBQ0osRUFBRTtLQU9mOzs7O0lBRUwsa0NBQVE7OztJQUFSO1FBQ0UsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUM7UUFDN0MsSUFBSSxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNqQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQUMsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7U0FBRTtLQUMzRTs7Ozs7SUFFRCxxQ0FBVzs7OztJQUFYLFVBQVksS0FBSztRQUNmLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ2hEOztnQkF2RUYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxlQUFlO29CQUN6QixRQUFRLEVBQUUscStEQXdDRDtpQkFDVjs7OztnQkE3Q1EscUJBQXFCOzs7NkJBeUQzQixLQUFLOzhCQUNMLEtBQUs7NEJBQ0wsS0FBSzs7MEJBOURSOztTQWlEYSxlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBYnN0cmFjdENvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmltcG9ydCB7IEpzb25TY2hlbWFGb3JtU2VydmljZSB9IGZyb20gJy4uL2pzb24tc2NoZW1hLWZvcm0uc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ251bWJlci13aWRnZXQnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgW2NsYXNzXT1cIm9wdGlvbnM/Lmh0bWxDbGFzcyB8fCAnJ1wiPlxuICAgICAgPGxhYmVsICpuZ0lmPVwib3B0aW9ucz8udGl0bGVcIlxuICAgICAgICBbYXR0ci5mb3JdPVwiJ2NvbnRyb2wnICsgbGF5b3V0Tm9kZT8uX2lkXCJcbiAgICAgICAgW2NsYXNzXT1cIm9wdGlvbnM/LmxhYmVsSHRtbENsYXNzIHx8ICcnXCJcbiAgICAgICAgW3N0eWxlLmRpc3BsYXldPVwib3B0aW9ucz8ubm90aXRsZSA/ICdub25lJyA6ICcnXCJcbiAgICAgICAgW2lubmVySFRNTF09XCJvcHRpb25zPy50aXRsZVwiPjwvbGFiZWw+XG4gICAgICA8aW5wdXQgKm5nSWY9XCJib3VuZENvbnRyb2xcIlxuICAgICAgICBbZm9ybUNvbnRyb2xdPVwiZm9ybUNvbnRyb2xcIlxuICAgICAgICBbYXR0ci5hcmlhLWRlc2NyaWJlZGJ5XT1cIidjb250cm9sJyArIGxheW91dE5vZGU/Ll9pZCArICdTdGF0dXMnXCJcbiAgICAgICAgW2F0dHIubWF4XT1cIm9wdGlvbnM/Lm1heGltdW1cIlxuICAgICAgICBbYXR0ci5taW5dPVwib3B0aW9ucz8ubWluaW11bVwiXG4gICAgICAgIFthdHRyLnBsYWNlaG9sZGVyXT1cIm9wdGlvbnM/LnBsYWNlaG9sZGVyXCJcbiAgICAgICAgW2F0dHIucmVxdWlyZWRdPVwib3B0aW9ucz8ucmVxdWlyZWRcIlxuICAgICAgICBbYXR0ci5yZWFkb25seV09XCJvcHRpb25zPy5yZWFkb25seSA/ICdyZWFkb25seScgOiBudWxsXCJcbiAgICAgICAgW2F0dHIuc3RlcF09XCJvcHRpb25zPy5tdWx0aXBsZU9mIHx8IG9wdGlvbnM/LnN0ZXAgfHwgJ2FueSdcIlxuICAgICAgICBbY2xhc3NdPVwib3B0aW9ucz8uZmllbGRIdG1sQ2xhc3MgfHwgJydcIlxuICAgICAgICBbaWRdPVwiJ2NvbnRyb2wnICsgbGF5b3V0Tm9kZT8uX2lkXCJcbiAgICAgICAgW25hbWVdPVwiY29udHJvbE5hbWVcIlxuICAgICAgICBbcmVhZG9ubHldPVwib3B0aW9ucz8ucmVhZG9ubHkgPyAncmVhZG9ubHknIDogbnVsbFwiXG4gICAgICAgIFt0aXRsZV09XCJsYXN0VmFsaWROdW1iZXJcIlxuICAgICAgICBbdHlwZV09XCJsYXlvdXROb2RlPy50eXBlID09PSAncmFuZ2UnID8gJ3JhbmdlJyA6ICdudW1iZXInXCI+XG4gICAgICA8aW5wdXQgKm5nSWY9XCIhYm91bmRDb250cm9sXCJcbiAgICAgICAgW2F0dHIuYXJpYS1kZXNjcmliZWRieV09XCInY29udHJvbCcgKyBsYXlvdXROb2RlPy5faWQgKyAnU3RhdHVzJ1wiXG4gICAgICAgIFthdHRyLm1heF09XCJvcHRpb25zPy5tYXhpbXVtXCJcbiAgICAgICAgW2F0dHIubWluXT1cIm9wdGlvbnM/Lm1pbmltdW1cIlxuICAgICAgICBbYXR0ci5wbGFjZWhvbGRlcl09XCJvcHRpb25zPy5wbGFjZWhvbGRlclwiXG4gICAgICAgIFthdHRyLnJlcXVpcmVkXT1cIm9wdGlvbnM/LnJlcXVpcmVkXCJcbiAgICAgICAgW2F0dHIucmVhZG9ubHldPVwib3B0aW9ucz8ucmVhZG9ubHkgPyAncmVhZG9ubHknIDogbnVsbFwiXG4gICAgICAgIFthdHRyLnN0ZXBdPVwib3B0aW9ucz8ubXVsdGlwbGVPZiB8fCBvcHRpb25zPy5zdGVwIHx8ICdhbnknXCJcbiAgICAgICAgW2NsYXNzXT1cIm9wdGlvbnM/LmZpZWxkSHRtbENsYXNzIHx8ICcnXCJcbiAgICAgICAgW2Rpc2FibGVkXT1cImNvbnRyb2xEaXNhYmxlZFwiXG4gICAgICAgIFtpZF09XCInY29udHJvbCcgKyBsYXlvdXROb2RlPy5faWRcIlxuICAgICAgICBbbmFtZV09XCJjb250cm9sTmFtZVwiXG4gICAgICAgIFtyZWFkb25seV09XCJvcHRpb25zPy5yZWFkb25seSA/ICdyZWFkb25seScgOiBudWxsXCJcbiAgICAgICAgW3RpdGxlXT1cImxhc3RWYWxpZE51bWJlclwiXG4gICAgICAgIFt0eXBlXT1cImxheW91dE5vZGU/LnR5cGUgPT09ICdyYW5nZScgPyAncmFuZ2UnIDogJ251bWJlcidcIlxuICAgICAgICBbdmFsdWVdPVwiY29udHJvbFZhbHVlXCJcbiAgICAgICAgKGlucHV0KT1cInVwZGF0ZVZhbHVlKCRldmVudClcIj5cbiAgICAgIDxzcGFuICpuZ0lmPVwibGF5b3V0Tm9kZT8udHlwZSA9PT0gJ3JhbmdlJ1wiIFtpbm5lckhUTUxdPVwiY29udHJvbFZhbHVlXCI+PC9zcGFuPlxuICAgIDwvZGl2PmAsXG59KVxuZXhwb3J0IGNsYXNzIE51bWJlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIGZvcm1Db250cm9sOiBBYnN0cmFjdENvbnRyb2w7XG4gIGNvbnRyb2xOYW1lOiBzdHJpbmc7XG4gIGNvbnRyb2xWYWx1ZTogYW55O1xuICBjb250cm9sRGlzYWJsZWQgPSBmYWxzZTtcbiAgYm91bmRDb250cm9sID0gZmFsc2U7XG4gIG9wdGlvbnM6IGFueTtcbiAgYWxsb3dOZWdhdGl2ZSA9IHRydWU7XG4gIGFsbG93RGVjaW1hbCA9IHRydWU7XG4gIGFsbG93RXhwb25lbnRzID0gZmFsc2U7XG4gIGxhc3RWYWxpZE51bWJlciA9ICcnO1xuICBASW5wdXQoKSBsYXlvdXROb2RlOiBhbnk7XG4gIEBJbnB1dCgpIGxheW91dEluZGV4OiBudW1iZXJbXTtcbiAgQElucHV0KCkgZGF0YUluZGV4OiBudW1iZXJbXTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGpzZjogSnNvblNjaGVtYUZvcm1TZXJ2aWNlXG4gICkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5vcHRpb25zID0gdGhpcy5sYXlvdXROb2RlLm9wdGlvbnMgfHwge307XG4gICAgdGhpcy5qc2YuaW5pdGlhbGl6ZUNvbnRyb2wodGhpcyk7XG4gICAgaWYgKHRoaXMubGF5b3V0Tm9kZS5kYXRhVHlwZSA9PT0gJ2ludGVnZXInKSB7IHRoaXMuYWxsb3dEZWNpbWFsID0gZmFsc2U7IH1cbiAgfVxuXG4gIHVwZGF0ZVZhbHVlKGV2ZW50KSB7XG4gICAgdGhpcy5qc2YudXBkYXRlVmFsdWUodGhpcywgZXZlbnQudGFyZ2V0LnZhbHVlKTtcbiAgfVxufVxuIl19