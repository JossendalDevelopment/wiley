<notes>
    the layout, everything but the video player, needs moving to video-player--control-bar
</notes>
<template>
<span>

    <!-- video overlay top -->
    <v-layout class="controls-top" align-start justify-end>
        <div class="zoom-button" @click="isZoomed = !isZoomed">
            <v-icon>fas fa-search-plus</v-icon>
            <p class="pl-2 mb-0 test-ref" style="font-size:16px; font-weight:800;">Zoom</p>
        </div>
    </v-layout>
    <!-- player -->
    <div class="player-wrapper">
        <video ref="videoPlayer" @click="togglePause()" class="video-js" :class="{zoom: isZoomed}"></video>
    </div>
    <!-- control bar -->
    <v-layout 
        v-if="$route.fullPath !== '/overview'" 
        class="controls-bottom" 
        align-center>
        <div class="back" @mousedown="backward()" @mouseleave="stop()" @mouseup="stop()">
            <v-icon>fas fa-step-backward</v-icon>
        </div>
        <v-flex class="slider pa-0 mx-0">
            <v-layout align-center>
                <div style="width:100%; margin-left:8px; margin-right:6px;">
                    <video-player--slider 
                        :duration="duration" 
                        :currentTime="currentTime"
                        v-on:sliderchange="handleSliderChange($event)"/>
                </div>
            </v-layout>
        </v-flex>
        <div class="forward" @mousedown="forward()" @mouseleave="stop()" @mouseup="stop()">
            <v-icon>fas fa-step-forward</v-icon>
        </div>
        <div class="review ml-0" @click="() => {}">
            <p class="px-2 mb-0 secondary--text">
                Review Playback
            </p>
        </div>
        <v-flex class="live" @click="() => {}">
            <div class="live-icon"></div>
            <p class="px-2 mb-0 secondary--text">
                Live Feed
            </p>
        </v-flex>
    </v-layout>
</span>
</template>
<script>
import VideoPlayerSlider from '@/components/video-player--slider.vue';

import videojs from 'video.js';

export default {
    name: "VideoPlayer",
    components: {
        'video-player--slider': VideoPlayerSlider,
    },
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
            player: null,
            duration: 0,
            currentTime: 0,
            interval: null,
            isZoomed: false,
        }
    },
    mounted() {
        if(this.options) {
            // nextTick is cheese around player mounting before source is loaded
            // TODO preload source or delay rendering until source loaded
            let self = this;
            this.$nextTick(() => {
                this.player = videojs(this.$refs.videoPlayer, this.options, function onPlayerReady() {
                    console.log('onPlayerReady', this);
                })
                this.player.on('timeupdate', () => {
                    // console.log('time update!', self.player.currentTime());
                    // run ~ every .25 seconds, causes choppy movement of slider handle
                    self.currentTime = self.player.currentTime();
                })
                this.player.on('loadedmetadata', () => {
                    console.log('metadata loaded')
                    // the video duration can be float decimal
                    // can cause mismatch between slider and actual video length
                    self.duration = Math.ceil(self.player.duration());
                }) 
            })
        }
    },
    beforeDestroy() {
        if (this.player) {
            this.player.dispose();
        }
    },
    methods: {
        handleSliderChange(event) {
            this.player.currentTime(event);
        },
        togglePause() {
            if (this.player.paused()) {
                this.player.play();
            } else {
                this.player.pause();
            }
        },
        backward() {
            if (this.currentTime >= 3) {
                this.currentTime = this.currentTime - 3;
                this.player.currentTime(this.currentTime);
            }
        },
        forward() {
            if(!this.interval) {
                this.interval = setInterval(() => {
                    if (this.currentTime >= this.duration - 1) {
                        this.stop();
                    } else {
                        this.currentTime = this.currentTime + 1;
                        this.player.currentTime(this.currentTime);
                    }
                }, 100)	
            }
        },
        stop(){
            clearInterval(this.interval);
            this.interval = null;
            console.log('stop')
        }
    }
}
</script>
<style lang="scss" scoped>
.player-wrapper {
    // height: auto;
    // width: auto;
    overflow: hidden;
}
video {
    outline: none !important;
    cursor: pointer;
}
.video-js {
    outline: none;
}
.zoom-button {
    display:flex; 
    align-items:center; 
    padding:10px; 
    cursor: pointer;
}
.zoom {
    transform: scale(0.1);
}
.video-js > button.vjs-big-play-button {
    display: none;
}
.controls-top {
    position: absolute;
    top: 0px;
    right: 20px;
    left: 0px;
    z-index: 20;
}
.controls-bottom {
    height: 42px;
    background-color:var(--v-primary-lighten1);
    border: 1px solid var(--v-secondary-base);
}
.slider {
    background-color: var(--v-secondary-base);
    height: 40px;
    width: 46%;
}
.live-icon {
    border: 1px solid;
    border-radius: 100%;
    height: 20px;
    width: 20px;
    background-color: red;
}
.live, .review {
    display: flex;
    align-items:center; 
    padding: 9px 5px;
    margin: 0 10px;
}
.review {
    background-color: var(--v-primary-base);
    color: var(--v-secondary-base);
    cursor: pointer;
}
.review > p {
    font-size: 1rem;
}
.forward, .back {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 5%;
    height: 40px;
    background-color: #FFF;
    cursor: pointer;
}
</style>
