<template>
  <div class="header-container">
      <div class="l-content">
            <el-button @click="checkCollapse" icon="el-icon-menu" size="mini"></el-button>
            <!-- 面包屑 -->
            <!-- <span class="text">首页</span> -->
            <el-breadcrumb separator="/">
                <el-breadcrumb-item style="margin-left:20px" v-for="tag in tags" :key="tag.path" :to="{ path: tag.path }">{{tag.label}}</el-breadcrumb-item>
            </el-breadcrumb>
      </div>
      <div class="r-content">
        <el-dropdown @command="handleClick">
            <span class="el-dropdown-link">
                <img class="user" src="../assets/images/2.jpg" alt="">
            </span>
            <el-dropdown-menu @command="handleClick" slot="dropdown">
                <el-dropdown-item>个人中心</el-dropdown-item>
                <el-dropdown-item command="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
      </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import Cookie from 'js-cookie'

export default {
    name:"Header",
    methods:{
        checkCollapse(){
            // console.log(this)
            this.$store.commit('collapseMenu')
            // console.log(this.$store.state.tab.isCollapse)
        },
        handleClick(command){
            console.log(command)
            if(command == "logout"){
                console.log("退出")
                Cookie.remove('token')
                this.$router.push('/login')
                // 清除cookie中的menu
                Cookie.remove('menu')
            }

            
        }
    },
    computed:{
        ...mapState({tags: state=>state.tab.tabList})
    }
}
</script>

<style lang="less">
    html,body {
        padding: 0;
        margin:0;
    }
    .header-container {
        height: 60px;
        background-color: #222;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding:0 20px;
        .text {
            color: #fff;
            font-size: 14px;
            margin-left: 10px;
        }
        .l-content {
            display: flex;
            align-items: center;
            /deep/.el-breadcrumb_item {
                .el-breadcrumb_inner {
                    font-weight: normal;
                    &.islink {
                        color: #888
                    }

                }
                &:last-child {
                    &.islink {
                        color: #fff
                    }
                }
            }
        }
        .r-content {
            .user {
                width: 40px;
                height: 40px;
                border-radius: 50%;
            }
        }
    }
</style>