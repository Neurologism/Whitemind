<script setup lang="ts">
import { SmoothStepEdge } from '@vue-flow/core';

const props = defineProps();

console.log(props);
</script>
<template>
  <SmoothStepEdge v-bind="props"> </SmoothStepEdge>
</template>
