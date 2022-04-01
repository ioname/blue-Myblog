<template>
    <div class="index">
       <blogheader></blogheader>
        <router-view></router-view>
        
        <search-flow v-show="searchshow"></search-flow>
        <div class="push1"></div>
        <div class="push"></div>
    </div>
</template>
<script>

import blogheader from '../components/BlogHeader.vue'
import SearchFlow from './SearchFlow.vue'
export default {
    name:'BlogIndex',
    components:{
       blogheader,
        SearchFlow
    },
    data(){
        return {
            searchshow:this.$store.state.showsearch
        }
    }
    
}
</script>
<style scoped>
 .push{
     margin-top: 80px;
     height: 70px;
 }
 .index {
     min-height: 100%;
 }
 .push1{
      margin-top: 40px;
     height: 30px;
 }
</style>