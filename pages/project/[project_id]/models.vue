<script setup lang="ts">
definePageMeta({
  layout: 'project',
});

const projectStore = useProjectStore();
const route = useRoute();

projectStore.projectId = route.params.project_id as string;
</script>

<template>
  <ProjectModels />
</template>
