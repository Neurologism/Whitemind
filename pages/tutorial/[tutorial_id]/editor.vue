<script setup lang="ts">
definePageMeta({
  layout: 'project',
});

const route = useRoute();
const tutorialId = route.params.tutorial_id as string;
const tutorialStore = useTutorialStore();
const toast = useToast();
const projectId = ref('');

async function loadTutorial() {
  const successGetTutorial = await tutorialStore.getTutorial(tutorialId);

  if (!successGetTutorial) {
    toast.add({
      title: 'Failed to load tutorial',
      icon: 'mdi-alert-circle',
      color: 'red',
    });
  }

  if (tutorialStore.tutorial.tutorialStarted === false) {
    const successSetState = await tutorialStore.tutorialSetState(tutorialId);

    if (!successSetState) {
      toast.add({
        title: 'Failed to initialize tutorial project',
        icon: 'mdi-alert-circle',
        color: 'red',
      });
    }
  }

  projectId.value = tutorialStore.tutorial.projectId as string;
}

onMounted(() => {
  loadTutorial();
});

watch(
  () => tutorialStore.tutorial.projectId,
  () => {
    projectId.value = tutorialStore.tutorial.projectId as string;
  }
);

tutorialStore.openInEditor = true;
</script>

<template>
  <ProjectEditor :project-id="projectId" :tutorial-project="true">
    <template v-slot:bottomright>
      <ProjectAssistant> </ProjectAssistant>
    </template>
  </ProjectEditor>
</template>

<style scoped></style>
