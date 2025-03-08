<script setup lang="ts">
import type { NodeDefinition } from '~/types/blocks.types';

const props = defineProps<{
  text: string;
}>();

const projectStore = useProjectStore();

function splitAtMultiple(text: string, nodes: NodeDefinition[]) {
  const justNames = nodes.map((node) => node.name);
  const regex = new RegExp(`(${justNames.join('|')})`, 'gi');
  return text.split(regex).map((part) => {
    const node = nodes.find(
      (node) => node.name.toLowerCase() === part.toLowerCase()
    );
    return node ? { text: part, node } : { text: part };
  });
}

const highlightedParts = computed(() => {
  const parts: {
    text: string;
    icon?: string;
    color?: string;
  }[] = [];
  const split = splitAtMultiple(props.text, projectStore.editorConfig.allNodes);
  for (const part of split) {
    if (part.node) {
      let group = projectStore.editorConfig.getNodeGroup(part.node.type);
      parts.push({
        text: part.text,
        icon: group?.icon,
        color: group?.color,
      });
    } else {
      parts.push({
        text: part.text,
      });
    }
  }

  return parts;
});
</script>

<template>
  <span
    v-for="(part, index) in highlightedParts"
    :key="index"
    class="font-mono text-sm leading-none"
    :class="{
      'brightness-150 font-semibold': part.color !== undefined,
    }"
    :style="{
      color: part.color,
    }"
  >
    <icon v-if="part.icon" :name="part.icon" class="inline-block w-3 h-3" />
    {{ part.text }}
  </span>
</template>
