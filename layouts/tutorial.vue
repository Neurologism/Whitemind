<script setup lang="ts">
import ProjectLayout from '~/layouts/project.vue';
const projectStore = useProjectStore();
const tutorialStore = useTutorialStore();

const toast = useToast();

async function loadTutorial() {
  const successGetTutorial = await tutorialStore.getTutorial(
    tutorialStore.tutorialId
  );

  if (!successGetTutorial) {
    toast.add({
      title: 'Failed to load tutorial',
      icon: 'mdi-alert-circle',
      color: 'red',
    });
  }

  if (tutorialStore.tutorial.tutorialStarted === false) {
    const successSetState = await tutorialStore.tutorialSetState(
      tutorialStore.tutorialId
    );

    if (!successSetState) {
      toast.add({
        title: 'Failed to initialize tutorial project',
        icon: 'mdi-alert-circle',
        color: 'red',
      });
    }
  }

  projectStore.projectId = tutorialStore.tutorial.projectId as string;
}

watch(
  () => tutorialStore.tutorialId,
  () => {
    loadTutorial();
  }
);

watch(
  () => tutorialStore.tutorial.projectId,
  () => {
    projectStore.projectId = tutorialStore.tutorial.projectId as string;
  }
);
</script>

<template>
  <ProjectLayout>
    <slot></slot>
  </ProjectLayout>
</template>
