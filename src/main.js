import Vue from 'vue'
import App from './App.vue'
import router from './router'
import "materialize-css/dist/css/materialize.min.css";
import "material-design-icons/iconfont/material-icons.css";
import firebase from 'firebase'
import Vuelidate from 'vuelidate';

Vue.config.productionTip = false
Vue.use(Vuelidate);

let app = null;

// wait for firebase auth
firebase.auth().onAuthStateChanged(() => {

  // init app if not already created
  if(!app) {
    app = new Vue({
      router,
      render: h => h(App)
    }).$mount('#app');
  }
});


