class Heap_big_root {
    readonly #depth: number

    readonly #heap: number[] = []  // 大 - 小

    /**
     * @description an copy of inner heap store
     */
    get heap() {
        return this.#heap.slice()
    }

    get size() {
        return this.#heap.length
    }

    get max() {
        return this.#heap[0]
    }

    constructor(nums: number[], depth: number = Infinity) {
        if(depth <= 0) throw new Error('think twice before you act!')

        this.#heap = nums.sort((a, b) => b - a).slice(0, depth)
        this.#depth = depth
    }

    add(val: number) {
        if(this.#heap.length === this.#depth
            && val <= this.#heap[this.size - 1]) return

        let p = Math.min(this.#heap.length, this.#depth - 1)
        this.#heap[p] = val

        let parentIdx = Math.floor((p - 1) / 2)
        while (p > 0) {
            if(this.#heap[parentIdx] >= val) return;
            else {
                this.#heap[p] = this.#heap[parentIdx]
                this.#heap[parentIdx] = val
                p = parentIdx
                parentIdx = Math.floor((p - 1) / 2)
            }
        }
    }

    delete() {
        if(this.size <= 2) {
            return this.#heap.shift()
        }
        else {
            const head = this.#heap[0]
            const val = this.#heap.pop()!
            this.#heap[0] = val

            let p = 0
            let largeChildIdx = this.#heap[2 * p + 1] > (this.#heap[2 * p + 2] ?? -Infinity) ? (2 * p + 1) : (2 * p + 2)

            while (largeChildIdx < this.size) {
                if(this.#heap[p] >= this.#heap[largeChildIdx]) return head
                else {
                    this.#heap[p] = this.#heap[largeChildIdx]
                    this.#heap[largeChildIdx] = val
                    p = largeChildIdx
                    largeChildIdx = (this.#heap[2 * p + 1] ?? Infinity) > (this.#heap[2 * p + 2] ?? -Infinity) ? (2 * p + 1) : (2 * p + 2)
                }
            }

            return head
        }
    }
}

class Heap_small_root {
    readonly #depth: number

    readonly #heap: number[] = []  // 大 - 小

    /**
     * @description an copy of inner heap store
     */
    get heap() {
        return this.#heap.slice()
    }

    get size() {
        return this.#heap.length
    }

    get max() {
        return this.#heap[0]
    }

    constructor(nums: number[], depth: number = Infinity) {
        if(depth <= 0) throw new Error('think twice before you act!')

        this.#heap = nums.sort((a, b) => a - b).slice(0, depth)
        this.#depth = depth
    }

    add(val: number) {
        if(this.#heap.length === this.#depth
            && val >= this.#heap[this.size - 1]) return

        let p = Math.min(this.#heap.length, this.#depth - 1)
        this.#heap[p] = val

        let parentIdx = Math.floor((p - 1) / 2)
        while (p > 0) {
            if(this.#heap[parentIdx] <= val) return;
            else {
                this.#heap[p] = this.#heap[parentIdx]
                this.#heap[parentIdx] = val
                p = parentIdx
                parentIdx = Math.floor((p - 1) / 2)
            }
        }
    }

    delete() {
        if(this.size <= 2) {
            return this.#heap.shift()
        }
        else {
            const head = this.#heap[0]
            const val = this.#heap.pop()!
            this.#heap[0] = val

            let p = 0
            let smallChildIdx = this.#heap[2 * p + 1] < (this.#heap[2 * p + 2] ?? -Infinity) ? (2 * p + 1) : (2 * p + 2)

            while (smallChildIdx < this.size) {
                if(this.#heap[p] <= this.#heap[smallChildIdx]) return head
                else {
                    this.#heap[p] = this.#heap[smallChildIdx]
                    this.#heap[smallChildIdx] = val
                    p = smallChildIdx
                    smallChildIdx = this.#heap[2 * p + 1] < (this.#heap[2 * p + 2] ?? -Infinity) ? (2 * p + 1) : (2 * p + 2)
                }
            }

            return head
        }
    }
}

export {
    Heap_big_root, Heap_small_root
}