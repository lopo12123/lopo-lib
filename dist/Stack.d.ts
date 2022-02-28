/**
 * @description LIFO
 */
export declare class Stack<T> {
    /**
     * @description max length (unlimited if `_max === -1`)
     * @private
     */
    private _max;
    /**
     * @description current stack
     * @private
     */
    private _stack;
    /**
     * @description create a stack with max length
     */
    static create<_T>(max: number): Stack<_T>;
    /**
     * @description create a stack with max length
     */
    constructor(max: number);
    /**
     * @description stack`s depth
     */
    get depth(): number;
    /**
     * @description returns a shallow copy of current stack
     */
    getStack(): T[];
    /**
     * @description push some items into the stack and return current depth of the stack (it will automatically ignore the rest items when the stack is full)
     */
    in(...items: T[]): number;
    /**
     * @description take n items from the stack
     */
    out(n: number): T[];
    /**
     * @description clear the queue and reset it`s max-length to `n` (if need)
     */
    clear(n?: number): void;
}
