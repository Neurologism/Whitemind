<script setup lang="ts">
import { navigateToSubroute } from '~/utility/navigateToSubroute';

definePageMeta({
  layout: 'tutorial',
});

const route = useRoute();
const tutorialStore = useTutorialStore();

tutorialStore.tutorialId = route.params.tutorial_id as string;
navigateToSubroute(route.fullPath, 3, 'editor');
</script>

<template></template>
