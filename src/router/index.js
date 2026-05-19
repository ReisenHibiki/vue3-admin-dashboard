import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
    {
        path: "/",
        name: "main",
        component: () => import("@/views/Main.vue"),
        redirect: "/home",
    //     children: [
    //         {
    //         path: 'home',
    //         name: 'home',
    //         component: () => import('@/views/Home.vue')
    //         },
    //         {
    //         path: 'user',
    //         name: 'user',
    //         component: () => import('@/views/User.vue')
    //         },
    //         //新添加的三个路由修复跳转白屏错误
    //         {
    //         path: 'mall',
    //         name: 'mall',
    //         component: () => import('@/views/Mall.vue')
    //         },
    //         {
    //             path: 'page1',
    //             name: 'page1',
    //             component: () => import('@/views/Page1.vue')
    //         },
    //         {
    //             path: 'page2',
    //             name: 'page2',
    //             component: () => import('@/views/Page2.vue')
    //         }

    //         ]
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/Login.vue')
    },
    {
        path: '/404',
        name: '404',
        component: () => import('@/views/404.vue')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;