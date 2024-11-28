/**
 * Integrate Sentry with PostHog. This will add a direct link to the person in Sentry, and an $exception event in PostHog
 *
 * ### Usage
 *
 *     Sentry.init({
 *          dsn: 'https://example',
 *          integrations: [
 *              new posthog.SentryIntegration(posthog)
 *          ]
 *     })
 *
 * @param {Object} [posthog] The posthog object
 * @param {string} [organization] Optional: The Sentry organization, used to send a direct link from PostHog to Sentry
 * @param {Number} [projectId] Optional: The Sentry project id, used to send a direct link from PostHog to Sentry
 * @param {string} [prefix] Optional: Url of a self-hosted sentry instance (default: https://sentry.io/organizations/)
 */
import { PostHog } from '../posthog-core';
import { SeverityLevel } from '../types';
type _SentryEvent = any;
type _SentryEventProcessor = any;
type _SentryHub = any;
interface _SentryIntegrationClass {
    name: string;
    setupOnce(addGlobalEventProcessor: (callback: _SentryEventProcessor) => void, getCurrentHub: () => _SentryHub): void;
}
interface _SentryIntegration {
    name: string;
    processEvent(event: _SentryEvent): _SentryEvent;
}
export type SentryIntegrationOptions = {
    organization?: string;
    projectId?: number;
    prefix?: string;
    /**
     * By default, only errors are sent to PostHog. You can set this to '*' to send all events.
     * Or to an error of SeverityLevel to only send events matching the provided levels.
     * e.g. ['error', 'fatal'] to send only errors and fatals
     * e.g. ['error'] to send only errors -- the default when omitted
     * e.g. '*' to send all events
     */
    severityAllowList?: SeverityLevel[] | '*';
};
export declare function createEventProcessor(_posthog: PostHog, { organization, projectId, prefix, severityAllowList }?: SentryIntegrationOptions): (event: _SentryEvent) => _SentryEvent;
export declare function sentryIntegration(_posthog: PostHog, options?: SentryIntegrationOptions): _SentryIntegration;
export declare class SentryIntegration implements _SentryIntegrationClass {
    name: string;
    setupOnce: (addGlobalEventProcessor: (callback: _SentryEventProcessor) => void, getCurrentHub: () => _SentryHub) => void;
    constructor(_posthog: PostHog, organization?: string, projectId?: number, prefix?: string, 
    /**
     * By default, only errors are sent to PostHog. You can set this to '*' to send all events.
     * Or to an error of SeverityLevel to only send events matching the provided levels.
     * e.g. ['error', 'fatal'] to send only errors and fatals
     * e.g. ['error'] to send only errors -- the default when omitted
     * e.g. '*' to send all events
     */
    severityAllowList?: SeverityLevel[] | '*');
}
export {};
