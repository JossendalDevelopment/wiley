// TODO assess the need for any streaming data to be in vuex
import api from '../services/stream.service';
api.new('/stream');

export const stream = {
    namespaced: true,
    state: {
        stream: null,
    },
    getters: {
        stream: state => {
            return state;
        },
    },
    mutations: {
        startStream: (state, payload) => {
            state = payload;
        },
    },
    actions: {
        startStream({ commit }, payload) {
            commit('startStream', payload);
            return api.startStream();
        },
    },
};
