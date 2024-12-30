<script lang="ts" setup>
import type {
  NodeDefinition,
  NodeGroupDefinition,
} from '~/components/editor/blocks';

defineProps<{
  nodeDefinition: NodeDefinition;
  nodeGroupDefinition: NodeGroupDefinition;
}>();

function getRGBColor(colorName: string) {
  const tempElement = document.createElement('div');
  tempElement.style.color = colorName;
  document.body.appendChild(tempElement);

  const computedColor = getComputedStyle(tempElement).color;
  document.body.removeChild(tempElement);

  return computedColor.match(/\d+/g)!.map(Number).toString();
}

function handleDragStart(event: DragEvent, nodeType: string) {
  event.dataTransfer!.setData('node', nodeType);
}
</script>
<template>
  <div
    :key="nodeDefinition.type"
    class="flex-none items-center m-1 ml-3 mr-3 cursor-grab border p-2 pl-4 rounded-md hover:scale-105 transition-transform w-80"
    :style="{
      borderColor: nodeGroupDefinition.color,
      backgroundColor: `rgba(${getRGBColor(nodeGroupDefinition.color)}, 0.05)`,
    }"
    draggable="true"
    @dragstart="handleDragStart($event, nodeDefinition.type)"
  >
    <!-- @ts-ignore -->
    <UIcon
      :style="{
        color: nodeGroupDefinition.color,
      }"
      :name="(nodeDefinition as any).icon ?? nodeGroupDefinition.icon"
    ></UIcon>
    <span class="text-slate-950 dark:text-slate-50 brightness-150">{{
      nodeDefinition.name
    }}</span>
    <small class="text-gray-600 dark:text-gray-400 brightness-90"
      >&nbsp;{{ nodeDefinition.description }}</small
    >
  </div>
</template>
