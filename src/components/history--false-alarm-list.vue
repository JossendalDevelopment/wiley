<template>
    <v-container>
        <v-layout justify-center v-if="data.events.length === 0">
            <span style="color:white; font-family: DIN Condensed; font-size: 30px;">
            THERE ARE NO EVENTS FOR {{ data.type.toUpperCase() }}S
            </span>
        </v-layout>
        <v-layout v-else row wrap>
            <v-flex xs12 v-for="(evt) in data.events" :key="evt.eventId">
                <v-card flat class="app-list-item">
                    <v-layout align-start>
                        <v-flex xs2 class="app-list-item-image-container">
                            <v-img
                                contain
                                :aspect-ratio="1/1"
                                class="app-list-item-image"
                                :src="evt.staticImageThumb"
                            ></v-img> 
                        </v-flex>
                        <v-flex xs10 class="app-list-item-info-container">
                            <v-card-text>
                                <v-layout row pl-2 justify-space-between>
                                    <p class="app-list-item-username">{{ $auth.user.email }}</p>
                                    <p class="app-list-item-date">{{ getDate(evt) }}</p>

                                </v-layout>
                            </v-card-text>
                            <v-card-text class="app-list-item-content">{{ evt.confirmationDescription }}</v-card-text>
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
    },
}
</script>
<style lang="scss" scoped>
// .app-list-item {
//     background-color: var(--v-buttonBlack-base);
//     color: #FFF;
//     &-username {
//         padding-bottom: 0px;
//     }
//     &-content {
//         padding-top: 0px;
//     }
// }
.app-list-item {
    border: 1px solid var(--v-border-base);
    background-color: var(--v-buttonBlack-base);
    color: #FFF;
    &-image-container {
        margin: 7px 8px 7px 7px;
        border: 1px solid var(--v-border-base);
    }
    &-info-container {
        margin: 8px 16px 8px 0px;
        font-size: 20px;
    }
    &-image {
        margin: 0 auto;
    }
    &-username {
        // color: var(--v-border-base);
        margin-bottom: 0px;
    }
    &-date {
        color: var(--v-border-base);
        margin-bottom: 0px;
    }
    &-content {
        padding-top: 0px;
        font-size: 16px;
    }
}
</style>
