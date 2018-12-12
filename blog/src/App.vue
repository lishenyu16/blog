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
  import firebase from 'firebase'
  export default {
    name: 'App',
    beforeCreate(){
      let config = {
        apiKey: "AIzaSyCYVVdLe4FueybYBaHr7Ke4MFKaa81VqN4",
        authDomain: "shenyublogs.firebaseapp.com",
        databaseURL: "https://shenyublogs.firebaseio.com",
        projectId: "shenyublogs",
        storageBucket: "shenyublogs.appspot.com",
        messagingSenderId: "1024154929343"
      };
      firebase.initializeApp(config);
    },
    components:{
      'app-header': Header,
      'app-nav':Navigation,
      'app-footer':Footer
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
