<notes>
    This view will serve as the default screen, showing all available cameras live feeds.
    It may or may not have any other ui such as the video-controls component.
    Assumption is that any live streaming data will come in through here.
</notes>
<template>
    <v-container grid-list-xs fill-height pa-0>
        <v-layout row wrap align-center>
            <v-flex
                v-for="stream in streams"
                :key="stream.id"
                xs6
                >
                <video--live-feed :stream="stream" v-on:capture="onCaptureTaken($event)"/>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import VideoLiveFeed from '@/components/video--live-feed.vue';

import CameraFeedsJson from '@/cameraFeeds.json'

export default {
    components: {
        'video--live-feed': VideoLiveFeed,
    },
    data: () => ({
        captures: [],
        streams: CameraFeedsJson
    }),
    methods: {
        onCaptureTaken(event) {
            this.captures.push(event);
        }
    }
}
</script>
