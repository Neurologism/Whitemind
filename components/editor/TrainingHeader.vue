<script setup lang="ts">
import { SyncStatus } from '~/components/editor/syncStatus';

const toast = useToast();

const sessionStore = useSessionStore();
const trainingStore = useTrainingStore();
const tutorialStore = useTutorialStore();

const props = defineProps<{
  projectId: string;
  syncStatus: SyncStatus;
}>();

async function trainingStart() {
  if (trainingStore.training.running) return;
  const result = await trainingStore.startTraining(props.projectId);
  toast.add({
    icon: 'material-symbols:play-circle',
    title: result.success ? 'Training started' : 'Training failed',
    description: result.message ?? undefined,
    color: result.success ? 'green' : 'red',
  });
}

async function trainingStop() {
  const result = await trainingStore.stopTraining();
  toast.add({
    icon: 'material-symbols:stop-circle',
    title: result.success ? 'Training stopped' : 'Training stop failed',
    description: result.message ?? undefined,
    color: result.success ? 'orange' : 'red',
  });
}

async function updateTrainingStatus() {
  if (!trainingStore.training.running) return;
  if (!trainingStore.training.modelId) return;
  const result = await trainingStore.fetchTrainingStatus(
    trainingStore.training.modelId
  );
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
    <div
      class="rounded-lg flex flex-row items-center"
      style="background: rgba(10, 255, 255, 0.1)"
    >
      <UButton
        @click="trainingStart"
        v-if="!trainingStore.training.running"
        icon="material-symbols:play-circle"
        size="lg"
        variant="solid"
        :color="tutorialStore.isTrainingEnabled ? 'primary' : 'gray'"
        class="transition-all duration-300"
        :disabled="
          syncStatus !== SyncStatus.synced || !tutorialStore.isTrainingEnabled
        "
        >Start Training</UButton
      >
      <UButton
        @click="trainingStop"
        v-else
        icon="material-symbols:stop-circle"
        size="lg"
        variant="solid"
        color="red"
        class="transition-transform"
        >Stop Training</UButton
      >
      <div
        :class="`text-center line-clamp-1 overflow-ellipsis mx-auto items-center ${trainingStore.training.running ? 'font-mono' : ''}`"
      >
        {{
          trainingStore.training.running
            ? (trainingStore.training.data.output[
                trainingStore.training.data.output.length - 1
              ] ?? 'initializing...')
            : 'No training is happening at the moment.'
        }}
      </div>
    </div>
  </ClientOnly>
</template>
