<notes>
    A tabs based layout for the controls sidebar related to the details view.
    TODO needs a custom date picker - or rather a day incrementer/decrementer
</notes>
<template>
    <v-layout column style="height:100%; background-color:#FFF;">
        <v-layout justify-space-between align-center px-4 py-3 style="max-height:60px;">
            <v-icon @click="() => {}">fas fa-chevron-left</v-icon>
            <span>May 31, 2019</span>
            <v-icon @click="() => {}">fas fa-chevron-right</v-icon>
        </v-layout>
        <v-tabs
            v-model="currentTab"
            centered
            grow
            slider-color="secondary"
        >
            <v-tab v-for="i in ['New', 'Reviewed']" :key="i" >
                <v-badge color="error">
                    <template v-if="i == 'New'" v-slot:badge>
                        {{ events.length }}
                    </template>
                    <span>{{ i }}</span>
                </v-badge>
            </v-tab>
        </v-tabs>

        <v-tabs-items v-model="currentTab">
            <v-tab-item v-for="i in ['new', 'reviewed']" :key="i" >
                <!-- TODO make this list a 'new-events' component  -->
                <v-list v-if="!working">
                    <v-list-group
                        v-for="item in items"
                        :key="item.title"
                        v-model="item.active"
                        no-action
                    >
                        <template v-slot:activator>
                            <v-list-tile>
                                <v-list-tile-content>
                                    <v-list-tile-title>{{ item[0] }} - {{ item[1].length }}</v-list-tile-title>
                                </v-list-tile-content>
                            </v-list-tile>
                        </template>

                        <v-list-tile
                            v-for="subItem in item[1]"
                            :key="subItem.title"
                            @click="() => {}"
                            class="nested-list-item"
                        >
                            <v-list-tile-action>
                                <span :style="`color:${$vuetify.theme.error}`">{{ subItem.id }}</span>
                            </v-list-tile-action>

                            <v-list-tile-content>
                                <v-list-tile-title>{{ subItem.startTime }} - {{ subItem.endTime}}</v-list-tile-title>
                            </v-list-tile-content>

                            <v-list-tile-action>
                                <span style="font-size:.8rem;">({{ subItem.duration }} sec)</span>
                            </v-list-tile-action>
                        </v-list-tile>
                    </v-list-group>
                </v-list>

            </v-tab-item>
        </v-tabs-items>
    </v-layout>
</template>
<script>
export default {
    props: {
        events: {
            type: Array,
            required: true
        }
    },
    data: () => ({
        currentTab: null,
        working: true,
        items: [ ]
    }),
    mounted() {
        const grouped = this.groupBy(this.events, (evt) => evt.detectedObject);
        this.items = grouped;
        this.working = false;
    },
    methods: {
        // TODO this function is being duplicated in video--live-feed--history2.vue - abstract it
        groupBy(list, keyGetter) {
            const map = new Map();
            list.forEach((item) => {
                const key = keyGetter(item);
                const collection = map.get(key);
                if (!collection) {
                    map.set(key, [item]);
                } else {
                    collection.push(item);
                }
            });
            return map;
        },
    },
}
</script>
<style>
/* overrides the nested list items default padding */
.nested-list-item > a {
    padding-left: 1rem !important;
}
</style>
