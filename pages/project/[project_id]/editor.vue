<script setup lang="ts">
definePageMeta({
  layout: 'project',
});

const tutorialStore = useTutorialStore();

tutorialStore.openInEditor = false;
</script>

<template>
  <ProjectEditor :tutorial-project="false" />
</template>
