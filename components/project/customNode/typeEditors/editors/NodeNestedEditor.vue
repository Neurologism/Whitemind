<script setup lang="ts">
import NodeValueEditor from '~/components/project/customNode/typeEditors/NodeValueEditor.vue';

const props = defineProps<{
  nodeId: string;
  paramName: string;
  shapeDefinition: Record<string, any>;
}>();

defineOptions({
  name: 'NodeNestedEditor',
});

const open = ref(false);
</script>

<template>
  <div
    class="flex flex-row flex-nowrap font-mono text-sm text-sky-100 cursor-pointer items-center"
    @click="open = !open"
  >
    <UIcon
      name="material-symbols:expand-more"
      :style="{
        transform: open ? 'rotate(0deg)' : 'rotate(270deg)',
      }"
    />
    {{ paramName.split('.').pop() }}
  </div>
  <div class="ml-2.5">
    <div v-if="open" v-for="(option, key) in props.shapeDefinition.shapes">
      <!-- <component
      :is="nodeDataEditors[option.type]"
      :key="`${paramName}.${key}-${nodeId}`"
      :nodeId="nodeId"
      :paramName="`${paramName}.${key}`"
      :shapeDefinition="option"
    /> -->
      <NodeValueEditor
        :param-name="`${props.paramName}.${key}`"
        :shape-definition="option"
        :node-id="nodeId"
      />
    </div>
  </div>
</template>
