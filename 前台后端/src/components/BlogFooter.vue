<template>
     <div class="blogfooter">
        <div class="bloginner">
            <div class="upper1">
                <div class="upper">
                
                    <a href="">关于我们</a>
                    <a href="">广告服务</a>
                    <a href="">网站定制</a>
                    <a href="">网站地图</a>
                    <a href="">百度统计</a>
                </div>
            </div>
            
            <div class="down">
                技术支持：天津青于蓝科技有限公司
                备案号：<a href="">津ICP备20005778号-1</a>

                <img class="police" src="../assets/icon/police.png">
                津公网安备 12011602000448 号
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:"Blog-Footer"
}
</script>
 <style scoped>
       * {
           padding: 0;
           margin: 0;
       }
       .blogfooter {
           width: 100%;
           height: 70px;
           background-color: #333333;
           justify-content: center;
            position: relative;
            clear: both;
            margin-top: -70px; 
       }
       .bloginner {

           display: flex;
           flex-direction:column;
           margin: 5px 0;
           justify-content: space-around;
       }
       a{
            color:#888;
           text-decoration: none;
       }
       a:hover {
           color: #aaa;
       }
       .upper {
           height: 45%;
       }
      .upper a{
          padding: 0 5px;
          margin: 0 10px;
          font-size: 15px;
          
      }
      .upper a::after {
        content: "";
        width: 2px;
        height: 14px;
        display: inline-block;
        background-color: #131313;
      
        margin-left: 20px;
      }
      .upper a:last-child::after{
          display: none;
          content: "";
      }
       .down {
           height: 45%;
           padding: 10px 0;
           color:#888;
           display: flex;
           justify-content: center;
           align-items: center;
       }
       .upper1 {
           display: flex;
           justify-content: center;
           padding: 5px 0;
       }
       .police {
           width: 20px;
           height: 20px;
       }
   </style>