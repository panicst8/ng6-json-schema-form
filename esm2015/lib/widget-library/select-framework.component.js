/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, ComponentFactoryResolver, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { JsonSchemaFormService } from '../json-schema-form.service';
export class SelectFrameworkComponent {
    /**
     * @param {?} componentFactory
     * @param {?} jsf
     */
    constructor(componentFactory, jsf) {
        this.componentFactory = componentFactory;
        this.jsf = jsf;
        this.newComponent = null;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.updateComponent();
    }
    /**
     * @return {?}
     */
    ngOnChanges() {
        this.updateComponent();
    }
    /**
     * @return {?}
     */
    updateComponent() {
        if (!this.newComponent && this.jsf.framework) {
            this.newComponent = this.widgetContainer.createComponent(this.componentFactory.resolveComponentFactory(this.jsf.framework));
        }
        if (this.newComponent) {
            for (let input of ['layoutNode', 'layoutIndex', 'dataIndex']) {
                this.newComponent.instance[input] = this[input];
            }
        }
    }
}
SelectFrameworkComponent.decorators = [
    { type: Component, args: [{
                selector: 'select-framework-widget',
                template: `<div #widgetContainer></div>`,
            },] },
];
/** @nocollapse */
SelectFrameworkComponent.ctorParameters = () => [
    { type: ComponentFactoryResolver },
    { type: JsonSchemaFormService }
];
SelectFrameworkComponent.propDecorators = {
    layoutNode: [{ type: Input }],
    layoutIndex: [{ type: Input }],
    dataIndex: [{ type: Input }],
    widgetContainer: [{ type: ViewChild, args: ['widgetContainer', { read: ViewContainerRef },] }]
};
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LWZyYW1ld29yay5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZzYtanNvbi1zY2hlbWEtZm9ybS8iLCJzb3VyY2VzIjpbImxpYi93aWRnZXQtbGlicmFyeS9zZWxlY3QtZnJhbWV3b3JrLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFBRSx3QkFBd0IsRUFBZ0IsS0FBSyxFQUNyQyxTQUFTLEVBQUUsZ0JBQWdCLEVBQy9DLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBTXBFLE1BQU07Ozs7O0lBUUosWUFDVSxrQkFDQTtRQURBLHFCQUFnQixHQUFoQixnQkFBZ0I7UUFDaEIsUUFBRyxHQUFILEdBQUc7NEJBVHFCLElBQUk7S0FVakM7Ozs7SUFFTCxRQUFRO1FBQ04sSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO0tBQ3hCOzs7O0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztLQUN4Qjs7OztJQUVELGVBQWU7UUFDYixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQzdDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxlQUFlLENBQ3RELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUNsRSxDQUFDO1NBQ0g7UUFDRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztZQUN0QixHQUFHLENBQUMsQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLFlBQVksRUFBRSxhQUFhLEVBQUUsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM3RCxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDakQ7U0FDRjtLQUNGOzs7WUFwQ0YsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSx5QkFBeUI7Z0JBQ25DLFFBQVEsRUFBRSw4QkFBOEI7YUFDekM7Ozs7WUFUWSx3QkFBd0I7WUFJNUIscUJBQXFCOzs7eUJBUTNCLEtBQUs7MEJBQ0wsS0FBSzt3QkFDTCxLQUFLOzhCQUNMLFNBQVMsU0FBQyxpQkFBaUIsRUFBRSxFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFBRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCwgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBDb21wb25lbnRSZWYsIElucHV0LFxuICBPbkNoYW5nZXMsIE9uSW5pdCwgVmlld0NoaWxkLCBWaWV3Q29udGFpbmVyUmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBKc29uU2NoZW1hRm9ybVNlcnZpY2UgfSBmcm9tICcuLi9qc29uLXNjaGVtYS1mb3JtLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdzZWxlY3QtZnJhbWV3b3JrLXdpZGdldCcsXG4gIHRlbXBsYXRlOiBgPGRpdiAjd2lkZ2V0Q29udGFpbmVyPjwvZGl2PmAsXG59KVxuZXhwb3J0IGNsYXNzIFNlbGVjdEZyYW1ld29ya0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgT25Jbml0IHtcbiAgbmV3Q29tcG9uZW50OiBDb21wb25lbnRSZWY8YW55PiA9IG51bGw7XG4gIEBJbnB1dCgpIGxheW91dE5vZGU6IGFueTtcbiAgQElucHV0KCkgbGF5b3V0SW5kZXg6IG51bWJlcltdO1xuICBASW5wdXQoKSBkYXRhSW5kZXg6IG51bWJlcltdO1xuICBAVmlld0NoaWxkKCd3aWRnZXRDb250YWluZXInLCB7IHJlYWQ6IFZpZXdDb250YWluZXJSZWYgfSlcbiAgICB3aWRnZXRDb250YWluZXI6IFZpZXdDb250YWluZXJSZWY7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBjb21wb25lbnRGYWN0b3J5OiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgcHJpdmF0ZSBqc2Y6IEpzb25TY2hlbWFGb3JtU2VydmljZVxuICApIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMudXBkYXRlQ29tcG9uZW50KCk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcygpIHtcbiAgICB0aGlzLnVwZGF0ZUNvbXBvbmVudCgpO1xuICB9XG5cbiAgdXBkYXRlQ29tcG9uZW50KCkge1xuICAgIGlmICghdGhpcy5uZXdDb21wb25lbnQgJiYgdGhpcy5qc2YuZnJhbWV3b3JrKSB7XG4gICAgICB0aGlzLm5ld0NvbXBvbmVudCA9IHRoaXMud2lkZ2V0Q29udGFpbmVyLmNyZWF0ZUNvbXBvbmVudChcbiAgICAgICAgdGhpcy5jb21wb25lbnRGYWN0b3J5LnJlc29sdmVDb21wb25lbnRGYWN0b3J5KHRoaXMuanNmLmZyYW1ld29yaylcbiAgICAgICk7XG4gICAgfVxuICAgIGlmICh0aGlzLm5ld0NvbXBvbmVudCkge1xuICAgICAgZm9yIChsZXQgaW5wdXQgb2YgWydsYXlvdXROb2RlJywgJ2xheW91dEluZGV4JywgJ2RhdGFJbmRleCddKSB7XG4gICAgICAgIHRoaXMubmV3Q29tcG9uZW50Lmluc3RhbmNlW2lucHV0XSA9IHRoaXNbaW5wdXRdO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19