<template>
    <v-container grid-list-xs>
        <v-layout justify-center v-if="data.events.length === 0">
            <span style="color:white; font-family: DIN Condensed; font-size: 30px;">
            THERE ARE NO EVENTS FOR {{ data.type.toUpperCase() }}S
            </span>
        </v-layout>
        <v-layout v-else row wrap>
            <v-flex xs6 d-flex v-for="(evt) in data.events" :key="evt.eventId">
                <app-list-item small>
                    <v-img
                        slot="list-image"
                        contain
                        :aspect-ratio="1/1"
                        class="app-list-item-image"
                        :src="evt.staticImageThumb"
                    ></v-img> 
                    <span slot="list-info-top-left">{{ evt.camName.toUpperCase() }}</span>
                    <span slot="list-info-top-right">{{ getTime(evt) }}</span>
                    <span slot="list-info-bottom-left" 
                          class="app-list-item-username">{{ $auth.user.email.toUpperCase() }}</span>
                    <span slot="list-info-bottom-right" 
                          class="app-list-item-date">{{ getDate(evt) }}</span>
                </app-list-item>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
import appListItem from '@/components/app-list-item.vue';
import format from 'date-fns/format';

export default {
    components: {
        'app-list-item': appListItem,
    },
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
</style>
