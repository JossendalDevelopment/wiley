import 'firebase/firestore';
import api from '../services/event.service';

api.new('/api');

export const eventHistory = {
    namespaced: true,
    state: {
        history: []
    },
    getters: {
        history: (state) => {
            return state;
        },
    },
    mutations: {
        createEvent(state, payload) {
            state.history.push(payload.event);
        },
    },
    actions: {
        createEvent({ commit }, payload) {
            commit('createEvent', payload);
            return api.createEvent(payload.event)
                .then(resp => {
                    return resp;
                })
        },
        getAllEvents() {
            return api.getAllEvents()
                .then(resp => {
                    return resp;
                })
        },
    },
}