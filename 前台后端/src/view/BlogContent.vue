<template>
    <div class="box">
        <div class="bgc"></div>
            <div class="content">
                <div class="contentin">
                      <div class="centerupper">
                        <div class="uppername">
                            <div class="nameinner">
                                <div class="namecenter">
                                    <h1>记录成长 分享生活</h1>
                                <span>一个xxxxxxxxxxx。</span>
                                </div>
                                
                            </div>
                        </div>
                        <div class="upperline">
                            <div class="innerline">
                                <div class="lineup">
                                    <div class="linemessage">
                                        <img src="../assets/icon/light.png" alt="">
                                        <div class="message">我的寄语</div>
                                    </div>
                                </div>
                                <div class="linedown">
                                    <div class="hope">
                                        <span>{{wish}}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="centerdown" v-if="list">  
                        <div class="docunames">
                            <div class="docuname"
                        v-for="(item,i) in list" :key="i">
                               <blog-list :name1="item"></blog-list>
                        </div>    
                        </div>
                        
                      
                        <div class="turnpage">
                            <div class="button" @click="changepage(nowpage-1)">
                                <img src="../assets/icon/left.png" alt="">
                            </div>
                            <div class="pagecount">{{nowpage}} &nbsp; / &nbsp; {{allpage}}</div>
                            <div class="button" @click="changepage(nowpage+1)">
                                <img src="../assets/icon/right.png" alt="">
                            </div>
                        </div>
                       
                
                    </div>
                </div>
                   
         
            </div>
               
    </div>
      
</template>
    <script>
    import BlogList from './BlogList.vue'
    import api from '../fetch/api'
    
    export default {
        name:"BlogContent",
        components:{
            BlogList
        },
        data(){
            return{
                s:{},
                a:{},
                list:[],
                wish:'',
                nowpage:1,
                allpage:0
            }
        },
        methods:{
          
     
                //这里让子数据传给父，使用vuex
                // const that = this;
                // that.$axios({
                //     methods:'get',
                //     url:'http://localhost:5050/index',
                //     data:{
                //         page:1
                //     }
                // }).then(res => {
                //     that.a = res.length;
                //     console.log(that.a);
                // })
       
        //      gettitle(){
        //         const that = this;
        //          this.$axios({
        //             methods:'get',
        //             url:'http://localhost:5050/index?page=1',
        //         }).then(res=>{
        //               that.s = res.data.answer; 
        //           //生成一个数组里放9个对象      
        //         console.log(that.s.content.length);
                  
        //         let length = that.s.content.length;
        //         for(let i = 0; i < length; i++){
        //             let obj = {};
        //             obj['title'] = that.s.title[i].title;
        //             obj['type'] = that.s.type[i].type;
        //             obj['created'] = that.s.created[i].created;
        //             obj['content'] = that.s.content[i].content;
                    
        //             that.list[i] = obj;
        //          } 
        //          console.log(that.list);
        //         })  
        //     },
        changepage(e){
            if(e > 0 && e <= this.allpage){
                this.nowpage = e;
                this.list = []
                this.getpage(e);
            }           
        },
        getpage(e){
             api.fetchGet('http://localhost:5050/index?page='+e,'').then(res=>{
                // console.log(res);
                const that = this
                this.s = res.answer;
                // console.log(that.s.content);
                 let length = that.s.content.length;
                 let listlabel = [];
                 that.s.id = that.s.id.reverse();
                for(let i = length-1; i >= 0; i--){
                    let obj = {};
                    
                    obj['title'] = that.s.title[i].title;
                    obj['type'] = that.s.type[i].type;
                    obj['created'] = that.s.created[i].created;
                    obj['content'] = that.s.content[i].content;
                    obj['id'] = that.s.id[i];
                    listlabel[i] = that.s.id[i];
                    that.list.push(obj);
                 }
                api.fetchGet('http://localhost:5050/listlabel?id='+listlabel[0]+'&end='+listlabel[listlabel.length-1],'').then(res=>{
                    let length = res.results.length;
                    console.log(length);
                    if(listlabel.length == 1){
                        res.results = [res.results]
                    }
                    res.results = res.results.reverse();
                    for(let i = 0; i < length; i++){
                        that.$set(that.list[i],'tag',res.results[i])
                    }
                    console.log(that.list)
                })
                 

            })
        }

        },
        //created在页面渲染前调用，即请求后端数据进行渲染之前，而mounted在页面渲染后调用
    
        created(){
           this.getpage(1);
            api.fetchGet('http://localhost:5050/getwish','').then(res=>{
                this.wish = res.results[0][0].wish;
                let page = res.results[1][0].allpage;
             
                this.allpage = Math.ceil(page/12);
                this.$store.commit('documents',page)

            })
        // this.gettitle();
            
        },
        
        beforeMount(){
             
        },
        mounted() {
            // this.infinite();
        },
       
    }
</script>
<style scoped>
     .box {
         display: flex;
         justify-content: center;
         min-height: 100%;
     }
            * {
                padding: 0;
                margin: 0;
            }
            .content {
                /* position: relative; */
                display: flex;
                
                justify-content: center;
       
                /* min-height: 261px;  */
            }
            .bgc {
                 background-color: #1ca0d3;
                 width: 100%;
                 height: 50vh;
                 position: absolute;
            }
            .contentcenter {
                display: flex;
                flex-direction: column;
                width: 85%;
                max-width: 1125px;
            }
            .centerupper {
                position: relative;
                display: flex;
                justify-content: center;
                min-width: 800px;
            }
            .uppername {
                height: 45vh;
                font-size: 15px;
                display: flex;
                width: 85%;
                justify-content: center;
            }
            .upperline {
                position: absolute;
                top: 48vh;
                width: 85%;
                height: 200px;
                display: flex;
                justify-content: center;
                background-color: #fff;
                box-shadow: 0 2px 5px 0 rgba(0,0,0,0.16),0 7px 10px 0 rgba(0,0,0,0.12);
            }
            .namecenter h1{
                margin-top: 10%;
                height: 50%;
                color:#fff;
                font-size: 4rem;
                font-weight: bold;
            }
            .nameinner {
                height: 100%;
                width: 70%;
                display: flex;
                flex-direction: column;
                justify-content: center;
            }
            .namecenter {
                width: 100%;
                height: 50%;
                text-align: center;
            }
            .namecenter span {
                color: #fff;
                font-size: 1.25rem;
            }
            .innerline {
                display: flex;
                flex-direction: column;
                height: 100%;
            }
            .lineup {
                display: flex;
                flex-direction: column;
                justify-content: flex-end;
                height: 40%;
            }
            .linemessage {
                text-align: center;
                display: flex;
                flex-direction: row;
                justify-content: center;
            }
            .linemessage img {
                width: 37px;
                height: 37px;
            }
            .message {
                font-weight: bold;
                font-size: 2rem;
            }
            .linedown {
                display: flex;
                flex-direction: column;
                justify-content: center;
                height: 40%;
            }
           
            .hope span {
                color: #848484;
                font-size: 1.1rem;
            }
            h1 {
                margin-bottom:20px;       
             }
             .centerdown {
                position: relative;
                margin-top: 200px;
                top:50px;
                display: flex;
               
                justify-content: center;
                min-width: 1125px;
                 flex-direction: column;
                 align-items: center;
                
             }
            
             .docunames {
                height:auto;
               width: 1150px;
                display: flex;
                flex-direction: row;
                
                flex-wrap: wrap;
             }
             .docuname {
                 margin: 10px 0;
             }
             .turnpage {
                 width: 95%;
                 display: flex;
                 margin-top: 20px;
                flex-direction: row;
                justify-content: space-between;
               
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
                
             }
             .disbutton {
                background-color: #fff;
             }
             .pagecount {
                 text-align: center;
                 font-size: 1.5rem;
                line-height: 56px;
             }
             .button img {
                 width: 25px;
                 height: 25px;
                 vertical-align: middle;
             }
     
        </style>