/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { JsonSchemaFormService } from '../../json-schema-form.service';
import { buildTitleMap } from '../../shared';
var MaterialCheckboxesComponent = /** @class */ (function () {
    function MaterialCheckboxesComponent(jsf) {
        this.jsf = jsf;
        this.controlDisabled = false;
        this.boundControl = false;
        this.horizontalList = false;
        this.checkboxList = [];
    }
    /**
     * @return {?}
     */
    MaterialCheckboxesComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.options = this.layoutNode.options || {};
        this.horizontalList = this.layoutNode.type === 'checkboxes-inline' ||
            this.layoutNode.type === 'checkboxbuttons';
        this.jsf.initializeControl(this);
        this.checkboxList = buildTitleMap(this.options.titleMap || this.options.enumNames, this.options.enum, true);
        if (this.boundControl) {
            /** @type {?} */
            var formArray = this.jsf.getFormControl(this);
            try {
                for (var _a = tslib_1.__values(this.checkboxList), _b = _a.next(); !_b.done; _b = _a.next()) {
                    var checkboxItem = _b.value;
                    checkboxItem.checked = formArray.value.includes(checkboxItem.value);
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
    Object.defineProperty(MaterialCheckboxesComponent.prototype, "allChecked", {
        get: /**
         * @return {?}
         */
        function () {
            return this.checkboxList.filter(function (t) { return t.checked; }).length === this.checkboxList.length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MaterialCheckboxesComponent.prototype, "someChecked", {
        get: /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var checkedItems = this.checkboxList.filter(function (t) { return t.checked; }).length;
            return checkedItems > 0 && checkedItems < this.checkboxList.length;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    MaterialCheckboxesComponent.prototype.updateValue = /**
     * @return {?}
     */
    function () {
        this.options.showErrors = true;
        if (this.boundControl) {
            this.jsf.updateArrayCheckboxList(this, this.checkboxList);
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    MaterialCheckboxesComponent.prototype.updateAllValues = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.options.showErrors = true;
        this.checkboxList.forEach(function (t) { return t.checked = event.checked; });
        this.updateValue();
    };
    MaterialCheckboxesComponent.decorators = [
        { type: Component, args: [{
                    selector: 'material-checkboxes-widget',
                    template: "\n    <div>\n      <mat-checkbox type=\"checkbox\"\n        [checked]=\"allChecked\"\n        [color]=\"options?.color || 'primary'\"\n        [disabled]=\"controlDisabled || options?.readonly\"\n        [indeterminate]=\"someChecked\"\n        [name]=\"options?.name\"\n        (blur)=\"options.showErrors = true\"\n        (change)=\"updateAllValues($event)\">\n        <span class=\"checkbox-name\" [innerHTML]=\"options?.name\"></span>\n      </mat-checkbox>\n      <label *ngIf=\"options?.title\"\n        class=\"title\"\n        [class]=\"options?.labelHtmlClass || ''\"\n        [style.display]=\"options?.notitle ? 'none' : ''\"\n        [innerHTML]=\"options?.title\"></label>\n      <ul class=\"checkbox-list\" [class.horizontal-list]=\"horizontalList\">\n        <li *ngFor=\"let checkboxItem of checkboxList\"\n          [class]=\"options?.htmlClass || ''\">\n          <mat-checkbox type=\"checkbox\"\n            [(ngModel)]=\"checkboxItem.checked\"\n            [color]=\"options?.color || 'primary'\"\n            [disabled]=\"controlDisabled || options?.readonly\"\n            [name]=\"checkboxItem?.name\"\n            (blur)=\"options.showErrors = true\"\n            (change)=\"updateValue()\">\n            <span class=\"checkbox-name\" [innerHTML]=\"checkboxItem?.name\"></span>\n          </mat-checkbox>\n        </li>\n      </ul>\n      <mat-error *ngIf=\"options?.showErrors && options?.errorMessage\"\n        [innerHTML]=\"options?.errorMessage\"></mat-error>\n    </div>",
                    styles: ["\n    .title { font-weight: bold; }\n    .checkbox-list { list-style-type: none; }\n    .horizontal-list > li { display: inline-block; margin-right: 10px; zoom: 1; }\n    .checkbox-name { white-space: nowrap; }\n    mat-error { font-size: 75%; }\n  "],
                },] },
    ];
    /** @nocollapse */
    MaterialCheckboxesComponent.ctorParameters = function () { return [
        { type: JsonSchemaFormService }
    ]; };
    MaterialCheckboxesComponent.propDecorators = {
        layoutNode: [{ type: Input }],
        layoutIndex: [{ type: Input }],
        dataIndex: [{ type: Input }]
    };
    return MaterialCheckboxesComponent;
}());
export { MaterialCheckboxesComponent };
if (false) {
    /** @type {?} */
    MaterialCheckboxesComponent.prototype.formControl;
    /** @type {?} */
    MaterialCheckboxesComponent.prototype.controlName;
    /** @type {?} */
    MaterialCheckboxesComponent.prototype.controlValue;
    /** @type {?} */
    MaterialCheckboxesComponent.prototype.controlDisabled;
    /** @type {?} */
    MaterialCheckboxesComponent.prototype.boundControl;
    /** @type {?} */
    MaterialCheckboxesComponent.prototype.options;
    /** @type {?} */
    MaterialCheckboxesComponent.prototype.horizontalList;
    /** @type {?} */
    MaterialCheckboxesComponent.prototype.formArray;
    /** @type {?} */
    MaterialCheckboxesComponent.prototype.checkboxList;
    /** @type {?} */
    MaterialCheckboxesComponent.prototype.layoutNode;
    /** @type {?} */
    MaterialCheckboxesComponent.prototype.layoutIndex;
    /** @type {?} */
    MaterialCheckboxesComponent.prototype.dataIndex;
    /** @type {?} */
    MaterialCheckboxesComponent.prototype.jsf;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0ZXJpYWwtY2hlY2tib3hlcy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZzYtanNvbi1zY2hlbWEtZm9ybS8iLCJzb3VyY2VzIjpbImxpYi9mcmFtZXdvcmstbGlicmFyeS9tYXRlcmlhbC1kZXNpZ24tZnJhbWV3b3JrL21hdGVyaWFsLWNoZWNrYm94ZXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFHekQsT0FBTyxFQUFFLHFCQUFxQixFQUFnQixNQUFNLGdDQUFnQyxDQUFDO0FBQ3JGLE9BQU8sRUFBa0IsYUFBYSxFQUF1QixNQUFNLGNBQWMsQ0FBQzs7SUErRGhGLHFDQUNVO1FBQUEsUUFBRyxHQUFILEdBQUc7K0JBWEssS0FBSzs0QkFDUixLQUFLOzhCQUVILEtBQUs7NEJBRVMsRUFBRTtLQU81Qjs7OztJQUVMLDhDQUFROzs7SUFBUjtRQUNFLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFDO1FBQzdDLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEtBQUssbUJBQW1CO1lBQ2hFLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxLQUFLLGlCQUFpQixDQUFDO1FBQzdDLElBQUksQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDakMsSUFBSSxDQUFDLFlBQVksR0FBRyxhQUFhLENBQy9CLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLElBQUksQ0FDekUsQ0FBQztRQUNGLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDOztZQUN0QixJQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQzs7Z0JBQ2hELEdBQUcsQ0FBQyxDQUFxQixJQUFBLEtBQUEsaUJBQUEsSUFBSSxDQUFDLFlBQVksQ0FBQSxnQkFBQTtvQkFBckMsSUFBSSxZQUFZLFdBQUE7b0JBQ25CLFlBQVksQ0FBQyxPQUFPLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUNyRTs7Ozs7Ozs7O1NBQ0Y7O0tBQ0Y7SUFFRCxzQkFBSSxtREFBVTs7OztRQUFkO1lBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLE9BQU8sRUFBVCxDQUFTLENBQUMsQ0FBQyxNQUFNLEtBQUssSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUM7U0FDckY7OztPQUFBO0lBRUQsc0JBQUksb0RBQVc7Ozs7UUFBZjs7WUFDRSxJQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxPQUFPLEVBQVQsQ0FBUyxDQUFDLENBQUMsTUFBTSxDQUFDO1lBQ3JFLE1BQU0sQ0FBQyxZQUFZLEdBQUcsQ0FBQyxJQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQztTQUNwRTs7O09BQUE7Ozs7SUFFRCxpREFBVzs7O0lBQVg7UUFDRSxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7UUFDL0IsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7WUFDdEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQzNEO0tBQ0Y7Ozs7O0lBRUQscURBQWU7Ozs7SUFBZixVQUFnQixLQUFVO1FBQ3hCLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztRQUMvQixJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDLE9BQU8sRUFBekIsQ0FBeUIsQ0FBQyxDQUFDO1FBQzFELElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztLQUNwQjs7Z0JBbEdGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsNEJBQTRCO29CQUN0QyxRQUFRLEVBQUUsZytDQWlDRDtvQkFDVCxNQUFNLEVBQUUsQ0FBQywyUEFNUixDQUFDO2lCQUNIOzs7O2dCQWpEUSxxQkFBcUI7Ozs2QkE0RDNCLEtBQUs7OEJBQ0wsS0FBSzs0QkFDTCxLQUFLOztzQ0FqRVI7O1NBcURhLDJCQUEyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUFycmF5LCBBYnN0cmFjdENvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmltcG9ydCB7IEpzb25TY2hlbWFGb3JtU2VydmljZSwgVGl0bGVNYXBJdGVtIH0gZnJvbSAnLi4vLi4vanNvbi1zY2hlbWEtZm9ybS5zZXJ2aWNlJztcbmltcG9ydCB7IGJ1aWxkRm9ybUdyb3VwLCBidWlsZFRpdGxlTWFwLCBoYXNPd24sIEpzb25Qb2ludGVyIH0gZnJvbSAnLi4vLi4vc2hhcmVkJztcblxuLy8gVE9ETzogQ2hhbmdlIHRoaXMgdG8gdXNlIGEgU2VsZWN0aW9uIExpc3QgaW5zdGVhZD9cbi8vIGh0dHBzOi8vbWF0ZXJpYWwuYW5ndWxhci5pby9jb21wb25lbnRzL2xpc3Qvb3ZlcnZpZXdcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWF0ZXJpYWwtY2hlY2tib3hlcy13aWRnZXQnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXY+XG4gICAgICA8bWF0LWNoZWNrYm94IHR5cGU9XCJjaGVja2JveFwiXG4gICAgICAgIFtjaGVja2VkXT1cImFsbENoZWNrZWRcIlxuICAgICAgICBbY29sb3JdPVwib3B0aW9ucz8uY29sb3IgfHwgJ3ByaW1hcnknXCJcbiAgICAgICAgW2Rpc2FibGVkXT1cImNvbnRyb2xEaXNhYmxlZCB8fCBvcHRpb25zPy5yZWFkb25seVwiXG4gICAgICAgIFtpbmRldGVybWluYXRlXT1cInNvbWVDaGVja2VkXCJcbiAgICAgICAgW25hbWVdPVwib3B0aW9ucz8ubmFtZVwiXG4gICAgICAgIChibHVyKT1cIm9wdGlvbnMuc2hvd0Vycm9ycyA9IHRydWVcIlxuICAgICAgICAoY2hhbmdlKT1cInVwZGF0ZUFsbFZhbHVlcygkZXZlbnQpXCI+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwiY2hlY2tib3gtbmFtZVwiIFtpbm5lckhUTUxdPVwib3B0aW9ucz8ubmFtZVwiPjwvc3Bhbj5cbiAgICAgIDwvbWF0LWNoZWNrYm94PlxuICAgICAgPGxhYmVsICpuZ0lmPVwib3B0aW9ucz8udGl0bGVcIlxuICAgICAgICBjbGFzcz1cInRpdGxlXCJcbiAgICAgICAgW2NsYXNzXT1cIm9wdGlvbnM/LmxhYmVsSHRtbENsYXNzIHx8ICcnXCJcbiAgICAgICAgW3N0eWxlLmRpc3BsYXldPVwib3B0aW9ucz8ubm90aXRsZSA/ICdub25lJyA6ICcnXCJcbiAgICAgICAgW2lubmVySFRNTF09XCJvcHRpb25zPy50aXRsZVwiPjwvbGFiZWw+XG4gICAgICA8dWwgY2xhc3M9XCJjaGVja2JveC1saXN0XCIgW2NsYXNzLmhvcml6b250YWwtbGlzdF09XCJob3Jpem9udGFsTGlzdFwiPlxuICAgICAgICA8bGkgKm5nRm9yPVwibGV0IGNoZWNrYm94SXRlbSBvZiBjaGVja2JveExpc3RcIlxuICAgICAgICAgIFtjbGFzc109XCJvcHRpb25zPy5odG1sQ2xhc3MgfHwgJydcIj5cbiAgICAgICAgICA8bWF0LWNoZWNrYm94IHR5cGU9XCJjaGVja2JveFwiXG4gICAgICAgICAgICBbKG5nTW9kZWwpXT1cImNoZWNrYm94SXRlbS5jaGVja2VkXCJcbiAgICAgICAgICAgIFtjb2xvcl09XCJvcHRpb25zPy5jb2xvciB8fCAncHJpbWFyeSdcIlxuICAgICAgICAgICAgW2Rpc2FibGVkXT1cImNvbnRyb2xEaXNhYmxlZCB8fCBvcHRpb25zPy5yZWFkb25seVwiXG4gICAgICAgICAgICBbbmFtZV09XCJjaGVja2JveEl0ZW0/Lm5hbWVcIlxuICAgICAgICAgICAgKGJsdXIpPVwib3B0aW9ucy5zaG93RXJyb3JzID0gdHJ1ZVwiXG4gICAgICAgICAgICAoY2hhbmdlKT1cInVwZGF0ZVZhbHVlKClcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiY2hlY2tib3gtbmFtZVwiIFtpbm5lckhUTUxdPVwiY2hlY2tib3hJdGVtPy5uYW1lXCI+PC9zcGFuPlxuICAgICAgICAgIDwvbWF0LWNoZWNrYm94PlxuICAgICAgICA8L2xpPlxuICAgICAgPC91bD5cbiAgICAgIDxtYXQtZXJyb3IgKm5nSWY9XCJvcHRpb25zPy5zaG93RXJyb3JzICYmIG9wdGlvbnM/LmVycm9yTWVzc2FnZVwiXG4gICAgICAgIFtpbm5lckhUTUxdPVwib3B0aW9ucz8uZXJyb3JNZXNzYWdlXCI+PC9tYXQtZXJyb3I+XG4gICAgPC9kaXY+YCxcbiAgc3R5bGVzOiBbYFxuICAgIC50aXRsZSB7IGZvbnQtd2VpZ2h0OiBib2xkOyB9XG4gICAgLmNoZWNrYm94LWxpc3QgeyBsaXN0LXN0eWxlLXR5cGU6IG5vbmU7IH1cbiAgICAuaG9yaXpvbnRhbC1saXN0ID4gbGkgeyBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7IG1hcmdpbi1yaWdodDogMTBweDsgem9vbTogMTsgfVxuICAgIC5jaGVja2JveC1uYW1lIHsgd2hpdGUtc3BhY2U6IG5vd3JhcDsgfVxuICAgIG1hdC1lcnJvciB7IGZvbnQtc2l6ZTogNzUlOyB9XG4gIGBdLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRlcmlhbENoZWNrYm94ZXNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBmb3JtQ29udHJvbDogQWJzdHJhY3RDb250cm9sO1xuICBjb250cm9sTmFtZTogc3RyaW5nO1xuICBjb250cm9sVmFsdWU6IGFueTtcbiAgY29udHJvbERpc2FibGVkID0gZmFsc2U7XG4gIGJvdW5kQ29udHJvbCA9IGZhbHNlO1xuICBvcHRpb25zOiBhbnk7XG4gIGhvcml6b250YWxMaXN0ID0gZmFsc2U7XG4gIGZvcm1BcnJheTogQWJzdHJhY3RDb250cm9sO1xuICBjaGVja2JveExpc3Q6IFRpdGxlTWFwSXRlbVtdID0gW107XG4gIEBJbnB1dCgpIGxheW91dE5vZGU6IGFueTtcbiAgQElucHV0KCkgbGF5b3V0SW5kZXg6IG51bWJlcltdO1xuICBASW5wdXQoKSBkYXRhSW5kZXg6IG51bWJlcltdO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUganNmOiBKc29uU2NoZW1hRm9ybVNlcnZpY2VcbiAgKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLm9wdGlvbnMgPSB0aGlzLmxheW91dE5vZGUub3B0aW9ucyB8fCB7fTtcbiAgICB0aGlzLmhvcml6b250YWxMaXN0ID0gdGhpcy5sYXlvdXROb2RlLnR5cGUgPT09ICdjaGVja2JveGVzLWlubGluZScgfHxcbiAgICAgIHRoaXMubGF5b3V0Tm9kZS50eXBlID09PSAnY2hlY2tib3hidXR0b25zJztcbiAgICB0aGlzLmpzZi5pbml0aWFsaXplQ29udHJvbCh0aGlzKTtcbiAgICB0aGlzLmNoZWNrYm94TGlzdCA9IGJ1aWxkVGl0bGVNYXAoXG4gICAgICB0aGlzLm9wdGlvbnMudGl0bGVNYXAgfHwgdGhpcy5vcHRpb25zLmVudW1OYW1lcywgdGhpcy5vcHRpb25zLmVudW0sIHRydWVcbiAgICApO1xuICAgIGlmICh0aGlzLmJvdW5kQ29udHJvbCkge1xuICAgICAgY29uc3QgZm9ybUFycmF5ID0gdGhpcy5qc2YuZ2V0Rm9ybUNvbnRyb2wodGhpcyk7XG4gICAgICBmb3IgKGxldCBjaGVja2JveEl0ZW0gb2YgdGhpcy5jaGVja2JveExpc3QpIHtcbiAgICAgICAgY2hlY2tib3hJdGVtLmNoZWNrZWQgPSBmb3JtQXJyYXkudmFsdWUuaW5jbHVkZXMoY2hlY2tib3hJdGVtLnZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBnZXQgYWxsQ2hlY2tlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5jaGVja2JveExpc3QuZmlsdGVyKHQgPT4gdC5jaGVja2VkKS5sZW5ndGggPT09IHRoaXMuY2hlY2tib3hMaXN0Lmxlbmd0aDtcbiAgfVxuXG4gIGdldCBzb21lQ2hlY2tlZCgpOiBib29sZWFuIHtcbiAgICBjb25zdCBjaGVja2VkSXRlbXMgPSB0aGlzLmNoZWNrYm94TGlzdC5maWx0ZXIodCA9PiB0LmNoZWNrZWQpLmxlbmd0aDtcbiAgICByZXR1cm4gY2hlY2tlZEl0ZW1zID4gMCAmJiBjaGVja2VkSXRlbXMgPCB0aGlzLmNoZWNrYm94TGlzdC5sZW5ndGg7XG4gIH1cblxuICB1cGRhdGVWYWx1ZSgpIHtcbiAgICB0aGlzLm9wdGlvbnMuc2hvd0Vycm9ycyA9IHRydWU7XG4gICAgaWYgKHRoaXMuYm91bmRDb250cm9sKSB7XG4gICAgICB0aGlzLmpzZi51cGRhdGVBcnJheUNoZWNrYm94TGlzdCh0aGlzLCB0aGlzLmNoZWNrYm94TGlzdCk7XG4gICAgfVxuICB9XG5cbiAgdXBkYXRlQWxsVmFsdWVzKGV2ZW50OiBhbnkpIHtcbiAgICB0aGlzLm9wdGlvbnMuc2hvd0Vycm9ycyA9IHRydWU7XG4gICAgdGhpcy5jaGVja2JveExpc3QuZm9yRWFjaCh0ID0+IHQuY2hlY2tlZCA9IGV2ZW50LmNoZWNrZWQpO1xuICAgIHRoaXMudXBkYXRlVmFsdWUoKTtcbiAgfVxufVxuIl19