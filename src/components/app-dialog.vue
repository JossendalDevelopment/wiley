<template>
    <v-dialog 
        ref="dialog" 
        v-model="isOpen" 
        :persistent="isLoading || persistent"
        :lazy="lazy"
        :max-width="maxWidth"
        flat
    >
        <v-dialog
            v-model="isLoading"
            lazy
            persistent
            fill-height
            content-class="elevation-0">
            <p class="text-xs-center pt-4"><v-progress-circular
                :size="70"
                :width="7"
                indeterminate
                lazy
                color="white"
            /></p>
        </v-dialog>
        <slot>
            <v-card color="transparent" flat >
                <v-layout align-center justify-space-between>
                    <v-card-title class="mb-0 pb-0">
                        <h2 class="ml-1" style="display:inline; color:#FFF; font-family:DIN Condensed; font-weight:700; letter-spacing:5px;"><slot name="modaltitle"/></h2>
                    </v-card-title>
                    <v-icon 
                        v-if="!isLoading && !persistent" 
                        class="right mt-3 mr-3" 
                        @click.stop="close"
                        dark
                    >
                        fas fa-times
                    </v-icon>
                </v-layout>
                <v-card-text class="modal-content">
                    <slot name="modalcontent"/>
                </v-card-text>
                <v-card-actions>
                    <slot name="cancelbutton">
                        <!-- <v-btn v-if="!isLoading" :disabled="persistent" @click.stop="close">close</v-btn> -->
                    </slot>
                    <span class="ml-2">
                        <slot v-if="!isLoading" name="actionbuttons" />
                    </span>
                    <v-spacer/>
                    <span right class="mr-2">
                        <slot name="detailsButton" />
                    </span>
                </v-card-actions>
            </v-card>
        </slot>
    </v-dialog>
</template>
<script>
export default {
    props: {
        persistent: {
            type: Boolean,
            required:false,
            default: false
        },
        lazy: {
            type: Boolean,
            required:false,
            default: false
        },
        maxWidth: {
            type: String,
            required: false,
            default: undefined
        }
    },
    data: () => ({
        isOpen: false,
        isLoading: false,
    }),
    methods: {
        open() {
            this.isOpen = true;
            this.$emit('opened');
        },
        close() {
            this.isOpen = false;
            this.$emit('closed');
        },
        startLoading() {
            this.isLoading = true
        },
        stopLoading() {
            this.isLoading = false
        }
    }
}
</script>
<style lang="scss">
.v-overlay:before {
    background-color: black !important;
}
.v-overlay--active:before {
    opacity: 0.90 !important;
}
.v-dialog__content {
    height: 70% !important;
}
.modal-content {
    background-color: transparent;
    padding-top: 0px;
}
#inspire > div.v-dialog__content.v-dialog__content--active > div > div.v-card.v-card--flat.v-sheet.theme--light.transparent > div.v-card__text.modal-content > div > div > div.v-input__slot.transparent:before {
    // override little border bar on textarea
    border: none;
}
</style>


