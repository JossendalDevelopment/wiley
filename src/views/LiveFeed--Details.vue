<template>
        <v-layout class="test-ref">
            <V-flex xs3>
                <video--controls />
            </V-flex>
            <v-flex xs9>
                <v-layout column align-center>
                    <p style="margin-left:auto;">{{ parseTime }}</p>
                    <video--live-feed :camNumber="camNumber" v-on:capture="onCaptureTaken($event)"/>
                    <v-layout justify-center>
                        <v-btn large class="error btn">
                            False Alarm 
                        </v-btn>
                        <v-btn large class="success btn">
                            Confirm
                        </v-btn>
                    </v-layout>
                </v-layout>
            </v-flex>
        </v-layout>
</template>
<script>
import VideoControls from '@/components/video--live-feed--controls.vue';
import VideoLiveFeed from '@/components/video--live-feed';

import format from 'date-fns/format';

export default {
    components: {
        'video--live-feed': VideoLiveFeed,
        'video--controls': VideoControls,
    },
    data: () => ({
        camNumber: null
    }),
    mounted() {
        this.camNumber = +this.$route.params.id;
    },
    methods: {
        onCaptureTaken(event) {
            console.log(event)
        }
    },
    computed: {
        parseTime() {
            return format(new Date(), 'MM/DD/YYYY hh:mm:ss')
        }
    }
}
</script>
<style scoped>
.btn {
    width: 100%;
}
</style>
