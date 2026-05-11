import { de } from "element-plus/es/locales.mjs";
import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
    {
        Path: "/",
        name: "home",
        component: () => import("@/views/Main.vue") 
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;