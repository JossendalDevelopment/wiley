import api from '../services/api.service';
api.new('/api');
import firebase from 'firebase/app';
import 'firebase/auth';

const user = JSON.parse(localStorage.getItem('user'));
let initialState = user
    ? { status: { loggedIn: true }, user }
    : { status: {}, user: null };

export const authentication = {
    namespaced: true,
    state: initialState,
    getters: {
        user: (state) => {
            // auth plugin attaches a number of functions to state.cart 
            // making it unuseable as a getter for now 
            // instead create $auth.getUser() from plugin
            return state;
        },
    },
    mutations: {
        loginRequest(state, user) {
            state.status = { loggingIn: true };
            state.user = user;
        },
        loginSuccess(state, user) {
            state.status = { loggedIn: true };
            state.user = user;
        },
        loginFailure(state) {
            state.status = {};
            state.user = null;
        },
        logout(state) {
            state.status = {};
            state.user = null;
        }
    },
    actions: {
        login({ commit }, { employeeEmail, password }) {
            commit('loginRequest', { employeeEmail, password });
            return firebase.auth().signInWithEmailAndPassword(employeeEmail, password)
                .then(user => {
                    const newUser = {
                        email: user.user.email,
                        verified: user.user.emailVerified,
                        id: user.user.uid,
                    }
                    window.localStorage.setItem('token', newUser.id)
                    commit('loginSuccess', newUser);
                    return newUser;
                })
                .catch(error => {
                    commit('loginFailure', error);
                    return { e: error, status: 500 };
                })
            // return api.login(employeeEmail, password)
            //     .then(user => {
            //         commit('loginSuccess', user.data);
            //         return user.data;
            //     },
            //     error => {
            //         commit('loginFailure', error);
            //         dispatch('alert/error', error, { root: true });
            //     }
            // );
        },
        logout({ commit }) {
            firebase.auth().signOut();
            window.localStorage.clear();
            commit('logout');
        },
    },
}