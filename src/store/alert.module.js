import Alert from '@/types/Alert';

export const alert = {
    namespaced: true,
    state: {
        alertData: new Alert(),
        active: false,
        showHeader: false,
    },
    getters: {
        alert: (state) => {
            return state;
        },
    },
    mutations: {
        createAlert: (state, payload) => {
            state.alertData = new Alert(payload.alertData);
            state.active = true;
        },
        clearAlert: state => {
            state.alertData = new Alert();
            state.active = false;
        },
        showAlertHeader: state => {
            console.log("SHOWING")
            state.showHeader = true;
        },
        hideAlertHeader: state => {
            state.showHeader = false;
        }
    },
    actions: {
        createAlert({ commit }, payload) {
            commit('createAlert', payload);
            commit('showAlertHeader');
        },
        clearAlert({ commit }) {
            commit('clearAlert');
            commit('hideAlertHeader');
        },
        showAlertHeader({ commit }) {
            commit('showAlertHeader');
        },
        hideAlertHeader({ commit }) {
            commit('hideAlertHeader');
        },
    },
}