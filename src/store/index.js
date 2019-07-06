import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';

import { cameraAlert } from './alert.module';
import { authentication } from './auth.module';
import { eventHistory } from './event.module';

Vue.use(Vuex);

export default new Vuex.Store({
    plugins: [
        new VuexPersistence({
            storage: window.localStorage,
            modules: ['authentication', 'cameraAlert', 'eventHistory'],
        }).plugin,
    ],
    modules: {
        authentication,
        cameraAlert,
        eventHistory,
    },
});
