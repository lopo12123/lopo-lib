"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const debounce_1 = __importDefault(require("../lib/debounce"));
/**
 * @example
 * // 运行`ts-node test-debounce.ts`
 * // 输出:
 * now in trigger  0
 * now in trigger  1
 * now in trigger  2
 * now in trigger  3
 * now in trigger  4
 * now in trigger  5
 * function in debounce, now in trigger  5
 */
const do_test = () => {
    // 使用debounce包裹目标函数
    const logger = debounce_1.default((trigger) => {
        console.log('function in debounce, now in trigger ', trigger);
    }, 1000);
    let trigger_count = 0;
    // 使用interval模拟频繁抖动
    const timer = setInterval(() => {
        console.log('now in trigger ', trigger_count);
        logger(trigger_count);
        if (trigger_count++ > 4)
            clearInterval(timer);
    }, 500);
};
do_test();
