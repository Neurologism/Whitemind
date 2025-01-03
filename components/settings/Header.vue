<script setup lang="ts">
const props = defineProps({
  weight: { type: Number, default: 1 },
});
</script>
<template>
  <div v-if="weight === 1" class="w-full">
    <h2 class="text-3xl"><slot></slot></h2>
    <hr class="border-gray-800" />
  </div>

  <h3 class="text-2xl" v-else-if="weight === 2"><slot></slot></h3>
  <h4 class="text-xl" v-else-if="weight === 3"><slot></slot></h4>
</template>
