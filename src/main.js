import '@babel/polyfill';
import Vue from 'vue';
import './plugins/vuetify';
import firebase from 'firebase/app';
import App from './App.vue';
import { router } from './router';
import store from './store/index';

import AuthPlugin from '@/plugins/auth.js';
import Notifications from '@/plugins/notifications.js';
import AlertPlugin from '@/plugins/alert.js';
import EventHistoryPlugin from '@/plugins/event.js';

import { trim, testref, flash } from '@/directives/global.js';

import 'vuetify/dist/vuetify.min.css';
import 'video.js/dist/video-js.css';
import './scss/global.scss';

firebase.initializeApp({
    apiKey: process.env.VUE_APP_API_KEY,
    authDomain: process.env.VUE_APP_AUTH_DOMAIN,
    databaseURL: process.env.VUE_APP_DATABASE_URL,
    projectId: process.env.VUE_APP_PROJECT_ID,
    storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
    appId: process.env.VUE_APP_APP_ID,
});

Vue.config.productionTip = false;
Vue.use(AuthPlugin);
Vue.use(AlertPlugin);
Vue.use(EventHistoryPlugin);
Vue.use(Notifications);
Vue.directive('trim', trim);
Vue.directive('test-ref', testref);
Vue.directive('flash', flash);

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');
