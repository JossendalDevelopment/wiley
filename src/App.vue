<template>
    <div id="app">
        <v-app id="inspire">
            <v-navigation-drawer
                clipped
                fixed
                v-model="drawer"
                app
                disable-resize-watcher >
                <v-list dense>
                    <v-list-tile @click="() => {}">
                        <v-list-tile-action>
                            <v-icon>fas fa-tachometer-alt</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>Drawer stuff</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile @click="() => {}">
                        <v-list-tile-action>
                            <v-icon>fas fa-cog</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>Settings</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>
            </v-navigation-drawer>
            <v-toolbar app fixed clipped-left>
                <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
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
            <v-footer app fixed>
                <span>&copy; 2019 Footer?</span>
            </v-footer>
        </v-app>
    </div>
</template>
<script>
import AlertData from '@/types/cameraAlertType';

export default {
    name: 'App',
    props: { },
    data: () => ({
        drawer: false,
    }),
    methods: {
        async logout() {
            await this.$auth.logout();
            this.$router.replace('/sign_in');
        },
        simulateAlert() {
            const alertData = new AlertData({
                'alertStatus': 'active',
                'type': 'motion',
                'detectedObject': 'coyote',
                'probability': '95%',
                'time': Date.now(),
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
