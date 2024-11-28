import { window } from '../../../utils/globals';
import { PostHogLogo } from './PostHogLogo';
import { useContext } from 'preact/hooks';
import { SurveyContext, defaultSurveyAppearance, getContrastingTextColor } from '../surveys-utils';
export function BottomSection(_a) {
    var text = _a.text, submitDisabled = _a.submitDisabled, appearance = _a.appearance, onSubmit = _a.onSubmit, link = _a.link;
    var _b = useContext(SurveyContext), isPreviewMode = _b.isPreviewMode, isPopup = _b.isPopup;
    var textColor = appearance.submitButtonTextColor ||
        getContrastingTextColor(appearance.submitButtonColor || defaultSurveyAppearance.submitButtonColor);
    return (<div className="bottom-section">
            <div className="buttons">
                <button className="form-submit" disabled={submitDisabled && !isPreviewMode} type="button" style={isPopup ? { color: textColor } : {}} onClick={function () {
            if (isPreviewMode)
                return;
            if (link) {
                window === null || window === void 0 ? void 0 : window.open(link);
            }
            onSubmit();
        }}>
                    {text}
                </button>
            </div>
            {!appearance.whiteLabel && <PostHogLogo />}
        </div>);
}
//# sourceMappingURL=BottomSection.jsx.map