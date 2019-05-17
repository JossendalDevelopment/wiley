<template>
    <span>
        <v-img :src="getPath()" />
        <v-layout class="controls" align-center>
            <!-- Custom video controls UI -->
            <v-flex grow class="slider">
                <p class="px-2 mb-0 secondary--text">
                    Slider
                </p>
            </v-flex>
            <v-flex shrink class="review">
                <p class="px-2 mb-0 secondary--text">
                    Review Playback
                </p>
            </v-flex>
            <v-flex shrink class="live">
                <div class="live-icon"></div>
                <p class="px-2 mb-0 secondary--text">
                    Live Feed
                </p>
            </v-flex>
        </v-layout>
    </span>
</template>
<script>
export default {
    props: {
        source: {
            type: String,
            required: false,
            default: ''
        }
    },
    methods: {
        getPath() {
            return this.source
        }
    },
}
</script>
<style scoped>
.controls {
    background-color: var(--v-primary-base);
    border: 1px solid var(--v-secondary-base);
    /* position: absolute;
    bottom: -48px;
    right: 0px;
    left: 0px; */
}
.live-icon {
    border: 1px solid;
    border-radius: 100%;
    height: 20px;
    width: 20px;
    background-color: red;
}
.slider {
    background-color: var(--v-secondary-base);
    height: 41px;
}
.live, .review {
    display: flex;
    align-items:center; 
    padding:5px;
    margin: 5px 10px;
}
.review {
    background-color: var(--v-primary-darken2);
}
</style>

