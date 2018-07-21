/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { JsonSchemaFormService } from '../json-schema-form.service';
import { buildTitleMap, isArray } from '../shared';
var SelectComponent = /** @class */ (function () {
    function SelectComponent(jsf) {
        this.jsf = jsf;
        this.controlDisabled = false;
        this.boundControl = false;
        this.selectList = [];
        this.isArray = isArray;
    }
    /**
     * @return {?}
     */
    SelectComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.options = this.layoutNode.options || {};
        this.selectList = buildTitleMap(this.options.titleMap || this.options.enumNames, this.options.enum, !!this.options.required, !!this.options.flatList);
        this.jsf.initializeControl(this);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    SelectComponent.prototype.updateValue = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.jsf.updateValue(this, event.target.value);
    };
    SelectComponent.decorators = [
        { type: Component, args: [{
                    selector: 'select-widget',
                    template: "\n    <div\n      [class]=\"options?.htmlClass || ''\">\n      <label *ngIf=\"options?.title\"\n        [attr.for]=\"'control' + layoutNode?._id\"\n        [class]=\"options?.labelHtmlClass || ''\"\n        [style.display]=\"options?.notitle ? 'none' : ''\"\n        [innerHTML]=\"options?.title\"></label>\n      <select *ngIf=\"boundControl\"\n        [formControl]=\"formControl\"\n        [attr.aria-describedby]=\"'control' + layoutNode?._id + 'Status'\"\n        [attr.readonly]=\"options?.readonly ? 'readonly' : null\"\n        [attr.required]=\"options?.required\"\n        [class]=\"options?.fieldHtmlClass || ''\"\n        [id]=\"'control' + layoutNode?._id\"\n        [name]=\"controlName\">\n        <ng-template ngFor let-selectItem [ngForOf]=\"selectList\">\n          <option *ngIf=\"!isArray(selectItem?.items)\"\n            [value]=\"selectItem?.value\">\n            <span [innerHTML]=\"selectItem?.name\"></span>\n          </option>\n          <optgroup *ngIf=\"isArray(selectItem?.items)\"\n            [label]=\"selectItem?.group\">\n            <option *ngFor=\"let subItem of selectItem.items\"\n              [value]=\"subItem?.value\">\n              <span [innerHTML]=\"subItem?.name\"></span>\n            </option>\n          </optgroup>\n        </ng-template>\n      </select>\n      <select *ngIf=\"!boundControl\"\n        [attr.aria-describedby]=\"'control' + layoutNode?._id + 'Status'\"\n        [attr.readonly]=\"options?.readonly ? 'readonly' : null\"\n        [attr.required]=\"options?.required\"\n        [class]=\"options?.fieldHtmlClass || ''\"\n        [disabled]=\"controlDisabled\"\n        [id]=\"'control' + layoutNode?._id\"\n        [name]=\"controlName\"\n        (change)=\"updateValue($event)\">\n        <ng-template ngFor let-selectItem [ngForOf]=\"selectList\">\n          <option *ngIf=\"!isArray(selectItem?.items)\"\n            [selected]=\"selectItem?.value === controlValue\"\n            [value]=\"selectItem?.value\">\n            <span [innerHTML]=\"selectItem?.name\"></span>\n          </option>\n          <optgroup *ngIf=\"isArray(selectItem?.items)\"\n            [label]=\"selectItem?.group\">\n            <option *ngFor=\"let subItem of selectItem.items\"\n              [attr.selected]=\"subItem?.value === controlValue\"\n              [value]=\"subItem?.value\">\n              <span [innerHTML]=\"subItem?.name\"></span>\n            </option>\n          </optgroup>\n        </ng-template>\n      </select>\n    </div>",
                },] },
    ];
    /** @nocollapse */
    SelectComponent.ctorParameters = function () { return [
        { type: JsonSchemaFormService }
    ]; };
    SelectComponent.propDecorators = {
        layoutNode: [{ type: Input }],
        layoutIndex: [{ type: Input }],
        dataIndex: [{ type: Input }]
    };
    return SelectComponent;
}());
export { SelectComponent };
if (false) {
    /** @type {?} */
    SelectComponent.prototype.formControl;
    /** @type {?} */
    SelectComponent.prototype.controlName;
    /** @type {?} */
    SelectComponent.prototype.controlValue;
    /** @type {?} */
    SelectComponent.prototype.controlDisabled;
    /** @type {?} */
    SelectComponent.prototype.boundControl;
    /** @type {?} */
    SelectComponent.prototype.options;
    /** @type {?} */
    SelectComponent.prototype.selectList;
    /** @type {?} */
    SelectComponent.prototype.isArray;
    /** @type {?} */
    SelectComponent.prototype.layoutNode;
    /** @type {?} */
    SelectComponent.prototype.layoutIndex;
    /** @type {?} */
    SelectComponent.prototype.dataIndex;
    /** @type {?} */
    SelectComponent.prototype.jsf;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nNi1qc29uLXNjaGVtYS1mb3JtLyIsInNvdXJjZXMiOlsibGliL3dpZGdldC1saWJyYXJ5L3NlbGVjdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBR3pELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ3BFLE9BQU8sRUFBRSxhQUFhLEVBQUUsT0FBTyxFQUFFLE1BQU0sV0FBVyxDQUFDOztJQTBFakQseUJBQ1U7UUFBQSxRQUFHLEdBQUgsR0FBRzsrQkFWSyxLQUFLOzRCQUNSLEtBQUs7MEJBRUEsRUFBRTt1QkFDWixPQUFPO0tBT1o7Ozs7SUFFTCxrQ0FBUTs7O0lBQVI7UUFDRSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQztRQUM3QyxJQUFJLENBQUMsVUFBVSxHQUFHLGFBQWEsQ0FDN0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQy9DLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQ3BFLENBQUM7UUFDRixJQUFJLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ2xDOzs7OztJQUVELHFDQUFXOzs7O0lBQVgsVUFBWSxLQUFLO1FBQ2YsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDaEQ7O2dCQXZGRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGVBQWU7b0JBQ3pCLFFBQVEsRUFBRSxvOEVBdUREO2lCQUNWOzs7O2dCQTdEUSxxQkFBcUI7Ozs2QkF1RTNCLEtBQUs7OEJBQ0wsS0FBSzs0QkFDTCxLQUFLOzswQkE1RVI7O1NBaUVhLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFic3RyYWN0Q29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuaW1wb3J0IHsgSnNvblNjaGVtYUZvcm1TZXJ2aWNlIH0gZnJvbSAnLi4vanNvbi1zY2hlbWEtZm9ybS5zZXJ2aWNlJztcbmltcG9ydCB7IGJ1aWxkVGl0bGVNYXAsIGlzQXJyYXkgfSBmcm9tICcuLi9zaGFyZWQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdzZWxlY3Qtd2lkZ2V0JyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2XG4gICAgICBbY2xhc3NdPVwib3B0aW9ucz8uaHRtbENsYXNzIHx8ICcnXCI+XG4gICAgICA8bGFiZWwgKm5nSWY9XCJvcHRpb25zPy50aXRsZVwiXG4gICAgICAgIFthdHRyLmZvcl09XCInY29udHJvbCcgKyBsYXlvdXROb2RlPy5faWRcIlxuICAgICAgICBbY2xhc3NdPVwib3B0aW9ucz8ubGFiZWxIdG1sQ2xhc3MgfHwgJydcIlxuICAgICAgICBbc3R5bGUuZGlzcGxheV09XCJvcHRpb25zPy5ub3RpdGxlID8gJ25vbmUnIDogJydcIlxuICAgICAgICBbaW5uZXJIVE1MXT1cIm9wdGlvbnM/LnRpdGxlXCI+PC9sYWJlbD5cbiAgICAgIDxzZWxlY3QgKm5nSWY9XCJib3VuZENvbnRyb2xcIlxuICAgICAgICBbZm9ybUNvbnRyb2xdPVwiZm9ybUNvbnRyb2xcIlxuICAgICAgICBbYXR0ci5hcmlhLWRlc2NyaWJlZGJ5XT1cIidjb250cm9sJyArIGxheW91dE5vZGU/Ll9pZCArICdTdGF0dXMnXCJcbiAgICAgICAgW2F0dHIucmVhZG9ubHldPVwib3B0aW9ucz8ucmVhZG9ubHkgPyAncmVhZG9ubHknIDogbnVsbFwiXG4gICAgICAgIFthdHRyLnJlcXVpcmVkXT1cIm9wdGlvbnM/LnJlcXVpcmVkXCJcbiAgICAgICAgW2NsYXNzXT1cIm9wdGlvbnM/LmZpZWxkSHRtbENsYXNzIHx8ICcnXCJcbiAgICAgICAgW2lkXT1cIidjb250cm9sJyArIGxheW91dE5vZGU/Ll9pZFwiXG4gICAgICAgIFtuYW1lXT1cImNvbnRyb2xOYW1lXCI+XG4gICAgICAgIDxuZy10ZW1wbGF0ZSBuZ0ZvciBsZXQtc2VsZWN0SXRlbSBbbmdGb3JPZl09XCJzZWxlY3RMaXN0XCI+XG4gICAgICAgICAgPG9wdGlvbiAqbmdJZj1cIiFpc0FycmF5KHNlbGVjdEl0ZW0/Lml0ZW1zKVwiXG4gICAgICAgICAgICBbdmFsdWVdPVwic2VsZWN0SXRlbT8udmFsdWVcIj5cbiAgICAgICAgICAgIDxzcGFuIFtpbm5lckhUTUxdPVwic2VsZWN0SXRlbT8ubmFtZVwiPjwvc3Bhbj5cbiAgICAgICAgICA8L29wdGlvbj5cbiAgICAgICAgICA8b3B0Z3JvdXAgKm5nSWY9XCJpc0FycmF5KHNlbGVjdEl0ZW0/Lml0ZW1zKVwiXG4gICAgICAgICAgICBbbGFiZWxdPVwic2VsZWN0SXRlbT8uZ3JvdXBcIj5cbiAgICAgICAgICAgIDxvcHRpb24gKm5nRm9yPVwibGV0IHN1Ykl0ZW0gb2Ygc2VsZWN0SXRlbS5pdGVtc1wiXG4gICAgICAgICAgICAgIFt2YWx1ZV09XCJzdWJJdGVtPy52YWx1ZVwiPlxuICAgICAgICAgICAgICA8c3BhbiBbaW5uZXJIVE1MXT1cInN1Ykl0ZW0/Lm5hbWVcIj48L3NwYW4+XG4gICAgICAgICAgICA8L29wdGlvbj5cbiAgICAgICAgICA8L29wdGdyb3VwPlxuICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgPC9zZWxlY3Q+XG4gICAgICA8c2VsZWN0ICpuZ0lmPVwiIWJvdW5kQ29udHJvbFwiXG4gICAgICAgIFthdHRyLmFyaWEtZGVzY3JpYmVkYnldPVwiJ2NvbnRyb2wnICsgbGF5b3V0Tm9kZT8uX2lkICsgJ1N0YXR1cydcIlxuICAgICAgICBbYXR0ci5yZWFkb25seV09XCJvcHRpb25zPy5yZWFkb25seSA/ICdyZWFkb25seScgOiBudWxsXCJcbiAgICAgICAgW2F0dHIucmVxdWlyZWRdPVwib3B0aW9ucz8ucmVxdWlyZWRcIlxuICAgICAgICBbY2xhc3NdPVwib3B0aW9ucz8uZmllbGRIdG1sQ2xhc3MgfHwgJydcIlxuICAgICAgICBbZGlzYWJsZWRdPVwiY29udHJvbERpc2FibGVkXCJcbiAgICAgICAgW2lkXT1cIidjb250cm9sJyArIGxheW91dE5vZGU/Ll9pZFwiXG4gICAgICAgIFtuYW1lXT1cImNvbnRyb2xOYW1lXCJcbiAgICAgICAgKGNoYW5nZSk9XCJ1cGRhdGVWYWx1ZSgkZXZlbnQpXCI+XG4gICAgICAgIDxuZy10ZW1wbGF0ZSBuZ0ZvciBsZXQtc2VsZWN0SXRlbSBbbmdGb3JPZl09XCJzZWxlY3RMaXN0XCI+XG4gICAgICAgICAgPG9wdGlvbiAqbmdJZj1cIiFpc0FycmF5KHNlbGVjdEl0ZW0/Lml0ZW1zKVwiXG4gICAgICAgICAgICBbc2VsZWN0ZWRdPVwic2VsZWN0SXRlbT8udmFsdWUgPT09IGNvbnRyb2xWYWx1ZVwiXG4gICAgICAgICAgICBbdmFsdWVdPVwic2VsZWN0SXRlbT8udmFsdWVcIj5cbiAgICAgICAgICAgIDxzcGFuIFtpbm5lckhUTUxdPVwic2VsZWN0SXRlbT8ubmFtZVwiPjwvc3Bhbj5cbiAgICAgICAgICA8L29wdGlvbj5cbiAgICAgICAgICA8b3B0Z3JvdXAgKm5nSWY9XCJpc0FycmF5KHNlbGVjdEl0ZW0/Lml0ZW1zKVwiXG4gICAgICAgICAgICBbbGFiZWxdPVwic2VsZWN0SXRlbT8uZ3JvdXBcIj5cbiAgICAgICAgICAgIDxvcHRpb24gKm5nRm9yPVwibGV0IHN1Ykl0ZW0gb2Ygc2VsZWN0SXRlbS5pdGVtc1wiXG4gICAgICAgICAgICAgIFthdHRyLnNlbGVjdGVkXT1cInN1Ykl0ZW0/LnZhbHVlID09PSBjb250cm9sVmFsdWVcIlxuICAgICAgICAgICAgICBbdmFsdWVdPVwic3ViSXRlbT8udmFsdWVcIj5cbiAgICAgICAgICAgICAgPHNwYW4gW2lubmVySFRNTF09XCJzdWJJdGVtPy5uYW1lXCI+PC9zcGFuPlxuICAgICAgICAgICAgPC9vcHRpb24+XG4gICAgICAgICAgPC9vcHRncm91cD5cbiAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgIDwvc2VsZWN0PlxuICAgIDwvZGl2PmAsXG59KVxuZXhwb3J0IGNsYXNzIFNlbGVjdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIGZvcm1Db250cm9sOiBBYnN0cmFjdENvbnRyb2w7XG4gIGNvbnRyb2xOYW1lOiBzdHJpbmc7XG4gIGNvbnRyb2xWYWx1ZTogYW55O1xuICBjb250cm9sRGlzYWJsZWQgPSBmYWxzZTtcbiAgYm91bmRDb250cm9sID0gZmFsc2U7XG4gIG9wdGlvbnM6IGFueTtcbiAgc2VsZWN0TGlzdDogYW55W10gPSBbXTtcbiAgaXNBcnJheSA9IGlzQXJyYXk7XG4gIEBJbnB1dCgpIGxheW91dE5vZGU6IGFueTtcbiAgQElucHV0KCkgbGF5b3V0SW5kZXg6IG51bWJlcltdO1xuICBASW5wdXQoKSBkYXRhSW5kZXg6IG51bWJlcltdO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUganNmOiBKc29uU2NoZW1hRm9ybVNlcnZpY2VcbiAgKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLm9wdGlvbnMgPSB0aGlzLmxheW91dE5vZGUub3B0aW9ucyB8fCB7fTtcbiAgICB0aGlzLnNlbGVjdExpc3QgPSBidWlsZFRpdGxlTWFwKFxuICAgICAgdGhpcy5vcHRpb25zLnRpdGxlTWFwIHx8IHRoaXMub3B0aW9ucy5lbnVtTmFtZXMsXG4gICAgICB0aGlzLm9wdGlvbnMuZW51bSwgISF0aGlzLm9wdGlvbnMucmVxdWlyZWQsICEhdGhpcy5vcHRpb25zLmZsYXRMaXN0XG4gICAgKTtcbiAgICB0aGlzLmpzZi5pbml0aWFsaXplQ29udHJvbCh0aGlzKTtcbiAgfVxuXG4gIHVwZGF0ZVZhbHVlKGV2ZW50KSB7XG4gICAgdGhpcy5qc2YudXBkYXRlVmFsdWUodGhpcywgZXZlbnQudGFyZ2V0LnZhbHVlKTtcbiAgfVxufVxuIl19