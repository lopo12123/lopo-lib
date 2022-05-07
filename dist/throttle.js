"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * [Example & Test]{@link https://github.com/lopo12123/lopo-lib/blob/master/test/test-throttle.ts}
 * @description [节流] 触发结束后空闲时长达到 min_trigger 后才能再次触发, 否则忽略掉本次调用
 * @param fn 触发函数
 * @param min_gap 最小触发间隔 (单位: ms)
 * @example
 * import debounce from "lopo-lib/lib/throttle";
 *
 * // 使用throttle包裹目标函数
 * const logger = throttle((trigger: number) => {
 *     console.log('function in throttle, now in trigger ', trigger)
 * }, 1000)
 *
 * let trigger_count = 0
 *
 * // 使用interval模拟频繁调用
 * const timer = setInterval(() => {
 *     console.log('now in trigger ', trigger_count)
 *     logger(trigger_count)
 *     if(trigger_count++ > 4) clearInterval(timer)
 * }, 500)
 */
const throttle = (fn, min_gap) => {
    let throttle_timer = Date.now();
    return (...args) => {
        if (Date.now() - throttle_timer > min_gap) {
            fn(...args);
            throttle_timer = Date.now();
        }
    };
};
exports.default = throttle;
