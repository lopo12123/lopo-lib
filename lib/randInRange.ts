/**
 * @description 设置随机的离散距离
 * @param left 左界
 * @param right 右界
 * @param exclude 排除的一边
 * @param step 步长
 */
const randWithStep = (left: number, right: number, exclude: 'left' | 'right' = 'right', step?: number) => {
    let p = Math.random() * (right - left) + left

    while (exclude === 'left' && p === left) p = Math.random() * (right - left) + left

    if(!step) return p
    else {
        let above = p % step

        if(exclude === 'right') {
            if(above < p - above || p - above + step >= right) {
                return p - above
            }
            else {
                return p + (step - above)
            }
        }
        else {
            if(above < p - above && p - above > left) {
                return p - above
            }
            else {
                return p + (step - above)
            }
        }
    }
}

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
const randInRange = (left: number, right: number, exclude: 'left' | 'right' | 'both' = 'right', step: number = 0) => {
    if(right <= left) throw new Error('right <= left is not allowed.')
    else if(step !== undefined && right - left <= step) throw new Error('step <= right - left is not allowed.')
    else {
        if(exclude === 'right') return randWithStep(left, right, 'right', step)
        else if(exclude === 'left') return randWithStep(left, right, 'left', step)
        else {
            let t = randWithStep(left, right, 'right', step)
            while (t === left) {
                t = randWithStep(left, right, 'right', step)
            }
            return t
        }
    }
}

export default randInRange