import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// import VueRouter from 'vue-router'
import "lib-flexible/flexible.js"

createApp(App).use(store).use(router).use(ElementPlus).mount('#app')
