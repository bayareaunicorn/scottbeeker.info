var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
import { Compression } from './types';
import { STORED_GROUP_PROPERTIES_KEY, STORED_PERSON_PROPERTIES_KEY } from './constants';
import { logger } from './utils/logger';
import { document, assignableWindow } from './utils/globals';
var Decide = /** @class */ (function () {
    function Decide(instance) {
        this.instance = instance;
        // don't need to wait for `decide` to return if flags were provided on initialisation
        this.instance.decideEndpointWasHit = this.instance._hasBootstrappedFeatureFlags();
    }
    Decide.prototype.call = function () {
        var _this = this;
        /*
        Calls /decide endpoint to fetch options for autocapture, session recording, feature flags & compression.
        */
        var data = {
            token: this.instance.config.token,
            distinct_id: this.instance.get_distinct_id(),
            groups: this.instance.getGroups(),
            person_properties: this.instance.get_property(STORED_PERSON_PROPERTIES_KEY),
            group_properties: this.instance.get_property(STORED_GROUP_PROPERTIES_KEY),
            disable_flags: this.instance.config.advanced_disable_feature_flags ||
                this.instance.config.advanced_disable_feature_flags_on_first_load ||
                undefined,
        };
        this.instance._send_request({
            method: 'POST',
            url: this.instance.requestRouter.endpointFor('api', '/decide/?v=3'),
            data: data,
            compression: this.instance.config.disable_compression ? undefined : Compression.Base64,
            timeout: this.instance.config.feature_flag_request_timeout_ms,
            callback: function (response) { return _this.parseDecideResponse(response.json); },
        });
    };
    Decide.prototype.parseDecideResponse = function (response) {
        var e_1, _a;
        var _this = this;
        var _b, _c;
        this.instance.featureFlags.setReloadingPaused(false);
        // :TRICKY: Reload - start another request if queued!
        this.instance.featureFlags._startReloadTimer();
        var errorsLoading = !response;
        if (!this.instance.config.advanced_disable_feature_flags_on_first_load &&
            !this.instance.config.advanced_disable_feature_flags) {
            this.instance.featureFlags.receivedFeatureFlags(response !== null && response !== void 0 ? response : {}, errorsLoading);
        }
        if (errorsLoading) {
            logger.error('Failed to fetch feature flags from PostHog.');
            return;
        }
        if (!(document && document.body)) {
            logger.info('document not ready yet, trying again in 500 milliseconds...');
            setTimeout(function () {
                _this.parseDecideResponse(response);
            }, 500);
            return;
        }
        this.instance._afterDecideResponse(response);
        if (response['siteApps']) {
            if (this.instance.config.opt_in_site_apps) {
                var _loop_1 = function (id, url) {
                    assignableWindow["__$$ph_site_app_".concat(id)] = this_1.instance;
                    (_c = (_b = assignableWindow.__PosthogExtensions__) === null || _b === void 0 ? void 0 : _b.loadSiteApp) === null || _c === void 0 ? void 0 : _c.call(_b, this_1.instance, url, function (err) {
                        if (err) {
                            return logger.error("Error while initializing PostHog app with config id ".concat(id), err);
                        }
                    });
                };
                var this_1 = this;
                try {
                    for (var _d = __values(response['siteApps']), _e = _d.next(); !_e.done; _e = _d.next()) {
                        var _f = _e.value, id = _f.id, url = _f.url;
                        _loop_1(id, url);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_e && !_e.done && (_a = _d.return)) _a.call(_d);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
            else if (response['siteApps'].length > 0) {
                logger.error('PostHog site apps are disabled. Enable the "opt_in_site_apps" config to proceed.');
            }
        }
    };
    return Decide;
}());
export { Decide };
//# sourceMappingURL=decide.js.map