<script setup lang="ts">
const props = defineProps({
  label: { type: String },
  placeholder: { type: String, default: '' },
  disabled: { type: Boolean, default: false },
});

const model = defineModel() as Ref<string>;
</script>
<template>
  <div>
    <h4 class="text-md font-semibold mb-2" v-if="props.label">
      {{ props.label }}
    </h4>
    <UTextarea
      class="w-[32rem] mb-2"
      :placeholder="props.placeholder"
      :disabled="props.disabled"
      v-model="model"
      autoresize
    ></UTextarea>
    <p class="text-sm text-gray-400">
      <slot></slot>
    </p>
  </div>
</template>
