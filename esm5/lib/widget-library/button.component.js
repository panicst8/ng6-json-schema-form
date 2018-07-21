/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { JsonSchemaFormService } from '../json-schema-form.service';
var ButtonComponent = /** @class */ (function () {
    function ButtonComponent(jsf) {
        this.jsf = jsf;
        this.controlDisabled = false;
        this.boundControl = false;
    }
    /**
     * @return {?}
     */
    ButtonComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.options = this.layoutNode.options || {};
        this.jsf.initializeControl(this);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    ButtonComponent.prototype.updateValue = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (typeof this.options.onClick === 'function') {
            this.options.onClick(event);
        }
        else {
            this.jsf.updateValue(this, event.target.value);
        }
    };
    ButtonComponent.decorators = [
        { type: Component, args: [{
                    selector: 'button-widget',
                    template: "\n    <div\n      [class]=\"options?.htmlClass || ''\">\n      <button\n        [attr.readonly]=\"options?.readonly ? 'readonly' : null\"\n        [attr.aria-describedby]=\"'control' + layoutNode?._id + 'Status'\"\n        [class]=\"options?.fieldHtmlClass || ''\"\n        [disabled]=\"controlDisabled\"\n        [name]=\"controlName\"\n        [type]=\"layoutNode?.type\"\n        [value]=\"controlValue\"\n        (click)=\"updateValue($event)\">\n        <span *ngIf=\"options?.icon || options?.title\"\n          [class]=\"options?.icon\"\n          [innerHTML]=\"options?.title\"></span>\n      </button>\n    </div>",
                },] },
    ];
    /** @nocollapse */
    ButtonComponent.ctorParameters = function () { return [
        { type: JsonSchemaFormService }
    ]; };
    ButtonComponent.propDecorators = {
        layoutNode: [{ type: Input }],
        layoutIndex: [{ type: Input }],
        dataIndex: [{ type: Input }]
    };
    return ButtonComponent;
}());
export { ButtonComponent };
if (false) {
    /** @type {?} */
    ButtonComponent.prototype.formControl;
    /** @type {?} */
    ButtonComponent.prototype.controlName;
    /** @type {?} */
    ButtonComponent.prototype.controlValue;
    /** @type {?} */
    ButtonComponent.prototype.controlDisabled;
    /** @type {?} */
    ButtonComponent.prototype.boundControl;
    /** @type {?} */
    ButtonComponent.prototype.options;
    /** @type {?} */
    ButtonComponent.prototype.layoutNode;
    /** @type {?} */
    ButtonComponent.prototype.layoutIndex;
    /** @type {?} */
    ButtonComponent.prototype.dataIndex;
    /** @type {?} */
    ButtonComponent.prototype.jsf;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nNi1qc29uLXNjaGVtYS1mb3JtLyIsInNvdXJjZXMiOlsibGliL3dpZGdldC1saWJyYXJ5L2J1dHRvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBR3pELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDOztJQWlDbEUseUJBQ1U7UUFBQSxRQUFHLEdBQUgsR0FBRzsrQkFSSyxLQUFLOzRCQUNSLEtBQUs7S0FRZjs7OztJQUVMLGtDQUFROzs7SUFBUjtRQUNFLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFDO1FBQzdDLElBQUksQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDbEM7Ozs7O0lBRUQscUNBQVc7Ozs7SUFBWCxVQUFZLEtBQUs7UUFDZixFQUFFLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxLQUFLLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDL0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDN0I7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ2hEO0tBQ0Y7O2dCQTlDRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGVBQWU7b0JBQ3pCLFFBQVEsRUFBRSxnbkJBZ0JEO2lCQUNWOzs7O2dCQXJCUSxxQkFBcUI7Ozs2QkE2QjNCLEtBQUs7OEJBQ0wsS0FBSzs0QkFDTCxLQUFLOzswQkFsQ1I7O1NBeUJhLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFic3RyYWN0Q29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuaW1wb3J0IHsgSnNvblNjaGVtYUZvcm1TZXJ2aWNlIH0gZnJvbSAnLi4vanNvbi1zY2hlbWEtZm9ybS5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYnV0dG9uLXdpZGdldCcsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdlxuICAgICAgW2NsYXNzXT1cIm9wdGlvbnM/Lmh0bWxDbGFzcyB8fCAnJ1wiPlxuICAgICAgPGJ1dHRvblxuICAgICAgICBbYXR0ci5yZWFkb25seV09XCJvcHRpb25zPy5yZWFkb25seSA/ICdyZWFkb25seScgOiBudWxsXCJcbiAgICAgICAgW2F0dHIuYXJpYS1kZXNjcmliZWRieV09XCInY29udHJvbCcgKyBsYXlvdXROb2RlPy5faWQgKyAnU3RhdHVzJ1wiXG4gICAgICAgIFtjbGFzc109XCJvcHRpb25zPy5maWVsZEh0bWxDbGFzcyB8fCAnJ1wiXG4gICAgICAgIFtkaXNhYmxlZF09XCJjb250cm9sRGlzYWJsZWRcIlxuICAgICAgICBbbmFtZV09XCJjb250cm9sTmFtZVwiXG4gICAgICAgIFt0eXBlXT1cImxheW91dE5vZGU/LnR5cGVcIlxuICAgICAgICBbdmFsdWVdPVwiY29udHJvbFZhbHVlXCJcbiAgICAgICAgKGNsaWNrKT1cInVwZGF0ZVZhbHVlKCRldmVudClcIj5cbiAgICAgICAgPHNwYW4gKm5nSWY9XCJvcHRpb25zPy5pY29uIHx8IG9wdGlvbnM/LnRpdGxlXCJcbiAgICAgICAgICBbY2xhc3NdPVwib3B0aW9ucz8uaWNvblwiXG4gICAgICAgICAgW2lubmVySFRNTF09XCJvcHRpb25zPy50aXRsZVwiPjwvc3Bhbj5cbiAgICAgIDwvYnV0dG9uPlxuICAgIDwvZGl2PmAsXG59KVxuZXhwb3J0IGNsYXNzIEJ1dHRvbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIGZvcm1Db250cm9sOiBBYnN0cmFjdENvbnRyb2w7XG4gIGNvbnRyb2xOYW1lOiBzdHJpbmc7XG4gIGNvbnRyb2xWYWx1ZTogYW55O1xuICBjb250cm9sRGlzYWJsZWQgPSBmYWxzZTtcbiAgYm91bmRDb250cm9sID0gZmFsc2U7XG4gIG9wdGlvbnM6IGFueTtcbiAgQElucHV0KCkgbGF5b3V0Tm9kZTogYW55O1xuICBASW5wdXQoKSBsYXlvdXRJbmRleDogbnVtYmVyW107XG4gIEBJbnB1dCgpIGRhdGFJbmRleDogbnVtYmVyW107XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBqc2Y6IEpzb25TY2hlbWFGb3JtU2VydmljZVxuICApIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMub3B0aW9ucyA9IHRoaXMubGF5b3V0Tm9kZS5vcHRpb25zIHx8IHt9O1xuICAgIHRoaXMuanNmLmluaXRpYWxpemVDb250cm9sKHRoaXMpO1xuICB9XG5cbiAgdXBkYXRlVmFsdWUoZXZlbnQpIHtcbiAgICBpZiAodHlwZW9mIHRoaXMub3B0aW9ucy5vbkNsaWNrID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aGlzLm9wdGlvbnMub25DbGljayhldmVudCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuanNmLnVwZGF0ZVZhbHVlKHRoaXMsIGV2ZW50LnRhcmdldC52YWx1ZSk7XG4gICAgfVxuICB9XG59XG4iXX0=