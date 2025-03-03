<script setup lang="ts">
const toast = useToast();

const trainingStore = useTrainingStore();

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
    <div class="rounded-lg flex flex-row items-center" style="">
      <UButton
        @click="trainingStop"
        v-if="trainingStore.training.running"
        icon="material-symbols:stop-circle"
        size="lg"
        variant="solid"
        color="red"
        class="transition-transform"
        >Stop Training</UButton
      >
      <div
        class="text-center line-clamp-1 overflow-ellipsis mx-auto items-center font-mono flex flex-row cursor-default space-x-4"
      >
        <div
          class="flex flex-row items-center"
          v-if="trainingStore.training.running"
        >
          <b>Status:</b>
          <div class="rounded-md bg-bg-2 p-1">
            {{ trainingStore.training.data.status }}
          </div>
        </div>
        <div
          v-if="
            trainingStore.training.running &&
            trainingStore.training.data.status === 'training' &&
            trainingStore.training.epoch === null
          "
        >
          Results will appear shortly...
        </div>
        <div
          class="flex flex-row items-center"
          v-if="trainingStore.training.epoch !== null"
        >
          <b>Epoch:</b>
          <div class="rounded-md bg-bg-2 p-1">
            {{ trainingStore.training.epoch + 1 }}
          </div>
        </div>
        <div
          class="flex flex-row items-center"
          v-if="trainingStore.training.loss !== null"
        >
          <b>Loss:</b>
          <div class="rounded-md bg-bg-2 p-1">
            {{ trainingStore.training.loss.toFixed(2) }}
          </div>
        </div>
        <div
          class="flex flex-row items-center"
          v-if="trainingStore.training.accuracy !== null"
        >
          <b>Accuracy:</b>
          <div class="rounded-md bg-bg-2 p-1">
            {{ (trainingStore.training.accuracy * 100).toFixed(2) }}%
          </div>
        </div>
        <div
          class="flex flex-row items-center"
          v-if="trainingStore.training.mean_absolute_error !== null"
        >
          <b>MAE:</b>
          <div class="rounded-md bg-bg-2 p-1">
            {{ trainingStore.training.mean_absolute_error.toFixed(2) }}
          </div>
        </div>
      </div>
    </div>
  </ClientOnly>
</template>
