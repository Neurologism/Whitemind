<script setup lang="ts">
const props = defineProps({
  label: { type: String },
  type: { type: String, default: 'text' },
  placeholder: { type: String, default: '' },
  disabled: { type: Boolean, default: false },
  setWidth: { type: Boolean, default: true },
});

const model = defineModel() as Ref<string>;
</script>
<template>
  <div :class="{ 'w-[32rem]': props.setWidth }">
    <h4 class="text-md font-semibold mb-2" v-if="props.label">
      {{ props.label }}
    </h4>
    <UInput
      class="mb-2"
      :placeholder="props.placeholder"
      :disabled="props.disabled"
      :type="props.type"
      v-model="model"
    ></UInput>
    <p class="text-sm text-text-2">
      <slot></slot>
    </p>
  </div>
</template>
