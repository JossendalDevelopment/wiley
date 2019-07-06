<notes>
    This component contains the large header alert for showing camera events as well as global
    notifications for general user feedback alerts, accessible globally by:
    $notifyError(<message>)
    $notifySuccess(<message>)
    $notifyInfo(<message>)
    $notifyWarn(<message>)

    Also all the 'simulated alert' logic is being handled here deferred until sprint 2.

    TODO redo the badge in css only, the numerals aren't centering properly with v-badge and are being cheesed a bit
</notes>
<template>
  <div id="app">
    <!-- Page header alert -->
    <v-alert
      :value="$cameraAlert.showHeader"
      color="error"
      light
      transition="slide-y-transition"
      dismissible
      style="margin-top:0px; margin-bottom:0px; padding-right:2rem;"
    >
      <v-layout align-center justify-center>
        <span
          style="cursor: pointer;"
          @click="goToAlertDetails()"
          class="text-xs-center mb-0 headline"
        >{{ formatAlertText }}</span>
        <a
          class="ml-3"
          style="text-decoration:underline; cursor:pointer;"
        >Snooze alerts for 1 minute?</a>
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
            style="display:flex; font-family:'DIN Condensed'; font-size:30px; background-color:red; color:#FFF; padding:20px; letter-spacing:2.5px;"
          >
            <p class="mb-0 mx-auto">{{ props.item.text }}</p>
          </div>
        </div>
      </notifications>
      <notifications
        group="app-notifications"
        :max="1"
        :duration="2000"
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
import AppHeader from "@/components/app-header.vue";

export default {
  name: "App",
  components: {
    "app-header": AppHeader
  },
  data: () => ({
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
      let alert = this.$cameraAlert.alertData;
      return `1 ${alert.detectedObject} identified in ${alert.camName}`;
    },
    unclassifiedEventCount() {
      return this.$events.events.reduce((prev, next) => {
        if (!next.classified) {
          prev++;
        }
        return prev;
      }, 0);
    }
  }
};
</script>
<style lang="scss">
#app > div.v-alert.error > a > i {
  /* overrides alert header bars' cancel icon color to white */
  color: white;
}

.v-btn--active {
  /* header button overrides */
  background-color: #fff !important;
  //   color: black !important;
}
.app-container {
  background-color: var(--v-secondaryDark-base);
}
</style>
