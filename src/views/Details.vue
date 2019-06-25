<notes>
    This component handles all the heavy lifting for classifying an event. Will need abstraction as it's
    getting unweildy.
    TODO make the selected method here a global or mixin and use it for the history page percentage cards.
</notes>
<template>
  <v-layout
    justify-center
    fill-height
    align-center
    v-if="!unclassifiedRemaining"
    class="video-container test-ref"
  >
    <span
      style="color:white; font-family: DIN Condensed; font-size: 30px; letter-spacing2px;"
    >THERE ARE NO UNCLASSIFIED EVENTS</span>
  </v-layout>
  <v-layout v-else-if="!working" class="video-container test-ref" justify-center>
    <v-flex xs12>
      <!-- Above video -->
      <v-layout align-center justify-center>
        <span
          style="color:white; font-family: 'DIN Condensed'; font-size: 28px;"
        >{{`${currentEventIndex + 1}/${ $events.events && unclassifiedEvents.length}`}}</span>
      </v-layout>
      <!-- video -->
      <v-layout align-center justify-center>
        <v-flex xs2>
          <v-layout justify-start align-center>
            <v-btn class="prevBtn" flat large @click="goBack()">Previous</v-btn>
          </v-layout>
        </v-flex>
        <v-flex xs8 class="video-feed-wrapper">
          <div class="red-border">
            <dummy-camera-image
              ref="cameraImage"
              :boundary="currentEvent.boundary"
              :source="currentEvent"
            />
            <!-- <video-player :options="getVideoOptions()"/> -->
          </div>
        </v-flex>
        <v-flex xs2>
          <v-layout justify-end align-center>
            <v-btn class="nextBtn" flat large @click="goNext()">Next/Skip</v-btn>
          </v-layout>
        </v-flex>
      </v-layout>
      <!-- below video -->
      <v-layout column align-center justify-center>
        <v-flex xs10 class="text--center white--text">
          <p
            style="font-family: Montserrat; font-size:14px; font-weight:700;"
          >SELECT OR USE YOUR KEYBOARD</p>
        </v-flex>
        <v-layout justify-space-between>
          <v-flex xs2>
            <v-btn
              @click="setClassification('employee')"
              flat
              class="control-btn"
              :style="selected('employee')"
              large
            >
              employee
              <span class="numeral">1</span>
            </v-btn>
            <p class="control-text text-xs-center">{{ getTotalByType('employee') }}</p>
          </v-flex>
          <v-flex xs2>
            <v-btn
              @click="setClassification('contractor')"
              flat
              class="control-btn"
              :style="selected('contractor')"
              large
            >
              contractor
              <span class="numeral">3</span>
            </v-btn>
            <p class="control-text text-xs-center">{{ getTotalByType('contractor') }}</p>
          </v-flex>
          <v-flex xs2>
            <v-btn
              @click="setClassification('non-employee')"
              flat
              class="control-btn"
              :style="selected('non-employee')"
              large
            >
              intruder
              <span class="numeral">2</span>
            </v-btn>
            <p class="control-text text-xs-center">{{ getTotalByType('non-employee') }}</p>
          </v-flex>
          <v-flex xs2>
            <v-btn
              @click="setClassification('coyote')"
              flat
              class="control-btn"
              :style="selected('coyote')"
              large
            >
              animal
              <span class="numeral">4</span>
            </v-btn>
            <p class="control-text text-xs-center">{{ getTotalByType('coyote') }}</p>
          </v-flex>
          <v-flex xs2>
            <v-btn
              @click="openFalseAlarmModal()"
              flat
              class="control-btn"
              :style="selected('false-alarm')"
              large
            >
              false alarm
              <span class="numeral">5</span>
            </v-btn>
            <p class="control-text text-xs-center">{{ getTotalByType('false-alarm') }}</p>
          </v-flex>
        </v-layout>
      </v-layout>
    </v-flex>
    <!-- Confirm/Deny modals -->
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
          v-model="confirmationDescription"
        />
      </template>
      <v-btn
        slot="detailsButton"
        dark
        style="background-color:#FFF; color:black;"
        :disabled="!confirmationDescription"
        @click="setFalseAlarmClassification('false-alarm')"
      >Confirm</v-btn>
    </app-dialog>
  </v-layout>
</template>
<script>
import firebase from "firebase";
import "firebase/firestore";
import DummyCameraImage from "@/components/dummy-camera-image";
// import VideoPlayer from '@/components/video-player.vue';
import Dialog from "@/components/app-dialog.vue";

// import CameraFeedsJson from '@/cameraFeeds.json';

export default {
  components: {
    "dummy-camera-image": DummyCameraImage,
    // 'video-player': VideoPlayer,
    "app-dialog": Dialog
  },
  data: () => ({
    eventWatcher: null,
    unclassifiedEvents: [],
    unclassifiedRemaining: 0,
    listeners: null,
    working: true,
    currentEventIndex: 0,
    currentEvent: {},
    confirmationDescription: "",
    videoOptions: {
      autoplay: true,
      controls: false,
      responsive: true,
      aspectRatio: "16:9",
      fill: true,
      muted: true,
      language: "en",
      playbackRates: [0.5, 1.0, 1.5, 2.0],
      sources: [] // being set from setVideoOptions
    }
  }),
  mounted() {
    // May or may not want to fetch all events here to ensure latest data
    // for dev purposes, just assuming data and grabbing first record
    this.unclassifiedEvents = this.$events.events.filter(evt => {
      return !evt.classified;
    });

    this.unclassifiedRemaining = this.unclassifiedEvents.length;

    if (this.unclassifiedEvents.length > 0) {
      this.currentEvent = this.unclassifiedEvents[0];
    }
    // this.$events.getAllEvents()
    //     .then(resp => {
    //             this.currentEvent = resp.data[0];
    //             // this.$events.setEvents(resp.data)
    //             this.working = false;
    //     })
    //     .catch(err => {
    //         this.$notifyError("ERROR FETCHING NEW EVENTS")
    //     })
    // this.$events.setEvents(this.events.events);
    // this.currentEvent = this.$events.events.find(evt => !evt.classified);
  },
  created() {
    this.listeners = e => {
      if (String.fromCharCode(e.keyCode) === "1") {
        this.setClassification("employee");
      } else if (String.fromCharCode(e.keyCode) === "2") {
        this.setClassification("non-employee");
      } else if (String.fromCharCode(e.keyCode) === "3") {
        this.setClassification("contractor");
      } else if (String.fromCharCode(e.keyCode) === "4") {
        this.setClassification("coyote");
      } else if (String.fromCharCode(e.keyCode) === "5") {
        this.openFalseAlarmModal();
      } else if (e.keyCode === 32) {
        // space bar zoom in/out
        this.$refs.cameraImage.zoom();
      } else if (e.keyCode === 39) {
        // arrow right
        this.goNext();
      } else if (e.keyCode === 37) {
        // arrow left
        this.goBack();
      }
    };
    this.addListeners();
    // watcher on all classified events. this will update all events in real time

    const db = firebase.firestore();
    this.eventWatcher = db
      .collection("classified_events")
      .limit(30)
      .onSnapshot(
        querySnapshot => {
          let result = [];
          querySnapshot.forEach(doc => {
            let newDoc = doc.data();
            newDoc.id = doc.id; // TODO what is this here for?
            result.push(newDoc);
          });
          this.$events.setEvents(result);
          this.working = false;
        },
        error => {
          console.log("Error in EventWatcher:", error);
        }
      );
  },
  destroyed() {
    this.eventWatcher();
    this.removeListeners();
  },
  computed: {
    unclassifiedEventsCount() {
      return this.$events.events.reduce((prev, next) => {
        if (!next.classified) {
          prev++;
        }
        return prev;
      }, 0);
    }
  },
  methods: {
    addListeners() {
      window.addEventListener("keyup", this.listeners);
    },
    removeListeners() {
      window.removeEventListener("keyup", this.listeners);
    },
    goBack() {
      this.currentEventIndex = this.crawlArray(
        this.unclassifiedEvents,
        this.currentEventIndex,
        -1
      );
      this.currentEvent = this.unclassifiedEvents[this.currentEventIndex];
      this.$refs.cameraImage.zoomOut();
    },
    goNext() {
      if (this.unclassifiedRemaining > 0) {
        this.currentEventIndex = this.crawlArray(
          this.unclassifiedEvents,
          this.currentEventIndex,
          1
        );
        this.currentEvent = this.unclassifiedEvents[this.currentEventIndex];
        this.$refs.cameraImage.zoomOut();
      }
      this.unclassifiedRemaining = this.unclassifiedEventsCount;
    },
    crawlArray(array, index, n) {
      return (((index + n) % array.length) + array.length) % array.length;
    },
    setFalseAlarmClassification(type) {
      this.$refs.falsealarm.close();
      this.addListeners();
      this.setClassification(type);
    },
    setClassification(type) {
      this.currentEvent.classifiedAs = type;
      this.currentEvent.confirmationDescription = this.confirmationDescription;
      this.confirmationDescription = "";
      this.updateEvent(this.currentEvent);
    },
    updateEvent(event) {
      this.$events
        .updateEvent(event)
        .then(() => {
          this.$notifyClassification(event.classifiedAs.toUpperCase());
          setTimeout(() => {
            this.goNext();
            // timing the fade out transition with the classification animation
          }, 950);
        })
        .catch(() => {
          this.$notifyError("FAILED TO CLASSIFY EVENT");
        });
    },
    getTotalByType(type) {
      return this.$events.events.reduce((prev, next) => {
        if (next.classifiedAs === type) {
          prev++;
        }
        return prev;
      }, 0);
    },
    selected(type) {
      if (
        this.unclassifiedEvents[this.currentEventIndex] &&
        this.unclassifiedEvents[this.currentEventIndex].classifiedAs === type
      ) {
        return `background-color: #FFF; color: black;`;
      }
      return "";
    },
    openFalseAlarmModal() {
      this.removeListeners();
      this.$refs.falsealarm.open();
    },
    focusTextarea() {
      this.$nextTick(() => {
        this.$refs.falsealarmtextarea.focus();
      });
    },
    newline() {
      this.confirmationDescription = `${this.confirmationDescription}\n`;
    }
  }
};
</script>
<style lang="scss" scoped>
.video-container {
  background-color: var(--v-secondaryDark-base);
  font-family: "DIN Condensed";
}
.v-btn {
  letter-spacing: 3.5px;
  border: 1px solid var(--v-border-base);
  background-color: var(--v-buttonBlack-base);
  color: #fff;
}
.control {
  &-btn {
    width: 100%;
    font-size: 20px;
    letter-spacing: 1.5px;
    position: relative;
  }
  &-text {
    width: 100%;
    margin: 0 auto;
    color: var(--v-border-base);
    font-size: 16px;
  }
}
.numeral {
  position: absolute;
  top: -6px;
  right: -26px;
  font-size: 13px;
}
.video-feed-wrapper {
  position: relative;
}
/* border corners */

.red-border {
  background-image: url("/assets/images/red_border.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 200;
  padding: 20px 10px;
}

/* modal */
.textarea {
  // border: 1px solid #FFF;
  background-color: var(--v-secondaryDark-base);
  color: #fff;
  padding: 20px;
}

@media only screen and (max-width: 1000px) {
  .v-btn {
    font-size: 14px;
    max-width: 120px;
  }
}
</style>
