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

const pinia = createPinia();
const app = createApp(App);

app.config.globalProperties.$api = api; // 将api挂载到全局属性上，方便在组件中使用
app.use(router);
app.use(ElementPlus)
app.use(pinia);
//icon图标全局注册
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.mount('#app')
