<script lang="ts" setup>
import { useNodesData } from '@vue-flow/core';
import { onBeforeUnmount, onMounted, ref } from 'vue';

const props = defineProps<{
  nodeId: string;
  paramName: string;
  shapeDefinition: Record<string, any>;
}>();

const nodesData = useNodesData(props.nodeId)!;
let options: string[] = [];
for (let i = 0; i < props.shapeDefinition.options.length; i++) {
  options.push(props.shapeDefinition.options[i]);
}

const baseElement = ref();
const dropdownElement = ref();
const isOpen = ref(false);

function handleClickOutside(event: MouseEvent) {
  if (
    baseElement.value &&
    !baseElement.value.contains(event.target as Node) &&
    dropdownElement.value &&
    !dropdownElement.value.contains(event.target as Node)
  ) {
    isOpen.value = false;
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<template>
  <div
    ref="baseElement"
    class="cursor-default flex flex-row border-0 form-input rounded-md placeholder-gray-500 text-xs px-2 py-1 shadow-sm bg-gray-900 text-text-1 ring-1 ring-inset ring-gray-700"
    @click="isOpen = !isOpen"
    :class="{
      'ring-2 ring-primary-400 outline-none': isOpen,
    }"
  >
    <span class="text-sky-100 flex-1 line-clamp-1 text-ellipsis">{{
      nodesData?.data[paramName] ?? '‐--'
    }}</span>
    <div class="flex-initial flex items-center justify-center">
      <UIcon
        name="i-material-symbols:expand-more"
        :style="{
          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
        }"
        class="mr-2 mt-0.5"
      />
    </div>
  </div>
  <div
    v-if="isOpen"
    ref="dropdownElement"
    class="z-10 absolute h-72 bg-gray-800 border-2 border-gray-900 rounded shadow-lg mt-1 overflow-y-auto overflow-x-hidden"
    :style="{
      width: baseElement?.clientWidth + 'px',
    }"
  >
    <div
      v-for="option in options"
      class="flex flex-row flex-nowrap align-middle cursor-pointer hover:bg-gray-700 px-2 py-1"
      @click="() => (nodesData!.data[paramName] = option)"
    >
      <span class="flex-1 font-mono text-sm line-clamp-1 text-ellipsis">
        <UTooltip :text="option" :open-delay="750">
          {{ option }}
        </UTooltip>
      </span>
      <UIcon
        v-if="nodesData!.data[paramName] === option"
        class="text-base"
        name="mdi-check"
      />
    </div>
  </div>
</template>
