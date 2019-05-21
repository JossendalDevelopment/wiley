<notes>
    This view will serve as the default screen, showing all available cameras live feeds.
    Assumption is that any live streaming data and corresponding alerts will come in through here.
</notes>
<template>
    <v-container grid-list-md fill-height>
        <v-layout row wrap align-start>
            <v-flex
                v-for="stream in streams"
                :key="stream.id"
                xs6
                >
                <v-card>
                    <v-card-title>
                        <span class="title mx-auto">{{ stream.camName }}</span>
                    </v-card-title>
                    <video-live-feed :stream="stream" />
                    <overview--history :stream="stream" :events="parseEvents(stream)"/>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import VideoLiveFeed from '@/components/video--live-feed.vue';
import VideoHistory from '@/components/overview--history.vue';

import CameraFeedsJson from '@/cameraFeeds.json';
import EventsJson from '@/dummyEvents.json';

export default {
    components: {
        'video-live-feed': VideoLiveFeed,
        'overview--history': VideoHistory,
    },
    data: () => ({
        captures: [],
        streams: CameraFeedsJson,
        events: EventsJson,
    }),
    methods: {
        parseEvents(stream) {
            // cheese way to split dummy events off to their respective cameras
            return this.events.events.filter((e) => {
                return e.camId == stream.id;
            });
        },
    },
};
</script>
