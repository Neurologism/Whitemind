<script setup lang="ts">
import path from 'path';

definePageMeta({
  layout: 'project',
});

const route = useRoute();

navigateTo(path.join(route.fullPath, 'editor'));
</script>

<template></template>
