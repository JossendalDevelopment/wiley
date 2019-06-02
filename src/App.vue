<notes>
    This component contains the large header alert for showing camera events as well as global
    notifications for general user feedback alerts, accessible globally by:
    $notifyError(<message>)
    $notifySuccess(<message>)
    $notifyInfo(<message>)
    $notifyWarn(<message>)

    Also all the 'simulated alert' logic is being handled here.
    Cleanup required!!!!!.
    TODO redo the badge in css only, the numerals aren't centering properly with v-badge and are being cheesed a bit
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
                class="app-toolbar"
            >

                <v-spacer></v-spacer>

                <v-btn v-if="$auth.status.loggedIn" to="/overview" dark flat>Live Feed</v-btn>
                <v-btn v-if="$auth.status.loggedIn" to="/training" dark flat style="position:relative;">
                    Model Training
                    <v-badge color="red" style="position:absolute; top:3px; right:-5px;">
                        <span slot="badge" style="margin-left:2px; margin-top:1px;">{{ $events.events ? $events.events.length : 0 }}</span>
                    </v-badge>
                </v-btn>
                <v-btn v-if="$auth.status.loggedIn" to="/history" dark flat>History</v-btn>

                <v-spacer></v-spacer>

                <v-btn @click="logout()" dark flat class="logout-btn">logout</v-btn>
                <!-- <v-btn @click="getNewEvents()" color="accent" style="position:absolute; right:120px; top:5px;">NEW</v-btn> -->

            </v-toolbar>

            <v-content app  class="app-container">
                <v-container fluid fill-height pa-0>

                    <router-view></router-view>

                </v-container>
            </v-content>

            <!-- global notifications logic -->
            <notifications 
                group="classification-notifications"
                :max="1"
                :speed="200"
                :width="250"
                :duration="500"
                animation-type="velocity"
                style="top:20%;"
                :animation="animation"
                position="center center"
                >
                <div slot="body" slot-scope="props">
                    <div style="display:flex; font-family:'DIN Condensed'; font-size:30px; background-color:red; color:#FFF; padding:20px; letter-spacing:2.5px;">
                        <p class="mb-0 mx-auto">{{ props.item.text }}</p>    
                    </div>
                </div>
            </notifications>
            <notifications 
                group="app-notifications"
                :max="1"
                :duration="1000"
                style="bottom:5%; right:5%;"
                position="right bottom"
                >
                <div slot="body" slot-scope="props">
                    <v-alert    
                        v-model="alert"
                        :color="props.item.type"
                        style="font-family:'DIN Condensed'; font-size:18px; letter-spacing:2px;">
                        {{ props.item.text }}
                    </v-alert>
                </div>
            </notifications>
        </v-app>
    </div>
</template>
<script>
import EventsJson from './dummyEvents.json';

// import AlertData from '@/types/cameraAlertType';

export default {
    name: 'App',
    props: { },
    data: () => ({
        alert: true,
        events: EventsJson.events,
        animation: {
            enter (element) {
                /*
                *  "element" - is a notification element
                *    (before animation, meaning that you can take it's initial height, width, color, etc)
                */
                let height = element.clientHeight

                return {
                    // Animates from 0px to "height"
                    height: [height, 0],

                    // Animates from 0 to 1 opacity
                    opacity: [1, 0]
                }  
            },
            leave: {
                // Animates height, opacity, and y-position upwards
                translateY: -200,
                height: 0,
                opacity: 0
            }
        }
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
        async getNewEvents() {
            try {
                await this.$events.addNewEvents(this.events);
                let resp = await this.$events.getAllEvents();
                await this.$events.setEvents(resp.data);
                this.$notifySuccess("New events received!");
            } catch(error) {
                this.$notifyError("Error getting new events!");
                throw new Error(error);
            }
        }
    },
}
</script>
<style lang="scss" scoped>
#app > div.v-alert.error > a > i {
    /* overrides alert header bars' cancel icon color to white */
    color:white;
}
.app-toolbar {
    background-color: var(--v-secondaryDark-base);
}
.v-btn {
    background-color: var(--v-secondaryDark-base);
}
.logout-btn {
    position: absolute;
    top: 5px;
    right: 12px;

    border: 1px solid var(--v-border-base);
}
.v-btn--active {
    /* header button overrides */
    background-color:#FFF !important;
    color: black !important;
}
.app-container {
    background-color: var(--v-secondaryDark-base);
}
</style>
