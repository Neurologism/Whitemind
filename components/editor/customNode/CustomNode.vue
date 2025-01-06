<script lang="ts" setup>
import { ref } from 'vue';
import { Position, useNodesData } from '@vue-flow/core';
import { CustomNodes } from '~/components/editor/customNodeList';
import NodeValueEditor from '~/components/editor/customNode/typeEditors/NodeValueEditor.vue';
import LineChart from '~/components/editor/charts/LineChart.vue';
import {
  NodeResizeControl,
  ResizeControlVariant,
} from '@vue-flow/node-resizer';
import '@vue-flow/node-resizer/dist/style.css';
import CustomHandle from '~/components/editor/customNode/CustomHandle.vue';

defineEmits(['node-contextmenu']);

const props = defineProps(['props', 'nodeId']);
const nodesData = useNodesData(props.nodeId);
const shapeData = CustomNodes.getCustomNodeConfig(nodesData.value!.type)!;
const shapeGroupData = CustomNodes.getNodeGroup(nodesData.value!.type)!;

const isResizing = ref(false);

const chartComponentsByIdentifier: Record<string, any> = {
  'line-chart': LineChart,
};

// @ts-ignore - the value is set here initialy
nodesData.value.data.isExpanded ??= true;
function toggleExpanded() {
  if (shapeGroupData.group_identifier !== 'visualizer') {
    nodesData.value!.data.isExpanded = !nodesData.value!.data.isExpanded;
  }
}
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
    :style="{ border: `2px solid ${shapeGroupData.color}` }"
    class="h-full w-full text-zinc-50 rounded-sm bg-gray-800 flex flex-col"
  >
    <div
      class="flex justify-between items-center font-mono p-0.5 bg-slate-700 cursor-all-scroll"
    >
      <div
        class="flex justify-between items-center p-1"
        :class="{
          'cursor-pointer': shapeGroupData.group_identifier !== 'visualizer',
        }"
        @click="toggleExpanded"
      >
        <UIcon
          v-if="shapeGroupData.group_identifier !== 'visualizer'"
          name="material-symbols:expand-more"
          :style="{
            transform: nodesData!.data.isExpanded
              ? 'rotate(0deg)'
              : 'rotate(270deg)',
          }"
        />
        <UIcon :name="shapeGroupData.icon" />
      </div>
      <span>{{ shapeData.name }}</span>
    </div>
    <div class="w-full nodrag cursor-default">
      <div
        v-if="shapeGroupData.group_identifier !== 'visualizer'"
        class="mt-0.5 mb-1"
      >
        <div v-for="(shapeDefinition, key) in shapeData.data">
          <div
            v-if="shapeDefinition.type === 'id'"
            :style="{
              backgroundImage: shapeDefinition.constraints?.allowedCategories
                ? CustomNodes.getHardGradientOfMultipleCategories(
                    shapeDefinition.constraints!.allowedCategories
                  )
                : undefined,
            }"
            class="mb-1 p-0.5 bg-gray-300"
            :class="{
              'ml-3 rounded-l-sm pr-0':
                shapeData.data[key].flowOrientation === 'output',
              'mr-3 rounded-r-sm pl-0':
                shapeData.data[key].flowOrientation === 'input',
            }"
          >
            <div
              class="grid grid-cols-1 items-center justify-between bg-slate-700 font-mono text-sm relative"
              :class="{
                'rounded-r-sm': shapeData.data[key].flowOrientation === 'input',
                'rounded-l-sm':
                  shapeData.data[key].flowOrientation === 'output',
              }"
            >
              <span class="pr-2 pl-2 font-semibold font-mono brightness-200">{{
                key
              }}</span>
              <CustomHandle
                :constraints="shapeDefinition.constraints"
                :handle-id="`val-${key}-${props.nodeId}`"
                :is-input="shapeData.data[key].flowOrientation! === 'input'"
                :position="
                  shapeData.data[key].flowOrientation! === 'input'
                    ? Position.Left
                    : Position.Right
                "
                :shape-data="shapeData"
                :shape-group-data="shapeGroupData"
              />
            </div>
          </div>
        </div>
        <div
          v-if="nodesData!.data.isExpanded"
          v-for="(shapeDefinition, key) in shapeData.data"
          :key="key"
          class="grid grid-cols-1 items-center justify-between"
        >
          <NodeValueEditor
            v-if="shapeDefinition.type !== 'id'"
            :node-id="props.nodeId"
            :param-name="key"
            :shape-definition="shapeDefinition"
          />
        </div>
      </div>
      <div v-else class="p-2 flex-1 w-full">
        <component
          :is="chartComponentsByIdentifier[shapeData.identifier]!"
          :nodeid="props.nodeId"
        ></component>
        <!--<div class="h-max w-full bg-slate-500 flex content-end justify-end rounded-sm">hello</div>-->
      </div>
    </div>
  </div>
  <CustomHandle
    v-if="shapeData.hideInput !== true"
    :constraints="shapeData.inputConstraints"
    :handle-id="`in-${props.nodeId}`"
    :is-input="true"
    :position="Position.Top"
    :shape-data="shapeData"
    :shape-group-data="shapeGroupData"
  />
  <CustomHandle
    v-if="shapeData.hideOutput !== true"
    :constraints="shapeData.outputConstraints"
    :handle-id="`out-${props.nodeId}`"
    :is-input="false"
    :position="Position.Bottom"
    :shape-data="shapeData"
    :shape-group-data="shapeGroupData"
  />
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
