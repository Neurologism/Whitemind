<!-- JS intended -->
<script setup>
import { ref, watch } from 'vue';
import { Handle, Position, useHandleConnections, useNodesData, useVueFlow } from '@vue-flow/core';
import { NodeToolbar } from '@vue-flow/node-toolbar';
import {CustomNodes} from "~/components/editor/customNodeList";
import NodeValueEditor from "~/components/editor/typeEditors/NodeValueEditor.vue";
const nodeToolbarOpen = ref(false);
const { updateNodeData, getConnectedEdges } = useVueFlow()
const props = defineProps(['props', 'nodeId']);
const nodesData = useNodesData(props.nodeId);
const data = ref(nodesData.value.data);
watch(data, (newData) => {
  console.log(newData)
  updateNodeData(props.nodeId, newData);
});
const shapeData = CustomNodes.getCustomNodeConfig(nodesData.value.type);
const shapeGroupData = CustomNodes.getNodeGroup(nodesData.value.type);

</script>

<template>
  <NodeToolbar
      :position="Position.Right"
      :is-visible="nodeToolbarOpen"
  >
    <div :class="`hover:scale-105 sized-params bg-customPrimary-950 border-2 border-blue-200 rounded animate__animated animate__fadeIn`">
      <div
          v-for="(shapeDefinition, key) in shapeData.data"
          :key="index"
          class="grid grid-cols-1 items-center justify-between"
      >
      <NodeValueEditor :param-name="key" :shape-definition="shapeDefinition" :data="data" />
      </div>
    </div>
  </NodeToolbar>
  <UTooltip
   :text="shapeData.description"
   @click="nodeToolbarOpen = !nodeToolbarOpen"
   open-delay="750"
  >
    <div class="sized text-zinc-50 rounded-sm bg-gray-800" :style="{ border: `2px solid ${shapeGroupData.color}`}">
      <div class="flex justify-between items-center p-2">
        <UIcon :name="shapeGroupData.icon" mode="" />
        <span>{{ shapeData.name }}</span>
      </div>
    </div>
    <Handle
        type="target"
        id="in"
        :position="Position.Top"
        class="rounded-sm"
        :style="{ height: '10px', width: '10px', backgroundColor: shapeGroupData.color }"
    />
    <Handle
        type="source"
        id="out"
        :position="Position.Bottom"
        class="rounded-sm"
        :style="{ height: '10px', width: '10px', backgroundColor: shapeGroupData.color }"
    />
  </UTooltip>

</template>

<style scoped>
.sized {
  min-width: 120px;
  min-height: 20px;
  @apply cursor-pointer;
}

.sized-params {
  min-width: 100px;
}
</style>