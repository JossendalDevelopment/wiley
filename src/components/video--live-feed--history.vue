<notes>
    A table based version for showing most recent events related to a particular camera.
    Being kept pending a finalized ui. NOT CURRENTLY IN USE
</notes>
<template>
    <div>
        <v-toolbar flat>
            <v-toolbar-title>{{ stream.camName }}</v-toolbar-title>
    
            <v-dialog v-model="dialog" max-width="500px">
                <template v-slot:activator="{ on }">
                    <v-btn flat small v-on="on">settings</v-btn>
                </template>
                <v-card>
                    <v-card-title>
                        <span class="headline">{{ formTitle }}</span>
                    </v-card-title>

                    <v-card-text>
                        <v-container grid-list-md>
                            <v-layout wrap>
                                <v-flex xs12 sm6 md4>
                                    <h3>Additional details</h3>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="accent" flat outline @click="close">Cancel</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>

            <v-spacer></v-spacer>
            <p class="mb-0 font-weight-bold headline" :style="`color:${$vuetify.theme.accent}`">LIVE</p>
            <p class="mb-0 pl-1" ref="time"></p>
        </v-toolbar>
        <v-data-table
            :headers="headers"
            :items="events"
        >
        <template v-slot:items="props">
            <template  v-if="stream.id == props.item.camId">
            <tr 
                v-if="$cameraAlert.alertData.id == props.item.id"
                class="white--text"
                :active="props.item.status == 'active'" 
                :style="`background-color:${$vuetify.theme.accent}`">
                <td class="text-xs-center">{{ props.item.id }}</td>
                <td class="text-xs-center">{{ props.item.startTime }}</td>
                <td class="text-xs-center">{{ props.item.endTime }}</td>
                <td class="text-xs-center">{{ props.item.duration }}</td>
                <td class="text-xs-center">{{ props.item.status }}</td>
                <td class="align-center layout px-0">
                    <v-btn
                        small
                        outline
                        style="width:95%;"
                        @click="editItem(props.item)"
                        class="ml-auto white--text"
                    >
                        {{ props.item.status === 'active' ? 'Inspect' : 'View Details' }}
                    </v-btn>
                </td>
            </tr>
            <tr v-else>
                <td class="text-xs-center">{{ props.item.id }}</td>
                <td class="text-xs-center">{{ props.item.startTime }}</td>
                <td class="text-xs-center">{{ props.item.endTime }}</td>
                <td class="text-xs-center">{{ props.item.duration }}</td>
                <td class="text-xs-center">{{ props.item.status }}</td>
                <td class="align-center layout px-0">
                    <v-btn
                        small
                        outline
                        style="width:95%;"
                        class="ml-auto"
                        @click="editItem(props.item)"
                    >
                        {{ props.item.status === 'active' ? 'Inspect' : 'View Details' }}
                    </v-btn>
                </td>
            </tr>
            </template>
        </template>
            <template v-slot:no-data>
                <v-alert :value="true" color="error" icon="warning">
                    No events have been logged yet
                </v-alert>
            </template>
            <!-- <template v-slot:footer>
                <td :colspan="headers.length" class="mx-auto text-xs-center">
                    <strong>View History</strong>
                </td>
            </template> -->
        </v-data-table>
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
        dialog: false,
        headers: [
            { text: '#', align: 'center', sortable: false, value: 'id', width: '1%' },
            { text: 'Start Time', align: 'right', value: 'startTime', sortable: false, width: '1%' },
            { text: 'End Time', align: 'right', value: 'endTime', sortable: false, width: '1%' },
            { text: 'Duration', align: 'right', value: 'duration', sortable: false, width: '1%' },
            { text: 'Status', align: 'right', value: 'status', sortable: false, width: '1%' },
            { text: 'Actions', align: 'center', value: 'actions', sortable: false, width: '1%' }
        ],
        editedIndex: -1,
        editedItem: {
            id: '',
            startTime: 0,
            endTime: 0,
            duration: 0,
            status: 0
        },
        defaultItem: {
            id: '',
            startTime: 0,
            endTime: 0,
            duration: 0,
            status: 0
        },
        timer: null,
    }),
    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'Settings' : 'Item Details'
        }
    },
    watch: {
        dialog(val) {
            val || this.close()
        }
    },
    mounted() {
        // TODO get all event data from firestore for this camera/stream ID number
        this.startTime();
    },
    destroyed() {
        clearInterval(this.timer)
    },
    methods: {
        editItem(item) {
            if(item.status === 'active') {
                this.$router.push({ name: 'cam_details', params: { id: item.camId } })
                return;
            }
            // remove editing functionality in place of alert detail
            this.editedIndex = this.events.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },
        close() {
            this.dialog = false
            setTimeout(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            }, 300)
        },
        startTime() {
            var today = new Date();
            var h = today.getHours();
            var m = today.getMinutes();
            var s = today.getSeconds();

            this.$refs.time.innerHTML =
            h + ":" + m.toString().padStart(2,'0') + ":" + s.toString().padStart(2,'0');

            this.timer = setTimeout(this.startTime, 500);
        }
    }
}
</script>
<style scoped>
table.v-table thead th:first-child {
    padding: 0 10px !important;
}
table.v-table {
    border-radius: 0px !important;
}
</style>