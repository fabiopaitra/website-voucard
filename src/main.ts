import Vue from 'vue';
import App from './App.vue';
import router from './router';

import AOS from 'aos';
import 'aos/dist/aos.css';


Vue.config.productionTip = false;

import './assets/main.scss';

new Vue({
  created() {
    AOS.init();
  },
  router,
  render: (h) => h(App),
}).$mount('#app');
