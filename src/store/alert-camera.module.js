import AlertData from '@/types/cameraAlertType';
// import api from '../services/api.service';
// api.new('/api');

export const cameraAlert = {
    namespaced: true,
    state: {
        alertData: {...new AlertData()},
        active: false
    },
    getters: {
        alert: (state) => {
            return state;
        },
    },
    mutations: {
        createAlert(state, payload) {
            state.alertData = payload.alertData;
            state.active = true;
        },
        clearAlert: (state) => {
            state.alertData = new AlertData();
            state.active = false;
        }
    },
    actions: {
        createAlert({ commit }, payload) {
            commit('createAlert', payload);
        },
        clearAlert({ commit }) {
            commit('clearAlert');
        }
    },
}