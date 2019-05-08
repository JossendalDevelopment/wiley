import Vue from 'vue';
import Vuex from 'vuex';

import { cameraAlert } from './alert-camera.module';
import { authentication } from './auth.module';
// import { users } from './users.module';

Vue.use(Vuex);

export default(new Vuex.Store({
    modules: {
        // alert,
        authentication,
        cameraAlert
        // users
    }
}));