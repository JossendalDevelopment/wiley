<template>
      <v-list dense style="height:100%;">
        <v-subheader>Controls and Stuff</v-subheader>
        <v-list-tile @click="() => {}">
            <v-list-tile-action>
                <v-icon>far fa-eye</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
                <v-list-tile-title>Objects</v-list-tile-title>
            </v-list-tile-content>
            </v-list-tile>
            <v-list-tile @click="() => {}">
            <v-list-tile-action>
                <v-icon>fas fa-user</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
                <v-list-tile-title>Employees</v-list-tile-title>
            </v-list-tile-content>
        </v-list-tile>
      </v-list>
</template>
<script>
export default {
    props: {
        captures: {
            type: Array,
            required: false,
            default: () => {
                return [];
            }
        }
    }
}
</script>