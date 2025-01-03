<script setup lang="ts">
definePageMeta({
  layout: 'settings',
});
</script>
<template>
  <SettingsHeader>Account</SettingsHeader>
  <SettingsInput label="Username" placeholder="kurumi123">
    Beware, changing your username can result in side effects. If you want to
    change the name that will be displayed for other users, change the
    displayname instead.
  </SettingsInput>
  <SettingsHeader :weight="2" class="mt-8">Delete account</SettingsHeader>
  <SettingsText
    >This will permanently erase all data associated to your account and cannot
    be undone.
  </SettingsText>
  <div>
    <UButton color="red">Delete your account</UButton>
  </div>
</template>
