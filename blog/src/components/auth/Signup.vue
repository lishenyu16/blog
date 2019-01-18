<template>
    <div class="text-center">
        <form class="form-signin" @submit.prevent="register">
          <h2>Register</h2>
          <div class="credentials">
              <label for="username">Username</label>
              <input type="text" v-model="username" required autofocus>
              <label for="email">Email</label>
              <input type="email" v-model="email" required autofocus>
              <label for="password">Password</label>
              <input type="password" v-model="password" required autofocus :class={confirm_pw:invalid_pw}>
              <label for="password">Confirm Password</label>
              <input type="password" v-model="confirm_pw" required autofocus :class={confirm_pw:unmatch}>
          </div>
          <div v-html="error" class="error"></div>
          <div v-if="unmatch" class="error">Passwords dont't match</div>
          <div v-if="invalid_pw" class="error">Passwords must be at least 6 characters</div>
          <button class="btn-signup" type="submit" :disabled="disabled">Sign Up</button>
        </form>
    </div>
</template>
<script>
    import authentication from '@/services/authentication'
    export default {
        data() {
            return {
                username:'',
                email: '',
                password:'',
                confirm_pw:'',
                error:null,
                bad_pw:false,
            }
        },
        methods: {
            register() {
                // if(this.password!=this.confirm_pw){
                //     this.unmatch=true
                //     return
                // }
                // if(this.password.length<=5){
                //     this.bad_pw = true
                //     return
                // }
                authentication.register({username:this.username,email:this.email,password:this.password})
                .then((res)=>{
                    //res:{userId,email,username}
                    this.$router.push('/login')                 
                })
                .catch(err=>{
                    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                    // this.error = err.response.data.error
                    console.log(err.response.status)
                    console.log(err.response)
                    if(err.response.status==400){
                        this.error = err.response.data.error
                    }
                    else if(err.response.status==401){
                        this.error = err.response.data.message
                    }
                    else{
                        alert('Internal error occured, please try again')
                    }
                })
            }
        },
        computed: {
            unmatch() {
                return this.password!=this.confirm_pw 
            },
            invalid_pw(){
                return this.password.length<=5
            },
            disabled(){
                if(this.unmatch || this.invalid_pw){
                    return true
                }
                return false
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
.btn-signup{
  padding:0.5rem;
  margin-top:0.5rem;
  border:0.2rem solid gray;
  border-radius: 0.2rem;
  background-color:paleturquoise;
  cursor: pointer;
}
button[disabled] {
      pointer-events: none;
      cursor: not-allowed;
      filter: alpha(opacity=65);
      -webkit-box-shadow: none;
      box-shadow: none;
      opacity: .65;    
}
.error{
    color:red;
}
.confirm_pw{
    border-color:red;
}
</style>
