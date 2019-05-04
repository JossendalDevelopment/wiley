<template>
    <v-layout>
        <V-flex xs3>
            <video--controls />
        </V-flex>
        <v-flex xs9>
            <video--live-feed :camNumber="camNumber" v-on:capture="onCaptureTaken($event)"/>
        </v-flex>
    </v-layout>
</template>
<script>
import VideoControls from '@/components/video--live-feed--controls.vue';
import VideoLiveFeed from '@/components/video--live-feed';

export default {
    components: {
        'video--live-feed': VideoLiveFeed,
        'video--controls': VideoControls,
    },
    data: () => ({
        camNumber: null
    }),
    mounted() {
        this.camNumber = this.$route.params.id;
    },
    methods: {
        onCaptureTaken(event) {
            console.log(event)
        }
    }
}
</script>