<notes>
    This view will serve as the default screen, showing all available cameras live feeds.
    Assumption is that any live streaming data and corresponding alerts will come in through here.
    The initial configuration of each stream is set here
</notes>
<template>
  <v-container grid-list-xl fill-height px-0 class="overview-container" v-test-ref="'container'">
    <v-layout column>
      <v-layout row wrap align-center>
        <v-flex xs6 v-for="stream in streams" :key="stream.id">
          <v-card class="card-container" flat>
            <video-live-feed :stream="stream" />
            <!-- <div id="playerElement" style="width:100%; height:0; padding:0 0 56.25% 0"></div> -->
            <v-card-title>
              <span
                class="cam-name"
                v-test-ref="'vid-title'"
              >{{ stream.camName.toUpperCase().replace(/-/, ' ') }}</span>
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
import VideoLiveFeed from "@/components/video--live-feed.vue";

import format from "date-fns/format";
import config from '../../config/production.js'

export default {
  components: {
    "video-live-feed": VideoLiveFeed
  },
  data: () => ({
    working: true,
    streams: [
      {
        id: 100,
        camNumber: 1,
        camName: "Rail-EAST",
        sourceData: {
          // These urls point to the file server, not the express api server, and are set in /config/production.js
          src: `http://${config.rtsp_host}:${config.port}${config.rtsp_url_one}480p.m3u8`,
          type: "application/x-mpegURL"
        },
        staticImage: "/assets/images/ref_raileast.jpg"
      },
      {
        id: 200,
        camNumber: 2,
        camName: "Rail-WEST",
        sourceData: {
          src: `http://${config.rtsp_host}:${config.port}${config.rtsp_url_two}480p.m3u8`,
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

