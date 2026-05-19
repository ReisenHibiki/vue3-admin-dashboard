import router from "@/router/index.js";
import { useAllDataStore } from "@/stores/index.js";

export function setupRouterGuard() {
    router.beforeEach((to, from) => {
        const allDataStore = useAllDataStore();  // 动态获取最新的 store
        // console.log("token:", allDataStore.state.token);  // 调试用
        if (to.path !== '/login' && !allDataStore.state.token) {
            // console.log("用户未登录，跳转到login界面");
            return { name: 'login' };
        }
        // console.log("路由守卫被触发，允许跳转");
        return true;
    });
};