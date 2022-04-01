<template>
  <div id="app">
    <sidetable></sidetable>
    <router-view></router-view>
  </div>
</template>

<script>

import sidetable from './components/sidetable.vue'
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    // HelloWorld,
    sidetable
    
  },
 
     data(){
    return {
      name:"csdcd",
      // slotnn:""

      InValue:{
        want:"给grandson"
      }
    }
  },
  provide(){
    //要实现provide可响应  祖先传递的数据要是对象 子类接收也要是对象
    return{
      InputValue:this.InValue
    }
  },
  methods:{
    getelem(e){
      //this就是vm
      // console.log('get'+ this.$refs.mylogin.getElement);
      console.log(this.InValue);
      this.InValue = e;
    }
  },
  // beforeMount(){ 
  //   console.log('beformount' + this.$refs.mylogin.getElement);
  // },
  mounted(){ 
    //ref是在vue挂载后，组件渲染完成之后生效，在before前都是undefined，不是响应式，大型应用中应尽量避免
    // console.log('mount' + this.$refs.mylogin.getElement);
    
  },
  // beforeCreate() { 
  //    console.log('beforcrea' + this.$refs.mylogin.getElement);
  // },
}
</script>

<style>
body {
  width: 100%;
  height: 10px !important;
   background: url(assets/bg.png);
 background-repeat: repeat;
  background-size: 100% 100%;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

width: 100%;
height: 1000%;
}
* {
  padding: 0;
  margin: 0;
}
</style>
