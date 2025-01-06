<script lang="ts" setup>
import { useNodesData } from '@vue-flow/core';

const props = defineProps<{
  nodeId: string;
  paramName: string;
  shapeDefinition: Record<string, any>;
}>();

const nodesData = useNodesData(props.nodeId)!;
let options = [null];
for (let i = 0; i < props.shapeDefinition.options.length; i++) {
  options.push(props.shapeDefinition.options[i]);
}
</script>

<template>
  <USelect
    variant="outline"
    size="2xs"
    v-model="nodesData.data[paramName]"
    :options="shapeDefinition.options"
  />
</template>
