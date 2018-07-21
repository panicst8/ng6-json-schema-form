/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
export const enValidationMessages = {
    // Default English error messages
    required: 'This field is required.',
    minLength: 'Must be {{minimumLength}} characters or longer (current length: {{currentLength}})',
    maxLength: 'Must be {{maximumLength}} characters or shorter (current length: {{currentLength}})',
    pattern: 'Must match pattern: {{requiredPattern}}',
    format: function (error) {
        switch (error.requiredFormat) {
            case 'date':
                return 'Must be a date, like "2000-12-31"';
            case 'time':
                return 'Must be a time, like "16:20" or "03:14:15.9265"';
            case 'date-time':
                return 'Must be a date-time, like "2000-03-14T01:59" or "2000-03-14T01:59:26.535Z"';
            case 'email':
                return 'Must be an email address, like "name@example.com"';
            case 'hostname':
                return 'Must be a hostname, like "example.com"';
            case 'ipv4':
                return 'Must be an IPv4 address, like "127.0.0.1"';
            case 'ipv6':
                return 'Must be an IPv6 address, like "1234:5678:9ABC:DEF0:1234:5678:9ABC:DEF0"';
            // TODO: add examples for 'uri', 'uri-reference', and 'uri-template'
            // case 'uri': case 'uri-reference': case 'uri-template':
            case 'url':
                return 'Must be a url, like "http://www.example.com/page.html"';
            case 'uuid':
                return 'Must be a uuid, like "12345678-9ABC-DEF0-1234-56789ABCDEF0"';
            case 'color':
                return 'Must be a color, like "#FFFFFF" or "rgb(255, 255, 255)"';
            case 'json-pointer':
                return 'Must be a JSON Pointer, like "/pointer/to/something"';
            case 'relative-json-pointer':
                return 'Must be a relative JSON Pointer, like "2/pointer/to/something"';
            case 'regex':
                return 'Must be a regular expression, like "(1-)?\\d{3}-\\d{3}-\\d{4}"';
            default:
                return 'Must be a correctly formatted ' + error.requiredFormat;
        }
    },
    minimum: 'Must be {{minimumValue}} or more',
    exclusiveMinimum: 'Must be more than {{exclusiveMinimumValue}}',
    maximum: 'Must be {{maximumValue}} or less',
    exclusiveMaximum: 'Must be less than {{exclusiveMaximumValue}}',
    multipleOf: function (error) {
        if ((1 / error.multipleOfValue) % 10 === 0) {
            /** @type {?} */
            const decimals = Math.log10(1 / error.multipleOfValue);
            return `Must have ${decimals} or fewer decimal places.`;
        }
        else {
            return `Must be a multiple of ${error.multipleOfValue}.`;
        }
    },
    minProperties: 'Must have {{minimumProperties}} or more items (current items: {{currentProperties}})',
    maxProperties: 'Must have {{maximumProperties}} or fewer items (current items: {{currentProperties}})',
    minItems: 'Must have {{minimumItems}} or more items (current items: {{currentItems}})',
    maxItems: 'Must have {{maximumItems}} or fewer items (current items: {{currentItems}})',
    uniqueItems: 'All items must be unique',
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW4tdmFsaWRhdGlvbi1tZXNzYWdlcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nNi1qc29uLXNjaGVtYS1mb3JtLyIsInNvdXJjZXMiOlsibGliL2xvY2FsZS9lbi12YWxpZGF0aW9uLW1lc3NhZ2VzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsYUFBYSxvQkFBb0IsR0FBUTs7SUFDdkMsUUFBUSxFQUFFLHlCQUF5QjtJQUNuQyxTQUFTLEVBQUUsb0ZBQW9GO0lBQy9GLFNBQVMsRUFBRSxxRkFBcUY7SUFDaEcsT0FBTyxFQUFFLHlDQUF5QztJQUNsRCxNQUFNLEVBQUUsVUFBVSxLQUFLO1FBQ3JCLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO1lBQzdCLEtBQUssTUFBTTtnQkFDVCxNQUFNLENBQUMsbUNBQW1DLENBQUM7WUFDN0MsS0FBSyxNQUFNO2dCQUNULE1BQU0sQ0FBQyxpREFBaUQsQ0FBQztZQUMzRCxLQUFLLFdBQVc7Z0JBQ2QsTUFBTSxDQUFDLDRFQUE0RSxDQUFDO1lBQ3RGLEtBQUssT0FBTztnQkFDVixNQUFNLENBQUMsbURBQW1ELENBQUM7WUFDN0QsS0FBSyxVQUFVO2dCQUNiLE1BQU0sQ0FBQyx3Q0FBd0MsQ0FBQztZQUNsRCxLQUFLLE1BQU07Z0JBQ1QsTUFBTSxDQUFDLDJDQUEyQyxDQUFDO1lBQ3JELEtBQUssTUFBTTtnQkFDVCxNQUFNLENBQUMseUVBQXlFLENBQUM7OztZQUduRixLQUFLLEtBQUs7Z0JBQ1IsTUFBTSxDQUFDLHdEQUF3RCxDQUFDO1lBQ2xFLEtBQUssTUFBTTtnQkFDVCxNQUFNLENBQUMsNkRBQTZELENBQUM7WUFDdkUsS0FBSyxPQUFPO2dCQUNWLE1BQU0sQ0FBQyx5REFBeUQsQ0FBQztZQUNuRSxLQUFLLGNBQWM7Z0JBQ2pCLE1BQU0sQ0FBQyxzREFBc0QsQ0FBQztZQUNoRSxLQUFLLHVCQUF1QjtnQkFDMUIsTUFBTSxDQUFDLGdFQUFnRSxDQUFDO1lBQzFFLEtBQUssT0FBTztnQkFDVixNQUFNLENBQUMsZ0VBQWdFLENBQUM7WUFDMUU7Z0JBQ0UsTUFBTSxDQUFDLGdDQUFnQyxHQUFHLEtBQUssQ0FBQyxjQUFjLENBQUM7U0FDbEU7S0FDRjtJQUNELE9BQU8sRUFBRSxrQ0FBa0M7SUFDM0MsZ0JBQWdCLEVBQUUsNkNBQTZDO0lBQy9ELE9BQU8sRUFBRSxrQ0FBa0M7SUFDM0MsZ0JBQWdCLEVBQUUsNkNBQTZDO0lBQy9ELFVBQVUsRUFBRSxVQUFVLEtBQUs7UUFDekIsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLGVBQWUsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDOztZQUMzQyxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDdkQsTUFBTSxDQUFDLGFBQWEsUUFBUSwyQkFBMkIsQ0FBQztTQUN6RDtRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sTUFBTSxDQUFDLHlCQUF5QixLQUFLLENBQUMsZUFBZSxHQUFHLENBQUM7U0FDMUQ7S0FDRjtJQUNELGFBQWEsRUFBRSxzRkFBc0Y7SUFDckcsYUFBYSxFQUFFLHVGQUF1RjtJQUN0RyxRQUFRLEVBQUUsNEVBQTRFO0lBQ3RGLFFBQVEsRUFBRSw2RUFBNkU7SUFDdkYsV0FBVyxFQUFFLDBCQUEwQjtDQUV4QyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IGVuVmFsaWRhdGlvbk1lc3NhZ2VzOiBhbnkgPSB7IC8vIERlZmF1bHQgRW5nbGlzaCBlcnJvciBtZXNzYWdlc1xuICByZXF1aXJlZDogJ1RoaXMgZmllbGQgaXMgcmVxdWlyZWQuJyxcbiAgbWluTGVuZ3RoOiAnTXVzdCBiZSB7e21pbmltdW1MZW5ndGh9fSBjaGFyYWN0ZXJzIG9yIGxvbmdlciAoY3VycmVudCBsZW5ndGg6IHt7Y3VycmVudExlbmd0aH19KScsXG4gIG1heExlbmd0aDogJ011c3QgYmUge3ttYXhpbXVtTGVuZ3RofX0gY2hhcmFjdGVycyBvciBzaG9ydGVyIChjdXJyZW50IGxlbmd0aDoge3tjdXJyZW50TGVuZ3RofX0pJyxcbiAgcGF0dGVybjogJ011c3QgbWF0Y2ggcGF0dGVybjoge3tyZXF1aXJlZFBhdHRlcm59fScsXG4gIGZvcm1hdDogZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgc3dpdGNoIChlcnJvci5yZXF1aXJlZEZvcm1hdCkge1xuICAgICAgY2FzZSAnZGF0ZSc6XG4gICAgICAgIHJldHVybiAnTXVzdCBiZSBhIGRhdGUsIGxpa2UgXCIyMDAwLTEyLTMxXCInO1xuICAgICAgY2FzZSAndGltZSc6XG4gICAgICAgIHJldHVybiAnTXVzdCBiZSBhIHRpbWUsIGxpa2UgXCIxNjoyMFwiIG9yIFwiMDM6MTQ6MTUuOTI2NVwiJztcbiAgICAgIGNhc2UgJ2RhdGUtdGltZSc6XG4gICAgICAgIHJldHVybiAnTXVzdCBiZSBhIGRhdGUtdGltZSwgbGlrZSBcIjIwMDAtMDMtMTRUMDE6NTlcIiBvciBcIjIwMDAtMDMtMTRUMDE6NTk6MjYuNTM1WlwiJztcbiAgICAgIGNhc2UgJ2VtYWlsJzpcbiAgICAgICAgcmV0dXJuICdNdXN0IGJlIGFuIGVtYWlsIGFkZHJlc3MsIGxpa2UgXCJuYW1lQGV4YW1wbGUuY29tXCInO1xuICAgICAgY2FzZSAnaG9zdG5hbWUnOlxuICAgICAgICByZXR1cm4gJ011c3QgYmUgYSBob3N0bmFtZSwgbGlrZSBcImV4YW1wbGUuY29tXCInO1xuICAgICAgY2FzZSAnaXB2NCc6XG4gICAgICAgIHJldHVybiAnTXVzdCBiZSBhbiBJUHY0IGFkZHJlc3MsIGxpa2UgXCIxMjcuMC4wLjFcIic7XG4gICAgICBjYXNlICdpcHY2JzpcbiAgICAgICAgcmV0dXJuICdNdXN0IGJlIGFuIElQdjYgYWRkcmVzcywgbGlrZSBcIjEyMzQ6NTY3ODo5QUJDOkRFRjA6MTIzNDo1Njc4OjlBQkM6REVGMFwiJztcbiAgICAgIC8vIFRPRE86IGFkZCBleGFtcGxlcyBmb3IgJ3VyaScsICd1cmktcmVmZXJlbmNlJywgYW5kICd1cmktdGVtcGxhdGUnXG4gICAgICAvLyBjYXNlICd1cmknOiBjYXNlICd1cmktcmVmZXJlbmNlJzogY2FzZSAndXJpLXRlbXBsYXRlJzpcbiAgICAgIGNhc2UgJ3VybCc6XG4gICAgICAgIHJldHVybiAnTXVzdCBiZSBhIHVybCwgbGlrZSBcImh0dHA6Ly93d3cuZXhhbXBsZS5jb20vcGFnZS5odG1sXCInO1xuICAgICAgY2FzZSAndXVpZCc6XG4gICAgICAgIHJldHVybiAnTXVzdCBiZSBhIHV1aWQsIGxpa2UgXCIxMjM0NTY3OC05QUJDLURFRjAtMTIzNC01Njc4OUFCQ0RFRjBcIic7XG4gICAgICBjYXNlICdjb2xvcic6XG4gICAgICAgIHJldHVybiAnTXVzdCBiZSBhIGNvbG9yLCBsaWtlIFwiI0ZGRkZGRlwiIG9yIFwicmdiKDI1NSwgMjU1LCAyNTUpXCInO1xuICAgICAgY2FzZSAnanNvbi1wb2ludGVyJzpcbiAgICAgICAgcmV0dXJuICdNdXN0IGJlIGEgSlNPTiBQb2ludGVyLCBsaWtlIFwiL3BvaW50ZXIvdG8vc29tZXRoaW5nXCInO1xuICAgICAgY2FzZSAncmVsYXRpdmUtanNvbi1wb2ludGVyJzpcbiAgICAgICAgcmV0dXJuICdNdXN0IGJlIGEgcmVsYXRpdmUgSlNPTiBQb2ludGVyLCBsaWtlIFwiMi9wb2ludGVyL3RvL3NvbWV0aGluZ1wiJztcbiAgICAgIGNhc2UgJ3JlZ2V4JzpcbiAgICAgICAgcmV0dXJuICdNdXN0IGJlIGEgcmVndWxhciBleHByZXNzaW9uLCBsaWtlIFwiKDEtKT9cXFxcZHszfS1cXFxcZHszfS1cXFxcZHs0fVwiJztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiAnTXVzdCBiZSBhIGNvcnJlY3RseSBmb3JtYXR0ZWQgJyArIGVycm9yLnJlcXVpcmVkRm9ybWF0O1xuICAgIH1cbiAgfSxcbiAgbWluaW11bTogJ011c3QgYmUge3ttaW5pbXVtVmFsdWV9fSBvciBtb3JlJyxcbiAgZXhjbHVzaXZlTWluaW11bTogJ011c3QgYmUgbW9yZSB0aGFuIHt7ZXhjbHVzaXZlTWluaW11bVZhbHVlfX0nLFxuICBtYXhpbXVtOiAnTXVzdCBiZSB7e21heGltdW1WYWx1ZX19IG9yIGxlc3MnLFxuICBleGNsdXNpdmVNYXhpbXVtOiAnTXVzdCBiZSBsZXNzIHRoYW4ge3tleGNsdXNpdmVNYXhpbXVtVmFsdWV9fScsXG4gIG11bHRpcGxlT2Y6IGZ1bmN0aW9uIChlcnJvcikge1xuICAgIGlmICgoMSAvIGVycm9yLm11bHRpcGxlT2ZWYWx1ZSkgJSAxMCA9PT0gMCkge1xuICAgICAgY29uc3QgZGVjaW1hbHMgPSBNYXRoLmxvZzEwKDEgLyBlcnJvci5tdWx0aXBsZU9mVmFsdWUpO1xuICAgICAgcmV0dXJuIGBNdXN0IGhhdmUgJHtkZWNpbWFsc30gb3IgZmV3ZXIgZGVjaW1hbCBwbGFjZXMuYDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGBNdXN0IGJlIGEgbXVsdGlwbGUgb2YgJHtlcnJvci5tdWx0aXBsZU9mVmFsdWV9LmA7XG4gICAgfVxuICB9LFxuICBtaW5Qcm9wZXJ0aWVzOiAnTXVzdCBoYXZlIHt7bWluaW11bVByb3BlcnRpZXN9fSBvciBtb3JlIGl0ZW1zIChjdXJyZW50IGl0ZW1zOiB7e2N1cnJlbnRQcm9wZXJ0aWVzfX0pJyxcbiAgbWF4UHJvcGVydGllczogJ011c3QgaGF2ZSB7e21heGltdW1Qcm9wZXJ0aWVzfX0gb3IgZmV3ZXIgaXRlbXMgKGN1cnJlbnQgaXRlbXM6IHt7Y3VycmVudFByb3BlcnRpZXN9fSknLFxuICBtaW5JdGVtczogJ011c3QgaGF2ZSB7e21pbmltdW1JdGVtc319IG9yIG1vcmUgaXRlbXMgKGN1cnJlbnQgaXRlbXM6IHt7Y3VycmVudEl0ZW1zfX0pJyxcbiAgbWF4SXRlbXM6ICdNdXN0IGhhdmUge3ttYXhpbXVtSXRlbXN9fSBvciBmZXdlciBpdGVtcyAoY3VycmVudCBpdGVtczoge3tjdXJyZW50SXRlbXN9fSknLFxuICB1bmlxdWVJdGVtczogJ0FsbCBpdGVtcyBtdXN0IGJlIHVuaXF1ZScsXG4gIC8vIE5vdGU6IE5vIGRlZmF1bHQgZXJyb3IgbWVzc2FnZXMgZm9yICd0eXBlJywgJ2NvbnN0JywgJ2VudW0nLCBvciAnZGVwZW5kZW5jaWVzJ1xufTtcbiJdfQ==