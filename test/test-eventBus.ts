import { EventBus } from "../lib/eventBus";

const do_test = () => {
    // 添加事件类型定义 (可选)
    type SomeEvents = {
        // 带参回调
        greet: (who: string) => void
        // 无参回调
        sayHi: () => void
    }
    // 事件回调
    const greet = (who: string) => {
        console.log(`hello, ${ who }!`)
    }
    const sayHi = () => {
        console.log('hi')
    }

    const evBus = new EventBus<SomeEvents>()

    // 注册事件
    evBus.on('greet', greet)
    evBus.on('sayHi', sayHi)

    // 触发事件
    evBus.emit('greet', [ 'lopo' ])  // hello, lopo!
    evBus.emit('sayHi', [])  // hi

    // 注销事件
    evBus.off('sayHi')

    // 触发事件
    evBus.emit('greet', [ 'lopo' ])  // hello, lopo!
    evBus.emit('sayHi', [])  // nothing happen
}

do_test()