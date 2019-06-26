import store from '@/store/index.js';

export default {
    install(Vue) {
        Vue.mixin({
            computed: {
                $stream() {
                    var stream = store.getters['stream/stream'];
                    stream.startStream = () => {
                        return store.dispatch('stream/startStream', {});
                    };
                    return stream;
                },
            },
        });
    },
};
