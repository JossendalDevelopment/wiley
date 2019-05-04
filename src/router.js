import Vue from 'vue';
import Router from 'vue-router';

import CameraDetailsPage from '@/views/LiveFeed--Details.vue';
import SignIn from './views/SignIn.vue';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {path: '', name: 'home', component: Home, alias: '/home'},
    // { path: '/', name: 'home', component: Home },
    { path: '/sign_in', name: 'sign_in', component: SignIn },
    { path: '/cam_details/:id', name: 'cam_details', component: CameraDetailsPage }
  ]
});
