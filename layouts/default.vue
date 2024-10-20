<script setup lang="ts">
import { useSessionStore } from "~/stores/SessionStore";
const sessionStore = useSessionStore();
await sessionStore.syncLocalSessionData();

</script>

<template>
  <div class="flex flex-col h-screen">
    <AppHeader/>
    <div class="flex-grow">
      <slot />
    </div>
    <AppFooter/>
  </div>
</template>
