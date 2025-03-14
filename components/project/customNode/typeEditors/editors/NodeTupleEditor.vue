<script lang="ts" setup>
import { useNodesData } from '@vue-flow/core';
import { watch, ref } from 'vue';

const props = defineProps<{
  nodeId: string;
  paramName: string;
  shapeDefinition: Record<string, any>;
}>();

const itemType = props.shapeDefinition.itemType;
const nodesData = useNodesData(props.nodeId);
const tupleValues = ref<any[]>([]);
const inputValue = ref('');
const isInputValid = ref(true);
const scrollContainer = ref<HTMLDivElement | null>(null);

// Initialize and handle upstream changes
const initializeTuple = () => {
  const nodeValue = nodesData.value?.data?.[props.paramName];
  tupleValues.value = Array.isArray(nodeValue) ? [...nodeValue] : [];
};

// Watch for upstream changes
watch(() => nodesData.value?.data?.[props.paramName], initializeTuple, {
  deep: true,
});

// Initialize on component mount
initializeTuple();

// Validate input based on type
const validateInput = (value: string) => {
  if (!value.trim()) return true;
  if (itemType === 'int') {
    return /^-?\d+$/.test(value);
  } else if (itemType === 'float') {
    return /^-?\d*\.?\d*$/.test(value) && value !== '.';
  }
  return true; // strings always valid
};

// Add item if valid
const addItem = () => {
  if (!inputValue.value.trim()) return;

  let parsedValue: any = inputValue.value;
  if (itemType === 'int') {
    parsedValue = parseInt(inputValue.value);
  } else if (itemType === 'float') {
    parsedValue = parseFloat(inputValue.value);
  }

  tupleValues.value = [...tupleValues.value, parsedValue];
  updateNodeData();
  inputValue.value = '';
  isInputValid.value = true;
};

const removeLastItem = () => {
  if (tupleValues.value.length === 0) return;
  tupleValues.value = tupleValues.value.slice(0, -1);
  updateNodeData();
};

const updateNodeData = async () => {
  nodesData.value!.data[props.paramName] = [...tupleValues.value];
};

const onInputChange = (value: string) => {
  inputValue.value = value;
  isInputValid.value = validateInput(value);
};

const onKeyDown = (event: KeyboardEvent) => {
  if (
    (event.key === 'Enter' || event.key === ' ' || event.key === ',') &&
    isInputValid.value &&
    inputValue.value.trim()
  ) {
    addItem();
    // with timeout, because the event is fired before the input value is updated
    // works consistently
    setTimeout(() => (inputValue.value = ''), 10);
  } else if (event.key === 'Backspace' && !inputValue.value) {
    removeLastItem();
  }
};

const removeItem = (index: number) => {
  tupleValues.value = [
    ...tupleValues.value.slice(0, index),
    ...tupleValues.value.slice(index + 1),
  ];
  updateNodeData();
};
</script>

<template>
  <div class="flex flex-col flex-nowrap w-full">
    <span class="text-sky-100 text-sm">{{ paramName.split('.').pop() }}</span>
    <div
      class="flex items-center border-0 rounded-md px-2 py-0.5 bg-bg-2 text-text-1 ring-1 ring-inset ring-accent-7"
    >
      <div
        class="flex items-center gap-1 whitespace-nowrap mr-1 flex-grow h-5 w-full overflow-hidden"
      >
        <div
          ref="scrollContainer"
          class="flex-1 overflow-x-auto flex flex-row items-center flex-nowrap w-full pr-1 scroll-bar"
          style="max-width: 100%"
          @wheel.prevent="
            (e) =>
              scrollContainer?.scrollBy({ left: e.deltaY, behavior: 'smooth' })
          "
        >
          <UBadge
            v-for="(item, index) in tupleValues"
            :key="index"
            color="gray"
            class="flex flex-row items-center justify-center h-4 cursor-pointer flex-shrink-0 mr-0.5"
            @click="() => removeItem(index)"
          >
            <span class="text-xs pl-0.5">{{ item }}</span>
            <UIcon name="i-heroicons-x-mark" class="p-0 py-0" />
          </UBadge>
          <input
            :placeholder="itemType + '[]'"
            v-model="inputValue"
            @input="onInputChange(($event.target as HTMLInputElement).value)"
            @keydown="onKeyDown"
            class="outline-none bg-transparent text-xs h-5 min-w-20 flex-shrink-0"
            :class="{ 'text-red-500': !isInputValid }"
            :type="itemType === 'string' ? 'text' : 'text'"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.scroll-bar::-webkit-scrollbar {
  width: 0;
}

.scroll-bar::-webkit-scrollbar-track {
  background: transparent;
  border-radius: 0;
}

.scroll-bar::-webkit-scrollbar-thumb {
  background: #164bde;
  border-radius: 0;
  border: 0 solid #555777;
}

* {
  scrollbar-width: thin;
  scrollbar-color: #363636 transparent;
}
</style>
