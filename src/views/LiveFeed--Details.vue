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
                    <!-- <video-player :options="getVideoOptions"/> -->

                    <!-- video overlay top-->
                    <v-layout class="controls-top" align-start justify-end>
                        <div style="display:flex; align-items:center; padding:10px; cursor:pointer;" >
                            <v-icon>fas fa-search-plus</v-icon>
                            <p class="pl-2 mb-0 test-ref" style="font-size:16px; font-weight:800;">Zoom</p>
                        </div>
                    </v-layout>
                    <!-- video player slider control TODO should be part of video-player component if anything -->
                    <v-layout 
                        v-if="$route.fullPath !== '/overview'" 
                        class="controls-bottom" 
                        align-center>
                        <v-flex grow class="slider">
                            <v-layout justify-space-between align-center>
                                <div class="back" @click="() => {}">
                                    <v-icon>fas fa-step-backward</v-icon>
                                </div>
                                <div class="handle"></div>
                                <div class="forward" @click="() => {}">
                                    <v-icon>fas fa-step-forward</v-icon>
                                </div>
                            </v-layout>
                        </v-flex>
                        <v-flex shrink class="review ml-0">
                            <p class="px-2 mb-0 secondary--text">
                                Review Playback
                            </p>
                        </v-flex>
                        <v-flex shrink class="live">
                            <div class="live-icon"></div>
                            <p class="px-2 mb-0 secondary--text">
                                Live Feed
                            </p>
                        </v-flex>
                    </v-layout>
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
        videoOptions: {
            autoplay: true,
            controls: true,
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
        // this.setVideoOptions();
    },
    methods: {
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
            // this.$eventHistory.addEvent(this.$cameraAlert.alertData);
            // route somewhere?
            this.$router.replace('/overview')
        },
        confirmObject() {
            // TODO change alert status to closed/confirmed before submitting
            this.$eventHistory.createEvent(this.$cameraAlert.alertData)
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
        getVideoOptions() {
            return this.videoOptions;
        },
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
}
.controls-top {
    position: absolute;
    top: 0px;
    right: 20px;
    left: 0px;
}
.live-icon {
    border: 1px solid;
    border-radius: 100%;
    height: 20px;
    width: 20px;
    background-color: red;
}
.controls-bottom {
    background-color:var(--v-primary-lighten1);
    border: 1px solid var(--v-secondary-base);
}
.live-icon {
    border: 1px solid;
    border-radius: 100%;
    height: 20px;
    width: 20px;
    background-color: red;
}
.slider {
    background-color: var(--v-secondary-base);
    height: 41px;
}
.handle {
    width: 12px;
    height: 41px;
    background-color: var(--v-primary-base);
    cursor: pointer;
}
.live, .review {
    display: flex;
    align-items:center; 
    padding: 10px 5px;
    margin: 0 10px;
}
.review {
    background-color: var(--v-primary-base);
    color: var(--v-secondary-base);
    cursor: pointer;
}
.forward, .back {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 41px;
    background-color: #FFF;
    cursor: pointer;
}
</style>
