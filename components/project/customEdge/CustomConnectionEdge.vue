<script setup lang="ts">
import {
  type ConnectionLineProps,
  SmoothStepEdge,
  getBezierPath,
  getSmoothStepPath,
} from '@vue-flow/core';

const props = defineProps<ConnectionLineProps>();

const sessionStore = useSessionStore();
const projectStore = useProjectStore();

const color = projectStore.editorConfig.getColorOfHandle(
  props.sourceHandle!.id!
);

const path = computed(() =>
  sessionStore.sessionData.smoothEdges
    ? getBezierPath({
        sourceX: props.sourceX,
        sourceY: props.sourceY,
        targetX: props.targetX,
        targetY: props.targetY,
        sourcePosition: props.sourcePosition,
        targetPosition: props.targetPosition,
      })
    : getSmoothStepPath({
        sourceX: props.sourceX,
        sourceY: props.sourceY,
        targetX: props.targetX,
        targetY: props.targetY,
        sourcePosition: props.sourcePosition,
        targetPosition: props.targetPosition,
      })
);
</script>

<template>
  <SmoothStepEdge
    :path="path[0]"
    :sourceX="props.sourceX"
    :sourceY="props.sourceY"
    :targetX="props.targetX"
    :targetY="props.targetY"
    :sourcePosition="props.sourcePosition"
    :targetPosition="props.targetPosition"
    :offset="20"
    :style="{
      strokeWidth: 2,
      stroke: color,
      strokeDasharray: props.connectionStatus === 'valid' ? null : '10, 5',
    }"
  />
</template>
