<template>
  <span>
    <v-btn @click="$refs.mute.open()" flat dark large>MUTE ALARM</v-btn>

    <app-dialog ref="mute" lazy v-on:closed="null" v-on:opened="null">
      <!-- <template slot="modaltitle">SELECT HOW LONG YOU WOULD LIKE TO MUTE ALARMS</template> -->
      <template slot="modalcontent">
        <v-layout column align-center justify-center fill-height>
          <h1
            style="color: #FFF; font-family: 'DIN Condensed';"
          >SELECT HOW LONG YOU WOULD LIKE TO MUTE ALARMS</h1>
          <v-layout row wrap justify-space-between fill-height style="width: 100%;">
            <v-flex xs2 d-flex v-for="(num, idx) in 6" :key="num + 'mute'" style="padding: 5px;">
              <v-btn
                dark
                style="border: 1px solid white; width: 100%; height: 200px;"
              >{{15 * (idx + 1)}}</v-btn>
            </v-flex>
          </v-layout>
        </v-layout>
      </template>
    </app-dialog>
  </span>
</template>
<script>
import AppDialog from "./app-dialog";

export default {
  components: {
    "app-dialog": AppDialog
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
</style>