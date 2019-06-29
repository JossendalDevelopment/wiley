<notes>
    This view will serve as the default screen, showing all available cameras live feeds.
    Assumption is that any live streaming data and corresponding alerts will come in through here.
    The initial configuration of each stream is set here
    TODO: determine the location of the final file server where each stream will pull it's source file. 
    localhost wont cut it in production
</notes>
<template>
  <v-container grid-list-xl fill-height px-0 class="overview-container">
    <v-layout column>
      <v-layout row wrap align-center>
        <v-flex xs6 v-for="stream in streams" :key="stream.id">
          <v-card class="card-container" flat>
            <video-live-feed :stream="stream"/>
            <!-- <canvas id="video-canvas"></canvas> -->
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

// import CameraFeedsJson from "@/cameraFeeds.json";

export default {
  components: {
    "video-live-feed": VideoLiveFeed
  },
  data: () => ({
    working: true,
    // streams: CameraFeedsJson,
    streams: [
      {
        id: 100,
        camNumber: 1,
        camName: "Rail-EAST",
        sourceData: {
          // These urls point to the file server, not the express api server
          src: "http://localhost:3000/live/streams/one/480p.m3u8",
          //   src: "http://file_server.localhost:8080/live/streams/one/480.m3u8",
          type: "application/x-mpegURL"
        },
        staticImage: "/assets/images/ref_raileast.jpg"
      },
      {
        id: 200,
        camNumber: 2,
        camName: "Rail-WEST",
        sourceData: {
          src: "http://localhost:3000/live/streams/two/480p.m3u8",
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

