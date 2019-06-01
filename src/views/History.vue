<template>
    <v-container fluid grid-list-lg class="history-container">
        <template v-if="working">
            <v-layout v-if="working" align-center justify-center>
                <h3 class="white--text">LOADING...</h3>
            </v-layout>
        </template>
        <template v-else>
            <v-layout row wrap>
                    <!-- card row -->
                <v-flex xs10 offset-xs1>
                    <v-layout justify-center align-center>
                        <v-flex class="app-card" v-for="(item, i) in eventTypes" :key="i" @click="selectEventType(item)">
                            <v-layout column align-center>
                                <p class="name text-xs-center">{{ item.name.toUpperCase() }}</p>
                                <p class="percentage">{{ Math.round(percentage(item.count)) || 0 }}%</p>
                                <p class="count">{{ item.count }}</p>
                            </v-layout>
                        </v-flex>
                    </v-layout>
                </v-flex>
                    <!-- sub header bar -->
                <v-flex xs8 offset-xs2 my-4>
                    <v-layout row wrap align-center :class="$vuetify.breakpoint.lgAndUp ? 'justify-space-between' : 'justify-center'">
                        <h3 class="sort-bar-text">{{ selectedEvent.name.toUpperCase() }}S THIS WEEK  ({{ eventTypes['false-alarm'].count }})</h3>
                        <div>
                            <div class="select-container">
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
                        </div>
                    </v-layout>
                </v-flex>
                    <!-- dynamic component -->
                <v-flex xs8 offset-xs2 class="list-container">
                    <component :is="getComponent" :key="selectedEvent.type" :data="eventTypes[selectedEvent.type]"/>
                </v-flex>
            </v-layout>
        </template>
    </v-container>
</template>
<script>
import FalseAlarmList from '@/components/history--false-alarm-list.vue';
import DefaultList    from '@/components/history--default-list.vue';

export default {
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
        sortOptions: ['Last Added', 'Today', 'Last Week', 'All'],
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
                        events: this.eventTypes[cls].events.push(item)
                    };

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
    width: 18%;
    cursor: pointer;
    margin: 0 8px;
    color: #FFF;
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
    padding: 8px 15px;
    margin: 0px 15px;
	position: relative;
	display: inline-block;
    .text {
        margin-right: 10px;
        padding-right: 14px;
        border-right: 1px solid var(--v-border-base);
    }
    .select {
        width: 130px;
        color: var(--v-border-base);
        padding: 0 4px;
    }
}
.select-container:after{
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
.select-container.open:after{
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
    height:400px; 
    overflow: auto;
    &::-webkit-scrollbar {
        background-color: transparent;
        width: 8px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: transparent;
    }
    &:hover {
        &::-webkit-scrollbar-thumb {
            background: #888; 
        }
    }
}
@media only screen and (max-width: 1100px) {
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
