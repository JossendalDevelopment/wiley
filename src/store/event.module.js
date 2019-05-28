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
            console.log('event store action', payload)
            commit('createEvent', payload);
            return api.createEvent(payload.event)
                .then(resp => {
                    console.log(resp)
                    return resp;
                    // show popup of some kind on success
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