<template>
  <div class="menu-container">
    <v-menu
      offsetY
      transition="slide-x-transition"
      mt-3
      bottom
      right
      :nudge-width="200"
      close-on-click
    >
      <template v-slot:activator="{ on }">
        <v-icon class="burger" v-on="on">fas fa-bars</v-icon>
      </template>
      <v-card class="menu-list-container">
        <div @click="logout()" class="menu-list-btn">
          <p class="mb-0">Logout</p>
        </div>
        <!-- <router-link @click="logout()" flat small class="logout-btn">logout</router-link> -->
      </v-card>
    </v-menu>
  </div>
</template>
<script>
export default {
  methods: {
    async logout() {
      await this.$auth.logout();
      this.$router.replace("/sign_in");
    }
  }
};
</script>
<style lang="scss" scoped>
.menu-container {
  position: absolute;
  top: 8px;
  left: 18px;
}
.menu-list-container {
  padding: 15px;
  border-radius: 5px;
}
.menu-list-btn {
  font-family: "Din Condensed";
  font-size: 20px;
  padding-left: 8px;
  cursor: pointer;
}
.menu-list-btn:hover {
  background-color: #22222222;
}
.menu-list-btn:active {
  background-color: #44444444;
}
</style>