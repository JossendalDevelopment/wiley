import api from '../services/api.service';
api.new('/api');

export const cameraAlert = {
    namespaced: true,
    state: { 
        alertData: {
            'alertStatus': '',
            'type': '',
            'detectedObject': '',
            'probability': '',
            'time': '',
            'cameraId': null
        }
    },
    getters: {
        alert: (state) => {
            return state;
        },
    },
    mutations: {
        createAlert(state, payload) {
            state.alertData = payload.alertData;
        },
        logout(state) {
            state.status = {};
            state.user = null;
        }
    },
    actions: {
        createAlert({ commit }, payload) {
            commit('createAlert', payload);
        },
        logout({ commit }) {
            api.logout();
            commit('logout');
        }
    },
}