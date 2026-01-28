import { mapMutations } from "vuex"

export default {
    state:{
        isCollapse:false,    //用于控制菜单是否收起
        tabList: [
            // 面包屑
            {
                path:'/',
                name:'home',
                label:'首页',
                icon:'s-home',
                url:'Home/Home'
            },
        ]
    },
    mutations:{
        collapseMenu(state) {
            state.isCollapse = !state.isCollapse
        },
        //更新面包屑
        selectMenu(state,item) {
            //判断数据是否为首页
            if(item.name != "home"){
                const index = state.tabList.findIndex(t => t.name === item.name)
                console.log('index',index)
                //如果不存在 index为-1
                if(index == -1){
                    state.tabList.push(item)
                    // console.log(state)
                }
            }
        },
        closeTag(state,tag){
             console.log("删除tag",tag)
            const delIndex = state.tabList.findIndex(item => item.name == tag.name)
            state.tabList.splice(delIndex,1)
        }
    },
    actions:{

    },

}