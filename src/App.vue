<template>
    <div id="app">
        <v-app id="inspire">
            <v-toolbar app fixed clipped-left v-if="$auth.status.loggedIn">
                <v-toolbar-title @click="$router.push('/')" class="accent--text mr-4">Wiley</v-toolbar-title>
                <v-toolbar-items class="hidden-xs-and-down">
                    <v-btn v-if="$auth.status.loggedIn" to="/" flat >Home</v-btn>
                </v-toolbar-items>
                <v-toolbar-items class="hidden-xs-and-down">
                    <v-btn v-if="$auth.status.loggedIn" to="/overview" flat >Feed</v-btn>
                </v-toolbar-items>
                <v-toolbar-items class="hidden-xs-and-down">
                    <v-btn v-if="$auth.status.loggedIn" flat >History</v-btn>
                </v-toolbar-items>
                <v-spacer> </v-spacer>
                <v-toolbar-items class="hidden-xs-and-down">
                    <v-btn v-if="$auth.status.loggedIn" color="accent" @click="simulateAlert()">Simulate alert</v-btn>
                </v-toolbar-items>
                <v-toolbar-items class="hidden-xs-and-down">

                    <v-menu open-on-hover bottom offset-y v-if="$auth.status.loggedIn">
                        <template v-slot:activator="{ on }">
                            <v-btn
                                v-on="on"
                                flat
                            >
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
                    <!-- <v-layout justify-center align-center> -->

                        <router-view></router-view>

                    <!-- </v-layout> -->
                </v-container>
            </v-content>
            <!-- <v-footer app fixed>
                <span>&copy; 2019 Footer?</span>
            </v-footer> -->
        </v-app>
    </div>
</template>
<script>
import AlertData from '@/types/cameraAlertType';

export default {
    name: 'App',
    props: { },
    data: () => ({
    }),
    methods: {
        async logout() {
            await this.$auth.logout();
            this.$router.replace('/sign_in');
        },
        simulateAlert() {
            const alertData = new AlertData({
                'id': '01',
                'status': 'active',
                'type': 'motion',
                'detectedObject': 'coyote',
                'probability': '95%',
                'startTime': Date.now(),
                'endTime': (() => {
                    // create an end time a minute after start time
                    var now = new Date();
                    now.setMinutes(now.getMinutes() + 1); // timestamp
                    return new Date(now); // Date object
                })(),
                'duration': 60, // in seconds
                'cameraId': 100,
                'camNumber': 1,
                'sourceData': {
                    'src': "https://app.coverr.co/s3/mp4/Deserted%20Island.mp4",
                    'type': "video/mp4"
                }
            })
            this.$cameraAlert.createAlert(alertData)
        }
    },
}
</script>
