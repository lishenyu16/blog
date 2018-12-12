import * as firebase from 'firebase'

const state = {

}

const mutations = {

}

const actions = {
    addComment({commit,getters},payload){
        const blog = {comments:payload}
        return firebase.database().ref('blogs').child(payload.blogId).update(blog)
        .then(()=>{
            // console.log("res from update: ", res)
            // dispatch('initEntries')
            alert('New comment has been posted!')
            commit('CURRENT_BLOG',payload)
            this.$router.replace({path: "/blogdetail", query:{blog: getters.currentBlog}})
        })
        .catch(err=>{
            console.log(err)
            alert('Failed to add comment')
        })     
    }
}

const getters = {

}

export default {
    state,
    mutations,
    actions,
    getters
}