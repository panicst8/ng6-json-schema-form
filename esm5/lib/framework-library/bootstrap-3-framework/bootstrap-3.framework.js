/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Framework } from '../framework';
import { Bootstrap3FrameworkComponent } from './bootstrap-3-framework.component';
var Bootstrap3Framework = /** @class */ (function (_super) {
    tslib_1.__extends(Bootstrap3Framework, _super);
    function Bootstrap3Framework() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = 'bootstrap-3';
        _this.framework = Bootstrap3FrameworkComponent;
        _this.stylesheets = [
            '//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css',
            '//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css',
        ];
        _this.scripts = [
            '//ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js',
            '//ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js',
            '//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js',
        ];
        return _this;
    }
    Bootstrap3Framework.decorators = [
        { type: Injectable },
    ];
    return Bootstrap3Framework;
}(Framework));
export { Bootstrap3Framework };
if (false) {
    /** @type {?} */
    Bootstrap3Framework.prototype.name;
    /** @type {?} */
    Bootstrap3Framework.prototype.framework;
    /** @type {?} */
    Bootstrap3Framework.prototype.stylesheets;
    /** @type {?} */
    Bootstrap3Framework.prototype.scripts;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9vdHN0cmFwLTMuZnJhbWV3b3JrLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmc2LWpzb24tc2NoZW1hLWZvcm0vIiwic291cmNlcyI6WyJsaWIvZnJhbWV3b3JrLWxpYnJhcnkvYm9vdHN0cmFwLTMtZnJhbWV3b3JrL2Jvb3RzdHJhcC0zLmZyYW1ld29yay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUl6QyxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQzs7SUFHeEMsK0NBQVM7OztxQkFDekMsYUFBYTswQkFFUiw0QkFBNEI7NEJBRTFCO1lBQ1osaUVBQWlFO1lBQ2pFLHVFQUF1RTtTQUN4RTt3QkFFUztZQUNSLDREQUE0RDtZQUM1RCxrRUFBa0U7WUFDbEUsK0RBQStEO1NBQ2hFOzs7O2dCQWZGLFVBQVU7OzhCQVJYO0VBU3lDLFNBQVM7U0FBckMsbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBGcmFtZXdvcmsgfSBmcm9tICcuLi9mcmFtZXdvcmsnO1xuXG4vLyBCb290c3RyYXAgMyBGcmFtZXdvcmtcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS92YWxvci1zb2Z0d2FyZS9uZzItYm9vdHN0cmFwXG5pbXBvcnQgeyBCb290c3RyYXAzRnJhbWV3b3JrQ29tcG9uZW50IH0gZnJvbSAnLi9ib290c3RyYXAtMy1mcmFtZXdvcmsuY29tcG9uZW50JztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEJvb3RzdHJhcDNGcmFtZXdvcmsgZXh0ZW5kcyBGcmFtZXdvcmsge1xuICBuYW1lID0gJ2Jvb3RzdHJhcC0zJztcblxuICBmcmFtZXdvcmsgPSBCb290c3RyYXAzRnJhbWV3b3JrQ29tcG9uZW50O1xuXG4gIHN0eWxlc2hlZXRzID0gW1xuICAgICcvL21heGNkbi5ib290c3RyYXBjZG4uY29tL2Jvb3RzdHJhcC8zLjMuNy9jc3MvYm9vdHN0cmFwLm1pbi5jc3MnLFxuICAgICcvL21heGNkbi5ib290c3RyYXBjZG4uY29tL2Jvb3RzdHJhcC8zLjMuNy9jc3MvYm9vdHN0cmFwLXRoZW1lLm1pbi5jc3MnLFxuICBdO1xuXG4gIHNjcmlwdHMgPSBbXG4gICAgJy8vYWpheC5nb29nbGVhcGlzLmNvbS9hamF4L2xpYnMvanF1ZXJ5LzIuMi40L2pxdWVyeS5taW4uanMnLFxuICAgICcvL2FqYXguZ29vZ2xlYXBpcy5jb20vYWpheC9saWJzL2pxdWVyeXVpLzEuMTIuMS9qcXVlcnktdWkubWluLmpzJyxcbiAgICAnLy9tYXhjZG4uYm9vdHN0cmFwY2RuLmNvbS9ib290c3RyYXAvMy4zLjcvanMvYm9vdHN0cmFwLm1pbi5qcycsXG4gIF07XG59XG4iXX0=