/**
 * [Example & Test]{@link https://github.com/lopo12123/lopo-lib/blob/master/test/test-clone.ts}
 * @description [克隆] 使用 Reflect 实现. 键(string、symbol), 值(全部类型)
 * @param obj 原始输入 (支持任意类型)
 * @param cache 缓存 (避免循环引用导致递归进入死循环)
 * @example
 * import { clone_deep } from "lopo-lib/lib/clone";
 *
 * const obj_deep = {
 *     name: 'obj deep',
 *     age: 12,
 *     big: 456n,
 *     greet: (who: string) => {
 *         return `hello ${who}!`
 *     },
 *     symbol: Symbol('symbol as value'),
 *     [Symbol('symbol as key')]: 'symbol as key'
 * }
 * console.log(clone_deep(obj_deep))
 */
declare const clone_deep: <T extends unknown>(obj: T, cache?: WeakMap<object, object>) => T;
/**
 * [Example & Test]{@link https://github.com/lopo12123/lopo-lib/blob/master/test/test-clone.ts}
 * @description [克隆] 使用JSON实现, 会丢失symbol、function等内容.
 * @param obj 原始输入 (不支持 bigInt类型)
 * @example
 * import { clone_json } from "lopo-lib/lib/clone";
 *
 * const obj_json = {
 *     name: 'obj json',
 *     age: 11,
 *     gender: true
 * }
 * console.log(clone_json(obj_json))
 */
declare const clone_json: <T>(obj: T) => T;
export { clone_deep, clone_json };
