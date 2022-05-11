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
declare class EventBus<EventMap extends {
    [k: string]: (...args: any[]) => void;
}> {
    #private;
    constructor();
    /**
     * @description 注册事件回调
     * @param eventName 事件名
     * @param fn 事件触发时执行的回调
     */
    on<EvName extends keyof EventMap>(eventName: EvName, fn: EventMap[EvName]): void;
    /**
     * @description 注销事件回调
     * @param eventName 事件名
     * @param fn (可选)注销的回调, 为空则移除所以此事件的回调
     */
    off<EvName extends keyof EventMap>(eventName: EvName, fn?: EventMap[EvName]): void;
    /**
     * @description 触发指定事件的所有回调
     * @param eventName 事件名
     * @param args 回调的参数
     */
    emit<EvName extends keyof EventMap>(eventName: EvName, args: Parameters<EventMap[EvName]>): void;
    /**
     * @description 递归释放所有的回调函数的引用
     */
    dispose(): void;
}
export default EventBus;
