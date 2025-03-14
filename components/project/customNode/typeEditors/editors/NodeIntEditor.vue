<script lang="ts" setup>
import { useNodesData } from '@vue-flow/core';

const props = defineProps<{
  nodeId: string;
  paramName: string;
  shapeDefinition: Record<string, any>;
}>();

const nodesData = useNodesData(props.nodeId)!;
const step: number | undefined = props.shapeDefinition.step;
const min: number | undefined = props.shapeDefinition.min;
const max: number | undefined = props.shapeDefinition.max;

function addClick() {
  if (nodesData.value!.data[props.paramName] === undefined) {
    nodesData.value!.data[props.paramName] = 0;
  }
  nodesData.value!.data[props.paramName] += step!;
  if (max && nodesData.value!.data[props.paramName] > max) {
    nodesData.value!.data[props.paramName] = max;
  }
}

function minusClick() {
  if (nodesData.value!.data[props.paramName] === undefined) {
    nodesData.value!.data[props.paramName] = 0;
  }
  nodesData.value!.data[props.paramName] -= step!;
  if (min && nodesData.value!.data[props.paramName] < min) {
    nodesData.value!.data[props.paramName] = min;
  }
}

const isValidNumber = ref(false);

watch(
  () => nodesData.value!.data[props.paramName],
  () => {
    checkNumber();
  }
);

function checkNumber() {
  let number = Number(nodesData.value!.data[props.paramName]);
  if (nodesData.value!.data[props.paramName] === props.shapeDefinition.value) {
    isValidNumber.value = true;
    return;
  }
  if (!Number.isInteger(number)) {
    isValidNumber.value = false;
    return;
  }
  if (isNaN(number)) {
    isValidNumber.value = false;
    return;
  }
  if (min && number < min) {
    console.log('min', min);
    isValidNumber.value = false;
    return;
  }
  isValidNumber.value = !(max && number > max);
}
checkNumber();
</script>
<template>
  <div class="w-full">
    <div
      class="flex-nowrap w-full inputRange cursor-default flex flex-row border-0 form-input rounded-md placeholder-accent-5 text-xs shadow-sm px-0 py-1 bg-bg-2 text-text-1 ring-1 ring-inset ring-accent-7 focus-within:ring-2 focus-within:ring-primary-400 focus-within:outline-none"
      :class="{
        'ring-2 ring-red-400 outline-none': !isValidNumber,
      }"
    >
      <div
        v-if="step !== undefined"
        class="w-8 flex-none flex justify-center place-items-center cursor-pointer border-r-[1px] border-accent-7 mr-1"
        @click="minusClick"
      >
        <UIcon name="mdi-minus" />
      </div>
      <div class="flex-1 mx-1">
        <input
          type="number"
          inputmode="numeric"
          placeholder="int"
          class="w-full bg-transparent border-0 outline-none"
          v-model="nodesData!.data[paramName]"
        />
      </div>
      <div
        v-if="step !== undefined"
        class="w-8 flex-none flex justify-center place-items-center cursor-pointer border-l-[1px] border-accent-7 ml-1"
        @click="addClick"
      >
        <UIcon name="mdi-plus" />
      </div>
    </div>
  </div>
</template>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type='number'] {
  -moz-appearance: textfield;
}
</style>
