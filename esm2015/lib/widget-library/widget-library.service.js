/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { hasOwn } from '../shared/utility.functions';
import { AddReferenceComponent } from './add-reference.component';
import { OneOfComponent } from './one-of.component';
import { ButtonComponent } from './button.component';
import { CheckboxComponent } from './checkbox.component';
import { CheckboxesComponent } from './checkboxes.component';
import { FileComponent } from './file.component';
import { InputComponent } from './input.component';
import { MessageComponent } from './message.component';
import { NoneComponent } from './none.component';
import { NumberComponent } from './number.component';
import { RadiosComponent } from './radios.component';
import { RootComponent } from './root.component';
import { SectionComponent } from './section.component';
import { SelectComponent } from './select.component';
import { SelectFrameworkComponent } from './select-framework.component';
import { SelectWidgetComponent } from './select-widget.component';
import { SubmitComponent } from './submit.component';
import { TabsComponent } from './tabs.component';
import { TemplateComponent } from './template.component';
import { TextareaComponent } from './textarea.component';
export class WidgetLibraryService {
    constructor() {
        this.defaultWidget = 'text';
        this.widgetLibrary = {
            // Angular JSON Schema Form administrative widgets
            'none': NoneComponent,
            // Placeholder, for development - displays nothing
            'root': RootComponent,
            // Form root, renders a complete layout
            'select-framework': SelectFrameworkComponent,
            // Applies the selected framework to a specified widget
            'select-widget': SelectWidgetComponent,
            // Displays a specified widget
            '$ref': AddReferenceComponent,
            // Button to add a new array item or $ref element
            // Free-form text HTML 'input' form control widgets <input type="...">
            'email': 'text',
            'integer': 'number',
            // Note: 'integer' is not a recognized HTML input type
            'number': NumberComponent,
            'password': 'text',
            'search': 'text',
            'tel': 'text',
            'text': InputComponent,
            'url': 'text',
            // Controlled text HTML 'input' form control widgets <input type="...">
            'color': 'text',
            'date': 'text',
            'datetime': 'text',
            'datetime-local': 'text',
            'month': 'text',
            'range': 'number',
            'time': 'text',
            'week': 'text',
            // Non-text HTML 'input' form control widgets <input type="...">
            // 'button': <input type="button"> not used, use <button> instead
            'checkbox': CheckboxComponent,
            // TODO: Set ternary = true for 3-state ??
            'file': FileComponent,
            // TODO: Finish 'file' widget
            'hidden': 'text',
            'image': 'text',
            // TODO: Figure out how to handle these
            'radio': 'radios',
            'reset': 'submit',
            // TODO: Figure out how to handle these
            'submit': SubmitComponent,
            // Other (non-'input') HTML form control widgets
            'button': ButtonComponent,
            'select': SelectComponent,
            // 'option': automatically generated by select widgets
            // 'optgroup': automatically generated by select widgets
            'textarea': TextareaComponent,
            // HTML form control widget sets
            'checkboxes': CheckboxesComponent,
            // Grouped list of checkboxes
            'checkboxes-inline': 'checkboxes',
            // Checkboxes in one line
            'checkboxbuttons': 'checkboxes',
            // Checkboxes as html buttons
            'radios': RadiosComponent,
            // Grouped list of radio buttons
            'radios-inline': 'radios',
            // Radio controls in one line
            'radiobuttons': 'radios',
            // Radio controls as html buttons
            // HTML Layout widgets
            // 'label': automatically added to data widgets
            // 'legend': automatically added to fieldsets
            'section': SectionComponent,
            // Just a div <div>
            'div': 'section',
            // Still just a div <div>
            'fieldset': 'section',
            // A fieldset, with an optional legend <fieldset>
            'flex': 'section',
            // A flexbox container <div style="display: flex">
            // Non-HTML layout widgets
            'one-of': OneOfComponent,
            // A select box that changes another input
            // TODO: Finish 'one-of' widget
            'array': 'section',
            // A list you can add, remove and reorder <fieldset>
            'tabarray': 'tabs',
            // A tabbed version of array
            'tab': 'section',
            // A tab group, similar to a fieldset or section <fieldset>
            'tabs': TabsComponent,
            // A tabbed set of panels with different controls
            'message': MessageComponent,
            // Insert arbitrary html
            'help': 'message',
            // Insert arbitrary html
            'msg': 'message',
            // Insert arbitrary html
            'html': 'message',
            // Insert arbitrary html
            'template': TemplateComponent,
            // Insert a custom Angular component
            // Widgets included for compatibility with JSON Form API
            'advancedfieldset': 'section',
            // Adds 'Advanced settings' title <fieldset>
            'authfieldset': 'section',
            // Adds 'Authentication settings' title <fieldset>
            'optionfieldset': 'one-of',
            // Option control, displays selected sub-item <fieldset>
            'selectfieldset': 'one-of',
            // Select control, displays selected sub-item <fieldset>
            'conditional': 'section',
            // Identical to 'section' (depeciated) <div>
            'actions': 'section',
            // Horizontal button list, can only submit, uses buttons as items <div>
            'tagsinput': 'section',
            // For entering short text tags <div>
            // See: http://ulion.github.io/jsonform/playground/?example=fields-checkboxbuttons
            // Widgets included for compatibility with React JSON Schema Form API
            'updown': 'number',
            'date-time': 'datetime-local',
            'alt-datetime': 'datetime-local',
            'alt-date': 'date',
            // Widgets included for compatibility with Angular Schema Form API
            'wizard': 'section',
            // TODO: Sequential panels with "Next" and "Previous" buttons
            // Widgets included for compatibility with other libraries
            'textline': 'text',
        };
        this.registeredWidgets = {};
        this.frameworkWidgets = {};
        this.activeWidgets = {};
        this.setActiveWidgets();
    }
    /**
     * @return {?}
     */
    setActiveWidgets() {
        this.activeWidgets = Object.assign({}, this.widgetLibrary, this.frameworkWidgets, this.registeredWidgets);
        for (let widgetName of Object.keys(this.activeWidgets)) {
            /** @type {?} */
            let widget = this.activeWidgets[widgetName];
            // Resolve aliases
            if (typeof widget === 'string') {
                /** @type {?} */
                let usedAliases = [];
                while (typeof widget === 'string' && !usedAliases.includes(widget)) {
                    usedAliases.push(widget);
                    widget = this.activeWidgets[widget];
                }
                if (typeof widget !== 'string') {
                    this.activeWidgets[widgetName] = widget;
                }
            }
        }
        return true;
    }
    /**
     * @param {?} type
     * @return {?}
     */
    setDefaultWidget(type) {
        if (!this.hasWidget(type)) {
            return false;
        }
        this.defaultWidget = type;
        return true;
    }
    /**
     * @param {?} type
     * @param {?=} widgetSet
     * @return {?}
     */
    hasWidget(type, widgetSet = 'activeWidgets') {
        if (!type || typeof type !== 'string') {
            return false;
        }
        return hasOwn(this[widgetSet], type);
    }
    /**
     * @param {?} type
     * @return {?}
     */
    hasDefaultWidget(type) {
        return this.hasWidget(type, 'widgetLibrary');
    }
    /**
     * @param {?} type
     * @param {?} widget
     * @return {?}
     */
    registerWidget(type, widget) {
        if (!type || !widget || typeof type !== 'string') {
            return false;
        }
        this.registeredWidgets[type] = widget;
        return this.setActiveWidgets();
    }
    /**
     * @param {?} type
     * @return {?}
     */
    unRegisterWidget(type) {
        if (!hasOwn(this.registeredWidgets, type)) {
            return false;
        }
        delete this.registeredWidgets[type];
        return this.setActiveWidgets();
    }
    /**
     * @param {?=} unRegisterFrameworkWidgets
     * @return {?}
     */
    unRegisterAllWidgets(unRegisterFrameworkWidgets = true) {
        this.registeredWidgets = {};
        if (unRegisterFrameworkWidgets) {
            this.frameworkWidgets = {};
        }
        return this.setActiveWidgets();
    }
    /**
     * @param {?} widgets
     * @return {?}
     */
    registerFrameworkWidgets(widgets) {
        if (widgets === null || typeof widgets !== 'object') {
            widgets = {};
        }
        this.frameworkWidgets = widgets;
        return this.setActiveWidgets();
    }
    /**
     * @return {?}
     */
    unRegisterFrameworkWidgets() {
        if (Object.keys(this.frameworkWidgets).length) {
            this.frameworkWidgets = {};
            return this.setActiveWidgets();
        }
        return false;
    }
    /**
     * @param {?=} type
     * @param {?=} widgetSet
     * @return {?}
     */
    getWidget(type, widgetSet = 'activeWidgets') {
        if (this.hasWidget(type, widgetSet)) {
            return this[widgetSet][type];
        }
        else if (this.hasWidget(this.defaultWidget, widgetSet)) {
            return this[widgetSet][this.defaultWidget];
        }
        else {
            return null;
        }
    }
    /**
     * @return {?}
     */
    getAllWidgets() {
        return {
            widgetLibrary: this.widgetLibrary,
            registeredWidgets: this.registeredWidgets,
            frameworkWidgets: this.frameworkWidgets,
            activeWidgets: this.activeWidgets,
        };
    }
}
WidgetLibraryService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
WidgetLibraryService.ctorParameters = () => [];
if (false) {
    /** @type {?} */
    WidgetLibraryService.prototype.defaultWidget;
    /** @type {?} */
    WidgetLibraryService.prototype.widgetLibrary;
    /** @type {?} */
    WidgetLibraryService.prototype.registeredWidgets;
    /** @type {?} */
    WidgetLibraryService.prototype.frameworkWidgets;
    /** @type {?} */
    WidgetLibraryService.prototype.activeWidgets;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lkZ2V0LWxpYnJhcnkuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nNi1qc29uLXNjaGVtYS1mb3JtLyIsInNvdXJjZXMiOlsibGliL3dpZGdldC1saWJyYXJ5L3dpZGdldC1saWJyYXJ5LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBRXJELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNwRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDckQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDekQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDN0QsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBRWpELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDakQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDakQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdkQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3JELE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxN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QUFDLENBQUM7WUFDTixNQUFNLENBQUMsSUFBSSxDQUFDO1NBQ2I7S0FDRjs7OztJQUVELGFBQWE7UUFDWCxNQUFNLENBQUM7WUFDTCxhQUFhLEVBQUUsSUFBSSxDQUFDLGFBQWE7WUFDakMsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLGlCQUFpQjtZQUN6QyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsZ0JBQWdCO1lBQ3ZDLGFBQWEsRUFBRSxJQUFJLENBQUMsYUFBYTtTQUNsQyxDQUFDO0tBQ0g7OztZQS9NRixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBoYXNPd24gfSBmcm9tICcuLi9zaGFyZWQvdXRpbGl0eS5mdW5jdGlvbnMnO1xuXG5pbXBvcnQgeyBBZGRSZWZlcmVuY2VDb21wb25lbnQgfSBmcm9tICcuL2FkZC1yZWZlcmVuY2UuY29tcG9uZW50JztcbmltcG9ydCB7IE9uZU9mQ29tcG9uZW50IH0gZnJvbSAnLi9vbmUtb2YuY29tcG9uZW50JztcbmltcG9ydCB7IEJ1dHRvbkNvbXBvbmVudCB9IGZyb20gJy4vYnV0dG9uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDaGVja2JveENvbXBvbmVudCB9IGZyb20gJy4vY2hlY2tib3guY29tcG9uZW50JztcbmltcG9ydCB7IENoZWNrYm94ZXNDb21wb25lbnQgfSBmcm9tICcuL2NoZWNrYm94ZXMuY29tcG9uZW50JztcbmltcG9ydCB7IEZpbGVDb21wb25lbnQgfSBmcm9tICcuL2ZpbGUuY29tcG9uZW50JztcbmltcG9ydCB7IEhpZGRlbkNvbXBvbmVudCB9IGZyb20gJy4vaGlkZGVuLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBJbnB1dENvbXBvbmVudCB9IGZyb20gJy4vaW5wdXQuY29tcG9uZW50JztcbmltcG9ydCB7IE1lc3NhZ2VDb21wb25lbnQgfSBmcm9tICcuL21lc3NhZ2UuY29tcG9uZW50JztcbmltcG9ydCB7IE5vbmVDb21wb25lbnQgfSBmcm9tICcuL25vbmUuY29tcG9uZW50JztcbmltcG9ydCB7IE51bWJlckNvbXBvbmVudCB9IGZyb20gJy4vbnVtYmVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBSYWRpb3NDb21wb25lbnQgfSBmcm9tICcuL3JhZGlvcy5jb21wb25lbnQnO1xuaW1wb3J0IHsgUm9vdENvbXBvbmVudCB9IGZyb20gJy4vcm9vdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2VjdGlvbkNvbXBvbmVudCB9IGZyb20gJy4vc2VjdGlvbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2VsZWN0Q29tcG9uZW50IH0gZnJvbSAnLi9zZWxlY3QuY29tcG9uZW50JztcbmltcG9ydCB7IFNlbGVjdEZyYW1ld29ya0NvbXBvbmVudCB9IGZyb20gJy4vc2VsZWN0LWZyYW1ld29yay5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2VsZWN0V2lkZ2V0Q29tcG9uZW50IH0gZnJvbSAnLi9zZWxlY3Qtd2lkZ2V0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTdWJtaXRDb21wb25lbnQgfSBmcm9tICcuL3N1Ym1pdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgVGFiQ29tcG9uZW50IH0gZnJvbSAnLi90YWIuY29tcG9uZW50JztcbmltcG9ydCB7IFRhYnNDb21wb25lbnQgfSBmcm9tICcuL3RhYnMuY29tcG9uZW50JztcbmltcG9ydCB7IFRlbXBsYXRlQ29tcG9uZW50IH0gZnJvbSAnLi90ZW1wbGF0ZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgVGV4dGFyZWFDb21wb25lbnQgfSBmcm9tICcuL3RleHRhcmVhLmNvbXBvbmVudCc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBXaWRnZXRMaWJyYXJ5U2VydmljZSB7XG5cbiAgZGVmYXVsdFdpZGdldCA9ICd0ZXh0JztcbiAgd2lkZ2V0TGlicmFyeTogYW55ID0ge1xuXG4gIC8vIEFuZ3VsYXIgSlNPTiBTY2hlbWEgRm9ybSBhZG1pbmlzdHJhdGl2ZSB3aWRnZXRzXG4gICAgJ25vbmUnOiBOb25lQ29tcG9uZW50LCAvLyBQbGFjZWhvbGRlciwgZm9yIGRldmVsb3BtZW50IC0gZGlzcGxheXMgbm90aGluZ1xuICAgICdyb290JzogUm9vdENvbXBvbmVudCwgLy8gRm9ybSByb290LCByZW5kZXJzIGEgY29tcGxldGUgbGF5b3V0XG4gICAgJ3NlbGVjdC1mcmFtZXdvcmsnOiBTZWxlY3RGcmFtZXdvcmtDb21wb25lbnQsIC8vIEFwcGxpZXMgdGhlIHNlbGVjdGVkIGZyYW1ld29yayB0byBhIHNwZWNpZmllZCB3aWRnZXRcbiAgICAnc2VsZWN0LXdpZGdldCc6IFNlbGVjdFdpZGdldENvbXBvbmVudCwgLy8gRGlzcGxheXMgYSBzcGVjaWZpZWQgd2lkZ2V0XG4gICAgJyRyZWYnOiBBZGRSZWZlcmVuY2VDb21wb25lbnQsIC8vIEJ1dHRvbiB0byBhZGQgYSBuZXcgYXJyYXkgaXRlbSBvciAkcmVmIGVsZW1lbnRcblxuICAvLyBGcmVlLWZvcm0gdGV4dCBIVE1MICdpbnB1dCcgZm9ybSBjb250cm9sIHdpZGdldHMgPGlucHV0IHR5cGU9XCIuLi5cIj5cbiAgICAnZW1haWwnOiAndGV4dCcsXG4gICAgJ2ludGVnZXInOiAnbnVtYmVyJywgLy8gTm90ZTogJ2ludGVnZXInIGlzIG5vdCBhIHJlY29nbml6ZWQgSFRNTCBpbnB1dCB0eXBlXG4gICAgJ251bWJlcic6IE51bWJlckNvbXBvbmVudCxcbiAgICAncGFzc3dvcmQnOiAndGV4dCcsXG4gICAgJ3NlYXJjaCc6ICd0ZXh0JyxcbiAgICAndGVsJzogJ3RleHQnLFxuICAgICd0ZXh0JzogSW5wdXRDb21wb25lbnQsXG4gICAgJ3VybCc6ICd0ZXh0JyxcblxuICAvLyBDb250cm9sbGVkIHRleHQgSFRNTCAnaW5wdXQnIGZvcm0gY29udHJvbCB3aWRnZXRzIDxpbnB1dCB0eXBlPVwiLi4uXCI+XG4gICAgJ2NvbG9yJzogJ3RleHQnLFxuICAgICdkYXRlJzogJ3RleHQnLFxuICAgICdkYXRldGltZSc6ICd0ZXh0JyxcbiAgICAnZGF0ZXRpbWUtbG9jYWwnOiAndGV4dCcsXG4gICAgJ21vbnRoJzogJ3RleHQnLFxuICAgICdyYW5nZSc6ICdudW1iZXInLFxuICAgICd0aW1lJzogJ3RleHQnLFxuICAgICd3ZWVrJzogJ3RleHQnLFxuXG4gIC8vIE5vbi10ZXh0IEhUTUwgJ2lucHV0JyBmb3JtIGNvbnRyb2wgd2lkZ2V0cyA8aW5wdXQgdHlwZT1cIi4uLlwiPlxuICAgIC8vICdidXR0b24nOiA8aW5wdXQgdHlwZT1cImJ1dHRvblwiPiBub3QgdXNlZCwgdXNlIDxidXR0b24+IGluc3RlYWRcbiAgICAnY2hlY2tib3gnOiBDaGVja2JveENvbXBvbmVudCwgLy8gVE9ETzogU2V0IHRlcm5hcnkgPSB0cnVlIGZvciAzLXN0YXRlID8/XG4gICAgJ2ZpbGUnOiBGaWxlQ29tcG9uZW50LCAvLyBUT0RPOiBGaW5pc2ggJ2ZpbGUnIHdpZGdldFxuICAgICdoaWRkZW4nOiAndGV4dCcsXG4gICAgJ2ltYWdlJzogJ3RleHQnLCAvLyBUT0RPOiBGaWd1cmUgb3V0IGhvdyB0byBoYW5kbGUgdGhlc2VcbiAgICAncmFkaW8nOiAncmFkaW9zJyxcbiAgICAncmVzZXQnOiAnc3VibWl0JywgLy8gVE9ETzogRmlndXJlIG91dCBob3cgdG8gaGFuZGxlIHRoZXNlXG4gICAgJ3N1Ym1pdCc6IFN1Ym1pdENvbXBvbmVudCxcblxuICAvLyBPdGhlciAobm9uLSdpbnB1dCcpIEhUTUwgZm9ybSBjb250cm9sIHdpZGdldHNcbiAgICAnYnV0dG9uJzogQnV0dG9uQ29tcG9uZW50LFxuICAgICdzZWxlY3QnOiBTZWxlY3RDb21wb25lbnQsXG4gICAgLy8gJ29wdGlvbic6IGF1dG9tYXRpY2FsbHkgZ2VuZXJhdGVkIGJ5IHNlbGVjdCB3aWRnZXRzXG4gICAgLy8gJ29wdGdyb3VwJzogYXV0b21hdGljYWxseSBnZW5lcmF0ZWQgYnkgc2VsZWN0IHdpZGdldHNcbiAgICAndGV4dGFyZWEnOiBUZXh0YXJlYUNvbXBvbmVudCxcblxuICAvLyBIVE1MIGZvcm0gY29udHJvbCB3aWRnZXQgc2V0c1xuICAgICdjaGVja2JveGVzJzogQ2hlY2tib3hlc0NvbXBvbmVudCwgLy8gR3JvdXBlZCBsaXN0IG9mIGNoZWNrYm94ZXNcbiAgICAnY2hlY2tib3hlcy1pbmxpbmUnOiAnY2hlY2tib3hlcycsIC8vIENoZWNrYm94ZXMgaW4gb25lIGxpbmVcbiAgICAnY2hlY2tib3hidXR0b25zJzogJ2NoZWNrYm94ZXMnLCAvLyBDaGVja2JveGVzIGFzIGh0bWwgYnV0dG9uc1xuICAgICdyYWRpb3MnOiBSYWRpb3NDb21wb25lbnQsIC8vIEdyb3VwZWQgbGlzdCBvZiByYWRpbyBidXR0b25zXG4gICAgJ3JhZGlvcy1pbmxpbmUnOiAncmFkaW9zJywgLy8gUmFkaW8gY29udHJvbHMgaW4gb25lIGxpbmVcbiAgICAncmFkaW9idXR0b25zJzogJ3JhZGlvcycsIC8vIFJhZGlvIGNvbnRyb2xzIGFzIGh0bWwgYnV0dG9uc1xuXG4gIC8vIEhUTUwgTGF5b3V0IHdpZGdldHNcbiAgICAvLyAnbGFiZWwnOiBhdXRvbWF0aWNhbGx5IGFkZGVkIHRvIGRhdGEgd2lkZ2V0c1xuICAgIC8vICdsZWdlbmQnOiBhdXRvbWF0aWNhbGx5IGFkZGVkIHRvIGZpZWxkc2V0c1xuICAgICdzZWN0aW9uJzogU2VjdGlvbkNvbXBvbmVudCwgLy8gSnVzdCBhIGRpdiA8ZGl2PlxuICAgICdkaXYnOiAnc2VjdGlvbicsIC8vIFN0aWxsIGp1c3QgYSBkaXYgPGRpdj5cbiAgICAnZmllbGRzZXQnOiAnc2VjdGlvbicsIC8vIEEgZmllbGRzZXQsIHdpdGggYW4gb3B0aW9uYWwgbGVnZW5kIDxmaWVsZHNldD5cbiAgICAnZmxleCc6ICdzZWN0aW9uJywgLy8gQSBmbGV4Ym94IGNvbnRhaW5lciA8ZGl2IHN0eWxlPVwiZGlzcGxheTogZmxleFwiPlxuXG4gIC8vIE5vbi1IVE1MIGxheW91dCB3aWRnZXRzXG4gICAgJ29uZS1vZic6IE9uZU9mQ29tcG9uZW50LCAvLyBBIHNlbGVjdCBib3ggdGhhdCBjaGFuZ2VzIGFub3RoZXIgaW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IEZpbmlzaCAnb25lLW9mJyB3aWRnZXRcbiAgICAnYXJyYXknOiAnc2VjdGlvbicsIC8vIEEgbGlzdCB5b3UgY2FuIGFkZCwgcmVtb3ZlIGFuZCByZW9yZGVyIDxmaWVsZHNldD5cbiAgICAndGFiYXJyYXknOiAndGFicycsIC8vIEEgdGFiYmVkIHZlcnNpb24gb2YgYXJyYXlcbiAgICAndGFiJzogJ3NlY3Rpb24nLCAvLyBBIHRhYiBncm91cCwgc2ltaWxhciB0byBhIGZpZWxkc2V0IG9yIHNlY3Rpb24gPGZpZWxkc2V0PlxuICAgICd0YWJzJzogVGFic0NvbXBvbmVudCwgLy8gQSB0YWJiZWQgc2V0IG9mIHBhbmVscyB3aXRoIGRpZmZlcmVudCBjb250cm9sc1xuICAgICdtZXNzYWdlJzogTWVzc2FnZUNvbXBvbmVudCwgLy8gSW5zZXJ0IGFyYml0cmFyeSBodG1sXG4gICAgJ2hlbHAnOiAnbWVzc2FnZScsIC8vIEluc2VydCBhcmJpdHJhcnkgaHRtbFxuICAgICdtc2cnOiAnbWVzc2FnZScsIC8vIEluc2VydCBhcmJpdHJhcnkgaHRtbFxuICAgICdodG1sJzogJ21lc3NhZ2UnLCAvLyBJbnNlcnQgYXJiaXRyYXJ5IGh0bWxcbiAgICAndGVtcGxhdGUnOiBUZW1wbGF0ZUNvbXBvbmVudCwgLy8gSW5zZXJ0IGEgY3VzdG9tIEFuZ3VsYXIgY29tcG9uZW50XG5cbiAgLy8gV2lkZ2V0cyBpbmNsdWRlZCBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIEpTT04gRm9ybSBBUElcbiAgICAnYWR2YW5jZWRmaWVsZHNldCc6ICdzZWN0aW9uJywgLy8gQWRkcyAnQWR2YW5jZWQgc2V0dGluZ3MnIHRpdGxlIDxmaWVsZHNldD5cbiAgICAnYXV0aGZpZWxkc2V0JzogJ3NlY3Rpb24nLCAvLyBBZGRzICdBdXRoZW50aWNhdGlvbiBzZXR0aW5ncycgdGl0bGUgPGZpZWxkc2V0PlxuICAgICdvcHRpb25maWVsZHNldCc6ICdvbmUtb2YnLCAvLyBPcHRpb24gY29udHJvbCwgZGlzcGxheXMgc2VsZWN0ZWQgc3ViLWl0ZW0gPGZpZWxkc2V0PlxuICAgICdzZWxlY3RmaWVsZHNldCc6ICdvbmUtb2YnLCAvLyBTZWxlY3QgY29udHJvbCwgZGlzcGxheXMgc2VsZWN0ZWQgc3ViLWl0ZW0gPGZpZWxkc2V0PlxuICAgICdjb25kaXRpb25hbCc6ICdzZWN0aW9uJywgLy8gSWRlbnRpY2FsIHRvICdzZWN0aW9uJyAoZGVwZWNpYXRlZCkgPGRpdj5cbiAgICAnYWN0aW9ucyc6ICdzZWN0aW9uJywgLy8gSG9yaXpvbnRhbCBidXR0b24gbGlzdCwgY2FuIG9ubHkgc3VibWl0LCB1c2VzIGJ1dHRvbnMgYXMgaXRlbXMgPGRpdj5cbiAgICAndGFnc2lucHV0JzogJ3NlY3Rpb24nLCAvLyBGb3IgZW50ZXJpbmcgc2hvcnQgdGV4dCB0YWdzIDxkaXY+XG4gICAgLy8gU2VlOiBodHRwOi8vdWxpb24uZ2l0aHViLmlvL2pzb25mb3JtL3BsYXlncm91bmQvP2V4YW1wbGU9ZmllbGRzLWNoZWNrYm94YnV0dG9uc1xuXG4gIC8vIFdpZGdldHMgaW5jbHVkZWQgZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBSZWFjdCBKU09OIFNjaGVtYSBGb3JtIEFQSVxuICAgICd1cGRvd24nOiAnbnVtYmVyJyxcbiAgICAnZGF0ZS10aW1lJzogJ2RhdGV0aW1lLWxvY2FsJyxcbiAgICAnYWx0LWRhdGV0aW1lJzogJ2RhdGV0aW1lLWxvY2FsJyxcbiAgICAnYWx0LWRhdGUnOiAnZGF0ZScsXG5cbiAgLy8gV2lkZ2V0cyBpbmNsdWRlZCBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIEFuZ3VsYXIgU2NoZW1hIEZvcm0gQVBJXG4gICAgJ3dpemFyZCc6ICdzZWN0aW9uJywgLy8gVE9ETzogU2VxdWVudGlhbCBwYW5lbHMgd2l0aCBcIk5leHRcIiBhbmQgXCJQcmV2aW91c1wiIGJ1dHRvbnNcblxuICAvLyBXaWRnZXRzIGluY2x1ZGVkIGZvciBjb21wYXRpYmlsaXR5IHdpdGggb3RoZXIgbGlicmFyaWVzXG4gICAgJ3RleHRsaW5lJzogJ3RleHQnLFxuXG4gIC8vIFJlY29tbWVuZGVkIDNyZC1wYXJ0eSBhZGQtb24gd2lkZ2V0cyAoVE9ETzogY3JlYXRlIHdyYXBwZXJzIGZvciB0aGVzZS4uLilcbiAgICAvLyAnbmcyLXNlbGVjdCc6IFNlbGVjdCBjb250cm9sIHJlcGxhY2VtZW50IC0gaHR0cDovL3ZhbG9yLXNvZnR3YXJlLmNvbS9uZzItc2VsZWN0L1xuICAgIC8vICdmbGF0cGlja3InOiBGbGF0cGlja3IgZGF0ZSBwaWNrZXIgLSBodHRwczovL2dpdGh1Yi5jb20vY2htbG4vZmxhdHBpY2tyXG4gICAgLy8gJ3Bpa2FkYXknOiBQaWthZGF5IGRhdGUgcGlja2VyIC0gaHR0cHM6Ly9naXRodWIuY29tL2RidXNoZWxsL1Bpa2FkYXlcbiAgICAvLyAnc3BlY3RydW0nOiBTcGVjdHJ1bSBjb2xvciBwaWNrZXIgLSBodHRwOi8vYmdyaW5zLmdpdGh1Yi5pby9zcGVjdHJ1bVxuICAgIC8vICdib290c3RyYXAtc2xpZGVyJzogQm9vdHN0cmFwIFNsaWRlciByYW5nZSBjb250cm9sIC0gaHR0cHM6Ly9naXRodWIuY29tL3NlaXlyaWEvYm9vdHN0cmFwLXNsaWRlclxuICAgIC8vICdhY2UnOiBBQ0UgY29kZSBlZGl0b3IgLSBodHRwczovL2FjZS5jOS5pb1xuICAgIC8vICdja2VkaXRvcic6IENLRWRpdG9yIEhUTUwgLyByaWNoIHRleHQgZWRpdG9yIC0gaHR0cDovL2NrZWRpdG9yLmNvbVxuICAgIC8vICd0aW55bWNlJzogVGlueU1DRSBIVE1MIC8gcmljaCB0ZXh0IGVkaXRvciAtIGh0dHBzOi8vd3d3LnRpbnltY2UuY29tXG4gICAgLy8gJ2ltYWdlc2VsZWN0JzogQm9vdHN0cmFwIGRyb3AtZG93biBpbWFnZSBzZWxlY3RvciAtIGh0dHA6Ly9zaWx2aW9tb3JldG8uZ2l0aHViLmlvL2Jvb3RzdHJhcC1zZWxlY3RcbiAgICAvLyAnd3lzaWh0bWw1JzogSFRNTCBlZGl0b3IgLSBodHRwOi8vamhvbGxpbmd3b3J0aC5naXRodWIuaW8vYm9vdHN0cmFwLXd5c2lodG1sNVxuICAgIC8vICdxdWlsbCc6IFF1aWxsIEhUTUwgLyByaWNoIHRleHQgZWRpdG9yICg/KSAtIGh0dHBzOi8vcXVpbGxqcy5jb21cbiAgfTtcbiAgcmVnaXN0ZXJlZFdpZGdldHM6IGFueSA9IHsgfTtcbiAgZnJhbWV3b3JrV2lkZ2V0czogYW55ID0geyB9O1xuICBhY3RpdmVXaWRnZXRzOiBhbnkgPSB7IH07XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5zZXRBY3RpdmVXaWRnZXRzKCk7XG4gIH1cblxuICBzZXRBY3RpdmVXaWRnZXRzKCk6IGJvb2xlYW4ge1xuICAgIHRoaXMuYWN0aXZlV2lkZ2V0cyA9IE9iamVjdC5hc3NpZ24oXG4gICAgICB7IH0sIHRoaXMud2lkZ2V0TGlicmFyeSwgdGhpcy5mcmFtZXdvcmtXaWRnZXRzLCB0aGlzLnJlZ2lzdGVyZWRXaWRnZXRzXG4gICAgKTtcbiAgICBmb3IgKGxldCB3aWRnZXROYW1lIG9mIE9iamVjdC5rZXlzKHRoaXMuYWN0aXZlV2lkZ2V0cykpIHtcbiAgICAgIGxldCB3aWRnZXQ6IGFueSA9IHRoaXMuYWN0aXZlV2lkZ2V0c1t3aWRnZXROYW1lXTtcbiAgICAgIC8vIFJlc29sdmUgYWxpYXNlc1xuICAgICAgaWYgKHR5cGVvZiB3aWRnZXQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGxldCB1c2VkQWxpYXNlczogc3RyaW5nW10gPSBbXTtcbiAgICAgICAgd2hpbGUgKHR5cGVvZiB3aWRnZXQgPT09ICdzdHJpbmcnICYmICF1c2VkQWxpYXNlcy5pbmNsdWRlcyh3aWRnZXQpKSB7XG4gICAgICAgICAgdXNlZEFsaWFzZXMucHVzaCh3aWRnZXQpO1xuICAgICAgICAgIHdpZGdldCA9IHRoaXMuYWN0aXZlV2lkZ2V0c1t3aWRnZXRdO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2Ygd2lkZ2V0ICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgIHRoaXMuYWN0aXZlV2lkZ2V0c1t3aWRnZXROYW1lXSA9IHdpZGdldDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHNldERlZmF1bHRXaWRnZXQodHlwZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgaWYgKCF0aGlzLmhhc1dpZGdldCh0eXBlKSkgeyByZXR1cm4gZmFsc2U7IH1cbiAgICB0aGlzLmRlZmF1bHRXaWRnZXQgPSB0eXBlO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgaGFzV2lkZ2V0KHR5cGU6IHN0cmluZywgd2lkZ2V0U2V0ID0gJ2FjdGl2ZVdpZGdldHMnKTogYm9vbGVhbiB7XG4gICAgaWYgKCF0eXBlIHx8IHR5cGVvZiB0eXBlICE9PSAnc3RyaW5nJykgeyByZXR1cm4gZmFsc2U7IH1cbiAgICByZXR1cm4gaGFzT3duKHRoaXNbd2lkZ2V0U2V0XSwgdHlwZSk7XG4gIH1cblxuICBoYXNEZWZhdWx0V2lkZ2V0KHR5cGU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmhhc1dpZGdldCh0eXBlLCAnd2lkZ2V0TGlicmFyeScpO1xuICB9XG5cbiAgcmVnaXN0ZXJXaWRnZXQodHlwZTogc3RyaW5nLCB3aWRnZXQ6IGFueSk6IGJvb2xlYW4ge1xuICAgIGlmICghdHlwZSB8fCAhd2lkZ2V0IHx8IHR5cGVvZiB0eXBlICE9PSAnc3RyaW5nJykgeyByZXR1cm4gZmFsc2U7IH1cbiAgICB0aGlzLnJlZ2lzdGVyZWRXaWRnZXRzW3R5cGVdID0gd2lkZ2V0O1xuICAgIHJldHVybiB0aGlzLnNldEFjdGl2ZVdpZGdldHMoKTtcbiAgfVxuXG4gIHVuUmVnaXN0ZXJXaWRnZXQodHlwZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgaWYgKCFoYXNPd24odGhpcy5yZWdpc3RlcmVkV2lkZ2V0cywgdHlwZSkpIHsgcmV0dXJuIGZhbHNlOyB9XG4gICAgZGVsZXRlIHRoaXMucmVnaXN0ZXJlZFdpZGdldHNbdHlwZV07XG4gICAgcmV0dXJuIHRoaXMuc2V0QWN0aXZlV2lkZ2V0cygpO1xuICB9XG5cbiAgdW5SZWdpc3RlckFsbFdpZGdldHModW5SZWdpc3RlckZyYW1ld29ya1dpZGdldHMgPSB0cnVlKTogYm9vbGVhbiB7XG4gICAgdGhpcy5yZWdpc3RlcmVkV2lkZ2V0cyA9IHsgfTtcbiAgICBpZiAodW5SZWdpc3RlckZyYW1ld29ya1dpZGdldHMpIHsgdGhpcy5mcmFtZXdvcmtXaWRnZXRzID0geyB9OyB9XG4gICAgcmV0dXJuIHRoaXMuc2V0QWN0aXZlV2lkZ2V0cygpO1xuICB9XG5cbiAgcmVnaXN0ZXJGcmFtZXdvcmtXaWRnZXRzKHdpZGdldHM6IGFueSk6IGJvb2xlYW4ge1xuICAgIGlmICh3aWRnZXRzID09PSBudWxsIHx8IHR5cGVvZiB3aWRnZXRzICE9PSAnb2JqZWN0JykgeyB3aWRnZXRzID0geyB9OyB9XG4gICAgdGhpcy5mcmFtZXdvcmtXaWRnZXRzID0gd2lkZ2V0cztcbiAgICByZXR1cm4gdGhpcy5zZXRBY3RpdmVXaWRnZXRzKCk7XG4gIH1cblxuICB1blJlZ2lzdGVyRnJhbWV3b3JrV2lkZ2V0cygpOiBib29sZWFuIHtcbiAgICBpZiAoT2JqZWN0LmtleXModGhpcy5mcmFtZXdvcmtXaWRnZXRzKS5sZW5ndGgpIHtcbiAgICAgIHRoaXMuZnJhbWV3b3JrV2lkZ2V0cyA9IHsgfTtcbiAgICAgIHJldHVybiB0aGlzLnNldEFjdGl2ZVdpZGdldHMoKTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgZ2V0V2lkZ2V0KHR5cGU/OiBzdHJpbmcsIHdpZGdldFNldCA9ICdhY3RpdmVXaWRnZXRzJyk6IGFueSB7XG4gICAgaWYgKHRoaXMuaGFzV2lkZ2V0KHR5cGUsIHdpZGdldFNldCkpIHtcbiAgICAgIHJldHVybiB0aGlzW3dpZGdldFNldF1bdHlwZV07XG4gICAgfSBlbHNlIGlmICh0aGlzLmhhc1dpZGdldCh0aGlzLmRlZmF1bHRXaWRnZXQsIHdpZGdldFNldCkpIHtcbiAgICAgIHJldHVybiB0aGlzW3dpZGdldFNldF1bdGhpcy5kZWZhdWx0V2lkZ2V0XTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG5cbiAgZ2V0QWxsV2lkZ2V0cygpOiBhbnkge1xuICAgIHJldHVybiB7XG4gICAgICB3aWRnZXRMaWJyYXJ5OiB0aGlzLndpZGdldExpYnJhcnksXG4gICAgICByZWdpc3RlcmVkV2lkZ2V0czogdGhpcy5yZWdpc3RlcmVkV2lkZ2V0cyxcbiAgICAgIGZyYW1ld29ya1dpZGdldHM6IHRoaXMuZnJhbWV3b3JrV2lkZ2V0cyxcbiAgICAgIGFjdGl2ZVdpZGdldHM6IHRoaXMuYWN0aXZlV2lkZ2V0cyxcbiAgICB9O1xuICB9XG59XG4iXX0=