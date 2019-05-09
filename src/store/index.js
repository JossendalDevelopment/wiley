import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';

import { cameraAlert } from './alert-camera.module';
import { authentication } from './auth.module';
import { eventHistory } from './event-history.module';

Vue.use(Vuex);

export default(new Vuex.Store({
    plugins: [
        new VuexPersistence({
            storage: window.localStorage,
            modules: [
                'authentication',
                'cameraAlert',
            ]
        }).plugin
    ],
    modules: {
        authentication,
        cameraAlert,
        eventHistory
    }
}));