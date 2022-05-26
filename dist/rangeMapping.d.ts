/**
 * @description [区间映射] 构建一个映射函数, 用于获取某数从`from`到`to`的映射值
 * @param from 原区间
 * @param to 映射区间
 * @example
 * const mapping = rangeMapping([ 0, 1 ], [ 0, 100 ])
 *
 * console.log(mapping(0))  // 0
 * console.log(mapping(0.5))  // 50
 * console.log(mapping(0.3))  // 30
 * console.log(mapping(1.1))  // 110.00000000000001
 */
declare function rangeMapping(from: [number, number], to: [number, number]): (val: number) => number;
/**
 * @description [区间映射] 获得一个映射值, 为`val`从`from`到`to`的映射值
 * @param from 原区间
 * @param to 映射区间
 * @param val 原数值
 * @example
 * console.log(rangeMapping([ 0, 1 ], [ 0, 100 ], 0))  // 0
 * console.log(rangeMapping([ 0, 1 ], [ 0, 100 ], 0.5))  // 50
 * console.log(rangeMapping([ 0, 1 ], [ 0, 100 ], 0.3))  // 30
 * console.log(rangeMapping([ 0, 1 ], [ 0, 100 ], 1.1))  // 110.00000000000001
 */
declare function rangeMapping(from: [number, number], to: [number, number], val: number): number;
export default rangeMapping;
