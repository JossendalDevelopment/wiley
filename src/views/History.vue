<notes>
    TODO: RENAME - This view, despite being named 'history' is now being called 'archive'
    Sorry about the hacky css in the `.app-card` class. The font has a lot of built in padding that is unavoidable 
    for the time being. Look in to getting a re-formatted font.
</notes>
<template>
  <v-container fill-height fluid pa-0 ml-0 mr-0 grid-list-lg class="history-container">
    <template v-if="$events.loading">
      <app-loading-spinner />
    </template>
    <template v-else>
      <v-layout column>
        <!-- card row -->
        <v-flex shrink>
          <v-layout justify-center align-center class="app-card-container" pa-2>
            <template v-for="(item, i) in eventTypes">
              <v-flex
                xs4
                d-flex
                class="app-card"
                :class="selectedEvent.type === item.type ? 'app-card-selected' : ''"
                :key="i + 'card'"
                @click="selectEventType(item)"
              >
                <v-layout align-center>
                  <v-flex py-0>
                    <p class="name mb-0">{{ item.name.toUpperCase() }}</p>
                    <p class="count mb-0">{{ item.count }}</p>
                  </v-flex>
                  <v-flex pa-0 pr-1 text-xs-right style="margin-bottom: -10px;">
                    <p class="percentage mb-0">{{ Math.round(percentage(item.count)) || 0 }}%</p>
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-divider
                class="app-card-divider"
                v-if="i != 'false-alarm'"
                :key="i + 'divider'"
                vertical
              ></v-divider>
            </template>
          </v-layout>
        </v-flex>

        <v-layout column align-center>
          <!-- sub header bar -->
          <v-flex style="width:70%;" shrink>
            <v-layout
              wrap
              my-2
              px-2
              align-center
              :class="$vuetify.breakpoint.lgAndUp ? 'justify-space-between' : 'justify-center'"
            >
              <v-flex xs5>
                <v-layout justify-start>
                  <h3
                    class="sort-bar-text"
                  >{{ selectedEvent.name.toUpperCase() }}S THIS WEEK ({{ eventTypes[selectedEvent.type].count }})</h3>
                </v-layout>
              </v-flex>
              <v-flex xs7>
                <v-layout justify-end>
                  <div class="select-container" style="margin-right:10px;">
                    <span class="text">SHOW ONLY</span>
                    <select class="select" @change="filterBy($event)">
                      <option v-for="item in filterOptions" :key="item">{{ item }}</option>
                    </select>
                  </div>
                  <div class="select-container">
                    <span class="text">ARRANGE BY</span>
                    <select class="select" @change="sortBy($event)">
                      <option v-for="item in sortOptions" :key="item">{{ item }}</option>
                    </select>
                  </div>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-flex>
          <!-- dynamic component -->
          <v-flex style="width:70%; position:relative; height:100%;" class="list-container">
            <component
              :is="getComponent"
              :key="selectedEvent.type + 'selected'"
              :data="eventTypes[selectedEvent.type]"
              style="position:absolute; top:0px; left:0px; right:0px; padding:8px; padding-right:0px;"
            />
          </v-flex>
        </v-layout>
      </v-layout>
    </template>
  </v-container>
</template>
<script>
import firebase from "firebase";
import "firebase/firestore";

import AppLoadingSpinner from "@/components/app-loading-spinner.vue";
import FalseAlarmList from "@/components/history--false-alarm-list.vue";
import DefaultList from "@/components/history--default-list.vue";

import EventTypes from "@/types/eventTypes";

export default {
  components: {
    "app-loading-spinner": AppLoadingSpinner
  },
  data: () => ({
    totalEvents: [],
    eventWatcher: null,
    eventTypes: new EventTypes(),
    selectedEvent: { name: "Animal", type: "animal", count: 0 },
    filterOptions: ["This Week", "Today", "Last Week", "All"],
    sortOptions: ["Recent", "User", "Camera", "All"]
  }),
  created() {
    this.$events.startLoading();
  },
  destroyed() {
    this.eventWatcher = null;
  },
  mounted() {
    const db = firebase.firestore();
    // this watcher will query initially and then run anytime the 'classified-events' collection changes
    this.eventWatcher = db
      .collection("classified_events")
      .where("user_classification", ">", "")
      .limit(50)
      .onSnapshot(querySnapshot => {
        this.$events.startLoading();

        if (querySnapshot.empty) {
          this.$events.stopLoading();
          return;
        }

        let results = [];
        querySnapshot.forEach(doc => {
          let newDoc = doc.data();
          newDoc.id = doc.id; // docs do not come with their respective ids by default
          results.push(newDoc);
        });
        this.totalEvents = results;
        this.eventTypes = new EventTypes();
        // TODO: make each type of event it's own Type
        // clarification: this takes the query results array and creates an object of objects aggregated by the types defined
        // in EventTypes and splits up the query results by their type. Sample below
        // EventTypes {
        //     animal: {
        //         name: String,
        //         count: Number
        //         type: String,
        //         events: Array
        //     },
        //     contractor: (...)
        //     employee: (...)
        //     false-alarm: (...)
        //     intruder: (...)
        // }
        results.forEach(
          item => {
            let cls = item.user_classification;
            this.eventTypes[cls] = {
              ...this.eventTypes[cls],
              count: this.eventTypes[cls].count
                ? (this.eventTypes[cls].count += 1)
                : 1
            };
            this.eventTypes[cls].events.push(item);
            this.$events.stopLoading();
          },
          error => {
            console.error("Error in EventWatcher:", error);
            this.$events.stopLoading();
          }
        );
      });
    // TODO cache this response
    // this.$events.getAllClassifiedEvents().then(resp => {
    //   this.events = resp.data;
    //   // sort out events by their classification
    //   this.events.forEach(item => {
    //     let cls = item.classifiedAs;
    //     console.log("CLASS", cls);
    //     this.eventTypes[cls] = {
    //       ...this.eventTypes[cls],
    //       count: this.eventTypes[cls].count
    //         ? (this.eventTypes[cls].count += 1)
    //         : 1
    //     };
    //     this.eventTypes[cls].events.push(item);
    //   });
    // });
  },
  methods: {
    percentage(value) {
      return (100 * value) / this.totalEvents.length;
    },
    filterBy(e) {
      console.log(e.target.value);
    },
    sortBy(e) {
      console.log(e.target.value);
    },
    selectEventType(event) {
      this.selectedEvent = event;
    }
  },
  computed: {
    getComponent() {
      if (this.selectedEvent.type === "false-alarm") {
        return FalseAlarmList;
      }
      return DefaultList;
    }
  }
};
</script>
<style lang="scss" scoped>
.history-container {
  background-color: var(--v-secondaryDark2-base);
  font-family: "DIN Condensed";
}
// percentage containers
.app-card-container {
  background-color: var(--v-buttonBlack-base);
  border-bottom: 1px solid var(--v-border-base);
}
.app-card {
  border-radius: 5px;
  letter-spacing: 2px;
  cursor: pointer;
  margin: 0 8px;
  color: #fff;
  height: 70px;
  &-selected {
    background-color: #fff;
    color: black;
  }
  .name {
    font-size: 24px;
    margin-bottom: -5px;
  }
  .percentage {
    font-size: 50px;
    margin-top: -10px;
    margin-bottom: -10px;
  }
  .count {
    font-size: 20px;
    margin-top: -10px;
    color: var(--v-border-base);
  }
}
.app-card-divider {
  background-color: var(--v-border-base);
}
// subheader and selects
.sort-bar-text {
  font-size: 24px;
  color: #fff;
  letter-spacing: 2px;
}
.select-container {
  display: flex;
  align-items: center;
  color: #fff;
  border: 1px solid var(--v-border-base);
  background-color: var(--v-buttonBlack-base);
  padding: 8px 12px;
  position: relative;
  display: inline-block;
  .text {
    margin-right: 8px;
    padding-right: 12px;
    border-right: 1px solid var(--v-border-base);
  }
  .select {
    width: 110px;
    color: var(--v-border-base);
  }
}
.select-container:after {
  content: " ";
  height: 0;
  width: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid #fff;
  position: absolute;
  right: 10px;
  top: 42%;
  transition: all 0.3s linear;
}
.select-container.open:after {
  transform: rotate(-180deg);
  -webkit-transform: rotate(-180deg);
  -moz-transform: rotate(-180deg);
  -o-transform: rotate(-180deg);
}
/*To remove button from IE11, thank you Matt */
select::-ms-expand {
  display: none;
}
// list container styles
.list-container {
  position: relative;
  overflow-y: scroll;
  overflow-x: hidden;
  width: 90%;
  height: 100%;
  scrollbar-color: var(--v-border-base) transparent;
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
.scroll-color-dark {
  scrollbar-color: dark;
}
@media only screen and (max-width: 1260px) {
  .app-card {
    .name,
    .count {
      font-size: 20px;
    }
  }
}
@media only screen and (max-width: 920px) {
  .app-card {
    .name,
    .count {
      font-size: 18px;
    }
    .percentage {
      font-size: 40px;
    }
  }
}
</style>
