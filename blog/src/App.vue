<template>
  <div id="app">
    <app-header ></app-header>
    <app-nav  ></app-nav>
    <router-view /> 
    <app-footer ></app-footer>
  </div>
</template>

<script>
  import Navigation from './components/shared/Navigation.vue'
  import Header from './components/shared/Header.vue'
  import Footer from './components/shared/Footer.vue'
  import blogAPI from './services/blogAPI'
  import axios from 'axios'

  export default {
    components:{
      'app-header': Header,
      'app-nav':Navigation,
      'app-footer':Footer
    },
    created(){
      this.$store.dispatch('tryAutoLogin')
    },
    mounted(){
      const url = 'https://ipinfo.io/';
      axios.get(url)
        .then(result => {
          const ip = result.data.ip
          const city = result.data.city || null
          const region = result.data.region || null
          const country = result.data.country || null
          const time = new Date()
          const visitor = {ip:ip,city:city,region:region,country:country,time:time}

          axios.post('http://54.193.249.19:3000/visitor',visitor)  //54.193.249.19
            .then(result=>{

            })
            .catch(err=>{
              console.log(err)
            })
        })
        .catch(err=>{
          console.log(err)
        })
    }
  }
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-bottom: 0%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

}
</style>
