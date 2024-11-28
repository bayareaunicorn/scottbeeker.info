import { BasicSurveyQuestion, SurveyAppearance, LinkSurveyQuestion, RatingSurveyQuestion, MultipleSurveyQuestion } from '../../../posthog-surveys-types';
export declare function OpenTextQuestion({ question, forceDisableHtml, appearance, onSubmit, }: {
    question: BasicSurveyQuestion;
    forceDisableHtml: boolean;
    appearance: SurveyAppearance;
    onSubmit: (text: string) => void;
}): JSX.Element;
export declare function LinkQuestion({ question, forceDisableHtml, appearance, onSubmit, }: {
    question: LinkSurveyQuestion;
    forceDisableHtml: boolean;
    appearance: SurveyAppearance;
    onSubmit: (clicked: string) => void;
}): JSX.Element;
export declare function RatingQuestion({ question, forceDisableHtml, displayQuestionIndex, appearance, onSubmit, }: {
    question: RatingSurveyQuestion;
    forceDisableHtml: boolean;
    displayQuestionIndex: number;
    appearance: SurveyAppearance;
    onSubmit: (rating: number | null) => void;
}): JSX.Element;
export declare function RatingButton({ num, active, displayQuestionIndex, appearance, setActiveNumber, }: {
    num: number;
    active: boolean;
    displayQuestionIndex: number;
    appearance: SurveyAppearance;
    setActiveNumber: (num: number) => void;
}): JSX.Element;
export declare function MultipleChoiceQuestion({ question, forceDisableHtml, displayQuestionIndex, appearance, onSubmit, }: {
    question: MultipleSurveyQuestion;
    forceDisableHtml: boolean;
    displayQuestionIndex: number;
    appearance: SurveyAppearance;
    onSubmit: (choices: string | string[] | null) => void;
}): JSX.Element;
