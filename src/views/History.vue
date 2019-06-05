<template>
    <v-container fill-height pb-0 grid-list-lg class="history-container">
        <template v-if="working">
            <app-loading-spinner />
        </template>
        <template v-else>
            <v-layout column align-center>
                <!-- card row -->
                <v-flex style="width:90%;" mt-2 shrink>
                    <v-layout justify-center align-center>
                        <v-flex 
                            xs4 
                            class="app-card" 
                            :class="selectedEvent.type === item.type ? 'app-card-selected' : ''"
                            v-for="(item, i) in eventTypes" 
                            :key="i" 
                            @click="selectEventType(item)">
                            <v-layout column align-center>
                                <p class="name text-xs-center">{{ item.name.toUpperCase() }}</p>
                                <p class="percentage">{{ Math.round(percentage(item.count)) || 0 }}%</p>
                                <p class="count">{{ item.count }}</p>
                            </v-layout>
                        </v-flex>
                    </v-layout>
                </v-flex>
                <!-- sub header bar -->
                <v-flex style="width:90%;" shrink>
                    <v-layout wrap my-2 px-2 align-center :class="$vuetify.breakpoint.lgAndUp ? 'justify-space-between' : 'justify-center'">
                        <v-flex xs5>
                            <v-layout justify-start>
                                <h3 class="sort-bar-text">{{ selectedEvent.name.toUpperCase() }}S THIS WEEK  ({{ eventTypes[selectedEvent.type].count }})</h3>
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
                <v-flex style="width:90%; position:relative; height:100%;" class="list-container">
                    <component :is="getComponent" :key="selectedEvent.type" :data="eventTypes[selectedEvent.type]" style="position:absolute; top:0px; left:0px; right:0px; padding:8px; padding-right:0px;"/>
                </v-flex>
            </v-layout>
        </template>
    </v-container>
</template>
<script>
import AppLoadingSpinner from '@/components/app-loading-spinner.vue';
import FalseAlarmList    from '@/components/history--false-alarm-list.vue';
import DefaultList       from '@/components/history--default-list.vue';

export default {
    components: {
        'app-loading-spinner': AppLoadingSpinner
    },
    data: () => ({
        events: [],
        working: true,
        eventTypes: { 
            'employee': {name: 'Employee', type: 'employee', count:0, events: [] },
            'non-employee': {name: 'Non-Employee', type: 'non-employee', count:0, events: [] },
            'contractor': {name: 'Contractor', type: 'contractor', count:0, events: [] },
            'coyote': {name: 'Coyote', type: 'coyote', count:0, events: [] },
            'false-alarm': {name: 'False Alarm', type: 'false-alarm', count:0, events: [] },
        },
        selectedEvent: {name: 'Coyote', type: 'coyote', count:0},
        filterOptions: ['This Week', 'Today', 'Last Week', 'All'],
        sortOptions: ['Recent', 'User', 'Camera', 'All'],
    }),
    mounted() {
        // TODO cache this response
        this.$events.getAllClassifiedEvents()
            .then(resp => {
                this.events = resp.data;
                // sort out events by their classification
                this.events.forEach(item => {
                    let cls = item.classifiedAs;
                    this.eventTypes[cls] = {
                        ...this.eventTypes[cls],
                        count: this.eventTypes[cls].count ? this.eventTypes[cls].count += 1 : 1,
                    };
                    this.eventTypes[cls].events.push(item)
                })
                this.working = false;
            })
    },
    methods: {
        percentage(value) {
            return (100 * value) / this.events.length;
        },
        filterBy(e) {
            console.log(e.target.value)
        },
        sortBy(e) {
            console.log(e.target.value)
        },
        selectEventType(event) {
            this.selectedEvent = event;
        }
    },
    computed: {
        getComponent() {
            if(this.selectedEvent.type === 'false-alarm') {
                return FalseAlarmList;
            } 
            return DefaultList;
        }
    }
}
</script>
<style lang="scss" scoped>
.history-container {
    background-color: var(--v-secondaryDark2-base);
    font-family: 'DIN Condensed';
}
// percentage containers
.app-card {
    background-color: var(--v-buttonBlack-base);
    border: 1px solid var(--v-border-base);
    letter-spacing: 2px;
    padding: 15px;
    cursor: pointer;
    margin: 0 8px;
    color: #FFF;
    &-selected {
        filter: invert(1);
    }
    .name {
        font-size: 24px;
        margin-bottom: -12px;
    }
    .percentage {
        font-size: 80px;
        margin-bottom: -12px;
    }
    .count {
        font-size: 20px;
        margin-bottom: 0px;
        color: var(--v-border-base);
    }
}
// subheader and selects
.sort-bar-text {
    font-size: 24px;
    color: #FFF;
    letter-spacing: 2px;
}
.select-container {
    display: flex;
    align-items: center;
    color: #FFF;
    border: 1px solid var(--v-border-base);
    background-color: var(--v-buttonBlack-base);
    padding: 8px 12px;
    // margin: 0px 15px 0px;
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
	border-top: 5px solid #FFF;
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
    width:90%; 
    height:100%;
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
        .name {
            font-size: 20px;
        }
    }
}
@media only screen and (max-width: 920px) {
    .app-card {
        .name {
            font-size: 18px;
        }
    }
}
</style>
