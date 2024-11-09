<!-- JS intended -->
<script setup>
import NodeStringEditor from '~/components/editor/typeEditors/editors/NodeStringEditor.vue';

import { onMounted, onBeforeUnmount } from 'vue';
import NodeBoolEditor from "~/components/editor/typeEditors/editors/NodeBoolEditor.vue";
import NodeSelectEditor from "~/components/editor/typeEditors/editors/NodeSelectEditor.vue";
import NodeNumberEditor from "~/components/editor/typeEditors/editors/NodeNumberEditor.vue";
import NodeTupleEditor from "~/components/editor/typeEditors/editors/NodeTupleEditor.vue";

const props = defineProps({
  paramName: String,
  shapeDefinition: Object,
  data: Object,
  updateData: Function,
});

const submenuRef = ref(null);

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});

function handleClickOutside(event) {
  if (submenuRef.value && !submenuRef.value.contains(event.target)) {
    submenuOpen.value = false;
  }
}

const submenuOpen = ref(false);

const editors = {
  'string': NodeStringEditor,
  'boolean': NodeBoolEditor,
  'select': NodeSelectEditor,
  'number': NodeNumberEditor,
  'tuple': NodeTupleEditor,
}

const valueDisplay = computed(() => {
  if (props.data[props.paramName] === undefined) return '';
  if (props.data[props.paramName] === null ) return 'null';
  const string = `${props.data[props.paramName]}`;
  const exedes = string.length > 20;
  if (!exedes) return string;
  return string.substring(0, 20) + '...';
});

</script>

<template>
  <div ref="submenuRef" style="pointer-events: bounding-box">
    <div class="hover:bg-customPrimary-700 hover:scale-105 hover:border-2 hover:rounded transition-transform border-blue-200 p-1 cursor-pointer" @click="submenuOpen = !submenuOpen">
      <div class="flex">
        <div class="flex-1">
          <div class="grid grid-cols-1">
            {{ paramName }}
            <small class="text-sky-100">{{ valueDisplay }}</small>
          </div>
        </div>
        <div class="mt-1">
          <UIcon name="mdi-arrow-right" />
        </div>
      </div>
    </div>
    <div v-if="submenuOpen" class="nested-menu bg-customPrimary-950 border-2 border-blue-400 rounded p-1 grid grid-cols-1">
      <div class="flex flex-row">
        <div class="flex-1">
          <span class="font-mono font-bold">{{ shapeDefinition.type }}</span>
        </div>
        <div class="flex-1 text-end ml-1">
          <span class="text-sky-100 font-mono">{{ shapeDefinition.value !== undefined ? 'required' : 'optional' }}</span>
        </div>
      </div>
      <div v-if="!(editors[shapeDefinition.type] === undefined || editors[shapeDefinition.type] === null)" class="p-1">
        <component :is="editors[shapeDefinition.type]" :paramName="paramName" :shapeDefinition="shapeDefinition" :data="data" :updateData="updateData"  />
      </div>
      <div v-else>
        No editor for type: {{ shapeDefinition.type }}
      </div>
      <pre>{{ JSON.stringify(shapeDefinition, null, 1) }}</pre>
    </div>
  </div>
</template>

<style scoped>
.nested-menu {
  position: absolute;
  min-width: 300px;
  left: 105%;
  top: 0;
  z-index: 1000;
}
</style>