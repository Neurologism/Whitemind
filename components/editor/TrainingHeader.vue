<script setup lang="ts">
import { SyncStatus } from "~/components/editor/syncStatus";
import { useSessionStore } from "~/stores/SessionStore";
import { useTrainingStore } from "~/stores/TrainingStore";
import { useToast } from "#ui/composables/useToast";

const toast = useToast();

const sessionStore = useSessionStore();
const trainingStore = useTrainingStore();


const props = defineProps<{
    projectId: string;
    syncStatus: SyncStatus;
}>();

async function trainingStart() {
  if (trainingStore.training.running) return;
  const result = await trainingStore.startTraining(sessionStore.fetch, props.projectId);
  toast.add({
    icon: 'material-symbols:play-circle',
    title: result.success ? 'Training started' : 'Training failed',
    description: result.message ?? undefined,
    color: result.success ? 'green' : 'red',
  });
}

async function trainingStop() {
  const result = await trainingStore.stopTraining(sessionStore.fetch);
  toast.add({
    icon: 'material-symbols:stop-circle',
    title: result.success ? 'Training stopped' : 'Training stop failed',
    description: result.message ?? undefined,
    color: result.success ? 'orange' : 'red',
  });
}

async function updateTrainingStatus() {
  if (!trainingStore.training.running) return;
  const result = await trainingStore.fetchTrainingStatus(sessionStore.fetch, props.projectId);
  if (!result.success) {
    toast.add({
      icon: 'material-symbols:stop-circle',
      title: 'Aborting training',
      description: result.message ?? 'Failed to fetch training status',
      color: 'red',
    });
    return;
  }
}

setInterval(updateTrainingStatus, 1000);

</script>


<template>
  <ClientOnly>
    <div class="rounded-lg flex flex-row items-center" style="background: rgba(10,255,255, 0.1)">
      <UButton
          @click="trainingStart"
          v-if="!trainingStore.training.running"
          icon="material-symbols:play-circle"
          size="lg"
          variant="solid"
          color="primary"
          class="hover:scale-105 transition-transform"
          :disabled="syncStatus !== SyncStatus.synced"
      >Start Training</UButton>
      <UButton
          @abort="trainingStop"
          v-else
          icon="material-symbols:stop-circle"
          size="lg"
          variant="solid"
          color="red"
          class="hover:scale-105 transition-transform"
      >Stop Training</UButton>
      <div :class="`text-center mx-auto items-center ${trainingStore.training.running ? 'font-mono' : ''}`">
        {{ trainingStore.training.running ? trainingStore.training.data.output[trainingStore.training.data.output.length - 1] ?? 'initializing...' : 'No training is happening at the moment.' }}
      </div>
    </div>
  </ClientOnly>
</template>
