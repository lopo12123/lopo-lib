import { clone_deep, clone_json } from "../lib";

/**
 * @example
 * // 输出
 * {
 *   name: 'obj json',
 *   age: 11
 * }
 */
const do_test_json = () => {
    const obj_json = {
        name: 'obj json',
        age: 11,
        greet: (who: string) => {
            return `hello ${ who }!`
        },
        symbol: Symbol('symbol as value'),
        [Symbol('symbol as key')]: 'symbol as key'
    }

    console.log(clone_json(obj_json))
}

/**
 * @example
 * // 输出
 * {
 *   name: 'obj deep',
 *   age: 12,
 *   big: 456n,
 *   greet: [Function (anonymous)],
 *   symbol: Symbol(symbol as value),
 *   [Symbol(symbol as key)]: 'symbol as key'
 * }
 */
const do_test_deep = () => {
    const obj_deep = {
        name: 'obj deep',
        age: 12,
        big: 456n,
        greet: (who: string) => {
            return `hello ${ who }!`
        },
        symbol: Symbol('symbol as value'),
        [Symbol('symbol as key')]: 'symbol as key'
    }

    console.log(clone_deep(obj_deep))
}

do_test_json()
do_test_deep()