<script setup lang="ts">
const sessionStore = useSessionStore();
await sessionStore.syncLocalSessionData();
</script>

<template>
  <slot />
</template>
