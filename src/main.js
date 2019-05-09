import '@babel/polyfill';
import Vue from 'vue';
import firebase from 'firebase';
import './plugins/vuetify';
import App from './App.vue';
import { router } from './router';
import store from './store/index';

import AuthPlugin from '@/plugins/auth.js';
import CameraAlertPlugin from '@/plugins/cameraAlert.js';
import EventHistoryPlugin from '@/plugins/event.js';

import 'vuetify/dist/vuetify.min.css';
import 'video.js/dist/video-js.css';

firebase.initializeApp({
    apiKey: "AIzaSyC14MMLeymY_W_9a-Qoc8bYQji55tUm0Ak",
    authDomain: "wiley-app.firebaseapp.com",
    databaseURL: "https://wiley-app.firebaseio.com",
    projectId: "wiley-app",
    storageBucket: "wiley-app.appspot.com",
    messagingSenderId: "918656739220",
    appId: "1:918656739220:web:46326f33d145a55f"
});

Vue.config.productionTip = false;
Vue.use(AuthPlugin);
Vue.use(CameraAlertPlugin);
Vue.use(EventHistoryPlugin);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
