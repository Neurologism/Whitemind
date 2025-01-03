<script setup lang="ts">
const model = defineModel() as Ref<boolean>;
const sessionStore = useSessionStore();
</script>

<template>
  <UModal v-model="model">
    <div class="w-full h-full flex flex-col justify-center items-center p-8">
      <h2 class="text-2xl font-semibold mb-8">
        <slot name="title"></slot>
      </h2>
      <p class="text-md text-gray-200 text-center mb-8">
        <slot name="text"></slot>
      </p>
      <div class="flex flex-row space-x-2">
        <slot name="bottom"> </slot>
      </div>
    </div>
  </UModal>
</template>
