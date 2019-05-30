import 'firebase/firestore';
import api from '../services/event.service';

api.new('/api');

export const eventHistory = {
    namespaced: true,
    state: {
        history: [],
        events: []
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
        setEvents(state, payload) {
            state.events = payload.events
        },
    },
    actions: {
        createEvent({ commit }, payload) {
            commit('createEvent', payload);
            return api.createEvent(payload.event)
                .then(resp => {
                    return resp;
                })
                .catch(err => {
                    console.log("ERROR creating event", err)
                })
        },
        // eslint-disable-next-line no-unused-vars
        updateEvent({ commit }, payload) {
            return api.updateEvent(payload.event)
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
        getAllClassifiedEvents() {
            return api.getAllClassifiedEvents()
                .then(resp => {
                    return resp;
                })
        },
        setEvents({ commit }, payload) {
            commit('setEvents', payload);
        },
        setNewEvents({ commit }, payload) {
            commit('setEvents', payload);
            return api.setNewEvents(payload.events)
                .then(resp => {
                    return resp;
                })
        }
    },
}