<script setup lang="ts">
definePageMeta({
  layout: 'project',
});

const route = useRoute();
const tutorialStore = useTutorialStore();

tutorialStore.openInEditor = false;
</script>

<template>
  <ProjectEditor :project-id="route.params.project_id as string" />
</template>

<style scoped></style>
