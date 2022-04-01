import Vue from 'vue';
import VueRouter from 'vue-router';
import test from '../components/test.vue'
import blog from '../components/bloglist.vue'
import types from '../components/typelist.vue'
import article from '../components/BlogArticle.vue'

Vue.use(VueRouter)

const routes = [
    {
        path:'/test',
        name:'test',
        component:test
    },
    {
        path:'/blog',
        name:'blog',
        component:blog
    },
    {
        path:'/types',
        name:'types',
        component:types
    },
    {
        path:'/article',
        name:'article',
        component:article
    },
    

]

const router = new VueRouter({
    mode:'history',
  
    routes,

});


export default router