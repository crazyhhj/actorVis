// import Vue from 'vue'
import { createApp } from 'vue';
import App from './App.vue';
import mitt from "mitt";


import ElementPlus from 'element-plus';
// import 'element-ui/lib/theme-chalk/index.css';
import '../node_modules/element-plus/dist/index.css'

// import store from '@/store/index.js'
import store from '@/store/store.js'

import 'font-awesome/css/font-awesome.min.css'

const eventBus = mitt();
const app = createApp(App);

app.config.globalProperties.eventBus = eventBus
app.use(ElementPlus)
app.use(store)
app.mount('#app')