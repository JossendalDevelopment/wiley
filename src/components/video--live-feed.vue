<template>
    <!-- <v-flex> -->
    <v-hover>
        <v-flex pa-1 class="video-feed-wrapper" slot-scope="{ hover }">
            <video-player :options="videoOptions"/>
                <!-- <div>
                    <video ref="video" class="video" width="100%" height="100%" autoplay>
                    </video>
                    <canvas ref="canvas" class="canvas" width="100%" height="100%"></canvas>


                </div> -->
            <v-layout class="controls">
                <p class="mb-0 top test-ref primary--text">Cam {{ camNumber }}</p>
                <v-layout class="bottom" :style="`background-color:${$vuetify.theme.accent}`">
                    <v-btn 
                        v-show="hover"
                        icon
                        class="bottom"
                        :to="{ name: 'cam_details', params: { id: +camNumber } }" 
                        small 
                        flat 
                    >
                        <v-icon color="accent">fas fa-eye</v-icon>
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
        camNumber: {
            type: Number,
            required: false,
            default: null
        }
    },
    data: () => ({
        cameras: {},
        cameraData: {},
        video: null,
        canvas: null,
        // captures: []
        videoOptions: {
            autoplay: false,
            controls: true,
            responsive: true,
            muted: true,
            language: 'en',
            playbackRates: [0.7, 1.0, 1.5, 2.0],
            sources: [
                {
                    src: "https://app.coverr.co/s3/mp4/Deserted%20Island.mp4",
                    type: "video/mp4"
                },
                {
                    src: "http://vjs.zencdn.net/v/oceans.mp4",
                    type: "video/mp4"
                }
            ]
        }
    }),
    mounted () {
        // try {
        //     this.video = this.$refs.video;
        //     // this.cameraData = axios.get(`${process.env.VUE_APP_NEST_BASE_URL}/devices/cameras/${process.env.VUE_APP_DEVICE_ID}`, 
        //     axios.get(`http://localhost:3001/nest`)
        //         .then(response => {
        //             this.cameras = JSON.parse(response.data).devices.cameras;
        //             this.cameraData = this.cameras[Object.keys(this.cameras)[0]];
        //             console.log("CAMERA", this.cameraData)
        //             // this.video.srcObject = this.cameraData.web_url;
        //         })
        // } catch(err) {
        //     console.error(err.message);
        // }
        this.video = this.$refs.video;
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({
                video: true
            }).then(stream => {
                this.video.srcObject = stream;
            });
        }
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
        padding: 8px;
        top: 0;
        right: 0;
    }
    .controls .bottom {
        position: absolute;
        // padding: 8px;
        bottom: 5px;
        right: 5px;
        left: 5px;
        height: 10%
    }
</style>
