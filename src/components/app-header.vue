<template>
  <div v-if="$auth.status.loggedIn" class="app-toolbar">
    <v-tabs centered class="tab-container">
      <v-tabs-slider color="red" style="height: 5px;"></v-tabs-slider>
      <v-btn @click="createDummyAlarm()" dark flat small class="alert-btn">ALERT</v-btn>
      <v-spacer></v-spacer>

      <v-tab to="/overview" exact>
        <h2 class="nav-btn">Live Feed</h2>
      </v-tab>

      <v-tab to="/events" exact style="position:relative;">
        <h2 class="nav-btn">Events</h2>
        <v-badge
          v-if="!!unclassifiedEventCount"
          :color="$vuetify.theme.accent"
          style="position:absolute; top:12px; right:26px;"
        >
          <span slot="badge"></span>
        </v-badge>
      </v-tab>

      <v-tab to="/archive" exact>
        <h2 class="nav-btn">Archive</h2>
      </v-tab>
      <v-spacer></v-spacer>
      <v-btn @click="logout()" dark flat small class="logout-btn">logout</v-btn>
    </v-tabs>
  </div>
</template>
<script>
import Alert from "../types/Alert";

export default {
  data: () => ({
    tab: null
  }),
  methods: {
    async logout() {
      await this.$auth.logout();
      this.$router.replace("/sign_in");
    },
    createDummyAlarm() {
      this.$alert.createAlert(
        new Alert({ inferenced_classification: "Coyote", camera: "east" })
      );
    }
  },
  computed: {
    unclassifiedEventCount() {
      return this.$events.sessionEvents.reduce((prev, next) => {
        if (!next.user_classification) {
          prev++;
        }
        return prev;
      }, 0);
    }
  }
};
</script>
<style lang="scss" scoped>
.app-toolbar {
  position: relative;
  background-color: #fff;
}
.tab-container {
  position: relative;
  margin-top: 10px;
  background-color: #fff;
}
.v-tabs__container {
  position: relative;
  min-height: 64px;
  height: 64px;
}
.nav-btn {
  font-family: "DIN Condensed";
  font-size: 25px;
  letter-spacing: 2px;
  background-color: transparent;
  color: var(--v-secondaryDark-base);
  text-decoration: none;
  min-width: 110px;
}
.logout-btn {
  position: absolute;
  top: -1px;
  right: 12px;
  width: 80px;
  background-color: var(--v-secondaryDark-base);
  border: 1px solid var(--v-border-base);
}
.alert-btn {
  position: absolute;
  top: -1px;
  left: 12px;
  width: 80px;
  background-color: var(--v-accent-base);
  border: 1px solid var(--v-border-base);
}
</style>

