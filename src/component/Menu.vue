<template>
    <div>
        <el-menu
            default-active="1-4-1" 
            class="el-menu-vertical-demo" 
            @open="handleOpen" 
            @close="handleClose" 
            :collapse="getCollapse"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
        >
            <h3>{{getCollapse?'后台':'通用后台管理系统'}}</h3>
            <el-menu-item @click="checkMenu(item)" v-for="item in noChildren" :key="item.name" :index="item.name">
                <i :class="`el-icon-${item.icon}`"></i>
                <span slot="title">{{item.label}}</span>
            </el-menu-item>

            <el-submenu v-for="item in hasChildren" :key="item.label" :index='item.label'>
                <template slot="title">
                    <i :class="`el-icon-${item.icon}`"></i>
                    <span slot="title">{{item.label}}</span>
                </template>
                <el-menu-item-group  v-for="p in item.children" :key="p.name">
                    <el-menu-item @click="checkMenu(p)" :index="p.path">{{p.label}}</el-menu-item>
                </el-menu-item-group>
                
            </el-submenu>
            
            
        </el-menu>

    </div>
</template>

<script>
import Cookie from 'js-cookie'
export default {
    name:"Menu",
    data(){
        return {
            menuData:[]
        }
    }, 
     created(){
          this.menuData = JSON.parse(Cookie.get('menu'))
      },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      checkMenu(item){
        if(this.$route.path != item.path && !(this.$route.path === '/home' && (item.path === '/'))){
           this.$router.push(item.path) 
           console.log(item)
           this.$store.commit('selectMenu',item)
        } 
        
      },
    },
    computed:{
        noChildren(){
            return this.menuData.filter((p)=>{return !p.children})
            // this.menuData.filter(item => !item)
        },
        hasChildren(){
            return this.menuData.filter((p)=>{return p.children})
        },
        getCollapse(){
            return this.$store.state.tab.isCollapse
        },
        
    },


}
</script>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}

.el-menu {
    transition: all 10ms;
    height: 100vh;
    border-right: none;
    h3 {
        color: #ddd;
        text-align: center;
        line-height: 48px;
        font-size: 16px;
        font-weight: 400px;
    }
}
</style>