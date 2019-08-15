<template>
  <v-card flat class="app-list-item">
    <v-layout row align-center>
      <v-flex class="app-list-item-image-container">
        <slot name="list-image"/>
      </v-flex>
      <v-flex class="app-list-item-info-container">
        <v-layout row wrap>
          <v-flex xs12 pa-0>
            <v-layout justify-space-between align-center px-2>
              <slot name="list-info-top-left"/>
              <slot name="list-info-top-right"/>
            </v-layout>
          </v-flex>
          <v-flex xs12 pa-0>
            <v-layout justify-space-between align-center px-2>
              <slot name="list-info-bottom-left"/>
              <slot name="list-info-bottom-right"/>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-card>
</template>
<script>
export default {
};
</script>
<style lang="scss" scoped>
.app-list-item {
  border: 1px solid var(--v-border-base);
  background-color: var(--v-buttonBlack-base);
  color: #fff;
  width: 100%;
  &-image-container {
    width: 20%;
    padding: 5px;
    border-right: 1px solid var(--v-border-base);
  }
  &-info-container {
    width: 80%;
    font-size: 20px;
  }
}
@media only screen and (max-width: 1050px) {
  .app-list-item {
    &-info-container {
      font-size: 16px;
    }
  }
}
</style>