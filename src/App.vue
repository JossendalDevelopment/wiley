<template>
<div id="app">
  <v-app id="inspire">
    <v-navigation-drawer
      clipped
      fixed
      v-model="drawer"
      app
      disable-resize-watcher
    >
      <v-list dense>
        <v-list-tile @click="() => {}">
          <v-list-tile-action>
            <v-icon>fas fa-tachometer-alt</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Drawer stuff</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="() => {}">
          <v-list-tile-action>
            <v-icon>fas fa-cog</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Settings</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app fixed clipped-left>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title class="accent--text">Wiley</v-toolbar-title>
    </v-toolbar>
    <v-content app>
      <v-container fluid fill-height primary pa-0>
        <!-- <v-layout justify-center align-center> -->

              <router-view></router-view>

        <!-- </v-layout> -->
      </v-container>
    </v-content>
    <v-footer app fixed>
      <span>&copy; 2019 Footer?</span>
    </v-footer>
  </v-app>
</div>
</template>

<script>


export default {
  name: 'App',
  props: { },
  data: () => ({
      drawer: false,
  }),

}
</script>
