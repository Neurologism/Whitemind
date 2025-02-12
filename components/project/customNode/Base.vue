<script lang="ts" setup>
import '@vue-flow/node-resizer/dist/style.css';
import ClassicNode from '~/components/project/customNode/ClassicNode.vue';

defineEmits(['node-contextmenu']);

const props = defineProps({
  nodeId: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <ClassicNode :nodeId="props.nodeId" />
</template>

<style scoped></style>
