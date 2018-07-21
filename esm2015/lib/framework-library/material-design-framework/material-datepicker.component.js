/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { JsonSchemaFormService } from '../../json-schema-form.service';
import { dateToString, stringToDate } from '../../shared';
export class MaterialDatepickerComponent {
    /**
     * @param {?} jsf
     */
    constructor(jsf) {
        this.jsf = jsf;
        this.controlDisabled = false;
        this.boundControl = false;
        this.autoCompleteList = [];
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.options = this.layoutNode.options || {};
        this.jsf.initializeControl(this, !this.options.readonly);
        this.setControlDate(this.controlValue);
        if (!this.options.notitle && !this.options.description && this.options.placeholder) {
            this.options.description = this.options.placeholder;
        }
    }
    /**
     * @return {?}
     */
    ngOnChanges() {
        this.setControlDate(this.controlValue);
    }
    /**
     * @param {?} dateString
     * @return {?}
     */
    setControlDate(dateString) {
        this.dateValue = stringToDate(dateString);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    updateValue(event) {
        this.options.showErrors = true;
        this.jsf.updateValue(this, dateToString(event, this.options));
    }
}
MaterialDatepickerComponent.decorators = [
    { type: Component, args: [{
                selector: 'material-datepicker-widget',
                template: `
    <mat-form-field [style.width]="'100%'">
      <span matPrefix *ngIf="options?.prefix || options?.fieldAddonLeft"
        [innerHTML]="options?.prefix || options?.fieldAddonLeft"></span>
      <input matInput *ngIf="boundControl"
        [formControl]="formControl"
        [attr.aria-describedby]="'control' + layoutNode?._id + 'Status'"
        [attr.list]="'control' + layoutNode?._id + 'Autocomplete'"
        [attr.readonly]="options?.readonly ? 'readonly' : null"
        [id]="'control' + layoutNode?._id"
        [max]="options?.maximum"
        [matDatepicker]="picker"
        [min]="options?.minimum"
        [name]="controlName"
        [placeholder]="options?.title"
        [required]="options?.required"
        [style.width]="'100%'"
        (blur)="options.showErrors = true">
      <input matInput *ngIf="!boundControl"
        [attr.aria-describedby]="'control' + layoutNode?._id + 'Status'"
        [attr.list]="'control' + layoutNode?._id + 'Autocomplete'"
        [attr.readonly]="options?.readonly ? 'readonly' : null"
        [disabled]="controlDisabled || options?.readonly"
        [id]="'control' + layoutNode?._id"
        [max]="options?.maximum"
        [matDatepicker]="picker"
        [min]="options?.minimum"
        [name]="controlName"
        [placeholder]="options?.title"
        [required]="options?.required"
        [style.width]="'100%'"
        [value]="dateValue"
        (blur)="options.showErrors = true"
        (change)="updateValue($event)"
        (input)="updateValue($event)">
      <span matSuffix *ngIf="options?.suffix || options?.fieldAddonRight"
        [innerHTML]="options?.suffix || options?.fieldAddonRight"></span>
      <mat-hint *ngIf="options?.description && (!options?.showErrors || !options?.errorMessage)"
        align="end" [innerHTML]="options?.description"></mat-hint>
      <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
    </mat-form-field>
    <mat-datepicker #picker
      (selectedChanged)="updateValue($event)"></mat-datepicker>
    <mat-error *ngIf="options?.showErrors && options?.errorMessage"
      [innerHTML]="options?.errorMessage"></mat-error>`,
                styles: [`
    mat-error { font-size: 75%; margin-top: -1rem; margin-bottom: 0.5rem; }
    ::ng-deep mat-form-field .mat-form-field-wrapper .mat-form-field-flex
      .mat-form-field-infix { width: initial; }
  `],
            },] },
];
/** @nocollapse */
MaterialDatepickerComponent.ctorParameters = () => [
    { type: JsonSchemaFormService }
];
MaterialDatepickerComponent.propDecorators = {
    layoutNode: [{ type: Input }],
    layoutIndex: [{ type: Input }],
    dataIndex: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    MaterialDatepickerComponent.prototype.formControl;
    /** @type {?} */
    MaterialDatepickerComponent.prototype.controlName;
    /** @type {?} */
    MaterialDatepickerComponent.prototype.controlValue;
    /** @type {?} */
    MaterialDatepickerComponent.prototype.dateValue;
    /** @type {?} */
    MaterialDatepickerComponent.prototype.controlDisabled;
    /** @type {?} */
    MaterialDatepickerComponent.prototype.boundControl;
    /** @type {?} */
    MaterialDatepickerComponent.prototype.options;
    /** @type {?} */
    MaterialDatepickerComponent.prototype.autoCompleteList;
    /** @type {?} */
    MaterialDatepickerComponent.prototype.layoutNode;
    /** @type {?} */
    MaterialDatepickerComponent.prototype.layoutIndex;
    /** @type {?} */
    MaterialDatepickerComponent.prototype.dataIndex;
    /** @type {?} */
    MaterialDatepickerComponent.prototype.jsf;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0ZXJpYWwtZGF0ZXBpY2tlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZzYtanNvbi1zY2hlbWEtZm9ybS8iLCJzb3VyY2VzIjpbImxpYi9mcmFtZXdvcmstbGlicmFyeS9tYXRlcmlhbC1kZXNpZ24tZnJhbWV3b3JrL21hdGVyaWFsLWRhdGVwaWNrZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBcUIsTUFBTSxlQUFlLENBQUM7QUFHcEUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDdkUsT0FBTyxFQUFFLFlBQVksRUFBVSxZQUFZLEVBQUUsTUFBTSxjQUFjLENBQUM7QUF1RGxFLE1BQU07Ozs7SUFhSixZQUNVO1FBQUEsUUFBRyxHQUFILEdBQUc7K0JBVEssS0FBSzs0QkFDUixLQUFLO2dDQUVTLEVBQUU7S0FPMUI7Ozs7SUFFTCxRQUFRO1FBQ04sSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUM7UUFDN0MsSUFBSSxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3pELElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ3ZDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDbkYsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUM7U0FDckQ7S0FDRjs7OztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztLQUN4Qzs7Ozs7SUFFRCxjQUFjLENBQUMsVUFBa0I7UUFDL0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxZQUFZLENBQUMsVUFBVSxDQUFDLENBQUM7S0FDM0M7Ozs7O0lBRUQsV0FBVyxDQUFDLEtBQUs7UUFDZixJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7UUFDL0IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLFlBQVksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7S0FDL0Q7OztZQTFGRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLDRCQUE0QjtnQkFDdEMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozt1REE0QzJDO2dCQUNyRCxNQUFNLEVBQUUsQ0FBQzs7OztHQUlSLENBQUM7YUFDSDs7OztZQXZEUSxxQkFBcUI7Ozt5QkFpRTNCLEtBQUs7MEJBQ0wsS0FBSzt3QkFDTCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0LCBPbkNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFic3RyYWN0Q29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuaW1wb3J0IHsgSnNvblNjaGVtYUZvcm1TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vanNvbi1zY2hlbWEtZm9ybS5zZXJ2aWNlJztcbmltcG9ydCB7IGRhdGVUb1N0cmluZywgaGFzT3duLCBzdHJpbmdUb0RhdGUgfSBmcm9tICcuLi8uLi9zaGFyZWQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtYXRlcmlhbC1kYXRlcGlja2VyLXdpZGdldCcsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG1hdC1mb3JtLWZpZWxkIFtzdHlsZS53aWR0aF09XCInMTAwJSdcIj5cbiAgICAgIDxzcGFuIG1hdFByZWZpeCAqbmdJZj1cIm9wdGlvbnM/LnByZWZpeCB8fCBvcHRpb25zPy5maWVsZEFkZG9uTGVmdFwiXG4gICAgICAgIFtpbm5lckhUTUxdPVwib3B0aW9ucz8ucHJlZml4IHx8IG9wdGlvbnM/LmZpZWxkQWRkb25MZWZ0XCI+PC9zcGFuPlxuICAgICAgPGlucHV0IG1hdElucHV0ICpuZ0lmPVwiYm91bmRDb250cm9sXCJcbiAgICAgICAgW2Zvcm1Db250cm9sXT1cImZvcm1Db250cm9sXCJcbiAgICAgICAgW2F0dHIuYXJpYS1kZXNjcmliZWRieV09XCInY29udHJvbCcgKyBsYXlvdXROb2RlPy5faWQgKyAnU3RhdHVzJ1wiXG4gICAgICAgIFthdHRyLmxpc3RdPVwiJ2NvbnRyb2wnICsgbGF5b3V0Tm9kZT8uX2lkICsgJ0F1dG9jb21wbGV0ZSdcIlxuICAgICAgICBbYXR0ci5yZWFkb25seV09XCJvcHRpb25zPy5yZWFkb25seSA/ICdyZWFkb25seScgOiBudWxsXCJcbiAgICAgICAgW2lkXT1cIidjb250cm9sJyArIGxheW91dE5vZGU/Ll9pZFwiXG4gICAgICAgIFttYXhdPVwib3B0aW9ucz8ubWF4aW11bVwiXG4gICAgICAgIFttYXREYXRlcGlja2VyXT1cInBpY2tlclwiXG4gICAgICAgIFttaW5dPVwib3B0aW9ucz8ubWluaW11bVwiXG4gICAgICAgIFtuYW1lXT1cImNvbnRyb2xOYW1lXCJcbiAgICAgICAgW3BsYWNlaG9sZGVyXT1cIm9wdGlvbnM/LnRpdGxlXCJcbiAgICAgICAgW3JlcXVpcmVkXT1cIm9wdGlvbnM/LnJlcXVpcmVkXCJcbiAgICAgICAgW3N0eWxlLndpZHRoXT1cIicxMDAlJ1wiXG4gICAgICAgIChibHVyKT1cIm9wdGlvbnMuc2hvd0Vycm9ycyA9IHRydWVcIj5cbiAgICAgIDxpbnB1dCBtYXRJbnB1dCAqbmdJZj1cIiFib3VuZENvbnRyb2xcIlxuICAgICAgICBbYXR0ci5hcmlhLWRlc2NyaWJlZGJ5XT1cIidjb250cm9sJyArIGxheW91dE5vZGU/Ll9pZCArICdTdGF0dXMnXCJcbiAgICAgICAgW2F0dHIubGlzdF09XCInY29udHJvbCcgKyBsYXlvdXROb2RlPy5faWQgKyAnQXV0b2NvbXBsZXRlJ1wiXG4gICAgICAgIFthdHRyLnJlYWRvbmx5XT1cIm9wdGlvbnM/LnJlYWRvbmx5ID8gJ3JlYWRvbmx5JyA6IG51bGxcIlxuICAgICAgICBbZGlzYWJsZWRdPVwiY29udHJvbERpc2FibGVkIHx8IG9wdGlvbnM/LnJlYWRvbmx5XCJcbiAgICAgICAgW2lkXT1cIidjb250cm9sJyArIGxheW91dE5vZGU/Ll9pZFwiXG4gICAgICAgIFttYXhdPVwib3B0aW9ucz8ubWF4aW11bVwiXG4gICAgICAgIFttYXREYXRlcGlja2VyXT1cInBpY2tlclwiXG4gICAgICAgIFttaW5dPVwib3B0aW9ucz8ubWluaW11bVwiXG4gICAgICAgIFtuYW1lXT1cImNvbnRyb2xOYW1lXCJcbiAgICAgICAgW3BsYWNlaG9sZGVyXT1cIm9wdGlvbnM/LnRpdGxlXCJcbiAgICAgICAgW3JlcXVpcmVkXT1cIm9wdGlvbnM/LnJlcXVpcmVkXCJcbiAgICAgICAgW3N0eWxlLndpZHRoXT1cIicxMDAlJ1wiXG4gICAgICAgIFt2YWx1ZV09XCJkYXRlVmFsdWVcIlxuICAgICAgICAoYmx1cik9XCJvcHRpb25zLnNob3dFcnJvcnMgPSB0cnVlXCJcbiAgICAgICAgKGNoYW5nZSk9XCJ1cGRhdGVWYWx1ZSgkZXZlbnQpXCJcbiAgICAgICAgKGlucHV0KT1cInVwZGF0ZVZhbHVlKCRldmVudClcIj5cbiAgICAgIDxzcGFuIG1hdFN1ZmZpeCAqbmdJZj1cIm9wdGlvbnM/LnN1ZmZpeCB8fCBvcHRpb25zPy5maWVsZEFkZG9uUmlnaHRcIlxuICAgICAgICBbaW5uZXJIVE1MXT1cIm9wdGlvbnM/LnN1ZmZpeCB8fCBvcHRpb25zPy5maWVsZEFkZG9uUmlnaHRcIj48L3NwYW4+XG4gICAgICA8bWF0LWhpbnQgKm5nSWY9XCJvcHRpb25zPy5kZXNjcmlwdGlvbiAmJiAoIW9wdGlvbnM/LnNob3dFcnJvcnMgfHwgIW9wdGlvbnM/LmVycm9yTWVzc2FnZSlcIlxuICAgICAgICBhbGlnbj1cImVuZFwiIFtpbm5lckhUTUxdPVwib3B0aW9ucz8uZGVzY3JpcHRpb25cIj48L21hdC1oaW50PlxuICAgICAgPG1hdC1kYXRlcGlja2VyLXRvZ2dsZSBtYXRTdWZmaXggW2Zvcl09XCJwaWNrZXJcIj48L21hdC1kYXRlcGlja2VyLXRvZ2dsZT5cbiAgICA8L21hdC1mb3JtLWZpZWxkPlxuICAgIDxtYXQtZGF0ZXBpY2tlciAjcGlja2VyXG4gICAgICAoc2VsZWN0ZWRDaGFuZ2VkKT1cInVwZGF0ZVZhbHVlKCRldmVudClcIj48L21hdC1kYXRlcGlja2VyPlxuICAgIDxtYXQtZXJyb3IgKm5nSWY9XCJvcHRpb25zPy5zaG93RXJyb3JzICYmIG9wdGlvbnM/LmVycm9yTWVzc2FnZVwiXG4gICAgICBbaW5uZXJIVE1MXT1cIm9wdGlvbnM/LmVycm9yTWVzc2FnZVwiPjwvbWF0LWVycm9yPmAsXG4gIHN0eWxlczogW2BcbiAgICBtYXQtZXJyb3IgeyBmb250LXNpemU6IDc1JTsgbWFyZ2luLXRvcDogLTFyZW07IG1hcmdpbi1ib3R0b206IDAuNXJlbTsgfVxuICAgIDo6bmctZGVlcCBtYXQtZm9ybS1maWVsZCAubWF0LWZvcm0tZmllbGQtd3JhcHBlciAubWF0LWZvcm0tZmllbGQtZmxleFxuICAgICAgLm1hdC1mb3JtLWZpZWxkLWluZml4IHsgd2lkdGg6IGluaXRpYWw7IH1cbiAgYF0sXG59KVxuZXhwb3J0IGNsYXNzIE1hdGVyaWFsRGF0ZXBpY2tlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcbiAgZm9ybUNvbnRyb2w6IEFic3RyYWN0Q29udHJvbDtcbiAgY29udHJvbE5hbWU6IHN0cmluZztcbiAgY29udHJvbFZhbHVlOiBhbnk7XG4gIGRhdGVWYWx1ZTogYW55O1xuICBjb250cm9sRGlzYWJsZWQgPSBmYWxzZTtcbiAgYm91bmRDb250cm9sID0gZmFsc2U7XG4gIG9wdGlvbnM6IGFueTtcbiAgYXV0b0NvbXBsZXRlTGlzdDogc3RyaW5nW10gPSBbXTtcbiAgQElucHV0KCkgbGF5b3V0Tm9kZTogYW55O1xuICBASW5wdXQoKSBsYXlvdXRJbmRleDogbnVtYmVyW107XG4gIEBJbnB1dCgpIGRhdGFJbmRleDogbnVtYmVyW107XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBqc2Y6IEpzb25TY2hlbWFGb3JtU2VydmljZVxuICApIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMub3B0aW9ucyA9IHRoaXMubGF5b3V0Tm9kZS5vcHRpb25zIHx8IHt9O1xuICAgIHRoaXMuanNmLmluaXRpYWxpemVDb250cm9sKHRoaXMsICF0aGlzLm9wdGlvbnMucmVhZG9ubHkpO1xuICAgIHRoaXMuc2V0Q29udHJvbERhdGUodGhpcy5jb250cm9sVmFsdWUpO1xuICAgIGlmICghdGhpcy5vcHRpb25zLm5vdGl0bGUgJiYgIXRoaXMub3B0aW9ucy5kZXNjcmlwdGlvbiAmJiB0aGlzLm9wdGlvbnMucGxhY2Vob2xkZXIpIHtcbiAgICAgIHRoaXMub3B0aW9ucy5kZXNjcmlwdGlvbiA9IHRoaXMub3B0aW9ucy5wbGFjZWhvbGRlcjtcbiAgICB9XG4gIH1cblxuICBuZ09uQ2hhbmdlcygpIHtcbiAgICB0aGlzLnNldENvbnRyb2xEYXRlKHRoaXMuY29udHJvbFZhbHVlKTtcbiAgfVxuXG4gIHNldENvbnRyb2xEYXRlKGRhdGVTdHJpbmc6IHN0cmluZykge1xuICAgIHRoaXMuZGF0ZVZhbHVlID0gc3RyaW5nVG9EYXRlKGRhdGVTdHJpbmcpO1xuICB9XG5cbiAgdXBkYXRlVmFsdWUoZXZlbnQpIHtcbiAgICB0aGlzLm9wdGlvbnMuc2hvd0Vycm9ycyA9IHRydWU7XG4gICAgdGhpcy5qc2YudXBkYXRlVmFsdWUodGhpcywgZGF0ZVRvU3RyaW5nKGV2ZW50LCB0aGlzLm9wdGlvbnMpKTtcbiAgfVxufVxuIl19