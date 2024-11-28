import { PostHog } from '../../posthog-core';
import { DecideResponse } from '../../types';
import { EventType, type eventWithTime, IncrementalSource } from '@rrweb/types';
type SessionStartReason = 'sampling_override' | 'recording_initialized' | 'linked_flag_match' | 'linked_flag_override' | 'sampling' | 'session_id_changed';
export declare const RECORDING_IDLE_THRESHOLD_MS: number;
export declare const RECORDING_MAX_EVENT_SIZE: number;
export declare const RECORDING_BUFFER_TIMEOUT = 2000;
export declare const SESSION_RECORDING_BATCH_KEY = "recordings";
export interface SnapshotBuffer {
    size: number;
    data: any[];
    sessionId: string;
    windowId: string;
}
type compressedFullSnapshotEvent = {
    type: EventType.FullSnapshot;
    data: string;
};
type compressedIncrementalSnapshotEvent = {
    type: EventType.IncrementalSnapshot;
    data: {
        source: IncrementalSource;
        texts: string;
        attributes: string;
        removes: string;
        adds: string;
    };
};
type compressedIncrementalStyleSnapshotEvent = {
    type: EventType.IncrementalSnapshot;
    data: {
        source: IncrementalSource.StyleSheetRule;
        id?: number;
        styleId?: number;
        replace?: string;
        replaceSync?: string;
        adds: string;
        removes: string;
    };
};
export type compressedEvent = compressedIncrementalStyleSnapshotEvent | compressedFullSnapshotEvent | compressedIncrementalSnapshotEvent;
export type compressedEventWithTime = compressedEvent & {
    timestamp: number;
    delay?: number;
    cv: '2024-10';
};
export declare class SessionRecording {
    private readonly instance;
    private _endpoint;
    private flushBufferTimer?;
    private buffer;
    private queuedRRWebEvents;
    private mutationRateLimiter?;
    private _captureStarted;
    private stopRrweb;
    private receivedDecide;
    private isIdle;
    private _linkedFlagSeen;
    private _lastActivityTimestamp;
    private windowId;
    private sessionId;
    private _linkedFlag;
    private _fullSnapshotTimer?;
    private _removePageViewCaptureHook;
    private _onSessionIdListener;
    private _persistDecideOnSessionListener;
    private _samplingSessionListener;
    private _lastHref?;
    private _urlTriggers;
    _forceAllowLocalhostNetworkCapture: boolean;
    private get sessionIdleThresholdMilliseconds();
    private get rrwebRecord();
    get started(): boolean;
    private get sessionManager();
    private get fullSnapshotIntervalMillis();
    private get isSampled();
    private get sessionDuration();
    private get isRecordingEnabled();
    private get isConsoleLogCaptureEnabled();
    private get canvasRecording();
    private get networkPayloadCapture();
    private get sampleRate();
    private get minimumDuration();
    /**
     * defaults to buffering mode until a decide response is received
     * once a decide response is received status can be disabled, active or sampled
     */
    private get status();
    private get urlTriggerStatus();
    private set urlTriggerStatus(value);
    constructor(instance: PostHog);
    private _onBeforeUnload;
    private _onOffline;
    private _onOnline;
    private _onVisibilityChange;
    startIfEnabledOrStop(startReason?: SessionStartReason): void;
    stopRecording(): void;
    private makeSamplingDecision;
    afterDecideResponse(response: DecideResponse): void;
    /**
     * This might be called more than once so needs to be idempotent
     */
    private _setupSampling;
    private _persistDecideResponse;
    log(message: string, level?: 'log' | 'warn' | 'error'): void;
    private _startCapture;
    private isInteractiveEvent;
    private _updateWindowAndSessionIds;
    private _tryRRWebMethod;
    private _tryAddCustomEvent;
    private _tryTakeFullSnapshot;
    private _onScriptLoaded;
    private _scheduleFullSnapshot;
    private _gatherRRWebPlugins;
    onRRwebEmit(rawEvent: eventWithTime): void;
    private _pageViewFallBack;
    private _processQueuedEvents;
    private _maskUrl;
    private clearBuffer;
    private _flushBuffer;
    private _captureSnapshotBuffered;
    private _captureSnapshot;
    private _checkUrlTrigger;
    private _activateUrlTrigger;
    /**
     * this ignores the linked flag config and causes capture to start
     * (if recording would have started had the flag been received i.e. it does not override other config).
     *
     * It is not usual to call this directly,
     * instead call `posthog.startSessionRecording({linked_flag: true})`
     * */
    overrideLinkedFlag(): void;
    /**
     * this ignores the sampling config and causes capture to start
     * (if recording would have started had the flag been received i.e. it does not override other config).
     *
     * It is not usual to call this directly,
     * instead call `posthog.startSessionRecording({sampling: true})`
     * */
    overrideSampling(): void;
    private _reportStarted;
}
export {};
