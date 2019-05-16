<notes>
    a list based layout for the controls sidebar related to the details view
    CURRENTLY NOT IN USE
</notes>
<template>
    <v-layout column justify-space-between style="height:100%; background-color:#FFF;">
        <v-list>
            <v-subheader @click="$router.go(-1)"><v-icon>fas fa-arrow-left</v-icon>&nbsp;Back</v-subheader>
            <v-list-tile @click="() => {}">
                <v-list-tile-content style="display:flex; flex-direction:row;">
                    <v-icon>fas fa-bookmark</v-icon>
                    <v-list-tile-title>&nbsp; # 231</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>

        <detections-list />

        <employees-list />

        <v-list dense>
            <v-list-tile @click="() => {}">
                <v-list-tile-content style="display:flex; flex-direction:row;">
                    <v-list-tile-title>Leave Feedback</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>
    </v-layout>
</template>
<script>
import EmployeesList from '@/components/video--details--controls-employees-list';
import DetectionsList from '@/components/video--details--controls-detections-list';

export default {
    components: {
        'employees-list': EmployeesList,
        'detections-list': DetectionsList
    },
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