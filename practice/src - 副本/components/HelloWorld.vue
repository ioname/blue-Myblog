<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <slot></slot>
    <slot name="aaa" :value1="xxa"></slot>
    <slot name="xxx"></slot>
  
    <!-- <h3 id="h31"  ref="h31" @click="getElement"><h2>这是h2</h2>这是h3</h3> -->
    <grandson></grandson>
  </div>
</template>

<script>
import grandson from './GrandsonName.vue'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  components:{
    grandson
  },
  data(){
    return {
      xxa:"xxxx"
    }
  },
  methods:{
    getElement(){
      //innerText获取所有文字，忽视标签 这是h2  这是h3
      //获取html标签和文字 <h2 data-v-469af010="">这是h2</h2>这是h3
      console.log(document.getElementById("h31").innerHTML);
      console.log(this.$root);//这个是app的vm
      console.log(this.$parent); //不推荐使用，大型应用一旦更改会很乱
      console.log(this); //这个是当前组件vm  小型demo可以使用，当大型中还是推荐vuex
      //promise 负责异步操作  有效避免回调地狱，无论某个环节函数正确与否都可以继续往下执行
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
