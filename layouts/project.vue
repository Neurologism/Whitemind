<script setup lang="ts">
import { useSessionStore } from "~/stores/SessionStore";
const sessionStore = useSessionStore();
await sessionStore.syncLocalSessionData();
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <div class="flex-grow">
      <slot class="flex-1" />
    </div>
    <AppFooter id="app_footer" />
  </div>
</template>
