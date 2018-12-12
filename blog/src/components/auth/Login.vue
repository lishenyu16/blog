<template>
    <div class="text-center">
        <form class="form-signin" @submit.prevent="onSubmit">
          <!-- <img class="mb-4" src="./bootstrap-solid.svg" alt="" width="72" height="72"> -->
          <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
          <label for="inputEmail" class="sr-only">Email address</label>
          <input type="email" id="inputEmail" class="form-control" placeholder="Email" v-model="email" required autofocus>
          <label for="inputPassword" class="sr-only">Password</label>
          <input type="password" id="inputPassword" class="form-control" placeholder="Password" v-model="password" required>
          <div class="checkbox mb-3">
              <label>
              <input type="checkbox" value="remember-me"> Remember me
              </label>
          </div>
          <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
        </form>
    </div>
</template>
<script>
  export default {
    data() {
      return {
        email: '',
        password:''
      }
    },
    methods: {
      onSubmit () {
        const formData = {
          email: this.email,
          password: this.password,
          returnSecureToken : true
        }
        this.$store.dispatch('login',formData)
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
  margin-top:12rem;
  min-height: calc(100vh - 17rem);
}


.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

</style>

