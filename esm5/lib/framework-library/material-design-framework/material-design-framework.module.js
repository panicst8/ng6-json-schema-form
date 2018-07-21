/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatAutocompleteModule, MatButtonModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule, MatExpansionModule, MatFormFieldModule, MatIconModule, MatInputModule, MatNativeDateModule, MatRadioModule, MatSelectModule, MatSliderModule, MatSlideToggleModule, MatStepperModule, MatTabsModule, MatTooltipModule, } from '@angular/material';
/** @type {?} */
export var ANGULAR_MATERIAL_MODULES = [
    MatAutocompleteModule, MatButtonModule, MatButtonToggleModule, MatCardModule,
    MatCheckboxModule, MatChipsModule, MatDatepickerModule, MatExpansionModule,
    MatFormFieldModule, MatIconModule, MatInputModule, MatNativeDateModule,
    MatRadioModule, MatSelectModule, MatSliderModule, MatSlideToggleModule,
    MatStepperModule, MatTabsModule, MatTooltipModule,
];
import { WidgetLibraryModule } from '../../widget-library/widget-library.module';
import { Framework } from '../framework';
import { MATERIAL_FRAMEWORK_COMPONENTS } from './index';
import { MaterialDesignFramework } from './material-design.framework';
var MaterialDesignFrameworkModule = /** @class */ (function () {
    function MaterialDesignFrameworkModule() {
    }
    /**
     * @return {?}
     */
    MaterialDesignFrameworkModule.forRoot = /**
     * @return {?}
     */
    function () {
        return {
            ngModule: MaterialDesignFrameworkModule,
            providers: [
                { provide: Framework, useClass: MaterialDesignFramework, multi: true }
            ]
        };
    };
    MaterialDesignFrameworkModule.decorators = [
        { type: NgModule, args: [{
                    imports: tslib_1.__spread([
                        CommonModule, FormsModule, ReactiveFormsModule, FlexLayoutModule
                    ], ANGULAR_MATERIAL_MODULES, [
                        WidgetLibraryModule
                    ]),
                    declarations: tslib_1.__spread(MATERIAL_FRAMEWORK_COMPONENTS),
                    exports: tslib_1.__spread(MATERIAL_FRAMEWORK_COMPONENTS),
                    entryComponents: tslib_1.__spread(MATERIAL_FRAMEWORK_COMPONENTS)
                },] },
    ];
    return MaterialDesignFrameworkModule;
}());
export { MaterialDesignFrameworkModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0ZXJpYWwtZGVzaWduLWZyYW1ld29yay5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZzYtanNvbi1zY2hlbWEtZm9ybS8iLCJzb3VyY2VzIjpbImxpYi9mcmFtZXdvcmstbGlicmFyeS9tYXRlcmlhbC1kZXNpZ24tZnJhbWV3b3JrL21hdGVyaWFsLWRlc2lnbi1mcmFtZXdvcmsubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBdUIsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxXQUFXLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNsRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN4RCxPQUFPLEVBQ0wscUJBQXFCLEVBQUUsZUFBZSxFQUFFLHFCQUFxQixFQUFFLGFBQWEsRUFDNUUsaUJBQWlCLEVBQUUsY0FBYyxFQUFFLG1CQUFtQixFQUFFLGtCQUFrQixFQUMxRSxrQkFBa0IsRUFBRSxhQUFhLEVBQUUsY0FBYyxFQUFFLG1CQUFtQixFQUN0RSxjQUFjLEVBQUUsZUFBZSxFQUFFLGVBQWUsRUFBRSxvQkFBb0IsRUFDdEUsZ0JBQWdCLEVBQUUsYUFBYSxFQUFFLGdCQUFnQixHQUNsRCxNQUFNLG1CQUFtQixDQUFDOztBQUMzQixXQUFhLHdCQUF3QixHQUFHO0lBQ3RDLHFCQUFxQixFQUFFLGVBQWUsRUFBRSxxQkFBcUIsRUFBRSxhQUFhO0lBQzVFLGlCQUFpQixFQUFFLGNBQWMsRUFBRSxtQkFBbUIsRUFBRSxrQkFBa0I7SUFDMUUsa0JBQWtCLEVBQUUsYUFBYSxFQUFFLGNBQWMsRUFBRSxtQkFBbUI7SUFDdEUsY0FBYyxFQUFFLGVBQWUsRUFBRSxlQUFlLEVBQUUsb0JBQW9CO0lBQ3RFLGdCQUFnQixFQUFFLGFBQWEsRUFBRSxnQkFBZ0I7Q0FDbEQsQ0FBQztBQVVGLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDRDQUE0QyxDQUFDO0FBQ2pGLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDekMsT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0sU0FBUyxDQUFDO0FBQ3hELE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDOzs7Ozs7O0lBWTdELHFDQUFPOzs7SUFBZDtRQUNFLE1BQU0sQ0FBQztZQUNMLFFBQVEsRUFBRSw2QkFBNkI7WUFDdkMsU0FBUyxFQUFFO2dCQUNULEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsdUJBQXVCLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRTthQUN2RTtTQUNGLENBQUM7S0FDSDs7Z0JBakJGLFFBQVEsU0FBQztvQkFDUixPQUFPO3dCQUNMLFlBQVksRUFBRSxXQUFXLEVBQUUsbUJBQW1CLEVBQUUsZ0JBQWdCO3VCQUM3RCx3QkFBd0I7d0JBQUUsbUJBQW1CO3NCQUNqRDtvQkFDRCxZQUFZLG1CQUFVLDZCQUE2QixDQUFFO29CQUNyRCxPQUFPLG1CQUFlLDZCQUE2QixDQUFFO29CQUNyRCxlQUFlLG1CQUFPLDZCQUE2QixDQUFFO2lCQUN0RDs7d0NBeENEOztTQXlDYSw2QkFBNkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRmxleExheW91dE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2ZsZXgtbGF5b3V0JztcbmltcG9ydCB7XG4gIE1hdEF1dG9jb21wbGV0ZU1vZHVsZSwgTWF0QnV0dG9uTW9kdWxlLCBNYXRCdXR0b25Ub2dnbGVNb2R1bGUsIE1hdENhcmRNb2R1bGUsXG4gIE1hdENoZWNrYm94TW9kdWxlLCBNYXRDaGlwc01vZHVsZSwgTWF0RGF0ZXBpY2tlck1vZHVsZSwgTWF0RXhwYW5zaW9uTW9kdWxlLFxuICBNYXRGb3JtRmllbGRNb2R1bGUsIE1hdEljb25Nb2R1bGUsIE1hdElucHV0TW9kdWxlLCBNYXROYXRpdmVEYXRlTW9kdWxlLFxuICBNYXRSYWRpb01vZHVsZSwgTWF0U2VsZWN0TW9kdWxlLCBNYXRTbGlkZXJNb2R1bGUsIE1hdFNsaWRlVG9nZ2xlTW9kdWxlLFxuICBNYXRTdGVwcGVyTW9kdWxlLCBNYXRUYWJzTW9kdWxlLCBNYXRUb29sdGlwTW9kdWxlLFxufSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5leHBvcnQgY29uc3QgQU5HVUxBUl9NQVRFUklBTF9NT0RVTEVTID0gW1xuICBNYXRBdXRvY29tcGxldGVNb2R1bGUsIE1hdEJ1dHRvbk1vZHVsZSwgTWF0QnV0dG9uVG9nZ2xlTW9kdWxlLCBNYXRDYXJkTW9kdWxlLFxuICBNYXRDaGVja2JveE1vZHVsZSwgTWF0Q2hpcHNNb2R1bGUsIE1hdERhdGVwaWNrZXJNb2R1bGUsIE1hdEV4cGFuc2lvbk1vZHVsZSxcbiAgTWF0Rm9ybUZpZWxkTW9kdWxlLCBNYXRJY29uTW9kdWxlLCBNYXRJbnB1dE1vZHVsZSwgTWF0TmF0aXZlRGF0ZU1vZHVsZSxcbiAgTWF0UmFkaW9Nb2R1bGUsIE1hdFNlbGVjdE1vZHVsZSwgTWF0U2xpZGVyTW9kdWxlLCBNYXRTbGlkZVRvZ2dsZU1vZHVsZSxcbiAgTWF0U3RlcHBlck1vZHVsZSwgTWF0VGFic01vZHVsZSwgTWF0VG9vbHRpcE1vZHVsZSxcbl07XG4vKipcbiAqIHVudXNlZCBAYW5ndWxhci9tYXRlcmlhbCBtb2R1bGVzOlxuICogTWF0RGlhbG9nTW9kdWxlLCBNYXRHcmlkTGlzdE1vZHVsZSwgTWF0TGlzdE1vZHVsZSwgTWF0TWVudU1vZHVsZSxcbiAqIE1hdFBhZ2luYXRvck1vZHVsZSwgTWF0UHJvZ3Jlc3NCYXJNb2R1bGUsIE1hdFByb2dyZXNzU3Bpbm5lck1vZHVsZSxcbiAqIE1hdFNpZGVuYXZNb2R1bGUsIE1hdFNuYWNrQmFyTW9kdWxlLCBNYXRTb3J0TW9kdWxlLCBNYXRUYWJsZU1vZHVsZSxcbiAqIE1hdFRvb2xiYXJNb2R1bGUsXG4gKi9cblxuaW1wb3J0IHsgSnNvblNjaGVtYUZvcm1TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vanNvbi1zY2hlbWEtZm9ybS5zZXJ2aWNlJztcbmltcG9ydCB7IFdpZGdldExpYnJhcnlNb2R1bGUgfSBmcm9tICcuLi8uLi93aWRnZXQtbGlicmFyeS93aWRnZXQtbGlicmFyeS5tb2R1bGUnO1xuaW1wb3J0IHsgRnJhbWV3b3JrIH0gZnJvbSAnLi4vZnJhbWV3b3JrJztcbmltcG9ydCB7IE1BVEVSSUFMX0ZSQU1FV09SS19DT01QT05FTlRTIH0gZnJvbSAnLi9pbmRleCc7XG5pbXBvcnQgeyBNYXRlcmlhbERlc2lnbkZyYW1ld29yayB9IGZyb20gJy4vbWF0ZXJpYWwtZGVzaWduLmZyYW1ld29yayc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsIEZvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlLCBGbGV4TGF5b3V0TW9kdWxlLFxuICAgIC4uLkFOR1VMQVJfTUFURVJJQUxfTU9EVUxFUywgV2lkZ2V0TGlicmFyeU1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6ICAgIFsgLi4uTUFURVJJQUxfRlJBTUVXT1JLX0NPTVBPTkVOVFMgXSxcbiAgZXhwb3J0czogICAgICAgICBbIC4uLk1BVEVSSUFMX0ZSQU1FV09SS19DT01QT05FTlRTIF0sXG4gIGVudHJ5Q29tcG9uZW50czogWyAuLi5NQVRFUklBTF9GUkFNRVdPUktfQ09NUE9ORU5UUyBdXG59KVxuZXhwb3J0IGNsYXNzIE1hdGVyaWFsRGVzaWduRnJhbWV3b3JrTW9kdWxlIHtcbiAgc3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBNYXRlcmlhbERlc2lnbkZyYW1ld29ya01vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7IHByb3ZpZGU6IEZyYW1ld29yaywgdXNlQ2xhc3M6IE1hdGVyaWFsRGVzaWduRnJhbWV3b3JrLCBtdWx0aTogdHJ1ZSB9XG4gICAgICBdXG4gICAgfTtcbiAgfVxufVxuIl19