<script lang="ts" setup>
import { CustomNodes } from '~/components/editor/customNodeList';
import type { ButtonColor } from '#ui/types';

const selectedCategory = ref(0);
const isPermaOpen = ref(false);

function handleDragStart(event: DragEvent, nodeType: string) {
  console.log('setting data to: ', nodeType);
  event.dataTransfer!.setData('node', nodeType);
}

function getRGBColor(colorName: string) {
  const tempElement = document.createElement('div');
  tempElement.style.color = colorName;
  document.body.appendChild(tempElement);

  const computedColor = getComputedStyle(tempElement).color;
  document.body.removeChild(tempElement);

  return computedColor.match(/\d+/g)!.map(Number).toString();
}

function toggleSidebar() {
  isPermaOpen.value = !isPermaOpen.value;
}
</script>

<template>
  <div
    :style="{
      width: isPermaOpen ? '28rem' : '',
    }"
    class="parent-div border-r-2 h-100 border-slate-600 bg-opacity-90 dark:bg-opacity-90 bg-slate-200 dark:bg-slate-800 p-4 pb-8 w-20 focus-within:w-[28rem] origin-left transition-transform flex flex-row flex-nowrap"
    :class="{
      'hover:w-[28rem]': !isPermaOpen,
      'hover:scale-x-105': !isPermaOpen,
    }"
  >
    <div class="h-full flex-none pt-4">
      <div class="h-full flex flex-col">
        <div class="flex-none mb-4">
          <UButton
            class="hover:scale-105 transition-transform"
            color="gray"
            icon="mdi-magnify"
            size="xl"
            square
          ></UButton>
        </div>
        <div
          v-for="(category, index) in CustomNodes.nodesList"
          :key="index"
          class="flex-none items-center mb-3"
        >
          <UTooltip :popper="{ placement: 'right' }" :text="category.name">
            <UButton
              :color="category.color as ButtonColor"
              :icon="category.icon"
              :variant="selectedCategory === index ? 'solid' : 'outline'"
              size="xl"
              square
              @click="selectedCategory = index"
            />
          </UTooltip>
        </div>
        <div class="flex-grow"></div>
        <div class="flex-none flex-col-reverse pt-4">
          <UButton
            :icon="isPermaOpen ? 'mdi-pin' : 'mdi-pin-outline'"
            class="hover:scale-105 transition-transform"
            color="gray"
            size="xl"
            square
            @click="toggleSidebar"
          ></UButton>
        </div>
      </div>
    </div>
    <div
      :class="`${!isPermaOpen ? 'child-div' : ''} h-full flex-none pt-4 ml-2`"
    >
      <!-- TODO: better overflow scrolling solution. Wasted 1h minimum here -->
      <div
        class="m-2 h-[85vh] overflow-y-hidden hover:overflow-y-auto overflow-x-hidden"
      >
        <span
          class="text-2xl text-slate-800 dark:text-slate-200 brightness-200 font-semibold"
          ><UIcon
            class="ml-2 mr-2"
            :name="CustomNodes.nodesList[selectedCategory].icon"
          />{{ CustomNodes.nodesList[selectedCategory].name }}</span
        >
        <div class="flex flex-col">
          <div
            v-for="node in CustomNodes.nodesList[selectedCategory].nodes"
            :key="node.type"
            class="flex-none items-center m-1 ml-3 mr-3 cursor-grab border p-2 pl-4 rounded-md hover:scale-105 transition-transform w-80"
            :style="{
              borderColor: CustomNodes.nodesList[selectedCategory].color,
              backgroundColor: `rgba(${getRGBColor(CustomNodes.nodesList[selectedCategory].color)}, 0.05)`,
            }"
            draggable="true"
            @dragstart="handleDragStart($event, node.type)"
          >
            <!-- @ts-ignore -->
            <UIcon
              :style="{
                color: CustomNodes.nodesList[selectedCategory].color,
              }"
              :name="
                (node as any).icon ??
                CustomNodes.nodesList[selectedCategory].icon
              "
            ></UIcon>
            <span class="text-slate-950 dark:text-slate-50 brightness-150">{{
              node.name
            }}</span>
            <small class="text-gray-600 dark:text-gray-400 brightness-90"
              >&nbsp;{{ node.description }}</small
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* the warning is wrong. Do not delete this CSS classes! */
.parent-div .child-div {
  display: none;
}

.parent-div:hover .child-div,
.parent-div:focus-within .child-div,
.parent-div.is-perma-open .child-div {
  display: block;
}
</style>
