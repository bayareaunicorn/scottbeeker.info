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
import { SurveyQuestionType, } from '../../../posthog-surveys-types';
import { useRef, useState, useMemo } from 'preact/hooks';
import { isNull, isArray } from '../../../utils/type-utils';
import { useContrastingTextColor } from '../hooks/useContrastingTextColor';
import { checkSVG, dissatisfiedEmoji, neutralEmoji, satisfiedEmoji, veryDissatisfiedEmoji, verySatisfiedEmoji, } from '../icons';
import { getDisplayOrderChoices } from '../surveys-utils';
import { BottomSection } from './BottomSection';
import { QuestionHeader } from './QuestionHeader';
export function OpenTextQuestion(_a) {
    var question = _a.question, forceDisableHtml = _a.forceDisableHtml, appearance = _a.appearance, onSubmit = _a.onSubmit;
    var textRef = useRef(null);
    var _b = __read(useState(''), 2), text = _b[0], setText = _b[1];
    return (<div ref={textRef}>
            <QuestionHeader question={question.question} description={question.description} descriptionContentType={question.descriptionContentType} backgroundColor={appearance.backgroundColor} forceDisableHtml={forceDisableHtml}/>
            <textarea rows={4} placeholder={appearance === null || appearance === void 0 ? void 0 : appearance.placeholder} onInput={function (e) { return setText(e.currentTarget.value); }}/>
            <BottomSection text={question.buttonText || 'Submit'} submitDisabled={!text && !question.optional} appearance={appearance} onSubmit={function () { return onSubmit(text); }}/>
        </div>);
}
export function LinkQuestion(_a) {
    var question = _a.question, forceDisableHtml = _a.forceDisableHtml, appearance = _a.appearance, onSubmit = _a.onSubmit;
    return (<>
            <QuestionHeader question={question.question} description={question.description} descriptionContentType={question.descriptionContentType} forceDisableHtml={forceDisableHtml}/>
            <BottomSection text={question.buttonText || 'Submit'} submitDisabled={false} link={question.link} appearance={appearance} onSubmit={function () { return onSubmit('link clicked'); }}/>
        </>);
}
export function RatingQuestion(_a) {
    var question = _a.question, forceDisableHtml = _a.forceDisableHtml, displayQuestionIndex = _a.displayQuestionIndex, appearance = _a.appearance, onSubmit = _a.onSubmit;
    var scale = question.scale;
    var starting = question.scale === 10 ? 0 : 1;
    var _b = __read(useState(null), 2), rating = _b[0], setRating = _b[1];
    return (<>
            <QuestionHeader question={question.question} description={question.description} descriptionContentType={question.descriptionContentType} forceDisableHtml={forceDisableHtml} backgroundColor={appearance.backgroundColor}/>
            <div className="rating-section">
                <div className="rating-options">
                    {question.display === 'emoji' && (<div className="rating-options-emoji">
                            {(question.scale === 3 ? threeScaleEmojis : fiveScaleEmojis).map(function (emoji, idx) {
                var active = idx + 1 === rating;
                return (<button className={"ratings-emoji question-".concat(displayQuestionIndex, "-rating-").concat(idx, " ").concat(active ? 'rating-active' : null)} value={idx + 1} key={idx} type="button" onClick={function () {
                        setRating(idx + 1);
                    }} style={{
                        fill: active
                            ? appearance.ratingButtonActiveColor
                            : appearance.ratingButtonColor,
                        borderColor: appearance.borderColor,
                    }}>
                                        {emoji}
                                    </button>);
            })}
                        </div>)}
                    {question.display === 'number' && (<div className="rating-options-number" style={{ gridTemplateColumns: "repeat(".concat(scale - starting + 1, ", minmax(0, 1fr))") }}>
                            {getScaleNumbers(question.scale).map(function (number, idx) {
                var active = rating === number;
                return (<RatingButton key={idx} displayQuestionIndex={displayQuestionIndex} active={active} appearance={appearance} num={number} setActiveNumber={function (num) {
                        setRating(num);
                    }}/>);
            })}
                        </div>)}
                </div>
                <div className="rating-text">
                    <div>{question.lowerBoundLabel}</div>
                    <div>{question.upperBoundLabel}</div>
                </div>
            </div>
            <BottomSection text={question.buttonText || (appearance === null || appearance === void 0 ? void 0 : appearance.submitButtonText) || 'Submit'} submitDisabled={isNull(rating) && !question.optional} appearance={appearance} onSubmit={function () { return onSubmit(rating); }}/>
        </>);
}
export function RatingButton(_a) {
    var num = _a.num, active = _a.active, displayQuestionIndex = _a.displayQuestionIndex, appearance = _a.appearance, setActiveNumber = _a.setActiveNumber;
    var _b = useContrastingTextColor({ appearance: appearance, defaultTextColor: 'black', forceUpdate: active }), textColor = _b.textColor, ref = _b.ref;
    return (<button ref={ref} className={"ratings-number question-".concat(displayQuestionIndex, "-rating-").concat(num, " ").concat(active ? 'rating-active' : null)} type="button" onClick={function () {
            setActiveNumber(num);
        }} style={{
            color: textColor,
            backgroundColor: active ? appearance.ratingButtonActiveColor : appearance.ratingButtonColor,
            borderColor: appearance.borderColor,
        }}>
            {num}
        </button>);
}
export function MultipleChoiceQuestion(_a) {
    var question = _a.question, forceDisableHtml = _a.forceDisableHtml, displayQuestionIndex = _a.displayQuestionIndex, appearance = _a.appearance, onSubmit = _a.onSubmit;
    var textRef = useRef(null);
    var choices = useMemo(function () { return getDisplayOrderChoices(question); }, [question]);
    var _b = __read(useState(question.type === SurveyQuestionType.MultipleChoice ? [] : null), 2), selectedChoices = _b[0], setSelectedChoices = _b[1];
    var _c = __read(useState(false), 2), openChoiceSelected = _c[0], setOpenChoiceSelected = _c[1];
    var _d = __read(useState(''), 2), openEndedInput = _d[0], setOpenEndedInput = _d[1];
    var inputType = question.type === SurveyQuestionType.SingleChoice ? 'radio' : 'checkbox';
    return (<div ref={textRef}>
            <QuestionHeader question={question.question} description={question.description} descriptionContentType={question.descriptionContentType} forceDisableHtml={forceDisableHtml} backgroundColor={appearance.backgroundColor}/>
            <div className="multiple-choice-options">
                {/* Remove the last element from the choices, if hasOpenChoice is set */}
                {/* shuffle all other options here if question.shuffleOptions is set */}
                {/* Always ensure that the open ended choice is the last option */}
                {choices.map(function (choice, idx) {
            var choiceClass = 'choice-option';
            var val = choice;
            var option = choice;
            if (!!question.hasOpenChoice && idx === question.choices.length - 1) {
                choiceClass += ' choice-option-open';
            }
            return (<div className={choiceClass}>
                            <input type={inputType} id={"surveyQuestion".concat(displayQuestionIndex, "Choice").concat(idx)} name={"question".concat(displayQuestionIndex)} value={val} disabled={!val} onInput={function () {
                    if (question.hasOpenChoice && idx === question.choices.length - 1) {
                        return setOpenChoiceSelected(!openChoiceSelected);
                    }
                    if (question.type === SurveyQuestionType.SingleChoice) {
                        return setSelectedChoices(val);
                    }
                    if (question.type === SurveyQuestionType.MultipleChoice &&
                        isArray(selectedChoices)) {
                        if (selectedChoices.includes(val)) {
                            // filter out values because clicking on a selected choice should deselect it
                            return setSelectedChoices(selectedChoices.filter(function (choice) { return choice !== val; }));
                        }
                        return setSelectedChoices(__spreadArray(__spreadArray([], __read(selectedChoices), false), [val], false));
                    }
                }}/>
                            <label htmlFor={"surveyQuestion".concat(displayQuestionIndex, "Choice").concat(idx)} style={{ color: 'black' }}>
                                {question.hasOpenChoice && idx === question.choices.length - 1 ? (<>
                                        <span>{option}:</span>
                                        <input type="text" id={"surveyQuestion".concat(displayQuestionIndex, "Choice").concat(idx, "Open")} name={"question".concat(displayQuestionIndex)} onInput={function (e) {
                        var userValue = e.currentTarget.value;
                        if (question.type === SurveyQuestionType.SingleChoice) {
                            return setSelectedChoices(userValue);
                        }
                        if (question.type === SurveyQuestionType.MultipleChoice &&
                            isArray(selectedChoices)) {
                            return setOpenEndedInput(userValue);
                        }
                    }}/>
                                    </>) : (option)}
                            </label>
                            <span className="choice-check" style={{ color: 'black' }}>
                                {checkSVG}
                            </span>
                        </div>);
        })}
            </div>
            <BottomSection text={question.buttonText || 'Submit'} submitDisabled={(isNull(selectedChoices) ||
            (isArray(selectedChoices) && !openChoiceSelected && selectedChoices.length === 0) ||
            (isArray(selectedChoices) &&
                openChoiceSelected &&
                !openEndedInput &&
                selectedChoices.length === 0 &&
                !question.optional)) &&
            !question.optional} appearance={appearance} onSubmit={function () {
            if (openChoiceSelected && question.type === SurveyQuestionType.MultipleChoice) {
                if (isArray(selectedChoices)) {
                    onSubmit(__spreadArray(__spreadArray([], __read(selectedChoices), false), [openEndedInput], false));
                }
            }
            else {
                onSubmit(selectedChoices);
            }
        }}/>
        </div>);
}
var threeScaleEmojis = [dissatisfiedEmoji, neutralEmoji, satisfiedEmoji];
var fiveScaleEmojis = [veryDissatisfiedEmoji, dissatisfiedEmoji, neutralEmoji, satisfiedEmoji, verySatisfiedEmoji];
var fiveScaleNumbers = [1, 2, 3, 4, 5];
var sevenScaleNumbers = [1, 2, 3, 4, 5, 6, 7];
var tenScaleNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
function getScaleNumbers(scale) {
    switch (scale) {
        case 5:
            return fiveScaleNumbers;
        case 7:
            return sevenScaleNumbers;
        case 10:
            return tenScaleNumbers;
        default:
            return fiveScaleNumbers;
    }
}
//# sourceMappingURL=QuestionTypes.jsx.map