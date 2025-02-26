<script setup lang="ts">
import { Position, useNodesData } from '@vue-flow/core';
import '@vue-flow/node-resizer/dist/style.css';
import ClassicHandle from '~/components/project/customNode/ClassicHandle.vue';

defineEmits(['node-contextmenu']);

const props = defineProps({
  nodeId: {
    type: String,
    required: true,
  },
});

const projectStore = useProjectStore();
const vueFlowStore = useVueFlowStore();

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

if (nodesData.value === null) {
  throw new Error('Node data is null.');
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
</script>
<template>
  <div
    class="h-full w-full text-zinc-50 rounded-full bg-bg-3 flex flex-col border-2 border-accent-8 shadow-2xl cursor-all-scroll relative"
    @contextmenu.prevent="$emit('node-contextmenu', props.nodeId)"
    :style="{
      width: `${shapeData.circleDiameter ?? shapeGroupData.default_width}px`,
      height: `${shapeData.circleDiameter ?? shapeGroupData.default_width}px`,
      borderColor: shapeGroupData.color,
    }"
  >
    <div
      class="w-full h-full rounded-full overflow-hidden absolute"
      :class="{ hidden: shapeData.hideTopBar }"
    >
      <div
        class="w-full flex justify-between items-center font-mono pt-0.5 pb-0.5 cursor-all-scroll rounded-t absolute"
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
          :shape-data="shapeData"
          :shape-group-data="shapeGroupData"
        />
        <ClassicHandle
          v-if="shapeData.hideOutput !== true"
          :constraints="shapeData.outputConstraints"
          :handle-id="`out-${props.nodeId}`"
          :is-input="false"
          :position="Position.Right"
          :shape-data="shapeData"
          :shape-group-data="shapeGroupData"
        />
        <div
          class="flex justify-between items-center p-1 cursor-pointer ml-auto"
          @click="clickIcons"
        >
          <UIcon :name="shapeGroupData.icon" />
        </div>
        <span
          class="font-semibold mr-auto"
          v-html="
            shapeData.dynamicNodeName
              ? shapeData.dynamicNodeName(nodeObject)
              : shapeData.name
          "
        >
        </span>
      </div>
    </div>
    <div class="my-auto">
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
              class="pr-2.5 pl-2.5 p-0.5 font-mono"
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
              :is-input="shapeDefinition.flowOrientation === 'input'"
              :position="
                (
                  shapeDefinition.invertPosition
                    ? !(shapeDefinition.flowOrientation === 'input')
                    : shapeDefinition.flowOrientation === 'input'
                )
                  ? Position.Left
                  : Position.Right
              "
              :shape-data="shapeData"
              :shape-group-data="shapeGroupData"
            />
          </div>
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
