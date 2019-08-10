import store from '@/store/index.js';

export default {
    install(Vue) {
        Vue.mixin({
            computed: {
                "$alert"() {
                    var alert = store.getters['alert/alert'];
                    alert.createAlert = (alertData) => {
                        return store.dispatch('alert/createAlert', {
                            alertData
                        });
                    };
                    alert.clearAlert = () => {
                        return store.dispatch('alert/clearAlert');
                    };
                    alert.showAlertHeader = () => {
                        return store.dispatch('alert/showAlertHeader');
                    };
                    alert.hideAlertHeader = () => {
                        return store.dispatch('alert/hideAlertHeader');
                    };
                    return alert;
                }
            }
        });
    }
};
