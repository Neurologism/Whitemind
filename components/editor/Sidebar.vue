<script setup lang="ts">
import { CustomNodes } from "~/components/editor/customNodeList";
import type { ButtonColor } from "#ui/types";

const isOpen = ref(false);

const selectedCategory = ref(0);

function handleDragStart(event: DragEvent, nodeType: string) {
  isOpen.value = false;
  console.log("setting data to: ", nodeType);
  event.dataTransfer!.setData("node", nodeType);
}

function searchButtonClicked() {
  alert("Not here jet");
}
</script>

<template>
  <div
    class="rounded-md border-2 border-customPrimary-900 bg-customPrimary-950 bg-opacity-85 p-4 pb-8 h-full w-20 hover:w-96 focus-within:w-96 hover:scale-x-105 transition-transform"
  >
    <div class="flex" style="height: 100%">
      <div class="flex-none pt-4">
        <div class="mb-4">
          <UButton
            icon="mdi-magnify"
            size="xl"
            color="gray"
            square
            @click="isOpen = !isOpen"
            class="hover:scale-105 transition-transform"
          ></UButton>
        </div>
        <div
          v-for="(category, index) in CustomNodes.nodesList"
          :key="index"
          class="flex flex-col items-center mb-3"
        >
          <UTooltip :text="category.name" :popper="{ placement: 'right' }">
            <UButton
              :icon="category.icon"
              size="xl"
              :color="category.color as ButtonColor"
              square
              :variant="selectedCategory === index ? 'solid' : 'outline'"
              @click="selectedCategory = index"
              class="hover:scale-105 transition-transform"
            />
          </UTooltip>
        </div>
      </div>
      <div class="flex-1 ml-2 mb-2 overflow-scroll overflow-x-hidden">
        <span
          :style="{
            color: CustomNodes.nodesList[selectedCategory].color,
            textShadow: '1px 1px 12px rgba(255,255,255,0.4)',
          }"
          class="text-2xl font-mono p-8 brightness-200"
        >
          {{ CustomNodes.nodesList[selectedCategory].name }}
        </span>
        <div
          v-for="node in CustomNodes.nodesList[selectedCategory].nodes"
          :key="node.type"
          class="flex-1 items-center m-3 cursor-grab border p-2 rounded-md hover:scale-105 transition-transform"
          :style="{
            borderColor: CustomNodes.nodesList[selectedCategory].color,
            backgroundColor: 'rgba(0,0,0,0.5)',
          }"
          draggable="true"
          @dragstart="handleDragStart($event, node.type)"
        >
          <!-- @ts-ignore -->
          <UIcon
            class="text-slate-50"
            :name="node.icon ?? CustomNodes.nodesList[selectedCategory].icon"
          ></UIcon>
          <span class="text-slate-50">{{ node.name }}</span>
          <small class="text-gray-500">&nbsp;{{ node.description }}</small>
        </div>
      </div>
    </div>
  </div>
</template>
