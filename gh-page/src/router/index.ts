import {createWebHashHistory, RouteRecordRaw, RouterOptions} from "vue-router";

import Index from "@/views/Index.vue"

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: {
            name: 'Index'
        }
    },
    {
        path: '/index',
        name: 'Index',
        component: Index,
        children: [

        ]
    }
]

export const router: RouterOptions = {
    history: createWebHashHistory(),
    routes
}