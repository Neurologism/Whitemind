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
</template>
