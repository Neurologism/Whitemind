<script setup lang="ts">
import { useSessionStore } from "~/stores/SessionStore";
const sessionStore = useSessionStore();
const displayJSON = JSON.stringify(sessionStore.sessionData, null, 2);

</script>

<template>
  <div class="">
    {{ displayJSON}}
  </div>
</template>