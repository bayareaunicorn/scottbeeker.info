import { PostHog } from './posthog-core';
import { DecideResponse } from './types';
export declare class Decide {
    private readonly instance;
    constructor(instance: PostHog);
    call(): void;
    parseDecideResponse(response?: DecideResponse): void;
}
