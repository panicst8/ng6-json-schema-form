/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetLibraryModule } from '../../widget-library/widget-library.module';
import { Framework } from '../framework';
import { Bootstrap4FrameworkComponent } from './bootstrap-4-framework.component';
import { Bootstrap4Framework } from './bootstrap-4.framework';
var Bootstrap4FrameworkModule = /** @class */ (function () {
    function Bootstrap4FrameworkModule() {
    }
    /**
     * @return {?}
     */
    Bootstrap4FrameworkModule.forRoot = /**
     * @return {?}
     */
    function () {
        return {
            ngModule: Bootstrap4FrameworkModule,
            providers: [
                { provide: Framework, useClass: Bootstrap4Framework, multi: true }
            ]
        };
    };
    Bootstrap4FrameworkModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule, WidgetLibraryModule],
                    declarations: [Bootstrap4FrameworkComponent],
                    exports: [Bootstrap4FrameworkComponent],
                    entryComponents: [Bootstrap4FrameworkComponent]
                },] },
    ];
    return Bootstrap4FrameworkModule;
}());
export { Bootstrap4FrameworkModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9vdHN0cmFwLTQtZnJhbWV3b3JrLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nNi1qc29uLXNjaGVtYS1mb3JtLyIsInNvdXJjZXMiOlsibGliL2ZyYW1ld29yay1saWJyYXJ5L2Jvb3RzdHJhcC00LWZyYW1ld29yay9ib290c3RyYXAtNC1mcmFtZXdvcmsubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUF1QixNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFHL0MsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sNENBQTRDLENBQUM7QUFDakYsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUN6QyxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUNqRixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQzs7Ozs7OztJQVNyRCxpQ0FBTzs7O0lBQWQ7UUFDRSxNQUFNLENBQUM7WUFDTCxRQUFRLEVBQUUseUJBQXlCO1lBQ25DLFNBQVMsRUFBRTtnQkFDVCxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLG1CQUFtQixFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUU7YUFDbkU7U0FDRixDQUFDO0tBQ0g7O2dCQWRGLFFBQVEsU0FBQztvQkFDUixPQUFPLEVBQVUsQ0FBRSxZQUFZLEVBQUUsbUJBQW1CLENBQUU7b0JBQ3RELFlBQVksRUFBSyxDQUFFLDRCQUE0QixDQUFFO29CQUNqRCxPQUFPLEVBQVUsQ0FBRSw0QkFBNEIsQ0FBRTtvQkFDakQsZUFBZSxFQUFFLENBQUUsNEJBQTRCLENBQUU7aUJBQ2xEOztvQ0FkRDs7U0FlYSx5QkFBeUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuaW1wb3J0IHsgSnNvblNjaGVtYUZvcm1TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vanNvbi1zY2hlbWEtZm9ybS5zZXJ2aWNlJztcbmltcG9ydCB7IFdpZGdldExpYnJhcnlNb2R1bGUgfSBmcm9tICcuLi8uLi93aWRnZXQtbGlicmFyeS93aWRnZXQtbGlicmFyeS5tb2R1bGUnO1xuaW1wb3J0IHsgRnJhbWV3b3JrIH0gZnJvbSAnLi4vZnJhbWV3b3JrJztcbmltcG9ydCB7IEJvb3RzdHJhcDRGcmFtZXdvcmtDb21wb25lbnQgfSBmcm9tICcuL2Jvb3RzdHJhcC00LWZyYW1ld29yay5jb21wb25lbnQnO1xuaW1wb3J0IHsgQm9vdHN0cmFwNEZyYW1ld29yayB9IGZyb20gJy4vYm9vdHN0cmFwLTQuZnJhbWV3b3JrJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogICAgICAgICBbIENvbW1vbk1vZHVsZSwgV2lkZ2V0TGlicmFyeU1vZHVsZSBdLFxuICBkZWNsYXJhdGlvbnM6ICAgIFsgQm9vdHN0cmFwNEZyYW1ld29ya0NvbXBvbmVudCBdLFxuICBleHBvcnRzOiAgICAgICAgIFsgQm9vdHN0cmFwNEZyYW1ld29ya0NvbXBvbmVudCBdLFxuICBlbnRyeUNvbXBvbmVudHM6IFsgQm9vdHN0cmFwNEZyYW1ld29ya0NvbXBvbmVudCBdXG59KVxuZXhwb3J0IGNsYXNzIEJvb3RzdHJhcDRGcmFtZXdvcmtNb2R1bGUge1xuICBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IEJvb3RzdHJhcDRGcmFtZXdvcmtNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgeyBwcm92aWRlOiBGcmFtZXdvcmssIHVzZUNsYXNzOiBCb290c3RyYXA0RnJhbWV3b3JrLCBtdWx0aTogdHJ1ZSB9XG4gICAgICBdXG4gICAgfTtcbiAgfVxufVxuIl19