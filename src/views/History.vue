<template>
    <v-container fill-height>
        <v-layout row>
            <v-flex>
                <v-toolbar color="primary darken-1" >
                    <v-toolbar-title class="pl-2">
                        <span class="hidden-sm-and-down">Event Logs</span>
                    </v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-text-field
                        flat
                        solo-inverted
                        hide-details
                        prepend-inner-icon="fas fa-search"
                        label="Search"
                        class="hidden-sm-and-down"
                    ></v-text-field>
                </v-toolbar>
                <v-list>
                    <v-list-tile v-for="event in events" :key="event.id">
                        <v-list-tile-content>
                            <v-list-tile-title>{{ event.id }} - {{ event.status }} - {{ new Date(event.startTime) }} - {{ event.detectedObject }} - {{ event.probability }}</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>

export default {
    data: () => ({
        events: []
    }),
    mounted() {
        this.$events.getAllEvents()
            .then(resp => {
                this.events = resp.data
            })
    }
}
</script>