<notes>
    The goal of this component is to display a singular view of a camera feed after an alert has been triggered and allow for review, flagging, and possible manipulation of said feed. Will also display the AI's object probability, type of object detected, employees in the vicinity, and an option to reclassify a detected object.
</notes>
<template>
    <v-layout class="test-ref">
        <V-flex xs3>
            <video--details--controls v-if="!working" :stream="stream" :events="parseEvents" />
        </V-flex>
        <v-flex xs9 class="video-container">
<!-- Above video -->
            <v-layout align-center justify-center>
                <v-flex xs10>
                    <v-layout justify-space-between align-center>
                        <p class="mb-0">Event #{{ $cameraAlert.alertData.id }}</p>
                        <p class="mb-0 ml-3">{{ parseDate }}</p>
                        <p class="mb-0 ml-3">{{ parseTime }}</p>
                        <p class="mb-0 ml-3">({{ $cameraAlert.alertData.duration }} secs)</p>
                        <v-layout justify-end>
                            <!-- <v-icon>fas fa-flag</v-icon> -->
                            <v-btn flat style="background-color:#FFF;">Mark as Reviewed</v-btn>
                        </v-layout>
                    </v-layout>
                </v-flex>
            </v-layout>
<!-- video -->
            <v-layout row wrap align-start justify-center>
                <v-flex xs10 class="video-feed-wrapper">

                    <dummy-camera-image :source="stream.staticImage" />
                    <!-- <video-player :options="getVideoOptions()"/> -->

                </v-flex>
<!-- below video -->
                <v-flex xs10 mt-2>

                    <video--details--classifier v-on:openmodal="openFalseAlarmModal" />

                </v-flex>
            </v-layout>
        </v-flex>
<!-- Confirm/Deny modals -->
        <app-dialog ref="confirm" max-width="500">
            <template slot="modaltitle">
                Confirm?
            </template>
            <template slot="modalcontent">
                <div>Confirm this is a {{ $cameraAlert.alertData.detectedObject }}?</div>
            </template>
            <v-btn slot="detailsButton" color="success" @click="confirmObject()">Confirm</v-btn> 
        </app-dialog>

        <app-dialog ref="falsealarm" max-width="500">
            <template slot="modaltitle">
                Confirm False Alarm?
            </template>
            <template slot="modalcontent">
                <v-label>Please leave a reason for registering this event as a false alarm</v-label>
                <v-textarea
                    outline
                    color="primaryDark"
                    background-color="primaryDark2"
                    label="Start typing here"                    
                />
            </template>
            <v-btn slot="detailsButton" color="success" @click="falseAlarm()">Confirm</v-btn> 
        </app-dialog>
    </v-layout>
</template>
<script>
import VideoDetailsClassifier from '@/components/live-feed--details--classifier.vue';
import VideoDetailsControls from '@/components/live-feed--details--controls.vue';
import DummyCameraImage from '@/components/dummy-camera-image';
// import VideoPlayer from '@/components/video-player.vue';
import Dialog from '@/components/app-dialog.vue';

import format from 'date-fns/format';

import CameraFeedsJson from '@/cameraFeeds.json';
import EventsJson from '@/dummyEvents.json';

export default {
    components: {
        'video--details--controls': VideoDetailsControls,
        'video--details--classifier': VideoDetailsClassifier,
        'dummy-camera-image': DummyCameraImage,
        // 'video-player': VideoPlayer,
        'app-dialog': Dialog
    },
    data: () => ({
        stream: {},
        events: EventsJson,
        working: true,
        videoShowing: false,
        videoOptions: {
            autoplay: true,
            controls: false,
            responsive: true,
            aspectRatio: '16:9',
            fill: true,
            muted: true,
            language: 'en',
            playbackRates: [0.5, 1.0, 1.5, 2.0],
            sources: [] // being set from setVideoOptions
        },

    }),
    mounted() {
        // gets camera details from dummy json and route params that are being harcoded
        this.stream = CameraFeedsJson.find(stream => stream.id == this.$route.params.id);
        this.working = false;
    },
    methods: {
        getVideoOptions() {
            this.setVideoOptions();
            // add the stream url or filepath to video options
            // required for video-player component
            this.videoOptions.sources = [this.stream.sourceData];
            return this.videoOptions;
        },
        setVideoOptions() {
            this.videoOptions.sources = [this.stream.sourceData];
        },
        openConfirmModal() {
            this.$refs.confirm.open();
        },
        openFalseAlarmModal() {
            this.$refs.falsealarm.open();
        },
        falseAlarm() {
            // clear alertData state
            this.$cameraAlert.clearAlert();
            // send event log to history queue of some kind
            // this.$events.addEvent(this.$cameraAlert.alertData);
            // route somewhere?
            this.$router.replace('/overview')
        },
        confirmObject() {
            // TODO change alert status to closed/confirmed before submitting
            this.$events.createEvent(this.$cameraAlert.alertData)
            // send alertData to a broadcasting message queue
            // send event log to history queue
            // clear active event
        },
    },
    computed: {
        parseDate() {
            return format(new Date(), 'MM/DD/YYYY')
        },
        parseTime() {
            return format(new Date(), 'hh:mm:ss')
        },
        parseEvents() {
            // cheese way to split dummy events off to their respective cameras
            // TODO this function is being duplicated in Overview.vue - Abstract it
            return this.events.events.filter((e) => {
                return e.camId == this.stream.id
            })
        },
        // getVideoOptions() {
        //     // add the stream url or filepath to video options
        //     // required for video-player component
        //     this.videoOptions.sources = [this.stream.sourceData];
        //     return this.videoOptions;
        // },
    }
}
</script>
<style scoped>
.btn {
    width: 40%;
}
.video-feed-wrapper {
    position: relative;
}
.video-container {
    background-color: var(--v-primaryLight-base);
    box-shadow: -15px 0px 60px 25px #ffffff inset, 5px 0px 10px -5px #000000 inset;
}
</style>
