import { RequestOptions } from './types';
export declare const SUPPORTS_REQUEST: boolean;
export declare const extendURLParams: (url: string, params: Record<string, any>) => string;
export declare const request: (_options: RequestOptions) => void;
