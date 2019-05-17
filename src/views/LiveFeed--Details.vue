<notes>
    The goal of this component is to display a singlular view of a camera feed after an alert has been triggered and allow for review, flagging, and possible manipulation of said feed. Will also display the AI object probability, type of object detected, employees in the vicinity, and an option to reclassify a detected object.
</notes>
<template>
    <v-layout class="test-ref">
        <V-flex xs3>
            <video--controls v-if="!working" :stream="stream" :events="parseEvents" />
        </V-flex>
        <v-flex xs9>
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
                    <!-- video overlay -->
                    <v-layout class="controls top" align-start justify-end>
                        <div 
                            style="display:flex; align-items:center; padding:10px; cursor:pointer;" 
                            :style="`background-color:rgba(222,222,222,0.3)`">
                            <v-icon>fas fa-search-plus</v-icon>
                            <p 
                                class="pl-2 mb-0 test-ref primary--text">
                                Zoom
                            </p>
                        </div>
                    </v-layout>
                    <v-layout class="controls bottom" align-start justify-end>
                        <!-- Custom video controls UI -->
                        <!-- <div style="display:flex; align-items:center; padding:10px;" :style="`background-color:rgba(222,222,222,0.3)`">
                            <div class="live-icon"></div>
                            <p 
                                class="pl-2 mb-0 test-ref primary--text">
                                Live Feed
                            </p>
                        </div> -->
                    </v-layout>
                </v-flex>
<!-- below video -->
                <v-flex xs10 mt-2>
                    <v-layout justify-space-between align-center>
                        <p class="pl-3 mb-0">{{ formatProbabilityText }}</p>
                        <v-btn 
                            v-for="button in mainButtons"
                            :key="button.type+1"
                            @click="classification = button.type" 
                            :class="classification === button.type ? 'secondary' : 'primary black--text'">
                            {{ button.type }}
                        </v-btn>
                        <!-- <v-btn @click="openConfirmModal()" class="secondary btn">
                            categorize
                        </v-btn> -->
                    </v-layout>
                    <v-layout justify-center align-center>
                        <v-btn 
                            v-for="(sub, index) in activeCategory.subCats"
                            :key="sub+index"
                            @click="subClassification = sub" 
                            :class="subClassification === sub ? 'secondary' : 'primary black--text'">
                            {{ sub }}
                        </v-btn>
                    </v-layout>
                </v-flex>
            </v-layout>
        </v-flex>
        <!-- Confirm/Deny modals probably scrap these -->
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
                Confirm?
            </template>
            <template slot="modalcontent">
                <div>Register this event as a false alarm?</div>
            </template>
            <v-btn slot="detailsButton" color="success" @click="falseAlarm()">Confirm</v-btn> 
        </app-dialog>
    </v-layout>
</template>
<script>
import VideoControls from '@/components/video--details--controls2.vue';
// import videoPlayer from '@/components/video-player';
import DummyCameraImage from '@/components/dummy-camera-image';
import Dialog from '@/components/app-dialog.vue';

import format from 'date-fns/format';

import CameraFeedsJson from '@/cameraFeeds.json';
import EventsJson from '@/dummyEvents.json';

export default {
    components: {
        'video--controls': VideoControls,
        'dummy-camera-image': DummyCameraImage,
        'app-dialog': Dialog
        // 'video-player': videoPlayer
    },
    data: () => ({
        stream: {},
        events: EventsJson,
        working: true,
        classification: 'non-employee',
        subClassification: '',
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
        mainButtons: [
            {
                type: 'employee',
                subCats: ['1','2','3']
            },
            {
                type: 'non-employee',
                subCats: ['4','5','6']
            },
            {
                type: 'contractor',
                subCats: ['7','8','9']
            },
            {
                type: 'false',
                subCats: ['10','11','12']
            },
        ]
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
        activeCategory() {
            return this.mainButtons.find(b => b.type === this.classification)
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
        formatProbabilityText() {
            return `Identified: ${this.$cameraAlert.alertData.detectedObject} (confidence ${this.$cameraAlert.alertData.probability})`
        }
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
.controls {
    position: absolute;
    top: 0px;
    right: 0px;
    left: 0px;
}
.live-icon {
    border: 1px solid;
    border-radius: 100%;
    height: 20px;
    width: 20px;
    background-color: red;
}
</style>
