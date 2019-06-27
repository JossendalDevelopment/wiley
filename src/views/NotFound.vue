<template>
  <v-container fill-height fluid class="container">
    <v-layout align-center justify-center>
      <v-flex xs4 class="box">
        <h1 class="numeral text-xs-center">404</h1>
        <h3 class="text text-xs-center">LOOKS LIKE SOMETHING WENT WRONG</h3>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<style lang="scss" scoped>
.container {
  //   background-color: var(--v-secondaryDark-base);
  font-family: "DIN Condensed";
  letter-spacing: 1.5px;
  .box {
    transform: translateY(-80px);
  }
  .numeral {
    font-size: 18rem;
    color: #fff;
    letter-spacing: 10px;
    margin-bottom: -70px;
  }
  .text {
    color: var(--v-border-base);
    font-size: 3rem;
    width: 90%;
    margin: 0 auto;
  }
}
</style>

