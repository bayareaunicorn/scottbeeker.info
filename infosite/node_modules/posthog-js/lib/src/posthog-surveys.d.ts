import { PostHog } from './posthog-core';
import { Survey, SurveyCallback, SurveyUrlMatchType } from './posthog-surveys-types';
import { SurveyEventReceiver } from './utils/survey-event-receiver';
import { DecideResponse } from './types';
export declare const surveyUrlValidationMap: Record<SurveyUrlMatchType, (conditionsUrl: string) => boolean>;
export declare class PostHogSurveys {
    private readonly instance;
    private _decideServerResponse?;
    _surveyEventReceiver: SurveyEventReceiver | null;
    private _surveyManager;
    constructor(instance: PostHog);
    afterDecideResponse(response: DecideResponse): void;
    reset(): void;
    loadIfEnabled(): void;
    getSurveys(callback: SurveyCallback, forceReload?: boolean): void;
    getActiveMatchingSurveys(callback: SurveyCallback, forceReload?: boolean): void;
    getNextSurveyStep(survey: Survey, currentQuestionIndex: number, response: string | string[] | number | null): any;
    private _canActivateRepeatedly;
    canRenderSurvey(surveyId: string): void;
    renderSurvey(surveyId: string, selector: string): void;
}
