import { createApp } from 'vue';
import App from './App.vue';
import "@/assets/less/index.less";
import router from "@/router/index.js";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//icon图标全局引入
import * as ElementPlusIconsVue from '@element-plus/icons-vue'


const app = createApp(App);
app.use(router);
app.use(ElementPlus)
//icon图标全局注册
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.mount('#app')
