<notes>
    This component handles all the heavy lifting for classifying an event. Will need abstraction as it's
    getting unweildy.
    TODO make the `selected` method here a global or mixin and use it for the history page percentage cards.
    TODO loading component while fetching images
</notes>
<template>
  <v-layout
    justify-center
    fill-height
    align-center
    v-if="!unclassifiedRemaining"
    class="video-container"
    v-test-ref="'container'"
  >
    <span
      v-test-ref="'empty-content'"
      style="color:white; font-family: DIN Condensed; font-size: 30px; letter-spacing2px;"
    >THERE ARE NO UNCLASSIFIED EVENTS</span>
  </v-layout>
  <v-layout v-else-if="!working" class="video-container" justify-center>
    <v-flex xs12>
      <!-- Above video -->
      <v-layout align-center justify-center>
        <span
          style="color:white; font-family: 'DIN Condensed'; font-size: 28px;"
        >{{`${currentEventIndex + 1}/${ $events.events && unclassifiedEvents.length}`}}</span>
      </v-layout>
      <!-- video/image -->
      <v-layout align-center justify-center>
        <v-flex xs2>
          <v-layout justify-start align-center>
            <v-btn class="prevBtn" flat large @click="goBack()">Previous</v-btn>
          </v-layout>
        </v-flex>
        <v-flex xs8 class="video-feed-wrapper">
          <div class="red-border">
            <details--camera-image
              ref="cameraImage"
              :source="currentEvent"
              v-on:datauricreated="setThumb($event)"
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
        <v-layout justify-space-between v-test-ref="'bottom-buttons-container'">
          <v-flex mx-1>
            <v-btn
              @click="setClassification('employee')"
              flat
              :class="disabled ? 'control-btn disabled' : 'control-btn'"
              :style="selected('employee')"
              large
            >
              employee
              <span class="control-numeral">1</span>
            </v-btn>
            <p class="control-text text-xs-center">{{ getTotalByType('employee') }}</p>
          </v-flex>
          <v-flex mx-1>
            <v-btn
              @click="setClassification('contractor')"
              flat
              :class="disabled ? 'control-btn disabled' : 'control-btn'"
              :style="selected('contractor')"
              large
            >
              contractor
              <span class="control-numeral">2</span>
            </v-btn>
            <p class="control-text text-xs-center">{{ getTotalByType('contractor') }}</p>
          </v-flex>
          <v-flex mx-1>
            <v-btn
              @click="setClassification('intruder')"
              flat
              :class="disabled ? 'control-btn disabled' : 'control-btn'"
              :style="selected('intruder')"
              large
            >
              intruder
              <span class="control-numeral">3</span>
            </v-btn>
            <p class="control-text text-xs-center">{{ getTotalByType('intruder') }}</p>
          </v-flex>
          <v-flex mx-1>
            <v-btn
              @click="setClassification('animal')"
              flat
              :class="disabled ? 'control-btn disabled' : 'control-btn'"
              :style="selected('animal')"
              large
            >
              animal
              <span class="control-numeral">4</span>
            </v-btn>
            <p class="control-text text-xs-center">{{ getTotalByType('animal') }}</p>
          </v-flex>
          <v-flex mx-1>
            <v-btn
              @click="openFalseAlarmModal()"
              flat
              :class="disabled ? 'control-btn disabled' : 'control-btn'"
              :style="selected('false-alarm')"
              large
            >
              false alarm
              <span class="control-numeral">5</span>
            </v-btn>
            <p class="control-text text-xs-center">{{ getTotalByType('false-alarm') }}</p>
          </v-flex>
        </v-layout>
      </v-layout>
    </v-flex>
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
          v-model="classificationDescription"
        />
      </template>
      <v-btn
        slot="detailsButton"
        dark
        style="background-color:#FFF; color:black;"
        :disabled="!classificationDescription"
        @click="setFalseAlarmClassification('false-alarm')"
      >Confirm</v-btn>
    </app-dialog>
  </v-layout>
</template>
<script>
import DetailsCameraImage from "@/components/details--camera-image";
// import VideoPlayer from '@/components/video-player.vue';
import Dialog from "@/components/app-dialog.vue";

export default {
  components: {
    "details--camera-image": DetailsCameraImage,
    // 'video-player': VideoPlayer,
    "app-dialog": Dialog
  },
  data: () => ({
    unclassifiedEvents: [],
    unclassifiedRemaining: 0,
    listeners: null,
    working: true,
    disabled: false,
    currentEventIndex: 0,
    currentEvent: {},
    classificationDescription: ""
  }),
  created() {
    this.listeners = e => {
      if (String.fromCharCode(e.keyCode) === "1") {
        this.setClassification("employee");
      } else if (String.fromCharCode(e.keyCode) === "2") {
        this.setClassification("contractor");
      } else if (String.fromCharCode(e.keyCode) === "3") {
        this.setClassification("intruder");
      } else if (String.fromCharCode(e.keyCode) === "4") {
        this.setClassification("animal");
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

    // TODO gets all events from postgres so that the counters below the buttons show grand totals
    // the main function of this page really only demands unclassified events.
    // Should the counters be a grand total or maybe just a current session total
    this.$events.getAllEvents()
    .then(res => {
        console.log("SUCCESS", res.data)
        this.setUnclassifiedEvents(res.data);
    })
    .catch(error => {
        console.log("ERROR GETTING ALL EVENTS", error)
    })
  },
  destroyed() {
    this.removeListeners();
  },
  computed: {
    unclassifiedEventsCount() {
      return this.$events.events.reduce((total, next) => {
        if (!next.user_classified) {
          total++;
        }
        return total;
      }, 0);
    }
  },
  methods: {
    setThumb(evt) {
      this.currentEvent.thumb_250x250 = evt;
    },
    setUnclassifiedEvents(events) {
      this.unclassifiedEvents = events.filter(evt => {
        return !evt.user_classification;
      });

      this.unclassifiedRemaining = this.unclassifiedEvents.length;

      if (this.unclassifiedEvents.length > 0) {
        this.currentEvent = this.unclassifiedEvents[0];
      }
      this.working = false
    },
    addListeners() {
      // listeners on keystrokes need to be added and removed when the modals are open
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
      this.disabled = true;
      this.currentEvent.user_classification = type;
      this.currentEvent.classification_description = this.classificationDescription;
      this.currentEvent.classified_by = this.$auth.user.email;
      this.classificationDescription = "";
      this.updateEvent(this.currentEvent);
    },
    updateEvent(event) {
      this.$events
        .updateEvent(event)
        .then(() => {
          this.$notifyClassification(event.user_classification.toUpperCase());
          setTimeout(() => {
            this.disabled = false;
            this.goNext();
            // timing the fade out transition with the classification animation
          }, 950);
        })
        .catch(error => {
          this.disabled = false;
          console.error(error);
          this.$notifyError("FAILED TO CLASSIFY EVENT");
        });
    },
    getTotalByType(type) {
      return this.$events.events.reduce((prev, next) => {
        if (next.user_classification === type) {
          prev++;
        }
        console.log("COUNT", prev)
        return prev;
      }, 0);
    },
    selected(type) {
      if (
        this.unclassifiedEvents[this.currentEventIndex] &&
        this.unclassifiedEvents[this.currentEventIndex].user_classification ===
          type
      ) {
        // TODO check browser support for invert()
        // return `background-color: #FFF; color: black;`;
        return `filter: invert(1);`;
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
      this.classificationDescription = `${this.classificationDescription}\n`;
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
    width: 167px;
    font-size: 20px;
    letter-spacing: 1.5px;
    position: relative;
    margin: 0;
  }
  &-text {
    width: 100%;
    margin: 0 auto;
    color: var(--v-border-base);
    font-size: 18px;
  }
  &-numeral {
    position: absolute;
    color: #fff;
    top: -6px;
    right: 6px;
    font-size: 13px;
  }
}
.disabled {
  pointer-events: none;
}
.video-feed-wrapper {
  position: relative;
  // sets max width of image, only required while in 4:3 mode
  max-width: 640px;
}
/* border corners */
.red-border {
  background-image: url("/assets/images/red_border_640x480.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 200;
  padding: 10px 10px;
}

/* modal */
.textarea {
  // border: 1px solid #FFF;
  background-color: var(--v-secondaryDark-base);
  color: #fff;
  padding: 20px;
}

@media only screen and (max-width: 1000px) {
  .control {
    &-btn {
      width: 130px;
      font-size: 18px;
    }
    &-numeral {
      top: -6px;
      right: 6px;
      font-size: 13px;
    }
  }
}
</style>
