import { PromiseLike } from "../lib/promiseLike";

/**
 * @example
 * // 输出
 * 1651827350110 : res1:  1
 * 1651827351118 : res2:  2
 */
const do_test = () => {
    const p1 = () => new PromiseLike((resolve, reject) => {
        setTimeout(() => {
            resolve(1)
        }, 1000)
    })

    const p2 = () => new PromiseLike((resolve, reject) => {
        setTimeout(() => {
            resolve(2)
        }, 1000)
    })

    p1().then((res1) => {
        console.log(Date.now(), ': res1: ', res1)
        return p2()
    }).then((res2) => {
        console.log(Date.now(), ': res2: ', res2)
    })
}

do_test()