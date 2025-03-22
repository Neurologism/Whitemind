<script setup lang="ts">
import { navigateToSubroute } from '~/utility/navigateToSubroute';

definePageMeta({
  layout: 'tutorial',
});

const route = useRoute();
const tutorialStore = useTutorialStore();

tutorialStore.tutorialId = route.params.tutorial_id as string;

navigateToSubroute(route.fullPath, 5, 'general');
</script>

<template>
  <div class="w-screen bg-bg-2" style="min-height: calc(100vh - 4rem)">
    <SettingsBase variant="tutorial"> </SettingsBase>
  </div>
</template>
