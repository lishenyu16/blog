// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/router'
import store from './store/store'
import 'element-ui/lib/theme-chalk/index.css';
import BootstrapVue from 'bootstrap-vue'
import firebase from 'firebase'
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'


import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.config.productionTip = false

Vue.use(BootstrapVue);
Vue.use(VueQuillEditor)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  created(){
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
  components: { App },
  template: '<App/>'
})
