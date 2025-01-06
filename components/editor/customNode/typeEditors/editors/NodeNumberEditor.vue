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
  <UInput type="number" v-model="nodesData!.data[paramName]" size="2xs">
  </UInput>
</template>
