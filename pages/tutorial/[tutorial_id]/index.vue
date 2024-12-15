<script setup lang="ts">
import ProjectEditor from '~/components/ProjectEditor.vue';

definePageMeta({
  layout: 'project',
});

const route = useRoute();
const tutorialId = route.params.tutorial_id as string;
const projectId = ref('');

const tutorialStore = useTutorialStore();
const sessionStore = useSessionStore();

const toast = useToast();

async function loadTutorial() {
  const successGetTutorial = await tutorialStore.getTutorial(
    sessionStore.fetch,
    tutorialId
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
      sessionStore.fetch,
      tutorialId
    );

    if (!successSetState) {
      toast.add({
        title: 'Failed to initialize tutorial project',
        icon: 'mdi-alert-circle',
        color: 'red',
      });
    }
  }

  projectId.value = tutorialStore.tutorial.projectId as string;

  toast.add({ title: 'Tutorial loaded', icon: 'mdi-check', color: 'green' });
}

onMounted(() => {
  loadTutorial();
});
</script>

<template>
  <ProjectEditor :project-id="projectId" :tutorial-project="true">
    <template v-slot:bottomright>
      <EditorAssistant> </EditorAssistant>
    </template>
  </ProjectEditor>
</template>

<style scoped></style>
