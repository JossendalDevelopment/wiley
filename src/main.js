import '@babel/polyfill';
import Vue from 'vue';
import './plugins/vuetify';
import App from './App.vue';
import { router } from './router';
import store from './store/index';

import AuthPlugin from '@/plugins/auth.js';
import CameraAlert from '@/plugins/cameraAlert.js';

import 'vuetify/dist/vuetify.min.css';
import 'video.js/dist/video-js.css';


Vue.config.productionTip = false;
Vue.use(AuthPlugin);
Vue.use(CameraAlert);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
