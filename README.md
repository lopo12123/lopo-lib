## lopo-lib

### Installation

`npm install lopo-lib`  
`yarn add lopo-lib`

### Docs

#### clone 克隆

[lib](./lib/clone.ts)  [test](./test/test-clone.ts)

```ts
function clone_deep<T>(obj: T, cache?: WeakMap<object, object>): T

function clone_json<T>(obj: T): T
```

#### debounce 防抖

[lib](./lib/debounce.ts)  [test](./test/test-debounce.ts)

```ts
function debounce<Args>(fn: (...args: Args) => void, min_hold: number): (...args: Args) => void
```

#### throttle 节流

[lib](./lib/throttle.ts)  [test](./lib/throttle.ts)

```ts
function throttle<Args>(fn: (...args: Args) => void, min_gap: number): (...args: Args) => void
```


