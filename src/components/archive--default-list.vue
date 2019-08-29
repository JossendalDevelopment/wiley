<notes>
TODO REMOVE classifiying logic. Being handled in <archive--list-item />
</notes>
<template>
  <v-container grid-list-xs fluid>
    <v-layout justify-center v-if="data.events.length === 0">
      <span
        style="color:white; font-family: DIN Condensed; font-size: 30px;"
      >THERE ARE NO EVENTS FOR {{ data.type.toUpperCase() }}S</span>
    </v-layout>
    <v-layout v-else row wrap>
      <v-flex xs12 sm6 md4 lg3 xl2 ma-0 pa-0 v-for="(evt) in data.events" :key="evt.id + 'default'">
        <archive--list-item :event="evt" v-on:update="$emit('update')" />
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import ArchiveListItem from "@/components/archive--list-item.vue";
import AppDialog from "@/components/app-dialog.vue";

import format from "date-fns/format";

export default {
  components: {
    "archive--list-item": ArchiveListItem,
    "app-dialog": AppDialog
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  }
};
</script>
