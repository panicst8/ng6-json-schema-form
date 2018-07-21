/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { JsonSchemaFormService } from '../json-schema-form.service';
var MessageComponent = /** @class */ (function () {
    function MessageComponent(jsf) {
        this.jsf = jsf;
        this.message = null;
    }
    /**
     * @return {?}
     */
    MessageComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.options = this.layoutNode.options || {};
        this.message = this.options.help || this.options.helpvalue ||
            this.options.msg || this.options.message;
    };
    MessageComponent.decorators = [
        { type: Component, args: [{
                    selector: 'message-widget',
                    template: "\n    <span *ngIf=\"message\"\n      [class]=\"options?.labelHtmlClass || ''\"\n      [innerHTML]=\"message\"></span>",
                },] },
    ];
    /** @nocollapse */
    MessageComponent.ctorParameters = function () { return [
        { type: JsonSchemaFormService }
    ]; };
    MessageComponent.propDecorators = {
        layoutNode: [{ type: Input }],
        layoutIndex: [{ type: Input }],
        dataIndex: [{ type: Input }]
    };
    return MessageComponent;
}());
export { MessageComponent };
if (false) {
    /** @type {?} */
    MessageComponent.prototype.options;
    /** @type {?} */
    MessageComponent.prototype.message;
    /** @type {?} */
    MessageComponent.prototype.layoutNode;
    /** @type {?} */
    MessageComponent.prototype.layoutIndex;
    /** @type {?} */
    MessageComponent.prototype.dataIndex;
    /** @type {?} */
    MessageComponent.prototype.jsf;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZzYtanNvbi1zY2hlbWEtZm9ybS8iLCJzb3VyY2VzIjpbImxpYi93aWRnZXQtbGlicmFyeS9tZXNzYWdlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFHekQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7O0lBZ0JsRSwwQkFDVTtRQUFBLFFBQUcsR0FBSCxHQUFHO3VCQU5LLElBQUk7S0FPakI7Ozs7SUFFTCxtQ0FBUTs7O0lBQVI7UUFDRSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQztRQUM3QyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUztZQUN4RCxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQztLQUM1Qzs7Z0JBdEJGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsZ0JBQWdCO29CQUMxQixRQUFRLEVBQUUsdUhBR3dCO2lCQUNuQzs7OztnQkFSUSxxQkFBcUI7Ozs2QkFZM0IsS0FBSzs4QkFDTCxLQUFLOzRCQUNMLEtBQUs7OzJCQWpCUjs7U0FZYSxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1Hcm91cCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuaW1wb3J0IHsgSnNvblNjaGVtYUZvcm1TZXJ2aWNlIH0gZnJvbSAnLi4vanNvbi1zY2hlbWEtZm9ybS5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWVzc2FnZS13aWRnZXQnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxzcGFuICpuZ0lmPVwibWVzc2FnZVwiXG4gICAgICBbY2xhc3NdPVwib3B0aW9ucz8ubGFiZWxIdG1sQ2xhc3MgfHwgJydcIlxuICAgICAgW2lubmVySFRNTF09XCJtZXNzYWdlXCI+PC9zcGFuPmAsXG59KVxuZXhwb3J0IGNsYXNzIE1lc3NhZ2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBvcHRpb25zOiBhbnk7XG4gIG1lc3NhZ2U6IHN0cmluZyA9IG51bGw7XG4gIEBJbnB1dCgpIGxheW91dE5vZGU6IGFueTtcbiAgQElucHV0KCkgbGF5b3V0SW5kZXg6IG51bWJlcltdO1xuICBASW5wdXQoKSBkYXRhSW5kZXg6IG51bWJlcltdO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUganNmOiBKc29uU2NoZW1hRm9ybVNlcnZpY2VcbiAgKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLm9wdGlvbnMgPSB0aGlzLmxheW91dE5vZGUub3B0aW9ucyB8fCB7fTtcbiAgICB0aGlzLm1lc3NhZ2UgPSB0aGlzLm9wdGlvbnMuaGVscCB8fCB0aGlzLm9wdGlvbnMuaGVscHZhbHVlIHx8XG4gICAgICB0aGlzLm9wdGlvbnMubXNnIHx8IHRoaXMub3B0aW9ucy5tZXNzYWdlO1xuICB9XG59XG4iXX0=