<notes>
    everything but the video player, needs abstracting to video-player--control-bar componnent
</notes>
<template>
  <div class="player-wrapper">
    <video ref="videoPlayer" class="video-js vjs-4-3" :class="{zoom: isZoomed}"></video>
  </div>
</template>
<script>
import videojs from "video.js";

export default {
  name: "VideoPlayer",
  props: {
    options: {
      type: Object,
      default() {
        return {};
      }
    },
    fallbackImageUrl: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      player: null,
      duration: 0,
      currentTime: 0,
      interval: null,
      isZoomed: false
    };
  },
  mounted() {
    if (this.options) {
      // nextTick is cheese around player mounting before source is loaded
      // TODO preload source or delay rendering until source loaded
      let self = this;
      this.$nextTick(() => {
        this.player = videojs(
          this.$refs.videoPlayer,
          this.options,
          function onPlayerReady() {
            console.log("onPlayerReady", this);
          }
        );
        // this.player.on("timeupdate", () => {
        // console.log('time update!', self.player.currentTime());
        // run ~ every .25 seconds, causes choppy movement of slider handle
        //   self.currentTime = self.player.currentTime();
        // });
        // this.player.on("loadedmetadata", () => {
        //   console.log("metadata loaded");
        // the video duration can be float decimal
        // can cause mismatch between slider and actual video length
        //   self.duration = Math.ceil(self.player.duration());
        // });
        this.player.on("error", e => {
          this.player.poster(this.fallbackImageUrl);
          console.log("ERROR LOADING VIDEO", this.player.error());
        });
      });
    }
  },
  beforeDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  },
  methods: {
    zoomIn() {
      this.player.zoomrotate({
        zoom: 2,
        rotate: 0
      });
    },
    zoomOut() {
      this.player.zoomrotate({
        zoom: 0,
        rotate: 0
      });
    }
  }
};
</script>
<style lang="scss">
.player-wrapper {
  overflow: hidden;
  width: 100%;
  position: relative;
}
video {
  outline: none !important;
}
.video-js {
  outline: none;
  //   height: 100% !important;
  //   width: 100% !important;
  //   position: absolute;
  //   top: 0;
  //   left: 0;
}
.video-js-responsive-container.vjs-sd {
  padding-top: 75%;
}
.zoom-button {
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
}
.zoom {
  transform: scale(2);
}
.video-js > button.vjs-big-play-button {
  display: none;
}
</style>
