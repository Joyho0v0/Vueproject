import Vue from 'vue'
import Vuex from 'vuex'
import tab from './tab'
import userPermission from './userPermission'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: { 
        tab,
        userPermission
    }
})