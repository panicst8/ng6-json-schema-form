/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, ComponentFactoryResolver, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { JsonSchemaFormService } from '../json-schema-form.service';
var SelectFrameworkComponent = /** @class */ (function () {
    function SelectFrameworkComponent(componentFactory, jsf) {
        this.componentFactory = componentFactory;
        this.jsf = jsf;
        this.newComponent = null;
    }
    /**
     * @return {?}
     */
    SelectFrameworkComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.updateComponent();
    };
    /**
     * @return {?}
     */
    SelectFrameworkComponent.prototype.ngOnChanges = /**
     * @return {?}
     */
    function () {
        this.updateComponent();
    };
    /**
     * @return {?}
     */
    SelectFrameworkComponent.prototype.updateComponent = /**
     * @return {?}
     */
    function () {
        if (!this.newComponent && this.jsf.framework) {
            this.newComponent = this.widgetContainer.createComponent(this.componentFactory.resolveComponentFactory(this.jsf.framework));
        }
        if (this.newComponent) {
            try {
                for (var _a = tslib_1.__values(['layoutNode', 'layoutIndex', 'dataIndex']), _b = _a.next(); !_b.done; _b = _a.next()) {
                    var input = _b.value;
                    this.newComponent.instance[input] = this[input];
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
        var e_1, _c;
    };
    SelectFrameworkComponent.decorators = [
        { type: Component, args: [{
                    selector: 'select-framework-widget',
                    template: "<div #widgetContainer></div>",
                },] },
    ];
    /** @nocollapse */
    SelectFrameworkComponent.ctorParameters = function () { return [
        { type: ComponentFactoryResolver },
        { type: JsonSchemaFormService }
    ]; };
    SelectFrameworkComponent.propDecorators = {
        layoutNode: [{ type: Input }],
        layoutIndex: [{ type: Input }],
        dataIndex: [{ type: Input }],
        widgetContainer: [{ type: ViewChild, args: ['widgetContainer', { read: ViewContainerRef },] }]
    };
    return SelectFrameworkComponent;
}());
export { SelectFrameworkComponent };
if (false) {
    /** @type {?} */
    SelectFrameworkComponent.prototype.newComponent;
    /** @type {?} */
    SelectFrameworkComponent.prototype.layoutNode;
    /** @type {?} */
    SelectFrameworkComponent.prototype.layoutIndex;
    /** @type {?} */
    SelectFrameworkComponent.prototype.dataIndex;
    /** @type {?} */
    SelectFrameworkComponent.prototype.widgetContainer;
    /** @type {?} */
    SelectFrameworkComponent.prototype.componentFactory;
    /** @type {?} */
    SelectFrameworkComponent.prototype.jsf;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LWZyYW1ld29yay5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZzYtanNvbi1zY2hlbWEtZm9ybS8iLCJzb3VyY2VzIjpbImxpYi93aWRnZXQtbGlicmFyeS9zZWxlY3QtZnJhbWV3b3JrLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQUUsd0JBQXdCLEVBQWdCLEtBQUssRUFDckMsU0FBUyxFQUFFLGdCQUFnQixFQUMvQyxNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQzs7SUFjbEUsa0NBQ1Usa0JBQ0E7UUFEQSxxQkFBZ0IsR0FBaEIsZ0JBQWdCO1FBQ2hCLFFBQUcsR0FBSCxHQUFHOzRCQVRxQixJQUFJO0tBVWpDOzs7O0lBRUwsMkNBQVE7OztJQUFSO1FBQ0UsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO0tBQ3hCOzs7O0lBRUQsOENBQVc7OztJQUFYO1FBQ0UsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO0tBQ3hCOzs7O0lBRUQsa0RBQWU7OztJQUFmO1FBQ0UsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUM3QyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsZUFBZSxDQUN0RCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FDbEUsQ0FBQztTQUNIO1FBQ0QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7O2dCQUN0QixHQUFHLENBQUMsQ0FBYyxJQUFBLEtBQUEsaUJBQUEsQ0FBQyxZQUFZLEVBQUUsYUFBYSxFQUFFLFdBQVcsQ0FBQyxDQUFBLGdCQUFBO29CQUF2RCxJQUFJLEtBQUssV0FBQTtvQkFDWixJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQ2pEOzs7Ozs7Ozs7U0FDRjs7S0FDRjs7Z0JBcENGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUseUJBQXlCO29CQUNuQyxRQUFRLEVBQUUsOEJBQThCO2lCQUN6Qzs7OztnQkFUWSx3QkFBd0I7Z0JBSTVCLHFCQUFxQjs7OzZCQVEzQixLQUFLOzhCQUNMLEtBQUs7NEJBQ0wsS0FBSztrQ0FDTCxTQUFTLFNBQUMsaUJBQWlCLEVBQUUsRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUU7O21DQWhCMUQ7O1NBV2Esd0JBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LCBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIENvbXBvbmVudFJlZiwgSW5wdXQsXG4gIE9uQ2hhbmdlcywgT25Jbml0LCBWaWV3Q2hpbGQsIFZpZXdDb250YWluZXJSZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IEpzb25TY2hlbWFGb3JtU2VydmljZSB9IGZyb20gJy4uL2pzb24tc2NoZW1hLWZvcm0uc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3NlbGVjdC1mcmFtZXdvcmstd2lkZ2V0JyxcbiAgdGVtcGxhdGU6IGA8ZGl2ICN3aWRnZXRDb250YWluZXI+PC9kaXY+YCxcbn0pXG5leHBvcnQgY2xhc3MgU2VsZWN0RnJhbWV3b3JrQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzLCBPbkluaXQge1xuICBuZXdDb21wb25lbnQ6IENvbXBvbmVudFJlZjxhbnk+ID0gbnVsbDtcbiAgQElucHV0KCkgbGF5b3V0Tm9kZTogYW55O1xuICBASW5wdXQoKSBsYXlvdXRJbmRleDogbnVtYmVyW107XG4gIEBJbnB1dCgpIGRhdGFJbmRleDogbnVtYmVyW107XG4gIEBWaWV3Q2hpbGQoJ3dpZGdldENvbnRhaW5lcicsIHsgcmVhZDogVmlld0NvbnRhaW5lclJlZiB9KVxuICAgIHdpZGdldENvbnRhaW5lcjogVmlld0NvbnRhaW5lclJlZjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGNvbXBvbmVudEZhY3Rvcnk6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICBwcml2YXRlIGpzZjogSnNvblNjaGVtYUZvcm1TZXJ2aWNlXG4gICkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy51cGRhdGVDb21wb25lbnQoKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKCkge1xuICAgIHRoaXMudXBkYXRlQ29tcG9uZW50KCk7XG4gIH1cblxuICB1cGRhdGVDb21wb25lbnQoKSB7XG4gICAgaWYgKCF0aGlzLm5ld0NvbXBvbmVudCAmJiB0aGlzLmpzZi5mcmFtZXdvcmspIHtcbiAgICAgIHRoaXMubmV3Q29tcG9uZW50ID0gdGhpcy53aWRnZXRDb250YWluZXIuY3JlYXRlQ29tcG9uZW50KFxuICAgICAgICB0aGlzLmNvbXBvbmVudEZhY3RvcnkucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkodGhpcy5qc2YuZnJhbWV3b3JrKVxuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKHRoaXMubmV3Q29tcG9uZW50KSB7XG4gICAgICBmb3IgKGxldCBpbnB1dCBvZiBbJ2xheW91dE5vZGUnLCAnbGF5b3V0SW5kZXgnLCAnZGF0YUluZGV4J10pIHtcbiAgICAgICAgdGhpcy5uZXdDb21wb25lbnQuaW5zdGFuY2VbaW5wdXRdID0gdGhpc1tpbnB1dF07XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0=