<script setup lang="ts">
const sessionStore = useSessionStore();

onMounted(() => {
  sessionStore.loading = false;
});
</script>

<template></template>
