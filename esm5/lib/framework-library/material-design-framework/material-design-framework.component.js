/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { ChangeDetectorRef, Component, Input } from '@angular/core';
import * as _ from 'lodash';
import { JsonSchemaFormService } from '../../json-schema-form.service';
import { isDefined } from '../../shared';
var MaterialDesignFrameworkComponent = /** @class */ (function () {
    function MaterialDesignFrameworkComponent(changeDetector, jsf) {
        this.changeDetector = changeDetector;
        this.jsf = jsf;
        this.frameworkInitialized = false;
        this.formControl = null;
        this.parentArray = null;
        this.isOrderable = false;
        this.dynamicTitle = null;
    }
    Object.defineProperty(MaterialDesignFrameworkComponent.prototype, "showRemoveButton", {
        get: /**
         * @return {?}
         */
        function () {
            if (!this.layoutNode || !this.widgetOptions.removable ||
                this.widgetOptions.readonly || this.layoutNode.type === '$ref') {
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
    MaterialDesignFrameworkComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.initializeFramework();
    };
    /**
     * @return {?}
     */
    MaterialDesignFrameworkComponent.prototype.ngOnChanges = /**
     * @return {?}
     */
    function () {
        if (!this.frameworkInitialized) {
            this.initializeFramework();
        }
        if (this.dynamicTitle) {
            this.updateTitle();
        }
    };
    /**
     * @return {?}
     */
    MaterialDesignFrameworkComponent.prototype.initializeFramework = /**
     * @return {?}
     */
    function () {
        if (this.layoutNode) {
            this.options = _.cloneDeep(this.layoutNode.options || {});
            this.widgetLayoutNode = tslib_1.__assign({}, this.layoutNode, { options: _.cloneDeep(this.layoutNode.options || {}) });
            this.widgetOptions = this.widgetLayoutNode.options;
            this.formControl = this.jsf.getFormControl(this);
            if (isDefined(this.widgetOptions.minimum) &&
                isDefined(this.widgetOptions.maximum) &&
                this.widgetOptions.multipleOf >= 1) {
                this.layoutNode.type = 'range';
            }
            if (!['$ref', 'advancedfieldset', 'authfieldset', 'button', 'card',
                'checkbox', 'expansion-panel', 'help', 'message', 'msg', 'section',
                'submit', 'tabarray', 'tabs'].includes(this.layoutNode.type) &&
                /{{.+?}}/.test(this.widgetOptions.title || '')) {
                this.dynamicTitle = this.widgetOptions.title;
                this.updateTitle();
            }
            if (this.layoutNode.arrayItem && this.layoutNode.type !== '$ref') {
                this.parentArray = this.jsf.getParentNode(this);
                if (this.parentArray) {
                    this.isOrderable =
                        this.parentArray.type.slice(0, 3) !== 'tab' &&
                            this.layoutNode.arrayItemType === 'list' &&
                            !this.widgetOptions.readonly &&
                            this.parentArray.options.orderable;
                }
            }
            this.frameworkInitialized = true;
        }
        else {
            this.options = {};
        }
    };
    /**
     * @return {?}
     */
    MaterialDesignFrameworkComponent.prototype.updateTitle = /**
     * @return {?}
     */
    function () {
        this.widgetLayoutNode.options.title = this.jsf.parseText(this.dynamicTitle, this.jsf.getFormControlValue(this), this.jsf.getFormControlGroup(this).value, this.dataIndex[this.dataIndex.length - 1]);
    };
    /**
     * @return {?}
     */
    MaterialDesignFrameworkComponent.prototype.removeItem = /**
     * @return {?}
     */
    function () {
        this.jsf.removeItem(this);
    };
    MaterialDesignFrameworkComponent.decorators = [
        { type: Component, args: [{
                    selector: 'material-design-framework',
                    template: "\n    <div\n      [class.array-item]=\"widgetLayoutNode?.arrayItem && widgetLayoutNode?.type !== '$ref'\"\n      [orderable]=\"isOrderable\"\n      [dataIndex]=\"dataIndex\"\n      [layoutIndex]=\"layoutIndex\"\n      [layoutNode]=\"widgetLayoutNode\">\n      <svg *ngIf=\"showRemoveButton\"\n        xmlns=\"http://www.w3.org/2000/svg\"\n        height=\"18\" width=\"18\" viewBox=\"0 0 24 24\"\n        class=\"close-button\"\n        (click)=\"removeItem()\">\n        <path d=\"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z\"/>\n      </svg>\n      <select-widget-widget\n        [dataIndex]=\"dataIndex\"\n        [layoutIndex]=\"layoutIndex\"\n        [layoutNode]=\"widgetLayoutNode\"></select-widget-widget>\n    </div>\n    <div class=\"spacer\" *ngIf=\"widgetLayoutNode?.arrayItem && widgetLayoutNode?.type !== '$ref'\"></div>",
                    styles: ["\n    .array-item {\n      border-radius: 2px;\n      box-shadow: 0 3px 1px -2px rgba(0,0,0,.2),\n                  0 2px 2px  0   rgba(0,0,0,.14),\n                  0 1px 5px  0   rgba(0,0,0,.12);\n      padding: 6px;\n      position: relative;\n      transition: all 280ms cubic-bezier(.4, 0, .2, 1);\n    }\n    .close-button {\n      cursor: pointer;\n      position: absolute;\n      top: 6px;\n      right: 6px;\n      fill: rgba(0,0,0,.4);\n      visibility: hidden;\n      z-index: 500;\n    }\n    .close-button:hover { fill: rgba(0,0,0,.8); }\n    .array-item:hover > .close-button { visibility: visible; }\n    .spacer { margin: 6px 0; }\n    [draggable=true]:hover {\n      box-shadow: 0 5px 5px -3px rgba(0,0,0,.2),\n                  0 8px 10px 1px rgba(0,0,0,.14),\n                  0 3px 14px 2px rgba(0,0,0,.12);\n      cursor: move;\n      z-index: 10;\n    }\n    [draggable=true].drag-target-top {\n      box-shadow: 0 -2px 0 #000;\n      position: relative; z-index: 20;\n    }\n    [draggable=true].drag-target-bottom {\n      box-shadow: 0 2px 0 #000;\n      position: relative; z-index: 20;\n    }\n  "],
                },] },
    ];
    /** @nocollapse */
    MaterialDesignFrameworkComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: JsonSchemaFormService }
    ]; };
    MaterialDesignFrameworkComponent.propDecorators = {
        layoutNode: [{ type: Input }],
        layoutIndex: [{ type: Input }],
        dataIndex: [{ type: Input }]
    };
    return MaterialDesignFrameworkComponent;
}());
export { MaterialDesignFrameworkComponent };
if (false) {
    /** @type {?} */
    MaterialDesignFrameworkComponent.prototype.frameworkInitialized;
    /** @type {?} */
    MaterialDesignFrameworkComponent.prototype.inputType;
    /** @type {?} */
    MaterialDesignFrameworkComponent.prototype.options;
    /** @type {?} */
    MaterialDesignFrameworkComponent.prototype.widgetLayoutNode;
    /** @type {?} */
    MaterialDesignFrameworkComponent.prototype.widgetOptions;
    /** @type {?} */
    MaterialDesignFrameworkComponent.prototype.formControl;
    /** @type {?} */
    MaterialDesignFrameworkComponent.prototype.parentArray;
    /** @type {?} */
    MaterialDesignFrameworkComponent.prototype.isOrderable;
    /** @type {?} */
    MaterialDesignFrameworkComponent.prototype.dynamicTitle;
    /** @type {?} */
    MaterialDesignFrameworkComponent.prototype.layoutNode;
    /** @type {?} */
    MaterialDesignFrameworkComponent.prototype.layoutIndex;
    /** @type {?} */
    MaterialDesignFrameworkComponent.prototype.dataIndex;
    /** @type {?} */
    MaterialDesignFrameworkComponent.prototype.changeDetector;
    /** @type {?} */
    MaterialDesignFrameworkComponent.prototype.jsf;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0ZXJpYWwtZGVzaWduLWZyYW1ld29yay5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZzYtanNvbi1zY2hlbWEtZm9ybS8iLCJzb3VyY2VzIjpbImxpYi9mcmFtZXdvcmstbGlicmFyeS9tYXRlcmlhbC1kZXNpZ24tZnJhbWV3b3JrL21hdGVyaWFsLWRlc2lnbi1mcmFtZXdvcmsuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQXFCLE1BQU0sZUFBZSxDQUFDO0FBRXZGLE9BQU8sS0FBSyxDQUFDLE1BQU0sUUFBUSxDQUFDO0FBRTVCLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3ZFLE9BQU8sRUFBbUIsU0FBUyxFQUFlLE1BQU0sY0FBYyxDQUFDOztJQTZFckUsMENBQ1UsZ0JBQ0E7UUFEQSxtQkFBYyxHQUFkLGNBQWM7UUFDZCxRQUFHLEdBQUgsR0FBRztvQ0FmVSxLQUFLOzJCQUtULElBQUk7MkJBQ0osSUFBSTsyQkFDVCxLQUFLOzRCQUNJLElBQUk7S0FRdEI7SUFFTCxzQkFBSSw4REFBZ0I7Ozs7UUFBcEI7WUFDRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVM7Z0JBQ25ELElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxLQUFLLE1BQzFELENBQUMsQ0FBQyxDQUFDO2dCQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7YUFBRTtZQUNuQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQztnQkFBQyxNQUFNLENBQUMsSUFBSSxDQUFDO2FBQUU7WUFDeEQsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO2dCQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7YUFBRTs7WUFFdEUsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQzs7Z0JBRXJGLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7O29CQUVqRCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7U0FDdkY7OztPQUFBOzs7O0lBRUQsbURBQVE7OztJQUFSO1FBQ0UsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7S0FDNUI7Ozs7SUFFRCxzREFBVzs7O0lBQVg7UUFDRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUM7WUFBQyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztTQUFFO1FBQy9ELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1lBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQUU7S0FDL0M7Ozs7SUFFRCw4REFBbUI7OztJQUFuQjtRQUNFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUMsQ0FBQztZQUMxRCxJQUFJLENBQUMsZ0JBQWdCLHdCQUNoQixJQUFJLENBQUMsVUFBVSxJQUNsQixPQUFPLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUMsR0FDcEQsQ0FBQztZQUNGLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQztZQUNuRCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBRWpELEVBQUUsQ0FBQyxDQUNELFNBQVMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQztnQkFDckMsU0FBUyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDO2dCQUNyQyxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsSUFBSSxDQUNuQyxDQUFDLENBQUMsQ0FBQztnQkFDRCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUM7YUFDaEM7WUFFRCxFQUFFLENBQUMsQ0FDRCxDQUFDLENBQUMsTUFBTSxFQUFFLGtCQUFrQixFQUFFLGNBQWMsRUFBRSxRQUFRLEVBQUUsTUFBTTtnQkFDNUQsVUFBVSxFQUFFLGlCQUFpQixFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFNBQVM7Z0JBQ2xFLFFBQVEsRUFBRSxVQUFVLEVBQUUsTUFBTSxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDO2dCQUM5RCxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FDL0MsQ0FBQyxDQUFDLENBQUM7Z0JBQ0QsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQztnQkFDN0MsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO2FBQ3BCO1lBRUQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEtBQUssTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDakUsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDaEQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7b0JBQ3JCLElBQUksQ0FBQyxXQUFXO3dCQUNkLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssS0FBSzs0QkFDM0MsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEtBQUssTUFBTTs0QkFDeEMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVE7NEJBQzVCLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQztpQkFDdEM7YUFDRjtZQUVELElBQUksQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLENBQUM7U0FDbEM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLElBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO1NBQ25CO0tBQ0Y7Ozs7SUFFRCxzREFBVzs7O0lBQVg7UUFDRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FDdEQsSUFBSSxDQUFDLFlBQVksRUFDakIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsRUFDbEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLEVBQ3hDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQzFDLENBQUM7S0FDSDs7OztJQUVELHFEQUFVOzs7SUFBVjtRQUNFLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQzNCOztnQkEvSkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSwyQkFBMkI7b0JBQ3JDLFFBQVEsRUFBRSxzNEJBbUI0RjtvQkFDdEcsTUFBTSxFQUFFLENBQUMseW1DQXFDUixDQUFDO2lCQUNIOzs7O2dCQW5FUSxpQkFBaUI7Z0JBSWpCLHFCQUFxQjs7OzZCQTBFM0IsS0FBSzs4QkFDTCxLQUFLOzRCQUNMLEtBQUs7OzJDQWhGUjs7U0FvRWEsZ0NBQWdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudCwgSW5wdXQsIE9uQ2hhbmdlcywgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcblxuaW1wb3J0IHsgSnNvblNjaGVtYUZvcm1TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vanNvbi1zY2hlbWEtZm9ybS5zZXJ2aWNlJztcbmltcG9ydCB7IGhhc093biwgaXNBcnJheSwgaXNEZWZpbmVkLCB0b1RpdGxlQ2FzZSB9IGZyb20gJy4uLy4uL3NoYXJlZCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21hdGVyaWFsLWRlc2lnbi1mcmFtZXdvcmsnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXZcbiAgICAgIFtjbGFzcy5hcnJheS1pdGVtXT1cIndpZGdldExheW91dE5vZGU/LmFycmF5SXRlbSAmJiB3aWRnZXRMYXlvdXROb2RlPy50eXBlICE9PSAnJHJlZidcIlxuICAgICAgW29yZGVyYWJsZV09XCJpc09yZGVyYWJsZVwiXG4gICAgICBbZGF0YUluZGV4XT1cImRhdGFJbmRleFwiXG4gICAgICBbbGF5b3V0SW5kZXhdPVwibGF5b3V0SW5kZXhcIlxuICAgICAgW2xheW91dE5vZGVdPVwid2lkZ2V0TGF5b3V0Tm9kZVwiPlxuICAgICAgPHN2ZyAqbmdJZj1cInNob3dSZW1vdmVCdXR0b25cIlxuICAgICAgICB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCJcbiAgICAgICAgaGVpZ2h0PVwiMThcIiB3aWR0aD1cIjE4XCIgdmlld0JveD1cIjAgMCAyNCAyNFwiXG4gICAgICAgIGNsYXNzPVwiY2xvc2UtYnV0dG9uXCJcbiAgICAgICAgKGNsaWNrKT1cInJlbW92ZUl0ZW0oKVwiPlxuICAgICAgICA8cGF0aCBkPVwiTTE5IDYuNDFMMTcuNTkgNSAxMiAxMC41OSA2LjQxIDUgNSA2LjQxIDEwLjU5IDEyIDUgMTcuNTkgNi40MSAxOSAxMiAxMy40MSAxNy41OSAxOSAxOSAxNy41OSAxMy40MSAxMiAxOSA2LjQxelwiLz5cbiAgICAgIDwvc3ZnPlxuICAgICAgPHNlbGVjdC13aWRnZXQtd2lkZ2V0XG4gICAgICAgIFtkYXRhSW5kZXhdPVwiZGF0YUluZGV4XCJcbiAgICAgICAgW2xheW91dEluZGV4XT1cImxheW91dEluZGV4XCJcbiAgICAgICAgW2xheW91dE5vZGVdPVwid2lkZ2V0TGF5b3V0Tm9kZVwiPjwvc2VsZWN0LXdpZGdldC13aWRnZXQ+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cInNwYWNlclwiICpuZ0lmPVwid2lkZ2V0TGF5b3V0Tm9kZT8uYXJyYXlJdGVtICYmIHdpZGdldExheW91dE5vZGU/LnR5cGUgIT09ICckcmVmJ1wiPjwvZGl2PmAsXG4gIHN0eWxlczogW2BcbiAgICAuYXJyYXktaXRlbSB7XG4gICAgICBib3JkZXItcmFkaXVzOiAycHg7XG4gICAgICBib3gtc2hhZG93OiAwIDNweCAxcHggLTJweCByZ2JhKDAsMCwwLC4yKSxcbiAgICAgICAgICAgICAgICAgIDAgMnB4IDJweCAgMCAgIHJnYmEoMCwwLDAsLjE0KSxcbiAgICAgICAgICAgICAgICAgIDAgMXB4IDVweCAgMCAgIHJnYmEoMCwwLDAsLjEyKTtcbiAgICAgIHBhZGRpbmc6IDZweDtcbiAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgIHRyYW5zaXRpb246IGFsbCAyODBtcyBjdWJpYy1iZXppZXIoLjQsIDAsIC4yLCAxKTtcbiAgICB9XG4gICAgLmNsb3NlLWJ1dHRvbiB7XG4gICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICB0b3A6IDZweDtcbiAgICAgIHJpZ2h0OiA2cHg7XG4gICAgICBmaWxsOiByZ2JhKDAsMCwwLC40KTtcbiAgICAgIHZpc2liaWxpdHk6IGhpZGRlbjtcbiAgICAgIHotaW5kZXg6IDUwMDtcbiAgICB9XG4gICAgLmNsb3NlLWJ1dHRvbjpob3ZlciB7IGZpbGw6IHJnYmEoMCwwLDAsLjgpOyB9XG4gICAgLmFycmF5LWl0ZW06aG92ZXIgPiAuY2xvc2UtYnV0dG9uIHsgdmlzaWJpbGl0eTogdmlzaWJsZTsgfVxuICAgIC5zcGFjZXIgeyBtYXJnaW46IDZweCAwOyB9XG4gICAgW2RyYWdnYWJsZT10cnVlXTpob3ZlciB7XG4gICAgICBib3gtc2hhZG93OiAwIDVweCA1cHggLTNweCByZ2JhKDAsMCwwLC4yKSxcbiAgICAgICAgICAgICAgICAgIDAgOHB4IDEwcHggMXB4IHJnYmEoMCwwLDAsLjE0KSxcbiAgICAgICAgICAgICAgICAgIDAgM3B4IDE0cHggMnB4IHJnYmEoMCwwLDAsLjEyKTtcbiAgICAgIGN1cnNvcjogbW92ZTtcbiAgICAgIHotaW5kZXg6IDEwO1xuICAgIH1cbiAgICBbZHJhZ2dhYmxlPXRydWVdLmRyYWctdGFyZ2V0LXRvcCB7XG4gICAgICBib3gtc2hhZG93OiAwIC0ycHggMCAjMDAwO1xuICAgICAgcG9zaXRpb246IHJlbGF0aXZlOyB6LWluZGV4OiAyMDtcbiAgICB9XG4gICAgW2RyYWdnYWJsZT10cnVlXS5kcmFnLXRhcmdldC1ib3R0b20ge1xuICAgICAgYm94LXNoYWRvdzogMCAycHggMCAjMDAwO1xuICAgICAgcG9zaXRpb246IHJlbGF0aXZlOyB6LWluZGV4OiAyMDtcbiAgICB9XG4gIGBdLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRlcmlhbERlc2lnbkZyYW1ld29ya0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcbiAgZnJhbWV3b3JrSW5pdGlhbGl6ZWQgPSBmYWxzZTtcbiAgaW5wdXRUeXBlOiBzdHJpbmc7XG4gIG9wdGlvbnM6IGFueTsgLy8gT3B0aW9ucyB1c2VkIGluIHRoaXMgZnJhbWV3b3JrXG4gIHdpZGdldExheW91dE5vZGU6IGFueTsgLy8gbGF5b3V0Tm9kZSBwYXNzZWQgdG8gY2hpbGQgd2lkZ2V0XG4gIHdpZGdldE9wdGlvbnM6IGFueTsgLy8gT3B0aW9ucyBwYXNzZWQgdG8gY2hpbGQgd2lkZ2V0XG4gIGZvcm1Db250cm9sOiBhbnkgPSBudWxsO1xuICBwYXJlbnRBcnJheTogYW55ID0gbnVsbDtcbiAgaXNPcmRlcmFibGUgPSBmYWxzZTtcbiAgZHluYW1pY1RpdGxlOiBzdHJpbmcgPSBudWxsO1xuICBASW5wdXQoKSBsYXlvdXROb2RlOiBhbnk7XG4gIEBJbnB1dCgpIGxheW91dEluZGV4OiBudW1iZXJbXTtcbiAgQElucHV0KCkgZGF0YUluZGV4OiBudW1iZXJbXTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGNoYW5nZURldGVjdG9yOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBwcml2YXRlIGpzZjogSnNvblNjaGVtYUZvcm1TZXJ2aWNlXG4gICkgeyB9XG5cbiAgZ2V0IHNob3dSZW1vdmVCdXR0b24oKTogYm9vbGVhbiB7XG4gICAgaWYgKCF0aGlzLmxheW91dE5vZGUgfHwgIXRoaXMud2lkZ2V0T3B0aW9ucy5yZW1vdmFibGUgfHxcbiAgICAgIHRoaXMud2lkZ2V0T3B0aW9ucy5yZWFkb25seSB8fCB0aGlzLmxheW91dE5vZGUudHlwZSA9PT0gJyRyZWYnXG4gICAgKSB7IHJldHVybiBmYWxzZTsgfVxuICAgIGlmICh0aGlzLmxheW91dE5vZGUucmVjdXJzaXZlUmVmZXJlbmNlKSB7IHJldHVybiB0cnVlOyB9XG4gICAgaWYgKCF0aGlzLmxheW91dE5vZGUuYXJyYXlJdGVtIHx8ICF0aGlzLnBhcmVudEFycmF5KSB7IHJldHVybiBmYWxzZTsgfVxuICAgIC8vIElmIGFycmF5IGxlbmd0aCA8PSBtaW5JdGVtcywgZG9uJ3QgYWxsb3cgcmVtb3ZpbmcgYW55IGl0ZW1zXG4gICAgcmV0dXJuIHRoaXMucGFyZW50QXJyYXkuaXRlbXMubGVuZ3RoIC0gMSA8PSB0aGlzLnBhcmVudEFycmF5Lm9wdGlvbnMubWluSXRlbXMgPyBmYWxzZSA6XG4gICAgICAvLyBGb3IgcmVtb3ZhYmxlIGxpc3QgaXRlbXMsIGFsbG93IHJlbW92aW5nIGFueSBpdGVtXG4gICAgICB0aGlzLmxheW91dE5vZGUuYXJyYXlJdGVtVHlwZSA9PT0gJ2xpc3QnID8gdHJ1ZSA6XG4gICAgICAvLyBGb3IgcmVtb3ZhYmxlIHR1cGxlIGl0ZW1zLCBvbmx5IGFsbG93IHJlbW92aW5nIGxhc3QgaXRlbSBpbiBsaXN0XG4gICAgICB0aGlzLmxheW91dEluZGV4W3RoaXMubGF5b3V0SW5kZXgubGVuZ3RoIC0gMV0gPT09IHRoaXMucGFyZW50QXJyYXkuaXRlbXMubGVuZ3RoIC0gMjtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuaW5pdGlhbGl6ZUZyYW1ld29yaygpO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoKSB7XG4gICAgaWYgKCF0aGlzLmZyYW1ld29ya0luaXRpYWxpemVkKSB7IHRoaXMuaW5pdGlhbGl6ZUZyYW1ld29yaygpOyB9XG4gICAgaWYgKHRoaXMuZHluYW1pY1RpdGxlKSB7IHRoaXMudXBkYXRlVGl0bGUoKTsgfVxuICB9XG5cbiAgaW5pdGlhbGl6ZUZyYW1ld29yaygpIHtcbiAgICBpZiAodGhpcy5sYXlvdXROb2RlKSB7XG4gICAgICB0aGlzLm9wdGlvbnMgPSBfLmNsb25lRGVlcCh0aGlzLmxheW91dE5vZGUub3B0aW9ucyB8fCB7fSk7XG4gICAgICB0aGlzLndpZGdldExheW91dE5vZGUgPSB7XG4gICAgICAgIC4uLnRoaXMubGF5b3V0Tm9kZSxcbiAgICAgICAgb3B0aW9uczogXy5jbG9uZURlZXAodGhpcy5sYXlvdXROb2RlLm9wdGlvbnMgfHwge30pXG4gICAgICB9O1xuICAgICAgdGhpcy53aWRnZXRPcHRpb25zID0gdGhpcy53aWRnZXRMYXlvdXROb2RlLm9wdGlvbnM7XG4gICAgICB0aGlzLmZvcm1Db250cm9sID0gdGhpcy5qc2YuZ2V0Rm9ybUNvbnRyb2wodGhpcyk7XG5cbiAgICAgIGlmIChcbiAgICAgICAgaXNEZWZpbmVkKHRoaXMud2lkZ2V0T3B0aW9ucy5taW5pbXVtKSAmJlxuICAgICAgICBpc0RlZmluZWQodGhpcy53aWRnZXRPcHRpb25zLm1heGltdW0pICYmXG4gICAgICAgIHRoaXMud2lkZ2V0T3B0aW9ucy5tdWx0aXBsZU9mID49IDFcbiAgICAgICkge1xuICAgICAgICB0aGlzLmxheW91dE5vZGUudHlwZSA9ICdyYW5nZSc7XG4gICAgICB9XG5cbiAgICAgIGlmIChcbiAgICAgICAgIVsnJHJlZicsICdhZHZhbmNlZGZpZWxkc2V0JywgJ2F1dGhmaWVsZHNldCcsICdidXR0b24nLCAnY2FyZCcsXG4gICAgICAgICAgJ2NoZWNrYm94JywgJ2V4cGFuc2lvbi1wYW5lbCcsICdoZWxwJywgJ21lc3NhZ2UnLCAnbXNnJywgJ3NlY3Rpb24nLFxuICAgICAgICAgICdzdWJtaXQnLCAndGFiYXJyYXknLCAndGFicyddLmluY2x1ZGVzKHRoaXMubGF5b3V0Tm9kZS50eXBlKSAmJlxuICAgICAgICAve3suKz99fS8udGVzdCh0aGlzLndpZGdldE9wdGlvbnMudGl0bGUgfHwgJycpXG4gICAgICApIHtcbiAgICAgICAgdGhpcy5keW5hbWljVGl0bGUgPSB0aGlzLndpZGdldE9wdGlvbnMudGl0bGU7XG4gICAgICAgIHRoaXMudXBkYXRlVGl0bGUoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMubGF5b3V0Tm9kZS5hcnJheUl0ZW0gJiYgdGhpcy5sYXlvdXROb2RlLnR5cGUgIT09ICckcmVmJykge1xuICAgICAgICB0aGlzLnBhcmVudEFycmF5ID0gdGhpcy5qc2YuZ2V0UGFyZW50Tm9kZSh0aGlzKTtcbiAgICAgICAgaWYgKHRoaXMucGFyZW50QXJyYXkpIHtcbiAgICAgICAgICB0aGlzLmlzT3JkZXJhYmxlID1cbiAgICAgICAgICAgIHRoaXMucGFyZW50QXJyYXkudHlwZS5zbGljZSgwLCAzKSAhPT0gJ3RhYicgJiZcbiAgICAgICAgICAgIHRoaXMubGF5b3V0Tm9kZS5hcnJheUl0ZW1UeXBlID09PSAnbGlzdCcgJiZcbiAgICAgICAgICAgICF0aGlzLndpZGdldE9wdGlvbnMucmVhZG9ubHkgJiZcbiAgICAgICAgICAgIHRoaXMucGFyZW50QXJyYXkub3B0aW9ucy5vcmRlcmFibGU7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdGhpcy5mcmFtZXdvcmtJbml0aWFsaXplZCA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMub3B0aW9ucyA9IHt9O1xuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZVRpdGxlKCkge1xuICAgIHRoaXMud2lkZ2V0TGF5b3V0Tm9kZS5vcHRpb25zLnRpdGxlID0gdGhpcy5qc2YucGFyc2VUZXh0KFxuICAgICAgdGhpcy5keW5hbWljVGl0bGUsXG4gICAgICB0aGlzLmpzZi5nZXRGb3JtQ29udHJvbFZhbHVlKHRoaXMpLFxuICAgICAgdGhpcy5qc2YuZ2V0Rm9ybUNvbnRyb2xHcm91cCh0aGlzKS52YWx1ZSxcbiAgICAgIHRoaXMuZGF0YUluZGV4W3RoaXMuZGF0YUluZGV4Lmxlbmd0aCAtIDFdXG4gICAgKTtcbiAgfVxuXG4gIHJlbW92ZUl0ZW0oKSB7XG4gICAgdGhpcy5qc2YucmVtb3ZlSXRlbSh0aGlzKTtcbiAgfVxufVxuIl19