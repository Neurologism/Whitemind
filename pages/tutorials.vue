<script setup lang="ts">
import { tutorials } from '~/components/tutorials/tutorials';

const sessionStore = useSessionStore();
const toast = useToast();
const margins = [2, 3, 4, 3, 2, 1, 0, 1];

onMounted(() => {
  sessionStore.loading = false;
});

async function openTutorial(name: string) {
  sessionStore.showLoadingAnimation('Loading...');
  const response = await sessionStore.fetch('/api/tutorial/get', {
    method: 'POST',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      tutorialName: name,
    }),
  });

  if (response.ok) {
    const responseBody = await response.json();
    navigateTo(`/tutorial/${responseBody.tutorial._id}`);
  } else {
    sessionStore.loading = false;
    toast.add({
      title: 'Error opening tutorial',
      icon: 'mdi-alert-circle',
      color: 'red',
    });
    console.error(response);
  }
}
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
        @click="openTutorial(tutorial.name)"
      >
      </TutorialsField>
    </div>
  </div>
</template>
