<template>
    <v-btn
        @click="$emit('classification', type)"
        flat
        :class="disabled ? 'control-btn disabled' : 'control-btn'"
        large
    >
        <!-- :style="selected ? 'filter:invert(1);' : null" -->
        {{ type }}
        <span class="control-numeral">{{index}}</span>
    </v-btn>
</template>
<script>
export default {
    props: {
        type: {
            type: String,
            require: true
        },
        selected: {
            type: Boolean,
            required: true
        },
        disabled: {
            type: Boolean,
            required: true
        },
        index: {
            type: Number,
            required: true
        }
    },
}
</script>
<style lang="scss" scoped>
.control {
  &-btn {
    width: 16%;
    font-size: 20px;
    letter-spacing: 1.5px;
    position: relative;
    margin: 0;
  }
  &-text {
    // width: 100%;
    margin: 0 auto;
    color: var(--v-border-base);
    font-size: 18px;
  }
  &-numeral {
    position: absolute;
    color: #fff;
    top: -7px;
    right: 2px;
    font-size: 12px;
  }
  &.disabled {
  pointer-events: none;
}
}
</style>