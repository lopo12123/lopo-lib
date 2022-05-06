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
const clone_deep = <T extends any>(obj: T, cache: WeakMap<object, object> = new WeakMap()): T => {
    // Function 构造新函数返回
    if(typeof obj === 'function') return new Function('return ' + obj.toString())()

    // null 或 string number bigInt boolean symbol 等基本类型  - 直接返回
    if(obj === null || typeof obj !== 'object') return obj

    // Object[Date] obj作为值构造新对象后返回
    if(obj instanceof Date) return new Date(obj) as T

    // Object[RegExp] obj作为值构造新对象后返回
    if(obj instanceof RegExp) return new RegExp(obj) as T

    // 如果存在循环引用 则在缓存中查找目标并返回其克隆
    if(cache.has(obj as object)) return cache.get(obj as object) as T

    // 如果不存在循环引用 则将当前对象及其克隆进行缓存
    let cloneObj = (obj as object).constructor()
    cache.set(obj as object, cloneObj)

    // Object[{} []] 递归拷贝属性
    Reflect.ownKeys(obj as object)
        .forEach((key: string | symbol) => {
            cloneObj[key] = clone_deep(Reflect.get(obj as object, key), cache)
        })

    return cloneObj
}

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
const clone_json = <T>(obj: T): T => {
    return JSON.parse(JSON.stringify(obj))
}

export { clone_deep, clone_json }