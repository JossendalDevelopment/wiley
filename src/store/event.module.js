import 'firebase/firestore';
import api from '../services/event.service';

api.new('/api');

export const eventHistory = {
    namespaced: true,
    state: {
        history: [],
        events: [],
        loading: true,
    },
    getters: {
        history: state => {
            return state;
        },
    },
    mutations: {
        createEvent(state, payload) {
            state.history.push(payload.event);
        },
        updateEvent(state, payload) {
            state.events = state.events.map(event => {
                if (event.id === payload.event.id) {
                    console.log('NEW EVENT UPDATED', event, payload.event);
                }
            });
        },
        setEvents(state, payload) {
            console.log('MODULE SET EVENTS', payload);
            state.events = payload;
        },
        addEvents(state, payload) {
            state.events = [...state.events, ...payload.events];
        },
        deleteEvents(state) {
            state.events = [];
        },
        startLoading(state) {
            state.loading = true;
        },
        stopLoading(state) {
            state.loading = false;
        },
    },
    actions: {
        createEvent({ commit }, payload) {
            commit('createEvent', payload);
            return api.createEvent(payload.event).then(resp => {
                return resp;
            });
        },
        // eslint-disable-next-line no-unused-vars
        updateEvent({ commit }, payload) {
            // commit('updateEvent', payload);
            commit('startLoading');
            return api.updateEvent(payload.event).then(resp => {
                return resp;
            });
        },
        getAllEvents() {
            return api.getAllEvents().then(resp => {
                return resp;
            });
        },
        getAllClassifiedEvents() {
            return api.getAllClassifiedEvents().then(resp => {
                return resp;
            });
        },
        setEvents({ commit }, payload) {
            commit('setEvents', payload.events);
        },
        // eslint-disable-next-line no-unused-vars
        deleteEvents(context, payload) {
            context.commit('deleteEvents');
            return api.deleteEvents().then(() => {
                return;
                // return context.dispatch('addNewEvents', payload).then(resp => {
                //     return resp;
                // });
            });
        },
        // eslint-disable-next-line no-unused-vars
        addNewEvents({ commit }, payload) {
            return api.addNewEvents(payload.events).then(resp => {
                return resp;
            });
        },
        // eslint-disable-next-line no-unused-vars
        setYesterdaysEvents({ commit }, payload) {
            return api.setYesterdaysEvents().then(resp => {
                commit('setEvents', resp);
                return resp;
            });
        },
        startLoading({ commit }) {
            commit('startLoading');
        },
        stopLoading({ commit }) {
            commit('stopLoading');
        },
    },
};
