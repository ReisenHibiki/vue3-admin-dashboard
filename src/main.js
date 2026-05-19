import { createApp } from 'vue';
import App from './App.vue';
import "@/assets/less/index.less";
import router from "@/router/index.js";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//icon图标全局引入
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { createPinia } from 'pinia';
import '@/api/mock.js';
import api from "@/api/api";
// 数据持久化(这次使用自己写的watch监听变化来实现持久化)
// import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { useAllDataStore } from "@/stores/index.js";
function isRoute(to){
   return router.getRoutes().filter(item=>item.path===to.path).length>0
}

router.beforeEach((to, from) => {
    const allDataStore = useAllDataStore();  // 动态获取最新的 store

    console.log("token:", allDataStore.state.token);  // 调试用

    if (to.path !== '/login' && !allDataStore.state.token) {
        // console.log("用户未登录，跳转到login界面");
        return { name: 'login' };
    }

    const routeExists = router.getRoutes().some(route => route.path === to.path);
    if (!routeExists) {
        // console.log("路由记录不存在，跳转到404");
        return { name: '404' };
    }

    // console.log("路由守卫被触发，允许跳转");
    return true;
});


const pinia = createPinia();
const app = createApp(App);

app.config.globalProperties.$api = api; // 将api挂载到全局属性上，方便在组件中使用

app.use(ElementPlus)
app.use(pinia);

const allDataStore = useAllDataStore();
allDataStore.addMenu(router, "refresh");
// use（router）要在addMenu之后，因为执行完会直接跳转路由
app.use(router);
//icon图标全局注册
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.mount('#app')
