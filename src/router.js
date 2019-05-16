import Vue from 'vue';
import Router from 'vue-router';
import firebase from 'firebase';

import CameraDetailsPage from '@/views/LiveFeed--Details.vue';
import Overview from '@/views/Overview.vue';
import History from '@/views/History.vue';
import SignIn from '@/views/SignIn.vue';
import Home from '@/views/Home.vue';

Vue.use(Router);

export const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/', name: 'home', component: Home, meta: {
            requiresAuth: true
        } 
    },
    { path: '/sign_in', name: 'signIn', component: SignIn },
    { path: '/overview', name: 'overview', component: Overview, meta: {
            requiresAuth: true
        } 
    },
    { path: '/cam_details/:id', name: 'cam_details', component: CameraDetailsPage, meta: {
            requiresAuth: true
        } 
    },
    { path: '/history', name: 'history', component: History, meta: {
            requiresAuth: true
        }
    },
    { path: '*', redirect: '/' }
  ]
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        firebase.auth().onAuthStateChanged(function(user) {
            if (!user) {
                next('/sign_in');
            } else {
                next();
            }
        });
    } else {
        next();
    }
});
