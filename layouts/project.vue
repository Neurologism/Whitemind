<script setup lang="ts">
const sessionStore = useSessionStore();

onMounted(() => {
  sessionStore.syncLocalSessionData();
  if (sessionStore.isAuthorized !== true) {
    navigateTo('/login');
  }
});
</script>

<template>
  <slot />
</template>
