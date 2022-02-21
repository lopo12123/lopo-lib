/**
 * @description LIFO
 */
export default class Stack<T> {
    /**
     * @description max length (unlimited if `_max === -1`)
     * @private
     */
    private _max: number

    /**
     * @description current stack
     * @private
     */
    private _stack: T[] = []

    /**
     * @description create a stack with max length
     */
    public static create<_T>(max: number) {
        return new Stack(max)
    }

    /**
     * @description create a stack with max length
     */
    constructor(max: number) {
        if(max <= 0 && max !== -1) {
            if(console) { console.warn('[Stack] Size Warning: Expect max to be greater than 0 or equal to -1 but got ' + max) }
        }
        this._max = max
    }

    /**
     * @description stack`s depth
     */
    public get depth(): number {
        return this._stack.length
    }

    /**
     * @description returns a shallow copy of current stack
     */
    public getStack(): T[] {
        return this._stack.slice(0)
    }

    /**
     * @description push some items into the stack and return current depth of the stack (it will automatically ignore the rest items when the stack is full)
     */
    public in(...items: T[]): number {
        // no max-depth limit
        if(this._max === -1) {
            return this._stack.push(...items)
        }
        // with max-depth limit
        else {
            // below max length
            if(this._stack.length + items.length <= this._max) {
                return this._stack.push(...items)
            }
            // overflow: already reach the limit
            else if(this._stack.length === this._max) {
                return this._max
            }
            // overflow: can just put some of items into the stack
            else {
                return this._stack.push(...items.slice(0, this._max - this._stack.length))
            }
        }
    }

    /**
     * @description take n items from the stack
     */
    public out(n: number): T[] {
        return this._stack.splice((this._stack.length - n < 0) ? 0 : (this._stack.length - n)).reverse()
    }

    /**
     * @description clear the queue and reset it`s max-length to `n` (if need)
     */
    public clear(n?: number): void {
        this._stack = []
        this._max = n ?? this._max
    }
}