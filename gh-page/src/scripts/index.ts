import {getCurrentInstance} from "vue";
import {ElMessage} from "element-plus";

const customMessage = (): typeof ElMessage=> {
    return getCurrentInstance()?.appContext.config.globalProperties.$message ?? ElMessage
}

export {
    customMessage
}