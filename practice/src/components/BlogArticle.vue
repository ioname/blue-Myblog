<template>
<div>
     <div class="content">
            <div class="bgc"></div>
            <div class="contentcenter">
                    <div class="centerupper">                      
                        <div class="upperline">
                          
                               <div class="articleline">
                                   <div class="lineup">
                                       <div class="labels">
                                           <div class="label"
                                           v-for="(item,i) in taglist[0]" :key="i">
                                                {{item}}
                                           </div>
                                       </div>
                                       <a class="type">
                                           {{arcmessage[0].type}}
                                        </a>
                                   </div>
                                   <div class="linedown">
                                       <span class="created">发布时间：{{arcmessage[0].created}}</span>
                                       <span class="updated">最近更新：xxx</span>
                                   </div>
                               </div>
                               <div class="articlecontent" v-html='this.blogcontent'></div>
                               <div class="articlefoot">
                                   <div class="arclist">
                                         <div class="lastarc">上一篇：xxx</div>
                                        <div class="nextarc">下一篇：xxx</div>
                                   
                                 
                               </div>
                           </div>
                           
                        </div>
                        <div class="catalog">
                            <div class="cataname" >目录</div>
                            <div class="cataline">
                                <li>1</li>
                                <li>2</li>
                                <li>3</li>
                            </div>
                        </div>
                    </div>
                   
            </div>
            <div class="buttonup">
                <div class="button"></div>
                <div class="button"></div>
            </div>
        </div>
</div>
  
</template>
<script>

export default {
    name:"BlogContent",
    data(){
        return{
            id:0,
            blogcontent:' ',
            arcmessage:[],
            taglist:[]
        }
    },
    created(){
              this.arcmessage.push(this.$route.query.data);
              this.blogcontent = this.$route.query.html;
              this.taglist.push( this.$route.query.tags);
    //    this.getArticle();
    console.log(this.taglist);
    },
    beforeMount(){
         
    },
    mounted() {
        // this.infinite();
    }
   
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
    min-height: 500px;
    
}
.bgc {
        background-color: #1ca0d3;
        width: 100%;
        height: 30vh;
        position: absolute;
}
.contentcenter {
    display: flex;
    
    flex-direction: column;
    width: 85%;
    max-width: 1125px;
}
.centerupper {
    position: absolute;
    left: 18vw;
    top:21vh;
    width: 1100px;
    min-height: 500px;
    display: flex;
    flex-direction: row;
    overflow: hidden;
}
.uppername {
    height: 45vh;
    font-size: 15px;
    display: flex;
    
    justify-content: center;
}
.upperline {
    width: 75%;           
    display: flex;
    flex-direction: column;            
    background-color: #fff;
    box-shadow: 0 2px 5px 0 rgba(0,0,0,0.16),0 7px 10px 0 rgba(0,0,0,0.12);
}
.innerline {
    display: flex;
    flex-direction: column;
    height: 100%;
}

.catalog{
    position: relative;
    top: 10vh;
    width: 15%;
    margin-right: 5%;
    padding: 20px;
    text-align: center;
    display: fixed;
}
.cataname {
    font-size: 2rem;
    font-weight: bold;
    width: 100%;
    text-align: center;
}
.cataline {
    width: 100%;
}
.cataline li {
    font-size: 1rem;
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
    background-color: #1ca0d3;
    line-height: 30px;
    color: #fff;
    cursor: pointer;
    margin-right: 5px;
}
.articlecontent {
    min-height: 200px;
    width: 100%;
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
    height: 70%;
}
.lastarc .nextarc{
    width: 40%;
    padding: 10px;
}
.buttonup {
    right: 5px;
    bottom: 5px;
    position: absolute;
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


</style>