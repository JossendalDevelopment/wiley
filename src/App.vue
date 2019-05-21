<notes>
    This component contains the large header alert for showing camera events as well as global
    notifications for general user feedback alerts, accessible globally by:
    $notifyError(<message>)
    $notifySuccess(<message>)
    $notifyInfo(<message>)
    $notifyWarn(<message>)

    Also all the 'simulated alert' logic is being handled here.
    Cleanup required.
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
                v-if="$auth.status.loggedIn" 
                :style="`background-color:${$vuetify.theme.primaryDark1}`">
                <v-toolbar-title style="cursor:pointer;" @click="$router.push('/overview')">
                    Wiley
                </v-toolbar-title>

                <v-spacer> </v-spacer>

                <v-menu transition="slide-y-transition" bottom>
                    <template v-slot:activator="{ on }">
                        <span>Status: </span>
                        <v-btn
                            v-on="on"
                            flat
                            color="secondary" 
                            style="background-color:#FFF; width: 20rem;"
                        >
                            {{ currentStatus.name }}
                            <v-icon class="pl-1">fas fa-caret-down</v-icon>
                        </v-btn>
                        <span class="pl-2">{{ dateTime }}</span>
                    </template>
                    <v-list>
                        <v-list-tile 
                            v-for="stat in status" 
                            :key="stat.code" 
                            @click="() => {setOperationsStatus(stat.code)}" >
                            <v-list-tile-title>{{ stat.name }}</v-list-tile-title>
                        </v-list-tile>
                    </v-list>
                </v-menu>

                <!-- v-spacer works better when demo Simulate Alert button is removed -->
                <!-- TODO also remove &nbsp; on date above -->
                <div style="width: 8rem"></div>
                <!-- <v-spacer> </v-spacer> -->
                <v-toolbar-items class="hidden-xs-and-down">
                    <v-btn v-if="$auth.status.loggedIn" color="accent" @click="simulateAlert()">Simulate alert</v-btn>
                </v-toolbar-items>
                <v-toolbar-items>
                    <v-menu open-on-hover bottom offset-y v-if="$auth.status.loggedIn">
                        <template v-slot:activator="{ on }">
                            <v-btn v-on="on" flat>
                                {{ $auth.user.email }}
                                <v-icon class="pl-1">fas fa-caret-down</v-icon>
                            </v-btn>
                        </template>
                        <v-list>
                            <v-list-tile @click="$router.push('/')" >
                                <v-list-tile-title>Home</v-list-tile-title>
                            </v-list-tile>
                            <v-list-tile @click="$router.push('/overview')" >
                                <v-list-tile-title>Feed</v-list-tile-title>
                            </v-list-tile>
                            <v-list-tile @click="$router.push('/history')" >
                                <v-list-tile-title>History</v-list-tile-title>
                            </v-list-tile>
                        </v-list>
                    </v-menu>
                </v-toolbar-items>
                <v-toolbar-items class="hidden-xs-and-down">
                    <v-btn v-if="$auth.status.loggedIn" flat @click="logout()">Logout</v-btn>
                </v-toolbar-items>
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
                :duration="4000"
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
import format from 'date-fns/format';

import AlertData from '@/types/cameraAlertType';

export default {
    name: 'App',
    props: { },
    data: () => ({
        alert: true,
        status: [
            { code: 1, name: 'Normal Operations in Progress' },
            { code: 2, name: 'Option 2' },
            { code: 3, name: 'Option 3' },
        ],
        currentStatus: { code: 1, name: 'Normal Operations in Progress' }, 
        dateTime: null,
        timer: null
    }),
    created() {
        this.startTime();
    },
    destroyed() {
        clearInterval(this.timer);
    },
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
        setOperationsStatus(code) {
            this.currentStatus = this.status.find(stat => stat.code === code);
        },
        goToAlertDetails() {
            this.$cameraAlert.hideAlertHeader();
            this.$router.push({ 
                name: 'cam_details', 
                params: { id: this.$cameraAlert.alertData.cameraId } 
            });
        },
        startTime() {
            this.dateTime = format(new Date(), 'MMM DD, YYYY - hh:mm;ss');
            this.timer = setTimeout(this.startTime, 500);
        },
        simulateAlert() {
            const alertData = new AlertData({
                'id': '01',
                'type': 'motion',
                'detectedObject': 'coyote',
                'probability': '95%',
                'startTime': Date.now(),
                'endTime': (() => {
                    // create an end time a minute after start time just for demo purpose
                    var now = new Date();
                    now.setMinutes(now.getMinutes() + 1); // timestamp
                    return new Date(now); // Date object
                })(),
                'duration': 60, // in seconds
                'cameraId': 100,
                'camNumber': 1,
                'camName': 'Rail-EAST',
                'status': 'active',
                'sourceData': {
                    'src': "https://app.coverr.co/s3/mp4/Deserted%20Island.mp4",
                    'type': "video/mp4"
                },
                "staticImage": "/assets/images/ref_raileast.jpg"
            })
            this.$cameraAlert.createAlert(alertData)
        }
    },
}
</script>
<style>
#app > div.v-alert.error > a > i {
    /* overrides alert header bars' cancel icon color to white */
    color:white;
}
</style>
