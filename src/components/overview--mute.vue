<template>
  <v-layout column align-center justify-center>
    <template v-if="$alert.muteDuration">
      <p class="clock label mb-0">ALARMS MUTED FOR</p>
      <p class="clock timer mb-0">{{ formatDuration }}</p>
      <v-btn class="clock btn" @click="$alert.clearMuteDuration()" flat dark large>UNMUTE</v-btn>
    </template>
    <v-btn v-else @click="$refs.mute.open()" flat dark large>MUTE ALARM</v-btn>

    <app-dialog ref="mute" lazy>
      <template slot="modalcontent">
        <v-layout column align-center justify-center fill-height>
          <h1 class="header-text">SELECT HOW LONG YOU WOULD LIKE TO MUTE ALARMS</h1>
          <v-container fluid grid-list-xs>
            <v-layout row wrap align-center justify-center my-2>
              <v-btn
                @click="setMuteDuration(opt.val)"
                dark
                v-for="(opt) in muteOptions"
                :key="opt.val + 'mute'"
                mx-2
                my-2
                class="mute-card"
              >
                <v-layout column align-center justify-center fill-height>
                  <p class="mb-0 time">{{toHours(opt.val)}}</p>
                  <p class="mb-0 text">{{opt.text}}</p>
                </v-layout>
              </v-btn>
            </v-layout>
          </v-container>
        </v-layout>
      </template>
    </app-dialog>
  </v-layout>
</template>
<script>
import AppDialog from "./app-dialog";

export default {
  components: {
    "app-dialog": AppDialog
  },
  data: () => ({
    muteOptions: [
      { val: 15, text: "MINUTES" },
      { val: 30, text: "MINUTES" },
      { val: 60, text: "HOUR" },
      { val: 120, text: "HOURS" },
      { val: 180, text: "HOURS" }
    ],
    durationInterval: null,
    duration: null
  }),
  methods: {
    toHours(mins) {
      return mins >= 60 ? Math.floor(mins / 60) : mins;
    },
    setMuteDuration(dur) {
      console.log("TOTAL SECS", dur * 60);

      this.$alert.setMuteDuration(dur * 60);
      this.startCountdown();
      this.$refs.mute.close();
    },
    startCountdown() {
      // every minute, tick down and reset duration in vuex
      this.durationInterval = setInterval(() => {
        this.$alert.setMuteDuration(this.$alert.muteDuration - 1);

        if (this.$alert.muteDuration <= 0) {
          clearInterval(this.durationInterval);
          this.$alert.clearMuteDuration();
        }
      }, 1000);
    }
  },
  computed: {
    formatDuration() {
      let totalSeconds = this.$alert.muteDuration;
      let hours = Math.floor(totalSeconds / 3600);
      totalSeconds %= 3600;
      let minutes = Math.floor(totalSeconds / 60);
      let seconds = totalSeconds % 60;

      return `
      ${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}
      `;
    }
  }
};
</script>
<style lang="scss" scoped>
.v-btn {
  letter-spacing: 3.5px;
  border: 1px solid var(--v-border-base);
  background-color: var(--v-buttonBlack-base);
  color: #fff;
}
.header-text {
  color: #fff;
  font-family: "DIN Condensed";
  font-size: 3.5rem;
  text-align: center;
}
.mute-card {
  border: 1px solid var(--v-border-base);
  background-color: var(--v-buttonBlack-base);
  font-family: "DIN Condensed";
  max-width: 12%;
  min-width: 10rem;
  height: 10rem;
  color: #fff;
  .time {
    font-size: 4rem;
  }
  .text {
    font-size: 2rem;
    letter-spacing: 1.5px;
  }
}
.mute-card > p {
  color: #fff;
}
.clock {
  color: #fff;
  &.label {
    font-size: 16px;
  }
  &.timer {
    margin-top: -15px;
    font-size: 64px;
  }
  &.btn {
    margin-top: -10px;
  }
}
</style>