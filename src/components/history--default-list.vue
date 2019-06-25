<template>
  <v-container grid-list-xs>
    <v-layout justify-center v-if="data.events.length === 0">
      <span
        style="color:white; font-family: DIN Condensed; font-size: 30px;"
      >THERE ARE NO EVENTS FOR {{ data.type.toUpperCase() }}S</span>
    </v-layout>
    <v-layout v-else row wrap>
      <v-flex xs6 d-flex v-for="(evt) in data.events" :key="evt.eventId">
        <app-list-item small>
          <v-img
            slot="list-image"
            contain
            :aspect-ratio="1/1"
            class="app-list-item-image"
            :src="evt.staticImageThumb"
          ></v-img>
          <span slot="list-info-top-left">{{ evt.camName.toUpperCase() }}</span>
          <span
            slot="list-info-top-right"
            class="app-list-item-date"
          >{{ getDateTime(evt).toUpperCase() }}</span>
          <span
            slot="list-info-bottom-left"
            class="app-list-item-username"
          >{{ $auth.user.email.toUpperCase() }}</span>
          <v-btn flat small slot="list-info-bottom-right" class="app-list-item-button">EDIT</v-btn>
        </app-list-item>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import appListItem from "@/components/app-list-item.vue";
import format from "date-fns/format";

export default {
  components: {
    "app-list-item": appListItem
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  methods: {
    getDateTime(evt) {
      return format(new Date(evt.timestamp._seconds), "MMM DD HH:MM:SSs");
    }
  }
};
</script>
<style lang="scss" scoped>
.app-list-item {
  &-image {
    margin: 0 auto;
  }
  &-username {
    font-size: 16px;
    color: var(--v-border-base);
  }
  &-date {
    font-size: 16px;
  }
  &-button {
    border: 1px solid var(--v-border-base);
    background-color: var(--v-buttonBlack-base);
    color: var(--v-border-base);
    min-width: 0;
    font-size: 14px;
    padding-right: 4px;
    margin: 0;
  }
}
</style>
