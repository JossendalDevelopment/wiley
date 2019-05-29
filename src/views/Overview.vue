<notes>
    This view will serve as the default screen, showing all available cameras live feeds.
    Assumption is that any live streaming data and corresponding alerts will come in through here.
</notes>
<template>
    <v-container grid-list-xl fill-height class="overview-container">
        <v-layout column>
            <v-layout row wrap align-start>
                <v-flex
                    v-for="stream in streams"
                    :key="stream.id"
                    xs6
                    >
                    <v-card class="card-container" flat>
                        <video-live-feed :stream="stream" />
                        <v-card-title>
                            <span class="title mr-auto">{{ stream.camName.toUpperCase() }}</span>
                        </v-card-title>
                    </v-card>
                </v-flex>
            </v-layout>
            <v-layout align-end>
                <v-flex xs12>
                    <v-layout justify-space-between>
                        <v-flex>
                            <p class="white--text">Total active alerts</p>
                        </v-flex>
                        <v-flex>
                            <v-layout justify-end>
                                <p class="app-timer">{{ dateTime }}</p>
                            </v-layout>
                        </v-flex>
                    </v-layout>
                </v-flex>
            </v-layout>
        </v-layout>
    </v-container>
</template>

<script>
import VideoLiveFeed from '@/components/video--live-feed.vue';

import format from 'date-fns/format';

import CameraFeedsJson from '@/cameraFeeds.json';

export default {
    components: {
        'video-live-feed': VideoLiveFeed,
    },
    data: () => ({
        streams: CameraFeedsJson,
        dateTime: null,
        timer: null
    }),
    created() {
        this.startTime();
    },
    destroyed() {
        clearInterval(this.timer);
    },
    methods: {
        startTime() {
            this.dateTime = format(new Date(), 'hh:mm;ss');
            this.timer = setTimeout(this.startTime, 1000);
        },
    },
};
</script>
<style lang="scss" scoped>
.overview-container {
    background-color: var(--v-secondaryDark-base);
}
.card-container {
    background-color: var(--v-secondaryDark-base);
    color: #FFF;
}
.app-timer {
    color: #FFF;
    font-family: 'Montserrat';
    font-size: 64px;
    margin-right: 20px;
}
</style>

