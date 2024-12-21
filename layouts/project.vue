<script setup lang="ts">
import { useSessionStore } from '~/stores/SessionStore';
const sessionStore = useSessionStore();
await sessionStore.syncLocalSessionData();
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <slot> </slot>
    <AppFooter id="app_footer" class="grow-0" />
  </div>
</template>
