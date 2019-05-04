<template>
    <!-- <v-flex> -->
        <v-flex pa-1 class="video-feed-wrapper">
            <div>
                <video ref="video" class="video" width="100%" height="100%" autoplay>
                </video>
                <canvas ref="canvas" class="canvas" width="100%" height="100%"></canvas>
            </div>
            <v-layout class="controls">
                <v-btn 
                    :to="{ name: 'cam_details', params: { id: camNumber } }" 
                    small 
                    flat 
                >
                    inspect
                </v-btn>
                <v-btn id="snap" small flat v-on:click="capture()">capture</v-btn>
                <p class="mb-0">{{ camNumber }}</p>
            </v-layout>
        </v-flex>
        <!-- <ul>
            <li v-for="(c, i) in captures" :key="c+ i" style="vertical-align:middle;">
                <img v-bind:src="c" height="50" />
            </li>
        </ul> -->
    <!-- </v-flex> -->
</template>

<script>
export default {
    data: () => ({
        video: null,
        canvas: null,
        // captures: []
    }),
    props: {
        camNumber: {
            type: Number,
            required: false,
            default: null
        }
    },
    mounted() {
        this.video = this.$refs.video;
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({
                video: true
            }).then(stream => {
                this.video.srcObject = stream;
            });
        }
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

<style scoped>
    .video-feed-wrapper {
        position: relative;
    }
    .video {
        background-color: #000000;
    }
    .canvas {
        display: none;
    }
    .controls {
        position: absolute;
        top: 0;
        right: 0;
        padding: 8px;
    }
</style>
