<template>
    <span>
        <v-layout justify-space-between align-center>
            <p class="pl-3 mb-0">{{ formatProbabilityText }}</p>
            <template v-for="button in mainButtons">
                <v-btn 
                    v-if="button.type === 'false'"
                    :key="button.type+1"
                    flat
                    @click="openFalseAlarmModal()" 
                    :class="classification === button.type ? 'secondary' : 'primary black--text'">
                    {{ button.type }}
                </v-btn>
                <v-btn 
                    v-else
                    :key="button.type+3"
                    flat
                    @click="classification = button.type" 
                    :class="classification === button.type ? 'secondary' : 'primary black--text'">
                    {{ button.type }}
                </v-btn>
            </template>
            <!-- <v-btn @click="openConfirmModal()" class="secondary btn">
                categorize
            </v-btn> -->
        </v-layout>
        <v-layout justify-center align-center>
            <v-btn 
                v-for="(sub, index) in activeCategory.subCats"
                :key="sub+index"
                flat
                @click="subClassification = sub" 
                :class="subClassification === sub ? 'secondary' : 'primary black--text'">
                {{ sub }}
            </v-btn>
        </v-layout>
    </span>
</template>
<script>
export default {
    data: () => ({
        classification: 'non-employee',
        subClassification: '',
        mainButtons: [
            {
                type: 'employee',
                subCats: ['Type 1','Type 2','Type 3']
            },
            {
                type: 'non-employee',
                subCats: ['Coyote','Other Animal']
            },
            {
                type: 'contractor',
                subCats: ['Type 1','Type 2','Type 3']
            },
            {
                type: 'false',
                subCats: [],
            },
        ]
    }),
    methods: {
        openFalseAlarmModal() {
            this.$emit('openmodal');
        }
    },
    computed: {
        formatProbabilityText() {
            return `Identified: ${this.$cameraAlert.alertData.detectedObject} (confidence ${this.$cameraAlert.alertData.probability})`;
        },
        activeCategory() {
            return this.mainButtons.find(b => b.type === this.classification)
        },
    }
}
</script>