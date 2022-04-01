import Vue from 'vue/dist/vue.js' //具有compiler template编译器不可用的问题
//而使用npm导包时，使用的是runtime版本，不具有compiler 
//import Vue from 'vue'  相当于 const Vue = require('vue')

import App from './App.vue'

Vue.config.productionTip = false
//当没有compiler编辑器时，会出现报错
Vue.component('my-component',{
  template:'<h2>sad</h2>'
})
new Vue({
  render: h => h(App),
}).$mount('#app')
