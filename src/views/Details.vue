<notes>
    This component handles all the heavy lifting for classifying an event. Will need abstraction  
</notes>
<template>
    <v-layout justify-center v-if="$events.events && $events.events.length === 0" class="video-container test-ref">
        <span style="color:white; font-family: Open Sans Condensed; font-size: 30px;">
            There are no events
        </span>
    </v-layout>
    <v-layout v-else-if="!working" class="video-container test-ref" justify-center>
        <v-flex xs12>
<!-- Above video -->
            <v-layout align-center justify-center>
                <span style="color:white; font-family: 'DIN Condensed'; font-size: 28px;">{{`${currentEventIndex + 1}/${ $events.events && $events.events.length}`}}</span>
            </v-layout>
<!-- video -->
            <v-layout row wrap align-center justify-center>
                <v-flex xs2>
                    <v-layout justify-start align-center>
                        <v-btn flat large @click="goBack()">Previous</v-btn>
                    </v-layout>
                </v-flex>
                <v-flex xs8 class="video-feed-wrapper">
                    <div class="red-border">

                        <dummy-camera-image 
                            ref="cameraImage"
                            :boundary="currentEvent.boundary" 
                            :source="currentEvent" />
                    <!-- <video-player :options="getVideoOptions()"/> -->

                    </div>
                </v-flex>
                <v-flex xs2>
                    <v-layout justify-end>
                        <v-btn flat large @click="goNext()">Next/Skip</v-btn>
                    </v-layout>
                </v-flex>
            </v-layout>
<!-- below video -->
            <v-layout column align-center justify-center>
                <v-flex xs10 class="text--center white--text">
                    <p style="font-family: Montserrat; font-size:14px; font-weight:700;">SELECT OR USE YOUR KEYBOARD</p>
                </v-flex>
                <v-layout justify-space-between>
                    <v-flex xs2>
                        <v-btn @click="setClassification('employee')" flat class="control-btn" :style="selected('employee')" large>1 employee</v-btn>
                        <p class="control-text text-xs-center">{{ getTotalByType('employee') }}</p>
                    </v-flex>
                    <v-flex xs2>
                        <v-btn @click="setClassification('non-employee')" flat class="control-btn" :style="selected('non-employee')" large>2 non-employee</v-btn>
                        <p class="control-text text-xs-center">{{ getTotalByType('non-employee') }}</p>
                    </v-flex>
                    <v-flex xs2>
                        <v-btn @click="setClassification('contractor')" flat class="control-btn" :style="selected('contractor')" large>3 contractor</v-btn>
                        <p class="control-text text-xs-center">{{ getTotalByType('contractor') }}</p>
                    </v-flex>
                    <v-flex xs2>
                        <v-btn @click="setClassification('coyote')" flat class="control-btn" :style="selected('coyote')" large>4 coyote</v-btn>
                        <p class="control-text text-xs-center">{{ getTotalByType('coyote') }}</p>
                    </v-flex>
                    <v-flex xs2>
                        <v-btn @click="openFalseAlarmModal()" flat class="control-btn" :style="selected('false-alarm')" large>5 false alarm</v-btn>
                        <p class="control-text text-xs-center">{{ getTotalByType('false-alarm') }}</p>
                    </v-flex>
                </v-layout>
            </v-layout>
        </v-flex>
<!-- Confirm/Deny modals -->
        <app-dialog ref="falsealarm" max-width="500">
            <template slot="modaltitle">
                CONFIRM FALSE ALARM?
            </template>
            <template slot="modalcontent">
                <v-textarea
                    dark
                    rows="7"
                    auto-grow
                    class="textarea"
                    value="Please leave a reason for registering this event as a false alarm"                    
                />
            </template>
            <v-btn slot="detailsButton" dark style="background-color:#FFF; color:black;" @click="setClassification('false-alarm')">Confirm</v-btn> 
        </app-dialog>
    </v-layout>
</template>
<script>
// import firebase from 'firebase';
import DummyCameraImage from '@/components/dummy-camera-image';
// import VideoPlayer from '@/components/video-player.vue';
import Dialog from '@/components/app-dialog.vue';

// import CameraFeedsJson from '@/cameraFeeds.json';

export default {
    components: {
        'dummy-camera-image': DummyCameraImage,
        // 'video-player': VideoPlayer,
        'app-dialog': Dialog
    },
    data: () => ({
        classifiedEvents: [],
        eventWatcher: null,
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
                // space bar zoom in/out
                this.$refs.cameraImage.zoom();
            } else if (e.keyCode === 39) {
                // arrow right
                this.goNext();
            } else if (e.keyCode === 37) {
                // arrow left
                this.goBack();
            }
        });
        this.$events.getAllEvents()
            .then(async resp => {
                try {
                    console.log("SETTING NEW EVENTS", resp)
                    await this.$events.setEvents(resp.data)
                    this.currentEvent = resp.data[0];
                    this.working = false;
                }
                catch (err) {
                    this.$notifyError("ERROR FETCHING NEW EVENTS")
                }
            })
            // this.$events.setEvents(this.events.events);
    },
    created() {
        // watcher on all classified events
        // TODO limit this to the most recent 25 events?
        // const db = firebase.firestore();
        // this.eventWatcher = db.collection("classified_events").limit(25)
        //     .onSnapshot(
        //         querySnapshot => {
        //             let result = [];
        //             querySnapshot.forEach((doc) => { 
        //                 let newDoc = doc.data();
        //                 newDoc.id = doc.id;
        //                 result.push(newDoc);
        //             });
        //             // this.classifiedEvents = result;
        //             // this.$events.setEvents(result);
        //             // this.currentEvent = result[0];
        //             this.working = false;
        //         },
        //         (error) => {
        //             console.log("Error in listenForEventChange:", error)
        //         }
        //     )
    },
    destroyed() {
        // this.eventWatcher()
    },
    methods: {
        goBack() {
            this.currentEventIndex = this.crawlArray(this.$events.events, this.currentEventIndex, -1);
            this.currentEvent = this.$events.events[this.currentEventIndex];
        },
        goNext() {
            this.currentEventIndex = this.crawlArray(this.$events.events, this.currentEventIndex, 1);
            this.currentEvent = this.$events.events[this.currentEventIndex];
        },
        crawlArray(array, index, n) {
            return ((index + n) % array.length + array.length) % array.length;
        },
        setClassification(type) {
            // could interrupt with a confirmation of some kind here
            // find current event in this.$events.events and update it
            let curr = this.$events.events.find(event => {
                return event.eventId === this.currentEvent.eventId
            })
            curr.classifiedAs = type;
            this.updateConfirmedEvent(curr);
        },
        confirmEvent(event) {
            this.$events.createEvent(event)
                .then(() => {
                    this.$notifyClassification(event.classifiedAs.toUpperCase())
                })
                .catch(() => {
                    this.$notifyError("Failed")
                })
        },
        updateConfirmedEvent(event) {
            this.$events.updateEvent(event)
                .then(() => {
                    this.$notifyClassification(event.classifiedAs.toUpperCase());
                    this.goNext();
                })
                .catch(() => {
                    this.$notifyError("Failed")
                })
        },
        getTotalByType(type) {
            return this.$events.events.reduce((prev, next) => {
                if(next.classifiedAs === type) {
                    prev++;
                }
                return prev;
            }, 0);
        },
        selected(type) {
            if(this.$events.events[this.currentEventIndex] && this.$events.events[this.currentEventIndex].classifiedAs === type) {
                return `background-color: #FFF; color: black;`
            }
            return '';
        },
        openFalseAlarmModal() {
            this.$refs.falsealarm.open();
        },
    },
    computed: {
        getCurrentEvent() {
            return this.events.events[this.currentEventIndex].staticImage;
        },
    }
}
</script>
<style lang="scss" scoped>
.v-btn {
    letter-spacing: 3.5px;
    border: 1px solid var(--v-border-base);
    background-color: var(--v-buttonBlack-base);
    color: #FFF;
}
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

/* modal */
.textarea {
    // border: 1px solid #FFF;
    background-color: var(--v-secondaryDark-base);
    color: #FFF;
    padding: 20px;
}
</style>
