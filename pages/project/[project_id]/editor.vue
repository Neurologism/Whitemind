<script setup lang="ts">
definePageMeta({
  layout: 'project',
});

const route = useRoute();
const projectStore = useProjectStore();
const tutorialStore = useTutorialStore();

projectStore.projectId = route.params.project_id as string;
tutorialStore.openInEditor = false;
</script>

<template>
  <ProjectEditor :tutorial-project="false" />
</template>
