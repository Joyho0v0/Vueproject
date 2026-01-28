<template>
  <div id="app">
      <!-- <Main/>
        <el-container>
            <el-aside width="auto">
                <Menu></Menu>
            </el-aside>
            <el-container>
                <el-header><Header></Header></el-header>
                <Tag/>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container> -->
    <router-view></router-view>

  </div>
</template>

<script>
    // import Menu from './component/Menu'
    // import Header from './component/Header'
    // import Tag from './component/Tag'
    import Main from "./pages/Main"
    import Home from './pages/Home.vue'
    export default{
        name:"App",
        components:{
            Main ,
            Home
            // Menu,
            // Header,
            // Tag
        },
        mounted(){
            console.log(this)
        }
    }

</script>

<style lang='less' scoped>

</style>