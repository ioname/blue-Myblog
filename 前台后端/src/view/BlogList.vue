<template>
   <div class="doculists" @click="getId">
        <div class="list"> 
            <a class="listimg" href="">
                <div class="listimgin">
                    <img class="imgin" :src=imgurl alt="">
                   
                <span>{{name1.title}}</span>
                </div>
                
            </a>
            <div class="listmessage">
                <div class="listname">{{name1.content}}</div>
                <div class="situation">
                    <div class="time">
                        <img src="../assets/icon/time.png" alt="">
                        {{createdtime}}
                    </div>
                    <div class="tech">
                        <img src="../assets/icon/label.png" alt="">
                        <a href="">{{name1.type}}</a>
                    </div>
                </div>
            </div>
           
            <div class="label">
                <div class="tag" v-for="(item,key,i) in name1.tag" :key="i">
                    {{item.name}}
                </div>
                
                </div>
        </div>
     </div>
</template>

<script>
import api from '../fetch/api'
export default {
    name:"BlogList",
    data(){
        return{
            s:{},
            createdtime:'',
            imgurl:'http://localhost:5050/png/'
        }
    },
    props:{
        name1:{
            type:Object,
            required:true
        },
    },
    methods:{
        getId(){
                // console.log(res.data.data[0].blog);
                this.$router.push({ path:"blogarticle/" + this.name1.id})
        },
        formattime(){
           this.createdtime = this.$moment(this.name1.created).format('YYYY-MM-DD HH:mm:ss');
        },
        getimg(){
            console.log(this.name1.title);
            
            api.fetchGet('http://localhost:5050/imgurl?title='+this.name1.title,'').then(res=>{
                // console.log(res.data[0].imgurl);
                this.imgurl='http://localhost:5050/png/' + res.data[0].imgurl
            })
        }
    },
    mounted(){
       this.formattime();
         this.getimg();
    },
    watch:{
        name1(){
            this.getimg()
        }
    }
    


    
}
</script>
  <style scoped>
     
       * {
           padding: 0;
           margin: 0;
       }
       .doculists {
           position: relative;
     
          margin: 0 15px;
        width: 350px;

         /* box-shadow: 0 2px 5px 0 rgba(0,0,0,0.16),0 7px 10px 0 rgba(0,0,0,0.12); */
         border-radius: 0 5px;
       }
       .list {
           width: 100%;
             background-color: #fff;
           display: flex;
           flex-direction: column;
            align-content: center;
           
       }
       .listimg {
           display: inline-block;

         
            width: 350px;
            height: 220px;
       }
       .listimgin {
           position: relative;
          width: 100%;
          height: 100%;
       }
       .imgin {
           position: relative;
            display: block;
            width: 100%;
            height: 100%;
       }
       .imgin:after{
            position: absolute;
    top: 0;
    left: 0;
    content: "";
    background-color: yellow;
    opacity: 0.2;
    z-index: 9999;
    width: 100%;
    height: 100%;

       }
       .listimg span {
           display: block;
           position: absolute;
           bottom: 0;
           color: #fff;
           font-size: 22px;
           padding: 24px;
       }
       .listmessage {
      
        width: 320px;
       
        padding: 15px 15px 12px 18px;
       }
       .listname {
           padding-bottom: 2px;
           margin-bottom: 6px;
           padding-left: 0;
       }
       .label {
           width: 350px;
           min-height: 46px;
           display: flex;
           flex-direction: row;
           align-items: center;
       }
       .tag {
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
       .situation {
           display: flex;
           flex-direction: row;
           justify-content: space-between;
       }
       .time {
           display: flex;
           flex-direction: row;
       }
       .time img{
        width: 12px;
        height: 12px;
    
       }
       .tech img {
           width: 12px;
           height: 12px;
       }
       .label {
          
           padding: 0 15px;
          width: 320px;
           border-top:  1px solid black;
       }
   </style>