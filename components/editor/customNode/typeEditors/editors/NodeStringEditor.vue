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
  <UInput
    class="text-sky-100"
    size="2xs"
    v-model="nodesData.data[paramName]"
  ></UInput>
</template>
