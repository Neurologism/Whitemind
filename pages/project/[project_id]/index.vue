<script setup lang="ts">
definePageMeta({
  layout: 'project',
});

const route = useRoute();

navigateTo(
  route.fullPath + (route.fullPath.endsWith('/') ? '' : '/') + 'editor'
);
</script>

<template></template>
