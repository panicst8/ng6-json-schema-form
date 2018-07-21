/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
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
var MaterialDesignFramework = /** @class */ (function (_super) {
    tslib_1.__extends(MaterialDesignFramework, _super);
    function MaterialDesignFramework() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = 'material-design';
        _this.framework = MaterialDesignFrameworkComponent;
        _this.stylesheets = [
            '//fonts.googleapis.com/icon?family=Material+Icons',
            '//fonts.googleapis.com/css?family=Roboto:300,400,500,700',
        ];
        _this.widgets = {
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
        return _this;
    }
    MaterialDesignFramework.decorators = [
        { type: Injectable },
    ];
    return MaterialDesignFramework;
}(Framework));
export { MaterialDesignFramework };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0ZXJpYWwtZGVzaWduLmZyYW1ld29yay5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nNi1qc29uLXNjaGVtYS1mb3JtLyIsInNvdXJjZXMiOlsibGliL2ZyYW1ld29yay1saWJyYXJ5L21hdGVyaWFsLWRlc2lnbi1mcmFtZXdvcmsvbWF0ZXJpYWwtZGVzaWduLmZyYW1ld29yay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUl6QyxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUN2RSxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUM3RSxPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUNuRixPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUNyRSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUN0RSxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUNqRixPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUMxRSxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUM5RSxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUMzRSxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUM5RSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUNsRSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUNwRSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUN0RSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUN0RSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUN0RSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUN0RSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUN4RSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUNsRSxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUMxRSxPQUFPLEVBQUUsZ0NBQWdDLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQzs7SUFHNUMsbURBQVM7OztxQkFDN0MsaUJBQWlCOzBCQUVaLGdDQUFnQzs0QkFFOUI7WUFDWixtREFBbUQ7WUFDbkQsMERBQTBEO1NBQzNEO3dCQUVTO1lBQ1IsTUFBTSxFQUFhLHVCQUF1QjtZQUMxQyxTQUFTLEVBQVUsMEJBQTBCO1lBQzdDLE1BQU0sRUFBYSw2QkFBNkI7WUFDaEQsUUFBUSxFQUFXLHVCQUF1QjtZQUMxQyxjQUFjLEVBQUssNEJBQTRCO1lBQy9DLFVBQVUsRUFBUyx5QkFBeUI7WUFDNUMsWUFBWSxFQUFPLDJCQUEyQjtZQUM5QyxXQUFXLEVBQVEseUJBQXlCO1lBQzVDLE1BQU0sRUFBYSwyQkFBMkI7WUFDOUMsTUFBTSxFQUFhLHFCQUFxQjtZQUN4QyxRQUFRLEVBQVcsdUJBQXVCO1lBQzFDLFFBQVEsRUFBVyxzQkFBc0I7WUFDekMsUUFBUSxFQUFXLHVCQUF1QjtZQUMxQyxRQUFRLEVBQVcsdUJBQXVCO1lBQzFDLFFBQVEsRUFBVyx1QkFBdUI7WUFDMUMsU0FBUyxFQUFVLHdCQUF3QjtZQUMzQyxNQUFNLEVBQWEscUJBQXFCO1lBQ3hDLE1BQU0sRUFBYSxzQkFBc0I7WUFDekMsVUFBVSxFQUFTLHlCQUF5QjtZQUM1QyxVQUFVLEVBQVMsTUFBTTtZQUN6QixRQUFRLEVBQVcsUUFBUTtZQUMzQixNQUFNLEVBQWEsU0FBUztZQUM1QixPQUFPLEVBQVksTUFBTTtZQUN6QixpQkFBaUIsRUFBRSxTQUFTO1lBQzVCLFFBQVEsRUFBVyxNQUFNO1lBQ3pCLE9BQU8sRUFBWSxNQUFNO1lBQ3pCLFNBQVMsRUFBVSxRQUFRO1lBQzNCLGNBQWMsRUFBSyxjQUFjO1lBQ2pDLE9BQU8sRUFBWSxRQUFRO1lBQzNCLFFBQVEsRUFBVyxRQUFRO1lBQzNCLFdBQVcsRUFBUSxXQUFXO1lBQzlCLFFBQVEsRUFBVyxTQUFTO1NBQzdCOzs7O2dCQTVDRixVQUFVOztrQ0EzQlg7RUE0QjZDLFNBQVM7U0FBekMsdUJBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBGcmFtZXdvcmsgfSBmcm9tICcuLi9mcmFtZXdvcmsnO1xuXG4vLyBNYXRlcmlhbCBEZXNpZ24gRnJhbWV3b3JrXG4vLyBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9tYXRlcmlhbDJcbmltcG9ydCB7IEZsZXhMYXlvdXRSb290Q29tcG9uZW50IH0gZnJvbSAnLi9mbGV4LWxheW91dC1yb290LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGbGV4TGF5b3V0U2VjdGlvbkNvbXBvbmVudCB9IGZyb20gJy4vZmxleC1sYXlvdXQtc2VjdGlvbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWF0ZXJpYWxBZGRSZWZlcmVuY2VDb21wb25lbnQgfSBmcm9tICcuL21hdGVyaWFsLWFkZC1yZWZlcmVuY2UuY29tcG9uZW50JztcbmltcG9ydCB7IE1hdGVyaWFsT25lT2ZDb21wb25lbnQgfSBmcm9tICcuL21hdGVyaWFsLW9uZS1vZi5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWF0ZXJpYWxCdXR0b25Db21wb25lbnQgfSBmcm9tICcuL21hdGVyaWFsLWJ1dHRvbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWF0ZXJpYWxCdXR0b25Hcm91cENvbXBvbmVudCB9IGZyb20gJy4vbWF0ZXJpYWwtYnV0dG9uLWdyb3VwLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYXRlcmlhbENoZWNrYm94Q29tcG9uZW50IH0gZnJvbSAnLi9tYXRlcmlhbC1jaGVja2JveC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWF0ZXJpYWxDaGVja2JveGVzQ29tcG9uZW50IH0gZnJvbSAnLi9tYXRlcmlhbC1jaGVja2JveGVzLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYXRlcmlhbENoaXBMaXN0Q29tcG9uZW50IH0gZnJvbSAnLi9tYXRlcmlhbC1jaGlwLWxpc3QuY29tcG9uZW50JztcbmltcG9ydCB7IE1hdGVyaWFsRGF0ZXBpY2tlckNvbXBvbmVudCB9IGZyb20gJy4vbWF0ZXJpYWwtZGF0ZXBpY2tlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWF0ZXJpYWxGaWxlQ29tcG9uZW50IH0gZnJvbSAnLi9tYXRlcmlhbC1maWxlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYXRlcmlhbElucHV0Q29tcG9uZW50IH0gZnJvbSAnLi9tYXRlcmlhbC1pbnB1dC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWF0ZXJpYWxOdW1iZXJDb21wb25lbnQgfSBmcm9tICcuL21hdGVyaWFsLW51bWJlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWF0ZXJpYWxSYWRpb3NDb21wb25lbnQgfSBmcm9tICcuL21hdGVyaWFsLXJhZGlvcy5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWF0ZXJpYWxTZWxlY3RDb21wb25lbnQgfSBmcm9tICcuL21hdGVyaWFsLXNlbGVjdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWF0ZXJpYWxTbGlkZXJDb21wb25lbnQgfSBmcm9tICcuL21hdGVyaWFsLXNsaWRlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWF0ZXJpYWxTdGVwcGVyQ29tcG9uZW50IH0gZnJvbSAnLi9tYXRlcmlhbC1zdGVwcGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYXRlcmlhbFRhYnNDb21wb25lbnQgfSBmcm9tICcuL21hdGVyaWFsLXRhYnMuY29tcG9uZW50JztcbmltcG9ydCB7IE1hdGVyaWFsVGV4dGFyZWFDb21wb25lbnQgfSBmcm9tICcuL21hdGVyaWFsLXRleHRhcmVhLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYXRlcmlhbERlc2lnbkZyYW1ld29ya0NvbXBvbmVudCB9IGZyb20gJy4vbWF0ZXJpYWwtZGVzaWduLWZyYW1ld29yay5jb21wb25lbnQnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTWF0ZXJpYWxEZXNpZ25GcmFtZXdvcmsgZXh0ZW5kcyBGcmFtZXdvcmsge1xuICBuYW1lID0gJ21hdGVyaWFsLWRlc2lnbic7XG5cbiAgZnJhbWV3b3JrID0gTWF0ZXJpYWxEZXNpZ25GcmFtZXdvcmtDb21wb25lbnQ7XG5cbiAgc3R5bGVzaGVldHMgPSBbXG4gICAgJy8vZm9udHMuZ29vZ2xlYXBpcy5jb20vaWNvbj9mYW1pbHk9TWF0ZXJpYWwrSWNvbnMnLFxuICAgICcvL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2Nzcz9mYW1pbHk9Um9ib3RvOjMwMCw0MDAsNTAwLDcwMCcsXG4gIF07XG5cbiAgd2lkZ2V0cyA9IHtcbiAgICAncm9vdCc6ICAgICAgICAgICAgRmxleExheW91dFJvb3RDb21wb25lbnQsXG4gICAgJ3NlY3Rpb24nOiAgICAgICAgIEZsZXhMYXlvdXRTZWN0aW9uQ29tcG9uZW50LFxuICAgICckcmVmJzogICAgICAgICAgICBNYXRlcmlhbEFkZFJlZmVyZW5jZUNvbXBvbmVudCxcbiAgICAnYnV0dG9uJzogICAgICAgICAgTWF0ZXJpYWxCdXR0b25Db21wb25lbnQsXG4gICAgJ2J1dHRvbi1ncm91cCc6ICAgIE1hdGVyaWFsQnV0dG9uR3JvdXBDb21wb25lbnQsXG4gICAgJ2NoZWNrYm94JzogICAgICAgIE1hdGVyaWFsQ2hlY2tib3hDb21wb25lbnQsXG4gICAgJ2NoZWNrYm94ZXMnOiAgICAgIE1hdGVyaWFsQ2hlY2tib3hlc0NvbXBvbmVudCxcbiAgICAnY2hpcC1saXN0JzogICAgICAgTWF0ZXJpYWxDaGlwTGlzdENvbXBvbmVudCxcbiAgICAnZGF0ZSc6ICAgICAgICAgICAgTWF0ZXJpYWxEYXRlcGlja2VyQ29tcG9uZW50LFxuICAgICdmaWxlJzogICAgICAgICAgICBNYXRlcmlhbEZpbGVDb21wb25lbnQsXG4gICAgJ251bWJlcic6ICAgICAgICAgIE1hdGVyaWFsTnVtYmVyQ29tcG9uZW50LFxuICAgICdvbmUtb2YnOiAgICAgICAgICBNYXRlcmlhbE9uZU9mQ29tcG9uZW50LFxuICAgICdyYWRpb3MnOiAgICAgICAgICBNYXRlcmlhbFJhZGlvc0NvbXBvbmVudCxcbiAgICAnc2VsZWN0JzogICAgICAgICAgTWF0ZXJpYWxTZWxlY3RDb21wb25lbnQsXG4gICAgJ3NsaWRlcic6ICAgICAgICAgIE1hdGVyaWFsU2xpZGVyQ29tcG9uZW50LFxuICAgICdzdGVwcGVyJzogICAgICAgICBNYXRlcmlhbFN0ZXBwZXJDb21wb25lbnQsXG4gICAgJ3RhYnMnOiAgICAgICAgICAgIE1hdGVyaWFsVGFic0NvbXBvbmVudCxcbiAgICAndGV4dCc6ICAgICAgICAgICAgTWF0ZXJpYWxJbnB1dENvbXBvbmVudCxcbiAgICAndGV4dGFyZWEnOiAgICAgICAgTWF0ZXJpYWxUZXh0YXJlYUNvbXBvbmVudCxcbiAgICAnYWx0LWRhdGUnOiAgICAgICAgJ2RhdGUnLFxuICAgICdhbnktb2YnOiAgICAgICAgICAnb25lLW9mJyxcbiAgICAnY2FyZCc6ICAgICAgICAgICAgJ3NlY3Rpb24nLFxuICAgICdjb2xvcic6ICAgICAgICAgICAndGV4dCcsXG4gICAgJ2V4cGFuc2lvbi1wYW5lbCc6ICdzZWN0aW9uJyxcbiAgICAnaGlkZGVuJzogICAgICAgICAgJ25vbmUnLFxuICAgICdpbWFnZSc6ICAgICAgICAgICAnbm9uZScsXG4gICAgJ2ludGVnZXInOiAgICAgICAgICdudW1iZXInLFxuICAgICdyYWRpb2J1dHRvbnMnOiAgICAnYnV0dG9uLWdyb3VwJyxcbiAgICAncmFuZ2UnOiAgICAgICAgICAgJ3NsaWRlcicsXG4gICAgJ3N1Ym1pdCc6ICAgICAgICAgICdidXR0b24nLFxuICAgICd0YWdzaW5wdXQnOiAgICAgICAnY2hpcC1saXN0JyxcbiAgICAnd2l6YXJkJzogICAgICAgICAgJ3N0ZXBwZXInLFxuICB9O1xufVxuIl19