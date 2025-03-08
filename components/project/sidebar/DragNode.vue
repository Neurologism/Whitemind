<script lang="ts" setup>
import type {
  NodeDefinition,
  NodeGroupDefinition,
  NodeSubGroupDefinition,
} from '~/types/blocks.types';

defineProps<{
  nodeDefinition: NodeDefinition;
  nodeGroupDefinition: NodeGroupDefinition;
  nodeSubGroupDefinition: NodeSubGroupDefinition;
}>();

const projectStore = useProjectStore();

function handleDragStart(event: DragEvent, nodeType: string) {
  event.dataTransfer!.setData('node', nodeType);
}

const isHovering = ref(false);
</script>
<template>
  <div
    :key="nodeDefinition.type"
    class="flex-none items-center ml-3 mr-3 cursor-grab border-[1.5px] hover:border-2 pt-2 pl-2 pr-2 rounded-md hover:scale-105 transition-transform w-80 relative bg-bg-3"
    :style="{
      borderColor: nodeGroupDefinition.color,
    }"
    draggable="true"
    @dragstart="handleDragStart($event, nodeDefinition.type)"
    @mouseenter="isHovering = true"
    @mouseleave="isHovering = false"
  >
    <span class="text-text-1 brightness-150 text-center">
      <UIcon :name="nodeSubGroupDefinition.icon ?? nodeGroupDefinition.icon" />
      {{ nodeDefinition.name }}
    </span>
    <br />
    <small
      class="text-text-2 brightness-90 text-ellipsis"
      :class="{ 'line-clamp-1': !isHovering }"
      >&nbsp;{{ nodeDefinition.description }}</small
    >
    <div class="h-3 flex flex-row flex-nowrap">
      <div
        class="flex-none h-3 w-3 rounded-t-sm flex items-center justify-center border-t border-l border-r border-accent-7"
        v-if="!nodeDefinition.hideInput"
        :style="{
          backgroundImage:
            projectStore.editorConfig.getHardGradientOfMultipleCategories(
              nodeDefinition.inputConstraints?.allowedCategories ?? [
                nodeGroupDefinition.group_identifier,
              ]
            ),
        }"
      >
        <UIcon
          name="material-symbols:play-arrow"
          style="transform: rotate(-90deg)"
          mode="css"
          size="1rem"
          class="text-text-1 pointer-events-none"
        />
      </div>
      <div class="" v-for="specialInputConnection in nodeDefinition.data">
        <div
          v-if="
            specialInputConnection.type === 'id' &&
            specialInputConnection.flowOrientation === 'input'
          "
          class="flex-none ml-1 h-3 w-3 rounded-t-full flex items-center justify-center"
          :style="{
            backgroundImage:
              projectStore.editorConfig.getHardGradientOfMultipleCategories(
                specialInputConnection.constraints?.allowedCategories ?? [
                  nodeGroupDefinition.group_identifier,
                ]
              ),
          }"
        >
          <UIcon
            name="material-symbols:play-arrow"
            style="transform: rotate(-90deg)"
            mode="css"
            size="1rem"
            class="text-text-1 pointer-events-none"
          />
        </div>
      </div>
      <div class="grow"></div>
      <div class="" v-for="specialOutputConnection in nodeDefinition.data">
        <div
          v-if="
            specialOutputConnection.type === 'id' &&
            specialOutputConnection.flowOrientation === 'output'
          "
          class="flex-none mr-1 h-3 w-3 rounded-t-full flex items-center justify-center"
          :style="{
            backgroundImage:
              projectStore.editorConfig.getHardGradientOfMultipleCategories(
                specialOutputConnection.constraints?.allowedCategories ?? [
                  nodeGroupDefinition.group_identifier,
                ]
              ),
          }"
        >
          <UIcon
            name="material-symbols:play-arrow"
            style="transform: rotate(90deg)"
            mode="css"
            size="1rem"
            class="text-text-1 pointer-events-none"
          />
        </div>
      </div>
      <div
        class="flex-none h-3 w-3 rounded-t-sm flex items-center justify-center"
        v-if="!nodeDefinition.hideOutput"
        :style="{
          backgroundImage:
            projectStore.editorConfig.getHardGradientOfMultipleCategories(
              nodeDefinition.outputConstraints?.allowedCategories ?? [
                nodeGroupDefinition.group_identifier,
              ]
            ),
        }"
      >
        <UIcon
          name="material-symbols:play-arrow"
          style="transform: rotate(90deg)"
          mode="css"
          size="1rem"
          class="text-text-1 pointer-events-none"
        />
      </div>
    </div>
  </div>
</template>
