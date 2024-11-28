var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { SurveyQuestionBranchingType, SurveyQuestionType, SurveyType, } from '../posthog-surveys-types';
import { window as _window, document as _document } from '../utils/globals';
import { style, defaultSurveyAppearance, sendSurveyEvent, dismissedSurveyEvent, createShadow, getContrastingTextColor, SurveyContext, getDisplayOrderQuestions, getSurveySeen, } from './surveys/surveys-utils';
import * as Preact from 'preact';
import { createWidgetShadow, createWidgetStyle } from './surveys-widget';
import { useState, useEffect, useRef, useContext, useMemo } from 'preact/hooks';
import { isNull, isNumber } from '../utils/type-utils';
import { ConfirmationMessage } from './surveys/components/ConfirmationMessage';
import { OpenTextQuestion, LinkQuestion, RatingQuestion, MultipleChoiceQuestion, } from './surveys/components/QuestionTypes';
import { logger } from '../utils/logger';
import { Cancel } from './surveys/components/QuestionHeader';
// We cast the types here which is dangerous but protected by the top level generateSurveys call
var window = _window;
var document = _document;
var SurveyManager = /** @class */ (function () {
    function SurveyManager(posthog) {
        var _this = this;
        this.canShowNextEventBasedSurvey = function () {
            var _a;
            // with event based surveys, we need to show the next survey without reloading the page.
            // A simple check for div elements with the class name pattern of PostHogSurvey_xyz doesn't work here
            // because preact leaves behind the div element for any surveys responded/dismissed with a <style> node.
            // To alleviate this, we check the last div in the dom and see if it has any elements other than a Style node.
            // if the last PostHogSurvey_xyz div has only one style node, we can show the next survey in the queue
            // without reloading the page.
            var surveyPopups = document.querySelectorAll("div[class^=PostHogSurvey]");
            if (surveyPopups.length > 0) {
                return ((_a = surveyPopups[surveyPopups.length - 1].shadowRoot) === null || _a === void 0 ? void 0 : _a.childElementCount) === 1;
            }
            return true;
        };
        this.handlePopoverSurvey = function (survey) {
            var _a;
            var surveyWaitPeriodInDays = (_a = survey.conditions) === null || _a === void 0 ? void 0 : _a.seenSurveyWaitPeriodInDays;
            var lastSeenSurveyDate = localStorage.getItem("lastSeenSurveyDate");
            if (surveyWaitPeriodInDays && lastSeenSurveyDate) {
                var today = new Date();
                var diff = Math.abs(today.getTime() - new Date(lastSeenSurveyDate).getTime());
                var diffDaysFromToday = Math.ceil(diff / (1000 * 3600 * 24));
                if (diffDaysFromToday < surveyWaitPeriodInDays) {
                    return;
                }
            }
            var surveySeen = getSurveySeen(survey);
            if (!surveySeen) {
                _this.addSurveyToFocus(survey.id);
                var shadow = createShadow(style(survey === null || survey === void 0 ? void 0 : survey.appearance), survey.id);
                Preact.render(<SurveyPopup key={'popover-survey'} posthog={_this.posthog} survey={survey} removeSurveyFromFocus={_this.removeSurveyFromFocus} isPopup={true}/>, shadow);
            }
        };
        this.handleWidget = function (survey) {
            var shadow = createWidgetShadow(survey);
            var surveyStyleSheet = style(survey.appearance);
            shadow.appendChild(Object.assign(document.createElement('style'), { innerText: surveyStyleSheet }));
            Preact.render(<FeedbackWidget key={'feedback-survey'} posthog={_this.posthog} survey={survey} removeSurveyFromFocus={_this.removeSurveyFromFocus}/>, shadow);
        };
        this.handleWidgetSelector = function (survey) {
            var _a, _b, _c;
            var selectorOnPage = ((_a = survey.appearance) === null || _a === void 0 ? void 0 : _a.widgetSelector) && document.querySelector(survey.appearance.widgetSelector);
            if (selectorOnPage) {
                if (document.querySelectorAll(".PostHogWidget".concat(survey.id)).length === 0) {
                    _this.handleWidget(survey);
                }
                else if (document.querySelectorAll(".PostHogWidget".concat(survey.id)).length === 1) {
                    // we have to check if user selector already has a survey listener attached to it because we always have to check if it's on the page or not
                    if (!selectorOnPage.getAttribute('PHWidgetSurveyClickListener')) {
                        var surveyPopup_1 = (_c = (_b = document
                            .querySelector(".PostHogWidget".concat(survey.id))) === null || _b === void 0 ? void 0 : _b.shadowRoot) === null || _c === void 0 ? void 0 : _c.querySelector(".survey-form");
                        selectorOnPage.addEventListener('click', function () {
                            if (surveyPopup_1) {
                                surveyPopup_1.style.display = surveyPopup_1.style.display === 'none' ? 'block' : 'none';
                                surveyPopup_1.addEventListener('PHSurveyClosed', function () {
                                    _this.removeSurveyFromFocus(survey.id);
                                    surveyPopup_1.style.display = 'none';
                                });
                            }
                        });
                        selectorOnPage.setAttribute('PHWidgetSurveyClickListener', 'true');
                    }
                }
            }
        };
        /**
         * Checks the feature flags associated with this Survey to see if the survey can be rendered.
         * @param survey
         * @param instance
         */
        this.canRenderSurvey = function (survey) {
            var renderReason = {
                visible: false,
            };
            if (survey.end_date) {
                renderReason.disabledReason = "survey was completed on ".concat(survey.end_date);
                return renderReason;
            }
            if (survey.type != SurveyType.Popover) {
                renderReason.disabledReason = "Only Popover survey types can be rendered";
                return renderReason;
            }
            var linkedFlagCheck = survey.linked_flag_key
                ? _this.posthog.featureFlags.isFeatureEnabled(survey.linked_flag_key)
                : true;
            if (!linkedFlagCheck) {
                renderReason.disabledReason = "linked feature flag ".concat(survey.linked_flag_key, " is false");
                return renderReason;
            }
            var targetingFlagCheck = survey.targeting_flag_key
                ? _this.posthog.featureFlags.isFeatureEnabled(survey.targeting_flag_key)
                : true;
            if (!targetingFlagCheck) {
                renderReason.disabledReason = "targeting feature flag ".concat(survey.targeting_flag_key, " is false");
                return renderReason;
            }
            var internalTargetingFlagCheck = survey.internal_targeting_flag_key
                ? _this.posthog.featureFlags.isFeatureEnabled(survey.internal_targeting_flag_key)
                : true;
            if (!internalTargetingFlagCheck) {
                renderReason.disabledReason = "internal targeting feature flag ".concat(survey.internal_targeting_flag_key, " is false");
                return renderReason;
            }
            renderReason.visible = true;
            return renderReason;
        };
        this.renderSurvey = function (survey, selector) {
            Preact.render(<SurveyPopup key={'popover-survey'} posthog={_this.posthog} survey={survey} removeSurveyFromFocus={_this.removeSurveyFromFocus} isPopup={false}/>, selector);
        };
        this.callSurveysAndEvaluateDisplayLogic = function (forceReload) {
            var _a;
            if (forceReload === void 0) { forceReload = false; }
            (_a = _this.posthog) === null || _a === void 0 ? void 0 : _a.getActiveMatchingSurveys(function (surveys) {
                var nonAPISurveys = surveys.filter(function (survey) { return survey.type !== 'api'; });
                // Create a queue of surveys sorted by their appearance delay.  We will evaluate the display logic
                // for each survey in the queue in order, and only display one survey at a time.
                var nonAPISurveyQueue = _this.sortSurveysByAppearanceDelay(nonAPISurveys);
                nonAPISurveyQueue.forEach(function (survey) {
                    var _a, _b, _c;
                    // We only evaluate the display logic for one survey at a time
                    if (!isNull(_this.surveyInFocus)) {
                        return;
                    }
                    if (survey.type === SurveyType.Widget) {
                        if (((_a = survey.appearance) === null || _a === void 0 ? void 0 : _a.widgetType) === 'tab' &&
                            document.querySelectorAll(".PostHogWidget".concat(survey.id)).length === 0) {
                            _this.handleWidget(survey);
                        }
                        if (((_b = survey.appearance) === null || _b === void 0 ? void 0 : _b.widgetType) === 'selector' && ((_c = survey.appearance) === null || _c === void 0 ? void 0 : _c.widgetSelector)) {
                            _this.handleWidgetSelector(survey);
                        }
                    }
                    if (survey.type === SurveyType.Popover && _this.canShowNextEventBasedSurvey()) {
                        _this.handlePopoverSurvey(survey);
                    }
                });
            }, forceReload);
        };
        this.addSurveyToFocus = function (id) {
            if (!isNull(_this.surveyInFocus)) {
                logger.error("Survey ".concat(__spreadArray([], __read(_this.surveyInFocus), false), " already in focus. Cannot add survey ").concat(id, "."));
            }
            _this.surveyInFocus = id;
        };
        this.removeSurveyFromFocus = function (id) {
            if (_this.surveyInFocus !== id) {
                logger.error("Survey ".concat(id, " is not in focus. Cannot remove survey ").concat(id, "."));
            }
            _this.surveyInFocus = null;
        };
        this.posthog = posthog;
        // This is used to track the survey that is currently in focus. We only show one survey at a time.
        this.surveyInFocus = null;
    }
    /**
     * Sorts surveys by their appearance delay in ascending order. If a survey does not have an appearance delay,
     * it is considered to have a delay of 0.
     * @param surveys
     * @returns The surveys sorted by their appearance delay
     */
    SurveyManager.prototype.sortSurveysByAppearanceDelay = function (surveys) {
        return surveys.sort(function (a, b) { var _a, _b; return (((_a = a.appearance) === null || _a === void 0 ? void 0 : _a.surveyPopupDelaySeconds) || 0) - (((_b = b.appearance) === null || _b === void 0 ? void 0 : _b.surveyPopupDelaySeconds) || 0); });
    };
    // Expose internal state and methods for testing
    SurveyManager.prototype.getTestAPI = function () {
        return {
            addSurveyToFocus: this.addSurveyToFocus,
            removeSurveyFromFocus: this.removeSurveyFromFocus,
            surveyInFocus: this.surveyInFocus,
            canShowNextEventBasedSurvey: this.canShowNextEventBasedSurvey,
            handleWidget: this.handleWidget,
            handlePopoverSurvey: this.handlePopoverSurvey,
            handleWidgetSelector: this.handleWidgetSelector,
            sortSurveysByAppearanceDelay: this.sortSurveysByAppearanceDelay,
        };
    };
    return SurveyManager;
}());
export { SurveyManager };
export var renderSurveysPreview = function (_a) {
    var _b, _c;
    var survey = _a.survey, parentElement = _a.parentElement, previewPageIndex = _a.previewPageIndex, forceDisableHtml = _a.forceDisableHtml;
    var surveyStyleSheet = style(survey.appearance);
    var styleElement = Object.assign(document.createElement('style'), { innerText: surveyStyleSheet });
    // Remove previously attached <style>
    Array.from(parentElement.children).forEach(function (child) {
        if (child instanceof HTMLStyleElement) {
            parentElement.removeChild(child);
        }
    });
    parentElement.appendChild(styleElement);
    var textColor = getContrastingTextColor(((_b = survey.appearance) === null || _b === void 0 ? void 0 : _b.backgroundColor) || defaultSurveyAppearance.backgroundColor || 'white');
    Preact.render(<SurveyPopup key="surveys-render-preview" survey={survey} forceDisableHtml={forceDisableHtml} style={{
            position: 'relative',
            right: 0,
            borderBottom: "1px solid ".concat((_c = survey.appearance) === null || _c === void 0 ? void 0 : _c.borderColor),
            borderRadius: 10,
            color: textColor,
        }} previewPageIndex={previewPageIndex} removeSurveyFromFocus={function () { }} isPopup={true}/>, parentElement);
};
export var renderFeedbackWidgetPreview = function (_a) {
    var _b;
    var survey = _a.survey, root = _a.root, forceDisableHtml = _a.forceDisableHtml;
    var widgetStyleSheet = createWidgetStyle((_b = survey.appearance) === null || _b === void 0 ? void 0 : _b.widgetColor);
    var styleElement = Object.assign(document.createElement('style'), { innerText: widgetStyleSheet });
    root.appendChild(styleElement);
    Preact.render(<FeedbackWidget key={'feedback-render-preview'} forceDisableHtml={forceDisableHtml} survey={survey} readOnly={true} removeSurveyFromFocus={function () { }}/>, root);
};
// This is the main exported function
export function generateSurveys(posthog) {
    // NOTE: Important to ensure we never try and run surveys without a window environment
    if (!document || !window) {
        return;
    }
    var surveyManager = new SurveyManager(posthog);
    surveyManager.callSurveysAndEvaluateDisplayLogic(true);
    // recalculate surveys every second to check if URL or selectors have changed
    setInterval(function () {
        surveyManager.callSurveysAndEvaluateDisplayLogic(false);
    }, 1000);
    return surveyManager;
}
export function usePopupVisibility(survey, posthog, millisecondDelay, isPreviewMode, removeSurveyFromFocus) {
    var _a = __read(useState(isPreviewMode || millisecondDelay === 0), 2), isPopupVisible = _a[0], setIsPopupVisible = _a[1];
    var _b = __read(useState(false), 2), isSurveySent = _b[0], setIsSurveySent = _b[1];
    useEffect(function () {
        if (isPreviewMode || !posthog) {
            return;
        }
        var handleSurveyClosed = function () {
            removeSurveyFromFocus(survey.id);
            setIsPopupVisible(false);
        };
        var handleSurveySent = function () {
            var _a, _b;
            if (!((_a = survey.appearance) === null || _a === void 0 ? void 0 : _a.displayThankYouMessage)) {
                removeSurveyFromFocus(survey.id);
                setIsPopupVisible(false);
            }
            else {
                setIsSurveySent(true);
                removeSurveyFromFocus(survey.id);
                if ((_b = survey.appearance) === null || _b === void 0 ? void 0 : _b.autoDisappear) {
                    setTimeout(function () {
                        setIsPopupVisible(false);
                    }, 5000);
                }
            }
        };
        var showSurvey = function () {
            var _a;
            setIsPopupVisible(true);
            window.dispatchEvent(new Event('PHSurveyShown'));
            posthog.capture('survey shown', {
                $survey_name: survey.name,
                $survey_id: survey.id,
                $survey_iteration: survey.current_iteration,
                $survey_iteration_start_date: survey.current_iteration_start_date,
                sessionRecordingUrl: (_a = posthog.get_session_replay_url) === null || _a === void 0 ? void 0 : _a.call(posthog),
            });
            localStorage.setItem('lastSeenSurveyDate', new Date().toISOString());
        };
        var handleShowSurveyWithDelay = function () {
            var timeoutId = setTimeout(function () {
                showSurvey();
            }, millisecondDelay);
            return function () {
                clearTimeout(timeoutId);
                window.removeEventListener('PHSurveyClosed', handleSurveyClosed);
                window.removeEventListener('PHSurveySent', handleSurveySent);
            };
        };
        var handleShowSurveyImmediately = function () {
            showSurvey();
            return function () {
                window.removeEventListener('PHSurveyClosed', handleSurveyClosed);
                window.removeEventListener('PHSurveySent', handleSurveySent);
            };
        };
        window.addEventListener('PHSurveyClosed', handleSurveyClosed);
        window.addEventListener('PHSurveySent', handleSurveySent);
        if (millisecondDelay > 0) {
            return handleShowSurveyWithDelay();
        }
        else {
            return handleShowSurveyImmediately();
        }
    }, []);
    return { isPopupVisible: isPopupVisible, isSurveySent: isSurveySent, setIsPopupVisible: setIsPopupVisible };
}
export function SurveyPopup(_a) {
    var _b, _c, _d, _e;
    var survey = _a.survey, forceDisableHtml = _a.forceDisableHtml, posthog = _a.posthog, style = _a.style, previewPageIndex = _a.previewPageIndex, removeSurveyFromFocus = _a.removeSurveyFromFocus, isPopup = _a.isPopup;
    var isPreviewMode = Number.isInteger(previewPageIndex);
    // NB: The client-side code passes the millisecondDelay in seconds, but setTimeout expects milliseconds, so we multiply by 1000
    var surveyPopupDelayMilliseconds = ((_b = survey.appearance) === null || _b === void 0 ? void 0 : _b.surveyPopupDelaySeconds)
        ? survey.appearance.surveyPopupDelaySeconds * 1000
        : 0;
    var _f = usePopupVisibility(survey, posthog, surveyPopupDelayMilliseconds, isPreviewMode, removeSurveyFromFocus), isPopupVisible = _f.isPopupVisible, isSurveySent = _f.isSurveySent, setIsPopupVisible = _f.setIsPopupVisible;
    var shouldShowConfirmation = isSurveySent || previewPageIndex === survey.questions.length;
    var confirmationBoxLeftStyle = (style === null || style === void 0 ? void 0 : style.left) && isNumber(style === null || style === void 0 ? void 0 : style.left) ? { left: style.left - 40 } : {};
    if (isPreviewMode) {
        style = style || {};
        style.left = 'unset';
        style.right = 'unset';
        style.transform = 'unset';
    }
    return isPopupVisible ? (<SurveyContext.Provider value={{
            isPreviewMode: isPreviewMode,
            previewPageIndex: previewPageIndex,
            handleCloseSurveyPopup: function () { return dismissedSurveyEvent(survey, posthog, isPreviewMode); },
            isPopup: isPopup || false,
        }}>
            {!shouldShowConfirmation ? (<Questions survey={survey} forceDisableHtml={!!forceDisableHtml} posthog={posthog} styleOverrides={style}/>) : (<ConfirmationMessage header={((_c = survey.appearance) === null || _c === void 0 ? void 0 : _c.thankYouMessageHeader) || 'Thank you!'} description={((_d = survey.appearance) === null || _d === void 0 ? void 0 : _d.thankYouMessageDescription) || ''} forceDisableHtml={!!forceDisableHtml} contentType={(_e = survey.appearance) === null || _e === void 0 ? void 0 : _e.thankYouMessageDescriptionContentType} appearance={survey.appearance || defaultSurveyAppearance} styleOverrides={__assign(__assign({}, style), confirmationBoxLeftStyle)} onClose={function () { return setIsPopupVisible(false); }}/>)}
        </SurveyContext.Provider>) : (<></>);
}
export function Questions(_a) {
    var _b, _c;
    var survey = _a.survey, forceDisableHtml = _a.forceDisableHtml, posthog = _a.posthog, styleOverrides = _a.styleOverrides;
    var textColor = getContrastingTextColor(((_b = survey.appearance) === null || _b === void 0 ? void 0 : _b.backgroundColor) || defaultSurveyAppearance.backgroundColor);
    var _d = __read(useState({}), 2), questionsResponses = _d[0], setQuestionsResponses = _d[1];
    var _e = useContext(SurveyContext), isPreviewMode = _e.isPreviewMode, previewPageIndex = _e.previewPageIndex, handleCloseSurveyPopup = _e.handleCloseSurveyPopup, isPopup = _e.isPopup;
    var _f = __read(useState(previewPageIndex || 0), 2), currentQuestionIndex = _f[0], setCurrentQuestionIndex = _f[1];
    var surveyQuestions = useMemo(function () { return getDisplayOrderQuestions(survey); }, [survey]);
    // Sync preview state
    useEffect(function () {
        setCurrentQuestionIndex(previewPageIndex !== null && previewPageIndex !== void 0 ? previewPageIndex : 0);
    }, [previewPageIndex]);
    var onNextButtonClick = function (_a) {
        var _b, _c, _d;
        var res = _a.res, originalQuestionIndex = _a.originalQuestionIndex, displayQuestionIndex = _a.displayQuestionIndex;
        if (!posthog) {
            return;
        }
        var responseKey = originalQuestionIndex === 0 ? "$survey_response" : "$survey_response_".concat(originalQuestionIndex);
        setQuestionsResponses(__assign(__assign({}, questionsResponses), (_b = {}, _b[responseKey] = res, _b)));
        // Old SDK, no branching
        if (!posthog.getNextSurveyStep) {
            var isLastDisplayedQuestion = displayQuestionIndex === survey.questions.length - 1;
            if (isLastDisplayedQuestion) {
                sendSurveyEvent(__assign(__assign({}, questionsResponses), (_c = {}, _c[responseKey] = res, _c)), survey, posthog);
            }
            else {
                setCurrentQuestionIndex(displayQuestionIndex + 1);
            }
            return;
        }
        var nextStep = posthog.getNextSurveyStep(survey, displayQuestionIndex, res);
        if (nextStep === SurveyQuestionBranchingType.End) {
            sendSurveyEvent(__assign(__assign({}, questionsResponses), (_d = {}, _d[responseKey] = res, _d)), survey, posthog);
        }
        else {
            setCurrentQuestionIndex(nextStep);
        }
    };
    return (<form className="survey-form" style={isPopup
            ? __assign({ color: textColor, borderColor: (_c = survey.appearance) === null || _c === void 0 ? void 0 : _c.borderColor }, styleOverrides) : {}}>
            {surveyQuestions.map(function (question, displayQuestionIndex) {
            var _a;
            var originalQuestionIndex = question.originalQuestionIndex;
            var isVisible = isPreviewMode
                ? currentQuestionIndex === originalQuestionIndex
                : currentQuestionIndex === displayQuestionIndex;
            return (isVisible && (<div className="survey-box" style={isPopup
                    ? {
                        backgroundColor: ((_a = survey.appearance) === null || _a === void 0 ? void 0 : _a.backgroundColor) ||
                            defaultSurveyAppearance.backgroundColor,
                    }
                    : {}}>
                            {isPopup && <Cancel onClick={function () { return handleCloseSurveyPopup(); }}/>}
                            {getQuestionComponent({
                    question: question,
                    forceDisableHtml: forceDisableHtml,
                    displayQuestionIndex: displayQuestionIndex,
                    appearance: survey.appearance || defaultSurveyAppearance,
                    onSubmit: function (res) {
                        return onNextButtonClick({
                            res: res,
                            originalQuestionIndex: originalQuestionIndex,
                            displayQuestionIndex: displayQuestionIndex,
                        });
                    },
                })}
                        </div>));
        })}
        </form>);
}
export function FeedbackWidget(_a) {
    var _b, _c;
    var survey = _a.survey, forceDisableHtml = _a.forceDisableHtml, posthog = _a.posthog, readOnly = _a.readOnly, removeSurveyFromFocus = _a.removeSurveyFromFocus;
    var _d = __read(useState(false), 2), showSurvey = _d[0], setShowSurvey = _d[1];
    var _e = __read(useState({}), 2), styleOverrides = _e[0], setStyle = _e[1];
    var widgetRef = useRef(null);
    useEffect(function () {
        var _a, _b, _c;
        if (readOnly || !posthog) {
            return;
        }
        if (((_a = survey.appearance) === null || _a === void 0 ? void 0 : _a.widgetType) === 'tab') {
            if (widgetRef.current) {
                var widgetPos = widgetRef.current.getBoundingClientRect();
                var style_1 = {
                    top: '50%',
                    left: parseInt("".concat(widgetPos.right - 360)),
                    bottom: 'auto',
                    borderRadius: 10,
                    borderBottom: "1.5px solid ".concat(((_b = survey.appearance) === null || _b === void 0 ? void 0 : _b.borderColor) || '#c9c6c6'),
                };
                setStyle(style_1);
            }
        }
        if (((_c = survey.appearance) === null || _c === void 0 ? void 0 : _c.widgetType) === 'selector') {
            var widget = document.querySelector(survey.appearance.widgetSelector || '');
            widget === null || widget === void 0 ? void 0 : widget.addEventListener('click', function () {
                setShowSurvey(!showSurvey);
            });
            widget === null || widget === void 0 ? void 0 : widget.setAttribute('PHWidgetSurveyClickListener', 'true');
        }
    }, []);
    return (<>
            {((_b = survey.appearance) === null || _b === void 0 ? void 0 : _b.widgetType) === 'tab' && (<div className="ph-survey-widget-tab" ref={widgetRef} onClick={function () { return !readOnly && setShowSurvey(!showSurvey); }} style={{ color: getContrastingTextColor(survey.appearance.widgetColor) }}>
                    <div className="ph-survey-widget-tab-icon"></div>
                    {((_c = survey.appearance) === null || _c === void 0 ? void 0 : _c.widgetLabel) || ''}
                </div>)}
            {showSurvey && (<SurveyPopup key={'feedback-widget-survey'} posthog={posthog} survey={survey} forceDisableHtml={forceDisableHtml} style={styleOverrides} removeSurveyFromFocus={removeSurveyFromFocus} isPopup={true}/>)}
        </>);
}
var getQuestionComponent = function (_a) {
    var _b, _c;
    var question = _a.question, forceDisableHtml = _a.forceDisableHtml, displayQuestionIndex = _a.displayQuestionIndex, appearance = _a.appearance, onSubmit = _a.onSubmit;
    var questionComponents = (_b = {},
        _b[SurveyQuestionType.Open] = OpenTextQuestion,
        _b[SurveyQuestionType.Link] = LinkQuestion,
        _b[SurveyQuestionType.Rating] = RatingQuestion,
        _b[SurveyQuestionType.SingleChoice] = MultipleChoiceQuestion,
        _b[SurveyQuestionType.MultipleChoice] = MultipleChoiceQuestion,
        _b);
    var commonProps = {
        question: question,
        forceDisableHtml: forceDisableHtml,
        appearance: appearance,
        onSubmit: onSubmit,
    };
    var additionalProps = (_c = {},
        _c[SurveyQuestionType.Open] = {},
        _c[SurveyQuestionType.Link] = {},
        _c[SurveyQuestionType.Rating] = { displayQuestionIndex: displayQuestionIndex },
        _c[SurveyQuestionType.SingleChoice] = { displayQuestionIndex: displayQuestionIndex },
        _c[SurveyQuestionType.MultipleChoice] = { displayQuestionIndex: displayQuestionIndex },
        _c);
    var Component = questionComponents[question.type];
    var componentProps = __assign(__assign({}, commonProps), additionalProps[question.type]);
    return <Component {...componentProps}/>;
};
//# sourceMappingURL=surveys.jsx.map