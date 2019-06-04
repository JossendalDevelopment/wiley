<template>
    <v-container>
        <v-layout justify-center v-if="data.events.length === 0">
            <span style="color:white; font-family: DIN Condensed; font-size: 30px;">
            THERE ARE NO EVENTS FOR {{ data.type.toUpperCase() }}S
            </span>
        </v-layout>
        <v-layout v-else row wrap>
            <v-flex xs12 v-for="(evt) in data.events" :key="evt.eventId" class="app-list-item-container">
                <v-card flat class="app-list-item">
                    <v-layout row justify-space-between pt-3 px-4>
                        <p class="app-list-item-username">{{ $auth.user.email }}</p>
                        <p class="app-list-item-username">{{ getDate(evt) }}</p>
                    </v-layout>
                    <v-card-text class="app-list-item-content">{{ evt.confirmationDescription }}</v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
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
