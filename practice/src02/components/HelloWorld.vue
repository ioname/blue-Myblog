<template>
  <div class="hello">
    <!-- 此处inline-template把grandson组件当做template，也就是说此处的div就是grandson的template，
    而{{xxa}}用的也是子组件的，与helloworld无关 -->
    <!-- 使用了inline后，grandson内部的template无效 -->
   <grandson inline-template>  
     <div>
       <p>abckasd</p>
       <p>{{xxa}}</p>
     </div>
   </grandson>
   <my-component></my-component>
   <!-- 按钮控制  内容离开过渡动画 -->
    <div id="demo">
      <button v-on:click="show= !show">
        TTTT
      </button>
      <transition name="fade">
        <p v-if="show">aaaa</p>
      </transition>
    </div>
  </div>
      <!-- <script type="text/x-template" id="my">
    <div>
      <h2>hello</h2>
    </div>
  </script> -->
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
      xxa:"xxxx",
      show:true
    }
  },
  methods:{
    
    
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
/* 离开过渡动画  自带class类名词 格式   分为开始状态，过渡时，结束状态  共有6种*/
.fade-enter-active, .fade-leave-active {
  transition:opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
