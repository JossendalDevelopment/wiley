<notes>
This component handles all the heavy lifting for classifying an event. Will need abstraction as it's
getting unweildy.
</notes>
<template>
  <v-container v-if="$events.loading" fill-height fluid pa-0 ml-0 mr-0>
    <app-loading-spinner />
  </v-container>
  <v-layout
    justify-center
    fill-height
    align-center
    v-else-if="!eventsRemaining"
    class="events-container"
    v-test-ref="'container'"
  >
    <span
      v-test-ref="'empty-content'"
      style="color:white; font-family: DIN Condensed; font-size: 30px; letter-spacing2px;"
    >THERE ARE NO UNCLASSIFIED EVENTS</span>
  </v-layout>
  <v-container v-else fluid fill-height pa-0 pt-2 ma-0 class="events-container">
    <v-layout align-start>
      <!-- left hand list section -->
      <v-flex xs4 pl-3 pr-0>
        <span style="color: #FFF; font-size: 24px;">EVENTS {{ this.totalEventsCount || 0 }}</span>
        <v-flex class="list-container" @scroll="onScroll">
          <events--active-list-item
            v-for="(e, idx) in events"
            v-on:selected="setCurrentEvent($event)"
            :event="e"
            :key="e.id + 'idx' + idx"
            :selected="currentEvent.id"
          />
        </v-flex>
      </v-flex>
      <!-- video/image section -->
      <v-flex xs8 style="position: relative; padding: 0px 65px 0;">
        <v-btn
          style="position:absolute; top:0; right:64px; z-index: 2020;"
          dark
          small
          @click="videoShowing = !videoShowing"
        >{{ videoShowing ? 'SHOW IMAGE' : 'PLAY VIDEO' }}</v-btn>

        <details--camera-image
          v-if="!videoShowing"
          ref="cameraImage"
          :source="currentEvent"
          v-on:showvideo="showVideo"
        />
        <!-- v-on:datauricreated="setThumb($event)" -->
        <div v-else style="margin-bottom: 6px;">
          <video-player :fallbackImageUrl="createFallbackImageUrl" :options="getVideoOptions()" />
        </div>

        <!-- below video -->
        <v-layout column align-center justify-center>
          <v-flex class="text--center white--text">
            <p
              style="font-family: Montserrat; font-size:14px; font-weight:700;"
            >SELECT OR USE YOUR KEYBOARD</p>
          </v-flex>
          <v-layout wrap justify-space-between v-test-ref="'bottom-buttons-container'">
            <events--class-button
              v-for="(el, idx) in buttonTypes"
              :type="el"
              :key="el.type + idx"
              v-on:classification="setClassification($event)"
              :index="idx"
              :disabled="false"
            />
          </v-layout>
        </v-layout>
      </v-flex>
    </v-layout>
    <!-- modals -->
    <app-dialog
      ref="falsealarm"
      max-width="500"
      lazy
      v-on:closed="addListeners()"
      v-on:opened="focusTextarea()"
    >
      <template slot="modaltitle">CONFIRM FALSE ALARM?</template>
      <template slot="modalcontent">
        <v-textarea
          dark
          background-color="transparent"
          ref="falsealarmtextarea"
          rows="6"
          auto-grow
          class="textarea"
          @keydown.enter.exact.prevent
          @keyup.enter.exact="setFalseAlarmClassification('false-alarm')"
          @keydown.enter.shift.exact="newline"
          placeholder="Please leave a reason for registering this event as a false alarm"
          v-model="classification_description"
        />
      </template>
      <v-btn
        slot="detailsButton"
        dark
        style="background-color:#FFF; color:black;"
        :disabled="false"
        @click="setFalseAlarmClassification('false-alarm')"
      >Confirm</v-btn>
    </app-dialog>
  </v-container>
</template>
<script>
import DetailsCameraImage from "@/components/details--camera-image";
import AppLoadingSpinner from "@/components/app-loading-spinner.vue";
import EventsClassButton from "@/components/events--class-button.vue";
import ActiveListItem from "@/components/events--active-list-item.vue";
import VideoPlayer from "@/components/video-player.vue";
import Dialog from "@/components/app-dialog.vue";

import config from "../../config/production.js";
import Alert from "@/types/Alert.js";
import io from "socket.io-client";

export default {
  components: {
    "details--camera-image": DetailsCameraImage,
    "events--class-button": EventsClassButton,
    "app-loading-spinner": AppLoadingSpinner,
    "events--active-list-item": ActiveListItem,
    "video-player": VideoPlayer,
    "app-dialog": Dialog
  },
  data: () => ({
    events: [],
    totalEventsCount: null,
    pageCount: 0,
    queryLimit: 20,
    socket: io(config.socket_io_addr),
    listeners: null,
    disabled: false,
    currentEvent: new Alert(),
    classification_description: "",
    videoShowing: false,
    videoOptions: {
      autoplay: true,
      controls: true,
      responsive: true,
      aspectRatio: "4:3",
      fill: true,
      muted: true,
      language: "en",
      playbackRates: [0.5, 1.0, 1.5, 2.0],
      sources: [] // being set from setVideoOptions
    },
    buttonTypes: [
      { type: "employee", val: "employee" },
      { type: "contractor", val: "contractor" },
      { type: "intruder", val: "intruder" },
      { type: "train moving", val: "train" },
      { type: "animal", val: "animal" },
      { type: "false alarm", val: "false-alarm" }
    ]
  }),
  created() {
    this.$events.startLoading();

    this.getAlerts();

    this.listeners = e => {
      if (String.fromCharCode(e.keyCode) === "1" || e.keyCode === 97) {
        this.setClassification("employee");
      } else if (String.fromCharCode(e.keyCode) === "2" || e.keyCode === 98) {
        this.setClassification("contractor");
      } else if (String.fromCharCode(e.keyCode) === "3" || e.keyCode === 99) {
        this.setClassification("intruder");
      } else if (String.fromCharCode(e.keyCode) === "4" || e.keyCode === 100) {
        this.setClassification("train");
      } else if (String.fromCharCode(e.keyCode) === "5" || e.keyCode === 101) {
        this.setClassification("animal");
      } else if (String.fromCharCode(e.keyCode) === "6" || e.keyCode === 102) {
        this.openFalseAlarmModal();
      } else if (e.keyCode === 32) {
        // space bar zoom in/out
        this.$refs.cameraImage.zoom();
      }
    };

    this.addListeners();
  },
  async mounted() {
    this.socket.on("TRIGGER_ALARM", data => {
      //   console.log("RECEIVED ALERT IN /EVENTS", data);
      this.getAlerts();
    });
  },
  destroyed() {
    this.removeListeners();
  },
  watch: {
    alertsData: function(newVal, oldVal) {
      // if a user is classifying events and they get down to the query limit
      // make a call to grab new events
      if (oldVal.length >= this.queryLimit && newVal.length < this.queryLimit) {
        this.getAlerts();
      }
    }
  },
  computed: {
    eventsRemaining() {
      return this.events.length > 0;
    },
    alertsData() {
      return this.$alert.alerts;
    },
    createFallbackImageUrl() {
      return `${process.env.VUE_APP_FILESERVER_BASE_URL}${this.currentEvent.image_filepath}/${this.currentEvent.image_filename}`;
    }
  },
  methods: {
    onScroll({ target: { scrollTop, clientHeight, scrollHeight } }) {
      if (scrollTop + clientHeight >= scrollHeight) {
        this.pageCount = this.pageCount + 1;
        this.getAlerts();
      }
    },
    getVideoOptions() {
      this.videoOptions.sources = [
        {
          src: `${process.env.VUE_APP_FILESERVER_BASE_URL}${this.currentEvent.video_clip_filepath}/${this.currentEvent.video_clip_filename}`,
          type: "video/mp4"
        }
      ];
      return this.videoOptions;
    },
    showVideo() {
      this.videoShowing = true;
    },
    setCurrentEvent(event) {
      this.currentEvent = event;
    },
    addListeners() {
      // listeners on keystrokes need to be added and removed when the modals are open
      window.addEventListener("keyup", this.listeners);
    },
    removeListeners() {
      window.removeEventListener("keyup", this.listeners);
    },
    openFalseAlarmModal() {
      this.removeListeners();
      this.$refs.falsealarm.open();
    },
    setFalseAlarmClassification(type) {
      this.$refs.falsealarm.close();
      this.addListeners();
      this.setClassification(type);
    },
    setClassification(type) {
      this.disabled = true;
      this.currentEvent.user_classification = type;
      this.currentEvent.classification_description = this.classification_description;
      this.currentEvent.classified_by = this.$auth.user.email;
      this.classification_description = "";
      this.updateEvent(this.currentEvent);
    },
    focusTextarea() {
      this.$nextTick(() => {
        this.$refs.falsealarmtextarea.focus();
      });
    },
    newline() {
      this.classification_description = `${this.classification_description}\n`;
    },
    async updateEvent(event) {
      try {
        const response = await this.$alert.updateAlert(event);
        if (response.status && response.status === 500) {
          this.$notifyError(
            "ERROR GETTING TODAYS EVENTS. PLEASE TRY AGAIN LATER"
          );
          return;
        }
        this.$notifyClassification(event.user_classification.toUpperCase());

        setTimeout(() => {
          this.events = this.events.filter(evt => evt.id !== event.id);
          this.currentEvent = this.events[0];
          // timing the fade out transition with the classification animation
        }, 950);
      } catch (error) {
        this.disabled = false;
        console.error("ERROR CLASSIFYING EVENT", error);
        this.$notifyError("ERROR CLASSIFYING EVENT. PLEASE TRY AGAIN LATER.");
      }
    },
    async getAlerts() {
      try {
        const response = await this.$alert.getAlerts({
          page: this.pageCount,
          limit: this.queryLimit
        });

        console.log("CLIENT RESP", response);
        if (response.status && response.status === 500) {
          this.$notifyError("ERROR GETTING EVENTS. PLEASE TRY AGAIN LATER");
          return;
        }

        if (this.pageCount > 0 && response.length === 0) {
          return;
        }

        if (this.events.length <= response.length) {
          this.events = response;
          this.currentEvent = this.events[0];
        } else {
          this.events = [...this.events, ...response];
        }

        this.setEventsCount();
        this.$events.stopLoading();
      } catch (error) {
        console.error("ERROR GETTING EVENTS", error);
        this.$notifyError("ERROR GETTING EVENTS. PLEASE TRY AGAIN LATER.");
      }
    },
    async setEventsCount() {
      try {
        this.totalEventsCount = await this.$alert.getAlertCount();
      } catch (error) {
        console.error("ERROR GETTING COUNT", error);
        this.$notifyError(
          "ERROR GETTING EVENTS COUNT. PLEASE TRY AGAIN LATER."
        );
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.events-container {
  font-family: "DIN Condensed";
}
.v-btn {
  letter-spacing: 3.5px;
  border: 1px solid var(--v-border-base);
  background-color: var(--v-buttonBlack-base);
  color: #fff;
}
// list container styles
.list-container {
  overflow-y: scroll;
  overflow-x: hidden;
  scrollbar-color: var(--v-border-base) transparent;
  //   height: 58%;
  height: 100vh;
  &::-webkit-scrollbar {
    background-color: transparent;
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: transparent;
  }
  &:hover {
    &::-webkit-scrollbar-thumb {
      background: var(--v-border-base);
    }
  }
}

/* modal */
.textarea {
  background-color: var(--v-secondaryDark-base);
  color: #fff;
  padding: 20px;
}
</style>