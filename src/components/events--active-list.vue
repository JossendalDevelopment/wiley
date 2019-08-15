<template>
    <div>
        <active-list-item v-for="(e, idx) in events" :event="e" :key="e.id + idx"/>
    </div>
</template>
<script>
import ActiveListItem from '@/components/events--active-list-item.vue';

export default {
    components: {
        'active-list-item': ActiveListItem
    },
    props: {
        events: {
            type: Array,
            required: true,
            default: () => []
        }
    }
}
</script>