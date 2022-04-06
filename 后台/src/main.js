import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import router from './route'
import {Table,TableColumn, Button,Upload,Tabs,TabPane,Tag,Input,Form,FormItem,} from 'element-ui'
import '../node_modules/element-ui/lib/theme-chalk/index.css';
import moment from 'moment'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'


Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
Vue.prototype.$moment = moment;

Vue.use(mavonEditor);

Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Button);
Vue.use(Upload);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Tag);
Vue.use(Input);
Vue.use(Form);
Vue.use(FormItem);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
