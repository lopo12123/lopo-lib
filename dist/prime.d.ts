declare class Prime {
    #private;
    /**
     * @description 返回 [1, n] 范围内的素数数量
     * @description 构造函数中的 list 参数传 true 可用; 否则始终返回 0
     */
    get primeCount(): number;
    /**
     * @description 返回 [1, n] 范围内的所有素数
     * @description 构造函数中的 list 参数传 true 可用; 否则始终返回空数组 []
     */
    get primeList(): number[];
    /**
     * @description range [1,n]
     * @param n
     * @param map 是否埃氏筛生成哈希表
     * @param list 是否欧拉筛生成素数列表
     */
    constructor(n: number, map?: boolean, list?: boolean);
    /**
     * @description 埃拉托斯特尼筛法 副产物可查表
     * @private
     */
    private filter1;
    /**
     * @description 欧拉筛 产物即质数列表
     * @private
     */
    private filter2;
    /**
     * @description 返回 n 是否是素数
     * @description 若 n小于2或大于构造函数传入的最大值, 则抛出错误
     * @param n 待判断的数字
     */
    is(n: number): boolean;
}
export default Prime;
