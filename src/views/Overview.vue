<notes>
    This view will serve as the default screen, showing all available cameras live feeds
</notes>
<template>
    <v-layout>
        <V-flex xs3>
            <video--controls :captures="captures"/>
        </V-flex>
        <v-flex xs9>
            <v-layout row wrap align-start>
                <v-flex
                    v-for="n in 2"
                    :key="n"
                    xs6
                >
                    <video--live-feed :camNumber="n" v-on:capture="onCaptureTaken($event)"/>
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
        captures: []
    }),
    methods: {
        onCaptureTaken(event) {
            this.captures.push(event);
        }
    }
}
</script>
