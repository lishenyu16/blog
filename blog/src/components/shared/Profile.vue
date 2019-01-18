<template>
    <div class="profile">
        <h1>Hi, {{user.username}}</h1>
        <h2>Your email: {{user.email}}</h2>
    </div>
</template>
<script>
import  authAPI from "../../services/authentication"
export default {
    data() {
        return {
            user:this.$store.getters.currentUser,
            isLoggedIn:this.$store.getters.isLoggedIn
            // user:null,
            // isLoggedIn: this.$store.getters.isLoggedIn
        }
    },
    mounted(){
        // authAPI.getProfile()
        //     .then((res)=>{
        //         this.user = res.data
        //     })
        //     .catch(err=>{
        //         console.log(err)
        //     })
    },
    computed: {
        // user() {
        //     return this.$store.getters.currentUser
        // },
        // isLoggedIn(){
        //     return this.$store.getters.isLoggedIn
        // }
    },
}
</script>

<style scoped>
.profile{
    display:flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    margin-top:12rem;
    min-height: calc(100vh - 11rem);
}

</style>

