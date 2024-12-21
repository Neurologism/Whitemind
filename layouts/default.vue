<script setup lang="ts">
import { useSessionStore } from '~/stores/SessionStore';
const sessionStore = useSessionStore();
await sessionStore.syncLocalSessionData();
</script>

<template>
  <AppHeader />
  <div class="h-16"></div>
  <slot> </slot>
  <AppFooter class="bg-black" />
</template>
