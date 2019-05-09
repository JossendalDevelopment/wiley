import AlertData from '@/types/cameraAlertType';
// import api from '../services/api.service';
// api.new('/api');

export const cameraAlert = {
    namespaced: true,
    state: {alertData: {...new AlertData()} } ,
    getters: {
        alert: (state) => {
            return state;
        },
    },
    mutations: {
        createAlert(state, payload) {
            state.alertData = payload.alertData;
        },
        clearAlert: (state) => {
            state.alertData = new AlertData();
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