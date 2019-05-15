<template>
    <div>
        <v-toolbar flat color="white">
            <v-btn
                fab
                small
                color="error"
                @click="dialog = !dialog"
            >
                <span style="font-size: 1.4rem;">{{ events.length }}</span>
            </v-btn>
            <span class="title">Alerts</span>
    
            <v-spacer></v-spacer>

            <v-btn
                small
                outline
                @click="$router.push({ name: 'cam_details', params: { id: stream.id } })"
                class="ml-auto"
            >
                View Details
            </v-btn>
        </v-toolbar>
        <v-list class="py-0">
            <template v-for="(item, index) in items">
            <v-list-tile
              :key="item.title"
              ripple
              @click="() => {}"
            >
                <v-list-tile-action>
                    <p 
                        class="mb-0 title" 
                        :style="`color:${item.count ? $vuetify.theme.error : 'black'}`">
                        {{ item.count }}
                    </p>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                </v-list-tile-content>

                <!-- <v-list-tile-action>
                    <v-list-tile-action-text>{{ item.action }}</v-list-tile-action-text>
                </v-list-tile-action> -->

            </v-list-tile>
            <v-divider
              v-if="index + 1 < items.length"
              :key="index"
            ></v-divider>
          </template>
        </v-list>
    </div>
</template>
<script>
export default {
    props: {
        stream: {
            type: Object,
            required: true
        },
        events: {
            type: Array,
            required: true
        }
    },
    mounted() {
        const grouped = this.groupBy(this.events, (evt) => evt.detectedObject)
        this.items.forEach(item => {
            item.count = grouped.get(item.title) ? grouped.get(item.title).length : 0
        })
    },
    data: () => ({
        selected: [2],
        items: [
          {
            action: '15 min',
            title: 'Person',
            count: null
          },
          {
            action: '2 hr',
            title: 'Coyote',
            count: null
          },
          {
            action: '6 hr',
            title: 'Rail Car(Loading)',
            count: null
          },
          {
            action: '12 hr',
            title: 'Rail Car(Moving)',
            count: null
          },
          {
            action: '18hr',
            title: 'Operations/Maintenance Inspection',
            count: null
          }
        ],
        timer: null,
    }),
    methods: {
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
        close() {
            this.dialog = false
            setTimeout(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            }, 300)
        },
    }
}
</script>