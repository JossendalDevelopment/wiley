import Alert from '@/types/Alert';
import api from '../services/alert.service.js';

api.new('/api');

export const alert = {
    namespaced: true,
    state: {
        alerts: [],
        alertData: null,
        active: false,
        showHeader: false,
        muteDuration: null
    },
    getters: {
        alert: (state) => {
            return state;
        },
    },
    mutations: {
        setAlerts: (state, payload) => {
            state.alerts = payload
        },
        removeAlert: (state, payload) => {
            state.alerts = state.alerts.filter(a => a.id !== payload.id)
            console.log("ATATE", state.alerts)
        },
        createAlert: (state, payload) => {
            state.alertData = new Alert(payload.alertData);
            state.active = true;
        },
        clearAlert: state => {
            state.alertData = null;
            state.active = false;
        },
        showAlertHeader: state => {
            state.showHeader = true;
        },
        hideAlertHeader: state => {
            state.showHeader = false;
        },
        setMuteDuration: (state, payload) => {
            state.muteDuration = payload.duration
        },
        clearMuteDuration: state => {
            state.muteDuration = null;
        }
    },
    actions: {
        createAlert(context, payload) {
            context.commit('createAlert', payload);
            context.commit('showAlertHeader');
        },
        clearAlert({ commit }) {
            commit('clearAlert');
            commit('hideAlertHeader');
        },
        showAlertHeader({ commit }) {
            commit('showAlertHeader');
        },
        hideAlertHeader({ commit }) {
            commit('clearAlert');
            commit('hideAlertHeader');
        },
        setMuteDuration({ commit }, payload) {
            commit('setMuteDuration', payload);
        },
        clearMuteDuration({ commit }) {
            commit('clearMuteDuration');
        },
        getAlerts({ commit }, payload) {
            return api.getAlerts(payload).then(resp => {
                commit('setAlerts', resp)
                return resp;
            });
        },
        updateAlert(context, payload) {
            return api.updateAlert(payload.event).then(resp => {
                context.commit('removeAlert', payload.event)
                return resp;
            });
        },
    },
}