import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import { router } from './router'
import store from './store/index'

import AuthPlugin from '@/plugins/auth.js';

import 'vuetify/dist/vuetify.min.css';

Vue.config.productionTip = false;
Vue.use(AuthPlugin);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
