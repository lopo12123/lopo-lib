## lopo-lib

### Installation

`npm install lopo-lib`  
`yarn add lopo-lib`

### Docs

#### clone 克隆

[lib](./lib/clone.ts) | [test](./test/test-clone.ts)

- declaration

```ts
function clone_deep<T>(obj: T, cache?: WeakMap<object, object>): T {
    /** inner code */
}

function clone_json<T>(obj: T): T {
    /** inner code */
}
```

- example

```ts
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
// {
//   name: 'obj json',
//   age: 11
// }

do_test_deep()
// {
//   name: 'obj deep',
//   age: 12,
//   big: 456n,
//   greet: [Function (anonymous)],
//   symbol: Symbol(symbol as value),
//   [Symbol(symbol as key)]: 'symbol as key'
// }
```

---  

#### debounce 防抖

[lib](./lib/debounce.ts) | [test](./test/test-debounce.ts)

- declaration

```ts
function debounce<Args>(fn: (...args: Args) => void, min_hold: number): (...args: Args) => void {
    /** inner code */
}
```

- example

```ts
const do_test = () => {
    // 使用debounce包裹目标函数
    const logger = debounce((trigger: number) => {
        console.log('function in debounce, now in trigger ', trigger)
    }, 1000)

    let trigger_count = 0

    // 使用interval模拟频繁抖动
    const timer = setInterval(() => {
        console.log('now in trigger ', trigger_count)
        logger(trigger_count)
        if(trigger_count++ > 4) clearInterval(timer)
    }, 500)
}

do_test()
// now in trigger  0
// now in trigger  1
// now in trigger  2
// now in trigger  3
// now in trigger  4
// now in trigger  5
// function in debounce, now in trigger  5
```

---  

#### eventBus 事件管理

[lib](./lib/eventBus.ts) | [test](./test/test-eventBus.ts)

- declaration

```ts
class EventBus<EventMap extends { [k: string]: (...args: any[]) => void }> {
    constructor() {
        /** inner code */
    }

    on<EvName extends keyof EventMap>(eventName: EvName, fn: EventMap[EvName]): void {
        /** inner code */
    }

    off<EvName extends keyof EventMap>(eventName: EvName, fn?: EventMap[EvName]): void {
        /** inner code */
    }

    emit<EvName extends keyof EventMap>(eventName: EvName, args: Parameters<EventMap[EvName]>): void {
        /** inner code */
    }

    dispose(): void {
        /** inner code */
    }
}
```

- example

```ts
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
```

---  

#### frameTask 逐帧任务

仅web端可用, 使用了`requestAnimationFrame`

[lib](./lib/frameTask.ts)

- declaration

```ts
class FrameTask {
    constructor(fps: number = 60) {
        /** inner code */
    }

    addTask<Task extends (...args: any[]) => void>(taskName: string, fn: Task, args: Parameters<Task>, immediate: boolean = false): void {
        /** inner code */
    }

    runTask(taskName: string): void {
        /** inner code */
    }

    pauseTask(taskName: string): void {
        /** inner code */
    }

    cancelTask_single(taskName: string): void {
        /** inner code */
    }

    cancelTask_with_expect(expect: string[]): void {
        /** inner code */
    }

    cancelTask_all(): void {
        /** inner code */
    }

    getState_name_list(): void {
        /** inner code */
    }

    getState_run(taskName: string): boolean | null {
        /** inner code */
    }

    getState_run_list(): void {
        /** inner code */
    }

    dispose(): void {
        /** inner code */
    }
}
```

- example

```ts
const taskManager = new FrameTask(2)  // set fps to 0.5 (run task every 0.5s)

let globalCount = 1
const logger = () => {
    console.log('currnet: ', globalCount++)
}

taskManager.addTask('log', logger, [], true)

setTimeout(() => {
    taskManager.pauseTask('log')
}, 3000)

// the output will be like:
// currnet:  1
// currnet:  2
// currnet:  3
// currnet:  4
// currnet:  5
// currnet:  6
```

---  

#### heap 堆

[lib](./lib/heap.ts) | [test](./test/test-heap.ts)

- declaration

```ts
// 大根堆
class Heap_big_root {
    get heap(): number[] {
        /** inner code */
    }

    get size(): number {
        /** inner code */
    }

    get max(): number {
        /** inner code */
    }

    constructor(nums: number[], depth: number = Infinity) {
        /** inner code */
    }

    add(val: number) {
        /** inner code */
    }

    delete(): number {
        /** inner code */
    }
}

// 小根堆
class Heap_small_root {
    get heap(): number[] {
        /** inner code */
    }

    get size(): number {
        /** inner code */
    }

    get min(): number {
        /** inner code */
    }

    constructor(nums: number[], depth: number = Infinity) {
        /** inner code */
    }

    add(val: number) {
        /** inner code */
    }

    delete(): number {
        /** inner code */
    }
}
```

- example

```ts
const do_test_big = () => {
    const big_root = new Heap_big_root([ 2, 5, 1, 3, 6, 1, 2 ])
    big_root.add(5)
    console.log(big_root.heap)
    let head = big_root.delete()
    console.log(head, big_root.heap)
    head = big_root.delete()
    console.log(head, big_root.heap)
}
do_test_big()
// [ 6, 5, 3, 5, 2, 1, 1, 2 ]
// 6 [ 5, 5, 3, 2, 2, 1, 1 ]
// 5 [ 5, 2, 3, 2, 1, 1 ]

const do_test_small = () => {
    const small_root = new Heap_small_root([ 2, 5, 1, 3, 6, 1, 2 ])
    small_root.add(5)
    console.log(small_root.heap)
    let head = small_root.delete()
    console.log(head, small_root.heap)
    head = small_root.delete()
    console.log(head, small_root.heap)
}
do_test_small()
// [ 1, 1, 2, 2, 3, 5, 6, 5 ]
// 1 [ 1, 2, 2, 5, 3, 5, 6 ]
// 1 [ 2, 2, 6, 5, 3, 5 ]
```

---  

#### promiseLike 类promise

[lib](./lib/promiseLike.ts) | [test](./test/test-promiseLike.ts)

- declaration

```ts
class PromiseLike<Result, Reason> {
    constructor(executor: (resolve: resolveFn<Result>, reject?: rejectFn<Reason>) => void) {
        /** inner code */
    }

    then(onFulFilled: resolveFn<Result>, onRejected?: rejectFn<Reason>): PromiseLike {
        /** inner code */
    }
}
```

- example

```ts
const do_test = () => {
    const p1 = () => new PromiseLike((resolve, reject) => {
        setTimeout(() => {
            resolve(1)
        }, 1000)
    })

    const p2 = () => new PromiseLike((resolve, reject) => {
        setTimeout(() => {
            resolve(2)
        }, 1000)
    })

    p1().then((res1) => {
        console.log(Date.now(), ': res1: ', res1)
        return p2()
    }).then((res2) => {
        console.log(Date.now(), ': res2: ', res2)
    })
}

do_test()
// 1651827350110 : res1:  1
// 1651827351118 : res2:  2
```

---  

#### throttle 节流

[lib](./lib/throttle.ts) | [test](./test/test-throttle.ts)

- declaration

```ts
function throttle<Args>(fn: (...args: Args) => void, min_gap: number): (...args: Args) => void {
    /** inner code */
}
```

- example

```ts
const do_test = () => {
    // 使用throttle包裹目标函数
    const logger = throttle((trigger: number) => {
        console.log('function in throttle, now in trigger ', trigger)
    }, 1000)

    let trigger_count = 0

    // 使用interval模拟频繁调用
    const timer = setInterval(() => {
        console.log('now in trigger ', trigger_count)
        logger(trigger_count)
        if(trigger_count++ > 4) clearInterval(timer)
    }, 500)
}

do_test()
// now in trigger  0
// now in trigger  1
// function in throttle, now in trigger  1
// now in trigger  2
// now in trigger  3
// function in throttle, now in trigger  3
// now in trigger  4
// now in trigger  5
// function in throttle, now in trigger  5
```
