<script setup lang="ts">
definePageMeta({
  layout: 'tutorial',
});

const route = useRoute();
const tutorialStore = useTutorialStore();

tutorialStore.tutorialId = route.params.tutorial_id as string;
</script>

<template>
  <div class="w-screen bg-bg-2" style="min-height: calc(100vh - 4rem)">
    <SettingsBase variant="tutorial">
      <SettingsHeader>General</SettingsHeader>
      <div class="text-xl text-text-2">Nothing here yet.</div>
    </SettingsBase>
  </div>
</template>
