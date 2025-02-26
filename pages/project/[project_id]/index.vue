<script setup lang="ts">
import { navigateToSubroute } from '~/utility/navigateToSubroute';

definePageMeta({
  layout: 'project',
});

const route = useRoute();
const projectStore = useProjectStore();

projectStore.projectId = route.params.project_id as string;
navigateToSubroute(route.fullPath, 3, 'editor');
</script>

<template></template>
