import { SurveyAppearance } from '../../../posthog-surveys-types';
export declare function BottomSection({ text, submitDisabled, appearance, onSubmit, link, }: {
    text: string;
    submitDisabled: boolean;
    appearance: SurveyAppearance;
    onSubmit: () => void;
    link?: string | null;
}): JSX.Element;
