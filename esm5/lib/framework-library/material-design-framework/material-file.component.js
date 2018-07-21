/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { JsonSchemaFormService } from '../../json-schema-form.service';
var MaterialFileComponent = /** @class */ (function () {
    function MaterialFileComponent(jsf) {
        this.jsf = jsf;
        this.controlDisabled = false;
        this.boundControl = false;
    }
    /**
     * @return {?}
     */
    MaterialFileComponent.prototype.ngOnInit = /**
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
    MaterialFileComponent.prototype.updateValue = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.jsf.updateValue(this, event.target.value);
    };
    MaterialFileComponent.decorators = [
        { type: Component, args: [{
                    selector: 'material-file-widget',
                    template: "",
                },] },
    ];
    /** @nocollapse */
    MaterialFileComponent.ctorParameters = function () { return [
        { type: JsonSchemaFormService }
    ]; };
    MaterialFileComponent.propDecorators = {
        layoutNode: [{ type: Input }],
        layoutIndex: [{ type: Input }],
        dataIndex: [{ type: Input }]
    };
    return MaterialFileComponent;
}());
export { MaterialFileComponent };
if (false) {
    /** @type {?} */
    MaterialFileComponent.prototype.formControl;
    /** @type {?} */
    MaterialFileComponent.prototype.controlName;
    /** @type {?} */
    MaterialFileComponent.prototype.controlValue;
    /** @type {?} */
    MaterialFileComponent.prototype.controlDisabled;
    /** @type {?} */
    MaterialFileComponent.prototype.boundControl;
    /** @type {?} */
    MaterialFileComponent.prototype.options;
    /** @type {?} */
    MaterialFileComponent.prototype.layoutNode;
    /** @type {?} */
    MaterialFileComponent.prototype.layoutIndex;
    /** @type {?} */
    MaterialFileComponent.prototype.dataIndex;
    /** @type {?} */
    MaterialFileComponent.prototype.jsf;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0ZXJpYWwtZmlsZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZzYtanNvbi1zY2hlbWEtZm9ybS8iLCJzb3VyY2VzIjpbImxpYi9mcmFtZXdvcmstbGlicmFyeS9tYXRlcmlhbC1kZXNpZ24tZnJhbWV3b3JrL21hdGVyaWFsLWZpbGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUd6RCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQzs7SUFtQnJFLCtCQUNVO1FBQUEsUUFBRyxHQUFILEdBQUc7K0JBUkssS0FBSzs0QkFDUixLQUFLO0tBUWY7Ozs7SUFFTCx3Q0FBUTs7O0lBQVI7UUFDRSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQztRQUM3QyxJQUFJLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ2xDOzs7OztJQUVELDJDQUFXOzs7O0lBQVgsVUFBWSxLQUFLO1FBQ2YsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDaEQ7O2dCQTFCRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLHNCQUFzQjtvQkFDaEMsUUFBUSxFQUFFLEVBQUU7aUJBQ2I7Ozs7Z0JBUFEscUJBQXFCOzs7NkJBZTNCLEtBQUs7OEJBQ0wsS0FBSzs0QkFDTCxLQUFLOztnQ0FwQlI7O1NBV2EscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBYnN0cmFjdENvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmltcG9ydCB7IEpzb25TY2hlbWFGb3JtU2VydmljZSB9IGZyb20gJy4uLy4uL2pzb24tc2NoZW1hLWZvcm0uc2VydmljZSc7XG5cbi8vIFRPRE86IEFkZCB0aGlzIGNvbnRyb2xcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWF0ZXJpYWwtZmlsZS13aWRnZXQnLFxuICB0ZW1wbGF0ZTogYGAsXG59KVxuZXhwb3J0IGNsYXNzIE1hdGVyaWFsRmlsZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIGZvcm1Db250cm9sOiBBYnN0cmFjdENvbnRyb2w7XG4gIGNvbnRyb2xOYW1lOiBzdHJpbmc7XG4gIGNvbnRyb2xWYWx1ZTogYW55O1xuICBjb250cm9sRGlzYWJsZWQgPSBmYWxzZTtcbiAgYm91bmRDb250cm9sID0gZmFsc2U7XG4gIG9wdGlvbnM6IGFueTtcbiAgQElucHV0KCkgbGF5b3V0Tm9kZTogYW55O1xuICBASW5wdXQoKSBsYXlvdXRJbmRleDogbnVtYmVyW107XG4gIEBJbnB1dCgpIGRhdGFJbmRleDogbnVtYmVyW107XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBqc2Y6IEpzb25TY2hlbWFGb3JtU2VydmljZVxuICApIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMub3B0aW9ucyA9IHRoaXMubGF5b3V0Tm9kZS5vcHRpb25zIHx8IHt9O1xuICAgIHRoaXMuanNmLmluaXRpYWxpemVDb250cm9sKHRoaXMpO1xuICB9XG5cbiAgdXBkYXRlVmFsdWUoZXZlbnQpIHtcbiAgICB0aGlzLmpzZi51cGRhdGVWYWx1ZSh0aGlzLCBldmVudC50YXJnZXQudmFsdWUpO1xuICB9XG59XG4iXX0=