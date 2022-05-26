/**
 * [Example & Test]{@link https://github.com/lopo12123/lopo-lib/blob/master/test/test-debounce.ts}
 * @description [防抖] 触发后静置时长达到 min_hold 后执行, 否则认为是抖动并忽略
 * @param fn 触发函数
 * @param min_hold 最小维持时间 (单位: ms)
 * @example
 * import debounce from "lopo-lib/lib/debounce";
 *
 * // 使用debounce包裹目标函数
 * const logger = debounce((trigger: number) => {
 *    console.log('function in debounce, now in trigger ', trigger)
 * }, 1000)
 *
 * let trigger_count = 0
 *
 * // 使用interval模拟频繁抖动
 * const timer = setInterval(() => {
 *     console.log('now in trigger ', trigger_count)
 *     logger(trigger_count)
 *     if(trigger_count++ > 4) clearInterval(timer)
 * }, 500)
 */
declare const debounce: <Args extends any[]>(fn: (...args: Args) => void, min_hold: number) => (...args: Args) => void;
export { debounce };
