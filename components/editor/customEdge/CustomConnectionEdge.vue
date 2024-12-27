<script setup lang="ts">
import { CustomNodes } from '~/components/editor/customNodeList.js';
import { SmoothStepEdge } from '@vue-flow/core';

const props = defineProps({
  sourceHandle: {
    type: Object,
    required: true,
  },
});

const color = CustomNodes.getColorOfHandle(props.sourceHandle.id);
</script>

<template>
  <SmoothStepEdge
    v-bind="props"
    :style="{
      strokeWidth: 2,
      stroke: color,
      strokeDasharray: props.connectionStatus === 'valid' ? null : '10, 5',
    }"
  >
  </SmoothStepEdge>
</template>
