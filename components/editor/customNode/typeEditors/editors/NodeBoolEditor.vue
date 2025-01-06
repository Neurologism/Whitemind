<script setup lang="ts">
import { useNodesData } from '@vue-flow/core';

const props = defineProps<{
  nodeId: string;
  paramName: string;
  shapeDefinition: Record<string, any>;
}>();

const nodesData = useNodesData(props.nodeId)!;
</script>

<template>
  <UCheckbox
    class="ml-1"
    v-model="nodesData.data[paramName]"
    :label="paramName"
  />
</template>
