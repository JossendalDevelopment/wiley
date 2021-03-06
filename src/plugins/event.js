import store from '@/store/index.js';

export default {
    install(Vue) {
        Vue.mixin({
            computed: {
                $events() {
                    var event = store.getters['eventHistory/history'];
                    event.createEvent = event => {
                        return store.dispatch('eventHistory/createEvent', {
                            event,
                        });
                    };
                    event.setEvents = events => {
                        return store.dispatch('eventHistory/setEvents', {
                            events,
                        });
                    };
                    event.setYesterdaysEvents = () => {
                        return store.dispatch(
                            'eventHistory/setYesterdaysEvents',
                            {}
                        );
                    };
                    event.updateEvent = event => {
                        return store.dispatch('eventHistory/updateEvent', {
                            event,
                        });
                    };
                    event.getAllEvents = () => {
                        return store.dispatch('eventHistory/getAllEvents', {});
                    };
                    event.getFiftyEvents = () => {
                        return store.dispatch('eventHistory/getFiftyEvents', {});
                    };
                    event.getEventsCount = () => {
                        return store.dispatch('eventHistory/getEventsCount', {})
                    }
                    event.getArchivedEvents = (params) => {
                        return store.dispatch(
                            'eventHistory/getArchivedEvents', {
                                params
                            }
                        );
                    };
                    event.getArchivedEventsByType = (params) => {
                        return store.dispatch(
                            'eventHistory/getArchivedEventsByType', {
                                params
                            }
                        );
                    };
                    event.listenForEventsChanges = () => {
                        return store.dispatch(
                            'eventHistory/listenForEventsChanges',
                            {}
                        );
                    };
                    event.startLoading = () => {
                        return store.dispatch('eventHistory/startLoading', {});
                    };
                    event.stopLoading = () => {
                        return store.dispatch('eventHistory/stopLoading', {});
                    };
                    return event;
                },
            },
        });
    },
};
