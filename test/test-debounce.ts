import debounce from "../lib/debounce";

/**
 * @example
 * // 运行`ts-node test-debounce.ts`
 * // 输出:
 * now in loop  0
 * function in debounce, now in loop  0
 * now in loop  1
 * now in loop  2
 * function in debounce, now in loop  2
 * now in loop  3
 * now in loop  4
 * function in debounce, now in loop  4
 * now in loop  5
 */
const do_test = () => {
    // 使用debounce包裹目标函数
    const logger = debounce((loop: number) => {
        console.log('function in debounce, now in loop ', loop)
    }, 1000)

    let loop_count = 0

    // 使用interval模拟频繁触发的事件
    const timer = setInterval(() => {
        console.log('now in loop ', loop_count)
        logger(loop_count)
        if(loop_count++ > 4) clearInterval(timer)
    }, 500)
}

do_test()