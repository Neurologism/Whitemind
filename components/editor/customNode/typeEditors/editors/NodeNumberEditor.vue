<script lang="ts" setup>
import { useNodesData } from '@vue-flow/core';

const props = defineProps<{
  nodeId: string;
  paramName: string;
  shapeDefinition: Record<string, any>;
}>();

const nodesData = useNodesData(props.nodeId)!;
const step: number | undefined = 1;
const min: number | undefined = 0;
const max: number | undefined = 100;

function addClick() {
  if (nodesData.value!.data[props.paramName] === undefined) {
    nodesData.value!.data[props.paramName] = 0;
  }
  nodesData.value!.data[props.paramName] += step!;
  if (max && nodesData.value!.data[props.paramName] > max) {
    nodesData.value!.data[props.paramName] = max;
  }
  checkNumber();
}

function minusClick() {
  if (nodesData.value!.data[props.paramName] === undefined) {
    nodesData.value!.data[props.paramName] = 0;
  }
  nodesData.value!.data[props.paramName] -= step!;
  if (min && nodesData.value!.data[props.paramName] < min) {
    nodesData.value!.data[props.paramName] = min;
  }
  checkNumber();
}

const isValidNumber = ref(true);

function checkNumber() {
  if (nodesData.value!.data[props.paramName] === props.shapeDefinition.value) {
    return true;
  }
  if (isNaN(nodesData.value!.data[props.paramName])) {
    return false;
  }
  if (min && nodesData.value!.data[props.paramName] < min) {
    return false;
  }
  return !(max && nodesData.value!.data[props.paramName] > max);
}
checkNumber();
</script>
<template>
  <div class="w-full">
    <div
      class="flex-nowrap w-full inputRange cursor-default flex flex-row border-0 form-input rounded-md placeholder-gray-400 dark:placeholder-gray-500 text-xs shadow-sm px-0 py-1 bg-white dark:bg-gray-900 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus-within:ring-2 focus-within:ring-primary-500 focus-within:dark:ring-primary-400 focus-within:outline-none"
      :class="{
        'ring-2 ring-red-500 dark:ring-red-400 outline-none': !isValidNumber,
      }"
    >
      <div
        v-if="step !== undefined"
        class="w-8 flex-none flex justify-center place-items-center cursor-pointer border-r-[1px] border-gray-700 mr-1"
        @click="minusClick"
      >
        <UIcon name="mdi-minus" />
      </div>
      <div class="flex-1">
        <input
          class="w-full bg-transparent border-0 outline-none"
          v-model="nodesData!.data[paramName]"
          @input="checkNumber"
        />
      </div>
      <div
        v-if="step !== undefined"
        class="w-8 flex-none flex justify-center place-items-center cursor-pointer border-l-[1px] border-gray-700 ml-1"
        @click="addClick"
      >
        <UIcon name="mdi-plus" />
      </div>
    </div>
  </div>
</template>
