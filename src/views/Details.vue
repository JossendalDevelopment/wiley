<notes>
    The goal of this component is to display a singular view of a camera feed after an alert has been triggered and allow for review, flagging, and possible manipulation of said feed. Will also display the AI's object probability, type of object detected, employees in the vicinity, and an option to reclassify a detected object.
</notes>
<template>
    <v-layout class="video-container test-ref" justify-center v-if="!working">
        <v-flex xs10>
<!-- Above video -->
            <v-layout align-center justify-space-between>
                <v-btn flat @click="goBack()">Previous</v-btn>
                <span style="color:white; font-family: Open Sans Condensed; font-size: 32px;">{{`${currentEventIndex + 1}/${events.events.length}`}}</span>
                <v-btn flat @click="goNext()">Next/Skip</v-btn>
            </v-layout>
<!-- video -->
            <v-layout row wrap align-center justify-center>
                <v-flex xs10 class="video-feed-wrapper">
                    <div class="red-border">
                        <dummy-camera-image 
                            ref="cameraImage"
                            :boundary="currentEvent.boundary" 
                            :source="currentEvent.staticImage" />
                    <!-- <video-player :options="getVideoOptions()"/> -->
                    </div>
                </v-flex>
            </v-layout>
<!-- below video -->
            <v-layout column align-center justify-center>
                <v-flex xs10 class="text--center white--text">
                    <p style="font-family: Montserrat; font-size:14px;">Select or use your keyboard</p>
                </v-flex>
                <v-layout justify-space-between>
                    <v-flex xs2>
                        <v-btn @click="setClassification('employee')" flat class="control-btn" large>1 employee</v-btn>
                        <p class="control-text text-xs-center">12</p>
                    </v-flex>
                    <v-flex xs2>
                        <v-btn @click="setClassification('non-employee')" flat class="control-btn" large>2 non-employee</v-btn>
                        <p class="control-text text-xs-center">12</p>
                    </v-flex>
                    <v-flex xs2>
                        <v-btn @click="setClassification('contractor')" flat class="control-btn" large>3 contractor</v-btn>
                        <p class="control-text text-xs-center">12</p>
                    </v-flex>
                    <v-flex xs2>
                        <v-btn @click="setClassification('coyote')" flat class="control-btn" large>4 coyote</v-btn>
                        <p class="control-text text-xs-center">12</p>
                    </v-flex>
                    <v-flex xs2>
                        <v-btn @click="setClassification('false-alarm')" flat class="control-btn" large>5 false alarm</v-btn>
                        <p class="control-text text-xs-center">12</p>
                    </v-flex>
                </v-layout>
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
import DummyCameraImage from '@/components/dummy-camera-image';
// import VideoPlayer from '@/components/video-player.vue';
import Dialog from '@/components/app-dialog.vue';

import CameraFeedsJson from '@/cameraFeeds.json';
import EventsJson from '@/dummyEvents.json';

export default {
    components: {
        'dummy-camera-image': DummyCameraImage,
        // 'video-player': VideoPlayer,
        'app-dialog': Dialog
    },
    data: () => ({
        stream: {},
        events: EventsJson,
        working: true,
        currentEventIndex: 0,
        currentEvent: {},
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
        window.addEventListener("keyup", (e) => {
            if (String.fromCharCode(e.keyCode) === '1') {
                this.setClassification('employee');
            } else if (String.fromCharCode(e.keyCode) === '2') {
                this.setClassification('non-employee');
            } else if (String.fromCharCode(e.keyCode) === '3') {
                this.setClassification('contractor');
            } else if (String.fromCharCode(e.keyCode) === '4') {
                this.setClassification('coyote');
            } else if (String.fromCharCode(e.keyCode) === '5') {
                this.setClassification('false-alarm');
            } else if (e.keyCode === 32) {
                console.log("Zoom feature")
                // space bar zoom in/out
                this.$refs.cameraImage.zoom();
            }
        });
        // gets camera details from dummy json and route params that are being harcoded
        this.stream = CameraFeedsJson.find(stream => stream.id == this.$route.params.id);
        setTimeout(() => {
            this.currentEvent = this.events.events[0];
            this.working = false;
        }, 500)
    },
    methods: {
        goBack() {
            this.currentEventIndex = this.crawlArray(this.events.events, this.currentEventIndex, -1);
            this.currentEvent = this.events.events[this.currentEventIndex];
        },
        goNext() {
            this.currentEventIndex = this.crawlArray(this.events.events, this.currentEventIndex, 1);
            this.currentEvent = this.events.events[this.currentEventIndex];
        },
        crawlArray(array, index, n) {
            return ((index + n) % array.length + array.length) % array.length;
        },
        setClassification(type) {
            this.currentEvent.classifiedAs = type;
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
        getCurrentEvent() {
            console.log(this.events.events)
            return this.events.events[this.currentEventIndex].staticImage;
        },
    }
}
</script>
<style lang="scss" scoped>
.v-btn {
    font-family: 'Open Sans Condensed';
    font-size: 18px;
    letter-spacing: 3.5px;
    border: 1px solid var(--v-border-base);
    background-color: black;
    color: #FFF;
}
// .v-btn.control-btn {
//     width: 20%;
//     font-size: 20px;
//     letter-spacing: 1.5px;
//     /* padding: 5px 12px; */
//     /* font-weight: 300; */
// }
.control {
    &-btn {
        width: 100%;
        font-size: 20px;
        letter-spacing: 1.5px;
    }
    &-text {
        width: 100%;
        margin: 0 auto;
        color: #fff;
    }
}
.video-feed-wrapper {
    position: relative;
}
.video-container {
    background-color: var(--v-secondaryDark-base);
}
/* border corners */

.red-border {
    background-image: url("/assets/images/red_border.png");
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    position: relative;
    width: 100%;
    height: 100%;
    z-index: 200;
    padding: 20px 10px;
}
</style>
