<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    disabled?: boolean;
    setWidth?: boolean;
    label: string;
    options: string[];
  }>(),
  {
    disabled: false,
    setWidth: true,
  }
);

const model = defineModel() as Ref<string>;
</script>
<template>
  <div :class="{ 'w-[32rem]': props.setWidth }">
    <h4 class="text-md font-semibold mb-2" v-if="props.label">
      {{ props.label }}
    </h4>
    <USelect
      v-model="model"
      :options="props.options"
      :disabled="props.disabled"
    />
    <p class="text-sm text-gray-400">
      <slot></slot>
    </p>
  </div>
</template>
