<template>
    <v-container grid-list-xs>
        <v-layout justify-center v-if="data.events.length === 0">
            <span style="color:white; font-family: DIN Condensed; font-size: 30px;">
            THERE ARE NO EVENTS FOR {{ data.type.toUpperCase() }}S
            </span>
        </v-layout>
        <v-layout v-else row wrap>
            <v-flex xs6 d-flex v-for="(evt) in data.events" :key="evt.eventId">
                <v-card flat class="app-list-item">
                    <v-layout row align-center>
                        <v-flex xs4 class="app-list-item-image-container">
                            <v-img
                                contain
                                :aspect-ratio="1/1"
                                class="app-list-item-image"
                                :src="evt.staticImageThumb"
                            ></v-img> 
                        </v-flex>
                        <v-flex xs8 class="app-list-item-info-container">
                            <v-layout row wrap justify-space-between>
                                <v-flex xs12 pb-0>
                                    <v-layout justify-space-between align-center ma-2>
                                        <span>{{ evt.camName.toUpperCase() }}</span>
                                        <span>{{ getTime(evt) }}</span>
                                    </v-layout>
                                </v-flex>
                                <v-flex xs12 pt-0>
                                    <v-layout justify-space-between align-center ma-2>
                                        <span class="app-list-item-username">{{ $auth.user.email.toUpperCase() }}</span>
                                        <span class="app-list-item-date">{{ getDate(evt) }}</span>
                                    </v-layout>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                    </v-layout>
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
        getTime(evt) {
            return format(new Date(evt.timestamp._seconds), 'HH:MM:SS');
        }
    }
}
</script>
<style lang="scss" scoped>
.app-list-item {
    border: 1px solid var(--v-border-base);
    background-color: var(--v-buttonBlack-base);
    color: #FFF;
    &-image-container {
        border-right: 1px solid var(--v-border-base);
        margin: 8px;
    }
    &-info-container {
        margin: 8px 16px 8px 0px;
        font-size: 20px;
    }
    &-image {
        margin: 0 auto;
    }
    &-username {
        color: var(--v-border-base);
    }
    &-date {
        color: var(--v-border-base);
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
