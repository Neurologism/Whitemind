<script setup lang="ts">
import { useNodesData } from '@vue-flow/core';

const props = defineProps<{
  nodeId: string;
  paramName: string;
  shapeDefinition: Record<string, any>;
}>();

const nodesData = useNodesData(props.nodeId)!;
const label = props.paramName.split('.').pop();
</script>

<template>
  <UCheckbox
    class="font-mono"
    v-model="nodesData.data[paramName]"
    :label="label"
  />
</template>
