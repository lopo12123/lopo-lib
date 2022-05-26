declare type resolveFn<T> = (result?: T) => any;
declare type rejectFn<T> = (reason?: T) => any;
/**
 * [Example & Test]{@link https://github.com/lopo12123/lopo-lib/blob/master/test/test-promiseLike.ts}
 * @description 实现原生promise的then功能
 * @example
 * import PromiseLike from "lopo-lib/lib/promiseLike";
 *
 * const p1 = () => new PromiseLike((resolve, reject) => {
 *     setTimeout(() => {
 *         resolve(1)
 *     }, 1000)
 * })
 *
 * const p2 = () => new PromiseLike((resolve, reject) => {
 *     setTimeout(() => {
 *         resolve(2)
 *     }, 1000)
 * })
 *
 * p1().then((res1) => {
 *     console.log(Date.now(), ': res1: ', res1)
 *     return p2()
 * }).then((res2) => {
 *     console.log(Date.now(), ': res2: ', res2)
 * })
 *
 * // 输出:
 * // 1651827350110 : res1:  1
 * // 1651827351118 : res2:  2
 */
declare class PromiseLike<Result, Reason> {
    #private;
    constructor(executor: (resolve: resolveFn<Result>, reject?: rejectFn<Reason>) => void);
    then(onFulFilled: resolveFn<Result>, onRejected?: rejectFn<Reason>): PromiseLike<unknown, unknown>;
}
export { PromiseLike };
