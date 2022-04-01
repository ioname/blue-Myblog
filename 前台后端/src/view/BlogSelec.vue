<template>
        <div >
            <span class="selection">
                {{name1}}
                <span>{{num}}</span>
            </span>
               <!-- <button @click="getlist">xx</button> -->
        </div>  
     
</template>

<script>
export default {
    name:"BlogSelec",
    props:{
        name1:{
            
        },
        num:{

        }
    },
    methods:{
        // typeo(){
        //     console.log(typeof(this.name1));
        //     alert(typeof(this.name1))
        // },
        
    }
}
</script>
<style scoped>
      
       .selection {
           display: inline-block;
           background-color: #f8f9f9;
           height: 38px;
         
            font-size: 1rem;
            font-weight: 500;
            box-shadow: 0 3px 5px rgba(0,0,0,.12);
            line-height: 39px;
            margin: 10px 10px;
            border-radius: 5px;
            cursor: pointer;
            padding: 0 14px;
       }
       .selection span {
        font-size: .5rem;
        
       }
   </style>

