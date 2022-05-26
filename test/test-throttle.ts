import { throttle } from "../lib/throttle";

/**
 * @example
 * // 运行`ts-node test-throttle.ts`
 * // 输出:
 * now in trigger  0
 * now in trigger  1
 * function in throttle, now in trigger  1
 * now in trigger  2
 * now in trigger  3
 * function in throttle, now in trigger  3
 * now in trigger  4
 * now in trigger  5
 * function in throttle, now in trigger  5
 */
const do_test = () => {
    // 使用throttle包裹目标函数
    const logger = throttle((trigger: number) => {
        console.log('function in throttle, now in trigger ', trigger)
    }, 1000)

    let trigger_count = 0

    // 使用interval模拟频繁调用
    const timer = setInterval(() => {
        console.log('now in trigger ', trigger_count)
        logger(trigger_count)
        if(trigger_count++ > 4) clearInterval(timer)
    }, 500)
}

do_test()