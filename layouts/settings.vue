<script setup lang="ts">
const sessionStore = useSessionStore();

onMounted(() => {
  sessionStore.syncLocalSessionData();
  if (sessionStore.isAuthorized !== true) {
    navigateTo('/login');
  }
});
</script>

<template>
  <AppHeader />
  <div class="h-16"></div>
  <div
    class="w-2/3 mx-auto flex flex-row mt-8 mb-32"
    style="min-height: calc(100vh - 16rem - 34px)"
  >
    <div class="flex flex-col w-40 mr-10">
      <UButton
        color="gray"
        variant="ghost"
        to="/settings/public"
        icon="mdi:user-outline"
        >Public Profile</UButton
      >
      <UButton
        color="gray"
        variant="ghost"
        to="/settings/account"
        icon="i-heroicons-cog-6-tooth"
        >Account</UButton
      >
      <!-- <UButton
        color="gray"
        variant="ghost"
        to="/settings/emails"
        icon="mdi:email-outline"
        >Mail & Phone</UButton
      > -->
      <UButton
        color="gray"
        variant="ghost"
        to="/settings/authentication"
        icon="mdi:key-outline"
        >Authentication</UButton
      >
    </div>
    <div class="w-full flex flex-col space-y-4">
      <slot />
    </div>
  </div>
  <AppFooter></AppFooter>
</template>
