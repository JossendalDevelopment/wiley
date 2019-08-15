<notes>
This component handles all the heavy lifting for classifying an event. Will need abstraction as it's
getting unweildy.
TODO make the `selected` method here a global or mixin and use it for the history page percentage cards.
TODO loading component while fetching images
</notes>
<template>
  <v-container v-if="$events.loading" fill-height fluid pa-0 ml-0 mr-0 class="history-container">
    <app-loading-spinner />
  </v-container>
  <v-layout
    justify-center
    fill-height
    align-center
    v-else-if="!events"
    class="video-container"
    v-test-ref="'container'"
  >
    <span
      v-test-ref="'empty-content'"
      style="color:white; font-family: DIN Condensed; font-size: 30px; letter-spacing2px;"
    >THERE ARE NO UNCLASSIFIED EVENTS</span>
  </v-layout>
  <v-layout v-else class="video-container" justify-center>
    <v-flex xs4>
        <events--active-list :events="events" />
    </v-flex>
    <v-flex xs8>
      <!-- Above video -->
      <v-layout align-center justify-center>
        <span
          style="color:white; font-family: 'DIN Condensed'; font-size: 28px;"
        >{{`${currentEventIndex + 1}/${ $events.sessionEvents && unclassifiedEvents.length}`}}</span>
      </v-layout>
      <!-- video/image -->
      <v-layout align-center justify-center px-2>
        <v-flex class="video-feed-wrapper">

            <details--camera-image
             v-if="!videoShowing"
              ref="cameraImage"
              :source="currentEvent"
              v-on:showvideo="showVideo"
              v-on:datauricreated="setThumb($event)"
            />
            <video-player 
                v-else
                :options="getVideoOptions()"/>

        </v-flex>
      </v-layout>
      <!-- below video -->
      <v-layout column align-center justify-center px-2>
        <v-flex class="text--center white--text">
          <p
            style="font-family: Montserrat; font-size:14px; font-weight:700;"
          >SELECT OR USE YOUR KEYBOARD</p>
        </v-flex>
        <v-layout style="width:100%;" justify-space-between v-test-ref="'bottom-buttons-container'">

            <events--class-button 
                v-for="el in 6"
                type="employee" 
                :key="el"
                v-on:classification="setClassification($event)"
                :selected="true" 
                :index="el"
                :disabled="false"/>

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

            <v-btn
              @click="setClassification('train')"
              flat
              :class="disabled ? 'control-btn disabled' : 'control-btn'"
              :style="selected('train')"
              large
            >
              train moving
              <span class="control-numeral">4</span>
            </v-btn>

            
            <v-btn
              @click="setClassification('animal')"
              flat
              :class="disabled ? 'control-btn disabled' : 'control-btn'"
              :style="selected('animal')"
              large
            >
              animal
              <span class="control-numeral">5</span>
            </v-btn>

            <v-btn
              @click="openFalseAlarmModal()"
              flat
              :class="disabled ? 'control-btn disabled' : 'control-btn'"
              :style="selected('false-alarm')"
              large
            >
              false alarm
              <span class="control-numeral">6</span>
            </v-btn>

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
        :disabled="false"
        @click="setFalseAlarmClassification('false-alarm')"
      >Confirm</v-btn>
    </app-dialog>
  </v-layout>
</template>
<script>
import DetailsCameraImage from "@/components/details--camera-image";
import VideoPlayer from '@/components/video-player.vue';
import AppLoadingSpinner from "@/components/app-loading-spinner.vue";
import Dialog from "@/components/app-dialog.vue";
import EventsActiveList from '@/components/events--active-list.vue';
import EventsClassButton from '@/components/events--class-button.vue';

export default {
  components: {
    "details--camera-image": DetailsCameraImage,
    'video-player': VideoPlayer,
    "app-dialog": Dialog,
    "app-loading-spinner": AppLoadingSpinner,
    'events--active-list': EventsActiveList,
    'events--class-button': EventsClassButton
  },
  data: () => ({
    events: [],
    unclassifiedEvents: [],
    unclassifiedRemaining: 0,
    listeners: null,
    disabled: false,
    currentEventIndex: 0,
    currentEvent: {},
    classificationDescription: "",
    videoShowing: false,
    videoOptions: {
        autoplay: true,
        controls: true,
        responsive: true,
        aspectRatio: '4:3',
        fill: true,
        muted: true,
        language: 'en',
        playbackRates: [0.5, 1.0, 1.5, 2.0],
        sources: [] // being set from setVideoOptions
    },
  }),
  created() {
    // TODO gets all events from postgres so that the counters below the buttons show grand totals
    // the main function of this page really only demands unclassified events.
    // Should the counters be a grand total or maybe just a current session total
    // this.getFiftyEvents();
    this.getAlerts();
    // this.setUnclassifiedEvents(this.$events.sessionEvents);

    this.listeners = e => {
      if (String.fromCharCode(e.keyCode) === "1" || e.keyCode === 97) {
        this.setClassification("employee");
      } else if (String.fromCharCode(e.keyCode) === "2" || e.keyCode === 98) {
        this.setClassification("train");
      } else if (String.fromCharCode(e.keyCode) === "3" || e.keyCode === 99) {
        this.setClassification("intruder");
      } else if (String.fromCharCode(e.keyCode) === "4" || e.keyCode === 100) {
        this.setClassification("animal");
      } else if (String.fromCharCode(e.keyCode) === "5" || e.keyCode === 101) {
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
  },
  destroyed() {
    this.removeListeners();
  },
  computed: {
    unclassifiedEventsCount() {
      return this.$events.sessionEvents.reduce((total, next) => {
        if (!next.user_classification) {
          total++;
        }
        return total;
      }, 0);
    }
  },
  methods: {
      getVideoOptions() {
        // this.setVideoOptions();
        // add the stream url or filepath to video options
        // required for video-player component
        this.videoOptions.sources = [
        {
            "src": "/assets/video/sample_rail_west_sm.mp4",
            "type": "video/mp4"
        }];
        return this.videoOptions;
    },
    showVideo() {
        this.videoShowing = true;
    },
    // eslint-disable-next-line
    setThumb(evt) {
      // TODO forgoing client built thumbnails for now
      //   this.currentEvent.thumb_250x250 = evt;
      this.currentEvent.thumb_250x250 = null;
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
        setTimeout(() => {
          // the buttons need to be disabled until all the svg layers can be loaded
          // in order to create the thumbnail correctly
          // TODO add disable function to vuex
          this.disabled = false;
        }, 900);
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
    async updateEvent(event) {
      try {
        const response = await this.$events.updateEvent(event);
        if (response.status && response.status === 500) {
          this.$notifyError(
            "ERROR GETTING TODAYS EVENTS. PLEASE TRY AGAIN LATER"
          );
          return;
        }
        this.$notifyClassification(event.user_classification.toUpperCase());

        setTimeout(() => {
          this.goNext();
          // timing the fade out transition with the classification animation
        }, 950);
      } catch (error) {
        this.disabled = false;
        console.error("ERROR CLASSIFYING EVENT", error);
        this.$notifyError("ERROR CLASSIFYING EVENT. PLEASE TRY AGAIN LATER.");
      }
    },
    async getAlerts() {
      this.$events.startLoading();
      try {
        const response = await this.$alert.getAlerts({
            page: 0,
            limit: 100,
        });

        console.log("CLIENT RESP", response);
        if (response.status && response.status === 500) {
          this.$notifyError(
            "ERROR GETTING EVENTS. PLEASE TRY AGAIN LATER"
          );
          return;
        }
        this.events = response;
        this.currentEvent = response[0];
        // this.setUnclassifiedEvents(response);
        this.$events.stopLoading();
      } catch (error) {
        console.error("ERROR GETTING EVENTS", error);
        this.$notifyError(
          "ERROR GETTING EVENTS. PLEASE TRY AGAIN LATER."
        );
      }
    },
    // async getFiftyEvents() {
    //   this.$events.startLoading();
    //   try {
    //     const response = await this.$events.getFiftyEvents();

    //     // console.log("CLIENT RESP", response);
    //     if (response.status && response.status === 500) {
    //       this.$notifyError(
    //         "ERROR GETTING TODAYS EVENTS. PLEASE TRY AGAIN LATER"
    //       );
    //       return;
    //     }
    //     this.setUnclassifiedEvents(response);
    //   } catch (error) {
    //     console.error("ERROR GETTING ALL EVENTS", error);
    //     this.$notifyError(
    //       "ERROR GETTING HISTORICAL EVENTS. PLEASE TRY AGAIN LATER."
    //     );
    //   }
    // },
    setUnclassifiedEvents(events) {
      this.unclassifiedEvents = events.filter(evt => {
        return !evt.user_classification;
      });

      this.unclassifiedRemaining = this.unclassifiedEvents.length;

      if (this.unclassifiedEvents.length > 0) {
        this.currentEvent = this.unclassifiedEvents[0];
      }
      this.$events.stopLoading();
    },
    getTotalByType(type) {
      return this.$events.sessionEvents.reduce((prev, next) => {
        if (next.user_classification === type) {
          prev++;
        }
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
// .control {
//   &-btn {
//     width: 16%;
//     font-size: 20px;
//     letter-spacing: 1.5px;
//     position: relative;
//     margin: 0;
//   }
//   &-text {
//     // width: 100%;
//     margin: 0 auto;
//     color: var(--v-border-base);
//     font-size: 18px;
//   }
//   &-numeral {
//     position: absolute;
//     color: #fff;
//     top: -7px;
//     right: -30px;
//     font-size: 12px;
//   }
// }
// .disabled {
//   pointer-events: none;
// }
.video-feed-wrapper {
  position: relative;
  // sets max width of image, only required while in 4:3 mode
  width: 100%;
//   max-width: 640px;
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
