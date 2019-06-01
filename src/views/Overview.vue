<notes>
    This view will serve as the default screen, showing all available cameras live feeds.
    Assumption is that any live streaming data and corresponding alerts will come in through here.
    Needs cleanup/layout-restructure after removal of history components
</notes>
<template>
    <v-container grid-list-xl fill-height class="overview-container">
        <v-layout column>
            <v-layout row wrap align-center>
                <v-flex
                    v-for="stream in streams"
                    :key="stream.id"
                    xs6
                    >
                    <v-card class="card-container" flat>
                        <video-live-feed :stream="stream" />
                        <v-card-title>
                            <span class="cam-name">{{ stream.camName.toUpperCase() }}</span>
                        </v-card-title>
                    </v-card>
                </v-flex>
            </v-layout>
            <v-layout column align-end justify-end>
                <p class="clock label">TIME</p>
                <p class="clock timer">{{ dateTime }}</p>
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
            this.dateTime = format(new Date(), 'hh:mm:ss');
            this.timer = setTimeout(this.startTime, 1000);
        },
    },
};
</script>
<style lang="scss" scoped>
.overview-container {
    background-color: var(--v-secondaryDark2-base);
    letter-spacing: 2.5px;
    font-family: 'DIN Condensed';
}
.card-container {
    background-color: var(--v-secondaryDark2-base);
    color: #FFF;
}
.cam-name {
    font-size: 24px;
}
.clock {
    color: #FFF;
    margin-right: 20px;
    &.label {
        font-size: 28px;
        margin-bottom: -20px;
    }
    &.timer {
        font-size: 64px;
    }
}
</style>

