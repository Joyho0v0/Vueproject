import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import ElementUI from 'element-ui'
// import {Row,Button} from 'element-ui'   //按需引入1
import 'element-ui/lib/theme-chalk/index.css';
// import VueRouter from 'vue-router';
import store from './store/index'
import './api/mock'


Vue.use(ElementUI)
// Vue.use(VueRouter)
Vue.use(Vuex)
// Vue.use(Row)        //按需引入2
// Vue.use(Button)

new Vue({
    router,
    store,
    render:h => h(App),
    created(){
        store.commit('addMenu',router)
    }
}).$mount('#app')