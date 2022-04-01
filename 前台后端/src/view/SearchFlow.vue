<template>
<div v-show="this.$store.state.showsearch">
     <div class="box" @click.self="changesearch">
        <div class="innerbox">
            <div class="searchbox">
                <div class="uppersearch">
                    <div class="search">
                        <img src="../assets/icon/search.png" alt="">
                        <div>搜索</div>
                    </div>
                    <input class="searchline" type="search" 
                    v-model="searchdata" placeholder="请输入..."
                    @input="search">
                </div>
                <div class="downbox">
                    <div class="showline" 
                    v-for="(item,i) in searchlist"
                    @click="getId(item[2])"
                    :key="i">{{item[0]}}</div>
                </div>
            </div>
        </div>
    </div>
</div>
   
</template>

<script>
export default {
    name:'search-flow',
    data(){
        return {
            searchdata:'',
            contentlist:[],
            searchlist:[]
        }
    },
   methods:{
       changesearch(){
           this.$store.commit("changesearch");
       },
       search(){
           //根据文章标题简介匹配性以及发表顺序附加权值
        this.searchlist = []
            let keyword = this.searchdata.trim().toLowerCase();
           let list = {};
           let num = 0;
           if(this.searchdata != '')
            this.contentlist.forEach(i=>{
                console.log(i[0].indexOf(keyword));
                 let title_index = i[0].toLowerCase().indexOf(keyword);
                let content_title = i[1].toLowerCase().indexOf(keyword);
                if(title_index >= 0 && content_title >= 0){
                    let level = i[0].length/title_index + i[1].length/content_title + this.contentlist.length;
                    list[num] = level
                }else if(title_index >= 0){
                    let level = num+1;
                      list[num] = level
                }else if(content_title >= 0){
                     let level = num;
                     list[num] = level
                }
                num++;
            })
            let arr = Object.keys(list).sort(function(a,b){return list[b]-list[a]});
            arr.forEach(i=>{
                this.searchlist.push(this.contentlist[i]);
                // console.log(this.searchlist);
            })
            
       },
       getlist(){
           this.$axios({
               method:'get',
               url:"http://localhost:5050/search"
           }).then(res=>{
               let data = res.data.results;

                data.forEach(i => {
                    let arr = Object.values(i)
                    this.contentlist.push(arr)
                });
               console.log(this.contentlist);
           })
       },
       getId(e){
        //    console.log(e);
             this.$router.replace({ path:"/blogarticle/" + e});
            this.$store.commit('changesearch');
       }
   },
   created(){
       this.getlist();
   }
}
</script>
 <style scoped>
        .box {
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,.3);        
            position: fixed;
            z-index: 999;
            left: 0;
            top: 0;  
            display: flex;
            justify-content: center;
        }
        .innerbox {
            position: relative;
            width: 1200px; 
            height: 100%;

        }
        .searchbox {
            position: relative;
            top:10vh;
            width: 1200px;
            min-height: 600px;
            background-color: #d3cdc5;
        }
        .uppersearch {
            width: 100%;
            height: 100px;
            padding: 10 0px;

            display: flex;
            flex-direction: row;
            align-items: center;
            border-bottom: 3px solid #71706d;
        }
        .search {
            height: 50px;
            flex: 1;
            position: relative;
            left: 20px;
            line-height: 50px;
            display: flex;
            flex-direction: row;
        }
        .search div {
            color: green;
            font-size: 2rem;
            font-weight: bold;
            margin: 0 10px;
        }
        .search img {
            width: 50px;
            height: 50px;
        }
        .searchline {
            flex:7;
            height: 50px;
            margin: 0 30px;
            font-size: 1.25rem;
           background-color: #d3cdc5;
            border:0px;
            border-bottom: 1px green solid;
        }
        input:focus { 
            outline: none; 
        } 
        .downbox {
            width: 1200px;
            height: 500px;
            overflow: auto;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        .showline {
            cursor: pointer;
            width: 95%;
            height: 60px;
            border-bottom: 1px solid #71706d;
            font-size: 1.75rem;
            font-weight: bold;
            line-height: 60px;
            color:green
        }
        .showline:hover {
            color: aqua;
        }
    </style>