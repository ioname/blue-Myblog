<template>
    <div class="blogheader">
        <div class="bloginner">
            <div class="blogpic">
                <a href="">
                    <img src="../assets/logo.png" alt="">
                    <span>文思博客</span>
                </a>
                
            </div>
            <div class="selections">
                <router-link class="selection" to="/">
                    <img src="../assets/icon/index.png" alt="">
                    <span>首页</span>
                </router-link>
                <router-link class="selection" to="/bloglabel">
                    <img src="../assets/icon/label.png" alt="">
                    <span>标签</span>
                </router-link>
                <div class="selection" @click="showsearch">
                    <img src="../assets/icon/search.png" alt="">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:"Blog-Header",
    methods:{
        showsearch(){
            this.$store.commit('changesearch');
            console.log(this.$store.state.showsearch);
        }
    }
}
</script>
<style scoped>
    * {
        padding: 0px;
        margin: 0px;
    }
    .blogheader {
        z-index: 998;
        display: flex;
        position: fixed;
        width: 100%;
        height: 70px;
        justify-content: center;
        background-color: #1ca0d3;
        box-shadow:  0 2px 5px 0 rgba(0,0,0,0.16),0 7px 10px 0 rgba(0,0,0,0.12);
    }
    .bloginner {
        display: flex;
        width: 85%;
        max-width: 1125px;
        justify-content: space-between;
    }
    .blogpic {
    height: 100%;
        line-height: 70px;
        display: inline-block;
    }
    .blogpic a {
    vertical-align: middle;
    line-height: 70px;
    text-decoration: none;
    color:unset;
    cursor: pointer;
    }
    a img{
        height: 70%;
        vertical-align: middle;
    }
    a span {
        vertical-align: middle;
        font-size: 2rem;
        color:#fff;
        font-weight: bold;
    }
    .selections {
        flex: 5;
        display: flex;
        justify-content: flex-end;
        height: 100%;
    }
    .selection {
        line-height: 70px;
        padding: 0 15px;
        cursor: pointer;
    }
    .selection:hover {
        background: rgba(0,0,0,.3);
    }
    .selection img{
        vertical-align: middle;
        /* height: 70px; */
        width: 25px;
        height: 25px;
    }
    .selection span {
        color:#fff;
        font-size: 15px;
    }

</style>