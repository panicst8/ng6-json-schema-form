/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { JsonSchemaFormService } from '../json-schema-form.service';
export class RootComponent {
    /**
     * @param {?} jsf
     */
    constructor(jsf) {
        this.jsf = jsf;
        this.isFlexItem = false;
    }
    /**
     * @param {?} node
     * @return {?}
     */
    isDraggable(node) {
        return node.arrayItem && node.type !== '$ref' &&
            node.arrayItemType === 'list' && this.isOrderable !== false;
    }
    /**
     * @param {?} node
     * @param {?} attribute
     * @return {?}
     */
    getFlexAttribute(node, attribute) {
        /** @type {?} */
        const index = ['flex-grow', 'flex-shrink', 'flex-basis'].indexOf(attribute);
        return ((node.options || {}).flex || '').split(/\s+/)[index] ||
            (node.options || {})[attribute] || ['1', '1', 'auto'][index];
    }
    /**
     * @param {?} layoutNode
     * @return {?}
     */
    showWidget(layoutNode) {
        return this.jsf.evaluateCondition(layoutNode, this.dataIndex);
    }
}
RootComponent.decorators = [
    { type: Component, args: [{
                selector: 'root-widget',
                template: `
    <div *ngFor="let layoutItem of layout; let i = index"
      [class.form-flex-item]="isFlexItem"
      [style.align-self]="(layoutItem.options || {})['align-self']"
      [style.flex-basis]="getFlexAttribute(layoutItem, 'flex-basis')"
      [style.flex-grow]="getFlexAttribute(layoutItem, 'flex-grow')"
      [style.flex-shrink]="getFlexAttribute(layoutItem, 'flex-shrink')"
      [style.order]="(layoutItem.options || {}).order">
      <div
        [dataIndex]="layoutItem?.arrayItem ? (dataIndex || []).concat(i) : (dataIndex || [])"
        [layoutIndex]="(layoutIndex || []).concat(i)"
        [layoutNode]="layoutItem"
        [orderable]="isDraggable(layoutItem)">
        <select-framework-widget *ngIf="showWidget(layoutItem)"
          [dataIndex]="layoutItem?.arrayItem ? (dataIndex || []).concat(i) : (dataIndex || [])"
          [layoutIndex]="(layoutIndex || []).concat(i)"
          [layoutNode]="layoutItem"></select-framework-widget>
      </div>
    </div>`,
                styles: [`
    [draggable=true] {
      transition: all 150ms cubic-bezier(.4, 0, .2, 1);
    }
    [draggable=true]:hover {
      cursor: move;
      box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
      position: relative; z-index: 10;
      margin-top: -1px;
      margin-left: -1px;
      margin-right: 1px;
      margin-bottom: 1px;
    }
    [draggable=true].drag-target-top {
      box-shadow: 0 -2px 0 #000;
      position: relative; z-index: 20;
    }
    [draggable=true].drag-target-bottom {
      box-shadow: 0 2px 0 #000;
      position: relative; z-index: 20;
    }
  `],
            },] },
];
/** @nocollapse */
RootComponent.ctorParameters = () => [
    { type: JsonSchemaFormService }
];
RootComponent.propDecorators = {
    dataIndex: [{ type: Input }],
    layoutIndex: [{ type: Input }],
    layout: [{ type: Input }],
    isOrderable: [{ type: Input }],
    isFlexItem: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    RootComponent.prototype.options;
    /** @type {?} */
    RootComponent.prototype.dataIndex;
    /** @type {?} */
    RootComponent.prototype.layoutIndex;
    /** @type {?} */
    RootComponent.prototype.layout;
    /** @type {?} */
    RootComponent.prototype.isOrderable;
    /** @type {?} */
    RootComponent.prototype.isFlexItem;
    /** @type {?} */
    RootComponent.prototype.jsf;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9vdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZzYtanNvbi1zY2hlbWEtZm9ybS8iLCJzb3VyY2VzIjpbImxpYi93aWRnZXQtbGlicmFyeS9yb290LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVEsTUFBTSxlQUFlLENBQUM7QUFFdkQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUErQ3BFLE1BQU07Ozs7SUFRSixZQUNVO1FBQUEsUUFBRyxHQUFILEdBQUc7MEJBSFMsS0FBSztLQUl0Qjs7Ozs7SUFFTCxXQUFXLENBQUMsSUFBUztRQUNuQixNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLE1BQU07WUFDM0MsSUFBSSxDQUFDLGFBQWEsS0FBSyxNQUFNLElBQUksSUFBSSxDQUFDLFdBQVcsS0FBSyxLQUFLLENBQUM7S0FDL0Q7Ozs7OztJQUlELGdCQUFnQixDQUFDLElBQVMsRUFBRSxTQUFpQjs7UUFDM0MsTUFBTSxLQUFLLEdBQUcsQ0FBQyxXQUFXLEVBQUUsYUFBYSxFQUFFLFlBQVksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM1RSxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFDLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLENBQUM7WUFDMUQsQ0FBQyxJQUFJLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUNoRTs7Ozs7SUFFRCxVQUFVLENBQUMsVUFBZTtRQUN4QixNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0tBQy9EOzs7WUF2RUYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxhQUFhO2dCQUN2QixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7OztXQWtCRDtnQkFDVCxNQUFNLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBcUJSLENBQUM7YUFDSDs7OztZQTlDUSxxQkFBcUI7Ozt3QkFpRDNCLEtBQUs7MEJBQ0wsS0FBSztxQkFDTCxLQUFLOzBCQUNMLEtBQUs7eUJBQ0wsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIEhvc3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgSnNvblNjaGVtYUZvcm1TZXJ2aWNlIH0gZnJvbSAnLi4vanNvbi1zY2hlbWEtZm9ybS5zZXJ2aWNlJztcbmltcG9ydCB7IGhhc1ZhbHVlLCBKc29uUG9pbnRlciB9IGZyb20gJy4uL3NoYXJlZCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3Jvb3Qtd2lkZ2V0JyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2ICpuZ0Zvcj1cImxldCBsYXlvdXRJdGVtIG9mIGxheW91dDsgbGV0IGkgPSBpbmRleFwiXG4gICAgICBbY2xhc3MuZm9ybS1mbGV4LWl0ZW1dPVwiaXNGbGV4SXRlbVwiXG4gICAgICBbc3R5bGUuYWxpZ24tc2VsZl09XCIobGF5b3V0SXRlbS5vcHRpb25zIHx8IHt9KVsnYWxpZ24tc2VsZiddXCJcbiAgICAgIFtzdHlsZS5mbGV4LWJhc2lzXT1cImdldEZsZXhBdHRyaWJ1dGUobGF5b3V0SXRlbSwgJ2ZsZXgtYmFzaXMnKVwiXG4gICAgICBbc3R5bGUuZmxleC1ncm93XT1cImdldEZsZXhBdHRyaWJ1dGUobGF5b3V0SXRlbSwgJ2ZsZXgtZ3JvdycpXCJcbiAgICAgIFtzdHlsZS5mbGV4LXNocmlua109XCJnZXRGbGV4QXR0cmlidXRlKGxheW91dEl0ZW0sICdmbGV4LXNocmluaycpXCJcbiAgICAgIFtzdHlsZS5vcmRlcl09XCIobGF5b3V0SXRlbS5vcHRpb25zIHx8IHt9KS5vcmRlclwiPlxuICAgICAgPGRpdlxuICAgICAgICBbZGF0YUluZGV4XT1cImxheW91dEl0ZW0/LmFycmF5SXRlbSA/IChkYXRhSW5kZXggfHwgW10pLmNvbmNhdChpKSA6IChkYXRhSW5kZXggfHwgW10pXCJcbiAgICAgICAgW2xheW91dEluZGV4XT1cIihsYXlvdXRJbmRleCB8fCBbXSkuY29uY2F0KGkpXCJcbiAgICAgICAgW2xheW91dE5vZGVdPVwibGF5b3V0SXRlbVwiXG4gICAgICAgIFtvcmRlcmFibGVdPVwiaXNEcmFnZ2FibGUobGF5b3V0SXRlbSlcIj5cbiAgICAgICAgPHNlbGVjdC1mcmFtZXdvcmstd2lkZ2V0ICpuZ0lmPVwic2hvd1dpZGdldChsYXlvdXRJdGVtKVwiXG4gICAgICAgICAgW2RhdGFJbmRleF09XCJsYXlvdXRJdGVtPy5hcnJheUl0ZW0gPyAoZGF0YUluZGV4IHx8IFtdKS5jb25jYXQoaSkgOiAoZGF0YUluZGV4IHx8IFtdKVwiXG4gICAgICAgICAgW2xheW91dEluZGV4XT1cIihsYXlvdXRJbmRleCB8fCBbXSkuY29uY2F0KGkpXCJcbiAgICAgICAgICBbbGF5b3V0Tm9kZV09XCJsYXlvdXRJdGVtXCI+PC9zZWxlY3QtZnJhbWV3b3JrLXdpZGdldD5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PmAsXG4gIHN0eWxlczogW2BcbiAgICBbZHJhZ2dhYmxlPXRydWVdIHtcbiAgICAgIHRyYW5zaXRpb246IGFsbCAxNTBtcyBjdWJpYy1iZXppZXIoLjQsIDAsIC4yLCAxKTtcbiAgICB9XG4gICAgW2RyYWdnYWJsZT10cnVlXTpob3ZlciB7XG4gICAgICBjdXJzb3I6IG1vdmU7XG4gICAgICBib3gtc2hhZG93OiAycHggMnB4IDRweCByZ2JhKDAsIDAsIDAsIDAuMik7XG4gICAgICBwb3NpdGlvbjogcmVsYXRpdmU7IHotaW5kZXg6IDEwO1xuICAgICAgbWFyZ2luLXRvcDogLTFweDtcbiAgICAgIG1hcmdpbi1sZWZ0OiAtMXB4O1xuICAgICAgbWFyZ2luLXJpZ2h0OiAxcHg7XG4gICAgICBtYXJnaW4tYm90dG9tOiAxcHg7XG4gICAgfVxuICAgIFtkcmFnZ2FibGU9dHJ1ZV0uZHJhZy10YXJnZXQtdG9wIHtcbiAgICAgIGJveC1zaGFkb3c6IDAgLTJweCAwICMwMDA7XG4gICAgICBwb3NpdGlvbjogcmVsYXRpdmU7IHotaW5kZXg6IDIwO1xuICAgIH1cbiAgICBbZHJhZ2dhYmxlPXRydWVdLmRyYWctdGFyZ2V0LWJvdHRvbSB7XG4gICAgICBib3gtc2hhZG93OiAwIDJweCAwICMwMDA7XG4gICAgICBwb3NpdGlvbjogcmVsYXRpdmU7IHotaW5kZXg6IDIwO1xuICAgIH1cbiAgYF0sXG59KVxuZXhwb3J0IGNsYXNzIFJvb3RDb21wb25lbnQge1xuICBvcHRpb25zOiBhbnk7XG4gIEBJbnB1dCgpIGRhdGFJbmRleDogbnVtYmVyW107XG4gIEBJbnB1dCgpIGxheW91dEluZGV4OiBudW1iZXJbXTtcbiAgQElucHV0KCkgbGF5b3V0OiBhbnlbXTtcbiAgQElucHV0KCkgaXNPcmRlcmFibGU6IGJvb2xlYW47XG4gIEBJbnB1dCgpIGlzRmxleEl0ZW0gPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGpzZjogSnNvblNjaGVtYUZvcm1TZXJ2aWNlXG4gICkgeyB9XG5cbiAgaXNEcmFnZ2FibGUobm9kZTogYW55KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIG5vZGUuYXJyYXlJdGVtICYmIG5vZGUudHlwZSAhPT0gJyRyZWYnICYmXG4gICAgICBub2RlLmFycmF5SXRlbVR5cGUgPT09ICdsaXN0JyAmJiB0aGlzLmlzT3JkZXJhYmxlICE9PSBmYWxzZTtcbiAgfVxuXG4gIC8vIFNldCBhdHRyaWJ1dGVzIGZvciBmbGV4Ym94IGNoaWxkXG4gIC8vIChjb250YWluZXIgYXR0cmlidXRlcyBhcmUgc2V0IGluIHNlY3Rpb24uY29tcG9uZW50KVxuICBnZXRGbGV4QXR0cmlidXRlKG5vZGU6IGFueSwgYXR0cmlidXRlOiBzdHJpbmcpIHtcbiAgICBjb25zdCBpbmRleCA9IFsnZmxleC1ncm93JywgJ2ZsZXgtc2hyaW5rJywgJ2ZsZXgtYmFzaXMnXS5pbmRleE9mKGF0dHJpYnV0ZSk7XG4gICAgcmV0dXJuICgobm9kZS5vcHRpb25zIHx8IHt9KS5mbGV4IHx8ICcnKS5zcGxpdCgvXFxzKy8pW2luZGV4XSB8fFxuICAgICAgKG5vZGUub3B0aW9ucyB8fCB7fSlbYXR0cmlidXRlXSB8fCBbJzEnLCAnMScsICdhdXRvJ11baW5kZXhdO1xuICB9XG5cbiAgc2hvd1dpZGdldChsYXlvdXROb2RlOiBhbnkpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5qc2YuZXZhbHVhdGVDb25kaXRpb24obGF5b3V0Tm9kZSwgdGhpcy5kYXRhSW5kZXgpO1xuICB9XG59XG4iXX0=