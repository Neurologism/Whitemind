<script setup lang="ts">
import { CustomNodes } from "~/components/editor/customNodeList";
import type {ButtonColor} from "#ui/types";

const isOpen = ref(false);

const selectedCategory = ref(0);

function handleDragStart(event: DragEvent, nodeType: string) {
  isOpen.value = false;
  console.log("setting data to: ", nodeType)
  event.dataTransfer!.setData("node", nodeType);
}

function searchButtonClicked() {
  alert('Not here jet')
}

</script>

<template>
  <div class="rounded-xl border-2 border-customPrimary-900 bg-customPrimary-950 p-4 pb-8" style="height: 100%">
    <div class="flex">
      <span class="text-3xl flex-1">Components</span>
      <UButton
          icon="mdi-search"
          size="xl"
          variant="outline"
          @click="searchButtonClicked"
          class="hover:scale-105 transition-transform mb-2"
      />
    </div>
    <UDivider />
    <div class="flex" style="height: 100%">
      <div class="flex-none pt-4">
        <div
            v-for="(category, index) in CustomNodes.nodesList"
            :key="index"
            class="flex flex-col items-center mb-3"
        >
          <UTooltip
              :text="category.name"
              :popper="{ placement: 'right' }"
          >
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
      <div class="flex-1 ml-2 mb-8 overflow-scroll">
        <h2 :style="{ color: CustomNodes.nodesList[selectedCategory].color }" class="text-xl font-mono mb-4 mt-4">
          {{ CustomNodes.nodesList[selectedCategory].name }}
        </h2>
        <div
            v-for="node in CustomNodes.nodesList[selectedCategory].nodes"
            :key="node.type"
            class="flex-1 items-center m-3 cursor-grab border p-2 rounded-lg hover:scale-105 transition-transform"
            :style="{ zIndex: 2000, borderColor: CustomNodes.nodesList[selectedCategory].color, width: '300px' }"
            draggable="true"
            @dragstart="handleDragStart($event, node.type)"
        >
          {{ node.name }}
          <small class="text-gray-500">{{ node.description }}</small>
        </div>
      </div>
    </div>
  </div>
</template>
