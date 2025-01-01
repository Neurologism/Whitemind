<script setup lang="ts">
const route = useRoute();
const sessionStore = useSessionStore();

const splitRoute = computed(() => route.path.split('/'));

const moveNotifications = computed((): boolean => {
  if (splitRoute.value.length <= 1) {
    return false;
  }
  return splitRoute.value[1] === 'tutorial';
});

await sessionStore.syncLocalSessionData();

window.addEventListener('beforeunload', () => {
  sessionStore.saveSessionData();
});
</script>

<template>
  <div>
    <LoadingOverlay />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <UNotifications :class="{ 'mr-80': moveNotifications }" />
  </div>
</template>
