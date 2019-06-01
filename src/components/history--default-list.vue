<template>
    <v-container grid-list-xs pa-0>
        <v-layout row wrap>
            <v-flex xs6 d-flex v-for="x in 12" :key="x" class="app-list-item-container">
                <v-card flat class="app-list-item">
                <v-layout row  align-center>
                    <v-flex xs4>
                        <v-img
                            src="/assets/images/wiley_logo_xl.png"
                            contain
                        ></v-img> 
                    </v-flex>
                    <v-flex xs8>
                        <v-layout column justify-center>
                            <v-flex xs12>
                                <v-layout justify-space-between align-center ma-2>
                                    <span>CAMERA</span>
                                    <span>TIME</span>
                                </v-layout>
                            </v-flex>
                            <v-flex xs12>
                                <v-layout justify-space-between align-center ma-2>
                                    <span class="app-list-item-username">{{ $auth.user.email.toUpperCase() }}</span>
                                    <span class="app-list-item-date">DATE</span>
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
export default {
    props: {
        data: {
            type: Object,
            required: true
        }
    },
    mounted() {
        console.log("TODO: SET THIS UP!!!!!!!!!", this.data)
    }
}
</script>
<style lang="scss" scoped>
.app-list-item-container {
    padding: 10px;
}
.app-list-item {
    border: 1px solid var(--v-border-base);
    background-color: var(--v-buttonBlack-base);
    color: #FFF;
    &-username {
        // padding-bottom: 0px;
        color: var(--v-border-base);
    }
    &-date {
        color: var(--v-border-base);
        // padding-top: 0px;
    }
}
.app-list-thumb {
    border: 1px solid var(--v-border-base);
    height: 100%;
}
</style>
