class Prime {
    #primeMap: boolean[] = []
    #primeList: number[] = []
    #max: number

    get primeCount() {
        return this.#primeList.length
    }

    /**
     * @description range [1,n]
     * @param n
     * @param map 是否埃氏筛生成哈希表
     * @param list 是否欧拉筛生成素数列表
     */
    constructor(n: number, map: boolean = true, list: boolean = true) {
        if(n < 2 || n >= Math.pow(2, 31)) throw new Error('require n in range [2, 2^31]')
        else if(!map && !list) throw new Error('nonsense')

        this.#max = n
        if(map) this.filter1(n)
        if(list) this.filter2(n)
    }

    /**
     * @description 埃拉托斯特尼筛法 副产物可查表
     * @private
     */
    private filter1(n: number) {
        this.#primeMap = new Array(n + 1).fill(true)
        this.#primeMap[0] = false
        this.#primeMap[1] = false
        for (let i = 2; i <= n; i++) {
            // 素数的倍数都不是素数
            if(this.#primeMap[i]) {
                for (let j = i; j * i <= n; j++) {
                    this.#primeMap[i * j] = false
                }
            }
        }
    }

    /**
     * @description 欧拉筛 产物即质数列表
     * @private
     */
    private filter2(n: number) {
        const visited: boolean[] = new Array(n + 1).fill(false)
        for (let curr_num = 2; curr_num <= n; curr_num++) {
            if(!visited[curr_num]) {
                this.#primeList.push(curr_num)
            }

            // 当前数 * 比当前质数小的质数 全都置为 visited
            for (let prime_idx = 0; prime_idx < this.primeCount && curr_num * this.#primeList[prime_idx] <= n; prime_idx++) {
                visited[curr_num * this.#primeList[prime_idx]] = true

                if(curr_num % this.#primeList[prime_idx] === 0) break
            }
        }
    }

    is(n: number) {
        if(n < 2 || n > this.#max) throw new Error('invalid input number, out of range.')
        else if(this.#primeMap.length > 0) return this.#primeMap[n]
        else return this.#primeList.includes(n)
    }
}

export default Prime

let root = new Prime(20, false)

