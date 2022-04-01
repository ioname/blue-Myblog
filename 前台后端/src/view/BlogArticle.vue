<template>
    
        <div>

        <div class="content">
            <div class="bgc"></div>
                    <div class="centerupper">                      
                        <div class="upperline">
                               <div class="articleline">
                                   <div class="lineup">
                                       <div class="labels">
                                           <div class="label"
                                           v-for="(item,i) in taglist[0]" :key="i">
                                                {{item.name}}
                                           </div>
                                       </div>
                                       <a class="type">
                                           {{arcmessage[0]}}
                                        </a>
                                   </div>
                                   <div class="linedown">
                                       <span class="created">发布时间：{{arcmessage[1]}}</span>
                                       <span class="updated">最近更新：{{arcmessage[2]}}</span>
                                   </div>
                               </div>
                               <div class="articlecontent" v-html='this.blogcontent'></div>
                               <div class="articlefoot">
                                   <div class="arclist">
                                         <div class="lastarc" @click="golastId(id)">
                                            <span>上一篇：{{lastcontent}}</span>
                                             </div>
                                        <div class="nextarc" @click="gonextId(id)">
                                            <span>下一篇：{{nextcontent}}</span>
                                        </div>
                                   </div>
                                 
                               </div>
                             
                           
                           
                        </div>
                        <div class="catalog">
                          <blogcata v-on:changed="jumptopo" :light="placeindex"></blogcata>
                        </div>
                   </div>
                    
       </div>
        <div class="downpush"></div>
            <div class="buttonup">
                <div class="button" v-show="buttonshow" @click="backTop"></div>
            </div>
           
       </div>

</template>
<script>

import '../../node_modules/prismjs/themes/prism.css'
import  '../../node_modules/prismjs/prism'
import {marked} from 'marked'
import blogcata from './BlogCata.vue'
import 'highlight.js/styles/googlecode.css'
import hljs from 'highlight.js' //导入代码高亮文件
import api from '../fetch/api'
export default {
    name:"BlogContent",
    components:{
        blogcata
    },
    data(){
        return{
            id:0,
            blogcontent:' ',
            arcmessage:[],
            taglist:[],
            scrolltop:0,
            placeindex:0,
            buttonshow:0,
            catas:[],
            cataindexs:[],
            index:[],
            lastcontent:'无',
            nextcontent:'无'
        }
    },
    methods:{
        getArticle(){
            this.id = this.$route.params && this.$route.params.id;
            // console.log(this.id);
            this.$axios({
                method:'get',
                url:'http://localhost:5050/article?id='+ this.id
            }).then(res => {
                // console.log(res.data.data);
                this.blogcontent = marked(res.data.data[0][0].blog);
                this.$nextTick(()=>{
                     let a = document.querySelectorAll("h1,h2,h3");
                     let table = document.querySelectorAll("th");
                     table.forEach(i=>{
                         i.style.border = '2px soild green'
                     })
                     this.$store.commit('edit',a);
                    async function highlighthandle(){
                        await hljs;
                        let highlight = document.querySelectorAll('pre');
                        highlight.forEach((block)=>{
                        hljs.highlightBlock(block);
                        })
                    }
                    highlighthandle();
                })
                this.arcmessage.push( res.data.data[1][0].type);
                this.arcmessage.push( res.data.data[1][0].created);
                this.arcmessage.push( res.data.data[1][0].updated);
                this.taglist.push( res.data.data[2]);
                // console.log(this.taglist);
                this.arcmessage[1] = this.$moment(this.arcmessage[1]).format('YYYY-MM-DD HH:mm:ss');
               
            })
             api.fetchGet('http://localhost:5050/lastnext?id='+this.id,'').then(res=>{
                 this.lastcontent = this.nextcontent = '无'
                 if(res.results[0].length>0)this.lastcontent = res.results[0][0].title;
                 if(res.results[1].length>0)this.nextcontent = res.results[1][0].title;
             })
     
        },
        handleScroll(){
            //保存滚动条

            this.scrolltop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
               this.buttonshow = this.scrolltop 
            //    console.log(this.scrolltop);

            let index = this.$store.state.index
               for(var i in index){    
                    if(document.documentElement.scrollTop < index[i] )
                    {
                    this.placeindex = i-1;
                    if(this.placeindex == -1)this.placeindex = 0;
                    break;
                    }
                    if(i == index.length - 1)
                    this.placeindex = i;
               }
        },
        debounce(fun,delay){
            let timer = null; //定时器
            return function(){
                if(timer) clearTimeout(timer); //触发时清空计时器            
                    timer = setTimeout(fun,delay)
            }
        },
        jumptopo(e){
            let index = this.$store.state.index
             window.pageYOffset = index[e];
             document.body.scrollTop = index[e];
            document.documentElement.scrollTop = index[e];
            // this.scrolltop = index[e] + 20;
            // console.log(e);
            // this.scrolltop = this.cataindexs[e]
        },
        backTop(){      
                document.documentElement.scrollTop = 0
                this.buttonshow = 0
        },
        golastId(e){
            e = Number(e);
             if(this.lastcontent != '无' && e > 1){
                e--;
                // 引用相同组件的时候，会导致该组件无法更新，也就是我们口中的页面无法更新的问题了
                 this.$router.replace({ path:"/blogarticle/" + e});
            }else alert('没有上一篇')
        },
        gonextId(e){
             e = Number(e);
             let a = sessionStorage.getItem("documents")
            if(this.nextcontent != '无' && e < a){
                e++;
                 this.$router.replace({ path:"/blogarticle/" + e});
            }else alert('没有下一篇')
           
        }
    },
    created(){
       this.getArticle();
      
    //    console.log(this.content);
         
    },
    watch:{
        '$route' (){
            this.getArticle();
        }
    },
    beforeMount(){
         
    },
    mounted() {
        // this.infinite();
        // window.addEventListener('scroll',this.debounce(this.handleScroll,100));
        window.addEventListener('scroll',this.handleScroll,true)
        // let a = document.querySelectorAll("h1,h2,h3");
        this.$nextTick(function(){
            
            // let cata = [];
            // for(var i = 0; i < a.length; i++){
            //     cata[i] = a[i].innerHTML;
            // }
            // this.catas = cata;
        })
    },
    destroyed(){
        window.removeEventListener('scroll',this.debounce)
    }
   
}
</script>

 
<style scoped>
.content {
    display: flex;
    justify-content: center;
}

.bgc {
        background-color: #1ca0d3;
        width: 100%;
        height: 30vh;
        position: absolute;
        top:5vh;
}

.centerupper {
    position: relative;
    top:21vh;
    
    width: 1100px;
    min-height: 500px;
    display: flex;
    flex-direction: row;
    overflow: visible;

   
}
.upperline {
    width: 85%;           
    display: flex;
    flex-direction: column;            
    background-color: #fff;
    box-shadow: 0 2px 5px 0 rgba(0,0,0,0.16),0 7px 10px 0 rgba(0,0,0,0.12);
}
.catalog{
    position: fixed;
    top: 15vh;
    width: 15%;
    left:80vw;
    padding: 20px;
    background-color: #fff;
    border-radius: 10px;
    display: fixed;
}

.articleline {
    height: 100px;
    width: 100%;
    border-bottom: 1px solid #1ca0d3;
    display: flex;
    flex-direction: column;
}
.lineup{
    display: flex;
    flex-direction: row;
    height: 60%;
    padding: 10px 20px;
    justify-content: space-between;
   
    /* margin-bottom: 10px; */
}
.linedown {
    padding: 5px 20px;
    height: 40%;
}
.type {
    margin: 10px;
}
.labels {
      margin: 10px;
      display: flex;
      flex-direction: row;

}
.label {
    width: 70px;
    height: 30px;
    border-radius: 20px;
    text-align: center;
    background-color: #1ca0d3;
    line-height: 30px;
    color: #fff;
    cursor: pointer;
    margin-right: 5px;
}
.articlecontent {
    min-height: 200px;
    width: 93%;
    padding: 20px;
    
}
.articlefoot {
    /* padding: 20px; */
    padding: 0 15px;
    padding-top: 20px;
    
    
   
    border-top: 1px solid #1ca0d3;
}
.arclist {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    height: 200px;
}
.lastarc,.nextarc{
    padding: 10px;
    cursor: pointer;
}

.lastarc:hover ,.nextarc:hover {
    color: #1ca0d3;
}
.buttonup {
    right: 5px;
    bottom: 5px;
    position: fixed;
    z-index: 999;
    display: flex;
    flex-direction: column;
}
.button {
        width: 56px;
        height: 56px;
        border-radius: 50%;
        background-color: #1da7da;
        box-shadow: 0 2px 5px 0 rgba(0,0,0,0.16),0 7px 10px 0 rgba(0,0,0,0.12);
        cursor: pointer;
        text-align: center;
        line-height: 56px;
        display: inline-block;
    margin-top: 5px;
    
    }
    .downpush {
        width: 100%;
        height: 100px;
    }
    p {
       font-size: 2rem; 
    }


</style>