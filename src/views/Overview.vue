<notes>
    This view will serve as the default screen, showing all available cameras live feeds.
    Assumption is that any live streaming data and corresponding alerts will come in through here.
    Needs cleanup/layout-restructure after removal of history components
</notes>
<template>
  <v-container grid-list-xl fill-height px-0 class="overview-container">
    <v-layout column>
      <v-layout row wrap align-center>
        <v-flex xs6 v-for="n of 2" :key="n + 'live-feed'">
          <v-card class="card-container" flat>
            <video-live-feed v-if="!working" :stream="stream"/>
            <v-card-title>
              <span class="cam-name">{{ stream.camName.toUpperCase().replace(/-/, ' ') }}</span>
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
import VideoLiveFeed from "@/components/video--live-feed.vue";

import format from "date-fns/format";

import CameraFeedsJson from "@/cameraFeeds.json";

export default {
  components: {
    "video-live-feed": VideoLiveFeed
  },
  data: () => ({
    working: true,
    streams: CameraFeedsJson,
    stream: {
      id: 100,
      camNumber: 1,
      camName: "Rail-EAST",
      sourceData: {
        src: "http://localhost:3001/live/streams/480p.m3u8",
        type: "application/x-mpegURL"
      },
      staticImage: "/assets/images/ref_raileast.jpg"
    },
    dateTime: null,
    timer: null
  }),
  created() {
    this.startTime();
  },
  mounted() {
    this.$stream
      .startStream()
      .then(resp => {
        console.log("Start stream resp", resp);
        // this.stream.sourceData.src = resp.data;
        this.working = false;
      })
      .catch(err => {
        console.error("ERROR", err);
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

