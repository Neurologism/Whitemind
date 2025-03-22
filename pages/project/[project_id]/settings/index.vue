<script setup lang="ts">
import { navigateToSubroute } from '~/utility/navigateToSubroute';

definePageMeta({
  layout: 'project',
});

const projectStore = useProjectStore();
const route = useRoute();

projectStore.projectId = route.params.project_id as string;
navigateToSubroute(route.fullPath, 5, 'general');
</script>

<template>
  <div class="w-screen bg-bg-2" style="min-height: calc(100vh - 4rem)">
    <SettingsBase variant="project"> </SettingsBase>
  </div>
</template>
