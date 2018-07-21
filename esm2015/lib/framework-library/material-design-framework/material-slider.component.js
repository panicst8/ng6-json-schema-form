/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { JsonSchemaFormService } from '../../json-schema-form.service';
export class MaterialSliderComponent {
    /**
     * @param {?} jsf
     */
    constructor(jsf) {
        this.jsf = jsf;
        this.controlDisabled = false;
        this.boundControl = false;
        this.allowNegative = true;
        this.allowDecimal = true;
        this.allowExponents = false;
        this.lastValidNumber = '';
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.options = this.layoutNode.options || {};
        this.jsf.initializeControl(this, !this.options.readonly);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    updateValue(event) {
        this.options.showErrors = true;
        this.jsf.updateValue(this, event.value);
    }
}
MaterialSliderComponent.decorators = [
    { type: Component, args: [{
                selector: 'material-slider-widget',
                template: `
    <mat-slider thumbLabel *ngIf="boundControl"
      [formControl]="formControl"
      [attr.aria-describedby]="'control' + layoutNode?._id + 'Status'"
      [id]="'control' + layoutNode?._id"
      [max]="options?.maximum"
      [min]="options?.minimum"
      [step]="options?.multipleOf || options?.step || 'any'"
      [style.width]="'100%'"
      (blur)="options.showErrors = true"></mat-slider>
    <mat-slider thumbLabel *ngIf="!boundControl"
      [attr.aria-describedby]="'control' + layoutNode?._id + 'Status'"
      [disabled]="controlDisabled || options?.readonly"
      [id]="'control' + layoutNode?._id"
      [max]="options?.maximum"
      [min]="options?.minimum"
      [step]="options?.multipleOf || options?.step || 'any'"
      [style.width]="'100%'"
      [value]="controlValue"
      (blur)="options.showErrors = true"
      (change)="updateValue($event)"></mat-slider>
    <mat-error *ngIf="options?.showErrors && options?.errorMessage"
      [innerHTML]="options?.errorMessage"></mat-error>`,
                styles: [` mat-error { font-size: 75%; } `],
            },] },
];
/** @nocollapse */
MaterialSliderComponent.ctorParameters = () => [
    { type: JsonSchemaFormService }
];
MaterialSliderComponent.propDecorators = {
    layoutNode: [{ type: Input }],
    layoutIndex: [{ type: Input }],
    dataIndex: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    MaterialSliderComponent.prototype.formControl;
    /** @type {?} */
    MaterialSliderComponent.prototype.controlName;
    /** @type {?} */
    MaterialSliderComponent.prototype.controlValue;
    /** @type {?} */
    MaterialSliderComponent.prototype.controlDisabled;
    /** @type {?} */
    MaterialSliderComponent.prototype.boundControl;
    /** @type {?} */
    MaterialSliderComponent.prototype.options;
    /** @type {?} */
    MaterialSliderComponent.prototype.allowNegative;
    /** @type {?} */
    MaterialSliderComponent.prototype.allowDecimal;
    /** @type {?} */
    MaterialSliderComponent.prototype.allowExponents;
    /** @type {?} */
    MaterialSliderComponent.prototype.lastValidNumber;
    /** @type {?} */
    MaterialSliderComponent.prototype.layoutNode;
    /** @type {?} */
    MaterialSliderComponent.prototype.layoutIndex;
    /** @type {?} */
    MaterialSliderComponent.prototype.dataIndex;
    /** @type {?} */
    MaterialSliderComponent.prototype.jsf;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0ZXJpYWwtc2xpZGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nNi1qc29uLXNjaGVtYS1mb3JtLyIsInNvdXJjZXMiOlsibGliL2ZyYW1ld29yay1saWJyYXJ5L21hdGVyaWFsLWRlc2lnbi1mcmFtZXdvcmsvbWF0ZXJpYWwtc2xpZGVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFHekQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUE2QnZFLE1BQU07Ozs7SUFlSixZQUNVO1FBQUEsUUFBRyxHQUFILEdBQUc7K0JBWkssS0FBSzs0QkFDUixLQUFLOzZCQUVKLElBQUk7NEJBQ0wsSUFBSTs4QkFDRixLQUFLOytCQUNKLEVBQUU7S0FPZjs7OztJQUVMLFFBQVE7UUFDTixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQztRQUM3QyxJQUFJLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7S0FDMUQ7Ozs7O0lBRUQsV0FBVyxDQUFDLEtBQUs7UUFDZixJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7UUFDL0IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUN6Qzs7O1lBdERGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsd0JBQXdCO2dCQUNsQyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7dURBc0IyQztnQkFDbkQsTUFBTSxFQUFFLENBQUMsaUNBQWlDLENBQUM7YUFDOUM7Ozs7WUE1QlEscUJBQXFCOzs7eUJBd0MzQixLQUFLOzBCQUNMLEtBQUs7d0JBQ0wsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWJzdHJhY3RDb250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5pbXBvcnQgeyBKc29uU2NoZW1hRm9ybVNlcnZpY2UgfSBmcm9tICcuLi8uLi9qc29uLXNjaGVtYS1mb3JtLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtYXRlcmlhbC1zbGlkZXItd2lkZ2V0JyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bWF0LXNsaWRlciB0aHVtYkxhYmVsICpuZ0lmPVwiYm91bmRDb250cm9sXCJcbiAgICAgIFtmb3JtQ29udHJvbF09XCJmb3JtQ29udHJvbFwiXG4gICAgICBbYXR0ci5hcmlhLWRlc2NyaWJlZGJ5XT1cIidjb250cm9sJyArIGxheW91dE5vZGU/Ll9pZCArICdTdGF0dXMnXCJcbiAgICAgIFtpZF09XCInY29udHJvbCcgKyBsYXlvdXROb2RlPy5faWRcIlxuICAgICAgW21heF09XCJvcHRpb25zPy5tYXhpbXVtXCJcbiAgICAgIFttaW5dPVwib3B0aW9ucz8ubWluaW11bVwiXG4gICAgICBbc3RlcF09XCJvcHRpb25zPy5tdWx0aXBsZU9mIHx8IG9wdGlvbnM/LnN0ZXAgfHwgJ2FueSdcIlxuICAgICAgW3N0eWxlLndpZHRoXT1cIicxMDAlJ1wiXG4gICAgICAoYmx1cik9XCJvcHRpb25zLnNob3dFcnJvcnMgPSB0cnVlXCI+PC9tYXQtc2xpZGVyPlxuICAgIDxtYXQtc2xpZGVyIHRodW1iTGFiZWwgKm5nSWY9XCIhYm91bmRDb250cm9sXCJcbiAgICAgIFthdHRyLmFyaWEtZGVzY3JpYmVkYnldPVwiJ2NvbnRyb2wnICsgbGF5b3V0Tm9kZT8uX2lkICsgJ1N0YXR1cydcIlxuICAgICAgW2Rpc2FibGVkXT1cImNvbnRyb2xEaXNhYmxlZCB8fCBvcHRpb25zPy5yZWFkb25seVwiXG4gICAgICBbaWRdPVwiJ2NvbnRyb2wnICsgbGF5b3V0Tm9kZT8uX2lkXCJcbiAgICAgIFttYXhdPVwib3B0aW9ucz8ubWF4aW11bVwiXG4gICAgICBbbWluXT1cIm9wdGlvbnM/Lm1pbmltdW1cIlxuICAgICAgW3N0ZXBdPVwib3B0aW9ucz8ubXVsdGlwbGVPZiB8fCBvcHRpb25zPy5zdGVwIHx8ICdhbnknXCJcbiAgICAgIFtzdHlsZS53aWR0aF09XCInMTAwJSdcIlxuICAgICAgW3ZhbHVlXT1cImNvbnRyb2xWYWx1ZVwiXG4gICAgICAoYmx1cik9XCJvcHRpb25zLnNob3dFcnJvcnMgPSB0cnVlXCJcbiAgICAgIChjaGFuZ2UpPVwidXBkYXRlVmFsdWUoJGV2ZW50KVwiPjwvbWF0LXNsaWRlcj5cbiAgICA8bWF0LWVycm9yICpuZ0lmPVwib3B0aW9ucz8uc2hvd0Vycm9ycyAmJiBvcHRpb25zPy5lcnJvck1lc3NhZ2VcIlxuICAgICAgW2lubmVySFRNTF09XCJvcHRpb25zPy5lcnJvck1lc3NhZ2VcIj48L21hdC1lcnJvcj5gLFxuICAgIHN0eWxlczogW2AgbWF0LWVycm9yIHsgZm9udC1zaXplOiA3NSU7IH0gYF0sXG59KVxuZXhwb3J0IGNsYXNzIE1hdGVyaWFsU2xpZGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgZm9ybUNvbnRyb2w6IEFic3RyYWN0Q29udHJvbDtcbiAgY29udHJvbE5hbWU6IHN0cmluZztcbiAgY29udHJvbFZhbHVlOiBhbnk7XG4gIGNvbnRyb2xEaXNhYmxlZCA9IGZhbHNlO1xuICBib3VuZENvbnRyb2wgPSBmYWxzZTtcbiAgb3B0aW9uczogYW55O1xuICBhbGxvd05lZ2F0aXZlID0gdHJ1ZTtcbiAgYWxsb3dEZWNpbWFsID0gdHJ1ZTtcbiAgYWxsb3dFeHBvbmVudHMgPSBmYWxzZTtcbiAgbGFzdFZhbGlkTnVtYmVyID0gJyc7XG4gIEBJbnB1dCgpIGxheW91dE5vZGU6IGFueTtcbiAgQElucHV0KCkgbGF5b3V0SW5kZXg6IG51bWJlcltdO1xuICBASW5wdXQoKSBkYXRhSW5kZXg6IG51bWJlcltdO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUganNmOiBKc29uU2NoZW1hRm9ybVNlcnZpY2VcbiAgKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLm9wdGlvbnMgPSB0aGlzLmxheW91dE5vZGUub3B0aW9ucyB8fCB7fTtcbiAgICB0aGlzLmpzZi5pbml0aWFsaXplQ29udHJvbCh0aGlzLCAhdGhpcy5vcHRpb25zLnJlYWRvbmx5KTtcbiAgfVxuXG4gIHVwZGF0ZVZhbHVlKGV2ZW50KSB7XG4gICAgdGhpcy5vcHRpb25zLnNob3dFcnJvcnMgPSB0cnVlO1xuICAgIHRoaXMuanNmLnVwZGF0ZVZhbHVlKHRoaXMsIGV2ZW50LnZhbHVlKTtcbiAgfVxufVxuIl19