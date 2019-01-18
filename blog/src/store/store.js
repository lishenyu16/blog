import Vue from 'vue'
import Vuex from 'vuex'
import blogModule from './modules/blogs'
import projectModule from './modules/projects'
import commentModule from './modules/comments'
import userModule from './modules/users'
Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
        blogModule,
        commentModule,
        userModule,
        projectModule
    },
    state:{

    },
    mutations:{

    },
    actions:{
    },
    getters:{
        
    }
})

