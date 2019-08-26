<notes>
    This component contains the large header alert for showing camera events as well as global
    notifications for general user feedback alerts, accessible globally by:
    $notifyError(<message>)
    $notifySuccess(<message>)
    $notifyInfo(<message>)
    $notifyWarn(<message>)
</notes>
<template>
  <div id="app" style="position: relative">
    <!-- Page header alert -->
    <v-alert
      v-if="!$alert.muteDuration"
      :value="$alert.showHeader"
      v-flash="$alert.showHeader"
      transition="slide-y-transition"
      style="margin-top: 0px; position: absolute; top:0; left: 0; right: 0; height: 58px; z-index: 200; background-color: 'red'"
      @click="$router.push('/events')"
    >
      <v-layout align-center justify-center style="position:relative;">
        <span class="text-xs-center mb-0 mr-2 alert-text">{{ formatAlertText }}</span>
        <img 
            v-if="$alert.alertData" 
            :src="`/assets/images/icon-alert-${$alert.alertData.inferenced_classification}.svg`" />
        <v-btn
          @click="$alert.hideAlertHeader()"
          dark
          flat
          small
          class="clear-alert-btn"
        >TURN OFF ALARM</v-btn>
      </v-layout>
    </v-alert>

    <v-app id="inspire">
      <app-header />

      <v-content app class="app-container">
        <v-container fluid fill-height pa-0>
          <router-view></router-view>
        </v-container>
      </v-content>

      <!-- global notifications logic -->
      <notifications
        group="classification-notifications"
        :max="1"
        :speed="300"
        :width="250"
        :duration="300"
        animation-type="velocity"
        style="top:20%;"
        :animation="animation"
        position="center center"
      >
        <div slot="body" slot-scope="props">
          <div
            style="display:flex; font-family:'DIN Condensed'; font-size:30px; background-color: #F2F2F2; color:black; padding:20px; letter-spacing:2.5px;"
          >
            <p class="mb-0 mx-auto">{{ props.item.text }}</p>
          </div>
        </div>
      </notifications>
      <notifications
        group="app-notifications"
        :max="1"
        :duration="3000"
        style="bottom:5%; right:5%;"
        position="right bottom"
      >
        <div slot="body" slot-scope="props">
          <v-alert
            v-model="alert"
            :color="props.item.type"
            style="font-family:'DIN Condensed'; font-size:18px; letter-spacing:2px;"
          >{{ props.item.text }}</v-alert>
        </div>
      </notifications>
    </v-app>
  </div>
</template>
<script>
import config from "../config/production.js";
import io from "socket.io-client";
import AppHeader from "@/components/app-header.vue";

export default {
  name: "App",
  components: {
    "app-header": AppHeader
  },
  mounted() {
    this.socket.on("TRIGGER_ALARM", data => {
      this.$alert.createAlert(data);
      if (this.$alert.muteDuration === null) {
        this.playSound();
      }
    });
  },
  methods: {
    playSound() {
      const audio = new Audio(require('./assets/sound/alarm.mp3'));
      audio.play();
    }
  },
  data: () => ({
    socket: io(config.socket_io_addr),
    alert: true,
    tab: null,
    animation: {
      enter() {
        /*
         *  This is the animation for the red classification box
         *  "element" can be passed in to enter() - as a notification element
         *    (before animation, meaning that you can take it's initial height, width, color, etc)
         */
        // let height = element.clientHeight

        return {
          // Animates from 0px to "height"
          // height: [height, 0],
          translateY: [0, 220],

          // Animates from 0 to 1 opacity
          opacity: [1, 0]
        };
      },
      leave: {
        // Animates height, opacity, and y-position upwards
        translateY: -30,
        height: 0,
        opacity: 0
      }
    }
  }),
  computed: {
    formatAlertText() {
      let alert = this.$alert.alertData;
      return alert && `${alert.inferenced_classification.toUpperCase()}`;
    }
  }
};
</script>
<style lang="scss" scoped>
#app > div.v-alert.error > a > i {
  /* overrides alert header bars' cancel icon color to white */
  color: #fff;
}

.v-btn--active {
  /* header button overrides */
  background-color: #fff !important;
}
.app-container {
  background-color: var(--v-secondaryDark-base);
}
.clear-alert-btn {
  position: absolute;
  top: 2px;
  right: 8px;
  background-color: var(--v-accent-base);
  border: 1px solid #fff;
}

.alert-text {
  font-family: "Din Condensed";
  font-size: 30px;
  letter-spacing: 2.5px;
}

@keyframes blink {
  from {
    background-color: var(--v-accent-base);
    color: #fff;
  }
  to {
    background-color: #fff;
    color: var(--v-accent-base);
  }
}
</style>
