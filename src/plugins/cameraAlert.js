import store from '@/store/index.js';

export default {
    install(Vue) {
        Vue.mixin({
            computed: {
                "$cameraAlert"() {
                    var alert = store.getters['cameraAlert/alert'];
                    alert.createAlert = (alertData) => {
                        return store.dispatch('cameraAlert/createAlert', {
                            alertData
                        });
                    }
                    return alert;
                }
            }
        });
    }
}
