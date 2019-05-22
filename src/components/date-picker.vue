<template>
  <v-layout row wrap align-center>
      <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        :nudge-right="40"
        :return-value.sync="date"
        lazy
        transition="scale-transition"
        offset-y
        full-width
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
            <v-layout align-center justify-space-around>
                <v-icon @click="decrementDay()">fas fa-chevron-left</v-icon>
                <h4>{{ formatDate }}</h4>
                <v-icon v-on="on">far fa-calendar-alt</v-icon>
                <v-icon @click="incrementDay()">fas fa-chevron-right</v-icon>
            </v-layout>
        </template>
        <v-date-picker v-model="date" no-title scrollable>
          <v-spacer></v-spacer>
          <v-btn flat color="secondary" @click="menu = false">Cancel</v-btn>
          <v-btn flat color="secondary" @click="$refs.menu.save(date)">OK</v-btn>
        </v-date-picker>
      </v-menu>
  </v-layout>
</template>
<script>
import addDays from 'date-fns/add_days';
import subDays from 'date-fns/sub_days'
import format from 'date-fns/format';

export default {
    data: () => ({
        date: new Date().toISOString().substr(0, 10),
        menu: false,
    }),
    methods: {
        incrementDay() {
            let d = addDays(new Date(this.date), 1)
            this.date = d.toISOString().substr(0, 10)
        },
        decrementDay() {
            let d = subDays(new Date(this.date), 1)
            this.date = d.toISOString().substr(0, 10)
        },
    },
    computed: {
        formatDate() {
            return format(this.date, "MMM-DD YYYY");
        }
    },
    watch: {
        date() {
            // async fetch event data by date but probably not good to do it in watcher
            console.log("New date", this.date)
        }
    }
}
</script>