<script setup lang="ts">
import { useSessionStore } from '~/stores/SessionStore';
const sessionStore = useSessionStore();
await sessionStore.loginWithSessionToken(sessionStore.sessionData.sessionID);
</script>

<template>
  <UAvatar :src="'/testpfp.jpg'" />
  <UCard>
    <h1 class="text-2xl font-semibold">Basic Info</h1>
  </UCard>
  <UCard>
    <h1 class="text-2xl font-semibold">Contact Info</h1>
  </UCard>
</template>
