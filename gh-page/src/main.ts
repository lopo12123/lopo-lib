import "element-plus/dist/index.css";
import "@/styles/iconfont.scss";
import "@/styles/index.scss";

import { createApp } from "vue";
import { createRouter } from "vue-router";
import { router } from "./router";

import {ElMessage, MessageProps} from "element-plus";

import App from "./App.vue";

const _router = createRouter(router)
const app = createApp(App)

app.use(_router)
    .mount('#app')

app.config.globalProperties.$message = (config: Partial<MessageProps>) => {
    ElMessage.closeAll()
    ElMessage(config)
}