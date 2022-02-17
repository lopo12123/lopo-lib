/**
 * @description FIFO
 */
export class Queue<T> {
    /**
     * @description max length
     * @private
     */
    private _max: number

    /**
     * @description current queue
     * @private
     */
    private _queue: T[] = []

    /**
     * @description create a queue with max length
     */
    public static create<_T>(max: number) {
        return new Queue<_T>(max)
    }

    /**
     * @description create a queue with max length
     */
    constructor(max: number) {
        this._max = max
    }

    /**
     * @description queue`s length
     */
    public get length(): number {
        return this._queue.length
    }

    /**
     * @description returns a shallow copy of current queue
     */
    public getQueue(): T[] {
        return this._queue.slice(0, this._queue.length)
    }

    /**
     * @description push some items into the queue and return current length of the queue
     */
    public in(...items: T[]): number {
        if(items.length + this._queue.length <= this._max) {  // still below max length
            return this._queue.push(...items)
        }
        else if(items.length >= this._max) {  // overflow: items.length > max
            this._queue = items.slice(items.length - this._max)
            return this._max
        }
        else {  // overflow: items.length < max
            const nextFirst = this._queue.length + items.length - this._max
            this._queue = [...this._queue.slice(nextFirst), ...items]
            return this._max
        }
    }

    /**
     * @description take n items from the queue
     */
    public out(n: number): T[] {
        return this._queue.splice(0, n)
    }

    /**
     * @description move the queue forward n positions, and the items dequeued at the head are re-queued in order
     */
    public circle(n: number, reverse: boolean = false): void {
        if(reverse) {
            this._queue.reverse()
            this._queue.push(...this._queue.splice(0, n))
            this._queue.reverse()
        }
        else {
            this._queue.push(...this._queue.splice(0, n))
        }
    }

    /**
     * @description clear the queue and reset it`s max-length as `n` (if need)
     */
    public clear(n?: number): void {
        this._queue = []
        this._max = n ?? this._max
    }
}