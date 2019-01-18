const state = {
    projects:[],
    project:{}
}
const mutations = {
    UPDATE_PROJECTS(state,payload){
        state.projects.push(payload)
    },
    SET_PROJECTS(state,payload){
        state.projects = payload
    }
}
const actions = {
    addProject({state,commit},payload){
        alert('New project is added!')
        commit('UPDATE_PROJECTS',payload)
    },
    setProjects({state,commit},projects){
        state.projects = projects
    }
}
const getters = {
    projects(){
        return state.projects
    },
    project(){
        return state.project
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}