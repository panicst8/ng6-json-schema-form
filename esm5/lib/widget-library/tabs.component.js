/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { JsonSchemaFormService } from '../json-schema-form.service';
var TabsComponent = /** @class */ (function () {
    function TabsComponent(jsf) {
        this.jsf = jsf;
        this.selectedItem = 0;
        this.showAddTab = true;
    }
    /**
     * @return {?}
     */
    TabsComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.options = this.layoutNode.options || {};
        this.itemCount = this.layoutNode.items.length - 1;
        this.updateControl();
    };
    /**
     * @param {?} index
     * @return {?}
     */
    TabsComponent.prototype.select = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        if (this.layoutNode.items[index].type === '$ref') {
            this.itemCount = this.layoutNode.items.length;
            this.jsf.addItem({
                layoutNode: this.layoutNode.items[index],
                layoutIndex: this.layoutIndex.concat(index),
                dataIndex: this.dataIndex.concat(index)
            });
            this.updateControl();
        }
        ;
        this.selectedItem = index;
    };
    /**
     * @return {?}
     */
    TabsComponent.prototype.updateControl = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var lastItem = this.layoutNode.items[this.layoutNode.items.length - 1];
        if (lastItem.type === '$ref' &&
            this.itemCount >= (lastItem.options.maxItems || 1000)) {
            this.showAddTab = false;
        }
    };
    /**
     * @param {?} item
     * @param {?} index
     * @return {?}
     */
    TabsComponent.prototype.setTabTitle = /**
     * @param {?} item
     * @param {?} index
     * @return {?}
     */
    function (item, index) {
        return this.jsf.setArrayItemTitle(this, item, index);
    };
    TabsComponent.decorators = [
        { type: Component, args: [{
                    selector: 'tabs-widget',
                    template: "\n    <ul\n      [class]=\"options?.labelHtmlClass || ''\">\n      <li *ngFor=\"let item of layoutNode?.items; let i = index\"\n        [class]=\"(options?.itemLabelHtmlClass || '') + (selectedItem === i ?\n          (' ' + (options?.activeClass || '') + ' ' + (options?.style?.selected || '')) :\n          (' ' + options?.style?.unselected))\"\n        role=\"presentation\"\n        data-tabs>\n        <a *ngIf=\"showAddTab || item.type !== '$ref'\"\n           [class]=\"'nav-link' + (selectedItem === i ? (' ' + options?.activeClass + ' ' + options?.style?.selected) :\n            (' ' + options?.style?.unselected))\"\n          [innerHTML]=\"setTabTitle(item, i)\"\n          (click)=\"select(i)\"></a>\n      </li>\n    </ul>\n\n    <div *ngFor=\"let layoutItem of layoutNode?.items; let i = index\"\n      [class]=\"options?.htmlClass || ''\">\n\n      <select-framework-widget *ngIf=\"selectedItem === i\"\n        [class]=\"(options?.fieldHtmlClass || '') +\n          ' ' + (options?.activeClass || '') +\n          ' ' + (options?.style?.selected || '')\"\n        [dataIndex]=\"layoutNode?.dataType === 'array' ? (dataIndex || []).concat(i) : dataIndex\"\n        [layoutIndex]=\"(layoutIndex || []).concat(i)\"\n        [layoutNode]=\"layoutItem\"></select-framework-widget>\n\n    </div>",
                    styles: [" a { cursor: pointer; } "],
                },] },
    ];
    /** @nocollapse */
    TabsComponent.ctorParameters = function () { return [
        { type: JsonSchemaFormService }
    ]; };
    TabsComponent.propDecorators = {
        layoutNode: [{ type: Input }],
        layoutIndex: [{ type: Input }],
        dataIndex: [{ type: Input }]
    };
    return TabsComponent;
}());
export { TabsComponent };
if (false) {
    /** @type {?} */
    TabsComponent.prototype.options;
    /** @type {?} */
    TabsComponent.prototype.itemCount;
    /** @type {?} */
    TabsComponent.prototype.selectedItem;
    /** @type {?} */
    TabsComponent.prototype.showAddTab;
    /** @type {?} */
    TabsComponent.prototype.layoutNode;
    /** @type {?} */
    TabsComponent.prototype.layoutIndex;
    /** @type {?} */
    TabsComponent.prototype.dataIndex;
    /** @type {?} */
    TabsComponent.prototype.jsf;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFicy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZzYtanNvbi1zY2hlbWEtZm9ybS8iLCJzb3VyY2VzIjpbImxpYi93aWRnZXQtbGlicmFyeS90YWJzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFFekQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7O0lBNENsRSx1QkFDVTtRQUFBLFFBQUcsR0FBSCxHQUFHOzRCQVBFLENBQUM7MEJBQ0gsSUFBSTtLQU9aOzs7O0lBRUwsZ0NBQVE7OztJQUFSO1FBQ0UsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUM7UUFDN0MsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQ2xELElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztLQUN0Qjs7Ozs7SUFFRCw4QkFBTTs7OztJQUFOLFVBQU8sS0FBSztRQUNWLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ2pELElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO1lBQzlDLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDO2dCQUNmLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7Z0JBQ3hDLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7Z0JBQzNDLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7YUFDeEMsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1NBQ3RCO1FBQUEsQ0FBQztRQUNGLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO0tBQzNCOzs7O0lBRUQscUNBQWE7OztJQUFiOztRQUNFLElBQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztRQUN6RSxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxLQUFLLE1BQU07WUFDMUIsSUFBSSxDQUFDLFNBQVMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsUUFBUSxJQUFJLElBQUksQ0FDdEQsQ0FBQyxDQUFDLENBQUM7WUFDRCxJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztTQUN6QjtLQUNGOzs7Ozs7SUFFRCxtQ0FBVzs7Ozs7SUFBWCxVQUFZLElBQVMsRUFBRSxLQUFhO1FBQ2xDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7S0FDdEQ7O2dCQTVFRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGFBQWE7b0JBQ3ZCLFFBQVEsRUFBRSwyeENBNEJEO29CQUNULE1BQU0sRUFBRSxDQUFDLDBCQUEwQixDQUFDO2lCQUNyQzs7OztnQkFsQ1EscUJBQXFCOzs7NkJBd0MzQixLQUFLOzhCQUNMLEtBQUs7NEJBQ0wsS0FBSzs7d0JBNUNSOztTQXFDYSxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IEpzb25TY2hlbWFGb3JtU2VydmljZSB9IGZyb20gJy4uL2pzb24tc2NoZW1hLWZvcm0uc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3RhYnMtd2lkZ2V0JyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8dWxcbiAgICAgIFtjbGFzc109XCJvcHRpb25zPy5sYWJlbEh0bWxDbGFzcyB8fCAnJ1wiPlxuICAgICAgPGxpICpuZ0Zvcj1cImxldCBpdGVtIG9mIGxheW91dE5vZGU/Lml0ZW1zOyBsZXQgaSA9IGluZGV4XCJcbiAgICAgICAgW2NsYXNzXT1cIihvcHRpb25zPy5pdGVtTGFiZWxIdG1sQ2xhc3MgfHwgJycpICsgKHNlbGVjdGVkSXRlbSA9PT0gaSA/XG4gICAgICAgICAgKCcgJyArIChvcHRpb25zPy5hY3RpdmVDbGFzcyB8fCAnJykgKyAnICcgKyAob3B0aW9ucz8uc3R5bGU/LnNlbGVjdGVkIHx8ICcnKSkgOlxuICAgICAgICAgICgnICcgKyBvcHRpb25zPy5zdHlsZT8udW5zZWxlY3RlZCkpXCJcbiAgICAgICAgcm9sZT1cInByZXNlbnRhdGlvblwiXG4gICAgICAgIGRhdGEtdGFicz5cbiAgICAgICAgPGEgKm5nSWY9XCJzaG93QWRkVGFiIHx8IGl0ZW0udHlwZSAhPT0gJyRyZWYnXCJcbiAgICAgICAgICAgW2NsYXNzXT1cIiduYXYtbGluaycgKyAoc2VsZWN0ZWRJdGVtID09PSBpID8gKCcgJyArIG9wdGlvbnM/LmFjdGl2ZUNsYXNzICsgJyAnICsgb3B0aW9ucz8uc3R5bGU/LnNlbGVjdGVkKSA6XG4gICAgICAgICAgICAoJyAnICsgb3B0aW9ucz8uc3R5bGU/LnVuc2VsZWN0ZWQpKVwiXG4gICAgICAgICAgW2lubmVySFRNTF09XCJzZXRUYWJUaXRsZShpdGVtLCBpKVwiXG4gICAgICAgICAgKGNsaWNrKT1cInNlbGVjdChpKVwiPjwvYT5cbiAgICAgIDwvbGk+XG4gICAgPC91bD5cblxuICAgIDxkaXYgKm5nRm9yPVwibGV0IGxheW91dEl0ZW0gb2YgbGF5b3V0Tm9kZT8uaXRlbXM7IGxldCBpID0gaW5kZXhcIlxuICAgICAgW2NsYXNzXT1cIm9wdGlvbnM/Lmh0bWxDbGFzcyB8fCAnJ1wiPlxuXG4gICAgICA8c2VsZWN0LWZyYW1ld29yay13aWRnZXQgKm5nSWY9XCJzZWxlY3RlZEl0ZW0gPT09IGlcIlxuICAgICAgICBbY2xhc3NdPVwiKG9wdGlvbnM/LmZpZWxkSHRtbENsYXNzIHx8ICcnKSArXG4gICAgICAgICAgJyAnICsgKG9wdGlvbnM/LmFjdGl2ZUNsYXNzIHx8ICcnKSArXG4gICAgICAgICAgJyAnICsgKG9wdGlvbnM/LnN0eWxlPy5zZWxlY3RlZCB8fCAnJylcIlxuICAgICAgICBbZGF0YUluZGV4XT1cImxheW91dE5vZGU/LmRhdGFUeXBlID09PSAnYXJyYXknID8gKGRhdGFJbmRleCB8fCBbXSkuY29uY2F0KGkpIDogZGF0YUluZGV4XCJcbiAgICAgICAgW2xheW91dEluZGV4XT1cIihsYXlvdXRJbmRleCB8fCBbXSkuY29uY2F0KGkpXCJcbiAgICAgICAgW2xheW91dE5vZGVdPVwibGF5b3V0SXRlbVwiPjwvc2VsZWN0LWZyYW1ld29yay13aWRnZXQ+XG5cbiAgICA8L2Rpdj5gLFxuICBzdHlsZXM6IFtgIGEgeyBjdXJzb3I6IHBvaW50ZXI7IH0gYF0sXG59KVxuZXhwb3J0IGNsYXNzIFRhYnNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBvcHRpb25zOiBhbnk7XG4gIGl0ZW1Db3VudDogbnVtYmVyO1xuICBzZWxlY3RlZEl0ZW0gPSAwO1xuICBzaG93QWRkVGFiID0gdHJ1ZTtcbiAgQElucHV0KCkgbGF5b3V0Tm9kZTogYW55O1xuICBASW5wdXQoKSBsYXlvdXRJbmRleDogbnVtYmVyW107XG4gIEBJbnB1dCgpIGRhdGFJbmRleDogbnVtYmVyW107XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBqc2Y6IEpzb25TY2hlbWFGb3JtU2VydmljZVxuICApIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMub3B0aW9ucyA9IHRoaXMubGF5b3V0Tm9kZS5vcHRpb25zIHx8IHt9O1xuICAgIHRoaXMuaXRlbUNvdW50ID0gdGhpcy5sYXlvdXROb2RlLml0ZW1zLmxlbmd0aCAtIDE7XG4gICAgdGhpcy51cGRhdGVDb250cm9sKCk7XG4gIH1cblxuICBzZWxlY3QoaW5kZXgpIHtcbiAgICBpZiAodGhpcy5sYXlvdXROb2RlLml0ZW1zW2luZGV4XS50eXBlID09PSAnJHJlZicpIHtcbiAgICAgIHRoaXMuaXRlbUNvdW50ID0gdGhpcy5sYXlvdXROb2RlLml0ZW1zLmxlbmd0aDtcbiAgICAgIHRoaXMuanNmLmFkZEl0ZW0oe1xuICAgICAgICBsYXlvdXROb2RlOiB0aGlzLmxheW91dE5vZGUuaXRlbXNbaW5kZXhdLFxuICAgICAgICBsYXlvdXRJbmRleDogdGhpcy5sYXlvdXRJbmRleC5jb25jYXQoaW5kZXgpLFxuICAgICAgICBkYXRhSW5kZXg6IHRoaXMuZGF0YUluZGV4LmNvbmNhdChpbmRleClcbiAgICAgIH0pO1xuICAgICAgdGhpcy51cGRhdGVDb250cm9sKCk7XG4gICAgfTtcbiAgICB0aGlzLnNlbGVjdGVkSXRlbSA9IGluZGV4O1xuICB9XG5cbiAgdXBkYXRlQ29udHJvbCgpIHtcbiAgICBjb25zdCBsYXN0SXRlbSA9IHRoaXMubGF5b3V0Tm9kZS5pdGVtc1t0aGlzLmxheW91dE5vZGUuaXRlbXMubGVuZ3RoIC0gMV07XG4gICAgaWYgKGxhc3RJdGVtLnR5cGUgPT09ICckcmVmJyAmJlxuICAgICAgdGhpcy5pdGVtQ291bnQgPj0gKGxhc3RJdGVtLm9wdGlvbnMubWF4SXRlbXMgfHwgMTAwMClcbiAgICApIHtcbiAgICAgIHRoaXMuc2hvd0FkZFRhYiA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIHNldFRhYlRpdGxlKGl0ZW06IGFueSwgaW5kZXg6IG51bWJlcik6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuanNmLnNldEFycmF5SXRlbVRpdGxlKHRoaXMsIGl0ZW0sIGluZGV4KTtcbiAgfVxufVxuIl19