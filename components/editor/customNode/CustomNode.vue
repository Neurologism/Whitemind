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
    class="h-full w-full text-zinc-50 rounded bg-gray-800 flex flex-col border-r-2 border-2 border-slate-800"
    @contextmenu.prevent="$emit('node-contextmenu', props.nodeId)"
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
      <CustomHandle
        v-if="shapeData.hideInput !== true"
        :constraints="shapeData.inputConstraints"
        :handle-id="`in-${props.nodeId}`"
        :is-input="true"
        :position="Position.Left"
        :shape-data="shapeData"
        :shape-group-data="shapeGroupData"
      />
      <CustomHandle
        v-if="shapeData.hideOutput !== true"
        :constraints="shapeData.outputConstraints"
        :handle-id="`out-${props.nodeId}`"
        :is-input="false"
        :position="Position.Right"
        :shape-data="shapeData"
        :shape-group-data="shapeGroupData"
      />
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
      <span class="font-semibold">{{ shapeData.name }}</span>
    </div>
    <div class="w-full nodrag cursor-default">
      <div
        v-if="shapeGroupData.group_identifier !== 'visualizer'"
        :class="`${nodesData!.data.isExpanded ? 'mt-0.5 mb-1' : null}`"
      >
        <div v-for="(shapeDefinition, key) in shapeData.data">
          <div
            v-if="shapeDefinition.type === 'id'"
            :style="{}"
            class="mt-0.5 mb-0.5 p-0.5"
            :class="{
              'ml-3 rounded-l-sm pr-0':
                shapeData.data[key].flowOrientation === 'output',
              'mr-3 rounded-r-sm pl-0':
                shapeData.data[key].flowOrientation === 'input',
              'justify-end flex':
                shapeData.data[key].flowOrientation === 'output',
            }"
          >
            <div class="font-mono text-sm relative">
              <span
                class="bg-slate-800 pr-2.5 pl-2.5 p-0.5 rounded font-mono"
                >{{ key }}</span
              >
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
          class="mr-1 ml-1 mb-1 bg-slate-700"
          style="height: 1px"
        />
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
