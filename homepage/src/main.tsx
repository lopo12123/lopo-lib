import { createApp } from "vue";

import { router } from "@/routers";

createApp(() => <router-view/>)
    .use(router)
    .mount('#app')
