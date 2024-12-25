<script lang="ts" setup>
import { ref, watch } from 'vue';
import { Handle, Position, useNodesData, useVueFlow } from '@vue-flow/core';
import { NodeToolbar } from '@vue-flow/node-toolbar';
import { CustomNodes } from '~/components/editor/customNodeList';
import NodeValueEditor from '~/components/editor/typeEditors/NodeValueEditor.vue';
import LineChart from '~/components/editor/charts/LineChart.vue';
import {
  NodeResizeControl,
  ResizeControlVariant,
} from '@vue-flow/node-resizer';
import type { Connection, GraphEdge, GraphNode } from '@vue-flow/core';
import '@vue-flow/node-resizer/dist/style.css';
import type {
  NodeConnectionConstraint,
  NodeDefinition,
} from '~/components/editor/blocks';

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

function checkConnection(
  connection: Connection,
  elements: {
    edges: GraphEdge[];
    nodes: GraphNode[];
    sourceNode: GraphNode;
    targetNode: GraphNode;
  }
): boolean {
  const sourceNodeDefinition: NodeDefinition = CustomNodes.getCustomNodeConfig(
    elements.sourceNode.type
  )!;
  const targetNodeDefinition: NodeDefinition = CustomNodes.getCustomNodeConfig(
    elements.targetNode.type
  )!;
  let sourceConstrains: NodeConnectionConstraint = {};
  let targetConstrains: NodeConnectionConstraint = {};
  if (connection.sourceHandle!.startsWith('out')) {
    sourceConstrains = sourceNodeDefinition.outputConstraints ?? {};
  } else if (connection.sourceHandle!.startsWith('val')) {
    let key = connection.sourceHandle!.split('-')[1];
    sourceConstrains = sourceNodeDefinition.data[key].constrains ?? {};
  }
  if (connection.targetHandle!.startsWith('in')) {
    targetConstrains = targetNodeDefinition.inputConstraints ?? {};
  } else if (connection.targetHandle!.startsWith('val')) {
    let key = connection.targetHandle!.split('-')[1];
    targetConstrains = targetNodeDefinition.data[key].constrains ?? {};
  }
  console.log(sourceConstrains, targetConstrains);
  //TODO: Implement connection constraints checks
  return true;
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
              backgroundImage: shapeDefinition.constrains?.allowedCategories
                ? CustomNodes.getHardGradientOfMultipleCategories(
                    shapeDefinition.constrains!.allowedCategories
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
              <Handle
                :id="`val-${key}-${props.nodeId}`"
                :position="Position.Right"
                :connectable-start="
                  shapeData.data[key].flowOrientation! === 'output'
                "
                :connectable-end="
                  shapeData.data[key].flowOrientation! === 'input'
                "
                :is-valid-connection="checkConnection"
                class="rounded-sm h-3 w-3 hover:w-4 hover:h-4 origin-center text-center border-solid flex items-center justify-center"
                :style="{
                  backgroundImage: shapeDefinition.constrains?.allowedCategories
                    ? CustomNodes.getHardGradientOfMultipleCategories(
                        shapeDefinition.constrains!.allowedCategories,
                        true
                      )
                    : undefined,
                  backgroundColor: shapeGroupData.color,
                }"
              >
                <UIcon
                  :name="
                    shapeData.data[key].flowOrientation! === 'output'
                      ? 'material-symbols:play-arrow'
                      : 'material-symbols:arrow-back-2'
                  "
                  mode="css"
                  size="1rem"
                  class="text-white pointer-events-none"
                />
              </Handle>
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
  <Handle
    v-if="shapeData.hideInput !== true"
    :id="`in-${props.nodeId}`"
    :position="Position.Top"
    :is-valid-connection="checkConnection"
    class="rounded-sm h-3 w-3 hover:w-4 hover:h-4 flex items-center justify-center"
    :connectable-end="true"
    :connectable-start="false"
    :style="{
      backgroundColor: shapeGroupData.color,
    }"
  >
    <UIcon
      name="material-symbols:arrow-back-2"
      mode="css"
      size="1rem"
      class="text-white rotate-[270deg] pointer-events-none"
    />
  </Handle>
  <Handle
    v-if="shapeData.hideOutput !== true"
    :id="`out-${props.nodeId}`"
    :position="Position.Bottom"
    :is-valid-connection="checkConnection"
    class="rounded-sm h-3 w-3 hover:w-4 hover:h-4 flex items-center justify-center"
    :connectable-end="false"
    :connectable-start="true"
    :style="{
      backgroundColor: shapeGroupData.color,
    }"
  >
    <UIcon
      name="material-symbols:arrow-back-2"
      mode="css"
      size="1rem"
      class="text-white rotate-[270deg] pointer-events-none"
    />
  </Handle>
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
