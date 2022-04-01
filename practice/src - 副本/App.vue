<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App">
      {{name}}
      <template v-slot:aaa="slotnn"> 
         {{slotnn.value1}} 这是aaa
          </template>
     
      <template #xxx> 这是xxx </template>
    </HelloWorld> -->
    <treefa></treefa>
    <!-- Input框改变实践使用change -->
    <input type="text" @change="getelem(InValue.want)" v-model="InValue.want">
    <!-- <HelloWorld ref="mylogin"></HelloWorld> -->

    <keep-alive>
     用于保证组件的状态，避免页面切换再切回来后重新渲染影响效率，但要求每个组件都有自己的编号
    </keep-alive>   
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import treefa from './components/TreeFa.vue'
export default {
  name: 'App',
  components: {
    // HelloWorld,
    treefa
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
    console.log(this.foo);
  },
  // beforeCreate() { 
  //    console.log('beforcrea' + this.$refs.mylogin.getElement);
  // },
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
