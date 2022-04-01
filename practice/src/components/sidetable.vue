<template>
      <div class="sidetable">
        <div class="sidename">
            <img src="../assets/logo.png" alt="">
            <span>博客管理系统</span>
        </div>
       <div class="sidetables">
           <router-link class="tablein" to="/test" >
               <div class="tablename">
                <span>编辑博客</span>
                <img src="../assets/right.png" alt="" >
               
               </div>
            </router-link >
            <router-link class="tablein" to="/blog">
                <div class="tablename">
                 <span>博客列表</span>
                 <img src="../assets/right.png" alt="">
                
                </div>
             </router-link>
             <router-link class="tablein" to="/types">
                <div class="tablename">
                 <span>编辑标签</span>
                 <img src="../assets/right.png" alt="">
                </div>
             </router-link>
       </div>
       
    </div>
</template>

<script>

export default {
    name:"SideTable",
    data(){
        return {
            index:0
        }
    },
    methods:{
        changeclass(e){
            this.index = e;
        }
    }
   
}
</script>
<style scoped>
        * {
            padding: 0;
            margin: 0;
        }
        .sidetable {
            width: 180px;
            height: 100%;
            position: fixed;
            background-color: #00adee;
            display: flex;
            flex-direction: column;
            border: 3px solid blue;
            z-index: 999;
        }
        .sidename {
            width: 100%;
            /* margin: 0; */
            border-bottom: 1px solid blue;
            height: 100px;
            text-align: center;
            padding-top: 20px;
            font-size: 1.5rem;
            font-weight: bold;
        }
        .sidename img {
            width: 50px;
            height: 50px;
        }
        .sidename span {
            display: block;
            margin-top: 10px;
        }
        .sidetables {
            display: flex;
            flex-direction: column;
            
        }
        .router-link-exact-active {
            background-color: #fff !important; 
           box-shadow: inset 10px 10px 20px rgba(0,0,0,.3) !important;
           
        }
        .tablein {
            text-decoration: none;
           color:black;
            width: 100%;
            height: 80px;
            background-color: #939ada;
            display: flex;
            justify-content: center;
            align-items: center;
           box-shadow: inset 10px -10px 20px rgba(0,0,0,.3);
           cursor: pointer;
        }
        .tablename {
            padding-top: 20px;
            text-align: center;
            height: 50px;
        }
        .tablename img {
            position: absolute;
            right: 0px;
            height: 30px;
            width: 30px;
        }
        .tablename span {
            text-align: center;
            line-height: 30px;
            letter-spacing:5px;
            /* letter-spacing给汉字间隔，word-spacing是单个字母距离; */
            font-size: 1rem;
            font-weight: bold;
        }

    </style>