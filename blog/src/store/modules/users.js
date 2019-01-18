import router from '../../router/router'

const state = {
    token:null,
    user:null,
    isUserLoggedIn:false
}

const mutations = {
    SET_TOKEN(state,token){
        state.token = token
        if(token){
            state.isUserLoggedIn = true
        }
        else{
            state.isUserLoggedIn= false
            localStorage.clear()
        }
    },
    SET_USER(state,user){
        state.user = user
        if(user){
            state.isUserLoggedIn = true
        }
        else{
            localStorage.clear()
            state.isUserLoggedIn = false
        }
        
    },
}

const actions = {
    setToken({commit},token){
        return commit('SET_TOKEN',token)
    },
    setUser({commit},user){
        return commit('SET_USER',user)
    },
    tryAutoLogin({commit,dispatch}){
        const token = localStorage.getItem('token')
        const userId = localStorage.getItem('userId')
        const username = localStorage.getItem('username')
        const isAdmin = localStorage.getItem('isAdmin')
        const email = localStorage.getItem('email')
        if(!token){
            commit('SET_USER',null)
            commit('SET_TOKEN', null)
            return
        }
        const expirationDate = localStorage.getItem('expirationDate')
        const now = new Date()
        if(expirationDate<=now.getTime()){ //if expired
            localStorage.clear()
            commit('SET_USER',null)
            commit('SET_TOKEN', null)
            return
        }
        //log user in:
        commit('SET_USER',{username:username,userId:userId,email:email,isAdmin:isAdmin})
        commit('SET_TOKEN',token)
    },
    setLogoutTimer({commit}){
        setTimeout(()=>{
            console.log('Auto log out from timer')         
            commit('SET_USER',null)
            commit('SET_TOKEN', null)
            localStorage.clear()
            router.push('/login')
        },60*60*1000) //mannually set 1h expiration and auto-logout
    },
}

const getters = {
    currentUser(){
        return state.user
    },
    isLoggedIn(){
        return state.isUserLoggedIn
    }
}

export default  {
    state,
    mutations,
    actions,
    getters

}