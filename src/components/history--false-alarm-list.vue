<notes>
    This component currently handles lists for all history/archive
    false alarm types, which need to display a reason for marking as false alarm. This is almost identical to `history--default-list`
    likey be merged in the future. They both make use of a default `app-list-item` and slots. 
</notes>
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
          >{{ evt.classificationDescription }}</span>
          <v-btn
            flat
            small
            slot="list-info-bottom-right"
            class="app-list-item-button"
            @click="openEditModal(evt)"
          >EDIT</v-btn>
          <!-- class="app-list-item-date">{{ getDate(evt) }}</span> -->
        </app-list-item>
      </v-flex>
    </v-layout>

    <!-- Begin onerous modals section -->
    <!-- EDIT modal  -->
    <app-dialog ref="editmodal" max-width="500" lazy v-on:opened="() => null">
      <template slot="modaltitle">CHANGE CLASSIFICATION</template>
      <template slot="modalcontent">
        <v-layout class="modal-background">
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
              :style="newClass === 'false-alarm' ? selectedClass : ''"
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
    <!-- Sweet double modal action!!! TODO: combine this functionality with above modal -->
    <app-dialog ref="falsealarm" max-width="500" lazy v-on:opened="focusTextarea()">
      <template slot="modaltitle">CONFIRM FALSE ALARM?</template>
      <template slot="modalcontent">
        <v-textarea
          dark
          background-color="transparent"
          ref="falsealarmtextarea"
          rows="6"
          auto-grow
          class="textarea"
          @keydown.enter.exact.prevent
          @keyup.enter.exact="saveDescription()"
          @keydown.enter.shift.exact="newline"
          placeholder="Please leave a reason for registering this event as a false alarm"
          v-model="classificationDescription"
        />
      </template>
      <v-btn
        slot="detailsButton"
        dark
        style="background-color:#FFF; color:black;"
        :disabled="classificationDescription.trim() === ''"
        @click="saveDescription()"
      >Confirm</v-btn>
    </app-dialog>
  </v-container>
</template>
<script>
import AppDialog from "@/components/app-dialog.vue";
import AppListItem from "@/components/app-list-item.vue";

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
    newClass: null,
    classificationDescription: ""
  }),
  computed: {
    selectedClass() {
      return "color: var(--v-buttonBlack-base); background-color: #FFF;";
    }
  },
  methods: {
    getDate(evt) {
      return format(new Date(evt.timestamp.seconds), "MMM DD");
    },
    focusTextarea() {
      this.$nextTick(() => {
        this.$refs.falsealarmtextarea.focus();
      });
    },
    setNewClass(type) {
      this.newClass = type;
    },
    openEditModal(evt) {
      this.newClass = evt.classifiedAs;
      this.selectedForEdit = evt;
      this.$refs.editmodal.open();
    },
    onClosedEditModal() {
      this.newClass = null;
      this.selectedForEdit = null;
      this.classificationDescription = "";
    },
    openFalseAlarmModal() {
      this.newClass = "false-alarm";
      this.$refs.editmodal.close();
      this.$refs.falsealarm.open();
    },
    saveDescription() {
      this.selectedForEdit.classificationDescription = this.classificationDescription.trim();
      this.$refs.falsealarm.close();
      this.saveEdits();
    },
    saveEdits() {
      this.selectedForEdit.classifiedAs = this.newClass;
      this.updateEvent(this.selectedForEdit);
    },
    updateEvent(event) {
      this.$events
        .updateEvent(event)
        .then(() => {
          this.onClosedEditModal();
          this.$notifySuccess("UPDATE SUCCESSFUL");
        })
        .catch(err => {
          console.error("ERROR", err);
          this.$notifyError("FAILED TO CLASSIFY EVENT");
          this.$events.stopLoading();
        });
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
.modal-background {
  border: 1px solid var(--v-border-base);
  background-color: var(--v-buttonBlack-base);
}
.textarea {
  // border: 1px solid #FFF;
  background-color: var(--v-secondaryDark-base);
  color: #fff;
  padding: 20px;
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
