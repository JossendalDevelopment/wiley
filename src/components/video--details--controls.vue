<template>
      <v-list dense style="height:100%;">
        <v-subheader @click="$router.go(-1)"><v-icon>fas fa-arrow-left</v-icon>&nbsp;Back</v-subheader>
        <v-subheader>Object Detected</v-subheader>
        <v-list-tile @click="() => {}">
            <v-list-tile-action>
                <v-icon>far fa-eye</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
                <v-list-tile-title>Coyote</v-list-tile-title>
            </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="() => {}">
            <v-list-tile-action>
                <v-icon>far fa-eye-slash</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
                <v-list-tile-title>Traincar</v-list-tile-title>
            </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="() => {}">
            <v-list-tile-action>
                <v-icon>far fa-eye-slash</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
                <v-list-tile-title>Worker</v-list-tile-title>
            </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="() => {}">
            <v-list-tile-action>
                <v-icon>far fa-eye-slash</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
                <v-list-tile-title>Obstruction</v-list-tile-title>
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