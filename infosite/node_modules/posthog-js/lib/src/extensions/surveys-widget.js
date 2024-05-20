import { document as _document } from '../utils/globals';
// We cast the types here which is dangerous but protected by the top level generateSurveys call
var document = _document;
export function createWidgetShadow(survey) {
    var _a;
    var div = document.createElement('div');
    div.className = "PostHogWidget".concat(survey.id);
    var shadow = div.attachShadow({ mode: 'open' });
    var widgetStyleSheet = createWidgetStyle((_a = survey.appearance) === null || _a === void 0 ? void 0 : _a.widgetColor);
    shadow.append(Object.assign(document.createElement('style'), { innerText: widgetStyleSheet }));
    document.body.appendChild(div);
    return shadow;
}
export function createWidgetStyle(widgetColor) {
    return "\n        .ph-survey-widget-tab {\n            position: fixed;\n            top: 50%;\n            right: 0;\n            background: ".concat(widgetColor || '#e0a045', ";\n            color: white;\n            transform: rotate(-90deg) translate(0, -100%);\n            transform-origin: right top;\n            min-width: 40px;\n            padding: 8px 12px;\n            font-weight: 500;\n            border-radius: 3px 3px 0 0;\n            text-align: center;\n            cursor: pointer;\n            z-index: 9999999;\n        }\n        .ph-survey-widget-tab:hover {\n            padding-bottom: 13px;\n        }\n        .ph-survey-widget-button {\n            position: fixed;\n        }\n    ");
}
//# sourceMappingURL=surveys-widget.js.map