/**
 * @description 获取区间内的随机数, 可设置离散距离
 * @param left 左界
 * @param right 右界
 * @param exclude 是否不含左/右界, 默认值为`right`(不含右界)
 * @param step 步长 0 表示使用默认
 * @example
 * // default [0, 1)
 * console.log(randInRange(0, 1))
 *
 * // same as default [0, 1)
 * console.log(randInRange(0, 1, 'right'))
 *
 * // (0, 1]
 * console.log(randInRange(0, 1, 'left'))
 *
 * // random in [0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9]
 * console.log(randInRange(0, 1, 'right', 0.1))
 *
 * // random in [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]
 * console.log(randInRange(0, 1, 'left', 0.1))
 */
declare const randInRange: (left: number, right: number, exclude?: 'left' | 'right' | 'both', step?: number) => number;
export { randInRange };
