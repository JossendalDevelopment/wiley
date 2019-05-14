import '@babel/polyfill';
import Vue from 'vue';
import firebase from 'firebase';
import './plugins/vuetify';
import App from './App.vue';
import { router } from './router';
import store from './store/index';

import AuthPlugin from '@/plugins/auth.js';
import Notifications from '@/plugins/notifications.js';
import CameraAlertPlugin from '@/plugins/cameraAlert.js';
import EventHistoryPlugin from '@/plugins/event.js';

import 'vuetify/dist/vuetify.min.css';
import 'video.js/dist/video-js.css';

firebase.initializeApp({
    apiKey: process.env.VUE_APP_API_KEY,
    authDomain: process.env.VUE_APP_AUTH_DOMAIN,
    databaseURL: process.env.VUE_APP_DATABASE_URL,
    projectId: process.env.VUE_APP_PROJECT_ID,
    storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
    appId: process.env.VUE_APP_APP_ID
});

Vue.config.productionTip = false;
Vue.use(AuthPlugin);
Vue.use(CameraAlertPlugin);
Vue.use(EventHistoryPlugin);
Vue.use(Notifications);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
