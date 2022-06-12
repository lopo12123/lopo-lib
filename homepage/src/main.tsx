// style
import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import "@/styles/index.scss";

// core
import { createApp } from "vue";

// plugin
import { router } from "@/routers";

createApp(() => <router-view/>)
    .use(router)
    .mount('#app')
