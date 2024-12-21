<script setup lang="ts">
import { useSessionStore } from '~/stores/SessionStore';
const sessionStore = useSessionStore();
await sessionStore.syncLocalSessionData();
</script>

<template>
  <AppHeader />
  <div class="h-16"></div>
  <div class="flex flex-col" style="min-height: calc(100vh - 4rem)">
    <slot> </slot>
    <div class="flex-grow"></div>
    <AppFooter />
  </div>
</template>
