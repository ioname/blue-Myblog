<template>
  <div id="app">
      <blog-index></blog-index>
        <blogfooter></blogfooter>
  </div>
</template>

<script>

import blogfooter from './components/BlogFooter.vue'
import BlogIndex from './view/BlogIndex.vue'

export default {
  name: 'App',
  components:{
        blogfooter,
    BlogIndex
    }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  
  color: #2c3e50;
  height: 100%;
}
html,body{
  background: url(./assets/bg.png) repeat;
  margin: 0px;
  height: 100%;
  padding: 0px;
}
a {
  text-decoration: none;
  color: unset;
}
table {
  border-collapse: collapse;
    border-spacing: 0;
    empty-cells: show;
    border: 1px solid #cbcbcb;
}
thead {
   background-color: #e0e0e0;
    color: #000;
    text-align: left;
    vertical-align: bottom;
}
th,td{
   border-left: 1px solid #cbcbcb;
    border-width: 0 0 0 1px;
    font-size: inherit;
    margin: 0;
    overflow: visible;
    padding: .5em 1em;
}
</style>
