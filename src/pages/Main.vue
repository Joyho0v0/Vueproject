<template>
  <div>
        <el-container>
            <el-aside width="auto">
                <Menu></Menu>
            </el-aside>
            <el-container>
                <el-header>
                    <Header></Header>
                </el-header>
                <Tag></Tag>
                <el-main>
                    <router-view></router-view>             
                </el-main>
            </el-container>
        </el-container>
  </div>

</template>

<script>
    import Menu from '../component/Menu'
    import Header from '../component/Header'
    import Tag from '../component/Tag'

    export default{
        name:"Main",
        components:{
            Menu,
            Header,
            Tag,

        },
        mounted(){
            console.log('Main')
        }
    }

</script>

<style lang='less' scoped>
    html,body {
        padding: 0;
        margin:0;
    }
    .el-header {
        padding: 0;
    }
</style>