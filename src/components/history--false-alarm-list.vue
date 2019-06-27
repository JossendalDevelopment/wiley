<template>
  <v-container>
    <v-layout justify-center v-if="data.events.length === 0">
      <span
        style="color:white; font-family: DIN Condensed; font-size: 30px;"
      >THERE ARE NO EVENTS FOR {{ data.type.toUpperCase() }}S</span>
    </v-layout>
    <v-layout v-else row wrap justify-center>
      <v-flex xs12 v-for="(evt) in data.events" :key="evt.eventId">
        <app-list-item>
          <v-img
            slot="list-image"
            contain
            :aspect-ratio="1/1"
            class="app-list-item-image"
            :src="evt.staticImageThumb"
          ></v-img>
          <span slot="list-info-top-left" class="app-list-item-username">{{ $auth.user.email }}</span>
          <span slot="list-info-top-right" class="app-list-item-date">{{ getDate(evt) }}</span>
          <span
            slot="list-info-bottom-left"
            class="app-list-item-content"
            v-trim="90"
          >{{ evt.confirmationDescription }}</span>
          <!-- <span slot="list-info-bottom-right"  -->
          <!-- class="app-list-item-date">{{ getDate(evt) }}</span> -->
        </app-list-item>
        <!-- <v-card flat class="app-list-item">
                    <v-layout>
                        <v-flex xs2 class="app-list-item-image-container">
                            <v-img
                                contain
                                :aspect-ratio="1/1"
                                class="app-list-item-image"
                                :src="evt.staticImageThumb"
                            ></v-img> 
                        </v-flex>
                        <v-flex xs10 class="app-list-item-info-container">
                            <v-card-text>
                                <v-layout row justify-space-between>
                                    <p class="app-list-item-username">{{ $auth.user.email }}</p>
                                    <p class="app-list-item-date">{{ getDate(evt) }}</p>

                                </v-layout>
                            </v-card-text>
                            <v-card-text class="app-list-item-content">{{ evt.confirmationDescription }}</v-card-text>
                        </v-flex> 


                    </v-layout>
        </v-card>-->
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
    getDate(evt) {
      return format(new Date(evt.timestamp.seconds), "MMM DD");
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
    margin-bottom: 0px;
  }
  &-date {
    color: var(--v-border-base);
    margin-bottom: 0px;
  }
  &-content {
    padding-top: 0px;
    font-size: 16px;
  }
}
</style>
