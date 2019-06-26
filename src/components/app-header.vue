<template>
  <div v-if="$auth.status.loggedIn" class="app-toolbar">
    <v-tabs centered class="tab-container">
      <v-tabs-slider color="red" style="height: 5px;"></v-tabs-slider>
      <v-spacer></v-spacer>

      <v-tab to="/overview" exact>
        <h2 class="nav-btn">Live Feed</h2>
      </v-tab>

      <v-tab to="/training" exact style="position:relative;">
        <h2 class="nav-btn">History</h2>
        <v-badge
          v-if="!!unclassifiedEventCount"
          :color="$vuetify.theme.accent"
          style="position:absolute; top:12px; right:26px;"
        >
          <span slot="badge" style="font-family: Din Condensed;">{{ unclassifiedEventCount }}</span>
        </v-badge>
      </v-tab>

      <v-tab to="/history" exact>
        <h2 class="nav-btn">Archive</h2>
      </v-tab>
      <v-spacer></v-spacer>
      <v-btn @click="logout()" dark flat small class="logout-btn">logout</v-btn>
    </v-tabs>
  </div>
</template>
<script>
export default {
  data: () => ({
    tab: null
  }),
  methods: {
    async logout() {
      await this.$auth.logout();
      this.$router.replace("/sign_in");
    }
  },
  watch: {
    tab: {
      immediate: true,
      handler(newVal) {
        console.log("NEW TAB", newVal);
      }
    }
  },
  computed: {
    unclassifiedEventCount() {
      return this.$events.events.reduce((prev, next) => {
        if (!next.classified) {
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
  font-size: 22px;
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
  //   height: 28px;
  width: 80px;
  background-color: var(--v-secondaryDark-base);
  border: 1px solid var(--v-border-base);
}
</style>

