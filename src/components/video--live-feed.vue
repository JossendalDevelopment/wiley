<template>
    <!-- <v-flex> -->
    <v-hover>
        <!-- <v-flex pa-0 class="video-feed-wrapper" slot-scope="{ hover }"> -->
        <v-flex class="video-feed-wrapper">
            <video-player :options="getVideoOptions()"/>
                <!-- <div>
                    <video ref="video" class="video" width="100%" height="100%" autoplay>
                    </video>
                    <canvas ref="canvas" class="canvas" width="100%" height="100%"></canvas>
                </div> -->
            <v-layout class="controls">
                <v-layout 
                    class="top" 
                    justify-end
                    align-start>
                    <p 
                        :style="`background-color:rgba(222,222,222,0.3)`"
                        class="pa-2 test-ref primary--text">Cam {{ stream.camNumber }}</p>
                </v-layout>
                <v-layout 
                    v-if="$cameraAlert.alertData.cameraId == stream.id" 
                    class="top px-2" 
                    justify-space-between
                    align-center
                    :style="`background-color:${$vuetify.theme.accent}`">
                    <v-layout align-center class="ma-0">
                        <v-icon class="white--text">fas fa-exclamation-triangle</v-icon>
                        <span class="pl-1 white--text">Object Detected</span>
                    </v-layout>
                    <v-btn 
                        class="mr-0"
                        color="white"
                        :to="{ name: 'cam_details', params: { id: stream.id } }" 
                        small 
                        outline >
                        Inspect
                    </v-btn>
                </v-layout>
                <!-- <v-btn id="snap" small flat v-on:click="capture()">capture</v-btn> -->
            </v-layout>
        </v-flex>
    </v-hover>
        <!-- <ul>
            <li v-for="(c, i) in captures" :key="c+ i" style="vertical-align:middle;">
                <img v-bind:src="c" height="50" />
            </li>
        </ul> -->
    <!-- </v-flex> -->
</template>

<script>
import videoPlayer from '@/components/video-player';

export default {
    components: {
        'video-player': videoPlayer,
    },
    props: {
        stream: {
            type: Object,
            required: true,
        }
    },
    data: () => ({
        cameras: {},
        cameraData: {},
        video: null,
        canvas: null,
        // captures: []
        videoOptions: {
            autoplay: true,
            controls: false,
            responsive: true,
            muted: true,
            language: 'en',
            playbackRates: [0.7, 1.0, 1.5, 2.0],
            sources: [] // being set from overview and source prop
        }
    }),
    mounted () {
        // this.video = this.$refs.video;
        // if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        //     navigator.mediaDevices.getUserMedia({
        //         video: true
        //     }).then(stream => {
        //         this.video.srcObject = stream;
        //     });
        // }
    },
    beforeDestroy() {
        this.video = null;
    },
    methods: {
        capture() {
            this.canvas = this.$refs.canvas;
            // var context = this.canvas.getContext("2d").drawImage(this.video, 0, 0, 160, 120);
            console.log("url", this.canvas.toDataURL("image/webp"));
            this.$emit('capture', this.canvas.toDataURL("image/webp"))
            // this.captures.push(this.canvas.toDataURL("image/webp"));
        },
        getVideoOptions() {
            // console.log("DATA", this.stream.sourceData)
            this.videoOptions.sources = [this.stream.sourceData];
            return this.videoOptions;
        }
    },
    computed: {
    }
}
</script>

<style lang="scss" scoped>
    .video-feed-wrapper {
        position: relative;
        height: 100%;
    }
    .video {
        background-color: #181818;
    }
    .canvas {
        display: none;
    }
    .controls .top {
        position: absolute;
        top: 2px;
        right: 4px;
        left: 4px;
        height: 15%
    }
</style>
