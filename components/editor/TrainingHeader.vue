<script setup lang="ts">
import { SyncStatus } from "~/components/editor/syncStatus";
import { useSessionStore } from "~/stores/SessionStore";

const sessionStore = useSessionStore();

const props = defineProps<{
    projectId: string;
    syncStatus: SyncStatus;
}>();



</script>


<template>
  <ClientOnly>
    <div class="rounded-lg hover:h-48" style="background: rgba(10,255,255, 0.1)">
      <UButton
          icon="streamline:travel-hotel-dumbell-sports-weights-dumbbell-sport-fitness"
          size="lg"
          variant="solid"
          color="primary"
          class="hover:scale-105 transition-transform"
      >Start Training</UButton>
    </div>
  </ClientOnly>
</template>
