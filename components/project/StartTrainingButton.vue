<script lang="ts" setup>
const toast = useToast();

const trainingStore = useTrainingStore();
const tutorialStore = useTutorialStore();
const projectStore = useProjectStore();

const props = defineProps<{
  nodeId: string;
}>();

async function trainingStart() {
  if (trainingStore.training.running || projectStore.project === null) return;
  if (projectStore.syncStatus !== projectStore.syncStatus) {
    await projectStore.syncProject();
  }
  const result = await trainingStore.startTraining(
    projectStore.project?.data._id,
    props.nodeId
  );
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
</script>

<template>
  <UTooltip
    @click="trainingStart"
    v-if="!trainingStore.training.running"
    text="Start training"
    :popper="{ placement: 'top' }"
    class="ring-1 rounded ml-1 pr-1 flex flex-row items-center"
    :class="{
      'cursor-not-allowed bg-customPrimary-300':
        !tutorialStore.isTrainingEnabled,
      'cursor-pointer bg-customPrimary-600 hover:scale-105 transition-all duration-300':
        tutorialStore.isTrainingEnabled,
    }"
  >
    <UIcon
      name="solar:dumbbell-large-bold"
      :color="tutorialStore.isTrainingEnabled ? 'primary' : 'gray'"
      :disabled="!tutorialStore.isTrainingEnabled"
      class="mx-1 m-1"
    />
    <span class="text-sm">Train</span>
  </UTooltip>
  <UTooltip
    @click="trainingStop"
    v-if="
      trainingStore.training.running &&
      trainingStore.training.startNodeId === props.nodeId
    "
    text="Stop training"
    :popper="{ placement: 'top' }"
    class="cursor-pointer ring-1 bg-rose-600 rounded ml-1 hover:scale-105 transition-all duration-300 pr-1 flex flex-row items-center"
  >
    <UIcon name="material-symbols:stop-circle" class="mx-1 m-1" />
    <span class="text-sm">Stop</span>
  </UTooltip>
</template>
