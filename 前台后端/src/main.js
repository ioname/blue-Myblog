import Vue from 'vue';
import App from './App.vue';
import router from './route';
import axios from 'axios';
import moment from 'moment';
import store from './store'







Vue.config.productionTip = false;
//给Vue函数添加一个原型属性，好处是不用重复引用axios
//axios不使用vue.use是因为   use用于安置插件，必须要有一个install方法，而axios没有这种方法
Vue.prototype.$axios = axios;

Vue.prototype.$moment = moment;
// Vue.directive('exHtml',{
//   bind:function(el,arc){
//     console.log(arc.value);
//     el.innerHTML += arc.value;
//   }
// })

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
