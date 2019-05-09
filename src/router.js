import Vue from 'vue';
import Router from 'vue-router';

import CameraDetailsPage from '@/views/LiveFeed--Details.vue';
import Overview from '@/views/Overview.vue';
import SignIn from '@/views/SignIn.vue';
import Home from '@/views/Home.vue';

Vue.use(Router);

export const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/overview', name: 'overview', component: Overview },
    { path: '/sign_in', name: 'signIn', component: SignIn },
    { path: '/cam_details/:id', name: 'cam_details', component: CameraDetailsPage },
    { path: '*', redirect: '/' }
  ]
});

router.beforeEach((to, from, next) => {
    // redirect to login page if not logged in and trying to access a restricted page
    const publicPages = ['/sign_in'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('user');
  
    if (authRequired && !loggedIn) {
        return next('/sign_in');
    }
  
    next();
});
