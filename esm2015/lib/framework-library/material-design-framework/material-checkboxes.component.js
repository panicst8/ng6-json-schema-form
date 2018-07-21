/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { JsonSchemaFormService } from '../../json-schema-form.service';
import { buildTitleMap } from '../../shared';
export class MaterialCheckboxesComponent {
    /**
     * @param {?} jsf
     */
    constructor(jsf) {
        this.jsf = jsf;
        this.controlDisabled = false;
        this.boundControl = false;
        this.horizontalList = false;
        this.checkboxList = [];
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.options = this.layoutNode.options || {};
        this.horizontalList = this.layoutNode.type === 'checkboxes-inline' ||
            this.layoutNode.type === 'checkboxbuttons';
        this.jsf.initializeControl(this);
        this.checkboxList = buildTitleMap(this.options.titleMap || this.options.enumNames, this.options.enum, true);
        if (this.boundControl) {
            /** @type {?} */
            const formArray = this.jsf.getFormControl(this);
            for (let checkboxItem of this.checkboxList) {
                checkboxItem.checked = formArray.value.includes(checkboxItem.value);
            }
        }
    }
    /**
     * @return {?}
     */
    get allChecked() {
        return this.checkboxList.filter(t => t.checked).length === this.checkboxList.length;
    }
    /**
     * @return {?}
     */
    get someChecked() {
        /** @type {?} */
        const checkedItems = this.checkboxList.filter(t => t.checked).length;
        return checkedItems > 0 && checkedItems < this.checkboxList.length;
    }
    /**
     * @return {?}
     */
    updateValue() {
        this.options.showErrors = true;
        if (this.boundControl) {
            this.jsf.updateArrayCheckboxList(this, this.checkboxList);
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    updateAllValues(event) {
        this.options.showErrors = true;
        this.checkboxList.forEach(t => t.checked = event.checked);
        this.updateValue();
    }
}
MaterialCheckboxesComponent.decorators = [
    { type: Component, args: [{
                selector: 'material-checkboxes-widget',
                template: `
    <div>
      <mat-checkbox type="checkbox"
        [checked]="allChecked"
        [color]="options?.color || 'primary'"
        [disabled]="controlDisabled || options?.readonly"
        [indeterminate]="someChecked"
        [name]="options?.name"
        (blur)="options.showErrors = true"
        (change)="updateAllValues($event)">
        <span class="checkbox-name" [innerHTML]="options?.name"></span>
      </mat-checkbox>
      <label *ngIf="options?.title"
        class="title"
        [class]="options?.labelHtmlClass || ''"
        [style.display]="options?.notitle ? 'none' : ''"
        [innerHTML]="options?.title"></label>
      <ul class="checkbox-list" [class.horizontal-list]="horizontalList">
        <li *ngFor="let checkboxItem of checkboxList"
          [class]="options?.htmlClass || ''">
          <mat-checkbox type="checkbox"
            [(ngModel)]="checkboxItem.checked"
            [color]="options?.color || 'primary'"
            [disabled]="controlDisabled || options?.readonly"
            [name]="checkboxItem?.name"
            (blur)="options.showErrors = true"
            (change)="updateValue()">
            <span class="checkbox-name" [innerHTML]="checkboxItem?.name"></span>
          </mat-checkbox>
        </li>
      </ul>
      <mat-error *ngIf="options?.showErrors && options?.errorMessage"
        [innerHTML]="options?.errorMessage"></mat-error>
    </div>`,
                styles: [`
    .title { font-weight: bold; }
    .checkbox-list { list-style-type: none; }
    .horizontal-list > li { display: inline-block; margin-right: 10px; zoom: 1; }
    .checkbox-name { white-space: nowrap; }
    mat-error { font-size: 75%; }
  `],
            },] },
];
/** @nocollapse */
MaterialCheckboxesComponent.ctorParameters = () => [
    { type: JsonSchemaFormService }
];
MaterialCheckboxesComponent.propDecorators = {
    layoutNode: [{ type: Input }],
    layoutIndex: [{ type: Input }],
    dataIndex: [{ type: Input }]
};
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0ZXJpYWwtY2hlY2tib3hlcy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZzYtanNvbi1zY2hlbWEtZm9ybS8iLCJzb3VyY2VzIjpbImxpYi9mcmFtZXdvcmstbGlicmFyeS9tYXRlcmlhbC1kZXNpZ24tZnJhbWV3b3JrL21hdGVyaWFsLWNoZWNrYm94ZXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUd6RCxPQUFPLEVBQUUscUJBQXFCLEVBQWdCLE1BQU0sZ0NBQWdDLENBQUM7QUFDckYsT0FBTyxFQUFrQixhQUFhLEVBQXVCLE1BQU0sY0FBYyxDQUFDO0FBaURsRixNQUFNOzs7O0lBY0osWUFDVTtRQUFBLFFBQUcsR0FBSCxHQUFHOytCQVhLLEtBQUs7NEJBQ1IsS0FBSzs4QkFFSCxLQUFLOzRCQUVTLEVBQUU7S0FPNUI7Ozs7SUFFTCxRQUFRO1FBQ04sSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUM7UUFDN0MsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksS0FBSyxtQkFBbUI7WUFDaEUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEtBQUssaUJBQWlCLENBQUM7UUFDN0MsSUFBSSxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNqQyxJQUFJLENBQUMsWUFBWSxHQUFHLGFBQWEsQ0FDL0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUN6RSxDQUFDO1FBQ0YsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7O1lBQ3RCLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2hELEdBQUcsQ0FBQyxDQUFDLElBQUksWUFBWSxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO2dCQUMzQyxZQUFZLENBQUMsT0FBTyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUNyRTtTQUNGO0tBQ0Y7Ozs7SUFFRCxJQUFJLFVBQVU7UUFDWixNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxLQUFLLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDO0tBQ3JGOzs7O0lBRUQsSUFBSSxXQUFXOztRQUNiLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQztRQUNyRSxNQUFNLENBQUMsWUFBWSxHQUFHLENBQUMsSUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUM7S0FDcEU7Ozs7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1FBQy9CLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1lBQ3RCLElBQUksQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUMzRDtLQUNGOzs7OztJQUVELGVBQWUsQ0FBQyxLQUFVO1FBQ3hCLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztRQUMvQixJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzFELElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztLQUNwQjs7O1lBbEdGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsNEJBQTRCO2dCQUN0QyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztXQWlDRDtnQkFDVCxNQUFNLEVBQUUsQ0FBQzs7Ozs7O0dBTVIsQ0FBQzthQUNIOzs7O1lBakRRLHFCQUFxQjs7O3lCQTREM0IsS0FBSzswQkFDTCxLQUFLO3dCQUNMLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1BcnJheSwgQWJzdHJhY3RDb250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5pbXBvcnQgeyBKc29uU2NoZW1hRm9ybVNlcnZpY2UsIFRpdGxlTWFwSXRlbSB9IGZyb20gJy4uLy4uL2pzb24tc2NoZW1hLWZvcm0uc2VydmljZSc7XG5pbXBvcnQgeyBidWlsZEZvcm1Hcm91cCwgYnVpbGRUaXRsZU1hcCwgaGFzT3duLCBKc29uUG9pbnRlciB9IGZyb20gJy4uLy4uL3NoYXJlZCc7XG5cbi8vIFRPRE86IENoYW5nZSB0aGlzIHRvIHVzZSBhIFNlbGVjdGlvbiBMaXN0IGluc3RlYWQ/XG4vLyBodHRwczovL21hdGVyaWFsLmFuZ3VsYXIuaW8vY29tcG9uZW50cy9saXN0L292ZXJ2aWV3XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21hdGVyaWFsLWNoZWNrYm94ZXMtd2lkZ2V0JyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2PlxuICAgICAgPG1hdC1jaGVja2JveCB0eXBlPVwiY2hlY2tib3hcIlxuICAgICAgICBbY2hlY2tlZF09XCJhbGxDaGVja2VkXCJcbiAgICAgICAgW2NvbG9yXT1cIm9wdGlvbnM/LmNvbG9yIHx8ICdwcmltYXJ5J1wiXG4gICAgICAgIFtkaXNhYmxlZF09XCJjb250cm9sRGlzYWJsZWQgfHwgb3B0aW9ucz8ucmVhZG9ubHlcIlxuICAgICAgICBbaW5kZXRlcm1pbmF0ZV09XCJzb21lQ2hlY2tlZFwiXG4gICAgICAgIFtuYW1lXT1cIm9wdGlvbnM/Lm5hbWVcIlxuICAgICAgICAoYmx1cik9XCJvcHRpb25zLnNob3dFcnJvcnMgPSB0cnVlXCJcbiAgICAgICAgKGNoYW5nZSk9XCJ1cGRhdGVBbGxWYWx1ZXMoJGV2ZW50KVwiPlxuICAgICAgICA8c3BhbiBjbGFzcz1cImNoZWNrYm94LW5hbWVcIiBbaW5uZXJIVE1MXT1cIm9wdGlvbnM/Lm5hbWVcIj48L3NwYW4+XG4gICAgICA8L21hdC1jaGVja2JveD5cbiAgICAgIDxsYWJlbCAqbmdJZj1cIm9wdGlvbnM/LnRpdGxlXCJcbiAgICAgICAgY2xhc3M9XCJ0aXRsZVwiXG4gICAgICAgIFtjbGFzc109XCJvcHRpb25zPy5sYWJlbEh0bWxDbGFzcyB8fCAnJ1wiXG4gICAgICAgIFtzdHlsZS5kaXNwbGF5XT1cIm9wdGlvbnM/Lm5vdGl0bGUgPyAnbm9uZScgOiAnJ1wiXG4gICAgICAgIFtpbm5lckhUTUxdPVwib3B0aW9ucz8udGl0bGVcIj48L2xhYmVsPlxuICAgICAgPHVsIGNsYXNzPVwiY2hlY2tib3gtbGlzdFwiIFtjbGFzcy5ob3Jpem9udGFsLWxpc3RdPVwiaG9yaXpvbnRhbExpc3RcIj5cbiAgICAgICAgPGxpICpuZ0Zvcj1cImxldCBjaGVja2JveEl0ZW0gb2YgY2hlY2tib3hMaXN0XCJcbiAgICAgICAgICBbY2xhc3NdPVwib3B0aW9ucz8uaHRtbENsYXNzIHx8ICcnXCI+XG4gICAgICAgICAgPG1hdC1jaGVja2JveCB0eXBlPVwiY2hlY2tib3hcIlxuICAgICAgICAgICAgWyhuZ01vZGVsKV09XCJjaGVja2JveEl0ZW0uY2hlY2tlZFwiXG4gICAgICAgICAgICBbY29sb3JdPVwib3B0aW9ucz8uY29sb3IgfHwgJ3ByaW1hcnknXCJcbiAgICAgICAgICAgIFtkaXNhYmxlZF09XCJjb250cm9sRGlzYWJsZWQgfHwgb3B0aW9ucz8ucmVhZG9ubHlcIlxuICAgICAgICAgICAgW25hbWVdPVwiY2hlY2tib3hJdGVtPy5uYW1lXCJcbiAgICAgICAgICAgIChibHVyKT1cIm9wdGlvbnMuc2hvd0Vycm9ycyA9IHRydWVcIlxuICAgICAgICAgICAgKGNoYW5nZSk9XCJ1cGRhdGVWYWx1ZSgpXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImNoZWNrYm94LW5hbWVcIiBbaW5uZXJIVE1MXT1cImNoZWNrYm94SXRlbT8ubmFtZVwiPjwvc3Bhbj5cbiAgICAgICAgICA8L21hdC1jaGVja2JveD5cbiAgICAgICAgPC9saT5cbiAgICAgIDwvdWw+XG4gICAgICA8bWF0LWVycm9yICpuZ0lmPVwib3B0aW9ucz8uc2hvd0Vycm9ycyAmJiBvcHRpb25zPy5lcnJvck1lc3NhZ2VcIlxuICAgICAgICBbaW5uZXJIVE1MXT1cIm9wdGlvbnM/LmVycm9yTWVzc2FnZVwiPjwvbWF0LWVycm9yPlxuICAgIDwvZGl2PmAsXG4gIHN0eWxlczogW2BcbiAgICAudGl0bGUgeyBmb250LXdlaWdodDogYm9sZDsgfVxuICAgIC5jaGVja2JveC1saXN0IHsgbGlzdC1zdHlsZS10eXBlOiBub25lOyB9XG4gICAgLmhvcml6b250YWwtbGlzdCA+IGxpIHsgZGlzcGxheTogaW5saW5lLWJsb2NrOyBtYXJnaW4tcmlnaHQ6IDEwcHg7IHpvb206IDE7IH1cbiAgICAuY2hlY2tib3gtbmFtZSB7IHdoaXRlLXNwYWNlOiBub3dyYXA7IH1cbiAgICBtYXQtZXJyb3IgeyBmb250LXNpemU6IDc1JTsgfVxuICBgXSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0ZXJpYWxDaGVja2JveGVzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgZm9ybUNvbnRyb2w6IEFic3RyYWN0Q29udHJvbDtcbiAgY29udHJvbE5hbWU6IHN0cmluZztcbiAgY29udHJvbFZhbHVlOiBhbnk7XG4gIGNvbnRyb2xEaXNhYmxlZCA9IGZhbHNlO1xuICBib3VuZENvbnRyb2wgPSBmYWxzZTtcbiAgb3B0aW9uczogYW55O1xuICBob3Jpem9udGFsTGlzdCA9IGZhbHNlO1xuICBmb3JtQXJyYXk6IEFic3RyYWN0Q29udHJvbDtcbiAgY2hlY2tib3hMaXN0OiBUaXRsZU1hcEl0ZW1bXSA9IFtdO1xuICBASW5wdXQoKSBsYXlvdXROb2RlOiBhbnk7XG4gIEBJbnB1dCgpIGxheW91dEluZGV4OiBudW1iZXJbXTtcbiAgQElucHV0KCkgZGF0YUluZGV4OiBudW1iZXJbXTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGpzZjogSnNvblNjaGVtYUZvcm1TZXJ2aWNlXG4gICkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5vcHRpb25zID0gdGhpcy5sYXlvdXROb2RlLm9wdGlvbnMgfHwge307XG4gICAgdGhpcy5ob3Jpem9udGFsTGlzdCA9IHRoaXMubGF5b3V0Tm9kZS50eXBlID09PSAnY2hlY2tib3hlcy1pbmxpbmUnIHx8XG4gICAgICB0aGlzLmxheW91dE5vZGUudHlwZSA9PT0gJ2NoZWNrYm94YnV0dG9ucyc7XG4gICAgdGhpcy5qc2YuaW5pdGlhbGl6ZUNvbnRyb2wodGhpcyk7XG4gICAgdGhpcy5jaGVja2JveExpc3QgPSBidWlsZFRpdGxlTWFwKFxuICAgICAgdGhpcy5vcHRpb25zLnRpdGxlTWFwIHx8IHRoaXMub3B0aW9ucy5lbnVtTmFtZXMsIHRoaXMub3B0aW9ucy5lbnVtLCB0cnVlXG4gICAgKTtcbiAgICBpZiAodGhpcy5ib3VuZENvbnRyb2wpIHtcbiAgICAgIGNvbnN0IGZvcm1BcnJheSA9IHRoaXMuanNmLmdldEZvcm1Db250cm9sKHRoaXMpO1xuICAgICAgZm9yIChsZXQgY2hlY2tib3hJdGVtIG9mIHRoaXMuY2hlY2tib3hMaXN0KSB7XG4gICAgICAgIGNoZWNrYm94SXRlbS5jaGVja2VkID0gZm9ybUFycmF5LnZhbHVlLmluY2x1ZGVzKGNoZWNrYm94SXRlbS52YWx1ZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZ2V0IGFsbENoZWNrZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuY2hlY2tib3hMaXN0LmZpbHRlcih0ID0+IHQuY2hlY2tlZCkubGVuZ3RoID09PSB0aGlzLmNoZWNrYm94TGlzdC5sZW5ndGg7XG4gIH1cblxuICBnZXQgc29tZUNoZWNrZWQoKTogYm9vbGVhbiB7XG4gICAgY29uc3QgY2hlY2tlZEl0ZW1zID0gdGhpcy5jaGVja2JveExpc3QuZmlsdGVyKHQgPT4gdC5jaGVja2VkKS5sZW5ndGg7XG4gICAgcmV0dXJuIGNoZWNrZWRJdGVtcyA+IDAgJiYgY2hlY2tlZEl0ZW1zIDwgdGhpcy5jaGVja2JveExpc3QubGVuZ3RoO1xuICB9XG5cbiAgdXBkYXRlVmFsdWUoKSB7XG4gICAgdGhpcy5vcHRpb25zLnNob3dFcnJvcnMgPSB0cnVlO1xuICAgIGlmICh0aGlzLmJvdW5kQ29udHJvbCkge1xuICAgICAgdGhpcy5qc2YudXBkYXRlQXJyYXlDaGVja2JveExpc3QodGhpcywgdGhpcy5jaGVja2JveExpc3QpO1xuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZUFsbFZhbHVlcyhldmVudDogYW55KSB7XG4gICAgdGhpcy5vcHRpb25zLnNob3dFcnJvcnMgPSB0cnVlO1xuICAgIHRoaXMuY2hlY2tib3hMaXN0LmZvckVhY2godCA9PiB0LmNoZWNrZWQgPSBldmVudC5jaGVja2VkKTtcbiAgICB0aGlzLnVwZGF0ZVZhbHVlKCk7XG4gIH1cbn1cbiJdfQ==