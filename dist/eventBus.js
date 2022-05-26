"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventBus = void 0;
/**
 * [Example & Test]{@link https://github.com/lopo12123/lopo-lib/blob/master/test/test-eventBus.ts}
 * @description [事件管理] on注册事件, off注销事件, emit触发事件.
 * @description `EventMap`(可选) 事件回调类型声明(type rather then interface), 可以提供完全的输入提示喝类型检查.
 * @example
 * import EventBus from "lopo-lib/lib/eventBus";
 *
 * // 添加事件类型定义 (可选)
 * type SomeEvents = {
 *     // 带参回调
 *     greet: (who: string) => void
 *     // 无参回调
 *     sayHi: () => void
 * }
 * // 事件回调
 * const greet = (who: string) => {
 *     console.log(`hello, ${who}!`)
 * }
 * const sayHi = () => {
 *     console.log('hi')
 * }
 *
 * const evBus = new EventBus<SomeEvents>()
 *
 * // 注册事件
 * evBus.on('greet', greet)
 * evBus.on('sayHi', sayHi)
 *
 * // 触发事件
 * evBus.emit('greet', 'lopo')  // hello, lopo!
 * evBus.emit('sayHi')  // hi
 *
 * // 注销事件
 * evBus.off('sayHi')
 *
 * // 触发事件
 * evBus.emit('greet', 'lopo')  // hello, lopo!
 * evBus.emit('sayHi')  // nothing happen
 */
class EventBus {
    #evMap;
    constructor() {
        this.#evMap = new Map();
    }
    /**
     * @description 注册事件回调
     * @param eventName 事件名
     * @param fn 事件触发时执行的回调
     */
    on(eventName, fn) {
        let currFns = this.#evMap.get(eventName);
        if (!!currFns)
            currFns.add(fn);
        else
            this.#evMap.set(eventName, new Set([fn]));
    }
    /**
     * @description 注销事件回调
     * @param eventName 事件名
     * @param fn (可选)注销的回调, 为空则移除所以此事件的回调
     */
    off(eventName, fn) {
        if (!fn)
            this.#evMap.delete(eventName);
        else
            this.#evMap.get(eventName)?.delete(fn);
    }
    /**
     * @description 触发指定事件的所有回调
     * @param eventName 事件名
     * @param args 回调的参数
     */
    emit(eventName, args) {
        this.#evMap.get(eventName)?.forEach((fn) => {
            fn(...args);
        });
    }
    /**
     * @description 递归释放所有的回调函数的引用
     */
    dispose() {
        this.#evMap.forEach((callbackSet) => {
            callbackSet.clear();
        });
        this.#evMap.clear();
    }
}
exports.EventBus = EventBus;
