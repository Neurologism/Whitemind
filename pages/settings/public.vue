<script setup lang="ts">
definePageMeta({
  layout: 'settings',
});

const sessionStore = useSessionStore();
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
  <div class="grow-0">
    <SettingsInput label="Displayname" placeholder="Kurumi">
      Name that will be primarily visible to users users. You can change the
      displayname at any time. It does not need to be unique.
    </SettingsInput>
    <SettingsTextarea
      label="About you"
      placeholder="I like brainet and raw eggs. "
    >
      Tell the world about your interests.
    </SettingsTextarea>
    <SettingsInput label="Pronouns" placeholder="he/him"></SettingsInput>
    <SettingsInput label="Company" placeholder="Eggs Inc."></SettingsInput>
    <SettingsInput label="Location" placeholder="The Nether"></SettingsInput>
  </div>
</template>
