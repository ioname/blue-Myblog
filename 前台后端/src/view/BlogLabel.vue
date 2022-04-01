<template>
<div>
    <div class="content">
        <div class="bgc"></div>
            <div class="contentcenter">
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
                                    <img src="../assets/icon/label.png" alt="">
                                    <div class="message">文章标签</div>
                                </div>
                            </div>
                            <div class="linedown">
                                <div class="labellist">    
                                    <div v-for="(val,keys,i) in labelmessage" :key="i"
                                    @click="getlist(keys)">
                                        <blogselec :name1="keys" :num="val">{{keys}}</blogselec>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="centerdown">  
                    <div class="docunames">
                        <div class="docuname"
                        v-for="(item,i) in list" :key="i">
                           <blog-list :name1="item"></blog-list>
                        </div>
                    </div>
                         
                </div>
            </div>
        </div>
</div>
  
</template>
<script>
import blogselec from './BlogSelec.vue'
import BlogList from './BlogList.vue'
import api from '../fetch/api'
export default {
    name:"BlogLabel",
    components:{
        blogselec,
        BlogList
    },
    data(){
        return {
            labels:0,
            labelmessage:{},
            s:{},
            list:[]
        }
    },
    methods:{
        getlabels(){
            this.$axios({
                method:'get',
                url:"http://localhost:5050/labels"
            }).then(res => {

                let data = res.data.data;
                this.labels = data.length;
                
                for(var i in data){
                    
                    this.$set(this.labelmessage,data[i].name,res.data.number[i]);
                }
                // console.log(this.labelmessage);
            })  
        },
        getlist(e){
            // console.log('http://localhost:5050/labellist?name='+this.name1);
            api.fetchGet('http://localhost:5050/labellist?name='+"'" +e+"'" ,'').then(res=>{
            // console.log(res);
            const that = this
            that.list = []
            this.s = res.answer;
             let length = that.s.content.length;
            for(let i = 0; i < length; i++){
                let obj = {};
                obj['title'] = that.s.title[i].title;
                obj['type'] = that.s.type[i].type;
                obj['created'] = that.s.created[i].created;
                obj['content'] = that.s.content[i].content;
                obj['id'] = that.s.id[i];
                that.list.push(obj);
             } 
            })
            // console.log(e);
        }
    },
    created(){
        this.getlabels();
    },
}
</script>

 <style scoped>
        * {
            padding: 0;
            margin: 0;
        }
        .content {
            display: flex;
            width: 100%;
            justify-content: center;
            height: 100%;
            min-height: 261px;
            
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
            height: 50vh;
        }
        .centerdown {
            position: relative;
            margin-top: 200px;
        }
        
        .uppername {
            height: 60%;
            font-size: 15px;
            display: flex;
            
            justify-content: center;
        }
        .upperline {
            width: 100%;
            position: absolute;
           height: 200px;
            top: 45vh;
           
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
            width: 50%;
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
       
         .docunames {
            height:auto;
            display: flex;
            flex-direction: row;
        }
        .labellist {
            display: flex;
            flex-direction: row;
        }
    </style>