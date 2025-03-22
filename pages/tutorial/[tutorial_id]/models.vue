<script setup lang="ts">
definePageMeta({
  layout: 'tutorial',
});

const route = useRoute();
const tutorialStore = useTutorialStore();

tutorialStore.tutorialId = route.params.tutorial_id as string;
tutorialStore.openInEditor = true;
</script>

<template>
  <ProjectModels />
</template>
