<notes>
    This component contains the large header alert for showing camera events as well as global
    notifications for general user feedback alerts, accessible globally by:
    $notifyError(<message>)
    $notifySuccess(<message>)
    $notifyInfo(<message>)
    $notifyWarn(<message>)

    Also all the 'simulated alert' logic is being handled here.
    Cleanup required!!!!!.
</notes>
<template>
    <div id="app">
        <!-- Page header alert -->
        <v-alert    
            :value="$cameraAlert.showHeader"
            color="error"
            light
            transition="slide-y-transition"
            dismissible
            style="margin-top:0px; margin-bottom:0px; padding-right:2rem;">
            <v-layout align-center justify-center>
                <span 
                    style="cursor: pointer;"
                    @click="goToAlertDetails()"
                    class="text-xs-center mb-0 headline">{{ formatAlertText }}</span>
                <a class="ml-3" style="text-decoration:underline; cursor:pointer;">Snooze alerts for 1 minute?</a>
            </v-layout>
        </v-alert>

        <v-app id="inspire">
            <v-toolbar 
                app 
                flat 
                absolute 
                dense
                v-if="$auth.status.loggedIn" 
                :style="`background-color:${$vuetify.theme.secondaryDark}`">

                <v-spacer> </v-spacer>

                <v-btn v-if="$auth.status.loggedIn" to="/overview" dark flat>Live Feed</v-btn>
                <v-btn v-if="$auth.status.loggedIn" to="/training" dark flat>Model Training</v-btn>
                <v-btn v-if="$auth.status.loggedIn" to="/history" dark flat>History</v-btn>

                <v-spacer></v-spacer>
                <v-btn @click="getNewEvents()" color="accent" style="position:absolute; right:20px; top:0px;">NEW</v-btn>
            </v-toolbar>

            <v-content app>
                <v-container fluid fill-height pa-0>

                    <router-view></router-view>

                </v-container>
            </v-content>

            <!-- global notifications logic -->
            <notifications 
                :max="1"
                position="bottom right"
                :duration="3000"
                group="app-notifications">
                <div slot="body" slot-scope="props">
                    <v-alert    
                        v-model="alert"
                        :color="props.item.type"
                        dismissible
                        style="border-radius:10px; margin-right:5%; margin-bottom:5%;">
                        {{ props.item.text }}
                    </v-alert>
                </div>
            </notifications>
        </v-app>
    </div>
</template>
<script>
import EventsJson from './dummyEvents.json';
// import format from 'date-fns/format';

// import AlertData from '@/types/cameraAlertType';

export default {
    name: 'App',
    props: { },
    data: () => ({
        alert: true,
        events: EventsJson.events
    }),
    computed: {
        formatAlertText() {
            let alert = this.$cameraAlert.alertData;
            return `1 ${alert.detectedObject} identified in ${alert.camName}`;
        },
    },
    methods: {
        async logout() {
            await this.$auth.logout();
            this.$router.replace('/sign_in');
        },
        getNewEvents() {
            this.$events.setNewEvents(this.events)
                .then(() => {
                    this.$notifySuccess("New events received!")
                })
        }
    },
}
</script>
<style>
#app > div.v-alert.error > a > i {
    /* overrides alert header bars' cancel icon color to white */
    color:white;
}
.v-btn--active {
    background-color:#FFF !important;
    color: black !important;
}
</style>
