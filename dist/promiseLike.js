"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromiseLike = void 0;
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
class PromiseLike {
    #status = 'pending';
    #result = undefined;
    #resolveCallback = undefined;
    #reason = undefined;
    #rejectCallback = undefined;
    constructor(executor) {
        try {
            executor((result) => {
                this.#result = result;
                this.#status = 'fulfilled';
                this.#resolveCallback?.();
            }, (reason) => {
                this.#reason = reason;
                this.#status = 'rejected';
                this.#rejectCallback?.();
            });
        }
        catch (e) {
            this.#status = 'rejected';
            this.#reason = e;
        }
    }
    then(onFulFilled, onRejected) {
        return new PromiseLike((resolve, reject) => {
            if (this.#status === 'fulfilled') {
                const thisResult = onFulFilled(this.#result);
                thisResult instanceof PromiseLike ? thisResult.then(resolve, reject) : resolve(thisResult);
            }
            else if (this.#status === 'rejected' && !!onRejected) {
                const thisReason = onRejected(this.#reason);
                thisReason instanceof PromiseLike ? thisReason.then(resolve, reject) : reject?.(thisReason);
            }
            else {
                this.#resolveCallback = () => {
                    const thisResult = onFulFilled(this.#result);
                    thisResult instanceof PromiseLike ? thisResult.then(resolve, reject) : resolve(thisResult);
                };
                this.#rejectCallback = () => {
                    const thisReason = onRejected?.(this.#reason);
                    thisReason instanceof PromiseLike ? thisReason.then(resolve, reject) : reject?.(thisReason);
                };
            }
        });
    }
}
exports.PromiseLike = PromiseLike;
