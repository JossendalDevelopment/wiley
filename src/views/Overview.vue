<notes>
    This view will serve as the default screen, showing all available cameras live feeds.
    It may or may not have any other ui such as the video-controls component.
</notes>
<template>
    <v-layout>
        <V-flex xs3>
            <video--controls :captures="captures"/>
        </V-flex>
        <v-flex xs9>
            <v-layout row wrap align-start fill-height>
                <v-flex
                    v-for="stream in streams"
                    :key="stream.id"
                    xs6
                    style="height: 50%;" >
                    <video--live-feed :stream="stream" v-on:capture="onCaptureTaken($event)"/>
                </v-flex>
            </v-layout>
        </v-flex>
    </v-layout>
</template>

<script>
import VideoControls from '@/components/video--live-feed--controls.vue';
import VideoLiveFeed from '@/components/video--live-feed.vue';

export default {
    components: {
        'video--live-feed': VideoLiveFeed,
        'video--controls': VideoControls,
    },
    data: () => ({
        captures: [],
        streams: [
            {
                id: 100,
                camNumber: 1,
                sourceData: {
                    src: "https://app.coverr.co/s3/mp4/Deserted%20Island.mp4",
                    type: "video/mp4"
                },
            },
            {
                id: 200,
                camNumber: 2,
                sourceData: {
                    src: "https://app.coverr.co/s3/mp4/Deserted%20Island.mp4",
                    type: "video/mp4"
                },
            },
            {
                id: 300,
                camNumber: 3,
                sourceData: {
                    src: "https://app.coverr.co/s3/mp4/Deserted%20Island.mp4",
                    type: "video/mp4"
                },
            },
            {
                id: 400,
                camNumber: 4,
                sourceData: {
                    src: "https://app.coverr.co/s3/mp4/Deserted%20Island.mp4",
                    type: "video/mp4"
                },
            },
        ]
    }),
    methods: {
        onCaptureTaken(event) {
            this.captures.push(event);
        }
    }
}
</script>
