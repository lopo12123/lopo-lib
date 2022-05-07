"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const clone_1 = require("../lib/clone");
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
        greet: (who) => {
            return `hello ${who}!`;
        },
        symbol: Symbol('symbol as value'),
        [Symbol('symbol as key')]: 'symbol as key'
    };
    console.log(clone_1.clone_json(obj_json));
};
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
        greet: (who) => {
            return `hello ${who}!`;
        },
        symbol: Symbol('symbol as value'),
        [Symbol('symbol as key')]: 'symbol as key'
    };
    console.log(clone_1.clone_deep(obj_deep));
};
do_test_json();
do_test_deep();
