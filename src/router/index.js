import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../pages/Home.vue'
import User from '../pages/User.vue'
import Mall from '../pages/Mall'
import pageOne from '../pages/pageOne'
import pageTwo from '../pages/pageTwo'
import Login from "../pages/Login"
import Main from "../pages/Main"
import Cookie from 'js-cookie'

const routes = [
    // 主路由
    {
        name:"Main",
        path:'/',
        component: Main,
        redirect:'/home',
        children:[
            //子路由
            {name:"home",path:"home",component:Home},//首页
            {name:"user",path:"user",component:User},//用户管理
            {name:'mall',path:"mall",component: Mall},//商品管理
            {name:'page1',path:"page1",component:pageOne},
            {name:'page2',path:"page2",component:pageTwo}
        ]
    },
    {
        path:"/login",
        name:"login",
        component:Login
    }
    
]

    

Vue.use(VueRouter)

const router = new VueRouter({
    routes
})

//添加全局前置路由守卫
router.beforeEach((to,from,next)=>{
    //判断token是否存在     token不存在 说明用户未登录，跳转登录页
    const token = Cookie.get('token')
    if(!token && to.name!='login'){
        next({name:'login'})
    }else if(token && to.name == 'login'){
        next({name:'home'})
    }else{
        next()
    }

})
export default router