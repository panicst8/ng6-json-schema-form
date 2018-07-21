/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { JsonSchemaFormService } from '../../json-schema-form.service';
export class MaterialInputComponent {
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
        this.jsf.initializeControl(this);
        if (!this.options.notitle && !this.options.description && this.options.placeholder) {
            this.options.description = this.options.placeholder;
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    updateValue(event) {
        this.jsf.updateValue(this, event.target.value);
    }
}
MaterialInputComponent.decorators = [
    { type: Component, args: [{
                selector: 'material-input-widget',
                template: `
    <mat-form-field
      [class]="options?.htmlClass || ''"
      [floatLabel]="options?.floatLabel || (options?.notitle ? 'never' : 'auto')"
      [style.width]="'100%'">
      <span matPrefix *ngIf="options?.prefix || options?.fieldAddonLeft"
        [innerHTML]="options?.prefix || options?.fieldAddonLeft"></span>
      <input matInput *ngIf="boundControl"
        [formControl]="formControl"
        [attr.aria-describedby]="'control' + layoutNode?._id + 'Status'"
        [attr.list]="'control' + layoutNode?._id + 'Autocomplete'"
        [attr.maxlength]="options?.maxLength"
        [attr.minlength]="options?.minLength"
        [attr.pattern]="options?.pattern"
        [readonly]="options?.readonly ? 'readonly' : null"
        [id]="'control' + layoutNode?._id"
        [name]="controlName"
        [placeholder]="options?.notitle ? options?.placeholder : options?.title"
        [required]="options?.required"
        [style.width]="'100%'"
        [type]="layoutNode?.type"
        (blur)="options.showErrors = true">
      <input matInput *ngIf="!boundControl"
        [attr.aria-describedby]="'control' + layoutNode?._id + 'Status'"
        [attr.list]="'control' + layoutNode?._id + 'Autocomplete'"
        [attr.maxlength]="options?.maxLength"
        [attr.minlength]="options?.minLength"
        [attr.pattern]="options?.pattern"
        [disabled]="controlDisabled"
        [id]="'control' + layoutNode?._id"
        [name]="controlName"
        [placeholder]="options?.notitle ? options?.placeholder : options?.title"
        [readonly]="options?.readonly ? 'readonly' : null"
        [required]="options?.required"
        [style.width]="'100%'"
        [type]="layoutNode?.type"
        [value]="controlValue"
        (input)="updateValue($event)"
        (blur)="options.showErrors = true">
      <span matSuffix *ngIf="options?.suffix || options?.fieldAddonRight"
        [innerHTML]="options?.suffix || options?.fieldAddonRight"></span>
      <mat-hint *ngIf="options?.description && (!options?.showErrors || !options?.errorMessage)"
        align="end" [innerHTML]="options?.description"></mat-hint>
      <mat-autocomplete *ngIf="options?.typeahead?.source">
        <mat-option *ngFor="let word of options?.typeahead?.source"
          [value]="word">{{word}}</mat-option>
      </mat-autocomplete>
    </mat-form-field>
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
MaterialInputComponent.ctorParameters = () => [
    { type: JsonSchemaFormService }
];
MaterialInputComponent.propDecorators = {
    layoutNode: [{ type: Input }],
    layoutIndex: [{ type: Input }],
    dataIndex: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    MaterialInputComponent.prototype.formControl;
    /** @type {?} */
    MaterialInputComponent.prototype.controlName;
    /** @type {?} */
    MaterialInputComponent.prototype.controlValue;
    /** @type {?} */
    MaterialInputComponent.prototype.controlDisabled;
    /** @type {?} */
    MaterialInputComponent.prototype.boundControl;
    /** @type {?} */
    MaterialInputComponent.prototype.options;
    /** @type {?} */
    MaterialInputComponent.prototype.autoCompleteList;
    /** @type {?} */
    MaterialInputComponent.prototype.layoutNode;
    /** @type {?} */
    MaterialInputComponent.prototype.layoutIndex;
    /** @type {?} */
    MaterialInputComponent.prototype.dataIndex;
    /** @type {?} */
    MaterialInputComponent.prototype.jsf;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0ZXJpYWwtaW5wdXQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmc2LWpzb24tc2NoZW1hLWZvcm0vIiwic291cmNlcyI6WyJsaWIvZnJhbWV3b3JrLWxpYnJhcnkvbWF0ZXJpYWwtZGVzaWduLWZyYW1ld29yay9tYXRlcmlhbC1pbnB1dC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBR3pELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBNER2RSxNQUFNOzs7O0lBWUosWUFDVTtRQUFBLFFBQUcsR0FBSCxHQUFHOytCQVRLLEtBQUs7NEJBQ1IsS0FBSztnQ0FFUyxFQUFFO0tBTzFCOzs7O0lBRUwsUUFBUTtRQUNOLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFDO1FBQzdDLElBQUksQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDakMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztZQUNuRixJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQztTQUNyRDtLQUNGOzs7OztJQUVELFdBQVcsQ0FBQyxLQUFLO1FBQ2YsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDaEQ7OztZQXBGRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHVCQUF1QjtnQkFDakMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3VEQWlEMkM7Z0JBQ3JELE1BQU0sRUFBRSxDQUFDOzs7O0dBSVIsQ0FBQzthQUNIOzs7O1lBM0RRLHFCQUFxQjs7O3lCQW9FM0IsS0FBSzswQkFDTCxLQUFLO3dCQUNMLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFic3RyYWN0Q29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuaW1wb3J0IHsgSnNvblNjaGVtYUZvcm1TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vanNvbi1zY2hlbWEtZm9ybS5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWF0ZXJpYWwtaW5wdXQtd2lkZ2V0JyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bWF0LWZvcm0tZmllbGRcbiAgICAgIFtjbGFzc109XCJvcHRpb25zPy5odG1sQ2xhc3MgfHwgJydcIlxuICAgICAgW2Zsb2F0TGFiZWxdPVwib3B0aW9ucz8uZmxvYXRMYWJlbCB8fCAob3B0aW9ucz8ubm90aXRsZSA/ICduZXZlcicgOiAnYXV0bycpXCJcbiAgICAgIFtzdHlsZS53aWR0aF09XCInMTAwJSdcIj5cbiAgICAgIDxzcGFuIG1hdFByZWZpeCAqbmdJZj1cIm9wdGlvbnM/LnByZWZpeCB8fCBvcHRpb25zPy5maWVsZEFkZG9uTGVmdFwiXG4gICAgICAgIFtpbm5lckhUTUxdPVwib3B0aW9ucz8ucHJlZml4IHx8IG9wdGlvbnM/LmZpZWxkQWRkb25MZWZ0XCI+PC9zcGFuPlxuICAgICAgPGlucHV0IG1hdElucHV0ICpuZ0lmPVwiYm91bmRDb250cm9sXCJcbiAgICAgICAgW2Zvcm1Db250cm9sXT1cImZvcm1Db250cm9sXCJcbiAgICAgICAgW2F0dHIuYXJpYS1kZXNjcmliZWRieV09XCInY29udHJvbCcgKyBsYXlvdXROb2RlPy5faWQgKyAnU3RhdHVzJ1wiXG4gICAgICAgIFthdHRyLmxpc3RdPVwiJ2NvbnRyb2wnICsgbGF5b3V0Tm9kZT8uX2lkICsgJ0F1dG9jb21wbGV0ZSdcIlxuICAgICAgICBbYXR0ci5tYXhsZW5ndGhdPVwib3B0aW9ucz8ubWF4TGVuZ3RoXCJcbiAgICAgICAgW2F0dHIubWlubGVuZ3RoXT1cIm9wdGlvbnM/Lm1pbkxlbmd0aFwiXG4gICAgICAgIFthdHRyLnBhdHRlcm5dPVwib3B0aW9ucz8ucGF0dGVyblwiXG4gICAgICAgIFtyZWFkb25seV09XCJvcHRpb25zPy5yZWFkb25seSA/ICdyZWFkb25seScgOiBudWxsXCJcbiAgICAgICAgW2lkXT1cIidjb250cm9sJyArIGxheW91dE5vZGU/Ll9pZFwiXG4gICAgICAgIFtuYW1lXT1cImNvbnRyb2xOYW1lXCJcbiAgICAgICAgW3BsYWNlaG9sZGVyXT1cIm9wdGlvbnM/Lm5vdGl0bGUgPyBvcHRpb25zPy5wbGFjZWhvbGRlciA6IG9wdGlvbnM/LnRpdGxlXCJcbiAgICAgICAgW3JlcXVpcmVkXT1cIm9wdGlvbnM/LnJlcXVpcmVkXCJcbiAgICAgICAgW3N0eWxlLndpZHRoXT1cIicxMDAlJ1wiXG4gICAgICAgIFt0eXBlXT1cImxheW91dE5vZGU/LnR5cGVcIlxuICAgICAgICAoYmx1cik9XCJvcHRpb25zLnNob3dFcnJvcnMgPSB0cnVlXCI+XG4gICAgICA8aW5wdXQgbWF0SW5wdXQgKm5nSWY9XCIhYm91bmRDb250cm9sXCJcbiAgICAgICAgW2F0dHIuYXJpYS1kZXNjcmliZWRieV09XCInY29udHJvbCcgKyBsYXlvdXROb2RlPy5faWQgKyAnU3RhdHVzJ1wiXG4gICAgICAgIFthdHRyLmxpc3RdPVwiJ2NvbnRyb2wnICsgbGF5b3V0Tm9kZT8uX2lkICsgJ0F1dG9jb21wbGV0ZSdcIlxuICAgICAgICBbYXR0ci5tYXhsZW5ndGhdPVwib3B0aW9ucz8ubWF4TGVuZ3RoXCJcbiAgICAgICAgW2F0dHIubWlubGVuZ3RoXT1cIm9wdGlvbnM/Lm1pbkxlbmd0aFwiXG4gICAgICAgIFthdHRyLnBhdHRlcm5dPVwib3B0aW9ucz8ucGF0dGVyblwiXG4gICAgICAgIFtkaXNhYmxlZF09XCJjb250cm9sRGlzYWJsZWRcIlxuICAgICAgICBbaWRdPVwiJ2NvbnRyb2wnICsgbGF5b3V0Tm9kZT8uX2lkXCJcbiAgICAgICAgW25hbWVdPVwiY29udHJvbE5hbWVcIlxuICAgICAgICBbcGxhY2Vob2xkZXJdPVwib3B0aW9ucz8ubm90aXRsZSA/IG9wdGlvbnM/LnBsYWNlaG9sZGVyIDogb3B0aW9ucz8udGl0bGVcIlxuICAgICAgICBbcmVhZG9ubHldPVwib3B0aW9ucz8ucmVhZG9ubHkgPyAncmVhZG9ubHknIDogbnVsbFwiXG4gICAgICAgIFtyZXF1aXJlZF09XCJvcHRpb25zPy5yZXF1aXJlZFwiXG4gICAgICAgIFtzdHlsZS53aWR0aF09XCInMTAwJSdcIlxuICAgICAgICBbdHlwZV09XCJsYXlvdXROb2RlPy50eXBlXCJcbiAgICAgICAgW3ZhbHVlXT1cImNvbnRyb2xWYWx1ZVwiXG4gICAgICAgIChpbnB1dCk9XCJ1cGRhdGVWYWx1ZSgkZXZlbnQpXCJcbiAgICAgICAgKGJsdXIpPVwib3B0aW9ucy5zaG93RXJyb3JzID0gdHJ1ZVwiPlxuICAgICAgPHNwYW4gbWF0U3VmZml4ICpuZ0lmPVwib3B0aW9ucz8uc3VmZml4IHx8IG9wdGlvbnM/LmZpZWxkQWRkb25SaWdodFwiXG4gICAgICAgIFtpbm5lckhUTUxdPVwib3B0aW9ucz8uc3VmZml4IHx8IG9wdGlvbnM/LmZpZWxkQWRkb25SaWdodFwiPjwvc3Bhbj5cbiAgICAgIDxtYXQtaGludCAqbmdJZj1cIm9wdGlvbnM/LmRlc2NyaXB0aW9uICYmICghb3B0aW9ucz8uc2hvd0Vycm9ycyB8fCAhb3B0aW9ucz8uZXJyb3JNZXNzYWdlKVwiXG4gICAgICAgIGFsaWduPVwiZW5kXCIgW2lubmVySFRNTF09XCJvcHRpb25zPy5kZXNjcmlwdGlvblwiPjwvbWF0LWhpbnQ+XG4gICAgICA8bWF0LWF1dG9jb21wbGV0ZSAqbmdJZj1cIm9wdGlvbnM/LnR5cGVhaGVhZD8uc291cmNlXCI+XG4gICAgICAgIDxtYXQtb3B0aW9uICpuZ0Zvcj1cImxldCB3b3JkIG9mIG9wdGlvbnM/LnR5cGVhaGVhZD8uc291cmNlXCJcbiAgICAgICAgICBbdmFsdWVdPVwid29yZFwiPnt7d29yZH19PC9tYXQtb3B0aW9uPlxuICAgICAgPC9tYXQtYXV0b2NvbXBsZXRlPlxuICAgIDwvbWF0LWZvcm0tZmllbGQ+XG4gICAgPG1hdC1lcnJvciAqbmdJZj1cIm9wdGlvbnM/LnNob3dFcnJvcnMgJiYgb3B0aW9ucz8uZXJyb3JNZXNzYWdlXCJcbiAgICAgIFtpbm5lckhUTUxdPVwib3B0aW9ucz8uZXJyb3JNZXNzYWdlXCI+PC9tYXQtZXJyb3I+YCxcbiAgc3R5bGVzOiBbYFxuICAgIG1hdC1lcnJvciB7IGZvbnQtc2l6ZTogNzUlOyBtYXJnaW4tdG9wOiAtMXJlbTsgbWFyZ2luLWJvdHRvbTogMC41cmVtOyB9XG4gICAgOjpuZy1kZWVwIG1hdC1mb3JtLWZpZWxkIC5tYXQtZm9ybS1maWVsZC13cmFwcGVyIC5tYXQtZm9ybS1maWVsZC1mbGV4XG4gICAgICAubWF0LWZvcm0tZmllbGQtaW5maXggeyB3aWR0aDogaW5pdGlhbDsgfVxuICBgXSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0ZXJpYWxJbnB1dENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIGZvcm1Db250cm9sOiBBYnN0cmFjdENvbnRyb2w7XG4gIGNvbnRyb2xOYW1lOiBzdHJpbmc7XG4gIGNvbnRyb2xWYWx1ZTogc3RyaW5nO1xuICBjb250cm9sRGlzYWJsZWQgPSBmYWxzZTtcbiAgYm91bmRDb250cm9sID0gZmFsc2U7XG4gIG9wdGlvbnM6IGFueTtcbiAgYXV0b0NvbXBsZXRlTGlzdDogc3RyaW5nW10gPSBbXTtcbiAgQElucHV0KCkgbGF5b3V0Tm9kZTogYW55O1xuICBASW5wdXQoKSBsYXlvdXRJbmRleDogbnVtYmVyW107XG4gIEBJbnB1dCgpIGRhdGFJbmRleDogbnVtYmVyW107XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBqc2Y6IEpzb25TY2hlbWFGb3JtU2VydmljZVxuICApIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMub3B0aW9ucyA9IHRoaXMubGF5b3V0Tm9kZS5vcHRpb25zIHx8IHt9O1xuICAgIHRoaXMuanNmLmluaXRpYWxpemVDb250cm9sKHRoaXMpO1xuICAgIGlmICghdGhpcy5vcHRpb25zLm5vdGl0bGUgJiYgIXRoaXMub3B0aW9ucy5kZXNjcmlwdGlvbiAmJiB0aGlzLm9wdGlvbnMucGxhY2Vob2xkZXIpIHtcbiAgICAgIHRoaXMub3B0aW9ucy5kZXNjcmlwdGlvbiA9IHRoaXMub3B0aW9ucy5wbGFjZWhvbGRlcjtcbiAgICB9XG4gIH1cblxuICB1cGRhdGVWYWx1ZShldmVudCkge1xuICAgIHRoaXMuanNmLnVwZGF0ZVZhbHVlKHRoaXMsIGV2ZW50LnRhcmdldC52YWx1ZSk7XG4gIH1cbn1cbiJdfQ==