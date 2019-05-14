<notes>
    This view will serve as the default screen, showing all available cameras live feeds.
    Assumption is that any live streaming data and corresponding alerts will come in through here.
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
                <video-history :stream="stream" :events="parseEvents(stream)"/>
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
    mounted() {
        this.$notifySuccess("Sweet success");
    },
    data: () => ({
        captures: [],
        streams: CameraFeedsJson,
        events: [
            // simulating a number of 'alert events'
            {
                camId: 100,
                id: '01',
                startTime: 159,
                endTime: 6.0,
                duration: 24,
                status: 'active'
            },
            {
                camId: 200,
                id: '02',
                startTime: 237,
                endTime: 9.0,
                duration: 37,
                status: 'closed'
            },
            {
                camId: 100,
                id: '03',
                startTime: 262,
                endTime: 16.0,
                duration: 23,
                status: 'closed'
            },
            {
                camId: 200,
                id: '04',
                startTime: 305,
                endTime: 3.7,
                duration: 67,
                status: 'closed'
            },
            {
                camId: 100,
                id: '05',
                startTime: 356,
                endTime: 16.0,
                duration: 49,
                status: 'closed'
            },
            {
                camId: 200,
                id: '06',
                startTime: 375,
                endTime: 0.0,
                duration: 94,
                status: 'pending'
            },
            {
                camId: 100,
                id: '07',
                startTime: 392,
                endTime: 0.2,
                duration: 98,
                status: 'active'
            },
            {
                camId: 200,
                id: '08',
                startTime: 408,
                endTime: 3.2,
                duration: 87,
                status: 'pending'
            },
            {
                camId: 100,
                id: '09',
                startTime: 452,
                endTime: 25.0,
                duration: 51,
                status: 'closed'
            },
            {
                camId: 200,
                id: '10',
                startTime: 518,
                endTime: 26.0,
                duration: 65,
                status: 'closed'
            },
            {
                camId: 100,
                id: '11',
                startTime: 452,
                endTime: 25.0,
                duration: 51,
                status: 'closed'
            },
            {
                camId: 200,
                id: '12',
                startTime: 518,
                endTime: 26.0,
                duration: 65,
                status: 'closed'
            },
            {
                camId: 100,
                id: '13',
                startTime: 452,
                endTime: 25.0,
                duration: 51,
                status: 'closed'
            },
            {
                camId: 200,
                id: '14',
                startTime: 518,
                endTime: 26.0,
                duration: 65,
                status: 'closed'
            }
        ]
    }),
    methods: {
        parseEvents(stream) {
            // cheese way to split events off to their respective cameras
            return this.events.filter((e) => {
                return e.camId == stream.id
            })
        }
    }
}
</script>
