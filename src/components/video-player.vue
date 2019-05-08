<template>
    <video ref="videoPlayer" class="video-js"></video>
</template>
<script>
import videojs from 'video.js';

export default {
    name: "VideoPlayer",
    props: {
        options: {
            type: Object,
            default() {
                return {};
            }
        }
    },
    data() {
        return {
            player: null
        }
    },
    mounted() {
        console.log("creating video player with:", this.options)
        if(this.options) {
            this.player = videojs(this.$refs.videoPlayer, this.options, function onPlayerReady() {
                console.log('onPlayerReady', this);
                this.play()
            })
        }
    },
    beforeDestroy() {
        if (this.player) {
            this.player.dispose()
        }
    }
}
</script>
<style >
.video-js {
    width: 100% !important;
    height: 100% !important;
}
.video-js > button.vjs-big-play-button {
    display: none;
}
</style>