import Vue from 'vue';
import App from './App.vue';
import router from './router';
import firebase from 'firebase';

import AOS from 'aos';
import 'aos/dist/aos.css';

let app = null;

Vue.config.productionTip = false;

import './assets/main.scss';

// wait for firebase auth to init before creating the app
firebase.auth().onAuthStateChanged(() => {
  // init app if not already created
  if (!app) {
    app = new Vue({
      created() {
        AOS.init();
      },
      router,
      render: (h) => h(App),
    }).$mount('#app');

  }
},
);

