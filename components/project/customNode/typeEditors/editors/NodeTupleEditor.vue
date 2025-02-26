<script lang="ts" setup>
import { useNodesData } from '@vue-flow/core';

const props = defineProps<{
  nodeId: string;
  paramName: string;
  shapeDefinition: Record<string, any>;
}>();

const nodesData = useNodesData(props.nodeId)!;
const value = ref(JSON.stringify(nodesData.value!.data[props.paramName]));
watch(value, (newVal) => {
  try {
    let parsed: (string | number)[] = JSON.parse(newVal);
    if (Array.isArray(newVal)) nodesData.value![props.paramName] = parsed;
  } catch (e) {
    console.info('Did not update data because of invalid JSON');
  }
});
</script>

<template>
  <UInput v-model="value" size="2xs"></UInput>
</template>
