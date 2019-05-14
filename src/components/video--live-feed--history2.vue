<template>
    <div>
        <v-toolbar flat :style="`background-color:${$vuetify.theme.primary}`">
            <v-btn
                fab
                small
                color="error"
                @click="dialog = !dialog"
            >
                <span style="font-size: 1.4rem;">11</span>
            </v-btn>
            <span class="title">Alerts</span>
    
            <v-spacer></v-spacer>

            <v-btn
                small
                outline
                @click="editItem(props.item)"
                class="ml-auto"
            >
                View Details
            </v-btn>
        </v-toolbar>
        <v-list :style="`background-color:${$vuetify.theme.primary}`">
            <template v-for="(item, index) in items">
            <v-list-tile
              :key="item.title"
              ripple
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
    data: () => ({
        selected: [2],
        items: [
          {
            action: '15 min',
            title: 'Person',
            count: 7
          },
          {
            action: '2 hr',
            title: 'Coyote',
            count: 0
          },
          {
            action: '6 hr',
            title: 'Rail Car(Loading)',
            count: 3
          },
          {
            action: '12 hr',
            title: 'Rail Car(Moving)',
            count: 1
          },
          {
            action: '18hr',
            title: 'Operations/Maintenance Inspection',
            count: 0
          }
        ],
        timer: null,
    }),
    methods: {
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