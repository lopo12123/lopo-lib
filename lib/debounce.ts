/**
 * [Example & Test]{@link https://github.com/lopo12123/lopo-lib/blob/master/test/test-debounce.ts}
 * @description [防抖] min_trigger(ms)时间间隔内最多执行一次fn
 * @param fn 触发函数
 * @param min_trigger 最小触发时间间隔 (单位: ms)
 * @example
 * import debounce from "lopo-lib/lib/debounce";
 *
 * // 使用debounce包裹目标函数
 * const logger = debounce((loop: number) => {
 *     console.log('function in debounce, now in loop ', loop)
 * }, 1000)
 *
 * let loop_count = 0
 * // 使用interval模拟频繁触发的事件
 * const timer = setInterval(() => {
 *     console.log('now in loop ', loop_count)
 *     logger(loop_count)
 *     if(loop_count ++ > 4) clearInterval(timer)
 * }, 500)
 */
const debounce = <Args extends Array<any>>(fn: (...args: Args) => void, min_trigger: number) => {
    let block_timer: any = null
    return (...args: Args) => {
        if(block_timer === null) {
            fn(...args)

            block_timer = setTimeout(() => {
                block_timer = null
                clearTimeout(block_timer)
            }, min_trigger)
        }
    }
}

export default debounce