import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Index',
        component: () => import('@/views/Index.vue'),
        redirect: {
            name: 'Home'
        },
        children: [
            {
                path: 'home',
                name: 'Home',
                component: () => import("@/views/Home.vue")
            },
            {
                path: 'debounce',
                name: 'Debounce',
                component: () => import("@/views/Debounce.vue")
            },
            {
                path: 'throttle',
                name: 'Throttle',
                component: () => import("@/views/Throttle.vue")
            }
        ]
    }
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes
})
