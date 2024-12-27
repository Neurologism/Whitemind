<script lang="ts" setup>
import { Position, SmoothStepEdge } from '@vue-flow/core';

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  sourceX: {
    type: Number,
    required: true,
  },
  sourceY: {
    type: Number,
    required: true,
  },
  targetX: {
    type: Number,
    required: true,
  },
  targetY: {
    type: Number,
    required: true,
  },
  sourcePosition: {
    type: String as PropType<Position>,
    required: true,
  },
  targetPosition: {
    type: String as PropType<Position>,
    required: true,
  },
  data: {
    type: Object,
    required: false,
  },
  markerEnd: {
    type: String,
    required: false,
  },
  style: {
    type: Object,
    required: false,
  },
});

// random offset between 15 and 35 based on string hash
const offset = Math.abs(
  (props.id
    .split('')
    .reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0) %
    20) +
    15
);
</script>

<template>
  <SmoothStepEdge
    :id="id"
    :sourceX="sourceX"
    :sourceY="sourceY"
    :targetX="targetX"
    :targetY="targetY"
    :sourcePosition="sourcePosition"
    :targetPosition="targetPosition"
    :style="style"
    :offset="offset"
    :marker-end="markerEnd"
    :label-style="{ fill: 'white' }"
    :label-show-bg="true"
    :label-bg-style="{ fill: 'red' }"
    :label-bg-padding="[2, 4]"
    :label-bg-border-radius="2"
  />
</template>
