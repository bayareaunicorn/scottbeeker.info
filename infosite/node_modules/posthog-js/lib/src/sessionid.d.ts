import { PostHogPersistence } from './posthog-persistence';
import { PostHogConfig, SessionIdChangedCallback } from './types';
export declare class SessionIdManager {
    private readonly _sessionIdGenerator;
    private readonly _windowIdGenerator;
    private config;
    private persistence;
    private _windowId;
    private _sessionId;
    private readonly _window_id_storage_key;
    private readonly _primary_window_exists_storage_key;
    private _sessionStartTimestamp;
    private _sessionActivityTimestamp;
    private _sessionIdChangedHandlers;
    private readonly _sessionTimeoutMs;
    constructor(config: Partial<PostHogConfig>, persistence: PostHogPersistence, sessionIdGenerator?: () => string, windowIdGenerator?: () => string);
    get sessionTimeoutMs(): number;
    onSessionId(callback: SessionIdChangedCallback): () => void;
    private _canUseSessionStorage;
    private _setWindowId;
    private _getWindowId;
    private _setSessionId;
    private _getSessionId;
    resetSessionId(): void;
    private _listenToReloadWindow;
    checkAndGetSessionAndWindowId(readOnly?: boolean, _timestamp?: number | null): {
        sessionId: string;
        windowId: string;
        sessionStartTimestamp: number;
        changeReason: {
            noSessionId: boolean;
            activityTimeout: boolean;
            sessionPastMaximumLength: boolean;
        } | undefined;
        lastActivityTimestamp: number;
    };
}
