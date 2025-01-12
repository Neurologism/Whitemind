<script setup lang="ts">
definePageMeta({
  layout: 'settings',
});

const sessionStore = useSessionStore();
const toast = useToast();
const user = ref({
  displayname: sessionStore.sessionData.user.displayname ?? '',
  aboutYou: sessionStore.sessionData.user.aboutYou ?? '',
});

async function updateUser() {
  const result = await sessionStore.modifyAccountData({
    displayname: user.value.displayname,
    aboutYou: user.value.aboutYou,
  });
  if (result) {
    sessionStore.sessionData.user = {
      ...sessionStore.sessionData.user,
      ...user.value,
    };
    toast.add({
      color: 'green',
      icon: 'material-symbols:done',
      title: 'Profile updated',
      description: 'Your profile has been successfully updated.',
    });
  } else {
    toast.add({
      color: 'red',
      icon: 'material-symbols:error',
      title: 'Failed to update profile',
      description: 'An error occurred while updating your profile.',
    });
  }
}
</script>
<template>
  <SettingsHeader>Public Profile</SettingsHeader>
  <div class="h-4"></div>
  <ProfilePicture
    :loading="false"
    :is-self="true"
    :pfp-url="sessionStore.hasPfp ? sessionStore.pfpUrl : '/user.svg'"
  />
  <div class="h-4"></div>
  <SettingsInput
    label="Displayname"
    placeholder="Kurumi"
    v-model="user.displayname"
  >
    Name that will be primarily visible to users users. You can change the
    displayname at any time. It does not need to be unique.
  </SettingsInput>
  <SettingsTextarea
    label="About you"
    placeholder="Nothing here yet."
    v-model="user.aboutYou"
  >
    Tell the world about your interests.
  </SettingsTextarea>
  <!-- <SettingsInput label="Pronouns" placeholder="he/him"></SettingsInput>
  <SettingsInput label="Company" placeholder="Eggs Inc."></SettingsInput>
  <SettingsInput label="Location" placeholder="The Nether"></SettingsInput> -->
  <div>
    <UButton color="gray" icon="material-symbols:save" @click="updateUser"
      >Save profile</UButton
    >
  </div>
</template>
