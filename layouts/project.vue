<script setup lang="ts">
import { useSessionStore } from "~/stores/SessionStore";
const sessionStore = useSessionStore();
await sessionStore.syncLocalSessionData();
</script>

<template>
  <slot />
</template>
