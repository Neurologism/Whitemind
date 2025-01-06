<script lang="ts" setup>
import NodeStringEditor from '~/components/editor/customNode/typeEditors/editors/NodeStringEditor.vue';

import NodeBoolEditor from '~/components/editor/customNode/typeEditors/editors/NodeBoolEditor.vue';
import NodeSelectEditor from '~/components/editor/customNode/typeEditors/editors/NodeSelectEditor.vue';
import NodeNumberEditor from '~/components/editor/customNode/typeEditors/editors/NodeNumberEditor.vue';
import NodeTupleEditor from '~/components/editor/customNode/typeEditors/editors/NodeTupleEditor.vue';
import NodeMultiselectEditor from '~/components/editor/customNode/typeEditors/editors/NodeMultiselectEditor.vue';
import type { NodeDefinition } from '~/components/editor/blocks';
import { useNodesData } from '@vue-flow/core';

const props = defineProps<{
  paramName: string;
  shapeDefinition: NodeDefinition;
  nodeId: string;
}>();

const nodesData = useNodesData(props.nodeId)!;

const editors = {
  string: NodeStringEditor,
  boolean: NodeBoolEditor,
  select: NodeSelectEditor,
  number: NodeNumberEditor,
  tuple: NodeTupleEditor,
  multiselect: NodeMultiselectEditor,
};

function deepEqual(a: any, b: any) {
  return JSON.stringify(a) === JSON.stringify(b);
}

function strMaxLen(_str: any, maxLen: number) {
  if (_str === null) {
    return 'null';
  } else if (_str === undefined) {
    return '';
  }
  let str = _str.toString();
  if (str.length > maxLen) {
    return str.slice(0, maxLen) + '…';
  }
  return str;
}

const actionRequired = computed(() => {
  if (props.shapeDefinition.type === 'id') return false;
  const required = !props.shapeDefinition.value !== undefined;
  return required && nodesData.value?.data[props.paramName] === undefined;
});

const isExpanded = ref(false);
</script>

<template>
  <div class="pr-1 pl-1 grid grid-cols-1 text-sky-100">
    <div
      class="flex flex-row flex-nowrap cursor-pointer"
      @click="isExpanded = !isExpanded"
    >
      <div class="flex justify-between items-center pl-1 pr-1">
        <UIcon
          class="flex-none"
          name="material-symbols:expand-more"
          :style="{
            transform: isExpanded ? 'rotate(0deg)' : 'rotate(270deg)',
          }"
        />
      </div>
      <div class="flex-1 flex items-center justify-start">
        <span
          class="flex-none text-sm font-mono font-bold"
          :class="{
            'blink-underline': actionRequired,
          }"
          >{{ paramName }}</span
        >
      </div>
      <div class="flex-none m-1"></div>
      <div class="flex-1 text-end ml-1 flex items-center justify-end">
        <span class="text-sky-100 text-sm font-mono">{{
          isExpanded
            ? shapeDefinition.type
            : strMaxLen(nodesData!.data[paramName], 10)
        }}</span>
        <UIcon
          name="mdi-alert-circle-outline"
          class="text-red-700"
          v-if="actionRequired"
        />
      </div>
    </div>
    <div v-if="isExpanded" class="flex flex-row flex-nowrap">
      <div class="flex-1">
        <component
          :is="editors[shapeDefinition.type]"
          :nodeId="nodeId"
          :paramName="paramName"
          :shapeDefinition="shapeDefinition"
        />
      </div>
      <div
        v-if="!deepEqual(shapeDefinition.value, nodesData!.data[paramName])"
        @click="nodesData!.data[paramName] = shapeDefinition.value"
        class="flex-none p-1 ml-1 flex items-center justify-center cursor-pointer"
      >
        <UIcon name="mdi-reload" />
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes blink {
  0% {
    text-decoration-color: red;
  }
  50% {
    text-decoration-color: rgba(255, 0, 0, 0.5);
  }
  100% {
    text-decoration-color: red;
  }
}

.blink-underline {
  text-decoration: underline;
  animation: blink 5s infinite;
}
</style>
