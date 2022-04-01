import Vue from 'vue'
import blogcontent from '../view/BlogContent.vue'
import bloglabel from '../view/BlogLabel.vue'
import test from '../view/test.vue'
import blogarticle from '../view/BlogArticle.vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
    {
        path:'/',
        name:'blogcontent',
        component:blogcontent
    },
    {
        path:'/bloglabel',
        name:'bloglabel',
        component:bloglabel
    },
    {
        path:'/test',
        name:'test',
        component:test
    },
    {
        path:'/blogarticle/:id',
        name:'blogarticle',
        component:blogarticle
    },
    
]

const router = new VueRouter({
    mode:'history',
    routes
})

export default router