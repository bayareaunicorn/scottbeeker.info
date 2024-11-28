/**
 * Having Survey types in types.ts was confusing tsc
 * and generating an invalid module.d.ts
 * See https://github.com/PostHog/posthog-js/issues/698
 */
export var SurveyType;
(function (SurveyType) {
    SurveyType["Popover"] = "popover";
    SurveyType["API"] = "api";
    SurveyType["Widget"] = "widget";
})(SurveyType || (SurveyType = {}));
export var SurveyQuestionType;
(function (SurveyQuestionType) {
    SurveyQuestionType["Open"] = "open";
    SurveyQuestionType["MultipleChoice"] = "multiple_choice";
    SurveyQuestionType["SingleChoice"] = "single_choice";
    SurveyQuestionType["Rating"] = "rating";
    SurveyQuestionType["Link"] = "link";
})(SurveyQuestionType || (SurveyQuestionType = {}));
export var SurveyQuestionBranchingType;
(function (SurveyQuestionBranchingType) {
    SurveyQuestionBranchingType["NextQuestion"] = "next_question";
    SurveyQuestionBranchingType["End"] = "end";
    SurveyQuestionBranchingType["ResponseBased"] = "response_based";
    SurveyQuestionBranchingType["SpecificQuestion"] = "specific_question";
})(SurveyQuestionBranchingType || (SurveyQuestionBranchingType = {}));
//# sourceMappingURL=posthog-surveys-types.js.map