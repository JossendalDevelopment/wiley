<template>
    <v-img :src="getPath()" />
</template>
<script>
export default {
    props: {
        source: {
            type: String,
            required: false,
            default: ''
        }
    },
    methods: {
        getPath() {
            return this.source
        }
    },
}
</script>
