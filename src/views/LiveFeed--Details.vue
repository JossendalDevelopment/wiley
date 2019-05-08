<notes>
    The goal of this component is to display a singlular view of a camera feed after an alert has been triggered and allow for review, flagging, and possible manipulation of said feed. Will also display the AI object probability, type of object detected, employees in the vicinity, and an option to reclassify a detected object.
</notes>
<template>
    <v-layout class="test-ref">
        <V-flex xs3>
            <video--controls />
        </V-flex>
        <v-flex xs9 v-if="!working">
            <v-layout row wrap align-start justify-center fill-height>
                <v-flex xs10>
                    <v-layout justify-space-between align-center>
                        <p class="mb-0">{{ parseTime }}</p>
                        <v-layout justify-end>
                            <v-icon>fas fa-flag</v-icon>
                            <v-btn flat >Flag for further review</v-btn>
                        </v-layout>
                    </v-layout>
                </v-flex>
                <v-flex xs10 style="height: 70%;" >
                    <video-player :options="getVideoOptions"/>
                    <!-- <video--live-feed :stream="stream" v-on:capture="onCaptureTaken($event)"/> -->
                </v-flex>
                <v-flex xs10>
                    <v-layout justify-center>
                        <v-btn large class="error btn">
                            False Alarm 
                        </v-btn>
                        <v-btn large class="success btn">
                            Confirm Object
                        </v-btn>
                    </v-layout>
                </v-flex>
            </v-layout>
        </v-flex>
    </v-layout>
</template>
<script>
import VideoControls from '@/components/video--live-feed--controls.vue';
import videoPlayer from '@/components/video-player';

import format from 'date-fns/format';

import CameraFeedsJson from '@/cameraFeeds.json';
import { setTimeout } from 'timers';

export default {
    components: {
        'video--controls': VideoControls,
        'video-player': videoPlayer
    },
    data: () => ({
        stream: {},
        videoOptions: {
            autoplay: true,
            controls: true,
            responsive: true,
            muted: true,
            language: 'en',
            playbackRates: [0.5, 1.0, 1.5, 2.0],
            sources: [] // being set from overview and source prop
        },
        working: true
    }),
    mounted() {
        this.stream = CameraFeedsJson.find(stream => stream.id == this.$route.params.id);
        this.setVideoOptions();
        console.log("Stream in 1", this.stream)
        setTimeout(() => {
            this.working = false;
        }, 1000)
    },
    methods: {
        onCaptureTaken(event) {
            console.log(event)
        },
        setVideoOptions() {
            this.videoOptions.sources = [this.stream.sourceData];
        },
    },
    computed: {
        parseTime() {
            return format(new Date(), 'MM/DD/YYYY hh:mm:ss')
        },
        getVideoOptions() {
            console.log("get video options 2", this.videoOptions)
            return this.videoOptions;
        }
    }
}
</script>
<style scoped>
.btn {
    width: 40%;
}
</style>
