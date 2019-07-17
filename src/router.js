import Vue from 'vue';
import Router from 'vue-router';
import firebase from 'firebase';

import CameraDetailsPage from '@/views/Details.vue';
import NotFound from '@/views/NotFound.vue';
import Overview from '@/views/Overview.vue';
import History from '@/views/History.vue';
import SignIn from '@/views/SignIn.vue';

import store from '@/store';

Vue.use(Router);

export const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        { path: '/sign_in', name: 'signIn', component: SignIn },
        {
            path: '/overview',
            name: 'overview',
            component: Overview,
            meta: {
                requiresAuth: true,
            },
        },
        {
            path: '/training',
            name: 'training',
            component: CameraDetailsPage,
            meta: {
                requiresAuth: true,
            },
        },
        {
            path: '/history',
            name: 'history',
            component: History,
            meta: {
                requiresAuth: true,
            },
        },
        { path: '/not_found', name: 'not-found', component: NotFound },
        { path: '*', redirect: '/not_found' },
    ],
});

router.beforeEach(async (to, from, next) => {
    // a url based method to reset dummy data for purpose of demo
    if (to.redirectedFrom && to.redirectedFrom.includes('clear')) {
        try {
            await store.dispatch('eventHistory/deleteEvents', {});
            next('/training');
        } catch (error) {
            throw new Error(error);
        }
        return;
    }
    // router guard requiring a user be authenticated via firebase
    if (to.matched.some(record => record.meta.requiresAuth)) {
        firebase.auth().onAuthStateChanged(function (user) {
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
