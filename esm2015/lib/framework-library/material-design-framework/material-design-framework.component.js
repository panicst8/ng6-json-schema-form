/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { ChangeDetectorRef, Component, Input } from '@angular/core';
import * as _ from 'lodash';
import { JsonSchemaFormService } from '../../json-schema-form.service';
import { isDefined } from '../../shared';
export class MaterialDesignFrameworkComponent {
    /**
     * @param {?} changeDetector
     * @param {?} jsf
     */
    constructor(changeDetector, jsf) {
        this.changeDetector = changeDetector;
        this.jsf = jsf;
        this.frameworkInitialized = false;
        this.formControl = null;
        this.parentArray = null;
        this.isOrderable = false;
        this.dynamicTitle = null;
    }
    /**
     * @return {?}
     */
    get showRemoveButton() {
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
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.initializeFramework();
    }
    /**
     * @return {?}
     */
    ngOnChanges() {
        if (!this.frameworkInitialized) {
            this.initializeFramework();
        }
        if (this.dynamicTitle) {
            this.updateTitle();
        }
    }
    /**
     * @return {?}
     */
    initializeFramework() {
        if (this.layoutNode) {
            this.options = _.cloneDeep(this.layoutNode.options || {});
            this.widgetLayoutNode = Object.assign({}, this.layoutNode, { options: _.cloneDeep(this.layoutNode.options || {}) });
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
    }
    /**
     * @return {?}
     */
    updateTitle() {
        this.widgetLayoutNode.options.title = this.jsf.parseText(this.dynamicTitle, this.jsf.getFormControlValue(this), this.jsf.getFormControlGroup(this).value, this.dataIndex[this.dataIndex.length - 1]);
    }
    /**
     * @return {?}
     */
    removeItem() {
        this.jsf.removeItem(this);
    }
}
MaterialDesignFrameworkComponent.decorators = [
    { type: Component, args: [{
                selector: 'material-design-framework',
                template: `
    <div
      [class.array-item]="widgetLayoutNode?.arrayItem && widgetLayoutNode?.type !== '$ref'"
      [orderable]="isOrderable"
      [dataIndex]="dataIndex"
      [layoutIndex]="layoutIndex"
      [layoutNode]="widgetLayoutNode">
      <svg *ngIf="showRemoveButton"
        xmlns="http://www.w3.org/2000/svg"
        height="18" width="18" viewBox="0 0 24 24"
        class="close-button"
        (click)="removeItem()">
        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
      </svg>
      <select-widget-widget
        [dataIndex]="dataIndex"
        [layoutIndex]="layoutIndex"
        [layoutNode]="widgetLayoutNode"></select-widget-widget>
    </div>
    <div class="spacer" *ngIf="widgetLayoutNode?.arrayItem && widgetLayoutNode?.type !== '$ref'"></div>`,
                styles: [`
    .array-item {
      border-radius: 2px;
      box-shadow: 0 3px 1px -2px rgba(0,0,0,.2),
                  0 2px 2px  0   rgba(0,0,0,.14),
                  0 1px 5px  0   rgba(0,0,0,.12);
      padding: 6px;
      position: relative;
      transition: all 280ms cubic-bezier(.4, 0, .2, 1);
    }
    .close-button {
      cursor: pointer;
      position: absolute;
      top: 6px;
      right: 6px;
      fill: rgba(0,0,0,.4);
      visibility: hidden;
      z-index: 500;
    }
    .close-button:hover { fill: rgba(0,0,0,.8); }
    .array-item:hover > .close-button { visibility: visible; }
    .spacer { margin: 6px 0; }
    [draggable=true]:hover {
      box-shadow: 0 5px 5px -3px rgba(0,0,0,.2),
                  0 8px 10px 1px rgba(0,0,0,.14),
                  0 3px 14px 2px rgba(0,0,0,.12);
      cursor: move;
      z-index: 10;
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
MaterialDesignFrameworkComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: JsonSchemaFormService }
];
MaterialDesignFrameworkComponent.propDecorators = {
    layoutNode: [{ type: Input }],
    layoutIndex: [{ type: Input }],
    dataIndex: [{ type: Input }]
};
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0ZXJpYWwtZGVzaWduLWZyYW1ld29yay5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZzYtanNvbi1zY2hlbWEtZm9ybS8iLCJzb3VyY2VzIjpbImxpYi9mcmFtZXdvcmstbGlicmFyeS9tYXRlcmlhbC1kZXNpZ24tZnJhbWV3b3JrL21hdGVyaWFsLWRlc2lnbi1mcmFtZXdvcmsuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBcUIsTUFBTSxlQUFlLENBQUM7QUFFdkYsT0FBTyxLQUFLLENBQUMsTUFBTSxRQUFRLENBQUM7QUFFNUIsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDdkUsT0FBTyxFQUFtQixTQUFTLEVBQWUsTUFBTSxjQUFjLENBQUM7QUErRHZFLE1BQU07Ozs7O0lBY0osWUFDVSxnQkFDQTtRQURBLG1CQUFjLEdBQWQsY0FBYztRQUNkLFFBQUcsR0FBSCxHQUFHO29DQWZVLEtBQUs7MkJBS1QsSUFBSTsyQkFDSixJQUFJOzJCQUNULEtBQUs7NEJBQ0ksSUFBSTtLQVF0Qjs7OztJQUVMLElBQUksZ0JBQWdCO1FBQ2xCLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUztZQUNuRCxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksS0FBSyxNQUMxRCxDQUFDLENBQUMsQ0FBQztZQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7U0FBRTtRQUNuQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQztZQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7U0FBRTtRQUN4RCxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFBQyxNQUFNLENBQUMsS0FBSyxDQUFDO1NBQUU7O1FBRXRFLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7O1lBRXJGLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7O2dCQUVqRCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7S0FDdkY7Ozs7SUFFRCxRQUFRO1FBQ04sSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7S0FDNUI7Ozs7SUFFRCxXQUFXO1FBQ1QsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDO1lBQUMsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7U0FBRTtRQUMvRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztZQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUFFO0tBQy9DOzs7O0lBRUQsbUJBQW1CO1FBQ2pCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUMsQ0FBQztZQUMxRCxJQUFJLENBQUMsZ0JBQWdCLHFCQUNoQixJQUFJLENBQUMsVUFBVSxJQUNsQixPQUFPLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUMsR0FDcEQsQ0FBQztZQUNGLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQztZQUNuRCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBRWpELEVBQUUsQ0FBQyxDQUNELFNBQVMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQztnQkFDckMsU0FBUyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDO2dCQUNyQyxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsSUFBSSxDQUNuQyxDQUFDLENBQUMsQ0FBQztnQkFDRCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUM7YUFDaEM7WUFFRCxFQUFFLENBQUMsQ0FDRCxDQUFDLENBQUMsTUFBTSxFQUFFLGtCQUFrQixFQUFFLGNBQWMsRUFBRSxRQUFRLEVBQUUsTUFBTTtnQkFDNUQsVUFBVSxFQUFFLGlCQUFpQixFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFNBQVM7Z0JBQ2xFLFFBQVEsRUFBRSxVQUFVLEVBQUUsTUFBTSxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDO2dCQUM5RCxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FDL0MsQ0FBQyxDQUFDLENBQUM7Z0JBQ0QsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQztnQkFDN0MsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO2FBQ3BCO1lBRUQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEtBQUssTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDakUsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDaEQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7b0JBQ3JCLElBQUksQ0FBQyxXQUFXO3dCQUNkLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssS0FBSzs0QkFDM0MsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEtBQUssTUFBTTs0QkFDeEMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVE7NEJBQzVCLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQztpQkFDdEM7YUFDRjtZQUVELElBQUksQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLENBQUM7U0FDbEM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLElBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO1NBQ25CO0tBQ0Y7Ozs7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQ3RELElBQUksQ0FBQyxZQUFZLEVBQ2pCLElBQUksQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLEVBQ2xDLElBQUksQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxFQUN4QyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUMxQyxDQUFDO0tBQ0g7Ozs7SUFFRCxVQUFVO1FBQ1IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDM0I7OztZQS9KRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLDJCQUEyQjtnQkFDckMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O3dHQW1CNEY7Z0JBQ3RHLE1BQU0sRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBcUNSLENBQUM7YUFDSDs7OztZQW5FUSxpQkFBaUI7WUFJakIscUJBQXFCOzs7eUJBMEUzQixLQUFLOzBCQUNMLEtBQUs7d0JBQ0wsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdG9yUmVmLCBDb21wb25lbnQsIElucHV0LCBPbkNoYW5nZXMsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG5cbmltcG9ydCB7IEpzb25TY2hlbWFGb3JtU2VydmljZSB9IGZyb20gJy4uLy4uL2pzb24tc2NoZW1hLWZvcm0uc2VydmljZSc7XG5pbXBvcnQgeyBoYXNPd24sIGlzQXJyYXksIGlzRGVmaW5lZCwgdG9UaXRsZUNhc2UgfSBmcm9tICcuLi8uLi9zaGFyZWQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtYXRlcmlhbC1kZXNpZ24tZnJhbWV3b3JrJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2XG4gICAgICBbY2xhc3MuYXJyYXktaXRlbV09XCJ3aWRnZXRMYXlvdXROb2RlPy5hcnJheUl0ZW0gJiYgd2lkZ2V0TGF5b3V0Tm9kZT8udHlwZSAhPT0gJyRyZWYnXCJcbiAgICAgIFtvcmRlcmFibGVdPVwiaXNPcmRlcmFibGVcIlxuICAgICAgW2RhdGFJbmRleF09XCJkYXRhSW5kZXhcIlxuICAgICAgW2xheW91dEluZGV4XT1cImxheW91dEluZGV4XCJcbiAgICAgIFtsYXlvdXROb2RlXT1cIndpZGdldExheW91dE5vZGVcIj5cbiAgICAgIDxzdmcgKm5nSWY9XCJzaG93UmVtb3ZlQnV0dG9uXCJcbiAgICAgICAgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiXG4gICAgICAgIGhlaWdodD1cIjE4XCIgd2lkdGg9XCIxOFwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIlxuICAgICAgICBjbGFzcz1cImNsb3NlLWJ1dHRvblwiXG4gICAgICAgIChjbGljayk9XCJyZW1vdmVJdGVtKClcIj5cbiAgICAgICAgPHBhdGggZD1cIk0xOSA2LjQxTDE3LjU5IDUgMTIgMTAuNTkgNi40MSA1IDUgNi40MSAxMC41OSAxMiA1IDE3LjU5IDYuNDEgMTkgMTIgMTMuNDEgMTcuNTkgMTkgMTkgMTcuNTkgMTMuNDEgMTIgMTkgNi40MXpcIi8+XG4gICAgICA8L3N2Zz5cbiAgICAgIDxzZWxlY3Qtd2lkZ2V0LXdpZGdldFxuICAgICAgICBbZGF0YUluZGV4XT1cImRhdGFJbmRleFwiXG4gICAgICAgIFtsYXlvdXRJbmRleF09XCJsYXlvdXRJbmRleFwiXG4gICAgICAgIFtsYXlvdXROb2RlXT1cIndpZGdldExheW91dE5vZGVcIj48L3NlbGVjdC13aWRnZXQtd2lkZ2V0PlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJzcGFjZXJcIiAqbmdJZj1cIndpZGdldExheW91dE5vZGU/LmFycmF5SXRlbSAmJiB3aWRnZXRMYXlvdXROb2RlPy50eXBlICE9PSAnJHJlZidcIj48L2Rpdj5gLFxuICBzdHlsZXM6IFtgXG4gICAgLmFycmF5LWl0ZW0ge1xuICAgICAgYm9yZGVyLXJhZGl1czogMnB4O1xuICAgICAgYm94LXNoYWRvdzogMCAzcHggMXB4IC0ycHggcmdiYSgwLDAsMCwuMiksXG4gICAgICAgICAgICAgICAgICAwIDJweCAycHggIDAgICByZ2JhKDAsMCwwLC4xNCksXG4gICAgICAgICAgICAgICAgICAwIDFweCA1cHggIDAgICByZ2JhKDAsMCwwLC4xMik7XG4gICAgICBwYWRkaW5nOiA2cHg7XG4gICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICB0cmFuc2l0aW9uOiBhbGwgMjgwbXMgY3ViaWMtYmV6aWVyKC40LCAwLCAuMiwgMSk7XG4gICAgfVxuICAgIC5jbG9zZS1idXR0b24ge1xuICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgdG9wOiA2cHg7XG4gICAgICByaWdodDogNnB4O1xuICAgICAgZmlsbDogcmdiYSgwLDAsMCwuNCk7XG4gICAgICB2aXNpYmlsaXR5OiBoaWRkZW47XG4gICAgICB6LWluZGV4OiA1MDA7XG4gICAgfVxuICAgIC5jbG9zZS1idXR0b246aG92ZXIgeyBmaWxsOiByZ2JhKDAsMCwwLC44KTsgfVxuICAgIC5hcnJheS1pdGVtOmhvdmVyID4gLmNsb3NlLWJ1dHRvbiB7IHZpc2liaWxpdHk6IHZpc2libGU7IH1cbiAgICAuc3BhY2VyIHsgbWFyZ2luOiA2cHggMDsgfVxuICAgIFtkcmFnZ2FibGU9dHJ1ZV06aG92ZXIge1xuICAgICAgYm94LXNoYWRvdzogMCA1cHggNXB4IC0zcHggcmdiYSgwLDAsMCwuMiksXG4gICAgICAgICAgICAgICAgICAwIDhweCAxMHB4IDFweCByZ2JhKDAsMCwwLC4xNCksXG4gICAgICAgICAgICAgICAgICAwIDNweCAxNHB4IDJweCByZ2JhKDAsMCwwLC4xMik7XG4gICAgICBjdXJzb3I6IG1vdmU7XG4gICAgICB6LWluZGV4OiAxMDtcbiAgICB9XG4gICAgW2RyYWdnYWJsZT10cnVlXS5kcmFnLXRhcmdldC10b3Age1xuICAgICAgYm94LXNoYWRvdzogMCAtMnB4IDAgIzAwMDtcbiAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTsgei1pbmRleDogMjA7XG4gICAgfVxuICAgIFtkcmFnZ2FibGU9dHJ1ZV0uZHJhZy10YXJnZXQtYm90dG9tIHtcbiAgICAgIGJveC1zaGFkb3c6IDAgMnB4IDAgIzAwMDtcbiAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTsgei1pbmRleDogMjA7XG4gICAgfVxuICBgXSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0ZXJpYWxEZXNpZ25GcmFtZXdvcmtDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XG4gIGZyYW1ld29ya0luaXRpYWxpemVkID0gZmFsc2U7XG4gIGlucHV0VHlwZTogc3RyaW5nO1xuICBvcHRpb25zOiBhbnk7IC8vIE9wdGlvbnMgdXNlZCBpbiB0aGlzIGZyYW1ld29ya1xuICB3aWRnZXRMYXlvdXROb2RlOiBhbnk7IC8vIGxheW91dE5vZGUgcGFzc2VkIHRvIGNoaWxkIHdpZGdldFxuICB3aWRnZXRPcHRpb25zOiBhbnk7IC8vIE9wdGlvbnMgcGFzc2VkIHRvIGNoaWxkIHdpZGdldFxuICBmb3JtQ29udHJvbDogYW55ID0gbnVsbDtcbiAgcGFyZW50QXJyYXk6IGFueSA9IG51bGw7XG4gIGlzT3JkZXJhYmxlID0gZmFsc2U7XG4gIGR5bmFtaWNUaXRsZTogc3RyaW5nID0gbnVsbDtcbiAgQElucHV0KCkgbGF5b3V0Tm9kZTogYW55O1xuICBASW5wdXQoKSBsYXlvdXRJbmRleDogbnVtYmVyW107XG4gIEBJbnB1dCgpIGRhdGFJbmRleDogbnVtYmVyW107XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBjaGFuZ2VEZXRlY3RvcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgcHJpdmF0ZSBqc2Y6IEpzb25TY2hlbWFGb3JtU2VydmljZVxuICApIHsgfVxuXG4gIGdldCBzaG93UmVtb3ZlQnV0dG9uKCk6IGJvb2xlYW4ge1xuICAgIGlmICghdGhpcy5sYXlvdXROb2RlIHx8ICF0aGlzLndpZGdldE9wdGlvbnMucmVtb3ZhYmxlIHx8XG4gICAgICB0aGlzLndpZGdldE9wdGlvbnMucmVhZG9ubHkgfHwgdGhpcy5sYXlvdXROb2RlLnR5cGUgPT09ICckcmVmJ1xuICAgICkgeyByZXR1cm4gZmFsc2U7IH1cbiAgICBpZiAodGhpcy5sYXlvdXROb2RlLnJlY3Vyc2l2ZVJlZmVyZW5jZSkgeyByZXR1cm4gdHJ1ZTsgfVxuICAgIGlmICghdGhpcy5sYXlvdXROb2RlLmFycmF5SXRlbSB8fCAhdGhpcy5wYXJlbnRBcnJheSkgeyByZXR1cm4gZmFsc2U7IH1cbiAgICAvLyBJZiBhcnJheSBsZW5ndGggPD0gbWluSXRlbXMsIGRvbid0IGFsbG93IHJlbW92aW5nIGFueSBpdGVtc1xuICAgIHJldHVybiB0aGlzLnBhcmVudEFycmF5Lml0ZW1zLmxlbmd0aCAtIDEgPD0gdGhpcy5wYXJlbnRBcnJheS5vcHRpb25zLm1pbkl0ZW1zID8gZmFsc2UgOlxuICAgICAgLy8gRm9yIHJlbW92YWJsZSBsaXN0IGl0ZW1zLCBhbGxvdyByZW1vdmluZyBhbnkgaXRlbVxuICAgICAgdGhpcy5sYXlvdXROb2RlLmFycmF5SXRlbVR5cGUgPT09ICdsaXN0JyA/IHRydWUgOlxuICAgICAgLy8gRm9yIHJlbW92YWJsZSB0dXBsZSBpdGVtcywgb25seSBhbGxvdyByZW1vdmluZyBsYXN0IGl0ZW0gaW4gbGlzdFxuICAgICAgdGhpcy5sYXlvdXRJbmRleFt0aGlzLmxheW91dEluZGV4Lmxlbmd0aCAtIDFdID09PSB0aGlzLnBhcmVudEFycmF5Lml0ZW1zLmxlbmd0aCAtIDI7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmluaXRpYWxpemVGcmFtZXdvcmsoKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKCkge1xuICAgIGlmICghdGhpcy5mcmFtZXdvcmtJbml0aWFsaXplZCkgeyB0aGlzLmluaXRpYWxpemVGcmFtZXdvcmsoKTsgfVxuICAgIGlmICh0aGlzLmR5bmFtaWNUaXRsZSkgeyB0aGlzLnVwZGF0ZVRpdGxlKCk7IH1cbiAgfVxuXG4gIGluaXRpYWxpemVGcmFtZXdvcmsoKSB7XG4gICAgaWYgKHRoaXMubGF5b3V0Tm9kZSkge1xuICAgICAgdGhpcy5vcHRpb25zID0gXy5jbG9uZURlZXAodGhpcy5sYXlvdXROb2RlLm9wdGlvbnMgfHwge30pO1xuICAgICAgdGhpcy53aWRnZXRMYXlvdXROb2RlID0ge1xuICAgICAgICAuLi50aGlzLmxheW91dE5vZGUsXG4gICAgICAgIG9wdGlvbnM6IF8uY2xvbmVEZWVwKHRoaXMubGF5b3V0Tm9kZS5vcHRpb25zIHx8IHt9KVxuICAgICAgfTtcbiAgICAgIHRoaXMud2lkZ2V0T3B0aW9ucyA9IHRoaXMud2lkZ2V0TGF5b3V0Tm9kZS5vcHRpb25zO1xuICAgICAgdGhpcy5mb3JtQ29udHJvbCA9IHRoaXMuanNmLmdldEZvcm1Db250cm9sKHRoaXMpO1xuXG4gICAgICBpZiAoXG4gICAgICAgIGlzRGVmaW5lZCh0aGlzLndpZGdldE9wdGlvbnMubWluaW11bSkgJiZcbiAgICAgICAgaXNEZWZpbmVkKHRoaXMud2lkZ2V0T3B0aW9ucy5tYXhpbXVtKSAmJlxuICAgICAgICB0aGlzLndpZGdldE9wdGlvbnMubXVsdGlwbGVPZiA+PSAxXG4gICAgICApIHtcbiAgICAgICAgdGhpcy5sYXlvdXROb2RlLnR5cGUgPSAncmFuZ2UnO1xuICAgICAgfVxuXG4gICAgICBpZiAoXG4gICAgICAgICFbJyRyZWYnLCAnYWR2YW5jZWRmaWVsZHNldCcsICdhdXRoZmllbGRzZXQnLCAnYnV0dG9uJywgJ2NhcmQnLFxuICAgICAgICAgICdjaGVja2JveCcsICdleHBhbnNpb24tcGFuZWwnLCAnaGVscCcsICdtZXNzYWdlJywgJ21zZycsICdzZWN0aW9uJyxcbiAgICAgICAgICAnc3VibWl0JywgJ3RhYmFycmF5JywgJ3RhYnMnXS5pbmNsdWRlcyh0aGlzLmxheW91dE5vZGUudHlwZSkgJiZcbiAgICAgICAgL3t7Lis/fX0vLnRlc3QodGhpcy53aWRnZXRPcHRpb25zLnRpdGxlIHx8ICcnKVxuICAgICAgKSB7XG4gICAgICAgIHRoaXMuZHluYW1pY1RpdGxlID0gdGhpcy53aWRnZXRPcHRpb25zLnRpdGxlO1xuICAgICAgICB0aGlzLnVwZGF0ZVRpdGxlKCk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmxheW91dE5vZGUuYXJyYXlJdGVtICYmIHRoaXMubGF5b3V0Tm9kZS50eXBlICE9PSAnJHJlZicpIHtcbiAgICAgICAgdGhpcy5wYXJlbnRBcnJheSA9IHRoaXMuanNmLmdldFBhcmVudE5vZGUodGhpcyk7XG4gICAgICAgIGlmICh0aGlzLnBhcmVudEFycmF5KSB7XG4gICAgICAgICAgdGhpcy5pc09yZGVyYWJsZSA9XG4gICAgICAgICAgICB0aGlzLnBhcmVudEFycmF5LnR5cGUuc2xpY2UoMCwgMykgIT09ICd0YWInICYmXG4gICAgICAgICAgICB0aGlzLmxheW91dE5vZGUuYXJyYXlJdGVtVHlwZSA9PT0gJ2xpc3QnICYmXG4gICAgICAgICAgICAhdGhpcy53aWRnZXRPcHRpb25zLnJlYWRvbmx5ICYmXG4gICAgICAgICAgICB0aGlzLnBhcmVudEFycmF5Lm9wdGlvbnMub3JkZXJhYmxlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHRoaXMuZnJhbWV3b3JrSW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm9wdGlvbnMgPSB7fTtcbiAgICB9XG4gIH1cblxuICB1cGRhdGVUaXRsZSgpIHtcbiAgICB0aGlzLndpZGdldExheW91dE5vZGUub3B0aW9ucy50aXRsZSA9IHRoaXMuanNmLnBhcnNlVGV4dChcbiAgICAgIHRoaXMuZHluYW1pY1RpdGxlLFxuICAgICAgdGhpcy5qc2YuZ2V0Rm9ybUNvbnRyb2xWYWx1ZSh0aGlzKSxcbiAgICAgIHRoaXMuanNmLmdldEZvcm1Db250cm9sR3JvdXAodGhpcykudmFsdWUsXG4gICAgICB0aGlzLmRhdGFJbmRleFt0aGlzLmRhdGFJbmRleC5sZW5ndGggLSAxXVxuICAgICk7XG4gIH1cblxuICByZW1vdmVJdGVtKCkge1xuICAgIHRoaXMuanNmLnJlbW92ZUl0ZW0odGhpcyk7XG4gIH1cbn1cbiJdfQ==