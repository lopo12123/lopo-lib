declare class Heap_big_root {
    #private;
    /**
     * @description an copy of inner heap store
     */
    get heap(): number[];
    /**
     * @description 堆的大小
     */
    get size(): number;
    /**
     * @description 获取最大元素
     */
    get max(): number;
    /**
     * @description
     * @param nums 初始数据
     * @param depth 最大容量
     */
    constructor(nums: number[], depth?: number);
    /**
     * @description 添加元素
     * @param val
     */
    add(val: number): void;
    /**
     * @description 移除堆中最大的元素并返回
     */
    delete(): number | undefined;
}
declare class Heap_small_root {
    #private;
    /**
     * @description an copy of inner heap store
     */
    get heap(): number[];
    /**
     * @description 堆的大小
     */
    get size(): number;
    /**
     * @description 获取最小元素
     */
    get min(): number;
    /**
     * @description
     * @param nums 初始数据
     * @param depth 最大容量
     */
    constructor(nums: number[], depth?: number);
    /**
     * @description 添加元素
     * @param val
     */
    add(val: number): void;
    /**
     * @description 移除堆中最小的元素并返回
     */
    delete(): number | undefined;
}
export { Heap_big_root, Heap_small_root };
