<script setup lang="ts">
import { useSessionStore } from '~/stores/SessionStore';
const sessionStore = useSessionStore();
await sessionStore.syncLocalSessionData();
</script>

<template>
  <AppHeader />
  <slot> </slot>
  <AppFooter />
</template>
