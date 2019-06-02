<notes>
    create some ui for empty lists
</notes>
<template>
    <v-layout row wrap>
        <v-flex xs12 v-for="(evt, index) in data.events" :key="index" class="app-list-item-container">
            <v-card flat class="app-list-item">
                <v-layout row justify-space-between pt-3 px-4>
                    <p class="app-list-item-username">{{ $auth.user.email }}</p>
                    <p class="app-list-item-username">{{ getDate(evt) }}</p>
                </v-layout>
                <v-card-text class="app-list-item-content">{{ evt.confirmationDescription }}</v-card-text>
            </v-card>
        </v-flex>
    </v-layout>
</template>
<script>
import format from 'date-fns/format';

export default {
    props: {
        data: {
            type: Object,
            required: true
        },
    },
    methods: {
        getDate(evt) {
            return format(new Date(evt.timestamp._seconds), 'MMM DD');
        },
    },
}
</script>
<style lang="scss" scoped>
.app-list-item-container {
    border: 1px solid var(--v-border-base);
    background-color: var(--v-buttonBlack-base);
    margin-bottom: 8px;
}
.app-list-item {
    background-color: var(--v-buttonBlack-base);
    color: #FFF;
    &-username {
        padding-bottom: 0px;
    }
    &-content {
        padding-top: 0px;
    }
}
</style>
