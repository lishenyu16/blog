<template>
    <div class="text-center">
        <form class="form-signin" @submit.prevent="onSubmit">
          <h2 v-if="!error">Please sign in</h2>
          <h2 v-if="error" class='error'>Login input is incorrect!</h2>
          <div class="credentials">
              <label for="email">Email</label>
              <input type="email" v-model="email" required autofocus>
              <label for="password">Password</label>
              <input type="password" v-model="password" required autofocus>
          </div>
          <button class="btn-signin" type="submit" >Sign In</button>
        </form>
    </div>
</template>
<script>
  import authentication from '@/services/authentication'
  export default {
    data() {
      return {
        email: '',
        password:'',
        error:false
      }
    },
    methods: {
      onSubmit () {
        authentication.login({email:this.email,password:this.password})
        .then((res)=>{
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('userId', res.data.userId);
          localStorage.setItem('email', res.data.email);
          localStorage.setItem('isAdmin', res.data.isAdmin);
          localStorage.setItem('username', res.data.username);
          localStorage.setItem('expirationDate', res.data.expirationDate);
          this.$store.commit('SET_USER',{username:res.data.username,userId:res.data.userId,email:res.data.email,isAdmin:res.data.isAdmin})
          this.$store.commit('SET_TOKEN',res.data.token)
          
          this.$store.dispatch('setLogoutTimer')
          this.$router.push('/')
        })
        .catch((err)=>{
          if(err.response.status==401){
            this.error= true
          }
          else{//500
            alert('An internal error occured, please try again')
          }
        })
      }
    },
  }
</script>

<style scoped>
.text-center{
  display:flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items:center;
  margin-top:8rem;
  min-height: calc(100vh - 11rem);
}
.form-signin {
  width: 100%;
  padding: 15px;
}

.credentials{
  width:100%;
  display:flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items:flex-start;
}

.credentials input{
    padding: 0.5rem 1rem;
    font-size: 1.25rem;
    line-height: 1rem;
    border-radius: 0.3rem;   
    width:100%;
}
.btn-signin{
  padding:0.5rem;
  margin-top:0.5rem;
  border:0.2rem solid gray;
  border-radius: 0.2rem;
  background-color:paleturquoise;
}

.error{
    color:red;
}

</style>

