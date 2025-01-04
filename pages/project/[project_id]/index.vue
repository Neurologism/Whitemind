<script setup lang="ts">
import path from 'path';

definePageMeta({
  layout: 'project',
});

const route = useRoute();

navigateTo(
  route.fullPath + (route.fullPath.endsWith('/') ? '' : '/') + 'editor'
);
</script>

<template></template>
