<script setup lang="ts">
const sessionStore = useSessionStore();
if (!sessionStore.isAuthorized) {
  navigateTo('/login');
}
</script>

<template>
  <slot />
</template>
