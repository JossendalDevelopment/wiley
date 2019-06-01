<template>
    <v-layout row wrap>
        <v-flex xs12 v-for="x in 12" :key="x" class="app-list-item-container">
            <v-card flat class="app-list-item">
                <v-layout row justify-space-between pt-3 px-4>
                    <p class="app-list-item-username">{{ $auth.user.email }}</p>
                    <p class="app-list-item-username">date</p>
                </v-layout>
                <v-card-text class="app-list-item-content">Sweet content Sweet content Sweet content Sweet content Sweet content Sweet content Sweet content Sweet content Sweet content Sweet content Sweet content</v-card-text>
            </v-card>
        </v-flex>
    </v-layout>
</template>
<script>
</script>
<style lang="scss" scoped>
.app-list-item-container {
    border: 1px solid var(--v-border-base);
    background-color: var(--v-buttonBlack-base);
    margin-bottom: 8px;
    // height: 40px;
}
.app-list-item {
    background-color: var(--v-buttonBlack-base);
    color: #FFF;
    &-username {
        padding-bottom: 0px;
    }
    &-content {
        padding-top: 0px;
    }
}
</style>
