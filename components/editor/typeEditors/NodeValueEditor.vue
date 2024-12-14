<!-- JS intended -->
<script setup>
import NodeStringEditor from '~/components/editor/typeEditors/editors/NodeStringEditor.vue';

import { onMounted, onBeforeUnmount } from 'vue';
import NodeBoolEditor from '~/components/editor/typeEditors/editors/NodeBoolEditor.vue';
import NodeSelectEditor from '~/components/editor/typeEditors/editors/NodeSelectEditor.vue';
import NodeNumberEditor from '~/components/editor/typeEditors/editors/NodeNumberEditor.vue';
import NodeTupleEditor from '~/components/editor/typeEditors/editors/NodeTupleEditor.vue';
import NodeMultiselectEditor from '~/components/editor/typeEditors/editors/NodeMultiselectEditor.vue';

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
  string: NodeStringEditor,
  boolean: NodeBoolEditor,
  select: NodeSelectEditor,
  number: NodeNumberEditor,
  tuple: NodeTupleEditor,
  multiselect: NodeMultiselectEditor,
};

const valueDisplay = computed(() => {
  if (props.data[props.paramName] === undefined) return '';
  if (props.data[props.paramName] === null) return 'null';
  const string = `${props.data[props.paramName]}`;
  const exedes = string.length > 20;
  if (!exedes) return string;
  return string.substring(0, 20) + '...';
});

const actionRequired = computed({
  get: () => {
    const required = !props.shapeDefinition.value !== undefined;
    return required && props.data[props.paramName] === undefined;
  },
});

function deepEqual(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}
</script>

<template>
  <div ref="submenuRef" style="pointer-events: bounding-box">
    <div
      :style="{ backgroundColor: actionRequired ? 'red' : null }"
      class="hover:bg-customPrimary-700 hover:border-2 hover:rounded transition-transform border-blue-200 p-1 cursor-pointer text-sky-100"
      @click="submenuOpen = !submenuOpen"
    >
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
    <div
      v-if="submenuOpen"
      class="nested-menu bg-customPrimary-950 border-2 border-blue-400 rounded p-1 grid grid-cols-1 text-sky-100"
    >
      <div class="flex flex-row">
        <div class="flex-1">
          <span class="font-mono font-bold">{{ shapeDefinition.type }}</span>
        </div>
        <div class="flex-1 text-end ml-1">
          <span class="text-sky-100 font-mono">{{
            shapeDefinition.value !== null ? 'required' : 'optional'
          }}</span>
        </div>
      </div>
      <div
        v-if="
          !(
            editors[shapeDefinition.type] === undefined ||
            editors[shapeDefinition.type] === null
          )
        "
        class="p-1"
      >
        <component
          :is="editors[shapeDefinition.type]"
          :paramName="paramName"
          :shapeDefinition="shapeDefinition"
          :data="data"
          :updateData="updateData"
        />
      </div>
      <div v-else>No editor for type: {{ shapeDefinition.type }}</div>
      <UTooltip
        :text="`Set value to '${shapeDefinition.value}'`"
        v-if="
          !deepEqual(shapeDefinition.value, data[paramName]) &&
          shapeDefinition.value !== undefined
        "
        class="m-1"
      >
        <UButton
          icon="mdi-backup-restore"
          size="sm"
          color="primary"
          variant="outline"
          label="Set default"
          :trailing="false"
          @click="updateData(paramName, shapeDefinition.value)"
          block
        />
      </UTooltip>
      <HintBox>
        <span class="m-1 font-mono cursor-pointer">Show definition</span>
        <template #hint>
          <pre class="font-mono text-sm">{{
            JSON.stringify(shapeDefinition, null, 1)
          }}</pre>
        </template>
      </HintBox>
    </div>
  </div>
</template>

<style scoped>
.nested-menu {
  position: absolute;
  min-width: 400px;
  left: 105%;
  top: 0;
  z-index: 1000;
}
</style>
