<script lang="ts" setup>
import { useNodesData } from '@vue-flow/core';

const props = defineProps<{
  nodeId: string;
  paramName: string;
  shapeDefinition: Record<string, any>;
}>();

const nodesData = useNodesData(props.nodeId)!;

const rangeRef = ref<HTMLInputElement | null>(null);
const activeColor = '#111827';
const inactiveColor = '#dddddd4d';

const inputCB = (e: InputEvent) => {
  console.log(typeof e);
  const ratio =
    ((nodesData.value?.data[props.paramName] ?? 0 - props.shapeDefinition.min) /
      (props.shapeDefinition.max - props.shapeDefinition.min)) *
    100;
  rangeRef.value!.style.backgroundImage = `linear-gradient(90deg, ${activeColor} ${ratio}%, ${inactiveColor} ${ratio}%)`;
};
</script>
<template>
  <div class="m-1 w-full">
    <div
      class="flex flex-row flex-nowrap h-6 absolute pointer-events-none pl-1.5 pr-1.5 pt-0.5 font-mono text-sm align-bottom"
      :style="{
        width: rangeRef?.clientWidth + 'px',
        height: rangeRef?.clientHeight + 'px',
      }"
    >
      <span class="flex-1">
        {{ paramName }}
      </span>
      <span>
        {{ nodesData!.data[paramName] }}
      </span>
    </div>
    <input
      type="range"
      ref="rangeRef"
      @input="inputCB"
      class="w-full z-50 inputRange cursor-default flex flex-row border-0 form-input rounded-md placeholder-gray-400 dark:placeholder-gray-500 text-xs px-2 py-1 shadow-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 focus:dark:ring-primary-400 focus:outline-none"
      v-model="nodesData!.data[paramName]"
      :min="shapeDefinition.min"
      :max="shapeDefinition.max"
      :step="shapeDefinition.step"
      id="inputRange"
    />
  </div>
</template>
<style scoped>
.inputRange {
  appearance: none;
  background: linear-gradient(90deg, #111827 30%, #dddddd4d 30%);
  cursor: pointer;
  @apply h-6;
}

/* Thumb: for Chrome, Safari, Edge */
.inputRange::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 0;
  box-shadow: none;
  @apply h-6;
}

/* Thumb: for Firefox */
.inputRange::-moz-range-thumb {
  border-radius: 0;
  width: 0;
  border: none;
  box-shadow: none;
  @apply h-6;
}
</style>
