import Notifications from 'vue-notification';

export default {
    install(Vue) {
        const NOTIFICATION_GROUP = 'app-notifications';
        Vue.use(Notifications)
        Vue.mixin({
            methods: {
                $notifyError(text) {
                    this.$notify({
                        group: NOTIFICATION_GROUP,
                        text: text,
                        type: 'error'
                    });
                },
                $notifyInfo(text) {
                    this.$notify({
                        group: NOTIFICATION_GROUP,
                        text: text,
                        type: 'info'
                    });
                },
                $notifySuccess(text) {
                    this.$notify({
                        group: NOTIFICATION_GROUP,
                        text: text,
                        type: 'success'
                    });
                },
                $notifyWarn(text) {
                    this.$notify({
                        group: NOTIFICATION_GROUP,
                        text: text,
                        type: 'warning'
                    });
                }
            }
        })
    }
}