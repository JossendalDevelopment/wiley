<notes>
</notes>
<template>
  <v-container fill-height fluid pa-0 ml-0 mr-0 grid-list-lg class="history-container">
    <template v-if="$events.loading">
      <app-loading-spinner />
    </template>
    <template v-else>
      <v-layout column>
        <!-- selectable card row -->
        <v-flex shrink>
          <v-layout justify-center align-center class="app-card-container" pa-2>
            <template v-for="(item, i) in counts">
              <v-flex
                xs4
                d-flex
                class="app-card"
                :class="selectedType === i ? 'app-card-selected' : ''"
                :key="i + 'card'"
                @click="selectEventType(i)"
              >
                <v-layout align-center>
                  <v-flex py-0>
                    <p class="name mb-0">{{ i.toUpperCase() }}S</p>
                    <p class="count mb-0">{{ item || 0}}</p>
                  </v-flex>
                  <v-flex pa-0 pr-1 text-xs-right style="margin-bottom: -10px;">
                    <p class="percentage mb-0">{{ Math.round(percentage(item)) || 0 }}%</p>
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

        <!-- sub header bar -->
        <v-flex px-4 pb-0 mt-2 shrink>
          <v-layout
            wrap
            my-2
            style="padding-left: 16px; padding-right: 21px;"
            align-center
            :class="$vuetify.breakpoint.lgAndUp ? 'justify-space-between' : 'justify-center'"
          >
            <v-flex xs5>
              <v-layout justify-start>
                <h3 class="sort-bar-text">
                  {{ currentFilter.replace(/_/, ' ').toUpperCase()}}{{ currentFilter !== 'all' ? 'S' : null}}
                  {{ selectedType.toUpperCase() }}S
                  ({{ eventTypeCount || 0 }})
                </h3>
              </v-layout>
            </v-flex>
            <v-flex xs7>
              <v-layout justify-end>
                <div class="select-container">
                  <span class="text">SHOW ONLY</span>
                  <select class="select" :value="currentFilter" @change="filterBy($event)">
                    <option
                      v-for="item in filterOptions"
                      :value="item.value"
                      :key="item.text"
                    >{{ item.text }}</option>
                  </select>
                </div>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-flex>

        <v-flex pt-0 @scroll="onScroll" ref="scrollDiv" class="list-container">
          <archive--default-list
            :data="eventTypes[selectedType]"
            v-on:update="updateListItems(currentFilter)"
          />
        </v-flex>
      </v-layout>
    </template>
  </v-container>
</template>
<script>
import AppLoadingSpinner from "@/components/app-loading-spinner.vue";
import DefaultList from "@/components/archive--default-list.vue";

import EventTypes from "@/types/eventTypes";

export default {
  components: {
    "app-loading-spinner": AppLoadingSpinner,
    "archive--default-list": DefaultList
  },
  data: () => ({
    totalEvents: [],
    eventTypes: new EventTypes(),
    eventTypeCount: null,
    selectedType: "employee",
    currentFilter: "all",
    filterOptions: [
      { text: "All", value: "all" },
      { text: "Today", value: "today" },
      { text: "This Week", value: "current_week" },
      { text: "Last Week", value: "last_week" }
    ],
    counts: {}
  }),
  created() {
    this.$events.startLoading();
  },
  mounted() {
    this.getEventsCountByType();
    this.fetchHistory();
  },
  methods: {
    onScroll({ target: { scrollTop, clientHeight, scrollHeight } }) {
      if (scrollTop + clientHeight >= scrollHeight) {
        this.fetchHistory();
      }
    },
    scrollToBottom() {
      var container = this.$refs.scrollDiv;
      container.scrollTop = container.scrollHeight;
    },
    updateListItems(filter) {
      this.getEventsCountByType();
      //   this.fetchHistory(filter);
      this.resetFilteredEvents(filter);
    },
    filterBy(e) {
      this.currentFilter = e.target.value;
      this.resetFilteredEvents(e.target.value);
    },
    resetFilteredEvents(newVal) {
      this.$events.startLoading();
      this.eventTypes = new EventTypes();
      this.fetchHistory(newVal);
    },
    async fetchHistory(filteredBy = null) {
      try {
        const current = this.selectedType;
        const fetchCount = 20;

        // stop fetching if we are already showing all available events for the current type
        if (
          this.eventTypeCount &&
          this.eventTypes[current].events.length !== 0 &&
          this.eventTypeCount != 0 &&
          this.eventTypes[current].events.length >= this.eventTypeCount
        ) {
          this.$events.stopLoading();
          return;
        }

        // if we change the search filter param, reset page back to 0
        if (filteredBy) this.eventTypes[current].page = 0;

        const response = await this.$events.getArchivedEventsByType({
          type: current,
          limit: fetchCount,
          page: this.eventTypes[current].page,
          filteredBy: filteredBy
        });

        // handle rejection
        if (response.status && response.status === 500) {
          this.$notifyError(
            "ERROR GETTING ARCHIVED EVENTS. PLEASE TRY AGAIN LATER"
          );
          this.$events.stopLoading();
          return;
        }

        let events = response.events;
        this.eventTypeCount = response.count;

        // clarification: this takes the query results array and creates an object of
        // objects aggregated by type so each type maintains it's own data.
        // EventTypes {
        //     animal: {
        //         name: String,
        //         page: Number
        //         type: String,
        //         events: Array
        //     },
        //     intruder: (...)
        //     contractor: (...)
        //     employee: (...)
        //     false-alarm: (...)
        // }

        // add newly fetched events to their respective type
        events.forEach(event => {
          let cls = event.user_classification;
          // push any new events
          this.eventTypes[cls].events.push(event);
        });

        // if its not the first page, scroll to bottom
        if (this.eventTypes[current].page > 0) {
          this.scrollToBottom();
        }

        // increment the page
        if (events.length >= fetchCount) {
          this.eventTypes[current].page++;
        }

        this.$events.stopLoading();
      } catch (error) {
        console.error("ERROR GETTING ALL EVENTS", error);
        this.$events.stopLoading();
        this.$notifyError("ERROR FINDING EVENT HISTORY");
      }
    },
    async getEventsCountByType() {
      const response = await this.$events.getEventsCount();
      this.counts = response[0];
    },
    percentage(value) {
      return (100 * value) / this.getTotalEvents;
    },
    selectEventType(event) {
      this.selectedType = event;
      this.fetchHistory();
    }
  },
  computed: {
    getTotalEvents() {
      let counter = 0;
      for (let e in this.counts) {
        counter += +this.counts[e];
      }
      return counter;
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
  border-radius: 2px;
  letter-spacing: 1.1px;
  cursor: pointer;
  margin: 0 8px;
  color: #fff;
  height: 60px;
  &-selected {
    background-color: #fff;
    color: black;
  }
  .name {
    font-size: 18px;
    margin-bottom: -5px;
  }
  .percentage {
    font-size: 40px;
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
  width: 100%;
  //   height: 100%;
  height: 80vh;
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
