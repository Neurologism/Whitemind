<script lang="ts" setup>
import {
  BaseEdge,
  EdgeLabelRenderer,
  getSmoothStepPath,
  Position,
  getBezierPath,
} from '@vue-flow/core';

const flowStore = useVueFlowStore();

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

const useBreezePath = true;

const path = computed(() =>
  useBreezePath
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
        offset,
      })
);

const isHovered = computed(() => flowStore.highlightedEdge === props.id);
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<template>
  <BaseEdge
    :path="path[0]"
    :style="{ ...style, strokeWidth: isHovered ? 3 : 2 }"
  ></BaseEdge>
  <EdgeLabelRenderer>
    <div
      :style="{
        position: 'absolute',
        backgroundColor: style!.stroke,
        transform: `translate(-50%, -50%) translate(${path[1]}px,${path[2]}px)`,
      }"
      class="h-4 w-4 hover:bg-gray-800 p-1 rounded-sm text-center flex justify-center items-center text-white text-lg pointer-events-none shadow-2xl shadow-white"
      :class="{
        hidden: !isHovered,
      }"
      @click="flowStore.removeEdge(props.id)"
    >
      ×
    </div>
  </EdgeLabelRenderer>
</template>
