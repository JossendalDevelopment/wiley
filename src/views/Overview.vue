<notes>
    This view will serve as the default screen, showing all available cameras live feeds.
    It may or may not have any other ui such as the video-controls component.
    Assumption is that any live streaming data will come in through here.
</notes>
<template>
    <v-container grid-list-xs fill-height pa-0>
        <v-layout row wrap align-start>
            <v-flex
                v-for="stream in streams"
                :key="stream.id"
                xs6
                >
                <video-live-feed :stream="stream" />
                <video-history />
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import VideoLiveFeed from '@/components/video--live-feed.vue';
import VideoHistory from '@/components/video--live-feed--history.vue'

import CameraFeedsJson from '@/cameraFeeds.json'

export default {
    components: {
        'video-live-feed': VideoLiveFeed,
        'video-history': VideoHistory,
    },
    data: () => ({
        captures: [],
        streams: CameraFeedsJson
    }),
}
</script>
