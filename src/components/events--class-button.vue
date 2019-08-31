<template>
  <v-btn
    @click="$emit('classification', type.val)"
    flat
    class="control-btn"
    :class="{disabled: disabled}"
    large
    style="letter-spacing: 0.5px;"
  >
    {{ type.type }}
    <span class="control-numeral">{{index + 1}}</span>
  </v-btn>
</template>
<script>
export default {
  props: {
    type: {
      type: Object,
      require: true
    },
    disabled: {
      type: Boolean,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  }
};
</script>
<style lang="scss" scoped>
.control {
  &-btn {
    width: 16%;
    font-size: 20px;
    position: relative;
    margin: 0;
  }
  &-numeral {
    position: absolute;
    color: #fff;
    top: -7px;
    right: -30px;
    font-size: 12px;
  }
}
.disabled {
  pointer-events: none;
}
@media only screen and (max-width: 1220px) {
  .control {
    &-btn {
      font-size: 18px;
    }
    &-numeral {
      top: -9px;
      right: -30px;
      font-size: 10px;
    }
  }
}
</style>