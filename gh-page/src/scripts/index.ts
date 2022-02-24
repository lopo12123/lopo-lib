import {getCurrentInstance} from "vue";
import {ElMessage} from "element-plus";

/**
 * @description 封装el-message, 每次显示前先关闭已有的弹窗
 */
const customMessage = (): typeof ElMessage=> {
    return getCurrentInstance()?.appContext.config.globalProperties.$message ?? ElMessage
}

/**
 * @description 平滑滚动到目标元素位置
 * @param id 目标元素的id
 */
const scrollToById = (id: string) => {
    // 当前滚动条的位置
    const scrollTop = document.documentElement.scrollTop ||
        window.pageYOffset ||
        document.body.scrollTop
    // 目标元素
    const targetEl = document.getElementById(id)
    if(!targetEl) return
    else {
        // 待滚动的距离 下正上负
        const top = targetEl.offsetTop - scrollTop
        // 滚动
        window.scrollBy({ top, behavior: 'smooth' })
    }
}

export {
    customMessage,
    scrollToById
}