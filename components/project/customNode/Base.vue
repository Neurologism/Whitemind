<script lang="ts" setup>
import '@vue-flow/node-resizer/dist/style.css';
import ClassicNode from '~/components/project/customNode/ClassicNode.vue';
import CircleNode from '~/components/project/customNode/CircleNode.vue';
import { useNodesData } from '@vue-flow/core';
import { NodeDisplay } from '~/types/blocks.types';

defineEmits(['node-contextmenu']);

const props = defineProps({
  nodeId: {
    type: String,
    required: true,
  },
});

const projectStore = useProjectStore();

const nodesData = useNodesData(props.nodeId);
const shapeData = projectStore.editorConfig.getCustomNodeConfig(
  nodesData.value!.type
)!;

const DISPLAY_NODES: Record<NodeDisplay, any> = {
  CLASSIC: ClassicNode,
  CIRCLE: CircleNode,
  RECTANGLE: ClassicNode,
};
</script>

<template>
  <component
    :is="DISPLAY_NODES[shapeData.display]"
    :nodeId="props.nodeId"
    @node-contextmenu="$emit('node-contextmenu', nodeId)"
  />
</template>

<style scoped></style>
