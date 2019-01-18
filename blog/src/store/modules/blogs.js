const state = {
    blogs:[],
    blog:{}
}
const mutations = {
    // SET_BLOGS({state},payload){
    //     console.log("payloadp",payload)
    //     state.blogs = payload
    //     console.log("state.blogs:",state.blogs)
    // },
    UPDATE_BLOGS(state,payload){
        state.blogs.push(payload)
    },
    CURRENT_BLOG(state,payload){
        state.blog = payload
    },
    UPDATE_COMMENTS(state,payload){ 

    },
    EDIT_BLOG(state,payload){

    }
}
const actions = {
    addBlog({state,commit},payload){
        alert('New Blog has been posted!')
        commit('UPDATE_BLOGS',payload)
        // return firebase.database().ref('blogs').push(payload)
        // .then(()=>{
        //     alert('New Blog has been posted!')
        //     commit('UPDATE_BLOGS',payload)
        //     this.$router.replace('/blog')
        // })
        // .catch(err=>{
        //     console.log(err)
        // })
    },
    // deleteBlog({state,commit},payload){
    //     return firebase.database().ref('blogs').child(payload.id).remove()
    //     .then(()=>{
            
    //     })
    //     .catch(err=>{
    //         console.log(err)
    //         alert('Failed to delete this blog!')
    //     })
    // },
    // editBlog({state,commit},payload){
    //     return firebase.database().ref('blogs').child(payload.id).update(payload)
    //     .then(()=>{
    //         commit('CURRENT_BLOG',payload)
    //         // router.replace({path: "/blogdetail", query:{blog: payload}})

    //         // this.$router.push({path: "/blogdetail", query:{blog: payload}})
    //     })
    // },
    setBlogs({state,commit},blogs){
        state.blogs = blogs
    }
}
const getters = {
    blogs(){
        return state.blogs
    },
    currentBlog(){
        return state.blog
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}