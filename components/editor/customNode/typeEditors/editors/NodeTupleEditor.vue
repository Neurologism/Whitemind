<script lang="ts" setup>
import { useNodesData } from '@vue-flow/core';

const props = defineProps<{
  nodeId: string;
  paramName: string;
  shapeDefinition: Record<string, any>;
}>();

const nodesData = useNodesData(props.nodeId)!;
const value = ref(JSON.stringify(nodesData.data[props.paramName]));
watch(value, (newVal) => {
  try {
    newVal = JSON.parse(newVal);
    if (Array.isArray(newVal)) nodesData.data[props.paramName] = newVal;
  } catch (e) {
    console.info('Did not update data because of invalid JSON');
  }
});
</script>

<template>
  <UInput size="2sm" v-model="value"></UInput>
</template>
