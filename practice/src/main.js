import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import router from './route'
import echarts from 'echarts'
import ElementUI from 'element-ui'
import '../node_modules/element-ui/lib/theme-chalk/index.css';
import moment from 'moment'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'


Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
Vue.prototype.$echarts = echarts;
Vue.prototype.$moment = moment;
Vue.use(ElementUI);
Vue.use(mavonEditor)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
