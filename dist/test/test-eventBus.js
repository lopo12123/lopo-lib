"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const eventBus_1 = __importDefault(require("../lib/eventBus"));
const do_test = () => {
    // 事件回调
    const greet = (who) => {
        console.log(`hello, ${who}!`);
    };
    const sayHi = () => {
        console.log('hi');
    };
    const evBus = new eventBus_1.default();
    // 注册事件
    evBus.on('greet', greet);
    evBus.on('sayHi', sayHi);
    // 触发事件
    evBus.emit('greet', 'lopo'); // hello, lopo!
    evBus.emit('sayHi'); // hi
    // 注销事件
    evBus.off('sayHi');
    // 触发事件
    evBus.emit('greet', 'lopo'); // hello, lopo!
    evBus.emit('sayHi'); // nothing happen
};
do_test();
