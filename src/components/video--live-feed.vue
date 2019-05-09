<notes>
    The goal of this component is to add any required overlay ui to the video-player component.
    Also the video-players options are being defined here and should likely not be.
    Pending solution would be to have the video-player itself set those options and let parent components pass in any different video options. Same issue in live-video--detals component.
    Additionally the controls bar could be made into a component that accepts its content via slots, making it usable in any video view.
</notes>
<template>
    <v-hover>
        <!-- <v-flex pa-0 class="video-feed-wrapper" slot-scope="{ hover }"> -->
        <v-flex class="video-feed-wrapper">

            <video-player :options="getVideoOptions()"/>

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
            </v-layout>
        </v-flex>
    </v-hover>
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
        videoOptions: {
            autoplay: true,
            controls: false,
            responsive: true,
            aspectRatio: '16:9',
            fill: true,
            muted: true,
            language: 'en',
            playbackRates: [0.5, 1.0, 1.5, 2.0],
            sources: [] // being set from overview and source prop
        }
    }),
    beforeDestroy() {
        this.video = null;
    },
    methods: {
        getVideoOptions() {
            // add the stream url or filepath to video options
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
    }
    .controls .top {
        position: absolute;
        top: 1px;
        right: 2px;
        left: 2px;
        height: 15%
    }
</style>
