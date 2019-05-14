<template>
    <v-dialog 
        ref="dialog" 
        v-model="isOpen" 
        :persistent="isLoading || persistent"
        :lazy="lazy"
        :max-width="maxWidth"
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
        <slot><v-card :style="{backgroundColor: $vuetify.theme.primary}">
            <v-icon 
                v-if="!isLoading && !persistent" 
                class="right mt-3 mr-3" 
                large 
                @click.stop="close"
            >
                cancel
            </v-icon>
            <span class="right mt-3 mr-3" style="display:inline-block;">
                <slot name="leftofclose" />
            </span>
            <v-card-title>
                <h2 style="display:inline;"><slot name="modaltitle"/></h2>
            </v-card-title>
            <v-card-text>
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
                <span right>
                    <slot name="detailsButton" />
                </span>
            </v-card-actions>
        </v-card></slot>
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
