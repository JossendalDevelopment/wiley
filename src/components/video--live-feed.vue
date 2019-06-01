<notes>
    The goal of this component is to add any required overlay ui to the video-player component.
    Also the video-players options are being defined here and should likely not be.
    Pending solution would be to have the video-player itself set those options and let parent components override any necessary video options. Same issue in live-video--detals component.
    Additionally the controls bar could be made into a component that accepts its content via slots, making it usable in any video view.
</notes>
<template>
    <v-hover>
        <v-flex class="video-feed-wrapper pa-0">

            <!--  swap between for static image or video -->
            <video-player :options="getVideoOptions()"/>
            <!-- <dummy-camera-image :source="stream.staticImage" /> -->

        </v-flex>
    </v-hover>
</template>

<script>
import VideoPlayer from '@/components/video-player';
// import DummyCameraImage from '@/components/dummy-camera-image';

export default {
    components: {
        'video-player': VideoPlayer,
        // 'dummy-camera-image': DummyCameraImage
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
        videoOptions: {
            autoplay: true,
            controls: false,
            responsive: true,
            aspectRatio: '16:9',
            loop: true,
            fill: true,
            muted: true,
            language: 'en',
            playbackRates: [0.5, 1.0, 1.5, 2.0],
            sources: [] // being set from overview and source prop
        },
        plugins: {}
    }),
    beforeDestroy() {
        this.video = null;
    },
    methods: {
        getVideoOptions() {
            // add the stream url or filepath to video options
            // required for video-player component
            this.videoOptions.sources = [this.stream.sourceData];
            return this.videoOptions;
        }
    },
}
</script>

<style lang="scss" scoped>
    .video-feed-wrapper {
        position: relative;
    }
    .controls .top {
        position: absolute;
        top: 1px;
        right: 2px;
        left: 2px;
        height: 15%
    }
</style>
