<script lang="ts" setup>
import { ref, watch } from 'vue';
import { Handle, Position, useNodesData, useVueFlow } from '@vue-flow/core';
import { NodeToolbar } from '@vue-flow/node-toolbar';
import { CustomNodes } from '~/components/editor/customNodeList';
import NodeValueEditor from '~/components/editor/customNode/typeEditors/NodeValueEditor.vue';
import LineChart from '~/components/editor/charts/LineChart.vue';
import {
  NodeResizeControl,
  ResizeControlVariant,
} from '@vue-flow/node-resizer';
import '@vue-flow/node-resizer/dist/style.css';
import CustomHandle from '~/components/editor/customNode/CustomHandle.vue';

const nodeToolbarOpen = ref(false);
const { updateNodeData } = useVueFlow();
const props = defineProps(['props', 'nodeId']);
const nodesData = useNodesData(props.nodeId);
const data = ref(nodesData.value!.data);
watch(data, (newData) => {
  updateNodeData(props.nodeId, newData);
});

const shapeData = CustomNodes.getCustomNodeConfig(nodesData.value!.type)!;
const shapeGroupData = CustomNodes.getNodeGroup(nodesData.value!.type)!;

function dataUpdated(key: string, value: any) {
  data.value[key] = value;
}

const actionRequired = computed(() => {
  for (const [key, shapeDefinition] of Object.entries(shapeData.data)) {
    if (shapeDefinition.type === 'id') continue;
    const required = !shapeDefinition.value !== undefined;
    if (required && data.value[key] === undefined) {
      return true;
    }
  }
  return false;
});

const isResizing = ref(false);

const chartComponentsByIdentifier: Record<string, any> = {
  'line-chart': LineChart,
};

function toggleNodeToolbar() {
  if (Object.keys(shapeData.data).length === 0) return;
  nodeToolbarOpen.value = !nodeToolbarOpen.value;
}
</script>

<template>
  <NodeResizeControl
    v-if="shapeData.minSize !== undefined"
    :variant="ResizeControlVariant.Handle"
    :node-id="props.nodeId"
    position="bottom-right"
    color="white"
    class="z-10 rounded-sm hover:scale-105"
    :min-width="shapeData.minSize?.width"
    :min-height="shapeData.minSize?.height"
    @resize-start="isResizing = true"
    @resize-end="isResizing = false"
    :style="{
      height: '1rem',
      width: '1rem',
      alignItems: 'center',
      borderRadius: '2px',
    }"
  >
    <UIcon name="gridicons:resize" class="resize-arrow" />
  </NodeResizeControl>
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
        <UIcon :name="shapeGroupData.icon" />
        <span>{{ shapeData.name }}</span>
      </div>
      <div v-if="shapeGroupData.group_identifier !== 'visualizer'">
        <div v-for="(shapeDefinition, key) in shapeData.data">
          <div
            v-if="shapeDefinition.type === 'id'"
            class="mb-2 ml-3 p-0.5 pr-0 rounded-l-sm bg-gray-300"
            :style="{
              backgroundImage: shapeDefinition.constraints?.allowedCategories
                ? CustomNodes.getHardGradientOfMultipleCategories(
                    shapeDefinition.constraints!.allowedCategories
                  )
                : undefined,
            }"
          >
            <div
              class="grid grid-cols-1 items-center justify-between bg-slate-700 font-mono text-sm rounded-l-sm relative p-1"
            >
              <span class="pr-2 font-semibold font-mono brightness-200">{{
                key
              }}</span>
              <CustomHandle
                :shape-group-data="shapeGroupData"
                :shape-data="shapeData"
                :is-input="shapeData.data[key].flowOrientation! === 'input'"
                :position="Position.Right"
                :handle-id="`val-${key}-${props.nodeId}`"
                :constraints="shapeDefinition.constraints"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="p-2 flex-1 w-full" v-else>
        <component
          v-if="!isResizing"
          :is="chartComponentsByIdentifier[shapeData.identifier]!"
          :nodeid="props.nodeId"
        ></component>
        <div v-else class="h-full w-full bg-slate-700 rounded-sm" />
      </div>
    </div>
  </UTooltip>
  <CustomHandle
    v-if="shapeData.hideInput !== true"
    :shape-group-data="shapeGroupData"
    :shape-data="shapeData"
    :is-input="true"
    :constraints="shapeData.inputConstraints"
    :handle-id="`in-${props.nodeId}`"
    :position="Position.Top"
  />
  <CustomHandle
    v-if="shapeData.hideOutput !== true"
    :shape-group-data="shapeGroupData"
    :shape-data="shapeData"
    :is-input="false"
    :handle-id="`out-${props.nodeId}`"
    :constraints="shapeData.outputConstraints"
    :position="Position.Bottom"
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

.resize-arrow {
  position: absolute;
  left: -0.5px;
  top: -0.5px;
  font-size: 1rem;
  color: black;
}

.sized-params {
  min-width: 100px;
}
</style>
