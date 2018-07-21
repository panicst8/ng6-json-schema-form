/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
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
export class JsonSchemaFormModule {
    /**
     * @param {...?} frameworks
     * @return {?}
     */
    static forRoot(...frameworks) {
        /** @type {?} */
        const loadFrameworks = frameworks.length ?
            frameworks.map(framework => framework.forRoot().providers[0]) :
            [{ provide: Framework, useClass: NoFramework, multi: true }];
        return {
            ngModule: JsonSchemaFormModule,
            providers: [
                JsonSchemaFormService, FrameworkLibraryService, WidgetLibraryService,
                ...loadFrameworks
            ]
        };
    }
}
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbi1zY2hlbWEtZm9ybS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZzYtanNvbi1zY2hlbWEtZm9ybS8iLCJzb3VyY2VzIjpbImxpYi9qc29uLXNjaGVtYS1mb3JtLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBdUIsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxXQUFXLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVsRSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSwrQ0FBK0MsQ0FBQztBQUN4RixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUM3RSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUUvRSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUV2RSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUduRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDMUQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLCtDQUErQyxDQUFDO0FBQzVFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHNEQUFzRCxDQUFDO0FBVXpGLE1BQU07Ozs7O0lBQ0osTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLFVBQVU7O1FBQzFCLE1BQU0sY0FBYyxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUN4QyxVQUFVLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDL0QsQ0FBQyxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUMvRCxNQUFNLENBQUM7WUFDTCxRQUFRLEVBQUUsb0JBQW9CO1lBQzlCLFNBQVMsRUFBRTtnQkFDVCxxQkFBcUIsRUFBRSx1QkFBdUIsRUFBRSxvQkFBb0I7Z0JBQ3BFLEdBQUcsY0FBYzthQUNsQjtTQUNGLENBQUM7S0FDSDs7O1lBcEJGLFFBQVEsU0FBQztnQkFDUixPQUFPLEVBQUU7b0JBQ1AsWUFBWSxFQUFFLFdBQVcsRUFBRSxtQkFBbUI7b0JBQzlDLG1CQUFtQixFQUFFLGlCQUFpQjtpQkFDdkM7Z0JBQ0QsWUFBWSxFQUFFLENBQUUsdUJBQXVCLENBQUU7Z0JBQ3pDLE9BQU8sRUFBRSxDQUFFLHVCQUF1QixFQUFFLG1CQUFtQixDQUFFO2FBQzFEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuaW1wb3J0IHsgRnJhbWV3b3JrTGlicmFyeVNlcnZpY2UgfSBmcm9tICcuL2ZyYW1ld29yay1saWJyYXJ5L2ZyYW1ld29yay1saWJyYXJ5LnNlcnZpY2UnO1xuaW1wb3J0IHsgV2lkZ2V0TGlicmFyeU1vZHVsZSB9IGZyb20gJy4vd2lkZ2V0LWxpYnJhcnkvd2lkZ2V0LWxpYnJhcnkubW9kdWxlJztcbmltcG9ydCB7IFdpZGdldExpYnJhcnlTZXJ2aWNlIH0gZnJvbSAnLi93aWRnZXQtbGlicmFyeS93aWRnZXQtbGlicmFyeS5zZXJ2aWNlJztcblxuaW1wb3J0IHsgSnNvblNjaGVtYUZvcm1Db21wb25lbnQgfSBmcm9tICcuL2pzb24tc2NoZW1hLWZvcm0uY29tcG9uZW50JztcblxuaW1wb3J0IHsgSnNvblNjaGVtYUZvcm1TZXJ2aWNlIH0gZnJvbSAnLi9qc29uLXNjaGVtYS1mb3JtLnNlcnZpY2UnO1xuXG5pbXBvcnQgeyBOb0ZyYW1ld29ya0NvbXBvbmVudCB9IGZyb20gJy4vZnJhbWV3b3JrLWxpYnJhcnkvbm8tZnJhbWV3b3JrL25vLWZyYW1ld29yay5jb21wb25lbnQnO1xuaW1wb3J0IHsgRnJhbWV3b3JrIH0gZnJvbSAnLi9mcmFtZXdvcmstbGlicmFyeS9mcmFtZXdvcmsnO1xuaW1wb3J0IHsgTm9GcmFtZXdvcmsgfSBmcm9tICcuL2ZyYW1ld29yay1saWJyYXJ5L25vLWZyYW1ld29yay9uby5mcmFtZXdvcmsnO1xuaW1wb3J0IHsgTm9GcmFtZXdvcmtNb2R1bGUgfSBmcm9tICcuL2ZyYW1ld29yay1saWJyYXJ5L25vLWZyYW1ld29yay9uby1mcmFtZXdvcmsubW9kdWxlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSwgRm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG4gICAgV2lkZ2V0TGlicmFyeU1vZHVsZSwgTm9GcmFtZXdvcmtNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbIEpzb25TY2hlbWFGb3JtQ29tcG9uZW50IF0sXG4gIGV4cG9ydHM6IFsgSnNvblNjaGVtYUZvcm1Db21wb25lbnQsIFdpZGdldExpYnJhcnlNb2R1bGUgXVxufSlcbmV4cG9ydCBjbGFzcyBKc29uU2NoZW1hRm9ybU1vZHVsZSB7XG4gIHN0YXRpYyBmb3JSb290KC4uLmZyYW1ld29ya3MpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICBjb25zdCBsb2FkRnJhbWV3b3JrcyA9IGZyYW1ld29ya3MubGVuZ3RoID9cbiAgICAgIGZyYW1ld29ya3MubWFwKGZyYW1ld29yayA9PiBmcmFtZXdvcmsuZm9yUm9vdCgpLnByb3ZpZGVyc1swXSkgOlxuICAgICAgW3sgcHJvdmlkZTogRnJhbWV3b3JrLCB1c2VDbGFzczogTm9GcmFtZXdvcmssIG11bHRpOiB0cnVlIH1dO1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogSnNvblNjaGVtYUZvcm1Nb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgSnNvblNjaGVtYUZvcm1TZXJ2aWNlLCBGcmFtZXdvcmtMaWJyYXJ5U2VydmljZSwgV2lkZ2V0TGlicmFyeVNlcnZpY2UsXG4gICAgICAgIC4uLmxvYWRGcmFtZXdvcmtzXG4gICAgICBdXG4gICAgfTtcbiAgfVxufVxuIl19