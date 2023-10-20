// 引入全局样式文件
import '@/assets/css/global.less'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from 'axios'
import App from './App.vue'
import router from './router'
const app = createApp(App)
import * as echarts from 'echarts'
// 请求基准路径的配置
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/'
// 将axios挂载到Vue的原型对象上
app.config.globalProperties.$http = axios
// 将echarts挂载到Vue的原型对象上
app.config.globalProperties.$echarts = echarts
app.use(createPinia())
app.use(router)

app.mount('#app')
