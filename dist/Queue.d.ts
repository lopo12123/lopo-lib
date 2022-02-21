/**
 * @description FIFO
 */
export declare class Queue<T> {
    /**
     * @description max length
     * @private
     */
    private _max;
    /**
     * @description current queue
     * @private
     */
    private _queue;
    /**
     * @description create a queue with max length
     */
    static create<_T>(max: number): Queue<_T>;
    /**
     * @description create a queue with max length
     */
    constructor(max: number);
    /**
     * @description queue`s length
     */
    get length(): number;
    /**
     * @description returns a shallow copy of current queue
     */
    getQueue(): T[];
    /**
     * @description push some items into the queue and return current length of the queue
     */
    in(...items: T[]): number;
    /**
     * @description take n items from the queue
     */
    out(n: number): T[];
    /**
     * @description move the queue forward n positions, and the items dequeued at the head are re-queued in order
     */
    circle(n: number, reverse?: boolean): void;
    /**
     * @description clear the queue and reset it`s max-length to `n` (if need)
     */
    clear(n?: number): void;
}
