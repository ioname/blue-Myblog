<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
   <HelloWorld/>
  </div>
  <!-- 由于 JavaScript 的限制，Vue 不能检测数组和对象的变化。 -->
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
export default {
  name: 'App',
  components:{
    HelloWorld
  },
  data(){
    return {
      name:"csdcd",
    }
  },
 
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
