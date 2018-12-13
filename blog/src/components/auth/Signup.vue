<template>
    <div class="register">
        <h1>Register</h1>
        <input type="email" placeholder="Email" v-model='email'>
        <input type="password"  v-model='password'>
        <button @click="register">Register</button>
    </div>
</template>
<script>
    import authentication from '@/services/authentication'
    export default {
        data() {
            return {
                email: '',
                password:''
            }
        },
        methods: {
            register() {
                authentication.register({email:this.email,password:this.password})
                .then((res)=>{
                    console.log(res.data)
                })
            }
        },
    }
</script>
<style>
.register{
    display:flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items:center;
    margin-top:12rem;
    min-height: calc(100vh - 17rem);
}
</style>
