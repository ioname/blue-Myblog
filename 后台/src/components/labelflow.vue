<template>
   <div class="labelflow">
       <div class="labelbox">
           <div class="boxheader">标签列表</div>
           <div class="boxbody">
               <ul class="labellist">
                   <li class="label" 
                   v-for="(item, i) in  labellist"
                    :key="i"
                    v-bind:class="{labelselec:classObject(i)}"
                    @click="changeclass(i)">
                    {{item}}</li>
                   
               </ul>
           </div>
           <div class="choose">
               <div class="button" @click="unshowlabel">确定</div>
           </div>
       </div>
    </div>
</template>

<script>
export default {
    name:'typeflow',
    data(){
        return {
            labellist:[],
            index: []
        }
    },
    methods:{
        unshowlabel(){
            this.$emit("unshowlabel",false);
            this.$emit("inline",this.index)
        },
        getlabellist(){
            this.$axios({
                method:'get',
                url:'http://localhost:5050/taglist'
            }).then(res=>{
                let answer = res.data.results;
                for(var i in answer)
                this.labellist.push(answer[i].name)
                
            })
        },
        //用于设置index，index是选中的标签组成的数组
        changeclass(e){
            // console.log(1);
            for(var i in this.index){
                if(e == this.index[i].key){
                    this.index.splice(i,1);
                    return ;
                }
            }
                if(this.index.length == 4)
                return ;
                let a = {};
                a['key'] = e,
                a['name'] = this.labellist[e]
                this.index.push(a)
            console.log(this.index);
        },
        //根据index渲染class
          classObject(e){
            for(var i in this.index){

                if(e == this.index[i].key)
                   { 
                   return true
                   }
            }
             return false
        }
    },
    mounted(){
        this.getlabellist()
    }
}
</script>
  <style scoped>
       .labelflow{
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,.5);
            position: fixed;
            left: 0;
            top: 0;
            z-index: 999;
            display: flex;
            justify-content: center;
            /* align-items: center; */
       }
       .labelbox {
           width: 900px;
           height: 500px;
           background-color: #91d2ff;
           position: relative;
           top: 100px;
           display: flex;
           flex-direction: column;
           border-radius: 10px;
       }
       .boxheader {
          
           height: 70px;
           width: 100%;
           padding: 10px 0;
           text-align: center;
           font-size: 2.25rem;
           font-weight: bold;
           margin-top: 10px;
           line-height: 70px;
       }
       .boxbody {
            background-color: #fff;
            border-radius: 10px;
            height: 270px;
            border: 2px solid blue;
            margin:10px
       }
       .label{
           display: inline-block;
           background-color: #f8f9f9;
           height: 48px;
         min-width: 50px;
         text-align: center;
            font-size: 1rem;
            font-weight: 500;
            box-shadow: 0 3px 5px rgba(0,0,0,.3);
            line-height: 48px;
            margin: 10px 10px;
            border-radius: 5px;
            cursor: pointer;
            padding: 0 14px;
       }
       .labelselec{
        background-color: #4ad4d4;
        /* box-shadow: 8px -1px -1px rgba(0,0,0,0.12); */
       }
       .choose {
           width: 100%;
           display: flex;
           justify-content: center;
           line-height: 80px;
            height: 80px;
       }
       .button {
           margin-top: 20px;
           width: 100px;
           height: 50px;
            border-radius: 10px;
           cursor: pointer;
           background-color: #f8f9f9;
           box-shadow: 0 3px 5px rgba(0,0,0,.3);
            text-align: center;
            line-height: 50px;
       }
   </style>