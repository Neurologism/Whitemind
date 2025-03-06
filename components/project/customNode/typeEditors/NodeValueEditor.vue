<script lang="ts" setup>
import type { NodeDefinitionDataEntry } from '~/types/blocks.types';
import { useNodesData } from '@vue-flow/core';
import { nodeDataEditors } from '~/data/classic.data.editors';

const props = defineProps<{
  paramName: string;
  shapeDefinition: NodeDefinitionDataEntry;
  nodeId: string;
}>();

const nodesData = useNodesData(props.nodeId)!;

function deepEqual(a: any, b: any) {
  return JSON.stringify(a) === JSON.stringify(b);
}

const actionRequired = computed(() => {
  if (props.shapeDefinition.type === 'nested') return false;
  if (props.shapeDefinition.type === 'id') return false;
  const required = !props.shapeDefinition.value !== undefined;
  return required && nodesData.value?.data[props.paramName] === undefined;
});

if (nodeDataEditors[props.shapeDefinition.type] === undefined) {
  console.warn(
    `No editor found for type "${props.shapeDefinition.type}" in NodeValueEditor`
  );
}
</script>

<template>
  <div
    v-if="
      !('inline' in props.shapeDefinition
        ? props.shapeDefinition.inline
        : false)
    "
    class="pr-1 pl-1 grid grid-cols-1 text-sky-100"
  >
    <div class="flex flex-row flex-nowrap">
      <div class="flex-none flex items-center justify-start">
        <UTooltip :popper="{ adaptive: true, resize: false, placement: 'top' }">
          <span
            :class="{ 'blink-underline': actionRequired }"
            class="flex-none text-sm font-mono"
            >{{ paramName.split('.').pop() }}</span
          >
          <template #text>
            <span class="text-sky-100 text-xs font-mono font-thin">
              <span class="font-semibold">type: </span
              >{{ shapeDefinition.type }}</span
            >
            <span class="ml-2 text-sky-100 text-xs font-mono font-thin">
              <span class="font-semibold">default: </span>
              {{ props.shapeDefinition }}
            </span>
          </template>
        </UTooltip>
      </div>
      <div class="flex-none m-1"></div>
      <div class="flex-1 ml-2">
        <component
          :is="nodeDataEditors[shapeDefinition.type]"
          :key="`${paramName}-${nodeId}`"
          :nodeId="nodeId"
          :paramName="paramName"
          :shapeDefinition="shapeDefinition"
        />
      </div>
      <div
        v-if="
          !deepEqual(
            props.shapeDefinition,
            nodesData?.data[paramName] ?? undefined
          )
        "
        class="flex-none p-1 ml-1 z-10 flex items-center justify-center cursor-pointer"
        @click="nodesData!.data[paramName] = shapeDefinition"
      >
        <UIcon name="mdi-reload" />
      </div>
    </div>
  </div>
  <div v-else>
    <div class="flex flex-row flex-nowrap">
      <div class="flex-1 ml-1 mr-1 mt-0.5 mb-0.5">
        <component
          :is="nodeDataEditors[shapeDefinition.type]"
          :key="`${paramName}-${nodeId}`"
          :nodeId="nodeId"
          :paramName="paramName"
          :shapeDefinition="shapeDefinition"
        />
      </div>
      <div
        v-if="
          !deepEqual(
            shapeDefinition,
            nodesData?.data[paramName] ?? undefined
          ) && props.shapeDefinition.type !== 'nested'
        "
        class="flex-none p-1 ml-1 mr-1 z-10 flex items-center justify-center cursor-pointer"
        @click="nodesData!.data[paramName] = shapeDefinition"
      >
        <UIcon name="mdi-reload" />
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes blink {
  0% {
    text-decoration-color: red;
  }
  50% {
    text-decoration-color: rgba(255, 0, 0, 0.5);
  }
  100% {
    text-decoration-color: red;
  }
}

.blink-underline {
  text-decoration: underline;
  animation: blink 5s infinite;
}
</style>
