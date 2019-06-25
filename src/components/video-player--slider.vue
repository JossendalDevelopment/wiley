<template>
    <vue-slider v-model="autoTime" :interval="0.25" tooltip="none" :max="duration" @change="handleChange($event)"/>
</template>
<script>
import VueSlider from 'vue-slider-component'
// this css import breaks jest unit testing. Found in node_modules/vue-slider-component/theme
// import 'vue-slider-component/theme/default.css'

export default {
    components: {
        'vue-slider': VueSlider
    },
    props: {
        duration: {
            type: Number,
            required: true,
        },
        currentTime: {
            type: Number,
            required: true
        }
    },
    methods: {
        handleChange(e) {
            this.$emit('sliderchange', e);
        }
    },
    computed: {
        autoTime: {
            get() {
                return this.currentTime
            },
            set(newTime) {
                // this event not being used
                this.$emit('update', newTime)
            }
        }
    }
}
</script>