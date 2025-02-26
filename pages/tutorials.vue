<script setup lang="ts">
import { tutorialSections as tutorialSections_ } from '~/data/tutorials';

const tutorialSections = ref(tutorialSections_);

const sessionStore = useSessionStore();
if (!sessionStore.isAuthorized) {
  navigateTo('/login');
}

const tutorialStore = useTutorialStore();
const toast = useToast();
const margins = [2, 3, 4, 3, 2, 1, 0, 1];
const config = useRuntimeConfig().public;

async function openTutorial(tutorial: any) {
  if (!config.enableStartingLockedTutorials && !tutorial.active) {
    toast.add({
      title: 'Tutorial locked',
      description:
        'This tutorial is locked. You need to complete the previous tutorials first.',
      icon: 'mdi-lock',
      color: 'red',
    });
    return;
  }

  sessionStore.showLoadingAnimation('Loading...');
  const response = await tutorialStore.fetchTutorialByName(tutorial.name);

  if (response === null) {
    sessionStore.loading = false;
    toast.add({
      title: 'Error opening tutorial',
      icon: 'mdi-alert-circle',
      color: 'red',
    });
    console.error(response);
    return;
  }

  navigateTo(`/tutorial/${response.tutorial._id}`);
}

onMounted(() => {
  sessionStore.loading = false;
});

tutorialSections.value
  .flatMap((section) => section.tutorials)
  .map(async (tutorial) => {
    const tutorialData = await tutorialStore.fetchTutorialByName(tutorial.name);
    if (tutorialData === null) {
      console.error('tutorial data is null');
      return;
    }
    tutorial.active = tutorialData.isUnlocked as boolean;
  });
</script>

<template>
  <h2 class="text-7xl text-center font-bold mt-4">Tutorials</h2>

  <div class="mx-auto w-[400px] overflow-auto">
    <div
      v-for="(section, sectionIndex) in tutorialSections"
      :key="sectionIndex"
    >
      <UDivider :label="section.label" class="my-8" />
      <div
        v-for="(tutorial, index) in section.tutorials"
        :key="tutorial.name"
        class="mt-4"
      >
        <TutorialsField
          :icon="tutorial.icon"
          :style="{ 'margin-left': `${margins[index % 8] * 50}px` }"
          :active="tutorial.active"
          @click="openTutorial(tutorial)"
        >
        </TutorialsField>
      </div>
    </div>
  </div>
</template>
