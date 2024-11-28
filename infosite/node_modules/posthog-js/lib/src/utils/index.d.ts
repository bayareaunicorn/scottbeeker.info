import { Breaker, EventHandler, Properties } from '../types';
export declare const trim: (str: string) => string;
export declare function eachArray<E = any>(obj: E[] | null | undefined, iterator: (value: E, key: number) => void | Breaker, thisArg?: any): void;
/**
 * @param {*=} obj
 * @param {function(...*)=} iterator
 * @param {Object=} thisArg
 */
export declare function each(obj: any, iterator: (value: any, key: any) => void | Breaker, thisArg?: any): void;
export declare const extend: (obj: Record<string, any>, ...args: Record<string, any>[]) => Record<string, any>;
export declare const include: (obj: null | string | Array<any> | Record<string, any>, target: any) => boolean | Breaker;
export declare function includes<T = any>(str: T[] | string, needle: T): boolean;
/**
 * Object.entries() polyfill
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
 */
export declare function entries<T = any>(obj: Record<string, T>): [string, T][];
export declare const isValidRegex: (str: string) => boolean;
export declare const trySafe: <T>(fn: () => T) => T | undefined;
export declare const safewrap: <F extends (...args: any[]) => any = (...args: any[]) => any>(f: F) => F;
export declare const safewrapClass: (klass: Function, functions: string[]) => void;
export declare const stripEmptyProperties: (p: Properties) => Properties;
export declare const stripLeadingDollar: (s: string) => string;
export declare function _copyAndTruncateStrings<T extends Record<string, any> = Record<string, any>>(object: T, maxStringLength: number | null): T;
export declare function _base64Encode(data: null): null;
export declare function _base64Encode(data: undefined): undefined;
export declare function _base64Encode(data: string): string;
export declare const utf8Encode: (string: string) => string;
export declare const registerEvent: (element: Element | Window | Document | Node, type: string, handler: EventHandler, oldSchool?: boolean, useCapture?: boolean) => void;
export declare function isCrossDomainCookie(documentLocation: Location | undefined): boolean;
export declare function isDistinctIdStringLike(value: string): boolean;
export declare function find<T>(value: T[], predicate: (value: T) => boolean): T | undefined;
