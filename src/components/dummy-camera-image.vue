<notes>
    This component contains the dummy video control bar as well.
</notes>
<template>
    <span>
        <v-img :src="getPath()" />
    </span>
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