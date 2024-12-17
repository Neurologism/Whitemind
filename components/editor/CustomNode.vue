<!-- JS intended -->
<script setup>
import { ref, watch } from "vue";
import { Handle, Position, useNodesData, useVueFlow } from "@vue-flow/core";
import { NodeToolbar } from "@vue-flow/node-toolbar";
import { CustomNodes } from "~/components/editor/customNodeList";
import NodeValueEditor from "~/components/editor/typeEditors/NodeValueEditor.vue";
import LineChart from "~/components/editor/charts/LineChart.vue";
import { NodeResizer } from "@vue-flow/node-resizer";
import "@vue-flow/node-resizer/dist/style.css";

const nodeToolbarOpen = ref(false);
const { updateNodeData } = useVueFlow();
const props = defineProps(["props", "nodeId"]);
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
      if (shapeDefinition.type === "id") continue;
      const required = !shapeDefinition.value !== undefined;
      if (required && data.value[key] === undefined) {
        return true;
      }
    }
    return false;
  },
});

const chartComponentsByIdentifier = {
  "line-chart": LineChart,
};

function toggleNodeToolbar() {
  if (Object.keys(shapeData.data).length === 0) return;
  nodeToolbarOpen.value = !nodeToolbarOpen.value;
}
</script>

<template>
  <NodeToolbar :position="Position.Right" :is-visible="nodeToolbarOpen">
    <div
      :class="`hover:scale-105 sized-params bg-customPrimary-950 border-2 border-blue-200 rounded animate__animated animate__fadeIn`"
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
    @click="toggleNodeToolbar"
    :open-delay="750"
    class="h-full w-full"
  >
    <div
      class="text-zinc-50 rounded-sm bg-gray-800 w-full flex flex-col"
      :class="{ 'blink-border': actionRequired }"
      :style="{ border: `2px solid ${shapeGroupData.color}` }"
    >
      <div class="flex justify-between items-center p-2">
        <UIcon :name="shapeGroupData.icon" mode="" />
        <span>{{ shapeData.name }}</span>
      </div>
      <div v-if="shapeGroupData.group_identifier !== 'visualizer'">
        <div v-for="(shapeDefinition, key) in shapeData.data">
          <div
            class="m-3 grid grid-cols-1 items-center justify-between bg-amber-500 font-mono text-sm rounded border-2 border-solid border-gray-900 hover:scale-105 relative p-1"
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
      <div class="p-2 flex-1 w-full" v-else>
        <component
          :is="chartComponentsByIdentifier[shapeData.identifier]"
        ></component>
      </div>
    </div>
  </UTooltip>
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
  <NodeResizer
    v-if="shapeGroupData.group_identifier === 'visualizer'"
    min-width="400"
    min-height="300"
    :color="shapeGroupData.color"
    handle-style="border: 6px solid"
    handle-class-name="rounded-lg"
  />
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

.sized-params {
  min-width: 100px;
}
</style>
