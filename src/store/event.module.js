import api from '../services/event.service';

api.new('/api');

export const eventHistory = {
    namespaced: true,
    state: {
        // ssessionEvents are unclassified events currently being processed
        sessionEvents: [],
        // all events TODO: dont get all events when the db starts to grow
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
                    return payload.event;
                } else {
                    return event;
                }
            });
        },
        updateSessionEvent(state, payload) {
            state.sessionEvents = state.sessionEvents.map(event => {
                if (event.id === payload.event.id) {
                    return payload.event;
                } else {
                    return event;
                }
            });
        },
        setEvents(state, payload) {
            state.events = payload;
        },
        setSessionEvents(state, payload) {
            state.sessionEvents = payload;
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
        updateEvent({ commit }, payload) {
            // commit('startLoading');
            return api.updateEvent(payload.event).then(resp => {
                commit('updateSessionEvent', payload);
                // commit('stopLoading');
                return resp;
            });
        },
        getAllEvents({ commit }) {
            return api.getAllEvents().then(resp => {
                commit('setEvents', resp)
                return resp;
            });
        },
        getFiftyEvents({ commit }) {
            return api.getFiftyEvents().then(resp => {
                // commit('setEvents', resp)
                commit('setSessionEvents', resp)
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
        deleteEvents({ commit }) {
            commit('deleteEvents');
            return api.deleteEvents().then(resp => {
                return resp;
            });
        },
        // eslint-disable-next-line no-unused-vars
        setYesterdaysEvents({ commit }, payload) {
            return api.setYesterdaysEvents().then(resp => {
                commit('setSessionEvents', resp);
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
