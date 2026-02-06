<script setup lang="ts">
import BackmindReachabilityWarning from '~/components/BackmindReachabilityWarning.vue';
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

onMounted(() => {
  window.addEventListener('beforeunload', sessionStore.saveSessionData);
});

onUnmounted(() => {
  window.removeEventListener('beforeunload', sessionStore.saveSessionData);
});
</script>

<template>
  <div>
    <AppLoadingOverlay />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <UNotifications :class="{ 'mr-96': moveNotifications }" />
    <BackmindReachabilityWarning />
    <ModalVerifyEmail />
  </div>
</template>
