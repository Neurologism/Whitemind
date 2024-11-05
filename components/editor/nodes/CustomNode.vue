<script setup lang="ts">
import { ref, watch } from 'vue';
import { Handle, Position, useHandleConnections, useNodesData, useVueFlow } from '@vue-flow/core';
const { updateNodeData, getConnectedEdges } = useVueFlow()
const props = defineProps(['data']);
const nodesData = useNodesData(props.data.id);
const data = ref(nodesData.value!.data);
watch(data, (newNode) => {
  updateNodeData(props.data.id, newNode);
});
const connections = useHandleConnections({type: 'target',});




</script>

<template>
  <UContainer class="text-zinc-100 rounded-xl border-4 bg-zinc-600">
    {{ data }}
    <UButton @click="data = {clicked: true}">
      Click ME!
    </UButton>
    <Handle
        type="source"
        :position="Position.Left"
        :style="{ height: '16px', width: '6px', filter: 'invert(100%)' }"
    />
    <Handle
        type="target"
        :position="Position.Right"
        :style="{ height: '16px', width: '6px', filter: 'invert(100%)' }"
    />
  </UContainer>
</template>

<style scoped>

</style>