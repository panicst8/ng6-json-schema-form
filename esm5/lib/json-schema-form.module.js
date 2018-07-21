/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FrameworkLibraryService } from './framework-library/framework-library.service';
import { WidgetLibraryModule } from './widget-library/widget-library.module';
import { WidgetLibraryService } from './widget-library/widget-library.service';
import { JsonSchemaFormComponent } from './json-schema-form.component';
import { JsonSchemaFormService } from './json-schema-form.service';
import { Framework } from './framework-library/framework';
import { NoFramework } from './framework-library/no-framework/no.framework';
import { NoFrameworkModule } from './framework-library/no-framework/no-framework.module';
var JsonSchemaFormModule = /** @class */ (function () {
    function JsonSchemaFormModule() {
    }
    /**
     * @param {...?} frameworks
     * @return {?}
     */
    JsonSchemaFormModule.forRoot = /**
     * @param {...?} frameworks
     * @return {?}
     */
    function () {
        var frameworks = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            frameworks[_i] = arguments[_i];
        }
        /** @type {?} */
        var loadFrameworks = frameworks.length ?
            frameworks.map(function (framework) { return framework.forRoot().providers[0]; }) :
            [{ provide: Framework, useClass: NoFramework, multi: true }];
        return {
            ngModule: JsonSchemaFormModule,
            providers: tslib_1.__spread([
                JsonSchemaFormService, FrameworkLibraryService, WidgetLibraryService
            ], loadFrameworks)
        };
    };
    JsonSchemaFormModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule, FormsModule, ReactiveFormsModule,
                        WidgetLibraryModule, NoFrameworkModule
                    ],
                    declarations: [JsonSchemaFormComponent],
                    exports: [JsonSchemaFormComponent, WidgetLibraryModule]
                },] },
    ];
    return JsonSchemaFormModule;
}());
export { JsonSchemaFormModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbi1zY2hlbWEtZm9ybS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZzYtanNvbi1zY2hlbWEtZm9ybS8iLCJzb3VyY2VzIjpbImxpYi9qc29uLXNjaGVtYS1mb3JtLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQXVCLE1BQU0sZUFBZSxDQUFDO0FBQzlELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsV0FBVyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFbEUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sK0NBQStDLENBQUM7QUFDeEYsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDN0UsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFFL0UsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFFdkUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFHbkUsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQzFELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSwrQ0FBK0MsQ0FBQztBQUM1RSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxzREFBc0QsQ0FBQzs7Ozs7Ozs7SUFXaEYsNEJBQU87Ozs7SUFBZDtRQUFlLG9CQUFhO2FBQWIsVUFBYSxFQUFiLHFCQUFhLEVBQWIsSUFBYTtZQUFiLCtCQUFhOzs7UUFDMUIsSUFBTSxjQUFjLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3hDLFVBQVUsQ0FBQyxHQUFHLENBQUMsVUFBQSxTQUFTLElBQUksT0FBQSxTQUFTLENBQUMsT0FBTyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFoQyxDQUFnQyxDQUFDLENBQUMsQ0FBQztZQUMvRCxDQUFDLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQy9ELE1BQU0sQ0FBQztZQUNMLFFBQVEsRUFBRSxvQkFBb0I7WUFDOUIsU0FBUztnQkFDUCxxQkFBcUIsRUFBRSx1QkFBdUIsRUFBRSxvQkFBb0I7ZUFDakUsY0FBYyxDQUNsQjtTQUNGLENBQUM7S0FDSDs7Z0JBcEJGLFFBQVEsU0FBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsWUFBWSxFQUFFLFdBQVcsRUFBRSxtQkFBbUI7d0JBQzlDLG1CQUFtQixFQUFFLGlCQUFpQjtxQkFDdkM7b0JBQ0QsWUFBWSxFQUFFLENBQUUsdUJBQXVCLENBQUU7b0JBQ3pDLE9BQU8sRUFBRSxDQUFFLHVCQUF1QixFQUFFLG1CQUFtQixDQUFFO2lCQUMxRDs7K0JBeEJEOztTQXlCYSxvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5pbXBvcnQgeyBGcmFtZXdvcmtMaWJyYXJ5U2VydmljZSB9IGZyb20gJy4vZnJhbWV3b3JrLWxpYnJhcnkvZnJhbWV3b3JrLWxpYnJhcnkuc2VydmljZSc7XG5pbXBvcnQgeyBXaWRnZXRMaWJyYXJ5TW9kdWxlIH0gZnJvbSAnLi93aWRnZXQtbGlicmFyeS93aWRnZXQtbGlicmFyeS5tb2R1bGUnO1xuaW1wb3J0IHsgV2lkZ2V0TGlicmFyeVNlcnZpY2UgfSBmcm9tICcuL3dpZGdldC1saWJyYXJ5L3dpZGdldC1saWJyYXJ5LnNlcnZpY2UnO1xuXG5pbXBvcnQgeyBKc29uU2NoZW1hRm9ybUNvbXBvbmVudCB9IGZyb20gJy4vanNvbi1zY2hlbWEtZm9ybS5jb21wb25lbnQnO1xuXG5pbXBvcnQgeyBKc29uU2NoZW1hRm9ybVNlcnZpY2UgfSBmcm9tICcuL2pzb24tc2NoZW1hLWZvcm0uc2VydmljZSc7XG5cbmltcG9ydCB7IE5vRnJhbWV3b3JrQ29tcG9uZW50IH0gZnJvbSAnLi9mcmFtZXdvcmstbGlicmFyeS9uby1mcmFtZXdvcmsvbm8tZnJhbWV3b3JrLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGcmFtZXdvcmsgfSBmcm9tICcuL2ZyYW1ld29yay1saWJyYXJ5L2ZyYW1ld29yayc7XG5pbXBvcnQgeyBOb0ZyYW1ld29yayB9IGZyb20gJy4vZnJhbWV3b3JrLWxpYnJhcnkvbm8tZnJhbWV3b3JrL25vLmZyYW1ld29yayc7XG5pbXBvcnQgeyBOb0ZyYW1ld29ya01vZHVsZSB9IGZyb20gJy4vZnJhbWV3b3JrLWxpYnJhcnkvbm8tZnJhbWV3b3JrL25vLWZyYW1ld29yay5tb2R1bGUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLCBGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICBXaWRnZXRMaWJyYXJ5TW9kdWxlLCBOb0ZyYW1ld29ya01vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFsgSnNvblNjaGVtYUZvcm1Db21wb25lbnQgXSxcbiAgZXhwb3J0czogWyBKc29uU2NoZW1hRm9ybUNvbXBvbmVudCwgV2lkZ2V0TGlicmFyeU1vZHVsZSBdXG59KVxuZXhwb3J0IGNsYXNzIEpzb25TY2hlbWFGb3JtTW9kdWxlIHtcbiAgc3RhdGljIGZvclJvb3QoLi4uZnJhbWV3b3Jrcyk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xuICAgIGNvbnN0IGxvYWRGcmFtZXdvcmtzID0gZnJhbWV3b3Jrcy5sZW5ndGggP1xuICAgICAgZnJhbWV3b3Jrcy5tYXAoZnJhbWV3b3JrID0+IGZyYW1ld29yay5mb3JSb290KCkucHJvdmlkZXJzWzBdKSA6XG4gICAgICBbeyBwcm92aWRlOiBGcmFtZXdvcmssIHVzZUNsYXNzOiBOb0ZyYW1ld29yaywgbXVsdGk6IHRydWUgfV07XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBKc29uU2NoZW1hRm9ybU1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICBKc29uU2NoZW1hRm9ybVNlcnZpY2UsIEZyYW1ld29ya0xpYnJhcnlTZXJ2aWNlLCBXaWRnZXRMaWJyYXJ5U2VydmljZSxcbiAgICAgICAgLi4ubG9hZEZyYW1ld29ya3NcbiAgICAgIF1cbiAgICB9O1xuICB9XG59XG4iXX0=