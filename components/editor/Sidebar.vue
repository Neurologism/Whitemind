<script setup lang="ts">
import {nodesList} from "~/components/editor/customNodeList";

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
  <div class="pl-4 pr-4 pb-4 flex">
    <span class="text-indigo-50 text-3xl flex-1">Custom Nodes</span>
    <UButton
        icon="mdi-search"
        size="xl"
        variant="outline"
        @click="searchButtonClicked"
        class="hover:scale-105 transition-transform"
    />
  </div>
  <UDivider />
  <div class="flex">
    <div class="flex-none pt-4">
      <div
          v-for="(category, index) in nodesList"
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
              :color="category.color"
              square
              :variant="selectedCategory === index ? 'solid' : 'outline'"
              @click="selectedCategory = index"
              class="hover:scale-105 transition-transform"
          />
        </UTooltip>
      </div>
    </div>
    <div class="flex-1 p-4">
      <h2 :style="{ color: nodesList[selectedCategory].color }" class="text-xl font-mono mb-4">
        {{ nodesList[selectedCategory].name }}
      </h2>
      <div
          v-for="node in nodesList[selectedCategory].nodes"
          :key="node.type"
          class="flex-1 items-center mb-3 cursor-grab border p-2 rounded-lg hover:scale-105 transition-transform"
          :style="{ borderColor: nodesList[selectedCategory].color, width: '300px' }"
          draggable="true"
          @dragstart="handleDragStart($event, node.type)"
      >
        {{ node.name }}
        <small class="text-gray-500">{{ node.description }}</small>
      </div>
    </div>
  </div>
</template>
