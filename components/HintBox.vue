<script setup lang="ts">
const showHint = ref(false);
</script>

<template>
  <div @click="showHint = true">
    <slot name="default" />
    <div class="m-2">
      <slot v-if="showHint" name="hint" />
    </div>
  </div>
</template>
