<template>
    <div class="topnav">
        <div class="setting aboutme">
            <a href="https://lishenyu16.github.io/aboutMe/">About Me</a>
        </div>
        <div class="setting">
            <a v-if="!isLoggedIn" @click="login">Sign In</a>
            <a v-if="!isLoggedIn" @click="signup">Sign Up</a>
            <a v-if="isLoggedIn" @click="signout" >Sign out</a>
            <a v-if="isLoggedIn" @click="profile">Profile</a>
        </div>
    </div>
</template>
<script>
import  authAPI from "../../services/authentication"
export default {
    data() {
        return {
            expand:false
            // user:this.$store.getters.currentUser,
            // isLoggedIn: this.$store.getters.isLoggedIn
        }
    },
    methods: {
        signout() {
            this.$store.commit('SET_USER',null)
            this.$store.commit('SET_TOKEN',null)
            this.$router.push('/login')
        },
        login(){
            this.$router.push('/login')
        },
        signup(){
            this.$router.push('/signup')
        },
        profile(){
            this.$router.push('/profile')
        }
    },
    computed: {
        user() {
            return this.$store.getters.currentUser
        },
        isLoggedIn(){
            return this.$store.getters.isLoggedIn
        }
    },
}
</script>

<style scoped>
.topnav {
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    align-items:center;
    position: fixed;
    top:0;
    left:0;
    height:3rem;
    z-index: 10;
    width:100%;
    box-sizing: border-box;
    margin:0;
    background-color:rgb(146, 216, 164);
}
.setting{
    width:30%;
    display: flex;
    justify-content: space-around;
    align-items:center;
    margin-right:0.5rem;
}
.setting.aboutme{
    width:30%;
    display: flex;
    justify-content: flex-start;
    align-items:center;
    margin-left:1rem;
}


.topnav a {
  color: #f2f2f2;
  text-align: center;
  padding: 1rem 1rem;
  font-size: 1rem;
}

.setting a{
    /* font-size: 1rem; */
    padding: 0;
    text-decoration: none;
}

@media  screen and (min-width: 600px) {
    .setting{
        width:30%;
        display: flex;
        justify-content: flex-end;
        align-items:center;
    }
    .setting a{
        padding:1rem;
    }
}

.topnav a:hover, .topnav a:focus, .topnav a:active{
    box-shadow: 0 10px 10px -10px rgba(0, 0, 0, 0.5);
    -webkit-transform: scale(1.2);
    transform: scale(1.2);
    text-decoration: none;
    cursor: pointer;
}

@import url('https://fonts.googleapis.com/css?family=Courgette');

    /* background-color:rgb(146, 216, 164) !important; */

.navbar-nav{
    font-family: 'Courgette', cursive;
}
</style>

