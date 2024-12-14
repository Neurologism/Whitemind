<!-- JS intended -->
<script setup>
import { ref, watch } from 'vue';
import { Handle, Position, useNodesData, useVueFlow } from '@vue-flow/core';
import { NodeToolbar } from '@vue-flow/node-toolbar';
import { CustomNodes } from '~/components/editor/customNodeList';
import NodeValueEditor from '~/components/editor/typeEditors/NodeValueEditor.vue';
const nodeToolbarOpen = ref(false);
const { updateNodeData } = useVueFlow();
const props = defineProps(['props', 'nodeId']);
const nodesData = useNodesData(props.nodeId);
const data = ref(nodesData.value.data);
watch(data, (newData) => {
  console.log(newData);
  updateNodeData(props.nodeId, newData);
});
const shapeData = CustomNodes.getCustomNodeConfig(nodesData.value.type);
const shapeGroupData = CustomNodes.getNodeGroup(nodesData.value.type);

function dataUpdated(key, value) {
  data.value[key] = value;
}

const actionRequired = computed({
  get: () => {
    for (const [key, shapeDefinition] of Object.entries(shapeData.data)) {
      if (shapeDefinition.type === 'id') continue;
      const required = !shapeDefinition.value !== undefined;
      if (required && data.value[key] === undefined) {
        return true;
      }
    }
    return false;
  },
});
</script>

<template>
  <NodeToolbar :position="Position.Right" :is-visible="nodeToolbarOpen">
    <div
      :class="`sized-params bg-customPrimary-950 border-2 border-blue-200 rounded animate__animated animate__fadeIn`"
    >
      <div
        v-for="(shapeDefinition, key) in shapeData.data"
        :key="key"
        class="grid grid-cols-1 items-center justify-between"
      >
        <NodeValueEditor
          v-if="shapeDefinition.type !== 'id'"
          :param-name="key"
          :shape-definition="shapeDefinition"
          :data="data"
          :update-data="dataUpdated"
        />
      </div>
    </div>
  </NodeToolbar>
  <UTooltip
    :text="shapeData.description"
    @click="nodeToolbarOpen = !nodeToolbarOpen"
    :open-delay="750"
  >
    <div
      class="sized text-zinc-50 rounded-sm bg-gray-800"
      :class="{ 'blink-border': actionRequired }"
      :style="{ border: `2px solid ${shapeGroupData.color}` }"
    >
      <div class="flex justify-between items-center p-2">
        <UIcon :name="shapeGroupData.icon" mode="" />
        <span>{{ shapeData.name }}</span>
      </div>
      <div v-for="(shapeDefinition, key) in shapeData.data">
        <div
          class="m-3 grid grid-cols-1 items-center justify-between bg-amber-500 font-mono text-sm rounded border-2 border-solid border-gray-900 relative p-1"
          v-if="shapeDefinition.type === 'id'"
        >
          {{ key }}
          <Handle
            :id="`val-${key}-${props.nodeId}`"
            :position="Position.Right"
            :connectable-start="true"
            :connectable-end="true"
            class="rounded-sm border-2 border-solid border-gray-900"
            :style="{
              height: '10px',
              width: '35px',
              backgroundColor: shapeGroupData.color,
            }"
          />
        </div>
      </div>
    </div>
    <Handle
      v-if="shapeData.type !== 'start'"
      :id="`in-${props.nodeId}`"
      :position="Position.Top"
      class="rounded-sm"
      :connectable-end="true"
      :connectable-start="false"
      :style="{
        height: '10px',
        width: '10px',
        backgroundColor: shapeGroupData.color,
      }"
    />
    <Handle
      :id="`out-${props.nodeId}`"
      :position="Position.Bottom"
      class="rounded-sm"
      :connectable-end="false"
      :connectable-start="true"
      :style="{
        height: '10px',
        width: '10px',
        backgroundColor: shapeGroupData.color,
      }"
    />
  </UTooltip>
</template>

<style scoped>
.blink-border {
  animation: blink 1s infinite;
}

@keyframes blink {
  0% {
    border-color: red;
  }
  50% {
    border-color: transparent;
  }
  100% {
    border-color: red;
  }
}

.sized {
  min-width: 120px;
  min-height: 20px;
  cursor: pointer;
}

.sized-params {
  min-width: 100px;
}
</style>
