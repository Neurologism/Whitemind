<script setup lang="ts">
import { tutorials as listedTutorials } from '~/components/tutorials/tutorials';

const tutorials = ref(listedTutorials);

const sessionStore = useSessionStore();
const tutorialStore = useTutorialStore();
const toast = useToast();
const margins = [2, 3, 4, 3, 2, 1, 0, 1];
const config = useRuntimeConfig().public;

async function openTutorial(tutorial: any) {
  if (!tutorial.active && !config.enableStartingLockedTutorials) {
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

tutorials.value.map(async (tutorial) => {
  tutorial.active = (await tutorialStore.fetchTutorialByName(tutorial.name))
    .isUnlocked as boolean;
});
</script>

<template>
  <div class="mx-auto w-[200px]">
    <div
      v-for="(tutorial, index) in tutorials"
      :key="tutorial.name"
      class="mt-4"
    >
      <TutorialsField
        :icon="tutorial.icon"
        :style="{ 'margin-left': `${margins[index % 8] * 30}px` }"
        :active="tutorial.active"
        @click="openTutorial(tutorial)"
      >
      </TutorialsField>
    </div>
  </div>
</template>
