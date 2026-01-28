# 笔记

## ref属性
    1.被用来给元素或子组件注册引用信息（id的替代者）
    2.应用在html标签上获取的是真实的DOM元素，应用在组件上获取的是组件的实例对象
    3.使用方式：
        打标识：<h1 ref="xxx">......</h1> 或 <School ref="xxx"/>
        获取： this.$refs.xxx

## 配置项props
    功能：让组件接受外部传过来的数据
        （1）传递数据：
                <Demo name='xxx'/>
         (2) 接收数据：
                第一种方式（只接收）：
                    props:['name']
                第二种方式（限制类型）：
                    props:{
                        name:Number
                    }
                第三种方式（限制类型、限制必要性、指定默认值）
                    props:{
                        name:{
                            type:String,//类型
                            required:true,  //必要性
                            default:'老王'  //默认值
                        }
                    }
    
        备注：props是只读的，Vue底层会监测你对props的修改，如果进行了修改，就会发出警告，
                若业务需要修改，那么就在data中定义个变量去接收接收到的props值，然后对那个变量进行修改
                （因为props执行在data之前 所以data可以接收到props的值

## mixin(混入)

    功能：可以把多个组件共用的配置提取成一个混入对象
    使用方式：
        第一步：定义混合，例如
                {
                    data(){...},
                    methods:{...}
                    ....
                }
        第二步：使用混合，例如：
            （1）全局混合：Vue.mixin(xxx)
            （2）局部混入：mixins:[xxx]

##插件
    功能：用于增强Vue
    本质：包含install方法的一个对象，install的第一个参数是Vue，第二个以后的参数是插件使用者传递的数据。
    定义插件：
            对象.install = function(Vue,option){
                //1.添加全局过滤器
                Vue.filter(...)

                //2.添加全局指令
                Vue.directive(...)
    
                //3.配置全局混入（合）
                Vue.mixin(...)
    
                //4.添加实例方法
                Vue.prototype.$myMethod = function(){...}
                Vue.prototype.$myProperty = xxxx
            }
        使用插件：Vue.use()

## scoped样式
        作用：让样式在局部生效，防止冲突
        写法：<style scoped>
## 总结TodoList案例

1.组件化编码流程：
    （1）拆分静态组件：组件要按照功能点拆分，命名不要与html元素冲突
    （2）实现动态组件：考虑好数据的存放位置，数据是一个组件在用，还是一些组件再用
            (1)一个组件再用：放在组件自身即可
            （2）一些组件在用：放在他们共同的父组件上(<span style="color:red">状态提升</span>)
        
    (3)实现交互：从绑定事件开始

2、props适用于：
        （1）父组件 ===>  子组件  通信
        （2）子组件 ===>  父组件 通信(父先给子一个函数)

3、使用v-model是要切记：v-model绑定的值不能是props传过来的值，因为props是不可以修改的

4、props传过来的若是对象类型的值，修改对象中的属性是Vue不会报错，但不推荐这样使用

## webStorage
1.存储内容大小一般支持5MB左右（不同浏览器可能不一样）
2.浏览器端通过Window.seesionStorage 和 Windows.localStorage属性实现本地存储机制
3.相关API
    1、xxxxStorage.setItem('key','value')
            该方法接收一个键和值作为参数，会把键值对添加到存储中，如果键名存在，则更新对应的值
    2、xxxxStorage.getItem('key')
            该方法接收一个键名作为参数，返回键名对应的值
    3、xxxxStorage.removeItem('key')
            该方法接收一个键名作为参数，并把该键名从存储中删除
    4、xxxxStorage.clear()
            该方法会清空存储中的所有数据

备注：
    1、SessionStorage存储的内容会随着浏览器窗口的关闭而消失
    2、LocalStorage存储的内容，需手动清除才会消失
    3、xxxxStorage.getItem(xxx)如果对应的Value获取不到，那么getItem的返回值是null
    4、JSON.parse(null) 的结果依旧是null



## 组件的自定义事件
1.一种组件间的通信方式，适用于：子组件 ===> 父组件
2.使用场景：A 是父组件，B是子组件，B想给A传数据，那么就要在A中给B绑定自定义事件（事件的回调在A中）。
3、绑定自定义事件：
    1.第一种方式，在父组件中:`<Demo @atguigu='test'/> `  或 `<Demo v-on:atguigu='test'/>`

​    2.第二种方式，在父组件中

```vue
<Demo ref="demo">
    ......
    mounted(){
		this.$refs.xxx.$on('atguigu',this.test)
    }
</Demo>
```

​	3.若想让自定义事件只能触发一次,可以使用 `once`修饰符,或 `$once`方法



4.触发自定义事件: `this.$emit('atguigu',数据)`

5.解绑自定义事件 `this.$off('atguigu')`

6.组件上也可以绑定原生DOM事件,需要使用 `native`修饰符

7.注意: 通过 `this.$refs.xxx.$on('atguigu',回调)`绑定自定义事件时,回调要么配置在methods中,要么用箭头函数,否则this指向会出问题!

## nextTick
    1.语法：`this.$nextTick(回调函数)`
    2.作用：在下一次DOM更新结束后执行其指定的回调函数
    3.什么时候用：当改变数据后，要基于更新后的新的DOM进行某些操作时，要在nextTick所指定的回调函数中执行





## 全局事件总线（GlobalEventBus）

1.一种组件间通信的方式，适用于任意组件间的通信

2.安装全局事件总线

```vue
new Vue({
    .....
    beforeCreate(){
        Vue.prototype.$bus = this      //安装全局事件总线,$bus就是当前应用的vm
    },
	.....
})
```



3.使用事件总线：

​		1.接收数据：A组件想接收数据，则在A组件中给$bus绑定自定义事件，事件的回调留在A组件自身

​		

```vue
	methods:{
		demo(data){.....}
    } ,
    mounted() {
        this.$bus.$on('xxx',this.demo)
    },
```

​		2.提供数据：`this.$bus.$emit('xxx',数据)`



4.最好在beforeDestroy钩子中，用$off去解绑当前组件所用到的事件



## 消息订阅与发布

​	1.一种组件间的通信方式，适用于任意组件间通信

​	2.使用步骤：

​		（1）安装pubsub：`npm i pubsub-js`	

​			(2) 引入：`import pubsub from 'pubsub-js'`

​				(3)接收数据：A组件想接收数据，则在A组件中订阅消息，订阅的回调留在A组件自身

```vue
this.pubId = pubsub.subscribe('hello',function(msgName,data){
            console.log("有人发布了hello消息，hello消息的回调执行了",msgName,data)
        })
```

​				（4）提供数据：`pubsub.publish('xxx',数据)`

​					（5）最好在beforeDestroy钩子中，用pubsub.unsubscribe去取消订阅

## Vue封装的过度与动画
    1.作用：在插入、更新或移除DOM元素时，在合适的时候给元素添加样式类名
    2.写法：
        1.准备好样式“
            元素进入样式：
                1.v-enter:进入的起点
                2.v-enter-active:进入过程中
                3.v-enter-to：进入的终点
            元素离开样式
                1、v-leave：离开的起点
                2.v-leave-active：离开过程中
                3.v-leave-to：离开的终点
            
        2.使用`<transition>`包裹要过度的元素，并配置name属性
        ```
        <transition name="hello">
            <h1 v-show="isShow">你好啊！</h1>
        </transition>
        ```
        3.备注：若有多个元素需要过度，则使用`<transition-group>`,且每一个元素都要指定key值




## 插槽

1.作用：让父组件可以向子组件指定位置插入html结构，也是一种组件通信的方式，适用于父组件=====》子组件

2.分类： 默认插槽	具名插槽	作用域插槽

3.使用方式：

​	1.默认插槽

​		

```vue
父组件中：
		<Category>
			<div>html结构1</div>
		</Category>

子组件中：
		<template>
			<div>
                <!-- 定义插槽-->
                <slot>插槽默认内容</slot>
            </div>
		</template>
```



​	2.具名插槽

```vue
父组件中：
		<Category>
            <template slot="center">
            	<div>
                    html结构1
                </div>
            </template>
			<template v-slot:footer>
            	<div>
                    html结构2
                </div>
            </template>
		</Category>

子组件中：
		<template>
			<div>
                <!-- 定义插槽-->
                <slot name="center">插槽默认内容</slot>                
                <slot name="footer">插槽默认内容</slot>
            </div>
		</template>	
```



​	3.作用域插槽：

​			1.理解：**数据在组件自身，但根据数据生成的结构需要组件的使用者决定。**（games数据在Category组件中，但使用数据所遍历出来的结构由App决定）

​			2.具体编码：

```vue
父组件中：
		<Category>
            <template scope="scopeData">
				<!--生成的是ul列表-->
            	<ul>
                    <li v-for="item,index in scope.games"  :key='index'>{{item}}</li>
                </ul>  
            </template>
		</Category>
		<Category>
            <template scope="scopeData">
				<!--生成的是h4标签-->
                <h4 v-for="item,index in scope.games"  :key='index'>{{item}}</h4>
            </template>
		</Category>

子组件中：
		<template>
			<div>
                <slot :games="games">插槽默认内容</slot>                
            </div>
		</template>	

		<script>
			export default {
                name:"Category",
                props:['listData','title'],
                data(){
                    return {
                        games:['红色警械','穿越火线','劲舞团','超级玛丽'],
                    }
                }

            }
		</script>

```



​		



## vuex

### vuex是什么

1.概念：专门在Vue中实现集中式状态（数据）管理的一个Vue插件，对vue应用中多个组件的共享状态进行集中式的管理（读/写），也是一种组件通信方式，且适合于任意组件间通信

2.Github地址：https://github.com/vuejs/vuex



### 什么时候使用vuex

​	1.多个组件依赖于同一个状态

​	2.来自不同组件的行为需要变更同一状态



### 搭建vuex环境

​		1.创建文件：src/store/index.js

```vue
import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

// 准备actions——用于响应组件中的动作
const actions = {}
//准备mutations——用于操作数据（state）
const mutations = {}
// 准备state——用于存储数据
const state = {}
console.log(this)

// 创建并暴露store
export default new Vuex.Store({
    actions:actions,
    mutations:mutations,
    state,  //简写  state:state

})

```



### 基本使用

​	1.初始化数据，配置actions，配置mutations，操作文件store.js

```
import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

const actions = {
    jia(context,value){
        console.log("actions中的jia被调用了 ")
        context.commit('JIA',value)
    },
    jian(context,value){
        context.commit('JIAN',value)
    },
    jiaOdd(context,value){
        if(context.state.sum % 2){
            context.commit('JIA',value)
        }
    },
    jiaWait(context,value){
        setTimeout(() => {
            context.commit('JIA',value)
        }, 300);
    }
}
const mutations = {
    JIA(state,value){
        console.log("mytations中的JIA被调用了 ")
        state.sum += value
    },
    JIAN(state,value){
        state.sum -= value
    }
}
const state = {
    sum:0,
}
console.log(this)

export default new Vuex.Store({
    actions:actions,
    mutations:mutations,
    state,  //简写  state:state

})

```

​	2.组件中读取vuex中的数据：$store.state.sum

​	3.组件中修改vuex中的数据：$store.dispatch('action中的方法名',数据)  或 $store.commit('mutations中的方法名',数据)



​	备注：若没有网络请求或其他业务逻辑，组件中可以越过actions，即不写dispatch，直接编写commit





### getters的使用

​	1.概念：当state中的数据需要经过加工后再使用，可以使用getters加工

​	2.再store.js中追加getters配置

```
// 准备getter——用于将state中的数据进行加工
const getters = {
    bigSum(state){
        return state.sum*10
    }
}

export default new Vuex.Store({
    actions:actions,
    mutations:mutations,
    state,  //简写  state:state
    getters 
})
```



### 四种map用法

**1.mapState方法：**用于帮助我们映射state中的数据为计算属性

```
computed:{
	...mapState({sum:'sum',school:'school',subject:'subject'})	//对象写法
	...mapState(['sum','school','subject']),     //简写	数组写法
}
```

**2.mapGetters方法：**用于帮助我们映射getters中的数据为计算属性

```
computed:{
	...mapState({bigSum:'bigSum'})
	...mapState(['bigSum'']),     //简写
}
```

**3.mapActions方法：**用于帮助我们生成与actions对话的方法，即：包含 `$store.dispatch(xxx)`的函数

```
methods:{
	//靠mapActions生成：increment，decrement（对象式）
	...mapMutations({incrementOdd:'jiaOdd',incrementWait:'jiaWait'}),
    ...mapMutations(['jiaWait','jiaOdd']),
}
```

**4.mapMutations方法：**用于帮助我们生成与mutations对话的方法，即：包含 `$store.commit(xxx)`的函数

```
methods:{
	//靠mapMutations生成：increment，decrement（对象式）
	...mapMutations({increment:'JIA',decrement:'JIAN'}),
    ...mapMutations(['JIA','JIAN']),
}
```

备注：mapActions与mapMutations使用时，若需要参数：再模板中绑定事件时传递好参数，否则参数是事件对象



## 模块化+命名空间

​	1.目的：让代码更好维护，让多种数据分类更加明确

​	2.修改 `store.js`

```js
// 求和功能相关配置
const countOptions = {
    namespaced:true,		//开启命名空间
    actions : {。。。。。},
    mutations : {。。。。},
    state : {。。。。},
    getters : {。。。。},
}

// 存储功能相关配置
const storeOptions = {
    namespaced:true,		//开启命名空间
    actions : {。。。。。},
    mutations : {。。。。},
    state : {。。。。},
    getters : {。。。。},
}

export default new Vuex.Store({
    modules:{
        countAbout:countOptions,
        personAbout:personsOptions
    }
})

```



3.开启命名空间后，组件中读取state数据：

```js
//方法一：自己直接读取
this.$store.state.personAbout.list
//方法二：借助mapState读取
...mapState('personAbout',['list'])
```



4.开启命名空间后，组件中读取getters数据：

```js
//方法一:自己直接读取
this.$store.getters['personAbout/firstPersonName']
//方法二：借助mapState读取
...mapGetters('personAbout',['firstPersonName'])
```



5.开启命名空间后，组件中调用dispatch：

```js
//方法一:自己直接调用
this.$store.dispatch('personAbout/addPersonName',person)
//方法二：借助mapState读取
...mapActions('personAbout',{incrementOdd:'jiaOdd'})
```



6.开启命名空间后，组件中调用commit：

```js
//方法一:自己直接调用
this.$store.commit('personAbout/addPerson',person)
//方法二：借助mapState读取
    ...mapMutations('personAbout',{JIA:'JIA'})
```





## 路由

### v-router

​		vue中的插件库，专门用来实现SPA应用



### 对SPA应用的理解

​	1、单页Web应用（single page web application，SPA)

​	2、整个应用只有**一个完整的页面**

​	3、点击页面上的导航链接**不会刷新**页面，只会做页面的局部更新

​	4、数据需要通过ajax请求获取



### 1.什么是路由

​	1.一个路由就是一组映射关系（key-value）

​	2.key为路径，value可能是function 或 component



####     2.路由分类

​		（1）后端路由：

​			1.理解：value是function，用于处理客户端提交的请求

​			2.工作过程：服务器接收到一个请求时，根据**请求路径**找到匹配的**函数**来处理请求，返回响应数据		

​		（2）前端路由：

​			1.理解：value是component，用于展示页面内容

​			2.工作过程：当浏览器的路径改变时，对应的组件就会显示



	### 基本的使用

​	1.安装vue-router,命令：`npm i vue-router`

​	2.应用插件：`Vue.use(VueRouter)`

​	3.编写router配置项：

```js
//该文件专门用于创建整个应用的路由器
import VueRouter from "vue-router";
// 引入组件
import About from '../components/About'
import Home from '../components/Home'

//创建路由器
export default new VueRouter({
    routes:[
        {
            path:'/about',
            component:About
        },
        {
            path:'/home',
            component:Home
        },
    ]
})

```



4、实现切换（active-class可配置高亮样式）

`<router-link to="/about" class="list-group-item" active-class="active">About</router-link>`



5、指定展示位置

`<router-view></router-view>`



### 2.几个注意点

​	1、路由组件通常存放在 `pages`文件夹，一般组件通常存放在 `components`文件夹

​	2、通过切换，”隐藏“了的路由组件，默认是被销毁掉的，需要的时候再去挂载

​	3、每个组件都有自己的 `$route`属性，里面存放着自己的路由信息

​	4、整个应用只有一个router，可以通过组件的 `$router`属性获取到





## 嵌套（多级）路由

​	1、配置路由规则，使用children配置项：

```js
routes:[
        {
            path:'/about',
            component:About
        },
        {
            path:'/home',
            component:Home,
            children:[		//通过children配置子路由
                {
                    path:'news',	//此处一定不要写：/news
                    component:News
                },
                {
                    path:'message',		//此处一定不要写：/messages
                    component:Message
                }
            ]
        },
        
    ]
```



​	2、跳转（要写完整路径）：

`<router-link class="list-group-item" to="/home/news" active-class="active">News</router-link>`



### 4.路由的query参数

​	1.传递参数

```js
<!-- 跳转路由并携带query参数，to的字符串写法 -->
                <!-- <router-link :to="`/home/message/detail?id=${m.id}&title=${m.id}`">{{m.title}}</router-link> -->

<!-- 跳转路由并携带query参数，to的对象写法 -->
<router-link 
  :to="{
       path:'/home/message/detail',
       query:{
           id:m.id,
           title:m.title
       },
}">
    跳转
</router-link>
```

​	

​	2.接收参数

```js
$route.query.id
$route.query.title	
```



### 5.命名路由

1. 作用：可以简化路由的跳转

2. 如何使用

   1. 给路由命名：

      ```js
      routes:[
              {
                  path:'/home',
                  component:Home,
                  children:[
                      {
                          path:'news',
                          component:News
                      },
                      {
                          path:'message',
                          component:Message,
                          children:[
                              {
                                  name:"xiangqing",	//给路由命名
                                  path:'detail',
                                  component:Detail
                              }
                          ]
                      }
                  ]
              },
              
          ]
      ```

   2. 简化跳转：

      ```vue
      <!--简化前，需要完整的路径-->
      
      <router-link to="/about" class="list-group-item" active-class="active">About</router-link>
      
      <!--简化后-->
      
      <router-link :to="{name:'guanyu'}" class="list-group-item" active-class="active">About</router-link>
      
      <!--简化写法配合传递参数-->
      
      <router-link 
            :to="{
                name:'xiangqing',
                query:{
                    id:m.id,
                    title:m.title
                },
            }">
         跳转
          
      </router-link>
      ```

      ### 6. 命名路由

      见vscode

      ### 7. 路由的props配置

      见vscode

      ### 8.`<router-link>`的replace属性

      1. 作用：控制路由跳转时操作浏览器历史记录模式
      2. 浏览器的历史记录有两种写入方式：分别是 `push`和 `replace`，push是追加历史记录，replace是替换当前记录。路由的跳转时候默认 `push`
      3. 如何开启 `replace`模式：`<router-link replace ......>News</router-link>`



	### 9. 编程式路由导航



 1. 作用：不借助 `<router-link>`实现路由跳转，让路由跳跃更加灵活

 2. 具体编码：

    ```js
    //$router的两个API
    pushShow(m){
        this.$router.push({
            name:'xiangqing',
            params:{
                id:m.id,
                title:m.title
            }   
        })
    },
        replaceShow(m){
            this.$router.replace({
                name:'xiangqing',
                params:{
                    id:m.id,
                    title:m.title
                }   
            })
        }
    ```

    



### 缓存路由组件

1. 作用：让不展示的组件保持挂载，不被销毁

2. 具体编码：

   ```js
   <keep-alive include="News">	//若缓存多个组件就写成数组形式  include="['News','Message']"
       <router-view></router-view>
   </keep-alive>
   ```

   



### 两个新的生命周期钩子

1. 作用：路由组件所独有的两个钩子，用于捕获路由组件的激活状态
2. 具体名字：
   1. `activated` 路由组件被激活触发
   2. `deactivated` 路由组件失活时触发



## 路由守卫

1. 作用：对路由进行权限控制

2. 分类：全局守卫，独享守卫，组件内守卫

3. 全局守卫：

   ```js
   // 全局前置路由守卫---初始化的时候被调用，每次路由切换之前被调用
   router.beforeEach((to,from,next)=>{
       console.log('前置路由守卫')
       // document.title = to.meta.title  || '硅谷系统'
       // if(to.name=='xiaoxi'){
       //     if(localStorage.getItem('school') == 'atguigu'){
       //         next()
       //     }else{
       //         alert("当前你无权限查看此处内容")
       //     }
       // }else{
       //     next()
       // }
       if(to.meta.isAuth){     //判断是否需要授权
           if(localStorage.getItem('school') == 'atguigu'){
               next()
           }else{
               alert("当前你无权限查看此处内容")
           }
       }else{
           next()
       }
   })
   
   // 全局后置路由守卫---初始化的时候被调用，每次路由切换之后被调用
   router.afterEach((to,name)=>{
       document.title = to.meta.title  || '硅谷系统'
       
   })
   ```

4. 独享守卫：

   ```js
   meta:{isAuth:true,title:"消息"},
       beforeEnter(to,from,next){
           console.log("beforEnter")
           if(to.meta.isAuth){     //判断路由条件是否存在
               if(localStorage.getItem('school') === 'atguigus'){
                   next()
               }else{
                   alert('暂无权限查看')
               }
           }
       },
   ```

5. 组件内的守卫

```js
name:'About',
    // 通过路由规则进入该组件时调用
    beforeRouteEnter (to, from, next) {
    if(localStorage.school == "atguigu"){
        console.log('about-----beforeRouteEnter')
        next()
    }else{
        alert("当前无权限")
    }
 
},
    // 通过路由规则，离开该组件时调用
    beforeRouteLeave (to, from, next) {
        next()
    }
```





## 13.路由器的两种工作模式

 	1. 对于一个url来说，什么是hash值？-----#及其后面的内容是hash值
 	2. hash值不会包含在HTTP请求中，即：hash值不会带给服务器
 	3. hash模式
      	1. 地址中永远带着#，不美观
      	2. 若以后将地址通过第三方手机app分享，若app校验严格，则地址会被标记不合法
      	3. 兼容性较好
	4. history模式
        	1. 地址干净，美观。
                  	2. 兼容性和hash模式相比略差
                	3. 应用部署上线时需要后端人员支持，解决刷新页面服务端404问题