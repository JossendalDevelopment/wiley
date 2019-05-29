import Notifications from 'vue-notification';
import velocity from 'velocity-animate';

export default {
    install(Vue) {
        const NOTIFICATION_GROUP = 'app-notifications';
        const CLASSIFICATION_GROUP = 'classification-notifications';
        Vue.use(Notifications, { velocity })
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
                },
                $notifyClassification(text) {
                    this.$notify({
                        group: CLASSIFICATION_GROUP,
                        text: text,
                        type: 'accent'
                    })
                }
            }
        })
    }
}