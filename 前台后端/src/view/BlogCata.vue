<template>
    <div class="boxcata">
        <div class="cataname" >目录</div>
        <div class="cataline" >
            <div v-for="(item,i) in this.$store.state.cata" :key="i" @click="jumpto(i)" 
            :class="{active: i == light}">
                <span>{{item}}</span>
            </div>
        </div>
    </div>
        
     
</template>

<script>
export default {
    name:'blog-cata',
    data(){
        return{
            cata:[]
        }

    },
    props:{
        light:{
        }
    },
    created(){
     this.cata.push(this.$store.state.cata)
    },
    // computed:{
    //     cata(){
    //         return this.$store.state.cata;
    //     }
    // },
    methods:{
        jumpto(i){
            this.$emit("changed",i)
        },
        getmessage(){
            // if( JSON.parse(sessionStorage.getItem('cata')))
          
            // else 
           
        //    console.log(); 
           

            // console.log(this.cata);
        }
    }
   
}
</script>
<style scoped>

.cataname {
    font-size: 2rem;
    font-weight: bold;
    width: 100%;
 
}
.boxcata {
     background-color: #8ad9f8 !important;
     border-radius: 10px;
     padding: 5px;
}
.cataline {
    width: 100%;
}
.cataline div {
    font-size: 1rem;
    cursor: pointer;
    position: relative;
    left: 0;
    margin: 5px 0;
    list-style-type: none;
    display: block
}
.cataline div:hover{
    color: #fff;
}
.active {
    color: #fff;
}

</style>