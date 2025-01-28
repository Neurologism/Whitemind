<script setup lang="ts">
const sessionStore = useSessionStore();
const showModal = ref(false);
const config = useRuntimeConfig().public;

function checkVerifiedState() {
  if (
    sessionStore.sessionData.user.emails === null ||
    !sessionStore.sessionData.user.emails.length ||
    sessionStore.getEmailByType('primary')?.verified
  ) {
    return;
  }
  showModal.value = true;
}

if (config.showVerifyEmailModal) {
  watch(
    () => sessionStore.sessionData.user.emails,
    () => {
      checkVerifiedState();
    },
    { deep: true }
  );

  onMounted(() => {
    checkVerifiedState();
  });
}
</script>

<template>
  <GenericModal v-model="showModal">
    <template #title>Verify your email </template>
    <template #text>
      We have sent a verification email to
      {{ sessionStore.getEmailByType('primary')?.address }}. Without a verified
      email, you will only have limited access to our platform.
    </template>
    <template #bottom>
      <div class="flex-grow"></div>
      <UButton class="justify-center" @click="showModal = false" color="gray"
        >Close</UButton
      >
      <UButton
        class="justify-center hidden"
        icon="mdi:email"
        @click=""
        type="primary"
        >Resend</UButton
      >
      <UButton
        class="justify-center"
        icon="mdi:pencil"
        type="primary"
        @click="
          () => {
            navigateTo('/settings/emails');
            showModal = false;
          }
        "
        >Change email address</UButton
      >
      <div class="flex-grow"></div>
    </template>
  </GenericModal>
</template>
