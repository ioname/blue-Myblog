<template>
   <ul>
       <li v-for="(item,index) in list" :key="index">
           <p>{{item.name}}</p>
           <MyTree :list="item.clist"></MyTree>
       </li>
   </ul>
</template>

<script>
export default {
    name:'MyTree',
    props:{
        list:Array
    }
}
</script>