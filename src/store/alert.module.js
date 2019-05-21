import AlertData from '@/types/cameraAlertType';
// import api from '../services/api.service';
// api.new('/api');

export const cameraAlert = {
    namespaced: true,
    state: {
        alertData: {...new AlertData()},
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
            state.alertData = payload.alertData;
            state.active = true;
        },
        clearAlert: state => {
            state.alertData = new AlertData();
            state.active = false;
        },
        showAlertHeader: state => {
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