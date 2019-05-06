import { userService } from '../services';

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user
    ? { status: { loggedIn: true }, user }
    : { status: {}, user: null };

export const authentication = {
    namespaced: true,
    state: initialState,
    getters: {
        user: (state) => {
            // cart plugin attaches a number of functions to state.cart 
            // making it unuseable as a getter for now 
            // instead use $cart.getCart() from plugin
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
        login({ dispatch, commit }, { employeeId, password }) {
            commit('loginRequest', { employeeId, password });

            return userService.login(employeeId, password)
                .then(user => {
                    console.log("AUTH_MODULE", user.data)
                        commit('loginSuccess', user.data);
                        return user.data;
                    },
                    error => {
                        commit('loginFailure', error);
                        dispatch('alert/error', error, { root: true });
                    }
                );
        },
        logout({ commit }) {
            userService.logout();
            commit('logout');
        }
    },
}