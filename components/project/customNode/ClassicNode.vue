<script setup lang="ts">
import { Position, useNodesData } from '@vue-flow/core';
import NodeValueEditor from '~/components/project/customNode/typeEditors/NodeValueEditor.vue';
import LineChart from '~/components/project/charts/LineChart.vue';
import {
  NodeResizeControl,
  ResizeControlVariant,
} from '@vue-flow/node-resizer';
import '@vue-flow/node-resizer/dist/style.css';
import ClassicHandle from '~/components/project/customNode/ClassicHandle.vue';
import { EditorConfig } from '~/types/editorConfig.class';
import StartTrainingButton from '../StartTrainingButton.vue';
import DatasetNode from '~/components/project/customNode/DatasetNode/DatasetNode.vue';

defineEmits(['node-contextmenu']);

const props = defineProps({
  nodeId: {
    type: String,
    required: true,
  },
});

const projectStore = useProjectStore();
const vueFlowStore = useVueFlowStore();
const trainingStore = useTrainingStore();

const nodeObject = computed(() => {
  const nodeObject = vueFlowStore.getNode(props.nodeId);
  if (!nodeObject) {
    throw new Error('Node for specified nodeId does not exist.');
  }
  return nodeObject;
});

const nodesData = useNodesData(props.nodeId);
const shapeData = projectStore.editorConfig.getCustomNodeConfig(
  nodesData.value!.type
)!;
const shapeGroupData = projectStore.editorConfig.getNodeGroup(
  nodesData.value!.type
)!;

const isResizing = ref(false);

const chartComponentsByIdentifier: Record<string, any> = {
  'line-chart': LineChart,
};

if (nodesData.value === null) {
  throw new Error('Node data is null');
}
nodesData.value.data.isExpanded ??= true;
nodesData.value.data.showVisConfigs ??= false;

function clickIcons() {
  if (shapeGroupData.group_identifier !== 'visualizer') {
    nodesData.value!.data.isExpanded = !nodesData.value!.data.isExpanded;
  }
  if (shapeGroupData.group_identifier === 'visualizer') {
    nodesData.value!.data.showVisConfigs =
      !nodesData.value!.data.showVisConfigs;
  }
}

const lastTrainingDataForNode = trainingStore.lastVisualizerData(props.nodeId);
const renderTrainingDataInHeader = computed(() => {
  return Object.keys(lastTrainingDataForNode.value).length <= 2;
});
</script>

<template>
  <NodeResizeControl
    v-if="shapeData.minSize !== undefined"
    :min-height="shapeData.minSize?.height"
    :min-width="shapeData.minSize?.width"
    :node-id="props.nodeId"
    :style="{
      height: '1rem',
      width: '1rem',
      alignItems: 'center',
      borderRadius: '2px',
    }"
    :variant="ResizeControlVariant.Handle"
    class="z-30 rounded-sm hover:scale-105 cursor-crosshair"
    color="white"
    position="bottom-right"
    @resize-start="isResizing = true"
    @resize-end="isResizing = false"
  >
    <UIcon class="resize-arrow" name="gridicons:resize" />
  </NodeResizeControl>
  <div
    class="h-full w-full text-zinc-50 rounded bg-bg-3 flex flex-col border-r-2 border-2 border-accent-8 shadow-2xl"
    @contextmenu.prevent="$emit('node-contextmenu', props.nodeId)"
    :style="{
      width: `${shapeGroupData.default_width}px`,
    }"
  >
    <div
      class="flex justify-between items-center font-mono pt-0.5 pb-0.5 cursor-all-scroll rounded-t relative"
      :class="{
        'pl-1.5': shapeData.hideInput !== true,
        'pr-3': shapeData.hideOutput !== true,
        'pr-1': shapeData.hideOutput === true,
      }"
      :style="{
        backgroundColor: shapeGroupData.color,
      }"
    >
      <ClassicHandle
        v-if="shapeData.hideInput !== true"
        :constraints="shapeData.inputConstraints"
        :handle-id="`in-${props.nodeId}`"
        :is-input="true"
        :position="Position.Left"
        :shape-group-data="shapeGroupData"
      />
      <ClassicHandle
        v-if="shapeData.hideOutput !== true"
        :constraints="shapeData.outputConstraints"
        :handle-id="`out-${props.nodeId}`"
        :is-input="false"
        :position="Position.Right"
        :shape-group-data="shapeGroupData"
      />
      <div class="flex justify-between items-center p-1 cursor-pointer">
        <UIcon
          v-if="
            EditorConfig.nodeHasNonIdData(shapeData) &&
            shapeGroupData.group_identifier !== 'visualizer'
          "
          name="material-symbols:expand-more"
          @click="clickIcons"
          :style="{
            transform: nodesData!.data.isExpanded
              ? 'rotate(0deg)'
              : 'rotate(270deg)',
          }"
        />
        <UIcon :name="shapeGroupData.icon" @click="clickIcons" />
        <UIcon
          v-if="shapeGroupData.group_identifier === 'visualizer'"
          @click="clickIcons"
          :name="
            nodesData!.data.showVisConfigs
              ? 'mdi-settings'
              : 'mdi-settings-outline'
          "
        />
        <StartTrainingButton
          v-if="shapeData.identifier === 'Model'"
          :node-id="props.nodeId"
        />
        <div
          v-if="
            shapeGroupData.group_identifier !== 'visualizer' &&
            renderTrainingDataInHeader
          "
          class="flex flex-1 flex-wrap text-xs items-center justify-center"
        >
          <div v-for="(value, key) in lastTrainingDataForNode">
            <span
              class="bg-opacity-40 bg-gray-900 mx-0.5 p-0.5 rounded-sm text-nowrap leading-5"
              >{{ key }} {{ value }}</span
            >
          </div>
        </div>
      </div>
      <span
        class="font-semibold"
        v-html="
          shapeData.dynamicNodeName
            ? shapeData.dynamicNodeName(nodeObject)
            : shapeData.name
        "
      ></span>
    </div>
    <div class="w-full h-full nodrag nowheel cursor-default">
      <div
        v-if="
          shapeGroupData.group_identifier !== 'visualizer' &&
          !renderTrainingDataInHeader
        "
        class="font-mono flex flex-1 flex-wrap text-xs text-center justify-center mt-1"
      >
        <div v-for="(value, key) in lastTrainingDataForNode">
          <span
            class="bg-opacity-60 bg-gray-900 mx-0.5 p-0.5 rounded-sm text-nowrap leading-5"
            >{{ key }}: {{ value }}</span
          >
        </div>
      </div>
      <div
        v-if="
          shapeGroupData.group_identifier === 'visualizer' &&
          nodesData!.data.showVisConfigs
        "
        class="p-2 flex-1 h-full w-full"
      >
        <component
          :is="chartComponentsByIdentifier[shapeData.identifier]!"
          :nodeId="props.nodeId"
        ></component>
      </div>
      <div v-if="shapeData.identifier === 'dataset'">
        <DatasetNode
          :node-id="nodeId"
          :shape-data="shapeData"
          :shape-group-data="shapeGroupData"
        />
      </div>
      <div
        :class="`${EditorConfig.nodeHasNonIdData(shapeData) && nodesData!.data.isExpanded ? 'mt-0.5 mb-1' : null}`"
      >
        <div v-for="(shapeDefinition, key) in shapeData.data">
          <div
            v-if="shapeDefinition.type === 'id'"
            class="mt-0.5 mb-0.5 p-0.5"
            :class="{
              'ml-3 rounded-l-sm pr-0': shapeDefinition.invertPosition
                ? !(shapeDefinition.flowOrientation === 'output')
                : shapeDefinition.flowOrientation === 'output',
              'mr-3 rounded-r-sm pl-0': shapeDefinition.invertPosition
                ? !(shapeDefinition.flowOrientation === 'input')
                : shapeDefinition.flowOrientation === 'input',
              'justify-end flex': shapeDefinition.invertPosition
                ? !(shapeDefinition.flowOrientation === 'output')
                : shapeDefinition.flowOrientation === 'output',
            }"
          >
            <div class="font-mono text-sm relative">
              <span
                class="bg-bg-3 pr-2.5 pl-2.5 p-0.5 rounded font-mono"
                v-html="
                  shapeDefinition.dynamicAttributeName
                    ? shapeDefinition.dynamicAttributeName(nodeObject)
                    : key
                "
              >
              </span>
              <ClassicHandle
                :constraints="shapeDefinition.constraints"
                :handle-id="`val-${key}-${props.nodeId}`"
                :key="`${key}-${props.nodeId}`"
                :is-input="shapeDefinition.flowOrientation! === 'input'"
                :position="
                  (
                    shapeDefinition.invertPosition
                      ? !(shapeDefinition.flowOrientation === 'input')
                      : shapeDefinition.flowOrientation === 'input'
                  )
                    ? Position.Left
                    : Position.Right
                "
                :shape-group-data="shapeGroupData"
              />
            </div>
          </div>
        </div>
        <div
          v-if="
            EditorConfig.nodeHasNonIdData(shapeData) &&
            nodesData!.data.isExpanded &&
            !nodesData!.data.showVisConfigs
          "
          class="mr-1 ml-1 mb-1 bg-bg-4"
          style="height: 1px"
        />
        <div
          v-if="
            EditorConfig.nodeHasNonIdData(shapeData) &&
            nodesData!.data.isExpanded &&
            !nodesData!.data.showVisConfigs
          "
          v-for="(shapeDefinition, key) in shapeData.data"
          class="grid grid-cols-1 mb-0.5 mt-1 items-center justify-between"
        >
          <NodeValueEditor
            :key="key"
            v-if="shapeDefinition.type !== 'id'"
            :node-id="props.nodeId"
            :param-name="key"
            :shape-definition="shapeDefinition"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.resize-arrow {
  position: absolute;
  left: -0.5px;
  top: -0.5px;
  font-size: 1rem;
  color: black;
}
</style>
