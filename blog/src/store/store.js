import Vue from 'vue'
import Vuex from 'vuex'
import blogModule from './modules/blogs'
import commentModule from './modules/comments'
import router from '../router/router'
import * as firebase from 'firebase'
Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
        blogModule,
        commentModule
    },
    state:{

    },
    mutations:{

    },
    actions:{
        login({commit,dispatch},authData){
            firebase.auth().signInWithEmailAndPassword(authData.email, authData.password)
            .then(user=>{
              // dispatch('initEntries')
              localStorage.setItem('userId',user.uid)
              const signedIdUser = {
                id:user.uid
              }
              commit('storeUser',signedIdUser)
              state.wrong_pw = false
              setTimeout(()=>{
                dispatch('logout')
              },3600*10000)
              router.replace('./dashboard')
            })
            .catch(err=>{
              state.wrong_pw = true
            })            
        }
    },
    getters:{
        
    }
})

