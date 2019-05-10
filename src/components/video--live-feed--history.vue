<template>
  <div>
    <v-toolbar flat>
      <v-toolbar-title>Camera name</v-toolbar-title>
      <!-- <v-divider
        class="mx-2"
        inset
        vertical
      ></v-divider> -->
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
                  <v-text-field v-model="editedItem.name" label="Event No."></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.startTime" label="Start Time"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.endTime" label="End Time"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.duration" label="Duration"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.status" label="Status"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
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
      class="table-selector"
    >
      <template v-slot:items="props">
        <tr 
            :class="props.item.status === 'active' ? 'white--text' : null"
            :active="props.item.status == 'active'" 
            @click="props.item.status = 'active'" 
            :style="props.item.status === 'active' 
                ? `background-color:${$vuetify.theme.accent}` 
                : null">
            <td class="text-xs-center">{{ props.item.name }}</td>
            <td class="text-xs-center">{{ props.item.startTime }}</td>
            <td class="text-xs-center">{{ props.item.endTime }}</td>
            <td class="text-xs-center">{{ props.item.duration }}</td>
            <td class="text-xs-center">{{ props.item.status }}</td>
            <td class="align-center layout px-0">
            <v-btn
                small
                outline
                class="mr-2"
                @click="editItem(props.item)"
                :class="props.item.status === 'active' ? 'white--text' : null"
            >
                {{ props.item.status === 'active' ? 'Inspect' : 'View More' }}
            </v-btn>
            </td>
        </tr>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>
  </div>
</template>
<script>
  export default {
    data: () => ({
      dialog: false,
      headers: [
        { text: '#', align: 'center', sortable: false, value: 'name', width: '1%' },
        { text: 'Start Time', align: 'right', value: 'startTime', sortable: false, width: '1%' },
        { text: 'End Time', align: 'right', value: 'endTime', sortable: false, width: '1%' },
        { text: 'Duration', align: 'right', value: 'duration', sortable: false, width: '1%' },
        { text: 'Status', align: 'right', value: 'status', sortable: false, width: '1%' },
        { text: 'Actions', align: 'center', value: 'name', sortable: false, width: '1%' }
      ],
      events: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        startTime: 0,
        endTime: 0,
        duration: 0,
        status: 0
      },
      defaultItem: {
        name: '',
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
    created() {
      this.initialize();
    },
    mounted() {
      this.startTime();
    },
    destroyed() {
        clearInterval(this.timer)
    },
    methods: {
      initialize() {
        this.events = [
          {
            id: 100,
            name: '01',
            startTime: 159,
            endTime: 6.0,
            duration: 24,
            status: 'active'
          },
          {
            name: '02',
            startTime: 237,
            endTime: 9.0,
            duration: 37,
            status: 'closed'
          },
          {
            name: '03',
            startTime: 262,
            endTime: 16.0,
            duration: 23,
            status: 'closed'
          },
          {
            name: '04',
            startTime: 305,
            endTime: 3.7,
            duration: 67,
            status: 'closed'
          },
          {
            name: '05',
            startTime: 356,
            endTime: 16.0,
            duration: 49,
            status: 'closed'
          },
          {
            name: '06',
            startTime: 375,
            endTime: 0.0,
            duration: 94,
            status: 'pending'
          },
          {
            name: '07',
            startTime: 392,
            endTime: 0.2,
            duration: 98,
            status: 'active'
          },
          {
            name: '08',
            startTime: 408,
            endTime: 3.2,
            duration: 87,
            status: 'pending'
          },
          {
            name: '09',
            startTime: 452,
            endTime: 25.0,
            duration: 51,
            status: 'closed'
          },
          {
            name: '10',
            startTime: 518,
            endTime: 26.0,
            duration: 65,
            status: 'closed'
          }
        ]
      },
      editItem(item) {
          if(item.status === 'active') {
              this.$router.push({ name: 'cam_details', params: { id: item.id } })
                return;
          }
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

      save() {
        if (this.editedIndex > -1) {
          Object.assign(this.events[this.editedIndex], this.editedItem)
        } else {
          this.events.push(this.editedItem)
        }
        this.close()
      },
      startTime() {
        var today = new Date();
        var h = today.getHours();
        var m = today.getMinutes();
        var s = today.getSeconds();

        this.$refs.time.innerHTML =
        h + ":" + m.toString().padStart(2,'0') + ":" + s.toString().padStart(2,'0');

        // TODO clear this on destroy
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