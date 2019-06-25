<notes>
    This component currently handles lists for all history/archive items except for
    false alarm types, which need to display a reason for marking as false alarm. These two will
    likey be merged in the future. They both make use of a default `app-list-item` and slots. 
</notes>
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
          <v-btn
            flat
            small
            slot="list-info-bottom-right"
            class="app-list-item-button"
            @click="openEditModal(evt)"
          >EDIT</v-btn>
        </app-list-item>
      </v-flex>
    </v-layout>
    <!-- EDIT modal  -->
    <app-dialog
      ref="editmodal"
      max-width="500"
      lazy
      v-on:closed="() => null"
      v-on:opened="() => null"
    >
      <template slot="modaltitle">CHANGE CLASSIFICATION</template>
      <template slot="modalcontent">
        <v-layout class="modal-content">
          <v-flex xs4 ma-3 mt-4>
            <v-img
              slot="list-image"
              contain
              :aspect-ratio="1/1"
              class="edit-modal-image"
              :src="selectedForEdit && selectedForEdit.staticImageThumb"
            ></v-img>
          </v-flex>
          <v-flex xs8 pa-3>
            <v-btn
              block
              flat
              class="classification-btn"
              @click="() => setNewClass('employee')"
              :style="newClass === 'employee' ? selectedClass : ''"
            >employee</v-btn>
            <v-btn
              block
              flat
              class="classification-btn"
              @click="() => setNewClass('contractor')"
              :style="newClass === 'contractor' ? selectedClass : ''"
            >contractor</v-btn>
            <v-btn
              block
              flat
              class="classification-btn"
              @click="() => setNewClass('intruder')"
              :style="newClass === 'intruder' ? selectedClass : ''"
            >intruder</v-btn>
            <v-btn
              block
              flat
              class="classification-btn"
              @click="() => setNewClass('animal')"
              :style="newClass === 'animal' ? selectedClass : ''"
            >animal</v-btn>
            <v-btn
              block
              flat
              class="classification-btn"
              @click="() => openFalseAlarmModal()"
              :style="newClass === 'falsealarm' ? selectedClass : ''"
            >false alarm</v-btn>
          </v-flex>
        </v-layout>
      </template>
      <v-btn
        slot="detailsButton"
        dark
        style="background-color:#FFF; color:black;"
        :disabled="false"
        @click="saveEdits()"
      >Confirm</v-btn>
    </app-dialog>
  </v-container>
</template>
<script>
import AppListItem from "@/components/app-list-item.vue";
import AppDialog from "@/components/app-dialog.vue";

import format from "date-fns/format";

export default {
  components: {
    "app-list-item": AppListItem,
    "app-dialog": AppDialog
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    selectedForEdit: null,
    newClass: null
  }),
  computed: {
    selectedClass() {
      return "color: var(--v-buttonBlack-base); background-color: #FFF;";
    }
  },
  methods: {
    getDateTime(evt) {
      return format(new Date(evt.timestamp._seconds), "MMM DD HH:MM:SS");
    },
    setNewClass(type) {
      this.newClass = type;
    },
    openEditModal(evt) {
      console.log("E", evt);
      this.newClass = evt.classifiedAs;
      this.selectedForEdit = evt;
      this.$refs.editmodal.open();
    },
    openFalseAlarmModal() {
      this.newClass = "falsealarm";
      // TODO bring in false alarm modal from details.vue
    },
    saveEdits() {
      console.log("NEW CLASSIFICATION", this.newClass);
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
.modal-content {
  border: 1px solid var(--v-border-base);
  background-color: var(--v-buttonBlack-base);
}
.edit-modal-image {
  //   margin: 10px;
}
.classification-btn {
  border: 1px solid var(--v-border-base);
  background-color: var(--v-buttonBlack-base);
  color: #fff;
}
</style>
