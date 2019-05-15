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
            v-model="$cameraAlert.active"
            color="error"
            light
            transition="slide-y-transition"
            dismissible
            style="margin-top:0px; margin-bottom:0px; padding-right:2rem;">
                <p 
                    style="cursor: pointer;"
                    @click="$router.push({ 
                        name: 'cam_details', 
                        params: { id: $cameraAlert.alertData.cameraId } 
                    })"
                    class="text-xs-center mb-0 headline">{{ formatAlertText }}</p>
        </v-alert>

        <v-app id="inspire">
            <v-toolbar app flat absolute v-if="$auth.status.loggedIn">
                <v-toolbar-items style="position:relative; margin-right:60px;">
                    <v-img 
                        style="width:60px; height:50px; position:absolute; bottom:-1px; left:0px;"
                        contain
                        @click="$router.push('/')"
                        :src="'/assets/images/wiley_demo_header_icon.png'"></v-img>
                </v-toolbar-items>
                <v-toolbar-items class="hidden-sm-and-down">
                    <v-btn v-if="$auth.status.loggedIn" to="/" flat >Home</v-btn>
                </v-toolbar-items>
                <v-toolbar-items class="hidden-sm-and-down">
                    <v-btn v-if="$auth.status.loggedIn" to="/overview" flat >Feed</v-btn>
                </v-toolbar-items>
                <v-toolbar-items class="hidden-sm-and-down">
                    <v-btn v-if="$auth.status.loggedIn" flat >History</v-btn>
                </v-toolbar-items>
                <v-spacer> </v-spacer>

                <v-menu
                    transition="slide-y-transition"
                    bottom
                >
                    <template v-slot:activator="{ on }">
                        <span>Status: </span>
                        <v-btn
                            v-on="on"
                            color="white"
                        >
                            Normal Operations in Progress
                            <v-icon class="pl-1">fas fa-caret-down</v-icon>
                        </v-btn>
                    </template>
                    <v-list>
                        <v-list-tile
                        v-for="(n, i) in 3"
                        :key="i"
                        @click="() => {}"
                        >
                        <v-list-tile-title>{{ n }}</v-list-tile-title>
                        </v-list-tile>
                    </v-list>
                </v-menu>

                <v-spacer> </v-spacer>
                <v-toolbar-items class="hidden-xs-and-down">
                    <v-btn v-if="$auth.status.loggedIn" color="accent" @click="simulateAlert()">Simulate alert</v-btn>
                </v-toolbar-items>
                <v-toolbar-items>

                    <v-menu open-on-hover bottom offset-y v-if="$auth.status.loggedIn">
                        <template v-slot:activator="{ on }">
                            <v-btn v-on="on" flat >
                                {{ $auth.user.email }}
                                <v-icon class="pl-1">fas fa-caret-down</v-icon>
                            </v-btn>
                        </template>

                        <v-list>
                            <v-list-tile
                                v-for="(n) in 3"
                                :key="n"
                                @click="() => null"
                            >
                                <v-list-tile-title>{{ n }}</v-list-tile-title>
                            </v-list-tile>
                        </v-list>
                    </v-menu>

                </v-toolbar-items>
                <v-toolbar-items class="hidden-xs-and-down">
                    <v-btn v-if="$auth.status.loggedIn" flat @click="logout()">Logout</v-btn>
                </v-toolbar-items>
            </v-toolbar>
            <v-content app>
                <v-container fluid fill-height primary pa-0>

                    <router-view></router-view>

                </v-container>
            </v-content>
            <!-- <v-footer app fixed>
                <span>&copy; 2019 Footer?</span>
            </v-footer> -->

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
import AlertData from '@/types/cameraAlertType';

export default {
    name: 'App',
    props: { },
    data: () => ({
        alert: true
    }),
    computed: {
        formatAlertText() {
            let alert = this.$cameraAlert.alertData;
            return `1 ${alert.detectedObject} identified in ${alert.camName}`;
        }
    },
    methods: {
        async logout() {
            await this.$auth.logout();
            this.$router.replace('/sign_in');
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
    /* overrides alert bar cancel icon color to white */
    color:white;
}
</style>
