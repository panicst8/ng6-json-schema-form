/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Framework } from '../framework';
import { FlexLayoutRootComponent } from './flex-layout-root.component';
import { FlexLayoutSectionComponent } from './flex-layout-section.component';
import { MaterialAddReferenceComponent } from './material-add-reference.component';
import { MaterialOneOfComponent } from './material-one-of.component';
import { MaterialButtonComponent } from './material-button.component';
import { MaterialButtonGroupComponent } from './material-button-group.component';
import { MaterialCheckboxComponent } from './material-checkbox.component';
import { MaterialCheckboxesComponent } from './material-checkboxes.component';
import { MaterialChipListComponent } from './material-chip-list.component';
import { MaterialDatepickerComponent } from './material-datepicker.component';
import { MaterialFileComponent } from './material-file.component';
import { MaterialInputComponent } from './material-input.component';
import { MaterialNumberComponent } from './material-number.component';
import { MaterialRadiosComponent } from './material-radios.component';
import { MaterialSelectComponent } from './material-select.component';
import { MaterialSliderComponent } from './material-slider.component';
import { MaterialStepperComponent } from './material-stepper.component';
import { MaterialTabsComponent } from './material-tabs.component';
import { MaterialTextareaComponent } from './material-textarea.component';
import { MaterialDesignFrameworkComponent } from './material-design-framework.component';
export class MaterialDesignFramework extends Framework {
    constructor() {
        super(...arguments);
        this.name = 'material-design';
        this.framework = MaterialDesignFrameworkComponent;
        this.stylesheets = [
            '//fonts.googleapis.com/icon?family=Material+Icons',
            '//fonts.googleapis.com/css?family=Roboto:300,400,500,700',
        ];
        this.widgets = {
            'root': FlexLayoutRootComponent,
            'section': FlexLayoutSectionComponent,
            '$ref': MaterialAddReferenceComponent,
            'button': MaterialButtonComponent,
            'button-group': MaterialButtonGroupComponent,
            'checkbox': MaterialCheckboxComponent,
            'checkboxes': MaterialCheckboxesComponent,
            'chip-list': MaterialChipListComponent,
            'date': MaterialDatepickerComponent,
            'file': MaterialFileComponent,
            'number': MaterialNumberComponent,
            'one-of': MaterialOneOfComponent,
            'radios': MaterialRadiosComponent,
            'select': MaterialSelectComponent,
            'slider': MaterialSliderComponent,
            'stepper': MaterialStepperComponent,
            'tabs': MaterialTabsComponent,
            'text': MaterialInputComponent,
            'textarea': MaterialTextareaComponent,
            'alt-date': 'date',
            'any-of': 'one-of',
            'card': 'section',
            'color': 'text',
            'expansion-panel': 'section',
            'hidden': 'none',
            'image': 'none',
            'integer': 'number',
            'radiobuttons': 'button-group',
            'range': 'slider',
            'submit': 'button',
            'tagsinput': 'chip-list',
            'wizard': 'stepper',
        };
    }
}
MaterialDesignFramework.decorators = [
    { type: Injectable },
];
if (false) {
    /** @type {?} */
    MaterialDesignFramework.prototype.name;
    /** @type {?} */
    MaterialDesignFramework.prototype.framework;
    /** @type {?} */
    MaterialDesignFramework.prototype.stylesheets;
    /** @type {?} */
    MaterialDesignFramework.prototype.widgets;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0ZXJpYWwtZGVzaWduLmZyYW1ld29yay5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nNi1qc29uLXNjaGVtYS1mb3JtLyIsInNvdXJjZXMiOlsibGliL2ZyYW1ld29yay1saWJyYXJ5L21hdGVyaWFsLWRlc2lnbi1mcmFtZXdvcmsvbWF0ZXJpYWwtZGVzaWduLmZyYW1ld29yay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBSXpDLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ3ZFLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQzdFLE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ25GLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ3JFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ3RFLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ2pGLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQzFFLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQzlFLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQzNFLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQzlFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3BFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ3RFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ3RFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ3RFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ3RFLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ3hFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQzFFLE9BQU8sRUFBRSxnQ0FBZ0MsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBR3pGLE1BQU0sOEJBQStCLFNBQVEsU0FBUzs7O29CQUM3QyxpQkFBaUI7eUJBRVosZ0NBQWdDOzJCQUU5QjtZQUNaLG1EQUFtRDtZQUNuRCwwREFBMEQ7U0FDM0Q7dUJBRVM7WUFDUixNQUFNLEVBQWEsdUJBQXVCO1lBQzFDLFNBQVMsRUFBVSwwQkFBMEI7WUFDN0MsTUFBTSxFQUFhLDZCQUE2QjtZQUNoRCxRQUFRLEVBQVcsdUJBQXVCO1lBQzFDLGNBQWMsRUFBSyw0QkFBNEI7WUFDL0MsVUFBVSxFQUFTLHlCQUF5QjtZQUM1QyxZQUFZLEVBQU8sMkJBQTJCO1lBQzlDLFdBQVcsRUFBUSx5QkFBeUI7WUFDNUMsTUFBTSxFQUFhLDJCQUEyQjtZQUM5QyxNQUFNLEVBQWEscUJBQXFCO1lBQ3hDLFFBQVEsRUFBVyx1QkFBdUI7WUFDMUMsUUFBUSxFQUFXLHNCQUFzQjtZQUN6QyxRQUFRLEVBQVcsdUJBQXVCO1lBQzFDLFFBQVEsRUFBVyx1QkFBdUI7WUFDMUMsUUFBUSxFQUFXLHVCQUF1QjtZQUMxQyxTQUFTLEVBQVUsd0JBQXdCO1lBQzNDLE1BQU0sRUFBYSxxQkFBcUI7WUFDeEMsTUFBTSxFQUFhLHNCQUFzQjtZQUN6QyxVQUFVLEVBQVMseUJBQXlCO1lBQzVDLFVBQVUsRUFBUyxNQUFNO1lBQ3pCLFFBQVEsRUFBVyxRQUFRO1lBQzNCLE1BQU0sRUFBYSxTQUFTO1lBQzVCLE9BQU8sRUFBWSxNQUFNO1lBQ3pCLGlCQUFpQixFQUFFLFNBQVM7WUFDNUIsUUFBUSxFQUFXLE1BQU07WUFDekIsT0FBTyxFQUFZLE1BQU07WUFDekIsU0FBUyxFQUFVLFFBQVE7WUFDM0IsY0FBYyxFQUFLLGNBQWM7WUFDakMsT0FBTyxFQUFZLFFBQVE7WUFDM0IsUUFBUSxFQUFXLFFBQVE7WUFDM0IsV0FBVyxFQUFRLFdBQVc7WUFDOUIsUUFBUSxFQUFXLFNBQVM7U0FDN0I7Ozs7WUE1Q0YsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgRnJhbWV3b3JrIH0gZnJvbSAnLi4vZnJhbWV3b3JrJztcblxuLy8gTWF0ZXJpYWwgRGVzaWduIEZyYW1ld29ya1xuLy8gaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvbWF0ZXJpYWwyXG5pbXBvcnQgeyBGbGV4TGF5b3V0Um9vdENvbXBvbmVudCB9IGZyb20gJy4vZmxleC1sYXlvdXQtcm9vdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgRmxleExheW91dFNlY3Rpb25Db21wb25lbnQgfSBmcm9tICcuL2ZsZXgtbGF5b3V0LXNlY3Rpb24uY29tcG9uZW50JztcbmltcG9ydCB7IE1hdGVyaWFsQWRkUmVmZXJlbmNlQ29tcG9uZW50IH0gZnJvbSAnLi9tYXRlcmlhbC1hZGQtcmVmZXJlbmNlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYXRlcmlhbE9uZU9mQ29tcG9uZW50IH0gZnJvbSAnLi9tYXRlcmlhbC1vbmUtb2YuY29tcG9uZW50JztcbmltcG9ydCB7IE1hdGVyaWFsQnV0dG9uQ29tcG9uZW50IH0gZnJvbSAnLi9tYXRlcmlhbC1idXR0b24uY29tcG9uZW50JztcbmltcG9ydCB7IE1hdGVyaWFsQnV0dG9uR3JvdXBDb21wb25lbnQgfSBmcm9tICcuL21hdGVyaWFsLWJ1dHRvbi1ncm91cC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWF0ZXJpYWxDaGVja2JveENvbXBvbmVudCB9IGZyb20gJy4vbWF0ZXJpYWwtY2hlY2tib3guY29tcG9uZW50JztcbmltcG9ydCB7IE1hdGVyaWFsQ2hlY2tib3hlc0NvbXBvbmVudCB9IGZyb20gJy4vbWF0ZXJpYWwtY2hlY2tib3hlcy5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWF0ZXJpYWxDaGlwTGlzdENvbXBvbmVudCB9IGZyb20gJy4vbWF0ZXJpYWwtY2hpcC1saXN0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYXRlcmlhbERhdGVwaWNrZXJDb21wb25lbnQgfSBmcm9tICcuL21hdGVyaWFsLWRhdGVwaWNrZXIuY29tcG9uZW50JztcbmltcG9ydCB7IE1hdGVyaWFsRmlsZUNvbXBvbmVudCB9IGZyb20gJy4vbWF0ZXJpYWwtZmlsZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWF0ZXJpYWxJbnB1dENvbXBvbmVudCB9IGZyb20gJy4vbWF0ZXJpYWwtaW5wdXQuY29tcG9uZW50JztcbmltcG9ydCB7IE1hdGVyaWFsTnVtYmVyQ29tcG9uZW50IH0gZnJvbSAnLi9tYXRlcmlhbC1udW1iZXIuY29tcG9uZW50JztcbmltcG9ydCB7IE1hdGVyaWFsUmFkaW9zQ29tcG9uZW50IH0gZnJvbSAnLi9tYXRlcmlhbC1yYWRpb3MuY29tcG9uZW50JztcbmltcG9ydCB7IE1hdGVyaWFsU2VsZWN0Q29tcG9uZW50IH0gZnJvbSAnLi9tYXRlcmlhbC1zZWxlY3QuY29tcG9uZW50JztcbmltcG9ydCB7IE1hdGVyaWFsU2xpZGVyQ29tcG9uZW50IH0gZnJvbSAnLi9tYXRlcmlhbC1zbGlkZXIuY29tcG9uZW50JztcbmltcG9ydCB7IE1hdGVyaWFsU3RlcHBlckNvbXBvbmVudCB9IGZyb20gJy4vbWF0ZXJpYWwtc3RlcHBlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWF0ZXJpYWxUYWJzQ29tcG9uZW50IH0gZnJvbSAnLi9tYXRlcmlhbC10YWJzLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYXRlcmlhbFRleHRhcmVhQ29tcG9uZW50IH0gZnJvbSAnLi9tYXRlcmlhbC10ZXh0YXJlYS5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWF0ZXJpYWxEZXNpZ25GcmFtZXdvcmtDb21wb25lbnQgfSBmcm9tICcuL21hdGVyaWFsLWRlc2lnbi1mcmFtZXdvcmsuY29tcG9uZW50JztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE1hdGVyaWFsRGVzaWduRnJhbWV3b3JrIGV4dGVuZHMgRnJhbWV3b3JrIHtcbiAgbmFtZSA9ICdtYXRlcmlhbC1kZXNpZ24nO1xuXG4gIGZyYW1ld29yayA9IE1hdGVyaWFsRGVzaWduRnJhbWV3b3JrQ29tcG9uZW50O1xuXG4gIHN0eWxlc2hlZXRzID0gW1xuICAgICcvL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2ljb24/ZmFtaWx5PU1hdGVyaWFsK0ljb25zJyxcbiAgICAnLy9mb250cy5nb29nbGVhcGlzLmNvbS9jc3M/ZmFtaWx5PVJvYm90bzozMDAsNDAwLDUwMCw3MDAnLFxuICBdO1xuXG4gIHdpZGdldHMgPSB7XG4gICAgJ3Jvb3QnOiAgICAgICAgICAgIEZsZXhMYXlvdXRSb290Q29tcG9uZW50LFxuICAgICdzZWN0aW9uJzogICAgICAgICBGbGV4TGF5b3V0U2VjdGlvbkNvbXBvbmVudCxcbiAgICAnJHJlZic6ICAgICAgICAgICAgTWF0ZXJpYWxBZGRSZWZlcmVuY2VDb21wb25lbnQsXG4gICAgJ2J1dHRvbic6ICAgICAgICAgIE1hdGVyaWFsQnV0dG9uQ29tcG9uZW50LFxuICAgICdidXR0b24tZ3JvdXAnOiAgICBNYXRlcmlhbEJ1dHRvbkdyb3VwQ29tcG9uZW50LFxuICAgICdjaGVja2JveCc6ICAgICAgICBNYXRlcmlhbENoZWNrYm94Q29tcG9uZW50LFxuICAgICdjaGVja2JveGVzJzogICAgICBNYXRlcmlhbENoZWNrYm94ZXNDb21wb25lbnQsXG4gICAgJ2NoaXAtbGlzdCc6ICAgICAgIE1hdGVyaWFsQ2hpcExpc3RDb21wb25lbnQsXG4gICAgJ2RhdGUnOiAgICAgICAgICAgIE1hdGVyaWFsRGF0ZXBpY2tlckNvbXBvbmVudCxcbiAgICAnZmlsZSc6ICAgICAgICAgICAgTWF0ZXJpYWxGaWxlQ29tcG9uZW50LFxuICAgICdudW1iZXInOiAgICAgICAgICBNYXRlcmlhbE51bWJlckNvbXBvbmVudCxcbiAgICAnb25lLW9mJzogICAgICAgICAgTWF0ZXJpYWxPbmVPZkNvbXBvbmVudCxcbiAgICAncmFkaW9zJzogICAgICAgICAgTWF0ZXJpYWxSYWRpb3NDb21wb25lbnQsXG4gICAgJ3NlbGVjdCc6ICAgICAgICAgIE1hdGVyaWFsU2VsZWN0Q29tcG9uZW50LFxuICAgICdzbGlkZXInOiAgICAgICAgICBNYXRlcmlhbFNsaWRlckNvbXBvbmVudCxcbiAgICAnc3RlcHBlcic6ICAgICAgICAgTWF0ZXJpYWxTdGVwcGVyQ29tcG9uZW50LFxuICAgICd0YWJzJzogICAgICAgICAgICBNYXRlcmlhbFRhYnNDb21wb25lbnQsXG4gICAgJ3RleHQnOiAgICAgICAgICAgIE1hdGVyaWFsSW5wdXRDb21wb25lbnQsXG4gICAgJ3RleHRhcmVhJzogICAgICAgIE1hdGVyaWFsVGV4dGFyZWFDb21wb25lbnQsXG4gICAgJ2FsdC1kYXRlJzogICAgICAgICdkYXRlJyxcbiAgICAnYW55LW9mJzogICAgICAgICAgJ29uZS1vZicsXG4gICAgJ2NhcmQnOiAgICAgICAgICAgICdzZWN0aW9uJyxcbiAgICAnY29sb3InOiAgICAgICAgICAgJ3RleHQnLFxuICAgICdleHBhbnNpb24tcGFuZWwnOiAnc2VjdGlvbicsXG4gICAgJ2hpZGRlbic6ICAgICAgICAgICdub25lJyxcbiAgICAnaW1hZ2UnOiAgICAgICAgICAgJ25vbmUnLFxuICAgICdpbnRlZ2VyJzogICAgICAgICAnbnVtYmVyJyxcbiAgICAncmFkaW9idXR0b25zJzogICAgJ2J1dHRvbi1ncm91cCcsXG4gICAgJ3JhbmdlJzogICAgICAgICAgICdzbGlkZXInLFxuICAgICdzdWJtaXQnOiAgICAgICAgICAnYnV0dG9uJyxcbiAgICAndGFnc2lucHV0JzogICAgICAgJ2NoaXAtbGlzdCcsXG4gICAgJ3dpemFyZCc6ICAgICAgICAgICdzdGVwcGVyJyxcbiAgfTtcbn1cbiJdfQ==