<script lang="ts" setup>
import { useNodesData } from '@vue-flow/core';

const props = defineProps<{
  nodeId: string;
  paramName: string;
  shapeDefinition: Record<string, any>;
}>();

const nodesData = useNodesData(props.nodeId)!;
</script>
<template>
  <div class="m-1">
    <URange
      v-model="nodesData!.data[paramName]"
      :min="shapeDefinition.min"
      :max="shapeDefinition.max"
      :step="shapeDefinition.step"
    >
    </URange>
  </div>
</template>
