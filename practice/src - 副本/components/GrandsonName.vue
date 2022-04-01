<template>
   <h1>{{InputValue.want}}</h1>
</template>

    
<script>


//组件间通信一般会用props，而当出现祖祖祖祖孙组件之间的通信，在这种多层级场景等，props太过累赘
//而又不想添加vuex得到更多的包依赖，可以使用provide/inject
//provide在祖先组件中定义，提供方法和数据，而后代组件中可以使用inject来接收
//由于vue的单向流，如果在祖先中改变数值，后代并不会更新  这就是不可响应
//如果要响应，需要把祖先的数据变成可监视的响应对象
//当祖先给的只是字符串
export default {
    name:"GrandSon",
    inject:{
        //子类通过对象类型进行接收完成可响应
        InputValue:{
            default:()=>{}
        }
    },
    creatInterval(msg) {
        let timer = setInterval(() => {
            console.log(msg)
        }, 1000)
        //程序化的侦听器，$once 当页面destory后自动执行内容    
    // 通过 $on(eventName, eventHandler) 侦听一个事件
    // 通过 $once(eventName, eventHandler) 一次性侦听一个事件
    // 通过 $off(eventName, eventHandler) 停止侦听一个事件

        this.$once('hook:beforeDestroy' , function() {
            clearInterval(timer)
        })
    }

     
    
}
</script>