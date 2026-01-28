import Cookie from 'js-cookie'
export default {
    state:{
        menuData:[]
    },
    mutations:{
        setMenu(state,val){
            state.menuData = val
            Cookie.set('menu',JSON.stringify(val))
        },
        // 动态注册路由
        addMenu(state,router){
            // 判断当前缓存中是否有数据
            if(!Cookie.get('menu')) return
            const menu = JSON.parse(Cookie.get('menu'))
            state.menu = menu
            //动态处理路由数据
            const menuArray = []
            console.log(menu)
            menu.forEach(item => {
                if(item.children){
                    item.children = item.children.map(item => {
                        item.component = () => import(`../pages/${item.url}`)
                        return item
                    })
                    menuArray.push(...item.children)
                }else{
                    
                    item.component = () => import(`../component/${item.url}`)
                    menuArray.push(item)
                }
            });
            console.log('menuArray',menuArray)

            // 路由动态增加
            menuArray.forEach(item => {
                router.addRoute("Main",item)
            })
            console.log(router)
        }
    }
}