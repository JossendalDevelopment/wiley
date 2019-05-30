<template>
    <v-container fill-height class="history-container">
        <v-layout v-if="working" align-center justify-center>
            <h3 class="white--text">LOADING...</h3>
        </v-layout>
        <v-layout v-else column>
<!-- this layout needs revisiting -->
            <v-layout justify-center align-start style="height: 100px;">
                <v-flex class="app-card" offset-xs1 v-for="(item, i) in eventTypes" :key="i">
                    <v-layout column align-center>
                        <p class="name">{{ item.name.toUpperCase() }}</p>
                        <p class="percentage">{{ Math.round(percentage(item.count)) }}%</p>
                        <p class="count">{{ item.count }}</p>
                    </v-layout>
                </v-flex>
            </v-layout>
            <v-layout column justify-center align-center>
                <!-- sortable sub header bar -->
                <v-layout align-center justify-center mb-5>
                    <h3 class="sort-bar-text">FALSE ALARMS THIS WEEK  ({{ eventTypes['false-alarm'].count }})</h3>
                    <div class="select-container">
                        <span class="text">SHOW ONLY</span>
                        <select class="select" @change="filterByType($event)">
                            <option v-for="item in filterOptions" :key="item">{{ item }}</option>
                        </select>
                    </div>
                    <div class="select-container">
                        <span class="text">ARRANGE BY</span>
                        <select class="select" @change="filterByProp($event)">
                            <option v-for="item in sortOptions" :key="item">{{ item }}</option>
                        </select>
                    </div>
                </v-layout>
                <v-flex xs10 v-for="x in 8" :key="x" class="false-alarm-container">
                    <h3>DIV</h3>
                </v-flex>
            </v-layout>
        </v-layout>
    </v-container>
</template>
<script>

export default {
    data: () => ({
        events: [],
        working: true,
        eventTypes: { 
            'employee': {name: 'Employee', count:0},
            'non-emplyoee': {name: 'Non-Employee', count:0},
            'contractor': {name: 'Contractor', count:0},
            'coyote': {name: 'Coyote', count:0},
            'false-alarm': {name: 'False Alarm', count:0},
        },
        filterOptions: ['This Week', 'Bar', 'Fizz', 'Buzz'],
        sortOptions: ['Last Added', 'Bar', 'Fizz', 'Buzz'],
    }),
    mounted() {
        // cache this response
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
                })
                this.working = false;
            })
    },
    methods: {
        percentage(value) {
            return (100 * value) / this.events.length;
        },
        filterByType(e) {
            console.log(e.target.value)
        },
        filterByProp(e) {
            console.log(e.target.value)
        }
    }
}
</script>
<style lang="scss" scoped>
.history-container {
    background-color: var(--v-secondaryDark2-base);
    font-family: 'DIN Condensed';
}
.app-card {
    background-color: var(--v-buttonBlack-base);
    border: 1px solid var(--v-border-base);
    letter-spacing: 2px;
    padding: 15px;
    width: 18%;
    // height: 200px;
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
.false-alarm-container {
    border: 1px solid var(--v-border-base);
    height: 200px;
    width: 70%;
}
</style>
