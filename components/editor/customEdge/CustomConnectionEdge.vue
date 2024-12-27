<script setup lang="ts">
import { CustomNodes } from '~/components/editor/customNodeList.js';
import { type ConnectionLineProps, SmoothStepEdge } from '@vue-flow/core';

const props = defineProps<ConnectionLineProps>();

const color = CustomNodes.getColorOfHandle(props.sourceHandle!.id!);
</script>

<template>
  <SmoothStepEdge
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
