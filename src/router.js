import Vue from 'vue';
import Router from 'vue-router';
import firebase from 'firebase';

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
    { path: '/sign_in', name: 'signIn', component: SignIn },
    { path: '/overview', name: 'overview', component: Overview, meta: {
            requiresAuth: true
        } 
    },
    { path: '/cam_details/:id', name: 'cam_details', component: CameraDetailsPage, meta: {
            requiresAuth: true
        } 
    },
    { path: '*', redirect: '/' }
  ]
});

router.beforeEach((to, from, next) => {
    // redirect to login page if not logged in and trying to access a restricted page
    const currentUser = firebase.auth().currentUser;
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

    if (requiresAuth && !currentUser) {
        next('/sign-in');
    } else if (requiresAuth && currentUser) {
        next();
    } else {
        next();
    }
});
