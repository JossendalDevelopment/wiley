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
                    alert.updateAlert = event => {
                        return store.dispatch('alert/updateAlert', {
                            event,
                        });
                    };
                    alert.showAlertHeader = () => {
                        return store.dispatch('alert/showAlertHeader');
                    };
                    alert.hideAlertHeader = () => {
                        return store.dispatch('alert/hideAlertHeader');
                    };
                    alert.setMuteDuration = (dur) => {
                        store.dispatch('alert/clearAlert');
                        return store.dispatch('alert/setMuteDuration', {
                            duration: dur
                        });
                    };
                    alert.clearMuteDuration = () => {
                        return store.dispatch('alert/clearMuteDuration');
                    };
                    alert.getAlerts = (params) => {
                        return store.dispatch(
                            'alert/getAlerts', {
                                params
                            }
                        );
                    };
                    return alert;
                }
            }
        });
    }
};
