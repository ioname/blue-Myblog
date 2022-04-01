import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
// vuex页面刷新数据丢失,刷新是vuex里的数据重新初始化，因为vuex中数据保存在运行内存中，页面重新加载vue实例，vuex的数据被重新赋值
// 可以刷新时再次请求后端，适用于少量数据。或者将数据保存在浏览器缓存中，不安全
// 结合以上两种方法
const store = new Vuex.Store({
    state:{
        //
        index:[],
        //目录标签
        cataindex:[],
        //目录offsettop
        cata:[],
        //目录名称
        documents:0,
        //文章总数
        showsearch:false
        //展示搜索框
    },
    mutations:{
        edit(state,a){
            state.cata = [];
            state.cataindex = [];
            state.index = [];
            for(var i = 0; i < a.length; i++){
                state.cata.push(a[i].innerHTML);
                state.index.push(a[i].offsetTop+70);  //clientTop为0
                state.cataindex.push(a[i].localName);
            }
            // storage只能存储字符串的数据，对于JS中常用的数组或对象却不能直接存储。
            // sessionStorage.setItem('cata',JSON.stringify(state.cata));
            // sessionStorage.setItem('index',JSON.stringify(state.index));
            // sessionStorage.setItem('cataindex',JSON.stringify(state.cataindex));
        },
        documents(state,a){
            state.documents = a;
            sessionStorage.setItem('documents',JSON.stringify(state.documents));
        },
        //增删在外部组件用Vue.set和delete增删
       
            changesearch(state){
                state.showsearch = !state.showsearch                                                                                                              
            }
        
    }
})

export default store