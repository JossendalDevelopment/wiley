<notes>
    This view will serve as the default screen, showing all available cameras live feeds.
    Assumption is that any live streaming data and corresponding alerts will come in through here.
    The initial configuration of each stream is set here
</notes>
<template>
  <v-layout fill-height px-0 pt-1 mx-2 class="overview-container" v-test-ref="'container'">
    <v-layout column>
      <v-layout row align-center justify-space-between>
        <!-- <v-flex xs6 v-for="stream in streams" :key="stream.id"> -->
        <v-flex xs6 px-1>
          <v-card
            class="card-container"
            v-flash="$alert.showHeader"
            :class="$alert.showHeader && $alert.alertData.camera === 'east' ? 'alert-active' : null"
            flat
          >
            <overview-live-feed :stream="streams[0]" />
            <!-- <div id="cameraEast" style="width:100%; height:0; padding:0 0 75% 0"></div> -->
            <v-card-title>
              <v-layout justify-space-between align-center>
                <span class="cam-name" v-test-ref="'vid-title'">RAIL EAST</span>
                <router-link
                  to="null"
                  v-show="$alert.showHeader && $alert.alertData.camera === 'east'"
                  class="my-0 cam-link"
                  flat
                >VIEW</router-link>
              </v-layout>
            </v-card-title>
          </v-card>
        </v-flex>
        <v-flex xs6 px-1>
          <v-card
            class="card-container"
            :class="$alert.showHeader && $alert.alertData.camera === 'west' ? 'alert-active' : null"
            flat
          >
            <overview-live-feed :stream="streams[1]" />
            <!-- <div id="cameraWest" style="width:100%; height:0; padding:0 0 75% 0"></div> -->
            <v-card-title>
              <v-layout justify-space-between align-center>
                <span class="cam-name" v-test-ref="'vid-title'" @click="playSound()">RAIL WEST</span>
                <router-link
                  to="null"
                  v-show="$alert.showHeader && $alert.alertData.camera === 'west'"
                  class="my-0 cam-link"
                  flat
                >VIEW</router-link>
              </v-layout>
            </v-card-title>
          </v-card>
        </v-flex>
      </v-layout>
      <v-layout align-center justify-center>
        <overview-mute />
      </v-layout>
      <!-- <v-layout column align-end justify-end v-test-ref="'clock-container'">
        <p class="clock label">TIME</p>
        <p class="clock timer">{{ dateTime }}</p>
      </v-layout>-->
    </v-layout>
  </v-layout>
</template>

<script>
import OverviewLiveFeed from "@/components/overview--live-feed.vue";

// import format from "date-fns/format";
import config from "../../config/production.js";
import OverviewMute from "../components/overview--mute";

export default {
  components: {
    "overview-live-feed": OverviewLiveFeed,
    "overview-mute": OverviewMute
  },
  data: () => ({
    working: true,
    eastCamStream: null,
    westCamStream: null,
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
    ]
    // dateTime: null,
    // timer: null
  }),
  created() {
    // this.startTime();
  },
  mounted() {
    // this.eastCamStream === null
    //   ? // eslint-disable-next-line
    //     (this.eastCamStream = WowzaPlayer.create("cameraEast", {
    //       license: process.env.VUE_APP_WOWZA_LICENSE,
    //       title: "",
    //       description: "",
    //       sourceURL:
    //         "http%3A%2F%2F0.0.0.0%3A1935%2FWiley%2FBahay.stream%2Fplaylist.m3u8",
    //       autoPlay: true,
    //       volume: "0",
    //       mute: true,
    //       loop: false,
    //       audioOnly: false,
    //       uiShowQuickRewind: true,
    //       uiQuickRewindSeconds: "30",
    //       uiShowPlaybackControls: false
    //     }))
    //   : null;
    // this.westCamStream === null
    //   ? // eslint-disable-next-line
    //     (this.westCamStream = WowzaPlayer.create("cameraWest", {
    //       license: process.env.VUE_APP_WOWZA_LICENSE,
    //       title: "",
    //       description: "",
    //       sourceURL:
    //         "http%3A%2F%2F0.0.0.0%3A1935%2FWiley%2FBahay.stream%2Fplaylist.m3u8",
    //       autoPlay: true,
    //       volume: "0",
    //       mute: true,
    //       loop: false,
    //       audioOnly: false,
    //       uiShowQuickRewind: true,
    //       uiQuickRewindSeconds: "30"
    //     }))
    //   : null;
  },
  beforeRouteLeave(to, from, next) {
    // called when the route that renders this component is about to
    // be navigated away from.
    // has access to `this` component instance.
    // Needed because the page with changing before wowza players could be properly destroyed
    this.stopPlayers().then(() => {
      next();
    });
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  methods: {
    // startTime() {
    //   this.dateTime = format(new Date(), "hh:mm:ss");
    //   this.timer = setTimeout(this.startTime, 1000);
    // },
    stopPlayers() {
      return new Promise(resolve => {
        this.eastCamStream !== null ? this.eastCamStream.destroy() : null;
        this.westCamStream !== null ? this.westCamStream.destroy() : null;
        resolve();
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.overview-container {
  background-color: var(--v-secondaryDark2-base);
  letter-spacing: 2.5px;
  font-family: "DIN Condensed";
  justify-content: center;
}
.card-container {
  background-color: var(--v-secondaryDark2-base);
  color: #fff;
  width: 100%;
}
.cam {
  &-name {
    font-size: 24px;
  }
  &-link {
    font-size: 24px;
    text-decoration: none;
  }
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
.alert-active {
  border: 1px solid var(--v-accent-base);
  background-color: var(--v-accent-base);
}
</style>

