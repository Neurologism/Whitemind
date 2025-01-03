<script setup lang="ts">
definePageMeta({
  layout: 'settings',
});

const sessionStore = useSessionStore();
const username = ref(sessionStore.sessionData.user.brainetTag);
const showDeleteAccountModal = ref(false);
const deleteValidationInput = ref('');
const toast = useToast();

async function saveUsername() {}

async function deleteAccount() {
  await sessionStore.deleteAccount();
  sessionStore.$reset();
  navigateTo('/');
  toast.add({
    color: 'red',
    icon: 'i-heroicons-trash-solid',
    title: 'Account deleted',
    description: 'Your account has been successfully deleted.',
  });
}
</script>
<template>
  <Modal v-model="showDeleteAccountModal">
    <template #title>Delete account</template>
    <template #text>
      Please type
      <span class="text-red-500"
        >'{{ sessionStore.sessionData.user.brainetTag }}'</span
      >
      below to confirm that you want to delete this account. This action is
      irreversible.</template
    >
    <template #bottom>
      <UInput
        color="red"
        v-model="deleteValidationInput"
        :placeholder="sessionStore.sessionData.user.brainetTag ?? ''"
      ></UInput>
      <UButton
        icon="i-heroicons-trash-solid"
        color="red"
        @click="deleteAccount"
        :disabled="
          deleteValidationInput !== sessionStore.sessionData.user.brainetTag
        "
        >Delete your account</UButton
      >
    </template>
  </Modal>
  <SettingsHeader>Account</SettingsHeader>
  <SettingsInput label="Username" placeholder="kurumi123" v-model="username">
    Beware, changing your username can result in side effects. If you want to
    change the name that will be displayed for other users, change the
    displayname instead.
  </SettingsInput>
  <div>
    <UButton
      color="gray"
      icon="material-symbols:save"
      :disabled="sessionStore.sessionData.user.brainetTag === username"
      @click="saveUsername"
      >Save username</UButton
    >
  </div>
  <SettingsHeader :weight="2" class="mt-8">Delete account</SettingsHeader>
  <SettingsText
    >This will permanently erase all data associated to your account and cannot
    be undone.
  </SettingsText>
  <div>
    <UButton
      color="red"
      icon="i-heroicons-trash-solid"
      @click="showDeleteAccountModal = true"
      >Delete your account</UButton
    >
  </div>
</template>
