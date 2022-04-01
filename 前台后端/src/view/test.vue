<template>
      <div>
        <div class="content">
            <div class="bgc"></div>
                <div class="contentcenter">
                    <div class="centerupper">                      
                        <div class="upperline">
                           <div class="articleline">1</div>
                           
                        </div>
                      
                    </div>
                   
                </div>
            </div>
          
    </div>
</template>

<script>
export default {
    name:'Te-st'
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
            top:21vh;
            width: 1125px;
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
            justify-content: center;
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
            height: 150px;
            width: 100%;
            border-bottom: 1px solid #1ca0d3;
        }
        .articlefoot {
            height: 100px;
            width: 100%;
            border-top: 1px solid #1ca0d3;
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