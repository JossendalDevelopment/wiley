import store from '@/store/index.js';

export default {
    install(Vue) {
        Vue.mixin({
            computed: {
                "$eventHistory"() {
                    var event = store.getters['eventHistory/history'];
                    event.createEvent = (event) => {
                        return store.dispatch('eventHistory/createEvent', {
                            event
                        });
                    }
                    return event;
                }
            }
        });
    }
};