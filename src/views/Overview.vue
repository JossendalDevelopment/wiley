<notes>
    This view will serve as the default screen, showing all available cameras live feeds.
    Assumption is that any live streaming data and corresponding alerts will come in through here.
    The initial configuration of each stream is set here
</notes>
<template>
  <v-container grid-list-xl fill-height px-0 class="overview-container" v-test-ref="'container'">
    <v-layout column>
      <v-layout row align-center>
        <!-- <v-flex xs6 v-for="stream in streams" :key="stream.id"> -->
        <v-flex xs6>
          <v-card class="card-container" flat>
            <!-- <video-live-feed :stream="stream" /> -->
            <div id="cameraEast" style="width:100%; height:0; padding:0 0 75% 0"></div>
            <v-card-title>
              <span class="cam-name" v-test-ref="'vid-title'">
                <!-- {{ stream.camName.toUpperCase().replace(/-/, ' ') }} -->
                RAIL EAST
              </span>
            </v-card-title>
          </v-card>
        </v-flex>
        <v-flex xs6>
          <v-card class="card-container" flat>
            <!-- <video-live-feed :stream="stream" /> -->
            <div id="cameraWest" style="width:100%; height:0; padding:0 0 75% 0"></div>
            <v-card-title>
              <span class="cam-name" v-test-ref="'vid-title'">
                <!-- {{ stream.camName.toUpperCase().replace(/-/, ' ') }} -->
                RAIL WEST
              </span>
            </v-card-title>
          </v-card>
        </v-flex>
      </v-layout>
      <v-layout column align-end justify-end v-test-ref="'clock-container'">
        <p class="clock label">TIME</p>
        <p class="clock timer">{{ dateTime }}</p>
      </v-layout>
    </v-layout>
  </v-container>
</template>

<script>
// import VideoLiveFeed from "@/components/video--live-feed.vue";

import format from "date-fns/format";
import config from "../../config/production.js";

export default {
  components: {
    // "video-live-feed": VideoLiveFeed
  },
  data: () => ({
    working: true,
    streams: [
      {
        camNumber: 1,
        camName: "Rail-EAST",
        sourceData: {
          // These urls point to the file server, not the express api server, and are set in /config/production.js
          src: config.stream_data_one,
          type: "application/x-mpegURL"
        },
        staticImage: "/assets/images/ref_raileast.jpg"
      },
      {
        camNumber: 2,
        camName: "Rail-WEST",
        sourceData: {
          src: config.stream_data_two,
          type: "application/x-mpegURL"
        },
        staticImage: "/assets/images/ref_raileast.jpg"
      }
    ],
    dateTime: null,
    timer: null
  }),
  created() {
    this.startTime();
  },
  mounted() {
    // eslint-disable-next-line
    WowzaPlayer.create("cameraEast", {
      license: process.env.VUE_APP_WOWZA_LICENSE,
      title: "",
      description: "",
      sourceURL:
        "http%3A%2F%2F0.0.0.0%3A1935%2FWiley%2FBahay.stream%2Fplaylist.m3u8",
      autoPlay: true,
      volume: "75",
      mute: true,
      loop: false,
      audioOnly: false,
      uiShowQuickRewind: true,
      uiQuickRewindSeconds: "30"
    });

    // eslint-disable-next-line
    WowzaPlayer.create("cameraWest", {
      license: process.env.VUE_APP_WOWZA_LICENSE,
      title: "",
      description: "",
      sourceURL:
        "http%3A%2F%2F0.0.0.0%3A1935%2FWiley%2FBahay.stream%2Fplaylist.m3u8",
      autoPlay: true,
      volume: "75",
      mute: true,
      loop: false,
      audioOnly: false,
      uiShowQuickRewind: true,
      uiQuickRewindSeconds: "30"
    });
  },
  destroyed() {
    clearInterval(this.timer);
  },
  methods: {
    startTime() {
      this.dateTime = format(new Date(), "hh:mm:ss");
      this.timer = setTimeout(this.startTime, 1000);
    }
  }
};
</script>
<style lang="scss" scoped>
.overview-container {
  background-color: var(--v-secondaryDark2-base);
  letter-spacing: 2.5px;
  font-family: "DIN Condensed";
}
.card-container {
  background-color: var(--v-secondaryDark2-base);
  color: #fff;
}
.cam-name {
  font-size: 24px;
}
.clock {
  color: #fff;
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

