<script setup lang="ts">
definePageMeta({
  layout: 'settings',
});
</script>
<template>
  <SettingsHeader>Mail & Phone</SettingsHeader>
  <SettingsInput label="Primary Email" disabled>
    You can only change the primary email address by swapping it with a verified
    secondary email address.
  </SettingsInput>
  <SettingsInput label="Secondary Email"> </SettingsInput>
  <SettingsInput label="Phone Number"> </SettingsInput>
</template>
