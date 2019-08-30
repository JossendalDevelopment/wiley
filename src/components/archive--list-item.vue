<template>
  <span>
    <v-card flat class="app-list-item" :class="selected ? 'selected' : null" @click="setSelected()">
      <v-layout row ma-0 pa-0>
        <div class="app-list-item-image-container">
          <v-img
            contain
            :aspect-ratio="1/1"
            class="app-list-item-image"
            :src="event && generateThumbUrl(event)"
          ></v-img>
        </div>

        <v-layout ma-0 pa-0 column justify-space-between class="app-list-item-info-container">
          <span class="app-list-item-date">{{ getDateTime(event.modified_date).toUpperCase() }}</span>
          <span class="app-list-item-camera">RAIL {{ event.camera.toUpperCase() }}</span>

          <v-btn flat small class="app-list-item-button" @click="openEditModal(event)">EDIT</v-btn>
        </v-layout>
      </v-layout>
    </v-card>

    <!-- EDIT modal  -->
    <app-dialog ref="editmodal" max-width="500" lazy v-on:opened="() => null">
      <template slot="modaltitle">CHANGE CLASSIFICATION</template>
      <template slot="modalcontent">
        <v-layout class="modal-content" v-if="selectedForEdit">
          <v-flex xs4 ma-3 mt-4>
            <!-- <v-img
              slot="list-image"
              contain
              :aspect-ratio="1/1"
              class="edit-modal-image"
              :src="selectedForEdit.thumb_250x250"
            ></v-img>-->
            <v-img
              slot="list-image"
              contain
              :aspect-ratio="1/1"
              class="edit-modal-image"
              :src="selectedForEdit && generateThumbUrl(selectedForEdit)"
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
              @click="() => setNewClass('train')"
              :style="newClass === 'train' ? selectedClass : ''"
            >train</v-btn>
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
          v-model="classification_description"
        />
      </template>
      <v-btn
        slot="detailsButton"
        dark
        style="background-color:#FFF; color:black;"
        :disabled="false"
        @click="saveDescription()"
      >Confirm</v-btn>
    </app-dialog>
  </span>
</template>
<script>
import AppDialog from "@/components/app-dialog.vue";

import format from "date-fns/format";

export default {
  components: {
    "app-dialog": AppDialog
  },
  props: {
    event: {
      type: Object,
      required: false,
      default: () => {}
    },
    selected: {
      type: Number,
      required: false,
      default: 0
    }
  },
  data: () => ({
    selectedForEdit: null,
    newClass: null,
    classification_description: ""
  }),
  computed: {
    selectedClass() {
      return "color: var(--v-buttonBlack-base); background-color: #FFF;";
    }
  },
  methods: {
    getDateTime(date) {
      return format(date, "MMM DD HH:MM:ss");
    },
    generateThumbUrl(evt) {
      return `${process.env.VUE_APP_FILESERVER_BASE_URL}/${evt.thumb_filepath}/${evt.thumb_filename}`;
    },
    formatPercentage(evt) {
      return (+evt * 100).toFixed(0);
    },
    focusTextarea() {
      this.$nextTick(() => {
        this.$refs.falsealarmtextarea.focus();
      });
    },
    setSelected() {
      this.$emit("selected", this.event);
    },
    setNewClass(type) {
      this.newClass = type;
    },
    openEditModal(evt) {
      this.newClass = evt.user_classification;
      this.selectedForEdit = evt;
      this.$refs.editmodal.open();
    },
    onClosedEditModal() {
      this.newClass = null;
      this.selectedForEdit = null;
      this.classification_description = "";
    },
    openFalseAlarmModal() {
      this.$refs.editmodal.close();
      this.newClass = "false-alarm";
      this.$refs.falsealarm.open();
    },
    saveDescription() {
      this.selectedForEdit.classification_description = this.classification_description.trim();
      this.$refs.falsealarm.close();
      this.saveEdits();
    },
    saveEdits() {
      this.selectedForEdit.user_classification = this.newClass;
      this.updateEvent(this.selectedForEdit);
    },
    updateEvent(event) {
      this.$events
        .updateEvent(event)
        .then(() => {
          this.$refs.editmodal.close();
          this.onClosedEditModal();
          this.$notifySuccess("UPDATE SUCCESSFUL");
          this.$emit("update");
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
.v-btn {
  letter-spacing: 3.5px;
  border: 1px solid var(--v-border-base);
  background-color: var(--v-buttonBlack-base);
  color: #fff;
}
.app-list-item {
  border: 1px solid var(--v-border-base);
  background-color: var(--v-buttonBlack-base);
  color: #fff;
  margin: 5px;
  cursor: pointer;
  &-image-container {
    width: 35%;
    border-right: 1px solid var(--v-border-base);
  }
  &-image {
    margin: 5px;
    // margin: 0 auto;
    // width: 100%;
    // height: 100%;
  }
  &-info-container {
    // min-height: 100%;
    padding: 8px;
    // width: 80%;
    // font-size: 20px;
  }
  &-date {
    font-size: 24px;
    padding-left: 5px;
  }
  &-camera {
    color: var(--v-border-base);
    padding-left: 5px;
  }
  &-button {
    // flex-shrink: 1;
    margin-left: auto;
  }
  &.selected {
    background-color: #fff;
    color: black;
  }
}
.modal-content {
  border: 1px solid var(--v-border-base);
  background-color: var(--v-buttonBlack-base);
}
.textarea {
  // border: 1px solid #FFF;
  background-color: var(--v-secondaryDark-base);
  color: #fff;
  padding: 20px;
}
.classification-btn {
  border: 1px solid var(--v-border-base);
  background-color: var(--v-buttonBlack-base);
  color: #fff;
}
</style>
